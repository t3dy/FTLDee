import type { FactionRelationships, GameState, OutcomeSpec, SectorId } from '../core/types.js';
import { notify } from '../core/util.js';
import { getBook } from '../data/books/index.js';
import { getInstrument } from '../data/cards/instruments.js';
import { getCrewDef } from '../data/characters/index.js';
import { BASE_LAYOUTS } from '../data/cards/rooms.js';
import { houseTier } from '../data/cards/house.js';
import type { BaseId } from '../core/types.js';

export const SECTOR_BASE: Record<SectorId, BaseId> = { england: 'mortlake', road: 'road', prague: 'hajek_house' };
import { SECTORS, getLocation } from '../data/locations/index.js';
import { atBase, canPack } from './skills.js';
import { defaultRoomFor, maxRoomLevel } from './household.js';
import { bark } from './barks.js';

export function incrementOttomanSignalMut(s: GameState): void {
  s.ottomanSignalCount = (s.ottomanSignalCount ?? 0) + 1;
  if (s.ottomanSignalCount >= 3 && !s.flags.includes('ottoman_thread_open')) {
    s.flags.push('ottoman_thread_open');
    s.log.push('[SIGNAL] Something in the letter tables points east.');
    notify(s, { kind: 'system', title: 'The Ottoman thread', text: 'Something in the letter tables points east. A road not taken by the historical Dee is now open to you. [COUNTERFACTUAL]', tone: 'neutral' });
  }
}

export function addCrewMut(s: GameState, id: string): void {
  if (s.crew.some(c => c.id === id)) return;
  const def = getCrewDef(id);
  if (!def) return;
  s.crew.push({ ...JSON.parse(JSON.stringify(def)), available: true });
  s.crewPosts[id] = { kind: 'room', room: defaultRoomFor(s) };
  notify(s, { kind: 'system', title: 'The household grows', text: `${def.name} joins the household.`, tone: 'neutral' });
}

export function applyOutcomeMut(s: GameState, o: OutcomeSpec): void {
  if (o.money !== undefined) s.resources.money = Math.max(0, s.resources.money + o.money);
  if (o.time !== undefined) s.resources.time = Math.max(0, s.resources.time + o.time);
  if (o.secrecyChange !== undefined) s.resources.secrecy = clamp(s.resources.secrecy + o.secrecyChange);
  if (o.focusChange !== undefined) s.resources.focus = clamp(s.resources.focus + o.focusChange);

  for (const [fid, delta] of Object.entries(o.reputation ?? {}) as [keyof FactionRelationships, number][]) {
    s.factions[fid] = clamp((s.factions[fid] ?? 0) + delta);
  }

  for (const id of o.booksGained ?? []) {
    const def = getBook(id);
    if (!def || s.library.some(b => b.id === id)) continue;
    s.library.push({ ...def });
    def.intellectualTags.forEach(t => { if (!s.knowledgeTags.includes(t)) s.knowledgeTags.push(t); });
    def.operationsUnlocked.forEach(op => { if (!s.operations.includes(op)) s.operations.push(op); });
    if (!atBase(s) && canPack(s, def)) s.satchel.push(id);
    s.log.push(`Acquired: ${def.title}`);
  }
  for (const id of o.booksLost ?? []) {
    s.library = s.library.filter(b => b.id !== id);
    s.satchel = s.satchel.filter(b => b !== id);
  }

  for (const id of o.instrumentsGained ?? []) {
    if (!s.instruments.includes(id) && getInstrument(id)) {
      s.instruments.push(id);
      s.log.push(`Acquired: ${getInstrument(id)!.name}`);
    }
  }
  for (const id of o.instrumentsLost ?? []) s.instruments = s.instruments.filter(i => i !== id);

  for (const c of o.contactsGained ?? []) {
    if (!s.knowledgeTags.includes(`contact:${c}`)) s.knowledgeTags.push(`contact:${c}`);
  }
  for (const id of o.crewJoins ?? []) addCrewMut(s, id);
  for (const id of o.crewLeaves ?? []) {
    const name = s.crew.find(c => c.id === id)?.name;
    s.crew = s.crew.filter(c => c.id !== id);
    delete s.crewPosts[id];
    if (name) s.log.push(`${name} leaves the household.`);
  }

  for (const f of o.flagsSet ?? []) if (!s.flags.includes(f)) s.flags.push(f);

  if (o.roomUpgrade) {
    const { room, level } = o.roomUpgrade;
    const capped = Math.min(level, maxRoomLevel(s, room)) as 0 | 1 | 2 | 3;
    if (s.household.rooms[room] < capped) s.household.rooms[room] = capped;
  }

  if (o.ottomanSignal) incrementOttomanSignalMut(s);

  if (o.pledge) {
    s.pledges.push({ ...o.pledge, day: s.day });
    notify(s, { kind: 'bark', speaker: 'narrator', text: `Promised: £${o.pledge.amount} — ${o.pledge.label}.`, tone: 'neutral' });
  }

  s.log.push(o.description);

  if (o.sectorChange) emigrateMut(s, o.sectorChange);
  if (o.endCareer) {
    if (!s.flags.includes('career_ended')) s.flags.push('career_ended');
    s.screen = 'summary';
  }
}

