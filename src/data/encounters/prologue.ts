import type { Encounter } from '../../core/types.js';

// Prologue: 1555, remembered at Mortlake. Parry's pattern of the wrong side at
// a transition: Elizabeth's diviner when that was treason, then Bonner's
// chaplain. Sources: Parry 31–39 (printed pages), research/espionage/MARY_TO_ELIZABETH.md.

export const PROLOGUE: Encounter[] = [
  {
    id: 'prologue_1555', title: 'Prologue: Woodstock, 1555 (remembered)', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Parry 31–32'],
    description: 'Before Mortlake, before the library, there was 1555. Queen Mary is thought to be with child; the succession is split between King Philip\'s party and the Lady Elizabeth\'s. Elizabeth, under guard at Woodstock, asks Dee through her auditor Sir Thomas Benger to divine the futures of herself, of Mary, and of Philip.\n\nTo cast those figures is to ask when a queen will die.',
    participants: ['elizabeth'], repeatable: false,
    triggerConditions: { notFlags: ['prologue_done'] },
    choices: [
      {
        id: 'prologue_cast', text: 'Cast the nativities for the Lady Elizabeth. (What Dee did.)',
        outcome: { description: 'You work at Woodstock, at Benger\'s house at Great Milton, then in London. On 28 May your door is sealed for suspicion of magic.',
          flagsSet: ['elizabeth_diviner_1555'], reputation: { elizabeth: 4 }, leadToEncounterId: 'prologue_examination' },
      },
      {
        id: 'prologue_refuse', text: 'Decline, with every courtesy. [Contrary to the record]',
        outcome: { description: 'No figures, no arrest, no Bonner. Elizabeth remembers who would not help her when it was dangerous.',
          flagsSet: ['prologue_done', 'refused_1555'], reputation: { elizabeth: -6, religiousAuth: 4 } },
      },
    ],
  },
  {
    id: 'prologue_examination', title: 'Prologue: Eighteen Questions, 1555', locationId: 'mortlake',
    historicalStatus: 'documented', sources: ['Parry 32–39'],
    description: 'Informers have named you. Mary\'s secretary Bourne and Sir Francis Englefield question you; by 5 June the prisoners confess to "lewd and vain practices of calculing and conjuring". Then one of the informer Ferrers\'s children dies and another goes blind, and the charge becomes conjuring or witchcraft. On 9 June the Council authorises torture. You will remember the eighteen written questions for the rest of your life.',
    participants: [], repeatable: false,
    choices: [
      {
        id: 'prologue_bonner', text: 'Confess what the Council requires, and find your way into Bishop Bonner\'s household. (What Dee did.)',
        outcome: { description: 'By 5 July you are debating the Eucharist with a Protestant prisoner in Bonner\'s garden at Fulham. Discharged of treason, released on bond, chaplain to the burning bishop. Foxe will print it. The Protestants will remember.',
          flagsSet: ['prologue_done', 'marian_past', 'bonner_chaplain'], reputation: { religiousAuth: -4, scholarNetwork: 2 } },
      },
      {
        id: 'prologue_hold', text: 'Hold out and admit nothing. [Contrary to the record]',
        outcome: { description: 'Months in prison and no friends in Mary\'s church. When Elizabeth comes to the throne you are clean, and poor.',
          flagsSet: ['prologue_done', 'marian_past', 'held_out_1555'], reputation: { elizabeth: 5 }, money: -10, secrecyChange: 5 },
      },
      {
        id: 'prologue_name', text: 'Name Benger and the others to save yourself. [COUNTERFACTUAL]',
        outcome: { description: 'You walk free first. In Elizabeth\'s household they know who talked.',
          flagsSet: ['prologue_done', 'marian_past', 'informer_1555'], reputation: { elizabeth: -10, walsingham: 3 }, secrecyChange: 5 },
      },
    ],
  },
];
