// =============================================================================
// FTLDee — Biography Database Index and Query Functions
// =============================================================================

import { ALL_BIOGRAPHICAL_ENTRIES } from './entries.js';
import type {
  AnyBiographicalEntry,
  BiographicalTheme,
  BiographicalEntryType,
  BiographicalPerson,
  BiographicalEvent,
  BiographicalDocument,
} from './types.js';

export * from './types.js';
export * from './entries.js';

// =============================================================================
// Query Functions
// =============================================================================

/**
 * Get all biographical entries by theme.
 * Example: getBiographyByTheme('relationships') returns all people, events,
 * and documents tagged with the relationships theme.
 */
export function getBiographyByTheme(theme: BiographicalTheme): AnyBiographicalEntry[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter(
    (entry) =>
      entry.themes.includes(theme) ||
      entry.connectedThemes?.includes(theme),
  );
}

/**
 * Get all biographical entries by type.
 * Example: getBiographyByType('person') returns all people.
 */
export function getBiographyByType(type: BiographicalEntryType): AnyBiographicalEntry[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter((entry) => entry.type === type);
}

/**
 * Get entries by multiple themes (union).
 * Example: getBiographyByThemes(['occult_philosophy', 'relationships']) returns
 * entries tagged with either theme.
 */
export function getBiographyByThemes(themes: BiographicalTheme[]): AnyBiographicalEntry[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter((entry) =>
    themes.some(
      (theme) =>
        entry.themes.includes(theme) ||
        entry.connectedThemes?.includes(theme),
    ),
  );
}

/**
 * Get a single entry by ID.
 */
export function getBiographyEntry(id: string): AnyBiographicalEntry | undefined {
  return ALL_BIOGRAPHICAL_ENTRIES.find((entry) => entry.id === id);
}

/**
 * Get all people.
 */
export function getAllPeople(): BiographicalPerson[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter(
    (entry) => entry.type === 'person',
  ) as BiographicalPerson[];
}

/**
 * Get all events.
 */
export function getAllEvents(): BiographicalEvent[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter(
    (entry) => entry.type === 'event',
  ) as BiographicalEvent[];
}

/**
 * Get all documents.
 */
export function getAllDocuments(): BiographicalDocument[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter(
    (entry) => entry.type === 'document',
  ) as BiographicalDocument[];
}

/**
 * Get all entries relevant to a given historiographical theme,
 * with historical status filter.
 * Example: getBiographyContext('occult_philosophy', 'documented')
 * returns all documented entries on occult philosophy.
 */
export function getBiographyContext(
  theme: BiographicalTheme,
  status?: 'documented' | 'plausible' | 'contested' | 'counterfactual',
): AnyBiographicalEntry[] {
  let entries = getBiographyByTheme(theme);
  if (status) {
    entries = entries.filter((entry) => entry.historicalStatus === status);
  }
  return entries;
}

/**
 * Get all entries connected to a given entry (via relatedEntries).
 */
export function getRelatedEntries(entryId: string): AnyBiographicalEntry[] {
  const entry = getBiographyEntry(entryId);
  if (!entry || !entry.relatedEntries) return [];
  return entry.relatedEntries
    .map((id) => getBiographyEntry(id))
    .filter((e): e is AnyBiographicalEntry => e !== undefined);
}

/**
 * Get a person by ID, with type assertion.
 */
export function getPerson(id: string): BiographicalPerson | undefined {
  const entry = getBiographyEntry(id);
  return entry && entry.type === 'person' ? (entry as BiographicalPerson) : undefined;
}

/**
 * Get an event by ID, with type assertion.
 */
export function getEvent(id: string): BiographicalEvent | undefined {
  const entry = getBiographyEntry(id);
  return entry && entry.type === 'event' ? (entry as BiographicalEvent) : undefined;
}

/**
 * Get a document by ID, with type assertion.
 */
export function getDocument(id: string): BiographicalDocument | undefined {
  const entry = getBiographyEntry(id);
  return entry && entry.type === 'document'
    ? (entry as BiographicalDocument)
    : undefined;
}

/**
 * Search by label or description.
 */
export function searchBiography(query: string): AnyBiographicalEntry[] {
  const q = query.toLowerCase();
  return ALL_BIOGRAPHICAL_ENTRIES.filter(
    (entry) =>
      entry.label.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q),
  );
}

/**
 * Get all entries that are connected to an encounter.
 */
export function getBiographyForEncounter(encounterId: string): AnyBiographicalEntry[] {
  return ALL_BIOGRAPHICAL_ENTRIES.filter((entry) => entry.encounterId === encounterId);
}

/**
 * Get a narrative description of a biographical entry suitable for UI display.
 */
export function getBiographyNarrative(entry: AnyBiographicalEntry): {
  label: string;
  description: string;
  sources: string;
  themes: string;
  type: string;
} {
  return {
    label: entry.label,
    description: entry.description,
    sources: entry.sources.join('; '),
    themes: entry.themes.join(', '),
    type: entry.type,
  };
}

/**
 * Group all biographical entries by theme.
 * Returns a map of theme -> entries.
 */
export function groupBiographyByTheme(): Map<BiographicalTheme, AnyBiographicalEntry[]> {
  const themes = new Set<BiographicalTheme>();
  ALL_BIOGRAPHICAL_ENTRIES.forEach((entry) => {
    entry.themes.forEach((theme) => themes.add(theme));
    entry.connectedThemes?.forEach((theme) => themes.add(theme));
  });

  const result = new Map<BiographicalTheme, AnyBiographicalEntry[]>();
  themes.forEach((theme) => {
    result.set(theme, getBiographyByTheme(theme));
  });
  return result;
}

/**
 * Get a summary of all themes in the biography database.
 */
export function getBiographyThemesSummary(): {
  theme: BiographicalTheme;
  count: number;
  entries: string[];
}[] {
  const grouped = groupBiographyByTheme();
  const summary = Array.from(grouped.entries())
    .map(([theme, entries]) => ({
      theme,
      count: entries.length,
      entries: entries.map((e) => e.label),
    }))
    .sort((a, b) => b.count - a.count);
  return summary;
}
