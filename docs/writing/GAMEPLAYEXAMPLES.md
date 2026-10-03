# Gameplay Examples — four careers, turn by turn

Authoring source for the onboarding, the tips and the barks. Each run below is played
under `docs/SYSTEMS_V2.md` with the card data in `src/data/cards/` as it stood on
2026-10-03. Where a number had to be assumed, it is marked:

- **†** a travel figure for a node not yet in `src/data/locations/` (Deptford, Oxford, the
  Prague nodes). Placeholder; the map data wins.
- **‡** a book that the book list is adding but that had no card when this was written.
  The price shown is a guess at its value; the card wins.
- **◊** an encounter from the v2 encounter rewrite whose outcome numbers were not final.
  The figure is a placeholder in the range the existing encounters pay (£5–20, faction
  ±3–15, Secrecy −3 to −10).

Everything else (room costs, house tiers, errand difficulties, the fortune formula,
market rules, the existing encounters' outcomes) is taken from the files as written.

## The starting position (every run)

| | |
|---|---|
| Money | £45 |
| Days | England sector, day 0 of 180. The Continental Question fires on day 150. |
| Secrecy | 75 |
| Focus | 80 |
| Pressure | 10, rising 0.3 a day |
| Factions | Elizabeth 55, Burghley 40, Leicester 45, Walsingham 50, Religious Authorities 30, Scholar Network 65, Merchant Network 25, Continental Courts 20 |
| Fortune | £45/4 = 11.25, plus (65 + 55 + 50)/6 = 28.33. **39.6, Comfortable.** |
| House | Mortlake, tier 1. Rooms can be built to level 2. |
| Rooms | Library 2, Study 1, Scriptorium 0, Correspondence 1, Laboratory 1, Scrying Chamber 0, Instrument Room 2, Quarters 1 (holds 3 besides Dee) |
| Instruments | Mercator's globes (base only, does not travel), the Frisius ring and staff (travels) |
| Library | Euclid *Elements* (large, £8), Ptolemy *Almagest* (large, £15), Agrippa *De occulta philosophia* (portable, £12, controversial), Trithemius *Steganographia* (portable, £25, **forbidden**), Dee's *Mathematical Preface* (portable, £5), Dee's *Monas Hieroglyphica* (pocket, £10), Paracelsus *Selected Works* (portable, £10), Copernicus *De revolutionibus* (large, £18) |
| Satchel | 3 slots, empty |
| Crew | Jane Dee (Rhetoric 6, Courtly Intelligence 5, Manuscript Knowledge 4, Languages 3); Roger Cooke (Manuscript Knowledge 6, Languages 5, Rhetoric 5, Mathematics 4) |

Political weather on the England track: day 60, Albert Łaski arrives (Walsingham +5,
the Łaski encounter unlocks); day 90, Puritan pressure (Religious Authorities −10,
Elizabeth −3); day 110, calendar reform blocked (Religious Authorities −5, Burghley −5,
Scholar +5); day 130, imperial ideology loses currency (Burghley −8, Leicester −3);
day 150, the Continental Question.

Fortune, once more, because every run turns on it:
`fortune = min(money, 200)/4 + (sum of the three highest faction values)/6`.
Under 20 Destitute, under 35 Straitened, under 50 Comfortable, under 65 Favoured,
65 and over Endowed.

---

## Run A — The Mathematician-Courtier

*Strategy: stay in England, serve the Crown with mathematics, build the house up, and
reach the counterfactual royal foundation (Mortlake tier 3: Endowed, Elizabeth 80,
Burghley 50, £60).*

### Day 0 — posting the household

The household screen shows Mortlake as a plan of eight rooms. Jane and Roger stand in the
hall.

1. **Jane to the Study.** The Study's key skills are Mathematics and Rhetoric. Jane has
   Rhetoric 6, which is 4 or more, so the room is **manned**: +1 Mathematics and +1
   Rhetoric for Dee while he is at the base. (Study 1 gives no level bonus of its own; it
   restores 1 Focus a day.)
2. **Roger to the Library.** Library 2 already gives +1 Manuscript Knowledge and Natural
   Philosophy at the base. Roger's Manuscript Knowledge 6 mans it for +1 more. Dee's
   Manuscript Knowledge at home is now 8 + 1 + 1 = 10.

The bark line under the plan: *Roger Cooke takes the stool by the catalogue and says he
will have the shelf-marks straight by Friday.*

### Day 0 — packing the satchel

Library screen. The satchel has 3 slots. The player wants to visit Walsingham at Barn
Elms, so packs the *Steganographia* (portable, 1 slot), the *Mathematical Preface*
(portable, 1) and the *Monas* (pocket, 1). Trying to add the *Almagest* (large, 2 slots)
is refused: *The satchel will not close. Something has to stay on the shelf.*

### Days 1–4 — Barn Elms

Travel to Barn Elms: 1 day, £1. **£44.** Barn Elms needs Walsingham 30; he has 50.

The encounter is *Walsingham and the Intelligence Problem*. Three blue options light up:

- **Trithemian cipher** — needs Cryptography 5 and the *Steganographia*. Dee's Cryptography
  is 6 (no Scriptorium bonus away from home, and he has no Scriptorium anyway). The book
  is in the satchel. Unlocked.
- **Mathematical analysis** — needs Mathematics 7, Cryptography 4. Unlocked.
- **Protect the contact** — needs Courtly Intelligence 6, Cryptography 3, Continental
  Courts 15. Unlocked, just.

He takes the Trithemian route: 3 days. Walsingham +15 (65), Elizabeth +3 (58),
Burghley +3 (43), Secrecy −8 (67), £20. **£64, day 4.** Fortune: 16 + (65 + 65 + 58)/6 =
**47.3, Comfortable.**

The Secrecy cost is the lesson. The forbidden book did the work, and the household now
holds a little less of its own counsel.

### Days 5–10 — a petition and a letter-room

Home on day 5 (£1, **£63**).

- **Errand:** from the map, Jane is sent to carry a petition to court at Richmond.
  Rhetoric, difficulty 9. Round trip 2 days plus 2 days' work: back on day 9. Cost £3.
  **£60.** The Study is now empty and the plan flags it: *The Study is unmanned. The desk
  is tidy and nobody is at it.*
- **Upgrade:** Correspondence 1 → 2, £20, 5 days. **£40, day 10.** At level 2 the
  scholarly and continental networks stop drifting, and Dee gets +1 Courtly Intelligence
  and Languages at home.

Day 9: Jane returns. The errand report rolls the die in the open: **d10 = 6, + Rhetoric 6
= 12 against 9. Success.** Elizabeth +3 (61), Burghley +2 (45), £6. **£46.**

Day 10: the drift tick. Correspondence 2 has just finished, so nothing drifts. Pressure
is 13. Fortune 11.5 + (65 + 65 + 61)/6 = **43.3.**

### Days 10–16 — the comet at Windsor

Jane goes back to the Study. The satchel is repacked for court: the *Almagest* (2 slots)
and Agrippa (1). The *Preface*, *Monas* and *Steganographia* go back on the shelf.

Richmond (1 day, £1), then Windsor (2 days, £3). **£42, day 13.** Windsor needs
Elizabeth 40; she is at 61.

*The Comet at Windsor* offers four readings. The blue option *Synthesise all three*
needs Astronomy 7, Astrology 7, Occult Philosophy 7, Rhetoric 7, the *Almagest* and
Agrippa. Away from home Dee has Astronomy 8 + 1 from the Frisius ring (it travels) = 9,
Astrology 7, Occult Philosophy 8, and Rhetoric 7 exactly, because Jane's manning bonus
stayed in the Study at Mortlake. Both books are in the satchel. Unlocked.

3 days, Focus −10. Elizabeth +15 (76), Burghley +6 (51), Leicester +8 (53), Scholar +8
(73), Secrecy −5 (62), £20. **£62, Focus 70, day 16.**

Fortune: 15.5 + (76 + 73 + 65)/6 = **51.2.** The first banner of the run:

> **FAVOURED.** The Queen asked for it in writing. A man whose comet reading is wanted in
> writing is a man whose bills are paid a little sooner.

### Days 16–19 — the Queen's interest

The comet leads to *Elizabeth's Interest* at Richmond (2 days, £3; **£59, day 18**).

Two blue options are shown locked, and the reason is the satchel:

- *Present the imperial philosophy* — needs the *Mathematical Preface*. **Missing: it is on
  the shelf at Mortlake.**
- *Present the occult philosopher* — needs Agrippa (packed) and the *Monas*. **Missing:
  *Monas Hieroglyphica*, on the shelf at Mortlake.**

He presents himself as the mathematician and cartographer: Elizabeth +6 (82), Burghley +8
(59), Merchant +4 (29), Scholar +3 (76), £10. **£69.** Fortune 54.4.

Home on day 19 (£68). Jane is sent with a second petition (£3; **£65**; back day 23).

### Days 20–21 — Paul's Churchyard

London, 1 day, £1. **£64, day 20.** The market rolls its stock on arrival:

| Books | Price | Note |
|---|---|---|
| John Field, *Ephemeris* | £4 | pocket |
| *Book of Soyga* | £50 | **forbidden**: buying costs 5 Secrecy |
| William Bourne, *A Regiment for the Sea* ‡ | £6 | portable |
| Robert Recorde, *The Castle of Knowledge* ‡ | £7 | large |
| **Instruments** | | |
| Sea Charts and Compass | £10 | Navigation +1, travels |
| Iron-bound Travelling Chest | £15 | +2 satchel slots |

He **sells** Paracelsus (value £10, sells for £5) and Copernicus (value £18, sells for £9).
Half price, because the Library is at 2; a level-3 Library would have fetched the full £28.
The tier-1 house cannot build Library 3. **£78.** He **buys** the Sea Charts and Compass.
**£68.** Home on day 21: **£67.**

The bookseller's bark when the Copernicus goes across the counter: *"You'll want it back,
Doctor. They always want it back."*

Day 23: Jane returns. **d10 = 4 + 6 = 10. Success.** Elizabeth 85, Burghley 61, **£73.**

### Days 23–29 — Greenwich and the pilots

Jane is sent to gather news in the City (Courtly Intelligence 5, difficulty 8, 4 days,
£2; **£71**). Dee goes to Greenwich (1 day, £1; **£70, day 24**).

*The Greenwich Network*: he takes the mathematics option. Leicester +5 (58), Merchant +4
(33), Scholar +3 (79), £5, and the flag `navigation_program_promoted`. **£75.** The
Hermetic option is open too (Occult Philosophy 7 and Agrippa in the satchel), and would set
the flag the Ottoman route later asks for. The courtier leaves it alone.

Deptford † (1 day, £1; **£74, day 25**). *The Muscovy masters' charts* ◊ needs Navigation 7
and the navigation flag. Dee's Navigation is 6; Mercator's globes would add 1 but they are
base-only and stand in the Instrument Room at Mortlake; the Sea Charts and Compass travel
and add 1. **7. Unlocked.** 2 days, £15 ◊, Merchant +4 ◊. **£89, day 27.**

Day 27: Jane's news errand: **d10 = 3 + 5 = 8 against 8. Success**, by nothing. Merchant
40, Walsingham 66.

Home via Greenwich (2 days †, £2): **£87, day 29.** Fortune 21.75 + (85 + 79 + 66)/6 =
**60.1, Favoured.**

### Day 29 — Mortlake enlarged

The Upgrades screen shows the house panel:

> **Mortlake enlarged** (plausible). Needs Favoured fortune and £80. 20 days. Rooms can be
> built to level 3; every room holds one more worker.

He buys it. **£7, day 49.** And the fortune banner falls straight away, because fortune is
partly money and the money has just gone into the walls:

> **COMFORTABLE.** The builders have been paid and the purse is light. Nothing is lost
> that cannot be earned back; the house is bigger than the income.

Fortune 1.75 + 38.33 = 40.1. The money-low warning fires as well: *Jane counts the purse
twice and says it will not stand another building season.*

This is the run's central teaching. Fortune is a measure of standing **and** cash in hand.
Spending on the house drops it, and the next tier needs the fortune again from the start.

### Days 49–106 — the long climb (ledger)

Mortlake tier 3 needs Endowed (65), Elizabeth 80 and Burghley 50. Burghley is the clock:
the weather track will take 5 from him on day 110 and 8 on day 130.

| Day | Action | Money | Effects |
|---|---|---|---|
| 49 | Jane: petition (£3) | £4 | |
| 50 | London (£1). The stock refreshed on day 40. Sells *Steganographia* (£12) and Agrippa (£6) | £21 | The courtier sells the occult shelf. Secrecy does not come back. |
| 51 | Home (£1) | £20 | |
| 53 | Jane back: d10 = 8 + 6 = 14, success, +£6 | £26 | Elizabeth 88, Burghley 63 |
| 53–60 | *Research at Mortlake*, astronomy (needs the *Almagest*, at home): 7 days, Focus −15 | £26 | Scholar 83 |
| 60 | **Weather: Łaski arrives** | | Walsingham 71. The Łaski encounter unlocks; he never goes to it. |
| 60–66 | Deptford ◊ again: £4 travel, +£15 | £37 | Merchant 44 |
| 66 | Jane: petition (£3) | £34 | |
| 66–70 | Richmond (£1), *an election for a royal journey* ◊, 3 days, +£20 | £53 | Elizabeth 91 |
| 70 | Jane back: d10 = 1 + 6 = 7. **Failure.** "Waited three days and was not admitted." | £53 | Elizabeth 90 |
| 71 | Home (£1). **Scriptorium 0 → 1** (£12, 4 days). Roger moves there from the Library (Languages 5 mans it). | £40 | *The Library is unmanned.* |
| 75–85 | Two fair copies of the *Preface* sold ◊ (5 days, £8 each) | £56 | |
| 85 | Jane: petition (£3) | £53 | |
| 85–93 | Deptford ◊ (£4 travel, +£15) | £64 | Merchant 48 |
| 89 | Jane back: d10 = 7 + 6 = 13, success, +£6 | £70 | Elizabeth 93, Burghley 65 |
| 90 | **Weather: Puritan pressure** | | Religious Authorities 20, Elizabeth 90 |
| 93–98 | One more copy ◊ | £78 | |
| 98 | Jane: petition (£3) | £75 | |
| 98–104 | Deptford ◊ (£4, +£15) | £86 | |
| 102 | Jane back: d10 = 9 + 6 = 15, success, +£6 | £92 | Elizabeth 93, Burghley 67 |

On day 104 at Deptford, fortune is 23 + (93 + 83 + 71)/6 = **64.2.** Eight-tenths short
of Endowed.

Day 105: Greenwich to London (1 day, £1; **£91**). The *Monas* and the *Preface* are still
in the satchel, because they are small and nobody unpacked them. He sells both: £5 and £2
(half of £5, rounded down). **£98.** Fortune 24.5 + 41.17 = 65.67.

> **ENDOWED.** For the moment, Dee has what he has always asked for: enough. The question
> is what he builds with it before it goes.

He sold his own two books to afford the institution that was meant to house them. The
game does not comment. Home on day 106 (£1): **£97**, fortune 65.4, still Endowed.

### Day 106 — the royal foundation (COUNTERFACTUAL)

The house panel now shows the third tier in the counterfactual colour, with its status
written out in full:

> **A royal foundation at Mortlake.** COUNTERFACTUAL. Dee petitioned for an endowed
> institution and never received one. Needs Endowed, Elizabeth 80, Burghley 50, £60. 15 days.
> Pays a stipend of £12 every ten days.

He buys it. **£37, day 121.** On day 110, during the building, the calendar reform is
blocked: Burghley 62, Scholar 88. Fortune at day 121: 9.25 + (93 + 88 + 71)/6 = **51.25.
Favoured.** The fall banner runs again, and that is correct: the foundation was paid for
out of the purse.

The house announcement:

> **A royal foundation at Mortlake.** This did not happen. The petitions are in the record;
> the grant is not. In this career the Crown pays for the library, the laboratories and the
> instruments, and Dee is, for once, an institution rather than a petitioner.

Stipends: day 131 (+£12, **£49**), day 141 (**£61**). Day 130: imperial ideology loses
currency: Burghley 54, Leicester 55. The foundation has already been granted; the weather
cannot take it back.

### Day 150 — the Continental Question

| Option | State |
|---|---|
| Remain in England | open |
| Depart with Łaski | **locked**: needs the Łaski encounter, which he never attended |
| Depart independently | **locked**: Continental Courts 20 (needs 25) |
| The Ottoman court [COUNTERFACTUAL] | **locked**: Ottoman thread 0 of 3 |

He stays: Elizabeth +5 (98), Burghley +3 (57), −£10. **£51.** Stipends on days 151, 161
and 171 bring the purse to £87 by day 180, and the run ends on the *stayed in England*
epilogue with the counterfactual coda (see `EXPOSITION.md`).

### What this run teaches

- **Fortune is standing plus cash.** Every house tier is bought at the top of a fortune
  rank and leaves you lower. Plan for the fall banner; it is the receipt.
- **The satchel decides the audience.** Both locked options at Richmond were locked by
  packing, not by skill.
- **Manning bonuses stay home.** Rhetoric 7 at Windsor was exactly enough, because Jane's
  +1 was in the Study.
- **Correspondence 2 early** stopped the Scholar Network drifting for the whole run: 15
  ticks, 30 points of standing kept.
- **Weather has a schedule.** Burghley was going to lose 13 by day 130. The foundation was
  bought on day 106 for that reason.
- **The cost of the counterfactual** is shown, not hidden: the courtier sold the occult
  books, never touched the angels, and left the Continent closed.

---

## Run B — The Angelic Route

*Strategy: the show-stone, Barnabas Saul, then Edward Kelley; the Sigillum Dei and the Holy
Table; the Book of Soyga; depart with Łaski; Prague and the audience with Rudolf II.*

### Day 0 — posts and satchel

- **Roger to the Library** (manned, as in Run A).
- **Jane to Correspondence.** Key skills Courtly Intelligence and Languages; her Courtly
  Intelligence 5 mans it. Dee's Courtly Intelligence at home: 6 + 1 = 7.
- **Satchel:** Agrippa, the *Monas*, the *Steganographia*.

### Days 1–5 — the show-stone

London (1 day, £1; **£44**). This seed's stock:

| Books | Price | |
|---|---|---|
| *Book of Soyga* | £50 | forbidden |
| John Field, *Ephemeris* | £4 | |
| William Bourne, *A Regiment for the Sea* ‡ | £6 | |
| Abraham Ortelius, *Theatrum orbis terrarum* ‡ | £20 | large |
| **Instruments** | | |
| Show-stone | £18 | Occult Philosophy +1 at the base |
| Cucurbits and Alembics | £14 | Alchemy +1 at the base |

The *Soyga* card is red-bordered (forbidden) and greyed (unaffordable). Tapping it:
*"Fifty pounds, Doctor, and I'd want it out of the shop by dark."* Its prerequisites are
met (the *Steganographia* supplies `angelicLanguage`, Agrippa `occultCorrespondences`);
only the money is missing.

He buys the show-stone. **£26.** Home (£1, **£25, day 2**).

**Scrying Chamber 0 → 1**: £10, 3 days, needs the show-stone and Occult Philosophy 5.
**£15, day 5.** Fortune 3.75 + 28.33 = **32.1.**

> **STRAITENED.** The money has gone into a crystal and a table. Jane has noticed.

### Days 5–10 — paying for it at Barn Elms

Barn Elms (£1), the Trithemian cipher as in Run A. Walsingham 65, Elizabeth 58, Burghley
43, Secrecy 67, +£20. Home: **£33, day 10.** Fortune 39.8.

> **COMFORTABLE.** Walsingham's money spends like anyone else's.

Day 10, the drift tick. Correspondence is only at 1, which halves the drift: Scholar 64,
Continental 19. Jane's manning does not change the drift; the room's level does.

### Days 10–30 — Barnabas Saul

*The scryer* ◊ (documented: Saul scried for Dee in 1581; Harkness 35–42, Whitby 42–44).
Needs Scrying Chamber 1. Saul joins the household. Quarters 1 holds 3 besides Dee: Jane,
Roger, Saul. Full.

He is posted to the Scrying Chamber. (This run assumes Saul's card gives him Occult
Philosophy 4 or more, so the chamber counts as manned.)

Sessions ◊: three, 3 days each, Secrecy −3 and Focus −10 apiece. **Secrecy 58.** The
Study at level 1 restores 1 Focus a day at home.

Meanwhile:
- Jane carries a petition (£3); day 24, **d10 = 5 + 6 = 11, success**: Elizabeth 61,
  Burghley 45, +£6.
- Dee works on the *Monas* synthesis at home (*Research at Mortlake*, needs the *Monas*
  and Agrippa: 10 days, Focus −25, Secrecy −5, Scholar +3). **Secrecy 53.**

Day 30 ◊: Saul's sight fails and he recants. (Documented in outline; the game does not
say what he did or did not see.)

