# Accuracy flags: card data and SYSTEMS_V2

An independent read, 2026-10-03, of `docs/SYSTEMS_V2.md` and everything under `src/data/`
as it stood that afternoon (`encounters/prague.ts` and `encounters/england_events.ts` were
imported but not yet on disk, so they are not covered). Every quoted line below was
re-checked against the file immediately before this report was written; line numbers are
from that check and will drift as other agents edit.

Checks were made against `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite`
(page numbers are the corpus's). Where a correction rests on general knowledge rather than
the corpus, it says so. **[inference]** marks my own judgement.

Severity: **HIGH** = wrong fact or a breach of the speech rule a player will see;
**MED** = overclaim or misattributed source; **LOW** = precision, consistency, wording.

---

## A. Invented direct speech given to a real person

Earlier passes already removed the invented lines for Walsingham, Łaski and the Queen's
"Tell me, Dr. Dee" (now reported speech). Two remain.

### A1. HIGH — Elizabeth speaks
- **File:** `src/data/encounters/index.ts:251` (`elizabeths_interest` → `present_occult` outcome)
- **Line:** `"Keep this between us," she says.`
- **Why:** invented direct speech attributed to Elizabeth I (SYSTEMS_V2 §10).
- **Fix:** `She asks that nothing of this be repeated outside the chamber.`

### A2. LOW — the Queen's question in a messenger's mouth
- **File:** `src/data/encounters/index.ts:129` (`comet_at_windsor.flavorText`)
- **Line:** `"What does it mean, Dr. Dee?" — the Queen's messenger has come twice.`
- **Why:** the speaker is anonymous, which §10 allows, but the line reads as the Queen's
  question relayed verbatim. Borderline.
- **Fix:** `The Queen's messenger has come twice to ask what it means.`

No other direct speech by a real person was found in `src/data` (search for quotation marks,
"says", "said" across all `.ts` files). The library card's `"Hardly gotten moniments"` is a
real Dee quotation with a source (Håkansson 12–14, verified in the corpus).

---

## B. Wrong facts

### B1. HIGH — Jane and the children did not stay behind
- **File:** `src/data/encounters/index.ts:430` (`career_transition_continental.description`)
- **Line:** `But leaving England means leaving the Crown's protection, the Mortlake library, and Jane and the children.`
- **Record:** Laski, Dee, Kelley, "Mrs. Dee and Mrs. Kelley and the three children, Arthur,
  Katherine and Rowland Dee, embarked" at Gravesend (Fell Smith 64–65); in 1585 Jane, Joan
  Kelley, the children and servants were left *in Prague* (Fell Smith 87–88). The game's own
  biography entry `continental_departure_1583` correctly says "Dee and Jane depart".
- **Fix:** `But leaving England means taking Jane and the children on the road, leaving the Mortlake library in other hands, and leaving the Crown's protection.`
  Also add to SYSTEMS_V2 §5 that household crew cross with Dee.

### B2. HIGH — Roger Cooke is documented, an assistant, and leaves in 1581
- **File:** `src/data/characters/index.ts:35–45` (`ROGER_COOKE`)
- **Lines:** `role: 'secretary'`, `historicalStatus: 'plausible'`, `available: true` with no departure;
  and `encounters/index.ts:17` "Roger Cooke has organized the correspondence."
- **Record:** "Roger Cook (who had been with me from his 14 years of age till 28) ... requested of
  me licence to depart", 5 Sept 1581 (Fenton 26–28); Dee "revealed to Roger Cook the great secret
  of the elixir of the salt" (Fenton 20–21); Robert Gardner was "Dee's alchemical assistant
  following the departure of Roger Cook in 1581" (Fenton 341–342).
- **Fix:** `historicalStatus: 'documented'`, `role: 'assistant'`, Alchemy up, sources
  `['Fenton 20–28, 341–342']`; add a departure event at about England day 69. Change the
  household line to "Roger Cooke tends the furnaces."

### B3. HIGH — "Word reaches Prague" of the spoiling
- **File:** `src/data/factions/weather.ts:49–55` (`weather_mortlake_spoiled`, `documented`)
- **Line:** `Word reaches Prague that the library and laboratories at Mortlake are being despoiled.`
  Sources: `['Håkansson 31–33', 'Whitby 52–54, 67–70']`.
- **Record:** Dee learned the extent on his return in 1589 (*Compendious Rehearsal*; Sherman
  44–45). What reached him abroad was a vision of Kelley's during the 1583 journey, which
  Roberts and Watson quote, saying Kelley was "either genuinely clairvoyant or had heard rumours
  from England" (Fenton 126–128 n.6). Also: Whitby 44–46 repeats the *mob* story, so it cannot be
  cited for "not by a mob".
- **Fix:** move the event to the voyage (before Prague day 0) and reword:
  `On the road, Kelley sees in the stone the library at Mortlake broken open. Dee cannot know whether it is true. (It was: in 1589 he found books and instruments taken by servants and friends who thought he would not return.)`
  Sources: `['Fenton 126–128 n.6', 'Håkansson 31–33', 'Sherman 44–45', 'Whitby 44–46 (Fromond sold goods)']`.
  SYSTEMS_V2 §5 "news of the library's spoiling reaches Prague later" should change to match.

### B4. HIGH — Murad III's millennium date
- **File:** `src/data/biography/entries.ts:293` (`MURAD_III`); also `research/OTTOMAN_CONNECTION.md`
  (table), `research/DEE_MASTER_BIOGRAPHY.md` (Ottoman route), `C:\Dev\DeeVisualNovel\docs\BIOGRAPHY.md:264`.
- **Line:** `Reign spanned Islamic millennium (992 AH / 1592 CE).`
- **Why:** the millennium is 1000 AH, which began in October 1591 (1591–92 CE). 992 AH is 1584.
  (Calendar arithmetic; not a corpus check.)
- **Fix:** `Reign spanned the Islamic millennium (1000 AH, 1591–92 CE).`

### B5. MED — the Windsor comet is 1577, and was a political errand
- **File:** `src/data/encounters/index.ts:123–200` (`comet_at_windsor`, `plausible`)
- **Record:** "in 1577 Dee spent three days at Windsor Castle advising the queen about the
  significance of a comet" (Harkness 149); Leicester used Dee to counter "great fear and doubt"
  spread by "Men of no small account" about a comet whose tail pointed to the Netherlands
  (Parry 148–150; also 116–117). The game sets it in 1580–83 with no date and frames it as an
  open interpretive question.
- **Fix:** keep `plausible`, but add to the description that this repeats the documented
  consultation of November 1577, and add a source line `['Harkness 149', 'Parry 116–117, 148–150']`.
  [inference] A choice framed as "whose fear are you answering?" would be closer to the record.

### B6. MED — the calendar event misdescribes Dee's proposal and its date
- **File:** `src/data/factions/weather.ts:16–21` (`weather_calendar_reform`, day 80)
- **Line:** `The bishops block Dee's proposal to bring the English calendar into line with the Gregorian reform.`
  Source: `['DEE_MASTER_BIOGRAPHY Act IV']`.
- **Record:** Dee delivered his treatise to Burghley on 26 Feb 1583 (Whitby 490 n.34); the
  mathematicians agreed eleven days should be cut but accepted ten; Burghley recommended Dee's
  plan; Walsingham's handling provoked the bishops (Parry 174–177).
- **Fix:** `Burghley accepts Dee's reckoning, trimmed from eleven days to ten. The bishops refuse a calendar that comes from Rome.`
  Sources `['Parry 170–177', 'Whitby 490 n.34']`. Move from day 80 to about day 130
  (ARC_REPORT §5).

### B7. MED — unverified quotation-like paraphrase from the papal envoys
- **File:** `src/data/factions/weather.ts:59` (`weather_papal_inquiries`)
- **Line:** `One of them writes that they prefer one philosopher's stone to ten visions of angels.`
- **Check:** not found in the corpus. Harkness 70–72 has Bonomi's letter fragment reporting
  "various rumours"; Håkansson 255–257 has the nuncio deeming Dee's "blessed spirits" to be
  "evil ones".
- **Fix:** use the documented judgement, reported: `The bishop of Vercelli's report to the Emperor repeats rumours about the Englishmen; the nuncio holds that Dee's "blessed spirits" are evil ones.`
  Sources `['Harkness 70–72', 'Håkansson 255–257']`. If the original line has a source outside the
  corpus, cite it with a page.

### B8. MED — the Book of Soyga survives
- **File:** `src/data/biography/entries.ts:854` (`BOOK_OF_SOYGA_DOC.publicationStatus`)
- **Line:** `publicationStatus: 'lost_but_referenced'`
- **Why:** two manuscripts survive (Bodleian and British Library, identified in 1994; general
  knowledge); the corpus itself holds *The Magic Tables in the Book of Soyga*, and Whitby 166–168
  traces a Dee copy through Ashmole.
- **Fix:** `publicationStatus: 'manuscript'`.

### B9. MED — Dee's diaries survive
- **File:** `src/data/biography/entries.ts:837–839` (`DIARIES_AND_DAYBOOKS`)
- **Line:** `publicationStatus: 'lost_but_referenced'` and `Dee's personal diaries, largely lost but extensively quoted`
- **Record:** "Dee's 'diaries' consist of notes in various places, primarily two ephemerides
  (Oxford, Bodleian Library, Ashmole MS 487 and 488), and the records of his 'angelic
  conversations'" (Clulee, *Ambix* 52.3, 4–5).
- **Fix:** `publicationStatus: 'manuscript'`; `Dee's diary notes, kept in the margins of two ephemerides (Ashmole MSS 487–488), plus the records of the actions.`

### B10. MED — the Mathematical Preface's printer
- **File:** `src/data/biography/entries.ts:1143` (`PRINTING_VENTURES`)
- **Line:** `Mathematical Preface through Billingsley in London.`
- **Why:** Billingsley was the translator; the 1570 Euclid was printed by John Day (general
  knowledge).
- **Fix:** `The Mathematicall Praeface in Henry Billingsley's English Euclid, printed by John Day in London.`

### B11. MED — *Compendious Rehearsal* and *Brytannicae Reipublicae Synopsis* were manuscripts
- **File:** `src/data/biography/entries.ts:870` (`COMPENDIOUS_REHEARSAL`), `:785` (`BRYTANNICAE_BOOK`)
- **Line:** `publicationStatus: 'published'` (both)
- **Why:** the *Rehearsal* was read to the Queen's commissioners at Mortlake in 1592 (Fenton
  268–270; Whitby 52–54), not printed in Dee's lifetime; the *Synopsis* is among the "manuscript
  sources" Sherman analyses (Mebane's review of Sherman, JEGP 96.2, 2–3).
