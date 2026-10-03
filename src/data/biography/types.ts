// =============================================================================
// FTLDee — Biographical Database Types
// A rich model of John Dee's life, keyed to historiographical themes and
// properly sourced. Entries are tagged by type (event, document, person, place,
// institution, business_venture) and can be queried by theme.
// =============================================================================

import type { HistoricalStatus } from '../../core/types.js';

// --- Historiographical Themes ------------------------------------------------
// These themes come from Dee historiography (Parry, Harkness, Sherman, M-K, etc.)
// and represent the major narrative threads of his career.

export type BiographicalTheme =
  | 'relationships'           // patronage, networks, allies, rivals
  | 'occult_philosophy'       // magical studies, angelic communication, alchemy
  | 'navigation'              // cartography, maritime, exploration, globes
  | 'empire'                  // imperial ambitions, colonial thought, political vision
  | 'courtly_maneuverings'    // court politics, factions, Elizabeth, patronage plays
  | 'business_ventures'       // financial schemes, failures, patronage economics
  | 'tactlessness'            // Parry's framing: Dee's missteps, arrogance, poor timing
  | 'mathematical_authority'  // geometry, astronomy, instruments, technical work
  | 'publishing'              // books, printing, dissemination, reputation-building
  | 'theology'                // religious positioning, witch accusations, reform
  | 'household'               // Mortlake, family, domestic life, library as institution
  | 'security'                // suspicion, arrests, secrecy, political danger
  | 'continental_connections' // Louvain, Prague, Rudolf, Europe networks
  | 'writing'                 // manuscripts, correspondence, treatises, self-fashioning
  | 'alchemy'                 // alchemical work, transmutation, laboratory
  | 'reputation'              // fame, slander, public perception
  | 'manuscript_knowledge'    // manuscript collecting, learning, scholarship;

// --- Entry Types -------------------------------------------------------------

export type BiographicalEntryType =
  | 'event'                  // Something that happened
  | 'document'               // A text Dee produced or received
  | 'person'                 // An associate, patron, rival, contact
  | 'place'                  // Location significant to Dee's career
  | 'institution'            // College, court, household, press
  | 'business_venture';      // A scheme, project, or enterprise

// --- Core BiographicalEntry --------------------------------------------------

export interface BiographicalEntry {
  // Identifier
  id: string;
  label: string;             // Human-readable, concise label
  type: BiographicalEntryType;
  historicalStatus: HistoricalStatus;

  // Historiographical tagging
  themes: BiographicalTheme[];

  // Dating
  dateStart?: string;        // ISO or "c. 1555" format
  dateEnd?: string;
  description: string;       // Narrative description (can reference corpus)

  // Sourcing
  sources: string[];         // Short citations: "Parry 23–27", "Sherman 56–80", etc.
  corpusRefs?: string[];     // References to DeeChunks tables/queries

  // Context
  relatedEntries?: string[]; // IDs of related biographical entries
  connectedThemes?: BiographicalTheme[]; // Secondary themes
  significance?: string;     // Why this entry matters historically
  consequence?: string;      // What changed because of this entry

  // Game-relevant
  encounterId?: string;      // Linked encounter ID if used in game
  requiresContext?: string;  // Description of what player needs to know
}

// --- Specialized Entry Subtypes (for convenience) ----------------------------

export interface BiographicalEvent extends BiographicalEntry {
  type: 'event';
  consequence?: string;      // What changed because of this
  alternatives?: string[];   // What might have happened instead (for counterfactuals)
}

export interface BiographicalDocument extends BiographicalEntry {
  type: 'document';
  title?: string;
  author?: string;
  dateWritten?: string;
  publicationStatus: 'manuscript' | 'published' | 'lost' | 'lost_but_referenced';
  significance?: string;
}

export interface BiographicalPerson extends BiographicalEntry {
  type: 'person';
  historicalName?: string;
  lifespan?: [number, number]; // birth, death years
  roles?: string[];             // "patron", "rival", "contact", etc.
  relationship?: string;       // How they related to Dee
  historicalFaction?: string;  // Elizabeth, Burghley, Leicester, etc.
}

export interface BiographicalPlace extends BiographicalEntry {
  type: 'place';
  location?: string;           // City/region
  significance?: string;
  inGame?: boolean;            // Is this a location in the vertical slice?
}

export interface BiographicalInstitution extends BiographicalEntry {
  type: 'institution';
  founded?: number;
  closed?: number;
  type_: string;              // "college", "court", "press", "household"
  significance?: string;      // Why this institution mattered
}

export interface BiographicalBusinessVenture extends BiographicalEntry {
  type: 'business_venture';
  outcome: 'success' | 'failure' | 'ongoing' | 'abandoned';
  participants?: string[];   // IDs of persons involved
  investment?: string;
  return?: string;
  consequence?: string;      // What the venture led to
}

// --- Aggregation type for database functions

export type AnyBiographicalEntry =
  | BiographicalEvent
  | BiographicalDocument
  | BiographicalPerson
  | BiographicalPlace
  | BiographicalInstitution
  | BiographicalBusinessVenture;
