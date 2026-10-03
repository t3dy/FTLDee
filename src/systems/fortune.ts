import type { FortuneRank, GameState } from '../core/types.js';
import { notify } from '../core/util.js';
import { fortuneLabel, fortuneText } from './barks.js';

export function fortuneScore(s: GameState): number {
  const money = Math.max(0, Math.min(200, s.resources.money)) / 4;
  const top3 = Object.values(s.factions)
    .map(v => v ?? 0)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
  const promised = Math.min(25, (s.pledges ?? []).reduce((n, p) => n + p.amount, 0) / 8);
  return money + top3 / 8 + promised;
}

export function fortuneRankOf(score: number): FortuneRank {
  if (score < 15) return 0;
  if (score < 30) return 1;
  if (score < 45) return 2;
  if (score < 60) return 3;
  return 4;
}

// Recalculate; on a change of rank, queue a fortune banner. Mutates s.
export function updateFortune(s: GameState): void {
  const rank = fortuneRankOf(fortuneScore(s));
  if (rank === s.fortune) return;
  const rising = rank > s.fortune;
  s.fortune = rank;
  notify(s, {
    kind: 'fortune',
    title: `${rising ? 'Fortune rises' : 'Fortune falls'}: ${fortuneLabel(rank)}`,
    text: fortuneText(rank, rising),
    tone: rising ? 'good' : 'bad',
  });
  s.log.push(`[FORTUNE] ${fortuneLabel(rank)}.`);
}
