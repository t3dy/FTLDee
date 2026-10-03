# FTLDee Handover — Session 2026-10-03

**Session scope:** Built comprehensive biography database for Dee + analyzed Dev ecosystem biographies + designed shared world architecture for Dee ↔ Turka cross-game connectivity.

**Time estimate for next session:** Read this file (5 min) + BIOGRAPHY.md (10 min) + WORLDBUILDING.md (15 min) + WORLDASSETS.md (5 min). Then pick your next task from the to-do lists in those files.

---

## What Was Built

### 1. Dee Biography Database (Complete & Ready)

**Location:** `src/data/biography/`

**Files created:**
- `types.ts` — Full TypeScript schema (BiographicalEntry interface, 17 historiographical themes, historical status enum)
- `entries.ts` — 58 entries (13 people, 20 events, 10 documents, 8 places, 4 institutions, 3 ventures)
- `index.ts` — Query API (15+ functions: getByTheme, getByType, getRelated, searchBiography, etc.)
- `README.md` — Developer guide + theme definitions

**Key features:**
- Every entry sourced (Parry, Harkness, Sherman, M-K, DeeChunks)
- Tagged by 17 historiographical themes (relationships, occult_philosophy, navigation, empire, courtly_maneuverings, business_ventures, tactlessness, mathematical_authority, publishing, theology, household, security, continental_connections, writing, alchemy, reputation, manuscript_knowledge)
- Historical status marked (documented/plausible/contested/counterfactual)
- Type-safe TypeScript with full query API
- Ottoman counterfactual thread (Melvin-Koushki) preserved with proper gating

**Usage in FTLDee:**
- Encounters query by theme: `getBiographyByTheme('occult_philosophy')` returns all entries relevant to that encounter
- Blue options gate by book/skill/contact via biography entries
- Consequence chains follow related entries

**Status:** ✓ Compiles, tested, ready for encounter authoring

---

### 2. Dev Ecosystem Biography Analysis

**Location:** `C:\Dev\wiki\biography_ecosystem_analysis.md`

Cataloged all biography databases across your projects:

| Project | Pattern | Entries | Status |
|---------|---------|---------|--------|
| DeeVisualNovel | Markdown | 1527–1609 narrative | ✓ Complete, canonicalized |
| FTLDee | TS + Enum | 58 typed entries | ✓ Complete (just built) |
| TurkaGame | Markdown | 1369–1432 narrative | ✓ Complete, corrected 2026-09-27 |
| IslamicateOccultPortal | SQLite | 20% seeded | Staging |
| ALCHEMYTIMELINEMAP | JSON + Scripts | ~100 figures | Needs audit |
| EmeraldTablet | JSON + Scripts | ~150 figures | Needs audit |

**Key insight:** Three architectural patterns exist. Unified ontology proposed (17-theme system + strong typing) to bridge all projects.

**Recommendation:** Build Turka biography using FTLDee pattern (TS + entries.ts + query API) for consistency.

---

### 3. Shared World Architecture (New Design)

**Location:** `C:\Dev\ecosystem\SHARED_WORLD_ARCHITECTURE.md`

Designed spatial/geographical infrastructure for Dee ↔ Turka cross-game connectivity:

**Core mechanic:** **Crew placement in locations.**
- Crew work in specific stations (Scriptorium, Observatory Dome, Alchemy Lab, etc.)
- Working at a station trains skills and unlocks location-based encounters
- Both games share the same location/station/crew system

**Major locations defined (12 total):**

*Dee-era (1550–1600):*
- England: Mortlake, Greenwich, Windsor, Barn Elms, London
- Continental: Louvain, Prague
- Ottoman (counterfactual): Constantinople

*Turka-era (1369–1432):*
- Central Asia: Samarkand Observatory, Samarkand City
- Persia/Iran: Yazd, Isfahan
- Egypt: Cairo

*Shared/Neutral:*
- Baghdad Library, Medina/Mecca

**Connectivity:** Travel graph with costs, days, risk levels, and requirements (contacts, reputation, books needed)

**Example counterfactual paths:**
- Dee: Mortlake → Prague → Constantinople → Samarkand
- Turka: Cairo → Samarkand → Isfahan → Constantinople → Prague → London

**Each location has:**
- Named stations (crew can work there)
- Permanent residents (NPCs always present)
- Available encounters (gated by location)
- Asset inventory (2D layout, 3D model, reference images, audio)
- Historical status (documented/plausible/counterfactual)

**Status:** Design complete. Ready for Phase 1 implementation (location data + travel graph).

---

## Three Documents for Handoff

### → Read next: `BIOGRAPHY.md`
Detailed documentation of biography work: what was built, how to use it, what's left to do.

### → Then: `WORLDBUILDING.md`
Documentation of shared world architecture: methods, location schema, crew mechanics, implementation roadmap.

### → Then: `WORLDASSETS.md`
Inventory of all asset types in the world (locations, buildings, books, printing presses, etc.) with provenance tracking.

