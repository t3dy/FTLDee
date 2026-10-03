#!/usr/bin/env python3
"""
Organize and deduplicate biography candidates for LLM verification.

Reads biography_candidates.json and outputs organized CSV for manual verification
and LLM categorization.

Usage:
    python scripts/verify_biography_candidates.py
"""

import json
import csv
from pathlib import Path
from collections import defaultdict
from typing import List, Dict

def load_candidates(path: Path) -> Dict:
    """Load extracted candidates from JSON."""
    with open(path, 'r') as f:
        return json.load(f)

def deduplicate_and_rank(candidates: Dict) -> List[Dict]:
    """Deduplicate and rank candidates by frequency."""
    ranked = defaultdict(int)
    sources = defaultdict(set)

    for scholar, categories in candidates.items():
        for category, items in categories.items():
            if category == "biographical_events":
                for event in items:
                    text = event.get("text", event) if isinstance(event, dict) else event
                    ranked[text] += 1
                    sources[text].add(scholar)
            elif isinstance(items, list):
                for item in items:
                    ranked[item] += 1
                    sources[item].add(scholar)

    # Rank by frequency
    sorted_candidates = sorted(ranked.items(), key=lambda x: x[1], reverse=True)

    return [
        {
            "text": text,
            "frequency": freq,
            "scholars": sorted(list(sources[text]))
        }
        for text, freq in sorted_candidates
    ]

def save_verification_csv(candidates: List[Dict], output_path: Path) -> None:
    """Save candidates to CSV for verification."""
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=["frequency", "scholars", "candidate_text", "type", "date", "verified"])
        writer.writeheader()

        for candidate in candidates[:500]:  # Top 500
            writer.writerow({
                "frequency": candidate["frequency"],
                "scholars": "|".join(candidate["scholars"]),
                "candidate_text": candidate["text"],
                "type": "",  # Manual entry
                "date": "",  # Manual entry
                "verified": "",  # Yes/No/Skip
            })

    print(f"✓ Verification CSV saved to {output_path}")

def main():
    print("📋 Biography Candidate Organization & Deduplication")
    print("=" * 60)

    candidates_path = Path("research/biography_candidates.json")

    if not candidates_path.exists():
        print(f"✗ Candidates file not found: {candidates_path}")
        print("   Run: python scripts/extract_biography_candidates.py")
        return

    print(f"\nLoading candidates from {candidates_path}...")
    candidates = load_candidates(candidates_path)

    print("Deduplicating and ranking...")
    ranked = deduplicate_and_rank(candidates)

    print(f"\n✓ Found {len(ranked)} unique candidates")
    print("\nTop 10 by frequency:")
    for i, cand in enumerate(ranked[:10], 1):
        print(f"  {i}. [{cand['frequency']}x] {cand['text'][:80]}")

    # Save verification CSV
    csv_path = Path("research/biography_candidates_verification.csv")
    save_verification_csv(ranked, csv_path)

    print(f"\n✅ Organization complete!")
    print(f"\nNext steps:")
    print(f"1. Open {csv_path} in Excel/Sheets")
    print(f"2. Review top candidates by frequency")
    print(f"3. Mark verified=Yes for entries to convert to biography.ts")
    print(f"4. Run: python scripts/candidates_to_entries.py")

if __name__ == "__main__":
    main()
