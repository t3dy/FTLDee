// Line glyphs drawn on a 24x24 grid, stroked in currentColor. One per card.

const P: Record<string, string> = {
  library: 'M3 4h4v16H3zM8 6h3v14H8zM12 4h3v16h-3zM16.5 7l3-.8 3.4 13-3 .8z',
  quill: 'M20 3C12 5 7 11 5 19l-1 2M20 3c-1 6-6 10-12 11M9 15l-3-3',
  scroll: 'M6 4h11a2 2 0 0 1 0 4H7M6 4a2 2 0 0 0 0 4v10a2 2 0 0 0 2 2h11V8M10 12h6M10 15h6',
  letter: 'M3 6h18v12H3zM3 6l9 7 9-7',
  flask: 'M9 3h6M10 3v6L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-10V3M7 15h10',
  crystal: 'M12 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM9 8a3 3 0 0 1 3-2M6 21h12M8 21l1-4M16 21l-1-4',
  globe: 'M12 3a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM4 11h16M12 3c3 3 3 13 0 16M12 3c-3 3-3 13 0 16M8 21h8M12 19v2',
  hearth: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-5a3 3 0 0 1 6 0v5M12 16c-1-1-1-2 0-3 1 1 1 2 0 3',
  house: 'M3 11l9-7 9 7M5 9v12h14V9M10 21v-6h4v6',
  crown: 'M4 17l-1-10 5 4 4-7 4 7 5-4-1 10zM4 20h16',
  staff: 'M5 21L19 3M14 4l6 6M8 14l2 2M3 19l2 2',
  compass: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM15 9l-2 4-4 2 2-4z',
  chest: 'M3 9h18v11H3zM3 9a3 3 0 0 1 3-4h12a3 3 0 0 1 3 4M11 12h2v3h-2z',
  seal: 'M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  table: 'M3 9h18v3H3zM5 12v8M19 12v8M10 6h4M12 6V4',
  ring: 'M12 8a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM9 4h6l-3 4z',
  star: 'M12 3l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
  ship: 'M3 16l2 4h14l2-4zM12 4v12M12 4l7 9H12M12 6l-6 7h6',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
  key: 'M8 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 13l9-9M17 7l2 2M15 9l2 2',
  tree: 'M12 3v18M12 7l-5 4M12 7l5 4M12 12l-6 5M12 12l6 5M6 6a1 1 0 1 0 0 .1M18 6a1 1 0 1 0 0 .1',
  cross: 'M10 3h4v6h6v4h-6v8h-4v-8H4V9h6z',
  book: 'M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z',
  coin: 'M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM14 9h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3M12 7v10',
  tower: 'M6 21V8h12v13M6 8V4h2v2h2V4h4v2h2V4h2v4M10 21v-5h4v5M10 11h4',
  scales: 'M12 3v18M7 21h10M4 7h16M4 7l-2 6a3 3 0 0 0 6 0zM20 7l-2 6a3 3 0 0 0 6 0z',
  person: 'M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21a8 8 0 0 1 16 0',
  bridge: 'M2 10h20M4 10v8M20 10v8M4 18a8 6 0 0 1 16 0M9 10v3M15 10v3',
  road: 'M8 21l2-18M16 21l-2-18M12 5v2M12 10v2M12 15v3',
  'book-math': 'M4 4h16v16H4zM8 16l8-8M8 8h3M8 8v3',
  'book-astro': 'M4 4h16v16H4zM12 7l1.3 3H16l-2 2 .8 3L12 13.5 9.2 15l.8-3-2-2h2.7z',
  'book-occult': 'M4 4h16v16H4zM12 7v10M8 10h8M9 15l3-3 3 3',
  'book-cipher': 'M4 4h16v16H4zM8 8h2v2H8zM14 8h2v2h-2zM11 11h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z',
  'book-alchemy': 'M4 4h16v16H4zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM12 13v4M10 15h4',
  'book-history': 'M4 4h16v16H4zM8 15l2-6 2 4 2-3 2 5',
  'book-map': 'M4 4h16v16H4zM7 9l3-1 4 1 3-1v7l-3 1-4-1-3 1z',
  'book-kabbalah': 'M4 4h16v16H4zM12 6v12M9 8a1 1 0 1 0 0 .1M15 8a1 1 0 1 0 0 .1M9 13a1 1 0 1 0 0 .1M15 13a1 1 0 1 0 0 .1',
  'book-own': 'M4 4h16v16H4zM12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM8 9a4 4 0 0 0 8 0M12 13v4M10 15h4',
  'book-scroll': 'M4 4h16v16H4zM8 8h8M8 11h8M8 14h5',
  warning: 'M12 3l10 18H2zM12 10v5M12 17v1',
};

const NS = 'http://www.w3.org/2000/svg';

export function glyph(name: string, size = 20, cls = 'glyph'): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('class', cls);
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', P[name] ?? P.book);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '1.6');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);
  return svg;
}

export function glyphPathData(name: string): string {
  return P[name] ?? P.book;
}
