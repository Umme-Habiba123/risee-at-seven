import { useState, useRef, useEffect } from "react";

const socialIcons = [
  {
    name: "Facebook",
    href: "#",
    svg: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    svg: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    svg: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    svg: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function BrandName() {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    function fit() {
      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!wrap || !text) return;
      // binary-search the largest font size that fits
      let lo = 10, hi = 300;
      text.style.fontSize = hi + "px";
      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2;
        text.style.fontSize = mid + "px";
        if (text.scrollWidth <= wrap.clientWidth) lo = mid;
        else hi = mid;
      }
      setFontSize(lo);
    }
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full select-none px-2 sm:px-4 lg:px-6 mt-2 overflow-hidden">
      <h1
        ref={textRef}
        className="text-white font-black leading-none whitespace-nowrap"
        style={{
          fontSize: fontSize + "px",
          letterSpacing: "-0.02em",
          lineHeight: 0.88,
          display: "inline-block",
        }}
      >
        Rise at Seven
        <sup
          style={{
            fontSize: "0.28em",
            verticalAlign: "super",
            fontWeight: 900,
            marginLeft: "0.06em",
          }}
        >
          ®
        </sup>
      </h1>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{`
        /* Social icon arrow — always visible on mobile (matches screenshot) */
        @media (max-width: 639px) {
          .social-arrow { opacity: 1 !important; }
          .footer-nav-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0 !important;
          }
          .footer-nav-col {
            border-right: 1px solid #2a2a2a;
            padding: 1.25rem 0 1.25rem 0 !important;
          }
          .footer-nav-col:last-child { border-right: none; }
          .footer-nav-col a {
            padding: 0.18rem 0 !important;
            font-size: 0.82rem !important;
          }
          .footer-locations {
            border-top: 1px solid #2a2a2a;
            padding: 1.25rem 0 !important;
          }
          .footer-locations a {
            font-size: 0.82rem !important;
            padding: 0.18rem 0 !important;
          }
          .footer-brand {
            font-size: clamp(3rem, 14vw, 5rem) !important;
          }
        }
      `}</style>

      <footer
        className="w-full bg-[#111111] text-white rounded-2xl m-2"
        style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif", maxWidth: "calc(100% - 16px)" }}
      >
        {/* ── TOP SECTION ── */}
        <div className="px-5 sm:px-10 lg:px-14 pt-10 pb-6">

          {/* Newsletter + Social */}
          <div className="mb-6 sm:mb-8">
            <p className="text-white font-bold text-sm sm:text-base leading-snug mb-3">
              Stay updated with Rise news
            </p>
            <div className="flex items-center gap-0 w-full max-w-xs mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#222222] text-white placeholder-gray-500 text-sm px-4 py-3 rounded-l-full focus:outline-none border-none"
                style={{ minWidth: 0 }}
              />
              <button
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold transition-all duration-200 hover:scale-105"
                style={{ background: "#4ECDC4" }}
                aria-label="Subscribe"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Social icons — arrow always shown on mobile */}
            <div className="flex flex-wrap gap-2">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  href={icon.href}
                  aria-label={icon.name}
                  className="group relative w-9 h-9 rounded-full border border-[#333] flex items-center justify-center text-white hover:border-[#4ECDC4] hover:text-[#4ECDC4] transition-colors duration-200 overflow-hidden"
                >
                  {/* icon — hidden on mobile, shown on md+ */}
                  <span className="hidden sm:flex">{icon.svg}</span>
                  {/* on mobile: show icon + arrow together */}
                  <span className="flex sm:hidden items-center gap-0.5 scale-90">
                    {icon.svg}
                    <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                  {/* desktop hover arrow */}
                  <span className="social-arrow hidden sm:block opacity-0 group-hover:opacity-100 absolute bottom-0.5 right-0.5 transition-opacity duration-200">
                    <svg width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── NAV LINKS ── */}
          {/* Mobile: 2-col grid for first two nav groups, then locations full row */}
          {/* Desktop: 3 cols side by side */}

          {/* Mobile layout */}
          <div className="block sm:hidden">
            <div className="footer-nav-grid border-t border-[#2a2a2a]">
              {/* Col 1 */}
              <div className="footer-nav-col flex flex-col pr-4">
                {["Services", "Work", "About", "Culture", "Meet The Risers"].map((item) => (
                  <a key={item} href="#" className="text-white font-semibold text-sm hover:text-[#4ECDC4] transition-colors duration-200 flex items-center gap-0.5 group py-1">
                    {item}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
                  </a>
                ))}
              </div>
              {/* Col 2 */}
              <div className="footer-nav-col flex flex-col pl-4">
                {["Testimonials", "Blog & Resources", "Webinars", "Careers"].map((item) => (
                  <a key={item} href="#" className="text-white font-semibold text-sm hover:text-[#4ECDC4] transition-colors duration-200 flex items-center gap-0.5 group py-1">
                    {item}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Locations — full width row below */}
            <div className="footer-locations border-t border-[#2a2a2a] flex flex-col pt-5 pb-2">
              {["Sheffield", "Manchester", "London", "New York", "Contact"].map((item) => (
                <a key={item} href="#" className="text-white font-semibold text-sm hover:text-[#4ECDC4] transition-colors duration-200 flex items-center gap-0.5 group py-1">
                  {item}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop layout — 3 cols */}
          <div className="hidden sm:grid grid-cols-3 xl:grid-cols-3 gap-8 xl:gap-10">
            <div className="flex flex-col gap-3">
              {["Services", "Work", "About", "Culture", "Meet The Risers"].map((item) => (
                <a key={item} href="#" className="text-white font-semibold text-sm hover:text-[#4ECDC4] transition-colors duration-200 w-fit flex items-center gap-1 group">
                  {item}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Testimonials", "Blog & Resources", "Webinars", "Careers"].map((item) => (
                <a key={item} href="#" className="text-white font-semibold text-sm hover:text-[#4ECDC4] transition-colors duration-200 w-fit flex items-center gap-1 group">
                  {item}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Sheffield", "Manchester", "London", "New York", "Contact"].map((item) => (
                <a key={item} href="#" className="text-white font-semibold text-sm hover:text-[#4ECDC4] transition-colors duration-200 w-fit flex items-center gap-1 group">
                  {item}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── GIANT BRAND NAME — auto-fit to full width ── */}
        <BrandName />

        {/* ── BOTTOM BAR ── */}
        <div className="px-5 sm:px-10 lg:px-14 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] text-gray-500 flex-wrap">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
            <span className="hidden sm:inline">•</span>
            <span>Company Number 11955187</span>
            <span className="hidden sm:inline">•</span>
            <span>VAT Registered GB 322402945</span>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Terms &amp; conditions</a>
          </div>
          <span className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer">
            Website MadeByShape
          </span>
        </div>
      </footer>
    </>
  );
}