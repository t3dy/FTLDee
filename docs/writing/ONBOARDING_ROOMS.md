# Onboarding — the household, rooms, crew and the house

Tutorial sequence for the Household and Upgrades screens. Text in **boxes** (the
`>` blocks) is the exact on-screen copy. The step's trigger and the element it points at
are given above each box. Tips ship through `COPY.tips` in `src/data/copy/index.ts`; the
step ids below match the tip ids there.

The tutorial is skippable at every step ("Skip the tour"), resumable from the Codex
("Show the tour again"), and never blocks input: each step waits for the player to do the
thing, not to click "Next".

---

## Part 1 — The household (first time on the Household screen)

### Step R1 · `tip-household-plan` · points at the house plan

> **This is Mortlake.**
> Dee's house by the Thames, drawn as a plan of rooms. Each room is a part of his working
> life: the Library, the Study, the Laboratory and so on. You will spend the game building
> these rooms up, putting people to work in them, and going out from here to the court,
> the City and the Continent.
>
> Rooms have levels from 0 to 3. The small marks in each room's corner show its level.

*Why it exists.* The household was Dee's institution. Sherman calls the Mortlake library a
living institution, and the laboratories, instruments and correspondence were the
equipment of a career that never got the endowment it asked for. The game treats the house
as the ship because it was what he had instead of an office.

### Step R2 · `tip-household-crew` · points at the crew tokens in the hall

> **Jane Dee and Roger Cooke.**
> The people of the house. Click a person, then click a room to put them to work there.
> A person posted in a room who is good at what that room is for (4 or more in one of its
> key skills) **mans** it, and Dee gets +1 in those skills while he is at home.
>
> Try it: put Roger in the Library.

Waits for: Roger posted to the Library.

> **Manned.** Roger's Manuscript Knowledge is 6. The Library's key skills are Manuscript
> Knowledge and Natural Philosophy. Dee gets +1 to both while he is at Mortlake, on top of
> the room's own bonus.

*Why it exists.* Dee's work was done by a household: his wife, servants, assistants and
scryers. The diaries are full of other hands. "Crew" in this game means people who make
an operation possible, not a party who fight beside him.

### Step R3 · `tip-household-unmanned` · after any room has a crew station free and a crew member idle

> **An empty room still works, at its level.**
> A room's level bonus applies whether or not anyone is posted there. Posting someone
> adds +1 if they know the work. Rooms you never staff are bonuses you are not taking.

### Step R4 · `tip-household-retinue` · points at the "Retinue" button

> **The retinue goes with Dee.**
> Click a person, then "Retinue". When Dee leaves the house, his retinue travels with him.
> On the road, when an encounter asks for a skill, the game checks Dee's skill **and** the
> best skill in his retinue, and uses the higher.
>
> The cost: a person in the retinue is not manning a room at home.

*Why it exists.* Dee did not go to Prague alone, and the scryer was the person who made
the actions possible at all. Some doors open because of who is standing beside you.

### Step R5 · tutorial-only (the short form ships as `tip-map-errand`) · after the first map visit; points at a crew token marked "at the base"

> **Errands.**
> From the map you can send someone who is at the house to do a job at another place: buy
> books in London, carry a petition to court, take deciphered letters to Barn Elms. They
> are gone for the journey there and back plus the days of work. When they return, the
> game rolls a ten-sided die and adds their skill. If the total reaches the errand's
> difficulty, it succeeds.
>
> The die is shown. The skill is theirs, not Dee's.

### Step R6 · `tip-household-quarters` · points at the Quarters

> **The Quarters hold the household.**
> At level 1 the house holds three people besides Dee. A scryer, a pupil or a guest takes
> a place. Over capacity, the household's stability falls each day and nobody gets their
> Focus back. Quarters 2 and 3 hold more and settle the house.

### Step R7 · `tip-household-focus` · points at the Focus counter in the HUD

> **Focus is Dee's working energy.**
> Long research and the actions with spirits spend it. The Study gives it back, a little
> each day he is at home: 1 a day at level 1, 2 at level 2, 3 at level 3.

---

## Part 2 — Upgrading a room (first time on the Upgrades screen)

### Step R8 · `tip-upgrades-cost` · points at the first room card's upgrade button

> **Building costs money and days.**
> Each room card shows the next level: what it costs, how many days the work takes, and
> what it gives. Some levels need a skill or an instrument first, and the card says which.
>
> Days spent building are days the sector clock moves.

### Step R9 · `tip-upgrades-bonus` · after the player opens any room card

> **What the levels give.**
> Level 2: +1 to the room's key skills while Dee is at home.
> Level 3: +2.
> A posted crew member who knows the work: +1 more.
>
> Some rooms do something else as well. The Library at level 1 makes every book on its
> shelves usable at home; at level 3 your books sell for their full value. The
> Correspondence room slows, then stops, the drift of your distant friendships.

### Step R10 · `tip-upgrades-cap` · when the player looks at a level-3 upgrade at tier 1

> **The house sets the ceiling.**
> At Mortlake as it stands, no room can go above level 2. To build any room to level 3, the
> house itself has to be enlarged first. That needs money and **fortune**: standing at court
> and in the networks, plus cash in hand.

### Step R11 · `tip-upgrades-scrying` · when the player first views the Scrying Chamber card

