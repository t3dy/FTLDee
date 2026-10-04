#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract biography candidates from DeeChunks corpus.

Reads the DeeChunks SQLite database (E:/pdf/renaissance magic/Dee/DeeChunks/dee_chunks.sqlite)
and extracts all biographical events, people, concepts, equipment, and terms mentioned by
Harkness, Parry, Sherman, and Clulee.

Outputs JSON candidates file for LLM verification.

Usage:
    python extract_biography_candidates.py
"""

import sqlite3
import json
import re
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Set, Tuple

# Path to DeeChunks database
CORPUS_PATH = Path("E:/pdf/renaissance magic/Dee/DeeChunks/dee_chunks.sqlite")

# Major scholars we're interested in
SCHOLARS = {
    "Parry": "Glyn Parry",
    "Harkness": "Deborah Harkness",
    "Sherman": "William Sherman",
    "Clulee": "Nicholas Clulee",
}

# Category keywords for extraction
CATEGORY_PATTERNS = {
    "events": [
        r"\b(arrested|executed|visited|traveled|went|arrived|departed|published|wrote|studied|taught|consulted|advised|met with|encountered|worked with)\b",
        r"\b(1\d{3}|January|February|March|April|May|June|July|August|September|October|November|December)\b",
        r"\b(born|died|death|death date|birth|christened)\b",
    ],
    "people": [
        r"\b([A-Z][a-z]+ [A-Z][a-z]+)\b",  # Names
        r"\b(Elizabeth|Cecil|Leicester|Walsingham|Kelley|Laski|Frobisher|Mercator|Frisius)\b",
    ],
    "places": [
        r"\b(Mortlake|London|Greenwich|Windsor|Prague|Louvain|Constantinople|Cairo|Samarkand|Paris|Antwerp|Vienna|Cracow)\b",
        r"\b(England|Spain|France|Germany|Ottoman|Persia|Egypt)\b",
    ],
    "occult": [
        r"\b(magic|alchemy|astrology|angel|spirit|demon|talisman|sigil|kabbalah|hermetic|occult|cabala|mysticism|divination|scrying|crystal|séance)\b",
    ],
    "scientific": [
        r"\b(mathematics|astronomy|geometry|navigation|cartography|astrolabe|quadrant|globe|instrument|observation|calculation|lens)\b",
        r"\b(natural philosophy|natural magic|science)\b",
    ],
    "equipment": [
        r"\b(astrolabe|quadrant|globe|telescope|mirror|crystal|instrument|apparatus|furnace|alembic|retort|crucible|crucible)\b",
    ],
    "books": [
        r"\b(Elements|Almagest|Monas|Propaedeumata|Steganographia|De revolutionibus|Preface|Mathematical|Euclid|Ptolemy|Agrippa|Trithemius|Copernicus|Paracelsus)\b",
    ],
    "concepts": [
        r"\b(grimoire|reputation|patronage|network|sect|circle|correspondence|sympathy|transformation|transmutation|synthesis|universal science)\b",
    ],
}

# Biographical event markers
EVENT_MARKERS = [
    "was arrested",
    "was appointed",
    "was consulted",
    "married",
    "died",
    "published",
    "wrote",
    "left for",
    "returned to",
    "entered",
    "founded",
    "became",
    "served as",
    "worked as",
    "studied at",
    "lectured on",
]


class BiographyExtractor:
    def __init__(self, corpus_path: Path):
        self.corpus_path = corpus_path
        self.conn = None
        self.candidates = defaultdict(lambda: defaultdict(list))

    def connect(self) -> bool:
        """Connect to DeeChunks database."""
        try:
            self.conn = sqlite3.connect(str(self.corpus_path))
            self.conn.row_factory = sqlite3.Row
            print(f"[+] Connected to {self.corpus_path}")
            return True
        except sqlite3.OperationalError as e:
            print(f"[-] Failed to connect to database: {e}")
            return False

    def get_scholar_chunks(self, scholar_key: str) -> List[str]:
        """Get all chunks attributed to a scholar."""
        scholar_name = SCHOLARS.get(scholar_key, scholar_key)

        # Maps scholar key to table/author name
        scholar_tables = {
            "Harkness": ("harkness_chapter_summaries", None),
            "Parry": ("scholarly_chapter_summaries", "Parry"),
            "Sherman": ("scholarly_chapter_summaries", "Sherman"),
            "Clulee": ("scholarly_chapter_summaries", "Clulee"),
        }

        if scholar_key not in scholar_tables:
            print(f"  [-] Scholar {scholar_key} not configured")
            return []

        table_name, author_filter = scholar_tables[scholar_key]

        try:
            cursor = self.conn.cursor()

            if author_filter:
                query = f"SELECT argument_summary, historiographical_issues, essay FROM {table_name} WHERE author LIKE '%{author_filter}%'"
            else:
                # Harkness table doesn't have author column
                query = f"SELECT argument_summary, historiographical_issues FROM {table_name}"

            cursor.execute(query)
            results = cursor.fetchall()

            if results:
                chunks = []
                for row in results:
                    for cell in row:
                        if cell:
                            chunks.append(str(cell))
                print(f"  [+] Found {len(results)} chapters from {scholar_name}")
                return chunks
        except sqlite3.OperationalError as e:
            print(f"  [-] Query error: {e}")
            return []

        print(f"  [-] No chunks found for {scholar_name}")
        return []

    def extract_category(self, text: str, category: str) -> List[str]:
        """Extract candidates matching a category."""
        candidates = set()

        patterns = CATEGORY_PATTERNS.get(category, [])
        for pattern in patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                # Get the matched text or surrounding context
                start = max(0, match.start() - 50)
                end = min(len(text), match.end() + 50)
                context = text[start:end].strip()
                candidates.add(context)

        return list(candidates)

    def extract_event_sentences(self, text: str) -> List[Tuple[str, int]]:
        """Extract sentences containing biographical events."""
        sentences = re.split(r'[.!?]\s+', text)
        events = []

        for sentence in sentences:
            # Check if sentence contains event markers
            for marker in EVENT_MARKERS:
                if marker.lower() in sentence.lower():
                    # Check if it also contains a year or name
                    if re.search(r'\b(1\d{3}|[A-Z][a-z]+ [A-Z][a-z]+)\b', sentence):
                        year = re.search(r'\b(1\d{3})\b', sentence)
                        year_int = int(year.group(1)) if year else 0
                        events.append((sentence.strip(), year_int))
                    break

        return events

    def process_scholar(self, scholar_key: str) -> None:
        """Extract all candidates from a scholar's work."""
        print(f"\n[>] Processing {SCHOLARS[scholar_key]}...")

        chunks = self.get_scholar_chunks(scholar_key)
        if not chunks:
            return

        full_text = " ".join(chunks)

        # Extract categories
        for category in CATEGORY_PATTERNS.keys():
            candidates = self.extract_category(full_text, category)
            self.candidates[scholar_key][category] = candidates
            print(f"    {category}: {len(candidates)} candidates")

        # Extract biographical events
        events = self.extract_event_sentences(full_text)
        self.candidates[scholar_key]["biographical_events"] = [
            {"text": event[0], "year": event[1]}
            for event in sorted(events, key=lambda x: x[1], reverse=True)
        ]
        print(f"    biographical_events: {len(events)} events")

    def extract_biography_timeline(self) -> None:
        """Extract from biography_timeline table (actual events)."""
        print(f"\n[>] Processing biography_timeline...")
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT event_id, date_label, title, summary, category FROM biography_timeline")
            results = cursor.fetchall()

            if results:
                events = []
                for row in results:
                    event_id, date_label, title, summary, category = row
                    event_text = f"{title} ({date_label}): {summary}" if summary else f"{title} ({date_label})"
                    events.append(event_text)

                self.candidates["biography_timeline"]["events"] = events
                print(f"  [+] Found {len(events)} timeline events")
        except sqlite3.OperationalError as e:
            print(f"  [-] Query error: {e}")

    def extract_daybook_entries(self) -> None:
        """Extract from dee_daybook_entry_summaries (diary entries)."""
        print(f"\n[>] Processing dee_daybook_entry_summaries...")
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT date_label, topics, summary FROM dee_daybook_entry_summaries LIMIT 100")
            results = cursor.fetchall()

            if results:
                entries = []
                for row in results:
                    date_label, topics, summary = row
                    entry_text = f"{date_label}: {summary}" if summary else date_label
                    entries.append(entry_text)

                self.candidates["daybook_entries"]["entries"] = entries
                print(f"  [+] Found {len(entries)} daybook entries")
        except sqlite3.OperationalError as e:
            print(f"  [-] Query error: {e}")

    def extract_spirit_actions(self) -> None:
        """Extract from dee_spirit_action_summaries (angelic sessions)."""
        print(f"\n[>] Processing dee_spirit_action_summaries...")
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT date_label, topics, summary FROM dee_spirit_action_summaries LIMIT 100")
            results = cursor.fetchall()

            if results:
                actions = []
                for row in results:
                    date_label, topics, summary = row
                    action_text = f"{date_label}: {summary}" if summary else date_label
                    actions.append(action_text)

                self.candidates["spirit_actions"]["actions"] = actions
                print(f"  [+] Found {len(actions)} spirit actions")
        except sqlite3.OperationalError as e:
            print(f"  [-] Query error: {e}")

    def extract_all(self) -> Dict:
        """Extract candidates from all sources."""
        # Extract from scholars first
        for scholar_key in SCHOLARS.keys():
            self.process_scholar(scholar_key)

        # Then extract from actual biographical tables
        self.extract_biography_timeline()
        self.extract_daybook_entries()
        self.extract_spirit_actions()

        return dict(self.candidates)

    def save_candidates(self, output_path: Path) -> None:
        """Save candidates to JSON file."""
        candidates_dict = dict(self.candidates)

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(candidates_dict, f, indent=2, default=str, ensure_ascii=False)

        print(f"\n[+] Candidates saved to {output_path}")

        # Print summary
        print(f"\n[=] Summary:")
        for scholar_key, categories in candidates_dict.items():
            total = sum(len(v) if isinstance(v, list) else (len(v) if isinstance(v, dict) else 1)
                       for v in categories.values())
            print(f"  {scholar_key}: {total} items across {len(categories)} categories")

    def close(self) -> None:
        """Close database connection."""
        if self.conn:
            self.conn.close()
            print("[+] Database closed")


def main():
    print("[*] DeeChunks Biography Candidate Extractor")
    print("=" * 60)

    extractor = BiographyExtractor(CORPUS_PATH)

    if not extractor.connect():
        print("\n[!] Could not connect to corpus. Checking if database exists...")
        if not CORPUS_PATH.exists():
            print(f"\n[X] Database not found at {CORPUS_PATH}")
            print("   Please ensure DeeChunks is available at E:/pdf/renaissance magic/Dee/DeeChunks/")
            return

    print("\nExtracting candidates...")
    candidates = extractor.extract_all()

    # Save results
    output_path = Path("research/biography_candidates.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    extractor.save_candidates(output_path)

    extractor.close()

    print("\n[OK] Extraction complete!")
    print(f"\nNext steps:")
    print(f"1. Review {output_path} for candidate events")
    print(f"2. Run: python scripts/verify_biography_candidates.py")
    print(f"3. Use LLM to verify and categorize into entries")


if __name__ == "__main__":
    main()
