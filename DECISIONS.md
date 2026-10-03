# Design Decisions — FTLDee Location Asset System

**Date: 2026-10-03**  
**Status: Implemented for vertical slice (5 locations)**

---

## Decision 1: Location Asset Composition Over Extension

### Decision
Locations are extended with optional asset layers (buildings, stations, residents, objects, documents, services, reference assets, audio) rather than creating separate systems for each asset type.

### Why
- **Composability**: Assets reference each other by ID (e.g., "this service requires this station, this resident, this object")
- **Consistency**: All asset types share the same CardMeta pattern (sources, historicalStatus, glyph)
- **Extensibility**: New asset types can be added to Location without breaking existing code
- **Legibility**: Location data reads as a unified "environment" rather than scattered across files

### Trade-off
- More TypeScript data files (assets.ts, assets_index.ts) 
- Need query API to access assets (not direct from Location)

### How to Apply
When adding new asset types (e.g., Networks, Rituals, Crew Billet), extend Location and add corresponding asset export.

---

## Decision 2: Stations Are Distinct From Household Rooms

### Decision
Stations (LocationStation) are separate from Rooms (RoomCard) to support **multiple locations** with **uniform mechanics**.

**Mortlake Rooms** (existing):
- library, study, scriptorium, laboratory, scryingChamber, instrumentRoom, correspondence, quarters

**Mortlake Stations** (new):
- Include all rooms + garden + visitor_area

**Other Locations' Stations**:
- London: bookseller, stationer, printer, binder, exchange, inn
- Greenwich: presence_chamber, library, mathematical_room, courtyard
- etc.

### Why
- Rooms are household-specific; stations are universal
- A printing workshop in London ≠ Laboratory in Mortlake, but both are "stations"
- Allows Dee/Turka to work in the same location system at different times
- Crew skill gains in "library" at Mortlake vs. "library" at Cairo are comparable

### Trade-off
- Two different types for similar concepts
- UI needs to handle both (but ultimately shows stations to player)

### How to Apply
- Use **LocationStation** for all locations (including Mortlake override of household rooms)
- Use **RoomCard** only for the household upgrade system (cost, building progression)
- When creating encounters, gate on station + location, not room

---

## Decision 3: Historical Status at Asset Level, Not Location

### Decision
Each asset (building, station, resident, object, document, service) carries its own historicalStatus rather than applying one status to the entire location.

### Why
- **Granularity**: Mortlake's Library is documented, but the Scrying Chamber is plausible
- **Accuracy**: The House exists (documented), but crew placement mechanics are plausible reconstruction
- **Future-proofing**: If research corrects one aspect of Mortlake, we update one asset, not the whole location

### Trade-off
- More annotation work when authoring
- But catches historical inaccuracies at a fine grain (glyph 'eye' for Walsingham is marked contested, not the whole Barn Elms location)

### How to Apply
When authoring new assets, always include historicalStatus. When writing encounters, check the status of the *asset* (person, object, building), not the location.

---

## Decision 4: Two-Tier Reference Assets (historicalConfidence separate)

### Decision
ReferenceAsset has two historical fields:
- **historicalStatus**: `documented | plausible | contested | counterfactual | anachronistic` (HistoricalStatus enum)
- **historicalConfidence**: `documented | reconstructed | speculative` (image quality)

