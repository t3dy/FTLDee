import type { PoliticalWeatherEvent } from '../../core/types.js';

// The weather track: fixed sector-day events, shown on the map like FTL's
// advancing fleet. triggerDate counts from the start of the sector.

export const ALL_WEATHER_EVENTS: PoliticalWeatherEvent[] = [
  // ---------------------------------------------------------------- ENGLAND
  {
    id: 'weather_religious_scrutiny', sector: 'england', triggerDate: 45, triggered: false,
    title: 'Preachers against conjurors',
    description: 'London pulpits turn on astrologers and conjurors. Anyone known for occult learning is watched more closely.',
    historicalStatus: 'plausible',
    effects: { factionShifts: { religiousAuth: -8, elizabeth: -2 }, secrecyChange: -5, pressureIncrease: 5 },
  },
  {
    id: 'weather_calendar_reform', sector: 'england', triggerDate: 130, triggered: false,
    title: 'Calendar reform blocked',
    description: 'Burghley accepts Dee\'s reckoning, trimmed from eleven days to ten. The bishops refuse a calendar that comes from Rome. Another institutional hope stalls.',
    historicalStatus: 'documented',
    effects: { factionShifts: { religiousAuth: -5, burghley: 2, scholarNetwork: 4 }, pressureIncrease: 5 },
    sources: ['Parry 170–177', 'Whitby 490 n.34 (treatise delivered 26 Feb 1583)'],
  },
  {
    id: 'weather_laski_arrives', sector: 'england', triggerDate: 100, triggered: false,
    title: 'Albert Łaski arrives in England',
    description: 'The Polish magnate Albert Łaski is entertained at court and asks to meet Dee. Walsingham\'s people take note.',
    historicalStatus: 'documented',
    effects: { factionShifts: { walsingham: 3, continentalCourts: 5 }, flagsSet: ['laski_arrival'], pressureIncrease: 5 },
    sources: ['Parry 195–197', 'biography_timeline (September 1583 departure)'],
  },
  {
    id: 'weather_imperial_currency_falls', sector: 'england', triggerDate: 125, triggered: false,
    title: 'The imperial programme loses its moment',
    description: 'Court appetite for the British imperial claims has cooled. The Limites find fewer readers.',
    historicalStatus: 'plausible',
    effects: { factionShifts: { burghley: -6, leicester: -3 }, pressureIncrease: 10 },
  },

  // ---------------------------------------------------------------- THE ROAD
  {
    id: 'weather_fromond_creditors', sector: 'road', triggerDate: 30, triggered: false,
    title: 'Creditors at Mortlake',
    description: 'At home, Dee\'s creditors besiege Nicholas Fromond for unpaid debts; the bookseller Fremonsheim and Charles Sled go to law. Fromond is selling Dee\'s goods and collecting his rents.',
    historicalStatus: 'documented',
    effects: { factionShifts: { merchantNetwork: -5, scholarNetwork: -2 }, flagsSet: ['creditors_suing'] },
    sources: ['Parry 191–193'],
  },
  {
    id: 'weather_champernon', sector: 'road', triggerDate: 70, triggered: false,
    title: 'A report to Walsingham',
    description: 'An Englishman writes home to Walsingham that he found Dee at Kraków with his family, having quitted a certain estate for an uncertain hope, and likely to repent of it at leisure.',
    historicalStatus: 'documented',
    effects: { factionShifts: { walsingham: -4, elizabeth: -3 } },
    sources: ['Whitby 204', 'Parry 195–197'],
  },

  // ---------------------------------------------------------------- PRAGUE
  {
    id: 'weather_curtius', sector: 'prague', triggerDate: 15, triggered: false,
    title: 'Dr Curtius named intermediary',
    description: 'Rudolf names Dr Curtius to handle Dee\'s papers and audiences. The Emperor will be approached through him.',
    historicalStatus: 'documented',
    effects: { factionShifts: { continentalCourts: 2 }, flagsSet: ['curtius_intermediary'] },
    sources: ['Whitby 44–46'],
  },
  {
    id: 'weather_mortlake_spoiled', sector: 'road', triggerDate: 12, triggered: false,
    title: 'A vision of Mortlake',
    description: 'On the road, Kelley sees in the stone the library at Mortlake broken open. Dee cannot know whether it is true. (It was: in 1589 he found books and instruments taken by servants and friends who thought he would not return, not by the mob of later legend.)',
    historicalStatus: 'documented',
    effects: { factionShifts: { scholarNetwork: -3 }, flagsSet: ['mortlake_spoiled'] },
    sources: ['Fenton 126–128 n.6', 'Håkansson 31–33', 'Sherman 44–45'],
  },
  {
    id: 'weather_papal_inquiries', sector: 'prague', triggerDate: 60, triggered: false,
    title: 'The papal envoys take an interest',
    description: 'The bishop of Vercelli, then the nuncio Malaspina, ask after the Englishmen and their alchemy. The bishop of Vercelli writes that he thinks they prefer one philosopher\'s stone to ten visions of angels.',
    historicalStatus: 'documented',
    effects: { factionShifts: { religiousAuth: -8 }, secrecyChange: -5, pressureIncrease: 10 },
    sources: ['Harkness 70–72'],
  },
  {
    id: 'weather_nuncio_summons', sector: 'prague', triggerDate: 95, triggered: false,
    title: 'The nuncio\'s invitations become summons',
    description: 'After eight months of courtesies, Malaspina\'s requests turn threatening. Dee must go to him.',
    historicalStatus: 'documented',
    effects: { flagsSet: ['nuncio_summons'], pressureIncrease: 15 },
    sources: ['Harkness 70–72'],
  },
];
