# MECHANICS FROM BIOGRAPHY
### How John Dee's actual life choices become FTLDee's systems

**Purpose.** This document maps Dee's documented biographical choices — what he
actually did, bought, studied, and navigated — onto the game's mechanical systems:
skill tree, household rooms, book progression, and encounter gating. The game should
feel like *Dee's choices made again*, not a generic RPG with historical flavour text.

**Source discipline.** Everything here traces to `DEE_MASTER_BIOGRAPHY.md` or
the `DeeChunks` corpus. Counterfactuals are marked COUNTERFACTUAL.

---

## The Central Design Principle

**The player is choosing what kind of intellectual courtier to be.**

In Dee's actual career there is a through-line: he is always trying to be useful to
power in a way that his particular knowledge makes possible. But the *shape* of that
usefulness shifts across his life, and the shifts are his choices:

1. **1550s**: Mathematical technologist. Euclid, instruments, navigation.
2. **1560s**: Universal philosopher. *Monas* synthesis, imperial clients.
3. **1570s**: Political adviser and imperial geographer. Naval programme, national projection.
4. **1580s**: Eschatological operator. Angelic sessions, the Ottoman thread.

Each phase requires investments from the previous one. The player who skips the
mathematical phase cannot reach the imperial phase. The player who skips the political
phase cannot gate the angelic phase with any useful contacts.

---

## I. SKILL TREE — Structured from Dee's actual intellectual progression

The skill tree is not flat. It has three **branches** reflecting the three kinds of
authority Dee cultivated:

```
MATHEMATICAL AUTHORITY          POLITICAL AUTHORITY         OCCULT AUTHORITY
━━━━━━━━━━━━━━━━━━━━━━━━━━      ━━━━━━━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━━━━━━

mathematics (gate skill)        rhetoric (gate skill)       naturalPhilosophy (gate)
    │                               │                           │
    ├── astronomy                   ├── courtlyIntelligence     ├── alchemy
    │      │                       │       │                    │      │
    │   astrology                  │   cryptography             │  occultPhilosophy
    │      │                       │       │                    │      │
    │   cartography                │   languages                │  kabbalah
    │      │                       │                            │      │
    │   navigation                 └── (feeds                   │  theology
    │                                   manuscript-             │      │
    └── manuscriptKnowledge             Knowledge)              │  (unlocks angelic
        (cross-branch)                                          │   encounters)
                                                                │
                                                           medicine
                                                           (standalone)
```

### Progression rules derived from the biography

**Mathematics → everything.** Dee's Louvain period (1548–50) with Gemma Frisius and
Mercator is the foundation. He cannot access the *Almagest* without geometry. He cannot
do astronomy without the *Almagest*. He cannot do cartography without astronomy. The
tree is already coded; the point is that the *sequence* mirrors his actual life.

