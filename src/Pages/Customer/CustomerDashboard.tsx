import Navbar from "../../Layouts/Navbar";

const CustomerDashboard = () => {
  return (
    <div className="bg-[#fdf8f9] text-[#1c1b1c] min-h-screen">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-24 md:pb-12 font-['Lexend']">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tight mb-2">
            Welcome, Ananya
          </h1>
          <p className="text-base md:text-lg text-[#4d4635] font-light">
            Your wedding planning journey is coming together beautifully.
          </p>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Action */}
            <div className="bg-linear-to-br from-[#b12b31] to-[#ff9591] p-8 rounded-[1.25rem] text-white shadow-[0_10px_30px_-5px_rgba(177,43,49,0.1)] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-['Plus_Jakarta_Sans'] font-bold mb-2">
                  Find More Artists
                </h3>

                <p className="text-sm opacity-90 mb-6">
                  Continue exploring photographers, makeup artists, and
                  decorators.
                </p>

                <button className="bg-white text-[#b12b31] px-6 py-4 rounded-lg font-bold flex items-center gap-2 w-full justify-center shadow-lg">
                  <span className="material-symbols-outlined">search</span>
                  Back to Search
                </button>
              </div>

              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12">
                brush
              </span>
            </div>

            {/* Saved Artists */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-['Plus_Jakarta_Sans'] font-bold">
                  Saved Artists
                </h2>

                <a href="#" className="text-[#b12b31] text-sm font-semibold">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {/* Artist 1 */}
                <div className="bg-white p-4 rounded-[1.25rem] flex gap-4 shadow-[0_10px_30px_-5px_rgba(177,43,49,0.1)]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1RMpG5FSZG9t7yaCZYWwT0wgunVA7WCvyamXSziSX1zWqO-1GugIJXxz60jPyS7JeUEAL7GIr8OipFA8rt5SnAXLXCh-RmZ0Qbagf8Bk39CMSSUu2oVamJD5twSdPCGlKLqmxqxCMxVjDXYU-T7qjYPFmc2aIq6FqKDZ-sPnXRdf3tXRTzw5hNwgnjsExkO71SBLjp7qoOMCgUX1mfDhj0mURSMF4ujFI-UHAGEazgJKk5A9oOlQNwSWUWYBt7Dm83lTHbuhIJSVs"
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold">Arjun K. Photography</h4>
                    <p className="text-xs text-[#4d4635]">Wedding & Events</p>

                    <div className="flex items-center mt-1 text-[#735c00]">
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="text-xs font-bold ml-1">4.9 (124)</span>
                    </div>
                  </div>

                  <button className="text-[#b12b31]">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>

                {/* Artist 2 */}
                <div className="bg-white p-4 rounded-[1.25rem] flex gap-4 shadow-[0_10px_30px_-5px_rgba(177,43,49,0.1)]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZHWbvqA67wFRIfQbboAykZmgOWXlfh8zLwXdfgA_k3q2nHHZ0_Laa2R9MgD6sNef7vk1lE97b3wP1Em2evMVlUft-eo8elMSRLd51DRajuY0BmYt2pO8941X-XSb6H1js8Bq5l7sd39HNlegDJJgtIfX_YsdNlKK98Zf-bQ3au7J0uRmJCpbD8WIgbmaN8SIXHbDzIGUC6LGdg6Dy3T2qIPBWeKR8V6WpOp-jHnR3qmyy-0wGiYJQVGbEZO4NqwgjMg9aOz-DSeE7"
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold">Meera Bridal Studio</h4>
                    <p className="text-xs text-[#4d4635]">Bridal Makeup</p>

                    <div className="flex items-center mt-1 text-[#735c00]">
                      <span className="material-symbols-outlined text-sm">
                        star
                      </span>
                      <span className="text-xs font-bold ml-1">4.8 (89)</span>
                    </div>
                  </div>

                  <button className="text-[#b12b31]">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Support Card */}
            <div className="bg-[#f7f2f3] p-6 rounded-[1.25rem] border border-[#d0c5af]/20">
              <h3 className="font-bold mb-2">Need help?</h3>

              <p className="text-sm text-[#4d4635] mb-4">
                Our wedding concierge is available to help you find the perfect
                artist.
              </p>

              <button className="w-full bg-[#006d2f] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold">
                <span className="material-symbols-outlined">call</span>
                WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-['Plus_Jakarta_Sans'] font-extrabold mb-6">
              My Bookings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large Booking */}
              <div className="md:col-span-2 bg-white rounded-[1.25rem] overflow-hidden shadow-[0_10px_30px_-5px_rgba(177,43,49,0.1)] flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-_KNCr_IdUz039MyUfh2-tiQvx9Driu3NfbRc7JcJmtTnYeFFFwkZxDxvMkxtQYX0SxwqfiNLrWSzLMvuGkaAg7vc989AkQGJcP2j1pEKfMrxHfLdlttWFaVmtDXbwuFRXV_6acjJqPOsiUE9XWNdiKg9VjMc1H-sX3AHnmMuAembe3Wd3qW9d944c_wwdWVd98uxIcp-J_Qw-xyPG4msvy7wdIbXyuBKo1JmyVeWmUbGsuun7xHT9nSgxcHUIQoDxL3aFTjSmYyJ"
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-[#fed65b] text-[#745c00] px-3 py-1 rounded-full text-xs font-bold">
                    PENDING
                  </div>
                </div>

                <div className="p-8 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-['Plus_Jakarta_Sans'] font-bold">
                        Grand Heritage Decorators
                      </h3>
                      <p className="text-[#4d4635]">
                        Full Mandap & Reception Styling
                      </p>
                    </div>

                    <p className="text-[#b12b31] font-bold text-xl">₹85,000</p>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-stone-100 px-3 py-2 rounded-lg text-sm">
                      Dec 14, 2024
                    </div>
                    <div className="bg-stone-100 px-3 py-2 rounded-lg text-sm">
                      Udaipur
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-[#b12b31] text-white py-4 rounded-lg font-bold">
                      Check Details
                    </button>

                    <button className="px-4 py-4 rounded-lg border border-[#7f7663] font-semibold">
                      Cancel Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
