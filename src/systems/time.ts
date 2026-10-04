import type { FactionId, GameState } from '../core/types.js';
import { notify } from '../core/util.js';
import { SECTORS } from '../data/locations/index.js';
import { atBase } from './skills.js';
import { overcrowded } from './household.js';
import { currentTier } from './household.js';
import { resolveErrandsMut } from './errands.js';
import { updateFortune } from './fortune.js';
import { bark } from './barks.js';
import { createRNG } from '../core/rng.js';
import { hashString } from '../core/util.js';
import { getRoomCard } from '../data/cards/rooms.js';
import { skillName } from '../data/cards/skills.js';

export function sectorDay(s: GameState): number {
  return s.day - s.sectorDayStart;
}

// Mutates s: advances the clock day by day so that every per-day effect,
// errand return and weather event lands on the right day.
export function advanceDaysMut(s: GameState, days: number): void {
  for (let i = 0; i < days; i++) tick(s);
  resolveErrandsMut(s);
  checkMilestones(s);
  updateFortune(s);
}

function tick(s: GameState): void {
  s.day += 1;
  s.resources.time = Math.max(0, s.resources.time - 1);
  s.totalPressure = Math.min(100, s.totalPressure + 0.3);

  const home = atBase(s);
  const crowded = overcrowded(s);
  if (home && !crowded) s.resources.focus = Math.min(100, s.resources.focus + s.household.rooms.study);
  if (crowded) s.household.stability = Math.max(0, s.household.stability - 1);
  else if (s.household.rooms.quarters >= 2) s.household.stability = Math.min(100, s.household.stability + (s.household.rooms.quarters - 1));

  // Lying low: a quiet week at the house lets talk die down.
  if (home && sectorDay(s) % 5 === 0) s.resources.secrecy = Math.min(100, s.resources.secrecy + 1);

  if (sectorDay(s) % 20 === 0) trainCrew(s);

  if (sectorDay(s) % 10 === 0) {
    const corr = s.household.rooms.correspondence;
    const drift = corr >= 2 ? 0 : corr === 1 ? 1 : 2;
    for (const f of ['scholarNetwork', 'continentalCourts'] as FactionId[]) {
      s.factions[f] = Math.max(0, (s.factions[f] ?? 0) - drift);
    }
    settlePledges(s);
    maybeDraftGrant(s);
    const stipend = currentTier(s).stipendPerTenDays;
    if (stipend) {
      s.resources.money += stipend;
      s.log.push(`Crown stipend received: £${stipend}.`);
    }
  }

  for (const ev of s.weatherEvents) {
    if (ev.triggered || ev.sector !== s.sector || ev.triggerDate === undefined) continue;
    if (sectorDay(s) < ev.triggerDate) continue;
    ev.triggered = true;
    for (const [fid, d] of Object.entries(ev.effects.factionShifts ?? {}) as [FactionId, number][]) {
      s.factions[fid] = Math.max(0, Math.min(100, (s.factions[fid] ?? 0) + d));
    }
    for (const f of ev.effects.flagsSet ?? []) if (!s.flags.includes(f)) s.flags.push(f);
    if (ev.effects.secrecyChange) s.resources.secrecy = Math.max(0, Math.min(100, s.resources.secrecy + ev.effects.secrecyChange));
    if (ev.effects.pressureIncrease) s.totalPressure = Math.min(100, s.totalPressure + ev.effects.pressureIncrease);
    const sc = ev.effects.scaleByFlags;
    if (sc) {
      const n = sc.flags.filter(f => s.flags.includes(f)).length
        + (sc.flagPrefix ? s.flags.filter(f => f.startsWith(sc.flagPrefix!) && !sc.flags.includes(f)).length : 0);
      for (const [fid, d] of Object.entries(sc.perFlag) as [FactionId, number][]) {
        s.factions[fid] = Math.max(0, Math.min(100, (s.factions[fid] ?? 0) + d * n));
      }
      if (sc.secrecyPerFlag) s.resources.secrecy = Math.max(0, Math.min(100, s.resources.secrecy + sc.secrecyPerFlag * n));
      if (n) s.log.push(`(${n} of your past choices made this worse.)`);
    }
    s.log.push(`[POLITICAL WEATHER] ${ev.title}: ${ev.description}`);
    notify(s, { kind: 'weather', title: ev.title, text: ev.description, tone: 'neutral' });
  }
}

