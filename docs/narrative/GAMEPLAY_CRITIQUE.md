# Critique: the four gameplay examples as Dee's story

A read of `docs/writing/GAMEPLAYEXAMPLES.md` (Runs A–D), written 2026-10-03, against the
data on disk that day: `src/data/encounters/england_events.ts` and `prague.ts` (new since
my first pass), `factions/weather.ts`, `characters`, `books`, `locations` and
`copy/index.ts`. The question is not whether the runs are good tutorials. It is whether the
mechanics, played as shown, tell Dee's career, with its reversals, or tell a generic RPG
climb with Dee's name on it.

**[record]** = sourced (corpus pages). **[inference]** = my judgement.
Companion reports in this folder: ARC_REPORT, ROOMS_AND_HOUSE_AS_STORY, CREW_AS_CHARACTERS,
BOOKS_AS_STORY, PRAGUE_AND_OTTOMAN, PROPOSED_MECHANICS_TWEAKS, ACCURACY_FLAGS. I don't repeat
them here. The spy thread is pointed at, not researched; deep work belongs to
`research/espionage/`.

---

## 0. Before anything else: the runs are played on stale data

The examples were written before the fixes now in the code. Several key beats would not
happen today:

| Run | Beat in the doc | Current data | Effect |
|---|---|---|---|
| all | Dee Rhetoric 7, Occult Phil. 8, Kabbalah 6, Courtly Int. 6 | `characters/index.ts`: 6, 7, 5, 5 | **Run A's Windsor synthesis** (needs Rhetoric 7 away from home) no longer unlocks. Run B's "Courtly Intelligence 7 at home" becomes 6. |
| all | Jane: Manuscript 4, Languages 3; Roger: secretary, Library post | Jane: Manuscript 3, Medicine 4; Roger: alchemist, starts in the Laboratory (`state.ts:44`) | The day-0 postings in A and B differ from the default. |
| all | Weather: Łaski 60, Puritans 90, calendar 110, imperial 130 | Puritans 45, Łaski 100, imperial 125, calendar 130 (and calendar now gives Burghley **+2**) | Run A's whole plan ("Burghley was going to lose 13 by day 130, so build on day 106") is built on a schedule that no longer exists. |
| A, B, D | *Book of Soyga* in the Paul's Churchyard roll | Removed from `LONDON_BOOKS`; **no event in `src/data` grants it** (no `booksGained: ['book_soyga']` anywhere) | B's and D's Soyga plots cannot happen. See §3, H1. |
| B, D | Show-stone bought at the market for £18 | Not sold any more; it comes from `saul_first_scryer` | B's opening (day 1 purchase) and D's are gone. |
| C | Kelley hired for the furnace "around day 35", no Saul, no chamber | `kelley_arrives` requires `scrying_begun` | **Kelley never arrives in Run C.** The run's central figure is unreachable. |
| B | "Letters from England" at Prague day 30 | Now a Kelley vision on Prague day 1 | Stale. |

**Recommendation.** Re-play all four runs against the current data before the examples feed
onboarding. The next three sections critique the *design intent* the runs show, which is
still worth judging.

---

## 1. Run by run

### Run A — the Mathematician-Courtier (stays; builds the royal foundation)

**Where the mechanics carry the story.**
- *The satchel decides the audience.* Both Richmond blue options are locked because the
  *Preface* and *Monas* are on the shelf. That is Dee's real dependence on Mortlake, taught by
  play. Strong.
- *The fall banner as receipt.* Building `mortlake_2` drops fortune from Favoured to
  Comfortable: "the house is bigger than the income". This is the nearest the run comes to
  Sherman's thesis, and it comes from the system, not the prose.
- *Useful and incriminating.* The Trithemian cipher pays £20 and costs 8 Secrecy, and "the
  household now holds a little less of its own counsel." Parry's paradox, felt.

