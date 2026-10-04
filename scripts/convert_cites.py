"""Convert corpus (PDF-position) page citations in src/data to printed pages.

The DeeChunks database stores PDF page positions. Scholarly citation needs the
printed page. For each book we build a map PDF page -> printed page from the
'<!-- page: N -->' markers followed by a printed page number, and use the
nearest marker. Lines last written by commits that already used printed pages
(per `git blame`) are left alone.

Usage: python scripts/convert_cites.py [--apply]
"""
import collections
import re
import sqlite3
import subprocess
import sys
from pathlib import Path

DB = r'E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite'
ROOT = Path(__file__).resolve().parents[1]
PRINTED_COMMITS = ('Prologue 1555', 'Spy layer')  # these commits already cite printed pages

# citation key in game text -> substring of the corpus document title
BOOKS = {
    'Parry': 'Glyn Parry',
    'Harkness': 'Deborah E Harkness',
    'Whitby': 'Christopher Whitby',
    'Szőnyi': 'Gyorgy E Szonyi',
}
ARTICLE_OFFSETS = {'Clulee, Ambix 52.3, ': 196}  # printed = pdf + offset (article pagination)


def page_maps():
    con = sqlite3.connect(DB)
    maps = {}
    for key, title in BOOKS.items():
        doc = con.execute('select doc_id from documents where title like ?', (f'%{title}%',)).fetchone()[0]
        pairs = []
        for (text,) in con.execute('select content from chunks where doc_id=?', (doc,)):
            for m in re.finditer(r'<!-- page: (\d+) -->\s*(?:\S+\s+)?(\d{1,4})\b', text):
                n, p = int(m.group(1)), int(m.group(2))
                if 0 < n - p < 40:
                    pairs.append((n, n - p))
        # most common offset per pdf page, then nearest-marker lookup
        by_page = collections.defaultdict(collections.Counter)
        for n, off in pairs:
            by_page[n][off] += 1
        maps[key] = {n: c.most_common(1)[0][0] for n, c in by_page.items()}
    return maps


# Measured over the whole book (markers agreeing / markers found): Parry 161/176,
# Harkness 92/110, Szőnyi 336/344. Whitby drifts (plates), so it uses a local median.
CONSTANT_OFFSETS = {'Parry': 21, 'Harkness': 15, 'Szőnyi': 20}


def to_printed(key, pdf_page, maps):
    if key in CONSTANT_OFFSETS:
        return pdf_page - CONSTANT_OFFSETS[key]
    # Nearest page header that reads as a plausible printed number (offset 12–30);
    # ties go to the header at or before the cited page.
    m = {n: off for n, off in maps[key].items() if 12 <= off <= 30}
    if not m:
        return None
    nearest = min(m, key=lambda n: (abs(n - pdf_page), n > pdf_page))
    if abs(nearest - pdf_page) > 6:
        return None
    return pdf_page - m[nearest]


def blame_commits(path):
    out = subprocess.run(['git', 'blame', '--line-porcelain', str(path)], cwd=ROOT,
                         capture_output=True, text=True, encoding='utf-8').stdout
    summaries, current = [], None
    for line in out.splitlines():
        if line.startswith('summary '):
            current = line[8:]
        elif line.startswith('\t'):
            summaries.append(current or '')
    return summaries


CITE = re.compile(r"(Parry|Harkness|Whitby|Szőnyi) (\d+)(?:–(\d+))?((?:, \d+(?:–\d+)?)*)")
ART = re.compile(r"(Clulee, Ambix 52\.3, )(\d+)(?:–(\d+))?")


def convert_line(line, maps):
    def one(key, a, b):
        pa = to_printed(key, int(a), maps)
        pb = to_printed(key, int(b), maps) if b else None
        if pa is None or (b and pb is None):
            return None
        return f'{pa}–{pb}' if b and pb != pa else f'{pa}'

    def repl(m):
        key = m.group(1)
        first = one(key, m.group(2), m.group(3))
        if first is None:
            return m.group(0)
        rest = ''
        for part in re.findall(r', (\d+)(?:–(\d+))?', m.group(4) or ''):
            r = one(key, part[0], part[1])
            rest += f', {r}' if r else f', {part[0]}' + (f'–{part[1]}' if part[1] else '')
        return f'{key} {first}{rest}'

    line = CITE.sub(repl, line)
    line = ART.sub(lambda m: f"{m.group(1)}{int(m.group(2)) + 196}" + (f"–{int(m.group(3)) + 196}" if m.group(3) else ''), line)
    return line


def main(apply):
    maps = page_maps()
    files = [p for p in (ROOT / 'src' / 'data').rglob('*.ts') if 'biography' not in p.parts and 'copy' not in p.parts]
    changes = 0
    for path in files:
        lines = path.read_text(encoding='utf-8').split('\n')
        commits = blame_commits(path)
        new = []
        for i, line in enumerate(lines):
            commit = commits[i] if i < len(commits) else ''
            if commit.startswith(PRINTED_COMMITS) or not (CITE.search(line) or ART.search(line)):
                new.append(line)
                continue
            conv = convert_line(line, maps)
            if conv != line:
                changes += 1
                print(f'{path.relative_to(ROOT)}:{i + 1}\n  - {line.strip()[:160]}\n  + {conv.strip()[:160]}')
            new.append(conv)
        if apply:
            path.write_text('\n'.join(new), encoding='utf-8')
    print(f'{changes} lines {"changed" if apply else "would change"}')


if __name__ == '__main__':
    main('--apply' in sys.argv)
