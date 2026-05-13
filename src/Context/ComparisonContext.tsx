import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ArtistProfile } from "../Types/artistTypes";

interface ComparisonContextType {
  selectedArtists: ArtistProfile[];
  addToComparison: (artist: ArtistProfile) => {
    success: boolean;
    message?: string;
  };
  removeFromComparison: (artistId: string) => void;
  clearComparison: () => void;
  isInComparison: (artistId: string) => boolean;
  canAddMore: () => boolean;
  getSelectedRole: () => string | null;
  canAddArtist: (artist: ArtistProfile) => { canAdd: boolean; reason?: string };
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined,
);

const MAX_ARTISTS_TO_COMPARE = 3;

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedArtists, setSelectedArtists] = useState<ArtistProfile[]>([]);

  const getSelectedRole = () => {
    return selectedArtists.length > 0 ? selectedArtists[0].role : null;
  };

  const canAddArtist = (artist: ArtistProfile) => {
    if (!artist.uid) {
      return { canAdd: false, reason: "Invalid artist" };
    }

    if (isInComparison(artist.uid)) {
      return { canAdd: false, reason: "Already selected" };
    }

    if (selectedArtists.length >= MAX_ARTISTS_TO_COMPARE) {
      return {
        canAdd: false,
        reason: `Maximum ${MAX_ARTISTS_TO_COMPARE} artists allowed`,
      };
    }

    const selectedRole = getSelectedRole();
    if (selectedRole && selectedRole !== artist.role) {
      return {
        canAdd: false,
        reason: `Cannot compare ${artist.role === "makeupArtist" ? "Makeup Artists" : "Photographers"} with ${selectedRole === "makeupArtist" ? "Makeup Artists" : "Photographers"}`,
      };
    }

    return { canAdd: true };
  };

  const addToComparison = (artist: ArtistProfile) => {
    const validation = canAddArtist(artist);

    if (!validation.canAdd) {
      return { success: false, message: validation.reason };
    }

    setSelectedArtists((prev) => [...prev, artist]);
    return { success: true };
  };

  const removeFromComparison = (artistId: string) => {
    setSelectedArtists((prev) =>
      prev.filter((artist) => artist.uid !== artistId),
    );
  };

  const clearComparison = () => {
    setSelectedArtists([]);
  };

  const isInComparison = (artistId: string) => {
    return selectedArtists.some((artist) => artist.uid === artistId);
  };

  const canAddMore = () => {
    return selectedArtists.length < MAX_ARTISTS_TO_COMPARE;
  };

  const value: ComparisonContextType = {
    selectedArtists,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore,
    getSelectedRole,
    canAddArtist,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
};
