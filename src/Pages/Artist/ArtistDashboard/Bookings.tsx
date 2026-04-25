import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import {
  MdOutlineEventNote,
  MdAutoFixHigh,
  MdAutoAwesome,
} from "react-icons/md";
const bookingsData = {
  upcoming: [
    {
      id: 1,
      status: "Confirmed",
      statusType: "confirmed",
      name: "Priya Sharma",
      amount: "₹25,000",
      payment: "Full Payment",
      date: "Nov 24, 2024",
      venue: "Grand Palace, Jaipur",
      service: "Bridal Makeup & Hair",
      serviceIcon: <MdAutoFixHigh />,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATW4o-U0memggCwSMTMBI0VeLotM9TRA4VA2U-6Q2CWQq4AsH3FRwEftVR1kLft9BwBUbk8yueBDdK5TXyWo_UTf_DYQKyodB3_jQugfXQxZYqNhxfClezKssqXqWpdhS1ctFnxokV5ERY3jhBgAsC9swi4sT38Tqjk-249B5UN7tmgUg4E2fLW37CrSbvsQZlCYR0TpyAQK6fcTPQ0KXqhKSKxpjGvFZv9UqhRQMop7PVvN5fwBRKcBHOroBuIEM8D7_AWJvgWXXA",
    },
    {
      id: 2,
      status: "Pending Confirmation",
      statusType: "pending",
      name: "Ananya Verma",
      amount: "₹12,000",
      payment: "Request",
      date: "Dec 02, 2024",
      venue: "Heritage Resort, Udaipur",
      service: "Bridal Mehndi Art",
      serviceIcon: <MdAutoFixHigh />,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBR0X1slAi6D8EQDrox5Y_kSyO-K1lHM9mIUdhSYQKL-8BS01ukjuI1AzZTmVh_SmQyqxqKNut7o3spGKrQUIZzFj9uNSVv1NJmdsWllOdUYCOSry1BiNDayWNOlOJR1lvOHzGNgSVowTaOkQe3U70UZPWQXID-dATk7ebksTUIY9uRq1ZuaguAFjUns_osuGa0Jpk0MP44g6j71sjJRCTFLzHO3947WOlbAVCDMgYrpo71S4wP60_8o0R1vIPDGCukZSLCyrp06ClD",
    },
  ],
  completed: [
    {
      id: 3,
      status: "Completed",
      statusType: "confirmed",
      name: "Rahul & Megha",
      amount: "₹45,000",
      payment: "Premium Package",
      date: "Nov 18, 2024",
      venue: "Hawa Mahal View, Jaipur",
      service: "Pre-Wedding Shoot",
      serviceIcon: <MdAutoFixHigh />,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbdWNlUJylfTlmyr1JoEp2c4PIdwZHm-o6ikXicLwqcLUEZAyhhJiJamaLUzjbpm1qXc9LYnkNc5ZPTYnopUU-TV0zDXHQW8YEantm987g-arvacYcddNed5FA09KUX87oNoiZcgdsG1u0LQ74fff9A5Aeg0zoaMx9Nn9yCAf-iCYsu4aI4zL3UzZ_ZfZUb1GN5geHVETUDr1pLrvOCYy9L9XfYdaOEax2F415DUN43Vy6GZ0TqxvL563riUco_OFIjvrIPI-H-oRY",
    },
  ],
  cancelled: [
    {
      id: 4,
      status: "Cancelled",
      statusType: "cancelled",
      name: "Sneha Kapoor",
      amount: "₹18,000",
      payment: "Refunded",
      date: "Oct 10, 2024",
      venue: "Royal Garden, Delhi",
      service: "Engagement Makeup",
      serviceIcon: <MdAutoFixHigh />,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATW4o-U0memggCwSMTMBI0VeLotM9TRA4VA2U-6Q2CWQq4AsH3FRwEftVR1kLft9BwBUbk8yueBDdK5TXyWo_UTf_DYQKyodB3_jQugfXQxZYqNhxfClezKssqXqWpdhS1ctFnxokV5ERY3jhBgAsC9swi4sT38Tqjk-249B5UN7tmgUg4E2fLW37CrSbvsQZlCYR0TpyAQK6fcTPQ0KXqhKSKxpjGvFZv9UqhRQMop7PVvN5fwBRKcBHOroBuIEM8D7_AWJvgWXXA",
    },
  ],
};

