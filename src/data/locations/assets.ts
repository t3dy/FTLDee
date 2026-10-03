/**
 * Location Assets: Buildings, stations, residents, objects, documents, services
 *
 * This layer transforms locations from map nodes into composable historical
 * environments. Each location defines:
 * - Buildings (major structures)
 * - Stations (where crew actually work)
 * - Residents (permanent, seasonal, or transient NPCs)
 * - Objects (instruments, furniture, relics that provide bonuses)
 * - Documents (letters, petitions, catalogues)
 * - Services (what can be transacted)
 * - Reference assets (historical images with provenance)
 * - Audio assets (ambience and period soundscape)
 */

import type {
  LocationBuilding,
  LocationStation,
  LocationResident,
  LocationObject,
  LocationDocument,
  LocationService,
  ReferenceAsset,
  AudioAsset,
} from '../../core/types.js';

// ============================================================================
// MORTLAKE — Dee's Household (1570–1608)
// ============================================================================

export const MORTLAKE_BUILDINGS: LocationBuilding[] = [
  {
    id: 'mortlake_main_house',
    name: 'Main House',
    type: 'structure',
    stationIds: ['mortlake_study', 'mortlake_library', 'mortlake_quarters', 'mortlake_correspondence'],
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_library_wing',
    name: 'Library Wing',
    description: 'The repository of ~4,000 volumes, Dee\'s most valuable possession',
    type: 'wing',
    stationIds: ['mortlake_library'],
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_laboratory',
    name: 'Laboratory',
    description: 'Alchemical apparatus, furnaces, distillation equipment',
    type: 'structure',
    stationIds: ['mortlake_laboratory'],
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_scrying_chamber',
    name: 'Scrying Chamber',
    description: 'Crystal, mirror, Sigillum Dei, Holy Table',
    type: 'chamber',
    stationIds: ['mortlake_scrying_chamber'],
    historicalStatus: 'plausible',
  },
  {
    id: 'mortlake_instrument_room',
    name: 'Instrument Room',
    description: 'Astrolabes, globes, mathematical instruments, demonstration pieces',
    type: 'chamber',
    stationIds: ['mortlake_instrument_room'],
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_scriptorium',
    name: 'Scriptorium',
    description: 'Copying room where manuscripts are transcribed and bound',
    type: 'chamber',
    stationIds: ['mortlake_scriptorium'],
    historicalStatus: 'plausible',
  },
  {
    id: 'mortlake_garden',
    name: 'Garden & Grounds',
    description: 'Thames-front property with botanical specimens and visitor areas',
    type: 'outdoor',
    stationIds: ['mortlake_garden', 'mortlake_visitor_area'],
    historicalStatus: 'documented',
  },
];