### Days 35–58 — Edward Kelley

*A stranger calling himself Talbot* ◊ (documented, March 1582; Harkness 35–40). The blue
option **Investigate before agreeing** needs Courtly Intelligence 5. Dee is at home, with
Correspondence manned: 7. Unlocked. The investigation turns up the criminal past the
sources report; the player hires him anyway.

The rule fires: **Saul leaves when Kelley is hired.** *Barnabas Saul packs one bag and
leaves the show-stone where it is.*

Kelley (Alchemy 7, Occult Philosophy 6, Rhetoric 5) goes to the Scrying Chamber: manned.

*Jane watches the new man carry the crystal to the window and says nothing until supper,
and then a good deal.*

The actions ◊:
- Day 42 ◊: the Sigillum Dei is dictated. A ritual instrument, price 0, unique.
- **Scrying Chamber 1 → 2**: £20, 6 days, needs the Sigillum. Money had reached £36;
  **£16, day 48.** +1 Occult Philosophy and Kabbalah at home.
- Day 52 ◊: the Ring of PELE (Occult Philosophy +1, Kabbalah +1; it travels).
- Day 58 ◊: the Holy Table is specified and made.

The Upgrades screen then shows **Scrying Chamber 2 → 3, the Holy Table**, locked:
*The house allows level 2. Mortlake must be enlarged first.* Mortlake enlarged needs
Favoured and £80. This run is Comfortable at best and has £16. The Holy Table stands in
the corner of a level-2 room.

