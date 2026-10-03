// =============================================================================
// FTLDee — Core Types
// Every game object is a CARD: it carries CardMeta (sources, glyph, flavour)
// alongside its rules data. src/data/cards/index.ts flattens them for the Codex
// and the cards.json / cards.sqlite export.
// =============================================================================

export type HistoricalStatus =
  | 'documented'
  | 'plausible'
  | 'contested'
  | 'counterfactual'
  | 'anachronistic';

export type CardCategory =
  | 'house'
  | 'room'
  | 'book'
  | 'instrument'
  | 'crew'
  | 'location'
  | 'errand'
  | 'encounter'
  | 'faction'
  | 'skill'
  | 'weather'
  | 'associate'
  | 'biography';

export interface CardMeta {
  sources: string[];     // short citations, e.g. "Whitby 36–39"
  glyph: string;         // key into ui/glyphs.ts
  flavor?: string;
}

// --- Resources ---------------------------------------------------------------

export interface Resources {
  money: number;          // pounds
  time: number;           // days remaining in the current sector
  secrecy: number;        // 0-100: low = heavily scrutinised (the hull)
  focus: number;          // 0-100: intellectual energy
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

export type SkillBranch = 'mathematical' | 'political' | 'occult' | 'cross';

export interface SkillCard extends CardMeta {
  id: SkillId;
  name: string;
  branch: SkillBranch;
  summary: string;
  historicalStatus: HistoricalStatus;
  rooms: RoomId[];        // rooms whose level boosts this skill at base
}

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

export interface FactionCard extends CardMeta {
  id: FactionId;
  name: string;
  summary: string;
  wants: string;
  historicalStatus: HistoricalStatus;
}

// --- Rooms (the ship's systems) ----------------------------------------------

export type RoomId =
  | 'library'
  | 'study'
  | 'scriptorium'
  | 'correspondence'
  | 'laboratory'
  | 'scryingChamber'
  | 'instrumentRoom'
  | 'quarters';

export type RoomLevel = 0 | 1 | 2 | 3;

export interface RoomLevelSpec {
  level: 1 | 2 | 3;
  cost: number;
  days: number;
  label: string;
  effect: string;
  requires?: RequirementSpec;
}

export interface RoomCard extends CardMeta {
  id: RoomId;
  name: string;
  summary: string;
  historicalStatus: HistoricalStatus;
  keySkills: SkillId[];   // boosted by +1 at level 2, +2 at level 3, +1 more when manned
  stations: number;       // crew who can work here at once
  levels: RoomLevelSpec[];
}

export type BaseId = 'mortlake' | 'road' | 'hajek_house';

export type FortuneRank = 0 | 1 | 2 | 3 | 4;  // destitute .. endowed

export interface HouseTierCard extends CardMeta {
  id: string;
  base: BaseId;
  tier: 1 | 2 | 3;
  name: string;
  summary: string;
  historicalStatus: HistoricalStatus;
  cost: number;
  days: number;
  minFortune: FortuneRank;
  requires?: RequirementSpec;
  maxRoomLevel: RoomLevel;
  extraStations: number;
  stipendPerTenDays: number;
}

export interface BaseLayout {
  id: BaseId;
  name: string;
  locationId: string;
  width: number;
  height: number;
  rooms: Array<{ room: RoomId; x: number; y: number; w: number; h: number; label?: string }>;
  note: string;
  start: Record<RoomId, RoomLevel>;
}

// --- Books -------------------------------------------------------------------

export interface Book extends CardMeta {
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
  skillBonus?: Partial<Record<SkillId, number>>;  // granted while the book is usable
}

// --- Instruments (augments) --------------------------------------------------

export interface InstrumentCard extends CardMeta {
  id: string;
  name: string;
  kind: 'instrument' | 'ritual' | 'travel';
  summary: string;
  historicalStatus: HistoricalStatus;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'unique';
  skillBonus?: Partial<Record<SkillId, number>>;
  baseOnly: boolean;       // bonus applies only while Dee is at the household base
  travels: boolean;        // goes with the household if it emigrates
  satchelBonus?: number;   // extra travelling-satchel slots
  market?: boolean;        // can appear in market stock
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

export interface Character extends CardMeta {
  id: string;
  name: string;
  role: CharacterRole;
  age: number;
  abilities: Skills;
  potential: Skills;
  relationships: FactionRelationships;
  loyalty: number;
  health: number;
  reputation: FactionRelationships;
  politicalAffiliations: FactionId[];
  epistemicReliability: number;
  personalAgenda: string;
  secrets: string[];
  historicalStatus: HistoricalStatus;
  available: boolean;
  location: string;
  developmentBranches?: string[];
}

export type CrewPost =
  | { kind: 'room'; room: RoomId }
  | { kind: 'retinue' }
  | { kind: 'errand'; errandId: string; locationId: string; returnDay: number; returnRoom: RoomId };

// --- Locations ---------------------------------------------------------------

export type SectorId = 'england' | 'road' | 'prague';

export type LocationType =
  | 'household'
  | 'royal_court'
  | 'city'
  | 'monastery'
  | 'university'
  | 'noble_estate'
  | 'port'
  | 'printing_house'
  | 'bridge'
  | 'collection'
  | 'embassy'
  | 'castle'
  | 'shop';

export interface LocationConnection {
  to: string;
  travelDays: number;
  travelCost: number;
  risk: 'low' | 'medium' | 'high';
}

export interface MarketSpec {
  name: string;
  stockSize: number;
  bookPool: string[];
  instrumentPool: string[];
}

export interface Location extends CardMeta {
  id: string;
  name: string;
  sector: SectorId;
  x: number;               // map coordinates in the sector's SVG
  y: number;
  type: LocationType;
  description: string;
  historicalPeriod: string;
  historicalStatus: HistoricalStatus;
  connections: LocationConnection[];
  availableEncounterIds: string[];
  factionPresence: FactionId[];
  intellectualOpportunities: string[];
  market?: MarketSpec;
  errands?: string[];
  requirements?: {
    minFaction?: Partial<Record<FactionId, number>>;
    flags?: string[];
  };
  unlocked: boolean;

