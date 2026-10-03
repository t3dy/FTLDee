import type { CardCategory, HistoricalStatus } from '../../core/types.js';
import { ROOM_CARDS } from './rooms.js';
import { HOUSE_TIERS } from './house.js';
import { INSTRUMENT_CARDS } from './instruments.js';
import { SKILL_CARDS, skillName } from './skills.js';
import { FACTION_CARDS } from './factions.js';
import { ERRAND_CARDS } from './errands.js';
import { ALL_BOOKS } from '../books/index.js';
import { ALL_CREW, DEE_CHARACTER } from '../characters/index.js';
import { ALL_LOCATIONS } from '../locations/index.js';
import { ALL_ENCOUNTERS } from '../encounters/index.js';
import { ALL_WEATHER_EVENTS } from '../factions/weather.js';
import { ALL_BIOGRAPHICAL_ENTRIES } from '../biography/entries.js';

// The card database: every game object flattened to one shape. Feeds the
// in-game Codex and scripts/export_cards.ts (cards.json → cards.sqlite).

export interface Card {
  id: string;
  category: CardCategory;
  name: string;
  subtitle: string;
  historicalStatus: HistoricalStatus;
  sources: string[];
  glyph: string;
  summary: string;
  rules: string[];
  flavor?: string;
}

const bonus = (b?: Partial<Record<string, number>>) =>
  Object.entries(b ?? {}).map(([k, v]) => `+${v} ${skillName(k)}`).join(', ');

