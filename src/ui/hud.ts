import type { GameState, Notice, Screen } from '../core/types.js';
import { el, button, help, renderBar } from './render.js';
import { glyph } from './glyphs.js';
import { fortuneLabel } from '../systems/barks.js';
import { fortuneScore } from '../systems/fortune.js';
import { atBase } from '../systems/skills.js';
import { getLocation, SECTORS } from '../data/locations/index.js';
import { sectorDay } from '../systems/time.js';

export interface HudActions {
  go: (screen: Screen) => void;
  save: () => void;
  wait: () => void;
}

function stat(id: string, icon: string, label: string, value: string, bar?: [number, number, string]): HTMLElement {
  const box = help(el('div', { class: `hud-stat hud-stat--${id}` }), `hud-${id}`);
  box.appendChild(glyph(icon, 18));
  box.appendChild(el('div', { class: 'hud-stat-body' },
    el('span', { class: 'hud-stat-label' }, label),
    el('span', { class: 'hud-stat-value' }, value),
    bar ? renderBar(bar[0], bar[1], `bar-fill ${bar[2]}`) : null,
  ));
  return box;
}

export function renderHud(s: GameState, a: HudActions): HTMLElement {
  const sector = SECTORS[s.sector];
  const r = s.resources;
  const hud = el('header', { class: 'hud' });

  hud.appendChild(el('div', { class: 'hud-title' },
    el('span', { class: 'hud-game' }, 'FTLDee'),
    el('span', { class: 'hud-sector' }, `${sector.name} · ${sector.dates} · day ${sectorDay(s)} of ${sector.days}`),
    el('span', { class: 'hud-where' }, `At ${getLocation(s.currentLocationId)?.name ?? s.currentLocationId}${atBase(s) ? ' (the house)' : ''}`),
  ));

  const stats = el('div', { class: 'hud-stats' });
  const promised = (s.pledges ?? []).reduce((n, p) => n + p.amount, 0);
  stats.appendChild(stat('money', 'coin', promised ? 'Money · promised' : 'Money', promised ? `£${r.money} · £${promised}` : `£${r.money}`));
  stats.appendChild(stat('days', 'road', 'Days left', String(r.time), [r.time, sector.days, 'bar-fill--time']));
  stats.appendChild(stat('secrecy', 'eye', 'Secrecy', String(r.secrecy), [r.secrecy, 100, r.secrecy <= 25 ? 'bar-fill--danger' : 'bar-fill--secrecy']));
  stats.appendChild(stat('focus', 'quill', 'Focus', String(r.focus), [r.focus, 100, 'bar-fill--focus']));
  stats.appendChild(stat('pressure', 'warning', 'Pressure', String(Math.round(s.totalPressure)), [s.totalPressure, 100, 'bar-fill--danger']));
  stats.appendChild(stat('fortune', 'crown', 'Fortune', fortuneLabel(s.fortune), [fortuneScore(s), 80, 'bar-fill--money']));
  hud.appendChild(stats);

  const nav = el('nav', { class: 'hud-nav' });
  const tabs: Array<[Screen, string, string, string]> = [
    ['household', 'house', 'House', 'nav-household'],
    ['upgrades', 'hearth', 'Upgrades', 'nav-upgrades'],
    ['library', 'library', 'Library', 'nav-library'],
    ['map', 'map', 'Map', 'nav-map'],
    ['market', 'coin', 'Market', 'nav-market'],
    ['network', 'person', 'Network', 'nav-network'],
    ['codex', 'book', 'Codex', 'nav-codex'],
  ];
  for (const [screen, icon, label, hid] of tabs) {
    const hasMarket = !!getLocation(s.currentLocationId)?.market;
    const reason = screen === 'market' && !hasMarket ? 'No market here. Travel to London or the Old Town.' : null;
    const b = button(el('span', {}, glyph(icon, 16), ` ${label}`), () => a.go(screen),
      `hud-tab${s.screen === screen ? ' hud-tab--on' : ''}`, reason);
    nav.appendChild(help(b, hid));
  }
  nav.appendChild(button('Wait a day', a.wait, 'hud-tab hud-tab--minor'));
  nav.appendChild(button('Save', a.save, 'hud-tab hud-tab--minor'));
  hud.appendChild(nav);
  return hud;
}

// Toasts for barks/errands; banners for fortune and weather. Consumed once.
export function renderNotices(notices: Notice[], dismiss: () => void): HTMLElement {
  const layer = el('div', { class: 'notice-layer' });
  const banners = notices.filter(n => n.kind === 'fortune' || n.kind === 'weather' || n.kind === 'system');
  const toasts = notices.filter(n => n.kind === 'bark' || n.kind === 'errand');

  if (banners.length) {
    const modal = el('div', { class: 'banner-stack' });
    for (const n of banners) {
      modal.appendChild(el('div', { class: `banner banner--${n.kind} banner--${n.tone ?? 'neutral'}` },
        el('div', { class: 'banner-kind' }, n.kind === 'weather' ? 'Political weather' : n.kind === 'fortune' ? 'Change of fortune' : 'The household'),
        n.title ? el('h2', {}, n.title) : null,
        el('p', {}, n.text),
      ));
    }
    modal.appendChild(button('Continue', dismiss, 'btn btn--primary'));
    layer.appendChild(el('div', { class: 'banner-backdrop' }, modal));
  }

  if (toasts.length) {
    const stack = el('div', { class: 'toast-stack' });
    for (const n of toasts.slice(-4)) {
      const who = n.speaker && n.speaker !== 'narrator' ? n.speaker.replace(/_/g, ' ') : '';
      stack.appendChild(el('div', { class: `toast toast--${n.tone ?? 'neutral'}` },
        n.title ? el('strong', {}, n.title) : null,
        who ? el('span', { class: 'toast-speaker' }, who) : null,
        el('span', {}, n.text),
      ));
    }
    layer.appendChild(stack);
  }
  return layer;
}
