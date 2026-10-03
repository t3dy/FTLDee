# World Assets Catalog

**Status:** Location Asset System Implemented (2026-10-03)  
**Purpose:** Define all asset types needed for Dee ↔ Turka shared world  
**Scope:** Locations, buildings, books, printing presses, observatories, brotherhoods, institutions

**Latest Changes:**
- Added location asset layer: buildings, stations, residents, objects, documents, services
- TypeScript types for composable location assets
- Initial data for Mortlake, London, Greenwich, Windsor, Barn Elms (vertical slice)
- Query API in `src/data/locations/assets_index.ts`

---

## The Location Asset Model

Locations are transformed from simple map nodes into **rich, composable historical environments**. Each location can contain:

```
LOCATION
├── BUILDINGS (major structures)
├── STATIONS (where crew work)
├── RESIDENTS (NPCs: permanent, seasonal, transient)
├── OBJECTS (instruments, furnishings, relics)
├── DOCUMENTS (letters, petitions, catalogues)
├── SERVICES (transactions, consultations)
├── REFERENCE ASSETS (historical images with provenance)
├── AUDIO ASSETS (ambience, period soundscape)
└── STATE (normal → damaged → abandoned)
```

This allows:
- **Composability**: Assets reference each other by ID (no duplication)
- **Encounters**: Can require a location + station + person + object + skill combination
- **Progression**: Locations change state (Mortlake library goes from full → catalogued → abandoned)
- **Provenance**: Every asset tracks historical status and sources

---

## TypeScript Schema

All new location assets are defined in `src/core/types.ts` under the "Location Assets" section:

| Type | Purpose | Fields |
|------|---------|--------|
| **LocationBuilding** | Major structure within location | id, name, stationType, stationIds[], historicalStatus |
| **LocationStation** | Work location (crew placed here) | id, name, buildingId, type, capacity, skillBonus, description |
| **LocationResident** | NPC present at location | characterId, role, stationPreference, historicalStatus |
| **LocationObject** | Instrument, furnishing, relic | id, name, category, skillBonus, portable, historicalStatus |
| **LocationDocument** | Letter, petition, catalogue, etc. | id, title, type, creator, participants, historicalStatus |
| **LocationService** | Transaction or consultation available | id, name, type, costs, outcomes, requirements, historicalStatus |
| **ReferenceAsset** | Historical image with provenance | id, title, type, source, provenance, historicalConfidence |
| **AudioAsset** | Ambience or effect sound | id, title, type, stations, duration, source, historicalStatus |

### StationType Enum

Stations can be:
- `library`, `study`, `laboratory`, `workshop`, `courtyard`, `chamber`, `archive`, `audience`, `market`, `garden`, `observatory`, `chapel`, `scriptorium`, `correspondence`, `quarters`, `kitchen`, `other`

### LocationState Enum

Locations transition through states:
- `normal` — standard operation
- `developed` — upgraded (Mortlake invested in)
- `degraded` — showing wear
- `abandoned` — no longer accessible
- `damaged` — from destruction or loss
- `departure_preparation` — pre-voyage state
- `inaccessible` — political/physical barriers
- `custom` — location-specific states

---

## Asset Categories

### 1. LOCATIONS (12 major)

Geographic nodes where crew can be placed and encounters happen.

Each location is implemented with full asset definitions in `src/data/locations/assets.ts`:

```typescript
export interface LocationAssetRegistry {
  locationId: string;
  buildings: LocationBuilding[];
  stations: LocationStation[];
  residents: LocationResident[];
  objects: LocationObject[];
  documents: LocationDocument[];
  services: LocationService[];
  referenceAssets: ReferenceAsset[];
  audioAssets: AudioAsset[];
}
```

**Locations in Vertical Slice (Implemented):**

#### Dee-Era (1550–1600)
| Location | Type | Buildings | Stations | Status | Residents |
|----------|------|-----------|----------|--------|-----------|
| **Mortlake** | Household | 7 | 9 | ✓ Complete | Dee, Jane, Cooke, Kelley |
| **London** | Marketplace | 4 | 6 | ✓ Complete | Merchant network |
| **Greenwich Palace** | Court | 2 | 4 | ✓ Complete | Elizabeth, Leicester, Sidney |
| **Windsor Castle** | Court | 1 | 3 | ✓ Complete | Elizabeth |
| **Barn Elms** | Estate | 2 | 4 | ✓ Complete | Walsingham |

