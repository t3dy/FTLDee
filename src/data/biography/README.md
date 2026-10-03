# FTLDee Biography Database

A comprehensive, theme-tagged biographical database for John Dee, sourced from the DeeChunks corpus, DeeVisualNovel research, and scholarly works (Parry, Harkness, Sherman, Szőnyi, M-K, etc.).

## Purpose

Every entry in this database serves encounter authoring: each event, document, person, place, and institution is tagged by historiographical theme so that game encounters can:

1. **Ground themselves in history** — cite primary and secondary sources
2. **Tag encounters by theme** — build encounters around Dee's relationships, his occult philosophy, his navigation work, his imperial ambitions, his court maneuvering, etc.
3. **Write consequences with evidence** — when player choices affect relationships or knowledge, pull historical context from the biography
4. **Model uncertainty** — preserve historiographical disputes (contested, plausible, documented) rather than resolving them

## Historiographical Themes

The 17 themes capture major threads in Dee scholarship:

- **relationships** — patronage, networks, allies, rivals
- **occult_philosophy** — magical studies, angelic communication, alchemy
- **navigation** — cartography, maritime, exploration, globes
- **empire** — imperial ambitions, colonial thought, political vision
- **courtly_maneuverings** — court politics, factions, patronage plays
- **business_ventures** — financial schemes, failures, patronage economics
- **tactlessness** — Parry's framing: Dee's missteps, arrogance, poor timing
- **mathematical_authority** — geometry, astronomy, instruments, technical work
- **publishing** — books, printing, dissemination, reputation-building
- **theology** — religious positioning, witch accusations, reform
- **household** — Mortlake, family, domestic life, library as institution
- **security** — suspicion, arrests, secrecy, political danger
- **continental_connections** — Louvain, Prague, Rudolf, Europe networks
- **writing** — manuscripts, correspondence, treatises, self-fashioning
- **alchemy** — alchemical work, transmutation, laboratory
- **reputation** — fame, slander, public perception
- **manuscript_knowledge** — manuscript collecting, learning, scholarship

## Entry Types

```
BiographicalEntry
├── BiographicalEvent    — something that happened
├── BiographicalDocument — a text Dee produced or received
├── BiographicalPerson   — an associate, patron, rival, contact
├── BiographicalPlace    — location significant to Dee's career
├── BiographicalInstitution — college, court, household, press
└── BiographicalBusinessVenture — scheme, project, or enterprise
```

## Historical Status Tags

Every entry carries one:

- **documented** — attested in the historical record with specific sources
- **plausible** — historically consistent reconstruction; sources suggest but don't require
- **contested** — scholarship actively disagrees; game preserves the dispute
- **counterfactual** — contrary to the record; licensed by named scholarly counterfactual
- **anachronistic** — deliberately out-of-time (rare; player-created in game)

The tag is never invisible — encounters name the status so players understand the epistemic ground they stand on.

## How to Use for Encounter Authoring

### 1. Query the biography by theme

```typescript
import { getBiographyByTheme, getPerson } from '@/data/biography/index.js';

// Get all entries on occult philosophy
const occultEntries = getBiographyByTheme('occult_philosophy');

// Get a specific person
const dee = getPerson('dee');

// Get related entries
const relatedToDee = dee?.relatedEntries?.map(id => getBiographyEntry(id));
```

### 2. Build encounter context from biography

When authoring an encounter, use the biography to:

- **Understand the historical moment** — read the events leading up to it
- **Know what Dee knew** — check his access to documents, contacts, and knowledge
- **See the factions** — understand who benefits or loses from each choice
- **Cite sources properly** — encounters should cite their sources
- **Preserve uncertainty** — if scholarship disagrees, state the disagreement

Example: the **Comet at Windsor** encounter draws on:

- COMET_AT_WINDSOR (event, plausible)
- MATHEMATICAL_PREFACE_BOOK (document, shows his authority)
- ELIZABETH_I (person, the patron)
- The themes: occult_philosophy, mathematical_authority, courtly_maneuverings

### 3. Connect biography to game consequences

When a player makes a choice, pull the consequence from biography:

