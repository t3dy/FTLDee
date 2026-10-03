import type { GameState, RoomId } from '../core/types.js';
import { el, button, help } from './render.js';
import { glyph } from './glyphs.js';
import { ROOM_CARDS } from '../data/cards/rooms.js';
import { HOUSE_TIERS } from '../data/cards/house.js';
import { houseUpgradeBlocker, maxRoomLevel, roomInLayout, roomUpgradeBlocker, currentTier } from '../systems/household.js';
import { requirementChecks } from '../systems/requirements.js';
import { fortuneLabel } from '../systems/barks.js';

export interface UpgradeActions {
  upgradeRoom: (room: RoomId) => void;
  upgradeHouse: () => void;
}

export function renderUpgrades(s: GameState, a: UpgradeActions): HTMLElement {
  const wrap = el('div', { class: 'upgrades-screen' });
  wrap.appendChild(el('h1', {}, 'Upgrades'));
  wrap.appendChild(el('p', { class: 'lede' },
    'Spend money and days to build rooms. Level 2 adds +1 to a room\'s key skills at the house, level 3 adds +2. How far a room can go depends on the house itself.'));
  wrap.appendChild(renderHouseTiers(s, a));

  const grid = el('div', { class: 'upgrade-grid' });
  for (const card of ROOM_CARDS) {
    const present = roomInLayout(s, card.id);
    const lvl = s.household.rooms[card.id];
    const cap = maxRoomLevel(s, card.id);
    const col = el('div', { class: `upgrade-col${present ? '' : ' upgrade-col--absent'}` });
    col.appendChild(el('div', { class: 'upgrade-head' }, glyph(card.glyph, 24), el('strong', {}, card.name)));

    const bars = el('div', { class: 'upgrade-bars' });
    for (let i = 3; i >= 1; i--) {
      const spec = card.levels[i - 1];
      bars.appendChild(el('div', {
        class: `upgrade-bar${i <= lvl ? ' upgrade-bar--on' : ''}${i > cap ? ' upgrade-bar--capped' : ''}${i === lvl + 1 ? ' upgrade-bar--next' : ''}`,
        title: `${spec.label}: ${spec.effect}`,
      }, el('span', {}, spec.label)));
    }
    col.appendChild(help(bars, 'room-pips'));

    const next = card.levels.find(l => l.level === lvl + 1);
    if (!present) {
      col.appendChild(el('p', { class: 'upgrade-note' }, `${s.household.name} has no room for this.`));
    } else if (next) {
      col.appendChild(el('p', { class: 'upgrade-next' }, `Next: ${next.effect}`));
      col.appendChild(el('p', { class: 'upgrade-cost' }, `£${next.cost} · ${next.days} days`));
      if (next.requires) {
        const chips = el('div', { class: 'chips' });
        for (const c of requirementChecks(s, next.requires)) chips.appendChild(el('span', { class: c.met ? 'chip chip--met' : 'chip chip--unmet' }, c.label));
        col.appendChild(chips);
      }
      const why = roomUpgradeBlocker(s, card.id);
      col.appendChild(button(`Build ${next.label}`, () => a.upgradeRoom(card.id), 'btn btn--upgrade', why));
      if (why) col.appendChild(el('p', { class: 'upgrade-why' }, why));
    } else {
      col.appendChild(el('p', { class: 'upgrade-note' }, 'Fully built.'));
    }
    grid.appendChild(col);
  }
  wrap.appendChild(grid);
  return wrap;
}

function renderHouseTiers(s: GameState, a: UpgradeActions): HTMLElement {
  const panel = help(el('div', { class: 'panel house-tiers' }), 'house-tier-panel');
  panel.appendChild(el('h2', {}, 'The house'));
  const row = el('div', { class: 'tier-row' });
  for (const t of HOUSE_TIERS.filter(h => h.base === s.household.baseId)) {
    const cur = t.tier === s.household.tier;
    const done = t.tier < s.household.tier;
    const card = el('div', { class: `tier-card${cur ? ' tier-card--current' : ''}${done ? ' tier-card--done' : ''} tier-card--${t.historicalStatus}` },
      el('div', { class: 'card-head' }, glyph(t.glyph, 22), el('strong', {}, `Tier ${t.tier}: ${t.name}`),
        el('span', { class: `hist-badge hist-${t.historicalStatus}` }, t.historicalStatus)),
      el('p', {}, t.summary),
      el('p', { class: 'tier-meta' }, `Rooms to level ${t.maxRoomLevel} · +${t.extraStations} station${t.extraStations === 1 ? '' : 's'} per room${t.stipendPerTenDays ? ` · £${t.stipendPerTenDays} stipend every 10 days` : ''}`),
    );
    if (t.tier === s.household.tier + 1) {
      card.appendChild(el('p', { class: 'tier-meta' }, `Needs fortune ${fortuneLabel(t.minFortune)} (now ${fortuneLabel(s.fortune)}) · £${t.cost} · ${t.days} days`));
      if (t.requires) {
        const chips = el('div', { class: 'chips' });
        for (const c of requirementChecks(s, t.requires)) chips.appendChild(el('span', { class: c.met ? 'chip chip--met' : 'chip chip--unmet' }, c.label));
        card.appendChild(chips);
      }
      const why = houseUpgradeBlocker(s);
      card.appendChild(button('Enlarge the house', a.upgradeHouse, 'btn btn--upgrade', why));
      if (why) card.appendChild(el('p', { class: 'upgrade-why' }, why));
    }
    if (t.flavor) card.appendChild(el('p', { class: 'flavor' }, t.flavor));
    row.appendChild(card);
  }
  panel.appendChild(row);
  panel.appendChild(el('p', { class: 'hint' }, `Current: ${currentTier(s).name}. Fortune is your money plus your three best patrons; a change of rank is announced.`));
  return panel;
}
