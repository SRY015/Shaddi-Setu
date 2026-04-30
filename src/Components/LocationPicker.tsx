// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Props {
//   setFormData: React.Dispatch<React.SetStateAction<any>>;

//   /**
//    * mode options:
//    * "both" → show input + map
//    * "map" → show only map
//    * "input" → show only input field
//    */
//   mode?: "both" | "map" | "input";

//   /**
//    * extra input styling
//    */
//   style?: string;

//   /**
//    * NEW:
//    * prefilled location from parent component
//    */
//   initialLocation?: string;

//   /**
//    * label for the input field
//    */
//   label?: string;
// }

// interface Suggestion {
//   display_name: string;
//   lat: string;
//   lon: string;
// }

// interface ChangeMapViewProps {
//   center: [number, number];
// }

// interface LocationMarkerProps {
//   position: [number, number];
//   onMapClick: (lat: number, lng: number) => void;
// }

// const ChangeMapView = ({ center }: ChangeMapViewProps) => {
//   const map = useMap();

//   useEffect(() => {
//     if (map) {
//       map.setView(center, 13);
//     }
//   }, [center, map]);

//   return null;
// };

// const LocationMarker = ({ position, onMapClick }: LocationMarkerProps) => {
//   useMapEvents({
//     click(e: any) {
//       const lat = e.latlng.lat;
//       const lng = e.latlng.lng;
//       onMapClick(lat, lng);
//     },
//   });

//   return <Marker position={position} />;
// };

// const LocationPicker = ({
//   setFormData,
//   mode = "both",
//   style,
//   initialLocation,
//   label = "Your Village / Town Name",
// }: Props) => {
//   /**
//    * Default Location → Kharagpur
//    */
//   const [position, setPosition] = useState<[number, number]>([22.346, 87.2319]);

//   const [locationInput, setLocationInput] = useState("");
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [loading, setLoading] = useState(false);

//   /**
//    * Prevent default location override
//    */
//   const [initialLocationLoaded, setInitialLocationLoaded] = useState(false);

//   /**
//    * Common function to update form data
//    */
//   const updateFormData = (fullAddress: string, lat: number, lng: number) => {
//     setLocationInput(fullAddress);

//     setFormData((prev: any) => ({
//       ...prev,
//       location: fullAddress,
//       latitude: lat,
//       longitude: lng,
//     }));
//   };

//   /**
//    * Reverse Geocoding
//    * Map Click → Address
//    */
//   const getAddressFromCoordinates = async (lat: number, lng: number) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//       );

//       const fullAddress = response.data.display_name || "";

//       setSuggestions([]);
//       setPosition([lat, lng]);
//       updateFormData(fullAddress, lat, lng);
//     } catch (error) {
//       console.log("Reverse geocoding error:", error);
//     }
//   };

//   /**
//    * Suggestions while typing
//    */
//   const fetchSuggestions = async (value: string) => {
//     setLocationInput(value);

//     if (!value.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`,
//       );

//       setSuggestions(response.data);
//     } catch (error) {
//       console.log("Suggestion fetch error:", error);
//     }
//   };

//   /**
//    * Search button click
//    */
//   const getCoordinatesFromAddress = async () => {
//     if (!locationInput.trim()) return;

//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}&limit=1`,
//       );

//       if (response.data.length > 0) {
//         const place = response.data[0];

//         const lat = parseFloat(place.lat);
//         const lng = parseFloat(place.lon);
//         const fullAddress = place.display_name;

//         setSuggestions([]);
//         setPosition([lat, lng]);
//         updateFormData(fullAddress, lat, lng);
//       } else {
//         alert("Location not found");
//       }
//     } catch (error) {
//       console.log("Forward geocoding error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * NEW:
//    * Load initial location from parent
//    */
//   const loadInitialLocation = async (location: string) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=1`,
//       );

//       if (response.data.length > 0) {
//         const place = response.data[0];

//         const lat = parseFloat(place.lat);
//         const lng = parseFloat(place.lon);
//         const fullAddress = place.display_name;

