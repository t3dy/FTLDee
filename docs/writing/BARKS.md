# Barks

Short lines spoken by the household (or the narrator) when something happens. Shipped as
`COPY.barks` in `src/data/copy/index.ts`; every `BarkTrigger` in
`src/data/copy/types.ts` has at least three.

## Rules

1. **Real people speak in reported speech, without quotation marks.** Jane Dee, Roger
   Cooke, Barnabas Saul, Edward Kelley and Dee himself: *Jane counts the purse twice and
   says it will not stand another building season.* Never: *"It will not stand
   another season," says Jane.*
2. **Anonymous speakers may speak directly**: the `steward` (a household servant), the
   `bookseller` (London or Prague) and the `narrator`.
3. **Barks do not carry facts.** A bark is colour on a game event. Anything that could be
   read as a historical claim (dates, who said what to whom at court, what Kelley really
   saw) belongs in an encounter with a status and a source, not here.
4. **Kelley is not judged.** His sincerity is disputed in the scholarship and the game
   does not settle it. His barks show eagerness, confidence and charm; they do not wink.
5. **Jane is not a scold.** She runs the household and its money. Her lines are about
   cost and order, and they are usually right.
6. **One line, under 25 words**, present tense.
7. **Speaker availability.** Saul only in England and only before Kelley is hired.
   Kelley from his hiring onward. The steward speaks at the base; the bookseller only at
   a market. The game should pick a bark whose speaker is present, and fall back to the
   narrator.

## Selection

When a trigger fires, the game picks one bark whose speaker is present (in the household
for base events, in the retinue for road events), avoiding the last bark used for that
trigger. The narrator is always present.

## Tokens

`{room} {level} {book} {price} {crew} {place} {days} {fortune} {house} {skill} {faction}`.
A bark that uses a token the event does not supply should not be chosen for that event
(e.g. `book_left_at_base` with `{place}` only on the road).

## The barks

Generated from `src/data/copy/index.ts` on 2026-10-03. Edit both together.

### `room_upgraded`

| Speaker | Text |
|---|---|
| narrator | The {room} is at level {level}. The builders leave sawdust and a bill. |
| jane_dee | Jane walks through the new {room}, says it is very fine, and asks what it cost. |
| steward | "The {room} is finished, sir. I have swept it twice and it is still full of joiners." |
| roger_cooke | Roger Cooke enters the {room} at level {level} in the household book and underlines it. |
| dee | Dee notes in his almanac that the {room} is done, and on the same line what it is for. |

### `room_unmanned`

| Speaker | Text |
|---|---|
| steward | "Nobody is in the {room}, sir. Is it to be a storeroom?" |
| narrator | The {room} is unmanned. Its level still counts; the extra hand does not. |
| jane_dee | Jane mentions that the {room} has been empty since {crew} left it, and that rooms do not keep themselves. |
| roger_cooke | Roger Cooke asks whether he should sit in the {room} for the afternoon, since nobody else is. |

### `crew_assigned`

| Speaker | Text |
|---|---|
| roger_cooke | Roger Cooke takes the stool in the {room} and says he will have it in order by Friday. |
| jane_dee | Jane takes the {room} in hand. She says she will need the key, and the accounts. |
| edward_kelley | Kelley looks round the {room}, says it will do, and moves the table nearer the window. |
| barnabas_saul | Saul settles in the {room} and asks to be left alone with the stone for an hour. |
| narrator | {crew} is posted to the {room}. |

### `crew_retinue`

| Speaker | Text |
|---|---|
| narrator | {crew} will travel with Dee. Their skills go too; their place at home stays empty. |
| jane_dee | Jane says she will come, and that someone had better tell the steward where the money is kept. |
| roger_cooke | Roger Cooke packs ink, sand and a spare pen, and asks how long they will be. |
| edward_kelley | Kelley says he is glad of the journey and asks who will be there. |

### `book_bought`

| Speaker | Text |
|---|---|
| bookseller | "{book}. A fair copy, Doctor, and £{price} is a fair price. I'll wrap it." |
| bookseller | "You have an eye. I had a gentleman from Gray's Inn after that one." |
| narrator | {book} joins the library for £{price}. At home it counts at once. |
| jane_dee | Jane sees the parcel and asks, before anything else, what it cost. |
| dee | Dee writes his name and the price inside the cover, as he does with all of them. |

### `book_sold`

