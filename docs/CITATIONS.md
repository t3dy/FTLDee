# Citation convention (game data, docs and biography entries)

Decided 2026-10-03 after the independent read (`review/WRITING_READ1.md`) found that page numbers
taken from the DeeChunks database are **PDF page positions**, not printed pages.

**Printed pages** (converted by `scripts/convert_cites.py`, which measures each book's offset from
the `<!-- page: N -->` markers and the printed page numbers that follow them):

| Short cite | Book | PDF → printed |
|---|---|---|
| Parry | *The Arch-Conjuror of England* (2011) | −21 throughout (161 of 176 markers agree) |
| Harkness | *John Dee's Conversations with Angels* (1999) | −15 (92 of 110) |
| Szőnyi | *John Dee's Occultism* (2004) | −20 (336 of 344) |
| Whitby | *John Dee's Actions with Spirits* (1988) | drifts with inserted plates: −15 at the front of vol. I, −25 near its end; convert by the nearest page header |
| Clulee, Ambix 52.3 | Clulee's article on Dee's alchemy, *Ambix* 52.3 (2005) | article pagination, PDF + 196 |

**PDF pages of the DeeChunks copy** (too few page headers to convert reliably): Fell Smith (1909),
Sherman, Håkansson, Clucas. **Fenton** (*Diaries*): PDF pages by default; cites in
`research/alchemy/` and `src/data/books/ripley.ts` marked "(printed)" were checked against printed
pages by the independent reader. Research files in `research/espionage/` say which in their headers.

Lines written after this date must use printed pages for the five books in the table.

## Standing rule for biography entries (`src/data/biography/`)

Added by the biography session, 2026-10-04. Before marking an entry verified:
- Sources must be **printed page numbers**, not PDF positions.
- Confirm the text matches by opening the PDF.
- Include primary sources when available.
- Multiple sources should agree on basic facts.

This keeps the biography citable by scholars and verifiable by anyone with the books.
