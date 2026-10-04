# Alchemy asset cards for FTLDee (proposals)

DESIGN file. Proposals for the orchestrator to convert into `src/data/` TypeScript; nothing here is
code. Field names follow `src/core/types.ts` (`Book`, `InstrumentCard`, `RoomCard`/`RoomLevelSpec`,
`Encounter`/`EncounterChoice`/`OutcomeSpec`, `Character`, `ErrandCard`) and the rules in
`docs/SYSTEMS_V2.md`. Every card has `historicalStatus`, `sources` (short cites keyed to
`RAMPLING.md`, `RIPLEY.md`, `DEEALCHEMYLABORS.md`) and a **Play:** line saying what the player does
differently because of it. Real people get reported speech only; quotations are corpus quotations
with cites. Existing ids are reused where they exist (`edward_kelley`, `roger_cooke`, `jane_dee`,
`dee_monas`, `paracelsus_selected`, `lull_ars`, `glassware`, `travelling_chest`, locations
`mortlake`, `london`, `oxford`, `hajek_house`, `old_town`, `trebon_road`).

**Design spine drawn from the research (the gate in PIPELINE.md: the symbolism must be recoverable
from behaviour).**
1. *A book opens a book* ("Liber librum apperit", a well-known aphorism Dee wrote over his Ripley copies, R2012a 504):
   alchemical books do little alone; pairs unlock operations. The player learns that alchemy is
   reading by finding that one text decodes another.
2. *The token*: a practice is "proved" when a promised visible effect appears (gliding fire, the
   crystalline ring) (EF 296–299). Operations show a token or fail; tokens raise standing with
   patrons more than gold does.
3. *Sericon is a cover name*: the same ingredient card reads as red lead or antimony depending on
   which gloss you hold (EF 92, 340; R2014 28). The player's reading changes the result.
4. *Authority is borrowed*: Kelley rises by gifting and re-attributing Ripley (EF 286, 295). Giving
   books away raises network standing; forging lineage is a high-risk blue option.
5. *The reversal*: as the Laboratory and Kelley's skill grow, Dee's control falls (EF 299–300;
   Parry 186, 202). Lab success at Třeboň feeds Kelley's standing, not Dee's.

---

## 1. Books

### `ripley_compound` : The Compound of Alchemy (the Twelve Gates)
- author: George Ripley, canon of Bridlington · date: 1471 (MS; printed London 1591) · subject:
  alchemy, transmutation · language: Middle English verse
- intellectualTags: `alchemy`, `ripley_corpus`, `english_tradition`, `lower_astronomy`
- prerequisites: none (English) · operationsUnlocked: `read_twelve_gates`, `cross_reference_ripley`
- historicalStatus: **documented** · rarity: common (manuscript) · value: 6 · portability: portable
- provenance: Dee's annotated copy, Bodleian MS e Musaeo 63 · censorshipStatus: open
- skillBonus: { alchemy: +1 }
- notes: "one of the best known alchemical works in England" by the 1560s (R2012a 500). Dee's
  annotation dated 1595 (R2012a 500) or 1597 (CRC 155): status of the annotation **contested**.
- marginalia: "Riplay in his 12 Ga[tes] in the Chap. of Ferm[entation]" (Dee, in his *Accurtations*
  copy, R2012a 500).
- sources: EF 73, 78–79; R2012a 500; CRC 155
- **Play:** the common entry book; worth little alone, but it is the key that makes the
  *Accurtations* and the Bosome Book cards yield operations (pair rule below).

### `ripley_wheel` : Ripley's Wheel (Coelum philosophorum)
- author: George Ripley (figure appended to the *Compound*) · date: c. 1471 · language: Latin/English
  labels · tags: `lower_astronomy`, `ripley_corpus` · prerequisites: [`ripley_compound`]
- operationsUnlocked: `read_proportions` · status: **documented** (as a figure); its authority
  **contested** before R2013 (R2013 53 n. 26) · rarity: uncommon · value: 5 · portability: pocket ·
  censorship: open · skillBonus: { alchemy: +1, astronomy: +1 }
