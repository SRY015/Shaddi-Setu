import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { useComparison } from "../Context/ComparisonContext";
import type { ArtistProfile } from "../Types/artistTypes";
import {
  MdArrowBack,
  MdDeleteSweep,
  MdCall,
  MdOutlineVerified,
  MdCurrencyRupee,
  MdClose,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { SaveArtistButton } from "../Components/Buttons/SaveArtistButton";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const CompareArtistsPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedArtists, clearComparison, removeFromComparison } =
    useComparison();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleLoginRequired = () => {
    navigate("/user-login");
  };

  const handleClearComparison = () => {
    clearComparison();
    setShowClearConfirm(false);
    navigate("/search-artist");
  };

  // Empty state - no artists selected
  if (selectedArtists.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcf8f8] flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16">
          <div className="text-center max-w-md">
            <div className="mb-6 text-6xl">🔍</div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1c1b1c] mb-3">
              No Artists Selected
            </h1>
            <p className="text-gray-600 mb-8">
              Select 2 or more artists from search results to compare their
              profiles, pricing, and services.
            </p>
            <button
              onClick={() => navigate("/search-artist")}
              className="bg-[#b12b31] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer"
            >
              Go to Search
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const renderStars = (count: number) => {
    const fullStars = Math.floor(count);
    const hasHalf = count % 1 !== 0;

    return (
      <div className="flex items-center text-[#c48b11] gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-sm">
            <IoStar />
          </span>
        ))}

        {hasHalf && (
          <span className="text-sm">
            <IoStarHalf />
          </span>
        )}

        {!hasHalf &&
          fullStars < 5 &&
          [...Array(5 - fullStars)].map((_, i) => (
            <span key={`empty-${i}`} className="text-sm opacity-40">
              <IoStarOutline />
            </span>
          ))}
      </div>
    );
  };

  const comparisonRows = [
    {
      label: "Profile Picture",
      key: "profilePicture",
      render: (artist: ArtistProfile) => (
        <div className="flex justify-center">
          <img
            src={artist.profilePicture || "https://via.placeholder.com/100"}
            alt={artist.fullName}
            className="h-24 w-24 rounded-2xl object-cover border border-[#e0d5d7]"
          />
        </div>
      ),
    },
    {
      label: "Name & Status",
      key: "name",
      render: (artist: ArtistProfile) => (
        <div>
          <p className="font-bold text-[#1c1b1c] text-sm md:text-base">
            {artist.fullName}
          </p>
          {artist.verified && (
            <div className="flex items-center gap-1 mt-2 text-xs text-yellow-700 bg-yellow-50 w-fit px-2 py-1 rounded-full">
              <MdOutlineVerified size={12} />
              Verified
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Role",
      key: "role",
      render: (artist: ArtistProfile) => (
        <p className="text-sm md:text-base capitalize">
          {artist.role === "makeupArtist" ? "Makeup Artist" : "Photographer"}
        </p>
      ),
    },
    {
      label: "Rating",
      key: "rating",
      render: (artist: ArtistProfile) => (
        <div className="flex items-center gap-2">
          {renderStars(Number(artist.rating || 4.5))}
          <span className="font-bold text-sm md:text-base">
            {artist.rating || "4.5"}
          </span>
        </div>
      ),
    },
    {
      label: "Starting Price",
      key: "startingPrice",
      render: (artist: ArtistProfile) => (
        <div className="flex items-center gap-1">
          <MdCurrencyRupee className="text-[#b12b31]" size={18} />
          <span className="font-bold text-[#b12b31] text-base md:text-lg">
            {artist.startingPrice || "POA"}
          </span>
        </div>
      ),
    },
    {
      label: "Bio & Expertise",
      key: "bio",
      render: (artist: ArtistProfile) => (
        <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
          {artist.bio || "No bio available"}
        </p>
      ),
    },
    {
      label: "Designation",
      key: "designation",
      render: (artist: ArtistProfile) => (
        <p className="text-sm md:text-base">
          {artist.designation || "Professional"}
        </p>
      ),
    },
    {
      label: "Location",
      key: "location",
      render: (artist: ArtistProfile) => (
        <p className="text-sm md:text-base">
          {artist.location || "Not specified"}
        </p>
      ),
    },
    {
      label: "Service Range",
      key: "travelDistance",
      render: (artist: ArtistProfile) => (
        <p className="text-sm md:text-base font-semibold">
          {artist.travelDistance || 10} KM
        </p>
      ),
    },
    {
      label: "Service Packages",
      key: "packages",
      render: (artist: ArtistProfile) => (
        <div className="space-y-2">
          {artist.servicePackages && artist.servicePackages.length > 0 ? (
            artist.servicePackages.slice(0, 3).map((pkg: any, idx: number) => (
              <div
                key={idx}
                className="text-xs md:text-sm bg-[#fff7f7] rounded-lg p-2 border border-[#f1d7d9]"
              >
                <p className="font-semibold text-[#1c1b1c]">{pkg.title}</p>
                <p className="text-[#b12b31] font-bold">
                  ₹{pkg.price?.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No packages listed</p>
          )}
        </div>
      ),
    },
    {
      label: "Availability",
      key: "availability",
      render: (artist: ArtistProfile) => (
        <div className="text-xs md:text-sm space-y-1">
          {artist.serviceHours && artist.serviceHours.length > 0 ? (
            <>
              <p className="font-semibold text-[#1c1b1c] mb-2">Service Days:</p>
              <div className="space-y-1">
                {artist.serviceHours
                  .slice(0, 3)
                  .map((hour: any, idx: number) => (
                    <p key={idx} className="text-gray-600">
                      <span className="font-semibold capitalize">
                        {hour.day}:
                      </span>{" "}
                      {hour.morning && <span>Morning</span>}
                      {hour.morning && hour.evening && <span>, </span>}
                      {hour.evening && <span>Evening</span>}
                    </p>
                  ))}
                {artist.serviceHours.length > 3 && (
                  <p className="text-gray-500 text-xs">
                    +{artist.serviceHours.length - 3} more days
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No availability info</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(177,43,49,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,109,47,0.08),transparent_32%),#fdf8f9]">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-105 w-105 rounded-full bg-[#b12b31]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-95 w-95 rounded-full bg-[#006d2f]/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="mx-auto px-4 py-24 md:px-6 font-['Lexend']">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:gap-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#b12b31] font-bold hover:gap-3 transition-all cursor-pointer w-fit"
          >
            <MdArrowBack size={20} />
            Back to Search
          </button>

          {/* Title */}
          <div className="relative overflow-hidden rounded-4xl border border-white/60 bg-white/70 backdrop-blur-xl px-6 py-10 md:px-10">
            <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-[#b12b31]/10 blur-3xl" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                Compare Artists
              </h1>

              <p className="mt-3 text-gray-600">
                Detailed side-by-side comparison of{" "}
                <span className="font-bold text-[#b12b31]">
                  {selectedArtists.length}
                </span>{" "}
                artists across pricing, experience, availability, and more.
              </p>

              {/* Header Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/search-artist")}
                  className="rounded-lg bg-[#b12b31] text-white px-6 py-2.5 font-bold text-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                >
                  Add More Artists
                </button>

                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="rounded-lg border border-[#eadbdd] bg-white px-6 py-2.5 font-bold text-sm text-[#4d4635] transition-all hover:bg-[#fff7f7] active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <MdDeleteSweep size={16} />
                  Clear Comparison
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-4xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_30px_80px_-35px_rgba(28,27,28,0.18)]">
          <table className="w-full border-collapse">
            <tbody>
              {comparisonRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-[#f1d7d9] ${
                    rowIndex % 2 === 0 ? "bg-white/50" : "bg-[#fcf8f8]"
                  } transition-colors duration-200 hover:bg-[#fff7f7]`}
                >
                  {/* Criteria Column */}
                  <td className="sticky left-0 z-10 w-32 md:w-40 bg-inherit px-4 md:px-6 py-5 md:py-6 font-bold text-[#1c1b1c] text-sm md:text-base border-r border-[#e0d5d7]">
                    {row.label}
                  </td>

                  {/* Artist Columns */}
                  {selectedArtists.map((artist) => (
                    <td
                      key={artist.uid}
                      className="px-4 md:px-6 py-5 md:py-6 text-sm md:text-base min-w-50 md:min-w-62.5 border-r border-[#e0d5d7] last:border-r-0"
                    >
                      {row.render(artist)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Action Buttons Row */}
              <tr className="border-t-2 border-[#b12b31]/20 bg-white/70">
                <td className="sticky left-0 z-10 bg-inherit px-4 md:px-6 py-6 font-bold text-[#1c1b1c] border-r border-[#e0d5d7]">
                  Actions
                </td>

                {selectedArtists.map((artist) => (
                  <td
                    key={artist.uid}
                    className="px-4 md:px-6 py-6 min-w-50 md:min-w-62.5 border-r border-[#e0d5d7] last:border-r-0"
                  >
                    <div className="flex flex-col gap-2">
                      {/* Remove from Comparison Button */}
                      <button
                        onClick={() => removeFromComparison(artist.uid || "")}
                        className="w-full px-3 py-2 rounded-lg border border-red-300 bg-red-50 text-red-600 text-xs md:text-sm font-bold transition-all hover:bg-red-100 active:scale-95 cursor-pointer"
                      >
                        <span className="flex items-center justify-center gap-1">
                          <MdClose size={14} />
                          Remove
                        </span>
                      </button>

                      {/* Call Button */}
                      <button
                        onClick={() => {
                          if (artist.phone) {
                            window.location.href = `tel:${artist.phone}`;
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#b12b31] text-white text-xs md:text-sm font-bold transition-all hover:opacity-90 active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                      >
                        <MdCall size={14} />
                        Call
                      </button>

                      {/* WhatsApp Button */}
                      <button
                        onClick={() => {
                          if (artist.phone) {
                            const phone = artist.phone.replace(/\D/g, "");
                            const message = encodeURIComponent(
                              `Hi ${artist.fullName}, I found you on Gramin Vivah platform and would like to know more about your services.`,
                            );
                            window.open(
                              `https://wa.me/${phone}?text=${message}`,
                              "_blank",
                            );
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#006d2f] text-white text-xs md:text-sm font-bold transition-all hover:opacity-90 active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                      >
                        <FaWhatsapp size={12} />
                        WhatsApp
                      </button>

                      {/* Save Button */}
                      <SaveArtistButton
                        artistId={artist.uid || ""}
                        variant="with-label"
                        onLoginRequired={handleLoginRequired}
                        className="w-full flex! justify-center! h-9!"
                      />

                      {/* View Profile Button */}
                      <button
                        onClick={() =>
                          navigate(`/artist-profile/${artist.uid}`)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#eadbdd] bg-white text-[#4d4635] text-xs md:text-sm font-bold transition-all hover:bg-[#fff7f7] hover:border-[#b12b31]/20 active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                      >
                        <FaRegEye size={12} />
                        View Profile
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Tips */}
          <div className="rounded-2xl border border-[#ead8da] bg-[#fff7f7] p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-[#1c1b1c] mb-4">
              💡 Comparison Tips
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#b12b31]">•</span>
                <span>
                  Compare service packages carefully - different packages offer
                  different features
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b12b31]">•</span>
                <span>
                  Check availability to ensure the artist can service your
                  location and date
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b12b31]">•</span>
                <span>
                  Verified artists have been checked for quality and
                  authenticity
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b12b31]">•</span>
                <span>
                  Contact multiple artists to discuss customization options
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Facts */}
          <div className="rounded-2xl border border-[#d6e7df] bg-[#f6fff8] p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-[#1c1b1c] mb-4">
              ✓ What to Look For
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#006d2f]">•</span>
                <span>
                  Verified badge indicates trusted professionals on our platform
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#006d2f]">•</span>
                <span>
                  Higher ratings reflect customer satisfaction and quality
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#006d2f]">•</span>
                <span>
                  Service range must cover your location for convenient booking
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#006d2f]">•</span>
                <span>
                  Check availability to match your event date and time
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />

      {/* Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold text-[#1c1b1c] mb-3">
              Clear Comparison?
            </h2>
            <p className="text-gray-600 mb-6">
              This will remove all selected artists from the comparison view.
              You can always select them again from the search results.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold transition-all hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleClearComparison}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#b12b31] text-white font-bold transition-all hover:opacity-90 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareArtistsPage;
