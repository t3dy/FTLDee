# Biography Expansion Plan: Timeline → Entries → Game Assets

**Goal:** Systematically expand biography from 58 to 150+ entries while identifying game asset requirements.

**Method:** For each timeline event, create TypeScript entries (events, people, places, institutions) and note design implications.

---

## Phase 1: Continental Period (1548–1560) — 12 New Entries

### Timeline Events to Cover
- Studies at Louvain (1548-1550)
- Lectures on Euclid in Paris (1550)
- Return and early career (1550-1560)

### New People Entries

#### 1. GEMMA FRISIUS
```
id: 'gemma_frisius'
label: 'Gemma Frisius'
type: 'person'
historicalStatus: 'documented'
themes: ['mathematical_authority', 'continental_connections']
dateStart: '1508'
dateEnd: '1555'
description: 'Instrument maker and mathematician at Louvain. Frisius mentored Dee in mathematical and astronomical instrument culture, including astrolabe construction and observation techniques. Dead by 1555 but his methods informed Dee's continental reputation.'
sources: ['Parry 45–47', 'Harkness 28–30']
roles: ['mathematician', 'instrument_maker', 'teacher']
relationship: 'Mentor at Louvain; shaped Dee's technical authority in mathematics and instruments'
relatedEntries: ['dee', 'louvain_university']
```

**Game Design Implication:** Frisius represents the continental network that gives Dee credibility. His instruments (astrolabes, quadrants) should appear in Louvain location assets.

#### 2. JOHANNES STURM
```
id: 'johannes_sturm'
label: 'Johannes Sturm'
type: 'person'
historicalStatus: 'documented'
themes: ['relationships', 'mathematical_authority', 'publishing']
dateStart: '1507'
dateEnd: '1589'
description: 'Humanist educator at Strasbourg Academy. Corresponded with Dee about classical mathematics and natural philosophy. Represented the reformed humanist network that valued mathematical learning as moral training.'
sources: ['Sherman 95–101']
roles: ['educator', 'correspondent', 'humanist']
relationship: 'Correspondent on mathematics and humanist pedagogy; part of continental learned network'
relatedEntries: ['dee']
```

**Game Design Implication:** Sturm represents the *correspondence network*. His letters should unlock knowledge of the continental reform movement and humanist pedagogy skills.

#### 3. PETRUS RAMUS
```
id: 'petrus_ramus'
label: 'Petrus Ramus'
type: 'person'
historicalStatus: 'documented'
themes: ['mathematical_authority', 'continental_connections', 'publishing']
dateStart: '1515'
dateEnd: '1572'
description: 'French mathematician and educational reformer. Ramus's method of combining mathematics with humanist rhetoric influenced Dee's approach to knowledge organization. Ramus was killed in the St. Bartholomew Massacre (1572).'
sources: ['Sherman 102–110', 'Parry 51–54']
roles: ['mathematician', 'reformer', 'publisher']
relationship: 'Intellectual contemporary; methods influenced Dee\'s Mathematical Preface'
relatedEntries: ['dee', 'mathematical_preface']
```

**Game Design Implication:** Ramus represents *mathematical method* as a path to authority. His death in 1572 is a political weather event (religious violence threatens the network). His works grant Method skills.

### New Place Entries

#### 4. LOUVAIN UNIVERSITY
```
id: 'louvain_university'
label: 'Louvain University'
type: 'place'
historicalStatus: 'documented'
themes: ['mathematical_authority', 'continental_connections', 'relationships']
dateStart: '1548'
dateEnd: '1550'
description: 'Major center of mathematical, astronomical, and instrument culture in the Low Countries. Dee studied here 1548-1550, encountering Frisius, Ortelius, and the technical practices that established his continental reputation. Hub of humanist and mathematical networks.'
sources: ['Parry 45–50', 'Harkness 28–35']
inhabitants: ['gemma_frisius', 'abraham_ortelius']
services: ['mathematical_instruction', 'instrument_construction', 'correspondence_network']
significanceToGame: 'Gateway location to continental network. Crew who spend time at Louvain gain Mathematical Authority and gain access to correspondence network. Represents the moment Dee becomes someone the continent recognizes.'
relatedEntries: ['dee', 'paris_lectures', 'gemma_frisius']
```

**Game Design Implication:** Louvain is a *hub* location where Dee gains credibility. It should have:
- Library with mathematical texts (Euclid, Ptolemy, Ramus)
- Observatory with instruments (astrolabes, quadrants)
- Correspondence office (channel to Sturm, Ramus, Ortelius)
- Working mathematicians as NPCs who can teach

