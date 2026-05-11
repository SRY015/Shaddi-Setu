import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface NavItemTypes {
  path: string;
  label: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/search-artist", label: "Search" },
    {
      path:
        userProfile?.role === "photographer" ||
        userProfile?.role === "makeupArtist"
          ? "/artist-dashboard"
          : "/customer-dashboard",
      label: "Dashboard",
    },
    { path: "/user-login", label: user == null ? "Login" : "Logout" },
  ];

  const [filteredNavItems, setFilteredNavItems] =
    useState<NavItemTypes[]>(navItems);

  useEffect(() => {
    if (user == null) {
      setFilteredNavItems(
        navItems.filter((items: NavItemTypes) => items.label != "Dashboard"),
      );
    }
  }, [user]);

  const handleLogout = (label: string) => {
    if (label === "Logout") {
      logout();
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 ${
      isActive
        ? "text-[#b12b31] border-b-2 border-[#b12b31] pb-1 font-semibold"
        : "text-stone-600 hover:text-[#b12b31] font-medium"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-white/70">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b12b31]/10 text-[#b12b31] font-bold">
              GV
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-[#1c1b1c]">
                Gramin Vivah
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#7f7663]">
                Rural Wedding Marketplace
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {filteredNavItems.map((item) => (
              <NavLink
                onClick={() => handleLogout(item.label)}
                key={item.path}
                to={item.path}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/search-artist"
              className="rounded-full bg-[#b12b31] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(177,43,49,0.18)] transition hover:bg-[#94202b]"
            >
              Book Now
            </NavLink>

            {user !== null && (
              <div>
                <img
                  src={
                    userProfile?.profilePicture ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#b12b31]"
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center text-[#b12b31]"
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-[#b12b31] transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#b12b31] transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#b12b31] transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100 border-t border-stone-200"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-[#fff1f1] text-[#b12b31] font-semibold"
                      : "text-stone-700 hover:bg-stone-50 hover:text-[#b12b31] font-medium"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
