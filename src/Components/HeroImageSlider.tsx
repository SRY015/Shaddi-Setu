import { useEffect, useState } from "react";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlBrLUilmgjB_wprEkIIrjYGPm0zHFFuKRbs4MrmvbQ1oT0HgmFMouly-hB9dF7LF420NMBdLIqwQFjXHtMYsky9CJnBX9PtKAUad8uDG6RA2xiFHDF-jgGvJaMMUjQ6kqQFL2hpCCD5KPc28jy6GCL4rtV9JRK53Mq01kN_q1v_aIQcpW1Q61YM24LZ8hQy4puVkw__5eHJpmMxFjZ7VJBhSCd8lyZo2wCyHGpk3QUNpfC-1jWeiE6nA7hWXIIRho6tyxn0WwPVPs",

  "https://lh3.googleusercontent.com/aida-public/AB6AXuBW20suWv6-hWmpBaHNqh75f07uPQ_PlkmQpqX-bbaOYMm4ZFmWEYTXfscd2aH-lO7gj8ZDoXwAWdxSYDTLcZ1TZoZ7OcvkJYxlTH000rD8ikkaj6v4bgdfkOVQ0epEouuIVhNM_KpAvPhXgwPFIGeip6mMrKgH77JbR-ft5UeCRDycdy4roKnko4cIXlHh2stnBcqzLK3c-2GNUS3AODVUEZS38JxxJs1JLwUu93WA-L88RqZQN0ogiJj_fEL69bzzVYOVpaWyWH3X",

  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",

  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
];

export default function HeroImageStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:block w-full max-w-155 aspect-square mx-auto">
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        const isNext = index === (activeIndex + 1) % images.length;

        return (
          <div
            key={index}
            className="
              absolute
              rounded-2xl
              overflow-hidden
              transition-all
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]
              shadow-2xl
            "
            style={{
              width: "68%",
              height: "76%",

              zIndex: isActive ? 20 : isNext ? 10 : 0,

              top: isActive ? "13%" : "0%",

              right: isActive ? "15%" : "0%",

              transform: isActive
                ? "scale(1) rotate(0deg)"
                : isNext
                  ? "scale(0.92) rotate(-4deg)"
                  : "scale(0.85) rotate(-8deg)",

              opacity: isActive || isNext ? 1 : 0,
            }}
          >
            <img src={image} className="w-full h-full object-cover" />

            {!isActive && <div className="absolute inset-0 bg-black/10" />}
          </div>
        );
      })}

      {/* TESTIMONIAL CARD */}
      <div
        className="
          absolute
          bottom-[5%]
          left-0
          z-30
          bg-[#fff7ea]
          border
          border-yellow-200
          p-4 xl:p-5
          rounded-2xl
          shadow-xl
          w-55
          xl:w-65
        "
      >
        <p className="text-xs xl:text-sm leading-relaxed font-semibold text-[#3d2f1c]">
          “I found the perfect makeup artist within my budget!”
        </p>

        <div className="mt-3 flex items-center gap-2">
          <div className="h-7 w-7 xl:h-8 xl:w-8 rounded-full bg-[#b12b31] text-white flex items-center justify-center text-xs font-bold">
            P
          </div>

          <div>
            <p className="text-xs xl:text-sm font-bold text-[#1c1b1c]">
              Priya S.
            </p>

            <p className="text-[10px] xl:text-xs text-gray-500">Jaipur Bride</p>
          </div>
        </div>
      </div>
    </div>
  );
}
