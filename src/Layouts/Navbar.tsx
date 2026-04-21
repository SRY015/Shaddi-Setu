// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#fdf8f9]/80 shadow-sm">
//       <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
//         <div className="text-2xl font-extrabold text-[#b12b31] italic tracking-tight">
//           Gramin Vivah
//         </div>

//         <div className="hidden md:flex items-center gap-8">
//           <NavLink to="/" className="text-stone-600 hover:text-[#b12b31]">
//             Home
//           </NavLink>
//           <NavLink
//             to="/search-artist"
//             className="text-stone-600 hover:text-[#b12b31]"
//           >
//             Search
//           </NavLink>
//           <NavLink
//             to="/artist-onboarding"
//             className="text-stone-600 hover:text-[#b12b31]"
//           >
//             Join as Artist
//           </NavLink>
//           <NavLink
//             to="/user-login"
//             className="text-stone-600 hover:text-[#b12b31]"
//           >
//             Login
//           </NavLink>
//           <NavLink
//             to="/customer-dashboard"
//             className="text-stone-600 hover:text-[#b12b31]"
//           >
//             Dashboard
//           </NavLink>
//         </div>

//         <button className="md:hidden text-[#b12b31] text-2xl">☰</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// //text-[#b12b31] border-b-2 border-[#b12b31] pb-1 font-bold

import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/search-artist", label: "Search" },
    { path: "/artist-onboarding", label: "Join as Artist" },
    { path: "/user-login", label: "Login" },
    { path: "/customer-dashboard", label: "Dashboard" },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 ${
      isActive
        ? "text-[#b12b31] border-b-2 border-[#b12b31] pb-1 font-bold"
        : "text-stone-600 hover:text-[#b12b31] font-medium"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#fdf8f9]/80 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(177,43,49,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl sm:text-2xl font-extrabold italic tracking-tight text-[#b12b31] whitespace-nowrap"
          >
            Gramin Vivah
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger */}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-125 opacity-100 border-t border-stone-200"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-[#fff1f1] text-[#b12b31] font-bold"
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
