import type { Character } from '../../core/types.js';

export const DEE_CHARACTER: Character = {
  id: 'dee',
  name: 'John Dee',
  role: 'protagonist',
  age: 52,
  abilities: {
    mathematics: 9,
    astronomy: 8,
    astrology: 7,
    naturalPhilosophy: 8,
    cartography: 7,
    navigation: 6,
    alchemy: 5,
    occultPhilosophy: 8,
    kabbalah: 6,
    rhetoric: 7,
    manuscriptKnowledge: 8,
    courtlyIntelligence: 6,
    cryptography: 6,
    theology: 5,
    languages: 7,
    medicine: 4,
  },
  potential: {
    astronomy: 9,
    astrology: 9,
    alchemy: 7,
    occultPhilosophy: 10,
    kabbalah: 8,
  },
  relationships: {
    elizabeth: 55,
    burghley: 40,
    leicester: 45,
    walsingham: 50,
    religiousAuth: 30,
    scholarNetwork: 65,
  },
  loyalty: 100,
  health: 75,
  reputation: {
    elizabeth: 55,
    scholarNetwork: 70,
    merchantNetwork: 30,
  },
  politicalAffiliations: [],
  epistemicReliability: 85,
  personalAgenda: 'Establish a permanent, well-funded research institution combining mathematics, natural philosophy, and occult studies under royal patronage.',
  secrets: ['Catholic past under Mary I', 'Early service to Elizabeth as occult consultant (1555)'],
  historicalStatus: 'documented',
  available: true,
  location: 'mortlake',
  developmentBranches: ['mathematician', 'astrologer', 'angelist', 'alchemist', 'imperial_advisor'],
};

export const JANE_DEE: Character = {
  id: 'jane_dee',
  name: 'Jane Dee',
  role: 'household',
  age: 30,
  abilities: {
    rhetoric: 6,
    manuscriptKnowledge: 4,
    courtlyIntelligence: 5,
    languages: 3,
  },
  potential: {
    courtlyIntelligence: 7,
    rhetoric: 7,
  },
  relationships: {
    scholarNetwork: 40,
    merchantNetwork: 30,
  },
  loyalty: 95,
  health: 85,
  reputation: {},
  politicalAffiliations: [],
  epistemicReliability: 90,
  personalAgenda: 'Maintain the Mortlake household and family stability during Dee\'s absences and during the increasingly uncertain political climate.',
  secrets: [],
  historicalStatus: 'documented',
  available: true,
  location: 'mortlake',
};

export const ROGER_COOKE: Character = {
  id: 'roger_cooke',
  name: 'Roger Cooke',
  role: 'secretary',
  age: 28,
  abilities: {
    manuscriptKnowledge: 6,
    languages: 5,
    mathematics: 4,
    rhetoric: 5,
  },
  potential: {
    manuscriptKnowledge: 8,
    cryptography: 5,
  },
  relationships: {
    scholarNetwork: 35,
  },
  loyalty: 75,
  health: 90,
  reputation: {},
  politicalAffiliations: [],
  epistemicReliability: 80,
  personalAgenda: 'Advance his position through service to Dee, ideally gaining access to the wider scholarly network.',
  secrets: [],
  historicalStatus: 'plausible',
  available: true,
  location: 'mortlake',
};

// Kelley — not in the vertical slice, but the schema is ready
export const EDWARD_KELLEY_SCHEMA: Character = {
  id: 'edward_kelley',
  name: 'Edward Kelley',
  role: 'scryer',
  age: 25,
  abilities: {
    alchemy: 7,
    occultPhilosophy: 6,
    rhetoric: 5,
    // scrying ability would require a new skill: 'scrying': 8
  },
  potential: {
    alchemy: 10,
    occultPhilosophy: 9,
  },
  relationships: {},
  loyalty: 40,        // low starting loyalty; will shift dramatically
  health: 80,
  reputation: {},
  politicalAffiliations: [],
  epistemicReliability: 30, // very low: his angelic revelations cannot be trusted as political intelligence
  personalAgenda: 'Pursue alchemical transmutation and secure patronage for his own experiments, using Dee\'s social network.',
  secrets: ['Criminal past; ears cropped for forgery', 'Unclear whether scrying visions are genuine or constructed'],
  historicalStatus: 'documented',
  available: false,   // not available in vertical slice; encountered through event
  location: 'unknown',
  developmentBranches: ['alchemist_tree', 'scrying_tree'],
};

// Arthur Dee — placeholder for protagonist transfer
export const ARTHUR_DEE_SCHEMA: Character = {
  id: 'arthur_dee',
  name: 'Arthur Dee',
  role: 'scholar',
  age: 7,   // age c. 1580
  abilities: {},
  potential: {
    mathematics: 8,
    alchemy: 9,
    medicine: 8,
    manuscriptKnowledge: 7,
  },
  relationships: {},
  loyalty: 100,
  health: 100,
  reputation: {},
  politicalAffiliations: [],
  epistemicReliability: 85,
  personalAgenda: 'To be determined by player choices.',
  secrets: [],
  historicalStatus: 'documented',
  available: false,
  location: 'mortlake',
  developmentBranches: ['physician', 'chymist', 'archivist', 'rosicrucian', 'skeptic', 'synthesist'],
};

// Ibn Turka — placeholder for campaign expansion
export const IBN_TURKA_SCHEMA: Character = {
  id: 'ibn_turka',
  name: 'Ṣāʾin al-Dīn ʿAlī ibn Turka Iṣfahānī',
  role: 'protagonist',
  age: 40,  // approximate at start of court career
  abilities: {
    // jurisprudence is the dominant starting skill — not currently in SkillId
    // would require: jurisprudence, lettrism, geomancy etc.
    theology: 8,
    mathematics: 5,
    astronomy: 4,
    rhetoric: 7,
    languages: 8,
  },
  potential: {
    mathematics: 9,
    astronomy: 8,
    theology: 10,
  },
  relationships: {},
  loyalty: 100,
  health: 80,
  reputation: {},
  politicalAffiliations: [],
  epistemicReliability: 90,
  personalAgenda: 'Construct a universal science unifying law, letters, number, cosmology, and occult practice — and secure imperial patronage for it.',
  secrets: ['Three inquisitions await if the synthesis becomes politically prominent'],
  historicalStatus: 'documented',
  available: false,
  location: 'cairo',
  developmentBranches: ['lettrist_synthesis', 'court_jurist', 'astronomical_mathematician', 'networked_philosopher'],
};
