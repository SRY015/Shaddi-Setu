import {
  getDoc,
  type DocumentData,
  type DocumentReference,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import type { ArtistProfile } from "../../../Types/artistTypes";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  profilePicture: string;
  savedArtists?: DocumentReference[];
}

export default function DashboardContent({
  userProfile,
}: {
  userProfile: UserProfile | null;
}) {
  const [savedArtists, setSavedArtists] = useState<ArtistProfile[]>([]);

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

  // const toggleLike = (id: any) => {
  //   setSavedArtists((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, liked: !item.liked } : item,
  //     ),
  //   );
  // };

  return (
    <div className="min-h-screen bg-[#fdf8f9] px-4 py-6 md:px-8 lg:px-0">
      {/* Welcome Header */}
      <section className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
          Namaste,{" "}
          <span className="text-[#b12b31]">
            {userProfile?.fullName.split(" ")[0]}
          </span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          You have 3 artists waiting for confirmation today.
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="text-2xl font-bold">Active Bookings</h2>
            <button className="text-[#b12b31] font-semibold text-sm">
              View Timeline →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-end mb-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700 uppercase">
                  Pending
                </span>
              </div>

              <h3 className="text-lg font-bold mb-1">Royal Marigold Decor</h3>
              <p className="text-sm text-gray-500 mb-4">Venue Stylist</p>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>📅 Dec 14, 2024</p>
                <p>💳 ₹45,000 Total</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#b12b31] text-white py-3 rounded-xl font-semibold hover:opacity-90">
                  Pay Deposit
                </button>
                <button className="px-4 border rounded-xl">💬</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-end mb-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-600 text-white uppercase">
                  Accepted
                </span>
              </div>

              <h3 className="text-lg font-bold mb-1">Amrita's Mehendi Arts</h3>
              <p className="text-sm text-gray-500 mb-4">Henna Specialist</p>

              <div className="space-y-2 text-sm mb-6">
                <p className="text-gray-600">📅 Dec 12, 2024</p>
                <p className="text-green-600 font-semibold">✔ Fully Paid</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 border border-[#b12b31] text-[#b12b31] py-3 rounded-xl font-semibold hover:bg-red-50">
                  Manage Details
                </button>
                <button className="px-4 bg-green-600 text-white rounded-xl">
                  📞
                </button>
              </div>
            </div>
          </div>

          {/* Trust Ribbon */}
          <div className="bg-[#ece7e8] rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">Heritage Guaranteed</h4>
              <p className="text-sm text-gray-600">
                All artists are verified for quality & safety.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-[#b12b31]">
              <span>Trusted by 50+ families</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-8">
          {/* Saved Artists */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Saved Artists</h3>
              <span className="text-sm text-gray-400">{`${savedArtists.length} artists`}</span>
            </div>

            <div className="space-y-4">
              {savedArtists.map((artist) => (
                <div
                  key={artist.uid}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100"
                >
                  <img
                    src={artist.profilePicture}
                    alt={artist.fullName}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold">{artist.fullName}</h4>
                    <p className="text-sm text-gray-500">{artist.role}</p>
                  </div>

                  <button
                    // onClick={() => toggleLike(artist.id)}
                    className="text-xl"
                  >
                    ❤️
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl text-[#b12b31] font-semibold hover:bg-red-50">
              Explore Marketplace
            </button>
          </section>

          {/* Support Section */}
          <section className="bg-[#ece7e8] rounded-3xl p-8 text-center shadow-sm">
            <div className="text-4xl mb-4">🎧</div>
            <h4 className="text-lg font-bold mb-2">Need assistance?</h4>
            <p className="text-sm text-gray-600 mb-6">
              Our wedding concierge is available 24/7 to help you with bookings.
            </p>

            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold">
                WhatsApp Support
              </button>
              <button className="w-full bg-white py-4 rounded-xl font-semibold border">
                Help Center
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
