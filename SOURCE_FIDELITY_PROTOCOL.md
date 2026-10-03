# Source Fidelity Protocol

**Principle:** All biographical claims must be verified against the original scholarly texts, not DeeChunks database renderings alone.

**Why:** Database summaries, chunks, and AI-extracted text degrade fidelity through:
- Paraphrasing that loses nuance
- Decontextualization (chunk boundaries cut off meaning)
- Abstraction layers (summaries → chunks → extractions)
- Risk of hallucination when relying on intermediate representations

**Rule:** When building biography entries, always:
1. Find the claim in DeeChunks (discovery/candidate stage)
2. Locate the original PDF source
3. Read the full passage (context, surrounding claims, qualification)
4. Verify the claim matches the original
5. Cite the original (not the database)

---

## Source Library Location

**Primary Dee scholarship archive:**  
`E:\pdf\renaissance magic\Dee\`

**Key works (verify these exist before citing):**

| Scholar | Work | File Path | Status |
|---------|------|-----------|--------|
| Parry | *The Arch-Conjuror of England* | `E:\pdf\renaissance magic\Dee\Parry_*.pdf` | ✓ |
| Harkness | *John Dee's Conversations with Angels* | `E:\pdf\renaissance magic\Dee\Harkness_*.pdf` | ✓ |
| Sherman | *John Dee: The Politics of Reading and Writing* | `E:\pdf\renaissance magic\Dee\Sherman_*.pdf` | ✓ |
| Clulee | *John Dee's Natural Philosophy* | `E:\pdf\renaissance magic\Dee\Clulee_*.pdf` | ✓ |
| Whitby | *John Dee's Actions with Spirits* | `E:\pdf\renaissance magic\Dee\Whitby_*.pdf` | ✓ |
| Szőnyi | *John Dee's Occultism* | `E:\pdf\renaissance magic\Dee\Szonyi_*.pdf` | ✓ |
| Håkansson | *Seeing the Word* | `E:\pdf\renaissance magic\Dee\Hakansson_*.pdf` | ? |
| Others | See `E:\pdf\renaissance magic\Dee\` directory | Various | Check |

**Also available:**
- Dee's own manuscripts (copies, transcriptions)
- Historical documents (letters, day books)
- Contemporary sources (Foxe, etc.)
- Related scholars (Melvin-Koushki, etc.)

---

## Workflow: From Candidate to Verified Entry

### Stage 1: Discovery (Can use DeeChunks)
```
Search biography_candidates.json for "arrested 1555"
→ Found in Harkness, Parry, Sherman extractions
```

### Stage 2: Locate Source
```
DeeChunks says: "Harkness 35–42"
Action: Obtain Harkness book, go to pages 35–42
```

### Stage 3: Full-Text Reading
```
Read the full passage (pages 35–42, not just extracted snippet)
- What's the surrounding context?
- What qualifications or caveats does Harkness add?
- What's the primary source (if Harkness cites one)?
- What page is the specific claim on?
```

### Stage 4: Verification Checklist
```
☐ Found in original? _______________
☐ Exact quote/paraphrase matches? Yes/No
☐ Historical status (documented/plausible/disputed)? ___
☐ Primary source cited? _______________
☐ Page range (full context)? ___________
☐ Conflicts with other scholars? Yes/No
```

### Stage 5: Citation
```
OLD (DeeChunks-based):
  sources: ["Harkness 35–42"]

NEW (Source-verified):
  sources: ["Harkness 35–42 (primary source: Casaubon 1659)"]
  primarySource?: "Casaubon, A True & Faithful Relation"
```

---

## Examples: DeeChunks → Original Verification

### Example 1: Dee's Arrest (1555)

**DeeChunks extraction:**
```
"was arrested on charges of calculing and conjuring"
Source: Harkness 35–42, Parry 48–58
```

**Verification workflow:**
1. Open Harkness, *Conversations with Angels*, pages 35–42
2. Read full passage on arrest
3. Find: "arrested in 1555 on charges of calculing and conjuring, held on religion"
4. Locate Harkness's primary source citation: Parry (earlier historian), Foxe's *Acts and Monuments*
5. Verify: "calculing" = divination/astrology, "conjuring" = magic summoning
6. Check other scholars:
   - Parry 48–58: Confirms arrest, adds detail on Bonner household
   - Sherman: Mentions but doesn't detail
7. Finalize entry:
   ```
   sources: [
     "Harkness 35–42",
     "Parry 48–58", 
     "Foxe Acts and Monuments (36 corpus hits)"
   ]
   ```

### Example 2: Monas Hieroglyphica (1564)

**DeeChunks extraction:**
```
"Monas Hieroglyphica published in Antwerp 1564"
Source: Harkness 76–90
```

**Verification workflow:**
1. Open Harkness, pages 76–90
2. Find: "Monas Hieroglyphica, Antwerp, typographer Silvius, 1564, dedicated to Maximilian II"
3. Check other scholars:
   - Clucas (Pythagorean interpretation): *Ambix* 64.2
   - Walton (geometrical cabala): *Ambix* 23.2
   - Parry (alchemical): *Arch-Conjuror*, mentions date but not details
4. Verify publication details:
   - Printer: Silvius (confirmed in Harkness)
   - Dedication: Maximilian II (confirmed, 104 DeeChunks hits)
5. Finalize:
   ```
   sources: [
     "Harkness 76–90",
     "Clucas Ambix 64.2 (Pythagorean interpretation)",
     "Walton Ambix 23.2 (geometrical cabala)"
   ]
   historicalStatus: "documented"
   ```

---

## Red Flags: When to Return to Original

Always return to original text if:

- [ ] DeeChunks extraction is vague or fragmented
- [ ] Multiple scholars cite it differently
- [ ] Historical status is unclear (documented vs. plausible)
- [ ] Related entries might contradict this one
- [ ] You're unsure about a date or name spelling
- [ ] The claim seems surprising or important
- [ ] You need to understand WHY something happened (not just WHAT)
- [ ] Assigning theme tags requires judgment call
- [ ] Entry will gate major game mechanics

**When in doubt: Go to the source.**

---

## Standing Instructions

### For Session Leadership (C:\Dev\CLAUDE.md)

Add to "Research discipline" section:

```markdown
- **Source fidelity is non-negotiable.** DeeChunks is a discovery tool, not a substitute for primary sources. Every biography entry must be verified against the original scholar's text (Parry, Harkness, Sherman, Clulee, etc.). Citation includes: which scholar(s), which pages, which primary sources they cite. If you can't locate the original, mark the entry as `historicalStatus: "plausible"` or skip it.

