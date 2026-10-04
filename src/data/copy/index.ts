// FTLDee copy module. Authoring sources: docs/writing/*.md (BARKS, ONBOARDING_ROOMS,
// ONBOARDING_BOOKS, FORTUNE_AND_NOTIFICATIONS, INTERFACE_HELP). Edit the .md first.
//
// Voice rules (docs/writing/STYLE_GUIDE.md): real people never get invented direct
// speech. Barks spoken by jane_dee, roger_cooke, barnabas_saul, edward_kelley and dee are
// written as reported speech with no quotation marks. 'steward', 'bookseller' and
// 'narrator' are anonymous and may speak directly.
//
// Tokens replaced at runtime: {room} {level} {book} {price} {crew} {place} {days}
// {fortune} {house} {skill} {faction}.

import type { CopyModule } from './types.js';

export const COPY: CopyModule = {
  barks: [
    // --- room_upgraded ---------------------------------------------------------
    { trigger: 'room_upgraded', speaker: 'narrator', text: `The {room} is at level {level}. The builders leave sawdust and a bill.` },
    { trigger: 'room_upgraded', speaker: 'jane_dee', text: `Jane walks through the new {room}, says it is very fine, and asks what it cost.` },
    { trigger: 'room_upgraded', speaker: 'steward', text: `"The {room} is finished, sir. I have swept it twice and it is still full of joiners."` },
    { trigger: 'room_upgraded', speaker: 'roger_cooke', text: `Roger Cooke enters the {room} at level {level} in the household book and underlines it.` },
    { trigger: 'room_upgraded', speaker: 'dee', text: `Dee notes in his almanac that the {room} is done, and on the same line what it is for.` },

    // --- room_unmanned ---------------------------------------------------------
    { trigger: 'room_unmanned', speaker: 'steward', text: `"Nobody is in the {room}, sir. Is it to be a storeroom?"` },
    { trigger: 'room_unmanned', speaker: 'narrator', text: `The {room} is unmanned. Its level still counts; the extra hand does not.` },
    { trigger: 'room_unmanned', speaker: 'jane_dee', text: `Jane mentions that the {room} has been empty since {crew} left it, and that rooms do not keep themselves.` },
    { trigger: 'room_unmanned', speaker: 'roger_cooke', text: `Roger Cooke asks whether he should sit in the {room} for the afternoon, since nobody else is.` },

    // --- crew_assigned ---------------------------------------------------------
    { trigger: 'crew_assigned', speaker: 'roger_cooke', text: `Roger Cooke takes the stool in the {room} and says he will have it in order by Friday.` },
    { trigger: 'crew_assigned', speaker: 'jane_dee', text: `Jane takes the {room} in hand. She says she will need the key, and the accounts.` },
    { trigger: 'crew_assigned', speaker: 'edward_kelley', text: `Kelley looks round the {room}, says it will do, and moves the table nearer the window.` },
    { trigger: 'crew_assigned', speaker: 'barnabas_saul', text: `Saul settles in the {room} and asks to be left alone with the stone for an hour.` },
    { trigger: 'crew_assigned', speaker: 'narrator', text: `{crew} is posted to the {room}.` },

    // --- crew_retinue ----------------------------------------------------------
    { trigger: 'crew_retinue', speaker: 'narrator', text: `{crew} will travel with Dee. Their skills go too; their place at home stays empty.` },
    { trigger: 'crew_retinue', speaker: 'jane_dee', text: `Jane says she will come, and that someone had better tell the steward where the money is kept.` },
    { trigger: 'crew_retinue', speaker: 'roger_cooke', text: `Roger Cooke packs ink, sand and a spare pen, and asks how long they will be.` },
    { trigger: 'crew_retinue', speaker: 'edward_kelley', text: `Kelley says he is glad of the journey and asks who will be there.` },

    // --- book_bought -----------------------------------------------------------
    { trigger: 'book_bought', speaker: 'bookseller', text: `"{book}. A fair copy, Doctor, and £{price} is a fair price. I'll wrap it."` },
    { trigger: 'book_bought', speaker: 'bookseller', text: `"You have an eye. I had a gentleman from Gray's Inn after that one."` },
    { trigger: 'book_bought', speaker: 'narrator', text: `{book} joins the library for £{price}. At home it counts at once.` },
    { trigger: 'book_bought', speaker: 'jane_dee', text: `Jane sees the parcel and asks, before anything else, what it cost.` },
    { trigger: 'book_bought', speaker: 'dee', text: `Dee writes his name and the price inside the cover, as he does with all of them.` },

    // --- book_sold -------------------------------------------------------------
    { trigger: 'book_sold', speaker: 'bookseller', text: `"£{price} for {book}. You'll want it back, Doctor. They always want it back."` },
    { trigger: 'book_sold', speaker: 'bookseller', text: `"Half the value, sir, as the trade goes. Bring me a catalogue and we'll talk about the rest."` },
    { trigger: 'book_sold', speaker: 'narrator', text: `{book} is sold for £{price}. What it taught goes with it.` },
    { trigger: 'book_sold', speaker: 'roger_cooke', text: `Roger Cooke strikes {book} from the catalogue and leaves a gap on the shelf, in case.` },

    // --- book_unaffordable -----------------------------------------------------
    { trigger: 'book_unaffordable', speaker: 'bookseller', text: `"£{price}, Doctor. I can keep it back a day or two, not longer."` },
    { trigger: 'book_unaffordable', speaker: 'narrator', text: `{book} costs £{price}. The purse does not.` },
    { trigger: 'book_unaffordable', speaker: 'jane_dee', text: `Jane says nothing, and the nothing is about £{price}.` },
    { trigger: 'book_unaffordable', speaker: 'bookseller', text: `"I don't give credit on manuscripts, sir. Not even to you."` },

    // --- book_prereq_missing ---------------------------------------------------
    { trigger: 'book_prereq_missing', speaker: 'narrator', text: `{book} cannot be read without a grounding Dee's library does not supply. The card shows what is missing.` },
    { trigger: 'book_prereq_missing', speaker: 'bookseller', text: `"You'll want the other one first, Doctor. Nobody starts there."` },
    { trigger: 'book_prereq_missing', speaker: 'roger_cooke', text: `Roger Cooke looks through the catalogue for what {book} needs and does not find it.` },
    { trigger: 'book_prereq_missing', speaker: 'dee', text: `Dee turns the leaves of {book} and puts it down. He says it presupposes a book he no longer has.` },

    // --- forbidden_book_bought -------------------------------------------------
    { trigger: 'forbidden_book_bought', speaker: 'bookseller', text: `"£{price}, and I'd want it out of the shop by dark."` },
    { trigger: 'forbidden_book_bought', speaker: 'bookseller', text: `"I never had it, you never bought it. Mind the step."` },
    { trigger: 'forbidden_book_bought', speaker: 'narrator', text: `{book} is bought. It is the kind of book people remember you bought. Secrecy falls.` },
    { trigger: 'forbidden_book_bought', speaker: 'jane_dee', text: `Jane asks where {book} is to be kept, and then asks that it not be kept anywhere the servants dust.` },
    { trigger: 'forbidden_book_bought', speaker: 'edward_kelley', text: `Kelley reads the first leaf of {book} twice and asks if he may take it to his room.` },

    // --- satchel_full ----------------------------------------------------------
    { trigger: 'satchel_full', speaker: 'narrator', text: `The satchel will not close. Something has to stay on the shelf.` },
    { trigger: 'satchel_full', speaker: 'steward', text: `"It will not shut, sir. I can sit on it, but I don't advise it."` },
    { trigger: 'satchel_full', speaker: 'roger_cooke', text: `Roger Cooke suggests, carefully, that the Almagest is very large.` },
    { trigger: 'satchel_full', speaker: 'jane_dee', text: `Jane points out that it is a satchel and not a cart.` },

    // --- satchel_packed --------------------------------------------------------
    { trigger: 'satchel_packed', speaker: 'narrator', text: `{book} goes in the satchel. Wherever Dee goes, it goes.` },
    { trigger: 'satchel_packed', speaker: 'steward', text: `"Packed, sir, and the straps done. I put the little one on top."` },
    { trigger: 'satchel_packed', speaker: 'roger_cooke', text: `Roger Cooke notes in the catalogue that {book} is out of the house.` },
    { trigger: 'satchel_packed', speaker: 'dee', text: `Dee packs {book} himself. He does not let the servants handle that one.` },

    // --- book_left_at_base -----------------------------------------------------
    { trigger: 'book_left_at_base', speaker: 'narrator', text: `{book} is on the shelf at Mortlake. It will be there when Dee comes back. If he comes back.` },
    { trigger: 'book_left_at_base', speaker: 'roger_cooke', text: `Roger Cooke says {book} is on the shelf at home, where it is no use to anyone in {place}.` },
    { trigger: 'book_left_at_base', speaker: 'narrator', text: `This needs {book}. It is at the house, not in the satchel.` },
    { trigger: 'book_left_at_base', speaker: 'dee', text: `Dee remembers exactly where {book} is: on the third shelf, at home.` },

    // --- errand_sent -----------------------------------------------------------
    { trigger: 'errand_sent', speaker: 'narrator', text: `{crew} sets out for {place}. Back in {days} days.` },
    { trigger: 'errand_sent', speaker: 'jane_dee', text: `Jane takes the letter, her cloak and the purse, and says she will be back in {days} days whatever they tell her at {place}.` },
    { trigger: 'errand_sent', speaker: 'roger_cooke', text: `Roger Cooke asks for the list again, folds it into his hat, and leaves for {place}.` },
    { trigger: 'errand_sent', speaker: 'edward_kelley', text: `Kelley says {place} is no trouble and he knows the road. He is gone before anyone asks how.` },
    { trigger: 'errand_sent', speaker: 'steward', text: `"I've told the stables, sir. {crew} has the good horse."` },

    // --- errand_success --------------------------------------------------------
    { trigger: 'errand_success', speaker: 'narrator', text: `{crew} is back from {place}, and it went well.` },
    { trigger: 'errand_success', speaker: 'jane_dee', text: `Jane comes back from {place} and puts the result on the table before she takes her gloves off.` },
    { trigger: 'errand_success', speaker: 'roger_cooke', text: `Roger Cooke reports from {place} at length and in order, and it is good news.` },
    { trigger: 'errand_success', speaker: 'edward_kelley', text: `Kelley returns from {place} with the result and a story about the road.` },

    // --- errand_failure --------------------------------------------------------
    { trigger: 'errand_failure', speaker: 'narrator', text: `{crew} is back from {place} with nothing to show for {days} days.` },
    { trigger: 'errand_failure', speaker: 'jane_dee', text: `Jane says she waited at {place} until they stopped pretending she would be seen.` },
    { trigger: 'errand_failure', speaker: 'roger_cooke', text: `Roger Cooke apologises for {place}. He says he was too late, or too early, and is not sure which.` },
    { trigger: 'errand_failure', speaker: 'edward_kelley', text: `Kelley says {place} was not what he had been told it would be.` },

    // --- travel_depart ---------------------------------------------------------
    { trigger: 'travel_depart', speaker: 'narrator', text: `Dee leaves for {place}. {days} days on the road. Only the satchel and the retinue go with him.` },
    { trigger: 'travel_depart', speaker: 'jane_dee', text: `Jane checks the satchel, then the purse, then the satchel again.` },
    { trigger: 'travel_depart', speaker: 'steward', text: `"The boat's at the stairs, sir. The tide won't wait for the Almagest."` },
    { trigger: 'travel_depart', speaker: 'dee', text: `Dee writes {place} in the almanac and the day he expects to be back.` },

    // --- arrive_base -----------------------------------------------------------
    { trigger: 'arrive_base', speaker: 'narrator', text: `Home. Every book on the shelves counts again.` },
    { trigger: 'arrive_base', speaker: 'steward', text: `"Welcome home, sir. There are letters, and a man about the roof."` },
    { trigger: 'arrive_base', speaker: 'jane_dee', text: `Jane meets Dee at the door with the household news, in order of cost.` },
    { trigger: 'arrive_base', speaker: 'roger_cooke', text: `Roger Cooke has the letters sorted by the time Dee has his boots off.` },

    // --- fortune_rise ----------------------------------------------------------
    { trigger: 'fortune_rise', speaker: 'narrator', text: `Fortune rises: {fortune}.` },
    { trigger: 'fortune_rise', speaker: 'jane_dee', text: `Jane pays the butcher in full and says nothing about it, which is how Dee knows things are better.` },
    { trigger: 'fortune_rise', speaker: 'steward', text: `"The chandler's boy was very civil today, sir. I think word has gone round."` },
    { trigger: 'fortune_rise', speaker: 'dee', text: `Dee notes in the margin that {faction} has been gracious, and does not yet note the sum.` },

    // --- fortune_fall ----------------------------------------------------------
    { trigger: 'fortune_fall', speaker: 'narrator', text: `Fortune falls: {fortune}.` },
    { trigger: 'fortune_fall', speaker: 'jane_dee', text: `Jane counts the purse twice and says it will not stand another building season.` },
    { trigger: 'fortune_fall', speaker: 'steward', text: `"The chandler wants paying, sir. He was very polite about it, which is worse."` },
    { trigger: 'fortune_fall', speaker: 'roger_cooke', text: `Roger Cooke asks, quietly, whether his quarter's wages are still to be paid at Lady Day.` },

    // --- house_upgraded --------------------------------------------------------
    { trigger: 'house_upgraded', speaker: 'narrator', text: `{house}. The rooms can go higher now, and every room has another working place.` },
    { trigger: 'house_upgraded', speaker: 'jane_dee', text: `Jane walks the length of {house} once and says it will take more servants than they have.` },
    { trigger: 'house_upgraded', speaker: 'steward', text: `"More rooms, sir. More to heat. I'll order the wood."` },
    { trigger: 'house_upgraded', speaker: 'dee', text: `Dee writes {house} at the head of a fresh page in the almanac.` },

    // --- secrecy_low -----------------------------------------------------------
    { trigger: 'secrecy_low', speaker: 'steward', text: `"There was a man at the gate asking which room the crystal is kept in, sir. I said the kitchen."` },
    { trigger: 'secrecy_low', speaker: 'jane_dee', text: `Jane says the neighbours have started asking her about the lights in the upper room.` },
    { trigger: 'secrecy_low', speaker: 'narrator', text: `Secrecy is {level}. The house is talked about, and some of the talk reaches people who write things down.` },
    { trigger: 'secrecy_low', speaker: 'roger_cooke', text: `Roger Cooke reports that a letter came opened and resealed, badly.` },

    // --- money_low -------------------------------------------------------------
    { trigger: 'money_low', speaker: 'jane_dee', text: `Jane counts the purse and asks, without heat, which of the rooms he intends to eat.` },
    { trigger: 'money_low', speaker: 'steward', text: `"The baker's sent the bill again, sir. With a note."` },
    { trigger: 'money_low', speaker: 'narrator', text: `£{price} left. Errands, building and the market will start to say no.` },
    { trigger: 'money_low', speaker: 'roger_cooke', text: `Roger Cooke suggests, with respect, that some of the duplicates might be sold.` },

    // --- focus_low -------------------------------------------------------------
    { trigger: 'focus_low', speaker: 'jane_dee', text: `Jane takes the candle away at midnight and says the angels will keep.` },
    { trigger: 'focus_low', speaker: 'narrator', text: `Focus is {level}. Dee reads the same line three times. He needs a few days at home.` },
    { trigger: 'focus_low', speaker: 'roger_cooke', text: `Roger Cooke finds Dee asleep over the tables and does not wake him.` },
    { trigger: 'focus_low', speaker: 'dee', text: `Dee notes that he has worked late every night this week and done less each night.` },

    // --- overcrowded -----------------------------------------------------------
    { trigger: 'overcrowded', speaker: 'steward', text: `"Begging your pardon, sir, but there are more people in this house than beds."` },
    { trigger: 'overcrowded', speaker: 'jane_dee', text: `Jane says the house is full, the children are sleeping in the passage, and something has to give.` },
    { trigger: 'overcrowded', speaker: 'narrator', text: `The household is over capacity. Stability falls each day and nobody gets their Focus back.` },
    { trigger: 'overcrowded', speaker: 'roger_cooke', text: `Roger Cooke offers to sleep in the Library. It is not a kindness to the books.` },

    // --- weather_event ---------------------------------------------------------
    { trigger: 'weather_event', speaker: 'narrator', text: `The weather changes: {place}. It was on the track; now it is here.` },
    { trigger: 'weather_event', speaker: 'jane_dee', text: `Jane brings the news from the market before the letters bring it from court.` },
    { trigger: 'weather_event', speaker: 'roger_cooke', text: `Roger Cooke copies out the news for the file and marks who will be pleased by it.` },
    { trigger: 'weather_event', speaker: 'steward', text: `"They were all talking about it at the ferry, sir."` },

    // --- blue_option_taken -----------------------------------------------------
    { trigger: 'blue_option_taken', speaker: 'narrator', text: `That was open because of what Dee had with him. Few people in the room could have said it.` },
    { trigger: 'blue_option_taken', speaker: 'narrator', text: `{book} earned its place in the satchel.` },
    { trigger: 'blue_option_taken', speaker: 'narrator', text: `{crew}'s {skill} made the difference.` },
    { trigger: 'blue_option_taken', speaker: 'dee', text: `Dee notes the day and the argument, and that nobody else present could have made it.` },
    { trigger: 'blue_option_taken', speaker: 'roger_cooke', text: `Roger Cooke makes a fair copy of what was said, for the file.` },

    // --- sector_change ---------------------------------------------------------
    { trigger: 'sector_change', speaker: 'narrator', text: `The house at Mortlake is shut. {crew} keeps the key.` },
    { trigger: 'sector_change', speaker: 'dee', text: `Dee writes in the margin of his almanac that the house is shut and the key given, and does not write anything else that day.` },
    { trigger: 'sector_change', speaker: 'jane_dee', text: `Jane counts the children, the trunks and the money, in that order, twice.` },
    { trigger: 'sector_change', speaker: 'edward_kelley', text: `Kelley says the Continent will understand Dee better than England did.` },
    { trigger: 'sector_change', speaker: 'narrator', text: `{place}. A smaller house, a bigger city, and only what fitted in the satchel.` },
  ],

  tips: [
    // --- household --------------------------------------------------------------
    { id: 'tip-household-plan', screen: 'household', title: 'This is Mortlake',
      body: `Dee's house by the Thames, drawn as a plan of rooms. Each room is a part of his working life. You will build these rooms up, put people to work in them, and go out from here to the court, the City and the Continent. Rooms have levels from 0 to 3; the marks in each room's corner show its level.` },
    { id: 'tip-household-crew', screen: 'household', title: 'Jane Dee and Roger Cooke',
      body: `Click a person, then click a room to put them to work there. Someone posted in a room who has 4 or more in one of its key skills mans it, and Dee gets +1 in those skills while he is at home.` },
    { id: 'tip-household-unmanned', screen: 'household', title: 'An empty room still works',
      body: `A room's level bonus applies whether or not anyone is posted there. Posting someone who knows the work adds +1. Rooms you never staff are bonuses you are not taking.` },
    { id: 'tip-household-retinue', screen: 'household', title: 'The retinue goes with Dee',
      body: `Click a person, then "Retinue". When Dee leaves the house, his retinue travels with him. On the road, a skill check uses Dee's skill or the best in his retinue, whichever is higher. At home, anyone in the house can stand in. A person in the retinue is not manning a room at home.` },
    { id: 'tip-household-quarters', screen: 'household', title: 'The Quarters hold the household',
      body: `At level 1 the house holds three people besides Dee. Over capacity, stability falls each day and nobody gets their Focus back. Quarters 2 and 3 hold more and settle the house.` },
    { id: 'tip-household-focus', screen: 'household', title: 'Focus is working energy',
      body: `Long research and the actions with spirits spend Focus. The Study gives it back each day Dee is at home: 1 a day at level 1, 2 at level 2, 3 at level 3.` },

    // --- upgrades ---------------------------------------------------------------
    { id: 'tip-upgrades-cost', screen: 'upgrades', title: 'Building costs money and days',
      body: `Each room card shows the next level: its cost, the days the work takes, and what it gives. Some levels need a skill or an instrument first, and the card says which. Days spent building are days off the sector clock.` },
    { id: 'tip-upgrades-bonus', screen: 'upgrades', title: 'What the levels give',
      body: `Level 2: +1 to the room's key skills at home. Level 3: +2. A posted crew member who knows the work: +1 more. The Library at 1 makes every book usable at home and at 3 sells books at full value. Correspondence slows, then stops, the drift of distant friendships.` },
    { id: 'tip-upgrades-cap', screen: 'upgrades', title: 'The house sets the ceiling',
      body: `At Mortlake as it stands, no room can go above level 2. To build to level 3 the house must be enlarged first, and that needs money and fortune.` },
    { id: 'tip-upgrades-scrying', screen: 'upgrades', title: 'Built from what the angels asked for',
      body: `The Scrying Chamber needs a show-stone for level 1, the Sigillum Dei for level 2 and the Holy Table for level 3. You can buy a show-stone. The rest is dictated in the actions.` },
    { id: 'tip-house-tier', screen: 'upgrades', title: 'The house can grow',
      body: `When Dee's fortune is high enough, the house itself can be enlarged: rooms go to level 3 and every room gets another working place. Fortune is cash in hand plus the standing of your three strongest friendships, so paying the builders lowers it. Expect a fall the day you build.` },
    { id: 'tip-house-counterfactual', screen: 'upgrades', title: 'This one did not happen',
      body: `The royal foundation at Mortlake is COUNTERFACTUAL. Dee asked the Crown for an endowed position for decades and never received one. The game lets you win the argument he lost, and says so on the card and in the epilogue.` },

    // --- library ----------------------------------------------------------------
    { id: 'tip-library-shelves', screen: 'library', title: 'The library at Mortlake',
      body: `While Dee is at home every book on these shelves counts. A book can open a choice that names it, and it can add to a skill while it is usable.` },
    { id: 'tip-library-satchel', screen: 'library', title: 'The travelling satchel',
      body: `When Dee leaves the house only the books in his satchel go with him. Three slots. Pocket and portable books take 1, large books take 2, fixed books cannot be moved. Drag a book into the satchel to pack it. You can only pack at home.` },
    { id: 'tip-library-full', screen: 'library', title: 'The satchel will not close',
      body: `Something has to stay on the shelf. The iron-bound travelling chest, sold at the market, adds 2 slots.` },
    { id: 'tip-library-forbidden', screen: 'library', title: 'Red border: forbidden',
      body: `Some books were dangerous to own. Buying one costs Secrecy as well as money. Amber-bordered books are controversial: safe to buy, but some people will mind.` },
    { id: 'tip-library-emigration', screen: 'library', title: 'Only the satchel crosses the Channel',
      body: `Everything left on the shelves stays at Mortlake, and so do instruments that cannot travel. You will not be coming back for them in this game. The house will be looked after by people Dee trusts.` },

    // --- market -----------------------------------------------------------------
    { id: 'tip-market-stock', screen: 'market', title: 'Paul\'s Churchyard',
      body: `When you arrive the market shows four books and two instruments. The stock changes every 20 days. Buy at the price on the card.` },
    { id: 'tip-market-sell', screen: 'market', title: 'Selling',
      body: `Books sell for half their value, or full value with a level-3 Library. A sold book stops counting for skills and for choices that name it; what Dee learned from it stays. Dee's own works are not for sale.` },
    { id: 'tip-market-prereq', screen: 'market', title: 'This book needs another first',
      body: `Some books cannot be read without a grounding in something else. The card shows the missing piece. Books in your library supply it.` },
    { id: 'tip-market-instruments', screen: 'market', title: 'Instruments',
      body: `Instruments add to skills. Some work only at home, some travel, and some cannot leave England at all. The card says which.` },

    // --- map --------------------------------------------------------------------
    { id: 'tip-map-travel', screen: 'map', title: 'Every journey costs days',
      body: `Click a place to travel there. The line between places shows the days and the cost. Dee takes the satchel and the retinue; everything else stays at home and stops counting until he is back.` },
    { id: 'tip-map-weather', screen: 'map', title: 'The weather track',
      body: `The bar along the top is the political weather. Each marker is a change coming on a fixed day: an arrival, a sermon, a reform refused. Pressure rises a little every day. Plan to be ready before the marker, not after it.` },
    { id: 'tip-map-errand', screen: 'map', title: 'Errands',
      body: `Places with a job on them show a small seal. Send someone who is at the house: they are gone for the journey both ways plus the work. On return the game rolls a d10 and adds their skill against the errand's difficulty.` },
    { id: 'tip-map-access', screen: 'map', title: 'Some doors need standing',
      body: `Richmond needs the Queen's goodwill, Windsor more of it, Barn Elms Walsingham's. A greyed place tells you which faction and how much.` },

    // --- codex ------------------------------------------------------------------
    { id: 'tip-codex-cards', screen: 'codex', title: 'Everything is a card',
      body: `Rooms, books, instruments, people, places, errands, factions, skills and weather are all cards. The Codex lets you read every one, including the ones you have not met yet.` },
    { id: 'tip-codex-status', screen: 'codex', title: 'Every card says whether it happened',
      body: `Documented: in the record. Plausible: consistent with it but not recorded. Contested: scholars disagree, and the card says how. Counterfactual: it did not happen, and the game is showing you a road not taken.` },
    { id: 'tip-codex-sources', screen: 'codex', title: 'Sources',
      body: `The small type at the foot of a card names the scholarship it rests on, with page numbers. Short forms: Parry, Harkness, Sherman, Whitby, Szőnyi, Håkansson, Clulee.` },

    // --- encounter --------------------------------------------------------------
    { id: 'tip-encounter-blue', screen: 'encounter', title: 'Blue choices',
      body: `A choice in blue is one you can take because of something you have: a book, a skill, a room, an instrument, a person, or something you did earlier. The label under it says what opened it.` },
    { id: 'tip-encounter-locked', screen: 'encounter', title: 'Grey choices show what is missing',
      body: `A locked choice tells you what it needs and what you lack. If it says a book is on the shelf at Mortlake, you own it but did not pack it.` },
    { id: 'tip-encounter-retinue', screen: 'encounter', title: 'Your retinue counts',
      body: `If someone travelling with Dee has a higher skill than he does, a choice that asks for that skill uses theirs. The label names who opened it.` },
    { id: 'tip-encounter-status', screen: 'encounter', title: 'What actually happened',
      body: `Where the record says what Dee chose, that choice is marked documented. The others are plausible or counterfactual. You can take any of them; the epilogue will say which one the record has.` },
  ],

  fortunes: [
    { id: 'destitute', label: 'Destitute',
      riseText: `Destitute. This is where the count begins.`,
      fallText: `The bills are in Jane's hand and the creditors know the road to Mortlake. Nothing that matters has been lost yet. Most of it is on loan.` },
    { id: 'straitened', label: 'Straitened',
      riseText: `Out of the worst of it. The purse holds enough for one good decision, and only one.`,
      fallText: `The money has gone into the house, the shelves or the furnace. Jane has noticed. So, by now, has the butcher.` },
    { id: 'comfortable', label: 'Comfortable',
      riseText: `Paid up and spoken well of. A man in this position can afford to be interested in things.`,
      fallText: `The builders have been paid and the purse is light. Nothing is lost that cannot be earned back; the house is simply bigger than the income.` },
    { id: 'favoured', label: 'Favoured',
      riseText: `The court has found a use for him. A man whose advice is wanted in writing is a man whose bills are paid a little sooner.`,
      fallText: `Still favoured, which is to say still useful. The favour that bought the last improvement has been spent on it.` },
    { id: 'endowed', label: 'Endowed',
      riseText: `For the moment, Dee has what he always asked for: enough. The question is what he builds with it before it goes.`,
      fallText: `Endowed, still. Nobody falls into this.` },
  ],

  houseTiers: [
    { tierId: 'mortlake_2',
      upgradeText: `Mortlake enlarged. The adjoining rooms and outbuildings are taken in. Every room can now be built to its third level, and each holds one more worker. It is the building programme of a man who expects the reward to come. Status: plausible.` },
    { tierId: 'mortlake_3',
      upgradeText: `A royal foundation at Mortlake. COUNTERFACTUAL: this did not happen. The petitions are in the record; the grant is not. In this career the Crown pays for the library, the laboratories and the instruments, two more places are made in every room, and £12 arrives every ten days. For once Dee is an institution rather than a petitioner.` },
    { tierId: 'hajek_2',
      upgradeText: `A house near the Old Town market. On 12 January 1585 Dee moved out of Hájek's house to another near the marketplace in Old Prague (Whitby 31–33). Rooms can now be built to their third level, and each holds one more worker. The household has a door of its own again.` },
  ],

  interfaceHelp: {
    'hud-money': `Money, in pounds. Spent on books, instruments, building and errands. A quarter of it, up to £200, counts towards fortune.`,
    'hud-days': `Days left in this sector. Travel, building, errands and long work all spend days. In England the Continental Question comes on day 150; the Road East runs 120 days; in Prague the nuncio's summons comes on day 95.`,
    'hud-secrecy': `Secrecy: how much of the household's business stays inside the house. Forbidden books and the actions with spirits spend it. Low Secrecy draws attention. At 0 Dee is summoned for examination and the career ends.`,
    'hud-focus': `Focus: Dee's working energy. Long research and scrying spend it. The Study restores 1, 2 or 3 a day while he is at home.`,
    'hud-pressure': `Political pressure. It rises a little every day, and each change in the political weather pushes it further. Watch the weather track on the map.`,
    'hud-fortune': `Fortune: a quarter of your money (up to £200), an eighth of your three best faction standings, and something for rewards you have been promised. Ranks: Destitute, Straitened, Comfortable, Favoured, Endowed. Enlarging the house needs a rank.`,
    'nav-household': `The household: the plan of the house, its rooms and who is working in them.`,
    'nav-upgrades': `Upgrades: build rooms to higher levels, and enlarge the house when fortune allows.`,
    'nav-library': `The library: every book Dee owns, and the travelling satchel. Pack here, at home.`,
    'nav-map': `The map: travel, errands and the political weather track.`,
    'nav-market': `The market: buy and sell books and instruments. Only open when Dee is in a market town.`,
    'nav-codex': `The Codex: every card in the game, with its status and its sources.`,
    'room-card': `A room. Its level, its key skills, who is posted there, and what the next level costs and gives.`,
    'room-pips': `The room's level, 0 to 3. Level 2 gives +1 to the room's key skills at home; level 3 gives +2.`,
    'room-station': `A working place in the room. A person posted here with 4 or more in one of the room's key skills mans it: +1 more for Dee at home.`,
    'crew-token': `A member of the household. Click them, then click a room to post them there, or choose Retinue to take them on the road. The badge shows where they are.`,
    'crew-retinue': `The retinue travels with Dee. When an encounter away from home asks for a skill, the best of Dee's and his retinue's counts. At home, everyone in the house counts.`,
    'satchel-slots': `The travelling satchel. Away from home, only these books count. Pocket and portable books take 1 slot, large books 2. The travelling chest adds 2 slots.`,
    'market-book-card': `A book for sale: its price, its size, what it needs, what it gives, and whether it is forbidden. Forbidden books cost Secrecy as well as money.`,
    'market-instrument-card': `An instrument for sale. It adds to a skill. The card says whether it works only at home and whether it can travel if the household leaves England.`,
    'market-sell': `Sell a book for half its value, or its full value with a level-3 Library. It stops counting; what Dee learned from it stays. Dee's own works are not for sale.`,
    'map-node': `A place. The line from where Dee stands shows the days and the cost of getting there. Greyed places need standing with a faction.`,
    'map-weather-track': `The political weather. Each marker is an event on a fixed day. When the line reaches it, it happens.`,
    'map-errand': `An errand. Send someone from the house: they travel there and back and do the work, then roll a d10 plus their skill against the difficulty.`,
    'encounter-blue-option': `A blue choice, opened by something you have: a book, a skill, a room, an instrument, a person, or an earlier decision. The label says which.`,
    'encounter-locked': `A locked choice. It shows what it needs and what you are missing, including books you own but left at home.`,
    'codex-filter': `Filter the cards by kind (room, book, instrument, crew, place, errand, faction, skill, weather) or by status (documented, plausible, contested, counterfactual).`,
    'house-tier-panel': `The house itself. The next tier shows its fortune rank, its price, its days, and what it changes: the room ceiling, extra working places, and for the royal foundation a stipend.`,
  },
};