export const MORTLAKE_STATIONS: LocationStation[] = [
  {
    id: 'mortlake_library',
    name: 'Library',
    buildingId: 'mortlake_library_wing',
    type: 'library',
    capacity: 2,
    skillBonus: { manuscriptKnowledge: 1, occultPhilosophy: 0.5 },
    description: 'Study among Dee\'s manuscript collection',
  },
  {
    id: 'mortlake_study',
    name: 'Study',
    buildingId: 'mortlake_main_house',
    type: 'study',
    capacity: 1,
    skillBonus: { mathematics: 0.5, naturalPhilosophy: 0.5 },
    description: 'Dee\'s personal workspace with writing desk',
  },
  {
    id: 'mortlake_laboratory',
    name: 'Laboratory',
    buildingId: 'mortlake_laboratory',
    type: 'laboratory',
    capacity: 2,
    skillBonus: { alchemy: 1 },
    description: 'Alchemical operations and material experiments',
  },
  {
    id: 'mortlake_scrying_chamber',
    name: 'Scrying Chamber',
    buildingId: 'mortlake_scrying_chamber',
    type: 'chamber',
    capacity: 1,
    skillBonus: { occultPhilosophy: 1.5, kabbalah: 1 },
    description: 'Angelic communication and scrying work',
  },
  {
    id: 'mortlake_instrument_room',
    name: 'Instrument Room',
    buildingId: 'mortlake_instrument_room',
    type: 'workshop',
    capacity: 1,
    skillBonus: { astronomy: 0.5, mathematics: 1 },
    description: 'Demonstration and calibration of instruments',
  },
  {
    id: 'mortlake_scriptorium',
    name: 'Scriptorium',
    buildingId: 'mortlake_scriptorium',
    type: 'scriptorium',
    capacity: 2,
    skillBonus: { manuscriptKnowledge: 1 },
    description: 'Copying, annotation, and manuscript production',
  },
  {
    id: 'mortlake_correspondence',
    name: 'Correspondence Office',
    buildingId: 'mortlake_main_house',
    type: 'correspondence',
    capacity: 1,
    skillBonus: { courtlyIntelligence: 0.5 },
    description: 'Letter writing and network maintenance',
  },
  {
    id: 'mortlake_garden',
    name: 'Garden',
    buildingId: 'mortlake_garden',
    type: 'garden',
    capacity: 1,
    description: 'Botanical observations and visitor area',
  },
  {
    id: 'mortlake_visitor_area',
    name: 'Visitor Chamber',
    buildingId: 'mortlake_garden',
    type: 'chamber',
    capacity: 2,
    description: 'Demonstrations and patron consultations',
  },
];

export const MORTLAKE_RESIDENTS: LocationResident[] = [
  { characterId: 'john_dee', role: 'permanent', historicalStatus: 'documented' },
  { characterId: 'jane_dee', role: 'permanent', historicalStatus: 'documented' },
  { characterId: 'roger_cooke', role: 'permanent', historicalStatus: 'documented' },
  { characterId: 'kelley', role: 'seasonal', availability: 'if recruited', historicalStatus: 'documented' },
];

export const MORTLAKE_OBJECTS: LocationObject[] = [
  {
    id: 'mortlake_celestial_globe',
    name: 'Celestial Globe',
    category: 'instrument',
    skillBonus: { astronomy: 1 },
    portable: false,
    historicalStatus: 'documented',
    sources: ['Clulee 26–27'],
  },
  {
    id: 'mortlake_terrestrial_globe',
    name: 'Terrestrial Globe',
    category: 'instrument',
    skillBonus: { navigation: 1, cartography: 0.5 },
    portable: false,
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_magnet',
    name: 'Great Magnet',
    category: 'instrument',
    description: 'Dee demonstrated this to visitors as evidence of hidden sympathies in nature',
    skillBonus: { naturalPhilosophy: 1 },
    portable: false,
    historicalStatus: 'documented',
    sources: ['Parry 88'],
  },
  {
    id: 'mortlake_sigillum_dei',
    name: 'Sigillum Dei Aemeth',
    category: 'relic',
    description: 'Dee\'s construction of the seal of God from Agrippa',
    skillBonus: { occultPhilosophy: 2, kabbalah: 1 },
    portable: true,
    historicalStatus: 'documented',
    requiresBook: 'agrippa_occulta',
  },
  {
    id: 'mortlake_holy_table',
    name: 'Holy Table',
    category: 'apparatus',
    description: 'Angelic communication apparatus constructed by Kelley and Dee',
    skillBonus: { occultPhilosophy: 1.5 },
    portable: false,
    historicalStatus: 'documented',
  },
];

export const MORTLAKE_DOCUMENTS: LocationDocument[] = [
  {
    id: 'mortlake_catalogue',
    title: 'Dee\'s Library Catalogue',
    type: 'catalogue',
    description: 'Comprehensive record of Dee\'s manuscript and book collection',
    historicalStatus: 'documented',
    sources: ['BL Cotton TITUS BXXVII'],
  },
  {
    id: 'mortlake_household_accounts',
    title: 'Household Accounts',
    type: 'record',
    description: 'Financial records of the Mortlake household',
    historicalStatus: 'documented',
  },
];

