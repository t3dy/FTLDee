import { createInitialState, saveGame, loadGame, hasSave, travelTo, applyOutcome, completeEncounter } from './core/state.js';
import type { GameState, Encounter } from './core/types.js';
import { renderHousehold } from './ui/household.js';
import { renderMap } from './ui/map.js';
import { renderEncounter } from './ui/encounter_ui.js';
import { el, clearAndRender } from './ui/render.js';
import { ALL_LOCATIONS } from './data/locations/index.js';
import { ALL_ENCOUNTERS, getEncountersForLocation, getEncounterById } from './data/encounters/index.js';
import { createRNG } from './core/rng.js';

// ---------------------------------------------------------------------------
// App State
// ---------------------------------------------------------------------------

let state: GameState;
let rng = createRNG(Date.now());

const appEl = document.getElementById('app')!;

// ---------------------------------------------------------------------------
// Screen Router
// ---------------------------------------------------------------------------

function render(): void {
  clearAndRender(appEl,
    renderNavBar(),
    renderScreen(),
  );
}

function renderNavBar(): HTMLElement {
  const nav = el('nav', { class: 'navbar' });

  const title = el('span', { class: 'navbar-title' }, 'FTLDee');
  nav.appendChild(title);

  const phase = el('span', { class: 'navbar-phase' }, `${state.campaignPhase.toUpperCase()} — Day ${state.day}`);
  nav.appendChild(phase);

  const btnGroup = el('div', { class: 'navbar-btns' });

  if (state.screen !== 'household') {
    const hhBtn = el('button', { class: 'btn btn--nav', type: 'button' }, 'Household');
    hhBtn.addEventListener('click', () => { state.screen = 'household'; render(); });
    btnGroup.appendChild(hhBtn);
  }

  if (state.screen !== 'map') {
    const mapBtn = el('button', { class: 'btn btn--nav', type: 'button' }, 'Map');
    mapBtn.addEventListener('click', () => { state.screen = 'map'; render(); });
    btnGroup.appendChild(mapBtn);
  }

  const saveBtn = el('button', { class: 'btn btn--nav', type: 'button' }, 'Save');
  saveBtn.addEventListener('click', () => { saveGame(state); showToast('Game saved.'); });
  btnGroup.appendChild(saveBtn);

  nav.appendChild(btnGroup);
  return nav;
}

function renderScreen(): HTMLElement {
  switch (state.screen) {
    case 'household':
      return renderHouseholdScreen();
    case 'map':
      return renderMapScreen();
    case 'encounter':
      return renderEncounterScreen();
    case 'career_transition':
      return renderCareerTransitionScreen();
    default:
      return el('div', {}, 'Unknown screen');
  }
}

// ---------------------------------------------------------------------------
// Household Screen
// ---------------------------------------------------------------------------

function renderHouseholdScreen(): HTMLElement {
  const wrapper = el('div', { class: 'screen-wrapper' });
  wrapper.appendChild(renderHousehold(state));

  // Location encounters
  const encounters = getEncountersForLocation(state.currentLocationId, state.completedEncounterIds);
  if (encounters.length > 0 && state.currentLocationId === 'mortlake') {
    const encPanel = el('div', { class: 'panel encounter-panel' });
    encPanel.appendChild(el('h2', {}, 'Available Activities'));
    for (const enc of encounters) {
      const btn = el('button', { class: 'btn btn--encounter', type: 'button' }, enc.title);
      btn.addEventListener('click', () => startEncounter(enc.id));
      encPanel.appendChild(btn);
    }
    wrapper.appendChild(encPanel);
  }

  // Nav to map
  const mapBtn = el('button', { class: 'btn btn--primary', type: 'button' }, 'View Map and Travel');
  mapBtn.addEventListener('click', () => { state.screen = 'map'; render(); });
  wrapper.appendChild(mapBtn);

  return wrapper;
}

// ---------------------------------------------------------------------------
// Map Screen
// ---------------------------------------------------------------------------