#### 5. PARIS (Academic Circles)
```
id: 'paris_academic'
label: 'Paris Academic Circles'
type: 'place'
historicalStatus: 'documented'
themes: ['mathematical_authority', 'continental_connections', 'publishing']
dateStart: '1550'
dateEnd: '1550'
description: 'Dee lectured on Euclid in Paris in 1550, establishing his reputation as a mathematical teacher beyond Louvain. Paris represented the bleeding edge of humanist mathematics and method, though less focused on instruments than Louvain.'
sources: ['Parry 47–48', 'Harkness 32']
services: ['mathematical_lectures', 'humanist_network']
significanceToGame: 'Quick stop that grants continental academic credibility. Unlike Louvain (which takes time), Paris is a fast reputation bump but no deep learning. Represents the difference between being known as a lecturer vs. being known as a maker.'
relatedEntries: ['dee', 'gemma_frisius']
```

**Game Design Implication:** Paris should be a *transit location* — quick reputation gain, no deep skill training. Contrast with Louvain's slower, deeper engagement.

### New Event Entries

#### 6. CONTINENTAL STUDIES (1548–1550)
```
id: 'continental_studies_1548'
label: 'Continental Studies at Louvain and Paris'
type: 'event'
historicalStatus: 'documented'
themes: ['mathematical_authority', 'continental_connections', 'learning']
dateStart: '1548'
dateEnd: '1550'
description: 'Dee traveled to the Low Countries and France, studying with Frisius at Louvain, learning instrument construction and astronomical method, then lecturing on Euclid in Paris. These years established his continental reputation and introduced him to humanist-mathematical networks that would matter throughout his career.'
sources: ['Parry 45–50', 'Harkness 28–35']
consequence: 'Dee returns to England with continental credibility. This network will resurface in later appeals to Rudolf II and the Ottoman court. Also establishes the pattern: Dee cultivates relationships through intellectual authority, then leverages them for patronage.'
relatedEntries: ['dee', 'louvain_university', 'paris_academic', 'gemma_frisius', 'johannes_sturm']
encounterId: 'continental_return_1550'
```

**Game Design Implication:** This event unlocks the *continental network* as a story element. Subsequent encounters can reference these contacts. Dee's return to England triggers "What now? You have continental fame but no English patronage yet."

#### 7. CORRESPONDENCE WITH RAMUS (1550s)
```
id: 'correspondence_ramus_1550s'
label: 'Correspondence with Petrus Ramus'
type: 'event'
historicalStatus: 'plausible'
themes: ['mathematical_authority', 'publishing', 'relationships']
dateStart: '1550'
dateEnd: '1572'
description: 'Dee and Ramus corresponded about mathematical method and the reform of learning. Ramus\'s dialectical method (combining logic, mathematics, and rhetoric) influenced Dee\'s approach to the Mathematical Preface. The correspondence ended with Ramus\'s death in the St. Bartholomew Massacre (1572).'
sources: ['Sherman 102–110', 'Parry 52–54']
consequence: 'Ramus\'s death in 1572 marks a political shock: the continental reformed Protestant network faces persecution. For Dee, it\'s a personal loss of an intellectual ally and a warning about religious violence in Europe.'
relatedEntries: ['dee', 'petrus_ramus', 'mathematical_preface']
significanceToGame: 'Shows that Dee\'s continental connections are fragile. Religious politics can destroy relationships. Foreshadows the value of England\'s religious settlement under Elizabeth (even if precarious).'
```

**Game Design Implication:** Correspondence events should *time out* (Ramus dies in 1572). Active relationships have lifespans. Dead contacts can't help you.

---

## Phase 2: Early Elizabeth Period (1558–1570) — 15 New Entries

### Key Timeline Events
- Consulted on Elizabeth's accession (1558-1559)
- Publishes Propaedeumata (1558)
- Publishes Monas Hieroglyphica (1564)
- Builds Mortlake library (1560s-1570s)
- Mathematical Preface (1570)

### Design Notes for This Phase

