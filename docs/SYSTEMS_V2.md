# FTLDee Systems v2 — the FTL layer

Authoritative rules for the v0.2 build (2026-10-03). Supersedes the room and book
sections of `research/MECHANICS_FROM_BIOGRAPHY.md` where they differ. Card data
lives in `src/data/cards/`; rules live in `src/systems/`.

## 0. Everything is a card

Every game object is a card with `id`, `name`, `historicalStatus`, `sources`,
`glyph`, rules text and optional `flavor`. Categories: **house, room, book,
instrument, crew, location, errand, encounter, faction, skill, weather**. The
in-game **Codex** screen browses them; `npm run cards` exports
`portal/data/cards.json` and `scripts/cards_to_sqlite.py` builds `cards.sqlite`.

## 1. The FTL mapping

| FTL | FTLDee |
|---|---|
| Ship | The household (Mortlake; later Hájek's house in Prague) |
| Systems / subsystems | Rooms: Library, Study, Scriptorium, Correspondence, Laboratory, Scrying Chamber, Instrument Room, Quarters |
| System power bars | Room level 0–3 |
| Ship upgrade (hull class) | House tier 1–3 |
| Crew manning a station | Crew posted in a room |
| Away team | Crew errand to a map node |
| Weapons + weapon slots | Books + the travelling satchel |
| Cargo hold | Books left on the library shelves at the base |
| Augments | Instruments |
| Store | Market (Paul's Churchyard; Old Town Prague) |
| Scrap | Money (£) |
| Hull | Secrecy |
| Fuel | Days |
| Rebel fleet | Political pressure / the weather track |
| Sector | England 1580–83; Prague 1584–86 |
| Blue options | Choices unlocked by books, skills, rooms, instruments, crew, flags |

## 2. Rooms

- Eight rooms, levels 0–3. A room's maximum is capped by the **house tier**
  (tier 1: 2; tier 2 and 3: 3). Some bases lack some rooms (Hájek's house has no
  Scriptorium or Instrument Room).
- Upgrading costs money and days (see each room card) and may need skills or
  instruments (the Scrying Chamber needs the show-stone, then the Sigillum Dei,
  then the Holy Table).
- **Key-skill bonus at the base:** level 2 gives +1 to the room's key skills,
  level 3 gives +2. A crew member posted in the room who has 4+ in any of its key
  skills adds +1 more ("manned").
- Special effects: Library ≥1 makes all owned books usable at the base; Library 3
  lets books sell at full value. Study restores 1/2/3 Focus per day at the base.
  Correspondence 1 halves network drift, 2+ stops it, 3 adds +1 faction to
  errands. Quarters holds 2 + level people besides Dee; over capacity, stability
  falls 1 a day and Focus does not restore. Quarters 2/3 restore stability 1/2 a
  day.
- Stations per room are on the card, plus the house tier's `extraStations`.

## 3. House tiers and fortune

- **Fortune** is recalculated every action: `money/4 (money capped at 200) +
  (sum of the three highest faction values)/6`. Ranks: under 20 Destitute, under
  35 Straitened, under 50 Comfortable, under 65 Favoured, 65+ Endowed. Crossing a
  rank raises a **fortune banner** (rise or fall text).
- **House tiers** (`src/data/cards/house.ts`): Mortlake 1 (start), Mortlake 2
  "enlarged" (plausible; needs Favoured, £80), Mortlake 3 "a royal foundation"
  (COUNTERFACTUAL; needs Endowed, Elizabeth 80, Burghley 50; pays a stipend of £12
  every ten days). In Prague: lodging with Hájek (start) and the house near the
  Old Town market (documented move, 12 January 1585).

## 4. Crew

- Each crew member has a **post**: a room, the **retinue** (travels with Dee), or
  an **errand**.
- On the household screen you select a crew member and click a room to post them
  there (FTL style), or click "Retinue".
- **Retinue:** when Dee leaves the base, retinue crew go with him. Their skills
  can stand in for Dee's: a requirement checks the best of Dee's effective skill
  and any retinue member's skill.
- **Errands:** from the map, send a crew member who is at the base to a node with
  an errand. They are gone for the round-trip travel days plus the errand's work
  days. On return: d10 + their skill ≥ difficulty → success outcome, else failure
  outcome. Some errands buy a book from that node's market stock.
- Starting crew: Jane Dee, Roger Cooke. Joining through encounters: Barnabas Saul
  (1581, documented), Edward Kelley (1582, documented). Saul leaves when Kelley is
  hired, or by encounter.

## 5. Books, the satchel and the market

- **At the base** every book in the library is usable (if Library ≥1).
- **Away from the base** only the books in the **travelling satchel** count.
  Satchel slots: 3, +2 with the travelling chest. Slot cost: pocket 1, portable
  1, large 2, fixed cannot be packed.
- Pack the satchel on the **Library** screen (only at the base).
- **Emigration:** when Dee leaves for the Continent, only satchel books and
  instruments marked `travels` go. Everything else is left at Mortlake, and news
  of the library's spoiling reaches Prague later. (Per Håkansson 31–33 the
  plunder was by employees and friends, not a mob; the game says so.)
- **Markets:** London (Paul's Churchyard) and the Old Town in Prague. On arrival
  the market rolls 4 books and 2 instruments from its pool (seeded); stock
  refreshes after 20 days. Buy at the book's value. Sell at half (full with
  Library 3). Forbidden books cost 5 Secrecy to buy. A book whose prerequisite
  tags you lack cannot be bought; the card shows which tag is missing.

## 6. Effective skill

`base skill + room bonus (at base) + manned bonus (at base) + instrument bonuses
(base-only instruments only at the base) + usable-book bonuses`. A requirement
passes if `max(effective Dee, any retinue member)` meets it.

## 7. Time, pressure and the weather track

- Each sector has a clock. England: 180 days; at sector day 150 the
  **Continental Question** fires at Mortlake. Prague: 120 days; the nuncio's
  summons at day 100, departure at day 120.
- Political weather events fire on fixed sector days and show on the map's
  weather track (the FTL rebel-fleet bar). Pressure rises 0.3 a day.
- Networks drift: every 10 days Scholar and Continental standing fall 2 unless
  Correspondence slows or stops it.

## 8. The Ottoman thread

`ottomanSignalCount` rises when Dee acquires the Book of Soyga, completes the
Scrying Chamber, and asks the angels about Soyga. At 3 the flag
`ottoman_thread_open` is set and the COUNTERFACTUAL Ottoman choice can appear at
the Continental Question.

## 9. Sectors and nodes

- **England (Southern England and the Thames)**: Mortlake (base), Barn Elms,
  Richmond, Windsor, London, Greenwich, Deptford, Oxford.
- **Prague (schematic city plan)**: Hájek's house (base), Old Town market, Charles
  Bridge, the Lesser Town, the Hradschin, the Kunstkammer, the papal nuncio, the
  road to Třeboň (exit).

## 10. Historical-content rules (unchanged, restated)

Every card and encounter carries a status. **Real historical people never get
invented direct speech**: reported speech only. Anonymous characters (a steward,
a bookseller, the narrator) may speak directly. Real quotations only from the
corpus with a citation.

---

## 11. Additions, 2026-10-03 (later the same day)

- **Sectors are three:** England (180 days; Continental Question at day 150) → **the Road East**
  (Gravesend 21 Sept 1583 → Brill → Rotterdam → Lübeck → Wismar/Rostock → Stettin → Posen → Lask →
  Kraków → the road to Prague; Bremen, Hamburg and Danzig are plausible detours) → Prague. On the
  road the household *is* the base (`BaseId 'road'`, rooms capped at level 1). Leaving England only
  the satchel crosses; later moves carry the whole chest. Jane and the children reach Prague about
  day 25 (Whitby printed 31–33).
- **Triggered events fire by themselves** when Dee is at their place and the conditions hold (FTL
  beacon). Documented turns therefore happen: Saul (day 20), Soyga (25), Saul confesses (40),
  Kelley (45), Jane's rage (55), Soyga question and Roger Cooke's departure (60), the departure
  accounts (120).
- **Prologue 1555** opens every run: Elizabeth's diviner, the examination, Bonner's chaplain. Its
  flags (`marian_past`, `bonner_chaplain`, `informer_1555`) make later weather hit harder.
- **Promises:** petitions yield `pledges` that count toward Fortune (up to +25) but are paid only by
  chance (warm patron, after 20 days); all lapse with "Promised, not paid" when the household leaves.
  The royal foundation needs a `royal_grant_drafted` event first.
- **The File:** acts of service set `file_*` flags. Weather with `scaleByFlags` (optionally a
  `flagPrefix`) reads them: Powle's dispatch (Prague day 60), the opened letter (Prague day 10), the
  renegade report (road day 16), Foxe (England day 20), Grindal's refusal (England day 130).
- **Legend Mode** (start screen) adds `historicalStatus: 'legend'` scenes from the spy legend
  (Deacon 1968, Hooke 1690), each marked and sourced.
- **Crew training:** every 20 days a crew member posted in a room gains +1 in that room's key skill
  they are best at, up to their potential (or 8).
- **Secrecy 0 ends the career** (examination).
- **Dee's own books cannot be sold.**
- **Associates and the Network screen:** ~30 people with role, place, faction and what they offer;
  met when a listed flag, encounter or contact is present.
- **Citations:** see `docs/CITATIONS.md` (printed pages for Parry, Harkness, Whitby, Szőnyi,
  Clulee's Ambix article).
