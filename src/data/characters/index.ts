import type { Character } from '../../core/types.js';

export const DEE_CHARACTER: Character = {
  id: 'dee', name: 'John Dee', role: 'protagonist', age: 52,
  abilities: {
    mathematics: 9, astronomy: 8, astrology: 7, naturalPhilosophy: 8, cartography: 7,
    navigation: 6, alchemy: 5, occultPhilosophy: 7, kabbalah: 5, rhetoric: 6,
    manuscriptKnowledge: 8, courtlyIntelligence: 5, cryptography: 6, theology: 5,
    languages: 7, medicine: 4,
  },
  potential: { astronomy: 9, astrology: 9, alchemy: 7, occultPhilosophy: 10, kabbalah: 8 },
  relationships: {}, loyalty: 100, health: 75, reputation: {},
  politicalAffiliations: [], epistemicReliability: 85,
  personalAgenda: 'A permanent, endowed institution for mathematics, natural philosophy and the occult sciences under royal patronage.',
  secrets: ['Arrest and examination in 1555', 'Remanded to Bishop Bonner\'s household'],
  historicalStatus: 'documented', available: true, location: 'mortlake',
  developmentBranches: ['mathematician', 'astrologer', 'angelist', 'alchemist', 'imperial_advisor'],
  sources: ['Parry 2–37', 'Harkness 11–15'], glyph: 'person',
};

export const JANE_DEE: Character = {
  id: 'jane_dee', name: 'Jane Dee', role: 'household', age: 25,
  abilities: { rhetoric: 6, manuscriptKnowledge: 3, courtlyIntelligence: 5, medicine: 4 },
  potential: { courtlyIntelligence: 7, rhetoric: 7 },
  relationships: {}, loyalty: 95, health: 85, reputation: {},
  politicalAffiliations: [], epistemicReliability: 90,
  personalAgenda: 'Keep the household solvent and the children safe while her husband spends on books, furnaces and voyages.',
  secrets: [],
  historicalStatus: 'documented', available: true, location: 'mortlake',
  sources: ['Fell Smith 33–34 (Jane Fromonds, lady-in-waiting to Lady Howard of Effingham)', 'Fenton, Diaries'],
  glyph: 'person',
  flavor: 'Before her marriage she served at court; she knows its doors better than the library\'s.',
};

export const ROGER_COOKE: Character = {
  id: 'roger_cooke', name: 'Roger Cooke', role: 'alchemist', age: 27,
  abilities: { alchemy: 6, manuscriptKnowledge: 5, languages: 4, mathematics: 4, rhetoric: 3 },
  potential: { manuscriptKnowledge: 8, cryptography: 5 },
  relationships: {}, loyalty: 75, health: 90, reputation: {},
  politicalAffiliations: [], epistemicReliability: 80,
  personalAgenda: 'With Dee since the age of fourteen; wants a life of his own.',
  secrets: ['Dee revealed to him the great secret of the elixir of the salt (Fenton 20–21).'],
  historicalStatus: 'documented', available: true, location: 'mortlake',
  sources: ['Fenton 20–28 (asks licence to depart, 5 Sept 1581)', 'Fenton 341–342 (alchemical assistant; succeeded by Robert Gardner)'], glyph: 'person',
};

export const BARNABAS_SAUL: Character = {
  id: 'barnabas_saul', name: 'Barnabas Saul', role: 'scryer', age: 30,
  abilities: { occultPhilosophy: 4, rhetoric: 3 },
  potential: { occultPhilosophy: 5 },
  relationships: {}, loyalty: 50, health: 80, reputation: {},
  politicalAffiliations: [], epistemicReliability: 30,
  personalAgenda: 'Keep a paying place in a learned household.',
  secrets: ['In March 1582 he told Dee he no longer saw or heard spiritual creatures.'],
  historicalStatus: 'documented', available: false, location: 'mortlake',
  sources: ['Whitby 1–15, 27–29', 'age invented; birth unrecorded (Whitby 49–50)'], glyph: 'person',
};

export const EDWARD_KELLEY: Character = {
  id: 'edward_kelley', name: 'Edward Kelley', role: 'scryer', age: 27,
  abilities: { alchemy: 7, occultPhilosophy: 7, rhetoric: 6, kabbalah: 4 },
  potential: { alchemy: 10, occultPhilosophy: 9 },
  relationships: {}, loyalty: 45, health: 80, reputation: {},
  politicalAffiliations: [], epistemicReliability: 35,
  personalAgenda: 'Alchemical patronage of his own, using Dee\'s network to reach it.',
  secrets: ['Later tradition says his ears were cropped for forgery (LEGEND, not attested in the corpus).'],
  historicalStatus: 'documented', available: false, location: 'unknown',
  developmentBranches: ['alchemist_tree', 'scrying_tree'],
  sources: ['Whitby', 'Harkness', 'Parry 202–205'], glyph: 'person',
};

export const ARTHUR_DEE_SCHEMA: Character = {
  id: 'arthur_dee', name: 'Arthur Dee', role: 'scholar', age: 1,
  abilities: {}, potential: { mathematics: 8, alchemy: 9, medicine: 8, manuscriptKnowledge: 7 },
  relationships: {}, loyalty: 100, health: 100, reputation: {},
  politicalAffiliations: [], epistemicReliability: 85,
  personalAgenda: 'To be determined by player choices.',
  secrets: [], historicalStatus: 'documented', available: false, location: 'mortlake',
  developmentBranches: ['physician', 'chymist', 'archivist'],
  sources: ['Fenton, Diaries (born 1579, on Dee\'s fifty-second birthday)'], glyph: 'person',
};

export const IBN_TURKA_SCHEMA: Character = {
  id: 'ibn_turka', name: 'Ṣāʾin al-Dīn ʿAlī ibn Turka Iṣfahānī', role: 'protagonist', age: 40,
  abilities: { theology: 8, mathematics: 5, astronomy: 4, rhetoric: 7, languages: 8 },
  potential: { mathematics: 9, astronomy: 8, theology: 10 },
  relationships: {}, loyalty: 100, health: 80, reputation: {},
  politicalAffiliations: [], epistemicReliability: 90,
  personalAgenda: 'A universal science of law, letters, number and cosmos, under imperial patronage.',
  secrets: [], historicalStatus: 'documented', available: false, location: 'samarkand',
  developmentBranches: ['lettrist_synthesis', 'court_jurist'],
  sources: ['TurkaGame/CLAUDE.md (Melvin-Koushki 2012)'], glyph: 'person',
};

export const ALL_CREW: Character[] = [JANE_DEE, ROGER_COOKE, BARNABAS_SAUL, EDWARD_KELLEY];

export function getCrewDef(id: string): Character | undefined {
  return ALL_CREW.find(c => c.id === id);
}
