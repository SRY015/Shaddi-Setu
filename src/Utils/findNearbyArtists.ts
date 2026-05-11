import calculateDistance from "./calculateDistance";

export interface ArtistWithDistance extends Record<string, any> {
  distanceFromUser?: number;
}

/**
 * Find nearby artists within a specified distance whose service range covers the user
 *
 * @param userLat - User's latitude
 * @param userLng - User's longitude
 * @param artists - Array of all artists
 * @param maxDistance - Maximum search distance in KM (default: 150)
 * @returns Array of nearby artists sorted by distance, with distance attached
 */
export const findNearbyArtists = (
  userLat: number,
  userLng: number,
  artists: any[],
  maxDistance: number = 150,
): ArtistWithDistance[] => {
  if (!userLat || !userLng || !Array.isArray(artists) || artists.length === 0) {
    return [];
  }

  const nearbyArtists: ArtistWithDistance[] = [];

  for (const artist of artists) {
    // Validate artist has coordinates
    if (!artist.latitude || !artist.longitude) {
      continue;
    }

    // Calculate distance between user and artist
    const distance = calculateDistance(
      userLat,
      userLng,
      artist.latitude,
      artist.longitude,
    );

    // Check if within max search distance
    if (distance > maxDistance) {
      continue;
    }

    // Get artist's service range
    const serviceRange = Number(artist.travelDistance || 0);

    // Artist must have a service range and it must cover the user
    if (serviceRange === 0 || distance > serviceRange) {
      continue;
    }

    // Add to nearby artists with distance info
    nearbyArtists.push({
      ...artist,
      distanceFromUser: distance,
    });
  }

  // Sort by distance (closest first)
  nearbyArtists.sort(
    (a, b) => (a.distanceFromUser || 0) - (b.distanceFromUser || 0),
  );

  return nearbyArtists;
};

/**
 * Format distance for user-friendly display
 * Examples: "Within 2km", "Within 15km", "Within 50km"
 */
export const formatDistance = (distanceKm: number | undefined): string => {
  if (distanceKm === undefined || distanceKm === null) {
    return "Unknown distance";
  }

  const rounded = Math.ceil(distanceKm);

  if (rounded === 0 || distanceKm < 0.5) {
    return "Less than 1 km";
  } else if (rounded <= 10) {
    return `Within ${rounded} km`;
  } else if (rounded <= 50) {
    // Round to nearest 5
    const rounded5 = Math.ceil(rounded / 5) * 5;
    return `Within ${rounded5} km`;
  } else {
    return `Within ${rounded} km`;
  }
};
