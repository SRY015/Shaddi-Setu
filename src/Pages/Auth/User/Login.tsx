import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="bg-[#fdf8f9] text-[#1c1b1c] min-h-screen overflow-x-hidden font-sans">
      <main className="flex min-h-screen">
        {/* Left Side Image Panel */}
        <section className="hidden lg:flex w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#b12b31]/10 mix-blend-multiply z-10" />

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArStkfld2844xyEqofh6viTxI6kStnoqYYa_N3mIjkYDP9LIBlVRXcHPqY83i7--0KXT66fewoBEFSutH9Kag2mLQ1UVUbGDZOMGwKh5A-ZM2tJ-at3khCqU4jUNyRBCt1J0l757AP4QdKky5lkYIZRhIN7VBH7YsrR26T3fLWQpgHppz71SN8FWaDqTfW1Qjr5dSpXtlVdILiuuZfJCr4HUzeLh1PE0U3C_NghFAkM3yGV3P-k2-AC4V6oevbxBB355njqUko2Wwy"
            alt="Happy Indian couple in traditional wedding attire"
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 z-20 p-10 xl:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-white text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                Preserving the <br />
                Elegance of <br />
                Tradition.
              </h2>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 xl:p-8 rounded-2xl shadow-xl max-w-sm">
              <p className="text-[#1c1b1c] italic text-base xl:text-lg leading-relaxed">
                "Finding our venue through Heritage Weddings was like turning
                the page of a luxury magazine."
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-300 flex items-center justify-center">
                  ✨
                </div>
                <p className="font-bold text-sm">Priya & Arjun</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side Login Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 md:px-12 lg:px-20 xl:px-24 bg-[#fdf8f9]">
          <div className="w-full max-w-md space-y-10">
            {/* Brand */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-2xl font-black tracking-tight text-[#b12b31]">
                Heritage Weddings
              </span>
              <div className="h-1 w-12 bg-[#b12b31] rounded-full" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Login to Heritage Weddings
              </h1>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Enter your phone number to continue your journey.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                {/* Mobile Number */}
                <div>
                  <label className="block font-semibold text-sm mb-3 tracking-wide">
                    MOBILE NUMBER
                  </label>

                  <div className="flex items-center bg-[#f7f2f3] rounded-xl focus-within:ring-2 focus-within:ring-[#b12b31]/20 transition-all">
                    <div className="pl-5 pr-3 flex items-center gap-2 border-r border-gray-300 py-4 text-gray-600">
                      <span className="text-2xl">🇮🇳</span>
                      <span className="font-bold text-lg">+91</span>
                    </div>

                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      className="w-full bg-transparent border-none py-5 px-4 focus:outline-none text-lg md:text-xl tracking-widest placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button className="w-full h-14 rounded-xl font-bold text-lg text-white bg-linear-to-r from-[#b12b31] to-[#ff9591] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  Send OTP
                  <span>›</span>
                </button>

                <Link to="/">
                  <button className="w-full h-14 rounded-xl font-semibold text-[#b12b31] bg-white hover:bg-[#ffdad7]/30 transition-colors border border-[#f1edee] cursor-pointer">
                    Continue as Guest
                  </button>
                </Link>
              </div>
            </form>

            {/* Footer Links */}
            <div className="pt-8 border-t border-[#e6e1e2] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-center sm:text-left">
                New here?{" "}
                <Link
                  to="/user-registration"
                  className="text-[#b12b31] font-bold hover:underline underline-offset-4"
                >
                  Create an Account
                </Link>
              </p>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#b12b31]"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#b12b31]"
                >
                  Terms
                </a>
              </div>
            </div>

            {/* Mobile Trust Ribbon */}
            <div className="lg:hidden mt-12 bg-[#e6e1e2]/50 p-6 rounded-2xl flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400" />
              </div>

              <p className="text-xs font-semibold text-gray-600 leading-tight">
                Trusted by <span className="text-[#b12b31]">10k+ Families</span>
                <br />
                across 50 cities
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Decorative Background */}
      <div className="lg:hidden fixed bottom-0 right-0 -z-10 opacity-10 pointer-events-none text-[220px] sm:text-[300px] text-[#b12b31] leading-none">
        ✿
      </div>
    </div>
  );
};

export default Login;
