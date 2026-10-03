import type { CrewPost, Encounter, GameState, RoomId } from '../core/types.js';
import { el, svgEl, button, help, pips } from './render.js';
import { glyph, glyphPathData } from './glyphs.js';
import { BASE_LAYOUTS, getRoomCard, ROOM_CARDS } from '../data/cards/rooms.js';
import { crewInRoom, isManned, atBase, skillBreakdown } from '../systems/skills.js';
import { maxRoomLevel, roomStations, postBlocker, quartersCapacity, currentTier } from '../systems/household.js';
import { skillName } from '../data/cards/skills.js';
import { getLocation } from '../data/locations/index.js';
import { getErrand } from '../data/cards/errands.js';

export interface ShipUi {
  selectedCrew: string | null;
  selectedRoom: RoomId | null;
}

export interface ShipActions {
  selectCrew: (id: string | null) => void;
  selectRoom: (id: RoomId | null) => void;
  post: (crewId: string, post: CrewPost) => void;
  startEncounter: (id: string) => void;
  goUpgrades: () => void;
}

const CREW_COLOURS: Record<string, string> = {
  jane_dee: '#c87b5a', roger_cooke: '#6f9fc8', barnabas_saul: '#9a8a6a', edward_kelley: '#a565b8',
};

function initials(name: string): string {
  return name.split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

export function renderShip(s: GameState, ui: ShipUi, a: ShipActions, activities: Encounter[]): HTMLElement {
  const layout = BASE_LAYOUTS[s.household.baseId];
  const wrap = el('div', { class: 'ship-screen' });

  const head = el('div', { class: 'ship-head' },
    el('div', {},
      el('h1', {}, s.household.name),
      el('p', { class: 'ship-sub' },
        `House tier ${s.household.tier} · rooms build to level ${currentTier(s).maxRoomLevel} · household ${s.crew.length}/${quartersCapacity(s)} · stability ${s.household.stability}`),
    ),
    button('Upgrade rooms and house', a.goUpgrades, 'btn btn--primary'),
  );
  wrap.appendChild(head);
  if (!atBase(s)) {
    wrap.appendChild(el('p', { class: 'ship-away' },
      `You are away at ${getLocation(s.currentLocationId)?.name}. Room bonuses apply only at the house; crew can be re-posted when you return.`));
  }

  const body = el('div', { class: 'ship-body' });
  const left = el('div', { class: 'ship-left' });
  left.appendChild(renderPlan(s, ui, a));
  left.appendChild(renderRetinue(s, ui, a));
  left.appendChild(el('p', { class: 'ship-note' }, layout.note));
  body.appendChild(left);

  const right = el('div', { class: 'ship-right' });
  right.appendChild(renderRoster(s, ui, a));
  if (ui.selectedRoom) right.appendChild(renderRoomDetail(s, ui.selectedRoom, ui, a));
  right.appendChild(renderActivities(activities, a));
  body.appendChild(right);
  wrap.appendChild(body);
  return wrap;
}

function renderPlan(s: GameState, ui: ShipUi, a: ShipActions): SVGSVGElement {
  const layout = BASE_LAYOUTS[s.household.baseId];
  const svg = svgEl('svg', { viewBox: `0 0 ${layout.width} ${layout.height}`, class: 'plan-svg', role: 'img', 'aria-label': `Plan of ${layout.name}` });
  svg.appendChild(svgEl('defs', {},
    svgEl('pattern', { id: 'hatch', width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' },
      svgEl('line', { x1: 0, y1: 0, x2: 0, y2: 8, stroke: 'currentColor', 'stroke-width': 1, class: 'hatch-line' })),
  ));
  svg.appendChild(svgEl('rect', { x: 10, y: 10, width: layout.width - 20, height: layout.height - 20, class: 'plan-outer' }));

  for (const r of layout.rooms) {
    const card = getRoomCard(r.room);
    const lvl = s.household.rooms[r.room];
    const cap = maxRoomLevel(s, r.room);
    const manned = lvl >= 1 && isManned(s, r.room);
    const selected = ui.selectedRoom === r.room;
    const canPost = ui.selectedCrew && !postBlocker(s, ui.selectedCrew, { kind: 'room', room: r.room });
    const g = svgEl('g', {
      class: `plan-room plan-room--l${lvl}${manned ? ' plan-room--manned' : ''}${selected ? ' plan-room--selected' : ''}${canPost ? ' plan-room--target' : ''}`,
      tabindex: 0, role: 'button', 'aria-label': `${r.label ?? card.name}, level ${lvl}`,
    });
    g.appendChild(svgEl('rect', { x: r.x + 4, y: r.y + 4, width: r.w - 8, height: r.h - 8, class: 'plan-room-floor' }));
    if (lvl === 0) g.appendChild(svgEl('rect', { x: r.x + 4, y: r.y + 4, width: r.w - 8, height: r.h - 8, fill: 'url(#hatch)', class: 'plan-room-hatch' }));
    const icon = svgEl('path', { d: glyphPathData(card.glyph), transform: `translate(${r.x + 14},${r.y + 14}) scale(1.15)`, class: 'plan-room-icon' });
    g.appendChild(icon);
    g.appendChild(svgEl('text', { x: r.x + 16, y: r.y + 64, class: 'plan-room-name', textLength: Math.min(r.w - 32, (r.label ?? card.name).length * 9.5), lengthAdjust: 'spacingAndGlyphs' }, r.label ?? card.name));
    g.appendChild(svgEl('text', { x: r.x + 16, y: r.y + 84, class: 'plan-room-level' },
      lvl === 0 ? 'not built' : card.levels[lvl - 1].label));

    // System bar: one block per level, dashed when the house tier caps it.
    for (let i = 1; i <= 3; i++) {
      const on = i <= lvl;
      const capped = i > cap;
      g.appendChild(svgEl('rect', { x: r.x + 16 + (i - 1) * 22, y: r.y + r.h - 34, width: 18, height: 14,
        class: `plan-bar${on ? ' plan-bar--on' : ''}${capped ? ' plan-bar--capped' : ''}` }));
    }

    // Stations with crew tokens.
    const stations = roomStations(s, r.room);
    const here = crewInRoom(s, r.room);
    for (let i = 0; i < stations; i++) {
      const cx = r.x + r.w - 26 - i * 34;
      const cy = r.y + r.h - 28;
      const crewId = here[i];
      g.appendChild(svgEl('circle', { cx, cy, r: 14, class: 'plan-station' }));
      if (crewId) {
        const c = s.crew.find(x => x.id === crewId)!;
        const tok = svgEl('g', { class: `crew-token${ui.selectedCrew === crewId ? ' crew-token--selected' : ''}`, 'data-crew': crewId });
        tok.appendChild(svgEl('circle', { cx, cy, r: 13, fill: CREW_COLOURS[crewId] ?? '#888' }));
        tok.appendChild(svgEl('text', { x: cx, y: cy + 4, class: 'crew-token-text' }, initials(c.name)));
        tok.addEventListener('click', ev => { ev.stopPropagation(); a.selectCrew(ui.selectedCrew === crewId ? null : crewId); });
        g.appendChild(tok);
      }
    }
    const click = () => {
      if (ui.selectedCrew && canPost) a.post(ui.selectedCrew, { kind: 'room', room: r.room });
      else a.selectRoom(selected ? null : r.room);
    };
    g.addEventListener('click', click);
    g.addEventListener('keydown', ev => { if ((ev as KeyboardEvent).key === 'Enter') click(); });
    svg.appendChild(g);
  }
  return help(svg, 'room-card');
}

function renderRetinue(s: GameState, ui: ShipUi, a: ShipActions): HTMLElement {
  const box = help(el('div', { class: 'retinue' }), 'crew-retinue');
  box.appendChild(el('span', { class: 'retinue-label' }, 'Retinue — travels with Dee; their skills stand in for his'));
  const ids = Object.entries(s.crewPosts).filter(([, p]) => p.kind === 'retinue').map(([id]) => id);
  if (!ids.length) box.appendChild(el('span', { class: 'retinue-empty' }, 'Dee travels alone.'));
  for (const id of ids) {
    const c = s.crew.find(x => x.id === id);
    if (!c) continue;
    const t = el('button', { class: `retinue-token${ui.selectedCrew === id ? ' retinue-token--selected' : ''}`, type: 'button', style: `--crew:${CREW_COLOURS[id] ?? '#888'}` }, c.name);
    t.addEventListener('click', () => a.selectCrew(ui.selectedCrew === id ? null : id));
    box.appendChild(t);
  }
  if (ui.selectedCrew && s.crewPosts[ui.selectedCrew]?.kind === 'room') {
    const why = postBlocker(s, ui.selectedCrew, { kind: 'retinue' });
    box.appendChild(button('Add selected to retinue', () => a.post(ui.selectedCrew!, { kind: 'retinue' }), 'btn btn--small', why));
  }
  return box;
}

function renderRoster(s: GameState, ui: ShipUi, a: ShipActions): HTMLElement {
  const panel = el('div', { class: 'panel roster' });
  panel.appendChild(el('h2', {}, 'Household'));
  panel.appendChild(el('p', { class: 'hint' }, ui.selectedCrew
    ? 'Now click a room on the plan to post them there, or add them to the retinue.'
    : 'Select someone, then click a room to post them. A posted crew member with 4+ in a room\'s key skill mans it (+1).'));
  for (const c of s.crew) {
    const p = s.crewPosts[c.id];
    const where = !p ? '—' : p.kind === 'room' ? getRoomCard(p.room).name
      : p.kind === 'retinue' ? 'Retinue'
      : `${getErrand(p.errandId)?.name ?? 'Errand'} at ${getLocation(p.locationId)?.name}; back day ${p.returnDay}`;
    const top = Object.entries(c.abilities).sort((x, y) => (y[1] ?? 0) - (x[1] ?? 0)).slice(0, 3)
      .map(([k, v]) => `${skillName(k)} ${v}`).join(' · ');
    const row = help(el('button', {
      class: `roster-row${ui.selectedCrew === c.id ? ' roster-row--selected' : ''}${p?.kind === 'errand' ? ' roster-row--away' : ''}`,
      type: 'button', style: `--crew:${CREW_COLOURS[c.id] ?? '#888'}`,
    },
      el('span', { class: 'roster-dot' }, initials(c.name)),
      el('span', { class: 'roster-main' },
        el('strong', {}, c.name), el('span', { class: 'roster-where' }, where), el('span', { class: 'roster-skills' }, top)),
      el('span', { class: `hist-badge hist-${c.historicalStatus}` }, c.historicalStatus),
    ), 'crew-token');
    if (p?.kind !== 'errand') row.addEventListener('click', () => a.selectCrew(ui.selectedCrew === c.id ? null : c.id));
    panel.appendChild(row);
  }
  return panel;
}

function renderRoomDetail(s: GameState, room: RoomId, _ui: ShipUi, a: ShipActions): HTMLElement {
  const card = getRoomCard(room);
  const lvl = s.household.rooms[room];
  const panel = el('div', { class: 'panel room-detail' });
  panel.appendChild(el('div', { class: 'card-head' }, glyph(card.glyph, 26),
    el('div', {}, el('h2', {}, card.name), pips(lvl, 3, maxRoomLevel(s, room))),
    el('span', { class: `hist-badge hist-${card.historicalStatus}` }, card.historicalStatus)));
  panel.appendChild(el('p', {}, card.summary));
  const list = el('ul', { class: 'level-list' });
  for (const l of card.levels) {
    list.appendChild(el('li', { class: l.level <= lvl ? 'level-done' : '' },
      el('strong', {}, `${l.level}. ${l.label}`), ` — ${l.effect}`));
  }
  panel.appendChild(list);
  if (card.keySkills.length) {
    panel.appendChild(el('p', { class: 'room-skills' }, 'At the house now: ',
      ...card.keySkills.map(k => {
        const b = skillBreakdown(s, k);
        return el('span', { class: 'chip' }, `${skillName(k)} ${b.total} (${b.base} +${b.rooms} rooms +${b.instruments + b.books} kit)`);
      })));
  }
  panel.appendChild(el('p', { class: 'room-manned' }, lvl === 0 ? 'Not built.' : isManned(s, room) ? 'Manned.' : 'Unmanned: post a crew member with 4+ in a key skill for +1.'));
  if (card.sources.length) panel.appendChild(el('p', { class: 'sources' }, 'Sources: ', card.sources.join('; ')));
  panel.appendChild(button('Close', () => a.selectRoom(null), 'btn btn--small'));
  return panel;
}

function renderActivities(activities: Encounter[], a: ShipActions): HTMLElement {
  const panel = el('div', { class: 'panel activities' });
  panel.appendChild(el('h2', {}, 'Events and activities here'));
  if (!activities.length) panel.appendChild(el('p', { class: 'hint' }, 'Nothing presses today. Travel, send someone on an errand, or wait a day.'));
  for (const e of activities) {
    const b = el('button', { class: `activity activity--${e.historicalStatus}${e.repeatable ? '' : ' activity--event'}`, type: 'button' },
      el('span', { class: 'activity-title' }, e.title),
      el('span', { class: `hist-badge hist-${e.historicalStatus}` }, e.historicalStatus));
    b.addEventListener('click', () => a.startEncounter(e.id));
    panel.appendChild(b);
  }
  return panel;
}

export function roomsOverview(): string[] {
  return ROOM_CARDS.map(r => r.name);
}
