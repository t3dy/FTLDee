# Prague and the Ottoman counterfactual

Written 2026-10-03 against `src/data/locations/index.ts` (Prague nodes), `factions/weather.ts`
(Prague track), `cards/errands.ts`, `cards/house.ts` and `docs/SYSTEMS_V2.md` §7–9. The Prague
encounters (`encounters/prague.ts`) were being written at the time and are not judged here.
**[record]** = sourced; **[inference]** = mine.

---

## Part 1. Prague

### What the player should feel

England is a sector of *accumulation*: rooms, books, friends, a house that grows. Prague
should be a sector of *dependence*. Dee arrives as a guest in another man's house, with a
satchel instead of a library, a family to feed, a partner whose skills the court values more
than his, and a patron who will not see him. [inference] The emotional line, in order:

1. **Hope.** The audience comes quickly (3 September 1584, within a month).
2. **The wall.** The Emperor says the time is not convenient and names Curtius. Everything
   after goes through a go-between who may not be passing it on (Whitby 44–46).
3. **Exposure.** Dee shows his records to Curtius and the Spanish ambassador. The papal envoys
   take an interest (Harkness 70–72).
4. **The angels' demands rise.** Leave your wife; go to Poland; prophesy against the King's
   enemies (Fenton 175); set up the Cross in Constantinople by 15 September 1585 (Fenton
   144–146). Burn the books (10 April 1586).
5. **Expulsion.** The edict of 29 May 1586 (Fell Smith 88–89). The road south to Rožmberk.

### What the current build gets right

- **The Hradschin is a locked node** (`requires: wrote_to_emperor`), and the Kunstkammer behind
  it is locked again (`rudolf_audience_done`). The castle "from outside, gigantic and aloof".
  FTL's sector exit becomes the patron you cannot reach. Legible.
- **`errand_curtius`**, "Someone must keep him supplied", success: "left papers with Curtius,
  who promised to place them before the Emperor." That one line is the whole Prague
  frustration. Good.
- **The nuncio as a node that unlocks only when summoned** (`nuncio_summons`), risk `high`.
  The rebel fleet becomes a door that opens on you.
- **Hájek's house labels** ("Hájek's Study", "Travelling Chest").

### What is missing or misplaced

1. **The family is not in Prague.** The household screen should show Jane, the three children
   and Joan Kelley in Quarters from day 0, at `hajek_1` Quarters level 1 (holds 3 besides Dee).
   That puts the household over capacity on arrival — stability falls, Focus does not restore —
   which is the correct opening condition for a family lodging in another man's house.
   Buying `hajek_2` (the 12 January 1585 move) is then the relief it was. [record for the
   people; inference for the effect]
2. **Kraków is off the map.** Dee went back to Kraków twice inside this window (Oct–Dec 1584 to
   fetch the household; Apr–Aug 1585 for King Stephen) (Whitby 46–48). [inference] Do not add a
   third map. Make **"The road to Kraków"** an expedition from Hájek's house: Dee and his
   retinue leave for 15–25 days; the household stays under whoever is posted to Quarters; the
   King Stephen audience resolves as an encounter on return. The Uriel instruction fires before
   it (CREW_AS_CHARACTERS §2).
