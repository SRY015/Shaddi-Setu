import { FaBook, FaCamera } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#efe4df] bg-[#fff8f8]">
      {/* Background Glow */}
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-[#b12b31]/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#ffb5b5]/10 blur-3xl" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-10 py-16">
        {/* Top Section */}
        <div className="grid gap-14 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b12b31] text-xl font-extrabold text-white shadow-lg">
                GV
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#1c1b1c]">
                  Gramin Vivah
                </h2>

                <p className="text-sm text-[#7f7663]">
                  Rural Wedding Marketplace
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#5a534b]">
              Connecting families with trusted local makeup artists,
              photographers, and wedding professionals across rural India.
              Making wedding planning simple, affordable, and reliable.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-[#5a534b]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b12b31]/10 text-[#b12b31]">
                  ✉
                </span>

                <a
                  href="mailto:hello@graminvivah.com"
                  className="transition-colors hover:text-[#b12b31]"
                >
                  hello@graminvivah.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-[#5a534b]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b12b31]/10 text-[#b12b31]">
                  ☎
                </span>

                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-[#7f7663]">
              Explore
            </h3>

            <div className="flex flex-col gap-4 text-sm text-[#5a534b]">
              {[
                "About Us",
                "How It Works",
                "Terms of Service",
                "Privacy Policy",
                "Help Center",
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-2 transition-all hover:text-[#b12b31]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b12b31]/40 transition-all group-hover:w-3 group-hover:bg-[#b12b31]" />
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-[#7f7663]">
              Services
            </h3>

            <div className="flex flex-col gap-4 text-sm text-[#5a534b]">
              {[
                "Makeup Artists",
                "Photographers",
                "Wedding Shoots",
                "Bridal Packages",
                "Event Coverage",
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-center gap-2 transition-all hover:text-[#b12b31]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b12b31]/40 transition-all group-hover:w-3 group-hover:bg-[#b12b31]" />
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-[#7f7663]">
              Stay Connected
            </h3>

            <p className="mb-5 text-sm leading-6 text-[#5a534b]">
              Get updates about trending artists and wedding inspiration.
            </p>

            {/* Newsletter */}
            <div className="mb-6 flex overflow-hidden rounded-2xl border border-[#eadad3] bg-white shadow-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm outline-none"
              />
              <button className="bg-[#b12b31] px-5 text-sm font-semibold text-white transition-all hover:bg-[#971f27] cursor-pointer">
                Join
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {["Instagram", "Facebook", "LinkedIn"].map((item, i) => (
                <button
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#eadad3] bg-white text-[#5a534b] shadow-sm transition-all hover:-translate-y-1 hover:border-[#b12b31] hover:text-[#b12b31] cursor-pointer"
                >
                  {item === "Instagram" ? (
                    <FaCamera />
                  ) : item === "Facebook" ? (
                    <FaBook />
                  ) : (
                    <IoBagCheck />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-linear-to-r from-transparent via-[#d9c7c0] to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-[#7f7663]">
            © {new Date().getFullYear()} Gramin Vivah. Crafted for rural
            celebrations across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#7f7663]">
            <a href="#" className="hover:text-[#b12b31] transition-colors">
              Terms
            </a>

            <a href="#" className="hover:text-[#b12b31] transition-colors">
              Privacy
            </a>

            <a href="#" className="hover:text-[#b12b31] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
