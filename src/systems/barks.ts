import type { GameState } from '../core/types.js';
import type { Bark, BarkTrigger, CopyModule, FortuneId } from '../data/copy/types.js';
import { fill, hashString, notify } from '../core/util.js';

// The copy module (src/data/copy/index.ts) is registered at startup by main.ts.
// Until then, and in tests, these plain fallbacks keep every trigger voiced.

const FALLBACK: Bark[] = [
  { speaker: 'narrator', trigger: 'room_upgraded', text: 'The {room} is now {level}.' },
  { speaker: 'narrator', trigger: 'book_bought', text: '{book} bought for £{price}.' },
  { speaker: 'narrator', trigger: 'book_sold', text: '{book} sold for £{price}.' },
  { speaker: 'narrator', trigger: 'errand_sent', text: '{crew} sets out for {place}; back in {days} days.' },
  { speaker: 'narrator', trigger: 'errand_success', text: '{crew} {result}' },
  { speaker: 'narrator', trigger: 'errand_failure', text: '{crew} {result}' },
  { speaker: 'narrator', trigger: 'house_upgraded', text: 'The household is now {house}.' },
  { speaker: 'narrator', trigger: 'sector_change', text: 'The household arrives in {place}.' },
];

let copy: CopyModule | null = null;

export function registerCopy(c: CopyModule): void {
  copy = c;
}

export function getCopy(): CopyModule | null {
  return copy;
}

const CREW_SPEAKERS = new Set(['jane_dee', 'roger_cooke', 'barnabas_saul', 'edward_kelley']);

export function bark(
  s: GameState,
  trigger: BarkTrigger,
  tokens: Record<string, string | number> = {},
  tone: 'good' | 'bad' | 'neutral' = 'neutral',
  about?: string,
): void {
  const pool = (copy?.barks ?? []).filter(b => b.trigger === trigger);
  const present = new Set(s.crew.map(c => c.id));
  // When the bark is about one crew member, a line voiced by another crew member
  // would name the wrong person; keep that member's own lines and neutral voices.
  const eligible = pool.filter(b => !CREW_SPEAKERS.has(b.speaker)
    ? true
    : about ? b.speaker === about : present.has(b.speaker));
  const list = eligible.length ? eligible : FALLBACK.filter(b => b.trigger === trigger);
  if (!list.length) return;
  const pick = list[hashString(`${trigger}:${s.day}:${s.log.length}`) % list.length];
  notify(s, { kind: 'bark', speaker: pick.speaker, text: fill(pick.text, tokens), tone });
}

const FORTUNE_IDS: FortuneId[] = ['destitute', 'straitened', 'comfortable', 'favoured', 'endowed'];
const FORTUNE_LABELS = ['Destitute', 'Straitened', 'Comfortable', 'Favoured', 'Endowed'];

export function fortuneLabel(rank: number): string {
  const id = FORTUNE_IDS[rank];
  return copy?.fortunes.find(f => f.id === id)?.label ?? FORTUNE_LABELS[rank];
}

export function fortuneText(rank: number, rising: boolean): string {
  const f = copy?.fortunes.find(x => x.id === FORTUNE_IDS[rank]);
  if (f) return rising ? f.riseText : f.fallText;
  return rising ? `Fortune rises: ${FORTUNE_LABELS[rank]}.` : `Fortune falls: ${FORTUNE_LABELS[rank]}.`;
}

export function houseTierText(tierId: string): string | undefined {
  return copy?.houseTiers.find(h => h.tierId === tierId)?.upgradeText;
}

export function helpText(id: string): string {
  return copy?.interfaceHelp[id] ?? '';
}
