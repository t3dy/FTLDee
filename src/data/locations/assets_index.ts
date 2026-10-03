/**
 * Location Assets Index
 *
 * Centralized registry of all location buildings, stations, residents, objects,
 * documents, services, reference images, and audio assets.
 */

import type {
  LocationBuilding,
  LocationStation,
  LocationResident,
  LocationObject,
  LocationDocument,
  LocationService,
  ReferenceAsset,
  AudioAsset,
} from '../../core/types.js';

import {
  MORTLAKE_BUILDINGS,
  MORTLAKE_STATIONS,
  MORTLAKE_RESIDENTS,
  MORTLAKE_OBJECTS,
  MORTLAKE_DOCUMENTS,
  MORTLAKE_SERVICES,
  MORTLAKE_REFERENCE_ASSETS,
  MORTLAKE_AUDIO_ASSETS,
  LONDON_BUILDINGS,
  LONDON_STATIONS,
  LONDON_RESIDENTS,
  LONDON_OBJECTS,
  LONDON_SERVICES,
  LONDON_REFERENCE_ASSETS,
  LONDON_AUDIO_ASSETS,
  GREENWICH_BUILDINGS,
  GREENWICH_STATIONS,
  GREENWICH_RESIDENTS,
  GREENWICH_SERVICES,
  GREENWICH_REFERENCE_ASSETS,
  GREENWICH_AUDIO_ASSETS,
  WINDSOR_BUILDINGS,
  WINDSOR_STATIONS,
  WINDSOR_RESIDENTS,
  WINDSOR_OBJECTS,
  WINDSOR_REFERENCE_ASSETS,
  WINDSOR_AUDIO_ASSETS,
  BARN_ELMS_BUILDINGS,
  BARN_ELMS_STATIONS,
  BARN_ELMS_RESIDENTS,
  BARN_ELMS_DOCUMENTS,
  BARN_ELMS_SERVICES,
} from './assets.js';

// ============================================================================
// Asset Registry - Query interface for locations
// ============================================================================

export interface LocationAssetRegistry {
  locationId: string;
  buildings: LocationBuilding[];
  stations: LocationStation[];
  residents: LocationResident[];
  objects: LocationObject[];
  documents: LocationDocument[];
  services: LocationService[];
  referenceAssets: ReferenceAsset[];
  audioAssets: AudioAsset[];
}

export const ALL_LOCATION_ASSETS: Record<string, LocationAssetRegistry> = {
  mortlake: {
    locationId: 'mortlake',
    buildings: MORTLAKE_BUILDINGS,
    stations: MORTLAKE_STATIONS,
    residents: MORTLAKE_RESIDENTS,
    objects: MORTLAKE_OBJECTS,
    documents: MORTLAKE_DOCUMENTS,
    services: MORTLAKE_SERVICES,
    referenceAssets: MORTLAKE_REFERENCE_ASSETS,
    audioAssets: MORTLAKE_AUDIO_ASSETS,
  },
  london: {
    locationId: 'london',
    buildings: LONDON_BUILDINGS,
    stations: LONDON_STATIONS,
    residents: LONDON_RESIDENTS,
    objects: LONDON_OBJECTS,
    documents: [],
    services: LONDON_SERVICES,
    referenceAssets: LONDON_REFERENCE_ASSETS,
    audioAssets: LONDON_AUDIO_ASSETS,
  },
  greenwich: {
    locationId: 'greenwich',
    buildings: GREENWICH_BUILDINGS,
    stations: GREENWICH_STATIONS,
    residents: GREENWICH_RESIDENTS,
    objects: [],
    documents: [],
    services: GREENWICH_SERVICES,
    referenceAssets: GREENWICH_REFERENCE_ASSETS,
    audioAssets: GREENWICH_AUDIO_ASSETS,
  },
  windsor: {
    locationId: 'windsor',
    buildings: WINDSOR_BUILDINGS,
    stations: WINDSOR_STATIONS,
    residents: WINDSOR_RESIDENTS,
    objects: WINDSOR_OBJECTS,
    documents: [],
    services: [],
    referenceAssets: WINDSOR_REFERENCE_ASSETS,
    audioAssets: WINDSOR_AUDIO_ASSETS,
  },
  barn_elms: {
    locationId: 'barn_elms',
    buildings: BARN_ELMS_BUILDINGS,
    stations: BARN_ELMS_STATIONS,
    residents: BARN_ELMS_RESIDENTS,
    objects: [],
    documents: BARN_ELMS_DOCUMENTS,
    services: BARN_ELMS_SERVICES,
    referenceAssets: [],
    audioAssets: [],
  },
  // TODO: prague, constantinople, samarkand_observatory, samarkand_city, yazd, isfahan, cairo
};

// ============================================================================
// Query functions for location assets
// ============================================================================

export function getLocationAssets(locationId: string): LocationAssetRegistry | null {
  return ALL_LOCATION_ASSETS[locationId] ?? null;
}

export function getStations(locationId: string): LocationStation[] {
  return getLocationAssets(locationId)?.stations ?? [];
}

export function getBuildings(locationId: string): LocationBuilding[] {
  return getLocationAssets(locationId)?.buildings ?? [];
}

export function getResidents(locationId: string): LocationResident[] {
  return getLocationAssets(locationId)?.residents ?? [];
}

export function getObjects(locationId: string): LocationObject[] {
  return getLocationAssets(locationId)?.objects ?? [];
}

export function getServices(locationId: string): LocationService[] {
  return getLocationAssets(locationId)?.services ?? [];
}

export function getStationById(locationId: string, stationId: string): LocationStation | null {
  const stations = getStations(locationId);
  return stations.find(s => s.id === stationId) ?? null;
}

export function getBuildingById(locationId: string, buildingId: string): LocationBuilding | null {
  const buildings = getBuildings(locationId);
  return buildings.find(b => b.id === buildingId) ?? null;
}
