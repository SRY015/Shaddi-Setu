import { MdVerified, MdStars, MdOutlineFavorite } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import Navbar from "../../Layouts/Navbar";
import { useNavigate } from "react-router-dom";

const ProfileCompletion = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdf8f9] font-body text-[#1c1b1c] antialiased">
      {/* TopAppBar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-12 sm:px-6">
        {/* Success Content Container */}
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(177,43,49,0.15)] sm:p-8 md:p-12">
          {/* Background Accent */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#ffdad7] opacity-20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Celebratory Visual */}
            <div className="relative mb-8">
              <div className="relative z-10 h-40 w-40 overflow-hidden rounded-full border-4 border-[#fdf8f9] shadow-xl md:h-56 md:w-56">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi-eo6n5bhbNsstsEgrYI14Nu7xGjp5irAzzVfH3Nt9X7mmeWFO-Se1c01D4iY1pOOBaPIzeQZt_q3Q7P-YxRW7dN9L-MahKZouwP9krXo84RMqHBsS-8qcsGB9fWTf-Y0Zheap0jysQJeM6mvgZfrTER2A28RhW0Axf0DsNOk8ttkMdLswaNiiRjvhWs6yJCja0UQw0V8jHJm5rrbFMMJYdog3JSj82V19xzaJvBVwUQ26QsQx3lRZQq1V-iYtOQReePTDx50m7iZ"
                  alt="Smiling Indian makeup artist"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute -right-2 -bottom-2 z-20 flex items-center gap-2 rounded-xl bg-[#fed65b] px-4 py-2 font-bold text-[#745c00] shadow-lg">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <MdVerified />
                </span>
                <span className="text-sm font-label tracking-tight">
                  Verified Artist
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-[#1c1b1c] font-headline md:text-5xl">
              Profile Created!
            </h2>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-stone-500 md:text-xl">
              Your profile is live! Families in your area can now see and book
              your services.
            </p>

            {/* Action Buttons */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <button
                onClick={() => navigate("/")}
                className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#b12b31] text-lg font-bold text-white shadow-[0_10px_30px_rgba(177,43,49,0.15)] transition-all hover:opacity-90 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined">
                  <IoMdHome />
                </span>
                Go to Home
              </button>

              <button className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#ece7e8] text-lg font-bold text-[#1c1b1c] transition-all hover:bg-[#e6e1e2] active:scale-95">
                <span className="material-symbols-outlined">
                  <CgProfile />
                </span>
                View My Profile
              </button>
            </div>
          </div>
        </div>

        {/* Trust Ribbon */}
        <div className="mt-12 w-full max-w-4xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-full bg-[#ece7e8] px-6 py-4 text-center md:flex-nowrap md:justify-start">
            <div className="flex items-center gap-2 text-stone-600">
              <span
                className="material-symbols-outlined text-[#735c00]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <MdStars />
              </span>
              <span className="text-xs font-label">
                Joined 5,000+ top artists across India
              </span>
            </div>

            <div className="flex items-center gap-2 text-stone-600">
              <span
                className="material-symbols-outlined text-[#006d2f]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <FaCheckCircle />
              </span>
              <span className="text-xs font-label">
                Identity Verified by GraminVivah Trust Team
              </span>
            </div>

            <div className="flex items-center gap-2 text-stone-600">
              <span
                className="material-symbols-outlined text-[#b12b31]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <MdOutlineFavorite />
              </span>
              <span className="text-sm font-label">
                Now visible to 20+ families nearby
              </span>
            </div>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-center text-stone-400">
          <span className="material-symbols-outlined text-sm">
            support_agent
          </span>
          <span className="text-sm font-label">
            Need help? WhatsApp our support team +91 98765 43210
          </span>
        </div>
      </main>
    </div>
  );
};

export default ProfileCompletion;