  // Location asset layer (new)
  buildings?: LocationBuilding[];
  stations?: LocationStation[];
  residents?: LocationResident[];
  objects?: LocationObject[];
  documents?: LocationDocument[];
  services?: LocationService[];
  referenceAssets?: ReferenceAsset[];
  audioAssets?: AudioAsset[];
  currentState?: LocationState;
  stateTransitions?: LocationState[];
}

// --- Location Assets (Locations as composable historical environments) ------

export type LocationState =
  | 'normal'
  | 'developed'
  | 'degraded'
  | 'abandoned'
  | 'damaged'
  | 'departure_preparation'
  | 'inaccessible'
  | 'custom'; // for location-specific states like prague_nuncio_pressure

export interface LocationBuilding {
  id: string;
  name: string;
  description?: string;
  type: 'structure' | 'wing' | 'chamber' | 'outdoor';
  stationIds: string[];        // stations within this building
  historicalStatus: HistoricalStatus;
  symbol?: string;             // visual/glyph identifier
}

export interface LocationStation {
  id: string;
  name: string;
  buildingId?: string;         // which building contains this station
  type: StationType;
  capacity: number;            // how many crew can work here simultaneously
  skillBonus?: Partial<Record<SkillId, number>>;
  skillCost?: Partial<Record<SkillId, number>>; // skills trained here cost focus
  encounterWeight?: number;    // multiplier on encounter triggers while crew present
  description?: string;
  symbol?: string;
}

export type StationType =
  | 'library'
  | 'study'
  | 'laboratory'
  | 'workshop'
  | 'courtyard'
  | 'chamber'
  | 'archive'
  | 'audience'
  | 'market'
  | 'garden'
  | 'observatory'
  | 'chapel'
  | 'scriptorium'
  | 'correspondence'
  | 'quarters'
  | 'kitchen'
  | 'other';

export interface LocationResident {
  characterId: string;
  role: 'permanent' | 'seasonal' | 'transient' | 'visiting';
  stationPreference?: string;  // where they're usually found
  historicalStatus: HistoricalStatus;
  availability?: string;       // "spring" or "during Prague" etc
}

export interface LocationObject {
  id: string;
  name: string;
  category: 'instrument' | 'furnishing' | 'artwork' | 'apparatus' | 'material' | 'relic';
  description?: string;
  skillBonus?: Partial<Record<SkillId, number>>;
  portable: boolean;
  historicalStatus: HistoricalStatus;
  requiresBook?: string;       // must know about this object via a book
  sources?: string[];
}

export interface LocationDocument {
  id: string;
  title: string;
  type: 'letter' | 'petition' | 'catalogue' | 'license' | 'contract' | 'report' | 'record' | 'manuscript';
  description?: string;
  creator?: string;
  date?: string;
  participants?: string[];     // character IDs mentioned
  relatedBooks?: string[];     // books that reference this document
  historicalStatus: HistoricalStatus;
  sources?: string[];
}

export interface LocationService {
  id: string;
  name: string;
  description?: string;
  type: 'transaction' | 'teaching' | 'commission' | 'consultation' | 'accommodation';
  provider?: string;           // character ID or faction
  costs?: { money?: number; time?: number };
  outcomes?: Partial<OutcomeSpec>;
  requirements?: Partial<RequirementSpec>;
  historicalStatus: HistoricalStatus;
}

export interface ReferenceAsset {
  id: string;
  title: string;
  type: 'map' | 'architecture' | 'portrait' | 'object' | 'manuscript' | 'interior' | 'landscape';
  source: string;              // archive, museum, publication, etc.
  provenance: string;          // copyright, license info
  year?: number;
  creator?: string;
  imagePath?: string;          // path to image file if stored locally
  externalUrl?: string;        // link to external source
  historicalConfidence?: 'documented' | 'reconstructed' | 'speculative';
  intendedUses: string[];      // "location_overview", "station_interior", etc.
  historicalStatus: HistoricalStatus;
}

export interface AudioAsset {
  id: string;
  title: string;
  type: 'ambient' | 'music' | 'speech' | 'effect';
  description?: string;
  stations?: string[];         // which stations use this audio
  duration?: number;           // seconds
  source?: string;
  audioPath?: string;          // MP3 path if stored locally
  historicalStatus: HistoricalStatus;
}

// --- Errands (crew away missions) --------------------------------------------

export interface ErrandCard extends CardMeta {
  id: string;
  name: string;
  summary: string;
  historicalStatus: HistoricalStatus;
  skill: SkillId;
  difficulty: number;      // target on d10 + crew skill
  workDays: number;        // days spent at the destination
  cost: number;
  marketPurchase?: boolean;  // on success the crew buys a book from the local market with `cost`
  success: OutcomeSpec;
  failure: OutcomeSpec;
}

// --- Encounters --------------------------------------------------------------

export interface RequirementSpec {
  skills?: Partial<Record<SkillId, number>>;
  books?: string[];
  contacts?: string[];
  instruments?: string[];
  rooms?: Partial<Record<RoomId, number>>;
  crew?: string[];          // must be in the household (not on an errand)
  minFaction?: Partial<Record<FactionId, number>>;
  minMoney?: number;
  flags?: string[];
  notFlags?: string[];
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
  instrumentsGained?: string[];
  instrumentsLost?: string[];
  contactsGained?: string[];
  crewJoins?: string[];
  crewLeaves?: string[];
  flagsSet?: string[];
  unlockLocations?: string[];
  unlockEncounters?: string[];
  leadToEncounterId?: string;
  roomUpgrade?: { room: RoomId; level: RoomLevel };
  ottomanSignal?: boolean;
  sectorChange?: SectorId;
  endCareer?: boolean;
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
  scalingSkill?: SkillId;
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
  sources?: string[];
  followUpEncounterIds?: string[];
  triggerConditions?: {
    flags?: string[];
    notFlags?: string[];
    minFaction?: Partial<Record<FactionId, number>>;
    minDay?: number;
    rooms?: Partial<Record<RoomId, number>>;
  };
}

// --- Political Weather -------------------------------------------------------

export interface PoliticalWeatherEvent {
  id: string;
  title: string;
  description: string;
  historicalStatus: HistoricalStatus;
  sector: SectorId;
  sources?: string[];
  effects: {
    factionShifts?: FactionRelationships;
    flagsSet?: string[];
    pressureIncrease?: number;
    secrecyChange?: number;
  };
  triggerDate?: number;     // days from sector start
  triggered: boolean;
}

// --- Game State --------------------------------------------------------------

export interface HouseholdState {
  baseId: BaseId;
  tier: 1 | 2 | 3;
  name: string;
  stability: number;
  staff: number;
  rooms: Record<RoomId, RoomLevel>;
}

export type Screen =
  | 'household'
  | 'upgrades'
  | 'library'
  | 'market'
  | 'map'
  | 'encounter'
  | 'codex'
  | 'network'
  | 'career_transition'
  | 'summary';

export interface MarketStock {
  books: string[];
  instruments: string[];
  day: number;
}

export interface GameState {
  seed: number;
  version: string;
  day: number;
  sector: SectorId;
  sectorDayStart: number;
  campaignPhase: 'early' | 'mid' | 'late' | 'transition';
  totalPressure: number;

