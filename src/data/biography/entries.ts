// =============================================================================
// FTLDee — Biographical Entries Database
// Every entry drawn from DEE_MASTER_BIOGRAPHY.md, MECHANICS_FROM_BIOGRAPHY.md,
// and the DeeChunks corpus. Properly sourced, theme-tagged, and historially
// status-marked. Use this to construct encounters, household decisions, and
// encounter consequences.
// =============================================================================

import type {
  AnyBiographicalEntry,
  BiographicalEvent,
  BiographicalDocument,
  BiographicalPerson,
  BiographicalPlace,
  BiographicalInstitution,
  BiographicalBusinessVenture,
} from './types.js';

// =============================================================================
// PEOPLE
// =============================================================================

export const DEE: BiographicalPerson = {
  id: 'dee',
  label: 'John Dee',
  type: 'person',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'occult_philosophy',
    'navigation',
    'empire',
    'mathematical_authority',
  ],
  dateStart: '1527-07-13',
  dateEnd: '1608-12-01',
  description:
    'Born in London, son of a mercer at Henry VIII\'s court. Welsh royal descent claims (LEGEND) informed his imperial self-fashioning. Central figure in Elizabethan intellectual court, navigational adviser, occult philosopher, and eventually scryer. Died at Mortlake, December 1608 or 1609 (parish register lost).',
  sources: ['Parry 23–27', 'Harkness 26–28', 'Sherman 56–80'],
  relatedEntries: [
    'jane_dee',
    'edward_kelley',
    'elizabeth_i',
    'cecil_burghley',
    'mortlake_library',
  ],
};

export const JANE_DEE: BiographicalPerson = {
  id: 'jane_dee',
  label: 'Jane Dee',
  type: 'person',
  historicalStatus: 'documented',
  themes: ['relationships', 'household', 'business_ventures'],
  dateStart: '1555',
  dateEnd: '1605',
  description:
    'Jane Fromond, married John Dee 1578. Managed Mortlake household during Dee\'s travels. Her anger at the scryers is recorded in an erased diary entry of 6 May 1582 (Whitby 24–26). Her warnings about Kelley and resistance to the 1587 covenant reveal household fault lines and the cost of Dee\'s ambitions.',
  sources: ['Harkness 251', 'Parry 200–215', 'Fenton day books'],
  roles: ['spouse', 'household_manager', 'intellectual_partner'],
  relationship:
    'Wife; intellectual peer; manager of the household during continental travels; witness to household crises.',
  relatedEntries: ['dee', 'edward_kelley', 'mortlake_library'],
};

export const EDWARD_KELLEY: BiographicalPerson = {
  id: 'edward_kelley',
  label: 'Edward Kelley',
  type: 'person',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'relationships', 'business_ventures', 'tactlessness'],
  dateStart: '1555',
  dateEnd: '1597',
  description:
    'Arrived as "Talbot" March 1582; became principal scryer in Dee\'s angelic sessions. Claims to see and converse with angels. Ears legend (LEGEND). Sincerity DISPUTED in scholarship. Jane warned against him. His pursuit of alchemy and growing influence precipitated the 1587 household crisis. Central to Dee\'s intellectual project and household breakdown both.',
  sources: ['Harkness 35–40', 'Parry 200–215', '251 daybook hits'],
  roles: ['scryer', 'alchemist', 'rival'],
  relationship:
    'Collaborator whose growing authority triggered household crisis; epistemic relationship DISPUTED.',
  connectedThemes: [
    'alchemy',
    'continental_connections',
    'security',
    'writing',
  ],
  relatedEntries: ['dee', 'jane_dee', 'angelic_sessions_1581', 'household_warnings_1582'],
};

export const ELIZABETH_I: BiographicalPerson = {
  id: 'elizabeth_i',
  label: 'Elizabeth I',
  type: 'person',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'courtly_maneuverings',
    'empire',
    'navigation',
  ],
  dateStart: '1533',
  dateEnd: '1603',
  description:
    'Consulted Dee at her accession (1558–59) on coronation date. Royal visits documented; specific audiences plausible but reconstructed. Asked him to interpret the comet at Windsor. Provided patronage but never settled payments or endowment. The patron who visits and does not pay.',
  sources: ['Parry 48–58', 'Sherman 56–80'],
  roles: ['patron', 'client', 'intellectual_advisor'],
  historicalFaction: 'elizabeth',
  relationship: 'Patron; intellectual consultant on astrology and navigation.',
  relatedEntries: ['dee', 'elizabeth_accession_1558'],
};

export const CECIL_BURGHLEY: BiographicalPerson = {
  id: 'cecil_burghley',
  label: 'William Cecil, Lord Burghley',
  type: 'person',
  historicalStatus: 'documented',
  themes: ['relationships', 'empire', 'courtly_maneuverings', 'navigation'],
  dateStart: '1520',
  dateEnd: '1598',
  description:
    'Elizabeth\'s chief minister. Bought navigation expertise and intelligence from Dee. Backed Frobisher\'s expedition via the *General and Rare Memorials* (1576–77). Dee\'s relationship with Burghley was instrumental: utility over affection.',
  sources: ['Sherman 277–394', 'Parry 100–151'],
  roles: ['patron', 'factional_leader'],
  historicalFaction: 'burghley',
  relationship:
    'Patron through instrumental utility (navigation, intelligence, imperial advice).',
  relatedEntries: ['dee', 'general_and_rare_memorials'],
};

export const LEICESTER: BiographicalPerson = {
  id: 'leicester',
  label: 'Robert Dudley, Earl of Leicester',
  type: 'person',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'occult_philosophy',
    'courtly_maneuverings',
    'continental_connections',
  ],
  dateStart: '1532',
  dateEnd: '1588',
  description:
    'Protestant courtier; leader of the Sidney/Leicester intellectual circle at Greenwich. Sympathetic to Dee\'s occult philosophy. Center of continental Protestant networks. The faction more aligned with Dee\'s intellectual project than Cecil\'s.',
  sources: ['Parry 100–151', 'PLAUSIBLE — Sidney/Leicester circle attested'],
  roles: ['patron', 'intellectual_sympathizer', 'factional_leader'],
  historicalFaction: 'leicester',
  relationship:
    'Patron through intellectual sympathy; represents Hermetic/occult aligned faction.',
  relatedEntries: ['dee', 'greenwich_network', 'philip_sidney'],
};

