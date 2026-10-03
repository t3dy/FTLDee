import type { GameState, Location } from '../core/types.js';
import { el, svgEl, button, help } from './render.js';
import { glyph, glyphPathData } from './glyphs.js';
import { getLocation, locationsInSector, isAccessible, SECTORS } from '../data/locations/index.js';
import { getErrand } from '../data/cards/errands.js';
import { errandBlocker, errandDays } from '../systems/errands.js';
import { sectorDay } from '../systems/time.js';
import { skillName } from '../data/cards/skills.js';

export interface MapUi {
  selectedNode: string | null;
  errandCrew: string | null;
}

export interface MapActions {
  select: (id: string | null) => void;
  travel: (id: string) => void;
  chooseErrandCrew: (id: string | null) => void;
  sendErrand: (crewId: string, locationId: string, errandId: string) => void;
  startEncounter: (id: string) => void;
}

export function renderMap(s: GameState, ui: MapUi, a: MapActions, here: { id: string; title: string; status: string }[]): HTMLElement {
  const wrap = el('div', { class: 'map-screen' });
  const meta = SECTORS[s.sector];
  wrap.appendChild(el('h1', {}, `${meta.name}, ${meta.dates}`));
  wrap.appendChild(renderWeatherTrack(s));

  const body = el('div', { class: 'map-body' });
  body.appendChild(renderSvg(s, ui, a));
  const side = el('div', { class: 'map-side' });
  const node = getLocation(ui.selectedNode ?? s.currentLocationId);
  if (node) side.appendChild(renderNodePanel(s, node, ui, a));
  if (here.length) {
    const p = el('div', { class: 'panel activities' }, el('h2', {}, `Here at ${getLocation(s.currentLocationId)?.name}`));
    for (const e of here) {
      const b = el('button', { class: `activity activity--${e.status}`, type: 'button' },
        el('span', { class: 'activity-title' }, e.title), el('span', { class: `hist-badge hist-${e.status}` }, e.status));
      b.addEventListener('click', () => a.startEncounter(e.id));
      p.appendChild(b);
    }
    side.appendChild(p);
  }
  body.appendChild(side);
  wrap.appendChild(body);
  return wrap;
}

function renderWeatherTrack(s: GameState): HTMLElement {
  const meta = SECTORS[s.sector];
  const total = meta.days;
  const d = sectorDay(s);
  const track = help(el('div', { class: 'weather-track' }), 'map-weather-track');
  track.appendChild(el('span', { class: 'weather-label' }, 'Political weather'));
  const lane = el('div', { class: 'weather-lane' });
  lane.appendChild(el('div', { class: 'weather-elapsed', style: `width:${Math.min(100, (d / total) * 100)}%` }));
  for (const ev of s.weatherEvents.filter(e => e.sector === s.sector && e.triggerDate !== undefined)) {
    lane.appendChild(el('div', {
      class: `weather-mark${ev.triggered ? ' weather-mark--past' : ''}`, style: `left:${(ev.triggerDate! / total) * 100}%`,
      title: `Day ${ev.triggerDate}: ${ev.triggered ? ev.title : 'something is coming'}`,
    }, ev.triggered ? '●' : '?'));
  }
  lane.appendChild(el('div', { class: 'weather-mark weather-mark--crisis', style: `left:${(meta.transitionDay / total) * 100}%`,
    title: s.sector === 'england' ? 'The Continental Question' : s.sector === 'road' ? 'Łaski’s money runs out' : 'Prague closes' }, '!'));
  lane.appendChild(el('div', { class: 'weather-now', style: `left:${Math.min(100, (d / total) * 100)}%` }));
  track.appendChild(lane);
  track.appendChild(el('span', { class: 'weather-day' }, `Day ${d}/${total}`));
  return track;
}

