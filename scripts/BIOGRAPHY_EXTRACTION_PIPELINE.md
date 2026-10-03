# Biography Extraction Pipeline

**Goal:** Systematically extract ALL biographical candidates from DeeChunks corpus (Harkness, Parry, Sherman, Clulee) and convert to typed entries.

---

## Pipeline Overview

```
1. extract_biography_candidates.py
   ↓ (queries DeeChunks by scholar)
   research/biography_candidates.json (raw extracted candidates)
   ↓
2. verify_biography_candidates.py
   ↓ (deduplicates, ranks by frequency)
   research/biography_candidates_verification.csv (spreadsheet for review)
   ↓
3. Manual review + LLM verification
   ↓ (Mark verified=Yes in CSV)
   ↓
4. candidates_to_entries.py (todo)
   ↓ (Convert verified candidates to src/data/biography/entries.ts)
   Complete biography database
```

---

## Step 1: Extract Candidates

```bash
python scripts/extract_biography_candidates.py
```

**What it does:**
- Connects to `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite`
- Queries by scholar (Harkness, Parry, Sherman, Clulee)
- Extracts by category:
  - events (biographical milestones with years/names)
  - people (names and associates)
  - places (locations)
  - occult (magical, mystical, alchemical terms)
  - scientific (technical, mathematical terms)
  - equipment (instruments, apparatus)
  - books (publications)
  - concepts (historiographical ideas)
  - biographical_events (full sentences with event markers)

**Output:** `research/biography_candidates.json`

**Example output:**
```json
{
  "Harkness": {
    "events": [
      "was arrested on charges of calculing and conjuring in 1555",
      "was remanded to Bishop Edmund Bonner's household"
    ],
    "people": [
      "Elizabeth I",
      "John Dee",
      "Edward Kelley"
    ],
    "biographical_events": [
      {
        "text": "Dee was arrested in 1555 on charges of calculing and conjuring",
        "year": 1555
      }
    ]
  }
}
```

---

## Step 2: Organize & Deduplicate

```bash
python scripts/verify_biography_candidates.py
```

**What it does:**
- Deduplicates across scholars
- Ranks by frequency (how many scholars mention it)
- Outputs CSV for manual review
- Shows top candidates

**Output:** `research/biography_candidates_verification.csv`

**CSV columns:**
- `frequency` — How many scholars mention this
- `scholars` — Which scholars (Harkness|Parry|Sherman)
- `candidate_text` — The extracted text
- `type` — You fill this in (event/person/place/book/concept/etc)
- `date` — You fill this in (year if applicable)
- `verified` — You mark: Yes/No/Skip

---

## Step 3: Manual LLM Verification

**Open the CSV in Excel/Sheets and:**

1. **Review top 100 candidates** (sorted by frequency)
   - High frequency = mentioned by multiple scholars = important
   
2. **For each row, decide:**
   - **Yes** → Convert to biography entry
   - **No** → Reject (too vague, duplicate, or not biographical)
   - **Skip** → Undecided, review later
   
3. **Fill in the blanks:**
   - `type`: event, person, place, book, institution, venture, equipment, concept
   - `date`: Year if known (format: "1555" or "c. 1555" or "1555-1560")
   - `verified`: Yes/No/Skip

**Example verification:**

| frequency | scholars | candidate_text | type | date | verified |
|-----------|----------|---|---|---|---|
| 4 | Harkness\|Parry\|Sherman | arrested on charges of calculing and conjuring | event | 1555 | Yes |
| 3 | Harkness\|Parry | Edward Kelley enters as "Talbot" | event | 1582 | Yes |
| 2 | Parry\|Sherman | General and Rare Memorials | book | 1576 | Yes |
| 1 | Harkness | Book of Soyga put to angels | event | 1582 | Yes |

---

## Step 4: Convert to Entries (TODO)

```bash
python scripts/candidates_to_entries.py
```

**What it will do:**
- Read verified=Yes rows from CSV
- For each, create a BiographicalEntry
- Assign ID, themes, sources
- Insert into entries.ts
- Generate narrative description

**Will require:**
- Theme assignment (which of 17 themes applies?)
- Source citation (which scholar documented it?)
- Description (1-2 sentence summary)
- Related entries (cross-references)

---

## Extraction Categories Explained

### biographical_events
Sentences containing event markers:
- "was arrested", "was appointed", "died", "published", "traveled", "married"
- Extracted with surrounding context (~100 chars)
- Timestamped if year found

### people
Names extracted by regex:
- "John Dee", "Elizabeth I", "Edward Kelley"
- Rank by frequency across scholars
- Cross-reference in existing entries.ts

### places
Locations:
- "Mortlake", "Prague", "Constantinople", "Cairo", "Samarkand"
- Extract context (which scholars mention which places)

### occult
Magical/mystical terms:
- "magic", "alchemy", "astrology", "angel", "spirit", "talisman", "kabbalah", "sigil"
- Use to tag theme relevance

### scientific
Technical/mathematical terms:
- "mathematics", "astronomy", "navigation", "astrolabe", "observation", "calculation"
- Use to tag theme relevance

### equipment
Physical instruments/apparatus:
- "astrolabe", "quadrant", "globe", "mirror", "furnace", "crucible"
- May become separate EQUIPMENT entries

### books
Published/manuscript works:
- "Elements", "Almagest", "Monas", "Mathematical Preface"
- Cross-reference with books database

### concepts
Historiographical ideas:
- "grimoire", "patronage", "network", "sympathy", "correspondence"
- Use for thematic tags

---

## Expected Output

Running the full pipeline on 68 DeeChunks documents should yield:

- **1,000–2,000 raw candidates** from extraction
- **400–600 deduplicated candidates** after deduplication
- **150–250 verified entries** after manual review
- **Complete biography database** (250+ entries vs. current 58)

---

## Limitations & Caveats

1. **Regex extraction is imperfect**
   - May capture fragments or false positives
   - Manual review required
   
2. **Scholars don't cover everything**
   - Some Dee activities only in primary sources (day books, manuscripts)
   - Extraction focuses on scholarly narrative, not original documents
   
3. **Theme assignment requires judgment**
   - Script extracts, human assigns 17-theme tags
   - Related entries (cross-references) manual

4. **Dates may be fuzzy**
   - "c. 1555" vs "1555" vs "1550–1560"
   - Some events dated only to decade or year range

---

## Running the Pipeline

```bash
# Step 1: Extract from corpus
python scripts/extract_biography_candidates.py

# Step 2: Organize and deduplicate
python scripts/verify_biography_candidates.py

# Step 3: Manual review (open CSV in Excel, fill in blanks, mark verified=Yes)
# $ open research/biography_candidates_verification.csv

# Step 4: Convert verified candidates to entries (when script is written)
# python scripts/candidates_to_entries.py
```

---

## Questions & Answers

**Q: Where is the DeeChunks database?**  
A: `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite` (check your system)

**Q: Why Harkness, Parry, Sherman, and Clulee specifically?**  
A: They are the four primary secondary sources cited most in the existing biography database. DeeChunks indexes their chapter summaries.

**Q: What if DeeChunks isn't available?**  
A: The script will fail gracefully. Consider reading the PDFs directly or using the existing DEE_MASTER_BIOGRAPHY.md as a manual source.

**Q: How long does extraction take?**  
A: Depends on corpus size. ~1,000 chunks should process in seconds. If SQLite is slow, consider indexing the database.

**Q: Can I run this on other scholars?**  
A: Yes! Modify `SCHOLARS` dict at top of script to add more scholars (e.g., Håkansson, Whitby, Szőnyi).

---

**Next:** Run Step 1 and report back with candidate counts.
