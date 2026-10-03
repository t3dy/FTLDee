# Biography Database Documentation

**Status:** Production-ready (2026-10-03)  
**Scope:** John Dee 1527–1609, with 17 historiographical themes and full TypeScript schema  
**Location:** `src/data/biography/`

---

## What Was Built

### Core Files

| File | Purpose |
|------|---------|
| `types.ts` | BiographicalEntry interface + BiographicalTheme enum (17 themes) + HistoricalStatus enum |
| `entries.ts` | 58 entries (people, events, documents, places, institutions, ventures) |
| `index.ts` | Query API: getByTheme, getByType, search, getRelated, narrative formatting |
| `README.md` | Developer guide + usage patterns |

### Entry Count

```
People:              13
Events:              20
Documents:           10
Places:               8
Institutions:         4
Business Ventures:    3
───────────────────
TOTAL:              58 entries
```

---

## Data Model

```typescript
interface BiographicalEntry {
  id: string;                           // Unique key
  label: string;                        // Human-readable name
  type: 'event' | 'document' | 'person' | 'place' | 'institution' | 'business_venture';
  historicalStatus: 'documented' | 'plausible' | 'contested' | 'counterfactual';
  
  themes: BiographicalTheme[];          // 1–5 primary themes
  connectedThemes?: BiographicalTheme[]; // Secondary themes
  
  dateStart?: string;                   // ISO or "c. 1555" format
  dateEnd?: string;
  description: string;                  // Narrative paragraph
  
  sources: string[];                    // "Parry 23–27", "Harkness 35–42"
  relatedEntries?: string[];            // Cross-references to other entries
  significance?: string;                // Why this matters
  consequence?: string;                 // What changed because of this
  
  encounterId?: string;                 // Links to game encounters
  requiresContext?: string;             // What player needs to know
}
```

### The 17 Historiographical Themes

Drawn from your specification (relationships, occult philosophy, navigation, empire, courtly maneuverings, business ventures, tactlessness) + themes needed to cover Dee's full biography:

| Theme | Coverage | Key Entries |
|-------|----------|------------|
| **relationships** | Patronage, networks, allies, rivals | Elizabeth I, Cecil, Leicester, Walsingham, Laski, Jane Dee, Kelley |
| **occult_philosophy** | Magic, alchemy, angelic communication | Monas Hieroglyphica, Angelic Sessions, Kelley, Book of Soyga |
| **navigation** | Cartography, maritime, exploration, globes | Mathematical Preface, Frobisher Expedition, Mercator, Gemma Frisius |
| **empire** | Imperial ambitions, colonial vision | General and Rare Memorials, Brytannicae Synopsis, Laski, Continental Departure |
| **courtly_maneuverings** | Court politics, factions, patronage plays | Elizabeth's Interest, Comet at Windsor, Greenwich Network, Calendar Reform |
| **business_ventures** | Financial schemes, patronage economics | Frobisher Expedition, Printing Ventures, Alchemy Ventures, Murphyn Slanders |
| **tactlessness** | Missteps, arrogance, poor timing (Parry) | Murphyn Slanders, Kelley conflict, continental decision timing |
| **mathematical_authority** | Geometry, astronomy, instruments | Louvain Period, Paris Lectures, Mathematical Preface, Monas |
| **publishing** | Books, printing, dissemination | Propaedeumata, Monas, Preface, Brytannicae, General and Rare Memorials |
| **theology** | Religious positioning, witch accusations | Fox Acts, Bonner Household, Calendar Reform, Religious Authority |
| **household** | Mortlake, family, domestic life, library | Mortlake Library, Jane Dee, household foundation, domestic management |
| **security** | Suspicion, arrests, secrecy, political danger | Arrest 1555, Bonner Household, Murphyn Slanders, Kelley conflict |
| **continental_connections** | Louvain, Prague, Rudolf, Europe networks | Louvain Period, Prague encounters, Rudolf II, Continental Departure |
| **writing** | Manuscripts, correspondence, treatises | Diaries and Daybooks, Monas Manuscript, Compendious Rehearsal, Apologetical Letter |
| **alchemy** | Alchemical work, transmutation, laboratory | Kelley, Alchemy Ventures, Prestall Rivalry, Prague Laboratory |
| **reputation** | Fame, slander, public perception | Murphyn Slanders, Compendious Rehearsal, Apologetical Letter, Foxe Acts |
| **manuscript_knowledge** | Manuscript collecting, learning, scholarship | Diaries, Mortlake Library, Monas Manuscript, Book Acquisition |

---

## How Encounters Use Biography

### Pattern 1: Query by Theme

```typescript
import { getBiographyByTheme } from '@/data/biography/index.js';

// Encounter: "Elizabeth asks for astrological counsel"
const context = getBiographyByTheme('occult_philosophy');
const people = context.filter(e => e.type === 'person');  // Kelley, Elizabeth I
const books = context.filter(e => e.type === 'document'); // Monas, Propaedeumata
const events = context.filter(e => e.type === 'event');   // Angelic sessions

// Blue option: "Give full astrological assessment"
// Requires: book (Ptolemy), skill (astronomy ≥ 6), knowledge (event = ELIZABETH_ACCESSION_1558)
```

