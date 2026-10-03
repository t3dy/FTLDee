"""Keyword-in-context over the page-marked extracts made by extract_pages.py.

usage: python kwic.py PAGESDIR docname regex [width] [offset]
  offset: printed = pdf - offset (for books whose front matter shifts numbering); if omitted,
  the detected printed number is shown.
"""
import re, sys, os
d, name, pat = sys.argv[1], sys.argv[2], sys.argv[3]
w = int(sys.argv[4]) if len(sys.argv) > 4 else 300
off = int(sys.argv[5]) if len(sys.argv) > 5 else None
t = open(os.path.join(d, name + ".txt"), encoding="utf-8").read()
parts = re.split(r"\n=== pdf (\d+) \| printed (\S+) ===\n", t)
rx = re.compile(pat, re.I)
for i in range(1, len(parts), 3):
    pdf, pr, body = int(parts[i]), parts[i + 1], re.sub(r"\s+", " ", parts[i + 2])
    label = f"p.{pdf - off}" if off is not None else f"pdf{pdf}/pr{pr}"
    for m in rx.finditer(body):
        s, e = max(0, m.start() - w), min(len(body), m.end() + w)
        print(f"[{label}] ...{body[s:e]}...\n")