export const MORTLAKE_SERVICES: LocationService[] = [
  {
    id: 'mortlake_research',
    name: 'Concentrated Study',
    type: 'consultation',
    description: 'Focus time in the library or study to advance research',
    historicalStatus: 'plausible',
  },
  {
    id: 'mortlake_copying',
    name: 'Commission a Manuscript Copy',
    type: 'commission',
    description: 'Have Dee or Cooke produce a fair copy or annotation of a manuscript',
    requirements: { rooms: { scriptorium: 1 } },
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_correspondence',
    name: 'Maintain Correspondence Network',
    type: 'consultation',
    description: 'Send letters to patrons and scholars',
    historicalStatus: 'documented',
  },
];

export const MORTLAKE_REFERENCE_ASSETS: ReferenceAsset[] = [
  {
    id: 'agas_map_mortlake',
    title: 'Agas Map of London - Mortlake Detail',
    type: 'map',
    source: 'British Library / Early Modern Maps collection',
    provenance: 'Public domain, Agas 1561',
    year: 1561,
    historicalConfidence: 'documented' as const,
    intendedUses: ['location_overview', 'spatial_context'],
    historicalStatus: 'documented',
  },
  {
    id: 'mortlake_household_drawing',
    title: 'Mortlake Household (Reconstruction)',
    type: 'architecture',
    source: 'Archaeological evidence + contemporary descriptions',
    provenance: 'Reconstruction based on Clulee, Whitby',
    historicalConfidence: 'reconstructed' as const,
    intendedUses: ['building_layout', 'spatial_planning'],
    historicalStatus: 'plausible',
  },
];

export const MORTLAKE_AUDIO_ASSETS: AudioAsset[] = [
  {
    id: 'mortlake_ambience',
    title: 'Mortlake Household Ambience',
    type: 'ambient',
    description: 'Footsteps, quills writing, page turning, fireplace, distant Thames',
    stations: ['mortlake_library', 'mortlake_study', 'mortlake_correspondence'],
    historicalStatus: 'plausible',
  },
  {
    id: 'mortlake_laboratory_sounds',
    title: 'Laboratory Work Sounds',
    type: 'effect',
    description: 'Furnace, alembic, pouring liquids, scales, careful handling',
    stations: ['mortlake_laboratory'],
    historicalStatus: 'plausible',
  },
];

// ============================================================================
// LONDON — Marketplace & Information Hub
// ============================================================================

export const LONDON_BUILDINGS: LocationBuilding[] = [
  {
    id: 'london_pauls',
    name: 'Paul\'s Churchyard',
    description: 'Booksellers, stationers, and print shops',
    type: 'structure',
    stationIds: ['london_bookseller', 'london_stationer'],
    historicalStatus: 'documented',
  },
  {
    id: 'london_printing',
    name: 'Printing Quarter',
    type: 'structure',
    stationIds: ['london_printer', 'london_binder'],
    historicalStatus: 'documented',
  },
  {
    id: 'london_exchange',
    name: 'Royal Exchange',
    description: 'Financial and merchant hub',
    type: 'structure',
    stationIds: ['london_exchange'],
    historicalStatus: 'documented',
  },
  {
    id: 'london_inns',
    name: 'Scholars\' Inns',
    description: 'Lodging and meeting places for traveling scholars',
    type: 'structure',
    stationIds: ['london_inn'],
    historicalStatus: 'documented',
  },
];