### Pattern 2: Gate by Historical Status

```typescript
// Only show this option if documented (not counterfactual):
const events = getBiographyByTheme('navigation')
  .filter(e => e.historicalStatus === 'documented');

// Show counterfactual option separately (Ottoman thread):
const counterfactual = getBiographyByTheme('occult_philosophy')
  .filter(e => e.historicalStatus === 'counterfactual');
```

### Pattern 3: Follow Consequence Chains

```typescript
// When player chooses occult path at Elizabeth's Interest:
const elizabethEvent = getEvent('elizabeth_accession_1558');
const relatedEvents = elizabethEvent.relatedEntries
  .map(id => getBiographyEntry(id));
// → Shows consequences: ANGELIC_SESSIONS_BEGIN → KELLEY_ARRIVES_1582 → HOUSEHOLD_CRISIS_1587
```

---

## Sourcing & Verification

Every entry cites sources. Short forms:

| Short | Work |
|-------|------|
| Parry | Glyn Parry, *The Arch-Conjuror of England* (Yale) |
| Harkness | Deborah Harkness, *John Dee's Conversations with Angels* (Cambridge) |
| Sherman | William Sherman, *The Politics of Reading and Writing* |
| Szőnyi | György Szőnyi, *John Dee's Occultism* (SUNY) |
| Whitby | Christopher Whitby, *John Dee's Actions with Spirits* |
| M-K 2021 | Melvin-Koushki, "Dr Dee's Ottoman Adventure," *Hellebore* |
| Harkness 35–42 | Specific page range (check corpus if citing) |

**Corpus location:** `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite`
- 68 documents, 3,052 Markdown chunks, FTS5 search
- Tables: biography_timeline (29 events), daybook_entry_summaries (1,464), scholarly_chapter_summaries (47)

**Verification protocol:**
1. Every claim in entries.ts came from DEE_MASTER_BIOGRAPHY.md
2. Every claim in .md came from Parry, Harkness, Sherman, or DeeChunks
3. All quotations are paraphrases (no invented speech)
4. Counterfactuals are marked (Ottoman thread only)

---

## The Ottoman Counterfactual Thread

One licensed counterfactual runs through the database: **Murad III as alternate patron** (Melvin-Koushki).

**Historical fact:** Dee went to Prague, Rudolf II, never east. Died poor.

**Counterfactual:** Dee *could* have gone to Ottoman court under Murad III (r. 1574–95), who patronized exactly the kind of magical knowledge Dee pursued.

**Game presence:**
- **MURAD_III** (person, counterfactual) — the patron never met
- **CONSTANTINOPLE** (place, counterfactual) — destination never reached
- **BOOK_OF_SOYGA_EVENT** (event, documented) — the trace where Ottoman magic enters the historical record
- **Ottoman route** (path) — unlocked only through `occult_philosophy ≥ 6` + specific earlier choices

**Gating:** Rare option, earned through specific early game decisions. Not a default path.

---

## API Reference

### Query Functions

```typescript
// Get all entries tagged with a theme
getBiographyByTheme('occult_philosophy'): AnyBiographicalEntry[]

// Get entries by multiple themes (union)
getBiographyByThemes(['relationships', 'empire']): AnyBiographicalEntry[]

// Get entries by type
getBiographyByType('event'): AnyBiographicalEntry[]
getBiographyByType('person'): AnyBiographicalEntry[]
getBiographyByType('document'): AnyBiographicalEntry[]

// Get a specific entry by ID
getBiographyEntry('dee'): AnyBiographicalEntry | undefined

// Get entries connected to a given entry
getRelatedEntries('dee'): AnyBiographicalEntry[]

// Get all people
getAllPeople(): BiographicalPerson[]

// Get all events
getAllEvents(): BiographicalEvent[]

// Search by label or description
searchBiography('Monas'): AnyBiographicalEntry[]

// Get entries for a given encounter
getBiographyForEncounter('comet_at_windsor'): AnyBiographicalEntry[]

// Get context for a theme with status filter
getBiographyContext('occult_philosophy', 'documented'): AnyBiographicalEntry[]

// Group all entries by theme
groupBiographyByTheme(): Map<BiographicalTheme, AnyBiographicalEntry[]>

// Get summary of all themes
getBiographyThemesSummary(): Array<{ theme, count, entries }>

// Get narrative-ready summary
getBiographyNarrative(entry): { label, description, sources, themes, type }
```

---

## Next Steps for FTLDee

### Immediate (This Week)

- [ ] **Link encounters to biography entries**
  - Mark each encounter's `encounterId` in relevant biography entries
  - Example: `COMET_AT_WINDSOR` event links to `comet_at_windsor_encounter`

- [ ] **Blue option gating via biography**
  - Example: "Give full astrological assessment" requires `MATHEMATICAL_PREFACE_BOOK` (document) + `astronomy ≥ 6` (skill) + `ELIZABETH_ACCESSION_1558` (event) before this encounter
  - Pulled from biography entry requirements

- [ ] **Consequence chains**
  - When player chooses occult path, follow `relatedEntries` to surface consequences: angelic sessions → Kelley → household crisis

