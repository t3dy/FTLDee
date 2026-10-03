import type {
  CrewPost, Encounter, FactionRelationships, GameState, OutcomeSpec, RequirementSpec, RoomId, SaveData, SkillId,
} from './types.js';
import { clone, notify } from './util.js';
import { INITIAL_LIBRARY } from '../data/books/index.js';
import { DEE_CHARACTER, JANE_DEE, ROGER_COOKE } from '../data/characters/index.js';
import { getLocation } from '../data/locations/index.js';
import { ALL_WEATHER_EVENTS } from '../data/factions/weather.js';
import { BASE_LAYOUTS, getRoomCard } from '../data/cards/rooms.js';
import { houseTier, nextHouseTier } from '../data/cards/house.js';
import { getEncounterById, SECTOR_ARRIVAL } from '../data/encounters/index.js';
import { meetsSpec } from '../systems/requirements.js';
import { applyOutcomeMut, incrementOttomanSignalMut } from '../systems/outcome.js';
import { advanceDaysMut } from '../systems/time.js';
import { atBase, canPack, bestSkill } from '../systems/skills.js';
import { houseUpgradeBlocker, postBlocker, roomUpgradeBlocker } from '../systems/household.js';
import { buyBookMut, buyInstrumentMut, ensureStockMut, sellBookMut } from '../systems/market.js';
import { dispatchErrandMut } from '../systems/errands.js';
import { updateFortune, fortuneRankOf, fortuneScore } from '../systems/fortune.js';
import { bark, houseTierText } from '../systems/barks.js';

export { canAcquireBook } from '../systems/market.js';
export { usableBookIds as availableBookIds } from '../systems/skills.js';

export const VERSION = '0.2.0';
const SAVE_KEY = 'ftldee_save';

export function createInitialState(seed: number): GameState {
  const layout = BASE_LAYOUTS.mortlake;
  const s: GameState = {
    seed,
    version: VERSION,
    day: 0,
    sector: 'england',
    sectorDayStart: 0,
    campaignPhase: 'early',
    totalPressure: 10,

    protagonist: clone(DEE_CHARACTER),
    household: { baseId: 'mortlake', tier: 1, name: houseTier('mortlake', 1).name, stability: 80, staff: 3, rooms: { ...layout.start } },
    crew: [clone(JANE_DEE), clone(ROGER_COOKE)],
    crewPosts: {
      jane_dee: { kind: 'room', room: 'quarters' },
      roger_cooke: { kind: 'room', room: 'laboratory' },
    },

    resources: { money: 45, time: 180, secrecy: 75, focus: 80 },
    factions: {
      elizabeth: 55, burghley: 40, leicester: 45, walsingham: 50,
      religiousAuth: 30, scholarNetwork: 65, merchantNetwork: 25, continentalCourts: 20,
    },

    library: INITIAL_LIBRARY.map(b => ({ ...b })),
    satchel: ['dee_monas', 'dee_mathematical_preface', 'dee_general_rare'],
    satchelSlots: 3,
    instruments: ['mercator_globes', 'frisius_staff'],
    leftBehind: [],
    knowledgeTags: ['geometry', 'celestialMechanics', 'mathematicalProof', ...INITIAL_LIBRARY.flatMap(b => b.intellectualTags)],
    operations: ['astronomicalObservation', 'mathematicalConsultation', 'cartography'],

    currentLocationId: 'mortlake',
    visitedLocationIds: ['mortlake'],
    completedEncounterIds: [],
    activeEncounterId: null,
    flags: [],
    ottomanSignalCount: 0,
    fortune: 2,
    marketStock: {},
    notices: [],

    weatherEvents: ALL_WEATHER_EVENTS.map(e => ({ ...e })),
    careerEvents: [{ day: 0, description: 'The career opens at Mortlake, c. 1580.', historicalStatus: 'plausible' }],

    screen: 'household',
    pendingEncounter: null,
    log: ['Mortlake, c. 1580. The library is the largest in England; the purse is not.'],
  };
  s.knowledgeTags = [...new Set(s.knowledgeTags)];
  s.fortune = fortuneRankOf(fortuneScore(s));
  return s;
}

// --- Pure wrappers (each returns a new state) --------------------------------

export function applyOutcome(state: GameState, outcome: OutcomeSpec): GameState {
  const s = clone(state);
  applyOutcomeMut(s, outcome);
  updateFortune(s);
  return s;
}

