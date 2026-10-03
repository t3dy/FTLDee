// Contract between the game code and the copy module (src/data/copy/index.ts).
// Tokens in text are replaced at runtime: {room} {level} {book} {price} {crew}
// {place} {days} {fortune} {house} {skill} {faction}.

import type { Screen } from '../../core/types.js';

export type BarkTrigger =
  | 'room_upgraded'
  | 'room_unmanned'
  | 'crew_assigned'
  | 'crew_retinue'
  | 'book_bought'
  | 'book_sold'
  | 'book_unaffordable'
  | 'book_prereq_missing'
  | 'forbidden_book_bought'
  | 'satchel_full'
  | 'satchel_packed'
  | 'book_left_at_base'
  | 'errand_sent'
  | 'errand_success'
  | 'errand_failure'
  | 'travel_depart'
  | 'arrive_base'
  | 'fortune_rise'
  | 'fortune_fall'
  | 'house_upgraded'
  | 'secrecy_low'
  | 'money_low'
  | 'focus_low'
  | 'overcrowded'
  | 'weather_event'
  | 'blue_option_taken'
  | 'sector_change';

// speaker: a crew id ('jane_dee', 'roger_cooke', 'barnabas_saul', 'edward_kelley'),
// 'dee', 'steward' (anonymous household servant), 'bookseller' (anonymous),
// or 'narrator'. Real historical people speak only in REPORTED speech
// (no quotation marks); anonymous characters and the narrator may be direct.
export interface Bark {
  speaker: string;
  trigger: BarkTrigger;
  text: string;
}

export interface TutorialTip {
  id: string;
  screen: Screen;
  title: string;
  body: string;
}

export type FortuneId = 'destitute' | 'straitened' | 'comfortable' | 'favoured' | 'endowed';

export interface FortuneCopy {
  id: FortuneId;
  label: string;
  riseText: string;   // shown when Dee climbs INTO this tier
  fallText: string;   // shown when Dee falls INTO this tier
}

export interface HouseTierCopy {
  tierId: string;     // matches HOUSE_TIERS ids in src/data/cards/house.ts
  upgradeText: string;
}

export interface CopyModule {
  barks: Bark[];
  tips: TutorialTip[];
  fortunes: FortuneCopy[];
  houseTiers: HouseTierCopy[];
  interfaceHelp: Record<string, string>;  // key: UI element id (see docs/writing/INTERFACE_HELP.md)
}
