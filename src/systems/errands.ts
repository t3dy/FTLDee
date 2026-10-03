import type { GameState, RoomId } from '../core/types.js';
import { createRNG } from '../core/rng.js';
import { hashString } from '../core/util.js';
import { getErrand } from '../data/cards/errands.js';
import { getLocation, travelDaysBetween } from '../data/locations/index.js';
import { getBook } from '../data/books/index.js';
import { baseLocationId } from './skills.js';
import { applyOutcomeMut } from './outcome.js';
import { ensureStockMut, missingPrerequisites } from './market.js';
import { bark } from './barks.js';
import { defaultRoomFor } from './household.js';

export function errandDays(s: GameState, locationId: string, errandId: string): number {
  const e = getErrand(errandId);
  return 2 * travelDaysBetween(baseLocationId(s), locationId) + (e?.workDays ?? 0);
}

export function errandBlocker(s: GameState, crewId: string, _locationId: string, errandId: string): string | null {
  const e = getErrand(errandId);
  const post = s.crewPosts[crewId];
  if (!e) return 'Unknown errand.';
  if (!post || post.kind !== 'room') return 'Only someone at the house can be sent.';
  if (s.resources.money < e.cost) return `Needs £${e.cost}.`;
  return null;
}

export function dispatchErrandMut(s: GameState, crewId: string, locationId: string, errandId: string): boolean {
  if (errandBlocker(s, crewId, locationId, errandId)) return false;
  const e = getErrand(errandId)!;
  const post = s.crewPosts[crewId];
  const returnRoom: RoomId = post.kind === 'room' ? post.room : 'quarters';
  const days = errandDays(s, locationId, errandId);
  s.resources.money -= e.cost;
  s.crewPosts[crewId] = { kind: 'errand', errandId, locationId, returnDay: s.day + days, returnRoom };
  const crew = s.crew.find(c => c.id === crewId)!;
  const place = getLocation(locationId)?.name ?? locationId;
  s.log.push(`${crew.name} sets out for ${place} (${e.name}).`);
  bark(s, 'errand_sent', { crew: crew.name, place, days }, 'neutral', crewId);
  return true;
}

// Mutates s. Resolves every errand whose return day has come.
export function resolveErrandsMut(s: GameState): void {
  for (const [crewId, post] of Object.entries(s.crewPosts)) {
    if (post.kind !== 'errand' || post.returnDay > s.day) continue;
    const e = getErrand(post.errandId);
    const crew = s.crew.find(c => c.id === crewId);
    if (!e || !crew) { delete s.crewPosts[crewId]; continue; }
    const rng = createRNG((s.seed ^ hashString(`${crewId}:${post.errandId}:${post.returnDay}`)) >>> 0);
    const roll = rng.nextInt(1, 10);
    const skill = crew.abilities[e.skill] ?? 0;
    const success = roll + skill >= e.difficulty;
    const outcome = success ? { ...e.success } : { ...e.failure };

    if (success && e.marketPurchase) {
      const stock = ensureStockMut(s, post.locationId);
      const pick = stock?.books.find(id => {
        const b = getBook(id);
        return b && b.value <= e.cost && !s.library.some(x => x.id === id) && missingPrerequisites(s, b).length === 0;
      });
      if (pick) {
        const b = getBook(pick)!;
        outcome.booksGained = [pick];
        outcome.money = (outcome.money ?? 0) + (e.cost - b.value);
        outcome.description = `returned from ${getLocation(post.locationId)?.name} with ${b.title} (£${b.value}).`;
        stock!.books = stock!.books.filter(x => x !== pick);
      } else {
        outcome.description = 'found nothing within the purse and brought the money back.';
        outcome.money = (outcome.money ?? 0) + e.cost;
      }
    }
    if (success && s.household.rooms.correspondence >= 3 && outcome.reputation) {
      const rep = { ...outcome.reputation };
      for (const k of Object.keys(rep) as (keyof typeof rep)[]) if ((rep[k] ?? 0) > 0) rep[k] = rep[k]! + 1;
      outcome.reputation = rep;
    }
    const result = outcome.description;
    outcome.description = `${crew.name} ${result} (d10 ${roll} + ${skill} vs ${e.difficulty})`;
    s.crewPosts[crewId] = { kind: 'room', room: post.returnRoom };
    if (s.household.rooms[post.returnRoom] < 1) s.crewPosts[crewId] = { kind: 'room', room: defaultRoomFor(s) };
    applyOutcomeMut(s, outcome);
    s.notices.push({ kind: 'errand', title: `${crew.name} returns`, text: outcome.description, tone: success ? 'good' : 'bad' });
    bark(s, success ? 'errand_success' : 'errand_failure', { crew: crew.name, result, place: getLocation(post.locationId)?.name ?? '' }, success ? 'good' : 'bad', crewId);
  }
}