function renderSvg(s: GameState, ui: MapUi, a: MapActions): SVGSVGElement {
  const svg = svgEl('svg', { viewBox: '0 0 1000 560', class: `map-svg map-svg--${s.sector}`, role: 'img', 'aria-label': 'Sector map' });
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 1000, height: 560, class: 'map-ground' }));
  if (s.sector === 'england') {
    svg.appendChild(svgEl('path', { class: 'map-river', d: 'M90 170 C150 230 180 300 230 330 S360 360 420 340 S480 300 500 300 S560 260 570 245 S640 200 680 190 S760 240 790 255 S840 300 860 310 S940 280 1000 270' }));
    svg.appendChild(svgEl('text', { x: 300, y: 380, class: 'map-river-label' }, 'Thames'));
    svg.appendChild(svgEl('path', { class: 'map-hills', d: 'M0 520 C120 470 260 500 380 470 S620 500 760 470 S920 500 1000 480' }));
    svg.appendChild(svgEl('text', { x: 40, y: 540, class: 'map-legend' }, 'Southern England, schematic: west to east along the Thames'));
  } else if (s.sector === 'road') {
    svg.appendChild(svgEl('path', { class: 'map-sea', d: 'M0 0 H420 C380 120 300 200 300 260 C240 300 180 340 140 420 C100 480 60 520 0 540 Z' }));
    svg.appendChild(svgEl('path', { class: 'map-sea', d: 'M500 0 H1000 V60 C900 120 820 150 760 140 C700 130 640 120 560 160 C520 120 500 60 500 0 Z' }));
    svg.appendChild(svgEl('text', { x: 120, y: 160, class: 'map-river-label' }, 'North Sea'));
    svg.appendChild(svgEl('text', { x: 700, y: 60, class: 'map-river-label' }, 'Baltic'));
    svg.appendChild(svgEl('path', { class: 'map-coast', d: 'M0 540 C60 520 100 480 140 420 C180 340 240 300 300 260 C300 200 380 120 420 0' }));
    svg.appendChild(svgEl('text', { x: 40, y: 545, class: 'map-legend' }, 'The Road East, 1583–84: documented route with roads not taken'));
  } else {
    svg.appendChild(svgEl('path', { class: 'map-river', d: 'M470 0 C520 80 560 160 540 260 S470 400 520 470 S560 540 540 560' }));
    svg.appendChild(svgEl('text', { x: 560, y: 120, class: 'map-river-label' }, 'Vltava'));
    svg.appendChild(svgEl('path', { class: 'map-hills', d: 'M40 80 L320 60 L360 200 L300 260 L60 280 Z' }));
    svg.appendChild(svgEl('text', { x: 70, y: 100, class: 'map-legend' }, 'Castle hill'));
    svg.appendChild(svgEl('text', { x: 680, y: 540, class: 'map-legend' }, 'Prague, schematic plan'));
  }

  const nodes = locationsInSector(s.sector);
  const current = getLocation(s.currentLocationId);
  const drawn = new Set<string>();
  for (const n of nodes) {
    for (const c of n.connections) {
      const to = getLocation(c.to);
      if (!to || to.sector !== s.sector) continue;
      const key = [n.id, to.id].sort().join('|');
      if (drawn.has(key)) continue;
      drawn.add(key);
      const fromHere = (n.id === current?.id || to.id === current?.id);
      svg.appendChild(svgEl('line', { x1: n.x, y1: n.y, x2: to.x, y2: to.y, class: `map-edge${fromHere ? ' map-edge--here' : ''}` }));
      if (fromHere) svg.appendChild(svgEl('text', { x: (n.x + to.x) / 2, y: (n.y + to.y) / 2 - 6, class: 'map-edge-label' }, `${c.travelDays}d £${c.travelCost}`));
    }
  }

  const adjacent = new Set(current?.connections.map(c => c.to));
  for (const n of nodes) {
    const access = isAccessible(n, s.factions, s.flags);
    const isHere = n.id === s.currentLocationId;
    const cls = ['map-node', isHere ? 'map-node--here' : '', adjacent.has(n.id) && access ? 'map-node--reachable' : '',
      !access ? 'map-node--locked' : '', ui.selectedNode === n.id ? 'map-node--selected' : '',
      s.visitedLocationIds.includes(n.id) ? 'map-node--visited' : '', n.market ? 'map-node--market' : ''].filter(Boolean).join(' ');
    const g = svgEl('g', { class: cls, tabindex: 0, role: 'button', 'aria-label': n.name });
    g.appendChild(svgEl('circle', { cx: n.x, cy: n.y, r: 24, class: 'map-node-ring' }));
    g.appendChild(svgEl('path', { d: glyphPathData(n.glyph), transform: `translate(${n.x - 12},${n.y - 12})`, class: 'map-node-icon' }));
    g.appendChild(svgEl('text', { x: n.x, y: n.y + 42, class: 'map-node-label' }, n.name));
    const away = Object.entries(s.crewPosts).filter(([, p]) => p.kind === 'errand' && p.locationId === n.id);
    away.forEach(([id], i) => {
      const c = s.crew.find(x => x.id === id);
      g.appendChild(svgEl('circle', { cx: n.x + 22 + i * 12, cy: n.y - 22, r: 7, class: 'map-crew-dot' }));
      g.appendChild(svgEl('title', {}, `${c?.name} on an errand here`));
    });
    if (isHere) g.appendChild(svgEl('circle', { cx: n.x, cy: n.y, r: 31, class: 'map-here-ring' }));
    g.addEventListener('click', () => a.select(n.id));
    g.addEventListener('keydown', ev => { if ((ev as KeyboardEvent).key === 'Enter') a.select(n.id); });
    svg.appendChild(help(g, 'map-node'));
  }
  return svg;
}

