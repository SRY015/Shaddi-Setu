import { useState } from "react";
import { FaRegTrashAlt, FaStar, FaPlayCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdVerified } from "react-icons/md";

const initialPortfolio = [
  {
    id: 1,
    title: "Bridal Elegance Series",
    subtitle: "Traditional Portraiture • 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDy7S2jMTdQHZAK8ZO2jA3YMNE4QUcu05UW0f8camXP0d52KeAvjYuG_fuO3Soggb6cYu7P8V7jTszytQJR0MB1ip5o3dNH1b_My9rHTTvmcPFwlycKlnBCtRguN0OsXTi5DW1j6H4q-mOymNGaeNeG477EJupveav_qBTfYvNFwJPyZWfjGZzR4Lf3nsr6HYz46w_cChu8pAv2Ce-PjBAOaAL5syqltXCXjma8F-fTtrnZlMd3Nsz4jbB1YVycBoz1K7i0QJtMsWc4",
    featured: true,
    type: "image",
  },
  {
    id: 2,
    title: "Mandap Decor Story",
    subtitle: "Landscape Photography • 2023",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsYOb3gh7v9X6hw7zQNTTJj4ap2aUEgf5J-B3Q86zPE17NH3b-eTQDqrgbx2S-6o9sHTYGw6JNSwAMSoi8v_V3c-7C_xf_6IaQMsclRutgzLxCgZxQ4lbHyBwlG_sd6gvoyWRHV8Z25jcFP7AC-hZtPMzrjzK3I1f0ddzS-LDvbycWaH7ovOMthCC6-1fFgDsi1BAgfiwv7cSPvKHLgXOCcCFfqlompa31V4Duv_b0iu86-qO3ITUUTBOeBkRrAIAFsvZ6ci0hK_",
    featured: false,
    type: "image",
  },
  {
    id: 3,
    title: "Celebration Highlight",
    subtitle: "Cinematic Video • 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjck_LHNu0qmhD4x0aU_oDOX71SShbPrtYao1UmA19O_YukqhD5uVhaHmCJp8MndPHWxhWBv8ysaurIwfgExoFNHxcUHqpywou-TEeHklZIaveQkvc60JxRm4CPCx5EElhVXi4_LE7Nzy8R-c9oNAXsoiDqeBaP_n3FVXeQhpXfHBqP-3Jp6fH72k4YjjCIskV8iq727sLWWlwd0J7EKy0hDvs0LJ898iIMlbrtdGTs0ACO_ui7eKNAAFvYUxfI1JNSnu--e8HmBRT",
    featured: false,
    type: "video",
  },
  {
    id: 4,
    title: "Mehendi Art Closeups",
    subtitle: "Macro Photography • 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBqNu0LQjf93fUwQfUGpDGuMQCilXOo0M7qz-ZrdQsoKkQwjjkSjuF25faYU9nNpK7pbDLeCWi7vJgt_tfg6kxoUzy7Gyrm32rmYWc2EITC2NJSU7RfOaq5fhv7_fUwaq8Razbw76H_oVmRqScpY10bNM7TgniV4NXyW0_XshNXMgaByFPazT5Iq2NMqFqrWoW8jkqhQsLZAae_G4HW3T6ZQVId80eqQWNc8h-s0QtcQZCc6eIjtBY1v2ZSreFUIQuxM8cvqeg8Apc",
    featured: false,
    type: "image",
  },
  {
    id: 5,
    title: "Guest Perspective",
    subtitle: "Candid Series • 2023",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBysIl2j6er2j9aJ2EIg1_gGc7UAq28I_JmhlaszHtFlocESTwylyegRD-yupaP6Y_omKQtsA1BNGAWpE2__x8HQ4-mZhsnWVsfIX06ReosETHZtf9gHIzAh4bTEWOd5sIPEF-Qxwlg6N2KJRIg_4alnTQQlTKiSrnYIaGhVT5bzX__VyDSdCvfXZy7r0roH-2i9XK-m8lI2Dxc7kKL9daEpFfqmNA1JRm7G_EK4GjWZtl042qDfFQZQhxhQ-kMnQNKx-B-KvkrME1w",
    featured: false,
    type: "image",
  },
];

const PortfolioManagement = () => {
  const [items, setItems] = useState(initialPortfolio);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFeatured = (id: number) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        featured: item.id === id ? !item.featured : false,
      })),
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf8f9] px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-24 md:pb-10 text-[#1c1b1c] overflow-x-hidden">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
          My Portfolio
        </h1>
        <p className="text-sm sm:text-base text-gray-500 font-medium">
          Curate your finest work to inspire families across the region.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        <button className="group aspect-3/4 rounded-2xl border-2 border-dashed border-[#b12b31]/20 bg-[#f7f2f3] hover:bg-[#fff5f5] transition flex flex-col items-center justify-center p-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#b12b31]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <span className="material-symbols-outlined text-[#b12b31] text-3xl">
              <IoMdAdd />
            </span>
          </div>
          <h3 className="font-bold text-[#b12b31] text-lg">Add New Work</h3>
          <p className="text-sm text-gray-500">Photos or Video</p>
        </button>

        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white overflow-hidden shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)] group"
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50">
                    <span className="material-symbols-outlined text-white text-4xl">
                      <FaPlayCircle />
                    </span>
                  </div>
                </div>
              )}

              {item.featured && (
                <div className="absolute top-4 left-4 bg-[#fed65b] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    <FaStar />
                  </span>
                  FEATURED
                </div>
              )}

              <div className="absolute inset-0 bg-[#b12b31]/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-red-500">
                    <FaRegTrashAlt />
                  </span>
                </button>
                <button
                  onClick={() => toggleFeatured(item.id)}
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[#b12b31]">
                    <FaStar />
                  </span>
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}

        <div className="sm:col-span-2 xl:col-span-2 rounded-2xl bg-[#e6e1e2] p-6 sm:p-8 relative overflow-hidden min-h-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#735c00]">
                <MdVerified />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#735c00]">
                Portfolio Strength
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
              Your work was viewed by{" "}
              <span className="text-[#b12b31]">1,240+ families</span> this
              month.
            </h2>

            <p className="text-gray-600 max-w-md mb-6">
              Updating your portfolio regularly increases your visibility in
              rural discovery feeds by up to 40%.
            </p>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-2xl font-bold text-[#b12b31]">85%</p>
              <p className="text-xs uppercase text-gray-500">Engagement</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#b12b31]">12</p>
              <p className="text-xs uppercase text-gray-500">New Leads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;