// Promised rewards: after 20 days each has a small chance, per ten days, of being
// paid, better with a warm patron. Most are not (Sherman: the failed offices).
function settlePledges(s: GameState): void {
  const keep = [];
  for (const p of s.pledges ?? []) {
    const age = s.day - p.day;
    const warmth = s.factions[p.from] ?? 0;
    const chance = Math.max(0, Math.min(0.25, (warmth - 40) / 200));
    const roll = createRNG((s.seed ^ hashString(`${p.from}:${p.day}:${s.day}`)) >>> 0).next();
    if (age >= 20 && roll < chance) {
      s.resources.money += p.amount;
      notify(s, { kind: 'fortune', title: 'Paid at last', text: `£${p.amount} arrives: ${p.label}.`, tone: 'good' });
    } else {
      keep.push(p);
    }
  }
  s.pledges = keep;
}

// The counterfactual royal foundation needs a grant first; it may be drafted
// when the Queen and Burghley are both warm.
function maybeDraftGrant(s: GameState): void {
  if (s.flags.includes('royal_grant_drafted')) return;
  if ((s.factions.elizabeth ?? 0) < 80 || (s.factions.burghley ?? 0) < 50) return;
  const roll = createRNG((s.seed ^ hashString(`grant:${s.day}`)) >>> 0).next();
  if (roll < 0.15) {
    s.flags.push('royal_grant_drafted');
    notify(s, { kind: 'fortune', title: 'A royal grant is drafted [COUNTERFACTUAL]', text: 'For once the paper is drawn up. A foundation at Mortlake can now be built, if the money holds.', tone: 'good' });
  }
}

// Crew who work a station learn its craft: every 20 days, +1 in the room's
// key skill they are best at, up to their potential (or 8).
function trainCrew(s: GameState): void {
  for (const c of s.crew) {
    const p = s.crewPosts[c.id];
    if (!p || p.kind !== 'room' || s.household.rooms[p.room] < 1) continue;
    const keys = getRoomCard(p.room).keySkills;
    if (!keys.length) continue;
    const best = [...keys].sort((a, b) => (c.abilities[b] ?? 0) - (c.abilities[a] ?? 0))[0];
    const cur = c.abilities[best] ?? 0;
    const cap = c.potential[best] ?? 8;
    if (cur >= cap) continue;
    c.abilities[best] = cur + 1;
    notify(s, { kind: 'bark', speaker: 'narrator', text: `${c.name} has learned from the work in the ${getRoomCard(p.room).name}: ${skillName(best)} ${cur + 1}.`, tone: 'good' });
  }
}

function checkMilestones(s: GameState): void {
  if (s.flags.includes('career_ended')) return;
  if (s.resources.secrecy <= 0) {
    s.flags.push('career_ended', 'career_collapse');
    s.careerEvents.push({ day: s.day, description: 'Secrecy gone: summoned for examination. The career collapses.', historicalStatus: 'counterfactual' });
    s.screen = 'summary';
    return;
  }
  const meta = SECTORS[s.sector];
  const d = sectorDay(s);
  if (s.campaignPhase === 'early' && d > meta.transitionDay * 0.6) s.campaignPhase = 'mid';
  if (s.campaignPhase === 'mid' && d > meta.transitionDay * 0.85) s.campaignPhase = 'late';

  if (s.sector === 'england' && d >= meta.transitionDay && !s.flags.includes('transition_offered')) {
    s.flags.push('transition_offered');
    s.campaignPhase = 'transition';
    s.screen = 'career_transition';
  }
  if (s.sector === 'prague' && d >= meta.transitionDay && !s.flags.includes('prague_closed')) {
    s.flags.push('prague_closed');
    notify(s, { kind: 'system', title: 'Prague is closed to you', text: 'The road south to Třeboň is open from Hájek\'s house.', tone: 'bad' });
  }
  warnOnce(s, 'warn_secrecy', s.resources.secrecy <= 15, s.resources.secrecy > 25, 'secrecy_low');
  warnOnce(s, 'warn_money', s.resources.money <= 5, s.resources.money > 15, 'money_low');
  warnOnce(s, 'warn_focus', s.resources.focus <= 10, s.resources.focus > 25, 'focus_low');
  warnOnce(s, 'warn_crowded', overcrowded(s), !overcrowded(s), 'overcrowded');
}

function warnOnce(s: GameState, flag: string, low: boolean, recovered: boolean, trigger: 'secrecy_low' | 'money_low' | 'focus_low' | 'overcrowded'): void {
  if (low && !s.flags.includes(flag)) {
    s.flags.push(flag);
    bark(s, trigger, {}, 'bad');
  } else if (recovered && s.flags.includes(flag)) {
    s.flags = s.flags.filter(f => f !== flag);
  }
}
