# Worldbuilding Documentation

**Status:** Architected, ready for Phase 1 implementation (2026-10-03)  
**Scope:** Shared world allowing Dee and Turka to move between each other's worlds  
**Location:** Design in `C:\Dev\ecosystem\SHARED_WORLD_ARCHITECTURE.md` (full schema)

---

## Vision

Two historical games on a **connected world** where:

- **Dee** can travel east (counterfactual) from London → Prague → Constantinople → Samarkand
- **Turka** can travel west (counterfactual) from Cairo → Samarkand → Constantinople → Prague → London
- Both share **locations, crew mechanics, and encounter pools**
- Crew work in **stations** within locations (not just a travel party)

---

## Core Worldbuilding Principles

1. **Real places, real history**
   - Every location is documented (Mortlake, Samarkand Observatory) or scholarly counterfactual (Ottoman route)
   - Historical status marked (documented/plausible/counterfactual)

2. **Crew is spatial, not abstract**
   - Crew placed in *stations* within locations (Scriptorium, Observatory Dome, Alchemy Lab)
   - Placement trains skills and unlocks encounters
   - Jane Dee in Mortlake's library works differently than in Samarkand's courtyard

3. **Travel is consequential**
   - Takes time (45–120 days), costs money, risks danger
   - Gated by contacts, books, reputation
   - Unlocks new regions and encounters

4. **Encounters tied to locations**
   - Each location has a pool of available encounters
   - Encounter gates include crew placement (e.g., "requires someone in Observatory")
   - Permanent residents trigger unique encounters

5. **Shared asset system**
   - Both games use same locations, stations, crew mechanics
   - Different eras (Dee 1550–1600, Turka 1369–1432) but same spatial system

---

## Location System

### Type Hierarchy

Locations are not flat nodes; they have structure:

```typescript
interface HistoricalLocation {
  // Identity
  id: string;
  label: string;
  historicalName?: string;      // Arabic/Timurid name
  
  // Geography & Era
  region: Region enum;           // England, Ottoman, Persia, Egypt, etc.
  era: 'dee' | 'turka' | 'both'; // Which games can access
  dateRange: [number, number];   // Historically active years
  
  // Spatial Layout
  type: 'household' | 'institution' | 'court' | 'marketplace' | 'lab' | 'neutral_hub';
  stations: Station[];           // Named work locations
  stationCapacity: number;       // Total crew
  
  // Mechanics
  accessibleFrom: LocationId[];
  requiresContact?: string[];
  requiresBook?: string[];
  requiresReputation?: { faction: string; minimum: number };
  
  // Inhabitants & Encounters
  permanentResidents: NPCId[];
  seasonalFigures: NPCId[];
  availableEncounters: EncounterId[];
  
  // Travel
  costToTravel: number;
  riskLevel: 'low' | 'medium' | 'high';
  historicalStatus: HistoricalStatus;
}
```

### Stations

Named locations where crew can work:

```typescript
interface Station {
  id: string;              // "scriptorium", "observatory_dome"
  label: string;
  skillBonus?: SkillBonus; // +1 mathematics for working here
  capacity: number;        // How many crew can work here
  requiredRole?: Role;     // Only certain crew types
}
```

**Example stations:**
- Mortlake: Library, Study, Scriptorium, Laboratory, Scrying Chamber, Correspondence Office
- Samarkand Observatory: Main Dome, Observatory Wing, Courtyard, Astrolab Workshop, Quranic Study, Secretariat
- Prague: Rudolf's Palace, Alchemical Laboratory, Observatory, Library, Printing House
- Cairo: Al-Azhar Mosque, Library Quarter, Sultan's Palace, Alchemist's Quarter, Merchant Guild

---

## The 12 Major Locations

### Dee Era (1550–1600)

#### England
1. **Mortlake** — Dee's home base (1570–1608)
   - Type: Household
   - Stations: 7 (Library, Study, Scriptorium, Lab, Scrying Chamber, Correspondence, Quarters)
   - Permanent: Jane Dee, Roger Cooke
   - Skill boost: All intellectual skills
   - Historical status: Documented