export const WALSINGHAM: BiographicalPerson = {
  id: 'walsingham',
  label: 'Francis Walsingham',
  type: 'person',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'courtly_maneuverings',
    'security',
    'continental_connections',
  ],
  dateStart: '1530',
  dateEnd: '1590',
  description:
    'Elizabeth\'s intelligence chief. Principal Secretary and neighbour at Barn Elms. Handled Dee\'s calendar advice in 1583; his agents reported on Dee abroad. Cipher work for him is plausible, not documented. Gateway to Dutch Protestant networks and Spanish intelligence operations. Walsingham\'s network provided both opportunity and danger.',
  sources: ['Parry 138–151', 'Sherman 220–240'],
  roles: ['patron', 'intelligence_chief', 'factional_leader'],
  historicalFaction: 'walsingham',
  relationship:
    'Recruiter for intelligence and cryptography work; patron via utility and danger.',
  relatedEntries: ['dee', 'cryptography_work', 'intelligence_encounters'],
};

export const ALBERT_LASKI: BiographicalPerson = {
  id: 'albert_laski',
  label: 'Albert Łaski',
  type: 'person',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'continental_connections',
    'occult_philosophy',
    'empire',
  ],
  dateStart: '1550',
  dateEnd: '1605',
  description:
    'Polish nobleman; glittering, indebted, door to the Continent. Arrived 1583; recruited Dee for the continental venture. Parry: the departure was prophecy + dynastic ambition. Gate to Rudolf II and central European patronage.',
  sources: ['Parry 183–200', 'Harkness 199–213'],
  roles: ['contact', 'patron', 'guide'],
  relationship:
    'Continental contact who triggered the career transition; gateway to Rudolf and Prague.',
  relatedEntries: ['dee', 'continental_departure_1583', 'prague_period'],
};

export const PHILIP_SIDNEY: BiographicalPerson = {
  id: 'philip_sidney',
  label: 'Philip Sidney',
  type: 'person',
  historicalStatus: 'plausible',
  themes: [
    'relationships',
    'occult_philosophy',
    'mathematical_authority',
    'continental_connections',
  ],
  dateStart: '1554',
  dateEnd: '1586',
  description:
    'Poet, courtier, Protestant Hermetic network leader. Part of the Sidney/Leicester circle at Greenwich. Connected to continental Hermetic and Protestant networks. Specific meetings PLAUSIBLE; Sidney circle ATTESTED.',
  sources: [
    'PLAUSIBLE — Sidney/Leicester circle attested',
    'Parry 100–151',
  ],
  roles: ['contact', 'intellectual_peer', 'network_center'],
  relationship:
    'Intellectual peer in the Leicester circle; gates to continental networks.',
  relatedEntries: ['leicester', 'greenwich_network'],
};

export const VINCENT_MURPHYN: BiographicalPerson = {
  id: 'vincent_murphyn',
  label: 'Vincent Murphyn',
  type: 'person',
  historicalStatus: 'documented',
  themes: ['tactlessness', 'security', 'reputation', 'business_ventures'],
  dateStart: '1550',
  dateEnd: '1590',
  description:
    'Forger and slanderer. Two-decade campaign against Dee\'s reputation (c. 1560s–80). Slanders outlived every rebuttal. Dee\'s inability to neutralize him is the repeated reputation drain. Model for the reputation pressure mechanic.',
  sources: ['Parry 87–109'],
  roles: ['rival', 'forger'],
  relationship:
    'Persistent rival whose slanders damage reputation repeatedly.',
  connectedThemes: ['security', 'courtly_maneuverings'],
  relatedEntries: ['dee', 'reputation_pressure', 'murphyn_slanders'],
};

export const JOHN_PRESTALL: BiographicalPerson = {
  id: 'john_prestall',
  label: 'John Prestall',
  type: 'person',
  historicalStatus: 'documented',
  themes: ['business_ventures', 'alchemy', 'tactlessness', 'relationships'],
  dateStart: '1540',
  dateEnd: '1590',
  description:
    'Rival alchemist. Made bolder promises than Dee and was rewarded for them by patrons. Represents the threat from more aggressive practitioners and the cost of Dee\'s scrupulousness.',
  sources: ['Parry 92–114'],
  roles: ['rival', 'alchemist'],
  relationship:
    'Rival who threatened Dee\'s patronage through bolder (possibly fraudulent) promises.',
  relatedEntries: ['dee'],
};

export const RUDOLPH_II: BiographicalPerson = {
  id: 'rudolph_ii',
  label: 'Rudolf II, Holy Roman Emperor',
  type: 'person',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'occult_philosophy',
    'continental_connections',
    'empire',
  ],
  dateStart: '1552',
  dateEnd: '1612',
  description:
    'Holy Roman Emperor. One documented audience with Dee; courteous refusal of employment. Central European patron of alchemy and occult sciences. Gateway to the Prague period.',
  sources: ['Harkness 20–37', 'Parry 226–238'],
  roles: ['potential_patron', 'imperial_figure'],
  historicalFaction: 'continentalCourts',
  relationship: 'One audience; insufficient patronage for settlement.',
  relatedEntries: ['prague_period'],
};

export const MURAD_III: BiographicalPerson = {
  id: 'murad_iii',
  label: 'Murad III, Ottoman Sultan',
  type: 'person',
  historicalStatus: 'counterfactual',
  themes: [
    'occult_philosophy',
    'empire',
    'business_ventures',
    'continental_connections',
  ],
  dateStart: '1546',
  dateEnd: '1595',
  description:
    'Ottoman Sultan (r. 1574–95). Licensed counterfactual patron. Sufi initiate devoted to oneiromancy, astrology, talismanry. Reign spanned Islamic millennium (1000 AH, 1591–92 CE). Court where Dee\'s profile would be patronage-worthy rather than prosecutable. Never met Dee historically; Melvin-Koushki counterfactual argues he represents an alternate patronage path.',
  sources: ['M-K 2021', 'COUNTERFACTUAL'],
  roles: ['counterfactual_patron'],
  historicalFaction: 'continentalCourts',
  relationship:
    'Never met; Melvin-Koushki counterfactual: the eastern patron whose court would value Dee\'s exact profile.',
  connectedThemes: ['alchemy'],
  relatedEntries: ['book_of_soyga_doc'],
};

// =============================================================================
// EVENTS
// =============================================================================

