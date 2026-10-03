# FTLDee — Vertical Slice Definition

## What the Vertical Slice IS

A playable prototype proving the central game loop of FTLDee. The setting is John Dee
at Mortlake in 1580, navigating the nodes around him as his continental departure becomes
a career-defining decision.

The vertical slice is a **proof of concept**, not a complete game. It demonstrates:

1. The intellectual household as a persistent base
2. The node map as an intellectual/political labor market
3. Travel with resource costs and political gating
4. Encounters with multiple choices and blue-option gating
5. Political relationships changing based on player decisions
6. Career transition as the culminating decision

## Scope: Six Locations

| Location   | Type            | Key Encounter           |
|------------|-----------------|-------------------------|
| Mortlake   | Home base       | Household management    |
| Richmond   | Royal residence | Elizabeth's Interest    |
| Greenwich  | Court complex   | The Greenwich Network   |
| Windsor    | Royal court     | The Comet at Windsor    |
| Barn Elms  | Walsingham HQ   | Intelligence Encounter  |
| London     | City/market     | Books and contacts      |

## Scope: Five Crew Members

| Name              | Role           | Key Capabilities             |
|-------------------|----------------|------------------------------|
| John Dee          | Protagonist    | All intellectual skills      |
| Jane Dee          | Household head | Household stability, contacts|
| Roger Cooke       | Secretary      | Correspondence, transcription|
| Thomas Digges     | Math contact   | Mathematics, Navigation      |
| [Contact TBD]     | Political      | Court access, introductions  |

Note: Kelley is NOT in the vertical slice. His data schema is defined but he is an
event encounter (he can be hired) rather than a default crew member.

## Scope: Eight Initial Books

| Book                       | Key Operations Unlocked            |
|----------------------------|------------------------------------|
| Euclid, Elements           | Geometry, mathematical proof       |
| Ptolemy, Almagest          | Astronomy, celestial mechanics     |
| Agrippa, De occulta phil.  | Natural magic, occult correspondences |
| Trithemius, Steganographia | Cryptography, secret communication |
| Copernicus, De revolutionibus | Astronomical interpretation     |
| Dee, Mathematical Preface  | Mathematical reputation, navigation|
| Paracelsus, selected works | Medicine, alchemical knowledge     |
| Dee, Monas Hieroglyphica   | Symbolic synthesis, occult synthesis|

## Scope: Five Factions

| Faction           | Relationship Dimension                  |
|-------------------|-----------------------------------------|
| Elizabeth         | Royal favor, personal access            |
| Cecil/Burghley    | State utility, institutional support    |
| Leicester         | Occult/intellectual sympathy            |
| Walsingham        | Intelligence utility, Crown service     |
| Religious Auth.   | Theological orthodoxy, suspicion level  |

## Scope: Five Core Encounters

### 1. The Comet at Windsor
A strange astronomical event creates anxiety at court. Elizabeth asks Dee to interpret it.

Choices:
- **Default**: Provide a natural-philosophical explanation
- **Blue** [Astronomy + Ptolemy]: Construct a full astrological assessment
- **Blue** [Occult Philosophy + Reputation:Occult > 30]: Frame as a providential warning
- **Default**: Deflect to a more cautious astronomical observation

**Historical Status**: `plausible` — Dee was consulted on comets; specific event fictionalized.

### 2. Elizabeth's Interest
Dee receives a private royal audience. He must decide which intellectual persona to present.

Choices:
- Present as the mathematician and cartographer
- Present as the imperial political philosopher
- Present as the occult philosopher and astrologer
- Present as the general natural philosopher

Each produces different future reputation effects.

**Historical Status**: `plausible` — documented royal consultations; specific scene reconstructed.

### 3. The Greenwich Network
Dee encounters a gathering of figures around Leicester/Sidney at Greenwich.

Choices:
- Engage the mathematical/navigational discussion
- Engage the continental Protestant network
- Engage the occult/Hermetic discussion
- Observe and gather information

**Historical Status**: `plausible` — the Sidney/Leicester circle existed; specific meeting reconstructed.

### 4. Walsingham and the Intelligence Problem
An unusual piece of information reaches Dee through Walsingham's network.

Choices:
- **Blue** [Cryptography + Trithemius]: Analyze the encoded correspondence
- Pass the information onward without analysis
- Protect a contact
- Decline involvement entirely

**Historical Status**: `plausible` — Dee's intelligence connections existed; specific scenario fictionalized.

### 5. Mortlake: Household Activities
The player returns home and must allocate limited time among activities.

Activities (each costs time):
- Research (spend Time → gain Knowledge or unlock operation)
- Correspondence (maintain contacts, gather intelligence)
- Household management (maintain stability)
- Book acquisition (spend Money → acquire book)
- Prepare for departure (advance career transition)

### 6. The Continental Decision (Career Transition)
The culminating encounter. Dee's political position in England has changed and the
opportunity to depart for the Continent has arrived.

Player state determines available choices:
- Stay in England: requires adequate Crown Favor and patronage security
- Depart with Laski: unlocked by prior contact with Laski encounter
- Cultivate Rudolf contacts first: requires existing continental network
- Seek Ottoman contacts: **counterfactual** branch (Melvin-Koushki scenario)

**Historical Status**: choices tagged individually. The departure itself is `documented`.

## What the Vertical Slice is NOT

- The full John Dee biography (does not cover 1547-1580 prologue in detail)
- The continental campaign (Prague, Vienna, Kraków)
- Kelley as a playable character
- Arthur succession
- The printing press progression
- The Ibn Turka campaign
- Full political weather simulation (simplified subset only)
- Multiple run variety (one authored historical path with branching, not full procedural generation)

## The 20-Point Completion Checklist

The vertical slice is complete when a player can do all of the following:

1. Start a new Dee career
2. See the current household (Mortlake screen)
3. See resources (Money, Time, Reputation, Secrecy, Crown Favor)
4. See the current library (books with their tags)
5. See political relationships (faction scores)
6. See a node map with six locations
7. Choose a destination
8. Travel there (with time and money costs)
9. Receive an encounter
10. Make at least two meaningfully different choices
11. Have a book/skill/contact unlock a special (blue) choice
12. Observe consequences (resource and relationship changes)
13. See political relationships change
14. See future map access change (at least one node gated by relationship)
15. Return to Mortlake
16. Spend time on research/household activity
17. Continue the career
18. Reach the continental departure decision
19. Save and reload the game
20. Restart with a deterministic seed and reproduce the same procedural encounter sequence

## Simplifications Accepted for the Prototype

- Dates are simplified (the slice is labeled "c. 1580" without requiring exact date tracking)
- Political weather is represented as faction scores, not a full simulation
- Procedural generation is limited to encounter ordering within authored content
- UI is functional, not polished
- London serves as a general market node, not a full city simulation
