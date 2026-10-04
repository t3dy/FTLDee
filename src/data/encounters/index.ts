import type { Encounter } from '../../core/types.js';

import { ENGLAND_EVENTS } from './england_events.js';
import { PRAGUE_ENCOUNTERS } from './prague.js';
import { ROAD_ENCOUNTERS } from './road.js';
import { ENGLAND_MORE } from './england_more.js';
import { PROLOGUE } from './prologue.js';
import { ESPIONAGE_ENCOUNTERS } from './espionage.js';

const CORE_ENCOUNTERS: Encounter[] = [

  // ==========================================================================
  // MORTLAKE ENCOUNTERS
  // ==========================================================================

  {
    id: 'mortlake_household',
    title: 'The Mortlake Household',
    locationId: 'mortlake',
    historicalStatus: 'plausible',
    description: 'You are at Mortlake. Jane has managed the household admirably in your absence. The library stands ready. Roger Cooke tends the furnaces. What demands your attention?',
    participants: ['jane_dee', 'roger_cooke'],
    repeatable: true,
    choices: [
      {
        id: 'household_research',
        text: 'Spend time in the study on current research.',
        costs: { time: 5 },
        outcome: {
          description: 'Five days of concentrated study. Your command of the subject deepens.',
          focusChange: 15,
          money: -2,
          reputation: { scholarNetwork: 2 },
          flagsSet: ['studied_at_mortlake'],
        },
      },
      {
        id: 'household_correspondence',
        text: 'Attend to correspondence with the scholarly network.',
        costs: { time: 3 },
        outcome: {
          description: 'Letters dispatched; replies await. Your continental contacts are maintained.',
          reputation: { scholarNetwork: 3, continentalCourts: 1 },
          contactsGained: ['continental_scholar'],
          flagsSet: ['maintained_correspondence'],
        },
      },
      {
        id: 'household_copy_manuscript',
        text: 'Copy a manuscript in the scriptorium and sell the copy to a collector.',
        requirements: { rooms: { scriptorium: 1 }, skills: { manuscriptKnowledge: 6 } },
        costs: { time: 5, focus: 10 },
        outcome: {
          description: 'A fair copy goes to a London collector. The price is good; the scholars hear where it came from.',
          money: 14,
          reputation: { scholarNetwork: 2 },
        },
        isBlueOption: true,
        blueLabel: 'Scriptorium 1 + Manuscript Knowledge 6',
        scalingSkill: 'manuscriptKnowledge',
      },
      {
        id: 'household_stability',
        text: 'Attend to the household itself: family, finances, servants.',
        costs: { time: 2 },
        outcome: {
          description: 'Jane is grateful for your attention. The household stability improves. Your health benefits from the rest.',
          money: -3,
          flagsSet: ['household_stable'],
        },
      },
    ],
  },

  {
    id: 'mortlake_research',
    title: 'Research at Mortlake',
    locationId: 'mortlake',
    historicalStatus: 'plausible',
    description: 'The library is quiet. The instruments stand ready. What intellectual work calls most urgently?',
    participants: [],
    repeatable: true,
    choices: [
      {
        id: 'research_astronomy',
        text: 'Continue astronomical observations and calculations.',
        requirements: { books: ['ptolemy_almagest'] },
        costs: { time: 7, focus: 15 },
        outcome: {
          description: 'Your astronomical calculations advance. A new set of planetary tables is nearly complete.',
          reputation: { scholarNetwork: 4 },
          flagsSet: ['advanced_astronomy_research'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Ptolemy\'s Almagest',
      },
      {
        id: 'research_symbolic_synthesis',
        text: 'Work on the symbolic synthesis underlying the Monas.',
        requirements: { books: ['dee_monas', 'agrippa_occulta'] },
        costs: { time: 10, focus: 25 },
        outcome: {
          description: 'The symbolic system deepens. You begin to see connections between mathematical proportion and occult correspondence that were previously obscure.',
          reputation: { scholarNetwork: 3 },
          secrecyChange: -5,
          flagsSet: ['symbolic_synthesis_advanced'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Monas Hieroglyphica + De occulta philosophia',
      },
      {
        id: 'research_basic',
        text: 'Review and annotate existing books. General study.',
        costs: { time: 4 },
        outcome: {
          description: 'A productive few days of general reading and annotation. Nothing dramatic, but the ground is prepared.',
          focusChange: 10,
        },
      },
    ],
  },

  // ==========================================================================
  // WINDSOR — THE COMET
  // ==========================================================================

  {
    id: 'comet_at_windsor',
    title: 'The Comet at Windsor',
    locationId: 'windsor',
    historicalStatus: 'plausible',
    sources: ['Harkness 149', 'Parry 116–117, 148–150'],
    description: 'A strange astronomical phenomenon has appeared in the heavens above Windsor. The court is unsettled. Servants mutter about portents. Her Majesty has requested that it be interpreted. You have been summoned. (This replays the documented consultation of November 1577, when Dee spent three days at Windsor and Leicester used him to answer the fear a comet was spreading.)\n\nThe comet is visible in the evening sky, moving slowly through the northern heavens. Several courtiers have already offered opinions, none satisfactory.',
    flavorText: 'The Queen\'s messenger has come twice to ask what it means.',
    participants: ['elizabeth'],
    repeatable: false,
    choices: [
      {
        id: 'comet_natural',
        text: 'Explain the comet as a natural phenomenon: an exhalation of vapors in the upper atmosphere, following Aristotelian natural philosophy.',
        outcome: {
          description: 'You provide a learned Aristotelian account. Some courtiers are reassured; others feel the explanation too cold. The Queen receives it with measured interest.',
          reputation: { elizabeth: 3, burghley: 4, religiousAuth: 3, scholarNetwork: 2 },
          secrecyChange: 2,
          flagsSet: ['comet_natural_interpretation'],
          money: 5,
        },
      },
      {
        id: 'comet_astrological',
        text: 'Construct a full astrological assessment: the comet\'s position relative to the planets, its elemental quality, and its implications for the kingdom.',
        requirements: {
          skills: { astronomy: 6, astrology: 5 },
          books: ['ptolemy_almagest'],
        },
        costs: { time: 2 },
        outcome: {
          description: 'Your astrological reading is careful and authoritative. You place the comet in its correct celestial house and identify its quality as primarily martial, with implications for military affairs. The Queen is impressed and asks you to put it in writing.',
          reputation: { elizabeth: 8, leicester: 5, scholarNetwork: 5 },
          secrecyChange: -3,
          flagsSet: ['comet_astrological_report'],
          money: 12,
          leadToEncounterId: 'elizabeths_interest',
        },
        isBlueOption: true,
        blueLabel: 'Requires Astronomy 6 + Astrology 5 + Ptolemy\'s Almagest',
        scalingSkill: 'astronomy',
      },
      {
        id: 'comet_providential',
        text: 'Interpret the comet as a providential warning: a sign from God addressed to the nation, requiring moral and political reflection.',
        requirements: {
          skills: { occultPhilosophy: 6, rhetoric: 6 },
          minFaction: { religiousAuth: 20 },
        },
        outcome: {
          description: 'You frame the comet as a divine communication. Some at court respond with genuine alarm; the Queen, characteristically, asks what specifically is being warned of. You suggest the sign concerns foreign dangers. This reading pleases the preachers but makes Burghley cautious.',
          reputation: { elizabeth: 4, religiousAuth: 8, burghley: -3 },
          secrecyChange: -2,
          flagsSet: ['comet_providential_interpretation'],
          money: 8,
        },
        isBlueOption: true,
        blueLabel: 'Requires Occult Philosophy 6 + Rhetoric 6 + Religious standing',
      },
      {
        id: 'comet_combined',
        text: 'Synthesize all three approaches: a thorough natural-philosophical account, an astrological interpretation, and a suggestion of providential significance — carefully calibrated for the court audience.',
        requirements: {
          skills: { astronomy: 7, astrology: 7, occultPhilosophy: 7, rhetoric: 7 },
          books: ['ptolemy_almagest', 'agrippa_occulta'],
        },
        costs: { time: 3, focus: 10 },
        outcome: {
          description: 'Your presentation to the court is masterful. You begin with the natural philosophy (this is what it is), proceed to the astrological significance (this is what it portends), and close with a measured providential reading (this is what it demands). The Queen is delighted. You have demonstrated exactly the kind of universal learning she prizes.',
          reputation: { elizabeth: 15, burghley: 6, leicester: 8, scholarNetwork: 8 },
          secrecyChange: -5,
          flagsSet: ['comet_master_interpretation', 'comet_astrological_report'],
          money: 20,
          leadToEncounterId: 'elizabeths_interest',
        },
        isBlueOption: true,
        blueLabel: 'Requires Astronomy 7 + Astrology 7 + Occult Philosophy 7 + Rhetoric 7 + Ptolemy + Agrippa',
      },
    ],
  },

  // ==========================================================================
  // RICHMOND — ELIZABETH'S INTEREST
  // ==========================================================================

  {
    id: 'elizabeths_interest',
    title: "Elizabeth's Interest",
    locationId: 'richmond',
    historicalStatus: 'plausible',
    description: 'Her Majesty has granted you a private audience. The chamber is quiet. The Queen\'s attention is rarely given so directly.\n\nShe has questions — about the nature of your work, about what you believe possible, about what you could do for England. How you present yourself now will shape how the court understands you.',
    flavorText: 'The Queen asks which of all your learning is most useful to her.',
    participants: ['elizabeth'],
    repeatable: false,
    choices: [
      {
        id: 'present_mathematician',
        text: 'Present yourself as the mathematician and cartographer: your navigational work, your astronomical calculations, your potential service to English maritime ambitions.',
        outcome: {
          description: 'Elizabeth is attentive and practical. She asks about the Northwest Passage, about the measurement of longitude, about whether an accurate map of the northern seas is possible. You are on strong ground. Burghley\'s secretary takes notes.',
          reputation: { elizabeth: 6, burghley: 8, merchantNetwork: 4, scholarNetwork: 3 },
          money: 10,
          flagsSet: ['elizabeth_mathematical_interest'],
        },
      },
      {
        id: 'present_imperial',
        text: 'Present yourself as the architect of a new British imperial philosophy: the historical and geographical grounds for English sovereignty over newly discovered lands.',
        requirements: {
          books: ['dee_mathematical_preface'],
          skills: { rhetoric: 6, cartography: 5 },
        },
        outcome: {
          description: 'The Queen is intrigued. You sketch the argument: the historical Welsh-British claims, the extent of Arthur\'s domain, the mathematical definition of maritime sovereignty. Leicester listens intently. Burghley looks cautious.',
          reputation: { elizabeth: 8, leicester: 6, burghley: -3 },
          money: 8,
          flagsSet: ['elizabeth_imperial_interest', 'imperial_program_begun'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Mathematical Preface + Rhetoric 6 + Cartography 5',
      },
      {
        id: 'present_occult',
        text: 'Present yourself as a natural philosopher capable of things others cannot do: extraordinary knowledge, hidden correspondences, the possibility of communication with intelligences beyond the merely human.',
        requirements: {
          skills: { occultPhilosophy: 7, astrology: 6 },
          books: ['agrippa_occulta', 'dee_monas'],
        },
        outcome: {
          description: 'The Queen is fascinated and slightly alarmed. She asks careful questions. Her interest in the magical dimensions of sovereignty — the idea that the monarch might have access to extraordinary knowledge — is real. But she is also cautious about what can be said publicly. She asks that nothing of this be repeated outside the chamber. Your occult reputation with Elizabeth advances significantly, but discretion is essential.',
          reputation: { elizabeth: 12, religiousAuth: -5 },
          secrecyChange: -10,
          money: 15,
          flagsSet: ['elizabeth_occult_interest', 'royal_occult_confidence'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Occult Philosophy 7 + Astrology 6 + Agrippa + Monas',
      },
      {
        id: 'present_general',
        text: 'Present yourself as a general natural philosopher: a man of diverse learning available to the Crown for whatever purpose arises.',
        outcome: {
          description: 'A solid but unremarkable performance. Elizabeth acknowledges your usefulness. No particular program is advanced, but you have reinforced your availability.',
          reputation: { elizabeth: 4, burghley: 3 },
          money: 5,
          flagsSet: ['elizabeth_general_consultation'],
        },
      },
    ],
  },

  // ==========================================================================
  // GREENWICH — THE NETWORK
  // ==========================================================================

  {
    id: 'greenwich_network',
    title: 'The Greenwich Network',
    locationId: 'greenwich',
    historicalStatus: 'plausible',
    description: 'At Greenwich you encounter a gathering of figures from the Leicester/Sidney circle: Protestant intellectuals with continental ambitions, interests in natural philosophy, and connections to the navigational projects. Philip Sidney is present, as is a mathematician recently returned from the Low Countries.\n\nThe conversation turns to natural philosophy, the state of English learning, and what might be done.',
    participants: ['philip_sidney', 'leicester_agent'],
    repeatable: false,
    choices: [
      {
        id: 'greenwich_mathematics',
        text: 'Engage the mathematical and navigational discussion — the practical application of your work to English ambitions at sea.',
        outcome: {
          description: 'The navigational discussion is productive. You explain the mathematical basis of accurate sea charts, the problem of magnetic variation, and your proposals for a state school of navigation. Sidney listens with genuine interest. A future commission seems possible.',
          reputation: { leicester: 5, merchantNetwork: 4, scholarNetwork: 3 },
          money: 5,
          contactsGained: ['navigator_contact'],
          flagsSet: ['navigation_program_promoted'],
        },
      },
      {
        id: 'greenwich_continental',
        text: 'Engage the discussion of continental Protestant networks — the possibility of an Anglo-German intellectual alliance.',
        requirements: {
          skills: { rhetoric: 6, languages: 5 },
        },
        outcome: {
          description: 'You discuss the German Protestant intellectual world — Heidelberg, Frankfurt, the printers of the Reformed tradition. Sidney takes careful note. You begin to see the shape of a continental network that might serve both intellectual and political purposes.',
          reputation: { leicester: 6, continentalCourts: 8 },
          contactsGained: ['continental_protestant_contact'],
          flagsSet: ['continental_protestant_network'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Rhetoric 6 + Languages 5',
      },
      {
        id: 'greenwich_occult',
        text: 'Engage the Hermetic and occult dimensions of the discussion — the possibility of a Protestant natural magic as an alternative to Catholic supernatural claims.',
        requirements: {
          skills: { occultPhilosophy: 7 },
          books: ['agrippa_occulta'],
        },
        outcome: {
          description: 'The discussion moves into territory Sidney finds fascinating. You sketch the argument: a Protestant natural philosophy that includes the magical dimensions of nature — not demonic conjuration but the mathematical correspondences underlying creation. Sidney\'s imagination is fired. Leicester\'s interest grows.',
          reputation: { leicester: 8, scholarNetwork: 5 },
          secrecyChange: -5,
          contactsGained: ['protestant_hermetic_contact'],
          flagsSet: ['protestant_occult_program'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Occult Philosophy 7 + Agrippa',
      },
      {
        id: 'greenwich_observe',
        text: 'Observe and gather information without committing to any program.',
        outcome: {
          description: 'You listen more than you speak. You learn who is connected to whom, what the court is interested in, and where the opportunities lie. Less immediate reward; more intelligence.',
          reputation: { walsingham: 2 },
          contactsGained: ['court_information'],
          flagsSet: ['greenwich_surveyed'],
        },
      },
    ],
  },

  // ==========================================================================
  // BARN ELMS — WALSINGHAM / INTELLIGENCE
  // ==========================================================================

  {
    id: 'walsingham_intelligence',
    title: 'Walsingham and the Intelligence Problem',
    locationId: 'barn_elms',
    historicalStatus: 'contested',
    sources: ['Parry 204 (Dee as Walsingham\'s spy is "the old canard")', 'Clucas, Ambix 64.2 (Dee and the Steganographia, 1563)'],
    description: 'At Barn Elms, Walsingham receives you privately. A sealed packet of letters has reached him by an uncertain route. The originating court is clear; the content is not.\n\nWalsingham believes the letters contain a concealed message. He has mathematical cryptographers but they have made no progress. He thinks the solution may require a different kind of knowledge.\n\n(No record shows Dee breaking ciphers for Walsingham. Dee knew Trithemius; the rest is a long tradition that Parry calls "the old canard".)',
    flavorText: 'Walsingham remarks that he has heard you understand Trithemius.',
    participants: ['walsingham'],
    repeatable: false,
    choices: [
      {
        id: 'intelligence_cipher_trithemius',
        text: 'Analyze the letters using your knowledge of Trithemian cipher systems — both the mathematical and the angelic-communication frameworks.',
        requirements: {
          skills: { cryptography: 5 },
          books: ['trithemius_steganographia'],
        },
        costs: { time: 3 },
        outcome: {
          description: 'You recognize the cipher type immediately. It is a variation of the Trithemian substitution system, applied to a grid of apparent nonsense. Within two days you have the plain text. Walsingham is visibly impressed — more impressed than he lets on. He mentions there are other such problems. Your intelligence utility has been demonstrated.',
          reputation: { walsingham: 15, elizabeth: 3, burghley: 3 },
          secrecyChange: -8,
          money: 20,
          contactsGained: ['walsingham_contact'],
          flagsSet: ['intelligence_demonstrated', 'walsingham_network_member'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Cryptography 5 + Trithemius\'s Steganographia',
        scalingSkill: 'cryptography',
      },
      {
        id: 'intelligence_cipher_mathematics',
        text: 'Analyze the letters using mathematical methods — frequency analysis, pattern recognition.',
        requirements: {
          skills: { mathematics: 7, cryptography: 4 },
        },
        costs: { time: 5 },
        outcome: {
          description: 'Your mathematical approach makes progress but takes longer than Walsingham hoped. You identify a partial pattern but cannot complete the decipherment without the key. You deliver a partial result. Walsingham is satisfied but not delighted.',
          reputation: { walsingham: 7, burghley: 4 },
          money: 10,
          flagsSet: ['intelligence_partial'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Mathematics 7 + Cryptography 4',
      },
      {
        id: 'intelligence_protect_contact',
        text: 'Examine the letters, identify the source, and quietly ensure the source is protected without deciphering all the content for Walsingham.',
        requirements: {
          skills: { courtlyIntelligence: 6, cryptography: 3 },
          minFaction: { continentalCourts: 15 },
        },
        outcome: {
          description: 'You recognize the source — a continental contact of your own who apparently chose to route information through this channel. You give Walsingham enough to be useful while protecting the contact\'s specific identity. A delicate operation. Your continental network is preserved; your standing with Walsingham holds.',
          reputation: { walsingham: 5, continentalCourts: 8 },
          secrecyChange: -3,
          money: 8,
          flagsSet: ['contact_protected', 'double_information_game'],
        },
        isBlueOption: true,
        blueLabel: 'Requires Courtly Intelligence 6 + Continental standing',
      },
      {
        id: 'intelligence_decline',
        text: 'Decline involvement. This kind of intelligence work carries risks you are not ready to accept.',
        outcome: {
          description: 'Walsingham accepts your refusal with his customary composure, but the temperature of the room cools perceptibly. He had expected more.',
          reputation: { walsingham: -8 },
          flagsSet: ['intelligence_declined'],
        },
      },
    ],
  },

  // ==========================================================================
  // CAREER TRANSITION — CONTINENTAL DECISION
  // ==========================================================================

  {
    id: 'career_transition_continental',
    title: 'The Continental Question',
    locationId: 'mortlake',
    historicalStatus: 'documented',
    description: 'Albert Łaski, the Polish magnate, has made his proposal explicit: he invites Dee to accompany him to the Continent. The opportunity is extraordinary — access to Rudolf\'s Prague, to the great libraries, to the kind of patronage that England has repeatedly failed to provide.\n\nBut leaving England means taking Jane and the children on the road, leaving the Mortlake library in other hands, and leaving the Crown\'s protection. It also means the end of the political stability you have built here — however incomplete that stability has been.\n\nThis is the decision that will shape the rest of your career.',
    flavorText: 'Łaski presses the invitation: England has rewarded you poorly, and the Continent will do better. Only what is packed in your travelling satchel crosses the Channel.',
    participants: ['laski', 'jane_dee'],
    repeatable: false,
    choices: [
      {
        id: 'transition_stay_england',
        text: 'Decline Łaski\'s offer. Remain in England and redouble your effort to secure institutional patronage from the Crown. [Contrary to the record]',
        outcome: {
          description: 'You remain at Mortlake. England remains your world. The library is intact. The political work continues — but the continental moment has passed for now. You have chosen security over adventure, familiar frustration over unknown possibility.',
          reputation: { elizabeth: 5, burghley: 3 },
          money: -10,
          flagsSet: ['stayed_in_england', 'continental_opportunity_declined'],
          endCareer: true,
        },
      },
      {
        id: 'transition_depart_with_laski',
        text: 'Accept Laski\'s invitation. Depart for the Continent with Kelley and the essential library.',
        requirements: {
          flags: ['laski_arrival'],
        },
        outcome: {
          description: 'You close the Mortlake house, pack what books you can carry, and leave with Łaski, Jane, the children and the Kelleys. Ahead: the North Sea, the Baltic coast, Poland, and in the end Rudolf\'s Prague.',
          reputation: { continentalCourts: 15, elizabeth: -5 },
          secrecyChange: -15,
          money: -20,
          flagsSet: ['departed_for_continent', 'continental_career_begun'],
          sectorChange: 'road',
        },
        isBlueOption: true,
        blueLabel: 'Requires prior contact with Laski',
      },
      {
        id: 'transition_depart_independent',
        text: 'Depart independently, not with Łaski but on your own terms, with your own continental programme. [COUNTERFACTUAL]',
        requirements: {
          minFaction: { continentalCourts: 25 },
          skills: { languages: 6, rhetoric: 6 },
        },
        costs: { money: 30 },
        outcome: {
          description: 'You arrange your own passage. The letters of introduction you have prepared open doors Laski\'s patronage might not have reached. The independence is costly but preserves your freedom of maneuver.',
          reputation: { continentalCourts: 20, elizabeth: -3, scholarNetwork: 5 },
          secrecyChange: -10,
          money: -15,
          flagsSet: ['departed_independently', 'continental_career_begun'],
          sectorChange: 'road',
        },
        isBlueOption: true,
        blueLabel: 'Requires Continental standing 25 + Languages 6 + £30',
      },
      {
        id: 'transition_ottoman_counterfactual',
        text: 'Decline Laski and instead pursue a connection with the Ottoman court — where Murad III\'s interest in occult science is rumored to be substantial. [COUNTERFACTUAL]',
        requirements: {
          skills: { astrology: 7, occultPhilosophy: 7, languages: 6 },
          minFaction: { continentalCourts: 30 },
          flags: ['ottoman_thread_open'],
        },
        costs: { money: 40 },
        outcome: {
          description: 'COUNTERFACTUAL. In the record the angels promised Dee the Cross raised in Constantinople: conquest, not service (Fenton 144–146). In this run Dee reads the same letter tables the other way and goes east as a guest of Murad III\'s court, where occult science is expected of an adviser rather than suspected. The Ottoman sector is not yet built; the run ends here.',
          reputation: { continentalCourts: 25, elizabeth: -10, scholarNetwork: 5 },
          secrecyChange: -20,
          money: -30,
          flagsSet: ['ottoman_path_taken', 'continental_career_begun', 'counterfactual_history_active'],
          endCareer: true,
        },
        isBlueOption: true,
        blueLabel: '[COUNTERFACTUAL] The Ottoman thread + Astrology 7 + Occult 7 + Languages 6 + Continental 30',
      },
    ],
  },
];

export const ALL_ENCOUNTERS: Encounter[] = [...PROLOGUE, ...CORE_ENCOUNTERS, ...ENGLAND_EVENTS, ...ENGLAND_MORE, ...ROAD_ENCOUNTERS, ...PRAGUE_ENCOUNTERS, ...ESPIONAGE_ENCOUNTERS];

// The event that opens each sector on arrival.
export const SECTOR_ARRIVAL: Record<string, string> = { road: 'road_departure', prague: 'prague_arrival' };

export interface TriggerContext {
  completedIds: string[];
  flags: string[];
  factions: Partial<Record<string, number>>;
  sectorDay: number;
  rooms: Partial<Record<string, number>>;
}

export function triggerMet(e: Encounter, ctx: TriggerContext): boolean {
  const t = e.triggerConditions;
  if (!t) return true;
  if (t.flags && !t.flags.every(f => ctx.flags.includes(f))) return false;
  if (t.notFlags && t.notFlags.some(f => ctx.flags.includes(f))) return false;
  if (t.minDay !== undefined && ctx.sectorDay < t.minDay) return false;
  if (t.minFaction) {
    for (const [k, v] of Object.entries(t.minFaction)) if ((ctx.factions[k] ?? 0) < (v ?? 0)) return false;
  }
  if (t.rooms) {
    for (const [k, v] of Object.entries(t.rooms)) if ((ctx.rooms[k] ?? 0) < (v ?? 0)) return false;
  }
  return true;
}

export function getEncountersForLocation(locationId: string, ctx: TriggerContext): Encounter[] {
  return ALL_ENCOUNTERS.filter(e => {
    if (e.locationId !== locationId) return false;
    if (e.id === 'career_transition_continental') return false;
    if (!e.repeatable && ctx.completedIds.includes(e.id)) return false;
    return triggerMet(e, ctx);
  });
}

export function getEncounterById(id: string): Encounter | undefined {
  return ALL_ENCOUNTERS.find(e => e.id === id);
}

// Encounter → biography database entries (src/data/biography), shown in the
// event window as "In the record".
export const BIOGRAPHY_LINKS: Record<string, string[]> = {
  prologue_1555: ['dee_arrest_1555'],
  prologue_examination: ['dee_arrest_1555', 'bonner_household', 'foxe_acts_1555'],
  saul_first_scryer: ['angelic_sessions_1581'],
  kelley_arrives: ['kelley_arrives_1582', 'edward_kelley'],
  soyga_question: ['book_of_soyga_1582', 'book_of_soyga_doc'],
  laski_at_mortlake: ['laski_1583', 'albert_laski'],
  road_departure: ['continental_departure_1583'],
  krakow_court: ['albert_laski'],
  soyga_acquired: ['book_of_soyga_doc'],
  frobisher_ore: ['frobisher_expedition'],
  career_transition_continental: ['continental_departure_1583', 'albert_laski'],
  walsingham_intelligence: ['walsingham'],
  elizabeths_interest: ['elizabeth_i'],
  greenwich_network: ['philip_sidney', 'leicester'],
  deptford_navigators: ['general_and_rare_memorials_1576', 'frobisher_expedition'],
  oxford_libraries: ['mortlake_library'],
  rudolf_audience: ['rudolph_ii', 'prague'],
  prague_arrival: ['prague'],
  sigillum_dictated: ['heptarchic_system'],
};