export const DEE_BIRTH: BiographicalEvent = {
  id: 'dee_birth',
  label: 'Birth in London',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['relationships', 'empire'],
  dateStart: '1527-07-13',
  description:
    'Born 13 July 1527, London. Father Rowland Dee, mercer and gentleman sewer at Henry VIII\'s court. Welsh royal descent claim (Rhodri the Great) — LEGEND — informed later imperial self-fashioning.',
  sources: ['Parry 23–27', 'Harkness 26–28'],
  consequence:
    'Welsh descent narrative and father\'s court connections established foundation for Dee\'s later imperial ambitions.',
  relatedEntries: ['dee'],
};

export const CAMBRIDGE_1542: BiographicalEvent = {
  id: 'cambridge_1542',
  label: 'St John\'s College, Cambridge',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['mathematical_authority', 'relationships'],
  dateStart: '1542',
  description:
    'Entered St John\'s College, Cambridge. Founding fellow of Trinity College 1546. Mathematics and astronomy studies origin. First patronage pattern established.',
  sources: ['Parry 29–35'],
  consequence:
    'Mathematical foundation and Cambridge network became the basis for later continental reputation.',
  relatedEntries: ['dee'],
};

export const LOUVAIN_PERIOD: BiographicalEvent = {
  id: 'louvain_period',
  label: 'Louvain & Continental Studies (1548–1550)',
  type: 'event',
  historicalStatus: 'documented',
  themes: [
    'mathematical_authority',
    'continental_connections',
    'navigation',
    'relationships',
  ],
  dateStart: '1548',
  dateEnd: '1550',
  description:
    'Studied under Gemma Frisius and Mercator at Louvain. Acquired instruments, globes, and mathematical authority. Parry\'s framing: mathematics becomes practical technology of service. This period is why Dee starts the game with instruments and continental contacts.',
  sources: ['Parry 35–48', 'Sherman 56–80'],
  consequence:
    'Continental reputation established; instruments acquired; networks with practical mathematicians formed.',
  relatedEntries: ['dee', 'mercator', 'gemma_frisius'],
};

export const PARIS_LECTURES_1550: BiographicalEvent = {
  id: 'paris_lectures_1550',
  label: 'Paris Lectures on Euclid',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['mathematical_authority', 'writing', 'publishing'],
  dateStart: '1550',
  description:
    'Lectured on Euclid in Paris, establishing continental mathematical reputation early in career.',
  sources: ['Harkness 28–30'],
  consequence: 'Continental reputation for mathematical expertise established.',
  relatedEntries: ['dee'],
};

export const DEE_ARREST_1555: BiographicalEvent = {
  id: 'dee_arrest_1555',
  label: 'Arrest on Charges of Calculing and Conjuring',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['security', 'occult_philosophy', 'tactlessness'],
  dateStart: '1555',
  description:
    'Arrested under Mary I on charges of "calculing and conjuring." Cleared of treason; held on religion. Parry\'s thesis: magical expertise is simultaneously useful and incriminating. This is the founding paradox of Dee\'s career.',
  sources: ['Parry 48–58'],
  consequence:
    'Established the paradox: magical knowledge is valuable but dangerous. Secrecy mechanic origin.',
  relatedEntries: ['dee', 'bonner_household'],
};

export const BONNER_HOUSEHOLD: BiographicalEvent = {
  id: 'bonner_household',
  label: 'Remanded to Bishop Edmund Bonner\'s Household',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['security', 'relationships', 'tactlessness'],
  dateStart: '1555',
  description:
    'After arrest, remanded to Bishop Edmund Bonner\'s household. Nature DISPUTED — collaboration, survival strategy, or conviction. Game writes the dispute without resolving it.',
  sources: ['Parry 48–58', 'DISPUTED'],
  alternatives: [
    'Collaboration with Bonner on magical/theological work',
    'Survival strategy under hostile regime',
    'Genuine conviction and conversion',
  ],
  relatedEntries: ['dee', 'security_mechanic'],
};

export const FOXE_ACTS_AND_MONUMENTS: BiographicalEvent = {
  id: 'foxe_acts_1555',
  label: 'Episode in Foxe\'s Acts and Monuments',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['security', 'reputation', 'theology'],
  dateStart: '1555',
  description:
    'Dee appears in John Foxe\'s *Acts and Monuments* (Protestant martyrology), marking public knowledge of his arrest. 36 corpus references.',
  sources: ['Parry 48–58', '36 corpus hits'],
  consequence:
    'Public reputation for magical expertise and controversy established early.',
  relatedEntries: ['dee'],
};

export const ELIZABETH_ACCESSION_1558: BiographicalEvent = {
  id: 'elizabeth_accession_1558',
  label: 'Consulted at Elizabeth\'s Accession',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['relationships', 'occult_philosophy', 'courtly_maneuverings'],
  dateStart: '1558',
  dateEnd: '1559',
  description:
    'Consulted by Elizabeth on coronation date. First documented royal engagement. Specific audience plausible but reconstructed. Gates the elizabeth faction initially.',
  sources: ['Parry 48–58'],
  consequence:
    'Established Dee\'s value to Elizabeth on astrological and occult matters.',
  encounterId: 'royal_consultation_encounter',
  relatedEntries: ['elizabeth_i', 'dee'],
};

export const MORTLAKE_LIBRARY_FOUNDATION: BiographicalEvent = {
  id: 'mortlake_library_foundation',
  label: 'Mortlake Library Founded and Built',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['household', 'mathematical_authority', 'writing'],
  dateStart: '1560',
  dateEnd: '1580',
  description:
    'Over the 1560s–1570s, Dee assembled what Sherman calls a "living institution" — not just a collection but an active research base. The library was his household and his intellectual project. Sherman: reading and writing as political act.',
  sources: ['Sherman 56–80'],
  consequence:
    'Mortlake became the intellectual center of Dee\'s work and the foundation of his household system.',
  relatedEntries: ['dee', 'mortlake_library', 'jane_dee'],
};

export const PROPAEDEUMATA: BiographicalEvent = {
  id: 'propaedeumata_1558',
  label: 'Propaedeumata Aphoristica Published',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'mathematical_authority', 'writing'],
  dateStart: '1558',
  description:
    'Published *Propaedeumata Aphoristica*, outlining the mathematical basis of natural magic. Early synthesis of mathematics and occult philosophy.',
  sources: ['Harkness 98–102'],
  consequence:
    'Established Dee\'s intellectual synthesis of mathematics and magic in print.',
  relatedEntries: ['propaedeumata_book', 'dee'],
};

