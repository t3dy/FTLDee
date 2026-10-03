import type { Book, GameState, MarketStock } from '../core/types.js';
import { createRNG } from '../core/rng.js';
import { hashString } from '../core/util.js';
import { getBook } from '../data/books/index.js';
import { getInstrument } from '../data/cards/instruments.js';
import { getLocation } from '../data/locations/index.js';
import { atBase, canPack } from './skills.js';
import { bark } from './barks.js';

const RESTOCK_DAYS = 20;

export function canAcquireBook(s: GameState, book: Book): boolean {
  return missingPrerequisites(s, book).length === 0;
}

export function missingPrerequisites(s: GameState, book: Book): string[] {
  const have = new Set([...s.knowledgeTags, ...s.library.flatMap(b => b.intellectualTags)]);
  return book.prerequisites.filter(p => !have.has(p));
}

// Mutates s: rolls the market's stock if absent or stale.
export function ensureStockMut(s: GameState, locationId: string): MarketStock | null {
  const loc = getLocation(locationId);
  if (!loc?.market) return null;
  const cur = s.marketStock[locationId];
  if (cur && s.day - cur.day < RESTOCK_DAYS) return cur;
  const rng = createRNG((s.seed ^ hashString(locationId) ^ Math.floor(s.day / RESTOCK_DAYS) * 7919) >>> 0);
  const owned = new Set([...s.library.map(b => b.id), ...s.leftBehind.map(b => b.id)]);
  const books = rng.shuffle(loc.market.bookPool.filter(id => !owned.has(id))).slice(0, loc.market.stockSize);
  const instruments = rng.shuffle(loc.market.instrumentPool.filter(id => !s.instruments.includes(id))).slice(0, 2);
  const stock = { books, instruments, day: s.day };
  s.marketStock[locationId] = stock;
  return stock;
}

export function sellPrice(s: GameState, book: Book): number {
  if (book.value <= 0 || book.author === 'John Dee') return 0;
  return s.household.rooms.library >= 3 ? book.value : Math.floor(book.value / 2);
}

export type BuyBlock = { reason: string } | null;

export function bookBuyBlock(s: GameState, id: string): BuyBlock {
  const book = getBook(id);
  if (!book) return { reason: 'Unknown book.' };
  if (s.library.some(b => b.id === id)) return { reason: 'Already owned.' };
  if (s.resources.money < book.value) return { reason: `Needs £${book.value}.` };
  const missing = missingPrerequisites(s, book);
  if (missing.length) return { reason: `You cannot yet read it: needs ${missing.join(', ')}.` };
  return null;
}

export function buyBookMut(s: GameState, locationId: string, id: string): boolean {
  const book = getBook(id);
  const block = bookBuyBlock(s, id);
  if (!book) return false;
  if (block) {
    const trig = block.reason.startsWith('Needs £') ? 'book_unaffordable' : block.reason.startsWith('You cannot') ? 'book_prereq_missing' : null;
    if (trig) bark(s, trig, { book: book.title, price: book.value }, 'bad');
    return false;
  }
  s.resources.money -= book.value;
  s.library.push({ ...book });
  book.intellectualTags.forEach(t => { if (!s.knowledgeTags.includes(t)) s.knowledgeTags.push(t); });
  book.operationsUnlocked.forEach(op => { if (!s.operations.includes(op)) s.operations.push(op); });
  const stock = s.marketStock[locationId];
  if (stock) stock.books = stock.books.filter(b => b !== id);
  if (!atBase(s)) {
    if (canPack(s, book)) s.satchel.push(id);
    else bark(s, 'satchel_full', { book: book.title });
  }
  s.log.push(`Bought ${book.title} for £${book.value}.`);
  if (book.censorshipStatus === 'forbidden') {
    s.resources.secrecy = Math.max(0, s.resources.secrecy - 5);
    bark(s, 'forbidden_book_bought', { book: book.title, price: book.value }, 'bad');
  } else {
    bark(s, 'book_bought', { book: book.title, price: book.value }, 'good');
  }
  return true;
}

export function sellBookMut(s: GameState, locationId: string, id: string): boolean {
  const book = s.library.find(b => b.id === id);
  if (!book || !getLocation(locationId)?.market) return false;
  const price = sellPrice(s, book);
  if (price <= 0) return false;
  s.resources.money += price;
  s.library = s.library.filter(b => b.id !== id);
  s.satchel = s.satchel.filter(b => b !== id);
  s.log.push(`Sold ${book.title} for £${price}.`);
  bark(s, 'book_sold', { book: book.title, price });
  return true;
}

export function buyInstrumentMut(s: GameState, locationId: string, id: string): boolean {
  const inst = getInstrument(id);
  if (!inst || s.instruments.includes(id) || s.resources.money < inst.price) return false;
  s.resources.money -= inst.price;
  s.instruments.push(id);
  const stock = s.marketStock[locationId];
  if (stock) stock.instruments = stock.instruments.filter(i => i !== id);
  s.log.push(`Bought ${inst.name} for £${inst.price}.`);
  return true;
}