- **Fix:** `publicationStatus: 'manuscript'` for both. Same for the `brytannicae_1570` event's
  verb "Wrote" (fine) and the document's description.

### B12. LOW — residence date conflict
- **File:** `src/data/biography/entries.ts:911` (`MORTLAKE`) vs `src/data/cards/house.ts:10`
- **Lines:** `Dee's primary residence from 1570s onward.` vs `...settled after his return from Antwerp in 1564.`
- **Fix:** align on the house card's mid-1560s (Clulee, *Ambix* 52.3, 15–16).

---

## C. Overclaims and misattributed sources

### C1. MED — Jane as "intellectual peer"
- **File:** `src/data/biography/entries.ts:60, 62` (`JANE_DEE`)
- **Lines:** `roles: [..., 'intellectual_partner']`; `relationship: 'Wife; intellectual peer; ...'`
- **Why:** nothing in the corpus supports it. The documented Jane is a former lady-in-waiting
  (Fell Smith 33–34; Whitby 41–42), the household's manager, and a petitioner at court (Fenton
  279–281, 1594).
- **Fix:** `roles: ['spouse', 'household_manager']`; `relationship: 'Wife; formerly in service at court; manager of the household at Mortlake and on the Continent.'`

### C2. MED — "251+ diary entries" of warnings
- **Files:** `src/data/biography/entries.ts:58` (`JANE_DEE`), `:595` (`KELLEY_ARRIVES_1582`)
- **Lines:** `Attested in 251+ daybook entries.`; `Jane Dee's warnings appear in 251+ diary entries.`
- **Why:** 251 is a corpus query hit count, not a count of warnings. The documented incident is
  one erased diary entry, 6 May 1582: Jane "in a mervaylous rage" (Whitby 24–26; Harkness 35–37;
  Fenton index "'marvellous rage' against skryers 44").
