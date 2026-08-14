// Coordonnées approximatives des communes cibles (campagne genevoise + arc lémanique).
export const GEO_FALLBACK = {
  lat: 46.24,
  lng: 6.12,
  byRegion: {
    Hermance: { lat: 46.3011, lng: 6.2461 },
    Anières: { lat: 46.2842, lng: 6.2231 },
    Corsier: { lat: 46.2781, lng: 6.2131 },
    Satigny: { lat: 46.2163, lng: 6.0311 },
    Dardagny: { lat: 46.1961, lng: 6.0001 },
    Russin: { lat: 46.1901, lng: 6.0201 },
    Bernex: { lat: 46.1741, lng: 6.0751 },
    Céligny: { lat: 46.3591, lng: 6.2131 },
    Nyon: { lat: 46.3831, lng: 6.2391 },
    Genève: { lat: 46.2044, lng: 6.1432 },
    Carouge: { lat: 46.1809, lng: 6.1394 },
  } as Record<string, { lat: number; lng: number }>,
};
