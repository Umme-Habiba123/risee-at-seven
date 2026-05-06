import { useEffect, useRef, useState } from "react";

const WORKS = [
  {
    id: 0,
    client: "SIXT",
    years: "[2023-2025]",
    tag: "Car Rental · SEO",
    description: "Driving organic growth across 100+ global markets with search-first content strategy and technical SEO at scale.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85",
    accent: "#ff6b00",
  },
  {
    id: 1,
    client: "Dojo - B2B",
    years: "[2021-2025]",
    tag: "Fintech · Content",
    description: "Building category authority for the UK's fastest-growing payment platform through semantic content and digital PR.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
    accent: "#00c9a7",
  },
  {
    id: 2,
    client: "Magnet Trade - B2B",
    years: "[2023-2024]",
    tag: "Trade · SEO",
    description: "Repositioning a heritage trade brand for digital-first discovery, capturing high-intent B2B search demand.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=85",
    accent: "#6c63ff",
  },
  {
    id: 3,
    client: "Leading E Sim",
    years: "[2023-2025]",
    tag: "Telecom · Global",
    description: "Establishing a new challenger brand as the global category leader for eSIM travel connectivity.",
    image: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?w=900&q=85",
    accent: "#f7c948",
  },
  {
    id: 4,
    client: "brand globally",
    years: "",
    tag: "Strategy · PR",
    description: "International brand expansion through coordinated PR, LLM search optimisation and social amplification.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=85",
    accent: "#ff4f79",
    muted: true,
  },
];

export default function FeaturedWork() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0); // 0–1 within section
  const itemRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // overall section progress 0→1
      const total = rect.height - windowH;
      const prog = Math.max(0, Math.min(1, -rect.top / total));
      setScrollProgress(prog);

      // which item is active based on left-side text panels
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = windowH * 0.45;
        if (r.top <= mid && r.bottom > mid) setActiveIdx(i);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // right column images translate based on scroll progress
  // Each image stacks; translateY shifts them all together to create "scrolling" feel
  const imgTranslate = scrollProgress * -(WORKS.length - 1) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&display=swap');

        .fw-root { font-family: 'DM Sans', sans-serif; background: #0d0d0d; color: #fff; }

        /* Left text items */
        .fw-item-text {
          opacity: 0.22;
          transform: translateY(6px);
          transition: opacity 0.5s ease, transform 0.5s ease, color 0.4s ease;
          cursor: default;
        }
        .fw-item-text.active {
          opacity: 1;
          transform: translateY(0);
        }
        .fw-item-text.prev {
          opacity: 0.14;
        }

        /* Right image stack */
        .fw-img-stack {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          border-radius: 18px;
        }
        .fw-img-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .fw-img-slide {
          flex-shrink: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          border-radius: 18px;
          position: relative;
        }
        .fw-img-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
        }
        .fw-img-slide:hover img {
          transform: scale(1.03);
        }

        /* image overlay tag */
        .fw-img-tag {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 0.72rem;
          font-weight: 500;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .fw-img-tag svg { width: 12px; height: 12px; }

        /* accent dot */
        .accent-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
          vertical-align: middle;
          flex-shrink: 0;
        }

        /* year badge */
        .year-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 500;
          color: #888;
          letter-spacing: 0.04em;
          margin-left: 10px;
          vertical-align: middle;
          position: relative;
          top: -4px;
        }

        /* mobile: normal scroll stack */
        @media (max-width: 1023px) {
          .fw-img-stack { position: relative; height: auto; }
          .fw-img-inner { flex-direction: column; transform: none !important; }
          .fw-img-slide { height: 60vw; min-height: 240px; max-height: 420px; margin-bottom: 1rem; }
          .fw-item-text { opacity: 1 !important; transform: none !important; }
        }

        /* subtle noise */
        .fw-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .fw-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          padding: 0.6rem 1.4rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, gap 0.2s;
          background: transparent;
        }
        .fw-view-all:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.5);
          gap: 14px;
        }
      `}</style>

      <div className="fw-noise" />

      <section ref={containerRef} className="fw-root relative w-full">

        {/* ── HEADER ── */}
        <div className="sticky top-0 z-20 w-full px-6 md:px-10 lg:px-14 pt-10 pb-6 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0d0d0d 70%, transparent)" }}>
          <span className="text-sm font-medium text-white/60 tracking-wide">Featured Work</span>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14 pb-32">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* ── LEFT: scrollable text list ── */}
            <div className="lg:w-[52%] flex flex-col">
              {/* spacer so first item starts mid-screen */}
              <div className="hidden lg:block" style={{ height: "30vh" }} />

              {WORKS.map((w, i) => (
                <div
                  key={w.id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`fw-item-text ${activeIdx === i ? "active" : activeIdx > i ? "prev" : ""}`}
                  style={{ marginBottom: i < WORKS.length - 1 ? "clamp(2rem, 5vw, 4rem)" : "0" }}
                >
                  <div className="flex items-start gap-0">
                    <span
                      className="accent-dot mt-4 hidden lg:inline-block"
                      style={{ background: w.accent, opacity: activeIdx === i ? 1 : 0, transition: "opacity 0.4s" }}
                    />
                    <div>
                      <h2
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: w.muted
                            ? "clamp(2.8rem, 6vw, 6rem)"
                            : "clamp(2.8rem, 6vw, 6rem)",
                          fontWeight: w.muted ? 700 : 700,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.0,
                          color: w.muted ? "rgba(255,255,255,0.22)" : "#fff",
                          margin: 0,
                        }}
                      >
                        {w.client}
                        {w.years && (
                          <span className="year-badge">{w.years}</span>
                        )}
                      </h2>

                      {/* description — only visible when active */}
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.5)",
                          maxWidth: "420px",
                          marginTop: "0.5rem",
                          lineHeight: 1.6,
                          overflow: "hidden",
                          maxHeight: activeIdx === i ? "80px" : "0px",
                          opacity: activeIdx === i ? 1 : 0,
                          transition: "max-height 0.4s ease, opacity 0.4s ease",
                        }}
                      >
                        {w.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* spacer at bottom */}
              <div className="hidden lg:block" style={{ height: "50vh" }} />

              {/* View all CTA */}
              <div className="mt-12">
                <a href="#" className="fw-view-all">
                  View all work
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ── RIGHT: sticky image column ── */}
            <div className="lg:w-[48%]">
              {/* Mobile: stacked images */}
              <div className="flex flex-col gap-4 lg:hidden">
                {WORKS.map((w) => (
                  <div key={w.id} className="fw-img-slide relative rounded-2xl overflow-hidden" style={{ height: "60vw", minHeight: 220 }}>
                    <img src={w.image} alt={w.client} />
                    <div className="fw-img-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                      {w.tag}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                  </div>
                ))}
              </div>

              {/* Desktop: sticky scrolling stack */}
              <div className="fw-img-stack hidden lg:block">
                <div
                  className="fw-img-inner"
                  style={{ transform: `translateY(${imgTranslate}vh)` }}
                >
                  {WORKS.map((w) => (
                    <div key={w.id} className="fw-img-slide">
                      <img src={w.image} alt={w.client} />
                      <div className="absolute inset-0 rounded-[18px]"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />
                      <div className="fw-img-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        {w.tag}
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: w.accent, display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}