**Locations to Implement:**

#### Dee-Era (1550–1600)
| Location | Type | Status | Priority |
|----------|------|--------|----------|
| Louvain | University | Design | Medium (backstory) |
| Prague | Court | Skeleton | High (Act 2) |
| Constantinople | Court (CFX) | TODO | Low (counterfactual path) |

#### Turka-Era (1369–1432)
| Location | Type | Status | Priority |
|----------|------|--------|----------|
| Samarkand Observatory | Institution | TODO | High (flagship location) |
| Samarkand City | Marketplace | TODO | High |
| Yazd | Household | TODO | Medium |
| Isfahan | Court | TODO | Low (needs research) |
| Cairo | City | TODO | Medium |

---

### 2. BUILDINGS & STATIONS (50+ total)

Specific rooms/spaces within locations where crew work.

```typescript
interface BuildingAsset {
  id: string;                    // "mortlake_library", "samarkand_observatory_dome"
  locationId: LocationId;
  stationType: StationType;
  skillBonus: SkillBonus;
  
  // Assets
  icon?: string;                 // Small icon (32x32 PNG)
  interiorLayout?: string;       // Detailed room layout (PNG)
  model3D?: string;              // 3D model for exploration
  flavorImage?: string;          // Atmospheric reference image
}
```

#### Mortlake Household (7 buildings)
- **Library** — Main manuscript collection
  - Assets: Shelving system, manuscript pile reference images, candlelit ambience
  - Skill: Manuscript Knowledge +1
  
- **Study** — Dee's personal workspace
  - Assets: Desk, instruments, paper scattered, quiet ambience
  - Skill: Writing +1
  
- **Scriptorium** — Copying room (Cooke works here)
  - Assets: Long tables, quills, parchment, copying ambience
  - Skill: Manuscript Knowledge +1, Writing +0.5
  
- **Laboratory** — Alchemical apparatus
  - Assets: Furnace, alembics, herbs, alchemical ambience
  - Skill: Alchemy +1
  
- **Scrying Chamber** — Kelley's workspace
  - Assets: Mirror, curtains, mystical ambience, candles
  - Skill: Occult Philosophy +1
  
- **Correspondence Office** — Letters & records
  - Assets: Inkwells, ledgers, postal system references
  - Skill: Courtly Intelligence +1
  
- **Quarters** — Living space
  - Assets: Beds, fireplace, domestic ambience
  - Skill: Household +0.5

#### Samarkand Observatory (6 buildings)
- **Main Observatory Dome** — Instruments & observation
  - Assets: Astrolabe, astronomical instruments, night sky references
  - Skill: Astronomy +1.5
  
- **Mathematical Library** — Calculation & tables
  - Assets: Calculation tables, geometry diagrams, scholarly ambience
  - Skill: Mathematics +1.5
  
- **Courtyard** — Gathering & public space
  - Assets: Fountain, trees, marketplace sounds in background
  - Skill: Relationships +0.5
  
- **Astrolab Workshop** — Instrument construction
  - Assets: Workshops, tools, brass astrolabes, craftwork sounds
  - Skill: Alchemy +1, Mathematics +1
  
- **Quranic Study** — Religious scholarship
  - Assets: Manuscripts, prayer rugs, Quranic verses, call to prayer
  - Skill: Theology +1, Languages (Arabic) +0.5
  
- **Secretariat** — Record-keeping & administration
  - Assets: Ledgers, seals, official documents, administrative ambience
  - Skill: Courtly Intelligence +1

#### Other Locations (stations follow same pattern)
- Greenwich: Presence Chamber, Library, Audience, Mathematical Room
- Windsor: Throne Room, Observatory, Library, Military Council
- Barn Elms: Intelligence Office, Cipher Room, War Room, Guest Quarters
- London: Printer's Workshop, Bookseller, Exchange, Scholar's Inn
- Prague: Rudolf's Palace, Alchemy Lab, Observatory, Library, Printing House
- Constantinople: Sultan's Court, Dervish Lodge, Imperial Library, Observatory
- Yazd: Sufi Retreat, Philosopher's Chamber, Gardens, Hidden Sciences Library
- Isfahan: Royal Palace, Philosophical Circle, Library, Garden Pavilion
- Cairo: Al-Azhar Mosque, Library Quarter, Sultan's Palace, Alchemist's Quarter, Merchant Guild

