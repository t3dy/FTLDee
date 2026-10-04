import type { Encounter } from '../../core/types.js';

// Prague sector, 1584–86. Dates and sources checked against dee_chunks.sqlite.

export const PRAGUE_ENCOUNTERS: Encounter[] = [
  {
    id: 'prague_arrival', title: 'Lodgings in Hájek\'s House', locationId: 'hajek_house',
    historicalStatus: 'documented', sources: ['Whitby 29–31', 'Szőnyi 259', 'Sherman 81–85'],
    description: 'August 1584. After Kraków, Prague; Jane and the children will follow from Kraków at the end of the year. Tadeáš Hájek, a physician and astronomer Dee has corresponded with, gives the household rooms. His study is where Dee and Kelley will do their alchemical work.\n\nWhat you packed is all you have. The Emperor has to be approached in writing first.',
    participants: ['hajek'], repeatable: false,
    choices: [
      {
        id: 'arrival_letter', text: 'Write to the Emperor asking for an audience.',
        costs: { time: 2 },
        outcome: { description: 'The letter goes up to the castle. Dee wrote his on 17 August.', flagsSet: ['wrote_to_emperor'], reputation: { continentalCourts: 2 } },
      },
      {
        id: 'arrival_monas', text: 'Write to the Emperor and enclose the Monas, dedicated twenty years ago to his father Maximilian.',
        requirements: { books: ['dee_monas'] },
        costs: { time: 2 },
        outcome: { description: 'The book reminds the court who you were before you were the Englishman with the angels.',
          flagsSet: ['wrote_to_emperor', 'monas_sent'], reputation: { continentalCourts: 5 } },
        isBlueOption: true, blueLabel: 'Monas Hieroglyphica packed',
      },
      {
        id: 'arrival_study', text: 'Write to the Emperor, then set to work in Hájek\'s study.',
        requirements: { skills: { alchemy: 6 } },
        costs: { time: 5, focus: 10 },
        outcome: { description: 'Hájek\'s furnace is lit. Word that the Englishmen work at the fire reaches the castle before your letter is answered.',
          flagsSet: ['wrote_to_emperor', 'hajek_alchemy'], reputation: { continentalCourts: 4, scholarNetwork: 4 } },
        isBlueOption: true, blueLabel: 'Alchemy 6', scalingSkill: 'alchemy',
      },
    ],
  },
  {
    id: 'charles_bridge_crossing', title: 'Over the Bridge', locationId: 'charles_bridge',
    historicalStatus: 'plausible', sources: ['Parry 181–183'],
    description: 'The way to the castle runs through the Old Town, past manure and open drains, and over the stone bridge. The booming city has its gangs.',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'bridge_escort', text: 'Hire a man to walk with you.',
        costs: { money: 2 },
        outcome: { description: 'You cross without trouble and arrive with clean shoes.' },
      },
      {
        id: 'bridge_alone', text: 'Cross alone.',
        outcome: { description: 'A crowd presses at the far end. When it clears your purse is lighter.', money: -6 },
      },
      {
        id: 'bridge_retinue', text: 'Cross with the household men around you.',
        requirements: { crew: ['edward_kelley'] },
        outcome: { description: 'No one troubles a party of four.', flagsSet: ['bridge_safe'] },
        isBlueOption: true, blueLabel: 'Kelley in the household',
      },
    ],
  },
  {
    id: 'rudolf_audience', title: 'Audience at the Hradschin', locationId: 'hradschin',
    historicalStatus: 'documented', sources: ['Harkness 53–55', 'Whitby 29–31', 'Parry 181–183'],
    description: '3 September 1584. The Emperor\'s letter grants an audience. Rudolf is interested in alchemy, prophecy and occult philosophy; he is also sceptical, busy and surrounded by people who want things from him.\n\nHistorically Dee gave a full account of himself, rebuked the Emperor for his sins and told him the angels had commanded that the actions be shown to him. Rudolf said the time was not convenient.',
    participants: ['rudolf_ii'], repeatable: false,
    choices: [
      {
        id: 'audience_rebuke', text: 'Deliver the angels\' message: repent, believe, and triumph. (What Dee did.)',
        outcome: { description: 'Rudolf hears you out and says he will read the records at a more convenient time. A Dr Curtius will handle your papers.',
          reputation: { continentalCourts: 3, religiousAuth: -5 }, secrecyChange: -10, flagsSet: ['rudolf_audience_done', 'rudolf_rebuked'] },
      },
      {
        id: 'audience_monas', text: 'Speak as the author of the Monas, dedicated to his father.',
        requirements: { books: ['dee_monas'], skills: { kabbalah: 6 } },
        outcome: { description: 'The Emperor turns the pages and asks good questions. You leave without promising anything you cannot do.',
          reputation: { continentalCourts: 10 }, flagsSet: ['rudolf_audience_done', 'monas_presented'] },
        isBlueOption: true, blueLabel: 'Monas packed + Kabbalah 6', scalingSkill: 'kabbalah',
      },
      {
        id: 'audience_alchemy', text: 'Offer a demonstration at the fire.',
        requirements: { skills: { alchemy: 7 } },
        outcome: { description: 'The Emperor is interested at once. Interest from Rudolf is a debt: he will expect the demonstration.',
          reputation: { continentalCourts: 12 }, money: 20, flagsSet: ['rudolf_audience_done', 'alchemy_promised'] },
        isBlueOption: true, blueLabel: 'Alchemy 7 (Kelley in the retinue counts)', scalingSkill: 'alchemy',
      },
      {
        id: 'audience_stars', text: 'Offer astronomical service, citing Hájek\'s work on the new star.',
        requirements: { books: ['hajek_dialexis'], skills: { astronomy: 8 } },
        outcome: { description: 'A sober conversation about the star of 1572. The court astronomers note you as one of themselves.',
          reputation: { continentalCourts: 8, scholarNetwork: 5 }, flagsSet: ['rudolf_audience_done'] },
        isBlueOption: true, blueLabel: 'Hájek\'s Dialexis packed + Astronomy 8',
      },
    ],
  },
  {
    id: 'kunstkammer_gift', title: 'The Emperor\'s Curiosities', locationId: 'kunstkammer',
    historicalStatus: 'plausible', sources: ['Parry 202–205'],
    description: 'Rudolf collects without limit. Later Kelley bought his way back into favour with an optical device that made far things seem near, passed to the Emperor through Rožmberk. A gift for the collection is a key to the presence chamber.',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'gift_staff', text: 'Give the Frisius ring and staff.',
        requirements: { instruments: ['frisius_staff'] },
        outcome: { description: 'The brass goes into a cabinet of instruments. The keeper writes your name in his book.',
          instrumentsLost: ['frisius_staff'], reputation: { continentalCourts: 12 }, flagsSet: ['gift_given'] },
        isBlueOption: true, blueLabel: 'Frisius ring and staff',
      },
      {
        id: 'gift_book', text: 'Give a book from the chest.',
        requirements: { books: ['ortelius_theatrum'] },
        outcome: { description: 'The atlas joins the collection.', booksLost: ['ortelius_theatrum'], reputation: { continentalCourts: 8 }, flagsSet: ['gift_given'] },
        isBlueOption: true, blueLabel: 'Ortelius packed',
      },
      {
        id: 'gift_look', text: 'Look, and learn who keeps the keys.',
        requirements: { skills: { courtlyIntelligence: 5 } },
        outcome: { description: 'You learn the names that matter.', contactsGained: ['kunstkammer_keeper'], reputation: { continentalCourts: 2 } },
      },
    ],
  },
  {
    id: 'pucci_joins', title: 'Francesco Pucci', locationId: 'old_town',
    historicalStatus: 'documented', sources: ['Harkness 57–59', 'Whitby 31–33'],
    description: 'August 1585. Francesco Pucci, a wandering theologian who had lived in England and left the Roman church, asks to attend the actions. He is close to the nuncio\'s people.',
    participants: ['pucci', 'edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['kelley_employed'], minDay: 45 },
    choices: [
      {
        id: 'pucci_admit', text: 'Admit him to the actions.',
        outcome: { description: 'Pucci attends from 6 August. An angelic message later sends him back into the Catholic Church.',
          secrecyChange: -10, reputation: { religiousAuth: -5 }, flagsSet: ['pucci_actions'] },
      },
      {
        id: 'pucci_refuse', text: 'Keep him out. [Contrary to the record]',
        outcome: { description: 'Pucci is offended and talks.', reputation: { religiousAuth: -3 }, flagsSet: ['pucci_refused'] },
      },
    ],
  },
  {
    id: 'books_burned', title: 'Into the Furnace', locationId: 'hajek_house',
    historicalStatus: 'documented', sources: ['Harkness 184–186'],
    description: 'April 1586, two weeks after the nuncio. The angels command that the books of the actions be thrown into a furnace. Dee later claimed that everything was restored to him except the conversations with Pucci.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['kelley_employed', 'nuncio_met'] },
    choices: [
      {
        id: 'burn_obey', text: 'Obey.',
        outcome: { description: 'The records go into the fire. Whatever the nuncio\'s people hoped to find, it is ash.',
          booksLost: ['dee_mysteriorum'], secrecyChange: 15, focusChange: -20, flagsSet: ['books_burned'] },
      },
      {
        id: 'burn_refuse', text: 'Refuse, and hide the books. [Contrary to the record]',
        outcome: { description: 'Kelley says the angels are displeased. The books stay, and so does the evidence.',
          secrecyChange: -10, flagsSet: ['refused_burning'] },
      },
    ],
  },
  {
    id: 'nuncio_audience', title: 'Before the Nuncio', locationId: 'nuncio',
    historicalStatus: 'documented', sources: ['Harkness 55–59'],
    description: '27 March 1586. Malaspina deplores the spread of heresy and explains that private revelations from good angels are private, not public. He asks for help against the evils of the time. The Englishmen are being told to keep their angels to themselves, or to bring them to Rome.',
    participants: ['malaspina', 'edward_kelley'], repeatable: false,
    choices: [
      {
        id: 'nuncio_both', text: 'Demur, saying it is not your place to advise without express direction from God, while Kelley promises a great reformation if the angels are heeded. (Both happened at this audience.)',
        requirements: { crew: ['edward_kelley'] },
        outcome: { description: 'You speak carefully; Kelley does not. The papal side writes down his promise. Within weeks you are no longer welcome in Prague.',
          reputation: { religiousAuth: -12, continentalCourts: -5 }, secrecyChange: -12, flagsSet: ['prague_closed', 'nuncio_met', 'heresy_suspected'] },
      },
      {
        id: 'nuncio_demur', text: 'Demur, and keep Kelley silent. [Contrary to the record]',
        requirements: { skills: { courtlyIntelligence: 6 } },
        outcome: { description: 'You leave unharmed and unprotected. Prague will still close, but no one has written down a heresy.',
          reputation: { continentalCourts: -5 }, secrecyChange: -5, flagsSet: ['prague_closed', 'nuncio_met'] },
        isBlueOption: true, blueLabel: 'Courtly Intelligence 6',
      },
      {
        id: 'nuncio_protection', text: 'Answer through Curtius and claim the Emperor\'s protection. [COUNTERFACTUAL]',
        requirements: { flags: ['curtius_intermediary'], minFaction: { continentalCourts: 60 } },
        outcome: { description: 'COUNTERFACTUAL. In this run Rudolf shields his Englishman, for a while. Prague stays open until the sector ends.',
          reputation: { continentalCourts: 5, religiousAuth: -10 }, flagsSet: ['imperial_protection', 'nuncio_met'] },
        isBlueOption: true, blueLabel: 'Curtius as intermediary + Continental 60',
      },
    ],
  },
  {
    id: 'trebon_departure', title: 'South to Rožmberk', locationId: 'trebon_road',
    historicalStatus: 'documented', sources: ['biography_timeline (Třeboň 1586–89)', 'Whitby 31–33'],
    description: 'Prague is closed. Vilém Rožmberk offers the household a place on his Bohemian estates, where the work, and the strain between Dee and Kelley, will continue until 1589.',
    participants: ['edward_kelley', 'jane_dee'], repeatable: false,
    choices: [
      {
        id: 'trebon_go', text: 'Go to Třeboň.',
        outcome: { description: 'The household moves south. This is where the run ends; the Třeboň years are a later sector.', flagsSet: ['went_to_trebon'], endCareer: true },
      },
      {
        id: 'trebon_erfurt', text: 'Withdraw to Erfurt and wait for a recall.',
        outcome: { description: 'The household waits in Germany for a recall that comes, in its fashion, through Rožmberk.', flagsSet: ['went_to_erfurt'], endCareer: true },
      },
    ],
  },
];