| Speaker | Text |
|---|---|
| bookseller | "£{price} for {book}. You'll want it back, Doctor. They always want it back." |
| bookseller | "Half the value, sir, as the trade goes. Bring me a catalogue and we'll talk about the rest." |
| narrator | {book} is sold for £{price}. What it taught goes with it. |
| roger_cooke | Roger Cooke strikes {book} from the catalogue and leaves a gap on the shelf, in case. |

### `book_unaffordable`

| Speaker | Text |
|---|---|
| bookseller | "£{price}, Doctor. I can keep it back a day or two, not longer." |
| narrator | {book} costs £{price}. The purse does not. |
| jane_dee | Jane says nothing, and the nothing is about £{price}. |
| bookseller | "I don't give credit on manuscripts, sir. Not even to you." |

### `book_prereq_missing`

| Speaker | Text |
|---|---|
| narrator | {book} cannot be read without a grounding Dee's library does not supply. The card shows what is missing. |
| bookseller | "You'll want the other one first, Doctor. Nobody starts there." |
| roger_cooke | Roger Cooke looks through the catalogue for what {book} needs and does not find it. |
| dee | Dee turns the leaves of {book} and puts it down. He says it presupposes a book he no longer has. |

### `forbidden_book_bought`

| Speaker | Text |
|---|---|
| bookseller | "£{price}, and I'd want it out of the shop by dark." |
| bookseller | "I never had it, you never bought it. Mind the step." |
| narrator | {book} is bought. It is the kind of book people remember you bought. Secrecy falls. |
| jane_dee | Jane asks where {book} is to be kept, and then asks that it not be kept anywhere the servants dust. |
| edward_kelley | Kelley reads the first leaf of {book} twice and asks if he may take it to his room. |

### `satchel_full`

| Speaker | Text |
|---|---|
| narrator | The satchel will not close. Something has to stay on the shelf. |
| steward | "It will not shut, sir. I can sit on it, but I don't advise it." |
| roger_cooke | Roger Cooke suggests, carefully, that the Almagest is very large. |
| jane_dee | Jane points out that it is a satchel and not a cart. |

### `satchel_packed`

| Speaker | Text |
|---|---|
| narrator | {book} goes in the satchel. Wherever Dee goes, it goes. |
| steward | "Packed, sir, and the straps done. I put the little one on top." |
| roger_cooke | Roger Cooke notes in the catalogue that {book} is out of the house. |
| dee | Dee packs {book} himself. He does not let the servants handle that one. |

### `book_left_at_base`

| Speaker | Text |
|---|---|
| narrator | {book} is on the shelf at Mortlake. It will be there when Dee comes back. If he comes back. |
| roger_cooke | Roger Cooke says {book} is on the shelf at home, where it is no use to anyone in {place}. |
| narrator | This needs {book}. It is at the house, not in the satchel. |
| dee | Dee remembers exactly where {book} is: on the third shelf, at home. |

### `errand_sent`

| Speaker | Text |
|---|---|
| narrator | {crew} sets out for {place}. Back in {days} days. |
| jane_dee | Jane takes the letter, her cloak and the purse, and says she will be back in {days} days whatever they tell her at {place}. |
| roger_cooke | Roger Cooke asks for the list again, folds it into his hat, and leaves for {place}. |
| edward_kelley | Kelley says {place} is no trouble and he knows the road. He is gone before anyone asks how. |
| steward | "I've told the stables, sir. {crew} has the good horse." |

### `errand_success`

| Speaker | Text |
|---|---|
| narrator | {crew} is back from {place}, and it went well. |
| jane_dee | Jane comes back from {place} and puts the result on the table before she takes her gloves off. |
| roger_cooke | Roger Cooke reports from {place} at length and in order, and it is good news. |
| edward_kelley | Kelley returns from {place} with the result and a story about the road. |

### `errand_failure`

| Speaker | Text |
|---|---|
| narrator | {crew} is back from {place} with nothing to show for {days} days. |
| jane_dee | Jane says she waited at {place} until they stopped pretending she would be seen. |
| roger_cooke | Roger Cooke apologises for {place}. He says he was too late, or too early, and is not sure which. |
| edward_kelley | Kelley says {place} was not what he had been told it would be. |

### `travel_depart`

| Speaker | Text |
|---|---|
| narrator | Dee leaves for {place}. {days} days on the road. Only the satchel and the retinue go with him. |
| jane_dee | Jane checks the satchel, then the purse, then the satchel again. |
| steward | "The boat's at the stairs, sir. The tide won't wait for the Almagest." |
| dee | Dee writes {place} in the almanac and the day he expects to be back. |

