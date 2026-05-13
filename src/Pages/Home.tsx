import React, { useEffect, useState } from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { useNavigate } from "react-router-dom";
import HeroImageSlider from "../Components/HeroImageSlider";
import { FiPhoneCall, FiSearch, FiStar } from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";
import { useArtist } from "../Hooks/useArtist";
import { findNearbyArtists, formatDistance } from "../Utils/findNearbyArtists";
import NearbyArtistsMap from "../Components/NearbyArtistsMap";
import { SaveArtistButton } from "../Components/Buttons/SaveArtistButton";
import { MdOutlineVerified, MdCurrencyRupee } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import CallButton from "../Components/Buttons/CallArtistButton";
import WhatsAppButton from "../Components/Buttons/WhatsAppButton";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, user } = useAuth();
  const { fetchArtists, totalNumberOfArtists } = useArtist();

  const [location, setLocation] = useState<string>("");
  const [artistType, setArtistType] = useState<"makeupArtist" | "photographer">(
    "makeupArtist",
  );

  // State for nearby/recommended artists
  const [nearbyArtists, setNearbyArtists] = useState<any[]>([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);

  // Load user's location on mount
  useEffect(() => {
    if (userProfile?.location) {
      setLocation(userProfile.location);
    }
  }, [userProfile]);

  // Load and filter nearby artists
  useEffect(() => {
    const loadNearbyArtists = async () => {
      setIsLoadingArtists(true);
      try {
        const allArtists = await fetchArtists();

        if (!allArtists || allArtists.length === 0) {
          setNearbyArtists([]);
          setIsLoadingArtists(false);
          return;
        }

        // If user is logged in and has location
        if (user && userProfile?.latitude && userProfile?.longitude) {
          const nearby = findNearbyArtists(
            userProfile.latitude,
            userProfile.longitude,
            allArtists,
            150, // 150 KM search radius
          );
          // Take top 4 closest
          setNearbyArtists(nearby.slice(0, 4));
        } else {
          // For non-logged-in users, show 4 random artists
          const shuffled = [...allArtists].sort(() => Math.random() - 0.5);
          setNearbyArtists(shuffled.slice(0, 4));
        }
      } catch (error) {
        console.error("Error loading nearby artists:", error);
        setNearbyArtists([]);
      } finally {
        setIsLoadingArtists(false);
      }
    };

    loadNearbyArtists();
  }, [user, userProfile, fetchArtists]);

  const handleLoginRequired = () => {
    navigate("/user-login");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (artistType) {
      params.set("artistType", artistType);
    }

    navigate(`/search-artist?${params.toString()}`);
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(177,43,49,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,109,47,0.08),transparent_32%),#fdf8f9]  font-sans">
      {/* NAVBAR */}
      <Navbar />

      <main className="pt-24 px-4">
        {/* HERO */}
        <section className="relative px-6 py-12 md:py-5 overflow-hidden">
          <div className=" mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                Find Affordable{" "}
                <span className="text-[#b12b31] italic">Makeup Artists</span> &
                Photographers Near You
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                Compare prices, see real work, and book trusted local
                professionals for your special day.
              </p>

              {/* SEARCH */}
              <div className="bg-white p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your village or town"
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-lg outline-none"
                />

                <select
                  value={artistType}
                  onChange={(e) =>
                    setArtistType(
                      e.target.value as "makeupArtist" | "photographer",
                    )
                  }
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-lg outline-none"
                >
                  <option value="makeupArtist">Makeup Artist</option>
                  <option value="photographer">Photographer</option>
                </select>

                <button
                  onClick={handleSearch}
                  className="bg-[#b12b31] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold hover:scale-105 transition cursor-pointer"
                >
                  Search Now
                </button>
              </div>

              {/* TRUST */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex items-center gap-2 font-bold">
                  ⭐ 4.8 rating
                </div>
                <div className="flex items-center gap-2 font-bold">
                  ❤️ 1,000+ bookings
                </div>
                <div className="flex items-center gap-2 font-bold text-green-600">
                  ✔ Verified Artists
                </div>
              </div>
            </div>
            <HeroImageSlider />
          </div>
        </section>

        {/* ARTISTS SECTION */}
        <section className="mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {user && userProfile?.latitude
                  ? "Artists Near You"
                  : "Recommended Professionals"}
              </h2>
              <p className="text-gray-500">
                {user && userProfile?.latitude
                  ? "Top rated artists in your area"
                  : "Handpicked for quality and affordability."}
              </p>
            </div>
            <button
              onClick={() => navigate("/search-artist")}
              className="text-[#b12b31] font-bold hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          {/* Artists Grid */}
          {isLoadingArtists ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full border-4 border-[#f0d6d8]" />
                  <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-[#b12b31] border-t-transparent" />
                </div>
                <p className="text-gray-600">Loading artists...</p>
              </div>
            </div>
          ) : nearbyArtists.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyArtists.map((artist) => (
                <div
                  key={artist.uid}
                  className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <img
                      src={
                        artist.profilePicture ||
                        "https://via.placeholder.com/300x300"
                      }
                      alt={artist.fullName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Verified Badge */}
                    {artist.verified && (
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-800 shadow-sm">
                        <MdOutlineVerified size={12} />
                        Verified
                      </div>
                    )}

                    {/* Distance Badge */}
                    {artist.distanceFromUser && (
                      <div className="absolute right-3 top-3 rounded-full bg-[#b12b31] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                        {formatDistance(artist.distanceFromUser)}
                      </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-3.5">
                    {/* Name & Price */}
                    <div className="mb-2.5 flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#1c1b1c] truncate">
                          {artist.fullName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5 bg-[#fff7f7] rounded px-1.5 py-0.5 whitespace-nowrap">
                        <MdCurrencyRupee className="text-[#b12b31]" size={14} />
                        <span className="text-xs font-bold text-[#b12b31]">
                          {artist.startingPrice || "POA"}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-2.5 flex items-center gap-1 text-xs text-gray-600">
                      <IoLocation size={12} className="shrink-0" />
                      <span className="truncate">{artist.location}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1.5">
                      <CallButton
                        phone={artist.phone}
                        name={artist.fullName}
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#b12b31] px-2 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                      />
                      <WhatsAppButton
                        phone={artist.phone}
                        name={artist.fullName}
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#006d2f] px-2 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                      />

                      <button
                        onClick={() =>
                          navigate(`/artist-profile/${artist.uid}`)
                        }
                        className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-[#eadbdd] bg-[#fcf8f8] px-2 py-2 text-xs font-bold text-[#4d4635] transition-all hover:border-[#b12b31]/30 hover:bg-[#fff7f7] active:scale-95 cursor-pointer"
                      >
                        <FaRegEye size={12} />
                      </button>

                      <div className="flex items-center justify-center">
                        <SaveArtistButton
                          artistId={artist.uid}
                          variant="icon-only"
                          onLoginRequired={handleLoginRequired}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e7d8d9] bg-white/70 py-16 text-center">
              <div className="mb-4 text-5xl">🎨</div>
              <h3 className="text-lg font-bold text-[#1c1b1c]">
                No Artists Available
              </h3>
              <p className="mt-2 text-sm text-gray-600 max-w-sm">
                {user && userProfile?.latitude
                  ? "No artists are available in your service area at the moment."
                  : "Please log in to see artists near you."}
              </p>
              {!user && (
                <button
                  onClick={() => navigate("/user-login")}
                  className="mt-4 rounded-lg bg-[#b12b31] px-6 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 cursor-pointer"
                >
                  Sign In to See Nearby Artists
                </button>
              )}
            </div>
          )}
        </section>

        {/* HOW IT WORKS */}
        <section className="relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#ff9591]/10 blur-3xl rounded-full" />

          <div className="relative mx-auto px-4">
            {/* Heading */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center rounded-full bg-[#b12b31]/10 px-4 py-1 text-sm font-semibold text-[#b12b31]">
                Simple Process
              </span>

              <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                How It Works
              </h2>

              <p className="mt-4 text-lg text-[#4d4635] max-w-2xl mx-auto">
                Find and book the perfect makeup artists & photographers for
                your special moments in just 3 simple steps.
              </p>
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Search Artists",
                  desc: "Discover verified makeup artists & photographers near your location.",
                  icon: <FiSearch />,
                  step: "01",
                },
                {
                  title: "Compare Profiles",
                  desc: "Check pricing, portfolios, ratings, reviews & service packages.",
                  icon: <FiStar />,
                  step: "02",
                },
                {
                  title: "Book Directly",
                  desc: "Call, WhatsApp or request booking instantly without middlemen.",
                  icon: <FiPhoneCall />,
                  step: "03",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl border border-[#f1d7d9] bg-white/80 backdrop-blur-sm p-8 shadow-[0_10px_40px_-15px_rgba(177,43,49,0.15)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(177,43,49,0.25)] "
                >
                  {/* Large Step Number */}
                  <div className="absolute right-4 top-2 text-6xl md:text-7xl font-black text-[#b12b31]/15 select-none pointer-events-none">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b12b31] text-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-[#4d4635]">
                    {item.desc}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-br from-[#ff9591]/5 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto px-4 sm:px-6 py-20">
          <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#b12b31] via-[#9e1f2c] to-[#7f1720] px-6 py-12 sm:px-10 md:px-14 lg:px-20">
            {/* Background Glow */}
            <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#ffb3b3]/10 blur-3xl" />

            {/* Decorative Shapes */}
            <div className="absolute top-8 right-8 hidden md:block">
              <div className="h-28 w-28 rounded-full border border-white/10" />
            </div>

            <div className="absolute bottom-10 left-10 hidden lg:block">
              <div className="h-16 w-16 rounded-2xl border border-white/10 rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left Content */}
              <div className="max-w-2xl text-center lg:text-left">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                  Grow Your Career
                </span>

                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                  Are You a Professional Artist?
                </h2>

                <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
                  Join thousands of talented makeup artists and photographers
                  connecting with clients every day. Build your profile,
                  showcase your portfolio, and grow your business faster.
                </p>

                {/* Stats */}
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                  {[
                    { value: "10K+", label: "Monthly Visitors" },
                    {
                      value: `${totalNumberOfArtists}+`,
                      label: "Verified Artists",
                    },
                    { value: "24/7", label: "Lead Support" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md"
                    >
                      <h3 className="text-2xl font-extrabold">{item.value}</h3>
                      <p className="text-sm text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right CTA */}
              <div className="w-full max-w-md">
                <div className="rounded-4xl border border-white/10 bg-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-3">
                    Start Your Journey Today
                  </h3>

                  <p className="text-white/75 leading-relaxed mb-8">
                    Create your professional profile and start receiving
                    bookings from nearby customers instantly.
                  </p>

                  <button
                    onClick={() => navigate("/artist-registration")}
                    className="group w-full rounded-2xl bg-white px-6 py-4 text-lg font-bold text-[#b12b31] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Join Now
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>

                  <p className="mt-4 text-center text-sm text-white/60">
                    Free registration • No hidden charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map at bottom to avoid scroll hijack */}
        {user && userProfile?.latitude && nearbyArtists.length > 0 && (
          <section className="mx-auto px-4 sm:px-6 pb-20">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold">
                  Artist Locations on Map
                </h2>
                <p className="text-gray-500">
                  See the closest professionals who can reach your location.
                </p>
              </div>
            </div>

            <NearbyArtistsMap
              userLocation={{
                latitude: userProfile.latitude,
                longitude: userProfile.longitude || 0,
              }}
              artists={nearbyArtists}
            />
          </section>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