**Locations to Model:**
- Mortlake (core location, player base)
- Greenwich Palace (court access, occasional visits)
- London (marketplace, printers, booksellers)
- Barn Elms (Walsingham's estate, near Mortlake)

**People to Add:**
- Walsingham (nascent intelligence network)
- Leicester (patron, political operator)
- Elizabeth I (patron, occasional consultations)
- Henry Billingsley (translator of Euclid, contact)
- John Day (printer of Mathematical Preface)
- Humfrey Llwyd (Welsh antiquary, contact)

**Events to Cover:**
- Accession consultation (1558-59)
- Propaedeumata publication (1558)
- Marriage to Jane (1578) — already have, but deepen
- Monas publication (1564)
- Calendar reform debates (1562-1563)

---

## Phase 3: Rising Influence (1570–1583) — 15 New Entries

### Key Timeline Events
- Mathematical Preface (1570)
- General and Rare Memorials (1576-77)
- Frobisher expeditions (1576-1578)
- Calendar reform counsel (1582)
- Angelic work begins (1581)
- Kelley arrives (March 1582)
- Continental departure (September 1583)

### Design Notes for This Phase

**New Locations:**
- Frobisher's expedition base (port location?)
- Alchemy lab (equipment, furnace, retorts)
- Scrying chamber (Kelley's workspace, ritual apparatus)

**Key Contacts:**
- Martin Frobisher (explorer, patron)
- Albert Laski (Polish noble, future travel companion)
- Roger Cooke (alchemy assistant, leaves 1581)
- Catherine Dee (daughter, household)
- Arthur Dee (son, born 1579)

**Events:**
- Frobisher collaboration (1576-78)
- Alchemy ventures (ongoing through 1580s)
- Angelic sessions begin (1581)
- Kelley arrives as "Talbot" (March 1582)
- Household crisis over Kelley (1582-83)

---

## Phase 4: Continental Migration (1583–1586) — 12 New Entries

### Key Timeline Events
- Leaves with Laski (September 1583)
- Prague and Rudolf II (1584-1586)
- Alchemy work intensifies (1584)
- Heptarchical system takes shape (1582-1583)

### Design Notes for This Phase

**New Locations:**
- Prague (court, Rudolfine cabinet, alchemy labs)
- Cracow (Laski's seat, route location)
- Constantinople (counterfactual route for players)

**Key Contacts:**
- Rudolf II (Habsburg Emperor, patron)
- Laski (already have, deepen)
- Johannes Kelley (Edward's brother, later Prague)
- Tycho Brahe (not yet in Prague 1583, but will be by 1599 in extended game)

**Events:**
- Departure decision (1583) — player choice point
- Prague court politics (1584-86)
- Alchemy projects (1584+)
- Imperial audiences with Rudolf (1584-86)

---

## How to Proceed

### For Each Event/Person/Place:

1. **Open source PDF** (Parry, Harkness, Sherman, Clulee)
2. **Locate passage** in original text (use page numbers from DeeChunks)
3. **Read full context** (surrounding pages, qualifications)
4. **Verify date** and details match
5. **Extract game-relevant details:**
   - What skills/capabilities does this unlock?
   - What locations should this person/event connect to?
   - What assets does this location need?
   - What narrative does this enable?

6. **Write TypeScript entry** with:
   - Proper sourcing (scholar + pages)
   - Historical status (documented/plausible/contested)
   - Game-relevant themes (from 17-theme enum)
   - Related entries (cross-references)
   - Significance and consequence for game story

7. **Note design implications** (location assets, NPC roles, skill gates)

---

## Priority Order for Expansion

**Week 1 (High Signal):**
1. Continental Studies (Louvain, Paris, Frisius) — establishes network
2. Accession Consultation (1558-59) — court entry
3. Mortlake Development (1560s-70s) — player base
4. Monas Hieroglyphica (1564) — occult authority
5. Angelic Work Begins (1581) — major mechanic shift

**Week 2 (Medium Signal):**
6. Mathematical Preface (1570) — publication authority
7. General and Rare Memorials (1576-77) — navigation/empire
8. Frobisher Collaboration (1576-78) — business venture
9. Calendar Reform (1582) — political pressure
10. Kelley Arrives (1582) — household crisis point

**Week 3 (Lower Signal but Necessary):**
11. Continental Departure (1583) — ending of slice
12. Prague Years (1584-86) — extended game preparation

---

## Key Design Insight

**Dee's biography is not uniform.** Different phases matter differently:

- **Louvain period:** Establishes *technical authority* (math, instruments)
- **Early Elizabeth (1558-70):** Establishes *court access* (patronage, consultation)
- **Rising influence (1570-82):** Establishes *intellectual networks* (correspondence, publications) + *occult authority* (angelic work)
- **Continental (1583+):** *Desperation phase* — seeking patronage when English court is unreliable

This structure should guide encounter design. Early encounters reward building authority. Mid-game encounters reward maintaining networks. Late-game encounters test whether the network survives political pressure.

---

## Next Steps

1. Start with **Frisius, Louvain, Continental Studies** entries (most game-relevant)
2. Verify each against Parry/Harkness/Sherman
3. Create game asset requirements list (locations, NPCs, equipment)
4. Build entries for accession period next
5. Use these entries to populate encounter pools
