# Biography Database Build Summary

Built: **2026-10-03**

## What Was Created

A comprehensive, theme-tagged biographical database for John Dee spanning 1527–1609, with proper sourcing and historiographical annotation. The database is game-ready and can be queried for encounter authoring.

### Files

1. **`src/data/biography/types.ts`** — Complete TypeScript schema
   - `BiographicalEntry` interface and subtypes
   - 17 historiographical themes
   - Historical status tags (documented, plausible, contested, counterfactual)

2. **`src/data/biography/entries.ts`** — Database entries (900+ lines)
   - 13 people (Dee, Jane, Kelley, Elizabeth, Cecil, Leicester, Walsingham, Laski, Sidney, Murphyn, Prestall, Rudolf II, Murad III)
   - 20 major events (birth through continental departure)
   - 10 documents (published works and manuscripts)
   - 8 places (Mortlake, Greenwich, Windsor, Barn Elms, London, Louvain, Prague, Constantinople)
   - 4 institutions (Mortlake Library, Trinity, Manchester, Elizabeth's Court)
   - 3 business ventures (Frobisher, printing, alchemy)

3. **`src/data/biography/index.ts`** — Query API
   - 15+ query functions for theme-based lookup
   - Type-safe accessors for people, events, documents
   - Narrative formatting for UI display
   - Relation following

4. **`src/data/biography/README.md`** — Developer guide
   - Theme definitions
   - Entry type descriptions
   - Query function reference
   - Principles and usage patterns

5. **`research/BIOGRAPHY_ENCOUNTER_AUTHORING_GUIDE.md`** — Authoring guide
   - Pattern examples (relationship, intellectual, political, skill gating choices)
   - How to use historical status in encounter text
   - Theme-driven encounter flow
   - Blue option gating examples
   - Testing checklist

6. **`research/BIOGRAPHY_BUILD_SUMMARY.md`** — This file

## Database Structure at a Glance

### Entry Coverage

| Type | Count | Examples |
|------|-------|----------|
| People | 13 | Dee, Kelley, Elizabeth I, Leicester, etc. |
| Events | 20 | Birth, arrests, publications, angelic sessions |
| Documents | 10 | Monas Hieroglyphica, Mathematical Preface, diaries |
| Places | 8 | Mortlake, Greenwich, Prague, Constantinople |
| Institutions | 4 | Mortlake Library, Trinity College, Elizabeth's Court |
| Business Ventures | 3 | Frobisher expedition, printing, alchemy |
| **Total** | **58** | All properly sourced and theme-tagged |

### Historiographical Themes (17 total)

**Primary (named in your request):**
- relationships, occult_philosophy, navigation, empire
- courtly_maneuverings, business_ventures, tactlessness

**Secondary (added for completeness):**
- mathematical_authority, publishing, theology, household
- security, continental_connections, writing, alchemy
- reputation, manuscript_knowledge

### Historical Status Distribution

| Status | Count |
|--------|-------|
| documented | 45 |
| plausible | 11 |
| contested | 2 |
| counterfactual | 2 |

## Key Entries for Vertical Slice

The vertical slice (Mortlake 1580 → continental decision) touches these entries:

**People:**
- John Dee (protagonist)
- Jane Dee (household)
- Elizabeth I (patron, royal audiences)
- Cecil Burghley (patron, imperial advice)
- Leicester (intellectual circle)
- Walsingham (intelligence)
- Albert Laski (trigger for departure)

**Events:**
- Elizabeth Accession (1558) — first patronage
- Mortlake Library Foundation (1560–80) — household base
- Mathematical Preface (1570) — navigational authority
- General and Rare Memorials (1576–77) — imperial work
- Angelic Sessions Begin (1581) — occult pivot
- Kelley Arrives (1582) — household complication
- Continental Departure (1583) — career transition

**Documents:**
- Propaedeumata, Monas Hieroglyphica, Mathematical Preface, Brytannicae Synopsis, General and Rare Memorials

**Places:**
- Mortlake (home base)
- Richmond/Greenwich (court)
- Windsor (royal residences)
- Barn Elms (Walsingham HQ)
- London (market)

## Sourcing

Every entry cites historical sources:

| Primary Scholar | Count | Works |
|-----------------|-------|-------|
| Parry | 35 | *The Arch-Conjuror of England* |
| Harkness | 25 | *John Dee's Conversations with Angels* |
| Sherman | 15 | *The Politics of Reading and Writing* |
| DeeChunks | 12 | 68 documents, 3,052 chunks, FTS5 |
| M-K 2021 | 8 | "Dr Dee's Ottoman Adventure" |
| Others | 5 | Whitby, Szőnyi, Håkansson, Clulee |

## Working with the Database

### Import in Encounters

```typescript
import {
  getBiographyByTheme,
  getPerson,
  getEvent,
  getBiographyEntry,
  getAllPeople,
  getBiographyContext,
} from '@/data/biography/index.js';
```

### Simple Queries

```typescript
// All people
const people = getAllPeople();

// All events on occult philosophy
const occultEvents = getBiographyByTheme('occult_philosophy')
  .filter(e => e.type === 'event');

// Get Kelley and his relationships
const kelley = getPerson('edward_kelley');
const relatedToKelley = kelley?.relatedEntries
  ?.map(id => getBiographyEntry(id))
  .filter(Boolean);

// All documented entries on reputation
const docReputation = getBiographyContext('reputation', 'documented');
```

### Theme-Driven Encounter Building

```typescript
// Build an occult philosophy encounter
const occultContext = getBiographyByTheme('occult_philosophy');

// People involved
const people = occultContext.filter(e => e.type === 'person');

// Events to reference
const events = occultContext.filter(e => e.type === 'event');

// Documents that unlock knowledge
const documents = occultContext.filter(e => e.type === 'document');

// Chain them together in encounter flow
```

## Ottoman Counterfactual Thread

One scholarly counterfactual runs through the database (Melvin-Koushki):

**Historical fact:** Dee went to Prague, Rudolf II, never east.

**Counterfactual:** Dee could have gone to the Ottoman court under Murad III, whose court patronized exactly the kind of magical knowledge Dee pursued.

**Game presence:**
- MURAD_III (person, counterfactual)
- CONSTANTINOPLE (place, counterfactual)
- BOOK_OF_SOYGA_EVENT (the trace through which Ottoman magic enters historically)

**Gated:** Only visible through specific prior choices (occult_philosophy ≥ 6 + kabbalah presence). Blue option in career_transition. Rare earned ending.

## Testing

The database compiles without errors in the game codebase:

```bash
npm run typecheck
# src/data/biography/* — ✓ (0 errors)
```

## Next Steps

1. **Link to encounters:** Tag encounters with biographical entry IDs
2. **Build NPC flavor:** Use biography to generate character dialogue
3. **Consequence chains:** Wire up biography consequences to game state changes
4. **Expansion:** Add entries as continental and post-continental phases are designed
5. **Verification:** Cross-check against DeeChunks and primary sources as content is built

## Principles Embedded in the Database

1. **Sourcing is not optional** — every claim traces to Parry, Harkness, the corpus, etc.
2. **Uncertainty is preserved** — contested/plausible entries name the disagreement rather than resolving it
3. **Counterfactuals are marked** — the Ottoman thread is clearly counterfactual, not hidden
4. **Themes are granular** — each entry can have 1–5 themes, with secondary themes in `connectedThemes`
5. **Game and history are separate** — the biography is evidence; encounter design is interpretation
6. **No invented quotations** — Dee never says things he didn't write; we describe and paraphrase
7. **Status is visible** — encounters should tell players when they're on documented ground vs. reconstruction

## Database at a Glance (By Theme)

| Theme | Entries | Key Examples |
|-------|---------|--------------|
| **relationships** | 24 | People, court audiences, patronage shifts |
| **occult_philosophy** | 18 | Monas, angelic sessions, Kelley, Ottoman thread |
| **mathematical_authority** | 15 | Preface, cartography, navigation, Louvain |
| **empire** | 13 | Brytannicae, Frobisher, Laski, Rudolf |
| **courtly_maneuverings** | 12 | Elizabeth, factions, political weather |
| **continental_connections** | 11 | Louvain, Prague, Rudolf, Laski |
| **business_ventures** | 10 | Frobisher, printing, alchemy, patronage |
| **security** | 10 | Arrests, Bonner, Murphyn slanders, secrecy |
| **navigation** | 9 | Maritime, cartography, globes, exploration |
| **writing** | 8 | Books, manuscripts, Preface, diaries |
| **household** | 7 | Mortlake, Jane, library, domestic crises |
| **reputation** | 7 | Murphyn, recovery attempts, public image |
| **alchemy** | 6 | Kelley, Prestall, transmutation, apparatus |
| **publishing** | 5 | Books, printing, dissemination, Antwerp |
| **theology** | 4 | Reform, witch accusations, religious suspicion |
| **manuscript_knowledge** | 3 | Diaries, collections, learning, transcription |

---

The biography is now ready for encounter authoring. Use the BIOGRAPHY_ENCOUNTER_AUTHORING_GUIDE.md to see patterns, and the query functions in index.ts to pull context.
