import type { Book, GameState } from '../core/types.js';
import { el, button, help } from './render.js';
import { glyph } from './glyphs.js';
import { atBase, satchelCapacity, satchelUsed, slotCost, canPack, usableBookIds } from '../systems/skills.js';
import { skillName } from '../data/cards/skills.js';
import { getInstrument } from '../data/cards/instruments.js';

export function bookCard(b: Book, extra: Node[] = [], cls = ''): HTMLElement {
  const card = el('div', { class: `book-card book-card--${b.rarity} ${cls}` });
  card.appendChild(el('div', { class: 'book-card-head' }, glyph(b.glyph, 26),
    el('div', { class: 'book-card-titles' }, el('strong', {}, b.title), el('span', {}, `${b.author}, ${b.date}`))));
  const tags = el('div', { class: 'chips' },
    el('span', { class: 'chip' }, b.subject),
    el('span', { class: 'chip' }, `${b.portability} · ${slotCost(b) >= 99 ? 'cannot travel' : `${slotCost(b)} slot${slotCost(b) > 1 ? 's' : ''}`}`),
    b.censorshipStatus !== 'open' ? el('span', { class: `chip chip--${b.censorshipStatus}` }, b.censorshipStatus) : null,
    ...Object.entries(b.skillBonus ?? {}).map(([k, v]) => el('span', { class: 'chip chip--bonus' }, `+${v} ${skillName(k)}`)),
    el('span', { class: `hist-badge hist-${b.historicalStatus}` }, b.historicalStatus),
  );
  card.appendChild(tags);
  card.appendChild(el('p', { class: 'book-notes' }, b.notes));
  if (b.operationsUnlocked.length) card.appendChild(el('p', { class: 'book-ops' }, 'Opens: ', b.operationsUnlocked.slice(0, 4).join(', ')));
  if (b.sources.length) card.appendChild(el('p', { class: 'sources' }, b.sources.join('; ')));
  for (const n of extra) card.appendChild(n);
  return card;
}

export function renderLibrary(s: GameState, toggle: (id: string) => void): HTMLElement {
  const wrap = el('div', { class: 'library-screen' });
  const home = atBase(s);
  const used = satchelUsed(s);
  const cap = satchelCapacity(s);
  wrap.appendChild(el('h1', {}, 'Library and Satchel'));
  wrap.appendChild(el('p', { class: 'lede' }, home
    ? 'At the house every book on the shelves can be used. Only the satchel travels: pack what the next journey will need. If the household ever leaves England, only the satchel crosses.'
    : 'You are away from the house. Only the books in the satchel can be used here; you can repack when you return.'));

  const satchel = help(el('div', { class: 'satchel' }), 'satchel-slots');
  satchel.appendChild(el('div', { class: 'satchel-head' }, glyph('chest', 22), el('strong', {}, `Travelling satchel: ${used}/${cap} slots`)));
  const slots = el('div', { class: 'satchel-slots' });
  const packed = s.satchel.map(id => s.library.find(b => b.id === id)).filter((b): b is Book => !!b);
  for (const b of packed) {
    for (let i = 0; i < slotCost(b); i++) {
      slots.appendChild(el('div', { class: `slot slot--full${i > 0 ? ' slot--cont' : ''}` }, i === 0 ? glyph(b.glyph, 18) : '', i === 0 ? el('span', {}, b.title) : ''));
    }
  }
  for (let i = used; i < cap; i++) slots.appendChild(el('div', { class: 'slot' }, 'empty'));
  satchel.appendChild(slots);
  const bonus = s.instruments.map(getInstrument).filter(i => i?.satchelBonus).map(i => `${i!.name} +${i!.satchelBonus}`);
  if (bonus.length) satchel.appendChild(el('p', { class: 'hint' }, bonus.join('; ')));
  wrap.appendChild(satchel);

  const usable = usableBookIds(s);
  const shelves = el('div', { class: 'shelf-grid' });
  for (const b of s.library) {
    const inSatchel = s.satchel.includes(b.id);
    const why = !home ? 'Repack at the house.' : !inSatchel && !canPack(s, b) ? (slotCost(b) >= 99 ? 'Too large to travel.' : 'Satchel full.') : null;
    const btn = button(inSatchel ? 'Leave at the house' : 'Pack in satchel', () => toggle(b.id), `btn btn--small${inSatchel ? '' : ' btn--primary'}`, why);
    shelves.appendChild(bookCard(b, [el('div', { class: 'book-card-foot' },
      el('span', { class: usable.has(b.id) ? 'usable' : 'unusable' }, usable.has(b.id) ? 'usable here' : 'not usable here'), btn)],
      inSatchel ? 'book-card--packed' : ''));
  }
  wrap.appendChild(el('h2', {}, `Shelves (${s.library.length})`));
  wrap.appendChild(shelves);
  if (s.leftBehind.length) {
    wrap.appendChild(el('h2', {}, `Left at Mortlake (${s.leftBehind.length})`));
    wrap.appendChild(el('p', { class: 'hint' }, s.leftBehind.map(b => b.title).join('; ')));
  }
  return wrap;
}
