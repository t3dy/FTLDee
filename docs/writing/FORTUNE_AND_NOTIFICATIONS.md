# Fortune, house tiers and notifications

Banner and toast copy. Authoring source for `COPY.fortunes`, `COPY.houseTiers` and the
notice templates the game builds at runtime. Tokens: `{room} {level} {book} {price}
{crew} {place} {days} {fortune} {house} {skill} {faction}`.

## 1. Fortune banners

Fortune = `min(money, 200)/4 + (three highest faction values)/6`. The banner fires when
the rank changes. **Rise** text is shown on climbing into the rank; **fall** text on
dropping into it. Two of the ten texts can never fire in play (no one rises into
Destitute or falls into Endowed); they are written anyway as fallbacks.

Every banner has three parts: the rank label in capitals, one or two sentences, and a
small-print line saying what the rank does (shown under the text).

### Destitute (under 20)

- **Label:** DESTITUTE
- **Rise** (fallback): *Destitute. This is where the count begins.*
- **Fall:** *The bills are in Jane's hand and the creditors know the road to Mortlake.
  Nothing that matters has been lost yet. Most of it is on loan.*
- **Small print:** Fortune under 20. No house tier can be bought.

### Straitened (20–34)

- **Label:** STRAITENED
- **Rise:** *Out of the worst of it. The purse holds enough for one good decision, and
  only one.*
- **Fall:** *The money has gone into the house, the shelves or the furnace. Jane has
  noticed. So, by now, has the butcher.*
- **Small print:** Fortune 20–34. No house tier can be bought until Comfortable.

### Comfortable (35–49)

- **Label:** COMFORTABLE
- **Rise:** *Paid up and spoken well of. A man in this position can afford to be
  interested in things.*
- **Fall:** *The builders have been paid and the purse is light. Nothing is lost that
  cannot be earned back; the house is simply bigger than the income.*
- **Small print:** Fortune 35–49. In Prague, enough to take the house near the Old Town
  market.

### Favoured (50–64)

- **Label:** FAVOURED
- **Rise:** *The court has found a use for him. A man whose advice is wanted in writing
  is a man whose bills are paid a little sooner.*
- **Fall:** *Still favoured, which is to say still useful. The favour that bought the
  last improvement has been spent on it.*
- **Small print:** Fortune 50–64. Mortlake can be enlarged (£80).

### Endowed (65 and over)

- **Label:** ENDOWED
- **Rise:** *For the moment, Dee has what he always asked for: enough. The question is
  what he builds with it before it goes.*
- **Fall** (fallback): *Endowed, still. Nobody falls into this.*
- **Small print:** Fortune 65+. With the Queen's and Burghley's standing, the
  counterfactual royal foundation becomes possible.

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
> to another near the marketplace in Old Prague (Whitby 46–48). Rooms can now be built to
> their third level, and each holds one more worker. The household has a door of its own
> again.

### Tier panel line when a tier is locked

- Not enough fortune: *Needs {fortune}. Dee is not there yet.*
- Not enough money: *Needs £{price}. The builders do not work on credit.*
- Faction requirement unmet (mortlake_3): *Needs Elizabeth 80 and Burghley 50. The
  petition has to be read by people who want to say yes.*

---

## 3. Weather notifications

Weather events appear on the map's weather track before they fire (as a marker with a
day number) and as a toast when they do. The toast names the status.

### England

| Day | Event | Toast |
|---|---|---|
| 60 | Łaski arrives (documented) | **Albert Łaski is in England.** A Polish magnate with debts, ambitions and an interest in the occult arts. Walsingham's people are already watching him. *Walsingham +5. A new encounter is open.* |
| 90 | Puritan pressure (plausible) | **The preachers are louder.** London pulpits are naming astrology and conjuring. The bishops are listening. *Religious Authorities −10, Elizabeth −3.* |
| 110 | Calendar reform blocked (documented) | **The calendar stays as it is.** The bishops have refused the reform that Dee did the mathematics for. The scholars are on his side; the Church is not. *Religious Authorities −5, Burghley −5, Scholar Network +5.* |
| 130 | Imperial ideology loses currency (plausible) | **The empire has gone out of fashion.** The arguments of the *Limites* get a politer hearing and less money. *Burghley −8, Leicester −3.* |
| 150 | The Continental Question (documented) | **Łaski has made his offer.** The decision cannot wait any longer. |

### Prague

| Day | Event | Toast |
|---|---|---|
| 100 | The nuncio's summons (documented) | **The papal nuncio wants to see him.** The nuncio Malaspina has questions about the actions, and the Emperor's court has heard he is asking them. (Harkness 70–72.) |
| 120 | Departure (documented) | **Prague is closed to him.** The road south leads to Třeboň and Vilém Rožmberk. |

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

Proposed thresholds (the rules do not set them; see the note to the orchestrator):

| Warning | Fires when | Text |
|---|---|---|
| Money low | money under £10 | **Money is short.** £{price} left. Errands, building and the market will start to say no. |
| Money gone | money £0 | **The purse is empty.** Nothing can be bought until something is earned or sold. |
| Secrecy low | Secrecy under 30 | **The household is talked about.** Secrecy {level}. Some encounters will now notice what Dee does. |
| Secrecy very low | Secrecy under 15 | **People are watching the house.** Secrecy {level}. Every forbidden book and every action with spirits is now a risk. |
| Focus low | Focus under 20 | **Dee is tired.** Focus {level}. Long work will not start until he has rested at home. The Study helps. |
| Overcrowded | household over Quarters capacity | **The house is too full.** Stability falls each day and nobody recovers Focus. Build the Quarters or send someone away. |
| Drift | each drift tick that lowers standing | **Letters unanswered.** Scholar Network and Continental Courts standing fall. A better Correspondence room slows this. |
| Unmanned room | a room with stations and a key-skill crew member idle | **{room} is unmanned.** Someone in the house could work there. |

---

## 6. Sector change and the letters from England

- **Leaving England:** *The house at Mortlake is shut. {crew} keeps the key.*
- **Arriving in Prague:** *Prague. Hájek's house, by the Emperor's leave and the
  physician's kindness.*
- **The letters from England** (fires once in Prague, after the emigration):

  > **Letters from England.** The house at Mortlake has been broken into and its books
  > and instruments taken. Not by a mob: by people Dee knew, employees and friends
  > (Håkansson 31–33; Whitby 52–54). Lost: {book list}. Lost from the Instrument Room:
  > {instrument list}.

  The two lists are generated from `leftBehind` and from instruments with
  `travels: false`. If Mercator's globes are among them, add the line: *The globes are on
  the 1583 list of losses (Whitby 67–70).*