export function meetsRequirements(state: GameState, req: RequirementSpec): boolean {
  return meetsSpec(state, req);
}

export function advanceDay(state: GameState, days: number): GameState {
  const s = clone(state);
  advanceDaysMut(s, days);
  return s;
}

export function incrementOttomanSignal(state: GameState): GameState {
  const s = clone(state);
  incrementOttomanSignalMut(s);
  return s;
}

export function skillScaleFactor(skillValue: number): number {
  return 1.0 + Math.max(0, skillValue - 4) * 0.1;
}

export function scaleOutcome(outcome: OutcomeSpec, skillId: SkillId, state: GameState): OutcomeSpec {
  const factor = skillScaleFactor(bestSkill(state, skillId).value);
  if (factor === 1.0) return outcome;
  const scaled = { ...outcome };
  if (scaled.money !== undefined && scaled.money > 0) scaled.money = Math.round(scaled.money * factor);
  if (scaled.reputation) {
    const rep: FactionRelationships = {};
    for (const [k, v] of Object.entries(scaled.reputation) as [keyof FactionRelationships, number][]) {
      rep[k] = v > 0 ? Math.round(v * factor) : v;
    }
    scaled.reputation = rep;
  }
  return scaled;
}

export function travelTo(state: GameState, locationId: string): GameState {
  const s = clone(state);
  const cur = getLocation(s.currentLocationId);
  const conn = cur?.connections.find(c => c.to === locationId);
  if (!cur || !conn) {
    s.log.push(`No direct route from ${cur?.name ?? s.currentLocationId} to ${locationId}.`);
    return s;
  }
  if (s.resources.money < conn.travelCost) {
    s.log.push(`Insufficient funds for travel. Need £${conn.travelCost}.`);
    return s;
  }
  const leavingBase = atBase(s);
  s.resources.money -= conn.travelCost;
  s.currentLocationId = locationId;
  if (!s.visitedLocationIds.includes(locationId)) s.visitedLocationIds.push(locationId);
  const dest = getLocation(locationId);
  s.log.push(`Travelled to ${dest?.name ?? locationId}. £${conn.travelCost}, ${conn.travelDays} day${conn.travelDays === 1 ? '' : 's'}.`);
  if (leavingBase) bark(s, 'travel_depart', { place: dest?.name ?? locationId });
  if (atBase(s)) bark(s, 'arrive_base', { place: dest?.name ?? locationId });
  if (dest?.market) ensureStockMut(s, locationId);
  advanceDaysMut(s, conn.travelDays);
  return s;
}

export function upgradeRoom(state: GameState, room: RoomId): GameState {
  if (roomUpgradeBlocker(state, room)) return state;
  const s = clone(state);
  const card = getRoomCard(room);
  const next = card.levels.find(l => l.level === s.household.rooms[room] + 1)!;
  s.resources.money -= next.cost;
  s.household.rooms[room] = next.level;
  if (room === 'scryingChamber' && next.level === 2) incrementOttomanSignalMut(s);
  s.log.push(`${card.name} raised to level ${next.level}: ${next.label}. (£${next.cost}, ${next.days} days)`);
  bark(s, 'room_upgraded', { room: card.name, level: next.label }, 'good');
  advanceDaysMut(s, next.days);
  return s;
}

export function upgradeHouse(state: GameState): GameState {
  if (houseUpgradeBlocker(state)) return state;
  const s = clone(state);
  const next = nextHouseTier(s.household.baseId, s.household.tier)!;
  s.resources.money -= next.cost;
  s.household.tier = next.tier;
  s.household.name = next.name;
  s.log.push(`The household becomes: ${next.name}.`);
  notify(s, { kind: 'fortune', title: next.name, text: houseTierText(next.id) ?? next.summary, tone: 'good' });
  bark(s, 'house_upgraded', { house: next.name }, 'good');
  s.careerEvents.push({ day: s.day, description: next.name, historicalStatus: next.historicalStatus });
  advanceDaysMut(s, next.days);
  return s;
}

export function postCrew(state: GameState, crewId: string, post: CrewPost): GameState {
  if (postBlocker(state, crewId, post)) return state;
  const s = clone(state);
  s.crewPosts[crewId] = post;
  const name = s.crew.find(c => c.id === crewId)?.name ?? crewId;
  if (post.kind === 'room') bark(s, 'crew_assigned', { crew: name, room: getRoomCard(post.room).name }, 'neutral', crewId);
  if (post.kind === 'retinue') bark(s, 'crew_retinue', { crew: name }, 'neutral', crewId);
  return s;
}

