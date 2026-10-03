# Source Verification Workflow

**Core principle baked into our system:**

When building biography entries, always consult the **original scholarly texts**, not database renderings.

---

## The Three-Layer Problem

```
Layer 1 (Original): Parry, Harkness, Sherman, Clulee PDFs
                    ↓ (subject to interpretation)
Layer 2 (Database): DeeChunks chunks + summaries
                    ↓ (subject to extraction artifacts)
Layer 3 (Our work): Biography entries in entries.ts
```

**Risk:** Each layer loses fidelity. By Layer 3, we may hallucinate details that were never in the original.

**Solution:** Always read Layer 1 before finalizing Layer 3.

---

## Workflow: From Candidate to Verified Entry

### 1. Discovery (DeeChunks is OK here)
```
biography_candidates.json: "arrested 1555 calculing conjuring"
Mentions: Harkness, Parry, Sherman
```

### 2. Locate Source PDFs
```
E:\pdf\renaissance magic\Dee\
  → Harkness_Conversations_with_Angels.pdf
  → Parry_Arch-Conjuror.pdf
  → Sherman_Politics_of_Reading.pdf
```

### 3. Read Full Context
```
Harkness pages 35–42:
"In 1555, Dee was arrested on charges of calculing and conjuring. 
Cleared of treason but held on religion. Remanded to Bishop Edmund 
Bonner's household. The exact nature of the collaboration with 
Bonner—accusation, survival strategy, or conviction—remains disputed."

Primary source cited: Casaubon's "A True & Faithful Relation" (1659)
Secondary source: Foxe's "Acts and Monuments" (Protestant martyrology)
```

### 4. Verify + Cross-Reference
```
☑ Claim found in original? YES
☑ Date (1555) matches? YES
☑ Detail level reasonable? YES (not over-specific)
☑ Other scholars agree? Parry 48–58 confirms; Sherman mentions
☑ Status = documented? YES (attested in primary sources)
```

### 5. Create Entry with Full Citation Chain
```typescript
export const DEE_ARREST_1555: BiographicalEvent = {
  id: 'dee_arrest_1555',
  label: 'Arrest on Charges of Calculing and Conjuring',
  type: 'event',
  historicalStatus: 'documented',
  
  dateStart: '1555',
  description: 'Arrested under Mary I on charges of "calculing" (divination) and "conjuring" (magical summoning). Cleared of treason but held on religion.',
  
  // VERIFIED SOURCES (with pages)
  sources: [
    "Harkness 35–42",      // Secondary: Conversations with Angels
    "Parry 48–58",         // Secondary: Arch-Conjuror
    "Foxe Acts and Monuments",  // Primary: Protestant martyrology
    "Casaubon 1659",       // Primary: True & Faithful Relation
  ],
  
  // PROOF OF VERIFICATION
  verifiedAgainst: {
    "Harkness_pages_35-42": {
      status: "verified_2026-10-03",
      notes: "Full passage read. Confirmed: arrest, charges, Bonner household."
    },
    "Parry_pages_48-58": {
      status: "verified_2026-10-03",
      notes: "Confirmed details on charge specifics and release from treason."
    }
  }
};
```

---

## Tools & Resources

### The Source Library
```
E:\pdf\renaissance magic\Dee\
├── Parry_Arch-Conjuror_of_England.pdf
├── Harkness_Conversations_with_Angels.pdf
├── Sherman_Politics_of_Reading_and_Writing.pdf
├── Clulee_Natural_Philosophy.pdf
├── Whitby_Actions_with_Spirits.pdf
├── Szonyi_Occultism.pdf
└── [others]
```

### Database (for discovery only)
```
E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite
├── scholarly_chapter_summaries
├── dee_daybook_entry_summaries
├── bibliography_timeline
└── [search index]
```

### Our Extraction Pipeline
```
scripts/extract_biography_candidates.py
  → research/biography_candidates.json

scripts/verify_biography_candidates.py
  → research/biography_candidates_verification.csv
  
[Manual verification + source checking]

scripts/candidates_to_entries.py (todo)
  → src/data/biography/entries.ts
```

---

## Red Flags: Return to Original Immediately

- [ ] DeeChunks extraction is vague or fragmented
- [ ] Multiple scholars cite it differently
- [ ] Historical status unclear (documented vs. plausible)
- [ ] Related entries might contradict
- [ ] You're unsure about a date or spelling
- [ ] The claim seems surprising
- [ ] You need to understand WHY, not just WHAT
- [ ] Assigning theme tags requires judgment
- [ ] Entry will gate major game mechanics

**When in doubt: Read the original.**

---

## Verification Log Template

Create `research/verification_log.csv`:

```csv
entry_id,scholar,pdf_pages,primary_source,status,confidence,notes
dee_arrest_1555,Harkness,35-42,"Foxe Acts, Casaubon 1659",verified,documented,"Confirms charges, Bonner household"
dee_arrest_1555,Parry,48-58,"State Papers, Foxe",verified,documented,"Confirms release from treason"
monas_1564,Harkness,76-90,"Antwerp edition, Silvius",verified,documented,"Confirms date, printer, dedication"
```

Use this log to:
- Track which entries you've verified
- See who confirmed what
- Catch contradictions
- Prove due diligence

---

## Standing Instructions

### For LLM Extraction
When building biography entries from scholarship:

1. **Never trust a chunk.** Even if DeeChunks says "Harkness 35–42", you must:
   - Open the PDF
   - Go to pages 35–42
   - Read the full passage
   - Understand the context
   - Check surrounding pages for qualifications

2. **Primary sources matter.** Scholars cite primary documents. When Harkness cites Casaubon citing Dee's day books, that's the real chain. Your entry should reflect that chain.

3. **Historical status is earned.** Mark "documented" only if multiple primary sources confirm it. "Plausible" if scholars argue reasonably. "Contested" if they disagree.

4. **Slow beats wrong.** It's better to have 60 highly verified entries than 200 hallucinated ones.

---

## Example: Entry Verification Checklist

**Entry:** Monas Hieroglyphica published 1564

**Discovery:** DeeChunks mentions it (Harkness, Clucas)

**Source checking:**
- [ ] Read Harkness pages 76–90? YES
- [ ] Found publication date in original? YES (1564)
- [ ] Found printer name? YES (Silvius, Antwerp)
- [ ] Found dedication? YES (Maximilian II)
- [ ] Checked Clucas interpretation? YES (Pythagorean, Ambix 64.2)
- [ ] Consulted other scholars? YES (Walton, Parry)
- [ ] Any contradictions? NO
- [ ] Multiple confirmations? YES (4 sources agree on date/printer)
- [ ] Entry ready to cite? YES

---

**This protocol ensures that every entry in our biography database can withstand scholarly scrutiny and be cited in academic contexts.**

**Baked in: Always consult the original.**