---

## Key Decisions Made This Session

1. **Biography as structured, game-ready data**
   - Not just Markdown narrative (like DeeVisualNovel)
   - TypeScript + enum system (like game code)
   - Theme-tagged (17 historiographical themes)
   - Query API for encounters to use
   - Why: Enables game systems to ask "what entries are about relationships?" and get back structured data with sources

2. **Shared world across two games**
   - Dee can travel east to Turka's world (counterfactual Melvin-Koushki route)
   - Turka can travel west to Dee's world (optional)
   - Both games use the same location/station/crew system
   - Why: Player's choice in Dee's 1580 can lead to meeting Turka; player's choice in Turka can lead to meeting Dee

3. **Crew placement as core mechanic**
   - Crew assigned to stations in locations (not just a party roster)
   - Station work trains specific skills
   - Station presence unlocks encounters
   - Why: Makes household management (Mortlake, Samarkand) feel lived-in; creates long-term planning (spend month training Kelley's alchemy vs. Cooke's copying)

4. **Unified ontology across ecosystem**
   - FTLDee pattern (TS types + query API) > other projects' patterns
   - TurkaGame should adopt same pattern
   - SharedTypes should live in `shared/` directory
   - Why: Consistency, reuse, type safety

---

## What's Next (Pick One)

### High priority (enables everything):
- [ ] **Build Turka biography layer** (2 weeks)
  - Enrich `TurkaGame/docs/BIOGRAPHY.md` with theme tags
  - Create `TurkaGame/src/data/biography/entries.ts` (Turka entries)
  - Create query API in `index.ts`
  - File: BIOGRAPHY.md, task list item 1

- [ ] **Implement shared geography layer** (1 week)
  - Create `shared/geography/types.ts` (Location, Station, Region, Era, TravelEdge)
  - Populate 12 locations in JSON or TS
  - Build travel graph
  - File: WORLDBUILDING.md, task list item 1

- [ ] **Asset mapping for 6 major locations** (ongoing, parallelizable)
  - Source historical images (OCCULTIMGDB provenance)
  - Create 2D layout PNGs (Mortlake, Samarkand, Prague, Cairo, Greenwich, Constantinople)
  - Record ambient audio (muezzin calls, marketplace, bells)
  - File: WORLDASSETS.md, task list item 1

### Medium priority (extends):
- [ ] Integrate shared geography into FTLDee's node system
- [ ] Upgrade FTLDee's travel system to support crew placement in stations
- [ ] Build crew-placement UI prototype (grid per location)
- [ ] Design Samarkand Observatory encounter pool (what encounters happen there)

### Lower priority (polish):
- [ ] Audit ALCHEMYTIMELINEMAP, EmeraldTablet, Claudiens for source verification
- [ ] Document shared types and move to `shared/` directory
- [ ] Build rendering pipeline (Markdown → JSON → HTML)
- [ ] Cross-project tests (Dee encounters gate correctly, travel costs are balanced)

---

## Critical Files to Know

| File | Purpose |
|------|---------|
| `src/data/biography/types.ts` | Source of truth for biography schema |
| `src/data/biography/entries.ts` | All 58 Dee entries; reference for Turka entries |
| `src/data/biography/index.ts` | Query API; how encounters should consume biography |
| `research/DEE_MASTER_BIOGRAPHY.md` | Narrative biography (source for TypeScript entries) |
| `research/BIOGRAPHY_ENCOUNTER_AUTHORING_GUIDE.md` | How to write encounters using biography |
| `C:\Dev\wiki\biography_ecosystem_analysis.md` | Ecosystem audit + unified ontology proposal |
| `C:\Dev\ecosystem\SHARED_WORLD_ARCHITECTURE.md` | Location schema, crew mechanics, travel graph |
| `TurkaGame/docs/BIOGRAPHY.md` | Source material for next biography layer (Turka) |

---

## Conversation History (This Session)

1. **Requested:** Build biography database for Dee with historiographical theme tagging
2. **Delivered:** Complete TS+enum database (58 entries, 17 themes, query API)
3. **Then requested:** Analyze all biography databases in Dev ecosystem
4. **Delivered:** Comprehensive catalog + unified ontology proposal
5. **Then requested:** Design spatial world allowing Dee and Turka to move between each other's worlds
6. **Delivered:** Shared world architecture (12 locations, crew placement, travel graph, asset inventory)

---

## One-Line Summary Per Document

- **BIOGRAPHY.md** — What we built, how to extend it, Turka-specific next steps, and how encounters use it
- **WORLDBUILDING.md** — Shared world design, location/station/crew schema, travel graph, asset layer, Phase 1–5 roadmap
- **WORLDASSETS.md** — Inventory of all asset types (buildings, books, printing presses, observatories, etc.) with data fields and provenance tracking

---

**Last update:** 2026-10-03 23:45  
**Next session:** Start with high-priority tasks in the three .md files, or continue game development in another window. Biography layer is production-ready.
