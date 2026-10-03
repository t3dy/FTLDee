# PROMPT 1 — Methods and Results
**Date**: 2026-10-02
**Session**: FTLDee research pipeline, companion portal, GitHub deployment

---

## What was asked

> Import biographical work we've already done, create a new master biography that could be turned into encounters, all living in FTLDee. Deploy to GitHub. Create a companion website with a Dee knowledge portal and documentation of all Dee-related game projects. Study TurkaGame for the Ibn Turka / Ottoman Adventure angle.

---

## Interpretation

The user asked for five distinct deliverables:
1. A **master biography** synthesising all prior Dee biographical work into FTLDee-specific research files
2. **Encounter candidates** mapping biographical events to game design
3. The **Ottoman connection** documented from TurkaGame research
4. A **companion portal** (static HTML) linking game + scholarship + related projects
5. **GitHub Pages deployment** with CI

The PROMPT1METHODSANDRESULTS system means: document this session's thinking, sources used, decisions made, and what was rejected — so future sessions don't repeat work or re-derive the same conclusions.

---

## Sources Accessed

| Source | What was extracted |
|---|---|
| `C:\Dev\DeeVisualNovel\docs\BIOGRAPHY.md` | Canonical, citation-grounded biography — Acts I–VIII, grounding tags, source key, Ottoman route, cast reference, trap warnings |
| `C:\Dev\DeeVisualNovel\content\timeline.json` | 29 ATTESTED events with page-level bibliography, generated 2026-08-31 |
| `E:\pdf\renaissance magic\Dee\DeeChunks\dee_chunks.sqlite` | Schema inspection + early spirit action sample; bibliography timeline column names |
| `E:\pdf\renaissance magic\Dee\DeeChunks\README.md` | Working rule, table descriptions, example queries |
| `C:\Dev\DeeVisualNovel\docs\SOURCES_AND_LEADS.md` | The grounding problem resolution; DeeChunks as pre-existing pipeline |
| `C:\Dev\DeeVisualNovel\DEPLOY_STATE.md` | Deploy architecture; DeeVN is generated artifact from VisualNovels |
| `C:\Dev\TurkaGame\HANDOVER.md` | Current TurkaGame state: 40 choices, 3 VN versions, TurkaVita, lettrist engine, QueryOfKings |
| `C:\Dev\TurkaGame\CLAUDE.md` | TurkaGame architecture, Ibn Turka biography, M-K 2021 framing |
| `C:\Dev\renaissance magic\CLAUDE.md` | RenMagDB architecture — 358-source corpus, SQLite, GitHub Pages |

---

## Key Findings

