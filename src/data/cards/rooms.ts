import type { RoomCard, BaseLayout, RoomId } from '../../core/types.js';

// Room cards are the ship's systems. Level effects are implemented in
// src/systems/rooms.ts; the text here is what the player reads.

export const ROOM_CARDS: RoomCard[] = [
  {
    id: 'library',
    name: 'Library',
    summary: 'The working collection. At the base, every book on these shelves can be used; on the road only the travelling satchel comes with you.',
    historicalStatus: 'documented',
    keySkills: ['manuscriptKnowledge', 'naturalPhilosophy'],
    stations: 2,
    sources: ['Whitby 21–24 (near four thousand items, a quarter manuscripts)', 'Sherman, "Readings"', 'Håkansson 12–14'],
    glyph: 'library',
    flavor: '"Hardly gotten moniments" — Dee on the manuscripts he rescued (quoted in Håkansson 12–14).',
    levels: [
      { level: 1, cost: 15, days: 4, label: 'Shelves', effect: 'All owned books usable at the base.' },
      { level: 2, cost: 40, days: 10, label: 'The Mortlake library', effect: '+1 Manuscript Knowledge and Natural Philosophy at the base.' },
      { level: 3, cost: 35, days: 14, label: 'A full catalogue', effect: '+2 to key skills. Books sell for their full value. (Dee had his library catalogued in September 1583, before leaving England.)',
        requires: { skills: { manuscriptKnowledge: 7 } } },
    ],
  },
  {
    id: 'study',
    name: 'Study',
    summary: 'Where Dee reads, calculates and writes. Restores Focus each day spent at the base.',
    historicalStatus: 'plausible',
    keySkills: ['mathematics', 'rhetoric'],
    stations: 1,
    sources: ['Fenton, Diaries (daily work at Mortlake)'],
    glyph: 'quill',
    levels: [
      { level: 1, cost: 10, days: 3, label: 'Writing desk', effect: '+1 Focus per day at the base.' },
      { level: 2, cost: 25, days: 6, label: 'Working study', effect: '+2 Focus per day; +1 Mathematics and Rhetoric at the base.' },
      { level: 3, cost: 45, days: 10, label: 'Study of a universal philosopher', effect: '+3 Focus per day; +2 to key skills.' },
    ],
  },
  {
    id: 'scriptorium',
    name: 'Scriptorium',
    summary: 'Copying tables, manuscripts and cipher. Copies can be sold or sent; cipher work is easier with a copyist at the desk.',
    historicalStatus: 'plausible',
    keySkills: ['cryptography', 'languages'],
    stations: 2,
    sources: ['Whitby 114–117 (the letter tables of the Book of Enoch)', 'Clucas, Ambix 64.2 (Dee to Cecil on the Steganographia, 1563)'],
    glyph: 'scroll',
    levels: [
      { level: 1, cost: 12, days: 4, label: 'Copying desk', effect: 'Unlocks copying a manuscript for sale at the base.' },
      { level: 2, cost: 30, days: 7, label: 'Scriptorium', effect: '+1 Cryptography and Languages at the base.' },
      { level: 3, cost: 40, days: 10, label: 'Copyists at work', effect: '+2 to key skills.', requires: { skills: { cryptography: 6 } } },
    ],
  },
  {
    id: 'correspondence',
    name: 'Correspondence',
    summary: 'Letters to Antwerp, Prague and Kraków. Slows the drift of the scholarly and continental networks.',
    historicalStatus: 'documented',
    keySkills: ['courtlyIntelligence', 'languages'],
    stations: 1,
    sources: ['Clulee, Ambix 52.3 (letters through his agent in Antwerp, 1580)', 'Szőnyi 259 (Hájek–Dudith letters)'],
    glyph: 'letter',
    levels: [
      { level: 1, cost: 8, days: 2, label: 'Letters kept', effect: 'Scholar and Continental standing drift down more slowly.' },
      { level: 2, cost: 20, days: 5, label: 'Agents abroad', effect: 'No drift; +1 Courtly Intelligence and Languages at the base.' },
      { level: 3, cost: 35, days: 8, label: 'A network of correspondents', effect: '+2 to key skills; errands gain +1 faction.' },
    ],
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    summary: 'Furnaces, glass and minerals. Dee kept three laboratories at Mortlake; they were despoiled while he was abroad.',
    historicalStatus: 'documented',
    keySkills: ['alchemy', 'medicine'],
    stations: 2,
    sources: ['Sherman, "Readings" (three laboratories)', 'Whitby 21–24, 37–39'],
    glyph: 'flask',
    levels: [
      { level: 1, cost: 20, days: 5, label: 'A furnace and a still', effect: 'Alchemical operations possible at the base. Two Ripley books read together give +2 Alchemy (a book opens a book).' },
      { level: 2, cost: 35, days: 8, label: 'Two laboratories', effect: '+1 Alchemy and Medicine at the base.', requires: { skills: { alchemy: 4 } } },
      { level: 3, cost: 50, days: 12, label: '"My three laboratories, serving for Pyrotechnia"', effect: '+2 to key skills. Continental patrons take notice. (Dee\'s own phrase.)', requires: { skills: { alchemy: 6 } } },
    ],
  },
  {
    id: 'scryingChamber',
    name: 'Scrying Chamber',
    summary: 'The room of the actions with spirits. Each level needs the apparatus the angels specify.',
    historicalStatus: 'documented',
    keySkills: ['occultPhilosophy', 'kabbalah'],
    stations: 2,
    sources: ['Whitby 27–29 (Barnabas Saul, 1581)', 'Whitby 120–124 (Holy Table, Sigillum Dei, show-stone)'],
    glyph: 'crystal',
    levels: [
      { level: 1, cost: 10, days: 3, label: 'Show-stone on a table', effect: 'Scrying sessions possible.',
        requires: { instruments: ['show_stone'], skills: { occultPhilosophy: 5 } } },
      { level: 2, cost: 20, days: 6, label: 'The Sigillum Dei', effect: '+1 Occult Philosophy and Kabbalah at the base.',
        requires: { instruments: ['sigillum_dei'] } },
      { level: 3, cost: 30, days: 8, label: 'The Holy Table', effect: '+2 to key skills. The apparatus is complete.',
        requires: { instruments: ['holy_table'] } },
    ],
  },
  {
    id: 'instrumentRoom',
    name: 'Instrument Room',
    summary: 'Globes, rings, staffs and charts. Consultations on navigation are proved here, not merely argued.',
    historicalStatus: 'documented',
    keySkills: ['astronomy', 'navigation', 'cartography'],
    stations: 1,
    sources: ['Whitby 19–21 (Mercator globes; Frisius ring and staff)', 'Sherman, "Readings" (instrument collection)'],
    glyph: 'globe',
    levels: [
      { level: 1, cost: 12, days: 3, label: 'Basic instruments', effect: 'Astronomical observation at the base.' },
      { level: 2, cost: 30, days: 6, label: 'Louvain instruments', effect: '+1 Astronomy, Navigation and Cartography at the base.' },
      { level: 3, cost: 45, days: 10, label: 'Observatory', effect: '+2 to key skills.', requires: { skills: { astronomy: 8 } } },
    ],
  },
  {
    id: 'quarters',
    name: 'Quarters',
    summary: 'Family, servants, students and scryers all live here. Sets how many people the household can hold.',
    historicalStatus: 'documented',
    keySkills: [],
    stations: 3,
    sources: ['Fenton, Diaries (the household at Mortlake)'],
    glyph: 'hearth',
    levels: [
      { level: 1, cost: 10, days: 3, label: 'Modest quarters', effect: 'Household holds 3 besides Dee.' },
      { level: 2, cost: 25, days: 6, label: 'A full household', effect: 'Holds 4; stability recovers 1 a day at the base.' },
      { level: 3, cost: 40, days: 10, label: 'A great house', effect: 'Holds 5; stability recovers 2 a day.' },
    ],
  },
];

