import type { Encounter } from '../../core/types.js';

// England sector events, 1581–83. Real people get reported speech only.

export const ENGLAND_EVENTS: Encounter[] = [
  {
    id: 'saul_first_scryer', title: 'Barnabas Saul in the Hall', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Whitby 16–19, 27–29'],
    description: 'Barnabas Saul, lodging in the household, was troubled in the hall about midnight by what he took for a spiritual creature. Dee has already had sight offered in a crystal. Saul says he can see what appears in the stone.\n\nA scryer would let the work move from books to actions. It would also put a stranger at the centre of the most dangerous thing in the house.',
    participants: ['barnabas_saul', 'jane_dee'], repeatable: false,
    triggerConditions: { minDay: 20 },
    choices: [
      {
        id: 'saul_take_in', text: 'Take Saul on and let him try a crystal.',
        costs: { money: 8, time: 2 },
        outcome: {
          description: 'Saul joins the household. A crystal is bought and set on a table in the study. He reports what he sees; you write it down.',
          crewJoins: ['barnabas_saul'], instrumentsGained: ['show_stone'],
          flagsSet: ['scrying_begun', 'saul_employed'], secrecyChange: -5,
        },
      },
      {
        id: 'saul_formal_action', text: 'Make it a proper action: prayer first, a written record of every question and answer.',
        requirements: { skills: { occultPhilosophy: 7, theology: 5 } },
        costs: { money: 8, time: 3, focus: 10 },
        outcome: {
          description: 'You begin the books that will become the Mysteriorum Libri. Saul scries; you question and record. The action of 22 December 1581 is one of the last with him.',
          crewJoins: ['barnabas_saul'], instrumentsGained: ['show_stone'], booksGained: ['dee_mysteriorum'],
          flagsSet: ['scrying_begun', 'saul_employed', 'actions_recorded'], secrecyChange: -8,
        },
        isBlueOption: true, blueLabel: 'Occult Philosophy 7 + Theology 5',
      },
      {
        id: 'saul_send_away', text: 'Send him off. The house has enough rumours.',
        outcome: { description: 'Saul leaves. The rumours go with him, for now.', secrecyChange: 5, flagsSet: ['saul_dismissed'] },
      },
    ],
  },
  {
    id: 'saul_confesses', title: 'Saul Sees Nothing', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Whitby 16–19, 27–29'],
    description: 'In March 1582 Saul tells Dee that he no longer sees or hears any spiritual creature. Later Dee will rebuke him for his many untrue reports.',
    participants: ['barnabas_saul'], repeatable: false,
    triggerConditions: { flags: ['saul_employed'], minDay: 40 },
    choices: [
      {
        id: 'saul_dismiss', text: 'Dismiss him.',
        outcome: { description: 'Saul goes. The stone sits on its table, waiting for someone who can see.', crewLeaves: ['barnabas_saul'], flagsSet: ['saul_gone'] },
      },
      {
        id: 'saul_keep_copying', text: 'Keep him on as a copyist and servant, not a scryer.',
        requirements: { rooms: { scriptorium: 1 } },
        outcome: { description: 'Saul stays in the scriptorium. He is no use at the stone, and he knows things about the house.', flagsSet: ['saul_copyist'], secrecyChange: -5 },
        isBlueOption: true, blueLabel: 'Scriptorium 1',
      },
    ],
  },
  {
    id: 'kelley_arrives', title: 'A Scryer Calling Himself Talbot', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Whitby 16–19', 'Harkness'],
    description: 'In March 1582 a young man arrives at Mortlake under the name Talbot and offers to show something in the stone. He will be known as Edward Kelley. The sessions with him will run for seven years and take the household to Prague.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['scrying_begun'], minDay: 45 },
    choices: [
      {
        id: 'kelley_employ', text: 'Employ him as your scryer.',
        outcome: { description: 'Kelley joins the household. The first sessions are more fluent than anything Saul produced.',
          crewJoins: ['edward_kelley'], flagsSet: ['kelley_employed'], secrecyChange: -5 },
      },
      {
        id: 'kelley_test', text: 'Test him first: ask after him, set questions whose answers you already know.',
        requirements: { skills: { courtlyIntelligence: 6 } },
        costs: { time: 4 },
        outcome: { description: 'His answers are good enough and his past is murky enough. You take him on knowing more than he would like.',
          crewJoins: ['edward_kelley'], flagsSet: ['kelley_employed', 'kelley_tested'], secrecyChange: -3 },
        isBlueOption: true, blueLabel: 'Courtly Intelligence 6',
      },
      {
        id: 'kelley_refuse', text: 'Turn him away. [Contrary to the record]',
        outcome: { description: 'Talbot leaves. In this run the angelic actions will have to wait for another scryer, or never come.', flagsSet: ['kelley_refused'] },
      },
    ],
  },
  {
    id: 'sigillum_dictated', title: 'The Seal of God\'s Truth', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Whitby 120–124, 130–132'],
    description: 'Through Kelley the angels dictate a great seal, the Sigillum Dei Aemeth, with the names of seven angels at its centre, to be made in wax and set beneath the show-stone. The angel Michael also asks for a ring bearing the name PELE.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['kelley_employed'], rooms: { scryingChamber: 1 }, minDay: 55 },
    choices: [
      {
        id: 'sigillum_make', text: 'Draw the seal and have it made in wax.',
        requirements: { skills: { kabbalah: 6 } },
        costs: { money: 8, time: 6, focus: 10 },
        outcome: { description: 'The Sigillum is finished. The Scrying Chamber can now be raised to level 2.',
          instrumentsGained: ['sigillum_dei'], flagsSet: ['sigillum_made'] },
      },
      {
        id: 'sigillum_and_ring', text: 'Make the seal and the ring of PELE together.',
        requirements: { skills: { kabbalah: 6, alchemy: 5 } },
        costs: { money: 16, time: 8, focus: 15 },
        outcome: { description: 'Seal and ring are finished. The ring goes with you wherever you go.',
          instrumentsGained: ['sigillum_dei', 'ring_pele'], flagsSet: ['sigillum_made'] },
        isBlueOption: true, blueLabel: 'Kabbalah 6 + Alchemy 5',
      },
      {
        id: 'sigillum_defer', text: 'Record the design and defer the expense.',
        outcome: { description: 'The design is in the book. The money stays in the purse.', flagsSet: ['sigillum_deferred'] },
      },
    ],
  },
  {
    id: 'holy_table', title: 'The Table of Practice', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Whitby 120–124'],
    description: 'The angels describe a table to carry the Sigillum, with smaller seals under its four feet, and the show-stone at the centre.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['sigillum_made'], minDay: 70 },
    choices: [
      {
        id: 'table_build', text: 'Have the table made to the angels\' specification.',
        costs: { money: 12, time: 8 },
        outcome: { description: 'The Holy Table stands in the chamber. The apparatus is complete; the Scrying Chamber can be raised to level 3.',
          instrumentsGained: ['holy_table'], flagsSet: ['holy_table_made'], secrecyChange: -5 },
      },
      {
        id: 'table_wait', text: 'Not yet. The furnace bills are due.',
        outcome: { description: 'The specification goes into the book.' },
      },
    ],
  },
  {
    id: 'soyga_question', title: 'The Tables of Soyga', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['OTTOMAN_CONNECTION.md (Melvin-Koushki 2021)', 'Harkness'],
    description: 'Dee has never been able to read the great letter tables of his Book of Soyga. Now he has a scryer, and he can ask.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['kelley_employed'], minDay: 60 },
    choices: [
      {
        id: 'soyga_ask', text: 'Ask the angels about the book and its tables.',
        requirements: { books: ['book_soyga'], skills: { kabbalah: 6 } },
        costs: { focus: 10, time: 2 },
        outcome: { description: 'The answer praises the book and does not decode it. The tables stay closed, and the question stays open.',
          ottomanSignal: true, flagsSet: ['soyga_asked'] },
        isBlueOption: true, blueLabel: 'Book of Soyga + Kabbalah 6',
      },
      {
        id: 'soyga_lettrist', text: 'Read the tables as letter-science of the kind practised at the Ottoman court. [COUNTERFACTUAL]',
        requirements: { books: ['book_soyga'], skills: { kabbalah: 7, languages: 8 } },
        costs: { focus: 20, time: 6 },
        outcome: { description: 'COUNTERFACTUAL. Melvin-Koushki argues the book\'s lore comes from the Bunian-Bistamian corpus read at the Ottoman court. In this run Dee sees the resemblance himself.',
          ottomanSignal: true, flagsSet: ['soyga_asked', 'soyga_lettrist'], reputation: { continentalCourts: 3 } },
        isBlueOption: true, blueLabel: 'Book of Soyga + Kabbalah 7 + Languages 8',
      },
      {
        id: 'soyga_leave', text: 'Leave the book on the shelf.',
        outcome: { description: 'The tables keep their secret.' },
      },
    ],
  },
  {
    id: 'laski_at_mortlake', title: 'Łaski at Mortlake', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Parry 174–176', 'Whitby 29–31'],
    description: 'Albert Łaski, lavishly entertained at court, comes to see Dee. He is in debt at home and hopeful of what learning, or angels, might do for him.',
    participants: ['laski'], repeatable: false,
    triggerConditions: { flags: ['laski_arrival'] },
    choices: [
      {
        id: 'laski_library', text: 'Show him the library and the instruments.',
        requirements: { rooms: { library: 2 } },
        outcome: { description: 'Łaski is impressed by the library, the largest he has seen in private hands.',
          reputation: { continentalCourts: 8 }, flagsSet: ['laski_contact'] },
        isBlueOption: true, blueLabel: 'Library 2',
      },
      {
        id: 'laski_action', text: 'Hold an action for him at the stone.',
        requirements: { crew: ['edward_kelley'], rooms: { scryingChamber: 1 } },
        outcome: { description: 'The angels favour Łaski. He leaves convinced, and so, for now, is Dee.',
          reputation: { continentalCourts: 12, walsingham: -3 }, secrecyChange: -10, flagsSet: ['laski_contact', 'laski_actions'] },
        isBlueOption: true, blueLabel: 'Kelley in the household + Scrying Chamber 1',
      },
      {
        id: 'laski_polite', text: 'Receive him courteously and report the visit to Walsingham.',
        outcome: { description: 'A pleasant dinner. A careful letter to Barn Elms.',
          reputation: { walsingham: 3, continentalCourts: 2 }, flagsSet: ['laski_contact', 'reported_laski'] },
      },
    ],
  },
  {
    id: 'oxford_libraries', title: 'The College Chests', locationId: 'oxford',
    historicalStatus: 'plausible', sources: ['Parry 37–40', 'Håkansson 12–14'],
    description: 'In 1556 Dee petitioned Queen Mary to recover the ancient writers scattered by the Dissolution. Some of what survived sits in college chests at Oxford.',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'oxford_search', text: 'Search the chests yourself.',
        requirements: { skills: { manuscriptKnowledge: 8 } },
        costs: { time: 4 },
        outcome: { description: 'Under a run of sermons, a Roger Bacon.', booksGained: ['bacon_epistola'], reputation: { scholarNetwork: 3 } },
        isBlueOption: true, blueLabel: 'Manuscript Knowledge 8', scalingSkill: 'manuscriptKnowledge',
      },
      {
        id: 'oxford_dispute', text: 'Dine with the mathematicians and dispute.',
        costs: { time: 2 },
        outcome: { description: 'A good evening and a few new correspondents.', reputation: { scholarNetwork: 4 }, contactsGained: ['oxford_scholar'] },
      },
    ],
  },
  {
    id: 'deptford_navigators', title: 'Pilots at Deptford', locationId: 'deptford',
    historicalStatus: 'plausible', sources: ['DEE_MASTER_BIOGRAPHY Act IV'],
    description: 'Masters and pilots fitting out for the northern voyages want to know what the mathematician thinks of the passage.',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'deptford_advise', text: 'Lay out the case from the General and Rare Memorials, with tables.',
        requirements: { books: ['dee_general_rare'], skills: { navigation: 7 } },
        outcome: { description: 'The pilots take your tables. The investors take your name.',
          reputation: { merchantNetwork: 6, leicester: 3 }, money: 10, flagsSet: ['navigation_contacts'] },
        isBlueOption: true, blueLabel: 'General and Rare Memorials in the satchel + Navigation 7', scalingSkill: 'navigation',
      },
      {
        id: 'deptford_listen', text: 'Listen to the pilots.',
        outcome: { description: 'You learn more than you teach.', reputation: { merchantNetwork: 2 } },
      },
    ],
  },
];
