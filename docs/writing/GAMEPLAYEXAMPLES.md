# Gameplay Examples — four careers, turn by turn

Authoring source for the onboarding, the tips and the barks. **Revised 2026-10-04** for the
current build: the 1555 Prologue, promised rewards from petitions, the Road East sector,
Roger Cooke's departure at day 60, the *Book of Soyga* arriving by event at day 25, and
Legend Mode. Numbers follow the code as it stood that day:
`src/systems/fortune.ts`, `time.ts`, `skills.ts`, `errands.ts`, `market.ts`,
`src/core/state.ts`, and the cards and encounters in `src/data/`. Where `docs/SYSTEMS_V2.md`
and the code disagree (the fortune formula), the code is used and the difference is noted.

Two conventions:

- **Dice.** Errand rolls are seeded per run. The rolls shown here are illustrative; the
  rule (d10 + the crew member's own skill against the difficulty) is not.
- **Page numbers** are printed pages for Parry, Harkness, Szőnyi and Whitby, per
  `docs/CITATIONS.md`.

## The rules these runs lean on

- **Fortune** = `min(money, 200)/4 + (three best faction values)/8 + (promised rewards
  outstanding)/8, at most 25 from promises`. Ranks: under 15 Destitute, under 30
  Straitened, under 45 Comfortable, under 60 Favoured, 60+ Endowed.
- **Promises.** A successful petition pays no money. It raises Elizabeth +3 and Burghley +2
  and adds a promise of £15, which counts towards fortune at once. Every ten days, a
  promise at least 20 days old may be paid; the chance is (Elizabeth − 40)/200, at most
  25%. Most are not paid. (Sherman: the failed offices are the career.)
- **Effective skill** = base + room bonuses (at home) + instruments (at most +2 per skill;
  base-only ones at home only) + **+1 if any usable book helps that skill**. At home every
  crew member in the house can stand in for Dee; on the road, only the retinue.
- **Encounter rewards scale** with the skill named on the choice: ×(1 + 0.1 per point
  above 4).
- **Selling** a book: half its value (full with Library 3). Dee's own works cannot be
  sold. What Dee learned from a sold book stays learned.
- **Secrecy 0 ends the career**: Dee is summoned for examination.
- **Crew learn**: every 20 days, a crew member posted in a room gains +1 in that room's key
  skill they are best at, up to their potential.

## The starting position

| | |
|---|---|
| Money | £45 |
| Secrecy / Focus | 75 / 80 |
| Factions | Elizabeth 55, Burghley 40, Leicester 45, Walsingham 50, Religious Authorities 30, Scholar 65, Merchant 25, Continental 20 |
| Rooms (Mortlake, tier 1) | Library 2, Study 1, Scriptorium 0, Correspondence 1, Laboratory 1, Scrying Chamber 0, Instrument Room 2, Quarters 1 (holds 3 besides Dee) |
| Instruments | Mercator's globes (base only, cannot travel), the Frisius ring and staff (travels) |
| Library | Euclid (large), Almagest (large), Agrippa (portable, controversial), *Steganographia* (portable, forbidden), Copernicus (large), Paracelsus (portable), Dee's own *Preface*, *Monas* and *General and Rare Memorials* (all pocket) |
| Satchel (3 slots) | *Monas*, *Preface*, *General and Rare Memorials* |
| Crew | Jane Dee (Rhetoric 6, Courtly Intelligence 5, Medicine 4) in the Quarters; Roger Cooke (Alchemy 6, Manuscript Knowledge 5) in the Laboratory, which he mans |
| Dee | Mathematics 9, Astronomy 8, Manuscript Knowledge 8, Natural Philosophy 8, Astrology 7, Cartography 7, Languages 7, Occult Philosophy 7, Rhetoric 6, Navigation 6, Cryptography 6, Alchemy 5, Kabbalah 5, Courtly Intelligence 5, Theology 5, Medicine 4 |

**England weather track:** day 20 Foxe remembered; day 45 preachers against conjurors;
day 100 Łaski arrives (sets the flag that opens departure with him); day 125 the imperial
programme loses its moment; day 130 calendar reform blocked; day 150 the Continental
Question. Choosing to stay ends the run at day 150.

---

## Run A — The Mathematician-Courtier

*Stay in England, serve the Crown, and reach the counterfactual royal foundation (Endowed,
Elizabeth 80, Burghley 50, a drafted royal grant, £60).*

### The Prologue: 1555

Elizabeth, under guard at Woodstock, asks Dee to cast figures. The courtier does what Dee
did: **casts the nativities** (Elizabeth +4). Arrested and questioned, he then departs from
the record: **holds out and admits nothing** [Contrary to the record]. Elizabeth +5, −£10,
Secrecy +5. No Bonner, no chaplaincy, nothing for Foxe's readers to remember.

Start of England: **£35, Secrecy 80**, Elizabeth 64. Fortune 8.75 + (65 + 64 + 50)/8 =
**31.1, Comfortable.** On day 20 the Foxe weather fires and costs him nothing; the toast
says so.

### Day 0 — posts and satchel

- **Jane to Correspondence.** Her Courtly Intelligence 5 mans it: +1 Courtly Intelligence
  and Languages for Dee at home.
- **Roger to the Library.** Manuscript Knowledge 5 mans it, on top of Library 2's own +1.
- **Satchel:** the *Steganographia* in place of the *Monas*. Barn Elms is next.

### Days 1–4 — Barn Elms

Barn Elms is one day and costs nothing (it is a walk). *Walsingham and the Intelligence
Problem* is marked **contested**: no record shows Dee breaking ciphers for Walsingham, and
Parry calls the spy story "the old canard" (Parry 204). The card says so before the
choices.

The Trithemian option needs Cryptography 5 and the *Steganographia*. Away from home Dee has
6, +1 because the *Steganographia* is usable from the satchel: **7**. The reward scales by
1.3. Walsingham +20, Elizabeth +4, Burghley +4, Secrecy −8, **£26**.

Day 4: **£61, Secrecy 72**, Walsingham 70, Elizabeth 68, Burghley 44. Fortune
15.25 + (70 + 68 + 65)/8 = **40.6.**

### Days 5–10 — a petition and the letter-room

- **Errand:** Jane carries a petition to Richmond. Rhetoric, difficulty 9, £3. One day each
  way plus two days' work: back on day 9. Correspondence is now unmanned, and the plan says
  so.
- **Upgrade:** Correspondence 1 → 2, £20, 5 days. **£38, day 10.** No more drift.

Day 9: *Jane Dee delivered the petition and was well received (d10 6 + 6 vs 9).*
Elizabeth 71, Burghley 46, and a **promise of £15**, "a reward for your service, when it
can be found". No money. Fortune counts the promise anyway: 9.5 + (70 + 71 + 65)/8 + 15/8
= **37.1.**

### Days 10–18 — the comet and the Queen

Satchel repacked: the *Almagest* (2 slots) and Agrippa (1). Richmond (£1), then Windsor (2
days, £3): **£34, day 13.**

*The Comet at Windsor.* The synthesis option needs Rhetoric 7. Dee has 6, and Jane's +1
stays at home with her post. Nobody in his retinue has more. **Locked.** He takes the
astrological reading (Astronomy 6, Astrology 5, the *Almagest*). Away from home his
Astronomy is 8 + 1 (Frisius ring) + 1 (*Almagest*) = **10**, so the reward scales by 1.6:
Elizabeth +13, Leicester +8, Scholar +8, Secrecy −3, **£19**. Day 15: **£53**, Elizabeth 84.

The comet leads to *Elizabeth's Interest* at Richmond (2 days, £3). The imperial option
needs the *Preface*: **missing, on the shelf at Mortlake.** He presents himself as the
mathematician: Elizabeth +6 (90), Burghley +8 (54), Scholar +3 (76), £10. **£60, day 17.**

Fortune 15 + (90 + 76 + 70)/8 + 1.9 = **46.4.**

> **FAVOURED.** The court has found a use for him. A man whose advice is wanted in writing
> is a man whose bills are paid a little sooner.

With Elizabeth at 80 or more and Burghley at 50 or more, every ten-day tick now has a 15%
chance of drafting a royal grant.

### Days 18–31 — Muscovy House, and a promise paid

Home on day 18 (**£59**). Satchel back to the *General and Rare Memorials*, the *Preface*
and the *Monas*. Jane goes with a second petition (£3).

London on day 19 (£1). Paul's Churchyard rolls its stock: Picatrix (£22, forbidden), Ficino
*De vita* (£7), Hájek's *Dialexis* (£9), Lull's *Ars brevis* (£9); Sea Charts and Compass
(£10), the travelling chest (£15). He **sells** Paracelsus (£5) and Copernicus (£9), and
**buys** the Sea Charts and Compass. **£59.**

Muscovy House (1 day, free). *Charts for the Company* needs Navigation 6 and Mathematics
7. Navigation away from home: 6, +1 for the *General and Rare Memorials*, +1 for the sea
charts (they travel; the globes do not) = **8**. Five days, Focus −10, **£17** and Merchant
+6 after scaling. **£76, day 25.**

Day 22: Jane's second petition succeeds (d10 3 + 6 = 9, exactly). Elizabeth 93, Burghley
56, promises £30.

Home on day 27 (**£75**). On the day-30 tick, the first promise is 21 days old and the
chance is 25%. It comes up: *Paid at last. £15 arrives: a reward for your service.*
**£90.** Fortune 22.5 + (93 + 76 + 70)/8 + 15/8 = **54.25.**

### Day 31 — Mortlake enlarged

> **Mortlake enlarged** (plausible). Needs Favoured and £80. 20 days.

**£10, day 51.** Fortune falls to 2.5 + 29.9 + 1.9 = **34.3:**

> **COMFORTABLE.** The builders have been paid and the purse is light. Nothing is lost that
> cannot be earned back; the house is simply bigger than the income.

On the day-40 tick: *A royal grant is drafted [COUNTERFACTUAL]. For once the paper is drawn
up.* On day 45 the preachers cost Elizabeth 2 and Secrecy 5. On day 40 Jane and Roger, at
their posts, each learn a point.

### Days 51–96 — the promise engine

The Royal Foundation needs Endowed (60). Promises count towards it, so the courtier keeps
Jane walking to court.

| Days | What | Money | Notes |
|---|---|---|---|
| 51–96 | Jane: eleven petitions (£3 each), nine succeed | −£33 | Elizabeth to 100 (the cap), Burghley 74, promises +£135 |
| 51–87 | Dee: four turns at Muscovy House (£17 each, £2 travel each) | +£60 | Merchant 59; Focus falls to the 30s |
| 60 | Roger asks leave (documented, 5 September 1581). The courtier lets him go. | | The Library is unmanned |
| 60, 80, 90 | Three promises paid | +£45 | £105 still promised |
| 96 | | **£82** | |

Day 96: fortune 20.5 + (100 + 76 + 74)/8 + 105/8 = 20.5 + 31.25 + 13.1 = **64.9.**

> **ENDOWED.** For the moment, Dee has what he always asked for: enough.

Thirteen of those points are promises. The game shows the split on the fortune tooltip, and
the lesson is the period's own: a courtier's standing was built of promises that might be
paid.

### Day 96 — the royal foundation (COUNTERFACTUAL)

> **A royal foundation at Mortlake.** COUNTERFACTUAL. Needs Endowed, Elizabeth 80,
> Burghley 50, a drafted grant, £60. 15 days. Pays £12 every ten days.

**£22, day 111.** Fortune 5.5 + 31.25 + 13.1 = 49.9: **Favoured**, a fall, and the receipt
for the building.

Day 100: Łaski arrives. At *Łaski at Mortlake* the courtier receives him politely and
reports the visit to Walsingham (Walsingham +3, Continental +2). Stipends arrive on days
120, 130, 140 and 150. Day 125 takes 6 from Burghley; it no longer matters.

### Day 150 — the Continental Question

| Option | State |
|---|---|
| Remain in England [Contrary to the record] | open |
| Depart with Łaski | open (the day-100 weather set the flag) |
| Depart independently [COUNTERFACTUAL] | open: Continental 27, Languages 7, Rhetoric 6, £30 |
| The Ottoman court [COUNTERFACTUAL] | **locked**: no Ottoman thread |

He stays: Elizabeth (capped), Burghley +3, −£10. The run ends on day 150 with the
*stayed in England* epilogue and the royal-foundation paragraph.

### What this run teaches

- **The Prologue matters for twenty-five years.** Holding out kept Foxe's readers and the
  bishops off him on days 20 and 130.
- **Petitions pay in promises**, and promises count. They are most of the courtier's
  fortune and very little of his money.
- **Every house tier is a fall banner.** Plan for it.
- **The satchel decides the audience.** The imperial pitch was lost to packing.
- **Manning bonuses stay home.** Rhetoric 6 at Windsor locked the synthesis.
- **Correspondence 2 early** kept the Scholar Network whole for 150 days.

---

## Run B — The Angelic Route

*Saul, then Kelley; the show-stone, the Sigillum, the Holy Table; the Book of Soyga and the
three Ottoman signals; Łaski, the Road East, and the audience with Rudolf.*

### The Prologue

He does what Dee did: casts the figures (Elizabeth +4), then confesses and goes into Bishop
Bonner's household (Religious Authorities −4, Scholar +2, flags `marian_past` and
`bonner_chaplain`). On day 20 Foxe's readers remember: Leicester −3, Religious Authorities
−5, Walsingham −2. On day 130 the calendar weather will cost him again.