//         setSuggestions([]);
//         setPosition([lat, lng]);
//         updateFormData(fullAddress, lat, lng);
//       }
//     } catch (error) {
//       console.log("Initial location load error:", error);
//     } finally {
//       setInitialLocationLoaded(true);
//     }
//   };

//   /**
//    * Suggestion selection
//    */
//   const handleSuggestionClick = (place: Suggestion) => {
//     const lat = parseFloat(place.lat);
//     const lng = parseFloat(place.lon);

//     setSuggestions([]);
//     setPosition([lat, lng]);
//     updateFormData(place.display_name, lat, lng);
//   };

//   /**
//    * Smart initial load
//    *
//    * If initialLocation exists:
//    * → load that first
//    *
//    * Else:
//    * → load default Kharagpur location
//    */
//   useEffect(() => {
//     if (!initialLocationLoaded) {
//       if (initialLocation && initialLocation.trim()) {
//         loadInitialLocation(initialLocation);
//       } else {
//         getAddressFromCoordinates(position[0], position[1]);
//         setInitialLocationLoaded(true);
//       }
//     }
//   }, [initialLocation, initialLocationLoaded]);

//   return (
//     <div className="space-y-1">
//       {/* Label */}
//       <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
//         {label}
//       </label>

//       {/* INPUT FIELD */}
//       {(mode === "both" || mode === "input") && (
//         <div className="relative">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={locationInput}
//               onChange={(e) => fetchSuggestions(e.target.value)}
//               placeholder="Search your village, town, city..."
//               className={`w-full h-12 px-4 rounded-xl border-none bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31] ${style}`}
//             />

//             <button
//               type="button"
//               onClick={getCoordinatesFromAddress}
//               disabled={loading}
//               className="min-w-20 px-0 rounded-xl bg-[#b12b31] text-white font-semibold hover:bg-[#8f1f24] transition disabled:opacity-70"
//             >
//               {loading ? "Searching..." : "Search"}
//             </button>
//           </div>

//           {/* Suggestions */}
//           {suggestions.length > 0 && (
//             <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-999 max-h-60 overflow-y-auto">
//               {suggestions.map((place, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleSuggestionClick(place)}
//                   className="px-4 py-3 cursor-pointer hover:bg-[#fff5f5] text-sm text-gray-700 border-b last:border-b-0"
//                 >
//                   {place.display_name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* MAP */}
//       {(mode === "both" || mode === "map") && (
//         <MapContainer
//           className="h-72 w-full rounded-xl overflow-hidden z-0"
//           key={`map-${position[0]}-${position[1]}`}
//         >
//           <ChangeMapView center={position} />

//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           <LocationMarker
//             position={position}
//             onMapClick={getAddressFromCoordinates}
//           />
//         </MapContainer>
//       )}

//       {/* Helper text */}
//       <p className="text-sm text-gray-500">
//         {mode === "both" &&
//           "Type location and select suggestion OR click directly on map"}
//         {mode === "map" && "Click directly on map to select your location"}
//         {mode === "input" && "Search your village/town using the input field"}
//       </p>
//     </div>
//   );
// };

// export default LocationPicker;

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Circle,
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<any>>;

  mode?: "both" | "map" | "input";
  style?: string;
  initialLocation?: string;
  label?: string;

  // 🔥 NEW
  range?: number; // in KM
}

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface ChangeMapViewProps {
  center: [number, number];
}

interface LocationMarkerProps {
  position: [number, number];
  onMapClick: (lat: number, lng: number) => void;
}

const ChangeMapView = ({ center }: ChangeMapViewProps) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
};

const LocationMarker = ({ position, onMapClick }: LocationMarkerProps) => {
  useMapEvents({
    click(e: any) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      onMapClick(lat, lng);
    },
  });

  return <Marker position={position} />;
};