export function buildCards(): Card[] {
  const cards: Card[] = [];

  for (const h of HOUSE_TIERS) cards.push({
    id: h.id, category: 'house', name: h.name, subtitle: `${h.base === 'mortlake' ? 'Mortlake' : 'Prague'} · tier ${h.tier}`,
    historicalStatus: h.historicalStatus, sources: h.sources, glyph: h.glyph, summary: h.summary, flavor: h.flavor,
    rules: [`Rooms build to level ${h.maxRoomLevel}`, `+${h.extraStations} crew station(s) per room`,
      h.cost ? `Costs £${h.cost} and ${h.days} days; needs fortune rank ${h.minFortune}` : 'Starting house',
      ...(h.stipendPerTenDays ? [`Crown stipend £${h.stipendPerTenDays} every 10 days`] : [])],
  });

  for (const r of ROOM_CARDS) cards.push({
    id: r.id, category: 'room', name: r.name, subtitle: `Key skills: ${r.keySkills.map(skillName).join(', ') || 'none'} · ${r.stations} stations`,
    historicalStatus: r.historicalStatus, sources: r.sources, glyph: r.glyph, summary: r.summary, flavor: r.flavor,
    rules: r.levels.map(l => `Level ${l.level} — ${l.label} (£${l.cost}, ${l.days}d): ${l.effect}`),
  });

  for (const b of ALL_BOOKS) cards.push({
    id: b.id, category: 'book', name: b.title, subtitle: `${b.author}, ${b.date}`,
    historicalStatus: b.historicalStatus, sources: b.sources, glyph: b.glyph, summary: b.notes, flavor: b.provenance,
    rules: [`£${b.value} · ${b.rarity} · ${b.portability} · ${b.censorshipStatus}`,
      ...(b.skillBonus ? [`While usable: ${bonus(b.skillBonus)}`] : []),
      ...(b.prerequisites.length ? [`Needs grounding in: ${b.prerequisites.join(', ')}`] : []),
      `Opens: ${b.operationsUnlocked.join(', ')}`],
  });

  for (const i of INSTRUMENT_CARDS) cards.push({
    id: i.id, category: 'instrument', name: i.name, subtitle: `${i.kind} · ${i.rarity}`,
    historicalStatus: i.historicalStatus, sources: i.sources, glyph: i.glyph, summary: i.summary, flavor: i.flavor,
    rules: [i.price ? `£${i.price}` : 'Not for sale', ...(i.skillBonus ? [bonus(i.skillBonus)] : []),
      ...(i.satchelBonus ? [`+${i.satchelBonus} satchel slots`] : []),
      i.baseOnly ? 'Bonus applies at the house' : 'Bonus applies anywhere', i.travels ? 'Goes with the household abroad' : 'Stays at Mortlake if the household emigrates'],
  });

  for (const c of [DEE_CHARACTER, ...ALL_CREW]) cards.push({
    id: c.id, category: 'crew', name: c.name, subtitle: `${c.role}, age ${c.age} in 1580`,
    historicalStatus: c.historicalStatus, sources: c.sources, glyph: c.glyph, summary: c.personalAgenda, flavor: c.flavor,
    rules: [Object.entries(c.abilities).map(([k, v]) => `${skillName(k)} ${v}`).join(', '), `Reliability ${c.epistemicReliability}`, ...c.secrets],
  });

  for (const l of ALL_LOCATIONS) cards.push({
    id: l.id, category: 'location', name: l.name, subtitle: `${l.sector === 'england' ? 'Southern England' : 'Prague'} · ${l.type.replace('_', ' ')}`,
    historicalStatus: l.historicalStatus, sources: l.sources, glyph: l.glyph, summary: l.description,
    rules: [`Connects to: ${l.connections.map(c => `${c.to} (${c.travelDays}d £${c.travelCost})`).join(', ')}`,
      ...(l.market ? [`Market: ${l.market.name}`] : []), ...(l.errands?.length ? [`Errands: ${l.errands.join(', ')}`] : [])],
  });

  for (const e of ERRAND_CARDS) cards.push({
    id: e.id, category: 'errand', name: e.name, subtitle: `${skillName(e.skill)} vs ${e.difficulty} · £${e.cost}`,
    historicalStatus: e.historicalStatus, sources: e.sources, glyph: e.glyph, summary: e.summary,
    rules: [`Success: ${e.success.description}`, `Failure: ${e.failure.description}`],
  });

  for (const e of ALL_ENCOUNTERS) cards.push({
    id: e.id, category: 'encounter', name: e.title, subtitle: `at ${e.locationId}`,
    historicalStatus: e.historicalStatus, sources: e.sources ?? [], glyph: 'scroll', summary: e.description.split('\n\n')[0],
    rules: e.choices.map(c => `${c.isBlueOption ? '◆ ' : ''}${c.text}`),
  });

  for (const f of FACTION_CARDS) cards.push({
    id: f.id, category: 'faction', name: f.name, subtitle: `Wants: ${f.wants}`,
    historicalStatus: f.historicalStatus, sources: f.sources, glyph: f.glyph, summary: f.summary, rules: [],
  });

  for (const k of SKILL_CARDS) cards.push({
    id: k.id, category: 'skill', name: k.name, subtitle: `${k.branch} branch`,
    historicalStatus: k.historicalStatus, sources: k.sources, glyph: k.glyph, summary: k.summary,
    rules: k.rooms.length ? [`Boosted at the house by: ${k.rooms.join(', ')}`] : [],
  });

  for (const w of ALL_WEATHER_EVENTS) cards.push({
    id: w.id, category: 'weather', name: w.title, subtitle: `${w.sector} · sector day ${w.triggerDate}`,
    historicalStatus: w.historicalStatus, sources: w.sources ?? [], glyph: 'warning', summary: w.description,
    rules: [bonus(w.effects.factionShifts) || '', ...(w.effects.flagsSet ?? []).map(f => `Sets: ${f}`)].filter(Boolean),
  });

  for (const b of ALL_BIOGRAPHICAL_ENTRIES) cards.push({
    id: `bio:${b.id}`, category: 'biography', name: b.label, subtitle: `${b.type}${b.dateStart ? ` · ${b.dateStart}` : ''}`,
    historicalStatus: b.historicalStatus, sources: b.sources, glyph: 'scroll', summary: b.description,
    rules: [`Themes: ${b.themes.join(', ')}`, ...(b.consequence ? [`Consequence: ${b.consequence}`] : [])],
  });

  return cards;
}

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  house: 'House', room: 'Rooms', book: 'Books', instrument: 'Instruments', crew: 'Crew', location: 'Places',
  errand: 'Errands', encounter: 'Encounters', faction: 'Factions', skill: 'Skills', weather: 'Weather', biography: 'Biography',
};
