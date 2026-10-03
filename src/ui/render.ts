// Shared rendering utilities

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (string | Node)[]
): HTMLElementTagNameMap[K] {
  const elem = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') elem.className = v;
    else elem.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') elem.appendChild(document.createTextNode(child));
    else elem.appendChild(child);
  }
  return elem;
}

export function renderBar(value: number, max: number = 100, cls: string = 'bar-fill'): HTMLElement {
  const pct = Math.round((value / max) * 100);
  const container = el('div', { class: 'bar-container' });
  const fill = el('div', { class: cls, style: `width:${pct}%` });
  container.appendChild(fill);
  return container;
}

export function factionLabel(id: string): string {
  const labels: Record<string, string> = {
    elizabeth: 'Elizabeth I',
    burghley: 'Lord Burghley',
    leicester: 'Earl of Leicester',
    walsingham: 'Walsingham',
    religiousAuth: 'Religious Authorities',
    scholarNetwork: 'Scholar Network',
    merchantNetwork: 'Merchant Network',
    continentalCourts: 'Continental Courts',
  };
  return labels[id] ?? id;
}

export function historicalBadge(status: string): HTMLElement {
  const labels: Record<string, string> = {
    documented: 'DOCUMENTED',
    plausible: 'PLAUSIBLE',
    contested: 'CONTESTED',
    counterfactual: 'COUNTERFACTUAL',
    anachronistic: 'ANACHRONISTIC',
  };
  return el('span', { class: `hist-badge hist-${status}` }, labels[status] ?? status);
}

export function clearAndRender(container: HTMLElement, ...nodes: Node[]): void {
  container.innerHTML = '';
  for (const node of nodes) container.appendChild(node);
}