**Total buildings: ~50 stations across 12 locations**

---

### 3. BOOKS (20+ in game library)

Physical books Dee can own and study.

```typescript
interface BookAsset {
  id: string;                    // "euclid_elements", "monas_hieroglyphica"
  title: string;
  author: string;
  date: string;
  
  // Assets
  coverImage?: string;           // PNG of book cover or manuscript binding
  textPages?: string[];          // Sample pages (PNG or scanned images)
  historicalDimensions?: [number, number];  // Width x height in cm
  material?: string;             // Vellum, paper, leather binding
  
  // Metadata
  historicalStatus: HistoricalStatus;
  sources: string[];             // Where the book is documented
}
```

#### Books in Dee's Library (Vertical Slice)
1. **Euclid, Elements** — Mathematics foundation
   - Assets: Page scans (public domain), geometric diagrams
   - Source: BL Cotton MS Appendix XIII

2. **Ptolemy, Almagest** — Astronomy reference
   - Assets: Star charts, astronomical tables, manuscript pages
   - Source: Latin translation, 1496

3. **Agrippa, De occulta philosophia** — Occult philosophy
   - Assets: Symbolic diagrams, talismans, correspondence tables
   - Source: 1531 edition

4. **Trithemius, Steganographia** — Cryptography
   - Assets: Cipher tables, encoded messages, manuscript pages
   - Source: 1606 edition (suppressed in Dee's time)

5. **Copernicus, De revolutionibus orbium coelestium** — Heliocentrism
   - Assets: Heliocentric diagram, celestial mechanics
   - Source: 1543 edition

6. **Dee, Mathematical Preface** — His own authority
   - Assets: Title page, preface text, mathematical diagrams
   - Source: BL Harley 1496

7. **Dee, Monas Hieroglyphica** — Occult synthesis
   - Assets: Title page, symbolic diagrams, geometric constructions
   - Source: 1564 Antwerp edition

8. **Paracelsus, Selected Works** — Alchemy & medicine
   - Assets: Alchemical diagrams, herbal illustrations, chemical apparatus
   - Source: Various editions

9. **Propaedeumata Aphoristica** — Natural magic
   - Assets: Aphoristic text, talismanic drawings
   - Source: 1558 edition

10. Plus 11 more books covering navigation, theology, medicine, printing, etc.

**Total books: 20–30 in game library (expandable)**

---

### 4. PRINTING PRESSES & WORKSHOPS (8–12)

Locations where books were printed, binding materials exist.

```typescript
interface PrintingPressAsset {
  id: string;                    // "silvius_antwerp", "billingsley_london"
  name: string;
  location: string;              // City
  type: 'press' | 'binding_workshop' | 'manuscript_shop';
  
  // Historical
  founder: string;
  active: [number, number];      // Years of operation
  booksProduced: string[];       // Which books did they print?
  
  // Assets
  workshopLayout?: string;       // PNG of press layout
  typeSamples?: string[];        // Different typefaces
  bindingMaterials?: string[];   // Leather, vellum, paper samples
}
```

#### Historical Printing Presses Referenced in Dee's Life
1. **Silvius (Antwerp)** — Printed *Monas Hieroglyphica* 1564
   - Assets: Antwerp workshop, typefaces, binding styles
   
2. **John Day (London)** — Printed Billingsley's English Euclid 1570
   - Assets: London workshop, geometric typefaces
   - Note: Henry Billingsley translated; John Day printed
   
3. **Plantin (Antwerp)** — Major Renaissance printer
   - Assets: Plantin's workshop (museum reference), types
   
4. **Royal Printer (London)** — Elizabeth I's official press
   - Assets: Royal workshop, heraldic devices

5. Plus 4–8 more presses in Prague, Louvain, Constantinople, Cairo

**Total presses: 12+ (most supporting NPC encounters)**

---

### 5. OBSERVATORIES & SCIENTIFIC INSTRUMENTS (8)

Places where astronomy, mathematics, alchemy work.

```typescript
interface ObservatoryAsset {
  id: string;                    // "samarkand_observatory", "prague_observatory"
  name: string;
  builder: string;
  date: number;
  
  // Historical
  instruments: string[];         // Astrolabe, quadrant, etc.
  purposes: string[];            // Observation, calculation, teaching
  
  // Assets
  architectureImage?: string;    // Building exterior/interior
  instrumentDiagrams?: string[]; // How instruments work
  observationCharts?: string[]; // Star charts, calculation tables
}
```

#### Major Observatories
1. **Samarkand Observatory** (Ulugh Beg, 1420)
   - Assets: 3D model of dome, astrolabe diagrams, star charts
   - Instruments: Main meridian circle, mural quadrant, astrolabes
   
2. **Prague Observatory** (Rudolf II, Tycho Brahe 1599)
   - Assets: Prague castle architecture, Tycho Brahe's instruments
   - Instruments: Quadrants, sextants, globes
   - Note: Tycho Brahe arrived in Prague 1599, after Dee's departure
   
3. **Greenwich Observatory** (Flamsteed, 1676+) — Anachronistic for Dee but referenced
   - Assets: Building layout, instruments
   
4. **Louvain Observatory** — Where Dee studied
   - Assets: University architecture, Gemma Frisius's instruments
   
5. Plus 4 more minor observatories in Yazd, Isfahan, London, Constantinople

**Total observatories: 8**

---

### 6. BROTHERHOODS & MYSTICAL ORDERS (6–10)

Organizations Dee and Turka were connected to or influenced by.

```typescript
interface BrotherhoodAsset {
  id: string;                    // "brethren_purity", "dervish_order"
  name: string;
  type: 'sufi_order' | 'scholarly_circle' | 'hermetic_society' | 'court_faction';
  
  // Historical
  founded: number;
  baseLocation: string;
  beliefs: string;               // What they practiced/believed
  members: string[];             // Historical figures
  
  // Assets
  symbolism?: string;            // Seals, emblems (PNG)
  textReferences?: string[];     // Primary sources
  portraitImages?: string[];     // Historical members
}
```

#### Brotherhoods & Orders
1. **Brethren of Purity (Ikhwan al-Safa)** — Islamicate philosophical society
   - Assets: Seal symbols, philosophical texts, historical pages
   - Influence on: Ibn Turka
   
2. **Sufi Orders** (Naqshbandi, Shadhili, etc.) — Mystical Islam
   - Assets: Order seals, mystical diagrams, prayer rugs
   - Influence on: Turka, Ottoman court
   
3. **Leicester's Circle** (Hermetic England)
   - Assets: Sidney circle portraits, manuscripts, correspondence
   - Influence on: Dee
   
4. **Rudolf II's Alchemists** (Prague court)
   - Assets: Alchemical workshop images, apparatus, transmutation diagrams
   - Influence on: Dee in Prague
   
5. **Al-Azhar Scholars** (Cairo)
   - Assets: Mosque architecture, scholarly gatherings, manuscript illuminations
   - Influence on: Ibn Turka in Cairo
   
6. **Ulugh Beg's Mathematicians** (Samarkand)
   - Assets: Observatory, mathematician portraits, astronomical tables
   - Influence on: Turka's formation
   
7. **Dervish Lodges** (Ottoman mysticism)
   - Assets: Lodge architecture, whirling ceremony depictions, calligraphy
   - Influence on: Ottoman counterfactual path
   
8. Plus 2–3 more (Neoplatonists, Christian Kabbalists, etc.)

**Total brotherhoods: 8–10**

---

### 7. MANUSCRIPT COLLECTIONS & LIBRARIES (6)

Physical repositories of knowledge.

```typescript
interface LibraryAsset {
  id: string;                    // "mortlake_library", "alexandria_theoretical"
  name: string;
  location: string;
  
  // Historical
  founded: number;
  keeper: string;
  collection: string[];          // What kinds of manuscripts
  size: number;                  // Estimated number of volumes
  
  // Assets
  libraryLayout?: string;        // Floor plan
  manuscriptSamples?: string[]; // Sample pages (illuminations, binding)
  catalogPages?: string[];       // Library catalogs/inventories
}
```

#### Major Libraries in World
1. **Mortlake Library** (Dee, England, 1570–1608)
   - Assets: Household layout, manuscript samples, Dee's catalogue
   - Size: ~4,000 volumes (documented)
   
2. **Alexandria Library** (theoretical, as legacy)
   - Assets: Classical references, symbolic importance
   
3. **Al-Azhar Library** (Cairo, Egypt)
   - Assets: Islamic manuscript illuminations, scholarly references
   
4. **Samarkand Observatory Library** (Ulugh Beg, Timurid)
   - Assets: Mathematical manuscripts, astronomical tables
   
5. **Prague Library** (Rudolf II's collection)
   - Assets: Rare book images, alchemical manuscripts
   
6. **Hidden Sciences Library** (Yazd, theoretical)
   - Assets: Mystical manuscript illustrations

**Total libraries: 6**

---

### 8. HISTORICAL REFERENCE IMAGES (100+)

Archival, manuscript, and archaeological images for historical grounding.

```typescript
interface ReferenceImage {
  id: string;
  title: string;
  source: string;                // Where it comes from (archive, museum, etc.)
  provenance: string;            // Copyright, license
  year: number;                  // When created or photographed
  category: 'architecture' | 'manuscript' | 'portrait' | 'diagram' | 'artifact';
  location: string;              // Which location it illustrates
  asset_path: string;            // PNG or JPG path
}
```

#### Reference Sources
1. **OCCULTIMGDB** — Occult manuscript images (provenance-tracked)
   - ~200 images of alchemical, astrological, mystical texts
   - Locations: Egypt, Ottoman, Persia, Central Asia

2. **Topkapi Palace Library** (Istanbul)
   - Ottoman manuscripts, court documents, architectural drawings
   
3. **Bodleian Library** (Oxford)
   - Dee's manuscripts, correspondence, printed books
   
4. **British Library**
   - Dee papers, contemporary manuscripts, maps
   
5. **Agas Map of London** (1560s)
   - Historical London layout
   
6. **Samarkand Archaeological Archive**
   - Observatory reconstruction, city layout
   
7. **Wikimedia Commons / Public Domain**
   - Architectural photos, period artwork, modern references
   
8. **Melvin-Koushki Archive**
   - Ottoman courtly manuscripts, lettrist texts

**Total reference images: 100–200**

---

### 9. AUDIO ASSETS (12 location + ambient)

Ambient sounds and period music.

```typescript
interface AudioAsset {
  id: string;
  type: 'ambient' | 'music' | 'speech' | 'effects';
  location?: string;
  era?: 'dee' | 'turka';
  duration: number;              // Seconds
  source?: string;               // Where recorded or created
  path: string;                  // MP3 path
}
```

#### Location Ambience (12)
- **Mortlake**: Household ambience (footsteps, quills, quiet conversation, fireplace)
- **Greenwich**: Court ceremony (bells, marching, formal announcements)
- **Windsor**: Royal ceremony (trumpets, guards, formal activity)
- **Barn Elms**: Intelligence (whispered conversation, papers, urgency)
- **London**: Marketplace (vendors, crowds, cart wheels, chaos)
- **Louvain**: University (scholars debating, bells, quiet study)
- **Prague**: Court activity (foreign language, pageantry, alchemy lab sounds)
- **Constantinople**: Ottoman court (call to prayer, muezzin, foreign language)
- **Samarkand**: Observatory (contemplative, calculation sounds, silence for observation)
- **Yazd**: Sufi retreat (chanting, meditation, flowing water)
- **Isfahan**: Court ceremony (Persian instruments, formal activity)
- **Cairo**: Marketplace & mosque (vendors, call to prayer, scholarly activity)

#### Period Music (3–4 tracks)
- **Renaissance Europe** — Lute music, court dances (Tallis, Byrd)
- **Central Asia** — Timurid court music, observational contemplation
- **Islamic Mystical** — Sufi music, qasida recitation
- **Ottoman Court** — Court instruments, ceremonial music

**Total audio: 12 location ambiences + 4 music tracks**

---

### 10. MAPS & TRAVEL SYSTEM (12 nodes + connections)

Visual representation of the world.

```typescript
interface MapAsset {
  id: string;
  type: 'world_map' | 'regional_map' | 'travel_route';
  
  // Visual
  image: string;                 // PNG of map
  nodes: Array<{ locationId, x, y }>; // Pixel coordinates
  routes: Array<{ from, to, pathSVG }>;  // Travel lines
  
  // Metadata
  era: 'dee' | 'turka' | 'both';
  historicalAccuracy: string;    // "1580 England", "1420 Timurid", etc.
}
```

**Maps needed:**
1. **World Map** (shows all 12 locations & routes)
2. **Dee's England** (Mortlake, Greenwich, Windsor, Barn Elms, London)
3. **Continental Europe** (Louvain, Prague, Constantinople pathway)
4. **Ottoman Empire** (Constantinople as gateway)
5. **Timurid Empire** (Samarkand, Yazd, Isfahan, Cairo connections)
6. **Travel Routes** (Silk Road, Mediterranean, etc.)

**Total maps: 6**

---

## Asset Provenance & Licensing

All assets tracked for:
- **Source:** Where it came from (museum, archive, open source)
- **License:** Public domain, CC-BY, CC-BY-SA, etc.
- **Year:** Date created or photographed
- **Creator:** Artist, photographer, institution

**Tracking locations:**
- OCCULTIMGDB / `assets/images/reference/` — Provenance JSON
- `assets/locations/*/reference.json` — Per-location asset manifest
- `assets/world/provenance.json` — Master provenance log

---

## Asset Production Timeline

### Phase 1: Critical Assets (Week 1)
- [ ] Mortlake location layout (PNG)
- [ ] Samarkand Observatory layout & 3D model (GLB)
- [ ] 4 location ambience tracks (MP3)
- [ ] 20 reference images (OCCULTIMGDB sourced)

### Phase 2: Core Assets (Weeks 2–3)
- [ ] 6 major location layouts (PNG)
- [ ] 50 station icons (32x32 PNG)
- [ ] 40 reference images
- [ ] 4 period music tracks

### Phase 3: Enhanced Assets (Weeks 4–5)
- [ ] 3D models for 3 major locations (Babylon.js)
- [ ] 50+ reference images
- [ ] Interior layout diagrams (PNG)
- [ ] Manuscript page samples (scanned)

### Phase 4: Polish (Week 6+)
- [ ] Book cover images (20+)
- [ ] Brotherhood symbols (PNG)
- [ ] Observatory instrument diagrams (SVG)
- [ ] Additional ambience variations

---

## Asset Tools & Workflow

**Tools for creation:**
- **2D layouts:** Photoshop / GIMP / Krita
- **3D models:** Blender → Babylon.js export
- **Reference sourcing:** OCCULTIMGDB, archive.org, museum APIs
- **Audio:** Audacity (editing), Freesound (library)
- **Maps:** QGIS or Adobe Illustrator

**Workflow:**
1. Design layout on paper
2. Digitize (PNG at 2x resolution)
3. Source reference images (cite provenance)
4. Create 3D model (optional, for major locations)
5. Record/source audio
6. Add to manifest (location/provenance.json)
7. Test in game (verify asset loads, is positioned correctly)

---

## Asset Budget Estimate

| Category | Count | Est. Files | Disk Space |
|----------|-------|-----------|-----------|
| Locations | 12 | 12 layout + 36 refs | 200 MB |
| Buildings | 50 | 50 icons + 30 layouts | 150 MB |
| Books | 20 | 20 covers + 100 pages | 500 MB |
| Reference Images | 100+ | 100 JPGs | 300 MB |
| Audio | 16 tracks | 16 MP3s | 100 MB |
| 3D Models | 3–6 | 3–6 GLB files | 200 MB |
| Maps | 6 | 6 SVGs + PNGs | 50 MB |
| **TOTAL** | — | ~400 files | **1.5 GB** |

---

## Authoring Location Assets

Location assets are defined in `src/data/locations/assets.ts` using TypeScript. Each location has a consistent structure:

### 1. Define Buildings

Buildings are major structures within a location. Each building groups related stations.

```typescript
export const LOCATION_BUILDINGS: LocationBuilding[] = [
  {
    id: 'location_building_id',
    name: 'Display Name',
    description: 'What this building is for',
    type: 'structure' | 'wing' | 'chamber' | 'outdoor',
    stationIds: ['station_id_1', 'station_id_2'],
    historicalStatus: 'documented' | 'plausible' | 'contested' | 'counterfactual',
  },
];
```

**Rules:**
- One building per major structure (but can group related chambers)
- Station IDs must be defined in the LOCATIONS_STATIONS array
- `type` should be 'structure' for standalone buildings, 'wing' for parts of a larger building, 'chamber' for interior rooms, 'outdoor' for gardens/courtyards

### 2. Define Stations

Stations are workplaces where crew can be assigned. A station belongs to a building.

```typescript
export const LOCATION_STATIONS: LocationStation[] = [
  {
    id: 'unique_station_id',
    name: 'Station Name',
    buildingId: 'parent_building_id',
    type: 'library' | 'study' | 'laboratory' | ... (see StationType enum),
    capacity: 1,  // how many crew at once
    skillBonus: { mathematics: 0.5, astronomy: 1 },
    skillCost: { focus: 5 },  // optional: focus cost per day
    encounterWeight: 1.5,  // optional: multiplier on encounters when crew present
    description: 'Where the work happens',
  },
];
```

**Rules:**
- One station per distinct work area
- `capacity` is usually 1-2 for intimate locations (study), higher for open areas (courtyard)
- `skillBonus` is applied daily while crew works here (+1 means +1 per day, so 30 days = +30)
- Only one station per room in Mortlake; other locations can have multiple stations per building
- Always include `buildingId` (except for backward-compat in households)

### 3. Define Residents

Residents are NPCs who live or work at the location.

```typescript
export const LOCATION_RESIDENTS: LocationResident[] = [
  {
    characterId: 'john_dee',  // must exist in src/data/characters/
    role: 'permanent' | 'seasonal' | 'transient' | 'visiting',
    stationPreference: 'library',  // where they're usually found
    historicalStatus: 'documented',
    availability: 'always' | 'spring' | 'during Prague' | etc,  // optional
  },
];
```

### 4. Define Objects

Objects are instruments, furnishings, or relics that provide bonuses or flavor.

```typescript
export const LOCATION_OBJECTS: LocationObject[] = [
  {
    id: 'object_id',
    name: 'The Great Magnet',
    category: 'instrument' | 'furnishing' | 'artwork' | 'apparatus' | 'material' | 'relic',
    description: 'Historical or mechanical significance',
    skillBonus: { naturalPhilosophy: 1 },
    portable: false,  // can be taken as satchel item?
    historicalStatus: 'documented',
    requiresBook: 'book_id',  // optional: must know about this via a book
    sources: ['Whitby 36–39'],
  },
];
```

### 5. Define Documents

Documents are letters, petitions, catalogues, etc. that provide historical flavor and encounter context.

```typescript
export const LOCATION_DOCUMENTS: LocationDocument[] = [
  {
    id: 'document_id',
    title: 'Dee\'s Library Catalogue',
    type: 'letter' | 'petition' | 'catalogue' | 'license' | 'contract' | 'report' | 'record' | 'manuscript',
    description: 'What this document contains',
    creator: 'John Dee',  // optional
    date: '1580',  // optional
    participants: ['john_dee', 'jane_dee'],  // character IDs mentioned
    relatedBooks: ['dee_monas'],  // books that reference this
    historicalStatus: 'documented',
    sources: ['BL Cotton TITUS BXXVII'],
  },
];
```

### 6. Define Services

Services are transactions or consultations available at the location.

```typescript
export const LOCATION_SERVICES: LocationService[] = [
  {
    id: 'service_id',
    name: 'Concentrated Study',
    description: 'Spend days focused research',
    type: 'transaction' | 'teaching' | 'commission' | 'consultation' | 'accommodation',
    provider: 'john_dee',  // optional character ID or faction
    costs: { money: 20, time: 5 },  // optional
    outcomes: { reputation: { scholarNetwork: 2 } },  // optional OutcomeSpec
    requirements: { skills: { manuscriptKnowledge: 3 } },  // optional RequirementSpec
    historicalStatus: 'documented',
  },
];
```

### 7. Define Reference Assets (Optional)

Reference assets are historical images with provenance.

```typescript
export const LOCATION_REFERENCE_ASSETS: ReferenceAsset[] = [
  {
    id: 'asset_id',
    title: 'Agas Map of London',
    type: 'map' | 'architecture' | 'portrait' | 'object' | 'manuscript' | 'interior' | 'landscape',
    source: 'British Library',
    provenance: 'Public domain, photographed 1561',
    year: 1561,
    creator: 'Ralph Agas',
    imagePath: 'assets/locations/london/agas_map.png',  // optional local path
    externalUrl: 'https://...',  // optional external link
    historicalConfidence: 'documented' | 'reconstructed' | 'speculative',
    intendedUses: ['location_overview', 'station_interior', 'building_layout'],
    historicalStatus: 'documented',
  },
];
```

**Confidence levels:**
- `documented` — surviving historical image or artifact
- `reconstructed` — evidence-based scholarly reconstruction
- `speculative` — educated guess based on period knowledge

### 8. Define Audio Assets (Optional)

Audio assets are ambient sounds and period-appropriate effects.

```typescript
export const LOCATION_AUDIO_ASSETS: AudioAsset[] = [
  {
    id: 'audio_id',
    title: 'Mortlake Household Ambience',
    type: 'ambient' | 'music' | 'speech' | 'effect',
    description: 'What sounds are included',
    stations: ['mortlake_library', 'mortlake_study'],  // which stations use this
    duration: 120,  // seconds
    source: 'Ambient crafted for game',
    audioPath: 'assets/audio/locations/mortlake_ambience.mp3',
    historicalStatus: 'plausible',  // not documented, but historically plausible
  },
];
```

### 9. Register in assets_index.ts

After defining all assets, add the location to the registry:

```typescript
export const ALL_LOCATION_ASSETS: Record<string, LocationAssetRegistry> = {
  // ... existing locations ...
  new_location: {
    locationId: 'new_location',
    buildings: NEW_LOCATION_BUILDINGS,
    stations: NEW_LOCATION_STATIONS,
    residents: NEW_LOCATION_RESIDENTS,
    objects: NEW_LOCATION_OBJECTS,
    documents: NEW_LOCATION_DOCUMENTS,
    services: NEW_LOCATION_SERVICES,
    referenceAssets: NEW_LOCATION_REFERENCE_ASSETS,
    audioAssets: NEW_LOCATION_AUDIO_ASSETS,
  },
};
```

### 10. Update the Location Data

Add the new location to `src/data/locations/index.ts` with proper connections and metadata. The location can now reference these assets via queries:

```typescript
// In your encounter or UI code:
import { getLocationAssets, getStations } from '../data/locations/assets_index.js';

const assets = getLocationAssets('mortlake');
const stations = getStations('mortlake');  // returns all stations for this location
```

---

## Validation Checklist

Before committing location assets:

- [ ] All station IDs referenced in buildings exist
- [ ] All building IDs referenced in stations exist
- [ ] All character IDs exist in src/data/characters/
- [ ] All book IDs exist in src/data/books/
- [ ] All historical statuses are from the enum
- [ ] All skill bonuses use correct SkillId values
- [ ] Audio and reference paths start with 'assets/' (if included)
- [ ] Capacity values are sensible (1-4 for most, higher for courtyards)
- [ ] No duplicate IDs within the location
- [ ] Sources are cited for documented assets
- [ ] Location is registered in assets_index.ts

---

## Next Steps

1. **Audit OCCULTIMGDB** for location-specific images
2. **Commission or source** 2D location layouts (Mortlake, Samarkand first)
3. **Record location ambience** (start with 3 major locations)
4. **Create provenance manifest** (master JSON of all assets + sources)
5. **Build asset loading system** (game loads layouts, images, audio per location)
6. **Implement Prague location assets** (second act environment)
7. **Implement Samarkand Observatory assets** (flagship shared location)

---

**Last updated:** 2026-10-03  
**Implementation:** 5 Dee-era locations complete (Mortlake, London, Greenwich, Windsor, Barn Elms)  
**Next action:** Prague (Act 2), then Samarkand Observatory (shared world hub)
