import { createInitialState, meetsRequirements, applyOutcome, travelTo } from '../src/core/state.js';

describe('createInitialState', () => {
  test('produces consistent initial state', () => {
    const s = createInitialState(42);
    expect(s.seed).toBe(42);
    expect(s.protagonist.id).toBe('dee');
    expect(s.currentLocationId).toBe('mortlake');
    expect(s.library.length).toBeGreaterThan(0);
    expect(s.screen).toBe('household');
  });

  test('same seed produces same initial library', () => {
    const s1 = createInitialState(99);
    const s2 = createInitialState(99);
    expect(s1.library.map(b => b.id)).toEqual(s2.library.map(b => b.id));
  });
});

describe('meetsRequirements', () => {
  const state = createInitialState(1);

  test('returns true with no requirements', () => {
    expect(meetsRequirements(state, {})).toBe(true);
  });

  test('skill check passes when met', () => {
    const result = meetsRequirements(state, { skills: { mathematics: 5 } });
    expect(result).toBe(true); // Dee has mathematics: 9
  });

  test('skill check fails when not met', () => {
    const result = meetsRequirements(state, { skills: { mathematics: 15 } });
    expect(result).toBe(false);
  });

  test('book check passes when book is in library', () => {
    const result = meetsRequirements(state, { books: ['euclid_elements'] });
    expect(result).toBe(true);
  });

  test('book check fails when book not in library', () => {
    const result = meetsRequirements(state, { books: ['book_soyga'] });
    expect(result).toBe(false);
  });

  test('faction check passes when met', () => {
    // elizabeth starts at 55
    const result = meetsRequirements(state, { minFaction: { elizabeth: 30 } });
    expect(result).toBe(true);
  });

  test('faction check fails when not met', () => {
    const result = meetsRequirements(state, { minFaction: { elizabeth: 90 } });
    expect(result).toBe(false);
  });

  test('flag check fails when flag not set', () => {
    const result = meetsRequirements(state, { flags: ['laski_arrival'] });
    expect(result).toBe(false);
  });

  test('flag check passes when flag is set', () => {
    const stateWithFlag = { ...state, flags: ['laski_arrival'] };
    const result = meetsRequirements(stateWithFlag, { flags: ['laski_arrival'] });
    expect(result).toBe(true);
  });

  test('money check fails when insufficient', () => {
    const poorState = { ...state, resources: { ...state.resources, money: 5 } };
    const result = meetsRequirements(poorState, { minMoney: 25 });
    expect(result).toBe(false);
  });
});

describe('applyOutcome', () => {
  const state = createInitialState(1);

  test('applies money change', () => {
    const s = applyOutcome(state, { description: 'test', money: 10 });
    expect(s.resources.money).toBe(state.resources.money + 10);
  });

  test('applies faction reputation change', () => {
    const s = applyOutcome(state, { description: 'test', reputation: { elizabeth: 5 } });
    expect(s.factions.elizabeth).toBe((state.factions.elizabeth ?? 0) + 5);
  });

  test('caps faction values at 0 and 100', () => {
    const s = applyOutcome(state, { description: 'test', reputation: { elizabeth: 100 } });
    expect(s.factions.elizabeth).toBe(100);
    const s2 = applyOutcome(state, { description: 'test', reputation: { elizabeth: -100 } });
    expect(s2.factions.elizabeth).toBe(0);
  });

  test('sets flags', () => {
    const s = applyOutcome(state, { description: 'test', flagsSet: ['test_flag'] });
    expect(s.flags).toContain('test_flag');
  });

  test('does not duplicate flags', () => {
    const s1 = applyOutcome(state, { description: 'test', flagsSet: ['test_flag'] });
    const s2 = applyOutcome(s1, { description: 'test', flagsSet: ['test_flag'] });
    expect(s2.flags.filter(f => f === 'test_flag').length).toBe(1);
  });

  test('does not mutate original state', () => {
    const originalMoney = state.resources.money;
    applyOutcome(state, { description: 'test', money: 99 });
    expect(state.resources.money).toBe(originalMoney);
  });
});

describe('travel', () => {
  const state = createInitialState(1);

  test('can travel to connected location', () => {
    const s = travelTo(state, 'greenwich');
    expect(s.currentLocationId).toBe('greenwich');
    expect(s.visitedLocationIds).toContain('greenwich');
  });

  test('travel deducts money and time', () => {
    const s = travelTo(state, 'greenwich');
    expect(s.resources.money).toBeLessThan(state.resources.money);
    expect(s.resources.time).toBeLessThan(state.resources.time);
  });

  test('cannot travel to non-connected location', () => {
    const s = travelTo(state, 'windsor'); // windsor not directly connected to mortlake
    // Should stay at mortlake — no direct connection
    expect(s.currentLocationId).toBe('mortlake');
  });
});