export const BASE_LAYOUTS: Record<string, BaseLayout> = {
  mortlake: {
    id: 'mortlake',
    name: 'Mortlake',
    locationId: 'mortlake',
    width: 900,
    height: 400,
    note: 'Schematic plan. The arrangement of Dee\'s rooms at Mortlake is not recorded; the rooms themselves are.',
    rooms: [
      { room: 'library', x: 30, y: 30, w: 300, h: 170 },
      { room: 'study', x: 330, y: 30, w: 160, h: 170 },
      { room: 'scriptorium', x: 490, y: 30, w: 160, h: 170 },
      { room: 'instrumentRoom', x: 650, y: 30, w: 220, h: 170 },
      { room: 'quarters', x: 30, y: 200, w: 220, h: 170 },
      { room: 'correspondence', x: 250, y: 200, w: 160, h: 170 },
      { room: 'laboratory', x: 410, y: 200, w: 260, h: 170 },
      { room: 'scryingChamber', x: 670, y: 200, w: 200, h: 170 },
    ],
    start: {
      library: 2, study: 1, scriptorium: 0, correspondence: 1,
      laboratory: 1, scryingChamber: 0, instrumentRoom: 2, quarters: 1,
    },
  },
  road: {
    id: 'road',
    name: 'The travelling household',
    locationId: '*',
    width: 900,
    height: 400,
    note: 'On the road the household is the ship: the chest of books, the stone and the people travel together. The actions with spirits continued at the halts (Whitby 27–29).',
    rooms: [
      { room: 'library', x: 30, y: 30, w: 280, h: 340, label: 'Book Chests' },
      { room: 'scryingChamber', x: 310, y: 30, w: 280, h: 170, label: 'Stone at the Halt' },
      { room: 'correspondence', x: 310, y: 200, w: 280, h: 170, label: 'Letters Home' },
      { room: 'quarters', x: 590, y: 30, w: 280, h: 340, label: 'Coaches and Inns' },
    ],
    start: {
      library: 1, study: 0, scriptorium: 0, correspondence: 1,
      laboratory: 0, scryingChamber: 0, instrumentRoom: 0, quarters: 1,
    },
  },
  hajek_house: {
    id: 'hajek_house',
    name: 'Hájek\'s House, Prague',
    locationId: 'hajek_house',
    width: 900,
    height: 400,
    note: 'Schematic plan. Dee lodged with Tadeáš Hájek in 1584 and worked in his study (Sherman 81–85).',
    rooms: [
      { room: 'laboratory', x: 30, y: 30, w: 330, h: 170, label: 'Hájek\'s Study' },
      { room: 'library', x: 360, y: 30, w: 200, h: 170, label: 'Travelling Chest' },
      { room: 'scryingChamber', x: 560, y: 30, w: 310, h: 170 },
      { room: 'quarters', x: 30, y: 200, w: 330, h: 170 },
      { room: 'correspondence', x: 360, y: 200, w: 200, h: 170 },
      { room: 'study', x: 560, y: 200, w: 310, h: 170 },
    ],
    start: {
      library: 1, study: 0, scriptorium: 0, correspondence: 1,
      laboratory: 1, scryingChamber: 0, instrumentRoom: 0, quarters: 1,
    },
  },
};

export function getRoomCard(id: RoomId): RoomCard {
  return ROOM_CARDS.find(r => r.id === id)!;
}
