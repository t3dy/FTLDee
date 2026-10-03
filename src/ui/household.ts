import type { GameState } from '../core/types.js';
import { el, renderBar, factionLabel } from './render.js';

export function renderHousehold(state: GameState): HTMLElement {
  const container = el('div', { class: 'household-screen' });

  // Header
  const header = el('div', { class: 'household-header' });
  header.appendChild(el('h1', {}, 'Mortlake'));
  header.appendChild(el('p', { class: 'date-label' }, `Day ${state.day} · c. 1580`));
  header.appendChild(el('p', { class: 'pressure-label' },
    `Political Pressure: ${Math.round(state.totalPressure)}/100`));
  container.appendChild(header);

  const columns = el('div', { class: 'household-columns' });

  // Left: Protagonist
  const leftCol = el('div', { class: 'household-col' });
  leftCol.appendChild(renderDeePanel(state));
  leftCol.appendChild(renderHouseholdPanel(state));
  columns.appendChild(leftCol);

  // Center: Rooms
  const centerCol = el('div', { class: 'household-col household-col--center' });
  centerCol.appendChild(renderRoomsPanel(state));
  columns.appendChild(centerCol);

  // Right: Resources and Factions
  const rightCol = el('div', { class: 'household-col' });
  rightCol.appendChild(renderResourcesPanel(state));
  rightCol.appendChild(renderFactionsPanel(state));
  columns.appendChild(rightCol);

  container.appendChild(columns);

  // Log
  container.appendChild(renderLog(state));

  return container;
}

function renderDeePanel(state: GameState): HTMLElement {
  const p = state.protagonist;
  const panel = el('div', { class: 'panel' });
  panel.appendChild(el('h2', {}, p.name));
  panel.appendChild(el('p', { class: 'panel-sub' }, `Intellectual · Age ${p.age}`));

  const skillsDiv = el('div', { class: 'skills-list' });
  const majorSkills: Array<[string, string]> = [
    ['mathematics', 'Mathematics'],
    ['astronomy', 'Astronomy'],
    ['astrology', 'Astrology'],
    ['occultPhilosophy', 'Occult Philosophy'],
    ['rhetoric', 'Rhetoric'],
    ['cryptography', 'Cryptography'],
    ['navigation', 'Navigation'],
  ];
  for (const [id, label] of majorSkills) {
    const val = p.abilities[id as keyof typeof p.abilities] ?? 0;
    const row = el('div', { class: 'skill-row' });
    row.appendChild(el('span', { class: 'skill-label' }, label));
    row.appendChild(renderBar(val, 10, 'bar-fill bar-fill--skill'));
    row.appendChild(el('span', { class: 'skill-val' }, String(val)));
    skillsDiv.appendChild(row);
  }
  panel.appendChild(skillsDiv);
  return panel;
}

function renderHouseholdPanel(state: GameState): HTMLElement {
  const panel = el('div', { class: 'panel' });
  panel.appendChild(el('h2', {}, 'Household'));

  const crew = [state.protagonist, ...state.crew];
  for (const member of crew) {
    if (member.id === 'dee') continue;
    const row = el('div', { class: 'crew-row' });
    row.appendChild(el('span', { class: 'crew-name' }, member.name));
    row.appendChild(el('span', { class: 'crew-role' }, member.role));
    row.appendChild(el('span', { class: 'crew-loc' }, member.location));
    panel.appendChild(row);
  }

  const stabilityRow = el('div', { class: 'stability-row' });
  stabilityRow.appendChild(el('span', {}, 'Household Stability'));
  stabilityRow.appendChild(renderBar(state.household.stability, 100, 'bar-fill bar-fill--stability'));
  panel.appendChild(stabilityRow);

  return panel;
}