Secrecy across the Kelley sessions ◊ (four, −3 each): **41.**

### Days 60–150 — Łaski, the Soyga, and the chest

| Day | Event | Money | Notes |
|---|---|---|---|
| 60 | **Weather: Łaski arrives.** Walsingham 70. The Łaski encounter unlocks. | £16 | |
| 62 | The Łaski encounter ◊: he goes, and the flag `laski_arrival` is set. Continental +10 ◊ | £15 | Continental 24 (it had drifted to 14) |
| 62–74 | Kelley moved to the Laboratory (Alchemy 7 mans it). Two alchemical consultations for Łaski's circle ◊, +£15 and Continental +4 each | £45 | Continental 31 after the day-70 drift |
| 70 | Jane: petition, d10 = 3 + 6 = 9, success | £48 | Elizabeth 64, Burghley 47 |
| 75 | London (£1). The *Book of Soyga*, £50. Affordable at last? No: **£47.** | £47 | *You have £47. The book costs £50.* |
| 76 | Sells Paracelsus (£5) and Copernicus (£9) on the spot | £61 | |
| 76 | **Buys the *Book of Soyga*.** Forbidden: **Secrecy −5 (36).** Ottoman signal **1 of 3** | £11 | Scholar +0; the bookseller looks at the door |
| 77 | Home (£1). Kelley back to the Scrying Chamber | £10 | |
| 80 | *The Soyga before the stone* ◊ (documented: the book was put to the angels in 1582; Uriel deferred and Michael was named its expounder). Secrecy −3 (33). Ottoman signal **2 of 3** | £10 | |
| 90 | **Weather: Puritan pressure.** Religious Authorities 20, Elizabeth 61 | £10 | *Secrecy is low* warning at 33 |
| 90–140 | Jane's petitions (three, two successes), two more consultations for Łaski's circle ◊ (Continental +6 each) | £46 | Continental 36 after drift |
| 110 | **Weather: calendar reform blocked** | | |
| 130 | **Weather: imperial ideology loses currency** | | |
| 142 | London: buys the **Iron-bound Travelling Chest**, £15. Satchel 3 → 5 | £30 | |

