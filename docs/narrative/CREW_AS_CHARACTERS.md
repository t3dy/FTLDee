# Crew as characters

Written 2026-10-03 against `src/data/characters/index.ts`, `src/data/cards/errands.ts` and
`docs/SYSTEMS_V2.md` §4. **[record]** = sourced; **[inference]** = mine.

FTL crew are named stat-blocks you grow fond of by using them. FTLDee's crew are real people
with dated lives, which is better material and a tighter rule. The aim: each person is
recognisable from *where the player wants to post them and what goes wrong when they are
there*, not from lines of dialogue.

---

## 1. The speech rule, and how to write inside it

`SYSTEMS_V2.md` §10: real people get no invented direct speech; anonymous characters may
speak; real quotations only from the corpus with a citation. Five techniques that keep this
from making the crew mute:

1. **Report, with a verb that carries character.** "Jane objects that the house cannot feed
   another scryer." "Kelley says he will leave for Hamburg." The verb (*objects*, *says he will
   leave*) is the characterisation.
2. **Quote the record, and say whose record it is.** Dee's diary is full of his household's
   words as *he* heard them. Those are real quotations and may be used with a cite and an
   attribution that names the filter: *as Dee wrote it down*. Example usable now:
   Jane "in a mervaylous rage at 8 of the cloke at night, and all that night" (Dee's diary,
   6 May 1582; Whitby 24–26). The attribution matters because the diary is one side's account.
3. **Let the angels speak only in their recorded words.** The voices in the actions are not
   real people, but they reach us only through Kelley's reports in Dee's hand. Treat them like
   real speakers: quote *TFR* / Fenton with a cite, otherwise report. "Uriel bids Dee not to
   take Jane to Poland" is fine; an invented angelic line is not.
4. **Use the anonymous for voice.** Stewards, boatmen, booksellers, Hilton's servants and the
   narrator may speak. A servant can say what the household thinks about Kelley.
5. **Make the mechanic do the talking.** A loyalty drop, a refused posting, an errand that
   comes back early. Most of what follows uses this.

