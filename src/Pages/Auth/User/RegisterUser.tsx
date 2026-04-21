import React from "react";
import { Link } from "react-router-dom";

const RegisterUser: React.FC = () => {
  return (
    <div className="bg-[#fdf8f9] min-h-screen text-[#1c1b1c] font-sans selection:bg-[#ff9591] selection:text-white">
      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Editorial Image Section */}
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#f1edee]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIItlwY1ygYF4qOa3lw1AI5TJfZ3_Yv4A0PTxk1B1jKRZ5UFt4rR3cTeezBotOA3_DIKw04p69U0OUBdREw72OchdNf2qgZsDC_7f8q-P9okJO23d6gemR0ldT6PgkXZB1siu_1rHowSvAgAXr5yMp9oPyyH7Z18xXNPsZIThs12lrmNKGpAy6cHcNiho6cmLWVKbYc-P9tsUV7j8hYkMRx_9CFSR-XXXO9UQbsL_RWZ_kn7BPxpTXtwXTMsfoxr5GdLHOVzWcvz73"
            alt="Traditional Indian wedding couple"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#b12b31]/60 to-transparent" />

          <div className="absolute bottom-12 left-12 right-12 text-white z-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              Begin Your Heritage Journey
            </h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-md font-light leading-relaxed">
              Celebrating tradition with modern elegance. Join thousands of
              families finding their perfect match today.
            </p>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-[#fdf8f9]">
          {/* Mobile Branding */}
          <div className="flex items-center gap-2 mb-10 md:hidden">
            <span className="text-[#b12b31] font-black text-2xl tracking-tight">
              Heritage Weddings
            </span>
          </div>

          <div className="max-w-md w-full mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Create My Account
              </h2>
              <p className="text-[#4d4635] font-medium">
                Simple steps to start your wedding planning
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-semibold text-[#1c1b1c]/70 px-1"
                >
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-14 px-4 rounded-xl border-none bg-[#f7f2f3] text-lg focus:outline-none focus:ring-2 focus:ring-[#b12b31] placeholder:text-[#4d4635]/40"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-[#1c1b1c]/70 px-1"
                >
                  Phone Number
                </label>

                <div className="relative group">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full h-14 pl-4 pr-24 rounded-xl border-none bg-[#f7f2f3] text-lg focus:outline-none focus:ring-2 focus:ring-[#b12b31] placeholder:text-[#4d4635]/40"
                  />

                  <button className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-[#e6e1e2] text-[#b12b31] font-bold text-sm hover:bg-[#b12b31]/10 active:scale-95 transition-all">
                    Verify
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-[#1c1b1c]/70 px-1"
                >
                  Your Village/Town Name
                </label>

                <div className="relative">
                  <input
                    id="location"
                    type="text"
                    placeholder="Which town are you from?"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-[#f7f2f3] text-lg focus:outline-none focus:ring-2 focus:ring-[#b12b31] placeholder:text-[#4d4635]/40"
                  />

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4d4635]/60 text-lg">
                    📍
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-6">
              <button className="w-full h-14 bg-[#b12b31] text-white font-bold text-lg rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                Create My Account
                <span>→</span>
              </button>

              <button className="w-full h-14 bg-white border border-[#d0c5af]/40 text-[#1c1b1c] font-semibold text-lg rounded-xl hover:bg-[#f7f2f3] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                Continue with Google
              </button>

              <p className="text-center text-[#4d4635] font-medium">
                Already have an account?{" "}
                <Link
                  to="/user-login"
                  className="text-[#b12b31] font-bold hover:underline underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Trust Ribbon */}
            <div className="pt-8 border-t border-[#d0c5af]/10">
              <div className="flex flex-col items-center gap-4 py-4 px-6 bg-[#f7f2f3] rounded-2xl">
                <div className="flex -space-x-3 overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwmnG2oYTJXf1dIRlAbUBxB-MdQpguoHj9rUS6Jc15g4vQJkaQ3bwT9mKiDAp-v9dyqWiggthXSGoXPrg33MveCN1At6mMIViIjN5XcqICOvI4HaMeRg79p3F0DDfZxckw9AwvKTRyTf2KNzCerY2xL84nkx-xf2036I7MZEywVWB1qhfd-GNCwwzsqpOA4kfIXJp0HO9EI3AZ18KDSFbISSFCQUXwKepgFHE41W4h_PSvCv5qxMjKrDj_krzJSb7-PQrPgwo_A9Yv"
                    alt="User portrait"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3tqX_i2XPfkHZZ9aFrZXlzAjHwZrLHL2tOS96cfa-iUAOfozrfWjGQAtTnE-MoExhiqFE6KQtmagJlRKQH2xpsx-nzqhOjZ0qdutMeIgjU0pFhPPK3CbF0MZ_TKqhXk_m3CUN2KcPU5nEsXF1Vctype1QJJspGyZm3bghwhqw59qvqRyEPbT1jJJYOUJ51pXoiTqoH2otuHhqX0YdCqrmNeNWhbN8oTjDLse2Xk1g5OtGNySoThl7FVQFUUqcX2Pwxl6onZkq_tFE"
                    alt="User portrait"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpRGi4ffel_RqPE6BaEq-dTlZq4MIQPInk_HmUq71j7tayLe0MejXRVdahpbPeuzQ90pp6OoGmg0F-csv7ebTVFvK5QhR9lm4oR1nM9STlRp19pEb-qZhDfVwUODJQkZF2r_eKwIqJk4Vs0KlrMCikIeLjK6u6_QFQNT3paH0TehARHW3GdX1CzsRTRadZFdd-GaLoMrih8zQH3I9rN8iqj5x7eoBYAAlmwsKEiTKOXR031GooDh3DvtZBE2dYrJP7b9W9MmUDUrQO"
                    alt="User portrait"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm font-semibold text-[#1c1b1c]">
                    Verified by 50+ Families
                  </p>
                  <p className="text-xs text-[#4d4635]">
                    Trusted across your local community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterUser;