3. **The angels have no agenda.** The record gives them one with dates. A small **prophecy
   track** (see PROPOSED_MECHANICS_TWEAKS #5) under the weather track: "Cross in
   Constantinople — 15 Sept 1585 (sector day ~60)"; "All rulers overthrown — January 1587 (after
   the sector)". When the date passes without fulfilment, nothing happens mechanically except
   that the track records it. The player sees the prophecy expire. That is honest and it is
   pointed: the game neither mocks nor confirms.
4. **The Mortlake news is in the wrong place.** `weather_mortlake_spoiled` (day 30) says word
   reaches Prague. The record has a Kelley vision en route in 1583 (Fenton 126–128 n.6) and the
   discovery in 1589. Move it to the voyage, phrase it as a vision, and resolve the losses later
   (BOOKS_AS_STORY §4).
5. **Kelley's rise.** [record] The angels promise Kelley he will be a great seer and "supreme
   alchemist" (Parry 193–195); in Prague he talks of going home (Whitby 46–48). [inference]
   Over the sector Continental Courts should rise faster from Kelley's laboratory postings than
   from Dee's actions, so that by the summons the player has seen whose work the court is
   buying. That is the hinge to Třeboň.
6. **Pucci.** [record] Francesco Pucci joins the sittings in 1585 and is at the furnace (Fell
   Smith 88; Fenton 200–202). He is a guest whose presence raises nuncio interest. A small
   crew card with that one trade-off would characterise the Catholic net closing.

### Pacing [inference]

The sector is 120 days for ~22 months, about five and a half days each. Fixed beats on the
weather track, by my mapping (ARC_REPORT §5):

| Day | Beat | Status |
|---|---|---|
| 0 | Arrive at Hájek's: household over capacity | documented |
| ~5 | Audience; Dee tells the Emperor to repent | documented (Harkness 68–70; Whitby 44–46) |
| ~6 | Curtius named (currently 15) | documented |
| 11–24 | Road to Kraków (optional expedition) | documented |
| ~28 | The move near the Old Town market becomes available | documented |
| 43–67 | Road to Kraków and King Stephen | documented |
| ~60 | Prophecy date: the Cross in Constantinople | documented (as prophecy) |
| ~60 | Papal envoys take an interest | documented |
| ~108 | Summons (currently 95) | documented |
| ~111 | The furnace | documented |
| ~114 | The books found again | documented |
| 120 | Edict; the road to Třeboň | documented |

The middle of the sector (days 30–100) is thin on fixed beats, which is right: it is where the
player works the city with errands and the Kraków road, and where Kelley's alchemy outgrows
Dee's actions.

### The end screen

[record] In December 1586 at Třeboň, Edward Garland arrived from the Emperor of Muscovy
inviting Dee to Russia (Fenton 216–219); Håkansson gives the offer as £2,000 a year and Dee
declining it (Håkansson 31–33). This is just past the sector, and it is the best possible
closing card for Prague because it is a **documented** eastern road that Dee did not take.
Show it on the sector-end screen as a fact, not a choice. It also does work for Part 2.

---

## Part 2. The Ottoman counterfactual

### What is documented, what is argued, what is invented

| Layer | Content | Tag |
|---|---|---|
| Record | Dee owned the *Book of Soyga* (diary, 17 Jan 1582) and asked the angels about it on 10 March 1582, two days after Kelley arrived; Uriel said it was revealed to Adam in Paradise (Harkness 58–60; Szőnyi 226–228) | documented |
| Record | Murad III reigned 1574–95; Sufi, devoted to dreams, astrology, talismans; his reign spanned the Islamic millennium, **1000 AH = 1591–92 CE** | documented (general history; the existing files' "992 AH / 1592 CE" is a slip, see ACCURACY_FLAGS) |
| Record | The angels, through Kelley, prophesied Dee would "set up the sign of the Cross even in the midst of Constantinople" (Fenton 144–146) and that the Turk would fall (Parry 193–195); in Prague Dee was reported predicting "the ruin not only of the city of Constantinople but of Rome also" (Budovec, quoted Harkness 24; Whitby 198–199) | documented |
| Record | Hájek had worked with Łaski on Habsburg plans to unite Christendom against the Turk (Parry 200–202) | documented |
| Argument | Soyga's lore derives from the Bunian–Bistamian corpus popular at the Ottoman court (Melvin-Koushki 2021) | contested (one scholar's argument) |
| Argument | Dee is best approached as an "Elizabethan Dr. Littleturk" (Melvin-Koushki 2021) | comparative |
| Invention | Dee goes to Istanbul and finds patronage | **counterfactual** |

The third row matters most and is absent from every current file. **In the record the angels
are anti-Ottoman.** Dee's angelic mission, as the angels framed it, was the conquest of
Constantinople for the Cross. A counterfactual that sends him there as a client of the Sultan
has to pass through that fact, or it misrepresents the man.

### How to keep it honest (TurkaVita lessons)

1. **Say whose idea it is.** The Ottoman route is Melvin-Koushki's thought experiment, not
   Dee's wish. The option text should name it: "[COUNTERFACTUAL — after Melvin-Koushki] ...".
   The current text, "where Murad III's interest in occult science is rumored to be substantial",
   puts the rumour in Dee's world. Nothing in the corpus shows Dee hearing such a rumour.
2. **Pass through the prophecy.** The Ottoman option should appear only *after* the player has
   seen the angels' Constantinople prophecy (or, from England, after the Soyga question), and
   its text should acknowledge the inversion: the city the angels told him to take becomes the
   court that might have employed him. That is a sharper counterfactual than "a road not taken",
   and it is true to the record's shape.
3. **The duress rule.** Only what Dee wrote freely can stand for what he held. Nothing he wrote
   expresses a wish to serve the Sultan. The counterfactual must therefore be framed as a
   historian's question ("what if his profile had met a court that rewarded it?"), never as
   Dee's suppressed desire.
4. **Refusing is not a worse kind of losing** (TurkaVita `tribunal`). Declining the Ottoman
   option should not cost the player anything that the option's existence created. Today the
   gate needs `ottoman_thread_open`, Continental 30 and £40; declining is free. Keep it so.
5. **Near-miss by default.** DeeVisualNovel's design: the path is cultivable, a near-miss is the
   normal outcome, full arrival is rare. FTLDee's current option goes straight to `endCareer`
   with one paragraph. [inference] Better: choosing it plays one short counterfactual sequence
   (three or four screens, all tagged COUNTERFACTUAL, depicting the Ottoman court from the
   scholarship, as `OTTOMAN_CONNECTION.md` rule 4 says), then an epilogue that names the record:
   Dee went to Prague; the angels promised him Constantinople as a conquest; he never went
   east; he declined Muscovy; he died poor at Mortlake.
6. **Put the documented eastern road beside it.** The Muscovy invitation (Part 1, end screen)
   is the record's own version of "a richer eastern patron offered and Dee said no". Showing it
   at the end of every Prague run means the counterfactual is always read against a real
   decision of the same kind.
7. **No sorcery meter.** From Query of Kings: no charge is sorcery; exposure rises with
   attachments. In the Ottoman sequence Dee's danger should come from politics (a fallen
   patron, a Christian renegade at an Islamic court) rather than from magic being forbidden,
   because Melvin-Koushki's whole point is that his profile was *legible* there.

### Where the thread is cultivated today, and a fix

`SYSTEMS_V2.md` §8: signals for acquiring Soyga, completing the Scrying Chamber, and asking the
angels about Soyga; at 3, `ottoman_thread_open`. Two problems:
- Acquiring Soyga is a market roll (BOOKS_AS_STORY §1). Make the book fixed.
- **Completing the Scrying Chamber** is not an Ottoman signal in any source. It is the angelic
  path in general. [inference] Replace it with a signal that is about letters and the East:
  owning *Picatrix* (an Arabic handbook in Latin), or reading Soyga's tables with Kabbalah ≥ 6
  (Dee "struggled with the Soyga tables", MECHANICS_FROM_BIOGRAPHY §I).
