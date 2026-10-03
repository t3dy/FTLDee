import type { GameState, Encounter, EncounterChoice } from '../core/types.js';
import { el, historicalBadge } from './render.js';
import { meetsRequirements, availableBookIds } from '../core/state.js';

type ChoiceCallback = (choiceId: string) => void;

export function renderEncounter(
  state: GameState,
  encounter: Encounter,
  onChoice: ChoiceCallback
): HTMLElement {
  const container = el('div', { class: 'encounter-screen' });

  // Header
  const header = el('div', { class: 'encounter-header' });
  header.appendChild(historicalBadge(encounter.historicalStatus));
  header.appendChild(el('h1', { class: 'encounter-title' }, encounter.title));
  if (encounter.participants.length > 0) {
    header.appendChild(el('p', { class: 'encounter-participants' },
      `Participants: ${encounter.participants.map(formatParticipant).join(', ')}`));
  }
  container.appendChild(header);

  // Description
  const descSection = el('div', { class: 'encounter-description' });
  for (const para of encounter.description.split('\n\n')) {
    if (para.trim()) descSection.appendChild(el('p', {}, para.trim()));
  }
  if (encounter.flavorText) {
    descSection.appendChild(el('blockquote', { class: 'encounter-flavor' }, encounter.flavorText));
  }
  container.appendChild(descSection);

  // Choices
  const choicesSection = el('div', { class: 'encounter-choices' });
  choicesSection.appendChild(el('h2', {}, 'Your Response'));

  for (const choice of encounter.choices) {
    choicesSection.appendChild(renderChoice(state, choice, encounter, onChoice));
  }

  container.appendChild(choicesSection);

  // Context panel
  container.appendChild(renderContextPanel(state));

  return container;
}

function renderChoice(
  state: GameState,
  choice: EncounterChoice,
  _encounter: Encounter,
  onChoice: ChoiceCallback
): HTMLElement {
  const qualified = choice.requirements ? meetsRequirements(state, choice.requirements) : true;
  const isBlue = choice.isBlueOption;

  const card = el('div', {
    class: `choice-card ${isBlue ? 'choice-card--blue' : ''} ${qualified ? '' : 'choice-card--locked'}`,
  });

  // Blue option header
  if (isBlue && choice.blueLabel) {
    const blueHeader = el('div', { class: 'blue-option-header' });
    blueHeader.appendChild(el('span', { class: 'blue-indicator' }, '◆'));
    blueHeader.appendChild(el('span', { class: 'blue-label' }, choice.blueLabel));
    if (!qualified) {
      blueHeader.appendChild(el('span', { class: 'blue-locked' }, 'UNAVAILABLE'));
    }
    card.appendChild(blueHeader);
  }

  // Choice text
  card.appendChild(el('p', { class: 'choice-text' }, choice.text));

  // Requirements summary
  if (choice.requirements) {
    const reqDiv = el('div', { class: 'choice-requirements' });
    if (choice.requirements.skills) {
      for (const [skill, minVal] of Object.entries(choice.requirements.skills)) {
        const has = state.protagonist.abilities[skill as keyof typeof state.protagonist.abilities] ?? 0;
        reqDiv.appendChild(el('span', { class: has >= minVal ? 'req-met' : 'req-unmet' },
          `${formatSkill(skill)} ${has}/${minVal}`));
      }
    }
    if (choice.requirements.books) {
      const usableIds = availableBookIds(state);
      for (const bookId of choice.requirements.books) {
        const has = usableIds.has(bookId);
        reqDiv.appendChild(el('span', { class: has ? 'req-met' : 'req-unmet' },
          `Book: ${formatBookId(bookId)}`));
      }
    }
    if (choice.requirements.minFaction) {
      for (const [fid, minVal] of Object.entries(choice.requirements.minFaction)) {
        const has = state.factions[fid as keyof typeof state.factions] ?? 0;
        reqDiv.appendChild(el('span', { class: has >= minVal ? 'req-met' : 'req-unmet' },
          `${formatFaction(fid)}: ${has}/${minVal}`));
      }
    }
    if (choice.requirements.flags) {
      for (const flag of choice.requirements.flags) {
        const has = state.flags.includes(flag);
        reqDiv.appendChild(el('span', { class: has ? 'req-met' : 'req-unmet' },
          `Event: ${formatFlag(flag)}`));
      }
    }
    if (reqDiv.children.length > 0) {
      card.appendChild(reqDiv);
    }
  }

  // Cost display
  if (choice.costs && Object.keys(choice.costs).length > 0) {
    const costDiv = el('div', { class: 'choice-costs' });
    if (choice.costs.time) costDiv.appendChild(el('span', { class: 'cost' }, `${choice.costs.time} days`));
    if (choice.costs.money) costDiv.appendChild(el('span', { class: 'cost' }, `£${choice.costs.money}`));
    if (choice.costs.focus) costDiv.appendChild(el('span', { class: 'cost' }, `Focus −${choice.costs.focus}`));
    card.appendChild(costDiv);
  }

  // Choose button
  if (qualified) {
    const btn = el('button', { class: 'btn btn--choice', type: 'button' }, 'Choose this response');
    btn.addEventListener('click', () => onChoice(choice.id));
    card.appendChild(btn);
  } else {
    card.appendChild(el('p', { class: 'choice-unavailable' }, 'Your current repertoire does not support this response.'));
  }

  return card;
}

