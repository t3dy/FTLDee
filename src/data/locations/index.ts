import type { Location, SectorId } from '../../core/types.js';

// Location cards. x/y are positions on the sector's SVG map (1000 x 560).
// England is drawn west→east along the Thames; Prague is a schematic city plan
// with the Vltava running north–south.

const LONDON_BOOKS = ['john_field_ephemeris', 'hajek_dialexis', 'reuchlin_cabala', 'ficino_vita', 'frisius_cosmographia',
  'ortelius_theatrum', 'geoffrey_historia', 'picatrix', 'trithemius_polygraphia', 'lull_ars', 'bacon_epistola'];
const PRAGUE_BOOKS = ['hajek_dialexis', 'hajek_opuscula', 'reuchlin_cabala', 'ficino_vita', 'picatrix', 'lull_ars',
  'trithemius_polygraphia', 'paracelsus_selected', 'frisius_cosmographia'];

export const ALL_LOCATIONS: Location[] = [
  // ---------------------------------------------------------------- ENGLAND
  {
    id: 'mortlake', name: 'Mortlake', sector: 'england', x: 500, y: 300, type: 'household',
    description: 'Dee\'s house on the Thames in Surrey: the largest private library in England, three laboratories, the instrument collection. The base.',
    historicalPeriod: 'c. 1580', historicalStatus: 'documented',
    connections: [
      { to: 'barn_elms', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'richmond', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'london', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 2, travelCost: 2, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['scholarNetwork'],
    intellectualOpportunities: ['research', 'correspondence', 'householdManagement'],
    unlocked: true, sources: ['Whitby 36–39', 'Clulee, Ambix 52.3, 15–16'], glyph: 'house',
  },
  {
    id: 'barn_elms', name: 'Barn Elms', sector: 'england', x: 570, y: 245, type: 'noble_estate',
    description: 'Walsingham\'s house at Barnes, a short walk from Mortlake. Coded letters and quiet consultations.',
    historicalPeriod: 'c. 1580', historicalStatus: 'documented',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'london', travelDays: 1, travelCost: 1, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['walsingham'],
    intellectualOpportunities: ['intelligenceWork', 'cipherAnalysis'],
    errands: ['errand_ciphers'],
    requirements: { minFaction: { walsingham: 30 } },
    unlocked: true, sources: [], glyph: 'eye',
  },
  {
    id: 'richmond', name: 'Richmond Palace', sector: 'england', x: 420, y: 340, type: 'royal_court',
    description: 'A favourite summer residence of the Queen, upriver from Mortlake. The nearest door to royal consultation.',
    historicalPeriod: 'c. 1580', historicalStatus: 'documented',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'windsor', travelDays: 2, travelCost: 3, risk: 'low' },
      { to: 'hampton_court', travelDays: 1, travelCost: 1, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['elizabeth', 'leicester'],
    intellectualOpportunities: ['royalConsultation'],
    errands: ['errand_petition'],
    requirements: { minFaction: { elizabeth: 30 } },
    unlocked: true, sources: [], glyph: 'crown',
  },
  {
    id: 'windsor', name: 'Windsor Castle', sector: 'england', x: 230, y: 330, type: 'royal_court',
    description: 'The royal fortress upriver: formal court, formal danger.',
    historicalPeriod: 'c. 1580', historicalStatus: 'documented',
    connections: [
      { to: 'richmond', travelDays: 2, travelCost: 3, risk: 'low' },
      { to: 'hampton_court', travelDays: 1, travelCost: 2, risk: 'low' },
      { to: 'oxford', travelDays: 3, travelCost: 4, risk: 'medium' },
    ],
    availableEncounterIds: [], factionPresence: ['elizabeth', 'burghley', 'religiousAuth'],
    intellectualOpportunities: ['royalConsultation', 'politicalIntelligence'],
    errands: ['errand_petition'],
    requirements: { minFaction: { elizabeth: 40 } },
    unlocked: true, sources: [], glyph: 'tower',
  },
  {
    id: 'oxford', name: 'Oxford', sector: 'england', x: 110, y: 150, type: 'university',
    description: 'College libraries and the chests of dispersed monastic books. Dee had urged Queen Mary in 1556 to recover such manuscripts before they rotted.',
    historicalPeriod: 'c. 1580', historicalStatus: 'plausible',
    connections: [
      { to: 'windsor', travelDays: 3, travelCost: 4, risk: 'medium' },
      { to: 'london', travelDays: 3, travelCost: 5, risk: 'medium' },
    ],
    availableEncounterIds: [], factionPresence: ['scholarNetwork', 'religiousAuth'],
    intellectualOpportunities: ['manuscriptHunting'],
    errands: ['errand_manuscript_hunt'],
    unlocked: true, sources: ['Parry 58–61', 'Håkansson 12–14'], glyph: 'scroll',
  },
  {
    id: 'london', name: 'London', sector: 'england', x: 680, y: 190, type: 'city',
    description: 'Booksellers in Paul\'s Churchyard, instrument makers, merchants with continental letters.',
    historicalPeriod: 'c. 1580', historicalStatus: 'documented',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'barn_elms', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'deptford', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'oxford', travelDays: 3, travelCost: 5, risk: 'medium' },
      { to: 'muscovy_house', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'aldersgate', travelDays: 1, travelCost: 0, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['merchantNetwork', 'scholarNetwork'],
    intellectualOpportunities: ['bookAcquisition', 'instrumentPurchase'],
    market: { name: 'Paul\'s Churchyard', stockSize: 4, bookPool: LONDON_BOOKS,
      instrumentPool: ['navigator_kit', 'glassware', 'travelling_chest'] },
    errands: ['errand_pauls_books', 'errand_city_news'],
    unlocked: true, sources: [], glyph: 'coin',
  },
  {
    id: 'deptford', name: 'Deptford', sector: 'england', x: 790, y: 255, type: 'port',
    description: 'The royal dockyard downriver. Masters, pilots and charts.',
    historicalPeriod: 'c. 1580', historicalStatus: 'plausible',
    connections: [
      { to: 'london', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 1, travelCost: 0, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['merchantNetwork', 'leicester'],
    intellectualOpportunities: ['navalConsultation'],
    errands: ['errand_navigators'],
    unlocked: true, sources: [], glyph: 'ship',
  },
  {
    id: 'greenwich', name: 'Greenwich', sector: 'england', x: 860, y: 310, type: 'royal_court',
    description: 'The palace where Elizabeth was born; Leicester and Sidney\'s circle; naval administration.',
    historicalPeriod: 'c. 1580', historicalStatus: 'documented',
    connections: [
      { to: 'london', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'deptford', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'mortlake', travelDays: 2, travelCost: 2, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['elizabeth', 'leicester', 'burghley'],
    intellectualOpportunities: ['navalConsultation', 'patronageSeeking'],
    errands: ['errand_petition'],
    unlocked: true, sources: [], glyph: 'crown',
  },

  // ---------------------------------------------------------------- ENGLAND: courts, merchants, printers
  {
    id: 'hampton_court', name: 'Hampton Court', sector: 'england', x: 330, y: 420, type: 'castle',
    description: 'The palace upriver where the court lay in the autumn of 1578, when the Queen\'s malady sent Jane Dee to court and Dee abroad.',
    historicalPeriod: '1578–83', historicalStatus: 'documented',
    connections: [
      { to: 'richmond', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'windsor', travelDays: 1, travelCost: 2, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['elizabeth', 'leicester', 'walsingham'],
    intellectualOpportunities: ['royalConsultation'],
    errands: ['errand_petition'],
    requirements: { minFaction: { elizabeth: 35 } },
    unlocked: true, sources: ['Fell Smith 33–34'], glyph: 'tower',
  },
  {
    id: 'muscovy_house', name: 'Muscovy House', sector: 'england', x: 760, y: 110, type: 'city',
    description: 'The London house of the Muscovy Company, whose masters and pilots Dee advised on navigation and the northern passages.',
    historicalPeriod: 'c. 1580', historicalStatus: 'plausible',
    connections: [
      { to: 'london', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'deptford', travelDays: 1, travelCost: 1, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['merchantNetwork', 'leicester'],
    intellectualOpportunities: ['navalConsultation', 'investment'],
    errands: ['errand_muscovy_charts'],
    unlocked: true, sources: ['Parry 65–68', 'Clulee, Ambix 52.3, 16–17'], glyph: 'ship',
  },
  {
    id: 'aldersgate', name: 'Printing House, Aldersgate', sector: 'england', x: 610, y: 100, type: 'shop',
    description: 'Presses, type cases and a counter of almanacs and ephemerides. John Day, who printed the 1570 English Euclid, worked here. A work put through the press reaches readers a petition never will.',
    historicalPeriod: 'c. 1580', historicalStatus: 'plausible',
    connections: [{ to: 'london', travelDays: 1, travelCost: 0, risk: 'low' }],
    availableEncounterIds: [], factionPresence: ['scholarNetwork', 'merchantNetwork'],
    intellectualOpportunities: ['publishing'],
    market: { name: 'The printer\'s counter', stockSize: 3, bookPool: ['john_field_ephemeris', 'geoffrey_historia', 'trithemius_polygraphia', 'frisius_cosmographia', 'ficino_vita'],
      instrumentPool: ['travelling_chest'] },
    unlocked: true, sources: ['ACCURACY_FLAGS B10 (Day printed the Euclid)'], glyph: 'book',
  },

  // ---------------------------------------------------------------- THE ROAD EAST, 1583–84
  {
    id: 'gravesend_ships', name: 'Ships beyond Gravesend', sector: 'road', x: 70, y: 330, type: 'port',
    description: '21 September 1583. Two ships wait seven or eight miles beyond Gravesend. Łaski is under suspicion from Walsingham and Burghley, and no one in the household has licence to leave the country.',
    historicalPeriod: '1583', historicalStatus: 'documented',
    connections: [
      { to: 'brill', travelDays: 8, travelCost: 3, risk: 'medium' },
      { to: 'hamburg', travelDays: 12, travelCost: 6, risk: 'high' },
    ],
    availableEncounterIds: [], factionPresence: ['walsingham'], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 42–44'], glyph: 'ship',
  },
  {
    id: 'brill', name: 'Brill', sector: 'road', x: 200, y: 370, type: 'port',
    description: 'Landfall in Holland on 29 September, after some difficulties at sea.',
    historicalPeriod: '1583', historicalStatus: 'documented',
    connections: [{ to: 'rotterdam', travelDays: 1, travelCost: 1, risk: 'low' }],
    availableEncounterIds: [], factionPresence: [], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 42–44'], glyph: 'ship',
  },
  {
    id: 'rotterdam', name: 'Rotterdam', sector: 'road', x: 260, y: 300, type: 'port',
    description: 'Where the party boarded a Dutch hoy for the long haul east.',
    historicalPeriod: '1583', historicalStatus: 'documented',
    connections: [
      { to: 'lubeck', travelDays: 14, travelCost: 6, risk: 'medium' },
      { to: 'bremen', travelDays: 8, travelCost: 4, risk: 'medium' },
    ],
    availableEncounterIds: [], factionPresence: ['merchantNetwork'], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 42–44'], glyph: 'ship',
  },
  {
    id: 'bremen', name: 'Bremen', sector: 'road', x: 390, y: 330, type: 'city',
    description: 'A Lutheran city of learned men. Dee would spend seven months here in 1589 on his way home; in 1583 it is a road not taken.',
    historicalPeriod: '1583', historicalStatus: 'plausible',
    connections: [{ to: 'hamburg', travelDays: 3, travelCost: 2, risk: 'low' }],
    availableEncounterIds: [], factionPresence: ['scholarNetwork'], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 50–52 (Bremen, 1589)'], glyph: 'tower',
  },
  {
    id: 'hamburg', name: 'Hamburg', sector: 'road', x: 450, y: 250, type: 'city',
    description: 'A Hanse port with English merchants, booksellers and instrument makers. Not on the documented route; a faster, costlier way round.',
    historicalPeriod: '1583', historicalStatus: 'plausible',
    connections: [{ to: 'lubeck', travelDays: 2, travelCost: 1, risk: 'low' }],
    availableEncounterIds: [], factionPresence: ['merchantNetwork'], intellectualOpportunities: ['bookAcquisition'],
    market: { name: 'Hanse booksellers', stockSize: 4, bookPool: ['reuchlin_cabala', 'lull_ars', 'paracelsus_selected', 'frisius_cosmographia', 'trithemius_polygraphia', 'picatrix', 'ortelius_theatrum'],
      instrumentPool: ['navigator_kit', 'glassware', 'travelling_chest'] },
    unlocked: true, sources: [], glyph: 'coin',
  },
  {
    id: 'lubeck', name: 'Lübeck', sector: 'road', x: 520, y: 190, type: 'city',
    description: 'Łaski rejoins the party here. In mid-November the angels tease Dee about his brother-in-law\'s troubles with creditors at home.',
    historicalPeriod: '1583', historicalStatus: 'documented',
    connections: [
      { to: 'wismar', travelDays: 4, travelCost: 2, risk: 'low' },
      { to: 'danzig', travelDays: 10, travelCost: 5, risk: 'high' },
    ],
    availableEncounterIds: [], factionPresence: ['continentalCourts'], intellectualOpportunities: [],
    unlocked: true, sources: ['Fell Smith 69–70', 'Parry 191–193'], glyph: 'tower',
  },
  {
    id: 'wismar', name: 'Wismar and Rostock', sector: 'road', x: 610, y: 150, type: 'city',
    description: 'Baltic towns on the way east while Łaski visits the Duke of Mecklenburg.',
    historicalPeriod: '1583', historicalStatus: 'documented',
    connections: [{ to: 'stettin', travelDays: 5, travelCost: 2, risk: 'medium' }],
    availableEncounterIds: [], factionPresence: [], intellectualOpportunities: [],
    unlocked: true, sources: ['Fell Smith 69–70'], glyph: 'tower',
  },
  {
    id: 'stettin', name: 'Stettin', sector: 'road', x: 690, y: 220, type: 'city',
    description: 'Reached at ten o\'clock on Christmas morning, 1583.',
    historicalPeriod: '1583', historicalStatus: 'documented',
    connections: [{ to: 'posen', travelDays: 4, travelCost: 3, risk: 'medium' }],
    availableEncounterIds: [], factionPresence: [], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 42–44', 'Fell Smith 69–70'], glyph: 'tower',
  },
  {
    id: 'danzig', name: 'Danzig', sector: 'road', x: 800, y: 90, type: 'port',
    description: 'The sea road round to Poland: winter storms on the Baltic, then the Vistula. Not the route the household took.',
    historicalPeriod: '1583', historicalStatus: 'plausible',
    connections: [{ to: 'posen', travelDays: 8, travelCost: 4, risk: 'medium' }],
    availableEncounterIds: [], factionPresence: ['merchantNetwork'], intellectualOpportunities: [],
    unlocked: true, sources: [], glyph: 'ship',
  },
  {
    id: 'posen', name: 'Posen', sector: 'road', x: 740, y: 340, type: 'city',
    description: 'Two hundred miles from Stettin in four days. Dee notes the cathedral, and begins writing notes about Kelley in Greek letters in his travel journal.',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [{ to: 'lask', travelDays: 5, travelCost: 2, risk: 'low' }],
    availableEncounterIds: [], factionPresence: [], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 44–46', 'Fell Smith 69–70'], glyph: 'scroll',
  },
  {
    id: 'lask', name: 'Lask', sector: 'road', x: 830, y: 420, type: 'noble_estate',
    description: 'Łaski\'s own property, reached on 3 February 1584, and mortgaged. The frame for the Holy Table was made here.',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [{ to: 'krakow', travelDays: 4, travelCost: 2, risk: 'low' }],
    availableEncounterIds: [], factionPresence: ['continentalCourts'], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 44–46, 170–173, 182–183'], glyph: 'house',
  },
  {
    id: 'krakow', name: 'Kraków', sector: 'road', x: 910, y: 500, type: 'city',
    description: 'Reached on 13 March 1584. Lodgings in St Stephen Street; the court of King Stephen Báthory.',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [{ to: 'prague_road', travelDays: 9, travelCost: 4, risk: 'medium' }],
    availableEncounterIds: [], factionPresence: ['continentalCourts', 'religiousAuth'], intellectualOpportunities: ['bookAcquisition'],
    market: { name: 'Kraków booksellers', stockSize: 3, bookPool: ['hajek_opuscula', 'ficino_vita', 'lull_ars', 'paracelsus_selected', 'reuchlin_cabala'],
      instrumentPool: ['glassware', 'travelling_chest'] },
    unlocked: true, sources: ['Whitby 44–46', 'Szőnyi 279'], glyph: 'crown',
  },
  {
    id: 'prague_road', name: 'The Road to Prague', sector: 'road', x: 560, y: 500, type: 'city',
    description: 'In August 1584 Dee sets off for the Emperor at Łaski\'s urging, arriving on the ninth.',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [],
    availableEncounterIds: [], factionPresence: ['continentalCourts'], intellectualOpportunities: [],
    unlocked: true, sources: ['Whitby 44–46'], glyph: 'road',
  },

  // ---------------------------------------------------------------- PRAGUE
  {
    id: 'hajek_house', name: 'Hájek\'s House', sector: 'prague', x: 760, y: 330, type: 'household',
    description: 'Lodging with Tadeáš Hájek, physician and astronomer. (Sherman and Clulee call him Rudolf\'s physician; Rampling, Experimental Fire 292, calls that a common error.) His study served for alchemical work. The base in Prague. (Position on this plan is schematic.)',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [
      { to: 'old_town', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'charles_bridge', travelDays: 1, travelCost: 0, risk: 'medium' },
    ],
    availableEncounterIds: [], factionPresence: ['scholarNetwork', 'continentalCourts'],
    intellectualOpportunities: ['alchemy', 'research'],
    unlocked: true, sources: ['Szőnyi 279', 'Sherman 28–32, 81–85'], glyph: 'house',
  },
  {
    id: 'old_town', name: 'Old Town Market', sector: 'prague', x: 820, y: 200, type: 'city',
    description: 'The marketplace of Old Prague. Printers, booksellers, gossip. Dee moved to a house nearby in January 1585.',
    historicalPeriod: '1584–86', historicalStatus: 'documented',
    connections: [
      { to: 'hajek_house', travelDays: 1, travelCost: 0, risk: 'low' },
      { to: 'charles_bridge', travelDays: 1, travelCost: 0, risk: 'medium' },
    ],
    availableEncounterIds: [], factionPresence: ['merchantNetwork', 'scholarNetwork'],
    intellectualOpportunities: ['bookAcquisition'],
    market: { name: 'Old Town booksellers', stockSize: 4, bookPool: PRAGUE_BOOKS,
      instrumentPool: ['glassware', 'travelling_chest', 'navigator_kit'] },
    errands: ['errand_prague_books'],
    unlocked: true, sources: ['Whitby 46–48'], glyph: 'coin',
  },
  {
    id: 'charles_bridge', name: 'Charles Bridge', sector: 'prague', x: 540, y: 290, type: 'bridge',
    description: 'The stone bridge over the Vltava. Dee crossed it on foot to his audience, past the gangs of a booming city.',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [
      { to: 'hajek_house', travelDays: 1, travelCost: 0, risk: 'medium' },
      { to: 'old_town', travelDays: 1, travelCost: 0, risk: 'medium' },
      { to: 'lesser_town', travelDays: 1, travelCost: 0, risk: 'medium' },
    ],
    availableEncounterIds: [], factionPresence: [],
    intellectualOpportunities: [],
    unlocked: true, sources: ['Parry 202–204'], glyph: 'bridge',
  },
  {
    id: 'lesser_town', name: 'The Lesser Town', sector: 'prague', x: 380, y: 300, type: 'city',
    description: 'The quarter under the castle hill, full of the houses of courtiers and envoys.',
    historicalPeriod: '1584–86', historicalStatus: 'plausible',
    connections: [
      { to: 'charles_bridge', travelDays: 1, travelCost: 0, risk: 'medium' },
      { to: 'hradschin', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'nuncio', travelDays: 1, travelCost: 0, risk: 'high' },
    ],
    availableEncounterIds: [], factionPresence: ['continentalCourts', 'religiousAuth'],
    intellectualOpportunities: [],
    unlocked: true, sources: [], glyph: 'tower',
  },
  {
    id: 'hradschin', name: 'The Hradschin', sector: 'prague', x: 220, y: 150, type: 'royal_court',
    description: 'The castle of Rudolf II on the hill above the river: from outside, gigantic and aloof.',
    historicalPeriod: '1584', historicalStatus: 'documented',
    connections: [
      { to: 'lesser_town', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'kunstkammer', travelDays: 1, travelCost: 0, risk: 'low' },
    ],
    availableEncounterIds: [], factionPresence: ['continentalCourts'],
    intellectualOpportunities: ['imperialAudience'],
    errands: ['errand_curtius'],
    requirements: { flags: ['wrote_to_emperor'] },
    unlocked: true, sources: ['Parry 202–204', 'Harkness 68–70'], glyph: 'tower',
  },
  {
    id: 'kunstkammer', name: 'The Kunstkammer', sector: 'prague', x: 110, y: 230, type: 'collection',
    description: 'Rudolf\'s enormous collection of curiosities. A gift for it could buy readmission to his favour; Kelley later proved it.',
    historicalPeriod: '1584–88', historicalStatus: 'documented',
    connections: [{ to: 'hradschin', travelDays: 1, travelCost: 0, risk: 'low' }],
    availableEncounterIds: [], factionPresence: ['continentalCourts'],
    intellectualOpportunities: [],
    errands: ['errand_curiosities'],
    requirements: { flags: ['rudolf_audience_done'] },
    unlocked: true, sources: ['Parry 223–226'], glyph: 'star',
  },
  {
    id: 'nuncio', name: 'The Papal Nuncio', sector: 'prague', x: 330, y: 430, type: 'embassy',
    description: 'Germanicus Malaspina, Bishop of San Severo. His invitations turned to summons. (Position on this plan is schematic.)',
    historicalPeriod: '1585–86', historicalStatus: 'documented',
    connections: [{ to: 'lesser_town', travelDays: 1, travelCost: 0, risk: 'high' }],
    availableEncounterIds: [], factionPresence: ['religiousAuth'],
    intellectualOpportunities: [],
    requirements: { flags: ['nuncio_summons'] },
    unlocked: true, sources: ['Harkness 70–74', 'Whitby 198–201'], glyph: 'cross',
  },
  {
    id: 'trebon_road', name: 'Road to Třeboň', sector: 'prague', x: 930, y: 500, type: 'noble_estate',
    description: 'South to the estates of Vilém Rožmberk, where Dee and Kelley worked 1586–89. Leaving Prague ends this sector.',
    historicalPeriod: '1586', historicalStatus: 'documented',
    connections: [{ to: 'hajek_house', travelDays: 2, travelCost: 2, risk: 'low' }],
    availableEncounterIds: [], factionPresence: ['continentalCourts'],
    intellectualOpportunities: [],
    requirements: { flags: ['prague_closed'] },
    unlocked: true, sources: ['biography_timeline (Třeboň years)'], glyph: 'road',
  },
];

// Prague base links to the road out once it is open.
ALL_LOCATIONS.find(l => l.id === 'hajek_house')!.connections.push(
  { to: 'trebon_road', travelDays: 2, travelCost: 2, risk: 'low' },
);

export const SECTORS: Record<SectorId, { name: string; dates: string; base: string; days: number; transitionDay: number }> = {
  england: { name: 'Southern England', dates: '1580–1583', base: 'mortlake', days: 180, transitionDay: 150 },
  road: { name: 'The Road East', dates: '1583–1584', base: 'gravesend_ships', days: 120, transitionDay: 120 },
  prague: { name: 'Prague', dates: '1584–1586', base: 'hajek_house', days: 120, transitionDay: 120 },
};

export function getLocation(id: string): Location | undefined {
  return ALL_LOCATIONS.find(l => l.id === id);
}

export function locationsInSector(sector: SectorId): Location[] {
  return ALL_LOCATIONS.filter(l => l.sector === sector);
}

export function isAccessible(loc: Location, factions: Partial<Record<string, number>>, flags: string[]): boolean {
  if (!loc.unlocked) return false;
  if (loc.requirements?.minFaction) {
    for (const [fid, minVal] of Object.entries(loc.requirements.minFaction)) {
      if ((factions[fid] ?? 0) < minVal) return false;
    }
  }
  if (loc.requirements?.flags) {
    for (const flag of loc.requirements.flags) {
      if (!flags.includes(flag)) return false;
    }
  }
  return true;
}

export function getAccessibleLocations(currentId: string, factions: Partial<Record<string, number>>, flags: string[]): Location[] {
  const current = getLocation(currentId);
  if (!current) return [];
  return current.connections
    .map(c => getLocation(c.to))
    .filter((loc): loc is Location => !!loc && isAccessible(loc, factions, flags));
}

// Shortest travel days between two nodes (ignoring access requirements: crew
// on errands are not barred the way Dee is from the presence chamber).
export function travelDaysBetween(from: string, to: string): number {
  if (from === to) return 0;
  const dist: Record<string, number> = { [from]: 0 };
  const queue = [from];
  while (queue.length) {
    queue.sort((a, b) => dist[a] - dist[b]);
    const cur = queue.shift()!;
    for (const c of getLocation(cur)?.connections ?? []) {
      const d = dist[cur] + c.travelDays;
      if (dist[c.to] === undefined || d < dist[c.to]) {
        dist[c.to] = d;
        queue.push(c.to);
      }
    }
  }
  return dist[to] ?? 99;
}
