# Dee's career arc against FTLDee's structure

Written 2026-10-03 against `docs/SYSTEMS_V2.md` and the card data as it stood that day
(`src/data/cards/*`, `books`, `characters`, `encounters/index.ts`, `factions/weather.ts`,
`locations`). The Prague encounters (`encounters/prague.ts`) and the England events
(`encounters/england_events.ts`) were not yet on disk, so this report judges the
Prague sector from its map, weather track and errands only.

Notation. **[record]** means the corpus or a named source says it, with pages.
**[inference]** means it is my reading or my arithmetic. Corpus checks were made against
`dee_chunks.sqlite`; page numbers are the corpus's page numbers.

---

## 1. The game's shape in one paragraph

Two sectors. **England, 1580–83**: 180 days, base Mortlake, eight nodes, the Continental
Question fires on day 150. **Prague, 1584–86**: 120 days, base Hájek's house, eight nodes,
the nuncio's summons on day ~95–100 and the road to Třeboň opens at the end. Secrecy is
the hull, political pressure is the rebel fleet, books are weapons limited by a three-slot
satchel when Dee leaves the base, crew are posted to rooms or sent on errands, and house
tiers rise with a Fortune score. Choosing to stay in England ends the run
(`transition_stay_england` has `endCareer: true`); so does the Ottoman option.

[inference] If England's 180 days run from January 1580 to the departure in September 1583,
one game day is about nine calendar days. Prague's 120 days (August 1584 to June 1586) are
about five and a half. That compression matters for pacing, and section 5 tabulates it.

---

## 2. The arc, phase by phase