export function sendErrand(state: GameState, crewId: string, locationId: string, errandId: string): GameState {
  const s = clone(state);
  return dispatchErrandMut(s, crewId, locationId, errandId) ? s : state;
}

export function toggleSatchel(state: GameState, bookId: string): GameState {
  if (!atBase(state)) return state;
  const s = clone(state);
  const book = s.library.find(b => b.id === bookId);
  if (!book) return state;
  if (s.satchel.includes(bookId)) {
    s.satchel = s.satchel.filter(b => b !== bookId);
    bark(s, 'book_left_at_base', { book: book.title });
  } else if (canPack(s, book)) {
    s.satchel.push(bookId);
    bark(s, 'satchel_packed', { book: book.title });
  } else {
    bark(s, 'satchel_full', { book: book.title }, 'bad');
    return s;
  }
  return s;
}

export function buyBook(state: GameState, bookId: string): GameState {
  const s = clone(state);
  buyBookMut(s, s.currentLocationId, bookId);
  updateFortune(s);
  return s;
}

export function sellBook(state: GameState, bookId: string): GameState {
  const s = clone(state);
  sellBookMut(s, s.currentLocationId, bookId);
  updateFortune(s);
  return s;
}

export function buyInstrument(state: GameState, id: string): GameState {
  const s = clone(state);
  buyInstrumentMut(s, s.currentLocationId, id);
  updateFortune(s);
  return s;
}

// Resolve an encounter choice: costs, (scaled) outcome, completion, follow-up.
export function resolveChoice(state: GameState, encounter: Encounter, choiceId: string): GameState {
  const choice = encounter.choices.find(c => c.id === choiceId);
  if (!choice) return state;
  if (choice.requirements && !meetsSpec(state, choice.requirements)) return state;
  const s = clone(state);
  if (choice.costs?.money) s.resources.money = Math.max(0, s.resources.money - choice.costs.money);
  if (choice.costs?.focus) s.resources.focus = Math.max(0, s.resources.focus - choice.costs.focus);
  const outcome = choice.scalingSkill ? scaleOutcome(choice.outcome, choice.scalingSkill, s) : choice.outcome;
  if (choice.isBlueOption) bark(s, 'blue_option_taken', {});
  if (!encounter.repeatable && !s.completedEncounterIds.includes(encounter.id)) s.completedEncounterIds.push(encounter.id);
  s.activeEncounterId = null;
  s.pendingEncounter = null;
  s.careerEvents.push({ day: s.day, description: `${encounter.title}: ${choice.text}`, historicalStatus: encounter.historicalStatus });
  applyOutcomeMut(s, outcome);
  if (choice.costs?.time) advanceDaysMut(s, choice.costs.time);
  else updateFortune(s);

  if (s.screen === 'summary' || s.flags.includes('career_ended')) {
    s.screen = 'summary';
    return s;
  }
  if (outcome.sectorChange) {
    const arrival = getEncounterById(SECTOR_ARRIVAL[outcome.sectorChange] ?? '');
    if (arrival) {
      s.pendingEncounter = arrival;
      s.activeEncounterId = arrival.id;
      s.screen = 'encounter';
    }
    return s;
  }
  const follow = outcome.leadToEncounterId ? getEncounterById(outcome.leadToEncounterId) : undefined;
  if (follow && !s.completedEncounterIds.includes(follow.id)) {
    s.pendingEncounter = follow;
    s.activeEncounterId = follow.id;
    s.screen = 'encounter';
  } else if (s.screen !== 'career_transition') {
    s.screen = atBase(s) ? 'household' : 'map';
  }
  return s;
}

// --- Save / load ---------------------------------------------------------------

export function saveGame(state: GameState): void {
  const save: SaveData = { version: VERSION, timestamp: Date.now(), state };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch { /* storage unavailable */ }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = JSON.parse(raw) as SaveData;
    return save.version === VERSION ? save.state : null;
  } catch {
    return null;
  }
}

export function hasSave(): boolean {
  try { return loadGame() !== null; } catch { return false; }
}

export function hasBook(state: GameState, bookId: string): boolean {
  return state.library.some(b => b.id === bookId);
}

export function nextTierInfo(state: GameState) {
  return nextHouseTier(state.household.baseId, state.household.tier);
}
