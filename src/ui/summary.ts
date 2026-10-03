import type { GameState } from '../core/types.js';
import { el, button, historicalBadge, factionLabel } from './render.js';
import { fortuneLabel } from '../systems/barks.js';

const ENDINGS: Array<[string, string, string]> = [
  ['career_collapse', 'Examined [Career collapse]', 'Secrecy ran out. As in 1555, the conjuror is summoned and examined; this time there is no patron to stand between him and the Council.'],
  ['went_to_trebon', 'South to Třeboň', 'Prague closed; the household goes to Rožmberk\'s estates, as it did in 1586.'],
  ['went_to_erfurt', 'Waiting at Erfurt', 'The household withdraws into Germany to wait for a recall.'],
  ['ottoman_path_taken', 'East, as a guest [COUNTERFACTUAL]', 'Dee goes to Murad III\'s court instead of Rudolf\'s. The record has the angels promising a Cross in Constantinople; this run turned the promise around.'],
  ['stayed_in_england', 'England [Contrary to the record]', 'Dee declines Łaski and stays at Mortlake to petition again.'],
];

export function renderSummary(s: GameState, newRun: (seed: number) => void): HTMLElement {
  const ending = ENDINGS.find(([f]) => s.flags.includes(f));
  const wrap = el('div', { class: 'summary-screen' });
  wrap.appendChild(el('h1', {}, 'The Career'));
  if (ending) wrap.appendChild(el('div', { class: 'panel' }, el('h2', {}, ending[1]), el('p', {}, ending[2])));
  wrap.appendChild(el('p', { class: 'lede' },
    `Day ${s.day}. Fortune: ${fortuneLabel(s.fortune)}. £${s.resources.money}. ${s.library.length} books with you, ${s.leftBehind.length} left at Mortlake. House: ${s.household.name}.`));

  const fac = el('div', { class: 'panel summary-factions' }, el('h2', {}, 'Patrons and networks'));
  for (const [k, v] of Object.entries(s.factions)) fac.appendChild(el('div', { class: 'summary-row' }, el('span', {}, factionLabel(k)), el('strong', {}, String(v))));
  wrap.appendChild(fac);

  const log = el('div', { class: 'panel' }, el('h2', {}, 'What happened'));
  for (const e of s.careerEvents) log.appendChild(el('p', { class: 'career-event' }, `Day ${e.day} `, historicalBadge(e.historicalStatus), ` ${e.description}`));
  wrap.appendChild(log);

  wrap.appendChild(el('div', { class: 'start-btns' },
    button('Same seed again', () => newRun(s.seed), 'btn btn--primary'),
    button('New career', () => newRun(Date.now() >>> 0), 'btn')));
  return wrap;
}