function renderContextPanel(state: GameState): HTMLElement {
  const panel = el('div', { class: 'encounter-context' });
  panel.appendChild(el('h3', {}, 'Current Repertoire'));

  // Show relevant quick stats
  const statsDiv = el('div', { class: 'context-stats' });
  const r = state.resources;
  statsDiv.appendChild(el('span', {}, `£${r.money}`));
  statsDiv.appendChild(el('span', {}, `${r.time} days`));
  statsDiv.appendChild(el('span', {}, `Secrecy: ${r.secrecy}`));
  panel.appendChild(statsDiv);

  // Books available
  if (state.library.length > 0) {
    const booksDiv = el('div', { class: 'context-books' });
    booksDiv.appendChild(el('strong', {}, 'Library: '));
    state.library.forEach(b => {
      booksDiv.appendChild(el('span', { class: 'context-book' }, b.title));
    });
    panel.appendChild(booksDiv);
  }

  return panel;
}

// --- Formatters --------------------------------------------------------------

function formatParticipant(id: string): string {
  const labels: Record<string, string> = {
    elizabeth: 'Elizabeth I',
    walsingham: 'Sir Francis Walsingham',
    jane_dee: 'Jane Dee',
    roger_cooke: 'Roger Cooke',
    philip_sidney: 'Sir Philip Sidney',
    leicester_agent: 'Leicester\'s associate',
    laski: 'Albert Łaski',
  };
  return labels[id] ?? id;
}

function formatSkill(id: string): string {
  const labels: Record<string, string> = {
    mathematics: 'Mathematics',
    astronomy: 'Astronomy',
    astrology: 'Astrology',
    naturalPhilosophy: 'Natural Philosophy',
    occultPhilosophy: 'Occult Philosophy',
    rhetoric: 'Rhetoric',
    cryptography: 'Cryptography',
    courtlyIntelligence: 'Courtly Intelligence',
    languages: 'Languages',
    cartography: 'Cartography',
    navigation: 'Navigation',
    manuscriptKnowledge: 'Manuscript Knowledge',
  };
  return labels[id] ?? id;
}

function formatBookId(id: string): string {
  const labels: Record<string, string> = {
    euclid_elements: 'Euclid\'s Elements',
    ptolemy_almagest: 'Ptolemy\'s Almagest',
    agrippa_occulta: 'De occulta philosophia',
    trithemius_steganographia: 'Steganographia',
    dee_mathematical_preface: 'Mathematical Preface',
    dee_monas: 'Monas Hieroglyphica',
    paracelsus_selected: 'Paracelsus (selected)',
    copernicus_revolutionibus: 'De revolutionibus',
    book_soyga: 'Book of Soyga',
    john_field_ephemeris: 'Ephemeris',
  };
  return labels[id] ?? id;
}

function formatFaction(id: string): string {
  const labels: Record<string, string> = {
    elizabeth: 'Elizabeth',
    burghley: 'Burghley',
    leicester: 'Leicester',
    walsingham: 'Walsingham',
    religiousAuth: 'Religious Auth.',
    scholarNetwork: 'Scholars',
    continentalCourts: 'Continental',
  };
  return labels[id] ?? id;
}

function formatFlag(flag: string): string {
  const labels: Record<string, string> = {
    laski_arrival: 'Laski has arrived',
    protestant_hermetic_contact: 'Protestant Hermetic network',
    comet_astrological_report: 'Windsor comet report',
  };
  return labels[flag] ?? flag.replace(/_/g, ' ');
}
