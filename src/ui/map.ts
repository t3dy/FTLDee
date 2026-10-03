import type { GameState } from '../core/types.js';
import type { Location } from '../core/types.js';
import { el } from './render.js';
import { ALL_LOCATIONS, getAccessibleLocations } from '../data/locations/index.js';

type TravelCallback = (locationId: string) => void;

export function renderMap(state: GameState, onTravel: TravelCallback): HTMLElement {
  const container = el('div', { class: 'map-screen' });

  const header = el('div', { class: 'map-header' });
  header.appendChild(el('h1', {}, 'England, c. 1580'));
  header.appendChild(el('p', {}, `Current position: ${getLocationName(state.currentLocationId)}`));
  container.appendChild(header);

  const mapArea = el('div', { class: 'map-area' });

  // SVG node map
  mapArea.appendChild(renderMapSVG(state, onTravel));

  // Location list
  const locList = el('div', { class: 'location-list' });
  locList.appendChild(el('h2', {}, 'Accessible Destinations'));

  const accessible = getAccessibleLocations(state.currentLocationId, state.factions as Record<string, number>, state.flags);
  const current = ALL_LOCATIONS.find(l => l.id === state.currentLocationId);

  if (accessible.length === 0) {
    locList.appendChild(el('p', { class: 'no-destinations' }, 'No accessible destinations from here.'));
  }

  for (const loc of accessible) {
    const conn = current?.connections.find(c => c.to === loc.id);
    if (!conn) continue;
    locList.appendChild(renderDestinationCard(loc, conn, state, onTravel));
  }

  container.appendChild(mapArea);
  container.appendChild(locList);

  // Political weather notes
  const weatherPanel = el('div', { class: 'weather-panel' });
  weatherPanel.appendChild(el('h3', {}, 'Political Weather'));
  const activeWeather = state.weatherEvents.filter(e => e.triggered);
  if (activeWeather.length === 0) {
    weatherPanel.appendChild(el('p', {}, 'The political situation is stable for now.'));
  } else {
    for (const event of activeWeather) {
      const row = el('div', { class: 'weather-event' });
      row.appendChild(el('strong', {}, event.title));
      row.appendChild(el('p', {}, event.description));
      weatherPanel.appendChild(row);
    }
  }
  container.appendChild(weatherPanel);

  return container;
}