- **Fix:** `Her anger at the scryers is recorded in an erased diary entry of 6 May 1582.`

### C3. MED — Burghley "backed Frobisher via the Memorials"
- **Files:** `src/data/biography/entries.ts:120` (`CECIL_BURGHLEY`), `:547` and `:806`
  (*General and Rare Memorials* event and document), `:1125` (`FROBISHER_EXPEDITION`)
- **Lines:** `Backed Frobisher's expedition via the *General and Rare Memorials* (1576–77).`;
  `Backed Frobisher's Arctic expedition.`
- **Why:** the *Memorials* argued for a standing "petty navy" and maritime sovereignty; Parry
  notes Dee's Windsor title claims of 1577 "had no connection to Frobisher's Letters Patent"
  (Parry 116–117). Dee did advise the voyagers, but the book did not back the voyage, and the
  corpus gives no Burghley sponsorship of it.
- **Fix:** Burghley: `Lord Treasurer; received Dee's petitions and complaints; accepted his calendar reckoning in 1583 (Parry 174).` Memorials: `Argues for a standing navy and British maritime sovereignty.`

### C4. MED — Walsingham "recruited Dee"
- **Files:** `src/data/biography/entries.ts:166` (`WALSINGHAM`), `:963` (`BARN_ELMS`)
- **Lines:** `Recruited Dee for cryptography and intelligence work.`;
  `Walsingham's headquarters. Center of intelligence operations and cryptographic work.`