function renderMapScreen(): HTMLElement {
  const wrapper = el('div', { class: 'screen-wrapper' });
  wrapper.appendChild(renderMap(state, handleTravel));

  // If at a non-home location, show encounters
  if (state.currentLocationId !== 'mortlake') {
    const encounters = getEncountersForLocation(state.currentLocationId, state.completedEncounterIds);
    if (encounters.length > 0) {
      const encPanel = el('div', { class: 'panel encounter-panel' });
      const locName = ALL_LOCATIONS.find(l => l.id === state.currentLocationId)?.name ?? state.currentLocationId;
      encPanel.appendChild(el('h2', {}, `At ${locName}`));
      for (const enc of encounters) {
        const btn = el('button', { class: 'btn btn--encounter', type: 'button' }, enc.title);
        btn.addEventListener('click', () => startEncounter(enc.id));
        encPanel.appendChild(btn);
      }
      wrapper.appendChild(encPanel);
    }
  }

  return wrapper;
}

// ---------------------------------------------------------------------------
// Encounter Screen
// ---------------------------------------------------------------------------

function renderEncounterScreen(): HTMLElement {
  if (!state.pendingEncounter) {
    state.screen = 'household';
    return renderHouseholdScreen();
  }

  const enc = state.pendingEncounter;
  return renderEncounter(state, enc, (choiceId) => {
    handleChoice(enc, choiceId);
  });
}

// ---------------------------------------------------------------------------
// Career Transition Screen
// ---------------------------------------------------------------------------

function renderCareerTransitionScreen(): HTMLElement {
  const wrapper = el('div', { class: 'screen-wrapper career-transition' });
  wrapper.appendChild(el('h1', {}, 'The Continental Question'));
  wrapper.appendChild(el('p', { class: 'career-transition-intro' },
    'Your English career has reached a turning point. What lies ahead?'));

  const transitionEnc = ALL_ENCOUNTERS.find(e => e.id === 'career_transition_continental');
  if (transitionEnc) {
    const encEl = renderEncounter(state, transitionEnc, (choiceId) => {
      handleChoice(transitionEnc, choiceId);
      // After career transition, show career summary
      showCareerSummary();
    });
    wrapper.appendChild(encEl);
  }

  return wrapper;
}

function showCareerSummary(): void {
  clearAndRender(appEl,
    el('div', { class: 'career-summary' },
      el('h1', {}, 'Career Summary'),
      el('p', {}, `Days elapsed: ${state.day}`),
      el('p', {}, `Library: ${state.library.length} books`),
      renderFactionSummary(),
      el('h3', {}, 'Career Events'),
      ...state.careerEvents.map(e =>
        el('p', { class: 'career-event' }, `Day ${e.day}: ${e.description}`)
      ),
      renderEndOptions(),
    )
  );
}

function renderFactionSummary(): HTMLElement {
  const div = el('div', { class: 'faction-summary' });
  div.appendChild(el('h3', {}, 'Political Relationships at End'));
  const factions = state.factions as Record<string, number>;
  for (const [fid, val] of Object.entries(factions)) {
    div.appendChild(el('p', {}, `${fid}: ${val}`));
  }
  return div;
}

function renderEndOptions(): HTMLElement {
  const div = el('div', { class: 'end-options' });

  const newBtn = el('button', { class: 'btn btn--primary', type: 'button' }, 'New Career (same seed)');
  newBtn.addEventListener('click', () => {
    state = createInitialState(state.seed);
    rng = createRNG(state.seed);
    render();
  });
  div.appendChild(newBtn);

  const newSeedBtn = el('button', { class: 'btn btn--primary', type: 'button' }, 'New Career (new seed)');
  newSeedBtn.addEventListener('click', () => {
    const newSeed = Date.now();
    state = createInitialState(newSeed);
    rng = createRNG(newSeed);
    render();
  });
  div.appendChild(newSeedBtn);

  return div;
}

// ---------------------------------------------------------------------------
// Game Logic Handlers
// ---------------------------------------------------------------------------

function handleTravel(locationId: string): void {
  state = travelTo(state, locationId);

  // Check for encounters at destination
  const encounters = getEncountersForLocation(locationId, state.completedEncounterIds);
  if (encounters.length > 0) {
    // Pick one deterministically using RNG
    const availableNonRepeatable = encounters.filter(e => !e.repeatable);
    const pick = availableNonRepeatable.length > 0
      ? rng.pick(availableNonRepeatable)
      : rng.pick(encounters);

    state.pendingEncounter = pick;
    state.activeEncounterId = pick.id;
    state.screen = 'encounter';
  } else {
    state.screen = 'map';
  }

  render();
}

function startEncounter(encounterId: string): void {
  const enc = getEncounterById(encounterId);
  if (!enc) return;
  state.pendingEncounter = enc;
  state.activeEncounterId = encounterId;
  state.screen = 'encounter';
  render();
}