**Where it reads as generic optimisation.**
- **Petitions are an ATM.** Jane carries six petitions. Five succeed, each worth £6 plus
  Elizabeth and Burghley points. Elizabeth climbs from 55 to 93. The record's Dee petitioned
  for decades and was well received and not paid. In this run the petition loop is the engine
  that buys the counterfactual. [inference] This is the run's main narrative failure. The
  mechanic tells the opposite of the thesis it was built to carry. (Fix: P1.)
- **The counterfactual is a grind target.** By day 106 the player has bought the institution
  Dee never got, by farming Deptford ◊ and selling copies. The doc is honest about the status
  ("This did not happen"), but the *behaviour* says the grant was a matter of effort.
- **The weather is out-planned.** "Weather has a schedule. Burghley was going to lose 13 by
  day 130. The foundation was bought on day 106 for that reason." The player reads the future
  off the track and beats it. Dee's reversals (Parry) were turns he did not see coming:
  1553, 1555, 1558, and in this period the 1583 calendar and the Łaski affair. A track that
  shows exact magnitudes lets the player escape the very thing that made Dee's career. (Fix: P2.)
- **Selling *Monas* and *Preface* to cross a threshold.** "He sold his own two books to afford
  the institution that was meant to house them. The game does not comment." The line is good
  prose about a bad incentive. Fortune counts cash at par, so a man's own works become change
  to cross a banner line. [inference] Dee's own books should be unsellable, or count for
  standing rather than cash.

**Spy thread.** The run takes Walsingham's money once and leaves it. Barn Elms appears as a
cash node, not a relationship that watches back.

### Run B — the Angelic route to Prague

**Where the mechanics carry the story.**
- *The apparatus as a build path:* show-stone → Sigillum → Holy Table, each gating a room
  level, each costing Secrecy. The room the angels designed is legible.
- *Straitened for a crystal:* "The money has gone into a crystal and a table. Jane has
  noticed." The system produces the fall; the prose names the cost. Good pairing.
- *Retinue stands in:* Kelley's Alchemy opens "Speak of the Stone" at the Hradschin. That is
  Parry's mechanism (Kelley's value to the court outgrowing Dee's) appearing in a skill check.
- *Packing is the loss:* the emigration screen is the best scene in the document.

**Where it reads as optimisation or artefact.**
- **"The Ottoman door was shut by the builders' bill, not by the angels."** It reads as
  meaning, but it is a side effect of counting *Scrying Chamber completion* as an Ottoman
  signal (see PRAGUE_AND_OTTOMAN, last section). Neither the record nor Melvin-Koushki ties the
  Ottoman thread to a furniture upgrade.
- **The household on the road is two people.** Jane and Kelley go in the retinue. The children
  and Joan Kelley are absent, Roger is "left posted in the Library", and the doc admits
  "Overcrowding: not shown". The documented emigration is the one moment the Quarters system
  was built for. (Fix: P3.)
