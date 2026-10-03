import type { FactionId, GameState, RequirementSpec, RoomId, SkillId } from '../core/types.js';
import { atBase, bestSkill, usableBookIds } from './skills.js';
import { getBook } from '../data/books/index.js';
import { getInstrument } from '../data/cards/instruments.js';
import { getRoomCard } from '../data/cards/rooms.js';
import { skillName } from '../data/cards/skills.js';
import { FACTION_CARDS } from '../data/cards/factions.js';

export interface Check {
  label: string;
  met: boolean;
  detail?: string;
}

function crewPresent(s: GameState, id: string): boolean {
  const p = s.crewPosts[id];
  if (!p || p.kind === 'errand') return false;
  return atBase(s) || p.kind === 'retinue';
}

export function requirementChecks(s: GameState, req: RequirementSpec): Check[] {
  const out: Check[] = [];
  for (const [k, v] of Object.entries(req.skills ?? {}) as [SkillId, number][]) {
    const best = bestSkill(s, k);
    const who = best.who === 'dee' ? '' : ` via ${s.crew.find(c => c.id === best.who)?.name ?? best.who}`;
    out.push({ label: `${skillName(k)} ${best.value}/${v}`, met: best.value >= v, detail: who });
  }
  const usable = usableBookIds(s);
  for (const id of req.books ?? []) {
    const owned = s.library.some(b => b.id === id);
    const title = getBook(id)?.title ?? id;
    out.push({ label: title, met: usable.has(id), detail: owned && !usable.has(id) ? 'left at the house — pack it' : undefined });
  }
  for (const id of req.instruments ?? []) {
    out.push({ label: getInstrument(id)?.name ?? id, met: s.instruments.includes(id) });
  }
  for (const [k, v] of Object.entries(req.rooms ?? {}) as [RoomId, number][]) {
    out.push({ label: `${getRoomCard(k).name} ${s.household.rooms[k]}/${v}`, met: s.household.rooms[k] >= v });
  }
  for (const id of req.crew ?? []) {
    const name = s.crew.find(c => c.id === id)?.name ?? id.replace(/_/g, ' ');
    out.push({ label: name, met: crewPresent(s, id), detail: atBase(s) ? undefined : 'must be in the retinue' });
  }
  for (const id of req.contacts ?? []) {
    out.push({ label: `Contact: ${id.replace(/_/g, ' ')}`, met: s.knowledgeTags.includes(`contact:${id}`) });
  }
  for (const [k, v] of Object.entries(req.minFaction ?? {}) as [FactionId, number][]) {
    const have = s.factions[k] ?? 0;
    out.push({ label: `${FACTION_CARDS.find(f => f.id === k)?.name ?? k} ${have}/${v}`, met: have >= v });
  }
  if (req.minMoney !== undefined) out.push({ label: `£${req.minMoney}`, met: s.resources.money >= req.minMoney });
  for (const f of req.flags ?? []) out.push({ label: f.replace(/_/g, ' '), met: s.flags.includes(f) });
  for (const f of req.notFlags ?? []) out.push({ label: `not: ${f.replace(/_/g, ' ')}`, met: !s.flags.includes(f) });
  return out;
}

export function meetsSpec(s: GameState, req: RequirementSpec): boolean {
  return requirementChecks(s, req).every(c => c.met);
}
