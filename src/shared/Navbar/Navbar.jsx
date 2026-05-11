import { useState, useRef } from "react";

const NAV_ITEMS = [
  {
    label: "Services",
    dropdown: {
      heading: "Core Services",
      cols: [
        [
          "Search & Growth Strategy",
          "Onsite SEO",
          "Content Experience",
          "B2B Marketing",
        ],
        [
          "Digital PR",
          "Social Media & Campaigns",
          "Data & Insights",
          "Social SEO/Search",
        ],
      ],
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      cta: "View All Services",
    },
  },
  {
    label: "Industries",
    dropdown: {
      heading: "Industries",
      cols: [
        ["eCommerce", "Finance", "Travel & Hospitality", "Technology"],
        ["Healthcare", "Retail", "Education", "B2B"],
      ],
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
      cta: "View All Industries",
    },
  },
  {
    label: "International",
    dropdown: {
      heading: "Our Offices",
      cols: [["United Kingdom", "USA (New York)", "European Union"]],
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
      cta: "Learn More",
    },
  },
  {
    label: "About",
    dropdown: {
      heading: "About Us",
      cols: [["Our Story", "Team", "Culture", "Awards & Recognition"]],
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      cta: "Meet the Team",
    },
  },
  { label: "Work" },
  { label: "Careers", badge: "25" },
  { label: "Blog" },
  { label: "Webinar" },
];

const PLATFORMS = [
  {
    name: "Google",
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="currentColor"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="currentColor"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="currentColor"
        />
      </svg>
    ),
  },

  {
    name: "TikTok",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    icon: (
      <svg
        className="w-5 h-5 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0a12 12 0 0 0-4.373 23.178c-.01-.937-.02-2.376.246-3.4.244-.935 1.64-6.952 1.64-6.952s-.419-.838-.419-2.078c0-1.948 1.13-3.404 2.535-3.404 1.196 0 1.775.898 1.775 1.975 0 1.203-.766 3.003-1.163 4.672-.33 1.395.699 2.53 2.074 2.53 2.489 0 4.159-3.208 4.159-7.004 0-2.889-1.927-5.057-5.428-5.057-3.954 0-6.414 2.952-6.414 6.248 0 1.138.337 1.94.867 2.562.243.288.278.404.19.736-.063.245-.208.834-.267 1.067-.086.337-.352.457-.645.332-1.793-.735-2.63-2.71-2.63-4.931 0-3.665 3.099-8.093 9.262-8.093 4.983 0 8.219 3.627 8.219 7.522 0 5.16-2.849 9.026-7.046 9.026-1.41 0-2.74-.762-3.194-1.62l-.869 3.346c-.313 1.2-1.16 2.7-1.728 3.609A12 12 0 1 0 12 0z" />
      </svg>
    ),
  },

  {
    name: "reddit",
    className: "text-white text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .379-.239l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.462.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0-.464-.463c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73z" />
      </svg>
    ),
  },
];

const ALL_PLATFORMS = [...PLATFORMS, ...PLATFORMS];

function MegaDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const enter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };
  const leave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.dropdown) {
    return (
      <span className="relative inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white/85 cursor-pointer rounded-full transition-all duration-200 hover:bg-white/15 whitespace-nowrap select-none">
        {item.label}
        {item.badge && (
          <span className="absolute -top-1.5 -right-1 bg-teal-400 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
            {item.badge}
          </span>
        )}
      </span>
    );
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <span
        className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium cursor-pointer rounded-full border transition-all duration-200 whitespace-nowrap select-none ${
          open
            ? "bg-white text-gray-900 border-white"
            : "text-white/85 border-transparent hover:bg-white/15"
        }`}
      >
        {item.label}
        <span className="text-xs font-bold opacity-60 ml-0.5">+</span>
      </span>

      {open && (
        <div className="absolute top-full left-0 mt-3 z-50 animate-dropIn">
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex"
            style={{ minWidth: 560 }}
          >
            <div className="flex-1 p-7">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-5">
                {item.dropdown.heading}
              </p>
              <div className="flex gap-10">
                {item.dropdown.cols.map((col, ci) => (
                  <ul key={ci} className="flex flex-col gap-3">
                    {col.map((d) => (
                      <li key={d}>
                        <a
                          href="#"
                          className="text-[15px] font-medium text-gray-800 hover:text-black hover:underline underline-offset-2 transition-colors duration-150"
                        >
                          {d}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <button className="mt-7 inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
                {item.dropdown.cta}
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </button>
            </div>
            <div className="w-44 shrink-0">
              <img
                src={item.dropdown.image}
                alt=""
                className="w-full h-full object-cover"
                style={{ minHeight: 210 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RiseAtSeven() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpenIdx, setMobileOpenIdx] = useState(null);

  return (
    <div className="font-sans rounded-2xl mx-2">
      {/* ── OUTER WRAPPER: announcement bar + navbar overlap hero ── */}
      <div className="relative">
        {/* ── ANNOUNCEMENT BAR ── */}
        <div className="relative z-50 w-full my-2 font-bold bg-teal-100 py-2 m-1 rounded-2xl text-center text-xs text-gray-800 tracking-wide">
          🚨 The CategoryLeaderBoard - Live Now
        </div>

        {/* ── NAVBAR — transparent, floats over hero bg ── */}
        <nav className="absolute mt-5 top-8 left-0 right-0 z-50 w-full">
          <div className="w-full mx-auto px-5 lg:px-8 h-14 flex items-center justify-between gap-4">
            {/* Logo — never moves */}
            <div
              className="shrink-0 cursor-pointer sansita-font select-none text-white"
              style={{
                fontFamily: "sans-serif",
                letterSpacing: "-0.04em",
                fontSize: "1.30rem",
              }}
            >
              Rise at Seven
              <sup
                className="text-green-400 ml-0.5"
                style={{ fontSize: "0.42em", verticalAlign: "super" }}
              >
                ®
              </sup>
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_ITEMS.map((item) => (
                <MegaDropdown key={item.label} item={item} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="hidden sm:flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white whitespace-nowrap">
                Get In Touch
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </button>
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-4 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2 w-6" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-1 shadow-xl">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.label}>
                  <div
                    className="flex items-center justify-between py-3 border-b border-gray-50 cursor-pointer"
                    onClick={() =>
                      setMobileOpenIdx(mobileOpenIdx === i ? null : i)
                    }
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {item.label}
                    </span>
                    {item.dropdown && (
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform ${mobileOpenIdx === i ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  {item.dropdown && mobileOpenIdx === i && (
                    <div className="pl-4 pb-2 flex flex-col gap-1">
                      {item.dropdown.cols.flat().map((d) => (
                        <a
                          key={d}
                          href="#"
                          className="text-sm text-gray-600 py-1.5 hover:text-black transition-colors"
                        >
                          {d}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className="mt-3 w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-full hover:bg-gray-700 transition-colors">
                Get In Touch ↗
              </button>
            </div>
          )}
        </nav>

        {/* ── HERO: blurred bg, text on top ── */}
        <div
          className="relative rounded-2xl p-6 overflow-hidden"
          style={{ minHeight: "calc(100vh - 32px - 56px)" }}
        >
          {/* Blurred background — covers entire hero */}
          <div
            className="absolute inset-0 z-0 "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px) brightness(0.68) saturate(1.35)",
              transform: "scale(1.06)",
            }}
          />
          <div className="absolute inset-0 z-0 bg-black/15" />

          {/* Hero content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-5 pt-20 pb-30 min-h-[calc(100vh-88px)]">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase mb-3 text-white/90 animate-fadeUp"
              style={{ animationDelay: "0.1s" }}
            >
              #1Most Recommended <br></br> Content Marketing Agency
            </p>

            <div
              className="flex flex-wrap justify-center items-center gap-4 mb-4 animate-fadeUp"
              style={{ animationDelay: "0.25s" }}
            >

              <img className="-mr-5" src="https://i.ibb.co.com/MDT1MKLG/6.png " alt="" />
              {[
                // "/src/assets/6.png",
                "https://i.ibb.co.com/PG19HLDh/2.webp",
                "https://i.ibb.co.com/xNBfk1K/3.webp",
                "https://i.ibb.co.com/G40qfZC1/UKSocial-Media-Awards-White.webp",
                // "/src/assets/7.png", 
              ].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center opacity-80 hover:opacity-100 transition duration-300 "
                >
      
                  <img
                    src={logo}
                    alt="award logo"
                    className="h-5 md:h-5 object-contain"
                  />
              
                </div>
              ))}

                               <img className="-ml-5" src="https://i.ibb.co.com/LDd3dMjF/7.png" alt="" />
            </div>

            <h1
              className="leading-none mb-2 text-white animate-fadeUp"
              style={{
                fontFamily: " sans-serif",
                fontSize: "clamp(2.1rem, 7vw, 8.1rem)",
             
                animationDelay: "0.4s",
                letterSpacing: "-0.06em",
              }}
            >
              We Create
              <br />
              <span className="inline-flex items-center gap-2 rounded-2xl ">
                Category
                <span
                  className="inline-block w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden align-middle shadow-2xl"
                  style={{ position: "relative", top: "-4px" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
                Leaders
              </span>
            </h1>

            <p
              className="text-lg md:text-3xl font-semibold tracking-widest mb-14 text-white/90 animate-fadeUp"
              style={{ animationDelay: "0.55s",
                letterSpacing: "0.01em",
               }}
            >
              on every searchable platform
            </p>

            {/* Ticker */}
            <div
              className="w-full overflow-hidden animate-fadeUp"
              style={{ animationDelay: "0.7s" }}
            >
              <div
                className="flex gap-10 items-center marquee mx-auto text-white"
                style={{ width: "max-content" }}
              >
                {ALL_PLATFORMS.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap group"
                  >
                    {p.icon && (
                      <span className="opacity-80 group-hover:opacity-100">
                        {p.icon}
                      </span>
                    )}
                    <span
                      className={`text-sm font-semibold tracking-wide ${p.italic ? "italic" : ""}`}
                    >
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <p className="text-xs md:text-sm text-white/80 max-w-sm leading-relaxed">
              Organic media planners creating, distributing & optimising{" "}
              <strong className="text-white font-bold">search-first</strong>{" "}
              content for SEO, Social, PR, Ai and LLM search
            </p>
            <p className="text-xs md:text-sm text-white/80 text-left sm:text-right">
              <strong className="text-white font-bold">
                4 Global Offices serving
              </strong>
              <br />
              UK, USA (New York) & EU
            </p>
          </div>
        </div>

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          opacity: 0;
          animation: fadeUp 0.75s ease forwards;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-dropIn {
          animation: dropIn 0.18s ease forwards;
        }
      `}</style>
      </div>
      {/* end outer relative wrapper */}
    </div>
  );
}
