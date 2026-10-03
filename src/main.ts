import type { CardCategory, CrewPost, GameState, RoomId, Screen } from './core/types.js';
import {
  createInitialState, saveGame, loadGame, hasSave, travelTo, resolveChoice, upgradeRoom, upgradeHouse, postCrew,
  sendErrand, toggleSatchel, buyBook, sellBook, buyInstrument, advanceDay,
} from './core/state.js';
import { el, button, clearAndRender } from './ui/render.js';
import { renderHud, renderNotices } from './ui/hud.js';
import { renderShip, type ShipUi } from './ui/ship.js';
import { renderUpgrades } from './ui/upgrades.js';
import { renderLibrary } from './ui/library_ui.js';
import { renderMarket } from './ui/market_ui.js';
import { renderMap, type MapUi } from './ui/map.js';
import { renderEncounter } from './ui/encounter_ui.js';
import { renderCodex, type CodexUi } from './ui/codex.js';
import { renderSummary } from './ui/summary.js';
import { renderNetwork } from './ui/network.js';
import { getEncounterById, getEncountersForLocation, type TriggerContext } from './data/encounters/index.js';
import { getLocation } from './data/locations/index.js';
import { registerCopy } from './systems/barks.js';
import { sectorDay } from './systems/time.js';
import { atBase } from './systems/skills.js';
import { ensureStockMut } from './systems/market.js';
import { COPY } from './data/copy/index.js';

registerCopy(COPY);

let state: GameState = createInitialState(0);
const ship: ShipUi = { selectedCrew: null, selectedRoom: null };
const map: MapUi = { selectedNode: null, errandCrew: null };
const codex: CodexUi = { category: 'all', query: '', open: null };
const appEl = document.getElementById('app')!;

function set(next: GameState): void {
  state = next;
  render();
}

function go(screen: Screen): void {
  set({ ...state, screen });
}

function ctx(s: GameState): TriggerContext {
  return { completedIds: s.completedEncounterIds, flags: s.flags, factions: s.factions, sectorDay: sectorDay(s), rooms: s.household.rooms };
}

function startEncounter(id: string): void {
  const enc = getEncounterById(id);
  if (!enc) return;
  set({ ...state, pendingEncounter: enc, activeEncounterId: id, screen: 'encounter' });
}

// On arrival, an unplayed event at the node fires by itself (an FTL beacon).
function travel(id: string): void {
  let s = travelTo(state, id);
  if (s.currentLocationId === id && s.screen !== 'career_transition' && s.screen !== 'summary') {
    const events = getEncountersForLocation(id, ctx(s)).filter(e => !e.repeatable);
    s = events.length
      ? { ...s, pendingEncounter: events[0], activeEncounterId: events[0].id, screen: 'encounter' }
      : { ...s, screen: atBase(s) ? 'household' : 'map' };
  }
  map.selectedNode = null;
  set(s);
}

// Triggered events (those with triggerConditions) fire by themselves when Dee
// is at their place and the conditions hold, like an FTL beacon event.
function autoEvent(): void {
  if (state.screen !== 'household' && state.screen !== 'map') return;
  const due = getEncountersForLocation(state.currentLocationId, ctx(state))
    .find(e => !e.repeatable && e.triggerConditions);
  if (due) state = { ...state, pendingEncounter: due, activeEncounterId: due.id, screen: 'encounter' };
}

function render(): void {
  autoEvent();
  if (state.screen === 'summary') {
    clearAndRender(appEl, renderSummary(state, newRun));
    return;
  }
  const notices = state.notices;
  clearAndRender(appEl,
    renderHud(state, { go, save: () => { saveGame(state); set({ ...state, notices: [...state.notices, { kind: 'bark', text: 'Saved.', tone: 'good' }] }); }, wait: () => set(advanceDay(state, 1)) }),
    el('main', { class: `screen screen--${state.screen}` }, renderScreen()),
    renderNotices(notices, () => set({ ...state, notices: [] })),
  );
  // Barks are shown once, then cleared without a re-render; banners wait for "Continue".
  if (notices.length && !notices.some(n => n.kind !== 'bark' && n.kind !== 'errand')) {
    state = { ...state, notices: [] };
  }
}