**Rhetoric unlocks court navigation.** Dee gets the Elizabeth assignment (1558–59)
because he has standing. The player cannot access the `elizabeth_coronation_date`
encounter (Encounter Candidate #4) without `rhetoric ≥ 5` AND either `astronomy ≥ 6`
or `astrology ≥ 6`. That is the historical constraint: he is useful because he can
*both read the heavens and present the answer convincingly*.

**OccultPhilosophy is the inflection point.** Dee does not pursue angelic communication
until *after* his position is secure (1580–81). In the game, this means the player
who maxes occultPhilosophy early burns too much `focus` without the faction
relationships to protect them. The Barnabas Saul encounter (#7) fires only when
`occultPhilosophy ≥ 6` AND `secrecy ≥ 40` AND the player has not burned `religiousAuth`
below 20. This is the historical tension: the angelic project is eschatologically urgent,
but politically dangerous if launched without protection.

**Kabbalah gates the Ottoman thread.** M-K's argument is that the Bunian-Bistamian
corpus is recognisably kabbalistic to anyone trained in it. The player cannot read
the `ottoman_thread_open` signal without `kabbalah ≥ 5` AND `languages ≥ 6`. Dee
himself struggled with the Soyga tables; the player's `kabbalah` level determines
how much they can decode.

---

## II. HOUSEHOLD ROOMS — The FTL "ship modules"

### What the rooms represent historically

Dee's Mortlake household was the largest private library in England. It was not just
a storage space; it was *the infrastructure of his practice*. Sherman's thesis: the
library is a working institution, not a monument.

The rooms in `HouseholdState` map directly to phases of Dee's investment history:

| Room | Historical basis | What it unlocks |
|---|---|---|
| **library** | The Mortlake library, acquired piecemeal from 1548 onward. By 1583, 4,000 volumes. Partially ransacked 1583. | Book capacity (shelf limit without library is 15; with it, no limit). Scholarly encounter variants. `scholarNetwork` faction events. |
| **study** | Dee's working space for correspondence, charts, and consultation. | Correspondence encounters. `courtlyIntelligence` uses. Petition writing. |
| **laboratory** | Alchemical work. Dee had a laboratory; it was never the centre of his practice but served continental credibility. | Alchemy skill usability. `chemicalOperations` encounters. Paracelsus book ops. |
| **scryingChamber** | The dedicated ritual space for angelic communication, set up December 1581. Kelley's shewstone. | Angelic encounter series. Barnabas Saul → Kelley chain. Book of Soyga decryption. `scrying_begun` flag. |
| **instrumentRoom** | Globes, surveying instruments, navigational charts — many acquired at Louvain. | Navigation consultation ops. Cartography commissions. Walsingham/navy encounters. |
| **correspondence** | A secretary and a regular correspondence network. Dee's letters went to Prague, Paris, Kraków. | Continental contacts. `continentalCourts` faction. Access to book trades. |
| **quarters** | Staff housing. A household of servants and students. | Stability resource. Household events (staff loyalty, theft, illness). |

### Room investment mechanics

**Each room costs money to establish and time to maintain.** In FTL terms:

- `library`: £20 to stock, £2/period to maintain. Every unspent £ that could have
  bought a book was Dee's actual historical choice (he was often in debt doing exactly this).
- `laboratory`: £30 to set up. The player who skips this cannot pursue the
  `chemicalOperations` wing of encounters. Historically accurate: Dee ran alchemical
  experiments, though never profitably.
- `scryingChamber`: £15 + requires `occultPhilosophy ≥ 5`. Fires the `scrying_begun`
  flag, which is the prerequisite for the entire Act V encounter chain. This is the
  point of no return for the angelic path.
- `instrumentRoom`: £25 + requires `astronomy ≥ 5`. Without it, navigation
  consultations produce only money; with it, they also produce `walsingham` faction
  points (because Walsingham was funding the northern voyages programme).
- `correspondence`: £10/period (secretary salary). Without it, continental contacts
  decay. With it, `continentalCourts` faction events fire. Gate for the Ottoman arc
  ($$$\to$ contacts who know the Ottoman court$$$).

### Room interaction — the combinatorial core

The design equation `BOOK + SKILL + CONTACT + PATRON = OPERATION` extends to:

`BOOK + SKILL + ROOM + CONTACT + PATRON = ENCOUNTER_BLUE_OPTION`

Examples from Dee's actual biography:

| Encounter | What you need | Why |
|---|---|---|
| "Advise Frobisher's third voyage" | navigation ≥ 7, instrumentRoom, Book Field Ephemeris | Dee actually consulted on Frobisher's voyages. He needed instruments to demonstrate, not just know. |
| "The Soyga tables" | scryingChamber, kabbalah ≥ 5, book_soyga | The decoding work happened at the scryer's table, not in the library. |
| "Commission from Rudolf II's court" | laboratory OR scryingChamber, continentalCourts ≥ 40, correspondence | Rudolf wanted both alchemical and angelic operators. Either room qualifies; both together make the commission much more generous. |
| "General and Rare Memorials — petition to Cecil" | study, mathematicalPreface book, leicester OR burghley ≥ 40 | The petition was a written document. It needed the study (correspondence infrastructure), Dee's own Preface as a credibility marker, and a patron willing to transmit it. |

---

## III. BOOKS AS PROGRESSION — The FTL weapon-buy model

### The analogy

In FTL you buy weapons at beacons. They change what you can do in fights.
In FTLDee you acquire books at markets, courts, and from contacts. They change
what encounters you can resolve and how.

The difference from FTL: **books are not fungible**. A laser doesn't care about
your other weapons. A book in the Dee model *combines* with other books to open
operations. Owning the *Almagest* without Euclid is a locked chest.

### Book progression tiers (derived from the biography)

**Tier 1 — Foundation (starting library)**
These are Dee's pre-1580 acquisitions. The player starts with them.
- Euclid / Billingsley: the credential
- Ptolemy *Almagest*: the technical base
- Agrippa *De occulta*: the occult framework
- Trithemius *Steganographia* (MS): the secret communication layer
- Dee's *Mathematical Preface*: reputation capital, not knowledge
- Dee's *Monas*: symbolic synthesis (requires both branches to use fully)
- Paracelsus selected: medical / alchemical complement
- Copernicus *De revolutionibus*: mathematical utility, cosmological controversy

**Tier 2 — Mid-game acquisitions (1580–82 window)**
These are what Dee was actively acquiring and studying when the game opens.
- John Field *Ephemeris*: low cost, unlocks instant astrological services
- Roger Bacon *Epistola*: experimental philosophy credential; gates a `philosopherMage` track
- Ramon Llull *Ars Magna* (MS): the lettrist/combinatorial logic behind the Enochian system; gates kabbalah ≥ 5 progress
- Ficino *De vita* (Three Books of Life): Neoplatonic magic; opens `scholarNetwork` encounters
- Pico *Conclusiones* (MS): the kabbalistic tradition direct; prereq for the Ottoman thread

**Tier 3 — Late-game / high-risk (1582+)**
These are the dangerous acquisitions. Each one has a cost beyond money.
- *Book of Soyga*: unique, £50, censorshipStatus: forbidden. Gates the angelic series AND begins the Ottoman thread. Acquiring it costs `secrecy -15`.
- *Mysteriorum Libri* (Dee's own records): not purchased but *created* — a new type. The player can spend focus to write it, which records what has happened and creates a cryptic but politically dangerous document.
- *De Heptarchia Mystica* (Dee's own): same model — created, not bought. Gates the Heptarchic ritual system and the late angelic arc.
- Bunian-Bistamian corpus (MS, via Ottoman contact): COUNTERFACTUAL. Available only after `ottoman_thread_open` flag is set. Costs `continentalCourts` contact + £80 + `languages ≥ 6`.

**Acquisition model**

Books are acquired at:
- **Booksellers** (London, Frankfurt fair, Antwerp): common and uncommon only; money cost
- **Scholar network**: rare; costs `scholarNetwork` faction points + a contact
- **Court rewards**: uncommon/rare; patron-gated
- **Own writing** (Dee was a prolific writer): costs time + focus; produces reputation
- **Confiscation recovery** (if library ransacked): a crisis encounter that can recover specific volumes

**Portability mechanic**
`pocket` books travel with Dee always. `portable` require a saddlebag slot. `large` and `fixed` books stay at Mortlake. If the player travels without returning to Mortlake for a long period, they cannot access `large`/`fixed` books for those operations. This is the Mortlake dependency — Dee's home was both his greatest resource and his greatest vulnerability.

---

## IV. ENCOUNTER CONSEQUENCE SYSTEM — Prior investments as hidden gates

### The FTL blue option model extended

FTL's blue options reward prior investment — "Crew member with engineering training."
FTLDee extends this to **five categories of prior investment**, each of which can
modify encounters:

1. **Books** — you own the relevant text
2. **Skills** — you have trained to the required level
3. **Rooms** — the household infrastructure exists
4. **Contacts / faction** — the relevant relationship is high enough
5. **Flags** — a prior narrative choice set a world-state bit

The historical logic: Dee's success in any given consultation depended on all five. His failure at the Manchester wardenship was not a single factor failure; it was a compound failure of faction relationships, timing, and the reputational damage from the continental period.

### Encounter map: what each major encounter requires

**Encounter: Elizabeth's Coronation Date (1558–59)**
- Choice A (give a safe date): rhetoric ≥ 3 only → money +20, elizabeth +10
- Choice B (give the astrologically optimal date — Dee's actual choice): astronomy ≥ 6 AND astrology ≥ 5 AND study room → money +30, elizabeth +20, scholarNetwork +10
- Blue: "Propose a full electional analysis" (astronomy ≥ 8, astrology ≥ 7, Almagest, Field Ephemeris, study room): elizabeth +40, leicester +15, reputation event fires

**Encounter: Monas Hieroglyphica reception (1564)**
- Choice A (deflect — "it is a symbolic exercise"): rhetoric ≥ 5 → money +5
- Choice B (argue the alchemical reading): alchemy ≥ 5 AND dee_monas book → scholarNetwork +15, laboratory room gives +5 more
- Choice C (argue the kabbalistic-mathematical reading): kabbalah ≥ 5 AND mathematics ≥ 7 AND dee_monas book → continentalCourts +20, elizabethan -5 (too esoteric for court)
- Blue: "Demonstrate the disciplina noua to Maximilian's ambassador" (ALL of: mathematics ≥ 8, kabbalah ≥ 6, dee_monas book, continentalCourts ≥ 30, correspondence room): triggers a prestige event that opens Rudolf path

**Encounter: General and Rare Memorials petition (1576–77)**
- Choice A (submit as written): rhetoric ≥ 5 → leicester +10, burghley +5
- Choice B (frame as navigation programme): navigation ≥ 6 AND instrumentRoom AND cartography ≥ 5 → walsingham +20, burghley +15, elizabethan +10
- Choice C (frame as imperial programme): mathematics ≥ 7 AND dee_mathematical_preface AND leicester ≥ 40 → leicester +30, continentalCourts +10, `imperial_britain_flag` set
- Blue: "Provide a full cartographic demonstration" (navigation ≥ 8, cartography ≥ 7, instrumentRoom, Dee Mathematical Preface, walsingham ≥ 40): walsingham +40, triggers naval commission encounter chain

**Encounter: Barnabas Saul — first scryer (December 1581)**
- Cannot fire without: occultPhilosophy ≥ 5 AND (scryingChamber OR study room)
- Choice A (observe, don't commit): secrecy +5, occultPhilosophy +1 progress
- Choice B (conduct a formal session): scryingChamber room required → `scrying_begun` flag, occultPhilosophy op unlocked
- Choice C (dismiss Saul as unreliable): secrecy +10, closes the Barnabas chain, opens the "wait for a better scryer" path (Kelley arrives sooner)
- Blue: "Consult the Book of Soyga at the session" (book_soyga, scryingChamber, kabbalah ≥ 5): `soyga_session_one` flag set — this is the first Ottoman thread signal

**Encounter: Edward Kelley arrives (March 1582)**
- Fires whether or not Saul was dismissed; cannot fire if `scrying_begun` flag is NOT set
- Choice A (turn him away): secrecy +10; Kelley never joins; angelic path much harder
- Choice B (employ him as scryer): `kelley_employed` flag; new household member; secrecy -10
- Choice C (test him rigorously first): courtlyIntelligence ≥ 5 → Kelley joins with `kelley_tested` flag which gives reliability modifier on future sessions
- Blue: "Run a full Heptarchic trial session" (scryingChamber, occultPhilosophy ≥ 7, kabbalah ≥ 5, dee_monas book, Harkness framing active): `kelley_heptarchy_confirmed` flag; unlocks De Heptarchia Mystica creation encounter

---

## V. HISTORICAL PLAYTHROUGH — What Dee actually did

This section maps the historical record to the game as a "canonical run" — the
choices Dee made. It serves as a reference for what should feel natural.

### Dee's actual choices by phase

**Formation phase (pre-game)**
- Invested deeply in mathematics and astronomy (Louvain period)
- Acquired instruments: globes, armillary sphere, surveying tools
- Built continental contacts: Frisius, Mercator, Postel
- Accumulated a starting library that no English scholar could match
- *Design note*: the player starts with all of this. Dee's formation is backstory.

**The Mortlake investment (1570s)**
Dee's major strategic choice: not an office, not a court position, but a household.
The library was his productive base. Sherman's thesis: this was political as well as
intellectual — the library as a resource for patrons, not just for himself.
- Invested in: library expansion, study/correspondence, instrumentRoom
- Skipped: laboratory (until later), scryingChamber (until 1581)
- *Game consequence*: a player following the historical path would have high
  `scholarNetwork` and `walsingham`/`leicester` faction, with a strong book base
  but moderate `alchemy` and zero angelic infrastructure until Act IV.

**The patronage navigation (1576–80)**
The *General and Rare Memorials* was Dee's attempt to leverage the navigation boom
into a permanent position. It failed to get him the Mastership of St. Cross he wanted.
Parry: Dee's mistake was failing to understand how exposed he was to rivals.
- The Prestall rival encounter is the in-game version of this exposure
- Navigation + Walsingham is the strong path; Leicester + imperial is risky but more
  rewarding if it works (leads to Prague/Rudolf path later)

**The angelic decision (1581)**
This is the game's key decision point: why does Dee start the angelic sessions when
he does? Harkness's answer: eschatological urgency (the world is ending and he needs
an Adamic key before it does) meets a failure of conventional patronage (the offices
haven't come). The player who has high faction relations with the Elizabethan court
has LESS reason to turn to angels. The player who has been shut out, or who has
invested heavily in occultPhilosophy but not in court rhetoric, has more reason.
- *Mechanical consequence*: the scryingChamber investment is most natural when
  courtly paths have been partially blocked or when occultPhilosophy is high relative
  to rhetoric/courtlyIntelligence.

**The Ottoman thread (1582–)**
M-K's argument: the Soyga work and the Bunian-Bistamian corpus are the same intellectual
move. The Ottoman thread is not a detour from the angelic work; it IS the angelic work
read through a different lens.
- The player who has: kabbalah ≥ 5, book_soyga, languages ≥ 6, scryingChamber, AND
  at least one continental contact will begin reading the Ottoman signals in the
  Enochian material.
- The player who does NOT have these will complete the angelic path as an English
  Protestant eschatology, which is the historical trajectory (Dee stayed in England until 1583).
- The COUNTERFACTUAL is: what if he had followed the thread east?

---

## VI. IMPLEMENTATION NOTES

### What already exists in `types.ts`

The schema is well-suited. The key additions needed:

1. **Rooms as investable modules** with upgrade levels (currently they are booleans;
   should be `0 | 1 | 2` to allow partial/full investment — a small library vs. the
   4,000-volume Mortlake library)
2. **Book prerequisites enforced at acquisition** — currently books have `prerequisites`
   fields but there is no enforcement. The bookseller encounter should check them.
3. **Encounter outcome scaling** — outcomes currently produce flat numbers. They should
   scale with the player's relevant skill (a rhetoric ≥ 8 choice should pay better
   than rhetoric ≥ 5).
4. **Portability-based availability** — `large` and `fixed` books should only appear in
   encounter requirements if `currentLocationId === 'mortlake'`. Needs a utility function.
5. **Flag accumulation for the Ottoman thread** — the `ottoman_thread_open` flag should
   accumulate through multiple small encounters rather than triggering at once. Suggest
   an `ottoman_signal_count` counter (0–5) that increments at each relevant signal and
   triggers the path at 3+.

### Priority build order for the next session

1. **Rooms upgrade model** (0/1/2 levels) + room investment encounter at Mortlake
2. **Book prerequisites enforcement** at acquisition (bookseller encounter)
3. **Portability check utility** (`bookAvailableAt(book, location): boolean`)
4. **Encounter outcome scaling** by skill level (simple multiplier)
5. **Ottoman signal counter** replacing the single `ottoman_thread_open` flag
6. **Three new encounters**: Frobisher consultation (uses instrumentRoom), Monas reception
   (uses the three scholarly positions), General and Rare Memorials (uses navigation/study)