export const MONAS_HIEROGLYPHICA_1564: BiographicalEvent = {
  id: 'monas_1564',
  label: 'Monas Hieroglyphica Published in Antwerp',
  type: 'event',
  historicalStatus: 'documented',
  themes: [
    'occult_philosophy',
    'mathematical_authority',
    'publishing',
    'continental_connections',
  ],
  dateStart: '1564',
  description:
    'Published *Monas Hieroglyphica* in Antwerp via typographer Silvius, dedicated to Maximilian II. Central to his occult synthesis: alchemical (Parry), geometrical cabala (Walton), or Pythagorean/Trithemian number symbolism (Clucas). Continental influence through Khunrath, Libavius, Rosicrucianism.',
  sources: [
    'Harkness 76–90',
    'Clucas *Ambix* 64.2',
    'DISPUTED narrowly (Parry v. Clucas)',
  ],
  consequence:
    'Published Dee\'s most important occult synthesis. Influenced continental occult movements.',
  relatedEntries: ['monas_book', 'dee'],
};

export const MURPHYN_SLANDERS_START: BiographicalEvent = {
  id: 'murphyn_slanders',
  label: 'Vincent Murphyn Slander Campaign',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['reputation', 'tactlessness', 'security'],
  dateStart: '1560',
  dateEnd: '1580',
  description:
    'Vincent Murphyn begins forging and spreading slanderous works against Dee. The campaign lasts two decades and outlives every rebuttal. Reputation pressure mechanic: Dee cannot eliminate this threat.',
  sources: ['Parry 87–109'],
  consequence:
    'Persistent reputation drain. Repeated failure to neutralize threat becomes mechanical cost.',
  relatedEntries: ['dee', 'vincent_murphyn'],
};

export const MATHEMATICAL_PREFACE_1570: BiographicalEvent = {
  id: 'mathematical_preface_1570',
  label: '"Mathematicall Praeface" to Billingsley\'s Euclid',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['mathematical_authority', 'writing', 'navigation', 'empire'],
  dateStart: '1570',
  description:
    'Wrote the preface to the first English Euclid (Henry Billingsley translation). Massive essay on the applications of mathematics: navigation, military, navigation, alchemy. Foundation of his imperial and navigational authority.',
  sources: ['Sherman 277–394'],
  consequence:
    'Established Dee\'s authority on navigation and mathematical application to empire.',
  relatedEntries: ['mathematical_preface_book', 'dee'],
};

export const BRYTANNICAE_SYNOPSIS: BiographicalEvent = {
  id: 'brytannicae_1570',
  label: 'Brytannicae Reipublicae Synopsis',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['empire', 'courtly_maneuverings', 'navigation'],
  dateStart: '1570',
  description:
    'Wrote *Synopsis* outlining imperial vision for Britain. Gates to Burghley and Walsingham faction support. Model for imperial ambition as state service.',
  sources: ['Sherman 216–277'],
  consequence:
    'Established Dee\'s visibility to state actors (Cecil, Walsingham) as imperial adviser.',
  relatedEntries: ['dee', 'cecil_burghley', 'walsingham'],
};

export const GENERAL_AND_RARE_MEMORIALS_1576: BiographicalEvent = {
  id: 'general_and_rare_memorials_1576',
  label: 'General and Rare Memorials (Frobisher Program)',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['empire', 'navigation', 'business_ventures', 'courtly_maneuverings'],
  dateStart: '1576',
  dateEnd: '1577',
  description:
    'Published *General and Rare Memorials* on imperial maritime policy and navigation. Backed Frobisher\'s Arctic expedition. Combines real navigation expertise with imperial ambition. Sherman: maritime policy; Parry: occult ambition in code.',
  sources: ['Sherman 277–394', 'Parry 127–138'],
  consequence:
    'Dee\'s imperial vision translated into state project. Navigation authority on display.',
  alternatives: [
    'Reading and real navigation argument (Sherman)',
    'Occult and imperial code (Parry)',
  ],
  relatedEntries: ['dee', 'cecil_burghley', 'frobisher'],
};

export const JANE_MARRIAGE_1578: BiographicalEvent = {
  id: 'jane_marriage',
  label: 'Marries Jane Fromond',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['relationships', 'household'],
  dateStart: '1578',
  description: 'Married Jane Fromond, who would manage Mortlake household.',
  sources: ['CONTEXT'],
  consequence:
    'Jane becomes household manager and intellectual partner throughout remainder of career.',
  relatedEntries: ['jane_dee', 'dee'],
};

export const ANGELIC_SESSIONS_BEGIN: BiographicalEvent = {
  id: 'angelic_sessions_1581',
  label: 'First Surviving Angelic Action with Barnabas Saul',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'relationships', 'security'],
  dateStart: '1581-12-22',
  description:
    'First documented angelic action. Barnabas Saul as scryer. Dee begins systematic angelic communication under eschatological pressure. Gates to the angelic mechanic layer.',
  sources: ['Harkness 35–42'],
  consequence: 'Opens occult_philosophy skill path and eschatological dimension.',
  encounterId: 'barnabas_saul_encounter',
  relatedEntries: ['dee', 'barnabas_saul', 'occult_sessions'],
};

export const KELLEY_ARRIVES_1582: BiographicalEvent = {
  id: 'kelley_arrives_1582',
  label: 'Edward Kelley Arrives as "Talbot"',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'relationships', 'household'],
  dateStart: '1582-03',
  description:
    'Edward Kelley enters Dee\'s household as "Talbot." Becomes principal scryer. Sincerity DISPUTED in scholarship; game takes no position. Jane\'s anger at the scryers is recorded in an erased diary entry of 6 May 1582 (Whitby 24–26).',
  sources: ['Harkness 35–40', '251 daybook hits'],
  consequence:
    'Opens the Kelley partnership. Jane\'s warnings foreshadow the 1587 household crisis.',
  relatedEntries: ['edward_kelley', 'jane_dee', 'household_crisis_1587'],
};

