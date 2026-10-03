# FTLDee — CLAUDE.md

## Game Concept

A procedural historical career RPG inspired by FTL. You play John Dee (c. 1580) navigating
Elizabethan England as an intellectual courtier. Instead of weapons and ship modules, you
invest in books, skills, contacts, and patronage. Movement through a node map of courts,
libraries, and households replaces spatial travel. The core question: which intellectual
and political relationships should I cultivate before the next change in court politics
makes my current repertoire obsolete?

The game models the concept from Melvin-Koushki: the grimoire is a manual for the courtier.
Books are professional capabilities, not stat bonuses.

## NEW: Session 2026-10-03 Work

**Read these files in order for full context:**

1. **HANDOVER.md** — Session summary (5 min read)
   - What was built: biography DB, ecosystem analysis, world architecture
   - Key decisions made
   - Next steps by priority
   
2. **BIOGRAPHY.md** — Biography database documentation (10 min)
   - How the 58-entry database works
   - Query API reference
   - How encounters use biography
   - Extending for Turka
   
3. **WORLDBUILDING.md** — Shared world architecture (15 min)
   - 12 locations across both games
   - Crew placement mechanics (new)
   - Travel graph design
   - Implementation roadmap (7 phases)
   
4. **WORLDASSETS.md** — Asset catalog (5 min)
   - 10 asset categories (locations, buildings, books, presses, observatories, etc.)
   - Provenance tracking
   - Production timeline
   
5. **C:\Dev\ecosystem\SHARED_WORLD_ARCHITECTURE.md** — Full design reference
   - Complete location schemas
   - TypeScript interface definitions
   - Travel edge specifications

**Key artifacts created:**
- `src/data/biography/types.ts` — Biography schema (17 themes, status enum)
- `src/data/biography/entries.ts` — 58 Dee entries (people, events, documents, places, institutions, ventures)
- `src/data/biography/index.ts` — Query API (15+ functions)
- `C:\Dev\ecosystem\SHARED_WORLD_ARCHITECTURE.md` — Shared world design
- `C:\Dev\wiki\biography_ecosystem_analysis.md` — Dev ecosystem audit

**Next session priorities:**
1. Build Turka biography layer (using FTLDee pattern as template)
2. Implement shared geography layer (types.ts + 12 locations)
3. Create asset inventory & provenance tracking
4. Read FTLDee.txt (Downloads) and integrate ideas (see FTLDEENEXTSTEPS.md TODO)

## Technology Stack

- TypeScript (strict)
- Vite 5 (dev server and build)
- Vanilla HTML/CSS — no React, no heavy framework
- Local TypeScript data files — no backend, no paid APIs
- Seeded RNG (mulberry32)

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build to dist/
npm run preview      # preview production build
npm run test         # run vitest
npm run typecheck    # tsc --noEmit
```

## Directory Structure

```
C:\Dev\FTLDee\
├── CLAUDE.md
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── docs/
│   ├── DESIGN.md          — authoritative game design
│   ├── HISTORY.md         — historical / counterfactual provenance
│   ├── VERTICAL_SLICE.md  — scope of the first prototype
│   └── ARCHITECTURE.md    — technical architecture
├── src/
│   ├── main.ts            — entry point, screen routing
│   ├── core/
│   │   ├── types.ts       — all game types
│   │   ├── state.ts       — GameState, reducers, save/load
│   │   └── rng.ts         — seeded RNG (mulberry32)
│   ├── data/
│   │   ├── characters/    — Dee, Jane Dee, etc.
│   │   ├── books/         — book definitions
│   │   ├── locations/     — node definitions
│   │   ├── encounters/    — encounter templates
│   │   └── factions/      — faction definitions
│   ├── systems/
│   │   ├── travel.ts      — travel costs, accessibility
│   │   ├── encounter.ts   — encounter resolution
│   │   └── pressure.ts    — political weather / time pressure
│   └── ui/
│       ├── household.ts   — Mortlake household screen
│       ├── map.ts         — node map screen
│       ├── encounter_ui.ts — encounter screen
│       └── render.ts      — shared rendering utilities
└── tests/
    ├── rng.test.ts
    ├── travel.test.ts
    └── encounter.test.ts