The Ottoman thread sits at 2. The third signal is completing the Scrying Chamber, and the
third level of the chamber needs a tier-2 house. The Angelic run never had the fortune
for the house, so the Ottoman door was shut by the builders' bill, not by the angels.

### Day 150 — the Continental Question

| Option | State |
|---|---|
| Remain in England | open |
| **Depart with Łaski** | **open** (`laski_arrival`) |
| Depart independently | open: Continental 36, Languages 7 at home, Rhetoric 7, £30. Exactly £30. |
| The Ottoman court [COUNTERFACTUAL] | **locked**: Ottoman thread 2 of 3 |

He departs with Łaski: Continental +15, Elizabeth −5, Secrecy −15 (**18**), −£20.
**£10.**

### The packing scene

The game stops on the Library screen with a different title: **What goes to the
Continent.**

> Only the satchel crosses the Channel. Everything else stays at Mortlake.

Five slots with the chest. He packs:

| Book | Slots |
|---|---|
| *Book of Soyga* | 1 |
| *Monas Hieroglyphica* | 1 |
| Agrippa | 1 |
| *Steganographia* | 1 |
| *Mathematical Preface* | 1 |

Left on the shelves: Euclid, the *Almagest* (2 slots each, and there is no room), the John
Field *Ephemeris* (never bought in this run), and whatever the market roll would have
offered later.