- notes: four metallic "planets" (gold, silver, copper, mercury) on ten spheres; the sphere of Venus
  is the Green Lion; "Our table also of the lower Astronomy" (R2013 56–58; EF 310). Dee's own
  *Monas* treats alchemy as "astronomia inferior" (Clulee 2005 207–208).
- **Play:** the only book that adds both Astronomy and Alchemy: with `dee_monas` it lets Dee pass
  Alchemy checks using his Astronomy (lower astronomy = the stars on earth).

### `ripley_medulla` : Medulla alchimiae / The Marrow of Alchemy
- author: George Ripley · date: 1476 (Latin); English by David Whitehead, 1552 · language: Latin or
  English · tags: `sericon`, `vegetable_stone`, `medicine` · prerequisites: [] ·
  operationsUnlocked: `vegetable_stone`, `aqua_composita` · status: **documented** · rarity:
  uncommon · value: 8 · portability: portable · censorship: open ·
  skillBonus: { alchemy: +1, medicine: +1 }
- notes: the sericon recipe: "Take the sharpest humidity of grapes" and red-calcined lead (EF 92);
  written to a bishop as a patronage petition (EF 76, 80). Ripley's own work per Rampling;
  Newman doubts common authorship with the *Compound* (Newman 2021; R2021).
- **Play:** the medicine book; it turns the Laboratory toward healing patrons (Medicine checks), the
  route Ripley himself took with an ailing bishop.

### `ripley_accurtations` : Accurtations of Raymond (Dee's transcription)
- author: attrib. George Ripley (composite) · date: 15th c., Dee's copy c. 1575–1600 · language:
  English with Dee's Latin notes · tags: `sericon`, `ripley_corpus`, `pseudo_lull` ·
  prerequisites: [`ripley_compound`] (to read it as Ripley) · operationsUnlocked:
  `sericonian_recipes` · status: **documented** · rarity: rare · value: 10 · portability:
  portable · censorship: open · skillBonus: { alchemy: +1, manuscriptKnowledge: +1 }
- provenance: Wellcome MS 239 (CRC 1.9) · marginalia: see `ripley_compound`
- notes: source text later stripped of Raymond and Guido to make the *Work of Dunstan* (EF 290).
- sources: R2012a 500; CRC 139; EF 290
- **Play:** the hidden parent of the Book of Dunstan; owning both reveals (flag) that "Dunstan" is
  Ripley in disguise, unlocking the forgery encounter's honest option.

### `ripley_philorcium` : Philorcium alchymistarum
- author: attrib. Ripley ("quite likely pseudepigraphic", R2021 pdf 3) · Latin ·
  tags: `ripley_corpus` · operationsUnlocked: `dissolve_by_little` · status: **documented**
  (Dee used it in 1581) · rarity: uncommon · value: 5 · portability: pocket · skillBonus: { alchemy: +1 }
- notes: Dee kept the water down "as Riplay in philortium warnes of" (R2012a 500; EF 296).
- **Play:** reduces failure chance of any distillation operation by one step; a cheap safety card
  that Dee really relied on, though modern scholarship doubts Ripley wrote it.

### `ripley_bosome_book` : Ripley's Bosome Book (Norton's discovery; Dee's copy)
- author: attrib. George Ripley (compendium; original lost) · date: 15th c.; found by Samuel Norton,
  translated 1573/4 · language: Latin (English redactions) · tags: `sericon`, `tokens`,
  `ripley_corpus` · prerequisites: [`ripley_compound`] · operationsUnlocked: `great_corrosive`,
  `gliding_fire`, `distil_sericon` · status: **plausible** for Dee's ownership (Rampling's
  inference, R2012a 505), **documented** for the book and Norton's translation (EF 259–261) ·
  rarity: unique · value: 25 · portability: portable · censorship: open ·
  skillBonus: { alchemy: +2 }
- marginalia: "Liber librum apperit" (the "well known aphorism" under which Dee grouped his Bosome Book
  redactions, R2012a 504);
  "J:D. E:K." (Harley 2411 note, EF 297)
