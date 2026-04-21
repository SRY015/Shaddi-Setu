import Navbar from "../../Layouts/Navbar";

const ArtistProfile = () => {
  return (
    <div className="bg-[#fdf8f9] text-[#1c1b1c] font-['Lexend'] selection:bg-[#ff9591] selection:text-[#8c0c1b]">
      {/* Custom Styles */}
      <style>
        {`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
          }

          .heritage-shadow {
            box-shadow: 0 10px 30px -10px rgba(177, 43, 49, 0.15);
          }

          .glass-effect {
            backdrop-filter: blur(12px);
            background-color: rgba(253, 248, 249, 0.8);
          }

          .animate-marquee {
            animation: marquee 18s linear infinite;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-20%);
            }
          }
        `}
      </style>

      {/* Top Navigation */}
      <Navbar />

      <main className="pt-20 pb-32">
        {/* Hero Header */}
        <header className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
          <div className="relative h-112.5 md:h-137.5 rounded-2xl overflow-hidden heritage-shadow">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoHYZxJe1uhwFmjLE_MmAP35X4IRZNvTGfiaN-B4Lu6iutKZ5HSydBxIwYIXQs3okuXjjji_DjVZoEd9EikM_3dwMw5ihKEia598OpUNE-PQDr_0wBfaA3R0_MARQzcQFp38LGeCrNuoPY32P7KnYdNGcxOoo6SJ9Nps-U0VGqdlJFNw7Yw4HhJiXVV7ViOlYGDKtm-CGur8s9wBEF6nXSukS3A_Linga_QQlNo9TFtbzgibNia5f72H-TTO1X1tlmG7dqW_ZRySFs"
              alt="Bride"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans']">
                    Priya Sharma
                  </h1>

                  <span className="bg-[#735c00] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    VERIFIED
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium opacity-90">
                  <span className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[#735c00]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    4.9 (124 Reviews)
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                    Jaipur, Rajasthan
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined">payments</span>
                    From ₹25,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Trust Ribbon */}
        <div className="w-full mt-8 overflow-hidden">
          <div className="bg-[#e6e1e2] py-3 px-6 whitespace-nowrap animate-marquee flex items-center gap-12">
            {[
              "Booked in Malviya Nagar today",
              "Trusted by 500+ Rajasthani Families",
              "Top Rated Bridal Makeup 2023",
              "Last Booking: 2 hours ago",
            ].map((item, index) => (
              <span
                key={index}
                className="text-[#4d4635] text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[#006d2f]">
                  check_circle
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-[#b12b31] font-['Plus_Jakarta_Sans'] mb-4">
                About the Artist
              </h2>

              <p className="text-[#4d4635] text-lg leading-relaxed">
                With over 8 years of experience in bridal artistry, I specialize
                in creating timeless, high-definition looks that celebrate
                heritage while embracing modern elegance. My approach is
                centered on enhancing your natural beauty for your most special
                day, using premium international products that withstand the
                vibrant energy of Indian weddings.
              </p>
            </section>

            {/* Portfolio */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold text-[#b12b31] font-['Plus_Jakarta_Sans']">
                  Signature Portfolio
                </h2>

                <span className="text-[#735c00] font-semibold flex items-center gap-1 cursor-pointer">
                  View All
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden heritage-shadow aspect-square">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsqlWrr4opneiivw4f3X_Lk-pngqtYM9WEcqnP2gx91_6dd6eFM1LisfMcjlj8pn_atDUCRuSpQg7IlEn76M8JwtvdMo4oNOibMAKVRZ7CAnKRyU6YZ7WtruKOKqr3xBgJXRgCy5kykyADpdSMZjWtBsm2pU0tGpnK9X_QWXQE1ANQQueiXUGShzDD1LJe492h1oUVHIJ2aA3pLKRIXjsXwfB-PjRCYaS3OSe76xoQapV8ew1tW11cdbJsG-28joywlIMBjWN3V7qG"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDZLhb90oT5BXyCkpx3Gu3ETln03ZsZXeWNafBtop98kkNO6VPoaGwHY0zeaYiYpgMyGasDry9-egmsqe9yZbyAZDvWzZn53Idoydm0CAXsbuWy4cmmM-2czFMdZKELNbVs9z3b_k2syW58Cj-zFEEPNSkvECpP6dTHaRK7Te1rbII5mGtjufghbjWZECn-Dnud4XBgYEy-wXpoBjowM1vtLFtlX4o5_CG58xt1V21GfH2D8-1NiIGdBS2ORpH4y3RIXHpvlP8tF0Zi",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCp6rrrIAl8zMqnpZCpX4c1xMhig1mK_vpeSNZwEAonOdiPsmEL6DMGNhVSGtfPPgotmQ8lmQZcMFa0T9DH3RcLm3U52t1cUxH-kNqal444Xb7q_fWtHf5ENycOaQt7x2E7TVXpb7SZ2XWIWD8tanpDhbPLn4sD_6dlerAIaE-cia8n3_SMFhVckmZoLexKT8xeazwUBa78AgjMRff8ESJO6l4C0H98PUGTh4m5KKsmaliv4PC7Ig1DzSsvF-988zB3nF7PJRKtqRGS",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTcbGRtarhOpWD0pvW4iT7iuqjKr3r3CMf_s5xGfTlUV2tvur4zoLphYfXWIRzCr5mvk0TgEE0mYTa0i82Nk62UpuuamV6G0ccTBV2oQb1l1gL6nIiTePWBmNaOkkHUWCRSqpaPyIi8pNW8pU3WnTVGr1tNmYDWiA85fIZHcmtvl33Dh9l_lSYsZwnedbymArU9b1UWV4xcSeneA_AJtW6l0N0aqwK93nOa8Kq0Kwmn-sapRKWTALu4DOumGTNM5QYaW9TRGCkspvR",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden heritage-shadow aspect-square"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sticky Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white p-8 rounded-2xl heritage-shadow border border-[#d0c5af]/20">
                <h2 className="text-xl font-bold text-[#b12b31] font-['Plus_Jakarta_Sans'] mb-6">
                  Service Packages
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "Bridal HD Makeup",
                      price: "₹25,000",
                    },
                    {
                      title: "The Heritage Glow",
                      price: "₹65,000",
                    },
                    {
                      title: "Guest Makeup",
                      price: "₹5,000",
                    },
                  ].map((pkg, i) => (
                    <div
                      key={i}
                      className={
                        i !== 2 ? "pb-6 border-b border-[#e6e1e2]" : ""
                      }
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{pkg.title}</h3>
                        <span className="font-bold text-[#b12b31]">
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#b12b31]/5 p-6 rounded-2xl flex gap-4">
                <span className="material-symbols-outlined text-[#b12b31] text-3xl">
                  security
                </span>

                <div>
                  <h4 className="font-bold text-[#b12b31]">Heritage Secure™</h4>

                  <p className="text-xs text-[#4d4635]">
                    Your payment is protected. Artist only receives payment
                    after service completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-4 glass-effect shadow-[0_-10px_30px_-15px_rgba(177,43,49,0.15)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hidden md:flex flex-col">
            <span className="text-xs text-[#4d4635]">Starting from</span>
            <span className="text-xl font-bold text-[#b12b31] font-['Plus_Jakarta_Sans']">
              ₹25,000
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="h-14 px-6 rounded-xl bg-[#006d2f] text-white font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">phone</span>
              Call Now
            </button>

            <button className="h-14 px-6 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">chat_bubble</span>
              WhatsApp
            </button>

            <button className="h-14 px-10 rounded-xl bg-[#b12b31] text-white font-bold">
              Request Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
