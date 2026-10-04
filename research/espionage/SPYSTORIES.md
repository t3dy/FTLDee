# SPYSTORIES: design ideas for the intrigue thread

Design ideas for FTLDee's espionage and court-intrigue thread: encounters, locations, allies and
handlers, equipment, rooms and routes. Every idea carries a status:

- **DOCUMENTED**: the record has it.
- **PLAUSIBLE**: a scholar infers it.
- **CONTESTED**: scholars disagree.
- **LEGEND**: the modern spy literature claims it without a traceable source. The game may offer
  these only if the card says LEGEND on its face.
- **COUNTERFACTUAL**: deliberately off the record.

Evidence lives in `MARY_TO_ELIZABETH.md`, `DEE_AND_INTELLIGENCE.md` and `SPY_LEGEND.md`. Pages follow `docs/CITATIONS.md`: printed pages for Parry (corpus − 21),
Whitby (offset drifts −15 to −25; converted from the nearest page header), Szőnyi and Sherman
(xiii, 25–26 only); corpus (PDF) pages for Fell Smith and Fenton. Real people get reported speech only.

## 0. What the game already has (build on it, don't duplicate)

| Already built | What it does | How this file extends it |
|---|---|---|
| Walsingham faction; `walsingham_intelligence` (Barn Elms cipher) | Dee breaks a cipher for Walsingham. Tagged plausible, but undocumented | Retag as LEGEND, or rebuild it as the documented consultations (§2 E3, E4) |
| `weather_opened_letter` (Prague) reads the "Walsingham file" | Flags: `intelligence_demonstrated`, `walsingham_network_member`, `reported_laski`, `double_information_game`, `malady_mission`, `departure_explained` | Add more inputs to the file, so each act of service is also an entry in it (§1) |
| Road-sector "renegade" report (Fenton 126–128), scaled by Catholic-association flags incl. `marian_past` | `marian_past` is **set by nothing** | Set it from the Marian origin (§2 E1). That is the documented source of the stain |
| "Without Licence" departure; `lubeck_angels` with Sled; Champernon's report; `posen_journal` | — | Sled gets a household arc (E6); Champernon has a Kraków twin (E10); Greek letters grow into the diary-code ladder (EQ4) |
| Associates: Sled, Champernon, Curtius, Malaspina, Pucci | — | Add Herle, Watson, Garland, Whitlock/"Basset", Powle, Dyer, Young, Bonner, Pembroke, Ferrers (§4) |

## 1. The core idea: the File

The game should be about Dee being watched more than about Dee watching others. The record's real
intelligencers (Sled, Herle, Watson, Garland, Whitlock, Champernon, Powle) all appear as people
reporting **on** Dee (DEE_AND_INTELLIGENCE §0). Parry's thesis, that expertise is "both useful and
incriminating" (DEE_MASTER_BIOGRAPHY Act II, Parry ch. 3), becomes a single mechanic:

- **The File** is a hidden list of entries that other people write about Dee. Each act of service
  (a horoscope for a faction, a counter-magic, a letter abroad) adds an entry that is true but
  usable against him. Status: the 1555 case is **DOCUMENTED** (the horoscopes became the arrest,
  Parry 32–33). The 1583 case is **Parry's inference**: on his reading, Walsingham used the Bonner
  chaplaincy against Dee by sending him to Grindal (Parry 157–160).
- Entries **surface later** as weather or encounters, written in reported speech, like Champernon's
  "certain estate for uncertain hope" (Whitby 179 n.19) and Powle's "Deus Londinensis" (Parry 195).
  The player learns what the File contains only when someone uses it.
- **Who holds the File changes.** Each regime change, or each new patron, flips which entries count
  as loyal and which count as treason. That is the Mary-to-Elizabeth lesson: the same 1555 act was
  charged as treason in June and cleared of treason by August, while "the conjuring accusations
  remained" (Parry 34, 37).
- **[inference]** This gives the player something to recover from behaviour alone (the PIPELINE.md
  gate): the more useful you are, the thicker your File.

## 2. Encounters

