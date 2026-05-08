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
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { COLLECTIONS, db } from "../Config/firebaseConfig";

const PAGE_SIZE = 2;

export const useArtist = () => {
  const [loading, setLoading] = useState(false);

  // current page last doc
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  // history for previous pages
  const [pageHistory, setPageHistory] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  // check next page exists
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchArtists = useCallback(
    async (direction?: "next" | "prev") => {
      try {
        setLoading(true);

        let q;

        // BASE QUERY
        const baseQuery = [
          where("role", "in", ["makeupArtist", "photographer"]),
          where("profileCompletion", "==", 100),
          orderBy("createdAt", "desc"),
        ];

        // FIRST PAGE
        if (!direction) {
          q = query(
            collection(db, COLLECTIONS.artists),
            ...baseQuery,
            limit(PAGE_SIZE),
          );
        }

        // NEXT PAGE
        else if (direction === "next" && lastDoc) {
          setPageHistory((prev) => [...prev, lastDoc]);

          q = query(
            collection(db, COLLECTIONS.artists),
            ...baseQuery,
            startAfter(lastDoc),
            limit(PAGE_SIZE),
          );
        }

        // PREVIOUS PAGE
        else if (direction === "prev") {
          const history = [...pageHistory];

          history.pop();

          const prevDoc = history[history.length - 1];

          setPageHistory(history);

          if (prevDoc) {
            q = query(
              collection(db, COLLECTIONS.artists),
              ...baseQuery,
              startAfter(prevDoc),
              limit(PAGE_SIZE),
            );
          } else {
            q = query(
              collection(db, COLLECTIONS.artists),
              ...baseQuery,
              limit(PAGE_SIZE),
            );
          }
        }

        const snap = await getDocs(q!);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // SAVE LAST DOC
        const lastVisible = snap.docs[snap.docs.length - 1];

        setLastDoc(lastVisible || null);

        // CHECK NEXT PAGE
        setHasNextPage(snap.docs.length === PAGE_SIZE);

        return data;
      } catch (err) {
        console.log(err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [lastDoc, pageHistory],
  );

  return {
    loading,
    fetchArtists,
    hasNextPage,
    hasPreviousPage: pageHistory.length > 0,
  };
};
