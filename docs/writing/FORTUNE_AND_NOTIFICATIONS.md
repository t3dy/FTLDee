# Fortune, house tiers and notifications

Banner and toast copy. Authoring source for `COPY.fortunes`, `COPY.houseTiers` and the
notice templates the game builds at runtime. Tokens: `{room} {level} {book} {price}
{crew} {place} {days} {fortune} {house} {skill} {faction}`.

## 1. Fortune banners

Fortune, as `src/systems/fortune.ts` computes it on 2026-10-04: `min(money, 200)/4 + (three
highest faction values)/8 + promised rewards/8 (at most 25)`. Ranks: under 15 Destitute,
under 30 Straitened, under 45 Comfortable, under 60 Favoured, 60+ Endowed. (SYSTEMS_V2.md
§3 still gives /6 and 20/35/50/65; the code wins until the rules are reconciled.) The banner fires when
the rank changes. **Rise** text is shown on climbing into the rank; **fall** text on
dropping into it. Two of the ten texts can never fire in play (no one rises into
Destitute or falls into Endowed); they are written anyway as fallbacks.

Every banner has three parts: the rank label in capitals, one or two sentences, and a
small-print line saying what the rank does (shown under the text).

### Destitute (under 15)

- **Label:** DESTITUTE
- **Rise** (fallback): *Destitute. This is where the count begins.*
- **Fall:** *The bills are in Jane's hand and the creditors know the road to Mortlake.
  Nothing that matters has been lost yet. Most of it is on loan.*
- **Small print:** Fortune under 15. No house tier can be bought.

### Straitened (15–29)

- **Label:** STRAITENED
- **Rise:** *Out of the worst of it. The purse holds enough for one good decision, and
  only one.*
- **Fall:** *The money has gone into the house, the shelves or the furnace. Jane has
  noticed. So, by now, has the butcher.*
- **Small print:** Fortune 15–29. No house tier can be bought until Comfortable.

### Comfortable (30–44)

- **Label:** COMFORTABLE
- **Rise:** *Paid up and spoken well of. A man in this position can afford to be
  interested in things.*
- **Fall:** *The builders have been paid and the purse is light. Nothing is lost that
  cannot be earned back; the house is simply bigger than the income.*
- **Small print:** Fortune 30–44. In Prague, enough to take the house near the Old Town
  market.

### Favoured (45–59)

- **Label:** FAVOURED
- **Rise:** *The court has found a use for him. A man whose advice is wanted in writing
  is a man whose bills are paid a little sooner.*
- **Fall:** *Still favoured, which is to say still useful. The favour that bought the
  last improvement has been spent on it.*
- **Small print:** Fortune 45–59. Mortlake can be enlarged (£80).

### Endowed (60 and over)

- **Label:** ENDOWED
- **Rise:** *For the moment, Dee has what he always asked for: enough. The question is
  what he builds with it before it goes.*
- **Fall** (fallback): *Endowed, still. Nobody falls into this.*
- **Small print:** Fortune 60+. With the Queen's and Burghley's standing and a drafted
  royal grant, the counterfactual royal foundation becomes possible.

### Design note on the fall banner

The commonest fall is the one the player causes on purpose, by paying for a house tier.
The fall texts for Straitened, Comfortable and Favoured are written so that they read as
a receipt, not a punishment.

---

## 2. House tier announcements

Shown full-width on completion of the build, with the tier card beside it.

### mortlake_2 — *Mortlake enlarged* (plausible)

> **Mortlake enlarged.** The adjoining rooms and outbuildings are taken in. Every room can
> now be built to its third level, and each holds one more worker. It is the building
> programme of a man who expects the reward to come. Status: plausible. The record has
> the costs of the library, the laboratories and the travel; it does not have this
> extension.

### mortlake_3 — *A royal foundation at Mortlake* (COUNTERFACTUAL)

> **A royal foundation at Mortlake. COUNTERFACTUAL.** This did not happen. The petitions
> are in the record; the grant is not. In this career the Crown pays for the library, the
> laboratories and the instruments, two more places are made in every room, and £12
> arrives every ten days. For once Dee is an institution rather than a petitioner.

### hajek_2 — *A house near the Old Town market* (documented)

> **A house near the Old Town market.** On 12 January 1585 Dee moved out of Hájek's house
> to another near the marketplace in Old Prague (Whitby 31–33). Rooms can now be built to
> their third level, and each holds one more worker. The household has a door of its own
> again.

### Tier panel line when a tier is locked

- Not enough fortune: *Needs {fortune}. Dee is not there yet.*
- Not enough money: *Needs £{price}. The builders do not work on credit.*
- Faction requirement unmet (mortlake_3): *Needs Elizabeth 80 and Burghley 50. The
  petition has to be read by people who want to say yes.*
- Grant not yet drafted (mortlake_3): *Needs a royal grant. While the Queen and Burghley
  are both warm, one may be drafted; check again in ten days.*

---

## 3. Weather notifications

Weather events appear on the map's weather track before they fire (as a marker with a
day number) and as a toast when they do. The toast names the status.

### England

