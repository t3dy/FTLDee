# FTLDee — Game Design Document

## Concept

A procedural historical career RPG in the FTL tradition. The player is an intellectual
courtier navigating a network of courts, libraries, printing houses, workshops, and
households. Instead of weapons and ship modules, the player invests in books, skills,
contacts, and patronage. Travel through a node map of locations replaces spatial movement.

Mechanically: FTL + Crusader Kings-style relationships + deckbuilder card economy + historical
bibliography, with books replacing weapons.

Thematically: You are not trying to destroy Europe. You are trying to become indispensable to it.

The central organizing principle, from Melvin-Koushki: **the grimoire is a manual for the courtier.**
Books are catalogues of professional operations that an intellectual embedded in political
hierarchies can perform for people who need them.

## Core Mechanic

    BOOK + SKILL + CONTACT + PATRON = OPERATION

- **Book**: provides access to an intellectual operation
- **Skill**: converts knowledge into capability (Dee can own Euclid without being a practicing geometer)
- **Contact**: provides the social opportunity to deploy the operation
- **Patron**: provides the demand and reward for the operation

Knowledge is **combinatorial**, not additive.

    Mathematics + Astronomy + Ptolemy + Patron Astronomer = astronomical commission
    Alchemy + Mining + Paracelsus + Mining Investor = mining commission
    Cryptography + Trithemius + Diplomatic Contact + Crown Favor = intelligence operation
    Occult Philosophy + Kabbalah + Monas + Appropriate Reputation = symbolic synthesis

## The Map: An Intellectual Labor Market

Locations are not merely geographic. They represent the player's currently accessible
political and intellectual space. A location's value is the demand it has for the player's
particular repertoire.

MAP ACCESS = f(current_date, political_relationships, reputation, contacts, events)

The player's political state determines which nodes are accessible.

## Resources

Eight core resources:

| Resource         | Function                                      |
|------------------|-----------------------------------------------|
| Money            | Travel, books, experiments, patrons           |
| Time             | The fundamental FTL pressure                  |
| Knowledge        | Accumulated intellectual capability           |
| Books            | Professional toolkit                          |
| Reputation       | Access to people and opportunities            |
| Patronage        | Relationships with powerful individuals       |
| Crown Favor      | Government missions and protection            |
| Secrecy          | How much suspicious attention attracted       |

Reputation is multidimensional:

    Court / Scholars / Alchemists / Church / Merchants / Occultists / Crown / Printers

A spectacular alchemical success increases Alchemist reputation while possibly
decreasing Church standing.

## The Household (The "Ship")

Mortlake is the persistent base, analogous to FTL's ship. Rooms represent persistent assets.

| Room               | Assets                        |
|--------------------|-------------------------------|
| Library            | books, manuscripts            |
| Study              | research in progress          |
| Laboratory         | equipment, reagents           |
| Scrying Chamber    | apparatus (locked by default) |
| Instrument Room    | astronomical instruments      |
| Correspondence     | contacts, political intel     |
| Household Quarters | crew, health, stability       |

## Crew System (Network Members)

Crew are **alternative ways to perform operations**, not stat bonuses.

Each crew member has:
- name, age, role
- abilities (capability dictionary)
- relationships (to other characters and factions)
- loyalty, health, reputation
- political affiliations
- epistemic reliability
- personal agenda
- secrets
- historical status (documented / plausible / etc.)
- current location, availability

## Book System

Books are **not** simply "+2 Intelligence" items.

A book potentially:
- unlocks a research operation
- unlocks an interpretation
- provides a prerequisite for synthesis
- unlocks a blue encounter option
- establishes a contact/reference
- provides a language or conceptual capability
- contributes to a larger intellectual synthesis
- can be lost, stolen, sold, copied, or left behind

Book fields: title, author, date, subject, language, intellectual_tags, prerequisites,
operations_unlocked, historical_status, rarity, value, portability, provenance, notes,
censorshipStatus, marginalia.

## Encounter System

Encounters are data-driven. Each encounter contains:
- id, title, location, historical period
- description, participants
- choices with requirements and outcomes
- resource changes, relationship changes, political consequences
- historicalStatus tag

Choices support conditional **blue options** — capabilities visible but inaccessible
without the required combination of book + skill + contact.

For example:
- DEFAULT: "Explain the comet as a natural phenomenon."
- BLUE: [Astronomy + Ptolemy] "Construct a technical astrological assessment."
- BLUE: [Occult Philosophy + Court Contact] "Present the event as a providential warning."

## Political Weather

The world has a changing political state. A single "Elizabeth Favor = 72" is wrong.
Instead, the political environment contains:

- Factional balances (Elizabeth, Burghley, Leicester, Walsingham, etc.)
- The currency of different kinds of knowledge at the current moment
- Latent favor: a ruler may not currently favor the player but has potential compatibility
- Political weather events that change the value of the player's existing repertoire

The FTL-equivalent question: Which intellectual and political relationships should I
cultivate before the next change in court politics makes my current repertoire obsolete?

## Political Pressure (The "Rebel Fleet")

Instead of a pursuing fleet, the game uses compounding political pressure:
- Crown deadline pressure
- Patron impatience
- Religious scrutiny
- Court factional conflict
- Financial pressure
- Household instability
- Reputation crisis

These pressures cause consequences if ignored. The player feels time moving even while researching.

## Protagonist Transfer (for future campaigns)

Campaign state is independent of the player-character class. When control transfers:
- Dee → Kelley
- Dee → Arthur
- Dee → another household member

The inherited state includes: books, manuscripts, equipment, contacts, reputation,
relationships, knowledge, debts, political enemies, unfinished projects.

## The Printing Progression (deferred beyond vertical slice)

    Library → Manuscript Collection → Patronage → Printing Contact
    → Printing Press → Own Publications → Intellectual Network

## Victory Conditions

Multiple possible outcomes rather than a single ending:
- Royal Service: become indispensable Crown intelligence asset
- The Great Library: acquire a legendary manuscript collection
- The Philosophical Empire: build a European network of scholars and printers
- Alchemy: pursue a particular alchemical objective
- Angelic Knowledge: develop the scrying/angelological system
- Publication: build a printing network, disseminate intellectual system
- Career Collapse: lose patronage, security, and institutional access

## Campaigns (long-term architecture)

| Campaign    | Setting          | Core Tension                          |
|-------------|------------------|---------------------------------------|
| John Dee    | Elizabethan Eng. | Espionage, books, mathematical-occult |
| Ibn Turka   | Timurid Iran     | Lettrism, synthesis, inquisition      |
| Agrippa     | Holy Roman Emp.  | Natural magic, imperial court         |
| Kelley      | Prague/Rudolf    | Alchemy/scrying, reliability crisis   |

The unifying mechanic: the production, acquisition, deployment, and monetization of
specialized knowledge inside a courtly political economy.

## Open Design Questions

1. Is permadeath desirable or should career collapse be the death state?
2. How visible should the numerical political relationship scores be?
3. Should the scrying/angelic system have a separate "reliability" variable that degrades over time?
4. Should the printing system be a separate screen or integrated into household?
5. How should Kelley's epistemic unreliability be modeled mechanically (hidden variable, fog, etc.)?
6. Should books have physical weight/portability costs on travel?
7. How procedurally generated vs. authored should individual encounters be?
