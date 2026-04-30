import { useMemo, useState } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Headphones,
  Music,
  Utensils,
  Brush,
} from "lucide-react";

const tabs = ["Upcoming", "Completed", "Cancelled"];

const pastCelebrations = [
  {
    id: 1,
    title: "DJ Rahul & Sound",
    subtitle: "Sangeet Night • Oct 2024",
    amount: "₹22,000",
    status: "Completed",
    action: "Invoice",
    icon: Music,
  },
  {
    id: 2,
    title: "Royal Catering Co.",
    subtitle: "Reception Dinner • Sep 2024",
    amount: "₹3,40,000",
    status: "Completed",
    action: "Invoice",
    icon: Utensils,
  },
  {
    id: 3,
    title: "Mehendi by Kavita",
    subtitle: "Engagement • Aug 2024",
    amount: "Refunded",
    status: "Cancelled",
    action: "Policies",
    icon: Brush,
  },
];

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [search, setSearch] = useState("");

  const filteredPast = useMemo(() => {
    return pastCelebrations.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#fdfbfc] text-[#1c1b1c] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#fdfbfc]/90 backdrop-blur-xl border-b border-[#ece7e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                My Bookings
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your upcoming celebrations
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your bookings..."
                  className="w-full rounded-full border border-[#ece7e8] bg-white pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#b12b31]/10"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-white">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-white">
                  <HelpCircle className="h-5 w-5" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="user"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs */}
        <div className="flex gap-6 sm:gap-10 overflow-x-auto border-b border-[#ece7e8] pt-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition ${
                activeTab === tab
                  ? "text-[#b12b31] border-[#b12b31]"
                  : "text-gray-400 border-transparent hover:text-[#b12b31]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trust Ribbon */}
        <section className="mt-8 bg-white rounded-2xl border border-[#ece7e8] p-5 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Headphones className="h-5 w-5 text-[#735c00]" />
            </div>
            <div>
              <h3 className="font-bold">Curated Quality</h3>
              <p className="text-sm text-gray-500">
                All artists are strictly vetted for premium heritage standards.
              </p>
            </div>
          </div>

          <div className="text-sm font-semibold text-gray-600">
            Trusted by 50+ premium families
          </div>
        </section>

        {/* Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Featured Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#ece7e8] overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
                alt="artist"
                className="h-full min-h-80 w-full object-cover"
              />

              <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#735c00] bg-yellow-50 px-3 py-1 rounded-full w-fit">
                      Makeup & Hair
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">
                        Professional Fee
                      </p>
                      <p className="text-2xl font-black">₹45,000</p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black mt-4">
                    Ananya Sharma Studios
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Dec 24, 2024
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> 08:00 AM
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-gray-500 italic leading-relaxed border-l-4 border-[#b12b31]/20 pl-4">
                    Looking forward to the bridal session at the Grand Taj.
                    We’ll start with the traditional base followed by the floral
                    hair arrangement.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 rounded-2xl bg-[#b12b31] text-white py-4 font-bold hover:opacity-95">
                    Complete Session Prep
                  </button>
                  <button className="rounded-2xl border px-5 hover:bg-gray-50">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#ece7e8] p-6 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552"
              alt="photography"
              className="rounded-2xl h-56 w-full object-cover"
            />

            <div className="mt-5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#735c00]">
                  Photography
                </span>
                <span className="text-xl font-black">₹1,20,000</span>
              </div>

              <h3 className="text-xl font-bold mt-3">Vows & Frames</h3>

              <div className="space-y-3 mt-5 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Jan 15–16, 2025
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Jaipur, Rajasthan
                </div>
              </div>

              <button className="w-full mt-6 py-4 rounded-2xl bg-[#b12b31]/5 text-[#b12b31] font-bold hover:bg-[#b12b31]/10">
                Manage Booking
              </button>
            </div>
          </div>
        </section>

        {/* Lower Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl border border-[#ece7e8] p-6 flex flex-col sm:flex-row gap-5 items-center">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
              alt="decor"
              className="w-28 h-28 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <p className="text-xs uppercase font-bold text-[#735c00]">
                Decoration • Feb 02, 2025
              </p>
              <h4 className="text-xl font-bold mt-2">Bloom Event Decor</h4>
              <p className="text-[#b12b31] font-black text-xl mt-2">₹85,000</p>
            </div>
            <button>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-[#b12b31]/10 bg-[#b12b31]/2 p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center">
              <Headphones className="h-6 w-6 text-[#b12b31]" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Heritage Concierge</h4>
              <p className="text-sm text-gray-500 mt-1">
                Need assistance with vendor coordination? Our luxury event
                experts are on standby.
              </p>
            </div>
            <button className="px-5 py-3 rounded-xl bg-white border font-semibold">
              Contact Support
            </button>
          </div>
        </section>

        {/* Past Celebrations */}
        <section className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black">Past Celebrations</h2>
              <p className="text-sm text-gray-500 mt-1">
                Reflect on your previous heirloom experiences
              </p>
            </div>

            <button className="flex items-center gap-2 text-[#b12b31] font-bold">
              Archive Directory <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPast.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#ece7e8] p-6"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>

                  <div className="border-t mt-6 pt-4 flex justify-between items-center">
                    <span className="font-black">{item.amount}</span>
                    <button className="text-[#b12b31] text-sm font-bold">
                      {item.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
