# Proposed mechanics tweaks, ranked

Written 2026-10-03. Proposals, not decisions: nothing here is recorded in `DECISIONS.md`
(this report was written under a rule to touch no file outside `docs/narrative/`). Whoever
adopts one should log it there.

Each entry follows the workspace DESIGNER contract (`C:\Dev\AGENTS.md`): **what the player
does differently**, **what it interacts with**, **how it is taught (the on-screen words)**,
**the source**, and a **legibility verdict** against the gate in `PIPELINE.md` (can a player
recover the meaning from the behaviour without being told?). On-screen words are narration or
anonymous voices; no real person is given invented speech.

Ranking weighs: how much of Dee's actual story it restores × how legible it is ÷ build cost.

---

## 1. The household crosses the Channel

**Player does differently.** On departure, Jane, the children (as Quarters occupants) and,
if hired, Kelley and Joan Kelley move to Hájek's house. The player arrives in Prague over
capacity and has to decide between the move to the Old Town house (`hajek_2`) and other
spending. Once, the angels ask Dee to leave Jane behind for a Kraków journey.

**Interacts with.** Quarters capacity and stability (§2 of SYSTEMS_V2); `hajek_2`;
retinue (Jane can no longer be "at the base in England"); the Kraków expedition (#7).

**Taught by.**
- Departure screen: **"Jane, the children and the household sail with you from Gravesend.
  The library stays."**
- Arrival: **"Hájek's house holds three besides you. You have brought six."** (Jane, Arthur,
  Katherine, Rowland, Kelley, Joan Kelley; compute from the actual roster.)
- A fixed birth on day ~37: **"A son, Michael, is baptised in Prague."** One more place in
  Quarters (Whitby 46–48: baptised 14 March 1585).
- The Uriel choice: **"The angels bid you go to Poland without your wife."** Buttons: **Leave
  Jane in Prague** / **Take the household with you**.

**Source.** Fell Smith 64–65 (the embarkation list); Fenton 175 (Uriel); Fell Smith 87–88
(Jane, Joan Kelley, children and servants left under Edmond Hilton); Whitby 46–48 (move of
12 January 1585).

**Legibility.** High. Overcrowding is felt as falling stability and lost Focus before any text
explains it. It also fixes the most serious factual error in the current data
(ACCURACY_FLAGS B1).

---

## 2. The library is pledged, catalogued and left

**Player does differently.** Departure is a three-step sequence, not a cut: read the
catalogue of what stays; take Fromond's loan (money in, books marked *Pledged*); choose a
keeper. The Mortlake plan remains as a greyed, read-only tab in Prague, and loses room levels
when news comes.

**Interacts with.** Satchel; money for the Prague sector; Library level 3 (which stops being a
build step); the epilogue's loss list; `mercator_globes` (`travels: false`).

**Taught by.**
- **"6 September 1583. The library is catalogued: these books stay at Mortlake."** (a list of
  the player's own titles)
- **"Nicholas Fromond, Jane's brother, lends £400 on the house, the gardens and the books."**
  Button: **Take the loan**.
- On the greyed tab: **"Mortlake — in Fromond's keeping."**
- When the vision comes (en route): **"Kelley sees the library at Mortlake broken open. You
  cannot know if it is true."** One or two rooms on the grey tab lose a bar.
- Epilogue: **"In 1589 Dee came home to find books and instruments gone — taken by servants
  and friends who thought he would not return, and some sold by the man who kept the house."**

**Source.** Parry 191–193 (loan, Fremonsheim, the catalogue); Whitby 1031–1034 (catalogues
dated 6 Sept 1583); Whitby 44–46 (Fromond sold goods; *Compendious Rehearsal* 31); Fenton
126–128 n.6 (the vision; Roberts and Watson's comment); Håkansson 31–33 and Sherman 44–45 (not
a mob).

**Legibility.** High for the grey tab (bars falling on a base you cannot reach). Medium for the
loan, which needs its one line.

---

## 3. Petitions produce promises, not money

**Player does differently.** A successful `errand_petition` (and court encounters that today
pay £) adds a **Promise** of a sum instead: "Promised: £30". Promises count toward the Fortune
rank (so the player can reach Favoured and buy `mortlake_2`) but never become money unless a
grant event fires. Building on promises leaves the player in debt when they are not paid.

**Interacts with.** Fortune formula (count promises in the "friends" half only); `mortlake_2`
(build against expected reward); `mortlake_3` (needs a grant event, see note); money for upkeep
(Kelley's stipend, #8).

**Taught by.**
- Errand return: **"The petition was well received. Promised: £30."**
- Fortune banner: **"Favoured — £18 in hand · £60 promised"**.
- On `mortlake_2`: the existing flavour line, now true: **"The building programme of a man who
  expects the reward to come."**
- When a promise lapses at sector end: **"Promised, not paid."**

**Source.** Sherman (the failed offices are the career); Pumfrey via `docs/HISTORY.md` (liked
personally, not built materially); Parry 61–63, 105–107 (the "academy" and St Cross schemes;
St Cross is 1590s and should not appear by name).

**Note on tier 3.** Make `mortlake_3` purchasable only after a **"A royal grant is drafted"**
event, which has a chance to fire when Elizabeth ≥ 80 and Burghley ≥ 50, and a chance to be
withdrawn the next time a weather event drops either. The counterfactual stays reachable; it
stops being a grind.

**Legibility.** High. The gap between the two numbers on the banner is the thesis, and the
player discovers it by spending money they do not have.

---

## 4. No scryer, no action

**Player does differently.** The Scrying Chamber produces actions only while a scryer (Saul,
Kelley, later others) is posted at its station. Dee posted there alone gets: **"You see
nothing in the stone."** Results come through the scryer: reliability hidden, outcome shown.

**Interacts with.** Crew posting; Kelley's two hats (Laboratory vs Chamber); Jane's loyalty
(each action with a scryer in the house strains it); the action records (`dee_mysteriorum`
leaves).

**Taught by.** The empty-room message above, once; then the station slot on the room labelled
**"Scryer"** rather than a generic crew icon.

**Source.** Fenton 32–35 n.30 (Dee saw in the crystal on only two recorded occasions; he relied
on scryers); Harkness 33–40.

**Legibility.** High. The first time a player posts Dee to the chamber and nothing happens, they
understand the whole Saul–Kelley dependency.

---

## 5. The angels' calendar (a second clock)

**Player does differently.** Under the political weather track, a thin **prophecy track** shows
dated signs and angelic deadlines. Actions completed before a sign (the 1583 grand conjunction)
count double toward the angelic path; prophecy dates that pass are marked, nothing more.

**Interacts with.** Scrying Chamber output; the Ottoman option (#11), which should require the
Constantinople prophecy to have been seen; pressure (unchanged — the two clocks do not mix).

**Taught by.**
- England, near day 134: **"The great conjunction in Aries. The learned say the age is turning."**
- Prague, near day 60: **"The angels' date for the Cross in Constantinople: 15 September 1585."**
  When it passes: **"The day passes."**

**Source.** Harkness 149 (1577 comet, 1580 earthquake, the 1583 grand conjunction "perhaps the
most significant"); Fenton 144–146 and Parry 197–199 (Constantinople prophecy); Parry 193–195
(all rulers overthrown by January 1587).

**Legibility.** Medium-high. The double-value window teaches urgency by reward; the expiring
prophecies teach it by silence. It gives the angelic work a motive (Harkness) the current game
lacks entirely.

---

## 6. The angels draft the pitch

**Player does differently.** A completed action can return a **Counsel** card naming a court
node. At that node, the next court encounter gains a blue option worded from the counsel (for
King Stephen: offer the Stone in return for a place at court). Using it pays well and costs
Secrecy; ignoring it costs the angels' favour.

**Interacts with.** Blue options; Secrecy; the King Stephen encounter on the Kraków road (#7);
Rudolf's audience.

**Taught by.** **"The angels have advised you what to say at Kraków."** On the option:
**[Angelic counsel] Offer the King the Philosophers' Stone and ask for a place at his court.**

**Source.** Szőnyi 273–274 (the spirit's dictated speech to King Stephen, *TFR* 407); Harkness
68–70 (Dee's rebuke of Rudolf at the angels' direction). Melvin-Koushki's grimoire-as-courtier's-
manual made literal.

**Legibility.** High: the angels' words show up as a court option. This is the tweak that most
directly plays Melvin-Koushki's thesis.

---

## 7. The road to Kraków (expedition, not map)

**Player does differently.** From Hájek's house, Dee and his retinue can leave for 15–25 days.
The base runs without him (posted crew act; errands continue). On return, the King Stephen
encounter resolves.

**Interacts with.** Retinue rule (skills of those who travel); Jane's posting (#1); the
Counsel card (#6); Kelley's loyalty (he travels or he stays).

**Taught by.** Map button at the base: **"The road to Kraków (≈20 days)"**. Return:
**"You are back from Poland. The household kept the house."**

**Source.** Whitby 46–48 (the Kraków returns; King Stephen, 17 April 1585); Fell Smith 87–88.

**Legibility.** Medium. It is an FTL "away team" with Dee in it, which players will read
without explanation.

---

## 8. Kelley's stipend and the threat to leave

**Player does differently.** Kelley has an upkeep (£50 a year in the record; ≈ £12 per ten game
days in England at the current compression, scale to the economy). Unpaid, loyalty falls; at a
threshold, an event: Kelley says he will leave. Pay arrears, or hold an action, or let him go.

**Interacts with.** Money; Promises (#3) — Kelley cannot be paid in promises; the Chamber (#4).

**Taught by.** Household screen under Kelley: **"Stipend: £50 a year · owed £12"**. Event:
**"Kelley says he will leave for good unless he is paid."**

**Source.** Fell Smith 61–62 (Dee's record of Kelley releasing him from the £50 promise in a
rage); Whitby 46–48 (Kelley's wish to return to England, Prague 1584).

**Legibility.** High. A line item and a threat.

---

## 9. Fixed household events in England

Four small fixed events, all documented, each one screen:

| ≈ Day | Event | On-screen words | Source |
|---|---|---|---|
| 69 | Roger Cooke asks leave | **"Roger Cooke asks leave to quit your service."** Buttons: **Let him go** / **Offer money and the secret of the salt (£10)** — the second keeps him 20 days, then he goes. | Fenton 26–28, index 14–15 |
| 81 | Saul's first action | **"Saul reports a presence in the stone."** | Harkness 33–35; Fell Smith 43–44 |
| 89 | Talbot arrives and reports Saul | **"A stranger calling himself Talbot tells you Saul has dealt falsely with you."** | Whitby 56–58 |
| 96 | Jane's rage | **"Jane, Dee wrote, was 'in a mervaylous rage ... all that night'."** | Whitby 24–26; Harkness 35–37 |

**Legibility.** High: each is a change to the roster or a meter that the player sees.

---

## 10. An epilogue card for each ending

**Player does differently.** Every `endCareer` (stay in England, Ottoman) and the Prague sector
end shows one card that names the record.

**Taught by.**
- Stay: **"COUNTERFACTUAL. Dee did not stay. Had he, there is no Prague, no Třeboň, and a
  library intact."**
- Prague end: **"In December 1586 an envoy came from the Emperor of Muscovy offering a great
  stipend to come to Russia. Dee did not go."**
- Ottoman: see #11.

**Source.** Fenton 216–219; Håkansson 31–33; Parry 226–238 (return 1589).

**Legibility.** Not a mechanic; it is the honesty layer. Required, cheap.

---

## 11. Ottoman option: pass through the prophecy

**Player does differently.** The option is visible only after the Soyga question and the
Constantinople prophecy have both been seen. Choosing it plays 3–4 COUNTERFACTUAL screens, then
an epilogue. Declining costs nothing.

**Taught by.** Option text: **"[COUNTERFACTUAL — after Melvin-Koushki] The angels promised you
Constantinople as a conquest. Go there instead as a scholar, to the court of Murad III."**
Epilogue: **"Dee never went east. The angels' date for the Cross in Constantinople passed. He
declined Muscovy, and died poor at Mortlake."**

**Source.** PRAGUE_AND_OTTOMAN Part 2; M-K 2021; Fenton 144–146.

**Legibility.** High for the framing. Replace the Chamber-completion signal with a lettrist one
(PRAGUE_AND_OTTOMAN, last section).

---

## 12. Show the calendar date

**Player does differently.** Nothing; reads the date. The map header shows **"Day 96 · May
1582"** beside the sector day, using a fixed mapping.

**Source.** ARC_REPORT §5 (my mapping).

**Legibility.** High. It makes fixed events read as history rather than as RNG.

---

## 13. Showing the records is an operation

**Player does differently.** At Curtius's, the nuncio's and the Spanish ambassador's, a blue
option **"Show the books of the actions"** (requires `dee_mysteriorum` in the satchel): large
Continental gain, Secrecy loss proportional to the leaves.

**Source.** Whitby 44–46 (shown to Curtius 14 Sept 1584 and the Spanish ambassador 25 Sept,
"not the wisest thing to do").

**Legibility.** Medium-high: the player sees the trade on the button.

---

## 14. Forbidden books on the road

**Player does differently.** A forbidden book packed in the satchel costs Secrecy on arrival
at nodes with `religiousAuth` presence. At home on the shelf it is safe.

**Source.** Parry (useful and incriminating); the Steganographia's reputation (Clucas, *Ambix*
64.2).

**Legibility.** Medium. Needs one line the first time: **"The Steganographia in your satchel
is noticed."**

---

## 15. Unread books

**Player does differently.** Can buy a book whose prerequisite tags they lack; it sits on the
shelf as **"Unread — needs: celestial mechanics"** and gives nothing until the tag is owned.

**Source.** `CLAUDE.md` (BOOK vs KNOWLEDGE); `MECHANICS_FROM_BIOGRAPHY.md` §III ("a locked
chest").

**Legibility.** High, and it replaces a greyed buy button that teaches nothing.

---

## Rejected ideas, and why

| Idea | Why not |
|---|---|
| A **credulity / sanity meter** for Dee | Harkness's whole argument is that the motive was not credulity. TurkaGame's Query of Kings rule: no sorcery meter. It would make the game take a side the corpus does not take. |
| **Revealing Kelley's reliability** at some point | Kelley's sincerity is DISPUTED and the corpus does not adjudicate. Show outcomes only. |
| **A mob burns the library** event | The mob is a myth traced to Thomas Smith (Sherman 44–45; Håkansson 31–33). The record is servants, friends and a keeper who sold goods. |
| **Buying the show-stone at Paul's Churchyard** | It turns the gate of the angelic path into a shop item; the file header itself says ritual apparatus is never sold. Make the first stone a starting possession or an encounter gift. |
| **Making the Ottoman route a "best ending"** with lasting patronage | It would claim to know what the scholarship only asks. Near-miss and epilogue, as DeeVisualNovel does. |
| **A playable cross-matching (1587)** | Out of the sector's dates, and it is a coerced sexual arrangement recorded in one party's hand. If ever touched, only as reported fact in an epilogue. |
| **Dee scrying himself** as a fallback | Contradicts the record (two occasions only) and dissolves the dependency that makes Saul and Kelley matter. |
| **St Cross as an England-sector goal** | It belongs to the 1590s (Parry 105–107; Whitby 52–54). Use unnamed "a living" or the counterfactual foundation instead. |
| **Publication / printing press** in this build | Deferred by `CLAUDE.md`, and the Prague years are not a printing story. |
| **Letting the player decline Łaski and stay without consequence** | Staying already ends the run; a free "stay" would need an England 1584–89 the record does not support in this period. Keep it a labelled counterfactual ending (#10). |
