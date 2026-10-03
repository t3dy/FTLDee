import type { CardCategory } from '../core/types.js';
import { el, button, help, historicalBadge } from './render.js';
import { glyph } from './glyphs.js';
import { buildCards, CATEGORY_LABELS, type Card } from '../data/cards/index.js';

export interface CodexUi {
  category: CardCategory | 'all';
  query: string;
  open: string | null;
}

export interface CodexActions {
  setCategory: (c: CardCategory | 'all') => void;
  setQuery: (q: string) => void;
  open: (id: string | null) => void;
}

let cache: Card[] | null = null;

export function renderCodex(ui: CodexUi, a: CodexActions): HTMLElement {
  cache ??= buildCards();
  const wrap = el('div', { class: 'codex-screen' });
  wrap.appendChild(el('h1', {}, 'Codex'));
  wrap.appendChild(el('p', { class: 'lede' },
    `Every object in the game is a card: ${cache.length} of them. Each carries its historical status and its sources.`));

  const filters = help(el('div', { class: 'codex-filters' }), 'codex-filter');
  const counts = new Map<string, number>();
  for (const c of cache) counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
  filters.appendChild(button(`All (${cache.length})`, () => a.setCategory('all'), `btn btn--small${ui.category === 'all' ? ' btn--primary' : ''}`));
  for (const [k, label] of Object.entries(CATEGORY_LABELS) as [CardCategory, string][]) {
    if (!counts.get(k)) continue;
    filters.appendChild(button(`${label} (${counts.get(k)})`, () => a.setCategory(k), `btn btn--small${ui.category === k ? ' btn--primary' : ''}`));
  }
  const search = el('input', { class: 'codex-search', type: 'search', placeholder: 'Search cards…', value: ui.query, 'aria-label': 'Search cards' });
  search.addEventListener('change', () => a.setQuery((search as HTMLInputElement).value));
  filters.appendChild(search);
  wrap.appendChild(filters);

  const q = ui.query.trim().toLowerCase();
  const shown = cache.filter(c => (ui.category === 'all' || c.category === ui.category)
    && (!q || `${c.name} ${c.subtitle} ${c.summary} ${c.sources.join(' ')}`.toLowerCase().includes(q)));
  const grid = el('div', { class: 'codex-grid' });
  for (const c of shown) {
    const openCard = ui.open === `${c.category}:${c.id}`;
    const card = el('article', { class: `codex-card codex-card--${c.category} codex-card--${c.historicalStatus}${openCard ? ' codex-card--open' : ''}` });
    const headBtn = el('button', { class: 'codex-card-head', type: 'button' }, glyph(c.glyph, 26),
      el('span', { class: 'codex-card-titles' }, el('strong', {}, c.name), el('span', {}, c.subtitle)),
      historicalBadge(c.historicalStatus));
    headBtn.addEventListener('click', () => a.open(openCard ? null : `${c.category}:${c.id}`));
    card.appendChild(headBtn);
    card.appendChild(el('p', { class: 'codex-summary' }, c.summary));
    if (openCard) {
      if (c.rules.length) card.appendChild(el('ul', { class: 'codex-rules' }, ...c.rules.map(r => el('li', {}, r))));
      if (c.flavor) card.appendChild(el('p', { class: 'flavor' }, c.flavor));
      card.appendChild(el('p', { class: 'sources' }, c.sources.length ? `Sources: ${c.sources.join('; ')}` : 'No source cited.'));
      card.appendChild(el('p', { class: 'codex-id' }, `${CATEGORY_LABELS[c.category]} · ${c.id}`));
    }
    grid.appendChild(card);
  }
  wrap.appendChild(grid);
  return wrap;
}