| Id (proposed) | Title | Status | Sources | What the player does differently |
|---|---|---|---|---|
| E1 `origin_1555` | *The Woodstock Horoscopes* (starting background, played as memory) | DOCUMENTED | Parry 31–38 | Choose how 1555 ended: confess under Bourne and go to Bonner (what Dee did; sets `marian_past` and `bonner_chaplain`, +religiousAuth, File entry "Foxe"), stay silent (more Secrecy, less money, no `marian_past`, **counterfactual**), or name Benger (+Mary's side, −Elizabeth, **counterfactual**) |
| E2 `foxe_reprint` | *Under the Honey Lies the Poison* (weather) | DOCUMENTED | Parry 34, 39–40, 49 | If `marian_past`: *Acts and Monuments* names the conjuring chaplain. Protestant factions drop. A blue option uses Elizabeth's 1558 welcome (Pembroke and Dudley "stand beside" him) to blunt it |
| E3 `grindal_letter` | *Walsingham's Messenger* (calendar, 1583) | DOCUMENTED | Parry 155–160 | Walsingham asks Dee to carry his letter to Grindal. Carry it (calendar progress, but `marian_past` makes the bishops refuse it) or decline (calendar stalls). Either way the player sees a patron spend Dee's past for his own ends |
| E4 `thurneysser_urine` | *The Queen's Water* (rewrite of `queens_malady`) | DOCUMENTED | Parry 135–136 | Leicester and Walsingham send Dee to Frankfurt on the Oder with £100 and a flask. Travel costs Days. Return with a diagnosis, plus contacts abroad who now know your face. Sets `malady_mission` |
| E5 `wilson_watches` | *Godly Magic, Observed* (1578 wax images, before the Court **at Norwich** on progress; Wilson briefs the Queen at Richmond on 28 Sep) | DOCUMENTED | Parry 132–134 | Perform counter-magic against the Queen's image-makers with Secretary Wilson watching. Big Elizabeth and Leicester gain. Adds a File entry, "conjures at Council's request", which Murphyn later uses |
| E6 `sled_at_table` | *A Gentleman Who Knows the Searchers* (household, 1582–83) | DOCUMENTED / PLAUSIBLE | Parry 166, 172 | Sled joins the household. He has crystal sight and knows customs men. Keep him (money and sight, but the File leaks to Walsingham) or turn him out (lose both, gain Secrecy). Ties into `lubeck_angels` |
| E7 `wicked_spy` | *A Worcestershire Man* (1 Aug 1583) | DOCUMENTED | Fenton 112–114; Parry 169 | A stranger is "sent to E.K." Treat him as honest (what Dee did) or test him. The contradiction over who he was (Halton or a separate visitor) is shown, not resolved |
| E8 `laski_lacy` | *A Kingdom Within the Year* (Łaski's genealogy) | DOCUMENTED | Parry 164–169 | Put Łaski's claims to the stone. The angels promise him crowns, including one "he seeketh as right". Each such action raises Continental standing and puts **Burghley's suspicion** on the File. Herle and Watson arrive as watchers |
| E9 `murphyn_suit` | *The Winking Eye of Achitophel* (1580) | DOCUMENTED | Parry 139–141 | Murphyn's slander reaches Burghley through Herle. Sue in the Guildhall (costly; no verdict is recorded) or stay quiet. The Queen's visit and kiss of hand came three days after Dee began proceedings, before the Guildhall declaration, so it should fire as a show of support whatever the player chooses (the slander becomes a standing weather effect) |
| E10 `kassel_powle` | *What Powle Wrote Home* (Prague sector) | DOCUMENTED | Parry 186, 195 | Boasting abroad, about Elizabeth's money or about English envy, earns Continental standing now. Each boast writes an entry Burghley and Walsingham will read |
| E11 `leipzig_letter` | *I Am Forced to Be Brief* (May 1586) | DOCUMENTED letter / CONTESTED meaning | Fenton 207–209; Parry 192; Fell Smith 89 | Write to Walsingham. Choose the register: self-promotion (Parry's reading), veiled news (Fell Smith's "veiled allusions"), or nothing. The letter is the only real basis the spy legend has, so the choice also unlocks or locks LEGEND cards |
| E12 `basset_tutor` | *The Tutor Called Basset* (Třeboň 1587) | DOCUMENTED | Parry 200–201 | A tutor for Arthur turns up. He is Edward Whitlock, an English spy. Hire him (Arthur's Languages rises, the File thickens) or not. He absconds after a year |
| E13 `garland_courier` | *Gold Before Witnesses* | DOCUMENTED / PLAUSIBLE | Parry 197–198 | Kelley transmutes before the Garlands. Francis Garland becomes your courier and "inevitably" Walsingham's informant. Then the angels name him Burghley's spy: believe the angels or the post? |
| E14 `dyer_recall` | *The Queen's Letter in Another Hand* | DOCUMENTED | Parry 201–202, 214–216 | Elizabeth's recall comes under cover of letters from Dyer and Young. Dee learns that England wants **Kelley**, not him. A blue option sets Dee up as Kelley's broker. This is the documented route home |
| E15 `parkins_denounce` | *The Archtraitor* (Bremen/Stade 1589) | DOCUMENTED | Parry 204; Whitby 105 | Report the Jesuit Parkins to Walsingham. Success is guaranteed, but the target is **Elizabeth's own agent**, so the reward turns to embarrassment. This is the game's direct answer to "Dee the spy" |
| E16 `allen_letter` | *Their Conjuror or Astrologer* (1591–92, late game) | DOCUMENTED / CONTESTED | Parry 225–230 | Burghley asks whether Spain will invade this summer. Predict invasion (Burghley's policy wins, persecution follows, a secret reward, public credit **falls**) or predict peace (no reward). Cardinal Allen's letter later prints the answer under your name |
| E-L1 `legend_007` | *[LEGEND] Two Eyes and a Seven* | LEGEND | Deacon 1968 via Clulee 2015, 229–230; Duns 2018 | See §8 |
| E-L2 `legend_dean` | *[LEGEND] The Forest of Dean* | LEGEND | Deacon via swantower.com review and Lienhard ep. 896; not in corpus | See §8 |
| E-C1 `star_chamber_naming` | *[COUNTERFACTUAL] Name Elizabeth* | COUNTERFACTUAL | Parry 32–34 (what the Council wanted) | In 1555, give the Council Elizabeth's name. Mary's regime rewards you, and the run starts with Elizabeth as an enemy faction. A deliberately "nearby" branch |

## 3. Locations (new nodes or sub-scenes)

| Location | Status | Sources | Use |
|---|---|---|---|
| Woodstock Palace / Great Milton | DOCUMENTED | Parry 31–32 | E1 memory scenes |
| The Tower (Marian prison, 1555; also Roland 1553) | DOCUMENTED | Parry 27, 34 | E1; late-game threat of return |
| Star Chamber | DOCUMENTED | Parry 34, 37 | E1 resolution |
| Bonner's house and garden, Fulham | DOCUMENTED | Parry 34, 38–39 | E1, E2. A "Catholic shelter" node in the backstory |
| Gravesend / Tilbury crossing | DOCUMENTED | Parry 26–27; the `gravesend_ships` node exists | Roland's 1553 post. Dee's 1583 night departure passes it. Flavour: the family's treason site |
| Barn Elms (exists) | DOCUMENTED (Walsingham's house at Barnes) | Fell Smith 103–104, 115–116 | Dee's daughter Frances was nursed at Barnes in 1592, so Barn Elms is a neighbour, not only a headquarters |
| Richmond (exists) | DOCUMENTED | Parry 153 | Calendar summons (E3) |
| Robert Beale's house, London | DOCUMENTED | Parry 152 | Charts and rutters meeting. Beale later receives Dee's "Famous and Rich Discoveries" (Parry 170) |
| Guildhall | DOCUMENTED | Parry 139–141 | E9 |
| Norwich (Court on progress, Aug 1578) | DOCUMENTED | Parry 132 | E5. No node exists yet; use an off-map "on progress" scene or add a node |
| Seething Lane (Walsingham's London house) | not in corpus; the house is general knowledge | — | If used, PLAUSIBLE flavour only. Nothing ties Dee to it |
| Frankfurt on the Oder | DOCUMENTED | Parry 135 | E4 errand destination |
| Kraków (exists): Champernon's town | DOCUMENTED | Whitby 179 n.19 | E10's twin |
| Leipzig fair | DOCUMENTED | Fenton 207–209 | E11 |
| Kassel | DOCUMENTED | Parry 195 | E10 |
| Třeboň (exists as exit) | DOCUMENTED | Parry 196–201 | E12, E13 |
| Bremen / Stade | DOCUMENTED | Parry 204 | E15 |
| Forest of Dean | LEGEND | see §8 | E-L2 only |

## 4. Allies, handlers and watchers (associate cards)

| Person | Role | Status | Sources | Offers / threat |
|---|---|---|---|---|
| William Herbert, Earl of Pembroke | patron | DOCUMENTED | Parry 23–24, 28, 48 | Protection that changes sides before you can |
| Edmund Bonner | patron / danger | DOCUMENTED | Parry 28–29, 38–39 | Shelter, books, and a stain that lasts |
| George Ferrers | danger (informer) | DOCUMENTED | Parry 32, 83 | Accuser of 1555, still active in 1569 |
| Sir John Bourne | danger (interrogator) | DOCUMENTED | Parry 32 | "a notorious bully" |
| Thomas Benger, Christopher Carye, John Field | fellow prisoners | DOCUMENTED | Parry 31–37 | Loyalty test in E1 |
| William Herle | agent (Burghley's, then Walsingham's) | DOCUMENTED | Parry 139–140, 165, 168 | Carries Murphyn's slander; watches Łaski |
| Thomas Watson | agent | DOCUMENTED (attempted placement) | Parry 168 | Walsingham's would-be plant in Łaski's household |
| Edward Dyer | broker | DOCUMENTED | Parry 83, 98, 201–216 | "most important knowledge broker" for 30 years. Your channel to Court, and later Kelley's |
| Richard Young | broker / cover | DOCUMENTED | Parry 201; Baldwin in Clucas ed. 2006, 106–107 | Co-signs the cover letters; lodges Dee in 1589 |
| Francis Garland | courier / informant | DOCUMENTED / PLAUSIBLE | Parry 197–198 | Carries your letters, and reads them |
| Edward Whitlock alias John Basset | spy | DOCUMENTED | Parry 200–201 | A crew member who is not what he says |
| Stephen Powle | reporter | DOCUMENTED | Parry 186, 195 | Turns your boasts into dispatches |
| Edmund Hilton | servant / courier | DOCUMENTED | Fell Smith 87–89, 103–109 | Reliable carrier. Losing him silences you |
| Christopher Parkins | target / agent | DOCUMENTED | Parry 204, 234 | The man you denounce wrongly |
| Cardinal William Allen | enemy pen | DOCUMENTED | Parry 225–226 | Prints your secret service |

## 5. Equipment (instruments and books)

| Item | Kind | Status | Sources | Effect idea |
|---|---|---|---|---|
| EQ1 *Steganographia* MS copy (exists as `trithemius_steganographia`) | book | DOCUMENTED (copy) / CONTESTED (as cipher manual) | Parry 50; Whitby 113 n.8 | Two readings, chosen once. "Angelic" unlocks scrying operations (Parry's Dee). "Cryptographic" gives +Cryptography, but owning it under that reading adds a File entry. This is the Parry-versus-Hooke dispute as a choice |
| EQ2 Passport "generous" (1571) / passports valid to mid-1585 (1583) | travel | DOCUMENTED | Parry 87, 171 | Removes risk from a departure; expires |
| EQ3 Seals and cover letters (Dyer/Young) | travel/letter | DOCUMENTED | Parry 201 | Letters through a cover name avoid "unwanted attention" (less Secrecy loss), but are slower |
| EQ4 Diary code ladder | skill item | DOCUMENTED | Parry 200; `posen_journal` | Tier 1: English in Greek letters. Tier 2: English backwards in Greek letters. Tier 3: Latin in Greek letters. Each tier protects the journal from one household reader (Kelley, Basset). Builds on Posen |
| EQ5 Thurneysser's urine-distillation apparatus | instrument | DOCUMENTED (device) | Parry 136 | Diagnostic bonus to Medicine. The flask itself is a mission token |
| EQ6 Holy Table / show-stone (exist) | ritual | DOCUMENTED; LEGEND as "spy apparatus" | Hooke via Henry ch. on Hooke (PDF 274) | Optional LEGEND overlay: Hooke's 1690 claim that the Table "might contain the Apparatus to make Apparitions" |
| EQ7 Invisible ink | — | **not found** in any source read | — | Do not ship as Dee's. If wanted, use it for an anonymous courier |
| EQ8 Cipher tables "from the Russian MS" | book | LEGEND | Whitby 113–114 | Deacon's untraceable "Divers Curious Narrations" (§8) |

## 6. Rooms

- **Correspondence room** (exists): add a **"letters read in transit"** level effect. At level 2+,
  a crew member posted there notices when a courier is also an informant. **PLAUSIBLE** (Garland,
  Parry 197).
- **Scriptorium L3 "Cipher office"**: already flagged D4 as overclaiming. Replace with **"Copyists
  at work"** and attach the diary-code ladder (EQ4), which is documented, to the Study instead.
- **A "cipher room" as a room card: do not ship as documented.** No source puts a cipher office in
  Dee's house. Offer it only as `[LEGEND] Deacon's cipher room`, unlocked in Legend Mode.
- **Quarters** (exists): a stranger in the household (Sled, Basset) takes a bed. Over capacity
  raises a File risk, not only a stability loss. **[inference]**

## 7. Routes and network

- **The courier chain.** Letters travel Prague → Leipzig fair → an English merchant (Overton) →
  London, or through servants (Hilton). Each hop has a chance of delay, and the letter may be read
  (a File leak). DOCUMENTED (Fenton 207–209; Fell Smith 89).
- **The reporting web.** A map overlay shows which watchers are near each node: Kraków
  (Champernon), Kassel (Powle), Třeboň (Basset, Garland), Mortlake (Sled), Łaski's lodging (Herle,
  Watson). DOCUMENTED.
- **Regime flip.** Fire a "transition" weather type that reverses which factions treat each File
  entry as loyal. Use it for the 1558 backstory and for a COUNTERFACTUAL late-game scenario
  (Elizabeth dies early). Status as tagged.

## 8. Legend Mode

A toggle, or a codex shelf, labelled **LEGEND: the Elizabethan 007 (Richard Deacon, 1968)**. Every
legend card says on its face where the claim comes from and what scholars say. Full evidence is in
`SPY_LEGEND.md`.

| Legend card | What it does | Face text must say |
|---|---|---|
| **Two Eyes and a Seven** (signature) | Signing letters "007" doubles Walsingham's payout and Secrecy loss | Deacon's claim. Teresa Burns found no such signature (via Duns 2018). Clulee calls Deacon's account "largely fantasy and speculation" (Clulee 2015, 229–230) |
| **The Forest of Dean** | An angelic warning of Spanish arsonists foils the plot | Found only in Deacon and works derived from him. Not in Dee's diaries or the actions in the corpus |
| **The Angels Are a Code** | Every action produces a cipher report for London | Hooke's 1690 guess, revived by Deacon. Rejected by Whitby 104–105 |
| **The Russian Manuscript** | A coded action sent via Garland | Deacon's source "Divers Curious Narrations" could not be traced (Whitby 113–114) |
| **The Armada Storm** | Dee raises or predicts the 1588 storm | Web material only (New Dawn 2008), no source. Dee was at Třeboň throughout 1588 (Parry 201–202) |

## Revisions after independent read 1 (`review/ESPIONAGE_READ1.md`)

All SERIOUS items and edits for this file accepted; no disagreement. Armada card: Dee at Třeboň throughout 1588 (Parry 201–202); 1555 "cleared of treason", not "service" (Parry 37); 1583 Bonner use labelled Parry's inference; Parry 169 for Halton; Young cited to Baldwin 106–107; Wilson's counter-magic placed at Norwich (Parry 132); Murphyn visit decoupled from the suit's outcome.
