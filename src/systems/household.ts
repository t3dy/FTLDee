import type { GameState, RoomId, RoomLevel, CrewPost, HouseTierCard } from '../core/types.js';
import { BASE_LAYOUTS, getRoomCard } from '../data/cards/rooms.js';
import { houseTier, nextHouseTier } from '../data/cards/house.js';
import { atBase, crewInRoom } from './skills.js';
import { meetsSpec } from './requirements.js';

export function roomInLayout(s: GameState, room: RoomId): boolean {
  return BASE_LAYOUTS[s.household.baseId].rooms.some(r => r.room === room);
}

export function currentTier(s: GameState): HouseTierCard {
  return houseTier(s.household.baseId, s.household.tier);
}

export function maxRoomLevel(s: GameState, room: RoomId): RoomLevel {
  return roomInLayout(s, room) ? currentTier(s).maxRoomLevel : 0;
}

export function roomStations(s: GameState, room: RoomId): number {
  return getRoomCard(room).stations + currentTier(s).extraStations;
}

export function quartersCapacity(s: GameState): number {
  return 2 + s.household.rooms.quarters;
}

export function householdSize(s: GameState): number {
  return s.crew.length;
}

export function overcrowded(s: GameState): boolean {
  return householdSize(s) > quartersCapacity(s);
}

export type Blocker = string | null;

export function roomUpgradeBlocker(s: GameState, room: RoomId): Blocker {
  const lvl = s.household.rooms[room];
  const card = getRoomCard(room);
  const next = card.levels.find(l => l.level === lvl + 1);
  if (!roomInLayout(s, room)) return `${s.household.name} has no ${card.name}.`;
  if (!next) return 'Fully built.';
  if (next.level > maxRoomLevel(s, room)) return `The house must be enlarged first (tier ${s.household.tier} allows level ${maxRoomLevel(s, room)}).`;
  if (!atBase(s)) return 'You must be at the house to oversee building.';
  if (s.resources.money < next.cost) return `Needs £${next.cost}.`;
  if (next.requires && !meetsSpec(s, next.requires)) return 'Requirements not met.';
  return null;
}

export function houseUpgradeBlocker(s: GameState): Blocker {
  const next = nextHouseTier(s.household.baseId, s.household.tier);
  if (!next) return 'No further enlargement possible here.';
  if (!atBase(s)) return 'You must be at the house.';
  if (s.fortune < next.minFortune) return 'Your fortune is not high enough.';
  if (s.resources.money < next.cost) return `Needs £${next.cost}.`;
  if (next.requires && !meetsSpec(s, next.requires)) return 'Requirements not met.';
  return null;
}

export function postBlocker(s: GameState, crewId: string, post: CrewPost): Blocker {
  const cur = s.crewPosts[crewId];
  if (!cur) return 'Not in the household.';
  if (cur.kind === 'errand') return 'Away on an errand.';
  if (post.kind === 'room') {
    if (s.household.rooms[post.room] < 1) return 'That room is not built.';
    if (!atBase(s) && cur.kind === 'retinue') return 'Travelling with you; can be posted only at the house.';
    const here = crewInRoom(s, post.room).filter(id => id !== crewId);
    if (here.length >= roomStations(s, post.room)) return 'No free station.';
  }
  if (post.kind === 'retinue' && !atBase(s) && cur.kind === 'room') return 'Can join the retinue only at the house.';
  return null;
}

export function defaultRoomFor(s: GameState): RoomId {
  const order: RoomId[] = ['quarters', 'study', 'library', 'correspondence', 'laboratory', 'scriptorium', 'scryingChamber', 'instrumentRoom'];
  for (const r of order) {
    if (s.household.rooms[r] >= 1 && crewInRoom(s, r).length < roomStations(s, r)) return r;
  }
  return 'quarters';
}