| Day | Event | Toast |
|---|---|---|
| 20 | Foxe remembered (documented) | **Under the honey lies the poison.** Old readers of Foxe remember "Dr Dee", the conjuring chaplain in Bonner's garden. *Costs more for each Prologue choice that put you there.* |
| 45 | Preachers against conjurors (plausible) | **The preachers are louder.** London pulpits are naming astrologers and conjurors. *Religious Authorities −8, Elizabeth −2, Secrecy −5.* |
| 100 | Łaski arrives (documented) | **Albert Łaski is in England.** A Polish magnate, entertained at court, who asks to meet Dee. Walsingham's people take note. *Walsingham +3, Continental +5. A new encounter is open.* |
| 125 | The imperial programme loses its moment (plausible) | **The empire has gone out of fashion.** The *Limites* get a politer hearing and fewer readers. *Burghley −6, Leicester −3.* |
| 130 | Calendar reform blocked (documented) | **The calendar stays as it is.** Burghley accepted the reckoning; the bishops refused a calendar that comes from Rome. *Religious Authorities −5, Burghley +2, Scholar +4; worse if the Prologue made you Bonner's chaplain or an informer.* |
| 150 | The Continental Question (documented) | **Łaski has made his offer.** The decision cannot wait any longer. |

### The Road East

| Day | Event | Toast |
|---|---|---|
| 12 | A vision of Mortlake (documented) | **Kelley sees the library broken open.** Dee cannot know whether it is true. (It was: by servants and friends who thought he would not return, not by a mob.) *Scholar −3.* |
| 16 | A renegade (documented) | **In England they call you a renegade.** The departure is read as defection. *Elizabeth −3, Walsingham −3, more for each Catholic friend.* |
| 30 | Creditors at Mortlake (documented) | **The creditors are at the door.** Nicholas Fromond is selling Dee's goods and collecting his rents. *Merchant −5, Scholar −2.* |
| 70 | A report to Walsingham (documented) | **Someone has written home about you.** An Englishman reports Dee at Kraków, having left a certain estate for an uncertain hope. *Walsingham −4, Elizabeth −3.* |

### Prague

| Day | Event | Toast |
|---|---|---|
| 10 | A letter already opened (plausible) | **The seal has been lifted and pressed down again.** The more you worked for Walsingham, the more he knows. |
| 15 | Dr Curtius named (documented) | **The Emperor will be approached through Dr Curtius.** *Continental +2.* |
| 60 | What Powle wrote home (documented) | **Burghley has a file on you.** Every boast and every service abroad has been reported home. |
| 60 | The papal envoys take an interest (documented) | **The nuncio is asking questions.** About the Englishmen and their alchemy. (Harkness 55–57.) *Religious Authorities −8, Secrecy −5.* |
| 95 | The nuncio's summons (documented) | **The invitations have become summons.** Dee must go to Malaspina. (Harkness 57.) |
| 120 | Prague closed (documented) | **Prague is closed to him.** The road south leads to Třeboň and Vilém Rožmberk. |
### Track tooltips

- Marker ahead: *In {days} days: {place}.*
- Marker passed: *Happened on day {days}.*
- Pressure line: *Political pressure rises a little every day. Each marker is a change in
  the weather.*

---

## 4. Errand reports

An errand report is a toast with the die shown. Structure:
`{crew} {outcome text}` + die line + effect line.

### Templates

- **Sent:** *{crew} sets out for {place}. Back in {days} days.*
- **Success:** *{crew} {outcome}* — *d10 {roll} + {skill} {value} = {total} against
  {difficulty}. Success.*
- **Failure:** *{crew} {outcome}* — *d10 {roll} + {skill} {value} = {total} against
  {difficulty}. Not enough.*
- **Bought a book:** *{crew} came back from {place} with {book} (£{price}).*
- **Bought nothing:** *{crew} found nothing worth the money and brought back what was left
  of the purse.*
- **Overdue** (if the base moves while they are out): *{crew} will find the house empty and
  follow on.*

The `{outcome}` text comes from the errand card (`success.description` /
`failure.description`), which is written to follow a name: "returned from Paul's
Churchyard with a purchase."

---

## 5. Warnings

Thresholds as `src/systems/time.ts` sets them (each fires once, and re-arms when the value recovers):

| Warning | Fires when | Text |
|---|---|---|
| Money low | money £5 or less (re-arms above £15) | **Money is short.** £{price} left. Errands, building and the market will start to say no. |
| Money gone | money £0 | **The purse is empty.** Nothing can be bought until something is earned or sold. |
| Secrecy low | Secrecy 15 or less (re-arms above 25) | **The household is talked about.** Secrecy {level}. Some encounters will now notice what Dee does. |
| Secrecy gone | Secrecy 0: the career collapses | **Summoned for examination.** The house has been talked about once too often. The career ends here. |
| Focus low | Focus 10 or less (re-arms above 25) | **Dee is tired.** Focus {level}. Long work will not start until he has rested at home. The Study helps. |
| Overcrowded | household over Quarters capacity | **The house is too full.** Stability falls each day and nobody recovers Focus. Build the Quarters or send someone away. |
| Drift | each drift tick that lowers standing | **Letters unanswered.** Scholar Network and Continental Courts standing fall. A better Correspondence room slows this. |
| Unmanned room | a room with stations and a key-skill crew member idle | **{room} is unmanned.** Someone in the house could work there. |

---

## 6. Sector change and the letters from England

- **Leaving England:** *The house at Mortlake is shut. {crew} keeps the key.*
- **Arriving in Prague:** *Prague. Hájek's house, by the
  physician's kindness.*
- **The vision of Mortlake** (Road East day 12) tells the player early; **the letters from
  England** confirm it with the list, once the household is in Prague:

  > **Letters from England.** The house at Mortlake has been broken into and its books
  > and instruments taken. Not by a mob: by people Dee knew, employees and friends
  > (Håkansson 31–33; Whitby 37–39). Lost: {book list}. Lost from the Instrument Room:
  > {instrument list}.

  The two lists are generated from `leftBehind` and from instruments with
  `travels: false`. If Mercator's globes are among them, add the line: *The globes are on
  the 1583 list of losses (Whitby 52–55).*
