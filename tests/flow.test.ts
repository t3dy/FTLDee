import {
  createInitialState, resolveChoice, travelTo, upgradeRoom, postCrew, sendErrand, toggleSatchel, advanceDay, buyBook,
} from '../src/core/state.js';
import { getEncounterById, getEncountersForLocation } from '../src/data/encounters/index.js';
import { usableBookIds, effectiveSkill, atBase } from '../src/systems/skills.js';
import { buildCards } from '../src/data/cards/index.js';
import { ALL_LOCATIONS } from '../src/data/locations/index.js';
import { getErrand } from '../src/data/cards/errands.js';
import { getBook } from '../src/data/books/index.js';
import { getInstrument } from '../src/data/cards/instruments.js';
import type { GameState } from '../src/core/types.js';

function choose(s: GameState, encId: string, choiceId: string): GameState {
  const enc = getEncounterById(encId);
  if (!enc) throw new Error(`no encounter ${encId}`);
  return resolveChoice(s, enc, choiceId);
}

describe('data integrity', () => {
  test('every connection, errand, market item and encounter location resolves', () => {
    const ids = new Set(ALL_LOCATIONS.map(l => l.id));
    for (const l of ALL_LOCATIONS) {
      for (const c of l.connections) expect(ids.has(c.to), `${l.id} -> ${c.to}`).toBe(true);
      for (const e of l.errands ?? []) expect(getErrand(e), e).toBeTruthy();
      for (const b of l.market?.bookPool ?? []) expect(getBook(b), b).toBeTruthy();
      for (const i of l.market?.instrumentPool ?? []) expect(getInstrument(i), i).toBeTruthy();
    }
    for (const c of buildCards()) expect(c.historicalStatus, c.id).toBeTruthy();
  });
});

describe('household systems', () => {
  test('posting a skilled crew member mans a room and raises the effective skill', () => {
    let s = createInitialState(7);
    const before = effectiveSkill(s, 'alchemy');
    s = postCrew(s, 'roger_cooke', { kind: 'room', room: 'study' });
    expect(effectiveSkill(s, 'alchemy')).toBe(before - 1);
    s = postCrew(s, 'roger_cooke', { kind: 'room', room: 'laboratory' });
    expect(effectiveSkill(s, 'alchemy')).toBe(before);
  });

  test('room upgrade costs money and days and respects the house tier cap', () => {
    let s = createInitialState(7);
    const money = s.resources.money;
    s = upgradeRoom(s, 'study');
    expect(s.household.rooms.study).toBe(2);
    expect(s.resources.money).toBeLessThan(money);
    const capped = upgradeRoom(s, 'study');
    expect(capped.household.rooms.study).toBe(2);
  });

  test('away from the house only satchel books are usable', () => {
    let s = createInitialState(7);
    expect(usableBookIds(s).has('euclid_elements')).toBe(true);
    s = travelTo(s, 'london');
    expect(atBase(s)).toBe(false);
    expect(usableBookIds(s).has('euclid_elements')).toBe(false);
    expect(usableBookIds(s).has('dee_monas')).toBe(true);
  });

  test('satchel refuses a book that does not fit', () => {
    let s = createInitialState(7);
    s = toggleSatchel(s, 'ptolemy_almagest');
    expect(s.satchel).not.toContain('ptolemy_almagest');
  });

  test('an errand sends a crew member away and brings them back with a result', () => {
    let s = createInitialState(7);
    s = sendErrand(s, 'jane_dee', 'london', 'errand_city_news');
    expect(s.crewPosts.jane_dee.kind).toBe('errand');
    s = advanceDay(s, 10);
    expect(s.crewPosts.jane_dee.kind).toBe('room');
  });

  test('buying at the market adds the book and spends the money', () => {
    let s = travelTo(createInitialState(11), 'london');
    const stock = s.marketStock.london;
    const affordable = stock.books.find(id => (getBook(id)!.value <= s.resources.money) && getBook(id)!.prerequisites.length === 0);
    if (affordable) {
      const m = s.resources.money;
      s = buyBook(s, affordable);
      expect(s.library.some(b => b.id === affordable)).toBe(true);
      expect(s.resources.money).toBe(m - getBook(affordable)!.value);
    }
  });
});

describe('full career: Mortlake → the Road East → Prague', () => {
  test('the sector chain runs end to end', () => {
    let s = createInitialState(3);
    s = advanceDay(s, 150);
    expect(s.flags).toContain('laski_arrival');
    expect(s.screen).toBe('career_transition');
    s = choose({ ...s, screen: 'household' }, 'career_transition_continental', 'transition_depart_with_laski');
    expect(s.sector).toBe('road');
    expect(s.currentLocationId).toBe('gravesend_ships');
    expect(s.leftBehind.length).toBeGreaterThan(0);
    expect(s.instruments).not.toContain('mercator_globes');
    expect(s.pendingEncounter?.id).toBe('road_departure');
    s = choose(s, 'road_departure', 'depart_fromond');

    for (const stop of ['brill', 'rotterdam', 'lubeck', 'wismar', 'stettin', 'posen', 'lask', 'krakow', 'prague_road']) {
      s = { ...s, resources: { ...s.resources, money: 50 } };
      s = travelTo(s, stop);
      expect(s.currentLocationId).toBe(stop);
    }
    s = choose(s, 'road_to_prague', 'prague_go');
    expect(s.sector).toBe('prague');
    expect(s.currentLocationId).toBe('hajek_house');
    expect(s.crewPosts.jane_dee?.kind).toBe('errand');
    expect(s.pendingEncounter?.id).toBe('prague_arrival');
    s = choose(s, 'prague_arrival', 'arrival_letter');
    expect(s.flags).toContain('wrote_to_emperor');
    const here = getEncountersForLocation('hajek_house', {
      completedIds: s.completedEncounterIds, flags: s.flags, factions: s.factions, sectorDay: 0, rooms: s.household.rooms,
    });
    expect(here.find(e => e.id === 'prague_arrival')).toBeUndefined();
  });
});

describe('promises', () => {
  test('a pledge counts toward fortune and lapses when the household leaves England', async () => {
    const { applyOutcome } = await import('../src/core/state.js');
    const { fortuneScore } = await import('../src/systems/fortune.js');
    let s = createInitialState(5);
    const before = fortuneScore(s);
    s = applyOutcome(s, { description: 'petition', pledge: { from: 'elizabeth', amount: 40, label: 'test' } });
    expect(s.pledges.length).toBe(1);
    expect(fortuneScore(s)).toBeGreaterThan(before);
    s = choose({ ...s, screen: 'household', flags: [...s.flags, 'laski_arrival'] }, 'career_transition_continental', 'transition_depart_with_laski');
    expect(s.pledges.length).toBe(0);
    expect(s.careerEvents.some(e => e.description.includes('promised, never paid'))).toBe(true);
  });
});
