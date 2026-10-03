import type { SkillCard, SkillId } from '../../core/types.js';

export const SKILL_CARDS: SkillCard[] = [
  { id: 'mathematics', name: 'Mathematics', branch: 'mathematical', rooms: ['study'], historicalStatus: 'documented', glyph: 'compass',
    summary: 'The gate skill. Euclid and the Louvain years: mathematics as a technology of service.', sources: ['Parry 35–48', 'Sherman'] },
  { id: 'astronomy', name: 'Astronomy', branch: 'mathematical', rooms: ['instrumentRoom'], historicalStatus: 'documented', glyph: 'star',
    summary: 'Observation and calculation of the heavens; the base of astrology and navigation.', sources: ['Whitby 32–36'] },
  { id: 'astrology', name: 'Astrology', branch: 'mathematical', rooms: [], historicalStatus: 'documented', glyph: 'star',
    summary: 'Elections, nativities and comets: the service the court actually asked for.', sources: ['Parry 48–58'] },
  { id: 'cartography', name: 'Cartography', branch: 'mathematical', rooms: ['instrumentRoom'], historicalStatus: 'documented', glyph: 'map',
    summary: 'Maps as arguments: the imperial geography of the Limites.', sources: ['DEE_MASTER_BIOGRAPHY Act IV'] },
  { id: 'navigation', name: 'Navigation', branch: 'mathematical', rooms: ['instrumentRoom'], historicalStatus: 'documented', glyph: 'ship',
    summary: 'Advice to the voyagers; the instruments make it credible.', sources: ['DEE_MASTER_BIOGRAPHY Act IV'] },
  { id: 'rhetoric', name: 'Rhetoric', branch: 'political', rooms: ['study'], historicalStatus: 'plausible', glyph: 'quill',
    summary: 'The gate skill of the court: presenting an answer so it can be used.', sources: [] },
  { id: 'courtlyIntelligence', name: 'Courtly Intelligence', branch: 'political', rooms: ['correspondence'], historicalStatus: 'plausible', glyph: 'eye',
    summary: 'Knowing who is connected to whom, and when the weather is turning.', sources: ['Parry'] },
  { id: 'cryptography', name: 'Cryptography', branch: 'political', rooms: ['scriptorium'], historicalStatus: 'documented', glyph: 'key',
    summary: 'Trithemian cipher, useful to Walsingham and dangerous to own.', sources: ['Clucas, Ambix 64.2'] },
  { id: 'languages', name: 'Languages', branch: 'political', rooms: ['scriptorium', 'correspondence'], historicalStatus: 'documented', glyph: 'letter',
    summary: 'Latin, Greek, Hebrew and the vernaculars of the courts Dee hoped to serve.', sources: [] },
  { id: 'naturalPhilosophy', name: 'Natural Philosophy', branch: 'occult', rooms: ['library'], historicalStatus: 'documented', glyph: 'tree',
    summary: 'The gate skill of the occult branch: rays, virtues and the Propaedeumata.', sources: ['Clulee', 'Harkness 98–102'] },
  { id: 'alchemy', name: 'Alchemy', branch: 'occult', rooms: ['laboratory'], historicalStatus: 'documented', glyph: 'flask',
    summary: 'The art continental patrons paid for; Kelley\'s route to Rudolf\'s favour.', sources: ['Clulee, Ambix 52.3'] },
  { id: 'occultPhilosophy', name: 'Occult Philosophy', branch: 'occult', rooms: ['scryingChamber'], historicalStatus: 'documented', glyph: 'eye',
    summary: 'Agrippa\'s correspondences, and from 1581 the actions with spirits.', sources: ['Harkness', 'Whitby'] },
  { id: 'kabbalah', name: 'Kabbalah', branch: 'occult', rooms: ['scryingChamber'], historicalStatus: 'documented', glyph: 'tree',
    summary: 'Letters and numbers as the structure of creation. Gates the reading of the Soyga tables.', sources: ['Szőnyi', 'M-K 2021'] },
  { id: 'theology', name: 'Theology', branch: 'occult', rooms: [], historicalStatus: 'documented', glyph: 'cross',
    summary: 'The eschatological frame of the angelic project.', sources: ['Harkness'] },
  { id: 'manuscriptKnowledge', name: 'Manuscript Knowledge', branch: 'cross', rooms: ['library'], historicalStatus: 'documented', glyph: 'scroll',
    summary: 'Finding, reading and judging manuscripts; the collector\'s skill.', sources: ['Håkansson 12–14', 'Parry 58–61'] },
  { id: 'medicine', name: 'Medicine', branch: 'cross', rooms: ['laboratory'], historicalStatus: 'documented', glyph: 'flask',
    summary: 'Paracelsian remedies and consultations on the Queen\'s health.', sources: ['Fell Smith 33–34'] },
];

export function skillName(id: SkillId | string): string {
  return SKILL_CARDS.find(s => s.id === id)?.name ?? id;
}