Instruments marked *travels* go with him: the show-stone, the Sigillum Dei, the Holy
Table, the Ring of PELE, the Frisius ring and staff, the chest. **Mercator's globes do not
travel.** They stay in the Instrument Room.

Crew: Jane and Kelley are put in the retinue and go. Roger is left posted in the Library
to keep the house. (This is the player's choice in this run; see the notes to the
orchestrator about who goes by default.)

The sector-change bark: *Dee writes in the margin of his almanac that the house is shut
and the key with Roger, and does not write anything else that day.*

### Prague: days 0–40

The household screen redraws as Hájek's house: a smaller plan, no Scriptorium, no
Instrument Room. Library 1 (the travelling chest, so every book that came is usable at the
base), Study 0, Correspondence 1, Laboratory 1 (labelled *Hájek's study*), Scrying
Chamber 0, Quarters 1. House: *Lodging with Hájek*, tier 1, rooms to level 2.

Arrival text (documented: 9 August 1584; Whitby 44–46, Szőnyi 279, Sherman 81–85) is in
`EXPOSITION.md`.

Money: **£10**, plus a Continental Courts standing that has finally become worth
something. Secrecy 18. The warning banner is permanent now: *Secrecy is very low. People
are watching the house.*

- Kelley to the Scrying Chamber, Jane to Correspondence.
- **Scrying Chamber 0 → 1** (£10, 3 days; the show-stone came in the chest). **£0.**

The Rudolf audience ◊ at the Hradschin (documented: 3 September 1584; Harkness 68–70,
Whitby 44–46). The map draws the route: Hájek's house, the Old Town, the Charles Bridge,
the Lesser Town, the castle (Parry 202–204). Kelley and Jane are in the retinue.

The choices ◊:
- **Rebuke the Emperor and urge faith in the revelations** (documented: what Dee did).
- **Present the *Monas*, dedicated to his father** — blue, needs the *Monas* (packed).
- **Speak of the Stone** — blue, needs Alchemy 7. Dee's is 5. **Kelley is in the retinue
  with Alchemy 7, and his skill stands in.** Unlocked.

The player takes the documented option. Rudolf defers and names Dr Curtius as
intermediary. Continental +5 ◊. The errand *Wait on Dr Curtius* appears at the Hradschin.

Jane goes to Curtius (Rhetoric, difficulty 9, £2). **d10 = 2 + 6 = 8. Failure:** *was told
the Emperor was occupied.* A second attempt ten days later: **d10 = 7, success.**
Continental +4.

### Prague: days 40–120

| Day | Event | Money | Notes |
|---|---|---|---|
| 22 | Sells the *Steganographia* at the Old Town market (£12) | £12 | The Angelic run has no further use for Walsingham's book |
| 24–36 | Kelley in Hájek's study (Laboratory, manned): consultations ◊ for court physicians | £38 | |
| 38 | Fortune 9.5 + (Walsingham 70, Continental 57, Scholar 55)/6 = 39.8, Comfortable | | Continental: 36 + 15 (departure) + 5 (audience) + 4 (Curtius) − 3 (drift) |
| 40 | **A house near the Old Town market** (documented: 12 January 1585; Whitby 46–48). Needs Comfortable, £30, 6 days. | £8 | Rooms to level 3, +1 station |
| 46–60 | Scrying Chamber 1 → 2 (£20, Sigillum), after two more consultations ◊ | £6 | |
| 30 ◊ | **News from Mortlake** (see below) | | |
| 60–80 | Francesco Pucci joins the actions ◊ (documented: 6 August 1585; Harkness 72–74). Religious Authorities −5 ◊ | | |
| 80–90 | Scrying Chamber 2 → 3, the Holy Table (£30, 8 days) | | The chamber is complete. Ottoman signal **3 of 3**. The thread opens a career too late; the Question is behind him. |
| 92 ◊ | **The books in the furnace** (documented: the angels ordered the angelic books burned; Harkness 199–201) | | The action-book cards ◊ are removed |
| 100 | **The nuncio's summons** (documented: Malaspina, audience 27 March 1586; Harkness 70–72). Dee demurs. | | |
| 120 | Departure on the road to Třeboň (Vilém Rožmberk, 1586–89) | | Prague epilogue |

The **news from Mortlake** arrives as a notice, not an encounter:

> **Letters from England.** The house at Mortlake has been broken into and its books
> taken, not by a mob, but by people Dee knew: employees and friends (Håkansson 31–33;
> Whitby 52–54). Lost from the shelves: Euclid's *Elements*, Ptolemy's *Almagest*. Lost
> from the Instrument Room: Mercator's globes.

### What this run teaches

- **The ritual apparatus is a build path.** Show-stone, then Sigillum, then Holy Table:
  each unlocks the next room level, and each costs Secrecy along the way.
- **The house tier gates the chamber.** The Holy Table needs room level 3; room level 3
  needs a tier-2 house; the tier-2 house needs Favoured. The Angelic route has to pay for
  the house, or finish the chamber abroad.
- **Retinue stands in.** At the Hradschin, Kelley's Alchemy opened the option Dee could
  not.
- **Forbidden books cost twice:** money, and Secrecy.
- **Errands fail.** Curtius was occupied the first time.
- **Packing is the loss.** Every book left on the shelf is a book the letters from England
  will name.

---

## Run C — The Alchemist Who Packs for Rudolf

*Strategy: build the Laboratory, hire Kelley for his furnace work, pack the chest for an
Emperor who wanted the Stone more than the angels. Accept that Mercator's globes cannot
come.*

### Days 0–30

- Posts: Roger to the Library; Jane to the Study.
- Satchel: Paracelsus, Agrippa, the *Monas*.
- Day 1, London: this seed offers Cucurbits and Alembics (£14) and the
  *Rosarium philosophorum* ‡ (£9). He buys the glassware. **£30.** The *Rosarium* card
  shows a prerequisite: `alchemicalMedicine`. He has it, because Paracelsus is in the
  library. He buys it. **£21.**
- Home (£1, **£20**). **Laboratory 1 → 2**: £35, needs Alchemy 4. Dee has 5. **Unaffordable.**
  *Jane says the furnace can have another fifteen pounds when the roof has had its eight.*
- Barn Elms for Walsingham's £20 (as in Run A), then home. **£38, day 10.** Laboratory
  1 → 2: **£3, day 18.** Dee's Alchemy at home: 5 + 1 (Laboratory 2) + 1 (glassware) = 7.
  Medicine 4 + 1 = 5.

Fortune falls to Straitened on day 10 and stays there through day 30.

### Days 30–90

Kelley is hired ◊ around day 35 (in this run Saul never came: the Scrying Chamber was
never built). He goes straight to the Laboratory. Manned: +1 more. **Alchemy 8 at home.**

- Laboratory 3 needs Alchemy 6 (met) and a tier-2 house (not met). The card says so.
- Instead, the Lab produces: alchemical consultations ◊ for Łaski's circle after day 60,
  each +£12 ◊ and Continental +5 ◊. Continental reaches 45 by day 120.
- The Market at day 80 offers the **Iron-bound Travelling Chest** (£15). Bought.

### The globes

On day 120 the player stands in the Instrument Room looking at Mercator's globes. They
are worth £30 and they will not travel (`travels: false`). The Market screen has a sell
button for books and none for instruments.

> **Mercator's globes.** Too large to travel. If the household leaves England, they stay
> at Mortlake.

The player keeps them in the Instrument Room for the last thirty days (Navigation and
Cartography +1 each at home) and lets them go.

### Day 150 — the packing

With the chest the satchel has 5 slots. The alchemist packs for Rudolf:

| Book | Slots | Why |
|---|---|---|
| Paracelsus, *Selected Works* | 1 | gives `alchemicalMedicine` |
| *Rosarium philosophorum* ‡ | 1 | |
| *Monas Hieroglyphica* | 1 | dedicated to Maximilian II, the Emperor's father |
| Agrippa | 1 | |
| *Mathematical Preface* | 1 | |

Left: Euclid, the *Almagest*, Copernicus (large), the *Steganographia*.

Instruments that travel: glassware, the Frisius ring and staff, the chest. Mercator's
globes stay.

He departs with Łaski (`laski_arrival` was set on day 62). Secrecy 52 after the −15:
higher than Run B's by thirty points, because no scrying was done in England.

### Prague

- Hájek's house: Laboratory 1, labelled *Hájek's study*. Kelley posted there. The
  glassware's bonus works again, because it is base-only and the base is now Prague.
- At the Old Town market: Tadeáš Hájek's *Dialexis* on the new star ‡ (£6). Its
  prerequisite tag is `celestialMechanics`, which came from the *Almagest* and Copernicus,
  both left at Mortlake. **Locked: missing celestialMechanics.** The packing decision of day
  150 has come back as a locked card in Prague.
- **The audience with Rudolf.** The blue option *Speak of the Stone* needs Alchemy 7. Dee
  away from home: 5. Kelley in the retinue: 7. Unlocked. The alchemist takes it.

  This is not what Dee did. The encounter marks it **plausible**: the Emperor's interest in
  alchemy is documented, and Dee's rebuke on 3 September 1584 is the documented choice. The
  epilogue will say which one the player chose and which one the record has.
- Kelley's errand to the Kunstkammer, *Show curiosities at the castle* (Courtly
  Intelligence, difficulty 10). Kelley has no Courtly Intelligence on his card: d10 alone
  must reach 10. **d10 = 10. Success.** Continental +5. (Parry 223–226 for the collection.)

