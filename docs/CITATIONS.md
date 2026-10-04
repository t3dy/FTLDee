# Citation convention (game data and docs)

Decided 2026-10-03 after the independent read (`review/WRITING_READ1.md`) found that page numbers
taken from the DeeChunks database are **PDF page positions**, not printed pages.

**Printed pages** (converted by `scripts/convert_cites.py`, which measures each book's offset from
the `<!-- page: N -->` markers and the printed page numbers that follow them):

| Short cite | Book | PDF → printed |
|---|---|---|
| Parry | *The Arch-Conjuror of England* (2011) | −21 throughout (161 of 176 markers agree) |
| Harkness | *John Dee's Conversations with Angels* (1999) | −15 (92 of 110) |
| Szőnyi | *John Dee's Occultism* (2004) | −20 (336 of 344) |
| Whitby | *John Dee's Actions with Spirits* (1988) | drifts with inserted plates: −15 at the front of vol. I, −25 near its end; converted by the nearest page header |
| Clulee, Ambix 52.3 | Clulee's article on Dee's alchemy, *Ambix* 52.3 (2005) | article pagination, PDF + 196 |

**PDF pages of the DeeChunks copy** (too few page headers to convert reliably): Fenton (*Diaries*),
Fell Smith (1909), Sherman, Håkansson, Clucas. Research files in `research/espionage/` follow the
same rule and say so in their headers.

**Not converted:** `src/data/biography/` (written by another session; convention not recorded).

Lines written after this date must use printed pages for the five books above.
