import type { Location } from '../../core/types.js';

export const ALL_LOCATIONS: Location[] = [
  {
    id: 'mortlake',
    name: 'Mortlake',
    type: 'household',
    description: 'Dee\'s home and library on the Thames in Surrey. The best private library in England. The intellectual center of his operations. Jane Dee manages the household.',
    historicalPeriod: 'c. 1580',
    connections: [
      { to: 'richmond', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'london', travelDays: 1, travelCost: 1, risk: 'low' },
    ],
    availableEncounterIds: ['mortlake_household', 'mortlake_research', 'mortlake_correspondence'],
    factionPresence: ['scholarNetwork'],
    intellectualOpportunities: ['research', 'bookAcquisition', 'correspondence', 'householdManagement'],
    unlocked: true,
  },
  {
    id: 'richmond',
    name: 'Richmond Palace',
    type: 'royal_court',
    description: 'A favorite royal residence of Elizabeth I, particularly in summer. Access to the Queen and her immediate circle. The most direct route to royal favor and personal consultation.',
    historicalPeriod: 'c. 1580',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 2, travelCost: 2, risk: 'low' },
      { to: 'windsor', travelDays: 2, travelCost: 3, risk: 'low' },
    ],
    availableEncounterIds: ['elizabeths_interest', 'royal_consultation'],
    factionPresence: ['elizabeth', 'leicester'],
    intellectualOpportunities: ['royalConsultation', 'courtAppearance', 'astrologyCommission'],
    requirements: {
      minFaction: { elizabeth: 30 },
    },
    unlocked: true,
  },
  {
    id: 'greenwich',
    name: 'Greenwich',
    type: 'royal_court',
    description: 'Royal Palace of Greenwich, birthplace of Elizabeth I. A center of the court network, naval administration, and continental contact. Leicester and Sidney maintain a presence here.',
    historicalPeriod: 'c. 1580',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'richmond', travelDays: 2, travelCost: 2, risk: 'low' },
      { to: 'london', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'barn_elms', travelDays: 2, travelCost: 2, risk: 'low' },
    ],
    availableEncounterIds: ['greenwich_network', 'navigational_commission'],
    factionPresence: ['elizabeth', 'leicester', 'burghley'],
    intellectualOpportunities: ['navalConsultation', 'continentalContact', 'patronageSeeking'],
    unlocked: true,
  },
  {
    id: 'windsor',
    name: 'Windsor Castle',
    type: 'royal_court',
    description: 'Royal stronghold and court, used especially for formal occasions. The comet consultations took place here. Heavy court presence; both political opportunity and political danger.',
    historicalPeriod: 'c. 1580',
    connections: [
      { to: 'richmond', travelDays: 2, travelCost: 3, risk: 'low' },
      { to: 'london', travelDays: 2, travelCost: 3, risk: 'low' },
    ],
    availableEncounterIds: ['comet_at_windsor', 'court_political_encounter'],
    factionPresence: ['elizabeth', 'burghley', 'religiousAuth'],
    intellectualOpportunities: ['royalConsultation', 'politicalIntelligence', 'courtAppearance'],
    requirements: {
      minFaction: { elizabeth: 40 },
    },
    unlocked: true,
  },
  {
    id: 'barn_elms',
    name: 'Barn Elms',
    type: 'noble_estate',
    description: 'Walsingham\'s country house at Barnes, close to Mortlake. The center of his intelligence network in England. A place of secret consultations and coded correspondence.',
    historicalPeriod: 'c. 1580',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 2, travelCost: 2, risk: 'low' },
    ],
    availableEncounterIds: ['walsingham_intelligence', 'cipher_consultation'],
    factionPresence: ['walsingham'],
    intellectualOpportunities: ['intelligenceWork', 'cipherAnalysis', 'continentalInformation'],
    requirements: {
      minFaction: { walsingham: 30 },
    },
    unlocked: true,
  },
  {
    id: 'london',
    name: 'London',
    type: 'city',
    description: 'The commercial and intellectual hub. Booksellers on Paul\'s Churchyard, instrument makers, merchants with continental contacts, and printers. A market for Dee\'s expertise.',
    historicalPeriod: 'c. 1580',
    connections: [
      { to: 'mortlake', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'greenwich', travelDays: 1, travelCost: 1, risk: 'low' },
      { to: 'windsor', travelDays: 2, travelCost: 3, risk: 'medium' },
    ],
    availableEncounterIds: ['london_booksellers', 'london_merchant', 'london_instrument_maker'],
    factionPresence: ['merchantNetwork', 'scholarNetwork'],
    intellectualOpportunities: ['bookAcquisition', 'instrumentPurchase', 'merchantContact', 'navigationCommission'],
    unlocked: true,
  },
];

export function getLocation(id: string): Location | undefined {
  return ALL_LOCATIONS.find(l => l.id === id);
}

export function getAccessibleLocations(currentId: string, factions: Partial<Record<string, number>>, flags: string[]): Location[] {
  const current = ALL_LOCATIONS.find(l => l.id === currentId);
  if (!current) return [];

  return current.connections
    .map(c => ALL_LOCATIONS.find(l => l.id === c.to))
    .filter((loc): loc is Location => {
      if (!loc) return false;
      if (!loc.unlocked) return false;
      if (!loc.requirements) return true;
      if (loc.requirements.minFaction) {
        for (const [fid, minVal] of Object.entries(loc.requirements.minFaction)) {
          if ((factions[fid] ?? 0) < minVal) return false;
        }
      }
      if (loc.requirements.flags) {
        for (const flag of loc.requirements.flags) {
          if (!flags.includes(flag)) return false;
        }
      }
      return true;
    });
}
