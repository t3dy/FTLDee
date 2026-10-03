"""Extract key PDFs page by page into page-marked text files (read-only on sources).

Each output page block is headed  === pdf N | printed P ===  where P is a guess at the
printed page number from a bare number at the top or bottom of the page ('?' if none).
Usage: python extract_pages.py OUTDIR
"""
import os, re, sys, glob
import fitz

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
R = r"E:\pdf\alchemy\Jennifer Rampling"
D = r"E:\pdf\renaissance magic\Dee"
SRC = {
    "rampling_experimental_fire": [os.path.join(R, x) for x in os.listdir(R) if x.startswith("[Synthesis]")],
    "rampling_shps2012_dee_alchemists": glob.glob(R + r"\*John Dee and the alchemists*.pdf"),
    "rampling_shps2012_dee_sciences": glob.glob(R + r"\*John Dee and the sciences*.pdf"),
    "rampling_esm2012_transmission": glob.glob(R + r"\*Transmission and Transmutation*.pdf"),
    "rampling_esm2012_fringes_intro": glob.glob(R + r"\*Introduction Alchemy on the Fringes*.pdf"),
    "rampling_ambix2008_canon": glob.glob(R + r"\*Establishing the Canon*.pdf"),
    "rampling_ambix2010_catalogue": glob.glob(R + r"\*Catalogue of the Ripley Corpus*.pdf"),
    "rampling_osiris2014_sericon": glob.glob(R + r"\*Transmuting Sericon*.pdf"),
    "rampling_bjhs2020_reading": glob.glob(R + r"\*Reading alchemically*.pdf"),
    "rampling_ambix2016_englishing": glob.glob(R + r"\*Englishing*.pdf"),
    "rampling_esm2013_cosmos": glob.glob(R + r"\*Depicting the Medieval*.pdf"),
    "rampling_nature2012_realms": glob.glob(R + r"\*Realms of gold*.pdf"),
    "review_metascience2021_rampling_reply": glob.glob(R + r"\*Alchemical reading in action*.pdf"),
    "review_metascience2021_clucas": glob.glob(R + r"\*Playing with (experimental)*.pdf"),
    "review_metascience2021_newman": glob.glob(R + r"\*Rampling and the Ripley Corpus*.pdf"),
    "clulee_ambix2005_monas_thread": glob.glob(D + r"\*Clulee, Nicholas H. - The Monas*.pdf"),
    "forshaw_ambix2005_reception": glob.glob(D + r"\*Forshaw*.pdf"),
    "clucas_ambix2017_silvius": glob.glob(D + r"\*Royal Typographer*.pdf"),
    "clucas_aries2010_pythagorean": glob.glob(D + r"\*Pythagorean Number*.pdf"),
    "parry_arch_conjuror": glob.glob(D + r"\Glyn Parry*.pdf"),
    "harkness_conversations": glob.glob(D + r"\Deborah E Harkness*.pdf"),
    "clulee_natural_philosophy": glob.glob(D + r"\Nicholas Clulee*.pdf"),
    "clucas_ed_2006": glob.glob(D + r"\Stephen Clucas (Editor)*.pdf"),
}

num = re.compile(r"^\s*(\d{1,4})\s*$")
for key, paths in SRC.items():
    if not paths:
        print("MISSING", key); continue
    p = paths[0]
    try:
        doc = fitz.open(p)
    except Exception as e:
        print("FAIL", key, e); continue
    chars = 0
    with open(os.path.join(OUT, key + ".txt"), "w", encoding="utf-8") as f:
        f.write(f"SOURCE: {p}\n")
        for i, page in enumerate(doc, 1):
            t = page.get_text()
            chars += len(t)
            lines = [l for l in t.splitlines() if l.strip()]
            printed = "?"
            for l in lines[:3] + lines[-3:]:
                m = num.match(l)
                if m:
                    printed = m.group(1); break
            f.write(f"\n=== pdf {i} | printed {printed} ===\n{t}")
    print(f"{key}: {len(doc)} pages, {chars} chars")
