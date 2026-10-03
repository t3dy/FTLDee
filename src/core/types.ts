// =============================================================================
// FTLDee — Core Types
// =============================================================================

// --- Historical Status -------------------------------------------------------

export type HistoricalStatus =
  | 'documented'
  | 'plausible'
  | 'contested'
  | 'counterfactual'
  | 'anachronistic';

// --- Resources ---------------------------------------------------------------

export interface Resources {
  money: number;          // Pounds sterling
  time: number;           // Days remaining in current period
  secrecy: number;        // 0-100: low = heavily scrutinised
  focus: number;          // 0-100: intellectual energy for research
}

// --- Skills / Faculties ------------------------------------------------------

export type SkillId =
  | 'mathematics'
  | 'astronomy'
  | 'astrology'
  | 'naturalPhilosophy'
  | 'cartography'
  | 'navigation'
  | 'alchemy'
  | 'occultPhilosophy'
  | 'kabbalah'
  | 'rhetoric'
  | 'manuscriptKnowledge'
  | 'courtlyIntelligence'
  | 'cryptography'
  | 'theology'
  | 'languages'
  | 'medicine';

export type Skills = Partial<Record<SkillId, number>>;

// --- Factions ----------------------------------------------------------------

export type FactionId =
  | 'elizabeth'
  | 'burghley'
  | 'leicester'
  | 'walsingham'
  | 'religiousAuth'
  | 'scholarNetwork'
  | 'merchantNetwork'
  | 'continentalCourts';

export type FactionRelationships = Partial<Record<FactionId, number>>;

// --- Books -------------------------------------------------------------------

export interface Book {
  id: string;
  title: string;
  author: string;
  date: string;
  subject: string;
  language: string;
  intellectualTags: string[];
  prerequisites: string[];
  operationsUnlocked: string[];
  historicalStatus: HistoricalStatus;
  rarity: 'common' | 'uncommon' | 'rare' | 'unique';
  value: number;
  portability: 'pocket' | 'portable' | 'large' | 'fixed';
  provenance: string;
  censorshipStatus: 'open' | 'controversial' | 'forbidden';
  notes: string;
  marginalia?: string;
}

// --- Instruments / Equipment -------------------------------------------------

export interface Instrument {
  id: string;
  name: string;
  type: string;
  operationsUnlocked: string[];
  condition: 'excellent' | 'good' | 'damaged';
  value: number;
}

// --- Characters / Crew -------------------------------------------------------

export type CharacterRole =
  | 'protagonist'
  | 'household'
  | 'secretary'
  | 'scholar'
  | 'court_contact'
  | 'alchemist'
  | 'scryer'
  | 'printer'
  | 'merchant'
  | 'diplomat';

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  age: number;
  abilities: Skills;
  potential: Skills;
  relationships: FactionRelationships;
  loyalty: number;          // 0-100
  health: number;           // 0-100
  reputation: FactionRelationships;
  politicalAffiliations: FactionId[];
  epistemicReliability: number; // 0-100: how reliable their reports are
  personalAgenda: string;
  secrets: string[];
  historicalStatus: HistoricalStatus;
  available: boolean;
  location: string;
  // Placeholder fields for future Kelley/Arthur expansion
  developmentBranches?: string[];
}

// --- Locations ---------------------------------------------------------------

export type LocationType =
  | 'household'
  | 'royal_court'
  | 'city'
  | 'monastery'
  | 'university'
  | 'noble_estate'
  | 'port'
  | 'printing_house';

export interface LocationConnection {
  to: string;
  travelDays: number;
  travelCost: number;
  risk: 'low' | 'medium' | 'high';
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  description: string;
  historicalPeriod: string;
  connections: LocationConnection[];
  availableEncounterIds: string[];
  factionPresence: FactionId[];
  intellectualOpportunities: string[];
  requirements?: {
    minFaction?: Partial<Record<FactionId, number>>;
    flags?: string[];
  };
  unlocked: boolean;
}

// --- Encounters --------------------------------------------------------------