export const BOOK_OF_SOYGA_EVENT: BiographicalEvent = {
  id: 'book_of_soyga_1582',
  label: 'Book of Soyga Put to Angels; Ottoman Thread Visible',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'continental_connections', 'empire'],
  dateStart: '1582',
  description:
    'Dee puts the *Book of Soyga* to the angels; they name Michael as expounder. Melvin-Koushki argues the Soyga lore derives from the Bunian-Bistamian corpus popular in Ottoman courts. Ottoman thread is visible from the first sessions.',
  sources: ['Harkness 35–42', 'M-K 2021', '89 corpus hits'],
  consequence:
    'Opens the Ottoman counterfactual thread. If Melvin-Koushki is right, Dee was working with lore from the Ottoman courtly corpus without knowing it.',
  relatedEntries: ['dee', 'book_of_soyga_doc', 'murad_iii'],
};

export const KELLEY_JANE_CONFLICT_1582: BiographicalEvent = {
  id: 'household_warnings_1582',
  label: 'Jane Dee\'s Warnings About Kelley',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['household', 'relationships', 'tactlessness'],
  dateStart: '1582',
  description:
    'Jane Dee\'s resistance to Kelley recorded in daybook. Her warnings about his character and influence foreshadow the 1587 household crisis. Household fault lines appear.',
  sources: ['Harkness 251', 'Fenton day books'],
  consequence:
    'Reveals household tension. Dee\'s ambition (continuing with Kelley) costs household trust.',
  relatedEntries: ['jane_dee', 'edward_kelley', 'household_crisis_1587'],
};

export const HEPTARCHIC_SYSTEM: BiographicalEvent = {
  id: 'heptarchic_system',
  label: 'Heptarchic System — Tables, Seals, Sigillum Dei Aemeth',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'mathematical_authority', 'writing'],
  dateStart: '1582',
  dateEnd: '1583',
  description:
    'Dee and Kelley develop the Heptarchic system: geometric tables, seals, and the Sigillum Dei Aemeth. Mathematical structure of angelic hierarchy. Gates occultPhilosophy skill advancement.',
  sources: ['Harkness 40–44'],
  consequence:
    'Mathematical formalization of angelic system. Dee\'s authority on symbolic synthesis.',
  relatedEntries: ['dee', 'edward_kelley'],
};

export const CALENDAR_REFORM_1582: BiographicalEvent = {
  id: 'calendar_reform_1582',
  label: 'Calendar Reform Dispute — Dee Gives Mathematics; Bishops Refuse',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['theology', 'courtly_maneuverings', 'mathematical_authority'],
  dateStart: '1582',
  description:
    'Dee provides mathematical expertise for calendar reform. Bishops refuse the theological position. Instance of Dee\'s mathematical authority being instrumentally valuable but theologically suspect.',
  sources: ['Parry 170–183'],
  consequence:
    'Demonstrates the limits of Dee\'s influence despite technical expertise. Theological suspicion.',
  relatedEntries: ['dee'],
};

export const LASKI_ARRIVES_1583: BiographicalEvent = {
  id: 'laski_1583',
  label: 'Albert Łaski Arrives',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['relationships', 'continental_connections', 'empire'],
  dateStart: '1583',
  description:
    'Polish nobleman Albert Łaski arrives. Glittering, indebted door to the Continent. Recruits Dee for continental venture. Gate to the career transition.',
  sources: ['Parry 183–200'],
  consequence: 'Triggers the continental departure decision.',
  encounterId: 'career_transition_encounter',
  relatedEntries: ['dee', 'albert_laski', 'continental_departure'],
};

export const CONTINENTAL_DEPARTURE_1583: BiographicalEvent = {
  id: 'continental_departure_1583',
  label: 'Departure with Łaski for the Continent',
  type: 'event',
  historicalStatus: 'documented',
  themes: [
    'continental_connections',
    'empire',
    'occult_philosophy',
    'relationships',
  ],
  dateStart: '1583-09',
  description:
    'Dee and Jane depart with Łaski and Kelley for the Continent. Parry: prophecy + dynastic ambition. Leaves Mortlake and England for the Prague, Vienna, Kraków circuit.',
  sources: ['Parry 183–200'],
  consequence:
    'Opens Act VI and the continental period. Separates from Mortlake base.',
  alternatives: [
    'Pure prophecy (mystical urgency)',
    'Dynastic ambition (imperial calculation)',
    'Patronage seeking (instrumental)',
  ],
  relatedEntries: ['dee', 'prague_period'],
};

// =============================================================================
// DOCUMENTS
// =============================================================================

export const PROPAEDEUMATA_BOOK: BiographicalDocument = {
  id: 'propaedeumata_book',
  label: 'Propaedeumata Aphoristica',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'mathematical_authority', 'writing'],
  dateStart: '1558',
  title: 'Propaedeumata Aphoristica',
  author: 'John Dee',
  dateWritten: '1558',
  publicationStatus: 'published',
  description:
    'Early synthesis of mathematics and natural magic. Outlines the mathematical basis of occult correspondence. Foundation of Dee\'s intellectual project.',
  sources: ['Harkness 98–102'],
  significance:
    'First major publication synthesizing mathematics and occult philosophy.',
  relatedEntries: ['dee', 'monas_book'],
};

export const MONAS_BOOK: BiographicalDocument = {
  id: 'monas_book',
  label: 'Monas Hieroglyphica',
  type: 'document',
  historicalStatus: 'documented',
  themes: [
    'occult_philosophy',
    'mathematical_authority',
    'publishing',
    'continental_connections',
  ],
  dateStart: '1564',
  title: 'Monas Hieroglyphica',
  author: 'John Dee',
  dateWritten: '1564',
  publicationStatus: 'published',
  description:
    'Published in Antwerp, dedicated to Maximilian II. Geometric symbol synthesizing mathematics, alchemy, cabala, and cosmology. Central work. Continental influence through Khunrath, Libavius, Rosicrucian movements.',
  sources: ['Harkness 76–90', 'Clucas *Ambix* 64.2'],
  significance:
    'Most important occult synthesis. Subject of three major interpretive schools (alchemical, geometrical-cabalistic, Pythagorean-Trithemian).',
  relatedEntries: ['dee'],
};