Day 30 in Prague: the letters from England.

> **Letters from England.** Mortlake has been plundered by people Dee trusted. Among the
> losses on the list: **Mercator's globes** (Whitby 67–70). Also gone: Euclid, the
> *Almagest*, Copernicus, the *Steganographia*.

The globe card in the Codex now carries the line *Lost, 1583 list*.

### What this run teaches

- **Instruments are augments, and some cannot be moved.** Base-only instruments help only
  at home. Instruments that do not travel are lost on emigration.
- **Prerequisites follow the books.** The locked *Dialexis* is the Prague bill for the
  *Almagest*.
- **Kelley is two different crew members** depending on the room: in the Laboratory he is
  a furnace; in the retinue he is the reason the Emperor will listen.
- **Alchemy pays on the Continent,** and the Continental Courts faction (its card: *alchemy
  first, revelation second*) is where that money comes from.

---

## Run D — The Failing Career

*Strategy: there is none. This run shows what failure looks like and what the game says
while it happens.*

### Days 0–7

- No posts are set. Jane and Roger stay in the Quarters, where no key skills apply. The
  household plan shows six unmanned rooms. *The steward asks whether anyone means to work
  in the Library, or whether it is to be a storeroom.*
- London, day 1 (£1; **£44**). The player wants the *Book of Soyga* (£50). To raise the
  money he **sells the *Steganographia*** (value £25, sells for £12). **£56.**