// The household crosses to a new sector. Only the satchel and travelling
// instruments come; everything else stays behind at the old base.
export function emigrateMut(s: GameState, sector: SectorId): void {
  const meta = SECTORS[sector];
  const baseId = SECTOR_BASE[sector];
  const layout = BASE_LAYOUTS[baseId];
  const fromEngland = s.sector === 'england';
  // Leaving England: only the satchel crosses. Later moves carry the whole chest.
  const packed = new Set(s.satchel);
  const left = fromEngland ? s.library.filter(b => !packed.has(b.id)) : [];
  s.leftBehind.push(...left);
  if (fromEngland) s.library = s.library.filter(b => packed.has(b.id));
  const lostInstruments = fromEngland ? s.instruments.filter(id => !getInstrument(id)?.travels) : [];
  if (fromEngland) s.instruments = s.instruments.filter(id => getInstrument(id)?.travels);
  if (!fromEngland) s.satchel = s.library.map(b => b.id);

  if (s.pledges.length) {
    const owed = s.pledges.reduce((n, p) => n + p.amount, 0);
    notify(s, { kind: 'fortune', title: 'Promised, not paid', text: `£${owed} in promised rewards goes unpaid as the household leaves. The promises were real; the money was not.`, tone: 'bad' });
    s.careerEvents.push({ day: s.day, description: `£${owed} promised, never paid`, historicalStatus: 'plausible' });
    s.pledges = [];
  }
  s.sector = sector;
  s.sectorDayStart = s.day;
  s.resources.time = meta.days;
  s.totalPressure = 15;
  s.campaignPhase = 'early';
  s.currentLocationId = meta.base;
  if (!s.visitedLocationIds.includes(meta.base)) s.visitedLocationIds.push(meta.base);
  s.household = {
    baseId,
    tier: 1,
    name: houseTier(baseId, 1).name,
    stability: Math.max(40, s.household.stability - 20),
    staff: s.household.staff,
    rooms: { ...layout.start },
  };
  s.crewPosts = {};
  for (const c of s.crew) s.crewPosts[c.id] = { kind: 'room', room: defaultRoomFor(s) };
  // Jane and the children came on from Kraków to Prague at the end of 1584 (Whitby 46–48).
  if (sector === 'prague' && s.crew.some(c => c.id === 'jane_dee')) {
    s.crewPosts.jane_dee = { kind: 'errand', errandId: 'family_follows', locationId: 'hajek_house', returnDay: s.day + 25, returnRoom: 'quarters' };
  }

  const place = getLocation(meta.base)?.name ?? meta.base;
  s.log.push(`${meta.name}: the household is at ${place}.${fromEngland ? ` ${left.length} books and ${lostInstruments.length} instruments stay at Mortlake.` : ''}`);
  notify(s, {
    kind: 'system',
    title: `${meta.name}, ${meta.dates}`,
    text: fromEngland
      ? `${s.library.length} books cross with you. ${left.length} stay on the shelves at Mortlake${lostInstruments.length ? `, with ${lostInstruments.map(i => getInstrument(i)!.name).join(', ')}` : ''}.`
      : `The household settles at ${place} with the ${s.library.length} books it carried.`,
    tone: 'neutral',
  });
  bark(s, 'sector_change', { place });
  s.pendingEncounter = null;
  s.screen = 'household';
}

function clamp(v: number): number {
  return Math.max(0, Math.min(100, v));
}