```

## Design Principles

### Core Conceptual Distinctions (do not flatten these)
- **INTELLECTUAL CAPABILITY** vs. **POLITICAL ACCESS**
- **BOOK** vs. **KNOWLEDGE** — owning a book gives access to an operation; the skill converts it to capability
- **PERSON** vs. **STAT BONUS** — crew are alternative ways to perform operations
- **HOUSEHOLD** vs. **PARTY** — Mortlake is a persistent base, not a travel group
- **LIBRARY** vs. **INVENTORY** — books are professional tools, not loot
- **PATRON** vs. **QUEST GIVER** — patrons have their own agendas and change over time
- **COURT INTRIGUE** vs. **DIALOGUE TREE** — relationships are a network, not a conversation
- **POLITICAL WEATHER** vs. **REBEL FLEET** — pressure comes from changing political environments
- **HISTORICAL EVENT** vs. **COUNTERFACTUAL BRANCH** — always tagged

### Vocabulary
| RPG term    | This game's term  |
|-------------|-------------------|
| Class       | Career            |
| Stats       | Faculties         |
| Equipment   | Repertoire        |
| Weapons     | Operations        |
| Crew        | Network           |
| Party       | Household         |
| Quest       | Commission        |
| Quest giver | Patron            |
| Shop        | Market            |
| Loot        | Acquisition       |
| XP          | Learning          |
| Gold        | Patronage/Money   |
| Health      | Standing/Security |
| Pursuer     | Political Pressure|
| Death       | Career Collapse   |

### Core Mechanic
`BOOK + SKILL + CONTACT + PATRON = OPERATION`

Knowledge is combinatorial, not additive. A book provides operations; a skill converts
knowledge into capability; a contact provides opportunity; a patron provides demand.

## Historical-Content Rules

Every event must carry a `historicalStatus` tag:
- `documented` — attested in the historical record
- `plausible` — historically consistent reconstruction
- `contested` — the subject of historiographical debate
- `counterfactual` — a deliberate departure from the historical record
- `anachronistic` — deliberately out-of-time (player-created)

The game should never silently conflate these categories.

Do not fabricate quotations. Use descriptions and paraphrase, never invented speech attributed
to real historical figures.

When the design document or historical sources contain uncertainty, preserve that uncertainty
in the data rather than resolving it silently.

## Counterfactual Rules

- Mark all counterfactual content explicitly in data files
- The historical trajectory is the baseline, not the only outcome
- Counterfactuals emerge from player choices, not from random generation alone
- Model alternate paths as "nearby" to the historical record

## Testing Rules

- Each system (RNG, travel, encounter resolution) has unit tests
- Seeded RNG must reproduce identical runs given identical seeds
- Save/load round-trip must preserve full game state
- Encounter blue options must correctly evaluate requirements

## Research Pipeline

### Corpus (read-only external)
- **DeeChunks**: `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite`
  — 68 documents, 3,052 chunks, FTS5 search; tables: biography_timeline (29 events),
  dee_spirit_action_summaries (117), dee_daybook_entry_summaries (1,464),
  scholarly_chapter_summaries (47), dee_writings_catalog (14)
- **DeeVisualNovel**: `C:\Dev\DeeVisualNovel\docs\BIOGRAPHY.md` (canonical biography,
  ATTESTED/DISPUTED/LEGEND/COUNTERFACTUAL tags) and `content\timeline.json` (29 events)
- **TurkaGame**: `C:\Dev\TurkaGame\CLAUDE.md` and `HANDOVER.md` for Ottoman arc references
- **RenMagDB**: `C:\Dev\renaissance magic\` for broader context

**Working rule**: do not re-read the PDFs. Query `dee_chunks.sqlite` (Python + sqlite3)
or read DeeChunks markdown files. Re-run DeeVisualNovel's research pipeline if the corpus
is rebuilt.

### Research files (in this project)
- `research/DEE_MASTER_BIOGRAPHY.md` — synthesised biography with encounter annotations
- `research/ENCOUNTER_CANDIDATES.md` — 9 designed encounter candidates
- `research/OTTOMAN_CONNECTION.md` — M-K 2021 framing, Murad III, Soyga thread
- `research/MECHANICS_FROM_BIOGRAPHY.md` — skill tree, rooms, book tiers, encounter gates
- `research/logs/PROMPT{N}METHODSANDRESULTS.md` — per-session research logs

### PROMPT log format
Every research session gets a log: `research/logs/PROMPT{N}METHODSANDRESULTS.md`.
Contents: what was asked, how it was interpreted, sources accessed, key findings,
decisions made, what was rejected and why, output produced, what next session should do.
Increment N for each new session. Never skip writing the log.

## Do Not Overbuild

The vertical slice covers Mortlake → continental departure decision.
Do not implement:
- Kelley's full dual-class tree (schema only)
- Arthur succession
- Continental Europe map
- Ibn Turka campaign (placeholder data only)
- Printing press system
- Full publication network
- Prague encounters
- Full political weather simulation (simplified only)

Build only what is needed for the 20-point completion checklist in VERTICAL_SLICE.md.
