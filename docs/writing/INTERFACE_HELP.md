# Interface help

Hover and long-press help for the UI. Shipped as `COPY.interfaceHelp` in
`src/data/copy/index.ts`, keyed by the element ids below. The UI should attach each text
to the element with the matching `data-help` id (or `id`) and show it on hover after
400 ms, on focus for keyboard users, and on long-press on touch.

## Rules for help text

- Say what the thing is, then what it does, then (if needed) one consequence.
- Use the game's numbers. "The Study restores 1, 2 or 3 a day" is help; "the Study helps
  you recover" is not.
- No history in help text. History goes on cards and in the Codex.
- Under 45 words.

## Placement

| Group | Ids | Where |
|---|---|---|
| HUD | `hud-money` `hud-days` `hud-secrecy` `hud-focus` `hud-pressure` `hud-fortune` | the resource bar at the top of every screen |
| Navigation | `nav-household` `nav-upgrades` `nav-library` `nav-map` `nav-market` `nav-codex` | the tab row |
| Household | `room-card` `room-pips` `room-station` `crew-token` `crew-retinue` | the house plan |
| Library | `satchel-slots` | the satchel strip |
| Market | `market-book-card` `market-instrument-card` `market-sell` | the market screen |
| Map | `map-node` `map-weather-track` `map-errand` | the map |
| Encounter | `encounter-blue-option` `encounter-locked` | the choice list |
| Codex | `codex-filter` | the filter bar |
| Upgrades | `house-tier-panel` | the house panel |

## The texts

Generated from `src/data/copy/index.ts` on 2026-10-03. Edit both together.

| UI id | Help text |
|---|---|
| `hud-money` | Money, in pounds. Spent on books, instruments, building and errands. A quarter of it, up to £200, counts towards fortune. |
| `hud-days` | Days left in this sector. Travel, building, errands and long work all spend days. In England the Continental Question comes on day 150; the Road East runs 120 days; in Prague the nuncio's summons comes on day 95. |
| `hud-secrecy` | Secrecy: how much of the household's business stays inside the house. Forbidden books and the actions with spirits spend it. Low Secrecy draws attention. At 0 Dee is summoned for examination and the career ends. |
| `hud-focus` | Focus: Dee's working energy. Long research and scrying spend it. The Study restores 1, 2 or 3 a day while he is at home. |
| `hud-pressure` | Political pressure. It rises a little every day, and each change in the political weather pushes it further. Watch the weather track on the map. |
| `hud-fortune` | Fortune: a quarter of your money (up to £200), an eighth of your three best faction standings, and something for rewards you have been promised. Ranks: Destitute, Straitened, Comfortable, Favoured, Endowed. Enlarging the house needs a rank. |
| `nav-household` | The household: the plan of the house, its rooms and who is working in them. |
| `nav-upgrades` | Upgrades: build rooms to higher levels, and enlarge the house when fortune allows. |
| `nav-library` | The library: every book Dee owns, and the travelling satchel. Pack here, at home. |
| `nav-map` | The map: travel, errands and the political weather track. |
| `nav-market` | The market: buy and sell books and instruments. Only open when Dee is in a market town. |
| `nav-codex` | The Codex: every card in the game, with its status and its sources. |
| `room-card` | A room. Its level, its key skills, who is posted there, and what the next level costs and gives. |
| `room-pips` | The room's level, 0 to 3. Level 2 gives +1 to the room's key skills at home; level 3 gives +2. |
| `room-station` | A working place in the room. A person posted here with 4 or more in one of the room's key skills mans it: +1 more for Dee at home. |
| `crew-token` | A member of the household. Click them, then click a room to post them there, or choose Retinue to take them on the road. The badge shows where they are. |
| `crew-retinue` | The retinue travels with Dee. When an encounter asks for a skill, the best of Dee's and his retinue's counts. |
| `satchel-slots` | The travelling satchel. Away from home, only these books count. Pocket and portable books take 1 slot, large books 2. The travelling chest adds 2 slots. |
| `market-book-card` | A book for sale: its price, its size, what it needs, what it gives, and whether it is forbidden. Forbidden books cost Secrecy as well as money. |
| `market-instrument-card` | An instrument for sale. It adds to a skill. The card says whether it works only at home and whether it can travel if the household leaves England. |
| `market-sell` | Sell a book for half its value, or its full value with a level-3 Library. Its knowledge goes with it. |
| `map-node` | A place. The line from where Dee stands shows the days and the cost of getting there. Greyed places need standing with a faction. |
| `map-weather-track` | The political weather. Each marker is an event on a fixed day. When the line reaches it, it happens. |
| `map-errand` | An errand. Send someone from the house: they travel there and back and do the work, then roll a d10 plus their skill against the difficulty. |
| `encounter-blue-option` | A blue choice, opened by something you have: a book, a skill, a room, an instrument, a person, or an earlier decision. The label says which. |
| `encounter-locked` | A locked choice. It shows what it needs and what you are missing, including books you own but left at home. |
| `codex-filter` | Filter the cards by kind (room, book, instrument, crew, place, errand, faction, skill, weather) or by status (documented, plausible, contested, counterfactual). |
| `house-tier-panel` | The house itself. The next tier shows its fortune rank, its price, its days, and what it changes: the room ceiling, extra working places, and for the royal foundation a stipend. |
