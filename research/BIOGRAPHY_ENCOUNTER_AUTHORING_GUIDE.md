# Using the Biography Database for Encounter Authoring

The biography database (`src/data/biography/`) gives you a structured, sourced, theme-tagged inventory of Dee's life. This guide shows how to use it when writing encounters.

## Quick Start: Write an Encounter

### 1. Pick a historical moment
```typescript
import { getEvent } from '@/data/biography/index.js';

const angelic = getEvent('angelic_sessions_1581');
// {
//   label: 'First Surviving Angelic Action with Barnabas Saul',
//   description: '...',
//   historicalStatus: 'documented',
//   themes: ['occult_philosophy', 'relationships', 'security'],
//   sources: ['Harkness 35–42'],
//   ...
// }
```

### 2. Understand what changed
```typescript
// The consequence tells you what was game-relevant
console.log(angelic.consequence);
// "Opens occult_philosophy skill path and eschatological dimension."

// Related entries show the historical network
angelic.relatedEntries; // ['dee', 'barnabas_saul', 'occult_sessions']
```

### 3. Get the people involved
```typescript
import { getPerson } from '@/data/biography/index.js';

const dee = getPerson('dee');
const kelley = getPerson('edward_kelley');

// Their themes tell you what they care about
kelley.themes; // ['occult_philosophy', 'relationships', 'business_ventures', 'tactlessness']

// Their roles tell you how they relate to Dee
kelley.roles; // ['scryer', 'alchemist', 'rival']
```

## Common Encounter Patterns

### A. Relationship Choice
**Query theme:** `relationships`

```typescript
const relationships = getBiographyByTheme('relationships');

// Filter to people who matter to this encounter
const potentialContacts = relationships.filter(e => e.type === 'person');

// The person's historicalFaction tells you who benefits
contacts.forEach(contact => {
  console.log(`${contact.label} → faction: ${contact.historicalFaction}`);
});
```

**Example: Greenwich Network encounter**
- Get PHILIP_SIDNEY, LEICESTER, DEE
- They gather around mathematical/navigational/Hermetic discussions
- Choice: which discussion to engage? Each gates different skills and factions.

### B. Intellectual Choice
**Query theme:** One of [occult_philosophy, mathematical_authority, writing, publishing]

```typescript
const occult = getBiographyByTheme('occult_philosophy');

// Documents show what Dee knew
const books = occult.filter(e => e.type === 'document');

// Events show when he could act on that knowledge
const events = occult.filter(e => e.type === 'event');

// Requirements come from the timeline
events.forEach(e => {
  if (e.dateStart > '1580') {
    console.log(`${e.label} requires events before ${e.dateStart}`);
  }
});
```

**Example: Comet at Windsor encounter**
- COMET_AT_WINDSOR (event, plausible)
- MATHEMATICAL_PREFACE_BOOK (shows Dee's authority on mathematics)
- MONAS_BOOK (shows his occult synthesis)
- Choice: natural philosophy answer vs. astrological vs. prophetic?
- Each choice uses different themes/books and has different faction consequences.

### C. Political Choice
**Query theme:** `courtly_maneuverings` + `reputation`

```typescript
const politics = getBiographyByThemes(['courtly_maneuverings', 'reputation']);

// Events show political pressure
const events = politics.filter(e => e.type === 'event');

// People show who's involved
const people = politics.filter(e => e.type === 'person');

// Consequences show what was at stake
events.forEach(e => console.log(`${e.label}: ${e.consequence}`));
```

**Example: Murphyn Slanders**
- MURPHYN_SLANDERS_START (event, two-decade campaign)
- VINCENT_MURPHYN (person, forger and rival)
- Themes: reputation, tactlessness, security
- Consequence: persistent reputation drain; Dee cannot eliminate threat
- Game mechanic: reputation pressure is mechanical (constant cost), not a one-time encounter

### D. Skill Gating
**Query theme:** [occult_philosophy, mathematical_authority, navigation, alchemy]

```typescript
const occult = getBiographyByTheme('occult_philosophy');

// Gate to events that happened only after specific knowledge
const mayThinkInTermsOfOccult = (player) => {
  return player.skills.occultPhilosophy >= 5;
};

// Blue options pull from the biography
occult.filter(e => e.type === 'person' && e.roles.includes('patron'))
  .forEach(patron => {
    // This patron cares about occult work
    console.log(`Unlock contact: ${patron.label}`);
  });
```

**Example: Ottoman Thread**
- Gated by occult_philosophy ≥ 6 AND kabbalah presence
- Visible only in BOOK_OF_SOYGA_EVENT (the trace through which Ottoman magic enters)
- Surfaces as blue option in career_transition (rare earned ending)

## Historical Status in Encounters

Use status to decide encounter presentation:

### documented
- State as fact: "Dee was consulted on the coronation date."
- Source it: "Parry 48–58"
- No caveats needed

### plausible
- Present as reconstruction: "Dee likely attended a gathering at Greenwich"
- Show source: "Specific meeting PLAUSIBLE; circle ATTESTED (Parry 100–151)"
- Let player know it's a game reconstruction

### contested
- Present both positions: "Sherman argues real maritime policy; Parry argues occult code"
- Don't resolve: let player's choices determine which interpretation they favor
- Source both: "Sherman 277–394; Parry 127–138"

### counterfactual
- Clearly mark: "If Dee had gone east instead of Prague..."
- Name the scholar: "Melvin-Koushki 2021"
- Gate it: rare option, earned through specific earlier choices

## Theme-Driven Encounter Flow

Each theme opens different content:

| Theme | Opens | Blocked by |
|-------|-------|-----------|
| **occult_philosophy** | Angelic sessions, alchemy, Kelley | Low secrecy; religious authority > 70 |
| **mathematical_authority** | Navigation projects, imperial advice | Low mathematics skill |
| **relationships** | Patron encounters, contact introductions | Low reputation; faction < 30 |
| **business_ventures** | Patronage schemes, book projects | Low funds or focus |
| **courtly_maneuverings** | Court access, faction plays | Secrecy too low (overexposed) |
| **continental_connections** | Prague, Rudolf, Ottoman | Must have continental contact |
| **reputation** | Recovery encounters, slander response | Continuous pressure (mechanical cost) |
| **security** | Arrest, hiding, loyalty checks | Actively triggered by choices |

## Consequence Chains

Use relatedEntries to build encounter chains:

```typescript
// When player chooses angelic path in Elizabeth's Interest:
const angelic = getEvent('angelic_sessions_1581');

// Next encounters that follow:
angelic.relatedEntries.forEach(id => {
  const next = getBiographyEntry(id);
  console.log(`Leads to: ${next.label}`);
  // Leads to: Edward Kelley (person)
  // Leads to: Jane Dee's warnings (event)
  // Leads to: Household crisis 1587 (event)
});

// Each carries consequences into the household system
```

## Sourcing Correctly in Text

Every game-facing claim should cite:

```typescript
export function getEncounterNarrative(theme: BiographicalTheme): string {
  const entries = getBiographyByTheme(theme);
  
  const narrative = `Dee's work on ${theme} is attested in:`;
  
  entries
    .filter(e => e.historicalStatus === 'documented')
    .forEach(e => {
      narrative += `\n${e.label} — ${e.sources.join('; ')}`;
    });
  
  return narrative;
}
```

## Building a Blue Option

```typescript
// Blue option: gate by book + skill + contact + patron