**Finding 1: The research pipeline already exists and is mature.**
The DeeChunks pipeline (`E:\pdf\renaissance magic\Dee\DeeChunks\`) is a fully-built research layer with 68 documents, 3,052 chunks, FTS5 search, and 10+ structured tables. The DeeVisualNovel project already built a derived research layer from it (`RESEARCH_INDEX.md`, `BIOGRAPHY.md`, `timeline.json`). FTLDee does not need to rebuild this — it needs to reference it read-only.

**Finding 2: The BIOGRAPHY.md in DeeVisualNovel is the single best source.**
It is citation-grounded, has grounding tags (ATTESTED/CONTEXT/DISPUTED/LEGEND/COUNTERFACTUAL), has been checked against the corpus, and already identifies the traps in the sources (two Jane Dees, E.K. vs Kelley, day books vs. Mysteriorum Libri). The master biography produced here (`DEE_MASTER_BIOGRAPHY.md`) uses it as spine and adds FTLDee-specific encounter annotations.

**Finding 3: The Ottoman thread enters in the very first angelic session.**
M-K's argument (that the Book of Soyga's lore derives from the Bunian-Bistamian corpus popular in Ottoman courts) means the eastward thread is present from 22 December 1581. This is important for encounter design: the ottoman path should begin feeling natural from Act V's first sessions, not as a sudden option at the career transition.

**Finding 4: The "Monas dispute" is the game's best designed encounter.**
Three scholarly positions (alchemical/Parry, geometrical cabala/Walton, disciplina noua/Clucas) give a clear three-option encounter where each choice has specific book/skill requirements and different faction outcomes.

**Finding 5: TurkaVita's "historiographical honesty" pattern should inform Ottoman arc design.**
TurkaVita's rule — only what Ibn Turka wrote freely can support claims about what he held — maps to the Ottoman arc: the game must mark the Ottoman ending as COUNTERFACTUAL and name the historical record in the epilogue.

---

## Decisions Made

**Decision 1: Master biography** uses DeeVisualNovel/BIOGRAPHY.md as spine.
- Rationale: it's already the canonical, checked source. No value in re-synthesising from scratch.
- Rejected: re-querying DeeChunks to rebuild; would duplicate existing work without adding value.

**Decision 2: Encounter candidates** map Act I–V events only (in-scope for FTLDee's timeline).
- Phase 3+ encounters (Acts VI–VIII, continental) are listed but not fully designed.
- Rationale: vertical slice is 1580; Act VI begins 1583. Don't design past scope.

**Decision 3: Portal** is 4 static HTML pages (index, biography, sources, projects).
- Rejected: JavaScript-rendered portal with full timeline viewer. The DeeVN projects already have a companion site at JohnDeeSummaries; this portal's job is to link games and document the research, not duplicate the scholarly content.

**Decision 4: GitHub Actions** builds Vite app + copies `portal/` into `dist/portal/`.
- Base path set via `VITE_BASE_URL=/FTLDee/` env var in CI.
- Local dev still uses `base: '/'` (env var unset).
- `.nojekyll` added so Jekyll doesn't swallow vendor/underscore files.

**Decision 5: PROMPT log format** (this file) documents: what was asked, how it was interpreted, sources accessed, key findings, decisions made, what was rejected and why, output produced.
- Future prompts increment to PROMPT2METHODSANDRESULTS.md etc.
- Logs live in `research/logs/`.
- The log captures thinking that won't be in the code — rejections, interpretive choices, scope decisions.

---

## What was rejected and why

| Rejected | Reason |
|---|---|
| Querying DeeChunks DB for all 29 timeline events | timeline.json already contains these in clean form; querying would duplicate. |
| Re-reading source PDFs | DeeChunks working rule: use chunks + SQLite. |
| Full timeline visualisation in portal | JohnDeeSummaries site already does this; duplication. |
| Ottoman encounters in the vertical slice build | Out of scope; vertical slice ends at career_transition. Document candidates only. |
| Fabricating the 1604–05 petition scene | Source is thin (7 hits); BIOGRAPHY.md explicitly flags this as highest-priority gap to verify before writing. Not invented. |
| Adding the Kelley dual-class tree | Explicitly prohibited in CLAUDE.md: "schema only" in vertical slice. |

---

## Output Produced

| File | What it is |
|---|---|
| `research/DEE_MASTER_BIOGRAPHY.md` | Acts I–VIII, grounding tags, encounter use annotations, cast reference, source gaps |
| `research/ENCOUNTER_CANDIDATES.md` | 9 fully designed encounter candidates + Phase 3 list; choice architecture, blue option requirements, historicalStatus |
| `research/OTTOMAN_CONNECTION.md` | M-K 2021 framing, Murad III, Soyga thread, TurkaGame cross-refs, encounter design rules |
| `research/logs/PROMPT1METHODSANDRESULTS.md` | This file |
| `portal/index.html` | Landing page: game link, career at a glance, features, related projects |
| `portal/biography.html` | Timeline of Acts I–VIII with grounding tags and source citations |
| `portal/sources.html` | Scholarship table, corpus stats, companion resources |
| `portal/projects.html` | All Dee projects: FTLDee, Imperial Magus, Spoken Backward, TurkaGame, TurkaVita, research sites |
| `portal/style.css` | Shared parchment aesthetic |
| `.github/workflows/deploy.yml` | GitHub Actions: npm build + copy portal + Pages deploy |
| `vite.config.ts` | Added `base: process.env.VITE_BASE_URL ?? '/'` for Pages path |

---

## What the next session should do

1. **Push to GitHub** once the repo `t3dy/FTLDee` is created and the remote is set.
2. **Enable GitHub Pages** in the repo settings (source: GitHub Actions).
3. **Verify the live URL** at `https://t3dy.github.io/FTLDee/` — game at root, portal at `/portal/`.
4. **Add Encounter Candidates #7–9** to `src/data/encounters/index.ts` — Barnabas Saul, Kelley's entry, Book of Soyga.
5. **Add `ottoman_thread_open` flag** to the career_transition encounter's Ottoman blue option.
6. **Update CLAUDE.md** in FTLDee with corpus paths and research query patterns.
