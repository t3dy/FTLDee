# Location Assets — Quick Reference Card

## What You Need to Know

### The Core Idea

Locations are now **composable environments** with:
- **Buildings** (major structures)
- **Stations** (where crew work)
- **Residents** (NPCs)
- **Objects** (instruments, furnishings)
- **Documents** (letters, petitions, catalogues)
- **Services** (transactions, consultations)
- **Reference Assets** (historical images)
- **Audio Assets** (ambience, sounds)

All assets reference each other by ID → **no duplication**.

---

## Using Location Assets in Code

### Import the Query API

```typescript
import {
  getLocationAssets,
  getStations,
  getStationById,
  getBuildings,
  getResidents,
  getServices,
} from '../data/locations/assets_index.js';
```

### Get All Assets for a Location

```typescript
const mortlakeAssets = getLocationAssets('mortlake');
// Returns: { locationId, buildings, stations, residents, objects, documents, services, ... }
```

### Get Stations (Where Crew Work)

```typescript
const stations = getStations('mortlake');  // 9 stations
const londonStations = getStations('london');  // 6 stations

const libraryStation = getStationById('mortlake', 'mortlake_library');
// { id, name, buildingId, type, capacity, skillBonus, description }
```

### Get People at a Location

```typescript
const mortlakeResidents = getLocationAssets('mortlake').residents;
// [
//   { characterId: 'john_dee', role: 'permanent', stationPreference: 'mortlake_study' },
//   { characterId: 'jane_dee', role: 'permanent', stationPreference: 'mortlake_library' },
//   ...
// ]
```

### Get Services (What Can Be Done)

```typescript
const londonServices = getServices('london');
// [
//   { id: 'london_book_acquisition', type: 'transaction', costs: { money: 20 } },
//   { id: 'london_commission_printing', type: 'commission', costs: { money: 20 } },
//   ...
// ]
```

---

## Authoring New Locations

### Step 1: Open `src/data/locations/assets.ts`

### Step 2: Follow This Pattern

```typescript
// ============================================================================
// LOCATION_NAME
// ============================================================================

export const LOCATION_BUILDINGS: LocationBuilding[] = [
  { id: 'location_building_id', name: '...', type: 'structure', stationIds: [...], historicalStatus: 'documented' },
];

export const LOCATION_STATIONS: LocationStation[] = [
  { id: 'location_station_id', name: '...', type: 'library', capacity: 1, skillBonus: { ... }, buildingId: '...', },
];

export const LOCATION_RESIDENTS: LocationResident[] = [
  { characterId: 'person_id', role: 'permanent', historicalStatus: 'documented' },
];

export const LOCATION_OBJECTS: LocationObject[] = [
  { id: 'object_id', name: '...', category: 'instrument', skillBonus: { ... }, portable: false, historicalStatus: 'documented' },
];

export const LOCATION_DOCUMENTS: LocationDocument[] = [
  { id: 'doc_id', title: '...', type: 'letter', participants: [...], historicalStatus: 'documented' },
];

export const LOCATION_SERVICES: LocationService[] = [
  { id: 'service_id', name: '...', type: 'transaction', costs: { money: 20 }, historicalStatus: 'documented' },
];

export const LOCATION_REFERENCE_ASSETS: ReferenceAsset[] = [
  { id: 'asset_id', title: '...', type: 'map', source: '...', historicalConfidence: 'documented', intendedUses: [...], historicalStatus: 'documented' },
];

export const LOCATION_AUDIO_ASSETS: AudioAsset[] = [
  { id: 'audio_id', title: '...', type: 'ambient', stations: [...], historicalStatus: 'plausible' },
];
```

### Step 3: Register in `assets_index.ts`

```typescript
import {
  LOCATION_BUILDINGS,
  LOCATION_STATIONS,
  // ... other imports
} from './assets.js';

export const ALL_LOCATION_ASSETS: Record<string, LocationAssetRegistry> = {
  // ... existing locations ...
  location_id: {
    locationId: 'location_id',
    buildings: LOCATION_BUILDINGS,
    stations: LOCATION_STATIONS,
    residents: LOCATION_RESIDENTS,
    objects: LOCATION_OBJECTS,
    documents: LOCATION_DOCUMENTS,
    services: LOCATION_SERVICES,
    referenceAssets: LOCATION_REFERENCE_ASSETS,
    audioAssets: LOCATION_AUDIO_ASSETS,
  },
};
```

### Step 4: Validate

```bash
npm run typecheck  # Should pass with no errors
```

---

## Common Patterns