- **Why:** `docs/HISTORY.md` itself says Dee's link to intelligence networks "is plausible but
  exact details are contested". Documented: Walsingham summoned Dee to Richmond on the calendar
  (Parry 174); his correspondents reported on Dee abroad (Parry 195–197).
- **Fix:** `Principal Secretary and neighbour at Barn Elms. Handled Dee's calendar advice in 1583; his agents reported on Dee abroad. Cipher work for him is plausible, not documented.`
  Barn Elms: `Walsingham's house at Barnes, near Mortlake.`

### C5. MED — the Soyga event states an argument as fact
- **File:** `src/data/biography/entries.ts:613` (`BOOK_OF_SOYGA_EVENT.consequence`)
- **Line:** `Dee unknowingly engaged with Ottoman magical corpus.`
- **Why:** this is Melvin-Koushki's argument (M-K 2021), tagged contested in
  `research/ENCOUNTER_CANDIDATES.md` #9.
- **Fix:** `If Melvin-Koushki is right, Dee was working with lore that came from the Ottoman courtly corpus without knowing it.`

### C6. MED — Murad III, Sidney: the person is documented, the relation is not
- **File:** `src/data/biography/entries.ts:283` (`MURAD_III`, `counterfactual`), `:201` (`PHILIP_SIDNEY`, `plausible`)
- **Why:** both men are documented. What is counterfactual (Murad) or plausible (Sidney's
  meetings with Dee) is the relationship. A Codex that tags Murad III himself counterfactual
  tells a player he did not exist.
- **Fix:** person `historicalStatus: 'documented'`; put the status on `relationship` text:
  `COUNTERFACTUAL: never met Dee...` / `Specific meetings with Dee plausible.`

### C7. MED — quoted phrases not found in the source
- **Files:** `src/data/biography/entries.ts:446`, `:1057` (`"living institution"`, `"reading and writing as political act"` attributed to Sherman); `:1089` (`"employment and exile"`)
- **Check:** neither Sherman phrase occurs in either Sherman text in the corpus. "Employment and
  exile" appears to paraphrase Parry's chapter title "Checkmate: Exiling the Conjuror to
  Manchester" (DeeVisualNovel `BIOGRAPHY.md` Act VII).
- **Fix:** remove the quotation marks and say "Sherman argues the library was a working
  institution"; for Manchester, `Parry reads the appointment as exile (ch. "Checkmate: Exiling the Conjuror to Manchester").`

### C8. LOW — invented dates and precision
- `src/data/biography/entries.ts:36` `dateEnd: '1608-12-01'` while the description says the
  register is lost. **Fix:** `'1608/1609'` or leave empty with a note.
- `:186` Łaski `dateStart: '1550'`. Olbracht Łaski was born in 1536 (general knowledge;
  verify). **Fix:** `'1536'`.
- `:228` Murphyn `dateStart: '1550'`, `dateEnd: '1590'`; `:246` Prestall `1540`/`1590`. Not in
  Parry's pages cited. **Fix:** leave empty or mark `c.` with "dates unknown".
- `src/data/characters/index.ts:48` Saul `age: 30`. "His date of birth is not recorded"
  (Whitby 64–65). **Fix:** keep as a game value but add `'age invented; birth unrecorded (Whitby 64–65)'` to sources.
