"""Full-text author search over E:\\pdf (all subfolders) and C:\\Dev\\AUDIOBOOKMAKER* text files.

Finds documents BY or CITING Rampling (and Parry, Clulee, Clucas) by searching the text,
not the filename. Read-only on sources. PDF text is cached (one .txt per PDF, keyed by
path+size+mtime) so a second pass is cheap.

usage: python corpus_author_search.py CACHE_DIR OUT_TSV [workers]

Classification per file and author:
  authored  - name in the byline zone (first 2 pages / first 4000 chars) or as a running
              head/foot (name in the top/bottom 3 lines of >= 3 pages, or >= 30% of pages)
  cites     - any other hit
Also reported: total hits, hits in the last 15% of pages (bibliography zone), page count,
and whether the PDF had no text layer (scanned; not searchable without OCR).
"""
import os, re, sys, hashlib, csv, traceback
from multiprocessing import Pool

ROOTS_ALL = [r"E:\pdf"]
ROOTS_TEXT = [r"C:\Dev\AUDIOBOOKMAKER", r"C:\Dev\AUDIOBOOKMAKERSCHOLARLY", r"C:\Dev\AUDIOBOOKMAKERV2"]
SKIP_DIRS = {"node_modules", ".git", "__pycache__", ".venv", "venv", "dist", "build"}
AUTHORS = {
    "Rampling": re.compile(r"\bRampling\b"),
    "Parry": re.compile(r"\bGlyn\s+Parry\b|\bParry,\s*G(lyn|\.)|\bParry\b(?=[^\n]{0,60}(Arch[-\s]?Conjuror|Dee))"),
    "Clulee": re.compile(r"\bClulee\b"),
    "Clucas": re.compile(r"\bClucas\b"),
}
MAX_PAGES = 2000


def cache_name(cache, path):
    st = os.stat(path)
    h = hashlib.sha1(f"{path}|{st.st_size}|{int(st.st_mtime)}".encode("utf-8", "replace")).hexdigest()
    return os.path.join(cache, h + ".txt")


def pdf_pages(path, cache):
    cp = cache_name(cache, path)
    if os.path.exists(cp):
        with open(cp, encoding="utf-8") as f:
            return f.read().split("\f")
    import fitz
    doc = fitz.open(path)
    pages = []
    for i, page in enumerate(doc):
        if i >= MAX_PAGES:
            break
        pages.append(page.get_text())
    with open(cp, "w", encoding="utf-8") as f:
        f.write("\f".join(pages))
    return pages


def text_pages(path):
    with open(path, encoding="utf-8", errors="replace") as f:
        t = f.read()
    # split plain text into pseudo-pages of ~3000 chars so the zones still mean something
    return [t[i:i + 3000] for i in range(0, max(len(t), 1), 3000)]


def classify(pages, rx):
    total = 0
    head_pages = 0
    n = len(pages)
    bib_start = int(n * 0.85)
    bib = 0
    byline = False
    first = "".join(pages[:2])[:4000]
    if rx.search(first):
        byline = True
    for i, p in enumerate(pages):
        hits = len(rx.findall(p))
        if not hits:
            continue
        total += hits
        if i >= bib_start:
            bib += hits
        lines = [l for l in p.splitlines() if l.strip()]
        edge = "\n".join(lines[:3] + lines[-3:])
        if rx.search(edge):
            head_pages += 1
    running = head_pages >= 3 or (n >= 4 and head_pages / n >= 0.3)
    return total, byline, running, bib


def work(args):
    path, kind, cache = args
    try:
        if kind == "pdf":
            pages = pdf_pages(path, cache)
        else:
            pages = text_pages(path)
        chars = sum(len(p) for p in pages)
        rows = []
        for a, rx in AUTHORS.items():
            total, byline, running, bib = classify(pages, rx)
            if total:
                status = "authored" if (byline or running) else "cites"
                rows.append([a, status, total, int(byline), int(running), bib, len(pages), path])
        notext = int(kind == "pdf" and chars < 200 * max(1, min(len(pages), 5)))
        return rows, (path if notext else None), None
    except Exception as e:
        return [], None, f"{path}\t{type(e).__name__}: {e}"


def files():
    for root in ROOTS_ALL:
        for r, d, fs in os.walk(root):
            d[:] = [x for x in d if x not in SKIP_DIRS]
            for x in fs:
                e = os.path.splitext(x)[1].lower()
                if e == ".pdf":
                    yield os.path.join(r, x), "pdf"
                elif e in (".txt", ".md"):
                    yield os.path.join(r, x), "text"
    for root in ROOTS_TEXT:
        for r, d, fs in os.walk(root):
            d[:] = [x for x in d if x not in SKIP_DIRS]
            for x in fs:
                if os.path.splitext(x)[1].lower() in (".txt", ".md"):
                    yield os.path.join(r, x), "text"


if __name__ == "__main__":
    cache, out = sys.argv[1], sys.argv[2]
    workers = int(sys.argv[3]) if len(sys.argv) > 3 else 6
    os.makedirs(cache, exist_ok=True)
    jobs = [(p, k, cache) for p, k in files()]
    print(f"{len(jobs)} files ({sum(1 for j in jobs if j[1]=='pdf')} PDFs)", flush=True)
    notext, errors, allrows = [], [], []
    with Pool(workers) as pool:
        for i, (rows, nt, err) in enumerate(pool.imap_unordered(work, jobs, chunksize=4)):
            allrows.extend(rows)
            if nt: notext.append(nt)
            if err: errors.append(err)
            if i % 500 == 0:
                print(f"{i}/{len(jobs)}", flush=True)
    with open(out, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, delimiter="\t")
        w.writerow(["author", "status", "hits", "byline", "running_head", "bib_zone_hits", "pages", "path"])
        for r in sorted(allrows, key=lambda r: (r[0], r[1], -r[2])):
            w.writerow(r)
    with open(out + ".notext.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(sorted(notext)))
    with open(out + ".errors.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(errors))
    print(f"done: {len(allrows)} hit rows, {len(notext)} PDFs without text layer, {len(errors)} errors")
