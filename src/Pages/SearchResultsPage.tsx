import { useEffect, useState } from "react";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import { useNavigate } from "react-router-dom";
import {
  MdCall,
  MdFilterList,
  MdVerifiedUser,
  MdOutlineVerified,
  MdCurrencyRupee,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoLocation, IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { SaveArtistButton } from "../Components/SaveArtistButton";
import { useArtist } from "../Hooks/useArtist";

const SearchResultsPage = () => {
  const navigate = useNavigate();

  const { loading, fetchArtists, hasNextPage, hasPreviousPage } = useArtist();

  const [artists, setArtists] = useState<any[]>([]);

  const handleSaveLoginRequired = () => {
    navigate("/user-login");
  };

  const loadArtists = async (direction?: "next" | "prev") => {
    const res = await fetchArtists(direction);

    if (res) {
      setArtists(res);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const renderStars = (count: number) => {
    const fullStars = Math.floor(count);
    const hasHalf = count % 1 !== 0;

    return (
      <div className="flex items-center text-[#c48b11]">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-base">
            <IoStar />
          </span>
        ))}

        {hasHalf && (
          <span className="text-base">
            <IoStarHalf />
          </span>
        )}

        {!hasHalf &&
          fullStars < 5 &&
          [...Array(5 - fullStars)].map((_, i) => (
            <span key={`empty-${i}`} className="text-base opacity-40">
              <IoStarOutline />
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fcf8f8] text-[#1c1b1c] overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-105 w-105 rounded-full bg-[#b12b31]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-95 w-95 rounded-full bg-[#006d2f]/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="mx-auto  px-4 pb-16 pt-24 md:px-6 font-['Lexend']">
        {/* Header */}
        <div className="relative overflow-hidden rounded-4xl border border-white/60 bg-white/70 backdrop-blur-xl px-6 py-10 md:px-10 shadow-[0_25px_80px_-35px_rgba(177,43,49,0.25)] mb-10">
          <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-[#b12b31]/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#b12b31]/10 px-4 py-2 text-sm font-semibold text-[#b12b31]">
              <MdVerifiedUser />
              Trusted Wedding Marketplace
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-[#1c1b1c] font-['Plus_Jakarta_Sans'] leading-tight">
              Find Your Perfect Artist
            </h1>

            <p className=" text-base md:text-lg text-[#5f5650] leading-relaxed">
              Discover verified makeup artists and photographers trusted by
              families across rural and urban India.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="rounded-2xl bg-[#fff7f7] border border-[#f1d4d6] px-5 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7f79]">
                  Verified Artists
                </p>
                <p className="text-2xl font-black text-[#b12b31]">128+</p>
              </div>

              <div className="rounded-2xl bg-[#f6fff8] border border-[#cce7d5] px-5 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7f79]">
                  Successful Bookings
                </p>
                <p className="text-2xl font-black text-[#006d2f]">2.4k+</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-80">
            <div className="sticky top-28 space-y-6">
              {/* Filter Card */}
              <div className="rounded-4xl border border-white/70 bg-white/80 backdrop-blur-xl p-7 shadow-[0_25px_60px_-30px_rgba(28,27,28,0.18)]">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b12b31]/10 text-[#b12b31]">
                      <MdFilterList className="text-2xl" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
                        Filters
                      </h2>
                      <p className="text-xs text-[#7f7663]">
                        Refine your search
                      </p>
                    </div>
                  </div>

                  <button className="text-xs font-bold text-[#b12b31] hover:underline cursor-pointer">
                    Reset
                  </button>
                </div>

                {/* Budget */}
                <div className="mb-8">
                  <label className="mb-4 block text-sm font-bold text-[#1c1b1c]">
                    Budget Range
                  </label>

                  <div className="space-y-3">
                    {["Under ₹5,000", "₹5,000 - ₹15,000", "₹15,000+"].map(
                      (item, i) => (
                        <label
                          key={i}
                          className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-[#efe5e6] bg-[#fcf8f8] px-4 py-3 transition-all hover:border-[#b12b31]/30 hover:bg-[#fff7f7]"
                        >
                          <input
                            type="radio"
                            name="budget"
                            defaultChecked={i === 0}
                            className="h-5 w-5 accent-[#b12b31]"
                          />

                          <span className="text-sm font-semibold text-[#4d4635] group-hover:text-[#b12b31]">
                            {item}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <label className="mb-4 block text-sm font-bold">
                    Location
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7f7663]">
                      <IoLocation />
                    </span>

                    <input
                      type="text"
                      placeholder="Search city or village"
                      className="w-full rounded-2xl border border-[#efe5e6] bg-[#fcf8f8] py-4 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#b12b31]/40 focus:bg-white focus:ring-4 focus:ring-[#b12b31]/10"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-8">
                  <label className="mb-4 block text-sm font-bold">
                    Minimum Rating
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {["3+", "4+", "4.5+"].map((rating, index) => (
                      <button
                        key={index}
                        className={`rounded-xl py-3 text-sm font-bold transition-all cursor-pointer ${
                          rating === "4+"
                            ? "bg-[#b12b31] text-white shadow-lg shadow-[#b12b31]/20"
                            : "bg-[#f3ecec] text-[#4d4635] hover:bg-[#eadbdd]"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified */}
                <div className="flex items-center justify-between rounded-2xl border border-[#efe5e6] bg-[#fcf8f8] px-4 py-4">
                  <div>
                    <p className="text-sm font-bold">Verified Only</p>
                    <p className="text-xs text-[#7f7663]">
                      Trusted professionals
                    </p>
                  </div>

                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer sr-only"
                    />

                    <div className="h-6 w-11 rounded-full bg-[#e6e1e2] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#b12b31] peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>

              {/* Social Proof */}
              <div className="relative overflow-hidden rounded-4xl border border-[#ead8da] bg-linear-to-br from-[#fff7f7] to-white p-6 shadow-[0_25px_60px_-35px_rgba(177,43,49,0.25)]">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#b12b31]/10" />

                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fed65b] text-[#745c00]">
                      <MdVerifiedUser />
                    </div>
                  </div>

                  <h3 className="text-center text-sm font-black uppercase tracking-[0.2em] text-[#4d4635]">
                    Social Proof
                  </h3>

                  <p className="mt-3 text-center text-sm leading-relaxed text-[#5f5650]">
                    4 families booked artists from Palampur in the last 24
                    hours.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Artists */}
          {!loading ? (
            <div className="flex-1 space-y-8">
              {artists.length !== 0 ? (
                <>
                  {artists.map((artist, index) => (
                    <article
                      key={index}
                      className="group relative overflow-hidden rounded-4xl border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_30px_80px_-35px_rgba(28,27,28,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_100px_-35px_rgba(177,43,49,0.25)]"
                    >
                      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#b12b31]/5 blur-3xl" />

                      <div className="relative z-10 flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative h-72 w-full overflow-hidden md:h-76 md:w-80 lg:w-96">
                          <img
                            src={artist.profilePicture}
                            alt={artist.fullName}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#fed65b] px-4 py-2 text-xs font-black text-[#745c00] shadow-lg">
                            <MdOutlineVerified />
                            Verified Artist
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-6 md:p-8">
                          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                              <h3 className="text-2xl md:text-3xl font-black text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                                {artist.fullName}
                              </h3>

                              <div className="mt-3 flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 rounded-full bg-[#fff8e6] px-3 py-1.5">
                                  {renderStars(3.5)}

                                  <span className="text-sm font-bold text-[#745c00]">
                                    3.5
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-full bg-[#f5f3f3] px-3 py-1.5 text-sm font-semibold text-[#4d4635]">
                                  <IoLocation />
                                  <span className="truncate max-w-45">
                                    {artist.location}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-2xl bg-[#fff7f7] border border-[#f1d4d6] px-5 py-4 text-right">
                              <span className="block text-xs font-bold uppercase tracking-widest text-[#8a7f79]">
                                Starting From
                              </span>

                              <div className="mt-1 flex items-center justify-end">
                                <MdCurrencyRupee className="text-[#b12b31]" />

                                <span className="text-3xl font-black text-[#b12b31] font-['Plus_Jakarta_Sans']">
                                  {artist?.startingPrice}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="mb-8 text-sm md:text-[15px] leading-7 text-[#5f5650]">
                            {artist?.bio}
                          </p>

                          {/* Buttons */}
                          <div className="mt-auto flex flex-wrap gap-3">
                            <button className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#b12b31] px-5 font-bold text-white shadow-lg shadow-[#b12b31]/20 transition-all hover:-translate-y-0.5 hover:opacity-95 active:scale-[0.98] cursor-pointer">
                              <MdCall className="text-xl" />
                              Call Now
                            </button>

                            <button className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#006d2f] px-5 font-bold text-white shadow-lg shadow-[#006d2f]/20 transition-all hover:-translate-y-0.5 hover:opacity-95 active:scale-[0.98] cursor-pointer">
                              <FaWhatsapp className="text-lg" />
                              WhatsApp
                            </button>

                            <SaveArtistButton
                              artistId={artist.uid}
                              variant="with-label"
                              onLoginRequired={handleSaveLoginRequired}
                              className="flex-1 md:flex-none cursor-pointer"
                            />

                            <button
                              onClick={() =>
                                navigate(`/artist-profile/${artist.uid}`)
                              }
                              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#eadbdd] bg-[#fcf8f8] px-5 font-bold text-[#4d4635] transition-all hover:border-[#b12b31]/20 hover:bg-[#fff7f7] hover:text-[#b12b31] active:scale-[0.98] cursor-pointer"
                            >
                              <FaRegEye />
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <button
                      disabled={!hasPreviousPage}
                      onClick={() => loadArtists("prev")}
                      className="rounded-2xl border border-[#eadbdd] bg-white px-7 py-3 font-bold text-[#4d4635] shadow-sm transition-all hover:border-[#b12b31]/30 hover:bg-[#fff7f7] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      ← Previous
                    </button>

                    <button
                      disabled={!hasNextPage}
                      onClick={() => loadArtists("next")}
                      className="rounded-2xl bg-[#b12b31] px-7 py-3 font-bold text-white shadow-lg shadow-[#b12b31]/20 transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-4xl border border-dashed border-[#e7d8d9] bg-white/70 py-28 text-center">
                  <div className="mb-5 text-6xl">🎨</div>

                  <h2 className="text-3xl font-black text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                    No Artists Found
                  </h2>

                  <p className="mt-3 max-w-md text-[#6b625d]">
                    Try adjusting your filters or explore artists from nearby
                    locations.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex min-h-[70vh] w-full items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-[#f0d6d8]" />
                <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-[#b12b31] border-t-transparent" />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
