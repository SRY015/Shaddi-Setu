import React, { useState } from "react";
import Navbar from "../../../Layouts/Navbar";
import Bookings from "./Bookings";
import DashboardContent from "./DashboardContent";
import Profile from "./Profile";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  MdDashboard,
  MdOutlinePalette,
  MdOutlinePayments,
} from "react-icons/md";
import PortfolioManagement from "./PortfolioManagement";
import { useAuth } from "../../../Context/AuthContext";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { id: "portfolio", label: "Portfolio", icon: <MdOutlinePalette /> },
  { id: "bookings", label: "Bookings", icon: <FaRegCalendarAlt /> },
  { id: "earnings", label: "Earnings", icon: <MdOutlinePayments /> },
  { id: "profile", label: "Profile", icon: <CgProfile /> },
];

const DummyPage = ({ title }: { title: string }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f1edee] min-h-75 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[#1c1b1c] mb-2">{title}</h2>
      <p className="text-gray-500">
        This is a dummy {title.toLowerCase()} page for navigation flow.
      </p>
    </div>
  </div>
);

const ArtistDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const { userProfile } = useAuth();

  const updateActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "portfolio":
        return <PortfolioManagement userProfile={userProfile} />;
      case "bookings":
        return <Bookings />;
      case "earnings":
        return <DummyPage title="Earnings" />;
      case "profile":
        return <Profile userProfile={userProfile} />;
      default:
        return (
          <DashboardContent
            userProfile={userProfile}
            updateActiveTab={updateActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f9] text-[#1c1b1c]">
      {/* Header */}
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar - Fixed and doesn't scroll */}
        <aside className="hidden md:block fixed left-0 top-16 w-64 h-[calc(100vh-64px)] border-r border-[#f1edee] bg-white overflow-y-auto z-40">
          <nav className="py-4 space-y-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 w-full text-left px-4 py-3 font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#fff1f0] text-[#b12b31] border-r-4"
                    : "hover:bg-[#f7f2f3]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content with left margin to account for fixed sidebar */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
          {renderContent()}
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#f1edee] h-16 flex items-center justify-around z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-medium ${
              activeTab === tab.id ? "text-[#b12b31]" : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ArtistDashboard;