- sources: EF 259–263, 296–299; R2012a 504–505; CRC 141
- **Play:** the crown jewel of the Laboratory: the only source of the two token operations; if it
  rides in the satchel to Bohemia, Kelley's later rise runs through it (see encounter
  `sericon_over_the_gate`).

### `zacaire_opuscule` : Denis Zacaire, Opuscule (Dee's English/French copy)
- author: Denis Zacaire · date: 16th c. · language: French (Dee translated for Kelley) · tags:
  `alchemy`, `continental` · prerequisites: [] (French via `languages` ≥ 3 to translate) ·
  operationsUnlocked: `translate_for_kelley` · status: **documented** · rarity: uncommon · value: 6 ·
  portability: portable · censorship: open · skillBonus: { alchemy: +1 }
- notes: translated "out of French" for Kelley (R2012a 503); "by spiritual commandment"; burned in the
  12 Dec 1587 lamp fire (Fenton 231); a second copy of the "twelve letters" lent to Cavendish under
  an oath of secrecy, 31 July 1590 (Fenton 250).
- **Play:** a lending book: lending it to a crew member or contact raises their alchemy and your
  standing with them, at a Secrecy cost.

### `book_of_dunstan` : The Book of Dunstan (with the red powder)
- author: attrib. St Dunstan · date: found by Kelley 1582–83 · language: Latin · tags:
  `dunstan`, `forgery`, `sericon` · prerequisites: crew [`edward_kelley`] (only Kelley can find it)
  · operationsUnlocked: `project_red_powder` · status: **contested** (Kelley's forgery, Fenton 61
  n. 9; older tract, Whitby 44–45; Ripleian reworking Kelley probably adapted, EF 290, 312) ·
  rarity: unique · value: 0 (cannot be sold) · portability: pocket · censorship: controversial ·
  skillBonus: { alchemy: +1, occultPhilosophy: +1 }
