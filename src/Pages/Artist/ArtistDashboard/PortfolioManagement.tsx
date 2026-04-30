import { useState, useEffect } from "react";
import { FaRegTrashAlt, FaStar, FaPlayCircle, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { COLLECTIONS, db } from "../../../Config/firebaseConfig";
import uploadToCloudinary from "../../../Utils/uploadToCloudinary";
import { toast } from "react-toastify";
import { warningOpts, successOpts } from "../../../Config/toast";

interface UserProfile {
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
}

const PortfolioManagement = ({
  userProfile,
}: {
  userProfile: UserProfile | null;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userProfile?.uid) return;

      const q = query(
        collection(db, COLLECTIONS.portfolios),
        where("userId", "==", userProfile.uid),
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(data);
    };

    fetchPortfolio();
  }, [userProfile]);

  // ================= VALIDATION =================
  const validateFile = (file: File) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/webm",
    ];

    if (!validTypes.includes(file.type)) {
      toast("Only JPG, PNG, WEBP, MP4, WEBM allowed", warningOpts);
      return false;
    }

    // 50MB limit for videos, 10MB for images
    if (
      (file.type.startsWith("image") && file.size > 10 * 1024 * 1024) ||
      (file.type.startsWith("video") && file.size > 50 * 1024 * 1024)
    ) {
      toast("Image max 10MB, Video max 50MB", warningOpts);
      return false;
    }

    return true;
  };

  // ================= ADD =================
  const handleAddPortfolio = async (file: File) => {
    if (!userProfile?.uid) return;
    if (!validateFile(file)) return;

    try {
      setUploading(true);

      const res = await uploadToCloudinary(file);

      const url = typeof res === "string" ? res : res.url;
      const publicId = typeof res === "string" ? "" : res.public_id;

      const type = file.type.startsWith("video") ? "video" : "image";

      const docRef = await addDoc(collection(db, COLLECTIONS.portfolios), {
        userId: userProfile.uid,
        image: url,
        publicId,
        type,
        title: "New Work",
        subtitle: "Click edit to update",
        featured: false,
        createdAt: new Date(),
      });

      setItems((prev) => [
        {
          id: docRef.id,
          image: url,
          publicId,
          type,
          title: "New Work",
          subtitle: "Click edit to update",
          featured: false,
        },
        ...prev,
      ]);

      toast("Uploaded successfully", successOpts);
    } catch (err) {
      console.log(err);
      toast("Upload failed", warningOpts);
    } finally {
      setUploading(false);
    }
  };

  // ================= DELETE =================
  const removeItem = async (item: any) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.portfolios, item.id));

      // ❗ FRONTEND LIMITATION: cannot securely delete Cloudinary asset
      // So we skip Cloudinary delete for now

      setItems((prev) => prev.filter((i) => i.id !== item.id));

      toast("Deleted successfully", successOpts);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FEATURE =================
  const toggleFeatured = async (id: string) => {
    const updated = items.map((item) => ({
      ...item,
      featured: item.id === id ? !item.featured : false,
    }));

    setItems(updated);

    await Promise.all(
      updated.map((item) =>
        updateDoc(doc(db, COLLECTIONS.portfolios, item.id), {
          featured: item.featured,
        }),
      ),
    );
  };

  // ================= EDIT =================
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      toast("Title required", warningOpts);
      return;
    }

    await updateDoc(doc(db, COLLECTIONS.portfolios, editingItem.id), {
      title: editingItem.title,
      subtitle: editingItem.subtitle,
    });

    setItems((prev) =>
      prev.map((item) => (item.id === editingItem.id ? editingItem : item)),
    );

    setEditingItem(null);
    toast("Updated", successOpts);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f9] px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-24 text-[#1c1b1c]">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">My Portfolio</h1>
        <p className="text-gray-500">
          Showcase your best work to attract more clients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* ADD BUTTON */}
        <label
          htmlFor="portfolioUpload"
          className={`group cursor-pointer aspect-3/4 rounded-2xl border-2 border-dashed border-[#b12b31]/20 bg-[#f7f2f3] flex flex-col items-center justify-center ${
            uploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-[#b12b31]/10 flex items-center justify-center mb-3">
            <IoMdAdd className="text-3xl text-[#b12b31]" />
          </div>

          <p className="text-sm text-gray-500">
            {uploading ? "Uploading..." : "Add Photo / Video"}
          </p>

          <input
            id="portfolioUpload"
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleAddPortfolio(file);
              e.target.value = "";
            }}
          />
        </label>

        {/* ITEMS */}
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white overflow-hidden shadow group"
          >
            <div className="relative aspect-3/4">
              <img src={item.image} className="w-full h-full object-cover" />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaPlayCircle className="text-white text-4xl" />
                </div>
              )}

              {item.featured && (
                <div className="absolute top-3 left-3 bg-yellow-400 px-2 py-1 text-xs font-bold rounded">
                  FEATURED
                </div>
              )}

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
                <button
                  onClick={() => removeItem(item)}
                  className="bg-white p-3 rounded-full"
                >
                  <FaRegTrashAlt />
                </button>

                <button
                  onClick={() => toggleFeatured(item.id)}
                  className="bg-white p-3 rounded-full"
                >
                  <FaStar />
                </button>

                <button
                  onClick={() => setEditingItem(item)}
                  className="bg-white p-3 rounded-full"
                >
                  <FaEdit />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}

        {/* INSIGHT CARD */}
        <div className="sm:col-span-2 xl:col-span-2 bg-[#7b5159] p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <MdVerified />
            <span className="text-xs font-bold">Portfolio Strength</span>
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Your work is attracting more visibility 🚀
          </h2>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h3 className="font-bold text-lg">Edit Portfolio</h3>

            <input
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Title"
            />

            <textarea
              value={editingItem.subtitle}
              onChange={(e) =>
                setEditingItem({ ...editingItem, subtitle: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Description"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingItem(null)}>Cancel</button>
              <button
                onClick={handleSaveEdit}
                className="bg-[#b12b31] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
