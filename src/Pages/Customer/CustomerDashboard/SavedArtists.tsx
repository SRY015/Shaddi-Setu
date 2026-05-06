import {
  getDoc,
  type DocumentData,
  type DocumentReference,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import type { ArtistProfile } from "../../../Types/artistTypes";
import { useNavigate } from "react-router-dom";
import { useSaveArtist } from "../../../Hooks/useSaveArtist";

function ArtistCard({
  artist,
  onRemove,
}: {
  artist: any;
  onRemove: (id: any) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-6/5 overflow-hidden">
        <img
          src={artist.profilePicture}
          alt={artist.fullName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#b12b31]">
          {artist.badge}
        </span> */}

        <button
          onClick={() => onRemove(artist.uid)}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#b12b31] cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {artist.fullName}
            </h3>
            <p className="text-sm text-gray-500">{artist.serviceType}</p>
          </div>

          <div className="px-3 py-1 rounded-xl bg-gray-50 text-sm font-semibold">
            ⭐ {3.5}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Starts from
            </p>
            <p className="text-lg font-bold text-[#b12b31]">
              {artist.startingPrice}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="h-11 w-11 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer">
              {artist.action === "call" ? "📞" : "💬"}
            </button>
            <button
              onClick={() => {
                navigate(`/artist-profile/${artist.uid}`);
              }}
              className="px-5 h-11 rounded-xl bg-[#b12b31] text-white font-semibold cursor-pointer"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UserProfile {
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  dob?: string;
  gender?: "Male" | "Female" | "Others";
  location?: string;
  language?: string;
  role?: string;
  profilePicture?: string;
  whatsappUpdates?: boolean;
  emailAlerts?: boolean;
  savedArtists?: DocumentReference[];
}

export default function SavedArtists({
  userProfile,
}: {
  userProfile: UserProfile | null;
}) {
  const [search, setSearch] = useState("");
  const [savedArtists, setSavedArtists] = useState<ArtistProfile[]>([]);

  const filteredArtists = useMemo(() => {
    return savedArtists.filter(
      (artist) =>
        artist.fullName.toLowerCase().includes(search.toLowerCase()) ||
        artist.role.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, savedArtists]);

  const { unsaveArtist } = useSaveArtist();

  const removeArtist = async (uid: string) => {
    if (!uid) return;

    const success = await unsaveArtist(uid);
    if (success) {
      setSavedArtists((prev) => prev.filter((artist) => artist.uid !== uid));
    }
  };

  const fetchDocsFromRefs = async <T = DocumentData,>(
    refs: DocumentReference<DocumentData>[],
  ): Promise<T[]> => {
    try {
      const promises = refs.map((ref) => getDoc(ref));

      const snapshots = await Promise.all(promises);

      const data = snapshots
        .filter((snap) => snap.exists())
        .map((snap) => ({
          ...snap.data(),
          uid: snap.id,
        })) as T[];

      return data;
    } catch (error) {
      console.error("Error fetching docs from refs:", error);
      return [];
    }
  };

  useEffect(() => {
    const getSavedArtists = async () => {
      if (
        !userProfile ||
        userProfile?.savedArtists === undefined ||
        userProfile?.savedArtists?.length === 0
      )
        return;
      const artists = await fetchDocsFromRefs<ArtistProfile>(
        userProfile?.savedArtists,
      );
      console.log("Saved artists : ", artists);
      setSavedArtists(artists);
    };
    getSavedArtists();
  }, [userProfile]);

  return (
    <div className="min-h-screen bg-[#fdf8f9] px-4 sm:px-6 lg:px-0 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#b12b31]">
            Saved Artists
          </h1>
          <p className="text-gray-500 mt-2">
            {filteredArtists.length} saved profiles available
          </p>
        </div>

        <input
          type="text"
          placeholder="Search saved artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-80 rounded-full px-5 py-3 border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#b12b31]/20"
        />
      </div>

      {/* Trust Ribbon */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm mb-10 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm whitespace-nowrap">
          <p>✔ Verified by 500+ Families</p>
          <p>⚡ Last booked in Jaipur (2 mins ago)</p>
          <p>✨ Hand-picked Regional Masters</p>
        </div>
      </div>

      {/* Grid */}
      {filteredArtists.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.uid}
              artist={artist}
              onRemove={removeArtist}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold mb-2">No saved artists found</h2>
          <p className="text-gray-500">
            Try searching something else or save new artists.
          </p>
        </div>
      )}
    </div>
  );
}