- The *Soyga* card turns grey with a new reason: **Missing prerequisite: angelicLanguage.**
  That tag came from the *Steganographia*, which he has just sold. The bookseller does not
  smile: *"I'll sell you back the Trithemius, Doctor. Twenty-five pounds."*
- He buys the show-stone (£18) and the glassware (£14). **£24.** Home (£1, **£23**).
- Scrying Chamber 0 → 1 (£10). **£13, day 5.** Fortune 3.25 + 28.33 = 31.6, Straitened.
- Barn Elms (£1, **£12**). The Trithemian option is locked: **Requires Trithemius's
  *Steganographia* (sold, day 1).** He declines Walsingham's work: Walsingham −8 (**42**).
  The room cools, as the encounter text says. Home, **£11, day 7.**

### Days 7–60

- Saul joins ◊ and is posted to the Scrying Chamber. Six sessions ◊ over the next month.
  **Secrecy 75 → 57.**
- Roger is sent to hunt manuscripts in Oxford (Manuscript Knowledge, difficulty 9, £6,
  2 days each way † plus 4 days' work). **d10 = 2 + 6 = 8. Failure:** *found the chests
  already picked over.* **£5.**
- Jane carries a petition (£3). **d10 = 1 + 6 = 7. Failure.** Elizabeth 54. **£2.**
- *Money is short* fires. *Jane counts the purse and asks, without heat, which of the
  rooms he intends to eat.*
- Kelley arrives ◊; Saul leaves. Kelley's sessions ◊ continue: Secrecy −3 each.
- Day 45 ◊: *Forged letters in Dee's name* (documented: Vincent Murphyn's slanders, Parry
  87–109). Elizabeth −6, Scholar −10 ◊.
