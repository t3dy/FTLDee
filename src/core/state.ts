import type {
  GameState,
  SaveData,
  FactionRelationships,
  OutcomeSpec,
} from './types.js';
import { INITIAL_LIBRARY } from '../data/books/index.js';
import { DEE_CHARACTER, JANE_DEE, ROGER_COOKE } from '../data/characters/index.js';
import { ALL_LOCATIONS } from '../data/locations/index.js';
import { ALL_WEATHER_EVENTS } from '../data/factions/weather.js';

const VERSION = '0.1.0';
const SAVE_KEY = 'ftldee_save';
const CAMPAIGN_DAYS = 180; // roughly six months for the vertical slice

export function createInitialState(seed: number): GameState {
  return {
    seed,
    version: VERSION,
    day: 0,
    campaignPhase: 'early',
    totalPressure: 10,

    protagonist: { ...DEE_CHARACTER },
    household: {
      name: 'Mortlake',
      stability: 80,
      staff: 3,
      rooms: {
        library: true,
        study: true,
        laboratory: false,
        scryingChamber: false,
        instrumentRoom: true,
        correspondence: true,
        quarters: true,
      },
    },
    crew: [{ ...JANE_DEE }, { ...ROGER_COOKE }],

    resources: {
      money: 45,
      time: CAMPAIGN_DAYS,
      secrecy: 75,
      focus: 80,
    },

    factions: {
      elizabeth: 55,
      burghley: 40,
      leicester: 45,
      walsingham: 50,
      religiousAuth: 30,
      scholarNetwork: 65,
      merchantNetwork: 25,
      continentalCourts: 20,
    },

    library: INITIAL_LIBRARY.map(b => ({ ...b })),
    instruments: [],
    knowledgeTags: ['geometry', 'celestialMechanics', 'mathematicalProof'],
    operations: ['astronomicalObservation', 'mathematicalConsultation', 'cartography'],

    currentLocationId: 'mortlake',
    visitedLocationIds: ['mortlake'],
    completedEncounterIds: [],
    activeEncounterId: null,
    flags: [],

    weatherEvents: ALL_WEATHER_EVENTS.map(e => ({ ...e })),

    careerEvents: [
      {
        day: 0,
        description: 'Career begins at Mortlake, c. 1580.',
        historicalStatus: 'plausible',
      },
    ],

    screen: 'household',
    pendingEncounter: null,
    log: ['You are at Mortlake. The library is well-stocked. The court awaits.'],
  };
}

// --- Outcome Application -----------------------------------------------------

export function applyOutcome(state: GameState, outcome: OutcomeSpec): GameState {
  const s: GameState = JSON.parse(JSON.stringify(state)) as GameState;

  if (outcome.money !== undefined) {
    s.resources.money = Math.max(0, s.resources.money + outcome.money);
  }
  if (outcome.time !== undefined) {
    s.resources.time = Math.max(0, s.resources.time + outcome.time);
  }
  if (outcome.secrecyChange !== undefined) {
    s.resources.secrecy = Math.max(0, Math.min(100, s.resources.secrecy + outcome.secrecyChange));
  }
  if (outcome.focusChange !== undefined) {
    s.resources.focus = Math.max(0, Math.min(100, s.resources.focus + outcome.focusChange));
  }

  if (outcome.reputation) {
    for (const [fid, delta] of Object.entries(outcome.reputation) as [keyof FactionRelationships, number][]) {
      const current = s.factions[fid] ?? 0;
      s.factions[fid] = Math.max(0, Math.min(100, current + delta));
    }
  }

  if (outcome.booksGained) {
    for (const bookId of outcome.booksGained) {
      const bookDef = INITIAL_LIBRARY.find(b => b.id === bookId);
      if (bookDef && !s.library.some(b => b.id === bookId)) {
        s.library.push({ ...bookDef });
        s.log.push(`Acquired: ${bookDef.title}`);
        bookDef.operationsUnlocked.forEach(op => {
          if (!s.operations.includes(op)) s.operations.push(op);
        });
        bookDef.intellectualTags.forEach(tag => {
          if (!s.knowledgeTags.includes(tag)) s.knowledgeTags.push(tag);
        });
      }
    }
  }

  if (outcome.booksLost) {
    s.library = s.library.filter(b => !outcome.booksLost!.includes(b.id));
  }

  if (outcome.flagsSet) {
    for (const flag of outcome.flagsSet) {
      if (!s.flags.includes(flag)) s.flags.push(flag);
    }
  }

  if (outcome.unlockLocations) {
    for (const locId of outcome.unlockLocations) {
      const loc = ALL_LOCATIONS.find(l => l.id === locId);
      if (loc) loc.unlocked = true;
    }
  }

  if (outcome.contactsGained) {
    for (const c of outcome.contactsGained) {
      if (!s.knowledgeTags.includes(`contact:${c}`)) {
        s.knowledgeTags.push(`contact:${c}`);
      }
    }
  }

  s.log.push(outcome.description);

  return s;
}

// --- Pressure System ---------------------------------------------------------

