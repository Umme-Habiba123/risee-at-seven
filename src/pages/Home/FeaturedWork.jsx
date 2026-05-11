import { useRef, useState, useEffect, useCallback } from "react";

const projects = [
  { id:1,  client:"Sixt",               years:"[2020–2025]", tagline:"Scaling premium car rental reach across Europe",       keyword:"Car Rental",          accent:"#fbbf24", cardBg:"rgba(254,240,138,0.93)", image:"https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1200&q=85" },
  { id:2,  client:"Dojo – B2B",         years:"[2021–2025]", tagline:"A full service SEO success story — 170%+ increase",    keyword:"B2B Payments",        accent:"#a78bfa", cardBg:"rgba(196,181,253,0.93)", image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85" },
  { id:3,  client:"Magnet Trade",       years:"[2023–2024]", tagline:"Owning the trade kitchen search landscape",            keyword:"Trade Kitchens",      accent:"#34d399", cardBg:"rgba(110,231,183,0.93)", image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85" },
  { id:4,  client:"Leading E-Sim",      years:"[2023–2025]", tagline:"Dominating global eSIM search in 40+ countries",       keyword:"eSIM Global",         accent:"#38bdf8", cardBg:"rgba(125,211,252,0.93)", image:"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=85" },
  { id:5,  client:"JD Sports",          years:"[2025]",      tagline:"Owning footwear and apparel search at scale",          keyword:"Sportswear",          accent:"#f472b6", cardBg:"rgba(251,207,232,0.93)", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=85" },
  { id:6,  client:"Parkdean Resorts",   years:"[2019–2025]", tagline:"Social search and multi-channel content to #1",        keyword:"UK Holidays",         accent:"#86efac", cardBg:"rgba(187,247,208,0.93)", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85" },
  { id:7,  client:"Revolution Beauty",  years:"[2022–2025]", tagline:"Building the UK's leading beauty dupe brand",          keyword:"Beauty Dupes",        accent:"#fda4af", cardBg:"rgba(254,205,211,0.93)", image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85" },
  { id:8,  client:"Lloyds Pharmacy",    years:"[2022–2023]", tagline:"Driving category leadership for STI tests",            keyword:"STI Tests",           accent:"#5eead4", cardBg:"rgba(153,246,228,0.93)", image:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=85" },
  { id:9,  client:"PrettyLittleThing",  years:"[2021–2023]", tagline:"Driving discovery for everything outfits for PLT",     keyword:"Outfits",             accent:"#fb923c", cardBg:"rgba(254,215,170,0.93)", image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85" },
  { id:10, client:"Pooky",              years:"[2025]",      tagline:"Social search and multi-channel content to #1",        keyword:"Rechargeable Lights", accent:"#e879f9", cardBg:"rgba(240,171,252,0.93)", image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=85" },
  { id:11, client:"Glossier",           years:"[2022–2024]", tagline:"Redefining skincare discovery through search",         keyword:"Skincare",            accent:"#f9a8d4", cardBg:"rgba(253,210,230,0.93)", image:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=85" },
  { id:12, client:"Monzo",              years:"[2023–2025]", tagline:"Capturing the next generation of digital banking",     keyword:"Fintech",             accent:"#fdba74", cardBg:"rgba(255,228,196,0.93)", image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85" },
];

/* ─── desktop card with hover ─── */
function Card({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position:"relative", width:"100%", height:"100%", borderRadius:22, overflow:"hidden", cursor:"pointer" }}
    >
      <img
        src={project.image} alt={project.client}
        style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <div style={{
        position:"absolute", top:14, right:14,
        display:"flex", alignItems:"center", gap:5,
        background:"rgba(255,255,255,0.92)", borderRadius:999, padding:"5px 12px",
        opacity: hov ? 0 : 1, transition:"opacity 0.25s", pointerEvents:"none",
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#111" strokeWidth="2.5"/><path d="M21 21l-4.35-4.35" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <span style={{ fontSize:"0.7rem", fontWeight:600, color:"#111" }}>{project.keyword}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div style={{
        position:"absolute", inset:0, borderRadius:22,
        backgroundColor: project.cardBg,
        opacity: hov ? 1 : 0, transition:"opacity 0.38s ease",
        display:"flex", flexDirection:"column", justifyContent:"space-between",
        padding:"1.6rem",
      }}>
        <p style={{
          fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
          fontSize:"clamp(1.2rem,1.8vw,2rem)",
          color:"#111", letterSpacing:"-0.02em", lineHeight:1.1, maxWidth:"80%", margin:0,
        }}>{project.tagline}</p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{
            width:42, height:42, borderRadius:"50%", backgroundColor:project.accent,
            display:"flex", alignItems:"center", justifyContent:"center",
            transform: hov ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
            transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize:"0.7rem", fontWeight:600, color:"#111", background:"rgba(0,0,0,0.1)", borderRadius:999, padding:"4px 10px" }}>{project.keyword}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── mobile card ─── */
function MobileCard({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position:"relative", width:"100%", height:"100%", borderRadius:18, overflow:"hidden", cursor:"pointer" }}
    >
      <img src={project.image} alt={project.client}
        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition:"transform 0.75s cubic-bezier(0.22,1,0.36,1)" }}
      />
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top,rgba(0,0,0,0.78) 0%,transparent 55%)",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding:"0.9rem 1rem", pointerEvents:"none",
      }}>
        <span style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.5)", fontWeight:500, marginBottom:4 }}>{project.years}</span>
        <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.25rem,5vw,1.65rem)", color:"#fff", margin:0, lineHeight:1.05, letterSpacing:"-0.02em" }}>{project.client}</p>
      </div>
      <div style={{
        position:"absolute", top:10, right:10, display:"flex", alignItems:"center", gap:4,
        background:"rgba(255,255,255,0.9)", borderRadius:999, padding:"4px 9px",
        opacity: hov ? 0 : 1, transition:"opacity 0.2s",
      }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#111" strokeWidth="2.5"/><path d="M21 21l-4.35-4.35" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <span style={{ fontSize:"0.64rem", fontWeight:600, color:"#111" }}>{project.keyword}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   DESKTOP — 50/50
   Left:  client names, big text
   Right: TWO images stacked top + bottom, crossfade on scroll
═══════════════════════════════════════ */
function Desktop({ active, setActive }) {
  const wrapRef      = useRef(null);
  const locked       = useRef(false);
  const accum        = useRef(0);
  const total        = projects.length;
  const layerCounter = useRef(1);

  /* two-layer crossfade: each slot (top/bottom) has independent layers */
  const [topLayers, setTopLayers]    = useState([{ id:0, idx:0, opacity:1 }]);
  const [btmLayers, setBtmLayers]    = useState([{ id:0, idx:1 % projects.length, opacity:1 }]);

  const goTo = useCallback((next) => {
    if (next < 0 || next >= total || locked.current) return;
    locked.current = true;

    const newId = layerCounter.current++;
    const topIdx = next;
    const btmIdx = (next + 1) % total;

    setTopLayers(prev => [
      ...prev.map(l => ({ ...l, opacity:0 })),
      { id: newId,     idx: topIdx, opacity:1 },
    ]);
    setBtmLayers(prev => [
      ...prev.map(l => ({ ...l, opacity:0 })),
      { id: newId + 1000, idx: btmIdx, opacity:1 },
    ]);

    setTimeout(() => {
      setTopLayers([{ id: newId,      idx: topIdx, opacity:1 }]);
      setBtmLayers([{ id: newId+1000, idx: btmIdx, opacity:1 }]);
      locked.current = false;
    }, 650);

    setActive(next);
  }, [active, setActive, total]);

  /* wheel */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const atTop    = active === 0;
      const atBottom = active === total - 1;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return;
      e.preventDefault();
      accum.current += e.deltaY;
      if (Math.abs(accum.current) > 55) {
        goTo(active + (accum.current > 0 ? 1 : -1));
        accum.current = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive:false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, goTo, total]);

  /* keyboard */
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowDown") goTo(active + 1);
      if (e.key === "ArrowUp")   goTo(active - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, goTo]);

  return (
    <div ref={wrapRef} style={{ display:"flex", height:"calc(100vh - 50px)", overflow:"hidden",
    aspectRatio:"33/15",
    position:"relative" }}>

      {/* ══ LEFT 50% ══ */}
      <div style={{
        width:"54%", flexShrink:0,
        display:"flex", flexDirection:"column", justifyContent:"center",
        padding:"1rem 1rem 1rem 3rem",
        overflowY:"auto", scrollbarWidth:"none", gap:0,
      }}>
        {projects.map((p, i) => {
          const isAct  = i === active;
          const isPast = i < active;
          return (
            <div
              key={p.id}
              onClick={() => goTo(i)}
              style={{ display:"flex", alignItems:"baseline", gap:10, padding:"0.22rem 0", cursor:"pointer" }}
            >
              <span style={{
                fontFamily:"'Barlow Condensed',sans-serif",
                fontWeight:400,
                letterSpacing:"-0.03em",
                lineHeight:1.0,
                fontSize:"clamp(1.6rem,4.9vw,5.9rem)",
                color: isAct ? "#ffffff" : "#555",
                // opacity: isAct ? 1 : isPast ? 0.07 : 0.25,
                transition:"color 0.5s ease, opacity 0.5s ease",
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              }}>
                {p.client}
              </span>
              <span style={{
                fontFamily:"monospace", fontSize:"0.58rem",
                color: isAct ? "#888" : "#383838",
                opacity: isAct ? 1 : 0.22,
                transition:"all 0.5s ease",
                whiteSpace:"nowrap", flexShrink:0,
              }}>
                {p.years}
              </span>
            </div>
          );
        })}

        <div style={{ marginTop:"1.8rem" }}>
          <button style={{
            background:"#fff", border:"none", borderRadius:999,
            padding:"0.65rem 1.5rem",
            fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:"0.82rem",
            color:"#111", cursor:"pointer",
            display:"flex", alignItems:"center", gap:7,
          }}>
            Explore Our Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* ══ RIGHT 50% — TWO stacked crossfading images ══ */}
      <div className="m-4" style={{
        width:"43%",
   
         flexShrink:0,
        padding:"12px 12px 12px 8px",
        display:"flex", flexDirection:"column", gap:8,
        overflow:"hidden",
        
      }}>
        {/* TOP image */}
        <div style={{ flex:1, position:"relative", borderRadius:22, overflow:"hidden" }}>
          {topLayers.map(layer => (
            <div
              key={layer.id}
              style={{
                position:"absolute", inset:0,
                opacity: layer.opacity,
               transition:"opacity 0.9s cubic-bezier(0.22,1,0.36,1)",
                borderRadius:12, overflow:"hidden",
              }}
            >
              <Card project={projects[layer.idx]} />
            </div>
          ))}
        </div>

        {/* BOTTOM image — active + 1 */}
        <div style={{ flex:1, position:"relative", borderRadius:22, overflow:"hidden" }}>
          {btmLayers.map(layer => (
            <div
              key={layer.id}
              style={{
                position:"absolute", inset:0,
                opacity: layer.opacity,
               transition:"opacity 0.9s cubic-bezier(0.22,1,0.36,1)",
                borderRadius:12, overflow:"hidden",
              }}
            >
              <Card project={projects[layer.idx]} />
            </div>
          ))}
        </div>
      </div>

      {/* dot nav */}
      <div style={{
        position:"absolute", right:20, top:"50%", transform:"translateY(-50%)",
        display:"flex", flexDirection:"column", gap:8, zIndex:30,
      }}>
        {projects.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width:5, height:5, borderRadius:"50%", cursor:"pointer",
              background: i === active ? "#fff" : "rgba(255,255,255,0.2)",
              transform: i === active ? "scale(1.7)" : "scale(1)",
              transition:"background 0.4s, transform 0.4s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MOBILE / TABLET
═══════════════════════════════════════ */
function Mobile() {
  return (
    <div style={{ padding:"0 1rem 5rem" }}>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {projects.map(p => (
          <div key={p.id} style={{ height:"62vw", maxHeight:320 }}>
            <MobileCard project={p} />
          </div>
        ))}
      </div>
      <div style={{ marginTop:"1.8rem" }}>
        <button style={{
          background:"#fff", border:"none", borderRadius:999,
          padding:"0.9rem 1.5rem", width:"100%",
          fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:"0.95rem",
          color:"#111", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          Explore Our Work
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function FeaturedWork() {
  const [active, setActive] = useState(0);
  const [isLg,   setIsLg]   = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width:1024px)");
    setIsLg(mq.matches);
    const h = e => setIsLg(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      <section className="rounded-2xl lg:m-6" style={{
        backgroundColor:"#111", minHeight:"100vh",
        fontFamily:"'Barlow',sans-serif", color:"#fff",
        overflowX:"hidden", position:"relative",
      }}>
        {/* top bar */}
        <div style={{
          padding:"0.9rem 1.5rem 0.9rem 3rem",
          position:"sticky", top:0, zIndex:50, backgroundColor:"#111",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <span style={{
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:"0.72rem", fontWeight:700,
            color:"#fff", letterSpacing:"0.14em", textTransform:"uppercase",
          }}>
            Featured Work
          </span>
          {isLg && (
            <span style={{ fontSize:"0.68rem", color:"#444", fontFamily:"monospace" }}>
              {String(active+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}
            </span>
          )}
        </div>

        {isLg
          ? <Desktop active={active} setActive={setActive} />
          : <Mobile />
        }
      </section>
    </>
  );
}