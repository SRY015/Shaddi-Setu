import React from "react";
import type { ArtistProfile } from "../Types/artistTypes";
import {
  MdCall,
  MdOutlineVerified,
  MdCurrencyRupee,
  MdClose,
} from "react-icons/md";
import { FaWhatsapp, FaRegEye } from "react-icons/fa";
import { IoLocation, IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SaveArtistButton } from "./Buttons/SaveArtistButton";
import { useComparison } from "../Context/ComparisonContext";

interface ComparisonCardProps {
  artist: ArtistProfile;
  onLoginRequired?: () => void;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  artist,
  onLoginRequired,
}) => {
  const navigate = useNavigate();
  const { removeFromComparison } = useComparison();

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
    <div className="relative shrink-0 w-full sm:w-96 rounded-2xl border border-white/60 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
      {/* Remove Button */}
      <button
        onClick={() => artist.uid && removeFromComparison(artist.uid)}
        className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-[#b12b31] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
        title="Remove from comparison"
      >
        <MdClose size={20} />
      </button>

      {/* Profile Picture Section */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={artist.profilePicture || "https://via.placeholder.com/300x300"}
          alt={artist.fullName}
          className="h-full w-full object-cover"
        />

        {/* Verified Badge */}
        {artist.verified && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-800 shadow-sm">
            <MdOutlineVerified size={14} />
            Verified
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-6">
        {/* Name & Type */}
        <div>
          <h3 className="text-lg font-bold text-[#1c1b1c] truncate">
            {artist.fullName}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {artist.designation || artist.role === "photographer"
              ? "Photographer"
              : "Makeup Artist"}
          </p>
        </div>

        {/* 1. PRICING SECTION */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-bold text-[#b12b31] mb-3 flex items-center gap-2">
            <MdCurrencyRupee size={16} />
            Pricing & Packages
          </h4>

          {artist.startingPrice && (
            <div className="mb-3 flex items-center gap-2 bg-[#fff7f7] rounded-lg p-2">
              <MdCurrencyRupee className="text-[#b12b31]" size={16} />
              <div>
                <p className="text-xs text-gray-600">Starting from</p>
                <p className="text-sm font-bold text-[#b12b31]">
                  ₹{artist.startingPrice.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {artist.servicePackages && artist.servicePackages.length > 0 ? (
            <div className="space-y-2 text-xs">
              {artist.servicePackages.slice(0, 3).map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-lg bg-gray-50 p-2 border border-gray-200"
                >
                  <p className="font-semibold text-gray-800">{pkg.title}</p>
                  <p className="text-[#b12b31] font-bold">
                    ₹{pkg.price.toLocaleString()}
                  </p>
                  {pkg.description && (
                    <p className="text-gray-600 mt-1 line-clamp-2">
                      {pkg.description}
                    </p>
                  )}
                </div>
              ))}
              {artist.servicePackages.length > 3 && (
                <p className="text-center text-gray-600 italic">
                  +{artist.servicePackages.length - 3} more packages
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-600 italic">
              Contact for custom pricing
            </p>
          )}
        </div>

        {/* 2. RATINGS SECTION */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-bold text-[#b12b31] mb-3 flex items-center gap-2">
            <IoStar size={16} />
            Ratings & Reviews
          </h4>

          <div className="flex items-center gap-3 bg-[#fff8e6] rounded-lg p-3">
            {renderStars(4.5)}
            <div>
              <p className="font-bold text-sm text-[#745c00]">4.5</p>
              <p className="text-xs text-[#8a7200]">Based on reviews</p>
            </div>
          </div>
        </div>

        {/* 3. AVAILABILITY SECTION */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-bold text-[#b12b31] mb-3">
            Service Hours
          </h4>

          {artist.serviceHours && artist.serviceHours.length > 0 ? (
            <div className="space-y-2 text-xs">
              {artist.serviceHours.slice(0, 7).map((hour) => (
                <div
                  key={hour.day}
                  className={`rounded-lg p-2 ${
                    hour.isOff
                      ? "bg-gray-100 text-gray-600"
                      : "bg-[#f6fff8] border border-[#cce7d5]"
                  }`}
                >
                  <p className="font-semibold text-gray-800">{hour.day}</p>
                  {!hour.isOff ? (
                    <p className="text-gray-600 mt-1">
                      {hour.morningStart}-{hour.morningEnd}, {hour.eveningStart}
                      -{hour.eveningEnd}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Off</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-600 italic">
              Contact for availability
            </p>
          )}
        </div>

        {/* 4. EXPERIENCE & SPECIALIZATION */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-bold text-[#b12b31] mb-3">
            About & Experience
          </h4>

          {artist.bio ? (
            <p className="text-xs leading-relaxed text-gray-700 bg-gray-50 rounded-lg p-3 line-clamp-4">
              {artist.bio}
            </p>
          ) : (
            <p className="text-xs text-gray-600 italic">
              No description available
            </p>
          )}
        </div>

        {/* 5. LOCATION & SERVICE RANGE */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-bold text-[#b12b31] mb-3 flex items-center gap-2">
            <IoLocation size={16} />
            Location & Service Range
          </h4>

          {artist.location && (
            <div className="rounded-lg bg-[#f9f8f8] p-3 text-xs space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Location:</span>{" "}
                {artist.location}
              </p>

              {artist.travelDistance && (
                <p className="text-gray-700">
                  <span className="font-semibold">Service Radius:</span>{" "}
                  {artist.travelDistance} KM
                </p>
              )}

              {artist.latitude && artist.longitude && (
                <p className="text-gray-600 text-[10px]">
                  📍 {artist.latitude.toFixed(2)}, {artist.longitude.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                if (artist.phone) {
                  window.location.href = `tel:${artist.phone}`;
                }
              }}
              className="flex items-center justify-center gap-1 rounded-lg bg-[#b12b31] px-3 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 cursor-pointer"
            >
              <MdCall size={14} />
              Call
            </button>

            <button
              onClick={() => {
                if (artist.phone) {
                  const phone = artist.phone.replace(/\D/g, "");
                  const message = encodeURIComponent(
                    `Hi ${artist.fullName}, I found you on Gramin Vivah and would like to know more about your services.`,
                  );
                  window.open(
                    `https://wa.me/${phone}?text=${message}`,
                    "_blank",
                  );
                }
              }}
              className="flex items-center justify-center gap-1 rounded-lg bg-[#006d2f] px-3 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 cursor-pointer"
            >
              <FaWhatsapp size={12} />
              Chat
            </button>
          </div>

          <button
            onClick={() => navigate(`/artist-profile/${artist.uid}`)}
            className="w-full flex items-center justify-center gap-1 rounded-lg border border-[#eadbdd] bg-[#fcf8f8] px-3 py-2 text-xs font-bold text-[#4d4635] transition-all hover:border-[#b12b31]/30 hover:bg-[#fff7f7] active:scale-95 cursor-pointer"
          >
            <FaRegEye size={12} />
            Full Profile
          </button>

          <div>
            <SaveArtistButton
              artistId={artist.uid || ""}
              variant="with-label"
              onLoginRequired={onLoginRequired}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