export const MATHEMATICAL_PREFACE_BOOK: BiographicalDocument = {
  id: 'mathematical_preface_book',
  label: 'Mathematical Preface to Billingsley\'s Euclid',
  type: 'document',
  historicalStatus: 'documented',
  themes: [
    'mathematical_authority',
    'navigation',
    'empire',
    'writing',
    'publishing',
  ],
  dateStart: '1570',
  title: 'Preface to the first English Euclid',
  author: 'John Dee (preface)',
  dateWritten: '1570',
  publicationStatus: 'published',
  description:
    'Massive essay on applications of mathematics to navigation, military arts, fortification, and empire. Foundation of Dee\'s navigational authority. Every aspect of applied mathematics for state service.',
  sources: ['Sherman 277–394'],
  significance:
    'Established Dee\'s public authority on mathematical application to imperial and navigational projects.',
  relatedEntries: ['dee', 'navigation_theme'],
};

export const BRYTANNICAE_BOOK: BiographicalDocument = {
  id: 'brytannicae_book',
  label: 'Brytannicae Reipublicae Synopsis',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['empire', 'navigation', 'courtly_maneuverings', 'writing'],
  dateStart: '1570',
  title: 'Brytannicae Reipublicae Synopsis',
  author: 'John Dee',
  dateWritten: '1570',
  publicationStatus: 'published',
  description:
    'Imperial vision for Britain. Navigation, colonial expansion, state service. Gates to Burghley and Walsingham factions.',
  sources: ['Sherman 216–277'],
  significance:
    'Model for imperial ambition as state service. Attracts Burghley and Walsingham.',
  relatedEntries: ['dee', 'cecil_burghley', 'walsingham'],
};

export const GENERAL_AND_RARE_MEMORIALS_BOOK: BiographicalDocument = {
  id: 'general_and_rare_memorials_book',
  label: 'General and Rare Memorials Pertayning to the Perfect Arte of Navigation',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['navigation', 'empire', 'business_ventures', 'courtly_maneuverings'],
  dateStart: '1576',
  title: 'General and Rare Memorials...',
  author: 'John Dee',
  dateWritten: '1576–77',
  publicationStatus: 'published',
  description:
    'On imperial maritime policy and navigation. Backed Frobisher\'s Arctic expedition. DISPUTED interpretation: Sherman (real navigation) vs. Parry (occult ambition in code).',
  sources: ['Sherman 277–394', 'Parry 127–138'],
  significance:
    'Peak of Dee\'s imperial authority. Demonstrates both mathematical expertise and ambitious patronage-seeking.',
  relatedEntries: ['dee'],
};

export const MONAS_MANUSCRIPT: BiographicalDocument = {
  id: 'monas_manuscript',
  label: 'Manuscript Copies and Annotations of Monas Hieroglyphica',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'writing', 'manuscript_knowledge'],
  dateStart: '1564',
  publicationStatus: 'manuscript',
  description:
    'Dee\'s own annotated copies and letters about the Monas. Evidence of his engagement with interpreters and critics.',
  sources: ['DeeChunks 89 hits', 'BL MSS'],
  significance:
    'Shows Dee\'s intellectual dialogue on his most important work.',
  relatedEntries: ['monas_book'],
};

export const DIARIES_AND_DAYBOOKS: BiographicalDocument = {
  id: 'diaries_daybooks',
  label: 'Diaries and Daybooks',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['household', 'occult_philosophy', 'relationships', 'security'],
  dateStart: '1575',
  dateEnd: '1609',
  publicationStatus: 'lost_but_referenced',
  description:
    'Dee\'s personal diaries, largely lost but extensively quoted in scholarship and Fenton\'s transcriptions. 1,464 daybook entry summaries in DeeChunks. Record of daily activities, angelic sessions, household life, and personal crises.',
  sources: ['Harkness 250–267', 'DeeChunks 1,464 entries'],
  significance:
    'Primary source for household dynamics, occult sessions, and personal decision-making.',
  connectedThemes: ['manuscript_knowledge'],
  relatedEntries: ['dee', 'mortlake_library'],
};

export const BOOK_OF_SOYGA_DOC: BiographicalDocument = {
  id: 'book_of_soyga_doc',
  label: 'Book of Soyga (Tabula Soyga)',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'continental_connections', 'empire'],
  dateStart: '1500',
  publicationStatus: 'lost_but_referenced',
  description:
    'Medieval magical text; Dee put it to the angels in 1582. Michael named as expounder. Melvin-Koushki argues its lore derives from Bunian-Bistamian corpus popular in Ottoman courts. Ottoman thread emerges from this text.',
  sources: ['Harkness 35–42', 'M-K 2021', '89 corpus hits'],
  significance:
    'Gateway to Ottoman magical currents. Opens the counterfactual eastward path.',
  relatedEntries: ['dee', 'book_of_soyga_1582', 'murad_iii'],
};

export const COMPENDIOUS_REHEARSAL: BiographicalDocument = {
  id: 'compendious_rehearsal',
  label: 'Compendious Rehearsal',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['reputation', 'courtly_maneuverings', 'security'],
  dateStart: '1592',
  publicationStatus: 'published',
  description:
    'Testimony before royal commissioners in 1592. Dee\'s attempt to recover reputation after continental return. Public defense against decades of slander.',
  sources: ['Parry 138–151'],
  significance:
    'Reputation recovery attempt. Shows the persistence of slander against him.',
  relatedEntries: ['dee'],
};

export const APOLOGETICAL_LETTER: BiographicalDocument = {
  id: 'apologetical_letter',
  label: 'Apologetical Letter',
  type: 'document',
  historicalStatus: 'documented',
  themes: ['reputation', 'security', 'writing'],
  dateStart: '1599',
  publicationStatus: 'published',
  description:
    'Published defense against accusations of sorcery and heresy. Dee\'s continued battle with public reputation.',
  sources: ['Sherman', 'Parry 226–238'],
  significance: 'Final reputation defense in print.',
  relatedEntries: ['dee'],
};

// =============================================================================
// PLACES
// =============================================================================

export const MORTLAKE: BiographicalPlace = {
  id: 'mortlake',
  label: 'Mortlake',
  type: 'place',
  historicalStatus: 'documented',
  themes: [
    'household',
    'relationships',
    'occult_philosophy',
    'mathematical_authority',
  ],
  location: 'Richmond, Surrey, England',
  description:
    'Dee\'s primary residence from 1570s onward. Home of his household, library, and laboratory. Not just a house but a living institution and the center of his intellectual work. "The intellectual household as a persistent base" (FTLDee design).',
  sources: ['Sherman 56–80', 'Parry passim'],
  significance:
    'Dee\'s home base. The foundation of his career as household-based intellectual.',
  inGame: true,
  relatedEntries: ['dee', 'jane_dee', 'mortlake_library'],
};

