import { useRef, useState, useEffect, useCallback } from "react";

const projects = [
  { id:1, client:"Sixt", years:"[2020–2025]", tagline:"Scaling premium car rental reach across Europe", keyword:"Car Rental", accent:"#fbbf24", cardBg:"rgba(254,240,138,0.93)", image:"https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=900&q=85" },
  { id:2, client:"Dojo – B2B", years:"[2021–2025]", tagline:"A full service SEO success story — 170%+ increase", keyword:"B2B Payments", accent:"#a78bfa", cardBg:"rgba(196,181,253,0.93)", image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85" },
  { id:3, client:"Magnet Trade", years:"[2023–2024]", tagline:"Owning the trade kitchen search landscape", keyword:"Trade Kitchens", accent:"#34d399", cardBg:"rgba(110,231,183,0.93)", image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85" },
  { id:4, client:"Leading E-Sim", years:"[2023–2025]", tagline:"Dominating global eSIM search in 40+ countries", keyword:"eSIM Global", accent:"#38bdf8", cardBg:"rgba(125,211,252,0.93)", image:"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=900&q=85" },
  { id:5, client:"JD Sports", years:"[2025]", tagline:"Owning footwear and apparel search at scale", keyword:"Sportswear", accent:"#f472b6", cardBg:"rgba(251,207,232,0.93)", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85" },
  { id:6, client:"Parkdean Resorts", years:"[2019–2025]", tagline:"Social search and multi-channel content to #1", keyword:"UK Holidays", accent:"#86efac", cardBg:"rgba(187,247,208,0.93)", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85" },
  { id:7, client:"Revolution Beauty", years:"[2022–2025]", tagline:"Building the UK's leading beauty dupe brand", keyword:"Beauty Dupes", accent:"#fda4af", cardBg:"rgba(254,205,211,0.93)", image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85" },
  { id:8, client:"Lloyds Pharmacy", years:"[2022–2023]", tagline:"Driving category leadership for STI tests", keyword:"Healthcare", accent:"#5eead4", cardBg:"rgba(153,246,228,0.93)", image:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=85" },
];

/* ── Card used everywhere ── */
function Card({ project, isMobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position:"relative", width:"100%", height:"100%", borderRadius:18, overflow:"hidden", cursor:"pointer" }}
    >
      <img
        src={project.image} alt={project.client}
        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition:"transform 0.65s cubic-bezier(0.22,1,0.36,1)" }}
      />

      {/* mobile always-visible gradient */}
      {isMobile && (
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
          display:"flex", flexDirection:"column", justifyContent:"flex-end",
          padding:"0.85rem 1rem",
        }}>
          <span style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.6)", fontWeight:500, marginBottom:3 }}>{project.years}</span>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(1.25rem,5vw,1.6rem)", color:"#fff", margin:0, lineHeight:1.05, letterSpacing:"-0.02em" }}>{project.client}</p>
        </div>
      )}

      {/* keyword pill */}
      <div style={{
        position:"absolute", top:10, right:10,
        display:"flex", alignItems:"center", gap:4,
        background:"rgba(255,255,255,0.9)", borderRadius:999, padding:"3px 9px",
        opacity: hovered ? 0 : 1, transition:"opacity 0.22s ease",
      }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#111" strokeWidth="2.5"/><path d="M21 21l-4.35-4.35" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <span style={{ fontSize:"0.65rem", fontWeight:600, color:"#111" }}>{project.keyword}</span>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>

      {/* hover overlay */}
      <div style={{
        position:"absolute", inset:0, borderRadius:18,
        backgroundColor: project.cardBg,
        opacity: hovered ? 1 : 0,
        transition:"opacity 0.32s ease",
        display:"flex", flexDirection:"column", justifyContent:"space-between",
        padding: isMobile ? "0.9rem" : "1.25rem",
      }}>
        <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize: isMobile ? "1rem" : "clamp(1rem,1.6vw,1.7rem)", color:"#111", letterSpacing:"-0.02em", lineHeight:1.1, maxWidth:"85%", margin:0 }}>{project.tagline}</p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ width:36, height:36, borderRadius:"50%", backgroundColor:project.accent, display:"flex", alignItems:"center", justifyContent:"center",
            transform: hovered ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
            transition:"transform 0.32s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize:"0.65rem", fontWeight:600, color:"#111", background:"rgba(0,0,0,0.1)", borderRadius:999, padding:"3px 8px" }}>{project.keyword}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════ DESKTOP ═══════
   Right side: 1 column, 2 images stacked (top + bottom).
   Each scroll step = 1 project. active = top card, active+1 = bottom card.
   Left names highlight the TOP card's index.
