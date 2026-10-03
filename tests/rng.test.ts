import { createRNG } from '../src/core/rng.js';

describe('RNG — deterministic seeding', () => {
  test('same seed produces same sequence', () => {
    const rng1 = createRNG(12345);
    const rng2 = createRNG(12345);
    const seq1 = Array.from({ length: 20 }, () => rng1.next());
    const seq2 = Array.from({ length: 20 }, () => rng2.next());
    expect(seq1).toEqual(seq2);
  });

  test('different seeds produce different sequences', () => {
    const rng1 = createRNG(12345);
    const rng2 = createRNG(99999);
    const seq1 = Array.from({ length: 5 }, () => rng1.next());
    const seq2 = Array.from({ length: 5 }, () => rng2.next());
    expect(seq1).not.toEqual(seq2);
  });

  test('nextInt returns values in range', () => {
    const rng = createRNG(42);
    for (let i = 0; i < 100; i++) {
      const val = rng.nextInt(1, 6);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(6);
    }
  });

  test('pick returns an element from the array', () => {
    const rng = createRNG(7);
    const arr = ['a', 'b', 'c', 'd', 'e'];
    for (let i = 0; i < 20; i++) {
      expect(arr).toContain(rng.pick(arr));
    }
  });

  test('shuffle is deterministic', () => {
    const rng1 = createRNG(777);
    const rng2 = createRNG(777);
    const result1 = rng1.shuffle(['a', 'b', 'c', 'd', 'e']);
    const result2 = rng2.shuffle(['a', 'b', 'c', 'd', 'e']);
    expect(result1).toEqual(result2);
  });
});
