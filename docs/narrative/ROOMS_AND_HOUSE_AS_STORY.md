# Rooms, house tiers and fortune as story

Written 2026-10-03 against `src/data/cards/rooms.ts`, `house.ts`, `instruments.ts` and
`docs/SYSTEMS_V2.md` §2–3. **[record]** = sourced; **[inference]** = mine.

The gate (from `PIPELINE.md`): a mechanic carries meaning only if a player can recover it
from the mechanic's behaviour without being told. For each element below: what it says
about Dee, whether the behaviour says it, and what would make it say it.

---

## 1. What the house as a whole says

FTL's ship is a weapon you keep alive. Mortlake as written is a **workshop you keep
building**: eight rooms, levels 0–3, key-skill bonuses at the base, crew stations. The
story this tells is Sherman's: Dee's career was a household, not an office (Sherman; the
`mortlake_library` biography entry). That part is legible: the player spends most of their
money on rooms, and leaving the base visibly weakens them (books shrink to the satchel,
base-only instruments stop counting, room bonuses vanish).

What the house does not yet say:

1. **It was built on credit.** [record] Dee's great costs were library, laboratories and
   travel (Whitby 36–39); before leaving he borrowed £400 against the house, gardens, goods
   and remaining books (Parry 191–193). In the game rooms are paid in cash, so the house reads
   as wealth, not as a wager.
2. **It was a place others came to.** [record] Visitors were shown the instruments, a magnet
   and a comet-marked star globe (Håkansson 12–14). Nothing visits the player.
3. **It was taken apart while he was away.** [record] Books, instruments and laboratory goods
   were taken by "employees and friends" who believed he would not return (Håkansson 31–33);
   Fromond, the keeper, sold goods (Whitby 44–46). In the game Mortlake simply stops existing
   when the sector changes.

---

## 2. Room by room

| Room | Card status | What it says about Dee | Does the behaviour say it? | Fix |
|---|---|---|---|---|
| **Library** | documented | The working collection; the base of all operations | **Yes.** Library ≥1 makes every book usable at home; leaving shrinks you to the satchel. The player feels the library's weight the first time they travel. | Level 3 "The 1583 catalogue" is mislabelled as a growth step. The catalogue was made at departure. Make it a departure action (BOOKS_AS_STORY §4). |
| **Study** | plausible | Where Dee reads and writes | **Weakly.** Focus restoration is generic RPG rest. | Tie Focus to writing: a Study level should unlock *creating* Dee's own works (`dee_brytanici`, `dee_mysteriorum`), which the book file already says are "created by encounters, never bought". |
| **Scriptorium** | plausible | Copying and cipher | **Partly.** Copy-for-sale is legible. "Cipher office" (L3) names an institution Dee did not have. | Keep, but rename L3 "Copyists at work" or tag the label plausible in the card text. |
| **Correspondence** | documented | Letters to Antwerp, Kraków, Prague keep networks alive | **Yes.** Without letters, Scholar and Continental standing drift down 2 every 10 days; L1 halves it, L2 stops it. Neglect is visible and slow, as it should be. | L3 "+1 faction to errands" is opaque. Say what faction and why on the card. |
| **Laboratory** | documented | Three laboratories by 1583 (Parry 105–107) | **Partly.** "Continental patrons take notice" (L3) is text with no effect. | Make it true: Laboratory 3 at departure adds Continental standing on arrival in Prague, because the continental courts wanted alchemy first (Harkness 68–70). Then the player learns it by doing it. |
| **Scrying Chamber** | documented | The room the angels designed | **Yes, strongly.** Each level needs an apparatus: show-stone → Sigillum Dei → Holy Table. The player watches the room being specified from outside. This is the best room in the set. | Two leaks: the show-stone is sold at Paul's Churchyard (`market: true`, £18) although the file header says ritual apparatus is never sold; and the room works with no scryer posted. [record] Dee himself saw in the stone on only two recorded occasions (Fenton 32–35 n.30). The room should do nothing without a scryer at its station (TWEAKS #4). |
| **Instrument Room** | documented | Navigation advice proved, not argued | **Not yet.** The summary claims it but no encounter checks for Dee being *at* Mortlake with the instruments. | Make navigation consultations at Deptford/Greenwich stronger after a visit to Mortlake (a visitor sees the globes), or require Instrument Room ≥2 for the best navigation blue option. |
| **Quarters** | documented | Family, servants, students, scryers under one roof | **Yes, and underused.** Over capacity, stability falls and Focus stops restoring. That is the 1582 household under strain, told by arithmetic. | Make the arrivals real: Kelley came with a wife (Joan, married 1582), and Saul lodged in the house ("slept in a chamber over the hall", Fell Smith 43–44). If Kelley costs two places, the player meets the overcrowding as the household did. |