════════════════════════ */
function Desktop({ active, setActive }) {
  const sectionRef = useRef(null);
  const locked = useRef(false);
  const accum = useRef(0);
  const [animKey, setAnimKey] = useState(0);
  const [animDir, setAnimDir] = useState(1);

  const goTo = useCallback((next) => {
    if (next < 0 || next >= projects.length || locked.current) return;
    locked.current = true;
    setAnimDir(next > active ? 1 : -1);
    setActive(next);
    setAnimKey(k => k + 1);
    setTimeout(() => { locked.current = false; }, 560);
  }, [active, setActive]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const atStart = active === 0;
      const atEnd = active === projects.length - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      accum.current += e.deltaY;
      if (Math.abs(accum.current) > 65) {
        const d = accum.current > 0 ? 1 : -1;
        accum.current = 0;
        goTo(active + d);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, goTo]);

  const topIdx    = active;
  const bottomIdx = active + 1 < projects.length ? active + 1 : null;

  return (
    <div ref={sectionRef} style={{ display:"flex", height:"calc(100vh - 52px)", overflow:"hidden" }}>

      {/* ── LEFT: all names ── */}
      <div style={{
        width:"46%", display:"flex", flexDirection:"column", justifyContent:"center",
        padding:"1.5rem 1rem 1.5rem 2.5rem", gap:0, overflowY:"auto", scrollbarWidth:"none",
      }}>
        {projects.map((p, i) => {
          const isActive = i === active;
          const isPast   = i < active;
          return (
            <div key={p.id} onClick={() => goTo(i)}
              style={{ display:"flex", alignItems:"baseline", gap:8, padding:"0.38rem 0", cursor:"pointer" }}>
              <span style={{
                fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
                letterSpacing:"-0.02em", lineHeight:1.02,
                fontSize:"clamp(1.4rem,3.2vw,4rem)",
                color: isActive ? "#fff" : "#6b7280",
                opacity: isActive ? 1 : isPast ? 0.1 : 0.26,
                transition:"color 0.5s ease, opacity 0.5s ease",
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              }}>{p.client}</span>
              <span style={{
                fontFamily:"monospace", fontSize:"0.6rem",
                color: isActive ? "#9ca3af" : "#374151",
                opacity: isActive ? 1 : 0.3,
                transition:"all 0.5s ease", whiteSpace:"nowrap", flexShrink:0,
              }}>{p.years}</span>
            </div>
          );
        })}
        <div style={{ marginTop:"1.8rem" }}>
          <button style={{
            background:"#fff", border:"none", borderRadius:999, padding:"0.65rem 1.4rem",
            fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:"0.82rem", color:"#111",
            cursor:"pointer", display:"flex", alignItems:"center", gap:6,
          }}>
            Explore Our Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── RIGHT: 1 col, 2 images stacked ── */}
      <div style={{ width:"54%", padding:"1rem 1.5rem 1rem 0.5rem", overflow:"hidden" }}>
        <div
          key={`stack-${animKey}`}
          style={{
            height:"100%",
            display:"flex",
            flexDirection:"column",
            gap:12,
            animation:`stackIn${animDir > 0 ? "Down" : "Up"} 0.55s cubic-bezier(0.22,1,0.36,1) forwards`,
          }}
        >
          {/* TOP image */}
          <div style={{ flex:1, minHeight:0 }}>
            <Card project={projects[topIdx]} />
          </div>

          {/* BOTTOM image */}
          <div style={{ flex:1, minHeight:0 }}>
            {bottomIdx !== null
              ? <Card project={projects[bottomIdx]} />
              : <Placeholder />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return <div style={{ width:"100%", height:"100%", borderRadius:18, background:"rgba(255,255,255,0.04)" }} />;
}

/* ═══════ MOBILE / TABLET ═══════ */
function Mobile() {
  return (
    <div style={{ padding:"0 1rem 5rem" }}>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {projects.map(p => (
          <div key={p.id} style={{ height:"58vw", maxHeight:290 }}>
            <Card project={p} isMobile />
          </div>
        ))}
      </div>
      <div style={{ marginTop:"1.75rem" }}>
        <button style={{
          background:"#fff", border:"none", borderRadius:999,
          padding:"0.9rem 1.5rem", width:"100%",
          fontFamily:"'Barlow',sans-serif", fontWeight:600, fontSize:"0.95rem", color:"#111",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        }}>
          Explore Our Work
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════ ROOT ═══════ */
export default function FeaturedWork() {
  const [active, setActive] = useState(0);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width:1024px)");
    setIsLarge(mq.matches);
    const h = e => setIsLarge(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}

        @keyframes stackInDown {
          from{opacity:0;transform:translateY(52px);}
          to{opacity:1;transform:translateY(0);}
        }
        @keyframes stackInUp {
          from{opacity:0;transform:translateY(-52px);}
          to{opacity:1;transform:translateY(0);}
        }

        .fw-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,0.2);cursor:pointer;transition:background 0.4s,transform 0.4s;}
        .fw-dot.on{background:#fff;transform:scale(1.55);}
      `}</style>

      <section style={{ backgroundColor:"#111", minHeight:"100vh", fontFamily:"'Barlow',sans-serif", color:"#fff", overflowX:"hidden" }}>

        {/* label bar */}
        <div style={{
          padding:"0.9rem 1.5rem 0.9rem 2.5rem",
          position:"sticky", top:0, zIndex:50, backgroundColor:"#111",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.72rem", fontWeight:700, color:"#fff", letterSpacing:"0.14em", textTransform:"uppercase" }}>
            Featured Work
          </span>
          {isLarge && (
            <span style={{ fontSize:"0.72rem", color:"#4b5563" }}>
              {String(active+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}
            </span>
          )}
        </div>

        {isLarge
          ? <Desktop active={active} setActive={setActive} />
          : <Mobile />
        }

        {/* right dot nav — desktop only */}
        {isLarge && (
          <div style={{ position:"fixed", right:"1.1rem", top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:7, zIndex:100 }}>
            {projects.map((_,i) => (
              <div key={i} className={`fw-dot ${i===active?"on":""}`} onClick={() => setActive(i)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}