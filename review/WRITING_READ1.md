# Independent read 1: docs/writing (historical claims only)

Reader: independent VERIFIER (did not write these files). Date 2026-10-03. Standard:
`C:\Dev\AUDIOBOOKMAKERSCHOLARLY\docs\INDEPENDENT_READ.md`. Scope: historical claims, statuses,
cites and quotations in `docs/writing/EXPOSITION.md` and `docs/writing/GAMEPLAYEXAMPLES.md`, plus
any invented direct speech given to a real person. Game mechanics were not reviewed. No document
was edited.

## The systematic error: DeeChunks page numbers cited as book pages

Both files cite Parry, Harkness and Whitby by the **page ranges stored in the DeeChunks database**
(`chunks.pages`). For these books the database stores **PDF pages**, not printed pages:

- Parry: printed = PDF − 21. The Charles Bridge walk to the audience is DB [202–204], printed
  **182**. The Kunstkammer is DB [223–226], printed **203**. The departure of 21 Sept 1583 is printed
  **171**.
- Harkness: printed = PDF − 15. The 3 Sept 1584 audience ("he rebuked the emperor for his sins") is
  DB [68–70], printed **55**. The 27 March 1586 nuncio audience is printed **57**. Pucci, 6 Aug 1585,
  is printed **58**. The furnace-burning of the angelic books is printed **186** n.
- Whitby: DB pages do not match the printed folios either (DB p. 182 carries printed "159").

A reader who opens the book at the cited page will not find the claim. DEEALCHEMYLABORS.md
discloses its Whitby numbering ("pages as in the DB"); these two files do not. Fix: convert to
printed pages (offsets above), or label every such cite "DeeChunks p.". Each wrong cite is counted
below.

---

## 1. docs/writing/EXPOSITION.md

**SERIOUS**

1. `EXPOSITION.md:69` "Dee left with Łaski in September 1583 (Parry 183–200)". Parry printed
   183–200 covers 1584–87. The departure ("On 21 September in a carefully planned flit") is
   printed 171 (DB 191–192). Fix: "Parry 170–171".
2. `EXPOSITION.md:102` "Dee walked that way to his audience (Parry 202–204)". Printed 202–204 is
   Třeboň in 1588. The walk is printed 182. Fix: "Parry 182".
3. `EXPOSITION.md:121` "(Harkness 68–70; ...)" for the audience. Printed 68–70 is about the Flood
   and the great conjunction. The audience is Harkness 55. Fix: "Harkness 55".
4. `EXPOSITION.md:28` "Parry 35–58" for the opening paragraph. These are DB/PDF pages (printed
   14–37). Fix: re-derive the printed range for each claim.
5. `EXPOSITION.md:84-85` "Kraków comes first, with Łaski's debts and new tables from the angels
   (Harkness 199–213)". Neither printed 199–213 nor PDF 199–213 (printed 184–198) is about Kraków.
   Both are chapter 6, on Adam's alchemy and the medicine of God. Whitby DB 45 has the Kraków
   arrival (13 March 1584) and Łaski's mortgage. Fix: cite that, or Harkness 26 (the itinerary).
6. `EXPOSITION.md:165-167` "in April 1587, the 'communion of wives' ... (Parry 200–215)". The
   cross-matching is Parry printed 198 (DB 219), so it falls outside the cited range in both
   numberings. Fix: "Parry 198–199".
7. `EXPOSITION.md:18-20` "the largest private library in England, close to four thousand items, a
   quarter of them manuscripts". Håkansson 12–14 (DB) says "more than four thousand volumes" and
   "more than seven hundred manuscripts" (about one in six, not a quarter). His n. 15 gives the 1583
   catalogue as 2,292 printed works and 199 manuscripts. Fix: "more than four thousand volumes,
   over seven hundred of them manuscripts (Håkansson)". The quotation "hardly gotten moniments" is
   verbatim there.
8. `EXPOSITION.md:95-96` and `:257` "Tadeáš Hájek, the Emperor's physician", with status
   **documented**. Rampling, EF 292 n. 31 (after Purš): describing Hájek as personal physician to
   the emperors is an error: "In fact he provided medical care to some of the servants at court."
   Parry 180 says personal physician, and Clulee 2005 201 says "alchemical adviser". Whitby DB
   45–46, cited here, says only "a Dr. Haged". The project's own `ALCHEMY_ASSET_CARDS.md` §8 flags
   this. Contested made fact. Fix: "Tadeáš Hájek, a physician and alchemist at Rudolf's court",
   with the dispute noted in data.
9. `EXPOSITION.md:189-191` the Melvin-Koushki quotation "Ibn Turka is best approached as a Timurid
   Dr. Dee — or Dee best approached as an Elizabethan Dr. Littleturk" (Melvin-Koushki 2021, no
   page). It was not found in any of the 3,573 cached PDF texts. The one Melvin-Koushki text on disk
   using "Dr. Littleturk" ("Prologue to Pythagorean Renaissance: Ibn Turka's Investigations")
   does not contain this sentence. It reaches this file only through `research/OTTOMAN_CONNECTION.md`
   and `DEE_MASTER_BIOGRAPHY.md`, which give no page either. Fix: locate it and give a page, or
   paraphrase without quotation marks until it is found.

