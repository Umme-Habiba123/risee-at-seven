import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function MurkUp() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        .dd-root { font-family: 'DM Sans', sans-serif; }
        .dd-heading { font-family: 'Instrument Serif', serif; }

        /* logo ticker */
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerScroll 28s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* fade-up reveal */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.05s; }
        .reveal-d2 { transition-delay: 0.18s; }
        .reveal-d3 { transition-delay: 0.32s; }
        .reveal-d4 { transition-delay: 0.46s; }

        /* inline image wiggle */
        .inline-photo { transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s; }
        .inline-photo:hover { transform: rotate(-4deg) scale(1.08); box-shadow: 0 12px 36px rgba(0,0,0,0.18); }

        /* CTA buttons */
        .cta-primary {
          background: #fff;
          border: 1.5px solid #d0d0d0;
          color: #111;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          white-space: nowrap;
          text-decoration: none;
        }
        .cta-primary:hover { background: #111; color: #fff; border-color: #111; }

        .cta-ghost {
          background: transparent;
          border: none;
          color: #111;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          cursor: pointer;
          transition: gap 0.2s, opacity 0.2s;
          white-space: nowrap;
          text-decoration: none;
        }
        .cta-ghost:hover { gap: 10px; opacity: 0.7; }

        /* logo item */
        .logo-item { transition: opacity 0.2s, transform 0.2s; opacity: 0.75; }
        .logo-item:hover { opacity: 1; transform: scale(1.06); }

        /* grain */
        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: inherit;
        }

        /* hide mobile-only subtext on larger screens */
        .mobile-subtext { display: none; }

        /* ── MOBILE OVERRIDES (≤639px) ── */
        @media (max-width: 639px) {
          .mobile-main-content {
            padding: 1.75rem 1.25rem 2rem !important;
          }
          .mobile-left-col { display: none !important; }
          .mobile-right-col {
            width: 100% !important;
            text-align: left !important;
          }
          .mobile-hero-heading {
            font-size: 2.65rem !important;
            line-height: 1.06 !important;
            letter-spacing: -0.03em !important;
            margin-bottom: 0.75rem !important;
            text-align: left !important;
          }
          .mobile-thumb {
            width: 2.8rem !important;
            height: 2.8rem !important;
            border-radius: 8px !important;
            bottom: -4px !important;
          }
          .mobile-subtext {
            display: block !important;
            font-size: 0.82rem !important;
            line-height: 1.5 !important;
            letter-spacing: -0.01em !important;
            font-weight: 500 !important;
            color: #222 !important;
            margin-bottom: 1.4rem !important;
            max-width: 100% !important;
          }
          .mobile-btn-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.55rem !important;
            width: 100% !important;
          }
          .mobile-btn-row .cta-primary,
          .mobile-btn-row .cta-ghost {
            width: 100% !important;
            padding: 0.7rem 1.2rem !important;
            font-size: 0.85rem !important;
            justify-content: space-between !important;
            border: 1.5px solid #d8d5d0 !important;
            border-radius: 999px !important;
            background: #fff !important;
            color: #111 !important;
          }
        }

        /* ── LARGE DEVICE: left text nudge up ── */
        @media (min-width: 640px) {
          .desktop-left-col {
            margin-top: -2rem !important;
          }
        }
        @media (min-width: 1024px) {
          .desktop-left-col {
            margin-top: -3.5rem !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="dd-root grain relative w-full overflow-hidden"
        style={{ background: "#f0ede8" }}
      >

        {/* ── LOGO TICKER ── */}
        <div
          className={`reveal reveal-d1 ${inView ? "visible" : ""} w-full mt-10 border-b border-gray-200/70 py-5 overflow-hidden`}
          style={{ background: "#f0ede8" }}
        >
          <div className="ticker-track">
            {[...Array(2)].map((_, gi) => (
              <div key={gi} className="flex items-center gap-0">
                <div className="logo-item flex items-center px-8 md:px-12 shrink-0">
                  <span className="text-lg text-black font-medium tracking-wide whitespace-nowrap">The agency behind ...</span>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0 flex items-center">
                  <div className="w-8 h-8 rounded-full text-black bg-gray-400/30 backdrop-blur-sm flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                      <path d="M8.984 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.501v5.575c2.896 1.047 5.06-.21 5.06-3.984 0-3.897-1.652-5.509-5.09-6.463-1.206-.338-3.237-.791-5.439-.73zM2 17.108l4.175 1.92V15.4l-4.175-1.79v3.498zm14.687-.289c-1.46.332-3.013.257-4.5-.23v3.556l4.5-1.508v-1.818zm-8.512-1.543v3.544l4.025-1.69v-3.543l-4.025 1.689z"/>
                    </svg>
                  </div>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0">
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2.5rem", fontStyle: "italic", fontWeight: 800, color: "#000", letterSpacing: "-0.01em" }}>Kroger</span>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0 flex items-center gap-1">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#000" }}>Hub</span>
                  <span className="relative inline-flex items-center">
                    <svg viewBox="0 0 14 14" className="w-3 h-3 text-orange-500 absolute -top-1 left-1" fill="currentColor"><circle cx="7" cy="7" r="7"/></svg>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#000" }}>Sp</span>
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#000" }}>t</span>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M4.102 3.074C5.81 1.666 7.993.8 10.37.8c1.476 0 3.12.44 4.557 1.158C13.2 3.36 11.63 5.41 10.37 7.348 9.11 5.41 7.54 3.36 5.813 1.958L4.102 3.074zm15.795 0l-1.71-1.116C16.46 3.36 14.89 5.41 13.63 7.348c-1.26-1.938-2.83-3.988-4.557-5.39C10.51 1.24 12.154.8 13.63.8c2.377 0 4.56.866 6.267 2.274zM2.55 4.5C1.307 6.124.606 8.126.606 10.262c0 3.24 1.593 6.11 4.05 7.898C6.08 16.258 7.71 13.99 8.83 11.9 6.41 9.48 4.24 6.88 2.55 4.5zm18.9 0c-1.69 2.38-3.86 4.98-6.28 7.4 1.12 2.09 2.75 4.36 4.174 6.26 2.457-1.788 4.05-4.658 4.05-7.898 0-2.136-.7-4.138-1.944-5.762zM10.37 9.078C9.04 11.22 7.16 13.62 5.37 15.6c1.418 1.56 3.13 2.53 5 2.53s3.582-.97 5-2.53c-1.79-1.98-3.67-4.38-5-6.522z"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#000", letterSpacing: "0.06em" }}>XBOX</span>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#000", letterSpacing: "-0.02em" }}>
                    Si<span style={{ fontStyle: "italic" }}>X</span>T
                  </span>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0 flex flex-col items-center leading-none">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.2em", color: "#000" }}>REVOLUTION</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.5rem", fontWeight: 800, letterSpacing: "0.18em", color: "#000" }}>BEAUTY LONDON</span>
                </div>
                <div className="logo-item px-8 md:px-12 shrink-0 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300/40 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                      <path d="M8.984 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.501v5.575c2.896 1.047 5.06-.21 5.06-3.984 0-3.897-1.652-5.509-5.09-6.463-1.206-.338-3.237-.791-5.439-.73zM2 17.108l4.175 1.92V15.4l-4.175-1.79v3.498zm14.687-.289c-1.46.332-3.013.257-4.5-.23v3.556l4.5-1.508v-1.818zm-8.512-1.543v3.544l4.025-1.69v-3.543l-4.025 1.689z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="mobile-main-content w-full mx-auto px-6 md:px-10 lg:px-10 py-16 md:py-24">
          <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-12 lg:gap-12">

            {/* Left: descriptor — hidden on mobile, nudged up on desktop */}
            <div
              className={`mobile-left-col desktop-left-col reveal reveal-d2 ${inView ? "visible" : ""} lg:w-[38%] flex justify-start shrink-0`}
            >
              <p
                className="text-base md:text-lg lg:text-2xl  leading-snug font-semibold text-gray-900"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.095em" }}
              >
                A global team of search-first content marketers <br /> engineering semantic relevancy & category <br /> signals for both the internet and people
              </p>
            </div>

            {/* Right: heading + CTAs (full width on mobile) */}
            <div className={`mobile-right-col reveal reveal-d3 ${inView ? "visible" : ""} lg:w-[62%] text-left lg:text-right`}>

              {/* Heading */}
              <h2
                className="dd-heading mobile-hero-heading leading-none text-gray-900 lg:mr-44 mb-8"
                style={{
                  fontSize: "clamp(4.1rem, 6vw, 6.1rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.005em",
                  lineHeight: 1.02,
                }}
              >
                Driving Demand&nbsp;&amp;&nbsp;
                <br className="hidden sm:block" />
                <span className="inline-flex items-end justify-start lg:mr-56 gap-3 flex-wrap">
                  Discovery
                  <span
                    className="mobile-thumb inline-photo inline-block align-bottom rounded-xl overflow-hidden shadow-lg cursor-pointer shrink-0"
                    style={{
                      width: "clamp(56px, 6vw, 80px)",
                      height: "clamp(56px, 6vw, 80px)",
                      position: "relative",
                      bottom: "-4px",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=160&q=80"
                      alt="team"
                      className="w-full h-full object-cover"
                    />
                  </span>
                </span>
              </h2>

              {/* Mobile-only subtext — hidden on md+ (shown via left col on desktop) */}
             <div className="">
               <p className="mobile-subtext" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A global team of search-first content marketers engineering semantic relevancy &amp; category signals for both the internet and people
              </p>
             </div>

              {/* CTA row */}
              <div className={`mobile-btn-row reveal reveal-d4 ${inView ? "visible" : ""} flex flex-wrap justify-start lg:ml-72 gap-3`}>
                <a href="#" className="cta-primary" style={{ padding: "0.6rem 1.4rem" }}>
                  Our Story
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
                <a href="#" className="cta-ghost" style={{ padding: "0.6rem 1.4rem" }}>
                  Our Services
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}