const filterTabs = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const statusStyles: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-600",
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const bookings = bookingsData[activeTab as keyof typeof bookingsData] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div>
        <h1 className="text-3xl font-bold text-[#1c1b1c]">My Bookings</h1>
        <div className="flex items-center gap-2 mt-2 bg-[#e6e1e2] px-4 py-2 rounded-xl w-fit max-w-full">
          <span className="material-symbols-outlined text-[#735c00] text-base leading-none">
            verified
          </span>
          <span className="text-xs font-medium text-[#1c1b1c]">
            You have{" "}
            <span className="text-[#b12b31] font-bold">12 new requests</span>{" "}
            for the upcoming wedding season
          </span>
        </div>
      </div> */}

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-[#f1edee] space-x-4">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`md:px-4 py-2.5 whitespace-nowrap text-sm font-medium border-b-2 -mb-px transition cursor-pointer ${
              activeTab === tab.id
                ? "text-[#b12b31] font-bold border-[#b12b31]"
                : "text-gray-500 border-transparent hover:text-[#b12b31]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----- */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-[#b12b31] text-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
          <p className="text-[#ffb3af] text-[10px] uppercase tracking-widest font-semibold mb-2">
            Peak Season Alert
          </p>
          <h3 className="text-xl font-bold mb-2">
            Your calendar is 85% full for November
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Most bookings are concentrated in the Jaipur and Udaipur regions.
            Consider adjusting your travel fee for these locations.
          </p>
        </div>
        <div className="bg-[#fed65b] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-4 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
          <div>
            <span className="material-symbols-outlined text-xl block mb-2">
              <MdAutoAwesome />
            </span>
            <h4 className="font-bold text-lg">Artist of the Month</h4>
          </div>
          <p className="text-sm text-black/65 leading-relaxed">
            Based on 45 successful bookings in the last 3 months.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#f1edee] flex flex-col md:flex-row md:items-start gap-4"
          >
            {/* Image: full width on mobile, fixed compact size on md+ */}
            <div className="w-full md:w-36 h-44 md:h-36 rounded-xl overflow-hidden shrink-0">
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body: takes all remaining space, min-w-0 prevents overflow */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-1 ${statusStyles[booking.statusType]}`}
                  >
                    {booking.status}
                  </span>
                  <h3 className="font-bold text-lg text-[#1c1b1c] leading-tight">
                    {booking.name}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#b12b31] font-bold text-base">
                    {booking.amount}
                  </p>
                  <p className="text-xs text-gray-500">{booking.payment}</p>
                </div>
              </div>

              {/* Meta: always 2-col grid — each item is tiny so fits even at 200px wide */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                {[
                  {
                    icon: <MdOutlineEventNote />,
                    label: "Date",
                    value: booking.date,
                  },
                  {
                    icon: <IoLocationSharp />,
                    label: "Venue",
                    value: booking.venue,
                  },
                  {
                    icon: booking.serviceIcon,
                    label: "Service",
                    value: booking.service,
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[#b12b31] text-base leading-tight shrink-0 mt-0.5">
                      {icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase font-bold text-gray-500 leading-none mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs font-medium text-[#1c1b1c] wrap-break-word leading-snug">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-2 md:w-24 shrink-0">
              {booking.statusType === "pending" ? (
                <>
                  <button className="flex-1 md:flex-none py-2 px-3 rounded-xl bg-[#b12b31] text-white font-bold text-xs text-center">
                    Accept
                  </button>
                  <button className="flex-1 md:flex-none py-2 px-3 rounded-xl border border-gray-300 font-bold text-xs text-center">
                    Decline
                  </button>
                </>
              ) : booking.statusType === "cancelled" ? (
                <button className="flex-1 md:flex-none py-2 px-3 rounded-xl border border-gray-300 bg-white font-bold text-gray-700 text-xs text-center">
                  View Details
                </button>
              ) : (
                <>
                  <button className="flex-1 md:flex-none py-2 px-3 rounded-xl bg-[#006d2f] text-white font-bold text-xs text-center">
                    Contact
                  </button>
                  <button className="flex-1 md:flex-none py-2 px-3 rounded-xl border border-gray-300 bg-white font-bold text-gray-700 text-xs text-center">
                    Details
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="bg-[#e6e1e2] rounded-2xl px-6 py-4 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max text-sm font-medium">
          <span className="font-bold text-[#735c00]">Recently Booked:</span>
          <div className="flex gap-3 text-stone-600">
            <span>Anita Singh in Alwar</span>
            <span>•</span>
            <span>Suresh Kumar in Bharatpur</span>
            <span>•</span>
            <span>Pinky Devi in Dausa</span>
            <span>•</span>
            <span>Rajesh Gupta in Jaipur</span>
            <span>•</span>
            <span>Meena Patil in Udaipur</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Bookings;
