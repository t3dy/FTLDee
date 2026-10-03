# Onboarding — books, the satchel and the market

Tutorial sequence for the Library and Market screens, and the first time a book matters
in an encounter. Boxed text (`>`) is the exact on-screen copy. Step ids match the tip ids
in `src/data/copy/index.ts`.

The idea the player has to leave with: **a book is a tool that only works where it is.**
At home, the whole library works. On the road, only what Dee carried.

---

## Part 1 — The Library screen (first visit)

### Step B1 · `tip-library-shelves` · points at the shelf

> **The library at Mortlake.**
> These are Dee's books. While he is at home, every one of them counts: if an encounter
> asks for the *Almagest*, and the *Almagest* is on the shelf, the option opens.
>
> A book does two things. It can open a choice that needs that book by name, and it can add
> to a skill while it is usable.

*Why it exists.* The library was Dee's working instrument, not a collection. Sherman's
study of his reading shows books annotated for use: for advice to the court, for voyages,
for arguments. In the game a book is a capability, which is how Dee used them.

### Step B2 · `tip-library-satchel` · points at the satchel strip

> **The travelling satchel.**
> When Dee leaves the house, only the books in his satchel go with him. The satchel has
> 3 slots.
>
> A pocket book or a portable book takes 1 slot. A large book takes 2. Some books cannot be
> moved at all.
>
> Drag a book into the satchel to pack it. You can only pack at home.

Waits for: any book packed.

> **Packed.** That book now goes wherever Dee goes. The others stay here and still count
> whenever he comes home.

### Step B3 · `tip-library-full` · first time the satchel refuses a book

> **The satchel will not close.**
> Something has to stay on the shelf. The iron-bound travelling chest, sold at the market,
> adds 2 slots.

### Step B4 · `tip-library-forbidden` · first time a forbidden book is shown

> **Red border: forbidden.**
> Some books were dangerous to own. Buying one costs Secrecy as well as money. Owning it
> costs nothing more; using it in some encounters will.
>
> Controversial books (amber border) are safe to buy but may make some people uneasy.

*Why it exists.* Parry's thesis: Dee's expertise was useful and incriminating at the same
time. The *Steganographia* broke ciphers for the Secretary of State and read, to others,
like a manual for summoning spirits. The game keeps both readings by making the same book
earn money and cost Secrecy.

---

## Part 2 — The first blue option that a book opens

### Step B5 · `tip-encounter-blue` · first encounter with an unlocked blue option

> **Blue choices.**
> A choice in blue is one you can take because of something you have: a book, a skill, a
> room, an instrument, a person, or something you did earlier. The label under it says what
> opened it.

### Step B6 · `tip-encounter-locked` · first encounter with a locked option

> **Grey choices show what is missing.**
> A locked choice tells you exactly what it needs and what you lack. If it says a book is
> *on the shelf at Mortlake*, you own it but did not pack it.

---

## Part 3 — The market (first visit to Paul's Churchyard)

### Step B7 · `tip-market-stock` · points at the stock row

> **Paul's Churchyard.**
> The booksellers of London. When you arrive, the market shows what it has: four books and
> two instruments. The stock changes every 20 days.
>
> Buy at the price on the card.

*Why it exists.* Paul's Churchyard was the centre of the London book trade, with new stock
from the Frankfurt fair. The game lets Dee buy in person or send someone with a purse.
The market is the one place where the library grows by choice rather than by chance.

### Step B8 · `tip-market-sell` · points at the sell tab

> **Selling.**
> You can sell books for half their value. With a level-3 Library you know exactly what
> they are worth, and they sell for the full price.
>
> A book you sell takes its knowledge with it. If another book needed it as a
> prerequisite, that book will lock.

### Step B9 · `tip-market-prereq` · first time a prerequisite-locked book is shown

> **This book needs another first.**
> Some books cannot be read without a grounding in something else. The card shows the
> missing piece. Books on your shelves supply it.

### Step B10 · `tip-market-instruments` · points at the instrument cards

> **Instruments.**
> Instruments add to skills. Some work only at home (the globes do not leave the
> Instrument Room). Some travel. Some cannot leave England at all. The card says which.

---

## Part 4 — Emigration (shown once, at the packing scene)

### Step B11 · `tip-library-emigration` · the packing screen before the Channel crossing

> **Only the satchel crosses the Channel.**
> Everything you leave on the shelves stays at Mortlake. So do instruments that cannot
> travel. You will not be coming back for them in this game.
>
> Choose carefully. The house will be looked after by people Dee trusts.

The last sentence is deliberately plain. The player learns in Prague what happened.

*Why it exists.* Dee left in September 1583 and the library and laboratories were spoiled
in his absence. Håkansson (31–33) and Whitby (52–54) put it on employees and friends, not a
mob, which is what the game's notice says. The losses list from 1583 includes Mercator's
globes (Whitby 67–70). The packing screen is the only point in the game where the player
decides, in advance and by slot count, what the plunder will take.

---

## First-time tips (one line each; shown in the tip strip, not as tutorial steps)

- A book on the shelf at home counts. A book on the shelf when Dee is in Windsor does not.
- Large books take two slots. The *Almagest* and Euclid are large.
- The *Monas* is pocket-sized. It is the book Dee can always carry.
- Selling the *Steganographia* is quick money and closes several doors.
- The market's stock is rolled when you arrive. If you leave and come back before 20 days
  have passed, it is the same stock.
- A forbidden book's Secrecy cost is paid once, when you buy it.
- If an errand buys a book, it buys from that market's current stock.

---

## The book card (fields, and the words used for them)

| Card field | On-screen label | Example |
|---|---|---|
| title, author, date | heading | *Steganographia* · Johannes Trithemius · c. 1499 (MS) |
| portability | **Pocket** / **Portable** / **Large** / **Fixed** | Portable · 1 slot |
| value | **£25** | |
| censorshipStatus | **Open** / **Controversial** / **Forbidden** | Forbidden · buying costs 5 Secrecy |
| prerequisites | **Needs:** | Needs: mathematics |
| skillBonus | **While usable:** | While usable: Cryptography +1 |
| historicalStatus | status chip | documented |
| sources | small type at foot | |
