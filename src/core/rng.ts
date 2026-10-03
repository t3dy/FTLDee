// Seeded RNG using mulberry32 algorithm.
// Given the same seed, produces identical sequences — critical for reproducible runs.

export function createRNG(seed: number) {
  let s = seed >>> 0;

  function next(): number {
    s |= 0;
    s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function nextInt(min: number, max: number): number {
    return Math.floor(next() * (max - min + 1)) + min;
  }

  function pick<T>(arr: readonly T[]): T {
    return arr[nextInt(0, arr.length - 1)];
  }

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = nextInt(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getSeed(): number {
    return s;
  }

  return { next, nextInt, pick, shuffle, getSeed };
}

export type RNG = ReturnType<typeof createRNG>;