### Adding Skill Bonuses to a Station

Crew working in this station gain skill daily:

```typescript
{
  id: 'mortlake_laboratory',
  type: 'laboratory',
  skillBonus: { alchemy: 1, naturalPhilosophy: 0.5 },
  // 30 days of work → +30 alchemy, +15 natural philosophy
}
```

### Marking Contested Historical Content

When an asset's historical relationship is uncertain:

```typescript
{
  id: 'barn_elms_cipher_room',
  historicalStatus: 'contested',  // The relationship is debated
  // In encounters, frame as "possibly" or "allegedly"
}
```

### Requiring a Book to Know About an Object

An object that requires intellectual knowledge:

```typescript
{
  id: 'mortlake_sigillum_dei',
  requiresBook: 'agrippa_occulta',  // Must own/read Agrippa first
}
```

### Creating a Market Station

For buying/selling:

```typescript
{
  id: 'london_bookseller',
  type: 'market',
  capacity: 1,
  description: 'Browse and purchase rare books',
}
```

### Marking a Resident's Preference

Where an NPC is usually found:

```typescript
{
  characterId: 'john_dee',
  role: 'permanent',
  stationPreference: 'mortlake_study',  // Default location within Mortlake
}
```

---

## Historical Status Guide

| Status | Meaning | Use Cases |
|--------|---------|-----------|
| `documented` | Attested in historical record | Mortlake library, John Dee, 1577 comet |
| `plausible` | Historically consistent reconstruction | Scrying chamber, most household activities |
| `contested` | Subject of historiographical debate | Walsingham cryptography, some intelligence work |
| `counterfactual` | Deliberate departure from history | Constantinople Dee visit, Ottoman encounters |
| `anachronistic` | Deliberately out-of-time | For player-driven anachronisms only |

---

## File Organization

```
src/data/locations/
├── index.ts               ← Existing location card definitions
├── assets.ts              ← All asset definitions (NEW)
├── assets_index.ts        ← Query API and registry (NEW)
└── [future: prague, samarkand, etc.]

docs/
├── WORLDASSETS.md         ← Asset catalog (UPDATED)
├── WORLDBUILDING.md       ← Location architecture
└── VERTICAL_SLICE.md      ← Vertical slice scope

[root]
├── DECISIONS.md           ← Design decisions (NEW)
├── IMPLEMENTATION_REPORT.md ← This session's work (NEW)
└── LOCATION_ASSETS_QUICK_REFERENCE.md ← This card (NEW)
```

---

## Checklist Before Committing New Location

- [ ] All station IDs referenced in buildings actually exist
- [ ] All building IDs in stations actually exist
- [ ] All character IDs exist in `src/data/characters/`
- [ ] All book IDs exist in `src/data/books/`
- [ ] No duplicate IDs within the location
- [ ] Skill bonuses use valid SkillId values
- [ ] historicalStatus is from enum (documented/plausible/contested/counterfactual)
- [ ] Sources cited for documented assets
- [ ] Capacity values make sense (1-2 intimate, 1-4 open, 1-2 outdoor)
- [ ] Registered in assets_index.ts
- [ ] `npm run typecheck` passes

---

## Troubleshooting

**Q: "Type 'X' is not assignable to type 'HistoricalStatus'"**  
A: Check that historicalStatus uses one of: documented, plausible, contested, counterfactual, anachronistic

**Q: "Property 'xyz' is missing"**  
A: Some fields are optional (marked with ?). Check ReferenceAsset.historicalConfidence vs Location.historicalStatus — they're different enums.

**Q: "Cannot find module or its corresponding type declarations"**  
A: Did you add the import to assets_index.ts? New location files need to be imported there.

**Q: Skill bonuses not applying**  
A: Skills apply daily while crew works at station. Make sure skillBonus is on the LocationStation, not the LocationBuilding.

**Q: I want residents to appear at different stations**  
A: Use stationPreference to mark primary location. Multiple residents can prefer same station. Game logic determines who's where on a given day.

---

## References

- **Full Authoring Guide:** WORLDASSETS.md → "Authoring Location Assets" section
- **Design Decisions:** DECISIONS.md → why choices were made
- **Implementation Details:** IMPLEMENTATION_REPORT.md → what was done, how, and next steps
- **Type Definitions:** src/core/types.ts → "Location Assets" section (line ~296)

---

**Last Updated:** 2026-10-03  
**Status:** 5 locations complete (Mortlake, London, Greenwich, Windsor, Barn Elms)  
**Next:** Prague (Act 2), Samarkand Observatory (shared world)
