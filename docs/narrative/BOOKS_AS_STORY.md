# Books as story

Written 2026-10-03 against `src/data/books/index.ts`, `src/data/locations/index.ts` (market
pools), `src/data/cards/instruments.ts` and `docs/SYSTEMS_V2.md` §5. **[record]** = sourced;
**[inference]** = mine.

FTL's weapons are interchangeable and you lose nothing when you swap one. Dee's books are the
opposite in every respect the record lets us check: they were bought on credit, annotated,
lent, catalogued, pledged, left, plundered, burned and sold. The game currently models
buying, carrying and selling. This report is about the other verbs.

---

## 1. The market

**As built.** Paul's Churchyard and the Old Town each roll 4 books and 2 instruments from a
pool on arrival; stock refreshes after 20 days; buy at value, sell at half (full with Library
3); forbidden books cost 5 Secrecy; a missing prerequisite tag blocks the purchase.

**What works.** A rolling stock with a refresh window is honest to the Frankfurt-fed London
trade (the old `london_booksellers` encounter's "new stock from the Frankfurt Book Fair").
Forbidden-at-a-cost is Parry in one line.

**What it says that it should not.**
- **The Book of Soyga is in the London pool** (`LONDON_BOOKS` includes `book_soyga`). Dee's
  copy's provenance is unknown. A market roll makes the first Ottoman signal a matter of luck
  at a bookstall, and suggests he bought it over a counter. [inference] Move Soyga to a fixed
  acquisition: already on the shelf at start (it is first mentioned in Dee's diary on
  17 January 1582, and on 10 March 1582 he asked the angels "ys my boke, of Soyga, of any
  excellency?" — Harkness 58–60), or arriving by an encounter. If it starts on the shelf, the Ottoman signal
  becomes *asking about it*, which is the documented act.
- **Prerequisites block buying.** Historically anyone with money could buy Copernicus; the
  barrier was reading it. [inference] Let the player buy a book they cannot use, and show it
  on the shelf as **Unread — needs: celestial mechanics**. That is the "locked chest" of
  `research/MECHANICS_FROM_BIOGRAPHY.md` §III and it teaches the BOOK vs KNOWLEDGE distinction
  in `CLAUDE.md` far better than a greyed buy button.
- **Dee paid on account.** He still owed his London bookseller Andreas Fremonsheim £63 when
  he left (Parry 191–193), and Fromond refused to pay the bookseller's debt for years
  (Fenton 341–342). A small "on account" option at Paul's Churchyard (buy now, debt
  recorded, the bookseller's goodwill falls if unpaid) would make the library's cost visible.

---

## 2. The satchel

**As built.** 3 slots, +2 with the iron-bound chest; pocket and portable books cost 1, large
2, fixed cannot travel. Packed only at the base.

**What it says.** That Dee's power was local. Correct, and legible from the first trip: the
player watches blue options go grey when they leave Mortlake. This is the strongest mapping
in the whole FTL layer.

**What to add.**
- **Large books in the satchel should slow travel**, not just take two slots. A 2-slot Ortelius
  is heavy (`notes: 'Heavy.'`). +1 travel day for any route while carrying a large book makes
  the weight felt rather than counted. [inference]
- **Forbidden books in the satchel are a risk on the road.** At nodes with `religiousAuth`
  presence (Windsor, Oxford, the Lesser Town, the nuncio), a forbidden book in the satchel
  costs Secrecy on arrival. At home they are safe on the shelf. This makes "leave it at home"
  a real decision and it is how the Steganographia's danger would actually work.

---

## 3. Dee's own books

`dee_brytanici` and `dee_mysteriorum` are "written, not bought", value 0. Good: they are the
one class of book the player cannot shop for. Proposals:

- **Writing them should take the Study.** Creating a Dee book needs Study ≥1 and Focus.
  Today the Study only restores Focus.
- **The action records grow.** `dee_mysteriorum` should not be a single item. Each completed
  scrying action adds a "leaf"; the book's value to the angelic path grows with it; and the
  record of everything said becomes something that can be shown, burned or seized. [record]
  Dee showed "all his records of angelic dealings" to Curtius on 14 September 1584, "not the
  wisest thing to do" (Whitby 44–46), and the fourth book to the Spanish ambassador at dinner
  on 25 September. Showing the records is an operation: it opens a door (Continental Courts)
  and spends Secrecy.

---

## 4. Leaving the library (the emigration)

**As built.** Only satchel books and instruments marked `travels` cross; the rest stay at
Mortlake; news of the spoiling reaches Prague later; per Håkansson 31–33 the plunder was by
employees and friends.

**The record is richer than "left behind".** [record]
- Before sailing Dee **borrowed £400 from Nicholas Fromond**, his brother-in-law, secured on
  the house, its four gardens and "goods and chattels", including his remaining books
  (Parry 191–193).
- He had **Fremonsheim catalogue the library**; the printed-book and manuscript catalogues are
  dated **6 September 1583** (Whitby 1031–1034; Parry 191–193).
- He committed the house to Fromond's keeping; **Fromond sold goods in his care** and failed to
  collect rents (Whitby 44–46, citing the *Compendious Rehearsal* 31).
- The damage was done by **employees and friends who thought he would not return**; the mob
  story was traced by Roberts and Watson to Thomas Smith, Dee's first biographer, and has been
  repeated since (Håkansson 31–33; Sherman 44–45). Whitby 44–46 still repeats the mob version,
  so do not cite Whitby for "not a mob".

**Proposed departure sequence** (all on the Continental Question's "depart" branch):

1. **"The catalogue."** A one-screen list of every book not in the satchel, headed with the
   date 6 September 1583. This replaces Library level 3 "The 1583 catalogue" as a building
   step. The player reads, in their own library's titles, exactly what they are leaving.
2. **"The loan."** Dee receives £400 (scaled to the economy) and the left books are marked
   **Pledged — Fromond**. The money is the travelling fund that makes Prague possible. The
   player has just mortgaged the library to pay for the road.
3. **"The keeper."** One choice: leave Mortlake in Fromond's keeping (historical, default) or
   with a named servant. [inference] Either way some pledged books are lost; the keeper only
   changes which. Do not offer a "lock it all safely" option; the record has none.

On the road (en route, not in Prague): [record] Kelley "sees" the Mortlake library violated
during the 1583 journey; Roberts and Watson quote the entry and say Kelley was "either
genuinely clairvoyant or had heard rumours from England" (Fenton 126–128 n.6). Use exactly
that ambiguity. The event text should say the vision came through Kelley, that Dee could not
know if it was true, and that when he came home in 1589 he found books and instruments gone.
The losses (which pledged books are struck from the list) resolve at the end of the sector or
in the epilogue, not in Prague: Dee only learned the extent on his return.

The `mercator_globes` card already says "listed among the losses of 1583" (Whitby 67–70).
That is the right kind of detail: the player's own starting instrument becomes an entry on the
list.

---

## 5. Burning books (Prague, 1586)

**Record.** On 10 April 1586 a voice in the action commanded that the books lying on the
table go into a small black bag and into the furnace; Kelley and Pucci "thrust the little bag
into the fire" — 28 books of the actions. On 29–30 April the books were found again under an
almond tree in Carpio's vineyard (Fenton 200–204; Fell Smith 88–89). The game does not
adjudicate whether this was staged (DeeVisualNovel `BIOGRAPHY.md` Act VI).

**What the game should do.** This is the one event where the satchel model and the record
meet perfectly: the books at risk are the ones Dee made, not bought. The event takes
`dee_mysteriorum` (and any Dee-written book in the satchel) and offers two choices: obey
(the leaves are gone; the angels' favour rises) or refuse (keep them; the angels fall silent
for a time). If the player obeyed, a later event three weeks on returns them, with the
narration noting that the game does not say how. The player learns, by losing and regaining
their own work, what the angels could ask of Dee. [record for the event; inference for the
choice structure, which the record does not offer: Dee obeyed.]

Tag the "refuse" branch COUNTERFACTUAL.

---

## 6. Annotation (Sherman's working library)

[record] Sherman's subject is reading: Dee's annotations show books used as tools for
counsel (Sherman, *Politics of Reading and Writing*). [inference] A light way to say it: a
book used in a successful blue option gains a small "annotated" mark; annotated books sell for
more and give their bonus at half strength even when not packed, because the notes travel in
Dee's head. Legibility is moderate; it is the lowest priority idea here.

---

## 7. Card-level notes

| Book | Note |
|---|---|
| `book_soyga` | Remove from `LONDON_BOOKS`; start on the shelf or acquire by encounter. Keep "Melvin-Koushki argues" in the notes. |
| `dee_mysteriorum` | Add the restoration: "...thrown into a furnace at the angels' command, and found again three weeks later." |
| `trithemius_steganographia` | Good. Dee's 1563 letter to Cecil is the right source. |
| `ptolemy_almagest` | Status `plausible`, edition "1551 (ed.)", no source. Fine as a plausible shelf item. |
| `dee_monas` | Good. "What it means is disputed" is the right note. |
| `hajek_dialexis`, `hajek_opuscula` | Good: Dee owned books by his Prague host. A blue option at Hájek's house for owning them would make the connection felt. |
| `picatrix` | `forbidden`, Arabic origin. If the Ottoman thread wants a book that is about Arabic occult science and *is* documented as circulating in Latin Europe, this is a better candidate than Soyga for a market roll. |