10. `EXPOSITION.md:15` "The Queen has asked him to choose a day for her coronation", under
    status **documented**. Parry 49 corrects exactly this: "Dee's biographers usually state that he
    chose Elizabeth's coronation date, but the Council seems to have settled on 15 January even
    before Dee's return to favour". Dee delivered an electionary horoscope "about the day 'appointed
    for her Majesty to be crowned in'". The project's own `research/espionage/MARY_TO_ELIZABETH.md`
    §4 flags it. Found during the espionage read and added here. Fix: "to cast a horoscope for her
    coronation day".

**EDITS**

1. `EXPOSITION.md:121-122` "Rudolf deferred, and named Dr Curtius as the man to deal with from now
   on". Whitby DB 46: Rudolf deferred at the audience, then named Curtius by letter on 12 September.
   Fix: "and on 12 September named ...".
2. `EXPOSITION.md:182-189` Murad III ("himself a Sufi initiate, devoted to dream interpretation,
   astrology and talismans") and the Bunian–Bistamian claim about the *Book of Soyga* carry no work
   or page. Fix: cite the scholarship and pages.
3. Whitby, Håkansson, Sherman and Szőnyi cites throughout (`:28, 96-97, 229, 236, 244, 248, 252,
   258, 280, 283`) are DeeChunks page ranges. Label them as such, or convert them.

**Checked and correct:** Whitby DB 45–46 (arrival in Prague 9 August 1584; letter of 3 September;
told the Emperor to repent), DB 46–47 (12 January 1585 move near the Old Town market-place), DB
32–36 (Mercator globes, Louvain ring and staff), DB 42–44 (Saul); Harkness 55 ("rebuked the
emperor for his sins"); Parry 171–172 (no mob; associates and creditors took the books, which
supports "plundered by people he knew"), 180 (Hájek's study as an alchemical room), 182; Håkansson
"hardly gotten moniments". Not verified: Szőnyi 279, Sherman 81–85, the 1592 commissioners, the
1595 wardenship date, the 1608/09 death and lost register, Katherine Dee keeping the house.

SERIOUS: 10 (EXPOSITION.md)

---

## 2. docs/writing/GAMEPLAYEXAMPLES.md

**SERIOUS** (all are the page-number error above. The facts are right, the pages are not.)

1. `GAMEPLAYEXAMPLES.md:363` "Harkness 35–42" (Saul, 1581). These are PDF pages (printed 20–27).
2. `GAMEPLAYEXAMPLES.md:384` "Harkness 35–40" (Talbot, March 1582). Talbot's introduction on
   8 March 1582 is Harkness printed 20.
3. `GAMEPLAYEXAMPLES.md:495` "Harkness 68–70" (audience 3 Sept 1584). The audience is printed 55.
4. `GAMEPLAYEXAMPLES.md:497` "Parry 202–204" (route to the castle). The route is printed 182.
5. `GAMEPLAYEXAMPLES.md:522` "Harkness 72–74" (Pucci, 6 Aug 1585). Pucci is printed 58.
6. `GAMEPLAYEXAMPLES.md:524` "Harkness 199–201" (books in the furnace). The burning is printed 186
   n. (thirty angelic books thrown into a furnace in Prague at the angels' command); printed
   199–201 is about the alchemical egg.
7. `GAMEPLAYEXAMPLES.md:525` "Harkness 70–72" (Malaspina audience 27 March 1586). The audience is
   printed 57.
8. `GAMEPLAYEXAMPLES.md:631` "Parry 223–226 for the collection". Printed 223–226 is 1592 court
   politics. The Kunstkammer is printed 202–203.

**EDITS**

1. `GAMEPLAYEXAMPLES.md:234` "Jane back ... **Failure.** 'Waited three days and was not admitted.'"
   In this context the quotation reads as Jane Dee's own words, which is invented direct speech for
   a real person. The project rule is reported speech only. Fix: render it as narrator text
   ("She waited three days and was not admitted.").
2. Whitby cites (`:363, 485, 495, 519, 636`) are DeeChunks page ranges. Label them as such.

**Invented speech, checked:** the bark lines for Roger Cooke (`:68`), Jane (`:213, 394, 566`) and
Saul (`:390`) are reported speech or narrated action, so they are within the rule. Not counted:
they invent behaviour for real people, and in Run A Roger Cooke is still in the household after
his documented departure (7 Sept 1581, Fenton 15). That is a design question, not a read finding.
The bookseller's quoted lines (`:173, 340, 668`) belong to an unnamed fictional character and are
allowed.

**Dates and claims checked and correct:** Saul scrying 1581 and his recantation (Whitby DB 42–44;
Harkness 20); Talbot, March 1582 (Harkness 20: 8 March 1582); *Soyga*: Uriel deferred to Michael
as "interpreter" (Harkness 44); arrival 9 August 1584 and audience 3 September 1584 (Whitby DB
45–46; Harkness 55); rebuke as the documented choice (Harkness 55); move 12 January 1585 (Whitby
DB 46–47); Pucci 6 August 1585 (Harkness 58); nuncio audience 27 March 1586 (Harkness 57); books
burned at the angels' command (Harkness 186 n., 44); Mercator's globes on the loss list (Whitby DB
67–70, "the paire of Gerardus Mercator his best Globes").

SERIOUS: 8 (GAMEPLAYEXAMPLES.md)

---

## Totals (both files)

SERIOUS: 18
EDITS: 5