### Why
- An image might be **documented** (the thing in it is real) but **speculative** (we're guessing what it looked like)
- Or **plausible** (the thing probably existed) but **documented** (we have a surviving image)
- Supports asset use that's different from the content status

**Examples:**
- Mortlake library: `historicalStatus: 'documented'`, image confidence: `'reconstructed'` (the library existed, but we're reconstructing its appearance)
- Windsor comet: `historicalStatus: 'documented'`, image: `'speculative'` (the comet happened, but nobody drew it at the time)

### Trade-off
- Adds a third layer of historical reasoning
- But prevents conflating "the thing existed" with "we have a picture of it"

### How to Apply
When adding reference images:
1. Mark **historicalStatus** based on what the image *depicts* (did this thing exist?)
2. Mark **historicalConfidence** based on the image's *source* (do we have a real historical image, or a reconstruction?)

---

## Decision 5: Services as Encounters Alternative

### Decision
LocationService is a lightweight alternative to encounters for simple transactions/consultations.

```typescript
// Encounter: full branching, complex requirements, multiple outcomes
{ id: 'comet_at_windsor', choices: [...] }

// Service: single transaction with fixed cost/outcome
{ id: 'greenwich_mathematical_presentation', costs: { time: 5 }, outcomes: { reputation: 2 } }
```

### Why
- Not every location action needs a full encounter tree
- Services model "what can you buy/do here" without game branching
- Keeps location data concise (services) vs. encounter data (choices)

### Trade-off
- Services can't have conditional outcomes (no blue options)
- But encounters can reference services as an option ("Choose to attend the mathematical presentation")

### How to Apply
Use **LocationService** for:
- Market transactions (buy book, commission printing)
- Standing offers (consultation, lodging)
- Repeatable actions without variance

Use **Encounter** for:
- Unique historical moments (comet at Windsor)
- Complex decision trees with different outcomes
- Drama/narrative branching

---

## Decision 6: Vertical Slice Priority (Mortlake, London, Greenwich, Windsor, Barn Elms)

### Decision
Implement 5 locations fully before others.

| Location | Stations | Reason |
|----------|----------|--------|
| **Mortlake** | 9 | Home base; most detailed household |
| **London** | 6 | Economy/marketplace hub; book acquisition |
| **Greenwich** | 4 | Court network; royal access |
| **Windsor** | 3 | Comet encounter; royal consultation |
| **Barn Elms** | 4 | Walsingham network; intelligence (contested) |

### Why
- These 5 locations cover the vertical slice narrative (Mortlake → court → London → comet → Prague preparation)
- Each has distinct mechanical flavor (household, market, court, court, intelligence)
- Remaining locations (Prague, Samarkand, Constantinople, Cairo, etc.) are Act 2+ scope

### Trade-off
- Incomplete world map during first playthrough
- But full asset depth where it matters

### How to Apply
- When authoring new encounters: place them in these 5 locations first
- When adding to missing locations: use Prague for Act 2, Samarkand as the shared-world hub
- Don't fully expand until those locations are in active play

---

## Decision 7: No Location State in Data (v1)

### Decision
Location states (normal → damaged → abandoned) are **defined in the type** but **not populated** in v1 data.

### Why
- State transitions depend on the full campaign narrative (when Mortlake is damaged, which act, which choice)
- Game state lives in `GameState`, not asset data
- Type supports it for future use without forcing premature implementation

### How to Apply
In v2, implement location state by:
1. Add `currentState` to each location in game state
2. Create state transition rules in encounters (e.g., "Choose to flee Prague" sets Prague to 'inaccessible')
3. UI shows location appearance/station availability based on state

---

## Decision 8: Resident Role Over Character Placement

### Decision
LocationResident stores `role: 'permanent' | 'seasonal' | 'transient' | 'visiting'`, not crew assignments.

```typescript
// Asset layer (data):
{ characterId: 'jane_dee', role: 'permanent', stationPreference: 'library' }

// Game state (runtime):
{ characterId: 'jane_dee', post: { kind: 'room', room: 'library' }, location: 'mortlake' }
```

### Why
- Assets describe historical reality (Jane lived at Mortlake)
- Game state tracks current assignments (Jane is working in Library today)
- Cleanly separates "what exists" from "where is it currently"

### Trade-off
- Need both systems (assets + game state)
- But prevents data/state desynchronization

### How to Apply
When initializing Mortlake:
1. Read residents from asset
2. Create initial crew posts in GameState based on role (permanent → default position)
3. Player can move crew between stations

---

## Decision 9: No Backward-Compat Breaking for Rooms

### Decision
RoomCard and LocationRoom (the household system) remain intact. LocationStation is an **addition**, not a replacement.

### Why
- Existing room upgrade mechanics (library 1 → 2 → 3) work unchanged
- Encounters currently reference rooms; no rewrite needed
- Mortlake works with both systems: room levels for cost/upgrades, stations for crew placement

### Trade-off
- Two parallel hierarchies (rooms + stations in Mortlake)
- But keeps existing mechanics stable

### How to Apply
New features should use stations (composable, universal). Existing mechanics keep using rooms (household-specific).

---

## Decision 10: Query API Over Direct Access

### Decision
Created `src/data/locations/assets_index.ts` with query functions:

```typescript
getLocationAssets(locationId) → LocationAssetRegistry
getStations(locationId) → LocationStation[]
getStationById(locationId, stationId) → LocationStation | null
```

Rather than:

```typescript
// DON'T do this:
const stations = LOCATIONS.find(l => l.id === 'mortlake')?.stations;
```

### Why
- Centralized access pattern (all lookups go through assets_index)
- Easy to add caching/filtering later
- Makes it clear which code depends on which assets

### How to Apply
When accessing location assets:
```typescript
import { getStations, getStationById } from '../data/locations/assets_index.js';

const stations = getStations('mortlake');
const station = getStationById('mortlake', 'mortlake_library');
```

---

## Decision 11: historicalStatus ≠ Encounter Gating

### Decision
An asset can be `plausible` in historicalStatus, but still used in a `documented` encounter.

```typescript
// Asset:
{ id: 'walsingham_cipher_room', historicalStatus: 'contested' }

// Encounter:
{ id: 'barn_elms_cipher_encounter', historicalStatus: 'documented' }
```

### Why
- Encounter is documented (it happened)
- Asset's uncertainty doesn't gate the encounter's historical certainty
- Different meanings: asset status is "how much do we know about this thing", encounter status is "did this event occur"

### Trade-off
- Can be confusing (documented encounter uses contested asset)
- But captures the nuance that Dee's role with Walsingham is contested, but his visits to Barn Elms are documented

### How to Apply
Mark encounters by their own historical status, not the status of their locations/assets.

---

## Decision 12: Authoring Guide Before Scaling

### Decision
Created comprehensive authoring guide in WORLDASSETS.md *before* implementing Prague, Samarkand, etc.

### Why
- Ensures consistency as new locations are added
- Prevents ad-hoc design decisions
- Makes it clear what a "complete" location looks like

### How to Apply
When adding Prague, Samarkand, Constantinople, Cairo:
1. Read the authoring guide in WORLDASSETS.md
2. Follow the 10-step structure (buildings, stations, residents, objects, documents, services, reference assets, audio, registration, validation)
3. Run validation checklist before PR

---

## Next Decisions Needed

- [ ] How to handle crew skill training at stations (per-day gains vs. milestone-based)
- [ ] Whether services can trigger encounters (transition mechanism)
- [ ] Audio asset playback strategy (looping, crossfade, volume)
- [ ] 3D model integration (Babylon.js vs. WebGL native)
- [ ] State transition triggers (which encounters set location states)
- [ ] Cross-location crew movement cost/time
