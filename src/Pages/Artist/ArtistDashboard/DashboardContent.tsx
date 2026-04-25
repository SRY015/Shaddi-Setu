import { ImPower, ImRadioChecked2 } from "react-icons/im";
import {
  MdOutlineInsertPhoto,
  MdOutlineBadge,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
}

const DashboardContent = ({
  userProfile,
}: {
  userProfile: UserProfile | null;
}) => {
  console.log(userProfile);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1c1b1c]">{`Namaste, ${userProfile?.fullName.split(" ")[0]}`}</h1>
        <p className="text-gray-500 mt-2">
          Your heritage journey continues today.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold">Complete Your Profile</h3>
                <p className="text-sm text-stone-500">
                  Higher completion leads to 3x more bookings
                </p>
              </div>
              {/* <div className="text-[#b12b31] font-bold text-md border-2 rounded-full flex items-center px-2 py-3">
              65%
            </div> */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#bf262e] animate-ping opacity-20"></div>
                <div className="relative text-[#b12b31] font-bold text-sm border-2 rounded-full flex items-center px-2 py-3">
                  65%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Professional Details", "Portfolio Photos"].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-xl bg-[#f7f2f3] flex items-center space-x-3"
                >
                  <span className="material-symbols-outlined text-[#b12b31]">
                    {item === "Professional Details" ? (
                      <MdOutlineBadge />
                    ) : (
                      <MdOutlineInsertPhoto />
                    )}
                  </span>
                  <span className="font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f1edee]">
            <h2 className="text-xl font-bold mb-4">Recent Booking Requests</h2>
            <div className="space-y-4">
              {["Priya Sharma", "Vikram Singh"].map((name) => (
                <div
                  key={name}
                  className="p-4 rounded-xl bg-[#f7f2f3] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold">{name}</h3>
                    <p className="text-sm text-gray-500">
                      Wedding Booking Request
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-[#b12b31] text-white font-medium">
                      Accept
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 font-medium">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
            <div className="flex items-center space-x-2">
              <ImPower className="mb-2 text-[#735c00]" />
              <h3 className="font-bold text-lg mb-4">Profile Strength</h3>
            </div>
            <div className="h-2 rounded-full bg-[#f1edee] overflow-hidden mb-4">
              <div className="h-full w-3/4 bg-[#735c00]" />
            </div>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-700" />{" "}
                <span>Phone Verified</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-700" />{" "}
                <span>Business GST Added</span>
              </li>
              <li className="text-[#b12b31] font-medium flex items-center space-x-2">
                <MdOutlineRadioButtonUnchecked />{" "}
                <span>Add 5 more Portfolio images</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#e6e1e2] rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
              Virasat Live Activity
            </h3>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <ImRadioChecked2 className="text-green-800" />
                <span>Booked in Jaipur today</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImRadioChecked2 className="text-green-800" />
                <span>Verified by 50+ Families</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImRadioChecked2 className="text-green-800" />
                <span>2 Artists joined in Rajasthan</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-6 border border-green-100 bg-green-50">
            <h3 className="font-bold text-green-700 mb-2">
              Need help with bookings?
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Our community manager is available to assist you.
            </p>
            <button className="w-full py-3 rounded-lg bg-green-700 text-white font-bold text-sm">
              WhatsApp Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
