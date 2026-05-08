import React from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { useNavigate } from "react-router-dom";
import HeroImageSlider from "../Components/HeroImageSlider";
import { FiPhoneCall, FiSearch, FiStar } from "react-icons/fi";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(177,43,49,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,109,47,0.08),transparent_32%),#fdf8f9]  font-sans">
      {/* NAVBAR */}
      <Navbar />

      <main className="pt-24 px-4">
        {/* HERO */}
        <section className="relative px-6 py-12 md:py-5 overflow-hidden">
          <div className=" mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                Find Affordable{" "}
                <span className="text-[#b12b31] italic">Makeup Artists</span> &
                Photographers Near You
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                Compare prices, see real work, and book trusted local
                professionals for your special day.
              </p>

              {/* SEARCH */}
              <div className="bg-white p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter your village or town"
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-lg outline-none"
                />

                <select className="flex-1 px-4 py-3 bg-gray-100 rounded-lg outline-none">
                  <option>Makeup Artist</option>
                  <option>Photographer</option>
                </select>

                <button
                  onClick={() => navigate("/search-artist")}
                  className="bg-[#b12b31] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold hover:scale-105 transition cursor-pointer"
                >
                  Search Now
                </button>
              </div>

              {/* TRUST */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex items-center gap-2 font-bold">
                  ⭐ 4.8 rating
                </div>
                <div className="flex items-center gap-2 font-bold">
                  ❤️ 1,000+ bookings
                </div>
                <div className="flex items-center gap-2 font-bold text-green-600">
                  ✔ Verified Artists
                </div>
              </div>
            </div>

            {/* RIGHT IMAGES */}
            {/* <div className="relative hidden lg:block">
              <div className="absolute top-0 right-0 w-md h-116 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlBrLUilmgjB_wprEkIIrjYGPm0zHFFuKRbs4MrmvbQ1oT0HgmFMouly-hB9dF7LF420NMBdLIqwQFjXHtMYsky9CJnBX9PtKAUad8uDG6RA2xiFHDF-jgGvJaMMUjQ6kqQFL2hpCCD5KPc28jy6GCL4rtV9JRK53Mq01kN_q1v_aIQcpW1Q61YM24LZ8hQy4puVkw__5eHJpmMxFjZ7VJBhSCd8lyZo2wCyHGpk3QUNpfC-1jWeiE6nA7hWXIIRho6tyxn0WwPVPs"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 translate-x-12 translate-y-16 w-md h-112 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW20suWv6-hWmpBaHNqh75f07uPQ_PlkmQpqX-bbaOYMm4ZFmWEYTXfscd2aH-lO7gj8ZDoXwAWdxSYDTLcZ1TZoZ7OcvkJYxlTH000rD8ikkaj6v4bgdfkOVQ0epEouuIVhNM_KpAvPhXgwPFIGeip6mMrKgH77JbR-ft5UeCRDycdy4roKnko4cIXlHh2stnBcqzLK3c-2GNUS3AODVUEZS38JxxJs1JLwUu93WA-L88RqZQN0ogiJj_fEL69bzzVYOVpaWyWH3X"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 bg-yellow-100 p-4 rounded-lg shadow-lg max-w-xs z-10">
                <p className="text-sm italic font-bold">
                  "I found the perfect makeup artist within my budget!"
                </p>
                <p className="text-xs mt-2">— Priya S.</p>
              </div>
            </div> */}
            <HeroImageSlider />
          </div>
        </section>

        {/* STRIP */}
        {/* <div className="bg-gray-200 py-4 overflow-x-auto whitespace-nowrap flex gap-8 px-6 text-sm font-bold">
          <span>✔ Booked in Meerut 2h ago</span>
          <span>✔ 50+ Artists in Bhopal</span>
          <span>✔ New Photographer from Nashik</span>
          <span>✔ Secure Payments</span>
        </div> */}

        {/* ARTISTS */}
        <section className=" mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Recommended Professionals
              </h2>
              <p className="text-gray-500">
                Handpicked for quality and affordability.
              </p>
            </div>
            <button className="text-[#b12b31] font-bold">View All →</button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCRPDNawd6wEgvXxMVpNGxJiSYtQ4H1x9nhHaLxPT28QWBMDGVKaicnPbvxvx5JsbYk1RU9DPt1ZIlyDDXQZMQwBLCovDD_xRHdPoYk1SUXW0cni2E3BZBPtdweezb0uanXYi4VwDexu7OuFu8I1GbPqrjr4Oz8ARssFSbFlKl0x3yjyK_6GmW2tFIXq43SUPofRQyzNAabjt7hKHAyRb2d3lmhkg3fyS44Mdsv2TXvzolkG6VI12oX4vuvg-AZSY-DL1HAKB6hNJX"
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold">Artist Name</h3>
                    <span className="text-[#b12b31] font-bold">₹2000</span>
                  </div>
                  <p className="text-gray-500 mb-4">Location (Within 5km)</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-green-500 text-white py-2 rounded">
                      WhatsApp
                    </button>
                    <button className="border border-green-500 text-green-500 py-2 rounded">
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#ff9591]/10 blur-3xl rounded-full" />

          <div className="relative mx-auto px-4">
            {/* Heading */}
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-[#b12b31]/10 px-4 py-1 text-sm font-semibold text-[#b12b31]">
                Simple Process
              </span>

              <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                How It Works
              </h2>

              <p className="mt-4 text-lg text-[#4d4635] max-w-2xl mx-auto">
                Find and book the perfect makeup artists & photographers for
                your special moments in just 3 simple steps.
              </p>
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Search Artists",
                  desc: "Discover verified makeup artists & photographers near your location.",
                  icon: <FiSearch />,
                  step: "01",
                },
                {
                  title: "Compare Profiles",
                  desc: "Check pricing, portfolios, ratings, reviews & service packages.",
                  icon: <FiStar />,
                  step: "02",
                },
                {
                  title: "Book Directly",
                  desc: "Call, WhatsApp or request booking instantly without middlemen.",
                  icon: <FiPhoneCall />,
                  step: "03",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-[#f1d7d9]
            bg-white/80
            backdrop-blur-sm
            p-8
            shadow-[0_10px_40px_-15px_rgba(177,43,49,0.15)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_20px_50px_-15px_rgba(177,43,49,0.25)]
          "
                >
                  {/* Large Step Number */}
                  <div className="absolute right-5 top-2 text-7xl font-black text-[#b12b31]/5 select-none">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#b12b31]
              text-2xl
              text-white
              shadow-lg
              transition-transform
              duration-500
              group-hover:scale-110
              group-hover:rotate-3
            "
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[#1c1b1c] font-['Plus_Jakarta_Sans']">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-[#4d4635]">
                    {item.desc}
                  </p>

                  {/* Hover Glow */}
                  <div
                    className="
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
              bg-linear-to-br
              from-[#ff9591]/5
              to-transparent
              pointer-events-none
            "
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* <section className=" mx-auto px-6 py-16">
          <div className="bg-[#b12b31] text-white p-10 md:p-16 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                Are you a Professional Artist?
              </h2>
              <p className="opacity-80">Join and grow your business</p>
            </div>

            <button
              onClick={() => navigate("/artist-registration")}
              className="bg-white text-[#b12b31] px-6 py-3 rounded-lg font-bold cursor-pointer"
            >
              Join Now
            </button>
          </div>
        </section> */}
        <section className="mx-auto px-4 sm:px-6 py-20">
          <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#b12b31] via-[#9e1f2c] to-[#7f1720] px-6 py-12 sm:px-10 md:px-14 lg:px-20">
            {/* Background Glow */}
            <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#ffb3b3]/10 blur-3xl" />

            {/* Decorative Shapes */}
            <div className="absolute top-8 right-8 hidden md:block">
              <div className="h-28 w-28 rounded-full border border-white/10" />
            </div>

            <div className="absolute bottom-10 left-10 hidden lg:block">
              <div className="h-16 w-16 rounded-2xl border border-white/10 rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left Content */}
              <div className="max-w-2xl text-center lg:text-left">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                  Grow Your Career
                </span>

                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                  Are You a Professional Artist?
                </h2>

                <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
                  Join thousands of talented makeup artists and photographers
                  connecting with clients every day. Build your profile,
                  showcase your portfolio, and grow your business faster.
                </p>

                {/* Stats */}
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                  {[
                    { value: "10K+", label: "Monthly Visitors" },
                    { value: "500+", label: "Verified Artists" },
                    { value: "24/7", label: "Lead Support" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md"
                    >
                      <h3 className="text-2xl font-extrabold">{item.value}</h3>
                      <p className="text-sm text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right CTA */}
              <div className="w-full max-w-md">
                <div className="rounded-4xl border border-white/10 bg-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-3">
                    Start Your Journey Today
                  </h3>

                  <p className="text-white/75 leading-relaxed mb-8">
                    Create your professional profile and start receiving
                    bookings from nearby customers instantly.
                  </p>

                  <button
                    onClick={() => navigate("/artist-registration")}
                    className="group w-full rounded-2xl bg-white px-6 py-4 text-lg font-bold text-[#b12b31] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Join Now
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>

                  <p className="mt-4 text-center text-sm text-white/60">
                    Free registration • No hidden charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
