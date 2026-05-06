import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useSaveArtist } from "../Hooks/useSaveArtist";
import { useAuth } from "../Context/AuthContext";

interface SaveArtistButtonProps {
  artistId: string;
  className?: string;
  showLabel?: boolean;
  variant?: "icon-only" | "with-label";
  onLoginRequired?: () => void;
}

/**
 * SaveArtistButton Component
 * Allows customers to save/unsave artists with a heart icon
 * - Shows unfilled heart when not saved
 * - Shows filled red heart when saved
 * - Requires authentication
 */
export const SaveArtistButton = ({
  artistId,
  className = "",
  //   showLabel = false,
  variant = "icon-only",
  onLoginRequired,
}: SaveArtistButtonProps) => {
  const { user } = useAuth();
  const { loading, isSaved, toggleSaveArtist, checkIfSaved } = useSaveArtist();

  useEffect(() => {
    // Check if artist is already saved when component mounts
    if (user && artistId) {
      checkIfSaved(artistId);
    }
  }, [user, artistId, checkIfSaved]);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!user) {
      onLoginRequired?.();
      return;
    }

    // Toggle save/unsave
    await toggleSaveArtist(artistId);
  };

  if (variant === "icon-only") {
    return (
      <button
        onClick={handleSaveClick}
        disabled={loading}
        className={`p-2 rounded-lg transition-all hover:bg-[#b12b31]/10 disabled:opacity-50 ${className}`}
        title={isSaved ? "Remove from saved" : "Add to saved"}
      >
        {isSaved ? (
          <FaHeart className="text-[#b12b31] text-xl" />
        ) : (
          <FiHeart className="text-[#b12b31] text-xl hover:text-[#b12b31]" />
        )}
      </button>
    );
  }

  // Variant with label
  return (
    <button
      onClick={handleSaveClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 h-14 px-6 rounded-xl transition-all disabled:opacity-50 ${
        isSaved
          ? "bg-[#b12b31] text-white"
          : "bg-[#f0e8ea] text-[#b12b31] hover:bg-[#e6e1e2]"
      } ${className}`}
    >
      {isSaved ? (
        <FaHeart className="text-lg" />
      ) : (
        <FiHeart className="text-lg" />
      )}
      <span className="font-bold font-['Plus_Jakarta_Sans']">
        {isSaved ? "Saved" : "Save"}
      </span>
    </button>
  );
};
