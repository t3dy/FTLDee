import type { GameState } from '../core/types.js';
import { el, historicalBadge } from './render.js';
import { glyph } from './glyphs.js';
import { ASSOCIATE_CARDS, type AssociateCard, type AssociateRole } from '../data/cards/associates.js';
import { getLocation } from '../data/locations/index.js';
import { factionLabel } from './render.js';

const ROLE_LABELS: Record<AssociateRole, string> = {
  patron: 'Patrons', agent: 'Agents and informers', merchant: 'Merchants and printers', scholar: 'Scholars',
  kin: 'Kin and keepers', creditor: 'Creditors', danger: 'Dangers', scryer: 'Scryers',
};

export function isMet(s: GameState, a: AssociateCard): boolean {
  return a.metBy.some(k => s.flags.includes(k) || s.completedEncounterIds.includes(k)
    || s.knowledgeTags.includes(k) || s.weatherEvents.some(w => w.id === k && w.triggered));
}

export function renderNetwork(s: GameState): HTMLElement {
  const wrap = el('div', { class: 'network-screen' });
  const met = ASSOCIATE_CARDS.filter(a => isMet(s, a));
  wrap.appendChild(el('h1', {}, 'Network'));
  wrap.appendChild(el('p', { class: 'lede' },
    `Patrons, merchants, scholars, kin, creditors and the people who report on you. You have met ${met.length} of ${ASSOCIATE_CARDS.length}. The unmet are shown by where they can be found.`));

  for (const role of Object.keys(ROLE_LABELS) as AssociateRole[]) {
    const people = ASSOCIATE_CARDS.filter(a => a.role === role);
    if (!people.length) continue;
    wrap.appendChild(el('h2', {}, ROLE_LABELS[role]));
    const grid = el('div', { class: 'network-grid' });
    for (const a of people) {
      const known = isMet(s, a);
      const where = getLocation(a.locationId)?.name ?? a.locationId;
      grid.appendChild(el('div', { class: `network-card network-card--${a.role}${known ? '' : ' network-card--unmet'}` },
        el('div', { class: 'card-head' }, glyph(a.glyph, 22),
          el('div', { class: 'network-titles' }, el('strong', {}, known ? a.name : '— not yet met —'),
            el('span', {}, `${where}${a.faction ? ` · ${factionLabel(a.faction)} ${s.factions[a.faction] ?? 0}` : ''}`)),
          historicalBadge(a.historicalStatus)),
        known ? el('p', {}, a.summary) : el('p', { class: 'hint' }, `Someone of note can be found at ${where}.`),
        known ? el('p', { class: 'network-offers' }, a.offers) : null,
        known && a.sources.length ? el('p', { class: 'sources' }, a.sources.join('; ')) : null,
      ));
    }
    wrap.appendChild(grid);
  }
  return wrap;
}
