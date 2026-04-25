import { FaRegIdBadge } from "react-icons/fa6";
import { IoMdAdd, IoIosNotifications } from "react-icons/io";
import {
  MdEdit,
  MdHistoryEdu,
  MdSchedule,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-[#fdf8f9] text-[#1c1b1c] pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-6 md:px-8 h-auto min-h-18 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-[#fdf8f9]/90 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(177,43,49,0.15)]">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            My Professional Profile
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#b12b31] uppercase tracking-wider">
              Profile Completeness
            </span>
            <div className="flex items-center gap-2">
              <div className="w-28 sm:w-32 h-1.5 bg-[#f1edee] rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-[#b12b31]" />
              </div>
              <span className="text-xs font-bold">85%</span>
            </div>
          </div>

          <button className="p-2 text-gray-600">
            <span className="material-symbols-outlined">
              <IoIosNotifications />
            </span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 py-6 sm:py-8">
        {/* Trust Ribbon */}
        {/* <div className="mb-8 sm:mb-10 overflow-x-auto rounded-xl bg-[#e6e1e2] py-3 px-4 sm:px-6">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max text-xs font-semibold text-[#4d4635]">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined text-[#735c00] text-sm">
                verified
              </span>
              <span>Verified by 120+ Families in Jaipur</span>
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined text-[#006d2f] text-sm">
                bolt
              </span>
              <span>Top Rated Mehendi Artist 2023</span>
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined text-[#b12b31] text-sm">
                history
              </span>
              <span>Booked 5 times this week</span>
            </div>
          </div>
        </div> */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Left Side */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8">
            {/* Personal Info */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
                <h3 className="text-lg sm:text-xl font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#ffdad7] flex items-center justify-center text-[#b12b31]">
                    <span className="material-symbols-outlined text-xl">
                      <FaRegIdBadge />
                    </span>
                  </span>
                  Personal Information
                </h3>

                <button className="text-[#b12b31] text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    <MdEdit />
                  </span>
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  ["Full Name", "Rajesh Kumar Meena"],
                  ["Service Type", "Mehendi Artist"],
                  ["Phone Number", "+91 98765 43210"],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 px-1">
                      {label}
                    </label>
                    <div className="bg-[#f7f2f3] rounded-xl px-4 py-3.5 font-medium text-sm sm:text-base wrap-break-word">
                      {value}
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="rajesh.mehendi@example.com"
                    className="w-full bg-[#f7f2f3] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
                  />
                </div>
              </div>
            </section>

            {/* Professional Bio */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#ffdad7] flex items-center justify-center text-[#b12b31]">
                  <span className="material-symbols-outlined text-xl">
                    <MdHistoryEdu />
                  </span>
                </span>
                Professional Bio
              </h3>

              <textarea
                rows={6}
                defaultValue="I have been a professional Mehendi artist for over 12 years, specializing in intricate Marwari and Arabic bridal designs. My journey started in my village near Jaipur, and now I travel across the state to bring traditional beauty to modern weddings."
                className="w-full bg-[#f7f2f3] rounded-xl px-4 py-4 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
              />
            </section>

            {/* Service Hours */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#ffdad7] flex items-center justify-center text-[#b12b31]">
                  <span className="material-symbols-outlined text-xl">
                    <MdSchedule />
                  </span>
                </span>
                Service Hours
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-175 border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-[10px] uppercase text-gray-400 font-bold">
                      <th>Day</th>
                      <th>Morning Shift</th>
                      <th>Evening Shift</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg-[#f7f2f3] rounded-l-xl px-4 py-4 font-bold">
                        Monday
                      </td>
                      <td className="bg-[#f7f2f3] px-4 py-4">09:00 - 13:00</td>
                      <td className="bg-[#f7f2f3] px-4 py-4">16:00 - 21:00</td>
                      <td className="bg-[#f7f2f3] rounded-r-xl px-4 py-4 text-center">
                        Active
                      </td>
                    </tr>

                    <tr className="opacity-70">
                      <td className="bg-[#f7f2f3] rounded-l-xl px-4 py-4 font-bold">
                        Sunday
                      </td>
                      <td
                        colSpan={2}
                        className="bg-[#f7f2f3] px-4 py-4 text-center italic text-sm text-gray-400"
                      >
                        Artist is Closed
                      </td>
                      <td className="bg-[#f7f2f3] rounded-r-xl px-4 py-4 text-center">
                        Off
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="space-y-6 md:space-y-8">
            {/* Service Packages */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ece7e8] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Service Packages</h3>
                <button className="w-8 h-8 rounded-full bg-[#b12b31] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">
                    <IoMdAdd />
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {["Full Bridal Mehendi", "Engagement Special"].map((item) => (
                  <div key={item} className="p-4 rounded-xl bg-[#f7f2f3]">
                    <div className="flex justify-between gap-3 mb-2">
                      <span className="font-bold text-sm">{item}</span>
                      <span className="text-[#b12b31] font-bold">₹11,000</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Premium bridal package with elegant detailing.
                    </p>
                    <div className="flex justify-end gap-3 text-[10px] font-bold uppercase">
                      <button>Edit</button>
                      <button>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Service Area */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ece7e8] shadow-sm">
              <h3 className="text-lg font-bold mb-6">Service Area</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-gray-500">
                    Travel Distance Range
                  </label>
                  <span className="text-lg font-bold text-[#b12b31]">
                    50 KM
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="500"
                  defaultValue="50"
                  className="w-full accent-[#b12b31]"
                />

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-4">
                    Off Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                      (day) => (
                        <button
                          key={day}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${
                            day === "SUN"
                              ? "border-[#b12b31] text-[#b12b31]"
                              : "border-gray-200 text-gray-500"
                          }`}
                        >
                          {day}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col lg:flex-row items-center justify-between gap-6 p-5 sm:p-6 md:p-8 bg-[#e6e1e2]/50 rounded-2xl border border-white">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">
              <span className="material-symbols-outlined">
                <MdOutlinePublishedWithChanges />
              </span>
            </div>
            <div>
              <p className="font-bold">Last synced 2 hours ago</p>
              <p className="text-xs text-gray-500">
                Changes will be visible to potential clients immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
            <button className="flex-1 px-6 py-3 font-bold text-gray-600">
              Discard Changes
            </button>
            <button className="flex-1 px-8 py-3 bg-[#b12b31] text-white font-bold rounded-xl shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              Save & Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
