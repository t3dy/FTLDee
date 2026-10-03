import type { ErrandCard } from '../../core/types.js';

// Errands are away missions: a crew member leaves the base, travels to the
// node, works, and returns. Success = d10 + crew skill >= difficulty.

export const ERRAND_CARDS: ErrandCard[] = [
  {
    id: 'errand_pauls_books', name: 'Buy books at Paul\'s Churchyard', glyph: 'book',
    summary: 'Send someone with £15 to buy from the booksellers\' current stock.',
    historicalStatus: 'plausible', skill: 'manuscriptKnowledge', difficulty: 7, workDays: 1, cost: 15,
    marketPurchase: true, sources: [],
    success: { description: 'returned from Paul\'s Churchyard with a purchase.', reputation: { scholarNetwork: 1 } },
    failure: { description: 'found nothing worth buying and brought back £5 of the purse.', money: 5 },
  },
  {
    id: 'errand_city_news', name: 'Gather news in the City', glyph: 'eye',
    summary: 'Listen at the Exchange and the booksellers for who is rising and who is falling.',
    historicalStatus: 'plausible', skill: 'courtlyIntelligence', difficulty: 8, workDays: 2, cost: 2, sources: [],
    success: { description: 'brought back useful news from the City.', reputation: { merchantNetwork: 3, walsingham: 1 }, contactsGained: ['court_information'] },
    failure: { description: 'heard only rumours.' },
  },
  {
    id: 'errand_petition', name: 'Carry a petition to court', glyph: 'crown',
    summary: 'Deliver a letter of suit and wait in the presence chamber for an answer.',
    historicalStatus: 'plausible', skill: 'rhetoric', difficulty: 9, workDays: 2, cost: 3, sources: ['Parry'],
    success: { description: 'delivered the petition and was well received.', reputation: { elizabeth: 3, burghley: 2 }, money: 6 },
    failure: { description: 'waited three days and was not admitted.', reputation: { elizabeth: -1 } },
  },
  {
    id: 'errand_ciphers', name: 'Deliver deciphered letters', glyph: 'key',
    summary: 'Take worked ciphers to Barn Elms. Walsingham pays for results and remembers failures.',
    historicalStatus: 'plausible', skill: 'cryptography', difficulty: 9, workDays: 1, cost: 1, sources: [],
    success: { description: 'delivered the deciphered letters to Barn Elms.', reputation: { walsingham: 5 }, money: 8 },
    failure: { description: 'brought back an incomplete solution.', reputation: { walsingham: -2 } },
  },
  {
    id: 'errand_manuscript_hunt', name: 'Hunt manuscripts in the colleges', glyph: 'scroll',
    summary: 'Search Oxford for monastic manuscripts dispersed at the Dissolution, as Dee had urged Queen Mary to do in 1556.',
    historicalStatus: 'plausible', skill: 'manuscriptKnowledge', difficulty: 9, workDays: 4, cost: 6,
    sources: ['Parry 58–61 (the 1556 Supplication)', 'Håkansson 12–14'],
    success: { description: 'found a Roger Bacon manuscript in a college chest.', booksGained: ['bacon_epistola'], reputation: { scholarNetwork: 3 } },
    failure: { description: 'found the chests already picked over.' },
  },
  {
    id: 'errand_navigators', name: 'Consult the navigators', glyph: 'ship',
    summary: 'Sit with the masters and pilots at Deptford over charts and declinations.',
    historicalStatus: 'plausible', skill: 'navigation', difficulty: 8, workDays: 2, cost: 2, sources: [],
    success: { description: 'came back with the pilots\' own observations.', reputation: { merchantNetwork: 4, leicester: 1 }, flagsSet: ['navigation_contacts'] },
    failure: { description: 'was told the pilots trust their own rutters.' },
  },
  {
    id: 'errand_muscovy_charts', name: 'Correct the Company\'s charts', glyph: 'ship',
    summary: 'Send someone with your tables to work over the Muscovy Company\'s charts with its pilots.',
    historicalStatus: 'plausible', skill: 'navigation', difficulty: 8, workDays: 3, cost: 1, sources: ['Parry 65–68'],
    success: { description: 'came back with a fee and the pilots\' thanks.', money: 8, reputation: { merchantNetwork: 3 } },
    failure: { description: 'was told the Company had its own men for that.' },
  },
  {
    id: 'errand_curtius', name: 'Wait on Dr Curtius', glyph: 'tower',
    summary: 'Rudolf named Dr Curtius as go-between for Dee\'s audiences and papers. Someone must keep him supplied.',
    historicalStatus: 'documented', skill: 'rhetoric', difficulty: 9, workDays: 2, cost: 2, sources: ['Whitby 44–46'],
    success: { description: 'left papers with Curtius, who promised to place them before the Emperor.', reputation: { continentalCourts: 4 } },
    failure: { description: 'was told the Emperor was occupied.' },
  },
  {
    id: 'errand_prague_books', name: 'Buy books in the Old Town', glyph: 'book',
    summary: 'Prague\'s printers and booksellers, with £15.',
    historicalStatus: 'plausible', skill: 'languages', difficulty: 7, workDays: 1, cost: 15, marketPurchase: true, sources: [],
    success: { description: 'returned from the Old Town booksellers with a purchase.', reputation: { scholarNetwork: 1 } },
    failure: { description: 'found nothing suitable and brought back £5 of the purse.', money: 5 },
  },
  {
    id: 'errand_curiosities', name: 'Show curiosities at the castle', glyph: 'tower',
    summary: 'Court servants at the Hradschin trade in access to the Emperor\'s collection.',
    historicalStatus: 'plausible', skill: 'courtlyIntelligence', difficulty: 10, workDays: 2, cost: 5, sources: ['Parry 223–226'],
    success: { description: 'was admitted among the curiosities and made a useful acquaintance.', reputation: { continentalCourts: 5 } },
    failure: { description: 'got no further than the outer court.' },
  },
];

export const INTERNAL_ERRANDS: ErrandCard[] = [
  {
    id: 'family_follows', name: 'Following from Kraków', glyph: 'road',
    summary: 'Jane and the children stay in Kraków and come on to Prague later.',
    historicalStatus: 'documented', skill: 'rhetoric', difficulty: 0, workDays: 0, cost: 0, sources: ['Whitby 46–48'],
    success: { description: 'arrives in Prague with the children.' },
    failure: { description: 'arrives in Prague with the children.' },
  },
];

export function getErrand(id: string): ErrandCard | undefined {
  return ERRAND_CARDS.find(e => e.id === id) ?? INTERNAL_ERRANDS.find(e => e.id === id);
}
