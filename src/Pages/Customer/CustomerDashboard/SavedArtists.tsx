import { useMemo, useState } from "react";

const initialArtists = [
  {
    id: 1,
    name: "Mehendi by Anjali",
    category: "Bridal Mehndi Artist",
    price: "₹15,000",
    rating: 4.9,
    badge: "Verified",
    action: "chat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNfIRaJqrhdfiUPKqDl6GoBkdxa9ffvGqc2Us81szdg0tSJ9GTaRdnQwlGvON7fQJUpnVPNCtbpxtO6qfbksVC9bwfpOuQF2CM7110elJruokbrGPfzcjWr0elANO0gyuaP5KI9jWN7JNaefIu3r5ye4Fmxjfp0F4nZfsZESBkGUi3RkINtodlcppgUKnUH9gbPHgWCIo6tCzw-khYdJk308saIB3i5_N9u__BYYZB65Ac8ey_j_py-hF9QT2gt7VnLrmOydBMjPUe",
  },
  {
    id: 2,
    name: "Lens Heritage Studio",
    category: "Cinematography & Stills",
    price: "₹85,000",
    rating: 4.8,
    badge: "Popular",
    action: "call",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtisugATQtajXd5lLDzrlpWsNE5O-M6X09Cviw_pL4EJOcURBMKzIydwDS-k0T_KMT8yE55Bk4y8ad_dm4W_GCRHInvwS24aANT1FtlJwkkbGObLo3kVXZka1aq8n_DHTtRw44uTFPaZ828wLW4RZ0TBcHlGA3-Lp91lRqGTM2QcqFpNGAu2ztrMlx3vEUUYge-zNvbEjU4JDiaKWExFSQ8ZSGKxrDSAiDf76UU_3JikgWbWZOu7xOvOnrCCyPqFY-EW9YtTXbrLmK",
  },
  {
    id: 3,
    name: "Royal Glitz Makeup",
    category: "Bridal Makeover Expert",
    price: "₹25,000",
    rating: 5.0,
    badge: "Top Rated",
    action: "chat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAw5J7LSWOvCr6-foDNlvUtdhVsHIDrSNbkX-ol0YTSKrpB-ClrOFbojhjopw6O9-_Sg6Ws-iK7nOzMpTHA8y7QGtiOQK6F_52iV8FiRiC_xJOC6d82dtG4C_WSzuHYNKS5QOrC4whDgxktHB24eD9jEAT_CWjKfQjKQgzr1Q6liyEuXpD6hIgZXxpziDRbpBKQ3jq54tA8YGMrKc6aWmHxkInU7sindCfsRN2oaC4rECUKA0ZshohVHEObd4JRmPUmvwU7xIctL-1-",
  },
  {
    id: 4,
    name: "The Grand Decor",
    category: "Event Styling & Decor",
    price: "₹2,50,000",
    rating: 4.7,
    badge: "Premium",
    action: "call",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkNI8Ycku80Dbyc5nzou8MYvNzo-9bNEaVXH2bVv7dpZ_rHboNg1ELQ2kk8njtiuEmSu4ZFC1p_35vXtjmUkdntQzWezYVVQKJ7J4N6pdviOl3wpfjeXiUffvB2K8n_rKTzFYSRvbkUYYS2KQfa1nnOYwhvMPbzv9BeY4EvVvnolYdnGFWQXhSGhlZGPKjCy1prU3eYpM7NYvdMxayQq4CAzE4lXkZKxJ_Q6GRz1xtj7hY15rV49pJ-FmSm-O3ZvRIOVzZweObhATH",
  },
  {
    id: 5,
    name: "Zaika Catering Services",
    category: "Traditional & Fusion Menu",
    price: "₹800/Plate",
    rating: 4.9,
    badge: "Favorite",
    action: "chat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJfAgHsiQ7IV-46B29-EzpZg_BJ7_QNTcZQBdBW7BxOcfgOvdzRO19ElMtFu7PYD4kxunt881v52cREAkUVBt5eSLzV7JDw41CuuoPuiwk_pQUlsHECK_EfsQrozPaIR1QiTD_gBAfo4LWqdH--jrk-nN-vVsEP-1ffN_gtyjU2v-aMlhuCm-J9OfpmeePxcsuRsNwphnmRdjzicpOp6yIQdJl129a5b7fV9HOl9gAtPbfSk0bfr_97I703dVnivLt7Ngi9VCZuQht",
  },
  {
    id: 6,
    name: "Taal Musical Troupe",
    category: "Folk & Sufi Performers",
    price: "₹45,000",
    rating: 4.6,
    badge: "Trending",
    action: "call",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwFejiBGYI_dCB-cHNHobIZ-bJJUnhVsvOJchm8diwZLtwWK4Jzm8tGu1xIcNswrZMhXHMWxQBJY-o802u_5PLxK8pHNHUVI4KCKJSUJmVlUF2xc9v3LdKerpISJ8zc85zmRNz9g3xu3vGV1CsfP2iY_q8-zCH1cnm1ZENU5MG6u2JQgwEMyOeD8S8iMbsJmlckkQqSNFl1NNBXQc53Vv7_khYVVED5gX2fT6_dr-D_twsjg4IZNmiY9eL5-3TEwmhES80PWezcKHr",
  },
];

function ArtistCard({
  artist,
  onRemove,
}: {
  artist: any;
  onRemove: (id: any) => void;
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#b12b31]">
          {artist.badge}
        </span>

        <button
          onClick={() => onRemove(artist.id)}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-[#b12b31]"
        >
          ✕
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {artist.name}
            </h3>
            <p className="text-sm text-gray-500">{artist.category}</p>
          </div>

          <div className="px-3 py-1 rounded-xl bg-gray-50 text-sm font-semibold">
            ⭐ {artist.rating}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Starts from
            </p>
            <p className="text-lg font-bold text-[#b12b31]">{artist.price}</p>
          </div>

          <div className="flex gap-2">
            <button className="h-11 w-11 rounded-xl bg-emerald-600 text-white font-bold">
              {artist.action === "call" ? "📞" : "💬"}
            </button>
            <button className="px-5 h-11 rounded-xl bg-[#b12b31] text-white font-semibold">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SavedArtists() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState(initialArtists);

  const filteredArtists = useMemo(() => {
    return artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(search.toLowerCase()) ||
        artist.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, artists]);

  const removeArtist = (id: any) => {
    setArtists((prev) => prev.filter((artist) => artist.id !== id));
  };

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
              key={artist.id}
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