export const LONDON_STATIONS: LocationStation[] = [
  {
    id: 'london_bookseller',
    name: 'Bookseller',
    buildingId: 'london_pauls',
    type: 'market',
    capacity: 1,
    skillBonus: { manuscriptKnowledge: 0.5 },
    description: 'Browse rare books and manuscripts',
  },
  {
    id: 'london_stationer',
    name: 'Stationer\'s Shop',
    buildingId: 'london_pauls',
    type: 'market',
    capacity: 1,
    description: 'Purchase paper, ink, binding materials',
  },
  {
    id: 'london_printer',
    name: 'Printer\'s Workshop',
    buildingId: 'london_printing',
    type: 'workshop',
    capacity: 1,
    skillBonus: { navigation: 0.5 },
    description: 'Commission printing of manuscripts',
  },
  {
    id: 'london_binder',
    name: 'Binder\'s Shop',
    buildingId: 'london_printing',
    type: 'workshop',
    capacity: 1,
    description: 'Bind and repair books',
  },
  {
    id: 'london_exchange',
    name: 'Exchange',
    buildingId: 'london_exchange',
    type: 'market',
    capacity: 1,
    skillBonus: { courtlyIntelligence: 0.5 },
    description: 'Financial transactions and merchant news',
  },
  {
    id: 'london_inn',
    name: 'Scholar\'s Inn',
    buildingId: 'london_inns',
    type: 'quarters',
    capacity: 2,
    description: 'Meet traveling scholars and intellectuals',
  },
];

export const LONDON_RESIDENTS: LocationResident[] = [
  // Booksellers and printers are transient/seasonal
  { characterId: 'scholar_network', role: 'transient', historicalStatus: 'documented' },
];

export const LONDON_OBJECTS: LocationObject[] = [
  {
    id: 'london_printing_type',
    name: 'Printing Type Sets',
    category: 'material',
    portable: false,
    historicalStatus: 'documented',
  },
  {
    id: 'london_paper_stock',
    name: 'Paper Stock',
    category: 'material',
    portable: true,
    historicalStatus: 'documented',
  },
];

export const LONDON_SERVICES: LocationService[] = [
  {
    id: 'london_book_acquisition',
    name: 'Acquire a Rare Book',
    type: 'transaction',
    description: 'Purchase rare books from the Paul\'s Churchyard market',
    historicalStatus: 'documented',
  },
  {
    id: 'london_commission_printing',
    name: 'Commission a Printing',
    type: 'commission',
    description: 'Contract a printer to produce an edition of a manuscript',
    costs: { money: 20 },
    historicalStatus: 'documented',
  },
  {
    id: 'london_contact_introduction',
    name: 'Obtain an Introduction',
    type: 'consultation',
    description: 'A scholar introduces you to a foreign correspondent or merchant',
    historicalStatus: 'plausible',
  },
];

export const LONDON_REFERENCE_ASSETS: ReferenceAsset[] = [
  {
    id: 'london_pauls_churchyard',
    title: 'Paul\'s Churchyard (Historical Map)',
    type: 'map',
    source: 'Agas Map of London, 1561',
    provenance: 'Public domain',
    historicalConfidence: 'documented',
    intendedUses: ['location_overview'],
    historicalStatus: 'documented',
  },
];

export const LONDON_AUDIO_ASSETS: AudioAsset[] = [
  {
    id: 'london_marketplace_ambience',
    title: 'London Marketplace Ambience',
    type: 'ambient',
    description: 'Street vendors, crowds, cart wheels, calls of merchants',
    stations: ['london_bookseller', 'london_stationer', 'london_exchange'],
    historicalStatus: 'plausible',
  },
  {
    id: 'london_printing_sounds',
    title: 'Printing Workshop Sounds',
    type: 'effect',
    description: 'Press machinery, ink rolling, hammering, careful handling of type',
    stations: ['london_printer'],
    historicalStatus: 'plausible',
  },
];

// ============================================================================
// GREENWICH PALACE — Royal Court & Intellectual Network
// ============================================================================

export const GREENWICH_BUILDINGS: LocationBuilding[] = [
  {
    id: 'greenwich_palace',
    name: 'Palace Complex',
    type: 'structure',
    stationIds: ['greenwich_presence_chamber', 'greenwich_library', 'greenwich_mathematical_room'],
    historicalStatus: 'documented',
  },
  {
    id: 'greenwich_gardens',
    name: 'Royal Gardens',
    type: 'outdoor',
    stationIds: ['greenwich_courtyard'],
    historicalStatus: 'documented',
  },
];