- **Check the full passage, not the chunk.** When DeeChunks gives you a snippet, locate that snippet's context in the original PDF. Read the surrounding pages. Understand what the scholar is saying about it and what qualifications apply. This prevents hallucination from extraction layers.

- **Maintain a verification log.** As you build entries, log which scholar was consulted, which pages, what primary sources they cite. This becomes your proof of fidelity and helps catch inconsistencies.
```

### For Biography Work (C:\Dev\FTLDee\CLAUDE.md)

Add to "Bibliography" or "Historical-Content Rules":

```markdown
- **Source Fidelity Protocol.** All entries verified against original texts in `E:\pdf\renaissance magic\Dee\`, not DeeChunks summaries. See `SOURCE_FIDELITY_PROTOCOL.md` for workflow. When verifying an entry:
  1. Candidate from DeeChunks (discovery)
  2. Locate passage in original scholar's PDF
  3. Read full context (surrounding pages, qualifications)
  4. Verify claim matches original
  5. Cite original sources (scholar + page + primary sources they cite)
  6. Mark historicalStatus based on confidence level
```

---

## Biography Entry Template (With Source Verification)

```typescript
export const EXAMPLE_EVENT: BiographicalEvent = {
  id: 'dee_arrest_1555',
  label: 'Arrest on Charges of Calculing and Conjuring',
  type: 'event',
  historicalStatus: 'documented',
  themes: ['security', 'occult_philosophy'],
  
  dateStart: '1555',
  description: 'Arrested under Mary I on charges of "calculing" (divination/astrology) and "conjuring" (magical summoning). Cleared of treason but held on religion. Remanded to Bishop Edmund Bonner\'s household.',
  
  // SOURCE VERIFICATION FIELDS
  sources: [
    "Harkness 35–42",        // Secondary scholar
    "Parry 48–58",           // Secondary scholar
    "Foxe Acts and Monuments" // Primary: Foxe's martyrology
  ],
  
  // Added: Where the original text says what
  sourceDetails: {
    "Harkness 35–42": {
      primarySource: "Casaubon, A True & Faithful Relation; Foxe, Acts and Monuments",
      confidence: "documented",
      quotable: "arrested in 1555 on charges of calculing and conjuring"
    },
    "Parry 48–58": {
      primarySource: "State Papers, Foxe",
      confidence: "documented",
      quotable: "cleared of treason; held on religion; remanded to Bishop Edmund Bonner"
    }
  },
  
  // Added: Chain of evidence
  primarySources: [
    "Foxe, Acts and Monuments (1563+)",
    "State Papers (National Archives)"
  ],
  
  consequence: 'Established the paradox: magical expertise is simultaneously useful and incriminating. Secrecy mechanic origin.',
  relatedEntries: ['dee', 'bonner_household', 'security_mechanic'],
};
```

---

## Verification Checklist Before Finalizing

- [ ] Entry claim verified in original scholar text
- [ ] Full context read (surrounding pages, not just snippet)
- [ ] Primary sources identified and cited
- [ ] Multiple scholars consulted (if available)
- [ ] Historical status justified by evidence
- [ ] Contradictions with other entries resolved
- [ ] Sources array includes both scholar AND primary sources
- [ ] Entry ready to cite in game narratives (no hallucination risk)

---

## Tools & Resources

### Reading the PDFs
- **PDF reader:** Adobe Acrobat, Preview, or similar
- **Search within PDF:** Ctrl+F (find text)
- **Verify page numbers:** Look at footer/header page indicator

### Cross-Referencing
- **DeeChunks:** `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite` (quotes, chunks, references)
- **Scholar index:** Table in SOURCE_FIDELITY_PROTOCOL.md (books and file locations)
- **Primary sources:** Look in scholar's bibliography/citations

### Logging Verification
- Spreadsheet or markdown file: "verification_log.csv"
  ```
  entry_id | scholar | pages | primary_source | status | notes
  ```

---

## Methodology

**This is a commitment to scholarly rigor.** We build a biography that can:
1. Stand up to historical scrutiny
2. Be cited in publications or games
3. Serve as a reference for others
4. Not hallucinate or degrade information through layers

**The cost:** Slower work (must read full passages, not just chunks)  
**The benefit:** Fidelity to historical material, no hallucination, citable sources

---

**Standing rule:** When in doubt about a source, consult the original.  
**Better to be slow and right than fast and wrong.**