export const GREENWICH: BiographicalPlace = {
  id: 'greenwich',
  label: 'Greenwich',
  type: 'place',
  historicalStatus: 'plausible',
  themes: [
    'relationships',
    'occult_philosophy',
    'courtly_maneuverings',
    'continental_connections',
  ],
  location: 'Greenwich, London, England',
  description:
    'Court complex and gathering place for the Sidney/Leicester intellectual circle. Meetings around mathematics, navigation, and Hermetic philosophy. Specific encounters PLAUSIBLE; circle ATTESTED.',
  sources: ['Parry 100–151'],
  significance:
    'Node of the Leicester faction and Hermetic-aligned intellectual network.',
  inGame: true,
  relatedEntries: ['leicester', 'philip_sidney'],
};

export const WINDSOR: BiographicalPlace = {
  id: 'windsor',
  label: 'Windsor Castle',
  type: 'place',
  historicalStatus: 'documented',
  themes: ['courtly_maneuverings', 'relationships'],
  location: 'Windsor, Berkshire, England',
  description:
    'Royal residence where Dee was asked to interpret the comet. Court audience location. PLAUSIBLE specific encounter; royal consultations ATTESTED.',
  sources: ['PLAUSIBLE', 'Parry 100–151'],
  significance: 'Royal court location; gates to Elizabeth faction.',
  inGame: true,
  relatedEntries: ['elizabeth_i'],
};

export const BARN_ELMS: BiographicalPlace = {
  id: 'barn_elms',
  label: 'Barn Elms',
  type: 'place',
  historicalStatus: 'documented',
  themes: ['security', 'courtly_maneuverings', 'relationships'],
  location: 'Barn Elms, London, England',
  description:
    'Walsingham\'s headquarters. Center of intelligence operations and cryptographic work. Location of sensitive political activity.',
  sources: ['Parry 138–151'],
  significance: 'Walsingham faction and intelligence work location.',
  inGame: true,
  relatedEntries: ['walsingham'],
};

export const LONDON: BiographicalPlace = {
  id: 'london',
  label: 'London',
  type: 'place',
  historicalStatus: 'documented',
  themes: [
    'relationships',
    'business_ventures',
    'publishing',
    'courtly_maneuverings',
  ],
  location: 'London, England',
  description:
    'City market, printer contacts, scholarly networks, court access. General node for book acquisition and merchant contact.',
  sources: ['Sherman passim'],
  significance: 'Market and network hub.',
  inGame: true,
  relatedEntries: ['dee'],
};

export const LOUVAIN: BiographicalPlace = {
  id: 'louvain',
  label: 'Louvain',
  type: 'place',
  historicalStatus: 'documented',
  themes: [
    'mathematical_authority',
    'continental_connections',
    'relationships',
  ],
  location: 'Louvain (Leuven), Spanish Netherlands',
  description:
    'Continental center of mathematical learning. Dee studied under Gemma Frisius and Mercator, acquiring instruments and reputation.',
  sources: ['Parry 35–48'],
  significance:
    'Origin of Dee\'s continental network and mathematical authority.',
  relatedEntries: ['dee', 'gemma_frisius', 'mercator'],
};

export const PRAGUE: BiographicalPlace = {
  id: 'prague',
  label: 'Prague',
  type: 'place',
  historicalStatus: 'documented',
  themes: [
    'occult_philosophy',
    'continental_connections',
    'empire',
    'relationships',
  ],
  location: 'Prague, Bohemia',
  description:
    'Rudolf II\'s capital. Center of alchemical and occult patronage. Dee spent time here seeking patronage. One documented audience with Rudolf; insufficient settlement.',
  sources: ['Harkness 20–37', 'Parry 200–226'],
  significance:
    'Continental patronage destination. Center of occult and alchemical work.',
  relatedEntries: ['rudolph_ii'],
};

export const CONSTANTINOPLE: BiographicalPlace = {
  id: 'constantinople',
  label: 'Constantinople',
  type: 'place',
  historicalStatus: 'counterfactual',
  themes: ['empire', 'occult_philosophy', 'continental_connections'],
  location: 'Constantinople (Istanbul), Ottoman Empire',
  description:
    'COUNTERFACTUAL: never visited. Melvin-Koushki counterfactual patronage path would lead through Ottoman courts. Murad III\'s court as alternate patron to Rudolf\'s.',
  sources: ['M-K 2021', 'COUNTERFACTUAL'],
  significance:
    'Ottoman counterfactual destination. Represents the eastward path not taken historically.',
  relatedEntries: ['murad_iii'],
};

// =============================================================================
// INSTITUTIONS
// =============================================================================

export const MORTLAKE_LIBRARY: BiographicalInstitution = {
  id: 'mortlake_library',
  label: 'Mortlake Library',
  type: 'institution',
  historicalStatus: 'documented',
  themes: ['household', 'mathematical_authority', 'writing'],
  founded: 1560,
  type_: 'household',
  description:
    'Not a collection but a "living institution." Assembled over 1560s–1570s with thousands of volumes, manuscripts, instruments, and alchemical apparatus. Sherman: "reading and writing as political act." Center of Dee\'s household and intellectual project. Despoiled during his continental absence; books sold after his death.',
  sources: ['Sherman 56–80'],
  significance:
    'Foundation of Dee\'s career as household-based intellectual. Models the library system in the game.',
  relatedEntries: ['dee', 'mortlake', 'jane_dee'],
};

export const TRINITY_COLLEGE_CAMBRIDGE: BiographicalInstitution = {
  id: 'trinity_college',
  label: 'Trinity College, Cambridge',
  type: 'institution',
  historicalStatus: 'documented',
  themes: ['mathematical_authority', 'relationships'],
  founded: 1546,
  type_: 'college',
  description:
    'Founding fellow of Trinity at age 19 (1546). Launched his academic career and patronage network. First institutional base.',
  sources: ['Parry 29–35'],
  significance:
    'Origins of Dee\'s mathematical training and first patronage relationships.',
  relatedEntries: ['dee'],
};

export const MANCHESTER_COLLEGE: BiographicalInstitution = {
  id: 'manchester_college',
  label: 'Christ\'s College, Manchester',
  type: 'institution',
  historicalStatus: 'documented',
  themes: ['relationships', 'courtly_maneuverings'],
  founded: 1595,
  type_: 'college',
  description:
    'Appointed Warden in 1595. Position that was "employment and exile" simultaneously. Never the endowed position he sought. Located far from London and court.',
  sources: ['Parry 258–273'],
  significance:
    'Late-career withdrawal. Represents the career collapse path.',
  relatedEntries: ['dee'],
};