### `arrive_base`

| Speaker | Text |
|---|---|
| narrator | Home. Every book on the shelves counts again. |
| steward | "Welcome home, sir. There are letters, and a man about the roof." |
| jane_dee | Jane meets Dee at the door with the household news, in order of cost. |
| roger_cooke | Roger Cooke has the letters sorted by the time Dee has his boots off. |

### `fortune_rise`

| Speaker | Text |
|---|---|
| narrator | Fortune rises: {fortune}. |
| jane_dee | Jane pays the butcher in full and says nothing about it, which is how Dee knows things are better. |
| steward | "The chandler's boy was very civil today, sir. I think word has gone round." |
| dee | Dee notes in the margin that {faction} has been gracious, and does not yet note the sum. |

### `fortune_fall`

| Speaker | Text |
|---|---|
| narrator | Fortune falls: {fortune}. |
| jane_dee | Jane counts the purse twice and says it will not stand another building season. |
| steward | "The chandler wants paying, sir. He was very polite about it, which is worse." |
| roger_cooke | Roger Cooke asks, quietly, whether his quarter's wages are still to be paid at Lady Day. |

### `house_upgraded`

| Speaker | Text |
|---|---|
| narrator | {house}. The rooms can go higher now, and every room has another working place. |
| jane_dee | Jane walks the length of {house} once and says it will take more servants than they have. |
| steward | "More rooms, sir. More to heat. I'll order the wood." |
| dee | Dee writes {house} at the head of a fresh page in the almanac. |

### `secrecy_low`

| Speaker | Text |
|---|---|
| steward | "There was a man at the gate asking which room the crystal is kept in, sir. I said the kitchen." |
| jane_dee | Jane says the neighbours have started asking her about the lights in the upper room. |
| narrator | Secrecy is {level}. The house is talked about, and some of the talk reaches people who write things down. |
| roger_cooke | Roger Cooke reports that a letter came opened and resealed, badly. |

### `money_low`

| Speaker | Text |
|---|---|
| jane_dee | Jane counts the purse and asks, without heat, which of the rooms he intends to eat. |
| steward | "The baker's sent the bill again, sir. With a note." |
| narrator | £{price} left. Errands, building and the market will start to say no. |
| roger_cooke | Roger Cooke suggests, with respect, that some of the duplicates might be sold. |

### `focus_low`

| Speaker | Text |
|---|---|
| jane_dee | Jane takes the candle away at midnight and says the angels will keep. |
| narrator | Focus is {level}. Dee reads the same line three times. He needs a few days at home. |
| roger_cooke | Roger Cooke finds Dee asleep over the tables and does not wake him. |
| dee | Dee notes that he has worked late every night this week and done less each night. |

### `overcrowded`

| Speaker | Text |
|---|---|
| steward | "Begging your pardon, sir, but there are more people in this house than beds." |
| jane_dee | Jane says the house is full, the children are sleeping in the passage, and something has to give. |
| narrator | The household is over capacity. Stability falls each day and nobody gets their Focus back. |
| roger_cooke | Roger Cooke offers to sleep in the Library. It is not a kindness to the books. |

### `weather_event`

| Speaker | Text |
|---|---|
| narrator | The weather changes: {place}. It was on the track; now it is here. |
| jane_dee | Jane brings the news from the market before the letters bring it from court. |
| roger_cooke | Roger Cooke copies out the news for the file and marks who will be pleased by it. |
| steward | "They were all talking about it at the ferry, sir." |

### `blue_option_taken`

| Speaker | Text |
|---|---|
| narrator | That was open because of what Dee had with him. Few people in the room could have said it. |
| narrator | {book} earned its place in the satchel. |
| narrator | {crew}'s {skill} made the difference. |
| dee | Dee notes the day and the argument, and that nobody else present could have made it. |
| roger_cooke | Roger Cooke makes a fair copy of what was said, for the file. |

### `sector_change`

| Speaker | Text |
|---|---|
| narrator | The house at Mortlake is shut. {crew} keeps the key. |
| dee | Dee writes in the margin of his almanac that the house is shut and the key given, and does not write anything else that day. |
| jane_dee | Jane counts the children, the trunks and the money, in that order, twice. |
| edward_kelley | Kelley says the Continent will understand Dee better than England did. |
| narrator | {place}. A smaller house, a bigger city, and only what fitted in the satchel. |
