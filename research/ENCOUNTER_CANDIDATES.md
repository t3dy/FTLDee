# ENCOUNTER CANDIDATES
### Biographical events → FTLDee encounter designs

Derived from `DEE_MASTER_BIOGRAPHY.md`. Each candidate references source events, suggested choice architecture, and blue-option requirements. Candidates marked ✓ are already built in `src/data/encounters/index.ts`. Others are Phase 2+.

---

## Already Built (Vertical Slice)

| ID | Title | Location | Status |
|---|---|---|---|
| ✓ mortlake_household | Daily household management | mortlake | DOCUMENTED |
| ✓ mortlake_research | Study and research activities | mortlake | DOCUMENTED |
| ✓ comet_at_windsor | Comet of 1582 and the calendar question | windsor | PLAUSIBLE |
| ✓ elizabeths_interest | Elizabeth's interest in natural philosophy | richmond | PLAUSIBLE |
| ✓ greenwich_network | Gathering at the Leicester/Sidney circle | greenwich | PLAUSIBLE |
| ✓ walsingham_intelligence | Walsingham's intelligence request | barn_elms | PLAUSIBLE |
| ✓ london_booksellers | Booksellers and the manuscript market | london | DOCUMENTED |
| ✓ career_transition_continental | The Łaski departure decision | mortlake | DOCUMENTED |

---