export const GREENWICH_STATIONS: LocationStation[] = [
  {
    id: 'greenwich_presence_chamber',
    name: 'Presence Chamber',
    buildingId: 'greenwich_palace',
    type: 'audience',
    capacity: 1,
    skillBonus: { courtlyIntelligence: 1 },
    description: 'Formal audience with the Queen and court',
  },
  {
    id: 'greenwich_library',
    name: 'Royal Library',
    buildingId: 'greenwich_palace',
    type: 'library',
    capacity: 1,
    skillBonus: { manuscriptKnowledge: 0.5 },
    description: 'Access to royal book collection',
  },
  {
    id: 'greenwich_mathematical_room',
    name: 'Mathematical Room',
    buildingId: 'greenwich_palace',
    type: 'workshop',
    capacity: 1,
    skillBonus: { mathematics: 1, navigation: 0.5 },
    description: 'Mathematical demonstration and calculation',
  },
  {
    id: 'greenwich_courtyard',
    name: 'Courtyard',
    buildingId: 'greenwich_gardens',
    type: 'courtyard',
    capacity: 2,
    description: 'Informal encounters with courtiers',
  },
];

export const GREENWICH_RESIDENTS: LocationResident[] = [
  { characterId: 'elizabeth', role: 'permanent', historicalStatus: 'documented' },
  { characterId: 'leicester', role: 'seasonal', historicalStatus: 'documented' },
  { characterId: 'sidney', role: 'seasonal', historicalStatus: 'documented' },
];

export const GREENWICH_SERVICES: LocationService[] = [
  {
    id: 'greenwich_mathematical_presentation',
    name: 'Present a Mathematical Demonstration',
    type: 'consultation',
    description: 'Showcase calculations, instruments, or navigation techniques to the court',
    requirements: { skills: { mathematics: 3 } },
    historicalStatus: 'documented',
  },
  {
    id: 'greenwich_royal_petition',
    name: 'Petition the Crown',
    type: 'consultation',
    description: 'Request royal patronage, commission, or letter of introduction',
    historicalStatus: 'documented',
  },
];

export const GREENWICH_REFERENCE_ASSETS: ReferenceAsset[] = [
  {
    id: 'greenwich_palace_architecture',
    title: 'Greenwich Palace (Contemporary Drawing)',
    type: 'architecture',
    source: 'Tudor architectural records',
    provenance: 'Historical documentation',
    historicalConfidence: 'documented',
    intendedUses: ['location_overview', 'building_layout'],
    historicalStatus: 'documented',
  },
];

export const GREENWICH_AUDIO_ASSETS: AudioAsset[] = [
  {
    id: 'greenwich_court_ambience',
    title: 'Court Ceremony Ambience',
    type: 'ambient',
    description: 'Formal announcements, bells, marching guards, rustling formal dress',
    stations: ['greenwich_presence_chamber', 'greenwich_courtyard'],
    historicalStatus: 'plausible',
  },
];

// ============================================================================
// WINDSOR CASTLE — Royal Consultation & Natural Philosophy
// ============================================================================

export const WINDSOR_BUILDINGS: LocationBuilding[] = [
  {
    id: 'windsor_castle',
    name: 'Castle Complex',
    type: 'structure',
    stationIds: ['windsor_throne_room', 'windsor_observatory', 'windsor_library'],
    historicalStatus: 'documented',
  },
];

export const WINDSOR_STATIONS: LocationStation[] = [
  {
    id: 'windsor_throne_room',
    name: 'Throne Room',
    buildingId: 'windsor_castle',
    type: 'audience',
    capacity: 1,
    skillBonus: { courtlyIntelligence: 1 },
    description: 'Formal royal audience',
  },
  {
    id: 'windsor_observatory',
    name: 'Observation Terrace',
    buildingId: 'windsor_castle',
    type: 'observatory',
    capacity: 1,
    skillBonus: { astronomy: 1.5 },
    description: 'Astronomical observation and natural philosophical consultation',
  },
  {
    id: 'windsor_library',
    name: 'Royal Study',
    buildingId: 'windsor_castle',
    type: 'study',
    capacity: 1,
    skillBonus: { naturalPhilosophy: 1 },
    description: 'Consult on natural philosophical matters',
  },
];

