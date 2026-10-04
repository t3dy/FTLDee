import type { Encounter } from '../../core/types.js';

// Dee's alchemy, literary and practical. Research: research/alchemy/.

export const ALCHEMY_ENCOUNTERS: Encounter[] = [
  {
    id: 'norton_bosome_book', title: 'Ripley\'s Bosome Book', locationId: 'london',
    historicalStatus: 'documented', sources: ['Rampling, EF 259–263', 'Rampling, SHPS 2012, 505'],
    description: 'A young Somerset gentleman, Samuel Norton, has found what he calls "the secret bosome booke of Riple" and dedicated a Key to it to the Queen. Dee\'s friends have sheets of it. (The find is documented; that Dee had a copy is Rampling\'s inference.)',
    participants: [], repeatable: false,
    triggerConditions: { minDay: 30 },
    choices: [
      {
        id: 'bosome_buy', text: 'Pay to have a copy made.',
        requirements: { minMoney: 15 }, costs: { money: 15 },
        outcome: { description: 'A clean copy arrives. You can read it, roughly.', booksGained: ['ripley_bosome_book'] },
      },
      {
        id: 'bosome_copy', text: 'Copy it yourself from your friends\' sheets.',
        requirements: { skills: { languages: 4, manuscriptKnowledge: 7 } }, costs: { focus: 15, time: 5 },
        outcome: { description: 'Every word through your own pen. You know this book now.', booksGained: ['ripley_bosome_book'], focusChange: 5 },
        isBlueOption: true, blueLabel: 'Languages 4 + Manuscript Knowledge 7',
      },
      {
        id: 'bosome_collate', text: 'Collate it against your Compound and your Accurtations: a book opens a book.',
        requirements: { books: ['ripley_compound', 'ripley_accurtations'] }, costs: { time: 6, focus: 10 },
        outcome: { description: 'Under "Liber librum apperit" the three texts explain one another. You read the sericon passages as few men in England can.',
          booksGained: ['ripley_bosome_book'], flagsSet: ['ripley_cross_reference'], reputation: { scholarNetwork: 3 } },
        isBlueOption: true, blueLabel: 'Ripley\'s Compound + Accurtations',
      },
      { id: 'bosome_ignore', text: 'Let Norton take it to the Queen.', outcome: { description: 'Someone else owns the Ripley of the moment.', reputation: { elizabeth: -1 } } },
    ],
  },
  {
    id: 'philorcium_warning', title: 'Quick Mercury', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Rampling, SHPS 2012, 500', 'Clulee, Ambix 52.3, 212–213'],
    description: 'At the furnace: a sublimate yields a slimy quick mercury. How much water do you add? In 1581 Dee recorded his weights and times in a notebook.',
    participants: [], repeatable: true,
    choices: [
      {
        id: 'mercury_flood', text: 'Flood it to hurry the work.', costs: { time: 2 },
        outcome: { description: 'Half the batch is lost.', focusChange: -5 },
      },
      {
        id: 'mercury_ripley', text: 'Dissolve it by little and little, as Ripley warns in the Philorcium.',
        requirements: { books: ['ripley_philorcium'], rooms: { laboratory: 1 } }, costs: { time: 3, focus: 5 },
        outcome: { description: 'The work holds. Word of a careful practitioner gets about.', reputation: { scholarNetwork: 2, continentalCourts: 1 } },
        isBlueOption: true, blueLabel: 'Philorcium + Laboratory 1', scalingSkill: 'alchemy',
      },
      {
        id: 'mercury_weigh', text: 'Weigh each addition and log it.',
        requirements: { skills: { mathematics: 4 }, rooms: { laboratory: 1 } }, costs: { time: 4 },
        outcome: { description: 'Slow and exact. The notebook grows; so does your judgement.', focusChange: 5 },
        isBlueOption: true, blueLabel: 'Mathematics 4 + Laboratory 1',
      },
    ],
  },
  {
    id: 'kelley_red_powder', title: 'The Book and the Powder', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Whitby 43–45', 'Fenton 61 n.9 (printed)', 'Rampling, EF 290', 'Parry 173–174'],
    description: 'March 1583. Kelley comes back from Blockley with a book, a scroll in cipher and a phial of red powder, and says a spirit led him to them. The book will be called the Book of Dunstan. (What the book was is contested: a forgery, an older tract, or Ripley reworked.)',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['kelley_employed'], minDay: 90 },
    choices: [
      {
        id: 'powder_accept', text: 'Accept them, and the story. (What Dee did.)',
        outcome: { description: 'The book goes on the shelf and the powder into a locked box. Kelley is pleased with you.',
          booksGained: ['book_of_dunstan'], instrumentsGained: ['red_powder'], secrecyChange: -5 },
      },
      {
        id: 'powder_compare', text: 'Compare the "Dunstan" text with your own Accurtations. [COUNTERFACTUAL]',
        requirements: { books: ['ripley_accurtations'], skills: { manuscriptKnowledge: 7 } },
        outcome: { description: 'COUNTERFACTUAL for Dee to notice; the resemblance is Rampling\'s finding. The two texts match too well. Kelley says the spirit must have known Ripley.',
          booksGained: ['book_of_dunstan'], instrumentsGained: ['red_powder'], flagsSet: ['dunstan_is_ripley'] },
        isBlueOption: true, blueLabel: 'Accurtations + Manuscript Knowledge 7',
      },
      {
        id: 'powder_ask', text: 'Ask the angels what the powder is.',
        requirements: { rooms: { scryingChamber: 1 } },
        outcome: { description: 'No practical answer. You keep the powder and your doubts.', instrumentsGained: ['red_powder'] },
      },
    ],
  },
  {
    id: 'gardner_arrives', title: 'Robert Gardner of Shrewsbury', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Clulee, Ambix 52.3, 199–201'],
    description: 'With Roger Cooke gone, Robert Gardner of Shrewsbury comes to the house. He brings, he says, a secret of the stone revealed to him by divine means.',
    participants: [], repeatable: false,
    triggerConditions: { flags: ['roger_gone'], minDay: 75 },
    choices: [
      {
        id: 'gardner_take', text: 'Take him on at the furnace.',
        outcome: { description: 'A new pair of hands in the laboratory, and a head full of revelations that cost time to test.', crewJoins: ['robert_gardner'] },
      },
      { id: 'gardner_no', text: 'Hear his secret and send him home.', outcome: { description: 'The secret, tested, is nothing.', focusChange: -5 } },
    ],
  },
];