2. **Greenwich Palace** — Royal court (Elizabeth's intellectual circle)
   - Type: Royal court
   - Stations: 4 (Presence Chamber, Library, Audience, Mathematical Room)
   - Permanent: Elizabeth I
   - Seasonal: Leicester, Sidney
   - Historical status: Documented

3. **Windsor Castle** — Royal court
   - Type: Royal court
   - Stations: 4 (Throne Room, Observatory, Library, Military Council)
   - Encounters: Comet interpretation, imperial consultation
   - Historical status: Documented

4. **Barn Elms** — Walsingham's estate (intelligence center)
   - Type: Noble estate
   - Stations: 4 (Intelligence Office, Cipher Room, War Room, Guest Quarters)
   - Permanent: Walsingham
   - Skill boost: Cryptography, Courtly Intelligence
   - Historical status: Documented

5. **London** — Marketplace & scholarly hub
   - Type: Marketplace
   - Stations: 4 (Printer's Workshop, Bookseller, Exchange, Scholar's Inn)
   - Encounters: Book acquisition, contact building
   - Historical status: Documented

#### Continental Europe
6. **Louvain** — Mathematical center (1548–1550, Dee's study)
   - Type: University
   - Permanent: Gemma Frisius (historical; replay only)
   - Era: Dee backstory/memory
   - Historical status: Documented

7. **Prague** — Imperial court & research hub (1584–1589)
   - Type: Imperial court + research
   - Stations: 5 (Rudolf's Palace, Alchemy Lab, Observatory, Library, Printing House)
   - Permanent: Rudolf II
   - Skill boost: Alchemy, Occult Philosophy
   - Historical status: Documented

#### Ottoman (Counterfactual)
8. **Constantinople** — Ottoman capital (counterfactual Dee destination)
   - Type: Imperial court
   - Stations: 4 (Sultan's Court, Dervish Lodge, Imperial Library, Observatory)
   - Permanent: Murad III (counterfactual)
   - Access: Requires occult_philosophy ≥ 6 + prior choices
   - Historical status: Counterfactual

### Turka Era (1369–1432)

#### Central Asia
9. **Samarkand Observatory** — Ulugh Beg's research center (1405–1420)
   - Type: Institution (research center + court)
   - Stations: 6 (Main Dome, Mathematical Library, Courtyard, Astrolab Workshop, Quranic Study, Secretariat)
   - Permanent: Ulugh Beg, court astronomers
   - Seasonal: Ibn Turka (visits)
   - Skill boost: Mathematics, Astronomy, Theology, Kabbalah
   - Historical status: Documented

10. **Yazd** — Sufi center (Ibn Turka's refuge, c. 1420–1430)
    - Type: Household + mystical center
    - Stations: 4 (Sufi Retreat, Philosopher's Chamber, Gardens, Library of Hidden Sciences)
    - Permanent: Ibn Turka (later life)
    - Skill boost: Occult Philosophy, Mysticism, Kabbalah
    - Historical status: Documented

#### Persia / Iran
11. **Isfahan** — Safavid court (c. 1415–1425)
    - Type: Royal court
    - Stations: 4 (Royal Palace, Philosophical Circle, Library, Garden Pavilion)
    - Encounters: Court intrigue, political maneuvering
    - Historical status: Documented

#### Egypt
12. **Cairo** — Scholarly & political hub (c. 1393–1408, Ibn Turka's formation)
    - Type: City + scholarly hub
    - Stations: 5 (Al-Azhar Mosque, Library Quarter, Sultan's Palace, Alchemist's Quarter, Merchant Guild)
    - Skill boost: Theology, Alchemy, Languages (Arabic), Occult Philosophy
    - Historical status: Documented

### Shared / Neutral

- **Baghdad Library** (counterfactual, neutral ground for scholarship)
- **Medina / Mecca** (pilgrimage hub, accessible to Turka)

---

## Travel Graph

Locations connected by edges with costs, risk, and requirements.

```typescript
interface TravelEdge {
  from: LocationId;
  to: LocationId;
  travelDays: number;           // 1–120
  cost: number;                 // Money/resources
  riskLevel: 'low' | 'medium' | 'high';
  requiresContact?: string[];   // Must know guide/patron
  requiresBook?: string[];      // Knowledge of maps, languages
  requiresReputation?: { faction: string; minimum: number };
  season?: string;              // Only passable certain times
  historicalStatus: HistoricalStatus;
  description: string;
}
```

**Example edges:**
- Mortlake → Greenwich: 1 day, 5 cost, low risk, documented (boat on Thames)
- Mortlake → Prague: 45 days, 100 cost, high risk, documented (continental journey, requires Laski)
- Prague → Constantinople: 60 days, 150 cost, high risk, counterfactual (eastern route, requires occult_philosophy ≥ 6)
- Cairo → Samarkand: 90 days, 200 cost, high risk, documented (Silk Road, requires patron)

---

## Crew Placement Mechanics

**New mechanic:** Crew work in stations, gaining skills and unlocking encounters.

```typescript
interface CrewPlacement {
  locationId: LocationId;
  stationId: StationId;
  character: CharacterId;
  daysWorking: number;          // Accumulates
  skillGainPerDay: SkillBonus;  // +0.1 mathematics/day
  encounterWeight?: number;     // 1.5x more likely to trigger alchemy encounters
}
```

**Example:** Kelley works in Samarkand Observatory's Astrolab Workshop for 30 days:
- Gains 3 alchemy skill (0.1 × 30)
- Gains 4.5 occult philosophy (0.15 × 30)
- Unlocks "Alchemical Secrets" encounter
- Receives letter from Ulugh Beg
- Can teach visiting scholars

**Game loop:**
1. Player arrives at location
2. Assigns crew to available stations
3. Crew work for N days
4. Skill gains accumulate
5. Encounters trigger based on crew presence
6. Player can move crew elsewhere or depart

---

## Encounter Gating by Location

Each location has a pool of available encounters.

```typescript
interface LocationEncounterPool {
  locationId: LocationId;
  availableEncounters: Array<{
    encounterId: EncounterId;
    triggerCondition?: string;    // "crew_in_station=observatory_dome"
    rarity: 'common' | 'uncommon' | 'rare';
    requiresBook?: string;
    requiresSkill?: SkillId;
    requiresReputation?: { faction: string; minimum: number };
  }>;
}
```

**Example:** Samarkand Observatory encounters:
- "Ulugh Beg audience" — rare, triggers if Ulugh Beg present + reputation ≥ 40
- "Astrolab discovery" — common, triggers if crew in Astrolab Workshop + mathematics ≥ 3
- "Ibn Turka letter arrives" — rare, triggers if Ibn Turka present
- "Samarkand arrival scene" — narrative, triggers on first visit

---

## Cross-Game Crew Compatibility

How crew from Dee's world interact with Turka's world (and vice versa).

```typescript
interface Character {
  id: string;
  historicalPeriod: 'dee' | 'turka' | 'both';
  canTravelTo: LocationId[];     // Which locations are reachable
  prefers: Region[];             // Comfortable regions
  canMeet: CharacterId[];        // Who they can interact with
  ageInEra: { dee?: number; turka?: number };
}
```

**Example:** Jane Dee (Dee-era character)
- Home: Mortlake
- Can travel to: Mortlake, Greenwich, Windsor, London, Prague
- Prefers: England, Holy Roman Empire
- Cannot travel to: Samarkand, Cairo, Yazd (too far, historically implausible)
- Can meet: Dee, Elizabeth I, Leicester, Laski (but not Ulugh Beg)

**Example:** Ulugh Beg (Turka-era character)
- Home: Samarkand Observatory
- Can travel to: Samarkand, Isfahan, Yazd
- Prefers: Central Asia, Persia
- Cannot travel to: London, Prague (historically implausible)
- Can meet: Ibn Turka, Cairo scholars (but not Dee, unless both in Samarkand counterfactually)

---

## Asset Layer

Each location has visual/audio assets:

```typescript
interface LocationAssets {
  locationId: LocationId;
  layout2D: { image: string; stationMarkers: Array<{ stationId, x, y }> };
  model3D?: { meshPath: string; texturesPath: string[] };
  referenceImages: Array<{ id, title, source, provenance, year, path }>;
  ambientSound?: string;
  musicTrack?: string;
  flavorText: string;
  historicalContext: string;
}
```

**Asset inventory for 6 major locations:**
- Mortlake: Layout PNG, reference (Agas map), household ambience audio
- Samarkand Observatory: Layout PNG, 3D model (Babylon.js), historical illustrations, muezzin calls
- Prague: Layout PNG, Rudolf's palace architecture photo, market ambience
- Cairo: Layout PNG, manuscript illustrations, mosque ambience
- Greenwich Palace: Layout PNG, royal court architecture, bells
- Constantinople: Layout PNG, Ottoman architecture, call to prayer

---

## Implementation Roadmap

### Phase 1: Core Location Data (2 weeks)
- [ ] Create `shared/geography/types.ts` (Location, Station, Region, Era, TravelEdge interfaces)
- [ ] Define 12 major locations in JSON or TypeScript
- [ ] Build travel graph (connectivity between locations)
- [ ] Document in `WORLDASSETS.md` (asset inventory)

### Phase 2: Crew Placement Mechanics (2 weeks)
- [ ] Implement CrewPlacement data structure
- [ ] Skill gain system (crew working in stations)
- [ ] Station-based encounter triggering
- [ ] UI for crew placement (drag-and-drop grid per location)

### Phase 3: FTLDee Integration (2 weeks)
- [ ] Upgrade FTLDee's node system to support locations
- [ ] Integrate crew placement into Mortlake household screen
- [ ] Add travel system (node → location → stations)
- [ ] Test: Crew can be placed, work, gain skills, unlock encounters

### Phase 4: Asset Inventory (3 weeks)
- [ ] Create 2D layout PNGs for 6 major locations
- [ ] Source historical reference images (OCCULTIMGDB provenance)
- [ ] Record ambient audio/music for each region
- [ ] Optional: 3D models (Babylon.js/Three.js)

### Phase 5: TurkaGame Integration (2 weeks)
- [ ] Add locations to TurkaGame's CareerSim
- [ ] Crew placement in Samarkand, Cairo, Yazd
- [ ] Encounter pools per location
- [ ] Test: Turka can move crew, trigger encounters

### Phase 6: Cross-Game Features (2 weeks)
- [ ] Dee's counterfactual eastern path (occult_philosophy ≥ 6)
- [ ] Turka's optional western path (counterfactual)
- [ ] Shared encounter pool (both games can trigger location encounters)
- [ ] Cross-crew compatibility (who can meet whom)

### Phase 7: Polish (ongoing)
- [ ] Verify all locations against historical sources
- [ ] Balance travel costs and risk
- [ ] Encounters reflect biography database (theme-tagged)
- [ ] Art direction consistency across locations
- [ ] Narrative consistency (encounters reference biography)

---

## Methods & Decisions

### Why Crew Placement?

**Problem:** Household management (Jane at Mortlake, Kelley in Prague) feels abstract in node-based travel.

**Solution:** Crew assigned to *stations* within locations. Placement directly trains skills, unlocks encounters, creates long-term planning:
- "Keep Kelley in alchemy lab for 2 weeks?" or "Move him to correspondence?"
- "Should Jane manage the household or teach visiting scholars?"

**Benefit:** Feels more lived-in; creates meaningful resource trade-offs.

### Why Shared Locations?

**Problem:** Two games on separate worlds can't interact; no reason to connect them.

**Solution:** Both games use same location/station/crew system. Different eras, same spatial logic.
- Dee reaches Samarkand (counterfactual)
- Turka reaches London (counterfactual)
- Meet in shared spaces (Constantinople, neutral hubs)

**Benefit:** Expands both games' scope; players discover shared history.

### Why Theme-Tag Everything?

**Problem:** Encounters don't know which biography entries are relevant.

**Solution:** All locations, people, encounters tagged by historiographical theme (relationships, occult_philosophy, navigation, etc.). Encounters query by theme.

**Benefit:** Encounters can ask "who here cares about empire?" and get back named figures with backstories.

---

## Verification Checklist

Before shipping Phase 1:

- [ ] All 12 locations defined (ID, label, stations, inhabitants, encounters)
- [ ] Travel graph connects all locations (no isolated nodes)
- [ ] All travel edges have costs, risk, historical status
- [ ] All locations have station definitions (capacity, skill bonuses)
- [ ] All permanent residents exist in character database
- [ ] All encounters exist (or are marked TODO)
- [ ] All locations have 2D asset paths (even if placeholder)
- [ ] All historical statuses verified against sources

---

## Known Risks & Mitigations

### Risk: Too many locations (player lost)

**Mitigation:**
- Start with 6 major ones (Mortlake, Greenwich, Prague, Samarkand, Cairo, Constantinople)
- Add others as counterfactual paths unlock
- Clear signposting (map, travel menu)

### Risk: Crew placement UI too complex

**Mitigation:**
- Start with Mortlake (6 stations, familiar)
- Drag-and-drop or click-to-assign
- Show skill gains live ("+3 alchemy if Kelley stays 30 days")

### Risk: Travel costs make game feel grindy

**Mitigation:**
- Fast-travel option (no encounters) vs. scenic route (more encounters)
- Patron relationships reduce costs (Walsingham → cheap travel)
- Books unlock shortcuts (Map → faster navigation)

### Risk: Counterfactual paths feel forced

**Mitigation:**
- Earn Ottoman route through *choices*, not unlocks
- First choice hints at it (Book of Soyga mentions Ottoman magic)
- Gate strictly (occult_philosophy ≥ 6, specific reputation, etc.)
- Make it rare and consequential (ending changes)

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `C:\Dev\ecosystem\SHARED_WORLD_ARCHITECTURE.md` | Full schema (read for details) |
| `WORLDASSETS.md` | Asset inventory (what to build) |
| `BIOGRAPHY.md` | How biography entries gate locations |
| `FTLDee/HANDOVER.md` | Session summary |

---

**Last updated:** 2026-10-03  
**Next action:** Start Phase 1 (define location types and populate 12 major locations), or read WORLDASSETS.md for asset inventory details.
