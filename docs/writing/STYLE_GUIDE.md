# FTLDee Style Guide

How the game sounds. Applies to every string a player reads: cards, encounters, barks,
tips, banners, help text, epilogues.

## 1. The hard rules

1. **Real people never get invented direct speech.** Dee, Jane Dee, Roger Cooke, Barnabas
   Saul, Edward Kelley, Elizabeth, Burghley, Leicester, Walsingham, Łaski, Rudolf, Hájek,
   Curtius, Pucci, Malaspina, Rožmberk: reported speech only, no quotation marks.
   - Yes: *Jane counts the purse twice and says it will not stand another furnace.*
   - No: *"It will not stand another furnace," Jane says.*
   - No: *"Tell me, Dr. Dee, what is most useful to us?"* (attributed to Elizabeth)
2. **Real quotations only from the research files, with the citation**, and quoted
   exactly. In use: Dee's "hardly gotten moniments" (Håkansson 12–14) and Melvin-Koushki's
   phrase "Dr. Littleturk" (M-K 2021). Do not quote the longer M-K sentence: the full sentence often quoted from him is not found in any text on disk; only the phrase "Dr. Littleturk" is (review/WRITING_READ1.md).
3. **Anonymous people may speak directly**: the steward, a bookseller, a ferryman, a
   court servant, the narrator. Give them a job, not a name.
4. **Every historical claim keeps its status.** documented / plausible / contested /
   counterfactual / anachronistic. If a passage contains a counterfactual, the word
   COUNTERFACTUAL appears on screen, in the text, not only in the data.
5. **Do not invent facts.** If the research files do not have it, the game does not say
   it. Where the record is thin (the 1604–05 petition to James I; the exact date of
   Dee's death; what Kelley did or did not see) the text says the record is thin, or says
   nothing.
6. **Do not settle disputes the scholarship has not settled.** Kelley's sincerity, the
   meaning of the Bonner episode, the reading of the *Monas*, the status of the Enochian
   language. Write the dispute.

## 2. The counterfactuals

Two parts of the game did not happen, and they must read that way every time they appear:

- **The royal foundation at Mortlake** (house tier 3). The formula: *The petitions are in
  the record; the grant is not.*
- **The Ottoman route.** Dee never went east. The formula: *This did not happen.* Followed
  by what did.

Staying in England at the Continental Question is also a departure: in the record Dee
left in September 1583. The *stayed in England* epilogue is marked COUNTERFACTUAL.

The counterfactual colour on cards is reserved for these. Do not use it for decoration.

## 3. Voice

**Plain, clear, concrete.** The game is about a scholar running a household on not enough
money. The wit comes from that situation, not from the prose.

- Yes: *He sold his own two books to afford the institution that was meant to house them.*
- No: *Alas, the Magus must sacrifice his precious tomes upon the altar of ambition!*

Specifics:

- **No pastiche.** No "thee", "forsooth", "ye olde", no faux-Elizabethan spellings in
  game text. Period spelling only inside a quotation from a source.
- **No purple adjectives.** Not "arcane", "eldritch", "mystical", "ancient" (unless
  something is literally ancient, like Ptolemy). Not "dark secrets".
- **Name the thing.** "The *Almagest* is large and takes two slots", not "your weighty
  astronomical treatise".
- **Numbers are welcome.** "£12 every ten days" is more interesting than "a generous
  stipend".
- **Short sentences carry the jokes.** *Jane has noticed. So, by now, has the butcher.*
- **The narrator does not moralise.** It reports what happened and what it cost.
- **Second person is for instructions only** ("Pack the satchel"). Narration is third
  person about Dee.

## 4. The household's voices

| Speaker | Who | Register |
|---|---|---|
| `jane_dee` | Runs the house and its money. | Practical, dry, usually right. Never a scold, never a joke at her expense. |
| `roger_cooke` | Secretary and copyist. | Orderly, careful, slightly anxious about the books. |
| `barnabas_saul` | The first scryer, 1581. | Quiet, little said. Few lines. |
| `edward_kelley` | The scryer from 1582. | Confident, quick, charming. The text neither trusts nor exposes him. |
| `dee` | The protagonist. | Shown through what he writes and does: almanac entries, notes in margins. |
| `steward` | Anonymous servant. | Direct speech, practical, a little put-upon. |
| `bookseller` | Anonymous, London or Prague. | Direct speech, commercial, knowing. |
| `narrator` | The game. | Neutral, exact, occasionally dry. |

## 5. Terms

Use the game's words, not RPG words, in player-facing text.

| Not | But |
|---|---|
| quest | commission, errand |
| party | household, retinue |
| shop | market |
| gold | money, £ |
| HP, health | Secrecy (for the house), stability (for the household) |
| level up | build, enlarge |
| loot | acquisition, purchase |
| enemy, boss | (none; pressure comes from the weather) |
| magic spell | operation, action (for the angelic sessions: "the actions") |
| inventory | library, satchel |

Proper names: Łaski (not Laski), Hájek, Třeboň, Rožmberk, Hradschin, Szőnyi, Håkansson.
Titles in italics: *Monas Hieroglyphica*, *Steganographia*, *Book of Soyga*, *Almagest*.
"The Sigillum Dei", "the Holy Table", "the show-stone" (hyphenated).

Money: £ followed by digits, no space: £45. No shillings and pence in game text.

## 6. Mechanics in text

- Say the number and the reason: *Rhetoric 7, exactly enough, because Jane's +1 stayed in
  the Study.*
- Locked options always say what is missing and where it is: *Missing: Mathematical
  Preface (on the shelf at Mortlake).*
- Dice are shown: *d10 6 + Rhetoric 6 = 12 against 9.*
- A fall in fortune caused by spending is a receipt, not a punishment.

## 7. Citations

Short forms in small type at the foot of cards: Parry, Harkness, Sherman, Szőnyi,
Håkansson, Clulee, Whitby, M-K 2021, Clucas, Fell Smith, Fenton. Page ranges with an en
dash: Whitby 29–31.

## 8. Length

| Kind | Limit |
|---|---|
| Bark | 25 words |
| Tip body | 60 words |
| Help text | 45 words |
| Fortune banner | 35 words |
| Card summary | 30 words |
| Encounter description | 150 words |
| Epilogue section | 150 words |

## 9. Checklist before a string ships

1. Does a real person speak in quotation marks? Rewrite.
2. Is there a fact here that is not in the research files? Remove it or source it.
3. Does a counterfactual say so on screen?
4. Would a player know what to do, or what it cost, from this text alone?
5. Is there an adjective doing the work a noun should do?
