# Espionage cards: proposals in FTLDee's card shapes

A RESEARCHER proposal for a BUILDER. The fields follow `src/core/types.ts` (`Encounter`,
`EncounterChoice`, `OutcomeSpec`, `PoliticalWeatherEvent`, `ErrandCard`, `InstrumentCard`, `Book`)
and `src/data/cards/associates.ts` (`AssociateCard`). Design rationale is in `SPYSTORIES.md`;
evidence is in `DEE_AND_INTELLIGENCE.md`, `MARY_TO_ELIZABETH.md` and `SPY_LEGEND.md`.

**Status words.** `HistoricalStatus` has no `legend` value. Until a BUILDER adds `'legend'`
(recommended), LEGEND cards use `historicalStatus: 'counterfactual'` and must start their
title/text with **`[LEGEND]`**, followed by the source line. Real people: reported speech only.
Numbers are first guesses for tuning.

**New flags.** `marian_past` (set by C1, already read by the road-sector renegade report),
`bonner_chaplain`, `file_*` entries (one flag per File entry, read by `weather_opened_letter`),
`legend_mode`.

---

## Encounters

### C1 `origin_1555`: The Woodstock Horoscopes (start-of-run memory)
- **Status** `documented` (choice B is `counterfactual`). **Location** `mortlake` (played as
  recollection). **Sources** Parry 31–38, 48–49.
- **Description** In the spring of 1555, Princess Elizabeth's household asked you what the stars held
  for her, her sister and Philip. On 28 May the Council's men sealed your door. Bourne questioned
  you; Ferrers and Prideaux had informed.
- **Choices**
  - A *Tell the Council what it wants, and go to Bishop Bonner as his chaplain. (What Dee did.)*
    → `flagsSet: ['marian_past','bonner_chaplain','file_foxe']`, `reputation: { religiousAuth: 8,
    elizabeth: -4 }`, `booksGained: ['roger_bacon_alchemy_ms']` (Parry 42: bought at the Leland sale
    1556).
  - B *Say nothing.* [counterfactual] → `secrecyChange: +10`, `money: -10`, `reputation: {
    elizabeth: 4, religiousAuth: -6 }`.
- **What changes:** A is the documented start. It gives books and religious standing now, and the
  Foxe stain later (C2, and the renegade report).

### C2 weather `weather_foxe_names_you`: Under the Honey Lies the Poison
- `documented`, England sector, `triggerDate: 20`. **Requires** `marian_past`. **Sources** Parry
  34, 39–40, 49.
- **Description** *Acts and Monuments* puts "Dr Dee", the conjuring chaplain, in Bonner's garden. Old
  Protestant readers remember.
- **Effects** `factionShifts: { leicester: -3, religiousAuth: -5, walsingham: -2 }`,
  `pressureIncrease: 4`.

### C3 `grindal_letter`: Walsingham's Messenger
- `documented`, location `richmond`, `triggerConditions: { minDay: 120, flags: ['calendar_work'] }`.
  **Participants** `walsingham`. **Sources** Parry 153–160.
- **Description** Walsingham asks you to carry his letter, and your calendar, to Archbishop Grindal.
  He knows Grindal read Philpot's account of 1555.
- **Choices**
  - *Carry it.* → `reputation: { walsingham: 4, burghley: 2, religiousAuth: -8 }`. If `marian_past`,
    also `flagsSet: ['calendar_refused']`.
  - *Ask that another man carry it.* → `reputation: { walsingham: -3 }`, `time: -3`.
- **What changes:** the player sees a patron spend the player's past to win his own fight.

### C4 rewrite of `queens_malady`: The Queen's Water
- `documented`, `hampton_court`. **Sources** `['Parry 135–136', 'Fell Smith 33–34']`.
- **Change:** name the destination (Thurneysser, Frankfurt on the Oder), the money (£100), and the
  flask of the Queen's urine. `malady_go` adds `costs: { time: 20 }`, `money: +25` (net of £100
  travel), `instrumentsGained: ['thurneysser_flask']`. Keep `malady_mission`.

### C5 `wilson_watches`: Godly Magic, Observed
- `documented`, `windsor`. **Sources** Parry 132–134.
- *Perform counter-magic against the wax images, with Secretary Wilson watching* →
  `reputation: { elizabeth: 8, leicester: 6 }`, `flagsSet: ['file_council_conjuror']`,
  `secrecyChange: -6`. *Decline* → `reputation: { leicester: -5 }`.
- `file_council_conjuror` makes C9 (Murphyn) worse.