export const ELIZABETH_COURT: BiographicalInstitution = {
  id: 'elizabeth_court',
  label: 'Elizabeth\'s Court',
  type: 'institution',
  historicalStatus: 'documented',
  themes: ['relationships', 'courtly_maneuverings'],
  type_: 'court',
  description:
    'Primary patronage center. Elizabeth visited Dee; consulted him on astrology, navigation, and imperial matters. Never provided settled funding.',
  sources: ['Parry passim', 'Sherman passim'],
  significance:
    'Primary patron faction; represents the royal relationship without security.',
  relatedEntries: ['elizabeth_i', 'dee'],
};

// =============================================================================
// BUSINESS VENTURES
// =============================================================================

export const FROBISHER_EXPEDITION: BiographicalBusinessVenture = {
  id: 'frobisher_expedition',
  label: 'Frobisher\'s Arctic Expedition',
  type: 'business_venture',
  historicalStatus: 'documented',
  themes: ['navigation', 'empire', 'business_ventures'],
  outcome: 'abandoned',
  dateStart: '1576',
  dateEnd: '1578',
  description:
    'Dee provided navigational and imperial advice for Martin Frobisher\'s Arctic voyages in search of the Northwest Passage. Published *General and Rare Memorials* to support the project. Project ultimately failed to discover the passage; Frobisher\'s resources diverted to other ventures.',
  sources: ['Sherman 277–394'],
  participants: ['dee', 'martin_frobisher', 'cecil_burghley'],
  investment: 'Dee\'s time and reputation; Burghley\'s patronage',
  return: 'None; navigational authority gained',
  consequence:
    'Demonstrated Dee\'s imperial ambitions; showed limitations of patronage power.',
  relatedEntries: ['dee', 'general_and_rare_memorials_book'],
};

export const PRINTING_VENTURES: BiographicalBusinessVenture = {
  id: 'printing_ventures',
  label: 'Printing and Publishing Ventures',
  type: 'business_venture',
  historicalStatus: 'documented',
  themes: ['publishing', 'business_ventures', 'courtly_maneuverings'],
  outcome: 'ongoing',
  description:
    'Multiple attempts to publish and distribute his works. Worked with various printers across Europe. Monas Hieroglyphica published through Silvius in Antwerp. The Mathematicall Praeface in Henry Billingsley\'s English Euclid, printed by John Day in London. Repeated efforts to build reputation through print.',
  sources: ['Sherman 56–80', 'Parry passim'],
  consequence:
    'Established Dee\'s intellectual authority in print; scattered across European publishing centers.',
  relatedEntries: ['dee', 'monas_book', 'mathematical_preface_book'],
};

export const ALCHEMY_VENTURES: BiographicalBusinessVenture = {
  id: 'alchemy_ventures',
  label: 'Alchemical Projects and Patronage-Seeking',
  type: 'business_venture',
  historicalStatus: 'documented',
  themes: ['occult_philosophy', 'business_ventures', 'alchemy'],
  outcome: 'failure',
  dateStart: '1570',
  dateEnd: '1605',
  description:
    'Pursued alchemical knowledge and promised transmutation. Never achieved transmutation. Faced competition from bolder practitioners like John Prestall. Parry: the failed promises are the business story.',
  sources: ['Parry 92–114'],
  consequence:
    'Demonstration of limits of magical knowledge as business model.',
  relatedEntries: ['dee', 'john_prestall'],
};

// Export all entries for database
export const ALL_BIOGRAPHICAL_ENTRIES: AnyBiographicalEntry[] = [
  // People
  DEE,
  JANE_DEE,
  EDWARD_KELLEY,
  ELIZABETH_I,
  CECIL_BURGHLEY,
  LEICESTER,
  WALSINGHAM,
  ALBERT_LASKI,
  PHILIP_SIDNEY,
  VINCENT_MURPHYN,
  JOHN_PRESTALL,
  RUDOLPH_II,
  MURAD_III,
  // Events
  DEE_BIRTH,
  CAMBRIDGE_1542,
  LOUVAIN_PERIOD,
  PARIS_LECTURES_1550,
  DEE_ARREST_1555,
  BONNER_HOUSEHOLD,
  FOXE_ACTS_AND_MONUMENTS,
  ELIZABETH_ACCESSION_1558,
  MORTLAKE_LIBRARY_FOUNDATION,
  PROPAEDEUMATA,
  MONAS_HIEROGLYPHICA_1564,
  MURPHYN_SLANDERS_START,
  MATHEMATICAL_PREFACE_1570,
  BRYTANNICAE_SYNOPSIS,
  GENERAL_AND_RARE_MEMORIALS_1576,
  JANE_MARRIAGE_1578,
  ANGELIC_SESSIONS_BEGIN,
  KELLEY_ARRIVES_1582,
  BOOK_OF_SOYGA_EVENT,
  KELLEY_JANE_CONFLICT_1582,
  HEPTARCHIC_SYSTEM,
  CALENDAR_REFORM_1582,
  LASKI_ARRIVES_1583,
  CONTINENTAL_DEPARTURE_1583,
  // Documents
  PROPAEDEUMATA_BOOK,
  MONAS_BOOK,
  MATHEMATICAL_PREFACE_BOOK,
  BRYTANNICAE_BOOK,
  GENERAL_AND_RARE_MEMORIALS_BOOK,
  MONAS_MANUSCRIPT,
  DIARIES_AND_DAYBOOKS,
  BOOK_OF_SOYGA_DOC,
  COMPENDIOUS_REHEARSAL,
  APOLOGETICAL_LETTER,
  // Places
  MORTLAKE,
  GREENWICH,
  WINDSOR,
  BARN_ELMS,
  LONDON,
  LOUVAIN,
  PRAGUE,
  CONSTANTINOPLE,
  // Institutions
  MORTLAKE_LIBRARY,
  TRINITY_COLLEGE_CAMBRIDGE,
  MANCHESTER_COLLEGE,
  ELIZABETH_COURT,
  // Business Ventures
  FROBISHER_EXPEDITION,
  PRINTING_VENTURES,
  ALCHEMY_VENTURES,
];
