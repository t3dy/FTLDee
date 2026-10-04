import type { Encounter } from '../../core/types.js';

// The intrigue thread. Mostly Dee watched, not Dee watching (Parry 204: the
// spy claim is "the old canard"). Each act of useful service writes an entry in
// the File (flags prefixed file_), read later by weather (the opened letter,
// Powle's dispatch). Research: research/espionage/. Printed pages for Parry.

export const ESPIONAGE_ENCOUNTERS: Encounter[] = [
  {
    id: 'grindal_letter', title: 'Walsingham\'s Messenger', locationId: 'richmond',
    historicalStatus: 'documented', sources: ['Parry 153–160'],
    description: 'Spring 1583. Walsingham asks you to carry his letter, and your reckoning of the calendar, to Archbishop Grindal. Grindal read the account of Philpot\'s examination long ago; he knows who sat in Bonner\'s household in 1555. Walsingham knows that too.',
    participants: ['walsingham'], repeatable: false,
    triggerConditions: { minDay: 105 },
    choices: [
      {
        id: 'grindal_carry', text: 'Carry it yourself.',
        outcome: { description: 'The archbishop receives you and your calendar with the same cold courtesy. A patron has spent your past to win his own argument.',
          reputation: { walsingham: 4, burghley: 2, religiousAuth: -6 }, flagsSet: ['calendar_carried', 'file_grindal'] },
      },
      {
        id: 'grindal_decline', text: 'Ask that another man carry it.',
        outcome: { description: 'Walsingham finds another man and remembers that you would not go.', reputation: { walsingham: -3 } },
      },
    ],
  },
  {
    id: 'wilson_watches', title: 'Godly Magic, Observed', locationId: 'windsor',
    historicalStatus: 'documented', sources: ['Parry 132–134'],
    description: 'Wax images of the Queen have been found, pierced. The Council wants them countered, and wants it seen to be godly: Secretary Wilson will watch you work. (This replays the documented counter-magic of 1578.)',
    participants: ['elizabeth', 'leicester'], repeatable: false,
    choices: [
      {
        id: 'wilson_counter', text: 'Perform the counter-magic with the Secretary watching.',
        requirements: { skills: { occultPhilosophy: 6 } },
        outcome: { description: 'The Queen is reassured and Leicester delighted. Somewhere a clerk writes: conjures at the Council\'s request.',
          reputation: { elizabeth: 8, leicester: 6 }, secrecyChange: -6, flagsSet: ['file_council_conjuror'] },
        isBlueOption: true, blueLabel: 'Occult Philosophy 6',
      },
      {
        id: 'wilson_decline', text: 'Decline: the remedy is prayer, not images.',
        outcome: { description: 'A safe answer, and a disappointed earl.', reputation: { leicester: -5, religiousAuth: 3 } },
      },
    ],
  },
  {
    id: 'murphyn_suit', title: 'The Winking Eye of Achitophel', locationId: 'london',
    historicalStatus: 'documented', sources: ['Parry 139–141'],
    description: 'Vincent Murphyn\'s slanders call you a conjuror again, and they have reached Burghley through the agent William Herle. You can sue in the Guildhall, publicly and expensively, or let it lie.',
    participants: [], repeatable: false,
    triggerConditions: { minDay: 30 },
    choices: [
      {
        id: 'murphyn_sue', text: 'Sue in the Guildhall.',
        costs: { money: 10, time: 4 },
        outcome: { description: 'You win. The Queen rides by Mortlake, gives you her hand to kiss and bids you come to court more often.',
          reputation: { elizabeth: 6 }, flagsSet: ['murphyn_answered'] },
      },
      {
        id: 'murphyn_quiet', text: 'Let it lie.',
        outcome: { description: 'The slander becomes something people simply know about you.', reputation: { religiousAuth: -4, merchantNetwork: -2 }, flagsSet: ['file_slander'], secrecyChange: -4 },
      },
    ],
  },
  {
    id: 'sled_at_table', title: 'A Gentleman Who Knows the Searchers', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Parry 166, 172'],
    description: 'Charles Sled sits at your table: he has some sight in the stone, he knows the customs searchers, and he lends money. Whether he also writes to Walsingham\'s people is the kind of thing a household learns too late. (His presence is documented; his reporting is plausible.)',
    participants: [], repeatable: false,
    triggerConditions: { minDay: 70 },
    choices: [
      {
        id: 'sled_keep', text: 'Keep him close.',
        outcome: { description: 'His money helps and his talk is good. He sees everything that happens in the house.',
          money: 6, flagsSet: ['sled_in_house', 'file_household_leak'] },
      },
      {
        id: 'sled_out', text: 'Turn him out.',
        outcome: { description: 'He goes, and becomes a creditor instead of a friend.', secrecyChange: 6, reputation: { merchantNetwork: -2 } },
      },
    ],
  },
  {
    id: 'laski_lacy', title: 'A Kingdom Within the Year', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Parry 164–169'],
    description: 'Łaski claims descent from the Lacys, Elizabeth\'s own ancestors, and wants the angels to speak to his prospects. Burghley already finds him an embarrassment; Herle has been set to watch him, and Walsingham has tried to place Thomas Watson in his household.',
    participants: ['laski', 'edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['laski_contact'] },
    choices: [
      {
        id: 'lacy_stone', text: 'Put his claims to the stone.',
        requirements: { crew: ['edward_kelley'] },
        outcome: { description: 'The angels promise him crowns, including one he seeks as his right. Łaski is radiant. Burghley\'s file grows a page.',
          reputation: { continentalCourts: 10, burghley: -8, walsingham: -4 }, flagsSet: ['laski_actions', 'file_laski_crown'] },
        isBlueOption: true, blueLabel: 'Kelley in the household',
      },
      {
        id: 'lacy_nature', text: 'Keep the actions to Nature, not crowns.',
        outcome: { description: 'Łaski is disappointed and polite.', reputation: { continentalCourts: -4 } },
      },
    ],
  },
  {
    id: 'wicked_spy', title: 'A Worcestershire Man', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Fenton 112–114', 'Parry 170'],
    description: '1 August 1583. A stranger from Worcestershire is "sent to E.K." The record does not settle who he was; the diary calls a visitor of these weeks a wicked spy.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['kelley_employed'], minDay: 110 },
    choices: [
      {
        id: 'wicked_trust', text: 'Treat him as an honest man. (What Dee did.)',
        outcome: { description: 'He comes and goes. Kelley has a correspondent you do not know.', flagsSet: ['file_kelley_watched'] },
      },
      {
        id: 'wicked_question', text: 'Question him.',
        requirements: { skills: { courtlyIntelligence: 5 } },
        outcome: { description: 'His answers do not hang together. He leaves the same day.', secrecyChange: 4, reputation: { burghley: -2 } },
        isBlueOption: true, blueLabel: 'Courtly Intelligence 5',
      },
    ],
  },
  {
    id: 'leipzig_letter', title: 'I Am Forced to Be Brief', locationId: 'old_town',
    historicalStatus: 'documented', sources: ['Fenton 207–209', 'Fell Smith 89', 'Parry 192'],
    description: 'May 1586. A courier will carry a letter by the Leipzig fair to an English merchant and on to Walsingham. What the letter you actually sent meant is disputed: Parry reads self-promotion; Fell Smith saw veiled allusions. It is the only real foundation the spy legend has.',
    participants: [], repeatable: false,
    triggerConditions: { minDay: 85 },
    choices: [
      {
        id: 'leipzig_triumph', text: 'Write of your triumphs, and of the flea you put in the nuncio\'s ear. (Parry\'s reading)',
        outcome: { description: 'Walsingham reads a man advertising himself.', reputation: { walsingham: 2 }, flagsSet: ['departure_explained'] },
      },
      {
        id: 'leipzig_veiled', text: 'Write in veiled allusions. (Fell Smith\'s supposition) [contested]',
        outcome: { description: 'Walsingham reads between your lines, or imagines he does.', reputation: { walsingham: 4 }, secrecyChange: -6, flagsSet: ['double_information_game', 'file_leipzig'] },
      },
      { id: 'leipzig_none', text: 'Write nothing.', outcome: { description: 'Silence from Prague is also news in London.' } },
    ],
  },

  // ------------------------------------------------------------ LEGEND MODE
  {
    id: 'legend_007', title: '[LEGEND] Two Eyes and a Seven', locationId: 'barn_elms',
    historicalStatus: 'legend',
    sources: ['Richard Deacon (Donald McCormick), 1968', 'Clulee 2015, 229–230 ("largely fantasy and speculation")', 'Burns 2010 via Duns 2018: no such signature found'],
    description: 'LEGEND. In Richard Deacon\'s 1968 biography, Dee signs his secret letters to the Queen with two circles and a long-stemmed seven: her "eyes", the original 007. No such signature has been found in Dee\'s papers. This scene plays the legend, and says so.',
    participants: ['walsingham'], repeatable: false,
    triggerConditions: { flags: ['legend_mode'], minDay: 40 },
    choices: [
      {
        id: 'legend_007_sign', text: 'Sign your reports so. [LEGEND]',
        outcome: { description: 'In the legend, Walsingham pays well for his secret eyes. In the record, there are no such letters.', reputation: { walsingham: 10 }, secrecyChange: -12, flagsSet: ['legend_007', 'file_legend_signature'] },
      },
      { id: 'legend_007_no', text: 'Sign your own name.', outcome: { description: 'The record and the legend part company here.' } },
    ],
  },
  {
    id: 'legend_forest_of_dean', title: '[LEGEND] The Forest of Dean', locationId: 'mortlake',
    historicalStatus: 'legend',
    sources: ['Deacon 1968, as retold (Lienhard, Engines of Our Ingenuity 896)', 'Not in Dee\'s diaries or the actions in the corpus'],
    description: 'LEGEND. Deacon\'s Dee receives an angelic warning that Spanish agents mean to burn the Forest of Dean, the navy\'s timber. Nothing of it appears in Dee\'s diaries or the records of the actions.',
    participants: ['edward_kelley'], repeatable: false,
    triggerConditions: { flags: ['legend_mode', 'kelley_employed'], minDay: 80 },
    choices: [
      {
        id: 'dean_report', text: 'Carry the warning to Walsingham. [LEGEND]',
        outcome: { description: 'In the legend, the plot is foiled and the oaks stand.', reputation: { walsingham: 8, leicester: 3 }, flagsSet: ['legend_dean'] },
      },
      { id: 'dean_doubt', text: 'Doubt that angels give naval intelligence.', outcome: { description: 'So does the record.' } },
    ],
  },
  {
    id: 'legend_angelic_code', title: '[LEGEND] The Angels Are a Code', locationId: 'mortlake',
    historicalStatus: 'legend',
    sources: ['Robert Hooke, 1690', 'revived by Deacon 1968', 'rejected by Whitby 104–105'],
    description: 'LEGEND. In 1690 Robert Hooke guessed that the actions with spirits were a cipher for state intelligence; Deacon revived the idea. Whitby rejects it. In this scene the stone\'s letter tables can carry a second message.',
    participants: ['edward_kelley'], repeatable: true,
    triggerConditions: { flags: ['legend_mode', 'scrying_begun'] },
    choices: [
      {
        id: 'code_send', text: 'Encode a report in the tables of today\'s action. [LEGEND]',
        costs: { focus: 10 },
        outcome: { description: 'In the legend, London is grateful. The action itself yields nothing of the angels.', money: 5, secrecyChange: -3, flagsSet: ['file_legend_code'] },
      },
      { id: 'code_pray', text: 'Keep the action an action.', outcome: { description: 'The angels, or Kelley, speak as usual.' } },
    ],
  },
];