function renderMapSVG(state: GameState, onTravel: TravelCallback): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 500 400');
  svg.setAttribute('class', 'map-svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Map of England c. 1580');

  // Node positions
  const positions: Record<string, [number, number]> = {
    mortlake: [180, 220],
    richmond: [120, 200],
    greenwich: [280, 210],
    windsor: [80, 270],
    barn_elms: [170, 270],
    london: [250, 270],
  };

  const accessible = getAccessibleLocations(state.currentLocationId, state.factions as Record<string, number>, state.flags);
  const accessibleIds = new Set(accessible.map(l => l.id));
  const current = ALL_LOCATIONS.find(l => l.id === state.currentLocationId);

  // Draw connections
  if (current) {
    for (const conn of current.connections) {
      const from = positions[state.currentLocationId];
      const to = positions[conn.to];
      if (!from || !to) continue;
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', String(from[0]));
      line.setAttribute('y1', String(from[1]));
      line.setAttribute('x2', String(to[0]));
      line.setAttribute('y2', String(to[1]));
      line.setAttribute('class', accessibleIds.has(conn.to) ? 'map-edge map-edge--open' : 'map-edge map-edge--closed');
      svg.appendChild(line);

      // Travel cost label
      const mx = (from[0] + to[0]) / 2;
      const my = (from[1] + to[1]) / 2;
      const label = document.createElementNS(ns, 'text');
      label.setAttribute('x', String(mx));
      label.setAttribute('y', String(my - 6));
      label.setAttribute('class', 'map-edge-label');
      label.textContent = `${conn.travelDays}d £${conn.travelCost}`;
      svg.appendChild(label);
    }
  }

  // Draw nodes
  for (const [locId, [x, y]] of Object.entries(positions)) {
    const isCurrent = locId === state.currentLocationId;
    const isAccessible = accessibleIds.has(locId);
    const loc = ALL_LOCATIONS.find(l => l.id === locId);
    if (!loc) continue;

    const group = document.createElementNS(ns, 'g');
    group.setAttribute('class', 'map-node-group');

    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', String(x));
    circle.setAttribute('cy', String(y));
    circle.setAttribute('r', '20');
    circle.setAttribute('class',
      isCurrent ? 'map-node map-node--current' :
      isAccessible ? 'map-node map-node--accessible' :
      'map-node map-node--distant'
    );
    group.appendChild(circle);

    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', String(x));
    text.setAttribute('y', String(y + 35));
    text.setAttribute('class', 'map-node-label');
    text.textContent = loc.name;
    group.appendChild(text);

    if (isAccessible && !isCurrent) {
      circle.style.cursor = 'pointer';
      group.addEventListener('click', () => onTravel(locId));
    }

    svg.appendChild(group);
  }

  // Thames river decoration
  const thames = document.createElementNS(ns, 'path');
  thames.setAttribute('d', 'M 40 230 Q 180 240 260 250 Q 320 258 420 265');
  thames.setAttribute('class', 'map-river');
  thames.setAttribute('fill', 'none');
  svg.insertBefore(thames, svg.firstChild);

  // Label
  const riverLabel = document.createElementNS(ns, 'text');
  riverLabel.setAttribute('x', '350');
  riverLabel.setAttribute('y', '248');
  riverLabel.setAttribute('class', 'map-river-label');
  riverLabel.textContent = 'River Thames';
  svg.appendChild(riverLabel);

  return svg;
}

function renderDestinationCard(
  loc: Location,
  conn: { travelDays: number; travelCost: number; risk: string },
  state: GameState,
  onTravel: TravelCallback,
): HTMLElement {
  const card = el('div', { class: 'destination-card' });

  const titleRow = el('div', { class: 'destination-title-row' });
  titleRow.appendChild(el('h3', {}, loc.name));
  const risk = el('span', { class: `risk-badge risk-${conn.risk}` }, conn.risk.toUpperCase());
  titleRow.appendChild(risk);
  card.appendChild(titleRow);

  card.appendChild(el('p', { class: 'destination-desc' }, loc.description.slice(0, 120) + '…'));

  const metaRow = el('div', { class: 'destination-meta' });
  metaRow.appendChild(el('span', {}, `${conn.travelDays} day${conn.travelDays > 1 ? 's' : ''} travel`));
  metaRow.appendChild(el('span', {}, `£${conn.travelCost}`));

  if (loc.requirements?.minFaction) {
    for (const [fid, minVal] of Object.entries(loc.requirements.minFaction)) {
      const current = state.factions[fid as keyof typeof state.factions] ?? 0;
      const label = el('span', { class: current >= minVal ? 'req-met' : 'req-unmet' },
        `${fid}: ${current}/${minVal}`);
      metaRow.appendChild(label);
    }
  }
  card.appendChild(metaRow);

  const btn = el('button', { class: 'btn btn--travel', type: 'button' },
    `Travel to ${loc.name}`);
  const canAfford = state.resources.money >= conn.travelCost;
  const canTimeAfford = state.resources.time >= conn.travelDays;
  if (!canAfford || !canTimeAfford) {
    btn.setAttribute('disabled', 'true');
    btn.setAttribute('class', 'btn btn--travel btn--disabled');
    if (!canAfford) btn.title = `Insufficient funds (need £${conn.travelCost})`;
    else btn.title = 'Insufficient time';
  } else {
    btn.addEventListener('click', () => onTravel(loc.id));
  }
  card.appendChild(btn);

  return card;
}

function getLocationName(id: string): string {
  return ALL_LOCATIONS.find(l => l.id === id)?.name ?? id;
}