- `src/data/biography/entries.ts:566` Jane's marriage `sources: ['CONTEXT']`. **Fix:**
  `['Whitby 41–42 (5 February 1578)', 'Fell Smith 33–34']`, and it is documented.

---

## D. Design data that contradicts its own rules

### D1. MED — the show-stone is sold
- **File:** `src/data/cards/instruments.ts:81–93` (`show_stone`, `market: true`, price 18) vs the
  file's header comment `Ritual apparatus is never sold; the angels specify it.`
- **Why:** the first apparatus that gates the whole angelic path can be rolled at Paul's
  Churchyard and the Old Town. [inference] The record has Dee owning crystals and the angels
  "giving" another (the card's own summary); it does not have him buying one at a stall.
- **Fix:** remove `market: true`; give the first stone at start or by encounter.

### D2. MED — Soyga in a market pool
- **File:** `src/data/locations/index.ts:7–8` (`LONDON_BOOKS` includes `book_soyga`)
- **Why:** provenance unknown; on Dee's shelf by 17 January 1582 (Harkness 58–60). A market
  roll makes the first Ottoman signal luck.
- **Fix:** remove from the pool; place on the starting shelf or acquire by encounter
  (BOOKS_AS_STORY §1).

### D3. MED — the Continental Question is tagged documented as a whole
- **File:** `src/data/encounters/index.ts:426–503`
- **Why:** only the Łaski departure is documented. Staying (`endCareer`) and leaving
  independently did not happen; the Ottoman option is labelled in its text but the encounter's
  tag says `documented`.
- **Fix:** add per-choice status (or a `[COUNTERFACTUAL]` prefix in the text, as the Ottoman
  option already has) to `transition_stay_england` and `transition_depart_independent`.

### D4. LOW — "Cipher office"
- **File:** `src/data/cards/rooms.ts:51` (Scriptorium L3 label)
- **Why:** names an institution Dee did not keep; the room is `plausible`, but the label reads
  as a fact.
- **Fix:** `Copyists at work`, or keep and add "(plausible)" to the effect text.

### D5. LOW — Library L3 is the departure catalogue
- **File:** `src/data/cards/rooms.ts:20–21`
- **Line:** `label: 'The 1583 catalogue'`, `Dee listed his library in 1583.`
- **Why:** true, but the catalogues are dated 6 September 1583 and were made by the bookseller
  Fremonsheim as Dee borrowed £400 against the books before leaving (Whitby 1031–1034; Parry
  191–193). As a building level it misplaces the act.
- **Fix:** see BOOKS_AS_STORY §4; or reword: `Dee had his library catalogued in September 1583, before leaving England.`

---

## E. Research documents (outside `src/data`, worth correcting by the standing rule)

| File | Line / claim | Correction |
|---|---|---|
| `research/MECHANICS_FROM_BIOGRAPHY.md` §V | GRM "failed to get him the Mastership of St. Cross" (placed 1576–80) | St Cross is the 1590s (Parry 105–107; Whitby 52–54). |
| `research/ENCOUNTER_CANDIDATES.md` table | "Comet of 1582 and the calendar question" | The Windsor comet is 1577 (Harkness 149; Parry 148–150); calendar is 1583. |
| `research/OTTOMAN_CONNECTION.md` | "Rudolf II gave Dee one audience and a courteous refusal" | One audience, yes; Rudolf deferred ("the time was not convenient") and named Curtius (Whitby 44–46). Deferral, not refusal. |
| `research/OTTOMAN_CONNECTION.md` | Earned-ending text: "Your eschatological project and his millennial moment are the same project." | Omits that the angels' project was the *conquest* of Constantinople (Fenton 144–146; Parry 197–199). See PRAGUE_AND_OTTOMAN Part 2. |
| `research/DEE_MASTER_BIOGRAPHY.md` Act VI | "Late 1580s: Mortlake library despoiled" | Begun soon after the 1583 departure; found in 1589 (Whitby 44–46; Håkansson 31–33). |
| `docs/HISTORY.md` | "Dee left England in 1583 with Edward Kelley and Albert Laski" | Add: with Jane, three children and Joan Kelley (Fell Smith 64–65). |
| `research/DEE_MASTER_BIOGRAPHY.md`, `OTTOMAN_CONNECTION.md` | "992 AH / 1592 CE" | 1000 AH (1591–92 CE). See B4. |