const LocationPicker = ({
  setFormData,
  mode = "both",
  style,
  initialLocation,
  label = "Your Village / Town Name",
  range, // 👈 NEW
}: Props) => {
  const [position, setPosition] = useState<[number, number]>([22.346, 87.2319]);

  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const [initialLocationLoaded, setInitialLocationLoaded] = useState(false);

  const updateFormData = (fullAddress: string, lat: number, lng: number) => {
    setLocationInput(fullAddress);

    setFormData((prev: any) => ({
      ...prev,
      location: fullAddress,
      latitude: lat,
      longitude: lng,
    }));
  };

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );

      const fullAddress = response.data.display_name || "";

      setSuggestions([]);
      setPosition([lat, lng]);
      updateFormData(fullAddress, lat, lng);
    } catch (error) {
      console.log("Reverse geocoding error:", error);
    }
  };

  const fetchSuggestions = async (value: string) => {
    setLocationInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`,
      );

      setSuggestions(response.data);
    } catch (error) {
      console.log("Suggestion fetch error:", error);
    }
  };

  const getCoordinatesFromAddress = async () => {
    if (!locationInput.trim()) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}&limit=1`,
      );

      if (response.data.length > 0) {
        const place = response.data[0];

        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        const fullAddress = place.display_name;

        setSuggestions([]);
        setPosition([lat, lng]);
        updateFormData(fullAddress, lat, lng);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.log("Forward geocoding error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialLocation = async (location: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=1`,
      );

      if (response.data.length > 0) {
        const place = response.data[0];

        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        const fullAddress = place.display_name;

        setSuggestions([]);
        setPosition([lat, lng]);
        updateFormData(fullAddress, lat, lng);
      }
    } catch (error) {
      console.log("Initial location load error:", error);
    } finally {
      setInitialLocationLoaded(true);
    }
  };

  const handleSuggestionClick = (place: Suggestion) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    setSuggestions([]);
    setPosition([lat, lng]);
    updateFormData(place.display_name, lat, lng);
  };

  useEffect(() => {
    if (!initialLocationLoaded) {
      if (initialLocation && initialLocation.trim()) {
        loadInitialLocation(initialLocation);
      } else {
        getAddressFromCoordinates(position[0], position[1]);
        setInitialLocationLoaded(true);
      }
    }
  }, [initialLocation, initialLocationLoaded]);

  return (
    <div className="space-y-1">
      {/* Label */}
      <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
        {label}
      </label>

      {/* INPUT */}
      {(mode === "both" || mode === "input") && (
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => fetchSuggestions(e.target.value)}
              placeholder="Search your village, town, city..."
              className={`w-full h-12 px-4 rounded-xl bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31] ${style}`}
            />

            <button
              type="button"
              onClick={getCoordinatesFromAddress}
              disabled={loading}
              className="min-w-20 rounded-xl bg-[#b12b31] text-white font-semibold hover:bg-[#8f1f24] transition disabled:opacity-70"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-14 left-0 w-full bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((place, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(place)}
                  className="px-4 py-3 cursor-pointer hover:bg-[#fff5f5] text-sm border-b last:border-b-0"
                >
                  {place.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MAP */}
      {(mode === "both" || mode === "map") && (
        <MapContainer
          className="h-72 w-full rounded-xl overflow-hidden"
          key={`map-${position[0]}-${position[1]}`}
        >
          <ChangeMapView center={position} />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LocationMarker
            position={position}
            onMapClick={getAddressFromCoordinates}
          />

          {/* 🔥 RANGE CIRCLE */}
          {range && (
            <Circle
              center={position}
              radius={range * 1000}
              pathOptions={{
                color: "#b12b31",
                fillColor: "#b12b31",
                fillOpacity: 0.15,
              }}
            />
          )}
        </MapContainer>
      )}

      {/* Helper */}
      <p className="text-sm text-gray-500">
        {mode === "both" && "Type location or click directly on map to select"}
        {mode === "map" && "Click on map to select location"}
        {mode === "input" && "Search location using input"}
      </p>
    </div>
  );
};

export default LocationPicker;
