import React from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fdf8f9] text-[#1c1b1c] font-sans">
      {/* NAVBAR */}
      <Navbar />

      <main className="pt-24">
        {/* HERO */}
        <section className="relative px-6 py-12 md:py-5 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
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
            <div className="relative hidden lg:block">
              <div className="absolute top-0 right-0 w-80 h-112 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlBrLUilmgjB_wprEkIIrjYGPm0zHFFuKRbs4MrmvbQ1oT0HgmFMouly-hB9dF7LF420NMBdLIqwQFjXHtMYsky9CJnBX9PtKAUad8uDG6RA2xiFHDF-jgGvJaMMUjQ6kqQFL2hpCCD5KPc28jy6GCL4rtV9JRK53Mq01kN_q1v_aIQcpW1Q61YM24LZ8hQy4puVkw__5eHJpmMxFjZ7VJBhSCd8lyZo2wCyHGpk3QUNpfC-1jWeiE6nA7hWXIIRho6tyxn0WwPVPs"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 translate-x-12 translate-y-16 w-72 h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
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
            </div>
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
        <section className="max-w-7xl mx-auto px-6 py-20">
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
        <section className="bg-gray-100 py-20 px-6">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              How It Works
            </h2>
            <p className="text-gray-500 mt-2">3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { title: "Search", desc: "Find artists near you" },
              { title: "Compare", desc: "Check price & reviews" },
              { title: "Book", desc: "Contact directly" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-2">
                  {i + 1}. {item.title}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 py-20">
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
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
