import type { GameState, Encounter, EncounterChoice } from '../core/types.js';
import { el, button, help, historicalBadge } from './render.js';
import { requirementChecks } from '../systems/requirements.js';
import { BIOGRAPHY_LINKS } from '../data/encounters/index.js';
import { getBiographyEntry, getBiographyForEncounter } from '../data/biography/index.js';

type ChoiceCallback = (choiceId: string) => void;

const PARTICIPANTS: Record<string, string> = {
  elizabeth: 'Elizabeth I', walsingham: 'Sir Francis Walsingham', jane_dee: 'Jane Dee', roger_cooke: 'Roger Cooke',
  philip_sidney: 'Philip Sidney', leicester_agent: 'Leicester\'s associate', laski: 'Albert Łaski',
  barnabas_saul: 'Barnabas Saul', edward_kelley: 'Edward Kelley', hajek: 'Tadeáš Hájek', rudolf_ii: 'Rudolf II',
  pucci: 'Francesco Pucci', malaspina: 'Germanicus Malaspina',
};

export function renderEncounter(s: GameState, encounter: Encounter, onChoice: ChoiceCallback): HTMLElement {
  const box = el('div', { class: 'event-window' });
  const head = el('div', { class: 'event-head' },
    historicalBadge(encounter.historicalStatus),
    el('h1', {}, encounter.title),
    encounter.participants.length ? el('p', { class: 'event-who' }, encounter.participants.map(p => PARTICIPANTS[p] ?? p).join(' · ')) : null,
  );
  box.appendChild(head);

  const text = el('div', { class: 'event-text' });
  for (const para of encounter.description.split('\n\n')) if (para.trim()) text.appendChild(el('p', {}, para.trim()));
  if (encounter.flavorText) text.appendChild(el('blockquote', {}, encounter.flavorText));
  box.appendChild(text);

  const choices = el('ol', { class: 'event-choices' });
  encounter.choices.forEach(c => choices.appendChild(renderChoice(s, c, onChoice)));
  box.appendChild(choices);

  const record = renderRecord(encounter);
  if (record) box.appendChild(record);
  return box;
}

function renderChoice(s: GameState, c: EncounterChoice, onChoice: ChoiceCallback): HTMLElement {
  const checks = c.requirements ? requirementChecks(s, c.requirements) : [];
  const ok = checks.every(x => x.met);
  const li = el('li', { class: `event-choice${c.isBlueOption ? ' event-choice--blue' : ''}${ok ? '' : ' event-choice--locked'}` });
  if (c.isBlueOption) li.appendChild(help(el('span', { class: 'blue-tag' }, c.blueLabel ?? 'Requires'), ok ? 'encounter-blue-option' : 'encounter-locked'));
  const line = button(c.text, () => onChoice(c.id), 'event-choice-btn', ok ? null : 'Your repertoire does not yet support this.');
  li.appendChild(line);
  if (checks.length) {
    const chips = el('div', { class: 'chips' });
    for (const ch of checks) {
      chips.appendChild(el('span', { class: ch.met ? 'chip chip--met' : 'chip chip--unmet', title: ch.detail ?? '' },
        ch.label + (ch.detail ? ` (${ch.detail})` : '')));
    }
    li.appendChild(chips);
  }
  const costs: string[] = [];
  if (c.costs?.time) costs.push(`${c.costs.time} days`);
  if (c.costs?.money) costs.push(`£${c.costs.money}`);
  if (c.costs?.focus) costs.push(`Focus −${c.costs.focus}`);
  if (costs.length) li.appendChild(el('span', { class: 'event-costs' }, costs.join(' · ')));
  return li;
}

function renderRecord(encounter: Encounter): HTMLElement | null {
  const ids = new Set([...(BIOGRAPHY_LINKS[encounter.id] ?? []), ...getBiographyForEncounter(encounter.id).map(e => e.id)]);
  const entries = [...ids].map(id => getBiographyEntry(id)).filter(e => !!e);
  if (!entries.length && !encounter.sources?.length) return null;
  const box = el('details', { class: 'event-record' });
  box.appendChild(el('summary', {}, 'In the record'));
  if (encounter.sources?.length) box.appendChild(el('p', { class: 'sources' }, 'This event: ', encounter.sources.join('; ')));
  for (const e of entries) {
    box.appendChild(el('div', { class: 'record-entry' },
      el('strong', {}, e!.label), ' ', historicalBadge(e!.historicalStatus),
      el('p', {}, e!.description),
      e!.sources.length ? el('p', { class: 'sources' }, e!.sources.join('; ')) : null));
  }
  return box;
}