Start: **£45, Secrecy 75**, Elizabeth 59, Scholar 67. Fortune 33.25, Comfortable.

### Days 0–26 — money first, then the stone

- Jane to Correspondence (manned). Roger stays in the Laboratory.
- **Muscovy House** (days 1–9): Navigation 6 + 1 for the *General and Rare Memorials* = 7,
  reward ×1.3: **£16**, Merchant +5. Home: **£59.**
- **Research at Mortlake**, the *Monas* synthesis (days 9–19): needs the *Monas* and
  Agrippa, both usable at home. Focus −25, Secrecy −5 (**70**), Scholar +3.
- **Day 20, Barnabas Saul in the Hall** (documented; Whitby 16–19, 27–29). The blue option
  *Make it a proper action* needs Occult Philosophy 7 and Theology 5. At home Dee has 7 + 1
  (Agrippa) = 8. £8, 3 days: Saul joins, a show-stone is bought, and the record of the
  actions, the *Mysteriorum Libri*, begins as a book card. Secrecy −8 (**62**). **£51.**
- **Scrying Chamber 0 → 1**, £10, 3 days (needs the show-stone and Occult Philosophy 5).
  Saul is posted there; his Occult Philosophy 4 mans it. **£41, day 26.**

### Day 26 — the Book of Soyga