export interface RequirementSpec {
  skills?: Partial<Record<SkillId, number>>;
  books?: string[];
  contacts?: string[];
  instruments?: string[];
  minFaction?: Partial<Record<FactionId, number>>;
  minMoney?: number;
  flags?: string[];
}

export interface OutcomeSpec {
  description: string;
  money?: number;
  time?: number;
  reputation?: FactionRelationships;
  secrecyChange?: number;
  focusChange?: number;
  booksGained?: string[];
  booksLost?: string[];
  contactsGained?: string[];
  flagsSet?: string[];
  unlockLocations?: string[];
  unlockEncounters?: string[];
  leadToEncounterId?: string;
  roomUpgrade?: { room: keyof HouseholdState['rooms']; level: 1 | 2 };
  ottomanSignal?: boolean;  // increment the Ottoman signal counter
}

export interface EncounterChoice {
  id: string;
  text: string;
  requirements?: RequirementSpec;
  costs?: {
    money?: number;
    time?: number;
    focus?: number;
  };
  outcome: OutcomeSpec;
  isBlueOption?: boolean;
  blueLabel?: string;
  scalingSkill?: SkillId;  // when set, money/reputation scale with this skill level
}

export interface Encounter {
  id: string;
  title: string;
  locationId: string;
  historicalStatus: HistoricalStatus;
  description: string;
  flavorText?: string;
  participants: string[];
  choices: EncounterChoice[];
  repeatable: boolean;
  followUpEncounterIds?: string[];
  triggerConditions?: {
    flags?: string[];
    minFaction?: Partial<Record<FactionId, number>>;
  };
}

// --- Political Weather -------------------------------------------------------

export interface PoliticalWeatherEvent {
  id: string;
  title: string;
  description: string;
  historicalStatus: HistoricalStatus;
  effects: {
    factionShifts?: FactionRelationships;
    unlockEncounters?: string[];
    lockEncounters?: string[];
    pressureIncrease?: number;
  };
  triggerDate?: number; // days from campaign start
  triggered: boolean;
}

// --- Game State --------------------------------------------------------------

export type RoomLevel = 0 | 1 | 2;

export interface HouseholdState {
  name: string;
  stability: number;    // 0-100
  staff: number;
  rooms: {
    library: RoomLevel;        // 0=none, 1=small, 2=Mortlake scale
    study: RoomLevel;
    laboratory: RoomLevel;
    scryingChamber: RoomLevel;
    instrumentRoom: RoomLevel;
    correspondence: RoomLevel;
    quarters: RoomLevel;
  };
}

export interface GameState {
  // Meta
  seed: number;
  version: string;
  day: number;                  // campaign day counter
  campaignPhase: 'early' | 'mid' | 'late' | 'transition';
  totalPressure: number;        // 0-100: political/career urgency

  // Player character
  protagonist: Character;

  // Household
  household: HouseholdState;
  crew: Character[];

  // Resources
  resources: Resources;

  // Faction relationships
  factions: FactionRelationships;

  // Intellectual capital
  library: Book[];
  instruments: Instrument[];
  knowledgeTags: string[];      // unlocked knowledge/operation tags
  operations: string[];         // currently available operations

  // World state
  currentLocationId: string;
  visitedLocationIds: string[];
  completedEncounterIds: string[];
  activeEncounterId: string | null;
  flags: string[];              // boolean world state flags
  ottomanSignalCount: number;   // 0-5; fires ottoman_thread_open at 3

  // Political weather
  weatherEvents: PoliticalWeatherEvent[];

  // Career tracking
  careerEvents: Array<{
    day: number;
    description: string;
    historicalStatus: HistoricalStatus;
  }>;

  // UI state
  screen: 'household' | 'map' | 'encounter' | 'journal' | 'career_transition';
  pendingEncounter: Encounter | null;
  log: string[];
}

// --- Save/Load ---------------------------------------------------------------

export interface SaveData {
  version: string;
  timestamp: number;
  state: GameState;
}