- **Play:** comes with a limited "red powder" charge (see instrument); every projection spends it,
  and it never proves to be the whole stone (Parry's explanation of Kelley's failure at Lasko,
  Parry 174; paraphrase, not the angels' words).

### `lull_de_secretis` : De secretis naturae (pseudo-Lull)
- author: pseudo-Ramon Lull · tags: `pseudo_lull`, `quintessence` · status: **documented** (Dee
  owned at least six copies by 1583, R2012a 500) · rarity: common · value: 4 · portability:
  portable · censorship: open (attacked by Conring as "full of follies and vanities" only in 1648,
  EF 316) · skillBonus: { alchemy: +1 }
- **Play:** duplicates are cheap in markets; holding two lets you gift one (modelled on
  Clulee's suggestion, reported in R2012a 498–499, that Dee may have spread Paracelsian doctrines
  "perhaps by loaning out copies", supported by names labelled "discipulus" in his books; not
  pseudo-Lullian, and hedged in the source) for a Scholar-network gain.

### `dee_alchemical_list_1556` (not a book: a starting tag)
- Start-of-game knowledge tag `alchemical_reader_1556` from the July 1556 list of 55 authors
  (Clulee 2005 199; R2011 143). status **documented**.
- **Play:** lets Dee recognise authorities in markets (shows a book's real attribution on hover),
  modelling the reader before the practitioner.

## 2. Instruments

### `lorraine_vessels` : Vessels from Lorraine
- kind: instrument · status: **documented** · price: 30 · rarity: rare · skillBonus: { alchemy: +1 }
  · baseOnly: true · travels: false · market: false (errand only)
- summary: clear glass, earthen and metal vessels bought in Lorraine in 1571; "a great cart lading of
  purposely made vessells" (Clulee 2005 212; Parry 86–87). Fromoundes later sold them at about 80 per
  cent of value (Parry 172).
- **Play:** better than `glassware` but cannot travel; if left at Mortlake it is lost on emigration
  and appears as a loss in the spoliation news.

### `round_bricks` : Dee's round bricks
- kind: instrument · status: **documented** · price: 4 · rarity: common · skillBonus: {} ·
  baseOnly: true · travels: true
- summary: Jan Kapr built furnaces "over the gate" using "my rownd bricks" (R2012a 506; EF 293).
- effect proposal: halves the chance of a laboratory accident (see `lamp_overthrown`).
- **Play:** the humble safety upgrade; the 1587 fire happened because the glass was "not stayed with
  bricks about it" (Fenton 231).

### `red_powder` : Kelley's red powder
- kind: ritual · status: **documented** (powder produced by Kelley in 1583, who said a spirit led him
  to it; handed to Kelley for Rožmberk 4 Feb 1589: Whitby 43–45; Fenton 238) · price: — · rarity: unique · baseOnly: false · travels: true
- effect proposal: 3 charges; each projection = large Fortune/standing gain if a token appears,
  otherwise Secrecy loss. Cannot be replenished by Dee.
- **Play:** a spendable miracle the player must ration; spending it for Laski in Poland (as
  historically, Parry 173–174) is usually a waste.

### `perspective_glass_gift` (existing optics card if present) : note only
- Dec 1588 Dee gave Kelley his perspective glass, which went to Rudolf's Kunstkammer (Parry 202–203).
  **Play:** an instrument that can be given away to buy Kelley's goodwill at Třeboň.

### `black_lute` : Mr John Dee his black lute
- kind: instrument · status: **documented** (recipe in circulation, Parry 88) · price: 3 · rarity:
  common · skillBonus: { alchemy: +0 } · baseOnly: true · travels: true · market: true
- effect proposal: sealed vessels: volatile operations (stinking menstruum, EF 93) do not lose
  their yield.
- **Play:** a reputation item: other practitioners copy Dee's lute recipe; owning it gives +1 to
  Scholar network when shown.

## 3. Laboratory room: proposed level effects (revision of `rooms.ts` laboratory)

Existing: L1 one furnace / L2 two laboratories (+1 Alchemy, Medicine) / L3 three laboratories.
Keep costs; add effects tied to the research.

| level | label | effect (proposal) | status | sources |
|---|---|---|---|---|
| 1 | One furnace and a still | Operations possible at base. **Notebook rule:** each operation writes a log line with weights and times (Dee's 1581 practice); a failed operation still gives +1 Focus learning if logged. | documented | Clulee 2005 212–213; R2012a 500 |
| 2 | Two laboratories, an assistant at the stills | +1 Alchemy/Medicine; a posted crew member (Cooke, Gardner) can run an operation while Dee is away; Hidden cost: assistant may leave "malcontent" if barred from Dee's secret work. | documented | Clulee 2005 212; Fenton 14–15 |
| 3 | "My three laboratories, serving for Pyrotechnia" | +2 to key skills; tokens shown in the lab raise Elizabeth/Burghley standing; continental courts take notice. Spoliation risk on emigration covers everything not packed. | documented (three labs by 1583) | Clulee 2005 212; Clulee 1988 178; Parry 85 |
| 3+ | Libavius's plan (optional cosmetic) | the lab's floor plan redrawn on the monad's proportions; no rules change. | **anachronistic** (Libavius, after Dee; year unverified) | Forshaw 2005 267 |

**Třeboň variant (if the sector is built):** "Laboratory over the gate" belongs to Kelley, not Dee:
Dee may post himself there as assistant; results credit Kelley's standing. status documented (EF
293; R2012a 505–506).

## 4. Encounters

### `blomfild_polychronicon` (Mortlake/London, England sector)
- status: **documented** (gift 16 May 1561; discussion of secrets is Rampling's possibility,
  EF 203 → choice outcomes **plausible**)
- setup: the former Benedictine William Blomfild, a known alchemist (EF 203), calls; Dee holds a
  Polychronicon from St Augustine's, Canterbury.
- choices:
  1. Give him the book as a friend's gift (cost: book `polychronicon` if owned, else £3) → +3
     Scholar network; flag `blomfild_friend`; unlock a later `monastic_practice` operation.
  2. [blue: `manuscriptKnowledge` 3] Ask what the monks practised before the Dissolution → +1
     alchemy, knowledge tag `mixed_economy`; Secrecy −2 (talk of old conjurers; Blomfild had been
     arraigned for conjuring in 1546, EF 186).
  3. Keep the book → nothing.
- **Play:** the player learns that the English tradition is inherited from people, not just books.

### `norton_bosome_book` (London, 1577–82)
- status: **documented** (Norton's find, translation and *Key*; Dee friends Cradock and Smith handle
  the Book) / **plausible** (Dee acquiring a copy, R2012a 505)
- setup: news that a young Somerset gentleman, Samuel Norton, has found "the secret bosome booke of
  Riple" (EF 259) and dedicated a *Key* to the Queen.
- choices:
  1. [requires money 15] Have a copy made → gain `ripley_bosome_book`.
  2. [blue: crew `roger_cooke` or `languages` 4] Copy it yourself from Cradock's sheets → gain the
     book, Focus −10, +1 manuscriptKnowledge.
  3. [blue: book `ripley_compound` + `ripley_accurtations`] Collate it against your other Ripley →
     gain the book and tag `ripley_cross_reference` (the "liber librum apperit" bonus: +1 to every
     Ripley operation).
  4. Ignore it → Norton's suit goes to the Queen; −1 Elizabeth.
- **Play:** the single most important acquisition for the alchemy route; how you get it decides
  how well you can read it.

### `philorcium_warning` (Mortlake laboratory, summer 1581; repeatable lab event)
- status: **documented** (Rawlinson D.241)
- setup: a sublimate yields a slimy "quick mercury"; how much water do you add?
- choices:
  1. Flood it to hurry the work → 50% batch lost (Focus −5).
  2. [blue: book `ripley_philorcium`] Dissolve "by little and little" as Ripley warns → success,
     token chance +20%.
  3. [blue: `mathematics` 4] Weigh each addition and log it → success; +1 alchemy learning.
- **Play:** books change odds on the bench; the mathematician's habit of weighing is its own
  protection (Clulee 2005 213).

### `kelley_red_powder` (Mortlake, March 1583)
- status: **documented** (Whitby 43–45) / book's nature **contested**
- setup: Kelley returns from Blockley with a book, a cipher scroll and a phial of red powder,
  claiming a spirit led him.
- choices:
  1. Accept all → gain `book_of_dunstan`, `red_powder`; Kelley loyalty +10; Secrecy −5.
  2. [blue: book `ripley_accurtations`] Compare the "Dunstan" text with your *Accurtations* → flag
     `dunstan_is_ripley`; Kelley loyalty −5; +2 manuscriptKnowledge. (Counterfactual for Dee to
     notice; the textual relation is Rampling's finding, EF 290 → outcome **counterfactual**.)
  3. Ask the angels what the powder is → no practical answer; Kelley's projections fail (Parry
     173–174); +occultPhilosophy 1.
- **Play:** sets up the forgery thread; honest scepticism costs you Kelley.

### `sericon_over_the_gate` (Třeboň, 8 Feb 1588) — Třeboň sector or epilogue
- status: **documented** (diary + Harley 2411 note)
- setup: at 9 in the evening Kelley sends for Dee to his laboratory over the gate to watch him
  distil sericon "as ... he hard of me out of Riplay" (R2012a 505).
- choices:
  1. [blue: book `ripley_bosome_book`] Read the Great Corrosive aloud and watch for the ring of
     crystal → token: "So in a circle aboue [th]e matter was the cleare matter lyke [mercury]" (EF
     299); co-sign "J:D. E:K."; Kelley standing +, Dee alchemy +1; flag `shared_credit`.
  2. [blue: gloss `sericon_as_antimony`] Read sericon as antimony (Dee's own later gloss) → a
     different product; outcome **contested** (Parry 201 vs EF 297, 340).
  3. Decline; record nothing → Kelley works alone; Dee's role shrinks (flag `reversal_advanced`).
- **Play:** the reversal made concrete: the token proves the book, but the credit goes to the
  hands at the furnace.

### `lamp_overthrown` (Třeboň, 12 Dec 1587; generic lab accident)
- status: **documented** (Fenton 231–232)
- setup: a spirit lamp falls; spirit of wine burns the table and the books on it.
- choices:
  1. Save the books on the table → lose one random alchemical book from the lab; Focus −5.
  2. Save the Book of Dunstan (on the bed) → lose two lab books (Zacaire, extracts) but keep
     `book_of_dunstan` (the historical outcome).
  3. [blue: instrument `round_bricks`] The glass was stayed with bricks → no fire.
- **Play:** fragile knowledge: books in an active Laboratory are at risk; bricks are cheap insurance.

### `great_secret` (Třeboň, 10 May 1588)
- status: **documented**
- setup: Kelley opens "the great secret" to Dee (EF 284; Fenton 235).
- choices: (1) accept as pupil → +2 alchemy, Dee becomes "assistant" (Kelley gains the Laboratory's
  key-skill bonus, not Dee); (2) [blue: `rhetoric` 5] insist on co-authorship → Kelley loyalty −10,
  keep control; (3) write to England of Kelley's success → Elizabeth +5, Burghley +5, Kelley
  courted by England (`dyer_visit` unlocked).
- **Play:** whether Dee rides Kelley's success home or keeps his dignity.

### `whitgift_kelleys_alchemy` (London, July 1590; post-return epilogue)
- status: **documented** (Parry 212)
- setup: the Archbishop doubts Kelley's transmutations.
- choices: (1) defend "the truth of Sir Edward Kelley his Alchemy" → Elizabeth +3, religiousAuth −5;
  (2) disown Kelley → religiousAuth +3, Elizabeth −3; (3) [blue: book `ripley_compound`] argue from
  the English tradition (Rabbards's line, R2012a 506) → +1 both.
- **Play:** the English alchemy line as a political shield.

## 5. Crew / persons

### `roger_cooke` (existing card): additions
- abilities proposal: alchemy 4, medicine 2; personalAgenda: learn the "great secret"; secrets:
  barred from Dee's dealings with "Mr Henrik" (Fenton 14–15).
- event: leaves (Sept 1581) if posted in the Laboratory while Dee works secrets with another; Dee
  promises "some pretty alchemical experiments" (Fenton 15); may return late (1600).
- status: documented · **Play:** the lab assistant who must be trusted with secrets or lost.

### `robert_gardner` : Robert Gardner of Shrewsbury
- role: alchemist · age: ~28 (b. 1554 per Fenton biographical guide 342) · abilities: { alchemy: 3 }
  · personalAgenda: brings a "divinely revealed" secret of the stone (Clulee 2005 200–201) ·
  epistemicReliability: low · status: **documented**
- **Play:** replaces Cooke; offers revelations that cost Focus to test and rarely pay.

### `edward_kelley` (existing card): alchemy branch additions
- developmentBranches: `scryer` → `master_alchemist` (EF 291–293). Unlock when Laboratory ≥ 2 at
  Třeboň and `red_powder` spent ≥ 1.
- secrets: `book_of_dunstan_forgery` (contested), `debts_not_transmutation` (EF 301).
- **Play:** once he branches, his loyalty to Dee decays each month unless Dee assists in the lab.

### `jan_kapr` : Jan Kapr of Kaprštejn (Johannes Carpio)
- role: alchemist (Kelley's laboratory assistant, EF 295; "may also have served as his amanuensis", EF 295;
  R2012a 502 says he "may have" assisted in the laboratory; administrator of Rudolf's vineyards) ·
  abilities: { alchemy: 2, manuscriptKnowledge: 3 } · status: **documented** (R2012a 502; EF 295) ·
  location: trebon_road
- **Play:** a Třeboň crew who copies books (doubles a Ripley book into a giftable copy).

### `nicolaus_mai` : Nicolaus Mai (contact)
- role: court_contact (imperial councillor, later prefect of Joachimsthal mines; poet) · status:
  **documented** (R2012a 501–502; EF 293–294)
- **Play:** a contact who turns a Ripley book into prestige at Rudolf's court (verse translation:
  +continentalCourts).

### `gawin_smith` : Gawin Smith (contact)
- role: court_contact (Master of the Queen's Engines; commissioned the 1593 Bosome Book translation;
  visited Dee at Bremen 1589, petitioned for him 1590) · status: **documented** (R2012a 505) ·
  **Play:** the English friend who carries Ripley news; +Elizabeth on return.

## 6. Errands

### `errand_lorraine_glass`
- summary: send a servant (or go) to Lorraine for vessels · skill: alchemy · difficulty 6 ·
  workDays 20 · cost 25 · success: gain `lorraine_vessels` · failure: lose half the money; crew
  illness (Dee "returned seriously ill", Parry 87) · status: **documented** (1571 journey).
- **Play:** a long, costly trip that permanently upgrades the Laboratory, timed against court events.

### `errand_monastic_alchemica`
- summary: hunt former monastic alchemical manuscripts (St Albans, St Augustine's) · skill:
  manuscriptKnowledge · difficulty 7 · workDays 6 · cost 6 · location: oxford or london ·
  success: gain one of `ripley_accurtations`, `lull_de_secretis` (rolled) · failure: −2 Secrecy
  (suspicion of popish relics) · status: **documented** (EF 202).
- **Play:** the Dissolution as a book market.

### `errand_valkenaw_glasshouse` (Prague sector)
- summary: buy alchemical vessels at the glasshouses of "Valkenaw" · skill: alchemy · difficulty 5
  · workDays 8 · cost 12 · success: `glassware` ×1 + Focus +5 · status: **documented** (May 1586,
  Parry 192).
- **Play:** restocks a lab that could not cross the Channel.

### `errand_lend_zacaire`
- summary: lend Zacaire's letters to a court alchemist (Cavendish) under oath · skill:
  courtlyIntelligence · difficulty 5 · workDays 2 · cost 0 · success: Elizabeth +3 (Cavendish talked
  alchemy with the Queen, Parry 214) · failure: Secrecy −8 (copy leaks) · status: **documented**.
- **Play:** knowledge as currency at court, with leak risk.

## 7. Weather / career events (optional)

- `de_lannoy_in_tower` (1565–67; date **contested**: 1565 R2011 144, 1566–67 Parry 77–78): Court
  wary of alchemists; Laboratory operations give no Elizabeth standing for 30 days. Event
  documented (EF 204–205).
- `rabbards_compound_printed` (1591): Ripley in print, praising Dee's *Monas*; +Elizabeth when
  `dee_monas` owned. documented (R2012a 506).
- `kelley_arrested` (spring 1591: April per EF 284, May per Parry 216): any flag tying Dee to
  Kelley costs −5 Elizabeth. documented (event); month **contested**.

## 8. Cautions for the converter

- Hájek: the existing `hajek_house` card text says "the Emperor's physician"; Rampling (EF 292 n. 31,
  after Purš) says that is a common error (he treated court servants). Mark the card `contested` or
  reword.
- The Laboratory card cites "Sherman, Readings (three laboratories)"; add Clulee 2005 212 (Dee's own
  *Compendious Rehearsall* phrase) as the primary cite.
- Keep "sericon" undefined in rules text; let books gloss it. Fenton's glossary itself calls it an
  "undefined alchemical substance" (Fenton DB p. 325, glossary).
- Do not put Ripley's "1415" birth date on any card: no source on disk supports it (`RIPLEY.md` §8.2).

## Response to review (`review/ALCHEMY_READ1.md`, 2026-10-03)

All four SERIOUS items fixed: no quoted angel speech remains (Parry's narration is paraphrased and
attributed); the arrest month split April (EF 284) / May (Parry 216); Blomfild's conjuring cited to
EF 186; Jan Kapr's roles hedged as in the sources. All five edits accepted ("Liber librum apperit"
as an aphorism, the "discipulus" lending attributed to Clulee and hedged, the powder "produced by
Kelley", the ring quotation in EF's spelling, de Lannoy's date contested). The "Not verified this
round" items (Libavius plan "1606"; Gardner "b. 1554") are handled so: the 1606 date is my own
gloss for Libavius's *Commentariorum alchymiae* and is **not** on Forshaw 2005 267, which gives no
year; treat it as unverified. Gardner's birth year is from Fenton's Biographical Guide, DeeChunks page
342 (printed page not verified). Citation convention: Whitby converted to printed pages (43–45); Parry by
printed page; Fenton by printed page (see the note in `DEEALCHEMYLABORS.md`).
