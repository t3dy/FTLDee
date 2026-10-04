import type { FactionId, HistoricalStatus } from '../../core/types.js';

// Associates: the people of Dee's networks of patronage, trade, learning and
// surveillance. Met when any of `metBy` (a flag, an encounter id, or a contact
// tag) is present. Real people: reported speech only, anywhere they appear.

export type AssociateRole = 'patron' | 'merchant' | 'scholar' | 'agent' | 'kin' | 'creditor' | 'danger' | 'scryer';

export interface AssociateCard {
  id: string;
  name: string;
  role: AssociateRole;
  faction?: FactionId;
  locationId: string;
  summary: string;
  offers: string;
  historicalStatus: HistoricalStatus;
  sources: string[];
  glyph: string;
  metBy: string[];
}

export const ASSOCIATE_CARDS: AssociateCard[] = [
  // Court and patronage
  { id: 'elizabeth_i', name: 'Elizabeth I', role: 'patron', faction: 'elizabeth', locationId: 'richmond', glyph: 'crown', historicalStatus: 'documented',
    summary: 'Consulted Dee on comets, elections and her health; rewarded him less than he hoped.', offers: 'Commissions, protection, and promises.',
    sources: ['Parry 27–37', 'Harkness 134'], metBy: ['elizabeths_interest', 'comet_at_windsor', 'queens_malady'] },
  { id: 'burghley', name: 'William Cecil, Lord Burghley', role: 'patron', faction: 'burghley', locationId: 'windsor', glyph: 'scales', historicalStatus: 'documented',
    summary: 'Lord Treasurer. Received Dee\'s letter on the Steganographia in 1563 and accepted his calendar reckoning in 1583.', offers: 'The purse, slowly.',
    sources: ['Clucas, Ambix 64.2', 'Parry 149–156'], metBy: ['weather_calendar_reform', 'frobisher_ore'] },
  { id: 'leicester', name: 'Robert Dudley, Earl of Leicester', role: 'patron', faction: 'leicester', locationId: 'greenwich', glyph: 'crown', historicalStatus: 'documented',
    summary: 'Patron of the forward Protestant party and of the voyages; used Dee to answer the fear of the 1577 comet.', offers: 'Voyages, imperial schemes, court access.',
    sources: ['Parry 127–129', 'Fenton (1577)'], metBy: ['greenwich_network', 'queens_malady', 'comet_at_windsor'] },
  { id: 'walsingham', name: 'Sir Francis Walsingham', role: 'agent', faction: 'walsingham', locationId: 'barn_elms', glyph: 'eye', historicalStatus: 'documented',
    summary: 'Principal Secretary and neighbour at Barn Elms. He used Dee for the calendar, for charts and rutters, and for the 1578 mission abroad; his correspondents reported on Dee abroad. Dee as his spy is "the old canard".', offers: 'Commissions, and a file on you.',
    sources: ['Parry 135, 152–160, 174–176, 204', 'Whitby 179'], metBy: ['walsingham_intelligence', 'queens_malady', 'contact:walsingham_contact'] },
  { id: 'philip_sidney', name: 'Philip Sidney', role: 'patron', faction: 'leicester', locationId: 'greenwich', glyph: 'quill', historicalStatus: 'documented',
    summary: 'Leicester\'s nephew; visited Mortlake with Leicester and Dyer in 1577.', offers: 'Protestant continental networks.',
    sources: ['Fenton 11–14 (16 Jan 1577)'], metBy: ['greenwich_network'] },

  { id: 'pembroke', name: 'William Herbert, Earl of Pembroke', role: 'patron', locationId: 'greenwich', glyph: 'crown', historicalStatus: 'documented',
    summary: 'Dee\'s employer from 1552; turned his coat for Mary in 1553, recommended Dee to Elizabeth in 1558.', offers: 'Protection that changes sides before you can.',
    sources: ['Parry 23–24, 28, 48'], metBy: ['prologue_1555'] },
  { id: 'bonner', name: 'Edmund Bonner, Bishop of London', role: 'danger', faction: 'religiousAuth', locationId: 'london', glyph: 'cross', historicalStatus: 'documented',
    summary: 'Ordained Dee in 1554 and took him as chaplain in 1555. Dee called him his special friend; Protestants called him the burning bishop.', offers: 'Shelter, books, and a stain that lasts.',
    sources: ['Parry 28–29, 34, 38–39'], metBy: ['bonner_chaplain'] },
  { id: 'ferrers', name: 'George Ferrers', role: 'danger', locationId: 'london', glyph: 'eye', historicalStatus: 'documented',
    summary: 'One of the informers of 1555, an opponent of the Dudleys, still active against Dee in 1569.', offers: 'Accusation.',
    sources: ['Parry 32, 83'], metBy: ['prologue_examination'] },
  { id: 'herle', name: 'William Herle', role: 'agent', faction: 'walsingham', locationId: 'london', glyph: 'eye', historicalStatus: 'documented',
    summary: 'Burghley\'s agent, then Walsingham\'s; carried Murphyn\'s slander to Burghley and watched Łaski in 1583.', offers: 'Reports on you to the people who pay him.',
    sources: ['Parry 139–140, 165, 168'], metBy: ['murphyn_suit', 'laski_lacy'] },
  { id: 'thomas_watson', name: 'Thomas Watson', role: 'agent', faction: 'walsingham', locationId: 'mortlake', glyph: 'eye', historicalStatus: 'documented',
    summary: 'Walsingham\'s would-be plant in Łaski\'s household.', offers: 'A pair of ears at your guest\'s table.',
    sources: ['Parry 168'], metBy: ['laski_lacy'] },
  { id: 'edward_dyer', name: 'Edward Dyer', role: 'patron', faction: 'leicester', locationId: 'greenwich', glyph: 'letter', historicalStatus: 'documented',
    summary: 'Courtier and poet, for thirty years Dee\'s most important knowledge broker at court; later Kelley\'s too.', offers: 'A channel to the Queen.',
    sources: ['Parry 83, 98, 201–216'], metBy: ['greenwich_network'] },
  { id: 'edmund_hilton', name: 'Edmund Hilton', role: 'kin', locationId: 'krakow', glyph: 'letter', historicalStatus: 'documented',
    summary: 'Servant and courier on the Continent; went with Dee to Prague in August 1584.', offers: 'Letters that arrive.',
    sources: ['Whitby 29–31', 'Fell Smith 87–89'], metBy: ['road_to_prague'] },
  { id: 'stephen_powle', name: 'Stephen Powle', role: 'agent', faction: 'burghley', locationId: 'hradschin', glyph: 'letter', historicalStatus: 'documented',
    summary: 'An English traveller whose letters home turned Dee\'s boasts abroad into dispatches.', offers: 'Your reputation, reported.',
    sources: ['Parry 186, 195'], metBy: ['weather_powle_dispatch'] },
  { id: 'francis_garland', name: 'Francis Garland', role: 'agent', faction: 'burghley', locationId: 'trebon_road', glyph: 'eye', historicalStatus: 'documented',
    summary: 'Courier between Bohemia and England who saw Kelley transmute; the angels named him Burghley\'s spy.', offers: 'Fast letters, read in transit.',
    sources: ['Parry 197–198, 217–219'], metBy: ['garland_seen'] },
  { id: 'john_basset', name: '"John Basset" (Edward Whitlock)', role: 'agent', faction: 'walsingham', locationId: 'trebon_road', glyph: 'person', historicalStatus: 'documented',
    summary: 'Arthur\'s tutor at Třeboň, who was an English spy, and absconded after a year.', offers: 'Latin for Arthur; a report on you.',
    sources: ['Parry 200–201'], metBy: ['basset_hired'] },
  { id: 'william_allen', name: 'Cardinal William Allen', role: 'danger', faction: 'religiousAuth', locationId: 'nuncio', glyph: 'cross', historicalStatus: 'documented',
    summary: 'His 1592 letter named Dee as the Council\'s conjuror, whose forecast of a Spanish invasion Burghley used: the best-documented secret service of Dee\'s life, and it was astrology.', offers: 'Prints your secrets.',
    sources: ['Parry 225–230'], metBy: ['allen_read'] },

  // Kin, creditors, the house
  { id: 'nicholas_fromond', name: 'Nicholas Fromond', role: 'kin', locationId: 'mortlake', glyph: 'house', historicalStatus: 'documented',
    summary: 'Jane\'s brother, keeper of the house and goods in Dee\'s absence. He sold goods, took rents, and defeated creditors\' suits.', offers: 'A keeper for Mortlake, at a price you learn later.',
    sources: ['Whitby 27–29', 'Parry 170–172'], metBy: ['fromond_keeper'] },
  { id: 'charles_sled', name: 'Charles Sled', role: 'creditor', faction: 'walsingham', locationId: 'london', glyph: 'eye', historicalStatus: 'documented',
    summary: 'A creditor who sued for £56 while Dee was abroad; connected to Walsingham\'s spy network, which may explain what the angels knew at Lübeck.', offers: 'Nothing. He watches and he sues.',
    sources: ['Parry 170–172'], metBy: ['lubeck_angels', 'creditors_suing'] },
  { id: 'fremonsheim', name: 'Fremonsheim, bookseller', role: 'creditor', faction: 'merchantNetwork', locationId: 'london', glyph: 'book', historicalStatus: 'documented',
    summary: 'The bookseller to whom Dee owed money and who sued Fromond in the Court of Requests; Dee began repaying him only in 1595.', offers: 'Books on credit.',
    sources: ['Parry 170–172'], metBy: ['creditors_suing'] },

  // Trade and the press
  { id: 'muscovy_masters', name: 'Masters of the Muscovy Company', role: 'merchant', faction: 'merchantNetwork', locationId: 'muscovy_house', glyph: 'ship', historicalStatus: 'documented',
    summary: 'Dee consulted for the Company on navigation, the paradoxal compass and nautical triangles.', offers: 'Fees for tables; shares in voyages.',
    sources: ['Parry 44–47'], metBy: ['muscovy_commission', 'frobisher_ore'] },
  { id: 'aldersgate_printer', name: 'The printer at Aldersgate', role: 'merchant', faction: 'scholarNetwork', locationId: 'aldersgate', glyph: 'book', historicalStatus: 'plausible',
    summary: 'A London printer who will put your work through the press for a fee.', offers: 'Print, and readers you cannot choose.',
    sources: [], metBy: ['print_a_work'] },

  // Scryers
  { id: 'barnabas_saul', name: 'Barnabas Saul', role: 'scryer', locationId: 'mortlake', glyph: 'crystal', historicalStatus: 'documented',
    summary: 'The first scryer of the surviving actions; in March 1582 he said he saw nothing more.', offers: 'Sight in the stone, briefly.',
    sources: ['Whitby 1–15, 27–29'], metBy: ['saul_first_scryer'] },

  // The road and Poland
  { id: 'albert_laski', name: 'Albert Łaski', role: 'patron', faction: 'continentalCourts', locationId: 'lask', glyph: 'crown', historicalStatus: 'documented',
    summary: 'Polish magnate, lavish at Elizabeth\'s court, deep in debt at home; took the household east.', offers: 'A road out of England, and his debts.',
    sources: ['Parry 174–176', 'Whitby 29–31'], metBy: ['laski_at_mortlake', 'laski_arrival'] },
  { id: 'king_stephen', name: 'King Stephen Báthory', role: 'patron', faction: 'continentalCourts', locationId: 'krakow', glyph: 'crown', historicalStatus: 'documented',
    summary: 'King of Poland; received Dee, witnessed actions, and was not convinced.', offers: 'Audience; no conversion.',
    sources: ['Szőnyi 259', 'Whitby 31–33'], metBy: ['king_stephen_met'] },
  { id: 'champernon', name: 'Arthur de Champernon', role: 'agent', faction: 'walsingham', locationId: 'krakow', glyph: 'letter', historicalStatus: 'documented',
    summary: 'An Englishman who reported to Walsingham in June 1584 that Dee had left a certain estate for an uncertain hope.', offers: 'Your reputation at home, in his hands.',
    sources: ['Whitby 179'], metBy: ['weather_champernon'] },

  // Prague
  { id: 'hajek', name: 'Tadeáš Hájek', role: 'scholar', faction: 'scholarNetwork', locationId: 'hajek_house', glyph: 'star', historicalStatus: 'documented',
    summary: 'Physician and astronomer who wrote on the new star; Dee lodged in his house. (Whether he was Rudolf\'s physician is disputed: Rampling, EF 292.)', offers: 'Lodging, a study, and an introduction to the learned of Prague.',
    sources: ['Szőnyi 259', 'Sherman 28–32', 'Parry 289 n.4'], metBy: ['prague_arrival'] },
  { id: 'curtius', name: 'Dr Curtius', role: 'agent', faction: 'continentalCourts', locationId: 'hradschin', glyph: 'tower', historicalStatus: 'documented',
    summary: 'Named by Rudolf as go-between for Dee\'s papers and audiences.', offers: 'The only door to the Emperor.',
    sources: ['Whitby 29–31'], metBy: ['curtius_intermediary', 'rudolf_audience'] },
  { id: 'rudolf_ii', name: 'Emperor Rudolf II', role: 'patron', faction: 'continentalCourts', locationId: 'hradschin', glyph: 'crown', historicalStatus: 'documented',
    summary: 'Collector of curiosities and of alchemists; heard Dee\'s rebuke on 3 September 1584 and deferred.', offers: 'Imperial patronage, for alchemy rather than angels.',
    sources: ['Harkness 53–55', 'Parry 181–183, 202–205'], metBy: ['rudolf_audience'] },
  { id: 'pucci', name: 'Francesco Pucci', role: 'danger', faction: 'religiousAuth', locationId: 'old_town', glyph: 'cross', historicalStatus: 'documented',
    summary: 'A wandering theologian close to the nuncio\'s people; joined the actions in August 1585 and returned to the Roman Church.', offers: 'A friend in the actions; a reporter to Rome.',
    sources: ['Harkness 57–59', 'Whitby 31–33'], metBy: ['pucci_joins'] },
  { id: 'malaspina', name: 'Germanicus Malaspina', role: 'danger', faction: 'religiousAuth', locationId: 'nuncio', glyph: 'cross', historicalStatus: 'documented',
    summary: 'Papal nuncio, Bishop of San Severo. His invitations became summons; he held that private revelations must stay private.', offers: 'Rome, or exile.',
    sources: ['Harkness 55–59'], metBy: ['nuncio_summons', 'nuncio_audience'] },
  { id: 'rozmberk', name: 'Vilém Rožmberk', role: 'patron', faction: 'continentalCourts', locationId: 'trebon_road', glyph: 'tower', historicalStatus: 'documented',
    summary: 'The great Bohemian lord who gave the household a home at Třeboň, 1586–89.', offers: 'Refuge after Prague.',
    sources: ['biography_timeline (Třeboň years)', 'Parry 202–205'], metBy: ['went_to_trebon', 'trebon_departure'] },
];
