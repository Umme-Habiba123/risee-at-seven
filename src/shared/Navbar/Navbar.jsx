import { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    label: "Services",
    dropdown: ["SEO", "Content Marketing", "PR & Digital", "Social Media", "LLM Search"],
  },
  {
    label: "International",
    dropdown: ["UK", "USA (New York)", "EU"],
  },
  {
    label: "About",
    dropdown: ["Our Story", "Team", "Culture", "Awards"],
  },
  { label: "Work" },
  { label: "Careers" },
  { label: "Blog" },
  { label: "Webinar" },
];

const PLATFORMS = [
  {
    name: "Google",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z"/>
      </svg>
    ),
  },
  { name: "Gemini", icon: null, italic: true },
  {
    name: "TikTok",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    name: "Pinterest",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E60023">
        <path d="M12 0a12 12 0 0 0-4.373 23.178c-.01-.937-.02-2.376.246-3.4.244-.935 1.64-6.952 1.64-6.952s-.419-.838-.419-2.078c0-1.948 1.13-3.404 2.535-3.404 1.196 0 1.775.898 1.775 1.975 0 1.203-.766 3.003-1.163 4.672-.33 1.395.699 2.53 2.074 2.53 2.489 0 4.159-3.208 4.159-7.004 0-2.889-1.927-5.057-5.428-5.057-3.954 0-6.414 2.952-6.414 6.248 0 1.138.337 1.94.867 2.562.243.288.278.404.19.736-.063.245-.208.834-.267 1.067-.086.337-.352.457-.645.332-1.793-.735-2.63-2.71-2.63-4.931 0-3.665 3.099-8.093 9.262-8.093 4.983 0 8.219 3.627 8.219 7.522 0 5.16-2.849 9.026-7.046 9.026-1.41 0-2.74-.762-3.194-1.62l-.869 3.346c-.313 1.2-1.16 2.7-1.728 3.609A12 12 0 1 0 12 0z"/>
      </svg>
    ),
  },
  { name: "GIPHY", icon: null },
  {
    name: "reddit",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF4500">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .379-.239l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.462.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0-.464-.463c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73z"/>
      </svg>
    ),
  },
  { name: "amazon", icon: null, italic: true },
];

const ALL_PLATFORMS = [...PLATFORMS, ...PLATFORMS];

function NavItem({ item }) {
  const [open, setOpen] = useState(false);

  if (!item.dropdown) {
    return (
      <span className="relative text-sm font-medium text-white/85 cursor-pointer group whitespace-nowrap hover:text-white transition-colors duration-200">
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
      </span>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="relative text-sm font-medium text-white/85 cursor-pointer group whitespace-nowrap flex items-center gap-1 hover:text-white transition-colors duration-200">
        {item.label}
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
      </span>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-lg min-w-[180px] z-50 overflow-hidden animate-fadeIn">
          {item.dropdown.map((d) => (
            <a
              key={d}
              href="#"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-150 border-b border-gray-50 last:border-0"
            >
              {d}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RiseAtSeven() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpenIdx, setMobileOpenIdx] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="font-sans mx-3 my-1 rounded-2xl">
      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-white cursor-pointer select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em", fontSize: "1.6rem" }}
          >
            Rise at Seven
            <sup className="text-green-400 text-xs ml-0.5" style={{ fontSize: "0.5em" }}>®</sup>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white whitespace-nowrap">
              Get In Touch
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2 w-6" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-md border-t border-white/10 px-5 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label}>
                <div
                  className="flex items-center justify-between py-3 border-b border-white/10 cursor-pointer"
                  onClick={() => setMobileOpenIdx(mobileOpenIdx === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  {item.dropdown && (
                    <svg className={`w-4 h-4 text-white/60 transition-transform ${mobileOpenIdx === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                {item.dropdown && mobileOpenIdx === i && (
                  <div className="pl-4 pb-2 flex flex-col gap-1">
                    {item.dropdown.map((d) => (
                      <a key={d} href="#" className="text-sm text-white/60 py-1.5 hover:text-white transition-colors">{d}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="mt-3 w-full bg-white text-gray-900 text-sm font-semibold py-3 rounded-full hover:bg-white/80 transition-colors">
              Get In Touch ↗
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO BANNER ─── */}
      {/* NOTE: No mt-20 wrapper, no rounded-2xl — starts from very top so navbar sits on top of image */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden rounded-2xl"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 text-white text-center px-5 max-w-5xl w-full pt-16">
          {/* Award label */}
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase mb-3 opacity-90 animate-fadeUp"
            style={{ animationDelay: "0.1s" }}
          >
            #1 Most Recommended Content Marketing Agency
          </p>

          {/* Award badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fadeUp" style={{ animationDelay: "0.25s" }}>
            {["🏆 Global Search Awards", "▲ The Drum", "🌐 UK Social Media Awards", "★ Content Awards"].map((b) => (
              <span
                key={b}
                className="px-3 py-1 text-[0.65rem] font-semibold tracking-widest uppercase rounded border border-white/30 bg-white/10 backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Main headline */}
          <h1
            className="leading-none mb-4 animate-fadeUp"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 9.5rem)",
              letterSpacing: "0.01em",
              animationDelay: "0.4s",
            }}
          >
            We Create
            <br />
            <span className="inline-flex items-center gap-4">
              Category
              <span className="inline-block w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden align-middle shadow-2xl" style={{ position: "relative", top: "-4px" }}>
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
            className="text-lg md:text-2xl font-light tracking-widest mb-14 opacity-90 animate-fadeUp"
            style={{ animationDelay: "0.55s" }}
          >
            on every searchable platform
          </p>
        </div>

        {/* ─── Platform Ticker ─── */}
        <div className="relative z-10 w-full overflow-hidden animate-fadeUp" style={{ animationDelay: "0.7s" }}>
          <div
            className="flex gap-10 items-center"
            style={{
              animation: "scrollLeft 22s linear infinite",
              width: "max-content",
            }}
          >
            {ALL_PLATFORMS.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap group"
              >
                {p.icon && <span className="opacity-80 group-hover:opacity-100">{p.icon}</span>}
                <span className={`text-sm font-semibold tracking-wide ${p.italic ? "italic" : ""}`}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom Footer Info ─── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <p className="text-xs md:text-sm text-white/80 max-w-sm leading-relaxed">
            Organic media planners creating, distributing & optimising{" "}
            <strong className="text-white font-bold">search-first</strong> content for SEO,
            Social, PR, Ai and LLM search
          </p>
          <p className="text-xs md:text-sm text-white/80 text-left sm:text-right">
            <strong className="text-white font-bold">4 Global Offices serving</strong>
            <br />
            UK, USA (New York) & EU
          </p>
        </div>
      </section>

      {/* ─── Keyframes via style tag ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.18s ease forwards;
        }
      `}</style>
    </div>
  );
}