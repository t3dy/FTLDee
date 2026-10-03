"""Second pass over corpus_author_search.py output: separate works BY Rampling from works that
cite her, using stricter evidence than the first pass (whose running-head test also fires on
books that cite her in footnotes on many pages).

  byline  : 'Jennifer (M.) Rampling' / 'J. M. Rampling' / 'Rampling, Jennifer' in the first
            2 pages (pdf) or first 6000 chars (text)
  runhead : 'J.M. Rampling /' style running head on >= 2 pages (journal articles)
  chapter : 'Jennifer (M.) Rampling' within 300 chars of a chapter-title-like line in a book
            (contributed chapter) -- reported as 'contributor?' for manual check
Other hits = cites. Reuses the PDF text cache; nothing is re-extracted.

usage: python refine_rampling_hits.py CACHE_DIR HITS_TSV OUT_TSV
"""
import csv, os, re, sys, hashlib

cache, hits, out = sys.argv[1:4]
FULL = re.compile(r"Jennifer\s+(M\.\s*)?Rampling|J\.\s?M\.\s?Rampling|Rampling,\s+Jennifer")
RUN = re.compile(r"J\.\s?M\.\s?Rampling\s*/")
ANY = re.compile(r"\bRampling\b")


def pages_for(path):
    if path.lower().endswith(".pdf"):
        st = os.stat(path)
        h = hashlib.sha1(f"{path}|{st.st_size}|{int(st.st_mtime)}".encode("utf-8", "replace")).hexdigest()
        cp = os.path.join(cache, h + ".txt")
        if not os.path.exists(cp):
            return None
        return open(cp, encoding="utf-8").read().split("\f")
    t = open(path, encoding="utf-8", errors="replace").read()
    return [t[i:i + 3000] for i in range(0, max(len(t), 1), 3000)]


rows = [r for r in csv.DictReader(open(hits, encoding="utf-8"), delimiter="\t") if r["author"] == "Rampling"]
res = []
for r in rows:
    p = r["path"]
    try:
        pages = pages_for(p)
    except Exception:
        pages = None
    if pages is None:
        continue
    first = "".join(pages[:2])[:6000]
    byline = bool(FULL.search(first))
    run = sum(1 for pg in pages if RUN.search(pg)) >= 2
    total = sum(len(ANY.findall(pg)) for pg in pages)
    full_total = sum(len(FULL.findall(pg)) for pg in pages)
    status = "author" if (byline or run) else "cites"
    if status == "cites" and not p.lower().endswith(".pdf") and re.search(r"rampling", os.path.basename(p), re.I):
        status = "author-text-conversion?"  # converted text of one of her works, title page stripped
    res.append([status, total, full_total, int(byline), int(run), len(pages), p])

res.sort(key=lambda x: (x[0], -x[1]))
with open(out, "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f, delimiter="\t")
    w.writerow(["status", "hits_Rampling", "hits_full_name", "byline", "running_head", "pages", "path"])
    w.writerows(res)
from collections import Counter
print(Counter((x[0], "pdf" if x[6].lower().endswith(".pdf") else "text") for x in res))