function handleChoice(encounter: Encounter, choiceId: string): void {
  const choice = encounter.choices.find(c => c.id === choiceId);
  if (!choice) return;

  // Apply costs
  if (choice.costs) {
    if (choice.costs.money) state.resources.money -= choice.costs.money;
    if (choice.costs.time) {
      state.resources.time -= choice.costs.time;
      state.day += choice.costs.time;
    }
    if (choice.costs.focus) state.resources.focus -= choice.costs.focus;
  }

  // Apply outcome
  state = applyOutcome(state, choice.outcome);

  // Mark encounter complete if non-repeatable
  if (!encounter.repeatable) {
    state = completeEncounter(state, encounter.id);
  }

  // Follow-up encounter
  if (choice.outcome.leadToEncounterId) {
    const followUp = getEncounterById(choice.outcome.leadToEncounterId);
    if (followUp && !state.completedEncounterIds.includes(followUp.id)) {
      state.pendingEncounter = followUp;
      state.activeEncounterId = followUp.id;
      state.screen = 'encounter';
    } else {
      returnToLocation();
    }
  } else {
    returnToLocation();
  }

  render();
}

function returnToLocation(): void {
  state.pendingEncounter = null;
  state.activeEncounterId = null;
  if (state.screen !== 'career_transition') {
    state.screen = state.currentLocationId === 'mortlake' ? 'household' : 'map';
  }
}

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------

function showToast(msg: string): void {
  const toast = el('div', { class: 'toast' }, msg);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ---------------------------------------------------------------------------
// Start Screen
// ---------------------------------------------------------------------------

function renderStartScreen(): void {
  const start = el('div', { class: 'start-screen' });

  start.appendChild(el('h1', { class: 'start-title' }, 'FTLDee'));
  start.appendChild(el('p', { class: 'start-subtitle' }, 'A Historical Career Roguelite'));
  start.appendChild(el('p', { class: 'start-desc' },
    'You are John Dee, intellectual courtier, mathematician, astrologer, and natural philosopher. ' +
    'England expects extraordinary things from you — and offers very little in return. ' +
    'Navigate the courts, libraries, and intelligence networks of Elizabethan England. ' +
    'Build your repertoire. Choose your patrons. Decide whether to stay or depart for the Continent.'));

  const btnGroup = el('div', { class: 'start-btns' });

  const newGameBtn = el('button', { class: 'btn btn--primary btn--large', type: 'button' }, 'Begin Career');
  newGameBtn.addEventListener('click', () => {
    const seed = Date.now();
    state = createInitialState(seed);
    rng = createRNG(seed);
    render();
  });
  btnGroup.appendChild(newGameBtn);

  if (hasSave()) {
    const loadBtn = el('button', { class: 'btn btn--secondary btn--large', type: 'button' }, 'Continue Career');
    loadBtn.addEventListener('click', () => {
      const loaded = loadGame();
      if (loaded) {
        state = loaded;
        rng = createRNG(state.seed);
        render();
      }
    });
    btnGroup.appendChild(loadBtn);
  }

  // Seed input
  const seedSection = el('div', { class: 'seed-section' });
  seedSection.appendChild(el('label', { for: 'seed-input', class: 'seed-label' }, 'Or start with a specific seed:'));
  const seedInput = el('input', { id: 'seed-input', type: 'number', class: 'seed-input', placeholder: 'Seed number' });
  const seedBtn = el('button', { class: 'btn btn--secondary', type: 'button' }, 'Use Seed');
  seedBtn.addEventListener('click', () => {
    const inputEl = document.getElementById('seed-input') as HTMLInputElement;
    const seedVal = parseInt(inputEl.value, 10);
    if (!isNaN(seedVal)) {
      state = createInitialState(seedVal);
      rng = createRNG(seedVal);
      render();
    }
  });
  seedSection.appendChild(seedInput);
  seedSection.appendChild(seedBtn);
  btnGroup.appendChild(seedSection);

  start.appendChild(btnGroup);

  start.appendChild(el('p', { class: 'start-note' },
    'Historical content derived from Parry, Pumfrey, Clulee, and Melvin-Koushki scholarship. ' +
    'Historical events are tagged: DOCUMENTED / PLAUSIBLE / CONTESTED / COUNTERFACTUAL.'));

  clearAndRender(appEl, start);
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

// Initialize with a placeholder state so TypeScript is satisfied
state = createInitialState(0);

renderStartScreen();