  protagonist: Character;
  household: HouseholdState;
  crew: Character[];
  crewPosts: Record<string, CrewPost>;

  resources: Resources;
  factions: FactionRelationships;

  library: Book[];          // everything owned and with the household
  satchel: string[];        // book ids carried when travelling
  satchelSlots: number;
  instruments: string[];    // instrument card ids
  leftBehind: Book[];       // books left at Mortlake on departure
  knowledgeTags: string[];
  operations: string[];

  currentLocationId: string;
  visitedLocationIds: string[];
  completedEncounterIds: string[];
  activeEncounterId: string | null;
  flags: string[];
  ottomanSignalCount: number;
  fortune: FortuneRank;
  marketStock: Record<string, MarketStock>;
  notices: Notice[];        // queued toasts / fortune banners for the UI

  weatherEvents: PoliticalWeatherEvent[];
  careerEvents: Array<{ day: number; description: string; historicalStatus: HistoricalStatus }>;

  screen: Screen;
  pendingEncounter: Encounter | null;
  log: string[];
}

export interface Notice {
  kind: 'bark' | 'fortune' | 'weather' | 'errand' | 'system';
  speaker?: string;
  title?: string;
  text: string;
  tone?: 'good' | 'bad' | 'neutral';
}

export interface SaveData {
  version: string;
  timestamp: number;
  state: GameState;
}
