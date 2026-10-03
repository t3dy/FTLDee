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
