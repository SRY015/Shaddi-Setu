function Footer() {
  return (
    <footer className="w-full py-12 bg-stone-100 flex flex-col items-center gap-6 px-4">
      <div className="font-['Plus_Jakarta_Sans'] font-bold text-stone-800 text-lg">
        Heritage Weddings
      </div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-stone-500 font-['Lexend'] text-xs text-center">
        <a href="#" className="hover:text-[#b12b31] transition-colors">
          About Us
        </a>

        <a href="#" className="hover:text-[#b12b31] transition-colors">
          Terms of Service
        </a>

        <a href="#" className="hover:text-[#b12b31] transition-colors">
          Privacy Policy
        </a>

        <a href="#" className="hover:text-[#b12b31] transition-colors">
          Help Center
        </a>
      </div>

      <div className="text-stone-500 font-['Lexend'] text-xs text-center">
        © 2024 Heritage Weddings. Crafted for your special day.
      </div>
    </footer>
  );
}

export default Footer;