const encounterId = 'comet_at_windsor';

// Get context entries
const contextEntries = getBiographyForEncounter(encounterId);

// Skill requirement: does Dee have the book?
const hasAstrology = player.books.includes('ptolemy_almagest');

// Contact requirement: is Barnabas available?
const hasBarnabas = player.contacts.includes('barnabas_saul');

// Patron requirement: is Elizabeth present?
const isWithElizabeth = currentEncounter.location === 'windsor';

// If all three: unlock blue option
if (hasAstrology && hasBarnabas && isWithElizabeth) {
  blueOption = {
    label: 'Construct a full astrological assessment',
    requirement: 'Astronomy + Ptolemy + Scryer present',
    source: 'Dee was consulted on comets (PLAUSIBLE)',
    outcome: { occultReputation: +20, elizabeth: +10 }
  };
}
```

## Testing Encounters Against Biography

Before shipping an encounter:

1. **Source check:** Every claim has a source (Parry, Harkness, etc.)
2. **Theme check:** Does the encounter focus on a theme tagged in the biography?
3. **Status check:** Is the historical status correctly marked?
4. **Consequence check:** Do outcomes follow from the biography?
5. **Gate check:** Are blue options properly gated by the biography's precedents?

Example:
```typescript
// Encounter: "Dee is asked to interpret the comet"
// Sources: ✓ (PLAUSIBLE — Parry 100–151)
// Theme: occult_philosophy, mathematical_authority ✓
// Status: marked as plausible ✓
// Consequence: affects elizabeth faction + occult reputation ✓
// Gate: requires astronomy ≥ 6 OR astrology ≥ 6 ✓
```

## Reference: All 13 People

| Person | Roles | Factions | Themes |
|--------|-------|----------|--------|
| Dee | protagonist | all | relationships, occult_philosophy, navigation, empire, mathematical_authority |
| Jane Dee | household | — | relationships, household, business_ventures |
| Edward Kelley | scryer, alchemist | — | occult_philosophy, relationships, business_ventures, tactlessness |
| Elizabeth I | patron, client | elizabeth | relationships, courtly_maneuverings, empire, navigation |
| Cecil Burghley | patron, factional | burghley | relationships, empire, courtly_maneuverings, navigation |
| Leicester | patron, intellectual | leicester | relationships, occult_philosophy, courtly_maneuverings, continental |
| Walsingham | intelligence chief | walsingham | relationships, courtly_maneuverings, security, continental |
| Albert Laski | contact, guide | continentalCourts | relationships, continental_connections, occult_philosophy, empire |
| Philip Sidney | intellectual peer | leicester | relationships, occult_philosophy, mathematical_authority, continental |
| Vincent Murphyn | rival, forger | — | tactlessness, security, reputation, business_ventures |
| John Prestall | rival, alchemist | — | business_ventures, alchemy, tactlessness, relationships |
| Rudolf II | potential patron | continentalCourts | relationships, occult_philosophy, continental_connections, empire |
| Murad III | counterfactual patron | continentalCourts (cfx) | occult_philosophy, empire, business_ventures, continental |
