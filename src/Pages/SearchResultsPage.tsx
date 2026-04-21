import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import { useNavigate } from "react-router-dom";
import {
  MdCall,
  MdFilterList,
  MdVerifiedUser,
  MdOutlineVerified,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLocation, IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const SearchResultsPage = () => {
  const artistCards = [
    {
      name: "Priya Sharma Makeup Studio",
      location: "Udaipur, Rajasthan",
      price: "₹12,500",
      rating: "4.8",
      description:
        "Specializing in traditional Rajasthani bridal transformations with 10+ years of experience. High-end products and personalized attention for your big day.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBWccKr5f8Aw8Gg7VNS29hbTl0F9ecU6eEh8Gce3oOP68nU6obpEZi6v_1INVEfpZHwrMJUMclLxvUXnLjfO17X_Y58eeXOQflwILoXArBXNoo1BRhI3YhMnLDmy7BbGjckV4C00NHMvzngJ9Q6d7ezgt_LHI1bjXZhdNJZxhCCn1uitwlIWC2RR-rdwH2HuYrfWI9GZFAWsZCewGqFzsmV6DEHWgTfSWVd5RuxN09pqb15S7gl15zMnatFFWP6t4NapHI5xlOwIXPH",
      stars: 4.5,
    },
    {
      name: "Mehandi by Anjali",
      location: "Palampur, HP",
      price: "₹2,500",
      rating: "5.0",
      description:
        "Organic handmade henna paste. Specializing in intricate bridal motifs and modern fusion patterns for guests and brides.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUFa25c_y7J1O7MpxyJhasJov8Kjmk5JialBaXiWlEi_UjhQMZVLUPwxlgz5FRlAOi6re4AIxV1gd16QZdzrHqULBNo_E3ElIEPEGrKoDPSozgH8--zjNWbZ0pmMwjHe1yR0XpP5LWd3vFxKfX7OrEt9MUxjwUeXxYn1IG-sSJGFrelYR6oRSd3PmyA5s_ZbUyKk6tOizwjvD1WHufctuVs6pXx3oIRfZY1AvMq-mIq9pzGxxZgKIT-ebAMAIqTbyHWwfdd1H4tZyN",
      stars: 5,
    },
    {
      name: "Heritage Frames Photography",
      location: "Chandigarh",
      price: "₹45,000",
      rating: "4.2",
      description:
        "Capturing cinematic memories that last a lifetime. Candid specialists with a focus on heritage architecture and royal aesthetics.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCI6ALL5GtwfrLArTAA9fmcX7AHYkva4siJ4efm10pRp39-df3klnQn6YGCvvcByATyCTS2b2140tZOuDe4o_9xOjeDxYGUwvloSRNLrMDvxJmmRB-jNsKpo-waUGnn3kZYXysrRmddgQGVk6CMDuzjxlsGU3boQjCD5X46YRgepz7FtS06eo1tEihBbxmmy_tWiPcwDrR-H3fSRmbWhJLiywbka9vbWV39oY-xN-6SNSEtqQ4dW_7C6zlvIY-aktcUz88DsFEjLV8W",
      stars: 4,
    },
  ];

  const navigate = useNavigate();

  const renderStars = (count: number) => {
    const fullStars = Math.floor(count);
    const hasHalf = count % 1 !== 0;

    return (
      <div className="flex items-center text-[#735c00]">
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            <IoStar />
          </span>
        ))}

        {hasHalf && (
          <span className="material-symbols-outlined text-base">
            <IoStarHalf />
          </span>
        )}

        {!hasHalf &&
          fullStars < 5 &&
          [...Array(5 - fullStars)].map((_, i) => (
            <span
              key={`empty-${i}`}
              className="material-symbols-outlined text-base"
            >
              <IoStarOutline />
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf8f9] text-[#1c1b1c]">
      {/* Header */}
      <Navbar />

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 md:px-6 font-['Lexend']">
        {/* Search Header */}
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-[#1c1b1c] md:text-4xl font-['Plus_Jakarta_Sans']">
            Find Your Perfect Artist
          </h1>

          <p className="text-[#4d4635]">
            128 Verified Artists found for your special day.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-28 space-y-6">
              <div
                className="rounded-[1.25rem] bg-[#f7f2f3] p-6"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(177, 43, 49, 0.15)",
                }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b12b31]">
                    <MdFilterList />
                  </span>
                  <h2 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
                    Filters
                  </h2>
                </div>

                {/* Budget */}
                <div className="mb-8">
                  <label className="mb-3 block text-sm font-semibold">
                    Budget Range (Primary)
                  </label>

                  <div className="space-y-3">
                    {["Under ₹5,000", "₹5,000 - ₹15,000", "₹15,000+"].map(
                      (item, i) => (
                        <label
                          key={i}
                          className="group flex cursor-pointer items-center gap-3"
                        >
                          <input
                            type="radio"
                            name="budget"
                            defaultChecked={i === 0}
                            className="h-5 w-5 text-[#b12b31]"
                          />
                          <span className="text-sm font-medium transition-colors group-hover:text-[#b12b31]">
                            {item}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <label className="mb-3 block text-sm font-semibold">
                    Location
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#7f7663]">
                      <IoLocation />
                    </span>

                    <input
                      type="text"
                      placeholder="Search city or village"
                      className="w-full rounded-xl bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#ff9591]"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-8">
                  <label className="mb-3 block text-sm font-semibold">
                    Minimum Rating
                  </label>

                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-[#e6e1e2] py-2 text-xs font-bold">
                      3+
                    </button>

                    <button className="flex-1 rounded-lg bg-[#b12b31] py-2 text-xs font-bold text-white shadow-md">
                      4+
                    </button>

                    <button className="flex-1 rounded-lg bg-[#e6e1e2] py-2 text-xs font-bold">
                      4.5+
                    </button>
                  </div>
                </div>

                {/* Verified */}
                <div className="flex items-center justify-between border-t border-[#d0c5af]/40 pt-4">
                  <span className="text-sm font-semibold">Verified Only</span>

                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-[#e6e1e2] after:absolute after:inset-s-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#b12b31] peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>

              {/* Trust Ribbon */}
              <div className="overflow-hidden rounded-xl bg-[#e6e1e2]/50 p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#735c00] text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    <MdVerifiedUser />
                  </span>

                  <span className="text-xs font-bold uppercase tracking-widest text-[#4d4635]">
                    Social Proof
                  </span>
                </div>

                <p className="text-xs font-medium text-stone-600">
                  Booked by 4 families in Palampur today
                </p>
              </div>
            </div>
          </aside>

          {/* Cards */}
          <div className="flex-1 space-y-8">
            {artistCards.map((artist, index) => (
              <article
                key={index}
                className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white transition-transform hover:-translate-y-1 md:flex-row"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(177, 43, 49, 0.15)",
                }}
              >
                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden md:h-auto md:w-80">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-[#fed65b] px-3 py-1.5 text-xs font-bold text-[#745c00] shadow-sm">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      <MdOutlineVerified />
                    </span>
                    Verified
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h3 className="mb-1 text-2xl font-extrabold leading-tight font-['Plus_Jakarta_Sans']">
                        {artist.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1">
                          {renderStars(artist.stars)}
                          <span className="ml-1 text-sm font-bold">
                            {artist.rating}
                          </span>
                        </div>

                        <span className="text-[#d0c5af]">|</span>

                        <div className="flex items-center gap-1 text-sm font-medium text-[#4d4635]">
                          <span className="material-symbols-outlined text-sm">
                            <IoLocation />
                          </span>
                          {artist.location}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#4d4635]">
                        Starting from
                      </span>

                      <span className="text-2xl font-extrabold text-[#b12b31] font-['Plus_Jakarta_Sans']">
                        {artist.price}
                      </span>
                    </div>
                  </div>

                  <p className="mb-8 text-sm leading-relaxed text-[#4d4635]">
                    {artist.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-wrap gap-3">
                    <button className="flex h-14 min-w-35 flex-1 items-center justify-center gap-2 rounded-xl bg-[#b12b31] font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 font-['Plus_Jakarta_Sans'] cursor-pointer">
                      <span className="material-symbols-outlined">
                        <MdCall />
                      </span>
                      Call Now
                    </button>

                    <button className="flex h-14 min-w-35 flex-1 items-center justify-center gap-2 rounded-xl bg-[#006d2f] font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 font-['Plus_Jakarta_Sans'] cursor-pointer">
                      <span className="material-symbols-outlined">
                        <FaWhatsapp />
                      </span>
                      WhatsApp
                    </button>

                    <button
                      onClick={() => navigate("/artist-profile")}
                      className="h-14 w-full rounded-xl bg-[#ece7e8] px-6 font-bold transition-colors hover:bg-[#e6e1e2] md:w-auto font-['Plus_Jakarta_Sans'] cursor-pointer"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Nav */}
      {/* <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-stone-100 bg-white/90 px-6 py-3 backdrop-blur-md md:hidden">
        {[
          ["search", "Search", true],
          ["favorite", "Saved"],
          ["calendar_month", "Bookings"],
          ["person", "Profile"],
        ].map(([icon, label, active], i) => (
          <button
            key={i}
            className={`flex flex-col items-center gap-1 ${
              active ? "text-[#b12b31]" : "text-stone-400"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: active ? "'FILL' 1" : "",
              }}
            >
              {icon}
            </span>

            <span className="text-[10px] font-bold">{label}</span>
          </button>
        ))}
      </nav> */}
    </div>
  );
};

export default SearchResultsPage;