### Short term (2 weeks)

- [ ] **Ottoman thread gating**
  - Verify `MURAD_III` and `CONSTANTINOPLE` entries only surface at `occult_philosophy ≥ 6`
  - `BOOK_OF_SOYGA_EVENT` is documented; counterfactual path unlocked through *choice* gates

- [ ] **Encounter narrative sourcing**
  - Every game-facing claim should cite its biography source
  - Example: "Dee was consulted on the coronation date — Parry 48–58"

- [ ] **Test suite**
  - Verify all 58 entries are accessible via some query function
  - Verify relatedEntries form a valid graph (no dangling references)
  - Verify historicalStatus filters work correctly

---

## Extending the Biography

### Adding a New Entry

1. **Determine type:** event, document, person, place, institution, or venture
2. **Assign ID:** kebab-case, unique
3. **Tag themes:** 1–5 primary themes from the 17-theme list
4. **Cite sources:** At least one source (Parry, Harkness, DeeChunks, etc.)
5. **Add relationships:** Cross-reference related entries
6. **Write consequence:** What changed because of this?
7. **Mark status:** documented, plausible, contested, or counterfactual
8. **Place in entries.ts:** In the appropriate section (events, people, etc.)

### Example: Adding a New Encounter

If you discover a new encounter:

1. **Research it** in DEE_MASTER_BIOGRAPHY.md or the scholarship
2. **Create biography entry** (event or place)
3. **Tag themes** (what historiographical angle?)
4. **Link to encounter** (set `encounterId` field)
5. **Set status** (is it documented or reconstructed?)
6. **Add to entries array** in entries.ts
7. **Test query** (can you retrieve it by theme?)

---

## Known Limitations

### What's NOT in the database

1. **Pre-1527** — Dee's genealogy (Welsh descent) is legend; not detailed
2. **Post-1609** — Only his death date (uncertain); no reception history
3. **Allies who are minor figures** — Only 13 major people; ~50 others mentioned in narrative
4. **Every book Dee read** — Only books relevant to game mechanics; not exhaustive library
5. **Every alchemical experiment** — Documented in daybooks; not individually entered

### What could be extended

1. **Turka entries** — Similar database for Ibn Turka (1369–1432)
2. **Continental contacts** — Expand Prague, Vienna, Kraków visits
3. **Publication network** — Map all Dee's printed works and printers
4. **Household staff** — Expand Jane Dee, Roger Cooke, other servants
5. **Ottoman figures** — Add more figures if counterfactual path expands

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `research/DEE_MASTER_BIOGRAPHY.md` | Narrative source (read this to understand entries) |
| `research/BIOGRAPHY_ENCOUNTER_AUTHORING_GUIDE.md` | How to write encounters using the database |
| `research/BIOGRAPHY_BUILD_SUMMARY.md` | How this database was constructed |
| `C:\Dev\wiki\biography_ecosystem_analysis.md` | How FTLDee's biography fits into the Dev ecosystem |

---

## To-Do: Building Turka Biography

**Status:** Ready to start (FTLDee pattern proven)

### Phase 1: Markdown enrichment (1 week)
- [ ] Take `TurkaGame/docs/BIOGRAPHY.md` (already written, verified 2026-09-27)
- [ ] Add theme tags to each entry
- [ ] Add related-entry IDs (cross-references)
- [ ] Add game gates where CareerSim needs them
- [ ] Verify all sources against Melvin-Koushki dissertation

### Phase 2: TypeScript entries (1 week)
- [ ] Create `TurkaGame/src/data/biography/types.ts` (reuse from shared)
- [ ] Create `TurkaGame/src/data/biography/entries.ts` (Turka entries, ~60 estimated)
- [ ] Create `TurkaGame/src/data/biography/index.ts` (query API)
- [ ] Test compilation and queries

### Phase 3: CareerSim integration (1 week)
- [ ] CareerSim queries by theme to structure encounters
- [ ] Timeline page generated from entries
- [ ] NPC dialogue pulls biographical context
- [ ] Verify 40-choice VN gates match biography requirements

### Phase 4: Validation (ongoing)
- [ ] Entries match citations in original BIOGRAPHY.md
- [ ] Theme tagging covers historiographical breadth
- [ ] Relationship graph is complete and acyclic

---

## Questions for Next Session

1. **Should we add more Dee entries?**
   - Currently 58. Is that enough coverage, or are there major gaps?
   - Major figures not yet entered: More alchemists? More printers? More family?

2. **How do encounters consume biography?**
   - Should every encounter pull narrative text from biography?
   - Or should encounters just gate on biography entries (books/skills/contacts)?

3. **Ottoman thread depth:**
   - How many encounters should be on the counterfactual path?
   - Should Constantinople, Murad III, Samarkand each have encounter pools?

4. **Cross-game references:**
   - Once Turka biography exists, should Dee encounters reference Turka entries?
   - (E.g., "meet a scholar who studied in Samarkand"?)

---

**Last updated:** 2026-10-03  
**Next action:** Read WORLDBUILDING.md for spatial architecture, or begin Turka biography work using this document as a template.
