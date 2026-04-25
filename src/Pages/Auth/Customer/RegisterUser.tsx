import React from "react";
import { Link } from "react-router-dom";

const RegisterUser: React.FC = () => {
  return (
    <div className="bg-[#fdf8f9] min-h-screen lg:h-screen overflow-hidden text-[#1c1b1c] font-sans selection:bg-[#ff9591] selection:text-white">
      <main className="flex flex-col md:flex-row min-h-screen lg:h-full">
        {/* Left Section */}
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#f1edee] h-full">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIItlwY1ygYF4qOa3lw1AI5TJfZ3_Yv4A0PTxk1B1jKRZ5UFt4rR3cTeezBotOA3_DIKw04p69U0OUBdREw72OchdNf2qgZsDC_7f8q-P9okJO23d6gemR0ldT6PgkXZB1siu_1rHowSvAgAXr5yMp9oPyyH7Z18xXNPsZIThs12lrmNKGpAy6cHcNiho6cmLWVKbYc-P9tsUV7j8hYkMRx_9CFSR-XXXO9UQbsL_RWZ_kn7BPxpTXtwXTMsfoxr5GdLHOVzWcvz73"
            alt="Traditional Indian wedding couple"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#b12b31]/60 to-transparent" />

          <div className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12 right-8 lg:right-12 text-white z-10">
            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              Begin Your Heritage Journey
            </h1>
            <p className="text-base lg:text-xl opacity-90 max-w-md font-light leading-relaxed">
              Celebrating tradition with modern elegance. Join thousands of
              families finding their perfect match today.
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex-1 bg-[#fdf8f9] flex items-start lg:items-center justify-center px-5 sm:px-8 md:px-10 lg:px-16 py-6 lg:py-8 overflow-y-auto">
          <div className="w-full max-w-[80%] space-y-2">
            {/* Mobile Branding */}
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-[#b12b31] font-black text-2xl tracking-tight">
                Heritage Weddings
              </span>
            </div>

            {/* Back Home */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#4d4635] hover:text-[#b12b31] transition-colors font-bold text-xs sm:text-sm uppercase tracking-widest"
              >
                ← Back to Home
              </Link>
            </div>

            {/* Header */}
            <div className="space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Create My Account
              </h2>
              <p className="text-[#4d4635] font-normal text-sm sm:text-sm">
                Simple steps to start your wedding planning
              </p>
            </div>

            {/* Form */}
            <div className="space-y-2">
              {/* Profile Picture */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 rounded-full border-2 border-dashed border-[#d0c5af]/40 bg-[#f7f2f3] flex items-center justify-center cursor-pointer hover:border-[#b12b31]/50 transition-all overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <span className="text-3xl">📷</span>
                  </div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#b12b31] text-white flex items-center justify-center font-bold shadow-lg">
                    +
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#4d4635] uppercase tracking-wider">
                  Upload Profile Photo
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-12 sm:h-12 px-4 rounded-xl border-none bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-12 sm:h-12 px-4 rounded-xl border-none bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full h-12 sm:h-12 pl-4 pr-24 rounded-xl border-none bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31]"
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-[#e6e1e2] text-[#b12b31] font-bold text-sm hover:bg-[#b12b31]/10 transition-all">
                    Verify
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
                  Your Village/Town Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Which town are you from?"
                    className="w-full h-12 sm:h-12 pl-12 pr-4 rounded-xl border-none bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31]"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    📍
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#1c1b1c]/70 px-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-12 sm:h-12 px-4 rounded-xl border-none bg-[#f7f2f3] focus:outline-none focus:ring-2 focus:ring-[#b12b31]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-4">
              <button className="w-full h-12 sm:h-12 bg-[#b12b31] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg flex items-center justify-center gap-2">
                Create My Account <span>→</span>
              </button>

              {/* <button className="w-full h-12 sm:h-12 bg-white border border-[#d0c5af]/40 text-[#1c1b1c] font-semibold text-base sm:text-lg rounded-xl hover:bg-[#f7f2f3] transition-all">
                Continue with Google
              </button> */}

              <p className="text-center text-[#4d4635] font-medium text-sm sm:text-base">
                Already have an account?{" "}
                <Link
                  to="/user-login"
                  className="text-[#b12b31] font-bold hover:underline underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterUser;
