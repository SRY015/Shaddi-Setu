// import { useCallback, useState } from "react";
// import { useAuth } from "../Context/AuthContext";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   limit,
//   startAfter,
//   orderBy,
// } from "firebase/firestore";
// import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
// import { COLLECTIONS, db } from "../Config/firebaseConfig";

// //   custom hook to perform all type of operations with artists
// export const useArtist = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [lastDoc, setLastDoc] =
//     useState<QueryDocumentSnapshot<DocumentData> | null>(null);
//   const [hasMore, setHasMore] = useState(true);

//   // const fetchArtists = useCallback(async () => {
//   //   try {
//   //     setLoading(true);

//   //     const q = query(
//   //       collection(db, COLLECTIONS.artists),
//   //       where("role", "in", ["MakeupArtist", "Photographer"]),
//   //       where("profileCompletion", "==", 100),
//   //     );

//   //     const snap = await getDocs(q);

//   //     const data = snap.docs.map((doc) => ({
//   //       // id: doc.id,
//   //       ...doc.data(),
//   //     }));
//   //     return data;
//   //   } catch (err) {
//   //     console.log(err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }, [user]);

//   const fetchArtists = useCallback(
//     async (isNextPage = false) => {
//       try {
//         setLoading(true);

//         let q;

//         if (isNextPage && lastDoc) {
//           q = query(
//             collection(db, COLLECTIONS.artists),
//             where("role", "in", ["MakeupArtist", "Photographer"]),
//             where("profileCompletion", "==", 100),
//             orderBy("createdAt", "desc"),
//             startAfter(lastDoc),
//             limit(2),
//           );
//         } else {
//           ((q = query(collection(db, COLLECTIONS.artists))),
//             where("role", "in", ["MakeupArtist", "Photographer"]),
//             where("profileCompletion", "==", 100),
//             orderBy("createdAt", "desc"),
//             limit(2));
//         }
//         const snap = await getDocs(q);
//         const data = snap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         // Store last document for next page
//         const lastVisible = snap.docs[snap.docs.length - 1];
//         setLastDoc(lastVisible || null);
//         // Check if more docs exist
//         setHasMore(snap.docs.length === 2);
//         return data;
//       } catch (error) {
//         console.log(error);
//         return [];
//       } finally {
//         setLoading(false);
//       }
//     },
//     [lastDoc, user],
//   );

//   return {
//     loading,
//     fetchArtists,
//     hasMore,
//   };
// };

import { useCallback, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { COLLECTIONS, db } from "../Config/firebaseConfig";

export const useArtist = () => {
  const [loading, setLoading] = useState(false);
  const [totalNumberOfArtists, setTotalNumberOfArtists] = useState<number>(0);

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, COLLECTIONS.artists),
        where("role", "in", ["makeupArtist", "photographer"]),
        where("profileCompletion", "==", 100),
        orderBy("createdAt", "desc"),
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTotalNumberOfArtists(data.length);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    fetchArtists,
    totalNumberOfArtists,
  };
};
