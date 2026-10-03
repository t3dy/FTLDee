import type { Encounter } from '../../core/types.js';

// More England encounters: the Soyga manuscript, Roger Cooke's departure,
// the Queen's malady, the Frobisher ore, the Muscovy Company, the press.

export const ENGLAND_MORE: Encounter[] = [
  {
    id: 'soyga_acquired', title: 'Aldaraia, sive Soyga', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Harkness 58–60 (on Dee\'s shelf by January 1582)', 'OTTOMAN_CONNECTION.md (M-K 2021)'],
    description: 'A manuscript of magic letter tables, the Book of Soyga, is on the shelf. How Dee came by it is not recorded. Its great tables of letters will not yield to him.',
    participants: [], repeatable: false,
    triggerConditions: { minDay: 25 },
    choices: [
      {
        id: 'soyga_study', text: 'Work at the tables.',
        requirements: { skills: { kabbalah: 5 } },
        costs: { time: 6, focus: 15 },
        outcome: { description: 'Days of rows and columns. You cannot read them, but you begin to see they are built, not random.',
          booksGained: ['book_soyga'], ottomanSignal: true, flagsSet: ['soyga_studied'] },
        isBlueOption: true, blueLabel: 'Kabbalah 5',
      },
      {
        id: 'soyga_shelve', text: 'Shelve it with the other things you cannot yet read.',
        outcome: { description: 'The book joins the library. Its questions wait.', booksGained: ['book_soyga'] },
      },
    ],
  },
  {
    id: 'roger_departs', title: 'Roger Cooke Asks Leave', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Fenton 26–28', 'Fenton 20–21', 'Fenton 341–342'],
    description: '5 September 1581. Roger Cooke, with Dee since he was fourteen and now twenty-eight, asks licence to depart. He has tended the furnaces; Dee once revealed to him the great secret of the elixir of the salt.',
    participants: ['roger_cooke'], repeatable: false,
    triggerConditions: { minDay: 60 },
    choices: [
      {
        id: 'roger_go', text: 'Grant him leave. (What Dee did.)',
        outcome: { description: 'Roger goes. The laboratory is quieter; Robert Gardner will later take his place at the furnace.',
          crewLeaves: ['roger_cooke'], flagsSet: ['roger_gone'] },
      },
      {
        id: 'roger_stay', text: 'Offer him a share in the work and a wage to stay. [Contrary to the record]',
        requirements: { minMoney: 20, skills: { rhetoric: 7 } },
        costs: { money: 20 },
        outcome: { description: 'He stays, for now, and for money.', flagsSet: ['roger_kept'] },
        isBlueOption: true, blueLabel: '£20 + Rhetoric 7',
      },
    ],
  },
  {
    id: 'queens_malady', title: 'The Queen\'s Malady', locationId: 'hampton_court',
    historicalStatus: 'documented', sources: ['Fell Smith 33–34'],
    description: 'The Queen is in pain and no better; her physicians are at a loss. Jane has been at court. Leicester and Walsingham want someone to go abroad and consult the learned physicians there, quietly. (This replays the documented commission of October 1578.)',
    participants: ['leicester', 'walsingham', 'jane_dee'], repeatable: false,
    choices: [
      {
        id: 'malady_go', text: 'Accept the commission and go abroad.',
        costs: { time: 12, money: 4 },
        outcome: { description: 'Weeks of consultations on the Continent, letters home, and a store of new acquaintances who now know your face.',
          reputation: { elizabeth: 6, leicester: 4, walsingham: 5, continentalCourts: 8 }, contactsGained: ['continental_physician'], flagsSet: ['malady_mission'] },
      },
      {
        id: 'malady_stars', text: 'Offer a medical astrology from the house instead.',
        requirements: { skills: { astrology: 7, medicine: 4 } },
        outcome: { description: 'A careful judgement, delivered in writing. The Queen is grateful and still in pain.', reputation: { elizabeth: 3 }, money: 5 },
        isBlueOption: true, blueLabel: 'Astrology 7 + Medicine 4',
      },
      {
        id: 'malady_jane', text: 'Let Jane carry your advice to court.',
        requirements: { crew: ['jane_dee'] },
        outcome: { description: 'Jane knows the chambers and the women in them. Your advice arrives through the right door.', reputation: { elizabeth: 4 }, flagsSet: ['jane_at_court'] },
        isBlueOption: true, blueLabel: 'Jane in the retinue',
      },
    ],
  },
  {
    id: 'frobisher_ore', title: 'The Black Ore', locationId: 'muscovy_house',
    historicalStatus: 'documented', sources: ['Clulee, Ambix 52.3, 16–17'],
    description: 'Frobisher has brought back ore from the north that is thought to hold gold. Dee is named one of the commissioners to oversee its assaying. Investors have staked fortunes on the answer. (This replays the documented commission of 1577–78.)',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'ore_assay', text: 'Oversee a careful assay and report what the fire shows.',
        requirements: { skills: { alchemy: 6 } },
        costs: { time: 5 },
        outcome: { description: 'The fire is honest; the report is unwelcome. The investors will not thank you, but the assayers respect you.',
          reputation: { merchantNetwork: -4, scholarNetwork: 5, burghley: 3 }, flagsSet: ['ore_honest'] },
        isBlueOption: true, blueLabel: 'Alchemy 6 (Roger Cooke counts)', scalingSkill: 'alchemy',
      },
      {
        id: 'ore_hopeful', text: 'Report hopefully. Everyone wants it to be gold.',
        outcome: { description: 'The investors are pleased this season. When the ore proves worthless, your name is on the report.',
          reputation: { merchantNetwork: 6, leicester: 3 }, money: 10, flagsSet: ['ore_hopeful'] },
      },
      {
        id: 'ore_decline', text: 'Decline the commission.',
        outcome: { description: 'Others sign the report.', reputation: { leicester: -2 } },
      },
    ],
  },
  {
    id: 'muscovy_commission', title: 'Charts for the Company', locationId: 'muscovy_house',
    historicalStatus: 'documented', sources: ['Parry 65–68'],
    description: 'The Muscovy Company wants Dee\'s help again: the paradoxal compass, tables for high latitudes, instructions for pilots.',
    participants: [], repeatable: true,
    choices: [
      {
        id: 'muscovy_tables', text: 'Draw up tables and instructions for the pilots.',
        requirements: { skills: { navigation: 6, mathematics: 7 } },
        costs: { time: 5, focus: 10 },
        outcome: { description: 'The Company pays and remembers.', money: 12, reputation: { merchantNetwork: 4 } },
        isBlueOption: true, blueLabel: 'Navigation 6 + Mathematics 7', scalingSkill: 'navigation',
      },
      {
        id: 'muscovy_invest', text: 'Put money into the next voyage.',
        requirements: { minMoney: 20 },
        costs: { money: 20 },
        outcome: { description: 'A share in a voyage. It may pay; it may sink. [Returns arrive as merchant standing now.]', reputation: { merchantNetwork: 8, leicester: 2 } },
      },
      { id: 'muscovy_talk', text: 'Talk with the masters.', outcome: { description: 'Gossip about ice, Russians and Spanish ships.', reputation: { merchantNetwork: 1 } } },
    ],
  },
  {
    id: 'print_a_work', title: 'Through the Press', locationId: 'aldersgate',
    historicalStatus: 'plausible', sources: ['Sherman (Dee and print)'],
    description: 'A printer will put a work through the press for a fee. Print reaches readers a petition never will; it also reaches readers you would rather it did not.',
    participants: [], repeatable: true,
    choices: [
      {
        id: 'print_almanac', text: 'Pay for a short astronomical work: tables and a preface.',
        requirements: { skills: { astronomy: 7 } },
        costs: { money: 15, time: 6, focus: 10 },
        outcome: { description: 'Copies in the shops by the end of the month. Your name in other men\'s libraries.', reputation: { scholarNetwork: 6, merchantNetwork: 2 } },
        isBlueOption: true, blueLabel: 'Astronomy 7', scalingSkill: 'astronomy',
      },
      {
        id: 'print_imperial', text: 'Print a brief for British maritime claims.',
        requirements: { books: ['dee_general_rare'], skills: { rhetoric: 6 } },
        costs: { money: 20, time: 8 },
        outcome: { description: 'The pamphlet reaches the voyagers and the Council. Some of the Council find it presumptuous.', reputation: { leicester: 5, merchantNetwork: 4, burghley: -3 } },
        isBlueOption: true, blueLabel: 'General and Rare Memorials + Rhetoric 6',
      },
      {
        id: 'print_occult', text: 'Print something on the secrets of nature.',
        requirements: { skills: { occultPhilosophy: 7 } },
        costs: { money: 15, time: 6 },
        outcome: { description: 'It sells. The preachers buy it too.', reputation: { scholarNetwork: 4, religiousAuth: -8 }, secrecyChange: -10 },
        isBlueOption: true, blueLabel: 'Occult Philosophy 7',
      },
    ],
  },
];
