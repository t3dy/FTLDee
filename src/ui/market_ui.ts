import type { GameState } from '../core/types.js';
import { el, button, help } from './render.js';
import { glyph } from './glyphs.js';
import { bookCard } from './library_ui.js';
import { getBook } from '../data/books/index.js';
import { getInstrument } from '../data/cards/instruments.js';
import { getLocation } from '../data/locations/index.js';
import { bookBuyBlock, sellPrice } from '../systems/market.js';
import { skillName } from '../data/cards/skills.js';

export interface MarketActions {
  buyBook: (id: string) => void;
  sellBook: (id: string) => void;
  buyInstrument: (id: string) => void;
}

export function renderMarket(s: GameState, a: MarketActions): HTMLElement {
  const loc = getLocation(s.currentLocationId);
  const wrap = el('div', { class: 'market-screen' });
  if (!loc?.market) {
    wrap.appendChild(el('p', {}, 'There is no market here.'));
    return wrap;
  }
  const stock = s.marketStock[loc.id] ?? { books: [], instruments: [], day: s.day };
  wrap.appendChild(el('div', { class: 'market-head' }, glyph('coin', 30),
    el('div', {}, el('h1', {}, loc.market.name), el('p', { class: 'lede' },
      `Stock turns over every 20 days (next around day ${stock.day + 20}). You have £${s.resources.money}. Forbidden books cost Secrecy as well as money; a book you lack the grounding for cannot be bought.`))));

  wrap.appendChild(el('h2', {}, 'Books'));
  const books = el('div', { class: 'store-grid' });
  if (!stock.books.length) books.appendChild(el('p', { class: 'hint' }, 'Sold out until the next shipment.'));
  for (const id of stock.books) {
    const b = getBook(id);
    if (!b) continue;
    const block = bookBuyBlock(s, id);
    const foot = el('div', { class: 'book-card-foot' },
      el('span', { class: 'price' }, `£${b.value}`),
      button(block ? 'Unavailable' : 'Buy', () => a.buyBook(id), 'btn btn--buy', block?.reason));
    const extra: Node[] = [foot];
    if (block) extra.push(el('p', { class: 'upgrade-why' }, block.reason));
    books.appendChild(help(bookCard(b, extra), 'market-book-card'));
  }
  wrap.appendChild(books);

  wrap.appendChild(el('h2', {}, 'Instruments'));
  const inst = el('div', { class: 'store-grid store-grid--small' });
  for (const id of stock.instruments) {
    const i = getInstrument(id);
    if (!i) continue;
    const why = s.instruments.includes(id) ? 'Owned.' : s.resources.money < i.price ? `Needs £${i.price}.` : null;
    inst.appendChild(help(el('div', { class: `book-card book-card--${i.rarity}` },
      el('div', { class: 'book-card-head' }, glyph(i.glyph, 26), el('div', { class: 'book-card-titles' }, el('strong', {}, i.name), el('span', {}, i.kind))),
      el('p', { class: 'book-notes' }, i.summary),
      el('div', { class: 'chips' },
        ...Object.entries(i.skillBonus ?? {}).map(([k, v]) => el('span', { class: 'chip chip--bonus' }, `+${v} ${skillName(k)}`)),
        i.satchelBonus ? el('span', { class: 'chip chip--bonus' }, `+${i.satchelBonus} satchel slots`) : null,
        el('span', { class: 'chip' }, i.baseOnly ? 'works at the house' : 'works anywhere'),
        el('span', { class: `hist-badge hist-${i.historicalStatus}` }, i.historicalStatus)),
      el('div', { class: 'book-card-foot' }, el('span', { class: 'price' }, `£${i.price}`), button('Buy', () => a.buyInstrument(id), 'btn btn--buy', why)),
    ), 'market-instrument-card'));
  }
  if (!stock.instruments.length) inst.appendChild(el('p', { class: 'hint' }, 'No instruments today.'));
  wrap.appendChild(inst);

  wrap.appendChild(el('h2', {}, 'Sell'));
  const sell = help(el('div', { class: 'sell-list' }), 'market-sell');
  const sellable = s.library.filter(b => sellPrice(s, b) > 0);
  if (!sellable.length) sell.appendChild(el('p', { class: 'hint' }, 'Nothing you could sell.'));
  for (const b of sellable) {
    sell.appendChild(el('div', { class: 'sell-row' }, glyph(b.glyph, 18), el('span', {}, b.title),
      el('span', { class: 'price' }, `£${sellPrice(s, b)}`), button('Sell', () => a.sellBook(b.id), 'btn btn--small')));
  }
  wrap.appendChild(sell);
  return wrap;
}