### C6 `sled_at_table`: A Gentleman Who Knows the Searchers
- `documented` (Sled's presence); his reporting is `plausible`. `mortlake`. **Sources** Parry 166,
  172; Fenton 352–354.
- *Keep him (he has the sight and knows the customs men)* → `money: +6`, `flagsSet:
  ['sled_in_house','file_household_leak']`. *Turn him out* → `secrecyChange: +6`,
  `unlockEncounters: ['creditors_suing']`.
- Feeds the existing `lubeck_angels`.

### C7 `laski_lacy`: A Kingdom Within the Year
- `documented`, `mortlake`, after `laski_at_mortlake`. **Sources** Parry 164–169.
- *Put Łaski's claims to the stone* → `reputation: { continentalCourts: 10, burghley: -8, walsingham:
  -4 }`, `flagsSet: ['reported_laski','file_laski_crown']`.
- *Keep the actions on Nature, not crowns* → `reputation: { continentalCourts: -4 }`.
- Then a follow-up: `herle_and_watson` (watchers attach to the household).

### C8 `wicked_spy`: A Worcestershire Man
- `documented`, `mortlake`, 1 Aug 1583. **Sources** Fenton 112–114; Parry 170; Fell Smith 62–64.
- *Use him as an honest man. (What Dee did.)* → `flagsSet: ['file_kelley_watched']`.
- *Question him* → requires `courtlyIntelligence: 5`; `secrecyChange: +4`, `reputation: {
  burghley: -2 }`.
- Text records the identification dispute (Halton? a separate visitor?).

### C9 `murphyn_suit`: The Winking Eye of Achitophel
- `documented`, `london`. **Sources** Parry 139–141.
- *Sue in the Guildhall* → `money: -10`, `reputation: { elizabeth: 6 }` (she visits Mortlake and
  bids you resort oftener). *Let it lie* → set a weather `weather_murphyn_slander`
  (`pressureIncrease: 0.1/day` for 30 days).

### C10 `leipzig_letter`: I Am Forced to Be Brief (Prague sector)
- Letter `documented`, its meaning `contested`. Location `old_town`, `minDay: 90`. **Sources**
  Fenton 207–209; Fell Smith 89; Parry 192.
- *Write of your triumphs and the nuncio's flea in his ear (Parry's reading)* → `reputation: {
  walsingham: 2 }`, `flagsSet: ['departure_explained'] `.
- *Write in veiled allusions (Fell Smith's "supposition")* → `reputation: { walsingham: 4 }`,
  `secrecyChange: -6`, `flagsSet: ['double_information_game']`. If `legend_mode`, unlock L1.
- *Do not write.*

### C11 `kassel_powle`: What Powle Wrote Home
- `documented`. **Sources** Parry 186, 195.
- *Say you live on the Queen's bounty* → `reputation: { continentalCourts: 6, burghley: -6 }`.
  *Sign as "Deus Londinensis"* → `reputation: { continentalCourts: 4, religiousAuth: -6 }`.
  *Say little* → nothing.
- Each loud choice adds a `file_*` flag.

### C12 `basset_tutor`: The Tutor Called Basset
- `documented`, Třeboň. **Sources** Parry 200–201.
- *Hire him for Arthur* → `crewJoins: ['john_basset']`, `flagsSet: ['file_household_leak']`; he
  leaves after ~365 days and the card reveals "Edward Whitlock, an English spy". *Decline.*

### C13 `garland_courier`: Gold Before Witnesses
- `documented` / `plausible`. **Sources** Parry 197–198.
- *Use Francis Garland as your courier* → letters reach England faster, `walsingham: +3`, and the
  File becomes visible to Burghley. *Believe the angels that he is Burghley's spy* → courier lost,
  `secrecyChange: +5`.

### C14 `parkins_denounce`: The Archtraitor
- `documented`, Bremen. **Sources** Parry 204; Whitby 105.
- Only choice that looks like spying: *Denounce the Jesuit Parkins to Walsingham* →
  `reputation: { walsingham: -4, burghley: -2 }`. The outcome reveals that Parkins was Elizabeth's
  own accredited agent.
- *Write instead of Kelley's honours.*

### C15 `allen_letter`: Their Conjuror or Astrologer (late game)
- `documented` / `contested`. **Sources** Parry 225–230.
- *Predict invasion this summer* → `money: +20` (secret), `reputation: { burghley: 10, religiousAuth:
  -6 }`, `flagsSet: ['file_allen']`. Later weather: Allen's letter in print (1601) costs Secrecy.
- *Predict no invasion* → `burghley: -5`.

### Legend encounters (Legend Mode only; title prefixed `[LEGEND]`)

- **L1 `legend_007`, *[LEGEND] Two Eyes and a Seven*.** Sources line: "Richard Deacon (Donald
  McCormick), 1968. No such signature found (Burns 2010, via Duns 2018). 'Largely fantasy and
  speculation' (Clulee 2015, 229–230)." Choice *Sign your letters so* → `reputation: { walsingham:
  10 }`, `secrecyChange: -12`.
- **L2 `legend_forest_of_dean`, *[LEGEND] The Forest of Dean*.** Sources line: "Deacon 1968, as
  retold (Lienhard, Engines 896; New Dawn 2008). Not in Dee's diaries or the actions." The angels
  warn of arsonists; report it → `walsingham: +8`, `navigation` timber bonus.
- **L3 `legend_angelic_code`, *[LEGEND] The Angels Are a Code*.** Sources line: "Robert Hooke 1690,
  revived by Deacon; rejected by Whitby 104–105." Each scrying action can also produce a coded report
  (`money: +5`, `secrecyChange: -3`) at the cost of the action's angelic outcome. The player chooses
  which story they are playing.

---

## Weather (England / Prague)

| id | status | sector, day | effect | sources |
|---|---|---|---|---|
| `weather_cobham_report` | documented | england ~day 140 (after Łaski arrives) | `factionShifts: { burghley: -5 }`; flag `laski_exposed` | Parry 164 |
| `weather_herle_watches` | documented | england, on `reported_laski` | `pressureIncrease: 3` | Parry 165, 168 |
| `weather_powle_dispatch` | documented | prague ~day 60 | reads `file_*` flags; each costs Burghley −2 | Parry 186, 195 |
| `weather_dyer_cover_letters` | documented | prague ~day 110 | flag `recall_for_kelley`; `elizabeth +3` only if Kelley is still crew | Parry 201 |

## Errands

| id | name | status | skill / diff / days | success → | sources |
|---|---|---|---|---|---|
| `errand_frankfurt_oder` | Carry the flask to Thurneysser | documented | medicine / 7 / 20 | `elizabeth +5`, `continentalCourts +4` | Parry 135–136 |
| `errand_leipzig_post` | Meet the courier at Leipzig fair | documented | languages / 6 / 6 | a letter reaches Walsingham; may set `file_*` | Fenton 207–209 |
| `errand_beale_rutters` | Charts and rutters at Beale's house | documented | navigation / 6 / 2 | `walsingham +4`, `merchantNetwork +3` | Parry 152–153 |
| Existing `errand_ciphers` | Deliver deciphered letters | currently `plausible`, `sources: []` | — | **Retag** `counterfactual` + `[LEGEND]`, or rewrite as `errand_beale_rutters` | Parry 50, 204 |

## Instruments and books

| id | kind | status | fields | sources |
|---|---|---|---|---|
| `thurneysser_flask` | travel | documented | `skillBonus: { medicine: 1 }`, `travels: true`, `market: false` | Parry 136 |
| `passport_1583` | travel | documented | `satchelBonus: 0`; removes the departure risk penalty | Parry 171 |
| `cover_letters` | travel | documented | halves Secrecy loss on correspondence choices | Parry 201 |
| `diary_cipher_ladder` | instrument (base-only: no) | documented | three tiers (Greek letters, backwards, Latin in Greek); extends `posen_journal` | Parry 200; Fell Smith 69–70 |
| `trithemius_steganographia` (exists) | book | copy documented; reading contested | Add a one-time choice: "angelic" (scrying) or "cryptographic" (+1 cryptography, `file_cipher_book`). `sources: ['Parry 50', 'Whitby 113 n.8', 'Baldwin in Clucas ed. 2006, 106']` | — |
| `divers_curious_narrations` | book | counterfactual + `[LEGEND]` | Legend Mode only | Whitby 113–114 |

## Associates (to add to `ASSOCIATE_CARDS`)

`pembroke` (patron, documented, Parry 23–24, 28, 48), `bonner` (danger/patron, documented, Parry
28–29, 38–39), `ferrers` (danger, documented, Parry 32, 83), `herle` (agent, documented, Parry
139–140, 165, 168), `thomas_watson` (agent, documented, Parry 168), `edward_dyer` (patron/broker,
documented, Parry 83, 201–216), `richard_young` (broker, documented, Parry 201), `francis_garland`
(agent, documented, Parry 197–198), `john_basset` (agent, documented, Parry 200–201), `stephen_powle`
(agent, documented, Parry 186, 195), `edmund_hilton` (kin/servant, documented, Fell Smith 87–89,
103–109), `christopher_parkins` (danger, documented, Parry 204, 234), `william_allen` (danger,
documented, Parry 225–226).

The `walsingham` card summary should change from "Paid problems, and a file on you" to name the
documented commissions (calendar, rutters, the 1578 mission, alchemists in 1590; Parry 135, 152–160,
206). Its `sources` should add `'Parry 204 (spy claim rejected)'`.
