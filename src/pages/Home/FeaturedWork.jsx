import { useEffect, useRef, useState, useCallback } from "react";

const WORKS = [
  { id: 0,  client: "JD Sports",          years: "[2020-2025]", tag: "Sports · SEO",          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=90",   searchTag: "Running Shoes" },
  { id: 1,  client: "Parkdean Resorts",   years: "[2019-2025]", tag: "Travel · Content",      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=90",  searchTag: "Easter Breaks" },
  { id: 2,  client: "Pooky",              years: "[2025]",       tag: "Interiors · SEO",       image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=90",   searchTag: "Rechargeable Lights" },
  { id: 3,  client: "Revolution Beauty",  years: "[2022-2025]", tag: "Beauty · eCommerce",    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=90",  searchTag: "Vegan Makeup" },
  { id: 4,  client: "Lloyds Pharmacy",   years: "[2022-23]",   tag: "Healthcare · SEO",      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=900&q=90",  searchTag: "Online Pharmacy" },
  { id: 5,  client: "PrettyLittleThing", years: "[2021-2023]", tag: "Fashion · Social",      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=90",  searchTag: "Trending Dresses" },
  { id: 6,  client: "SIXT",              years: "[2023-2025]", tag: "Automotive · SEO",      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=90",    searchTag: "Car Rental" },
  { id: 7,  client: "Dojo - B2B",        years: "[2021-2025]", tag: "Fintech · Content",     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=90",    searchTag: "Payment Terminals" },
  { id: 8,  client: "HubSpot",           years: "[2022-2025]", tag: "SaaS · Content",        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=90",  searchTag: "CRM Software" },
  { id: 9,  client: "Xbox",              years: "[2022-2024]", tag: "Gaming · Social",       image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=90",  searchTag: "Xbox Game Pass" },
  { id: 10, client: "Kroger",            years: "[2023-2025]", tag: "Grocery · US SEO",      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=90",     searchTag: "Weekly Deals" },
  { id: 11, client: "Bloom & Wild",      years: "[2023-2025]", tag: "eCommerce · Seasonal",  image: "https://images.unsplash.com/photo-1487530811015-780700bf91ee?w=900&q=90",  searchTag: "Flower Delivery" },
  { id: 12, client: "Specsavers",        years: "[2021-2025]", tag: "Healthcare · Local",    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=900&q=90",  searchTag: "Eye Test Near Me" },
  { id: 13, client: "Shawbrook Bank",    years: "[2023-2025]", tag: "Finance · Content",     image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=90",  searchTag: "Business Loans" },
  { id: 14, client: "Deichmann",         years: "[2022-2024]", tag: "Fashion · Europe",      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900&q=90",  searchTag: "Shoes Online" },
];

const SCROLL_PER_ITEM = 300;
const TOTAL_SCROLL    = SCROLL_PER_ITEM * WORKS.length;

const SIZE_BY_DIST = {
  "0":  { sz: "clamp(2.8rem,5.5vw,6.2rem)", fw: 800, op: 1    },
  "1":  { sz: "clamp(2.2rem,4.4vw,5.0rem)", fw: 700, op: 0.38 },
  "2":  { sz: "clamp(1.9rem,3.8vw,4.2rem)", fw: 700, op: 0.20 },
  "3":  { sz: "clamp(1.6rem,3.2vw,3.6rem)", fw: 700, op: 0.11 },
  "4":  { sz: "clamp(1.4rem,2.8vw,3.0rem)", fw: 700, op: 0.06 },
  "-1": { sz: "clamp(2.2rem,4.4vw,5.0rem)", fw: 700, op: 0.32 },
  "-2": { sz: "clamp(1.9rem,3.8vw,4.2rem)", fw: 700, op: 0.14 },
  "-3": { sz: "clamp(1.6rem,3.2vw,3.6rem)", fw: 700, op: 0.07 },
};
const DEFAULT_S = { sz: "clamp(1.2rem,2.4vw,2.5rem)", fw: 700, op: 0.03 };

export default function FeaturedWork() {
  const wrapRef  = useRef(null);
  const listRef  = useRef(null);
  const itemRefs = useRef([]);
  const rafRef   = useRef(null);

  const [activeIdx,    setActiveIdx]    = useState(0);
  const [itemProgress, setItemProgress] = useState(0);
  const [globalProg,   setGlobalProg]   = useState(0);

  /* ── scroll ── */
  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!wrapRef.current) return;
      const scrolled = -wrapRef.current.getBoundingClientRect().top;
      if (scrolled <= 0)              { setActiveIdx(0);              setItemProgress(0); setGlobalProg(0); return; }
      if (scrolled >= TOTAL_SCROLL)   { setActiveIdx(WORKS.length-1); setItemProgress(1); setGlobalProg(1); return; }
      setGlobalProg(scrolled / TOTAL_SCROLL);
      const idx    = Math.min(Math.floor(scrolled / SCROLL_PER_ITEM), WORKS.length - 1);
      const within = (scrolled % SCROLL_PER_ITEM) / SCROLL_PER_ITEM;
      setActiveIdx(idx);
      setItemProgress(within);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* ── centre active row in left list ── */
  useEffect(() => {
    const list = listRef.current;
    const el   = itemRefs.current[activeIdx];
    if (!list || !el) return;
    const target = el.offsetTop - list.clientHeight * 0.42 + el.clientHeight / 2;
    list.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  }, [activeIdx]);

  const topTranslate    = -(activeIdx + itemProgress) * 100;
  const bottomTranslate = -(Math.max(0, activeIdx - 1) + itemProgress) * 100;
  

  const stripY = `${-(activeIdx + itemProgress) * 50}%`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .fw-root  { font-family:'DM Sans',sans-serif; background:#111; color:#fff; width:100%; }

        /* sticky viewport */
        .fw-sticky {
          position:sticky; top:0;
          height:100vh; width:100%;
          overflow:hidden;
          display:flex; flex-direction:column;
        }

        /* header */
        .fw-hdr {
          position:absolute; top:0; left:0; right:0; z-index:30;
          padding: clamp(18px,2.5vw,30px) clamp(20px,4vw,52px) 0;
          background:linear-gradient(to bottom,rgba(17,17,17,.97) 0%,transparent 100%);
          pointer-events:none;
        }
        .fw-hdr-lbl {
          font-size:.7rem; font-weight:600;
          letter-spacing:.14em; text-transform:uppercase;
          color:rgba(255,255,255,.36);
        }

        /* body */
        .fw-body {
          display:flex; height:100%;
          gap:clamp(12px,1.8vw,24px);
          padding: clamp(56px,7vh,80px) clamp(20px,4vw,52px) clamp(16px,2.5vw,28px);
        }

        /* ── LEFT ── */
        .fw-left {
          flex:0 0 54%;
          display:flex; flex-direction:column;
          overflow:hidden;
        }
        .fw-list {
          flex:1;
          overflow:hidden;
          display:flex; flex-direction:column;
          justify-content:flex-end;
          scroll-behavior:smooth;
        }
        .fw-row {
          display:flex; align-items:baseline;
          padding:clamp(1px,.3vh,5px) 0 clamp(1px,.3vh,5px) 0;
          flex-shrink:0;
          position:relative;
          cursor:default;
        }
        .fw-name {
          letter-spacing:-0.03em; line-height:1.0;
          white-space:nowrap; color:#fff;
          transition:
            font-size  0.52s cubic-bezier(0.4,0,0.2,1),
            opacity    0.52s cubic-bezier(0.4,0,0.2,1),
            font-weight 0.4s ease;
          will-change:font-size,opacity;
        }
        .fw-yr {
          font-size:clamp(.48rem,.82vw,.66rem);
          font-weight:400; color:rgba(255,255,255,.33);
          margin-left:clamp(5px,.7vw,11px);
          white-space:nowrap; flex-shrink:0;
          align-self:flex-start;
          padding-top:clamp(5px,.9vw,11px);
          transition:opacity 0.45s ease;
        }
        .fw-bar {
          position:absolute; left:-14px; top:10px; bottom:10px;
          width:3px; border-radius:3px; background:#fff;
        }

        /* CTA */
        .fw-cta-wrap { padding-top:clamp(10px,1.5vh,18px); flex-shrink:0; }
        .fw-cta {
          display:inline-flex; align-items:center; gap:8px;
          border:1.5px solid rgba(255,255,255,.2); border-radius:999px;
          padding:.58rem 1.4rem; font-size:.8rem; font-weight:600; color:#fff;
          text-decoration:none; background:rgba(255,255,255,.04);
          transition:background .22s,gap .22s,border-color .22s;
          font-family:'DM Sans',sans-serif;
        }
        .fw-cta:hover { background:rgba(255,255,255,.09); border-color:rgba(255,255,255,.4); gap:14px; }

        /* ── RIGHT — two-row image panel ── */
        .fw-right {
          flex:1; position:relative;
          overflow:hidden; border-radius:18px;
          min-height:0; min-width:0;
          display:flex; flex-direction:column;
          gap:6px;
        }

        /* top window and bottom window — each 50% */
        .fw-win {
          flex:1;
          position:relative;
          overflow:hidden;
          border-radius:14px;
          min-height:0;
        }

        /* each window has its own strip — WORKS.length frames, each 100% of window height */
        .fw-strip {
          position:absolute; left:0; right:0; top:0;
          display:flex; flex-direction:column; gap:0;
          will-change:transform;
          transition:transform 0.65s cubic-bezier(0.76,0,0.24,1);
        }

        .fw-frame {
          flex-shrink:0; width:100%; position:relative;
          overflow:hidden;
        }
        .fw-frame img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 1s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change:transform;
        }
        .fw-win:hover .fw-frame img { transform:scale(1.055); }

        /* frosted pill */
        .fw-pill {
          position:absolute; bottom:14px; right:14px;
          background:rgba(10,10,10,.55);
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
          border:1px solid rgba(255,255,255,.1); border-radius:999px;
          padding:5px 13px; font-size:.67rem; font-weight:500;
          color:rgba(255,255,255,.9);
          display:flex; align-items:center; gap:6px;
          white-space:nowrap; z-index:5;
        }
        .fw-grad {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(0,0,0,.28) 0%,transparent 55%);
          pointer-events:none; border-radius:inherit;
        }

        /* progress */
        .fw-prog { position:absolute; bottom:0; left:0; right:0; height:2px; background:rgba(255,255,255,.05); z-index:20; }
        .fw-prog-fill { height:100%; background:rgba(255,255,255,.36); transition:width .1s linear; }

        /* ── RESPONSIVE ── */
        @media (max-width:1200px) {
          .fw-left { flex:0 0 50%; }
        }
        @media (max-width:900px) {
          .fw-sticky { height:auto; position:relative; overflow:visible; }
          .fw-body   { flex-direction:column; padding-top:52px; padding-bottom:28px; gap:18px; }
          .fw-left   { flex:none; overflow:visible; }
          .fw-list   { overflow:visible; flex:none; justify-content:flex-start; }
          .fw-name   { font-size:clamp(1.6rem,6.5vw,2.9rem) !important; opacity:1 !important; font-weight:700 !important; white-space:normal !important; }
          .fw-yr     { opacity:.45 !important; }
          .fw-bar    { display:none; }
          .fw-right  { height:90vw; min-height:280px; flex-direction:row; gap:4px; border-radius:16px; }
          .fw-win    { border-radius:12px; }
        }
        @media (max-width:540px) {
          .fw-right { height:110vw; flex-direction:column; }
          .fw-body  { padding:48px 16px 24px; gap:16px; }
          .fw-name  { font-size:clamp(1.4rem,7.5vw,2.4rem) !important; }
        }
      `}</style>

      <div
        ref={wrapRef}
        className="fw-root"
        style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
      >
        <div className="fw-sticky">
          <div className="fw-hdr"><span className="fw-hdr-lbl">Featured Work</span></div>

          <div className="fw-body">

            {/* ══ LEFT: scrolling text ══ */}
            <div className="fw-left">
              <div className="fw-list" ref={listRef}>
                {WORKS.map((w, i) => {
                  const dist  = i - activeIdx;
                  const key   = String(Math.max(-3, Math.min(4, dist)));
                  const s     = SIZE_BY_DIST[key] ?? DEFAULT_S;
                  const isAct = dist === 0;
                  return (
                    <div
                      key={w.id}
                      className="fw-row"
                      ref={el => (itemRefs.current[i] = el)}
                    >
                      {isAct && <div className="fw-bar" />}
                      <span
                        className="fw-name"
                        style={{ fontSize:s.sz, fontWeight:s.fw, opacity:s.op }}
                      >
                        {w.client}
                      </span>
                      <span className="fw-yr" style={{ opacity: isAct ? 1 : 0 }}>
                        {w.years}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="fw-cta-wrap">
                <a href="#" className="fw-cta">
                  Explore Our Work
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ══ RIGHT: two windows stacked ══ */}
            <div className="fw-right">

              {/* TOP window — shows image[activeIdx] */}
              <div className="fw-win">
                <div
                  className="fw-strip"
                  style={{
                    // each frame = 100% of .fw-win height
                    // translateY = -(activeIdx + progress) * 100%
                    transform: `translateY(${-(activeIdx + itemProgress) * 100}%)`,
                    height: `${WORKS.length * 100}%`,
                  }}
                >
                  {WORKS.map((w, i) => (
                    <div
                      key={w.id}
                      className="fw-frame"
                      style={{ height: `${100 / WORKS.length}%` }}
                    >
                      <img src={w.image} alt={w.client} loading={i < 3 ? "eager" : "lazy"} />
                      <div className="fw-grad" />
                      <div className="fw-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        {w.searchTag}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="10">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* progress bar only on top window */}
                <div className="fw-prog">
                  <div className="fw-prog-fill" style={{ width:`${Math.round(globalProg*100)}%` }} />
                </div>
              </div>

              {/* BOTTOM window — offset by +1, shows image[activeIdx+1] */}
              <div className="fw-win">
                <div
                  className="fw-strip"
                  style={{
                    // offset by 1: show activeIdx+1 image
                    // translateY = -(activeIdx + 1 + progress) * 100%
                    // clamp so we don't go below last image
                    transform: `translateY(${-Math.min(activeIdx + 1 + itemProgress, WORKS.length - 1) * 100}%)`,
                    height: `${WORKS.length * 100}%`,
                  }}
                >
                  {WORKS.map((w, i) => (
                    <div
                      key={w.id}
                      className="fw-frame"
                      style={{ height: `${100 / WORKS.length}%` }}
                    >
                      <img src={w.image} alt={w.client} loading={i < 4 ? "eager" : "lazy"} />
                      <div className="fw-grad" />
                      <div className="fw-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        {w.searchTag}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="10">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}