```typescript
// If player chooses to engage occult over mathematics at Greenwich:
const occultTheme = getBiographyByTheme('occult_philosophy');
// This gates to: ANGELIC_SESSIONS_BEGIN, BOOK_OF_SOYGA_EVENT, etc.
// Which leads to Kelley, which leads to household_warnings_1582, etc.
```

## Source Abbreviations

Short form citations in the database:

| Short    | Work                                        |
|----------|---------------------------------------------|
| Parry    | Glyn Parry, *The Arch-Conjuror of England* |
| Harkness | Deborah Harkness, *John Dee's Conversations with Angels* |
| Sherman  | William Sherman, *John Dee: The Politics of Reading and Writing* |
| Szőnyi   | György Szőnyi, *John Dee's Occultism*      |
| Whitby   | Christopher Whitby, *John Dee's Actions with Spirits* |
| M-K 2021 | Melvin-Koushki, "Dr Dee's Ottoman Adventure," *Hellebore* |
| Håkansson| Håkan Håkansson, *Seeing the Word*         |
| Clulee   | Nicholas Clulee, *John Dee's Natural Philosophy* |

## Database Structure

```typescript
interface BiographicalEntry {
  id: string;                           // Unique key
  label: string;                        // Human-readable name
  type: 'event' | 'document' | ...;     // Entry type
  historicalStatus: HistoricalStatus;   // documented | plausible | contested | counterfactual
  themes: BiographicalTheme[];          // Theme tags
  dateStart?: string;                   // ISO or "c. 1555" format
  dateEnd?: string;
  description: string;                  // Narrative description
  sources: string[];                    // "Parry 23–27", etc.
  corpusRefs?: string[];                // DeeChunks table references
  relatedEntries?: string[];            // IDs of related entries
  connectedThemes?: BiographicalTheme[]; // Secondary themes
  significance?: string;                // Why this matters historically
  consequence?: string;                 // What changed because of this
  encounterId?: string;                 // Linked encounter (if used in game)
  requiresContext?: string;             // What player needs to know
}
```

## Query Functions

```typescript
// Get all entries by a single theme
getBiographyByTheme('occult_philosophy'): AnyBiographicalEntry[]

// Get all entries by multiple themes (union)
getBiographyByThemes(['relationships', 'empire']): AnyBiographicalEntry[]

// Get entries by type
getBiographyByType('event'): AnyBiographicalEntry[]

// Get a specific entry
getBiographyEntry('dee'): AnyBiographicalEntry | undefined

// Get related entries
getRelatedEntries('dee'): AnyBiographicalEntry[]

// Get all people, events, documents, etc.
getAllPeople(): BiographicalPerson[]
getAllEvents(): BiographicalEvent[]
getAllDocuments(): BiographicalDocument[]

// Get context for a theme with optional status filter
getBiographyContext('occult_philosophy', 'documented'): AnyBiographicalEntry[]

// Search by label or description
searchBiography('Monas'): AnyBiographicalEntry[]

// Get a narrative display-ready summary
getBiographyNarrative(entry): { label, description, sources, themes, type }
```

## The Ottoman Counterfactual

One licensed counterfactual runs through the database: **Murad III as alternate patron** (Melvin-Koushki).

Entries tagged with this:
- MURAD_III (person)
- CONSTANTINOPLE (place, counterfactual)
- BOOK_OF_SOYGA_DOC (document, the trace through which the Ottoman thread enters)

The **BOOK_OF_SOYGA_EVENT** (1582) marks where Dee encounters Ottoman-adjacent magic unknowingly. This thread surfaces as the blue option in `career_transition_continental` (rare earned ending).

## Principles

1. **No invented quotations** — use descriptions and paraphrase; never attributed speech to real figures
2. **Preserve uncertainty** — if scholarship disagrees, write the dispute, not the resolution
3. **Source everything** — every claim should trace to Parry, Harkness, DeeChunks, etc.
4. **Theme exhaustively** — an entry can have multiple themes; use `connectedThemes` for secondary ones
5. **Gate by status** — encounters and game systems should respect `historicalStatus`, not treat counterfactual and documented identically
6. **Keep biography and game separate** — the biography is evidence; encounter design is interpretation