| Phase | Dates | What the record holds | Where it lives in the game | Verdict |
|---|---|---|---|---|
| Formation | 1527–1551 | Cambridge, Trinity, Louvain with Frisius and Mercator, Paris lectures (Parry 29–48) | Starting skills (Mathematics 9, Astronomy 8), Mercator globes and Frisius staff, Euclid and Almagest on the shelf | **Expressed as backstory.** Right call: the game starts at 52. |
| Suspicion | 1555 | Arrest for "calculing and conjuring", Bonner's household (Parry 48–58) | Two `secrets` strings on `DEE_CHARACTER`; Secrecy as hull | **Flattened.** The thesis survives in Secrecy, but the player never learns *why* Dee is watched. |
| Election | 1558–1570 | Coronation date, *Propaedeumata*, *Monas*, the *Praeface* (Parry 48–58; Harkness 76–102) | `elizabeth` faction, Dee's own books in `INITIAL_LIBRARY` | **Expressed as starting state.** |
| The failed offices | 1570–1583 | Petitions, imperial briefs, the Mortlake "academy" with three laboratories by 1583, calendar reform accepted then blocked (Parry 61–63, 105–107, 170–177; Sherman) | `errand_petition`, tier `mortlake_3` (COUNTERFACTUAL), `weather_imperial_currency_falls`, `weather_calendar_reform` | **Half-expressed.** The unreachable royal foundation is the best single card in the set. But `errand_petition` *pays* on success (£6, Elizabeth +3) — the opposite of Sherman's point. |
| The angelic turn | 1581–1583 | Saul from Oct 1581, first action 22 Dec 1581; Kelley as "Talbot" 8 Mar 1582; Jane's rage 6 May 1582; Soyga put to the angels; Heptarchia, Sigillum, Holy Table (Harkness 33–44; Whitby 24–26, 56–58; Fenton 44) | Scrying Chamber levels gated by show-stone → Sigillum → Holy Table; Saul and Kelley as crew; `ottomanSignalCount` | **Structurally expressed, motive missing.** The room is built to angelic specification, which is legible. Nothing tells the player why a mathematician would do this *now* (Harkness's eschatological urgency). |
| Emigration | Sept 1583 | Dee borrows £400 from his brother-in-law Nicholas Fromond against the house, gardens, "goods and chattels" and remaining books; Fremonsheim catalogues the library (catalogues dated 6 Sept 1583); the whole family sails (Parry 191–193; Whitby 1031–1034; Fell Smith 64–65) | Continental Question (day 150); the satchel; everything else left at Mortlake | **Expressed in the satchel, wrong about the family.** The encounter says leaving means "leaving ... Jane and the children". They went. See ACCURACY_FLAGS B1. |
| The road and Prague | 1583–1586 | En route Kelley "sees" the library violated (Fenton 126–128 n.6); audience with Rudolf 3 Sept 1584, Dee rebukes him; Curtius as intermediary; Kraków and King Stephen 1585; Uriel orders Jane left in Prague; Pucci; Malaspina; the furnace (10 Apr 1586) and restoration; edict of 29 May 1586 (Harkness 68–72; Whitby 44–48; Fenton 175, 200–204; Fell Smith 87–89) | Prague sector, weather track (Curtius, Mortlake news, papal envoys, summons), Hradschin gated by `wrote_to_emperor`, nuncio node | **Partly expressed.** The locked castle reachable only through Curtius is exactly right. The Kraków excursions, the angels' Constantinople prophecy and the family's presence are absent. |
| Return | 1586–1589 | Třeboň under Rožmberk; cross-matching (May 1587); the Muscovy offer (Dec 1586); Bremen; home 2 Dec 1589 to find books and instruments gone (Whitby 52–54; Fenton 216–219; Håkansson 31–33) | `trebon_road` ends the sector | **Absent**, by scope. Needs at least an epilogue card (see PROPOSED_MECHANICS_TWEAKS #10). |

---

## 3. The four scholarly theses

### Parry: expertise is useful and incriminating at once

**Already in the mechanics.**
- Secrecy is the hull, and successful service spends it. `intelligence_cipher_trithemius`
  pays Walsingham +15 and £20 and costs Secrecy −8. `present_occult` pays Elizabeth +12 and
  costs Secrecy −10. Forbidden books cost 5 Secrecy to buy. That is Parry's paradox as
  arithmetic: the better the answer, the more exposed the answerer.
- `religiousAuth` drifts against occult successes (`present_occult` −5).

**Missing or flattened.**
- Two meters do one job. Secrecy and `religiousAuth` both stand for "how closely am I
  watched". [inference] The player cannot tell which one a given risk will hit, so neither
  reads as a story. Suggest: Secrecy is *what is known about you*; `religiousAuth` is *who
  minds*. Make the second a multiplier on the first's consequences, not a parallel bar.
- The origin is invisible. 1555 is two strings in a data field. The player is told Secrecy
  matters without being shown the arrest that taught Dee it does.
- Rivals are missing. Parry's mechanism is competitive: Prestall promising bolder alchemy,
  Murphyn's forgeries (Parry 87–114). `research/ENCOUNTER_CANDIDATES.md` designs both; neither
  is in the data.

### Sherman: the failed offices are the career; the library is a working institution

**Already in the mechanics.**
- `mortlake_3` "A royal foundation at Mortlake", tagged COUNTERFACTUAL, flavour "The record
  has the petitions; it does not have the grant." This is the career's shape in one card.
- Library ≥1 makes every owned book usable at the base; away, only the satchel counts. The
  library is an instrument, not a trophy case.
- The Scriptorium's "copy a manuscript and sell the copy" (`household_copy_manuscript`).

**Missing or flattened.**
- **Petitions succeed.** `errand_petition` success: "delivered the petition and was well
  received", Elizabeth +3, Burghley +2, £6. Sherman's career is petitions that are well
  received and not granted. The mechanic should produce *promises*, not money (TWEAKS #3).
- **The tier-3 foundation is purchasable.** At Endowed fortune, Elizabeth 80, Burghley 50 and
  £60 the player simply builds what history refused. A counterfactual reachable by grinding
  says the refusal was a matter of effort. [inference] The thesis is better served if tier 3
  needs a royal *grant event* the player can earn the chance of but not buy.
- **Visitors.** The library's institutional life was other people using it: navigators,
  courtiers and scholars came to Mortlake, and were shown the instruments, a magnet and a star
  globe marked with comets (Håkansson 12–14). Nothing in the game brings anyone to the base.
- **The catalogue.** Library level 3 is labelled "The 1583 catalogue". The catalogues are
  dated 6 September 1583, days before departure, and were made by the London bookseller
  Fremonsheim while Dee was borrowing £400 against the house and books (Parry 191–193;
  Whitby 1031–1034). The catalogue is an act of *leaving*, not of building.

### Harkness: eschatological urgency

**Already in the mechanics.** Almost nothing. `theology` exists as a skill with no room. The
angelic work is a room to upgrade and a source of Kabbalah/Occult Philosophy bonuses.

**Missing.** The motive. Harkness's argument is that Dee turned to the angels because nature
was decaying and the end was near, and he needed the Adamic key before it came. The record
gives dated pressure points the game could use:
- the 1577 comet and 1580 earthquake as signs (Harkness 149),
- the **grand conjunction of 1583 in Aries**, "perhaps the most significant", which fell as
  Dee left for Prague (Harkness 149),
- the angels' dated prophecies: all rulers overthrown by January 1587 (Parry 193–195), and
  Dee to "set up the sign of the Cross even in the midst of Constantinople" on 15 September
  1585 (Fenton 144–146; Parry 197–199).

Political pressure is the only clock. A second clock, the angels' calendar, would explain the
scrying room's place in a career sim (TWEAKS #5).

### Melvin-Koushki: the grimoire as a courtier's manual; Dee as Elizabethan Ibn Turka

**Already in the mechanics.**
- `BOOK + SKILL + CONTACT + PATRON = OPERATION` and the blue options built on it. Agrippa plus
  Monas plus Occult Philosophy 7 opens `present_occult`. The book is a professional capability.
- The Ottoman thread: Soyga, the Chamber, the Soyga question, three signals.

**Missing or flattened.**
- **The angels as court advisers.** The clearest case in the record: before Dee's audience
  with King Stephen in 1585 a spirit dictated what Dee should say, ending "Behold (O King), I can
  make the Philosophers Stone. Bear thou therefore the charge, and give me a name within thy
  court" (Szőnyi 273–274, quoting *TFR* 407). The angels write the pitch. A scrying action that
  returns a blue option at the next court node would make Melvin-Koushki's thesis something the
  player does (TWEAKS #6).
- **The Ibn Turka parallel is invisible in England.** It surfaces only as a gate on the
  Ottoman choice. TurkaVita's useful lesson is the **duress rule**: what a man wrote to the
  people judging him cannot carry a claim about what he held. Dee's *Compendious Rehearsal*
  (1592) and *Apologetical Letter* (1599) are exactly that kind of text, and the *Rehearsal*
  is also the main source for the losses at Mortlake, written as a claim for compensation.
  [inference] Any later Dee content should flag those as defence, not confession.

---

## 4. Twists the game skips (ranked by how much story they carry)

1. **The family emigrates.** Jane, Arthur (4), Katherine (2) and the infant Rowland sail with Dee,
   Kelley and Joan Kelley from Gravesend (Fell Smith 64–65). The present text leaves them
   behind. This is both an error and the largest lost story: a household on the road.
2. **The library is pledged before it is spoiled.** £400 from Fromond, secured on the house and
   "remaining books"; the catalogue made by a bookseller still owed £63 (Parry 191–193). The
   later plunder was by "employees and friends" who thought Dee would not return (Håkansson
   31–33), and Fromond sold goods in his care (Whitby 44–46). The man who held the mortgage is
   Jane's brother.
3. **Roger Cooke leaves, September 1581.** With Dee from age 14 to 28, he asked leave on
   5 September 1581 with "hot words"; Dee tried to keep him with money and alchemical secrets
   (Fenton 26–28; index entries 14–15). The game keeps him to 1586.
4. **Kelley enters by denouncing Saul.** On 9 March 1582 "Talbot" and Clerkson "declared a great
   deale of Barnabas nowghty dealing" (Whitby 56–58). Saul then told Dee he no longer saw
   spirits. The new scryer's first act is to discredit the old.
5. **Jane's rage, 6 May 1582.** "in a mervaylous rage ... all that night" against someone
   Clerkson had reported, probably Kelley; then a break in the actions from 4 May to 13 July
   (Whitby 24–26; Harkness 35–37). Dee erased the entry.
6. **The audience that went wrong.** Granted 3 September 1584; Dee told Rudolf to repent and
   put his faith in the angels; Rudolf said the time was not convenient and named Curtius as
   go-between; Dee then showed Curtius all his records of the actions, "which was not the
   wisest thing to do" (Whitby 44–46; Harkness 68–70).
7. **Kraków and the scripted pitch to King Stephen** (Szőnyi 273–274; Whitby 46–48).
8. **Uriel: "take not thy wife ... with thee"** (Fenton 175, 1585). Jane and Joan Kelley, the
   children and servants stay in Prague under Edmond Hilton while Dee and Kelley go to Poland
   (Fell Smith 87–88).
9. **The furnace and the restoration.** 10 April 1586, at the voice's command, Kelley and Pucci
   burn 28 books of the actions; on 29–30 April they reappear in Carpio's vineyard under an
   almond tree (Fenton 200–204; Fell Smith 88–89). The game should not adjudicate staging.
10. **The expulsion edict, 29 May 1586** (Fell Smith 88–89). The sector's natural end.
11. **The Muscovy offer** (Dec 1586, Třeboň, just past the sector): a documented eastern road,
    £2,000 a year, declined (Fenton 216–219; Håkansson 31–33). See PRAGUE_AND_OTTOMAN.

---

## 5. Chronology compression [inference]

Linear mapping, England day 0 = 1 Jan 1580, day 150 = mid-Sept 1583; Prague day 0 = early
Aug 1584, day 120 = June 1586. These are my numbers, offered to place fixed events.

| Event | Date | ≈ sector day | Currently |
|---|---|---|---|
| Roger Cooke asks leave | 5 Sept 1581 | E 69 | not in game |
| Saul's first action | 22 Dec 1581 | E 81 | crew join by encounter |
| Kelley arrives, denounces Saul | 8–9 Mar 1582 | E 89 | crew join by encounter |
| Jane's rage | 6 May 1582 | E 96 | not in game |
| Calendar treatise to Burghley; bishops resist | 26 Feb–Mar 1583 | E 129–133 | `weather_calendar_reform` day 80 (≈ 18 months early) |
| Grand conjunction in Aries | Apr 1583 | E 134 | not in game |
| Łaski meets Dee | May 1583 | E 138 | `weather_laski_arrives` day 100 (≈ a year early) |
| Library catalogued, £400 loan | 6 Sept 1583 | E 150 | Library 3 is a purchasable level |
| Audience with Rudolf | 3 Sept 1584 | P 5 | Hradschin gated by `wrote_to_emperor` |
| Curtius named | 12 Sept 1584 | P 6 | `weather_curtius` day 15 |
| Move near Old Town market | 12 Jan 1585 | P 28 | tier `hajek_2` |
| Kraków, King Stephen | Apr–Aug 1585 | P 43–67 | not in game |
| Nuncio's summons | late Mar 1586 | P 108 | `weather_nuncio_summons` day 95 |
| Furnace / restoration | 10 / 29 Apr 1586 | P 111 / 114 | `dee_mysteriorum` note only |
| Expulsion edict | 29 May 1586 | P 120 | sector end |

Moving calendar reform and Łaski late lets the England sector end in a cluster (calendar
blocked, conjunction, Łaski, catalogue, departure), which is how 1583 actually felt for Dee.
Showing the calendar date beside the sector day (TWEAKS #12) teaches the compression.

---

## 6. Structural notes

- **Staying in England is a counterfactual, and it ends the run.** The Continental Question
  is tagged `documented` as a whole, but only the Łaski choice is. Staying, and departing
  "independently", did not happen. [inference] Tag per choice, and give `transition_stay_england`
  an epilogue that names what staying would have meant (no Prague, no Třeboň, the library
  intact) rather than a bare game over.
- **The sector ends before the story's turn.** Parry's mechanism for 1586–89 is Kelley gaining
  independent value as an alchemist while Dee's authority breaks. Prague is where that starts
  (Kelley's desire to return to England, Whitby 46–48; the angels promising he will be "supreme
  alchemist", Parry 193–195). The Prague sector can seed it with Kelley's alchemy outgrowing
  Dee's influence even if Třeboň is never built.