> **The Scrying Chamber is built from what the angels asked for.**
> Level 1 needs a show-stone. Level 2 needs the Sigillum Dei. Level 3 needs the Holy
> Table. You can buy a show-stone. The rest is dictated in the actions.

*Why it exists.* Whitby 141–145: the Holy Table, the seals under its feet, the Sigillum
at its centre and the stone on top were all specified in the sessions, in order. The room
is literally assembled from the instructions it receives.

---

## Part 3 — The house tiers (first time the house panel unlocks)

### Step R12 · `tip-house-tier` · points at the house panel on the Upgrades screen

> **The house can grow.**
> When Dee's fortune is high enough, the house itself can be enlarged. A bigger house lets
> rooms go to level 3 and gives every room one more working place.
>
> Fortune is not money alone. It is cash in hand **and** the standing of your three
> strongest friendships. Spending money lowers it. Expect a fall the day you pay the
> builders.

### Step R13 · `tip-house-counterfactual` · when the royal foundation first becomes visible

> **This one did not happen.**
> The third tier, *a royal foundation at Mortlake*, is marked COUNTERFACTUAL. Dee spent
> decades asking the Crown for an endowed position and never received one. The game lets
> you win the argument he lost, and says so on the card and in the epilogue.

---

## Reference: rooms, what they are for, and why they are in the game

| Room | Key skills | Starts at (Mortlake) | What it does | Why it is here |
|---|---|---|---|---|
| Library | Manuscript Knowledge, Natural Philosophy | 2 | Level 1: every owned book usable at home. Level 3: books sell at full value. | Nearly four thousand items, a quarter of them manuscripts (Whitby 36–39); Dee listed it in 1583. |
| Study | Mathematics, Rhetoric | 1 | Restores 1/2/3 Focus a day at home. | The daily work recorded in the diaries: reading, calculating, writing. |
| Scriptorium | Cryptography, Languages | 0 | Level 1: copy a manuscript for sale. | Letter tables, cipher, the copying that made the library circulate (Whitby 133–138). |
| Correspondence | Courtly Intelligence, Languages | 1 | 1: drift halved. 2: no drift. 3: errands gain +1 faction. | Letters through his agent in Antwerp; the network was the career (Clulee). |
| Laboratory | Alchemy, Medicine | 1 | Alchemical work possible at home. | Three laboratories at Mortlake, despoiled while he was abroad (Sherman; Whitby 52–54). |
| Scrying Chamber | Occult Philosophy, Kabbalah | 0 | Level 1: scrying sessions possible. | The actions with spirits, from 1581 (Whitby 42–44). |
| Instrument Room | Astronomy, Navigation, Cartography | 2 | Observation at home; consultations proved, not argued. | Mercator's globes and the Frisius ring and staff (Whitby 32–36). |
| Quarters | none | 1 | Holds 2 + level people besides Dee; levels 2 and 3 restore stability. | The household itself. |

Hájek's house in Prague has no Scriptorium and no Instrument Room. Its Laboratory is
Hájek's own study, where alchemical work was done (Sherman 81–85), and its Library is the
travelling chest.

---

## Part 4 — Map, encounter and Codex tips

These ship in `COPY.tips` alongside the steps above. They are shown once each, the first
time the player opens the screen or meets the situation.

| Tip id | Screen | Title | Body |
|---|---|---|---|
| `tip-map-travel` | map | Every journey costs days | Click a place to travel there. The line between places shows the days and the cost. Dee takes the satchel and the retinue; everything else stays at home and stops counting until he is back. |
| `tip-map-weather` | map | The weather track | The bar along the top is the political weather. Each marker is a change coming on a fixed day: an arrival, a sermon, a reform refused. Pressure rises a little every day. Plan to be ready before the marker, not after it. |
| `tip-map-errand` | map | Errands | Places with a job on them show a small seal. Send someone who is at the house: they are gone for the journey both ways plus the work. On return the game rolls a d10 and adds their skill against the errand's difficulty. |
| `tip-map-access` | map | Some doors need standing | Richmond needs the Queen's goodwill, Windsor more of it, Barn Elms Walsingham's. A greyed place tells you which faction and how much. |
| `tip-encounter-retinue` | encounter | Your retinue counts | If someone travelling with Dee has a higher skill than he does, a choice that asks for that skill uses theirs. The label names who opened it. |
| `tip-encounter-status` | encounter | What actually happened | Where the record says what Dee chose, that choice is marked documented. The others are plausible or counterfactual. You can take any of them; the epilogue will say which one the record has. |
| `tip-codex-cards` | codex | Everything is a card | Rooms, books, instruments, people, places, errands, factions, skills and weather are all cards. The Codex lets you read every one, including the ones you have not met yet. |
| `tip-codex-status` | codex | Every card says whether it happened | Documented: in the record. Plausible: consistent with it but not recorded. Contested: scholars disagree, and the card says how. Counterfactual: it did not happen, and the game is showing you a road not taken. |
| `tip-codex-sources` | codex | Sources | The small type at the foot of a card names the scholarship it rests on, with page numbers. Short forms: Parry, Harkness, Sherman, Whitby, Szőnyi, Håkansson, Clulee. |

The book-related steps (B1–B11) are in `ONBOARDING_BOOKS.md`.