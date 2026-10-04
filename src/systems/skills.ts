import type { Book, GameState, RoomId, SkillId } from '../core/types.js';
import { BASE_LAYOUTS, ROOM_CARDS } from '../data/cards/rooms.js';
import { getInstrument } from '../data/cards/instruments.js';

export function baseLocationId(s: GameState): string {
  const id = BASE_LAYOUTS[s.household.baseId].locationId;
  return id === '*' ? s.currentLocationId : id;
}

export function atBase(s: GameState): boolean {
  return s.currentLocationId === baseLocationId(s);
}

// --- Books and the satchel ---------------------------------------------------

export function slotCost(book: Book): number {
  switch (book.portability) {
    case 'pocket': return 1;
    case 'portable': return 1;
    case 'large': return 2;
    default: return 99;
  }
}

export function satchelCapacity(s: GameState): number {
  return s.satchelSlots + s.instruments.reduce((n, id) => n + (getInstrument(id)?.satchelBonus ?? 0), 0);
}

export function satchelUsed(s: GameState): number {
  return s.satchel.reduce((n, id) => {
    const b = s.library.find(x => x.id === id);
    return n + (b ? slotCost(b) : 0);
  }, 0);
}

export function canPack(s: GameState, book: Book): boolean {
  return slotCost(book) < 99 && satchelUsed(s) + slotCost(book) <= satchelCapacity(s);
}

export function usableBookIds(s: GameState): Set<string> {
  if (atBase(s) && s.household.rooms.library >= 1) return new Set(s.library.map(b => b.id));
  const owned = new Set(s.library.map(b => b.id));
  return new Set(s.satchel.filter(id => owned.has(id)));
}

// --- Effective skill ---------------------------------------------------------

export function crewInRoom(s: GameState, room: RoomId): string[] {
  return Object.entries(s.crewPosts)
    .filter(([, p]) => p.kind === 'room' && p.room === room)
    .map(([id]) => id);
}

export function isManned(s: GameState, room: RoomId): boolean {
  const card = ROOM_CARDS.find(r => r.id === room)!;
  if (card.keySkills.length === 0) return crewInRoom(s, room).length > 0;
  return crewInRoom(s, room).some(id => {
    const c = s.crew.find(x => x.id === id);
    return !!c && card.keySkills.some(k => (c.abilities[k] ?? 0) >= 4);
  });
}

export function roomSkillBonus(s: GameState, skill: SkillId): number {
  if (!atBase(s)) return 0;
  let bonus = 0;
  for (const card of ROOM_CARDS) {
    if (!card.keySkills.includes(skill)) continue;
    const lvl = s.household.rooms[card.id];
    if (lvl >= 3) bonus += 2;
    else if (lvl >= 2) bonus += 1;
    if (lvl >= 1 && isManned(s, card.id)) bonus += 1;
  }
  return bonus;
}

export function instrumentSkillBonus(s: GameState, skill: SkillId): number {
  const home = atBase(s);
  let bonus = 0;
  for (const id of s.instruments) {
    const inst = getInstrument(id);
    if (!inst?.skillBonus?.[skill]) continue;
    if (inst.baseOnly && !home) continue;
    bonus += inst.skillBonus[skill]!;
  }
  return Math.min(bonus, 2);
}

export function bookSkillBonus(s: GameState, skill: SkillId): number {
  const usable = usableBookIds(s);
  const helping = s.library.filter(b => usable.has(b.id) && (b.skillBonus?.[skill] ?? 0) > 0);
  if (!helping.length) return 0;
  // "Liber librum apperit": two Ripley texts read together open each other.
  if (skill === 'alchemy' && helping.filter(b => b.intellectualTags.includes('ripley_corpus')).length >= 2) return 2;
  return 1;
}

export interface SkillBreakdown {
  base: number;
  rooms: number;
  instruments: number;
  books: number;
  total: number;
}

export function skillBreakdown(s: GameState, skill: SkillId): SkillBreakdown {
  const base = s.protagonist.abilities[skill] ?? 0;
  const rooms = roomSkillBonus(s, skill);
  const instruments = instrumentSkillBonus(s, skill);
  const books = bookSkillBonus(s, skill);
  return { base, rooms, instruments, books, total: base + rooms + instruments + books };
}

export function effectiveSkill(s: GameState, skill: SkillId): number {
  return skillBreakdown(s, skill).total;
}

// Crew who can stand in for Dee: the retinue always; at the base, everyone home.
export function presentCrewIds(s: GameState): string[] {
  const home = atBase(s);
  return s.crew
    .filter(c => {
      const p = s.crewPosts[c.id];
      if (!p || p.kind === 'errand') return false;
      return p.kind === 'retinue' || home;
    })
    .map(c => c.id);
}

export function bestSkill(s: GameState, skill: SkillId): { value: number; who: string } {
  let best = { value: effectiveSkill(s, skill), who: 'dee' };
  for (const id of presentCrewIds(s)) {
    const v = s.crew.find(c => c.id === id)?.abilities[skill] ?? 0;
    if (v > best.value) best = { value: v, who: id };
  }
  return best;
}