function renderScreen(): HTMLElement {
  const here = getEncountersForLocation(state.currentLocationId, ctx(state));
  switch (state.screen) {
    case 'household':
      return renderShip(state, ship, {
        selectCrew: id => { ship.selectedCrew = id; render(); },
        selectRoom: id => { ship.selectedRoom = id; render(); },
        post: (crewId: string, post: CrewPost) => { ship.selectedCrew = null; set(postCrew(state, crewId, post)); },
        startEncounter,
        goUpgrades: () => go('upgrades'),
      }, atBase(state) ? here : []);
    case 'upgrades':
      return renderUpgrades(state, {
        upgradeRoom: (r: RoomId) => set(upgradeRoom(state, r)),
        upgradeHouse: () => set(upgradeHouse(state)),
      });
    case 'library':
      return renderLibrary(state, id => set(toggleSatchel(state, id)));
    case 'market': {
      if (getLocation(state.currentLocationId)?.market && !state.marketStock[state.currentLocationId]) {
        const s = { ...state, marketStock: { ...state.marketStock } };
        ensureStockMut(s, s.currentLocationId);
        state = s;
      }
      return renderMarket(state, {
        buyBook: id => set(buyBook(state, id)),
        sellBook: id => set(sellBook(state, id)),
        buyInstrument: id => set(buyInstrument(state, id)),
      });
    }
    case 'map':
      return renderMap(state, map, {
        select: id => { map.selectedNode = id; render(); },
        travel,
        chooseErrandCrew: id => { map.errandCrew = id; render(); },
        sendErrand: (c, l, e) => { map.errandCrew = null; set(sendErrand(state, c, l, e)); },
        startEncounter,
      }, atBase(state) ? [] : here.map(e => ({ id: e.id, title: e.title, status: e.historicalStatus })));
    case 'network':
      return renderNetwork(state);
    case 'codex':
      return renderCodex(codex, {
        setCategory: (c: CardCategory | 'all') => { codex.category = c; render(); },
        setQuery: q => { codex.query = q; render(); },
        open: id => { codex.open = id; render(); },
      });
    case 'encounter': {
      const enc = state.pendingEncounter;
      if (!enc) return renderShipFallback();
      return renderEncounter(state, enc, choiceId => set(resolveChoice(state, enc, choiceId)));
    }
    case 'career_transition': {
      const enc = getEncounterById('career_transition_continental')!;
      return el('div', { class: 'transition' },
        el('p', { class: 'lede' }, 'Before you choose: only what is packed in the travelling satchel crosses the Channel.'),
        button('Open the Library to repack', () => go('library'), 'btn btn--small'),
        renderEncounter(state, enc, choiceId => set(resolveChoice({ ...state, screen: 'household' }, enc, choiceId))));
    }
    default:
      return renderShipFallback();
  }
}

function renderShipFallback(): HTMLElement {
  state = { ...state, screen: atBase(state) ? 'household' : 'map' };
  return renderScreen();
}

function newRun(seed: number): void {
  state = createInitialState(seed);
  ship.selectedCrew = null; ship.selectedRoom = null; map.selectedNode = null;
  render();
}

function renderStart(): void {
  const start = el('div', { class: 'start-screen' },
    el('h1', { class: 'start-title' }, 'FTLDee'),
    el('p', { class: 'start-subtitle' }, 'The intellectual courtier, 1580–1586'),
    el('p', { class: 'start-desc' },
      'You are John Dee. Your house at Mortlake holds the largest library in England, three laboratories and the instruments you brought back from Louvain. ' +
      'Build its rooms, post your household to work in them, buy books, send your people on errands, and court patrons who reward less than they promise. ' +
      'Then decide whether to cross to the Continent, with only what fits in your satchel.'),
  );
  const btns = el('div', { class: 'start-btns' });
  btns.appendChild(button('Begin', () => newRun(Date.now() >>> 0), 'btn btn--primary btn--large'));
  if (hasSave()) btns.appendChild(button('Continue', () => { const s = loadGame(); if (s) set(s); }, 'btn btn--large'));
  const seed = el('input', { type: 'number', class: 'seed-input', placeholder: 'Seed', 'aria-label': 'Seed' });
  btns.appendChild(el('div', { class: 'seed-section' }, seed,
    button('Start with seed', () => { const v = parseInt((seed as HTMLInputElement).value, 10); if (!isNaN(v)) newRun(v); }, 'btn')));
  start.appendChild(btns);
  start.appendChild(el('p', { class: 'start-note' },
    'Every event and card carries its status: documented, plausible, contested or counterfactual. The Codex lists them all with their sources.'));
  clearAndRender(appEl, start);
}

// Dev-only hook for verification: read state, or jump it forward.
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__ftldee = {
    get state() { return state; },
    set: (s: GameState) => set(s),
    wait: (days: number) => set(advanceDay(state, days)),
    choose: (encId: string, choiceId: string) => { const e = getEncounterById(encId); if (e) set(resolveChoice({ ...state, screen: 'household' }, e, choiceId)); },
    travel,
  };
}

renderStart();
