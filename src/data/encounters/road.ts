import type { Encounter } from '../../core/types.js';

// The Road East, September 1583 – August 1584. Route and dates: Whitby 27–31,
// Fell Smith 69–70, Parry 170–176. Alternative routes are marked plausible.

export const ROAD_ENCOUNTERS: Encounter[] = [
  {
    id: 'road_departure', title: 'Without Licence', locationId: 'gravesend_ships',
    historicalStatus: 'documented', sources: ['Whitby 27–29', 'Parry 170–172'],
    description: '21 September 1583. The household leaves Mortlake by water for two ships waiting beyond Gravesend: Dee, Jane and the children, Kelley and his wife, and Łaski. Łaski is under suspicion from Walsingham and Burghley; none of the rest has permission to leave the country.\n\nThe house, the shelves and the debts stay behind in someone\'s keeping.',
    participants: ['jane_dee', 'edward_kelley', 'laski'], repeatable: false,
    choices: [
      {
        id: 'depart_fromond', text: 'Leave the house and goods with Jane\'s brother, Nicholas Fromond. (What Dee did.)',
        outcome: { description: 'Fromond takes the keys. He will sell goods and collect rents while you are gone, and creditors will besiege him.',
          flagsSet: ['fromond_keeper'], reputation: { walsingham: -4, elizabeth: -3 }, secrecyChange: -5 },
      },
      {
        id: 'depart_letter', text: 'Leave a letter for Walsingham explaining the journey as service abroad.',
        requirements: { skills: { rhetoric: 7 } },
        outcome: { description: 'The letter does not make the departure licensed, but it makes it explicable. Walsingham files it.',
          flagsSet: ['fromond_keeper', 'departure_explained'], reputation: { walsingham: 2, elizabeth: -2 } },
        isBlueOption: true, blueLabel: 'Rhetoric 7 [plausible]',
      },
      {
        id: 'depart_night', text: 'Go at night and say nothing to anyone.',
        outcome: { description: 'No one stops the boats. Everyone notices the empty house.',
          flagsSet: ['fromond_keeper'], reputation: { walsingham: -8, elizabeth: -5 }, secrecyChange: 5 },
      },
    ],
  },
  {
    id: 'brill_landing', title: 'Landfall at Brill', locationId: 'brill',
    historicalStatus: 'documented', sources: ['Whitby 27–29'],
    description: '29 September. After some difficulties at sea, Holland. Boatmen, customs men and innkeepers all know a rich foreign party when they see one.',
    participants: [], repeatable: false,
    choices: [
      { id: 'brill_pay', text: 'Pay what is asked and move on.', costs: { money: 5 }, outcome: { description: 'Expensive, quick, forgotten.' } },
      {
        id: 'brill_dutch', text: 'Bargain in Dutch and Latin.',
        requirements: { skills: { languages: 7 } },
        outcome: { description: 'The price halves and an innkeeper tells you which hoy masters are honest.', money: -2, contactsGained: ['rotterdam_hoyman'] },
        isBlueOption: true, blueLabel: 'Languages 7',
      },
      { id: 'brill_wait', text: 'Wait out the weather before going on.', costs: { time: 3 }, outcome: { description: 'Three days of rain and a dry household.', focusChange: 10 } },
    ],
  },
  {
    id: 'lubeck_angels', title: 'What the Angels Knew', locationId: 'lubeck',
    historicalStatus: 'documented', sources: ['Parry 170–172'],
    description: 'Mid-November, Lübeck. In an action the angels tease Dee about his brother-in-law Fromond\'s troubles with creditors at home. One of those creditors, Charles Sled, had connections to Walsingham\'s spy network.\n\nHow does news from Mortlake reach the stone in Lübeck faster than the post?',
    participants: ['edward_kelley', 'laski'], repeatable: false,
    choices: [
      {
        id: 'lubeck_believe', text: 'Take it as revelation, and pray for Fromond.',
        outcome: { description: 'The actions go on. Your faith in the stone is, if anything, stronger.', focusChange: 5, flagsSet: ['angels_trusted'] },
      },
      {
        id: 'lubeck_suspect', text: 'Ask yourself who in the party is getting letters from England. [inference]',
        requirements: { skills: { courtlyIntelligence: 6 } },
        outcome: { description: 'You start to watch Kelley\'s post. You find nothing you can prove. (Parry suggests the link; the record does not show Kelley as an informer.)',
          flagsSet: ['kelley_watched'], secrecyChange: 5, reputation: { walsingham: 1 } },
        isBlueOption: true, blueLabel: 'Courtly Intelligence 6',
      },
      {
        id: 'lubeck_write', text: 'Write to Fromond with instructions about the debts.',
        requirements: { rooms: { correspondence: 1 } },
        costs: { money: 2 },
        outcome: { description: 'The letter goes. Fromond will defeat both creditors\' suits in court, and keep selling your goods.', flagsSet: ['fromond_instructed'] },
        isBlueOption: true, blueLabel: 'Letters Home 1',
      },
    ],
  },
  {
    id: 'stettin_christmas', title: 'Christmas Morning at Stettin', locationId: 'stettin',
    historicalStatus: 'documented', sources: ['Whitby 27–29', 'Fell Smith 69–70'],
    description: 'Ten o\'clock on Christmas morning, 1583. The household is cold, the children tired, and Łaski a fortnight behind.',
    participants: ['jane_dee'], repeatable: false,
    choices: [
      { id: 'stettin_rest', text: 'Keep the feast and rest.', costs: { time: 3 }, outcome: { description: 'A warm room, a feast, the household steadier.', focusChange: 15 } },
      {
        id: 'stettin_action', text: 'Hold an action at the halt.',
        requirements: { instruments: ['show_stone'], crew: ['edward_kelley'] },
        outcome: { description: 'The actions continue at the halts, as they did all the way east.', focusChange: -5, reputation: { continentalCourts: 2 }, flagsSet: ['road_actions'] },
        isBlueOption: true, blueLabel: 'Show-stone + Kelley in the retinue',
      },
    ],
  },
  {
    id: 'posen_journal', title: 'Notes in Greek Letters', locationId: 'posen',
    historicalStatus: 'documented', sources: ['Fell Smith 69–70'],
    description: 'In the travel journal, the Liber Peregrinationis, Dee begins to write notes about Kelley in Greek characters: the words are Latin or English, the letters Greek. Kelley, it seems, could not read them.',
    participants: ['edward_kelley'], repeatable: false,
    choices: [
      {
        id: 'posen_greek', text: 'Keep the notes, in Greek letters. (What Dee did.)',
        requirements: { skills: { languages: 6 } },
        outcome: { description: 'A private record of a partner you do not quite trust.', flagsSet: ['kelley_notes'], focusChange: -5 },
      },
      {
        id: 'posen_cipher', text: 'Go further: a Trithemian cipher.',
        requirements: { skills: { cryptography: 7 }, books: ['trithemius_steganographia'] },
        outcome: { description: 'No one but you will ever read these pages. [plausible]', flagsSet: ['kelley_notes', 'cipher_journal'], secrecyChange: 5 },
        isBlueOption: true, blueLabel: 'Cryptography 7 + Steganographia packed',
      },
      { id: 'posen_none', text: 'Write nothing about him.', outcome: { description: 'The journal records cathedrals and roads.' } },
    ],
  },
  {
    id: 'lask_estate', title: 'Łaski\'s Mortgaged Estate', locationId: 'lask',
    historicalStatus: 'documented', sources: ['Whitby 29–31, 149–152, 159–160'],
    description: '3 February 1584. Łaski\'s own lands at Lask, mortgaged like his estate at Kesmark, which must be redeemed by 23 April with money he does not have. He asks the angels for a treasure to redeem them. A carpenter is free to make whatever the actions require.',
    participants: ['laski', 'edward_kelley'], repeatable: false,
    choices: [
      {
        id: 'lask_table', text: 'Have the frame for the Holy Table made here.',
        costs: { money: 8, time: 5 },
        outcome: { description: 'The pedestal is made at Lask, as Ashmole later recorded.', instrumentsGained: ['holy_table'], flagsSet: ['holy_table_made'] },
      },
      {
        id: 'lask_treasure', text: 'Ask the spirits for the treasure to redeem the estate. (What Dee did.)',
        requirements: { crew: ['edward_kelley'] },
        outcome: { description: 'The answer is evasive: small are the treasures of this world. Łaski stays in debt and stays grateful for the asking.',
          reputation: { continentalCourts: 4 }, focusChange: -10 },
        isBlueOption: true, blueLabel: 'Kelley in the retinue',
      },
      {
        id: 'lask_powder', text: 'Let Kelley project the red powder for Łaski.',
        requirements: { instruments: ['red_powder'], crew: ['edward_kelley'] },
        outcome: { description: 'The projection fails to make Łaski rich; the powder is not the whole stone. One of your miracles is spent. (Parry 173–174.)',
          instrumentsLost: ['red_powder'], reputation: { continentalCourts: 2 }, flagsSet: ['powder_spent'] },
        isBlueOption: true, blueLabel: 'Red powder + Kelley in the retinue',
      },
      { id: 'lask_rest', text: 'Rest and repack.', costs: { time: 3 }, outcome: { description: 'The chests are sorted; the household sleeps.', focusChange: 10 } },
    ],
  },
  {
    id: 'krakow_court', title: 'King Stephen\'s City', locationId: 'krakow',
    historicalStatus: 'documented', sources: ['Whitby 29–33', 'Szőnyi 259'],
    description: '13 March 1584. Seven nights in a church lodging, then a house in St Stephen Street. The angels advised living in Kraków; the court of King Stephen Báthory is here, and Łaski\'s enemies are close to it.',
    participants: ['laski'], repeatable: false,
    choices: [
      {
        id: 'krakow_king', text: 'Seek an audience with King Stephen.',
        requirements: { minFaction: { continentalCourts: 30 } },
        outcome: { description: 'The king receives you. He is polite, sceptical and in no hurry. (He would later be unconvinced by the actions he witnessed.)',
          reputation: { continentalCourts: 6 }, flagsSet: ['king_stephen_met'] },
        isBlueOption: true, blueLabel: 'Continental 30',
      },
      {
        id: 'krakow_emperor', text: 'Write ahead to the Emperor\'s court.',
        requirements: { books: ['dee_monas'] },
        outcome: { description: 'The Monas was dedicated to Rudolf\'s father. It opens the first door.', flagsSet: ['wrote_to_emperor'], reputation: { continentalCourts: 3 } },
        isBlueOption: true, blueLabel: 'Monas packed',
      },
      { id: 'krakow_settle', text: 'Settle the household in St Stephen Street.', costs: { money: 4, time: 4 }, outcome: { description: 'A house, a table, a door that locks.', focusChange: 10 } },
    ],
  },
  {
    id: 'road_to_prague', title: 'To the Emperor', locationId: 'prague_road',
    historicalStatus: 'documented', sources: ['Whitby 29–31'],
    description: 'Łaski\'s fortunes are failing at home, and he asks Dee to come with him to the Emperor Rudolf. The angels take Łaski\'s side. On 1 August 1584 Dee sets off for Prague; Jane and the children follow later.',
    participants: ['laski', 'edward_kelley'], repeatable: false,
    choices: [
      { id: 'prague_go', text: 'Go to Prague.', outcome: { description: 'Nine days on the road. Prague on the ninth of August.', sectorChange: 'prague' } },
    ],
  },
  {
    id: 'hamburg_merchants', title: 'English Merchants at Hamburg', locationId: 'hamburg',
    historicalStatus: 'plausible', sources: [],
    description: 'The Merchant Adventurers keep a house here. English voices, English letters, and people who will certainly mention to someone at home that they saw you.',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'hamburg_letters', text: 'Send letters home through the merchants.',
        outcome: { description: 'Your letters arrive. So does word of where you are.', reputation: { merchantNetwork: 4, walsingham: 2 }, secrecyChange: -5 },
      },
      {
        id: 'hamburg_avoid', text: 'Keep away from the English house.',
        outcome: { description: 'No one reports you. No one helps you either.', secrecyChange: 5 },
      },
    ],
  },
];