*Aldaraia, sive Soyga* (documented: on Dee's shelf by January 1582; Harkness 43–45). The
book arrives by event; how Dee came by it is not recorded. *Work at the tables* needs
Kabbalah 5. At home: 5 + 1 (*Monas*) + 1 (the Scrying Chamber, manned) = 7. Six days,
Focus −15. **Ottoman signal 1 of 3.**

### Days 32–69 — Saul fails, Kelley comes, the seal

- Day 32: Jane carries a petition (£3); d10 5 + 6 = 11, success. Elizabeth 62, a promise of
  £15.
- **Day 40, Saul Sees Nothing.** He is dismissed.
- **Day 45, A Scryer Calling Himself Talbot** (documented, March 1582). The blue option
  *Test him first* needs Courtly Intelligence 6: Dee's 5 + 1 from the manned Correspondence
  room. Four days, Secrecy −3. Kelley (Alchemy 7, Occult Philosophy 7, Rhetoric 6) goes to
  the Scrying Chamber. The same day the preachers cost Secrecy 5: **54.**
- **Day 55, A Marvellous Rage.** Jane's anger at the scryers. He does what Dee did: writes
  it down, then erases it.
- **Day 55, The Seal of God's Truth.** Seal and ring together need Kabbalah 6 and Alchemy
  5: Dee has both at home (Roger's Alchemy 6 would also count). £16, 8 days. The Sigillum
  Dei and the Ring of PELE. **£22, day 63.**
- **Day 60, Roger Cooke Asks Leave.** He goes, as he did. The Laboratory is empty.
- **Scrying Chamber 1 → 2**, £20, needs the Sigillum. **Ottoman signal 2 of 3.** **£2,
  day 69.** *Money is short.*
- **Day 69, The Tables of Soyga.** *Ask the angels* needs the book and Kabbalah 6 (Dee now
  has 8 at home). Focus −10. The answer praises the book and does not decode it. **Ottoman
  signal 3 of 3: the Ottoman thread is open.**
- **Day 70, The Table of Practice.** He cannot pay £12 and chooses *Not yet. The furnace
  bills are due.*

### Days 71–150

| Day | What | Money | Notes |
|---|---|---|---|
| 71–89 | Two turns at Muscovy House (£16 each) | £45 | A promise paid on day 80 (+£15) is counted here |
| 89–98 | Two petitions: one success, one failure | £39 | Elizabeth 62 |
| 100 | Weather: Łaski arrives | | Continental 15 after drift |
| 100 | *Łaski at Mortlake*: an action at the stone for him (Kelley + Scrying Chamber 1) | | Continental +12, Walsingham −3, **Secrecy −10 (44)** |
| 120 | *Settling the House*: borrow from Fromond and catalogue the library (6 September 1583) | £74 | +£40, −£5 |
| 124 | London: the iron-bound travelling chest, £15 | £57 | Satchel 3 → 5 |
| 130 | Calendar reform blocked; as Bonner's chaplain, Religious Authorities −4 more and Elizabeth −2 | | |

### Day 150 — the Continental Question

| Option | State |
|---|---|
| Remain in England [Contrary to the record] | open |
| **Depart with Łaski** | open |
| Depart independently | **locked**: Continental 22 (needs 25) |
| The Ottoman court [COUNTERFACTUAL] | **locked**: Continental 22 of 30. The thread is open, Astrology 7, Occult Philosophy 7, Languages 7 and £40 are all met |

Correspondence 1 halves the drift; it does not stop it. Fifteen ticks took 15 points of
Continental standing, and that is the only thing between this Dee and Constantinople.

He departs with Łaski: Continental +15, Elizabeth −5, Secrecy −15 (**29**), −£20 (**£37**).

### Packing

| Book | Slots |
|---|---|
| *Book of Soyga* | 1 |
| *Monas Hieroglyphica* | 1 |
| *Mysteriorum Libri* | 1 |
| Agrippa | 1 |
| *Steganographia* | 1 |

Left on the shelves: Euclid, the *Almagest*, Copernicus, Paracelsus, the *Preface*, the
*General and Rare Memorials*. The show-stone, Sigillum, ring, Frisius staff and chest
travel. Mercator's globes stay.

### The Road East

The base is *Ships beyond Gravesend*; the house is *On the road with Łaski* (rooms to level
1 only). He follows the documented route.

| Day | Place | Money | Secrecy | What |
|---|---|---|---|---|
| 0 | Gravesend | £37 | 24 | *Without Licence*: leaves the house with Nicholas Fromond (what Dee did). Walsingham −4, Elizabeth −3, Secrecy −5 |
| 8 | Brill | £32 | 24 | Bargains in Dutch and Latin (Languages 7): the price halves |
| 12 | (weather) | | | *A vision of Mortlake*: Kelley sees the library broken open. Scholar −3 |
| 16 | (weather) | | | *A renegade*: Elizabeth −3 and Walsingham −3, then −2 each again for `laski_actions` and `marian_past` |
| 23 | Lübeck | £23 | 24 | *What the Angels Knew*: writes to Fromond about the debts (£2) |
| 30 | (weather) | | | *Creditors at Mortlake*: Fromond is selling Dee's goods |
| 32–35 | Stettin | £19 | 24 | Christmas morning; keeps the feast (Focus +15) |
| 39 | Posen | £16 | 29 | *Notes in Greek Letters*: the blue option, a Trithemian cipher, needs Cryptography 7 and the packed *Steganographia* (6 + 1). Secrecy +5 |
| 44–49 | Lask | £6 | 29 | *Łaski's Mortgaged Estate*: the frame for the Holy Table is made here (£8). The instrument card arrives |
| 53 | Kraków | £16 | 29 | Writes ahead to the Emperor (the *Monas* is packed). Sells the *Steganographia* (£12) |
| 62 | The Road to Prague | £12 | 29 | Jane and the children stay in Kraków and follow later |

### Prague

- **Lodgings in Hájek's House.** Writes to the Emperor and encloses the *Monas* (Continental
  +5). Scrying Chamber 0 → 1 (£10). **£2.**
- **Over the Bridge.** Kelley walks with him; nobody troubles a party of four.
- **Audience at the Hradschin**, 3 September 1584 (Harkness 55; Whitby 29–31). Four choices:
  the documented rebuke; the *Monas* (needs Kabbalah 6: away from home, 5 + 1 for the
  packed *Monas*); a demonstration at the fire (Alchemy 7, which Kelley in the retinue
  supplies, worth £20 and more); the new star (needs Hájek's *Dialexis*, not packed). He
  takes the record's choice: **Secrecy −10 (19)**, Continental +3, Religious Authorities −5.
- Day 15: Curtius is named intermediary.
- **Day 45, Francesco Pucci** (documented: he attended from 6 August 1585; Harkness 58).
  Admitting him costs 10 Secrecy; the papal envoys are coming on day 60. At 19, the player
  keeps him out [Contrary to the record].
- Day 60: the papal envoys take an interest: **Secrecy 14.** *People are watching the
  house.*
- **Before the Nuncio**, 27 March 1586 (Harkness 57). The record's choice (Dee demurs,
  Kelley promises a reformation) costs 12: **Secrecy 2.** Prague closes.
- **Into the Furnace** (Harkness 186 n.). He obeys. The *Mysteriorum Libri* goes into the
  fire: **Secrecy 17**, Focus −20.
- **South to Rožmberk.** Třeboň. The Prague epilogue.

Had he admitted Pucci as Dee did, Secrecy would have reached 4 on day 60 and the nuncio
would have ended the career. The furnace, which would have saved him, comes only after the
nuncio.

### What this run teaches

- **The ritual apparatus is a build path**, and every step of it spends Secrecy.
- **All three Ottoman signals can be had in England**: the *Soyga* at the tables, the
  Sigillum level of the Scrying Chamber, and the question to the angels. What closes the
  door is standing, not magic.
- **Drift is a slow leak.** Correspondence 1 is not enough for a Continental career.
- **The Road East has no house**; the satchel is the library, and the Holy Table is made on
  the road, as it was.
- **Retinue stands in.** Kelley's Alchemy opened the demonstration at the Hradschin.
- **The record is expensive.** Every documented choice in Prague costs Secrecy; one choice
  contrary to the record kept this career alive.

---

## Run C — The Alchemist Who Packs for Rudolf

*Build the Laboratory, keep Roger at the furnace, hire Kelley for the fire rather than the
stone, and take the Emperor what he wanted: the Stone, not the angels.*

### England, in brief

- Prologue as the record. **Day 0: Laboratory 1 → 2** (£35, needs Alchemy 4). **£10, day
  8.** At home: Alchemy 5 + 1 (Laboratory 2) + 1 (Roger mans it) = 7.
- **Roger to the retinue.** *The Laboratory is unmanned.* At Muscovy House, *The Black Ore*
  (the 1577–78 Frobisher assay; Clulee, Ambix 52.3, 212–213) needs Alchemy 6. Dee away has
  5; Roger in the retinue has 6, and the label says *Roger Cooke counts*. An honest assay:
  Scholar +6, Burghley +4, Merchant −4. Then a turn at the Company's charts for £16.
- London on day 21: **Cucurbits and Alembics**, £14 (Alchemy +1, base only, but it
  travels). At home Alchemy is now **8**.
- Day 20, Saul: *Take Saul on* (£8) for the show-stone. The Scrying Chamber is never built.
  Day 25, the *Soyga*: shelved. Day 40, Saul dismissed. Day 45, Kelley employed and posted
  to the **Laboratory** beside Roger.
- **Day 60, Roger Cooke Asks Leave.** The alchemist keeps him: *Offer him a share in the work
  and a wage* [Contrary to the record], £20 and Rhetoric 7. Dee's Rhetoric is 6; Jane in
  the Study mans it for +1. **7.**
- Day 100: Łaski is shown the library (Library 2): Continental +8. Day 120: the loan from
  Fromond, +£40. Day 125: Hájek's *Dialexis* (£9) and the chest (£15).

### The globes

Mercator's globes are worth £30, cannot travel, and the market has no sell button for
instruments. The card says: *Too large to travel. If the household leaves England, they
stay at Mortlake.* The alchemist keeps them working in the Instrument Room until the last
day.

### Day 150 — packing for Rudolf

| Book | Slots | Why |
|---|---|---|
| *Monas Hieroglyphica* | 1 | dedicated to Rudolf's father, Maximilian II |
| Paracelsus | 1 | Medicine +1 |
| Hájek's *Dialexis* | 1 | opens the astronomical option at the audience |
| Agrippa | 1 | Occult Philosophy +1 |
| *Preface* | 1 | |

Glassware, the Frisius staff and the chest travel. Departing with Łaski costs 15 Secrecy:
**45**, thirty points healthier than Run B, because there were no actions in England.

### The Road East, the faster way

He takes the plausible route through **Hamburg** (12 days by sea, £6, high risk) instead of
Brill and Rotterdam. At *English Merchants at Hamburg* he keeps away from the English house:
Secrecy +5. The Hanse booksellers are a market. Hamburg → Lübeck → Wismar → Stettin → Posen → Lask →
Kraków → Prague is nine days shorter than the documented road. At Lask he asks the spirits for
Łaski's treasure, as Dee did (Continental +4). At Kraków he writes ahead to the Emperor.

### Prague

- **Lodgings in Hájek's House.** *Write, then set to work in Hájek's study* needs Alchemy 6.
  At the base Dee has 5 + 1 (the study, manned by Kelley) + 1 (glassware) = 7, reward ×1.3:
  Continental +5, Scholar +5.
- **Audience at the Hradschin.** *Offer a demonstration at the fire*: Alchemy 7, which Dee
  does not have on the road and Kelley does. Reward ×1.3: **Continental +16, £26**, and the
  flag `alchemy_promised`. The card marks the choice plausible: Rudolf's interest in alchemy
  is documented; the rebuke was what Dee did. The epilogue says both.
- **The Emperor's Curiosities** (Parry 202–203). He gives the Frisius ring and staff to the
  collection: Continental +12. The staff is gone from the instrument list.
- **A house near the Old Town market** (Comfortable, £30; 12 January 1585). Rooms to level 3.
- Pucci admitted, the nuncio met, the furnace obeyed (there is no *Mysteriorum* to burn;
  Secrecy +15 all the same). Secrecy ends at 33.

### What this run teaches

- **Retinue is a skill slot.** Roger opened the assay; Kelley opened the Emperor.
- **Some instruments are a goodbye.** The globes help to the last day and then stay. The
  Frisius staff became a gift, which is a better end for an instrument than a list of
  losses.
- **The Continent pays for alchemy.** The Continental Courts card says it: alchemy first,
  revelation second.
- **Contrary choices are labelled, not punished.** Keeping Roger cost £20 and one line of
  text.

---

## Run D — The Failing Career, in Legend Mode

*Begin in Legend Mode, play the spy, spend Secrecy as income, and arrive at the
Continental Question with a hull too thin to cross the Channel.*

### The Prologue, the wrong way

Casts the figures, then **names Benger and the others** [COUNTERFACTUAL]: Elizabeth −10,
Walsingham +3, Secrecy +5. Start: Elizabeth 49, Secrecy 80. On day 20 Foxe's readers
remember an informer: Leicester −3, Religious Authorities −5, Walsingham −2.

### England

| Day | What | Money | Secrecy |
|---|---|---|---|
| 0 | No posts changed. Jane sits in the Quarters, where there is nothing to man | £45 | 80 |
| 1 | London: buys **Picatrix** (£22, forbidden: Secrecy −5); sells the *Almagest* (£7) and Copernicus (£9) | £38 | 75 |
| 20 | Home (£1). Saul taken on (£8, Secrecy −5); Scrying Chamber 1 (£10) | £19 | 70 |
| 21 | Scriptorium 1 (£12), so that Saul can be kept on later | £7 | 70 |
| 25–40 | **[LEGEND] The Angels Are a Code**, six times: £5 and Secrecy −3 each, Focus −10 each | £37 | 52 |
| 30 | *The Winking Eye of Achitophel*: lets Murphyn's slander lie | | 48 |
| 38 | *Dee is tired.* Focus 10 | | |
| 40 | Saul Sees Nothing: **kept on as a copyist** (Scriptorium 1): Secrecy −5 | | 43 |
| 40 | **[LEGEND] Two Eyes and a Seven**: signs his reports 007. Walsingham +10, Secrecy −12 | | 31 |
| 45 | Preachers; Kelley employed (Secrecy −5) | | 21 |
| 45–60 | **Overcrowded.** Jane, Roger, Saul and Kelley in a house that holds three. Stability falls 1 a day and nobody recovers Focus until Roger leaves on day 60 | | |
| 70 | *A Gentleman Who Knows the Searchers*: keeps Charles Sled close (+£6, a page in the File) | £43 | 21 |
| 80 | **[LEGEND] The Forest of Dean**: carries the warning (Walsingham +8) | | |
| 80–140 | The code three more times (+£15); on day 90 he buys Reuchlin, Lull and Ficino in London (£28) | £30 | 12 |
| 100 | Łaski arrives; he is received and reported (Walsingham +6 in all) | | |
| 130 | Calendar weather, with the informer penalty | | |

*Secrecy is low* has been on the screen since the code took it under 15.

Fortune at day 150: £30/4 = 7.5, plus (Walsingham 75, Scholar 54, Elizabeth 45)/8 = 21.75:
**29.25, Straitened.** The house was never enlarged. He never reached Destitute (under 15):
the factions alone keep fortune above 20 unless the three best average under 40.

### Day 150 — the Continental Question

| Option | State |
|---|---|
| Remain in England [Contrary to the record] | open |
| Depart with Łaski | open, **and costs 15 Secrecy. He has 12.** |
| Depart independently | **locked**: Continental 12 (needs 25), £30 |
| The Ottoman court [COUNTERFACTUAL] | **locked**: no Ottoman thread |

The narrator above the options: *Some careers end with a choice. This one ends with the
arithmetic of one.*

He goes with Łaski. On the first day on the road, Secrecy reaches 0: *Secrecy gone:
summoned for examination. The career collapses.* The career-collapse epilogue, with the
Legend Mode coda: everything in this run marked LEGEND is a story told about Dee long after
his death, and the epilogue lists which ones he played.

### What this run teaches

- **Secrecy is the hull, and it ends the game.** Legend income is real money paid in
  Secrecy.
- **Legend Mode labels everything.** Three encounters, each marked LEGEND in the title, the
  choice and the epilogue, with the sources that reject them on the card.
- **The Prologue's informer follows him**: Foxe on day 20, the calendar on day 130.
- **Overcrowding is real** once a copyist is kept on beside a new scryer.
- **Destitute is hard to reach.** Fortune here fell through money and faction loss to
  Straitened; the formula's floor comes from friends, not cash.

---

## Systems coverage

| System | Where shown |
|---|---|
| The Prologue and its long consequences | A (held out), B (the record), D (informer) |
| Petitions as promises; promises paid; promises in fortune | A (throughout), B |
| Market buying, stock rolls | A (day 19), B (124), C (21, 125), D (1, 90) |
| Selling at half | A (19), B (Kraków), D (1) |
| Forbidden books costing Secrecy | D (Picatrix) |
| Satchel packing and slot costs; emigration | A, B, C |
| Crew posting, manning, training | A, B, C; overcrowding in D |
| Unmanned rooms | A (day 5, 60), C (day 8), D |
| Retinue and home crew standing in | A (Rhetoric locked), B (Kelley at the Hradschin), C (Roger, Kelley) |
| Errands with dice | A and B (petitions) |
| House tiers | A (mortlake_2, mortlake_3 with the grant), C (hajek_2) |
| Fortune banners | A (four), B, D |
| Weather track, including scaled penalties | all runs |
| Network drift | A (stopped), B (halved, and decisive) |
| Ottoman signals | B (3 of 3) |
| The Road East | B (documented route), C (Hamburg) |
| Legend Mode | D |
| Career collapse at Secrecy 0 | D |
| Prerequisite-locked books | **not shown**: every prerequisite in the current book list is met by the starting library, and learned tags are never lost. See the note to the orchestrator. |