export const WINDSOR_RESIDENTS: LocationResident[] = [
  { characterId: 'elizabeth', role: 'permanent', historicalStatus: 'documented' },
];

export const WINDSOR_OBJECTS: LocationObject[] = [
  {
    id: 'windsor_astronomical_tables',
    name: 'Astronomical Tables',
    category: 'instrument',
    skillBonus: { astronomy: 1 },
    portable: false,
    historicalStatus: 'documented',
  },
];

export const WINDSOR_REFERENCE_ASSETS: ReferenceAsset[] = [
  {
    id: 'windsor_castle_architecture',
    title: 'Windsor Castle (16th Century)',
    type: 'architecture',
    source: 'Historical architectural records',
    provenance: 'Documented historical sources',
    historicalConfidence: 'documented',
    intendedUses: ['location_overview'],
    historicalStatus: 'documented',
  },
];

export const WINDSOR_AUDIO_ASSETS: AudioAsset[] = [
  {
    id: 'windsor_formal_ambience',
    title: 'Royal Ceremony Ambience',
    type: 'ambient',
    description: 'Formal announcements, bells, guards, formal court activity',
    stations: ['windsor_throne_room'],
    historicalStatus: 'plausible',
  },
];

// ============================================================================
// BARN ELMS — Walsingham's Estate & Intelligence Center
// ============================================================================

export const BARN_ELMS_BUILDINGS: LocationBuilding[] = [
  {
    id: 'barn_elms_house',
    name: 'Walsingham\'s Residence',
    type: 'structure',
    stationIds: ['barn_elms_study', 'barn_elms_correspondence_room', 'barn_elms_guest_quarters'],
    historicalStatus: 'documented',
  },
  {
    id: 'barn_elms_garden',
    name: 'Garden',
    type: 'outdoor',
    stationIds: ['barn_elms_garden'],
    historicalStatus: 'plausible',
  },
];

export const BARN_ELMS_STATIONS: LocationStation[] = [
  {
    id: 'barn_elms_study',
    name: 'Walsingham\'s Study',
    buildingId: 'barn_elms_house',
    type: 'study',
    capacity: 1,
    skillBonus: { courtlyIntelligence: 1 },
    description: 'Consult with Walsingham on matters of intelligence and politics',
  },
  {
    id: 'barn_elms_correspondence_room',
    name: 'Correspondence Room',
    buildingId: 'barn_elms_house',
    type: 'archive',
    capacity: 1,
    skillBonus: { cryptography: 1, courtlyIntelligence: 0.5 },
    description: 'Coded letters, ciphers, and intelligence reports',
  },
  {
    id: 'barn_elms_guest_quarters',
    name: 'Guest Quarters',
    buildingId: 'barn_elms_house',
    type: 'quarters',
    capacity: 1,
    description: 'Lodging and private consultation',
  },
  {
    id: 'barn_elms_garden',
    name: 'Garden',
    buildingId: 'barn_elms_garden',
    type: 'garden',
    capacity: 1,
    description: 'Discreet outdoor conversation',
  },
];

export const BARN_ELMS_RESIDENTS: LocationResident[] = [
  { characterId: 'walsingham', role: 'permanent', historicalStatus: 'documented' },
];

export const BARN_ELMS_DOCUMENTS: LocationDocument[] = [
  {
    id: 'barn_elms_cipher_key',
    title: 'Cipher Key',
    type: 'record',
    description: 'Coded correspondence and encryption schemes',
    historicalStatus: 'contested',
    sources: ['Parry 88–90'],
  },
];

export const BARN_ELMS_SERVICES: LocationService[] = [
  {
    id: 'barn_elms_cipher_analysis',
    name: 'Analyze a Ciphered Document',
    type: 'consultation',
    description: 'Dee uses cryptographic knowledge to interpret coded intelligence',
    requirements: { skills: { cryptography: 4 } },
    historicalStatus: 'contested',
  },
];