function renderNodePanel(s: GameState, n: Location, ui: MapUi, a: MapActions): HTMLElement {
  const panel = el('div', { class: 'panel node-panel' });
  panel.appendChild(el('div', { class: 'card-head' }, glyph(n.glyph, 26), el('h2', {}, n.name),
    el('span', { class: `hist-badge hist-${n.historicalStatus}` }, n.historicalStatus)));
  panel.appendChild(el('p', {}, n.description));
  if (n.sources.length) panel.appendChild(el('p', { class: 'sources' }, n.sources.join('; ')));

  const current = getLocation(s.currentLocationId)!;
  const conn = current.connections.find(c => c.to === n.id);
  const access = isAccessible(n, s.factions, s.flags);
  if (n.id === s.currentLocationId) {
    panel.appendChild(el('p', { class: 'hint' }, 'You are here.'));
  } else if (conn) {
    let why: string | null = null;
    if (!access) {
      const reqs = [
        ...Object.entries(n.requirements?.minFaction ?? {}).map(([k, v]) => `${k} ${s.factions[k as keyof typeof s.factions] ?? 0}/${v}`),
        ...(n.requirements?.flags ?? []).filter(f => !s.flags.includes(f)).map(f => f.replace(/_/g, ' ')),
      ];
      why = `Closed to you: ${reqs.join(', ')}`;
    } else if (s.resources.money < conn.travelCost) why = `Needs £${conn.travelCost}.`;
    panel.appendChild(el('p', { class: 'travel-line' }, `${conn.travelDays} day${conn.travelDays > 1 ? 's' : ''}, £${conn.travelCost}, ${conn.risk} risk`));
    panel.appendChild(button(`Travel to ${n.name}`, () => a.travel(n.id), 'btn btn--travel', why));
    if (why) panel.appendChild(el('p', { class: 'upgrade-why' }, why));
  } else {
    panel.appendChild(el('p', { class: 'hint' }, 'Not directly connected to where you are.'));
  }

  if (n.errands?.length) {
    const box = help(el('div', { class: 'errand-box' }), 'map-errand');
    box.appendChild(el('h3', {}, 'Send someone'));
    const home = s.crew.filter(c => s.crewPosts[c.id]?.kind === 'room');
    if (!home.length) box.appendChild(el('p', { class: 'hint' }, 'No one at the house is free.'));
    const pick = el('div', { class: 'errand-crew' });
    for (const c of home) {
      pick.appendChild(button(c.name, () => a.chooseErrandCrew(ui.errandCrew === c.id ? null : c.id),
        `btn btn--small${ui.errandCrew === c.id ? ' btn--primary' : ''}`));
    }
    box.appendChild(pick);
    for (const eid of n.errands) {
      const e = getErrand(eid);
      if (!e) continue;
      const crew = ui.errandCrew ? s.crew.find(c => c.id === ui.errandCrew) : undefined;
      const skill = crew?.abilities[e.skill] ?? 0;
      const odds = crew ? Math.max(0, Math.min(100, (11 - (e.difficulty - skill)) * 10)) : null;
      const why = !crew ? 'Choose who to send.' : errandBlocker(s, crew.id, n.id, eid);
      box.appendChild(el('div', { class: 'errand-row' },
        glyph(e.glyph, 18),
        el('div', {}, el('strong', {}, e.name), el('p', { class: 'hint' }, e.summary),
          el('p', { class: 'errand-meta' }, `${skillName(e.skill)} vs ${e.difficulty} · £${e.cost} · ${errandDays(s, n.id, eid)} days away${odds !== null ? ` · ${crew!.name}: ${odds}% chance` : ''}`)),
        button('Send', () => a.sendErrand(crew!.id, n.id, eid), 'btn btn--small btn--primary', why)));
    }
    panel.appendChild(box);
  }
  return panel;
}
