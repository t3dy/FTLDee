import type { PoliticalWeatherEvent } from '../../core/types.js';

export const ALL_WEATHER_EVENTS: PoliticalWeatherEvent[] = [
  {
    id: 'weather_laski_arrives',
    title: 'Albert Laski Arrives in England',
    description: 'The Polish magnate Albert Łaski arrives in England, sparking rumors about occult consultations and continental adventure. Walsingham notes his presence.',
    historicalStatus: 'documented',
    effects: {
      factionShifts: { walsingham: 5 },
      unlockEncounters: ['laski_arrival'],
    },
    triggerDate: 60,
    triggered: false,
  },
  {
    id: 'weather_religious_scrutiny',
    title: 'Puritan Pressure on Court',
    description: 'Puritan preachers in London increase their criticism of occult and astrological practices. The religious authorities become watchful.',
    historicalStatus: 'plausible',
    effects: {
      factionShifts: { religiousAuth: -10, elizabeth: -3 },
    },
    triggerDate: 90,
    triggered: false,
  },
  {
    id: 'weather_calendar_reform',
    title: 'Calendar Reform Blocked',
    description: 'The English bishops have blocked Dee\'s proposal for Gregorian calendar reform, adopted in Catholic Europe. Another institutional hope frustrated.',
    historicalStatus: 'documented',
    effects: {
      factionShifts: { religiousAuth: -5, burghley: -5, scholarNetwork: 5 },
    },
    triggerDate: 110,
    triggered: false,
  },
  {
    id: 'weather_imperial_currency_falls',
    title: 'Imperial Ideology Loses Currency',
    description: 'The political momentum behind English imperial expansion has shifted. Dee\'s Brytanici Imperii Limites proposals no longer find the same court reception.',
    historicalStatus: 'plausible',
    effects: {
      factionShifts: { burghley: -8, leicester: -3 },
    },
    triggerDate: 130,
    triggered: false,
  },
];
