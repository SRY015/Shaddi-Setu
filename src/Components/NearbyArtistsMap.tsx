import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Artist {
  uid?: string;
  latitude?: number;
  longitude?: number;
  fullName?: string;
  profilePicture?: string;
  location?: string;
  verified?: boolean;
  distanceFromUser?: number;
}

interface NearbyArtistsMapProps {
  userLocation?: {
    latitude: number;
    longitude: number;
  };
  artists: Artist[];
}

// Custom icon for user
const userIcon = L.divIcon({
  html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#b12b31" stroke="white" stroke-width="2"/>
    <text x="20" y="26" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">📍</text>
  </svg>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className: "user-icon",
});

// Custom icon for artist
const artistIcon = L.divIcon({
  html: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="16" fill="#006d2f" stroke="white" stroke-width="2"/>
    <text x="18" y="24" font-size="18" fill="white" text-anchor="middle" dominant-baseline="middle">🎨</text>
  </svg>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
  className: "artist-icon",
});

const NearbyArtistsMap = ({ userLocation, artists }: NearbyArtistsMapProps) => {
  if (!userLocation || !artists.length) {
    return (
      <div className="h-96 bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-500 border border-gray-300">
        <div className="text-center">
          <p className="text-lg font-semibold">No Artists in Your Area</p>
          <p className="text-sm mt-1">
            Artists will appear here once available
          </p>
        </div>
      </div>
    );
  }

  // Calculate map bounds from all coordinates
  const allCoords = [
    [userLocation.latitude, userLocation.longitude],
    ...artists
      .filter((a) => a.latitude && a.longitude)
      .map((a) => [a.latitude!, a.longitude!]),
  ];

  const lats = allCoords.map((c) => c[0]);
  const lngs = allCoords.map((c) => c[1]);

  const bounds: L.LatLngBoundsExpression = [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];

  return (
    <div className="h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer bounds={bounds} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userIcon}
        >
          <Popup>
            <div className="text-center font-semibold text-sm">
              <p>Your Location</p>
            </div>
          </Popup>
        </Marker>

        {/* Artist Markers */}
        {artists.map((artist, idx) => {
          if (!artist.latitude || !artist.longitude) return null;

          return (
            <Marker
              key={artist.uid || idx}
              position={[artist.latitude, artist.longitude]}
              icon={artistIcon}
            >
              <Popup>
                <div className="w-48">
                  {artist.profilePicture && (
                    <img
                      src={artist.profilePicture}
                      alt={artist.fullName}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                  )}
                  <p className="font-bold text-sm">{artist.fullName}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {artist.location}
                  </p>
                  {artist.distanceFromUser && (
                    <p className="text-xs font-semibold text-[#b12b31] mt-2">
                      {artist.distanceFromUser.toFixed(1)} km away
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default NearbyArtistsMap;