function renderRoomsPanel(state: GameState): HTMLElement {
  const panel = el('div', { class: 'panel panel--rooms' });
  panel.appendChild(el('h2', {}, 'The Household Rooms'));

  const rooms: Array<[keyof typeof state.household.rooms, string, string]> = [
    ['library', 'Library', `${state.library.length} books`],
    ['study', 'Study', 'Research'],
    ['laboratory', 'Laboratory', state.household.rooms.laboratory ? 'Active' : 'Not fitted out'],
    ['instrumentRoom', 'Instrument Room', state.instruments.length > 0 ? `${state.instruments.length} instruments` : 'Basic equipment'],
    ['scryingChamber', 'Scrying Chamber', state.household.rooms.scryingChamber ? 'Fitted' : 'Empty'],
    ['correspondence', 'Correspondence Office', 'Active'],
    ['quarters', 'Household Quarters', 'Occupied'],
  ];

  const grid = el('div', { class: 'rooms-grid' });
  for (const [key, name, status] of rooms) {
    const active = state.household.rooms[key];
    const room = el('div', { class: `room-card ${active ? 'room-card--active' : 'room-card--inactive'}` });
    room.appendChild(el('div', { class: 'room-name' }, name));
    room.appendChild(el('div', { class: 'room-status' }, status));
    grid.appendChild(room);
  }
  panel.appendChild(grid);

  // Library list
  if (state.library.length > 0) {
    const libSection = el('div', { class: 'library-section' });
    libSection.appendChild(el('h3', {}, 'Library'));
    const bookList = el('ul', { class: 'book-list' });
    for (const book of state.library) {
      const li = el('li', { class: 'book-item' });
      li.appendChild(el('span', { class: 'book-title' }, book.title));
      li.appendChild(el('span', { class: 'book-author' }, ` — ${book.author}`));
      const tagsDiv = el('div', { class: 'book-tags' });
      book.intellectualTags.slice(0, 4).forEach(tag => {
        tagsDiv.appendChild(el('span', { class: 'tag' }, tag));
      });
      li.appendChild(tagsDiv);
      bookList.appendChild(li);
    }
    libSection.appendChild(bookList);
    panel.appendChild(libSection);
  }

  return panel;
}

function renderResourcesPanel(state: GameState): HTMLElement {
  const panel = el('div', { class: 'panel' });
  panel.appendChild(el('h2', {}, 'Resources'));

  const r = state.resources;
  const resources: Array<[string, number, number, string]> = [
    ['Money', r.money, 200, 'bar-fill--money'],
    ['Time Remaining', r.time, 180, 'bar-fill--time'],
    ['Secrecy', r.secrecy, 100, 'bar-fill--secrecy'],
    ['Focus', r.focus, 100, 'bar-fill--focus'],
  ];

  for (const [label, val, max, cls] of resources) {
    const row = el('div', { class: 'resource-row' });
    row.appendChild(el('span', { class: 'resource-label' }, label));
    const valueStr = label === 'Money' ? `£${val}` : `${val}`;
    row.appendChild(el('span', { class: 'resource-val' }, valueStr));
    row.appendChild(renderBar(val, max, `bar-fill ${cls}`));
    panel.appendChild(row);
  }

  return panel;
}

function renderFactionsPanel(state: GameState): HTMLElement {
  const panel = el('div', { class: 'panel' });
  panel.appendChild(el('h2', {}, 'Political Relationships'));

  const factionOrder = ['elizabeth', 'burghley', 'leicester', 'walsingham', 'religiousAuth', 'scholarNetwork', 'merchantNetwork', 'continentalCourts'];

  for (const fid of factionOrder) {
    const val = state.factions[fid as keyof typeof state.factions] ?? 0;
    const row = el('div', { class: 'faction-row' });
    row.appendChild(el('span', { class: 'faction-label' }, factionLabel(fid)));
    row.appendChild(el('span', { class: 'faction-val' }, String(val)));
    row.appendChild(renderBar(val, 100, `bar-fill bar-fill--faction`));
    panel.appendChild(row);
  }

  // Knowledge tags
  if (state.knowledgeTags.length > 0) {
    const tagsSection = el('div', { class: 'knowledge-section' });
    tagsSection.appendChild(el('h3', {}, 'Active Knowledge'));
    const tagsDiv = el('div', { class: 'knowledge-tags' });
    state.knowledgeTags.slice(0, 12).forEach(tag => {
      tagsDiv.appendChild(el('span', { class: 'tag' }, tag));
    });
    tagsSection.appendChild(tagsDiv);
    panel.appendChild(tagsSection);
  }

  return panel;
}

function renderLog(state: GameState): HTMLElement {
  const panel = el('div', { class: 'log-panel' });
  panel.appendChild(el('h3', {}, 'Journal'));
  const log = el('div', { class: 'log-entries' });
  const recent = state.log.slice(-8).reverse();
  for (const entry of recent) {
    log.appendChild(el('p', { class: 'log-entry' }, entry));
  }
  panel.appendChild(log);
  return panel;
}
