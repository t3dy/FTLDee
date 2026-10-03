// Shared rendering utilities

import { helpText } from '../systems/barks.js';

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (string | Node | null | undefined | false)[]
): HTMLElementTagNameMap[K] {
  const elem = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') elem.className = v;
    else elem.setAttribute(k, v);
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    elem.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return elem;
}

export const SVG_NS = 'http://www.w3.org/2000/svg';

export function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
  ...children: (Node | string)[]
): SVGElementTagNameMap[K] {
  const e = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  for (const c of children) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  return e;
}

export function button(label: string | Node, onClick: () => void, cls = 'btn', disabledReason?: string | null): HTMLButtonElement {
  const b = el('button', { class: cls, type: 'button' }, label);
  if (disabledReason) {
    b.disabled = true;
    b.title = disabledReason;
  } else {
    b.addEventListener('click', onClick);
  }
  return b;
}

// Attach the copy module's help text (docs/writing/INTERFACE_HELP.md) as a tooltip.
export function help<T extends Element>(node: T, id: string): T {
  const t = helpText(id);
  if (t) node.setAttribute('title', t);
  node.setAttribute('data-help', id);
  return node;
}

export function renderBar(value: number, max = 100, cls = 'bar-fill'): HTMLElement {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return el('div', { class: 'bar-container' }, el('div', { class: cls, style: `width:${pct}%` }));
}

export function pips(level: number, max: number, cap?: number): HTMLElement {
  const wrap = el('span', { class: 'pips' });
  for (let i = 1; i <= max; i++) {
    const cls = i <= level ? 'pip pip--on' : cap !== undefined && i > cap ? 'pip pip--capped' : 'pip';
    wrap.appendChild(el('span', { class: cls }));
  }
  return wrap;
}

export function factionLabel(id: string): string {
  const labels: Record<string, string> = {
    elizabeth: 'Elizabeth I', burghley: 'Burghley', leicester: 'Leicester', walsingham: 'Walsingham',
    religiousAuth: 'Religious Auth.', scholarNetwork: 'Scholars', merchantNetwork: 'Merchants', continentalCourts: 'Continental',
  };
  return labels[id] ?? id;
}

export function historicalBadge(status: string): HTMLElement {
  return el('span', { class: `hist-badge hist-${status}` }, status.toUpperCase());
}

export function clearAndRender(container: HTMLElement, ...nodes: Node[]): void {
  container.innerHTML = '';
  for (const node of nodes) container.appendChild(node);
}
