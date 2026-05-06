import { useState, useCallback } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, COLLECTIONS } from "../Config/firebaseConfig";
import { useAuth } from "../Context/AuthContext";

/**
 * Custom hook to manage saving/unsaving artists for customers
 * Stores document references in the customer's savedArtists array
 */
export const useSaveArtist = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  /**
   * Check if an artist is already saved
   */
  const checkIfSaved = useCallback(
    async (artistId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        const customerRef = doc(db, COLLECTIONS.customers, user.uid);
        const customerSnap = await getDoc(customerRef);

        if (customerSnap.exists()) {
          const customerData = customerSnap.data();
          const savedArtists = customerData?.savedArtists || [];

          // Check if the artist is in the saved list
          // Firestore stores references as DocumentReference objects
          const isArtistSaved = savedArtists.some((ref: any) => {
            // Check both by comparing path and by comparing the reference equality
            if (ref && typeof ref === "object") {
              const refPath = ref.path || ref._key?.path;
              const expectedPath = `${COLLECTIONS.artists}/${artistId}`;
              return refPath === expectedPath || ref.id === artistId;
            }
            return false;
          });

          setIsSaved(isArtistSaved);
          return isArtistSaved;
        }

        setIsSaved(false);
        return false;
      } catch (error) {
        console.error("Error checking if artist is saved:", error);
        return false;
      }
    },
    [user],
  );

  /**
   * Save an artist to the customer's saved list
   */
  const saveArtist = useCallback(
    async (artistId: string): Promise<boolean> => {
      if (!user) {
        console.warn("User must be logged in to save artists");
        return false;
      }

      try {
        setLoading(true);

        const customerRef = doc(db, COLLECTIONS.customers, user.uid);
        const artistRef = doc(db, COLLECTIONS.artists, artistId);

        // Add artist reference to savedArtists array
        await updateDoc(customerRef, {
          savedArtists: arrayUnion(artistRef),
        });

        setIsSaved(true);
        return true;
      } catch (error) {
        console.error("Error saving artist:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  /**
   * Remove an artist from the customer's saved list
   */
  const unsaveArtist = useCallback(
    async (artistId: string): Promise<boolean> => {
      if (!user) {
        console.warn("User must be logged in to unsave artists");
        return false;
      }

      try {
        setLoading(true);

        const customerRef = doc(db, COLLECTIONS.customers, user.uid);
        const artistRef = doc(db, COLLECTIONS.artists, artistId);

        // Remove artist reference from savedArtists array
        await updateDoc(customerRef, {
          savedArtists: arrayRemove(artistRef),
        });

        setIsSaved(false);
        return true;
      } catch (error) {
        console.error("Error unsaving artist:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  /**
   * Toggle save/unsave status
   */
  const toggleSaveArtist = useCallback(
    async (artistId: string): Promise<boolean> => {
      if (isSaved) {
        return unsaveArtist(artistId);
      } else {
        return saveArtist(artistId);
      }
    },
    [isSaved, saveArtist, unsaveArtist],
  );

  return {
    loading,
    isSaved,
    saveArtist,
    unsaveArtist,
    toggleSaveArtist,
    checkIfSaved,
  };
};