The duress rule from TurkaVita applies to quotation choice: words spoken to a patron or
judge (Dee's petitions, his *Compendious Rehearsal*) are evidence of what he *argued*, not of
what he *held*. Do not use them as a character's inner voice.

---

## 2. Jane Dee (née Fromond)

**Record.** Married 5 February 1578; before that a lady-in-waiting to Lady Howard of
Effingham, wife of the Lord Admiral (Whitby 41–42; Fell Smith 33–34). Born 1555, so 25 in
1580; three children by 1583 (Arthur b. 13 July 1579, Katherine 1581, Rowland 1583). Her
brother Nicholas Fromond kept Mortlake and lent Dee £400 on it (Parry 191–193; Whitby 44–46).
Her rage of 6 May 1582 against someone Clerkson had reported, probably Kelley (Harkness
35–37). She **sailed with Dee** in September 1583 (Fell Smith 64–65). In 1585 the angels told
Dee not to take her to Poland, and she was left in Prague with Joan Kelley, the children and
the servants under Edmond Hilton (Fenton 175; Fell Smith 87–88). She herself put a petition to
the angels for sustenance (Fenton index, "petitions angels for sustenance", 174). Later, at
court, she personally handed the Queen a supplication; the next day the grant came (7–8 Dec
1594, Fenton 279–281).

**Current card.** Rhetoric 6, Courtly Intelligence 5, Medicine 4, loyalty 95. Flavour: "Before
her marriage she served at court; she knows its doors better than the library's." Good. The
biography entry still calls her "intellectual peer", which nothing supports (ACCURACY_FLAGS).

**How to characterise her by mechanics.**
- **Posted in Quarters** she is the household's stability. Her presence is what makes the
  Quarters' "stability recovers" work at all; without her the bonus halves. [inference]
- **On errands** her best errand is `errand_petition`. That is the one place the record shows
  her acting at court in her own person (1594, later than the game, so use it as precedent,
  not as an event). A petition she carries could get a better roll (her Rhetoric 6) but costs
  household stability while she is away.
- **Strain from scryers.** Each action held with a scryer posted lowers Jane's loyalty by 1;
  Kelley's presence doubles it. When her loyalty falls under a threshold, fire the 6 May 1582
  entry as a household event, quoting the diary with the attribution. [record for the event,
  inference for the trigger]
- **She is never left behind by default.** She crosses to Prague with the household. The
  Uriel instruction is the only point where the player is asked to leave her, and it should
  be a choice: obey the angels (Dee goes to Kraków with Kelley; Jane holds Hájek's house with
  Hilton) or disobey (keep the household together; the angels' favour falls).

**Do not.** Do not give her lines of complaint. Do not make her a scold; the record shows a
court-trained woman running a debt-laden house around strangers in the hall.

---

## 3. Roger Cooke

**Record.** With Dee "from his 14 years of age till 28"; Dee's alchemical assistant ("I revealed
to Roger Cook the great secret of the elixir of the salt", 28 Dec 1579); asked leave on
5 September 1581 after "hot words"; Dee tried to hold him with money and alchemical secrets;
the diary records "his incredible doggedness and ingratefulness against me to my face"
(Fenton 20–28, 32–35 and index 13–15). Robert Gardner replaced him as alchemical assistant
(Fenton 341–342). Cooke came back in 1600 offering help at Manchester; a "supposed plot" was
found in his papers by Arthur and the two were reconciled (Fenton 288–290).

**Current card.** Role `secretary`, status `plausible`, Manuscript Knowledge 6, Alchemy 4,
loyalty 75; joins at start; the household encounter says he "has organized the
correspondence". He was an assistant in the laboratory more than a secretary, and he is
documented.

**How to characterise him by mechanics.**
- **Best posting: Laboratory.** That is where the record puts him. Give him Alchemy 5 and move
  his secretary skills down a point.
- **He leaves.** A fixed event around England day 69 (Sept 1581): "Roger Cooke asks leave to
  quit your service." Choices: let him go (historical); offer money and the secret of the salt
  (costs £10 and holds him 20 days, then he goes anyway — the record shows the offer did not
  keep him). [inference for the 20 days]
- **Who replaces him** is a second, smaller story: Robert Gardner (documented) as a
  laboratory hand, if a crew slot is wanted.

**Do not.** Do not keep him to Prague. Do not invent a reason for his going; the diary gives
"melancholic nature" in Dee's words and that is Dee's view.

---

## 4. Barnabas Saul

**Record.** In the household by 8 October 1581; first surviving action 22 December 1581;
slept "in a chamber over the hall" (Fell Smith 43–44; Harkness 33–35). Little else is known;
his birth is not recorded (Whitby 64–65). On 9 March 1582 "Talbot" and Clerkson reported his
"nowghty dealing" (Whitby 56–58); Saul then said he no longer saw or heard spirits.

**Current card.** Occult Philosophy 4, reliability 30, age 30 (invented: Whitby says his birth
is not recorded; mark it so or drop it).

**How to characterise him by mechanics.**
- **He is the room's first tenant.** Posted at the Scrying Chamber, he makes actions possible
  at a poor rate. That he exists at all is the point: Dee needed someone else's eyes.
- **His end is Kelley's entrance.** When Kelley joins, fire "A stranger calling himself Talbot
  reports Saul's dealings" before the hiring choice. Keeping both is possible but Saul's
  reliability falls to 0 and he leaves within days. The new scryer's first act is to discredit
  the old one; the player sees it happen in their own household.

---

## 5. Edward Kelley

**Record.** Arrived 8 March 1582 as "Talbot" with Clerkson (Whitby 56–58); a break in the
actions from 4 May to 13 July 1582 (Whitby 24–26); married Joan Cooper; promised a £50 yearly
stipend by Dee, which in a rage he "released" (Fell Smith 61–62, quoting Dee's record); in
Prague voiced a desire to return to England (Whitby 46–48); the angels promised he would be a
"great Seer" and "supreme alchemist" (Parry 193–195; Harkness 159–161); with Pucci he burned
the books in April 1586 (Fenton 200–202). Cropped ears: LEGEND. Sincerity: DISPUTED.

**Current card.** Alchemy 7, Occult Philosophy 7, reliability 35, loyalty 45. The ears line
is correctly tagged as legend.

**How to characterise him by mechanics.**
- **Two hats, one man.** He is the best scryer and the best alchemist on the roster. Posting
  him to the Scrying Chamber takes him out of the Laboratory and the reverse. That trade is
  the Dee–Kelley story in miniature; Parry's mechanism for 1586–89 is the alchemy hat
  becoming worth more than the scrying hat.
- **He costs a stipend.** £50 a year is about £12 per ten game days in England at the
  current compression (ten game days ≈ a quarter-year) [inference]. That is the same figure
  as the counterfactual royal foundation pays (`mortlake_3`, £12 every ten days), which is a
  nice irony to leave visible: the scryer costs what the institution would have paid. Scale
  it if the economy cannot bear it, but keep it the largest single upkeep. Unpaid, his loyalty
  drops; at low loyalty fire "Kelley says he will leave", resolved by paying arrears or by an
  action. The money-for-presence bargain is in the record.
- **He brings a wife.** Joan Kelley takes a Quarters place from 1582.
- **His reliability is hidden.** Show the result of each action; never show his reliability
  number. The game takes no position (Harkness; DeeVisualNovel `HISTORIOGRAPHICAL_ISSUES.md`).
- **In Prague his alchemy is the court's currency.** Continental Courts gains from Kelley's
  laboratory work should outpace gains from Dee's actions over the sector. The player sees
  the partner's value overtake the master's.

**Do not.** Do not show the ears as fact. Do not resolve whether he invented the angels.

---

## 6. Arthur Dee

**Record.** Born 13 July 1579 (`ARTHUR_DEE_SCHEMA` age 1 is right for 1580). Four when he
crosses the Channel; seven when the sector ends. A brother, Michael, was baptised in Prague on
14 March 1585 (Whitby 46–48), so the household grows inside the sector. Later tried to scry (Fenton index 209–213,
fainting at 227; 1587, at Třeboň, after the sector); found Cooke's "plat" in 1601.

**How to use him now.** Not as crew. As a **Quarters occupant** who costs a place and raises the
stakes of overcrowding and of travel (a household with an infant and toddlers on the road
from Gravesend to Prague). [inference] One Prague event can foreshadow 1587 without staging
it: a child in a house of actions, and the household's unease about it, in narration only.
The protagonist-transfer schema can wait.

---

## 7. People the crew system could add

All documented, all small: **Joan Kelley** (Quarters), **Edmond Hilton** (the servant left in
charge in Prague, Fell Smith 87–88; a Quarters/stability post when Dee is away), **Francesco
Pucci** (in the Prague sittings from 1585; at the furnace; a Catholic connection that raises
nuncio pressure while he is in the house), **Robert Gardner** (laboratory, after Cooke).
Pucci is the most useful: he is a crew member whose presence helps one meter and hurts another.