---

## 3. House tiers

| Tier | Status | What it says | Legible? |
|---|---|---|---|
| `mortlake_1` The house at Mortlake | documented | The family house Dee settled in after Antwerp | Yes: the starting cap of level 2 says "a house, not an institution". |
| `mortlake_2` Mortlake enlarged | plausible | "The building programme of a man who expects the reward to come" | **The flavour says it; the behaviour does not.** The player pays £80 cash after reaching Favoured. A man who *expects* a reward builds before it comes. If tier 2 could be bought against promised money (TWEAKS #3), the line would be true in play. |
| `mortlake_3` A royal foundation | COUNTERFACTUAL | The endowed institution Dee sought and never got | **Inverted.** It is a purchase that grinding unlocks, and it pays £12 every ten days. The behaviour says the foundation was a matter of effort. [inference] Gate it on a grant event that the player can only make *possible*. The record (Sherman; Parry 61–63, 105–107 on the "academy" and the St Cross scheme) supports showing it as an offer that can be withdrawn. |
| `hajek_1` Lodging with Hájek | documented | A guest in another man's house | **Yes.** The room labels do the work: the laboratory is "Hájek's Study", the library is "Travelling Chest". A player sees that in Prague the library is a box. |
| `hajek_2` House near the Old Town market | documented (12 Jan 1585, Whitby 46–48) | Setting up house on one's own account | Yes. |

Suggestion for Hájek's study [record]: Parry says they "began angelic conversations in
Hajek's house, where the study walls [had been] painted by a previous seeker after 'the holy
stone'" (Parry 200–202). The Prague scrying chamber could sit *in* Hájek's Study (one room
serving both) rather than as a separate room. That is accurate and it is legible: alchemy and
angels share a table, as the Continental courts would have it.

---

## 4. Fortune and the banners

Fortune = money/4 (money capped at 200) + (top three factions)/6, ranked Destitute →
Straitened → Comfortable → Favoured → Endowed; crossing a rank raises a banner.

**What it says.** Station: Dee's standing as purse plus friends. That matches the record's
picture of a man whose income was favour.

**Legibility problem.** The formula mixes two things the design doc says not to flatten
(INTELLECTUAL CAPABILITY vs POLITICAL ACCESS; PATRON vs QUEST GIVER). A player who sees the
banner "Favoured" cannot tell whether it came from cash or from the Queen. [inference] Two
small changes make it readable:
- Show the two halves on the banner: **"Favoured — £ 18 · friends 32"**.
- Count *promises* (TWEAKS #3) in the friends half but never in the purse half, so the player
  sees a Fortune that is mostly unpaid.

**Fall banners are the important ones.** The rise text is a reward; the fall text is the
story (Pumfrey's "liked personally, not built materially"). Write the falls in the record's
terms, for example on dropping to Straitened: "Your credit is good at court and poor at the
butcher's." (Narration, no real speaker.)

---

## 5. The house you leave behind

Today the Mortlake base vanishes at the sector change. [inference] The strongest single
image this game has available is the ship you left being stripped. Proposal:

- On departure, the Mortlake plan stays in the household screen as a greyed second tab.
- The keeper (Nicholas Fromond by default) is named on it.
- When the en-route vision fires (Kelley sees the library broken into; Fenton 126–128 n.6,
  Roberts and Watson quoted there), one or two rooms on the grey plan drop a level.
- The player cannot act on the tab. They can only watch it.

That passes the legibility gate with no text at all: the rooms you paid for lose their bars
while you are somewhere else. The text that goes with it must say "employees and friends",
not a mob (Håkansson 31–33; Sherman 44–45 on the mob story's origin in Thomas Smith).