- **Prague is a shopping list.** Days 22–120 are consultations ◊ for money, two chamber
  upgrades and a house move. The narrowing Ted wants (the wall of Curtius, the nuncio's net,
  the angels' demands escalating) is present only as scheduled notices. The Curtius errand
  failing once is the only Prague reversal the systems produce.

### Run C — the Alchemist who packs for Rudolf

**Where the mechanics carry the story.**
- *Kelley as two crew members:* "in the Laboratory he is a furnace; in the retinue he is the
  reason the Emperor will listen." The clearest expression anywhere of Parry's Kelley.
- *Prerequisites follow the books:* *Dialexis* is locked in Prague because the *Almagest* and
  Copernicus stayed at Mortlake. "The packing decision of day 150 has come back as a locked
  card in Prague." The best example of the satchel making a story without text.
- *The globes:* worth £30, cannot travel, cannot be sold, listed among the 1583 losses (Whitby
  67–70). The player chooses to keep them for thirty days of bonus and lose them. This is
  exactly right.
- *Speak of the Stone* is tagged plausible, with the epilogue promising to say what the
  record has. That is the honesty layer working.

**Problems.**
- **Hiring Kelley for the furnace is not the record.** He came as a scryer (8 March 1582) and
  his alchemy grew in value later, mostly abroad. The run treats the late-1580s Kelley as the
  1582 hire. Either tag the route "[Contrary to the record]" at the hire, or keep the current
  gate (`scrying_begun`) and let the Alchemist route reach Kelley through one reluctant action.
  Today it simply cannot reach him (§0).
- **Continental standing farmed "after day 60" from "Łaski's circle".** Łaski came in May
  1583 (ARC_REPORT §5 places that at about day 138). Consultations for his circle across 90
  days misplace him by a year.

### Run D — the failing career

**Where the mechanics carry the story.**
- *Selling a book sells its knowledge.* Selling the *Steganographia* locks both the Soyga
  (`angelicLanguage`) and Walsingham's cipher work. BOOK + SKILL as combinatorial, felt as loss.
- *Destitute needs lost friends, not just lost money.* "The player has to lose friends as well
  as money." This is Pumfrey's Dee (liked, unfunded) seen from below.
- *Failure narrows the Question*, and the day-150 screen names each locked row's cause.
- *Murphyn's forgeries* ◊ (Parry 87–109) as an event, and *a preacher names the conjurer of
  Mortlake* ◊ under low Secrecy. These are the right kind of reversal: reputation as something
  done *to* you.

**Problem.** The failure is the player's incompetence: no postings, the key book sold on
day 1, the Soyga chased with no money. Dee's real failures came from doing things *well* at
the wrong moment. A failing run that teaches the career would be a competent run broken by
a turn of the court (Parry) and by promises unpaid (Sherman). [inference] Keep Run D as the
tutorial for bad play, and add a fifth run, "the Good Servant", which does everything right
and is still Straitened at day 150.

---

## 2. Twists and turns

### Reversals the systems actually produce

| Reversal | Produced by | Runs |
|---|---|---|
| Fortune falls after building | fortune formula counting cash | A (×2), B |
| Errand failure | d10 + skill vs difficulty | A (petition day 70), B (Curtius), D (Oxford, petitions) |
| Satchel lockout | portability, slots | A (Richmond), C (*Dialexis*) |
| Emigration loss | `travels: false`, shelf left behind | B, C (globes) |
| Scryer replaced | "Saul leaves when Kelley is hired" | B |
| Prerequisite collapse | selling a tag-bearing book | D |
| Secrecy erosion → hostile events | Secrecy thresholds | D |
| Weather shifts | fixed track | all, but out-planned in A |

### Reversals supplied only by the prose

- Jane "has noticed" / "says nothing until supper, and then a good deal" (no meter moves).
- "The game does not comment" on selling *Monas* and *Preface*.
- Kelley's growing value to the court (stated in "what this run teaches", not tracked).
- The Ottoman door "shut by the builders' bill" (an artefact given meaning).
- "Dee writes in the margin of his almanac..." (a fabricated record entry; see §3, H2).

### Documented reversals still missing

From my first pass, checked against the current data:

| Reversal | Record | In the data now? |
|---|---|---|
| **Roger Cooke asks leave, 5 Sept 1581** | Fenton 26–28 | **Not found.** No `crewLeaves: ['roger_cooke']` or Cooke event in `src/data` or `src/systems` (grep, 2026-10-03). The coordinator reports it as applied; it may not have landed. |
| **Kelley enters by denouncing Saul**, 9 Mar 1582 | Whitby 56–58 | No. `saul_confesses` and `kelley_arrives` are separate; the denunciation is absent. |
| **Jane's rage**, 6 May 1582 | Whitby 24–26; Harkness 35–37 | No. |
| **Fromond's £400 loan and the 6 Sept 1583 catalogue** | Parry 191–193; Whitby 1031–1034 | No. Departure is still a cut. |
| **The family emigrates** (and joins in Prague in Dec 1584) | Fell Smith 64–65; Whitby 46–48 | Text fixed (B1), but no system moves the children or Joan Kelley, so overcrowding never fires. |
| **"They say thou art a renegade"**, the angels' report of England's verdict on the road | Fenton 126–128 | No. It sits on the same pages as the Kelley vision now used for Mortlake. |
| **The Constantinople prophecy**, Cross by 15 Sept 1585 | Fenton 144–146; Parry 197–199 | No. The Ottoman option still never passes through it. |
| **Kraków, King Stephen, the scripted pitch; Uriel's "take not thy wife"** | Szőnyi 273–274; Fenton 175 | No. |
| **The books restored**, 29–30 Apr 1586 | Fenton 202–204 | Mentioned in `books_burned` text only; no return. |
| **The Muscovy offer**, Dec 1586 | Fenton 216–219; Håkansson 31–33 | No. |

The pattern: what the systems produce well is *material* loss (books, money, globes).
What they do not yet produce is *relational* reversal: a servant quitting, a scryer
displacing another, a wife's anger, a patron's verdict delivered behind Dee's back. Those
are the turns the biography is made of.

---

## 3. Accuracy

### In the playthroughs

**H1. HIGH: the Ottoman thread is dead in the current data.** SYSTEMS_V2 §8 counts three
signals: acquiring the Soyga, completing the Chamber, asking about the Soyga. With the book in
no market and no event granting it, the most a player can reach is one signal. Both
`soyga_question` blue options need `book_soyga`. Fix: put `book_soyga` in `INITIAL_LIBRARY`
(diary mention 17 Jan 1582, Harkness 58–60), or grant it from `saul_first_scryer`.

**H2. HIGH: an invented record entry.** Run B's sector-change bark: *"Dee writes in the
margin of his almanac that the house is shut and the key with Roger, and does not write
anything else that day."* This is not speech, but it invents a document entry in the very
almanacs that survive (Ashmole 487–488), and it hands the key to a man who had left in
1581. The house was in Fromond's keeping (Whitby 44–46). Rewrite as narration: *"The house
is shut. Nicholas Fromond, Jane's brother, has the keys and a bond for £400."*

**M1. Roger in the retinue/keeping the house after 1581** (B; Cooke barks in `copy/index.ts`
assume he is present throughout). Only valid until the departure event exists.

**M2. Jane in Prague in August 1584** (B: Jane to Curtius; `prague_arrival` "gives the
household rooms"). Dee went back to Kraków to fetch his family and goods and was in Prague
again by 20 December 1584 (Whitby 46–48). Until about Prague day 24, Jane is in Kraków.
Note: this corrects my own earlier proposal (PRAGUE_AND_OTTOMAN, PROPOSED_MECHANICS_TWEAKS #1),
which put the family in Hájek's Quarters from day 0.

**M3. Kelley's past "the sources report"** (B). His forgery conviction is CONTEXT and the
cropped ears are LEGEND (DeeVisualNovel `BIOGRAPHY.md`). Write "the rumours of a criminal
past".

**M4. The "Letters from England" loss list** (B, C) names Euclid, the *Almagest* and the
*Steganographia* as lost and cites Håkansson/Whitby. Those titles are the player's shelf, not
the record's list. Only the globes are attested (Whitby 67–70). Frame it as "In this run,
missing from the shelves: ...".

**L1. The speech rule.** No invented direct speech by real people in the runs. Direct speech
is given only to the anonymous bookseller and steward, which §10 allows. Crew barks are in
reported form ("Jane counts the purse twice and says it will not stand another building
season"). That is compliant. [inference] Keep the reported content to what the record supports.
Jane's worry about money and scryers is supported (Fenton index: rage against scryers 44;
petitions the angels for sustenance 174). Roger's "shelf-marks straight by Friday" is
harmless invention. One anonymous line contradicts the record: the bookseller's *"I don't give
credit on manuscripts, sir. Not even to you."* (`copy/index.ts:59`). Dee bought on credit
and still owed Fremonsheim £63 when he left (Parry 191–193). Suggested line: *"On account
again, Doctor? Master Fremonsheim keeps a long book."*

### In the new encounter files

| File / id | Issue | Fix |
|---|---|---|
| `prague.ts` `nuncio_audience` | **Both things happened.** Kelley did tell the papal representatives that "a great and conspicuous reformation of the Christian religion would be brought about most speedily" (Harkness 72–74). The game offers it as the alternative to Dee's demur ("What Dee did"). | Make Kelley's speech part of the event text (documented). Make the choice what Dee does about it: demur (historical), endorse, or distance himself. |
| `prague.ts` `books_burned` (minDay 80) vs `weather_nuncio_summons` (95) | **Order inverted.** The audience was 27 March 1586 and the burning 10 April (Fenton 200–202). Also, `nuncio_demur` sets `prague_closed`, so the burning can be skipped by leaving. | Trigger the burning on `nuncio_summons` + ~3 days. Add the restoration (29–30 April) as a follow-up for "Obey". "Whatever the nuncio's people hoped to find, it is ash" is an interpretation: keep it in narration as one reading, not as fact. Harkness says "thirty" books, Fenton 28: use Fenton's count, since it is Dee's text. |
| `prague.ts` `pucci_joins` (minDay 45) | Confirmed: Pucci was "one of Malaspina's associates", attended from 6 August 1585, and later reverted to Catholicism after an angelic message (Harkness 72–74). The date maps to about day 67. | minDay ~65. |
| `prague.ts` `rudolf_audience` | `audience_monas`, `audience_alchemy` and `audience_stars` are not what Dee did. Only the rebuke is labelled. | Add "(Not what Dee did.)" to the other three, or `historicalStatus` per choice. `audience_alchemy` paying £20 at a first audience has no source. |
| `prague.ts` `prague_arrival` | "gives the household rooms": see M2. | "gives Dee and Kelley rooms". |
| `england_events.ts` `saul_first_scryer` (minDay 20) | First action 22 Dec 1581, about day 81 on the linear mapping (ARC_REPORT §5). | minDay ~75. |
| `england_events.ts` `soyga_question` | Sources: "Harkness" with no page; book unobtainable (H1). Outcome is right: Uriel praised it ("revealed to Adam in Paradise") and deferred to Michael. | Sources `['Harkness 58–60', 'Szőnyi 226–228']`. |
| `england_events.ts` `laski_at_mortlake` → `laski_polite` | "report the visit to Walsingham" is a plausible choice inside a documented encounter. | Mark the choice plausible. Keep it: it is the best spy hook in the data (§4). |
| `england_events.ts` `sigillum_dictated` | Fine. Detail worth using: Uriel said the Sigillum was "allready perfected in a boke of thyne" (Szőnyi 226–228), i.e. the design already sat in Dee's library. | A blue option for owning the right book. |
| `factions/weather.ts` `weather_calendar_reform` | Now accurate (B6 applied). It now gives Burghley +2, so it no longer works as a reversal against Burghley. Correct: Burghley accepted Dee's reckoning. The reversal is the bishops'. | Fine. |

### The Vercelli line (B7): I was wrong

Confirmed in the corpus (Harkness 70–72, `chunk_fts match 'Vercelli'`): *"I am indeed of
the opinion," wrote the Bishop of Vercelli, "that they prefer one philosopher's stone to ten
visions of angels."* My first pass searched with a narrower query and missed it. B7 is
withdrawn. The current wording ("The bishop of Vercelli writes that he thinks they prefer...")
is accurate. Since this is a real quotation from a real person, it may also be quoted directly
with the citation.

---

## 4. The spy thread and the wrong-side transitions

Ted's interest: Dee as an intelligence man, and Parry's pattern of Dee caught at regime
transitions, sometimes backing the wrong side (the 1553 Northumberland household, the 1555
arrest under Mary and service in Bonner's household, the turn to Elizabeth in 1558: Parry
48–58). Within 1580–86 there is no change of monarch, but the same pattern recurs in
miniature. Dee attaches himself to a Catholic prince (Łaski), crosses to a Catholic emperor's
court, sits under a papal nuncio's eye, and is reported on at home.

**Where the playthroughs touch it now.**
- Barn Elms cipher work (A, B): Walsingham as paymaster.
- Declining Walsingham (D): −8, "the room cools".
- Jane's City news errand (A): Merchant and Walsingham points.
- *Walsingham hears of the actions from his correspondents* ◊ (D): the right idea, as a
  placeholder.
- `laski_polite`: "report the visit to Walsingham", which makes Dee an informer on his own
  future patron.
- Roger's bark *"a letter came opened and resealed, badly"*: a household that is watched.

**What the mechanics could do with it** (pointers; detail for `research/espionage/`):

1. **Walsingham is a two-way faction.** High Walsingham standing brings cipher work *and*
   reporting: every Walsingham job raises a hidden "file" that the Continental sector reads.
   [record] Walsingham's correspondents reported on Dee abroad (Parry 195–197); the angels
   named Francis Garland as Burghley's spy in the household (Parry 217–219). The player
   learns, in Prague, that the employer was also the watcher.
2. **Informing has a cost later.** `laski_polite` (report Łaski to Walsingham) should set a flag
   that changes Łaski's standing or the angels' treatment in Prague. The double information
   game flag already exists (`double_information_game` in `walsingham_intelligence`); nothing
   reads it yet.
3. **The renegade verdict.** On the road, the angels' report: *"In England, they condemn thy
   doings, and say thou art a renegade"* (Fenton 126–128). That is the documented moment at
   which the departure is read at home as backing the wrong side. Elizabeth and Walsingham
   take a hit whose size depends on the Catholic associations the player has collected
   (Łaski actions, the nuncio, Pucci).
4. **A remembered transition.** The 1555 arrest and Bonner episode exist only as two
   `secrets` strings on Dee's card. A short prologue or a mid-England flashback
   (`research/ENCOUNTER_CANDIDATES.md` #1–2 are already designed) would set a `marian_past`
   flag that sharpens every later Catholic association. The player then carries Dee's 1555
   into 1583, which is Parry's reading.
5. **Hide the magnitudes on the weather track** (P2). The wrong-side pattern cannot be felt if
   the player can see every turn's numbers in advance.

---

## 5. Proposed changes, ranked

DESIGNER contract: what the player does differently / what it interacts with / how it is
taught (on-screen words) / source / legibility. Items already specified in
PROPOSED_MECHANICS_TWEAKS are referenced, not repeated.

### P1. Petitions produce promises (= TWEAKS #3), now with Run A as the evidence
- **Does:** a successful petition yields "Promised: £N", which counts toward Fortune's standing
  half but is never cash unless a grant event fires. Run A's six petitions would leave Dee
  Favoured on paper and short in the purse.
- **Interacts:** Fortune, `mortlake_2/3`, upkeep.
- **Taught:** *"The petition was well received. Promised: £6."* Banner: *"Favoured: £18 in hand
  · £36 promised."* At sector end: *"Promised, not paid."*
- **Source:** Sherman; Pumfrey via `docs/HISTORY.md`.
- **Legibility:** high. It turns Run A's ATM into the career.

### P2. The court's weather is foggy, and some of it depends on whom you backed
- **Does:** the track shows *that* a turn is coming and *which* faction it touches, not by how
  much. Some events scale with the player's alignments: the more the player has invested in a
  faction, the harder its fall hits.
- **Interacts:** weather track, factions, `marian_past` and Catholic-association flags (§4).
- **Taught:** track tooltip: *"Something is turning at court. Leicester's people are uneasy."*
  On resolution: *"You were Leicester's man this season. It costs you."*
- **Source:** Parry 48–58 (transitions), 170–177 (calendar), 195–197.
- **Legibility:** medium-high. It removes Run A's "bought on day 106 because the track said
  so", and it teaches the wrong-side bet by losing it.

### P3. The household on the road (= TWEAKS #1, with corrected timing)
- **Does:** the family and Joan Kelley leave England with Dee, wait in Kraków, and arrive at
  Hájek's house about Prague day 24. Quarters then overflows. Michael is born about day 40.
- **Taught:** *"Dee goes back to Kraków for the household. They reach Prague before Christmas."*
  then the overcrowding bark.
- **Source:** Fell Smith 64–65; Whitby 46–48.
- **Legibility:** high. It also finally shows the overcrowding system the doc says is unshown.

### P4. Make the Ottoman thread reachable and honest
- **Does:** Soyga on the starting shelf; signals = ask about Soyga, read its tables (Kabbalah
  6+), witness the Constantinople prophecy (Prague) or own *Picatrix* (England). Drop "chamber
  complete".
- **Taught:** option text per PRAGUE_AND_OTTOMAN Part 2: *"[COUNTERFACTUAL — after
  Melvin-Koushki] The angels promised you Constantinople as a conquest..."*
- **Source:** Harkness 58–60; Fenton 144–146; M-K 2021.
- **Legibility:** high. It also fixes H1.

### P5. Departure as three steps, and the verdict from home (= TWEAKS #2, plus the renegade report)
- **Does:** catalogue → Fromond's loan → keeper; on the road, the Kelley vision of Mortlake and
  Gabriel's "renegade" report land together.
- **Taught:** *"Nicholas Fromond, Jane's brother, lends £400 on the house and the books."*
  On the road: *"The angels report that in England you are called a renegade."*
- **Source:** Parry 191–193; Whitby 1031–1034; Fenton 126–128.
- **Legibility:** high.

### P6. Relational reversals as fixed events
- **Does:** Cooke asks leave (≈ day 69); Talbot denounces Saul before hiring (≈ day 89); Jane's
  rage (≈ day 96, quoted from the diary with attribution).
- **Taught:** see TWEAKS #9 for wording.
- **Source:** Fenton 26–28; Whitby 56–58, 24–26.
- **Legibility:** high: roster and meter changes. Verify Cooke's event actually lands (§2).

### P7. The nuncio scene as it happened
- **Does:** Kelley's reformation speech happens in the event text; the player chooses Dee's
  response (demur / endorse / distance). The furnace follows ~3 days later; "Obey" is followed
  by the restoration.
- **Taught:** *"Kelley tells the nuncio's people that a great reformation will come if the
  angels are heeded. They write it down."* Choices: **Demur (what Dee did)** / **Stand with
  Kelley** / **Disown the words**.
- **Source:** Harkness 70–74; Fenton 200–204.
- **Legibility:** high. Prague's narrowing becomes one scene with consequences instead of two
  notices.

### P8. Walsingham watches back
- **Does:** per §4 points 1–2: a hidden file filled by Walsingham work and by informing, read
  in Prague.
- **Taught:** in Prague: *"A letter from England arrives already opened. Your doings are known
  at Barn Elms."*
- **Source:** Parry 195–197, 217–219.
- **Legibility:** medium. The file is hidden, but its reading is a visible event.

### P9. A fifth example run: the Good Servant
- **Does:** a documentation change, not a mechanic. A run that plays the historical choices
  well and ends Straitened, with promises unpaid, the family in Hájek's crowded rooms, the
  Continental Question taken because England offered nothing. It is the run that shows the
  career's twists coming from the systems.
- **Legibility:** n/a. It is the test of P1–P8: if this run cannot be written from the
  systems alone, the systems do not yet tell the story.

### P10. Dee's own books cannot be sold
- **Does:** `dee_monas`, `dee_mathematical_preface`, `dee_general_rare` and the other Dee works
  are unsellable; they may be *given* (Kunstkammer, patrons) for standing.
- **Taught:** sell button replaced by *"Your own work. It can be given, not sold."*
- **Source:** inference from Run A's selling scene.
- **Legibility:** high.

### P11. The Muscovy card at the Prague end (= TWEAKS #10)
- **Taught:** *"In December 1586 an envoy came from the Emperor of Muscovy offering a great
  stipend. Dee did not go."*
- **Source:** Fenton 216–219; Håkansson 31–33.
