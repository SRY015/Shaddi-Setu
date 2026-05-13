import React from "react";
import { useComparison } from "../Context/ComparisonContext";
import { MdCompareArrows, MdClose } from "react-icons/md";

interface ComparisonBadgeProps {
  onCompareClick: () => void;
}

const ComparisonBadge: React.FC<ComparisonBadgeProps> = ({
  onCompareClick,
}) => {
  const { selectedArtists, clearComparison } = useComparison();

  if (selectedArtists.length < 2) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#b12b31] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      {/* Badge Content */}
      <div className="flex items-center gap-2 px-5 py-3">
        <MdCompareArrows size={20} className="text-white" />
        <span className="text-sm font-bold text-white">
          {selectedArtists.length} Artists Selected
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 pr-1">
        <button
          onClick={onCompareClick}
          className="bg-white text-[#b12b31] px-4 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          Compare
        </button>

        <button
          onClick={clearComparison}
          className="bg-white/20 text-white p-2 rounded-full transition-all hover:bg-white/30 active:scale-95 cursor-pointer"
          title="Clear selection"
        >
          <MdClose size={16} />
        </button>
      </div>
    </div>
  );
};

export default ComparisonBadge;
