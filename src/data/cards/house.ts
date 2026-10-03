import type { HouseTierCard, BaseId } from '../../core/types.js';

// The house itself is upgradeable when Dee's fortune allows. Tier caps how
// far each room can be built, adds crew stations, and (tier 3) pays a stipend.

export const HOUSE_TIERS: HouseTierCard[] = [
  {
    id: 'mortlake_1', base: 'mortlake', tier: 1,
    name: 'The house at Mortlake',
    summary: 'The family house by the Thames where Dee settled after his return from Antwerp in 1564. Rooms can be built to level 2.',
    historicalStatus: 'documented',
    cost: 0, days: 0, minFortune: 0, maxRoomLevel: 2, extraStations: 0, stipendPerTenDays: 0,
    sources: ['Clulee, Ambix 52.3, 15–16'], glyph: 'house',
  },
  {
    id: 'mortlake_2', base: 'mortlake', tier: 2,
    name: 'Mortlake enlarged',
    summary: 'Adjoining rooms and outbuildings taken in. Rooms can be built to level 3 and each room holds one more worker.',
    historicalStatus: 'plausible',
    cost: 80, days: 20, minFortune: 3, maxRoomLevel: 3, extraStations: 1, stipendPerTenDays: 0,
    sources: ['Whitby 36–39 (library, laboratories and travel as Dee\'s great costs)'], glyph: 'house',
    flavor: 'The building programme of a man who expects the reward to come.',
  },
  {
    id: 'mortlake_3', base: 'mortlake', tier: 3,
    name: 'A royal foundation at Mortlake',
    summary: 'The endowed institution Dee sought and never received: a crown stipend for the library, laboratories and instruments.',
    historicalStatus: 'counterfactual',
    cost: 60, days: 15, minFortune: 4,
    requires: { minFaction: { elizabeth: 80, burghley: 50 }, flags: ['royal_grant_drafted'] },
    maxRoomLevel: 3, extraStations: 2, stipendPerTenDays: 12,
    sources: ['Sherman (the failed offices are the career)', 'DEE_MASTER_BIOGRAPHY, Vitals'], glyph: 'crown',
    flavor: 'COUNTERFACTUAL. The record has the petitions; it does not have the grant.',
  },
  {
    id: 'road_1', base: 'road', tier: 1,
    name: 'On the road with Łaski',
    summary: 'Ships from beyond Gravesend, a Dutch hoy, coaches across the Baltic coast and Poland. Rooms can be built to level 1 only; what you carry is what you have.',
    historicalStatus: 'documented',
    cost: 0, days: 0, minFortune: 0, maxRoomLevel: 1, extraStations: 0, stipendPerTenDays: 0,
    sources: ['Whitby 42–46', 'Fell Smith 69–70'], glyph: 'road',
  },
  {
    id: 'hajek_1', base: 'hajek_house', tier: 1,
    name: 'Lodging with Hájek',
    summary: 'Rooms in the house of Tadeáš Hájek, physician and astronomer, whose study served for alchemical work. Rooms can be built to level 2.',
    historicalStatus: 'documented',
    cost: 0, days: 0, minFortune: 0, maxRoomLevel: 2, extraStations: 0, stipendPerTenDays: 0,
    sources: ['Szőnyi 279', 'Sherman 28–32, 81–85', 'Clulee, Ambix 52.3, 4–5'], glyph: 'house',
  },
  {
    id: 'hajek_2', base: 'hajek_house', tier: 2,
    name: 'A house near the Old Town market',
    summary: 'On 12 January 1585 Dee moved to another house near the marketplace in Old Prague. Rooms can be built to level 3.',
    historicalStatus: 'documented',
    cost: 30, days: 6, minFortune: 2, maxRoomLevel: 3, extraStations: 1, stipendPerTenDays: 0,
    sources: ['Whitby 46–48'], glyph: 'house',
  },
];

export function houseTier(base: BaseId, tier: number): HouseTierCard {
  return HOUSE_TIERS.find(h => h.base === base && h.tier === tier)!;
}

export function nextHouseTier(base: BaseId, tier: number): HouseTierCard | undefined {
  return HOUSE_TIERS.find(h => h.base === base && h.tier === tier + 1);
}