export function advanceDay(state: GameState, days: number): GameState {
  const s: GameState = JSON.parse(JSON.stringify(state)) as GameState;
  s.day += days;
  s.resources.time = Math.max(0, s.resources.time - days);

  // Pressure rises as time passes
  s.totalPressure = Math.min(100, s.totalPressure + days * 0.3);

  // Check campaign phase
  if (s.day > 120 && s.campaignPhase === 'early') {
    s.campaignPhase = 'mid';
    s.log.push('The political weather is shifting. Time grows shorter.');
  }
  if (s.day > 150 && s.campaignPhase === 'mid') {
    s.campaignPhase = 'late';
    s.log.push('The continental question can no longer be deferred.');
    s.screen = 'career_transition';
  }

  // Trigger weather events
  for (const event of s.weatherEvents) {
    if (!event.triggered && event.triggerDate !== undefined && s.day >= event.triggerDate) {
      event.triggered = true;
      if (event.effects.factionShifts) {
        for (const [fid, delta] of Object.entries(event.effects.factionShifts) as [keyof FactionRelationships, number][]) {
          const current = s.factions[fid] ?? 0;
          s.factions[fid] = Math.max(0, Math.min(100, current + delta));
        }
      }
      s.log.push(`[POLITICAL EVENT] ${event.title}: ${event.description}`);
    }
  }

  return s;
}

// --- Travel ------------------------------------------------------------------

export function travelTo(state: GameState, locationId: string): GameState {
  const s: GameState = JSON.parse(JSON.stringify(state)) as GameState;
  const currentLoc = ALL_LOCATIONS.find(l => l.id === s.currentLocationId);
  if (!currentLoc) return s;

  const connection = currentLoc.connections.find(c => c.to === locationId);
  if (!connection) {
    s.log.push(`No direct route from ${currentLoc.name} to ${locationId}.`);
    return s;
  }

  if (s.resources.money < connection.travelCost) {
    s.log.push(`Insufficient funds for travel. Need £${connection.travelCost}.`);
    return s;
  }

  s.resources.money -= connection.travelCost;
  s.resources.time -= connection.travelDays;
  s.day += connection.travelDays;
  s.currentLocationId = locationId;

  if (!s.visitedLocationIds.includes(locationId)) {
    s.visitedLocationIds.push(locationId);
  }

  const destLoc = ALL_LOCATIONS.find(l => l.id === locationId);
  s.log.push(`Travelled to ${destLoc?.name ?? locationId}. Cost: £${connection.travelCost}, ${connection.travelDays} days.`);

  return advanceDay(s, 0); // trigger any day-based events
}

// --- Save/Load ---------------------------------------------------------------

export function saveGame(state: GameState): void {
  const save: SaveData = {
    version: VERSION,
    timestamp: Date.now(),
    state,
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    // storage unavailable
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = JSON.parse(raw) as SaveData;
    if (save.version !== VERSION) return null;
    return save.state;
  } catch {
    return null;
  }
}

export function hasSave(): boolean {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}

// --- Requirement Checking ----------------------------------------------------

export function meetsRequirements(
  state: GameState,
  req: NonNullable<import('./types.js').EncounterChoice['requirements']>
): boolean {
  // Skills
  if (req.skills) {
    for (const [skill, minVal] of Object.entries(req.skills)) {
      const charSkill = state.protagonist.abilities[skill as keyof typeof state.protagonist.abilities] ?? 0;
      if (charSkill < minVal) return false;
    }
  }

  // Books
  if (req.books) {
    const ownedIds = new Set(state.library.map(b => b.id));
    for (const bookId of req.books) {
      if (!ownedIds.has(bookId)) return false;
    }
  }

  // Contacts (stored as knowledge tags)
  if (req.contacts) {
    for (const contact of req.contacts) {
      if (!state.knowledgeTags.includes(`contact:${contact}`)) return false;
    }
  }

  // Instruments
  if (req.instruments) {
    const ownedInst = new Set(state.instruments.map(i => i.id));
    for (const inst of req.instruments) {
      if (!ownedInst.has(inst)) return false;
    }
  }

  // Faction minimums
  if (req.minFaction) {
    for (const [fid, minVal] of Object.entries(req.minFaction) as [keyof FactionRelationships, number][]) {
      if ((state.factions[fid] ?? 0) < minVal) return false;
    }
  }

  // Money
  if (req.minMoney !== undefined && state.resources.money < req.minMoney) return false;

  // Flags
  if (req.flags) {
    for (const flag of req.flags) {
      if (!state.flags.includes(flag)) return false;
    }
  }

  return true;
}

// --- Encounter Helpers -------------------------------------------------------

export function completeEncounter(state: GameState, encounterId: string): GameState {
  const s: GameState = JSON.parse(JSON.stringify(state)) as GameState;
  if (!s.completedEncounterIds.includes(encounterId)) {
    s.completedEncounterIds.push(encounterId);
  }
  s.activeEncounterId = null;
  s.pendingEncounter = null;
  return s;
}

export function addCareerEvent(state: GameState, description: string): GameState {
  const s: GameState = JSON.parse(JSON.stringify(state)) as GameState;
  s.careerEvents.push({ day: s.day, description, historicalStatus: 'plausible' });
  return s;
}

// --- Library Helpers ---------------------------------------------------------

export function hasBook(state: GameState, bookId: string): boolean {
  return state.library.some(b => b.id === bookId);
}

export function hasKnowledgeTag(state: GameState, tag: string): boolean {
  return state.knowledgeTags.includes(tag) ||
    state.library.some(b => b.intellectualTags.includes(tag));
}