## Encounter Candidate #1: The Marian Arrest (1555)
**Source**: Parry 48–58; Act II of biography. 47 corpus hits.
**historicalStatus**: `documented`
**Location**: `london` (Star Chamber / Bishop Bonner's)
**Trigger**: Phase 2 encounter; triggered by low religiousAuth + high elizabeth/walsingham

**Setup**: It is 1555. Charges of "calculing and conjuring" have been brought. George Ferrers is the accuser; Secretary John Bourne is the interrogator.

**Choice architecture**:
1. **Submit to examination, defend on mathematical grounds** — saves career; costs Secrecy; time 5 days
2. **Invoke Elizabeth's patronage network** (blue: `minFaction: { elizabeth: 50 }`) — costs elizabeth −10 (political risk); defuses charges faster
3. **Seek Northumberland's household protection** — depends on pre-existing contacts
4. **Say nothing and wait** — costs time; increases pressure; reduces religiousAuth

**Outcome note**: Parry's thesis is that mathematical expertise is simultaneously *useful and incriminating*. Every choice here should reinforce that paradox — there is no clean resolution.

**The Ferrers' children rumour** — 2 corpus hits. Use only as rumour *reported by others*, never as fact.

---

## Encounter Candidate #2: Bishop Bonner's Household (1555)
**Source**: Parry 48–58; Foxe's *Acts and Monuments* (36 hits).
**historicalStatus**: `contested`
**Location**: `london`
**Trigger**: Follow-up to Candidate #1

**Setup**: Cleared of treason, held on religion, remanded to Bonner. The question: what does this mean?

**This is the game's best DISPUTED encounter.** Scholars disagree whether the association was collaboration, survival strategy, or genuine Marian conviction.

**Choice architecture**:
1. **Collaborate with Bonner (Catholic survival)** — religiousAuth +15, elizabeth −20, secrecy −10; flag `marian_catholic_service`
2. **Serve formally but maintain Protestant sympathies** (contested — DISPUTED tag) — moderate changes to all; flag `contested_bonner_association`
3. **Use the household to protect others** (blue: `rhetoric ≥ 6`) — scholarNetwork +10; secret contacts protected
4. **Escape to the Continent** — counterfactual; earns `continental_early` flag

**Blue option**: `rhetoric ≥ 6` — frame the association as scholarly cooperation, not religious submission.

---

## Encounter Candidate #3: Vincent Murphyn's Slander Campaign (1570–1582)
**Source**: Parry 87–109; 26 corpus hits. First noted in the Mathematical Preface (1570).
**historicalStatus**: `documented`
**Location**: `london` or `mortlake` (repeatable)
**Mechanic**: Event that fires on a day trigger; represents Parry's thesis that *reputation is a historical force, manufactured and weaponised* (ch. 6).

**Setup**: Murphyn is forging letters in Dee's name, claiming commissions Dee has not made, undermining his credibility with potential patrons. This has been going on for years.

**Choice architecture**:
1. **Pursue legal action** — costs money £20; time 10 days; outcome uncertain
2. **Publish a rebuttal** (blue: `rhetoric ≥ 7`, `manuscriptKnowledge ≥ 6`) — scholarNetwork +5, but prints Murphyn's claims
3. **Counter through the intelligence network** (blue: `walsingham ≥ 45`, `courtlyIntelligence ≥ 5`) — Murphyn contacts investigated; secrecy cost
4. **Ignore it** — reputation pressure +5; time saved

**Design note**: There is no winning move. Murphyn's slander campaign outlasts every rebuttal. The encounter should reinforce this — whatever the player chooses, pressure accumulates. This is mechanical pressure, not a puzzle with a solution.

---

## Encounter Candidate #4: Elizabeth's Coronation Date (1559)
**Source**: Parry 48–58; 34 corpus hits for the coronation.
**historicalStatus**: `documented`
**Location**: `richmond` (pre-game or Phase 2 flashback)
**Note**: This is what establishes the elizabeth faction at the game's start. Could be a prologue or a remembered event that unlocks dialogue options.

**Setup**: You have been consulted to elect the most auspicious date for Elizabeth's coronation. Mathematical astronomy, astrology, and political caution all bear on the choice.

**Choice architecture**:
1. **Give the strictly astronomical date** — elizabeth +5, religiousAuth +5; `mathematical_coronation` flag
2. **Give the astrological date, explaining the distinction** (blue: `astrology ≥ 7`, `rhetoric ≥ 6`) — elizabeth +15; positions Dee as court astrologer
3. **Recommend both dates with an explanation of the difference** — elizabeth +8, scholarNetwork +10; establishes Dee as honest broker
4. **Refuse on religious grounds** — religiousAuth +20, elizabeth −30; career jeopardised immediately

---

## Encounter Candidate #5: John Prestall — The Rival (c. 1570–1582)
**Source**: Parry 92–114; 23 corpus hits.
**historicalStatus**: `documented`
**Location**: `london`
**Trigger**: Phase 2; fires when money < 30 or time_pressure > 60

**Setup**: John Prestall is getting commissions Dee wants by making bolder alchemical promises — specifically claiming transmutation. You have been passed over for a commission Prestall secured.

**Parry's framing**: reputation is social, manufactured, competitive. Prestall's success does not mean his promises are true; it means his promises are more legible to patrons.

**Choice architecture**:
1. **Make no counter-claim; continue as you are** — integrity preserved; money lost; time costs
2. **Match Prestall's alchemical claims** (DISPUTED — costs historiographical integrity; `alchemy_promises` flag) — money +15; credibility risk
3. **Undermine Prestall through your scholarly network** (blue: `scholarNetwork ≥ 60`) — scholarNetwork +5, Prestall discredited; costs time 7 days
4. **Report Prestall to Walsingham's network** (blue: `walsingham ≥ 40`, `courtlyIntelligence ≥ 5`) — Prestall investigated; walsingham +5; moral hazard

---

## Encounter Candidate #6: General and Rare Memorials (1576–1577)
**Source**: Sherman 277–394; Parry 114–138; 19 hits Ramusio, 27 hits Madoc.
**historicalStatus**: `documented`
**Location**: `greenwich` or `barn_elms`
**Mechanic**: Writing/publication encounter with contested interpretation

**Setup**: The maritime programme is complete. *General and Rare Memorials* advocates a permanent navy, British expansion, and recovery of empire via the Arthur and Madoc precedents. How do you present it?

**DISPUTED**: real maritime policy from reading and legal argument (Sherman) *or* occult ambition in political code — "more is hid, than uttered" (Parry).

**Choice architecture**:
1. **Present the navigational case to Burghley** — burghley +15; walsingham +5; elizabeth +8
2. **Present the antiquarian-imperial case to Elizabeth** (blue: `manuscriptKnowledge ≥ 7`, `rhetoric ≥ 6`) — elizabeth +20; `imperial_programme` flag; contested reading
3. **Present the occult-political reading to Leicester** (blue: `occultPhilosophy ≥ 7`, `leicester ≥ 50`) — leicester +15; secrecy −10; `hidden_occult_programme` flag
4. **Publish and let it speak for itself** — scholarNetwork +8; burghley +5; no faction windfall

---

## Encounter Candidate #7: Barnabas Saul (December 1581)
**Source**: Harkness 35–42; 119 corpus hits.
**historicalStatus**: `documented`
**Location**: `mortlake`
**Trigger**: Fires on or after day 60 if `occultPhilosophy ≥ 6`

**Setup**: The first angelic action. Barnabas Saul, your scryer, has looked into the crystal and reports a presence. The system has begun.

**Choice architecture**:
1. **Accept Saul's report; proceed with prayer and ritual** — `scrying_begun` flag; focus −5
2. **Interrogate Saul's reliability; test the vision** (blue: `naturalPhilosophy ≥ 6`) — `saul_tested` flag; delays next session
3. **Refuse the procedure on religious grounds** — religiousAuth +15; occult path closed temporarily
4. **Record everything but draw no conclusions** — `systematic_record` flag; `first_action_documented` flag; scholarNetwork +5

**Design note**: Saul *fails and recants* (119 hits). The encounter should not treat his success as guaranteed. The `systematic_record` choice establishes Dee's habit of documentation that will matter later.

---

## Encounter Candidate #8: Edward Kelley Arrives (March 1582)
**Source**: Harkness 35–40; Parry 55–58; 74 hits for Talbot.
**historicalStatus**: `documented`
**Location**: `mortlake`
**Trigger**: Follow-up to Candidate #7; Saul having failed

**Setup**: A stranger calling himself Talbot has presented himself as a scryer. Jane Dee has expressed doubt. He has knowledge of unusual matters.

**Blue option**: `courtlyIntelligence ≥ 5` — investigate Talbot's history before agreeing to work with him.

**Choice architecture**:
1. **Accept Talbot; begin sessions immediately** — `kelley_accepted` flag; angelic work accelerates; risk unexamined
2. **Investigate Talbot before deciding** (blue: `courtlyIntelligence ≥ 5`) — discovers `criminal_past` detail; player must decide with knowledge
3. **Reject Talbot; wait for another scryer** — delays angelic work 30 days; secrecy maintained
4. **Consult Walsingham's network about this stranger** (blue: `walsingham ≥ 45`) — `kelley_investigated` flag; walsingham +5; costs secrecy

**Kelley's sincerity is DISPUTED.** The game does not resolve it.

---

## Encounter Candidate #9: The Book of Soyga and the Eastern Thread (1582)
**Source**: 89 corpus hits. M-K 2021 argument: Bunian-Bistamian corpus connection.
**historicalStatus**: `contested` (M-K's argument; not universally accepted)
**Location**: `mortlake`
**Ottoman significance**: This is where the Ottoman path first becomes available.

**Setup**: In the angelic sessions, the *Book of Soyga* has been placed before the stone. Uriel has deferred to Michael as its expounder. Scholars of Arabic learning later recognised the book's lore as related to the Bunian-Bistamian corpus known in Ottoman courts.

**Blue option**: `occultPhilosophy ≥ 7` + `manuscriptKnowledge ≥ 6` — recognise the eastern parallels

**Choice architecture**:
1. **Pursue Michael's exposition through the sessions** — `soyga_angelic` flag; follow angels
2. **Research the book's manuscript history** (blue: `manuscriptKnowledge ≥ 6`) — discovers Arabic manuscript lineage; `soyga_manuscript_research` flag
3. **Seek the Arabic parallel texts** (blue: `occultPhilosophy ≥ 7`, `languages ≥ 6`) — `ottoman_thread_open` flag; opens Ottoman path
4. **Interpret the Soyga entirely within the Kabbalah** — `kabbalah_interpretation` flag; closes eastern path

**Ottoman path gate**: Only choices 3 opens the `ottoman_thread_open` flag, required for the Ottoman ending in `career_transition_continental`.

---

## Phase 3 Encounters (Continental, post-Vertical Slice)

| Candidate | Location | Events |
|---|---|---|
| Łaski's Dynastic Ambition | Travel to London | What Łaski actually wants |
| Cracow and Nalvage | Continental | 49 governors, 48 keys |
| Rudolf II Audience | Prague | One audience; courteous refusal |
| Books in the Furnace | Prague | 1586; restoration question |
| Communion of Wives | Třeboň | April 1587; the crisis |
| Return without Kelley | England | 1589; collapse of partnership |
| Compendious Rehearsal | London | 1592; self-defence as practice |
| Manchester Appointment | Manchester | 1595; exile-as-office |
| Petition to James | London | 1604–05; refused — verify Parry ch. 11 |
| Late Actions with Hickman | Mortlake | 1607; last scryer |
| Ottoman Blue: Murad's Court | Constantinople | COUNTERFACTUAL — requires 3+ ottoman flags |

---

*Generated from DEE_MASTER_BIOGRAPHY.md. Update when biography is revised.*
