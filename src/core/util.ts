import type { GameState, Notice } from './types.js';

export function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function notify(s: GameState, n: Notice): void {
  s.notices.push(n);
  if (s.notices.length > 12) s.notices.shift();
}

export function fill(template: string, tokens: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in tokens ? String(tokens[k]) : m));
}