- Day 50, London: he sells Euclid (£4), the *Almagest* (£7) and Copernicus (£9). **£21.**
  The Library is now four books. Two days later the Soyga is still locked and the
  *Steganographia* is still £25.

### Days 60–150

| Day | Event | Money | Secrecy | Factions (top three) |
|---|---|---|---|---|
| 60 | Weather: Łaski arrives. He does not go to meet him. | £20 | 39 | Scholar 49, Elizabeth 48, Walsingham 47 |
| 62 | Scriptorium 0 → 1 (£12), *to copy the tables* | £8 | 39 | |
| 75 | Secrecy under 30: *the household is talked about* | £8 | 28 | |
| 90 | Weather: Puritan pressure. Elizabeth 45. Jane's second petition fails (£3) | £5 | 25 | |
| 95 ◊ | *A preacher names the conjurer of Mortlake* (an encounter offered while Secrecy is under 30). Elizabeth −8, Leicester −5, Scholar −4 ◊ | £5 | 22 | |
| 100 ◊ | Walsingham hears of the actions from his correspondents. Walsingham −8 ◊ | £4 | 22 | Scholar 41, Leicester 40, Walsingham 39 |
| 110 | Weather: calendar reform blocked. Scholar +5 | £4 | | |
| 130 | Weather: imperial ideology. Leicester 37. Two trips to London to look at the *Soyga* he cannot buy | £0 | 20 | |
| 135 | Fortune 0 + (Scholar 43, Walsingham 39, Leicester 37 = 119)/6 = **19.8** | £0 | 20 | |

> **DESTITUTE.** The bills are in Jane's hand and the creditors know the road to Mortlake.
> Nothing that matters has been lost yet. Most of it is on loan.

On day 140 a d10 errand returns £1 ◊. Day 150: Scholar has drifted to 41. Fortune
0.25 + (41 + 39 + 37)/6 = **19.75. Still Destitute.**

### Day 150 — the Continental Question

| Option | State |
|---|---|
| Remain in England | open (costs £10; he has £1) |
| Depart with Łaski | **locked**: he never met Łaski |
| Depart independently | **locked**: Continental 5 (needs 25; fifteen drift ticks at half rate), £30 |
| The Ottoman court [COUNTERFACTUAL] | **locked**: Ottoman thread 0 of 3 (he never owned the *Soyga*) |

One button. The narrator's line above the options: *Some careers end with a choice. This
one ends with the absence of one.*

He stays. The epilogue is the career-collapse text in `EXPOSITION.md`.

### What this run teaches

- **Selling a book sells its knowledge.** The *Steganographia* was the key to the *Soyga*
  and to Walsingham's money, and it went for £12.
- **Unmanned rooms are lost bonuses**, and the household tells you so.
- **Secrecy is the hull.** It does not end the game by itself (see the notes on what
  should), but the lower it goes, the more of the encounter list turns hostile.
- **Destitute is hard to reach, and that is deliberate.** At £0, the starting factions
  alone hold fortune at 28. To fall below 20 the three best factions have to average under
  40. The player has to lose friends as well as money.
- **Failure narrows the Question.** Every locked row at day 150 was locked by something the
  player did, or did not do, months earlier, and the screen names it.

---

## Systems coverage

| System | Where shown |
|---|---|
| Market buying, stock rolls, refresh | A (days 20, 50), B (1, 75, 142), C (1, 80) |
| Market selling, half value, Library 3 note | A (20, 50, 105), B (76, Prague 22), D (1, 50) |
| Prerequisite-locked books | C (*Dialexis*), D (*Soyga*) |
| Forbidden books costing Secrecy | B (*Soyga*), A (*Steganographia* used) |
| Unaffordable books | B (*Soyga* at £47), C (Laboratory) |
| Satchel packing and slot costs | A (0, 10), B (0), C, D |
| Emigration loss | B, C (packing and the letters from England) |
| Crew posting and manning | A (0), B (0), C (Kelley in the Laboratory), D (no posts) |
| Unmanned rooms | A (days 5, 71), D |
| Retinue standing in | B and C (Kelley at the Hradschin) |
| Errands, dice, success and failure | A (Jane ×6), B (Curtius), C (Kunstkammer), D (Oxford) |
| House tiers | A (mortlake_2, mortlake_3), B (hajek_2) |
| Fortune banners, rise and fall | A (16, 29, 105, 121), B (5, 10), D (135) |
| Weather track | all runs |
| Network drift | A (stopped), B (halved), D (halved, never fixed) |
| Ottoman signal | B (2 of 3, then 3 too late), A and D (0) |
| The Continental Question | all runs |
| Overcrowding | **not shown**: see the note to the orchestrator |
