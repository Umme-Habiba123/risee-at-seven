import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════ DATA ═══════════════════════════ */
const projects = [
  {
    id: 1,
    client: "Sixt",
    years: "[2020-2025]",
    tagline: "Scaling premium car rental reach across Europe",
    keyword: "Car Rental",
    accent: "#fbbf24",
    cardBg: "rgba(254,240,138,0.92)",
    image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=900&q=85",
  },
  {
    id: 2,
    client: "Dojo – B2B",
    years: "[2021-2025]",
    tagline: "A full service SEO success story — 170%+ increase",
    keyword: "B2B Payments",
    accent: "#a78bfa",
    cardBg: "rgba(196,181,253,0.92)",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
  },
  {
    id: 3,
    client: "Magnet Trade – B2B",
    years: "[2023-2024]",
    tagline: "Owning the trade kitchen search landscape",
    keyword: "Trade Kitchens",
    accent: "#34d399",
    cardBg: "rgba(110,231,183,0.92)",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85",
  },
  {
    id: 4,
    client: "Leading E-Sim Brand",
    years: "[2023-2025]",
    tagline: "Dominating global eSIM search in 40+ countries",
    keyword: "eSIM Global",
    accent: "#38bdf8",
    cardBg: "rgba(125,211,252,0.92)",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=900&q=85",
  },
  {
    id: 5,
    client: "JD Sports",
    years: "[2025]",
    tagline: "Owning footwear and apparel search at scale",
    keyword: "Sportswear",
    accent: "#f472b6",
    cardBg: "rgba(251,207,232,0.92)",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
  },
  {
    id: 6,
    client: "Parkdean Resorts",
    years: "[2019-2025]",
    tagline: "Social search and multi channel content to #1",
    keyword: "UK Holidays",
    accent: "#86efac",
    cardBg: "rgba(187,247,208,0.92)",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85",
  },
  {
    id: 7,
    client: "Revolution Beauty",
    years: "[2022-2025]",
    tagline: "Building the UK's leading beauty dupe brand",
    keyword: "Beauty Dupes",
    accent: "#fda4af",
    cardBg: "rgba(254,205,211,0.92)",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85",
  },
  {
    id: 8,
    client: "Lloyds Pharmacy",
    years: "[2022-23]",
    tagline: "Driving category leadership for STI tests",
    keyword: "STI Tests",
    accent: "#5eead4",
    cardBg: "rgba(153,246,228,0.92)",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=85",
  },
  {
    id: 9,
    client: "PrettyLittleThing",
    years: "[2021-2023]",
    tagline: 'Driving discovery for everything "outfits" for PLT',
    keyword: "Outfits",
    accent: "#fb923c",
    cardBg: "rgba(254,215,170,0.92)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
  {
    id: 10,
    client: "Pooky",
    years: "[2025]",
    tagline: "Social search and multi channel content to #1",
    keyword: "Rechargeable Lights",
    accent: "#e879f9",
    cardBg: "rgba(240,171,252,0.92)",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
  },
];

/* ═══════════════════════════ IMAGE CARD ═══════════════════════════ */
function ImageCard({ project, index, mounted }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 + index * 0.08,
      }}
      className="relative w-full overflow-hidden rounded-2xl cursor-pointer"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* image */}
      <motion.img
        src={project.image}
        alt={project.client}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        loading="lazy"
      />

      {/* hover colour overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-between p-5 md:p-6"
            style={{ backgroundColor: project.cardBg }}
          >
            {/* tagline */}
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.25rem, 2.4vw, 2rem)",
                fontWeight: 900,
                color: "#111",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                maxWidth: "80%",
              }}
            >
              {project.tagline}
            </p>

            {/* arrow + keyword row */}
            <div className="flex items-center justify-between">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: project.accent }}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#111" strokeWidth="2.2" />
                  <path d="M21 21l-4.35-4.35" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#111" }}>{project.keyword}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* default keyword pill (only when not hovered) */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="pill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2.2" />
              <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "0.7rem", color: "white", fontWeight: 500 }}>{project.keyword}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════ MAIN ═══════════════════════════ */
export default function FeaturedWork() {
  const [activeIndex, setActive] = useState(0);
  const [mounted, setMounted]    = useState(false);

  const sectionRef   = useRef(null);
  const leftRef      = useRef(null);
  const rightRef     = useRef(null);
  const nameRefs     = useRef([]);
  const imgRefs      = useRef([]);
  const syncLock     = useRef(false);
  const gsapCtx      = useRef(null);

  /* mount flag */
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(id);
  }, []);

  /* GSAP scroll animations on left names */
  useLayoutEffect(() => {
    if (!mounted) return;

    gsapCtx.current = gsap.context(() => {
      nameRefs.current.forEach((el, i) => {
        if (!el) return;

        const nameEl  = el.querySelector(".name-text");
        const yearEl  = el.querySelector(".year-text");

        /* initial state */
        gsap.set(el, { opacity: i === 0 ? 1 : 0.18 });
        gsap.set(nameEl, { color: i === 0 ? "#ffffff" : "#6b7280" });

        ScrollTrigger.create({
          trigger: el,
          scroller: leftRef.current,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
        });
      });

      function activate(i) {
        /* dim all */
        nameRefs.current.forEach((el, j) => {
          if (!el) return;
          const nm = el.querySelector(".name-text");
          const yr = el.querySelector(".year-text");
          gsap.to(el, { opacity: j === i ? 1 : j < i ? 0.1 : 0.22, duration: 0.55, ease: "power2.out" });
          gsap.to(nm, { color: j === i ? "#ffffff" : "#6b7280", duration: 0.55, ease: "power2.out" });
          gsap.to(yr, { opacity: j === i ? 1 : 0.4, duration: 0.55, ease: "power2.out" });
        });

        setActive(i);

        /* sync right panel */
        if (!syncLock.current && rightRef.current && imgRefs.current[i]) {
          syncLock.current = true;
          gsap.to(rightRef.current, {
            scrollTop: imgRefs.current[i].offsetTop - 24,
            duration: 0.75,
            ease: "power3.inOut",
            onComplete: () => { syncLock.current = false; },
          });
        }
      }
    }, sectionRef);

    return () => gsapCtx.current?.revert();
  }, [mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@500&display=swap');
        .no-sb::-webkit-scrollbar { display: none; }
        .no-sb { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* whole section entrance */}
      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ backgroundColor: "#111111", fontFamily: "'Barlow', sans-serif", minHeight: "100vh" }}
      >

        {/* ── label ── */}
        <div className="sticky top-0 z-50 px-6 md:px-10 py-4" style={{ backgroundColor: "#111111" }}>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Featured Work
          </motion.span>
        </div>

        <div className="flex w-full" style={{ height: "calc(100vh - 52px)" }}>

          {/* ════ LEFT: scrollable names (GSAP controlled) ════ */}
          <div
            ref={leftRef}
            className="no-sb w-full lg:w-1/2 overflow-y-auto"
            style={{ paddingTop: "2rem", paddingBottom: "60vh", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => (nameRefs.current[i] = el)}
                className="flex items-baseline gap-2 leading-none select-none cursor-default"
                style={{ paddingTop: "0.9rem", paddingBottom: "0.9rem" }}
              >
                <span
                  className="name-text"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 4.8rem)",
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: "#6b7280",
                    willChange: "color, opacity",
                  }}
                >
                  {p.client}
                </span>
                <span
                  className="year-text text-xs font-mono shrink-0"
                  style={{ color: "#4b5563", whiteSpace: "nowrap" }}
                >
                  {p.years}
                </span>
              </div>
            ))}
          </div>

          {/* ════ RIGHT: sticky inner-scroll images (desktop) ════ */}
          <div
            className="hidden lg:block w-full lg:w-1/2"
            style={{ overflow: "hidden", position: "relative" }}
          >
            <div
              ref={rightRef}
              className="no-sb h-full overflow-y-auto"
              style={{ padding: "1.5rem 1.5rem 8rem 0.5rem" }}
            >
              <div className="flex flex-col gap-5">
                {projects.map((p, i) => (
                  <div key={p.id} ref={(el) => (imgRefs.current[i] = el)}>
                    <ImageCard project={p} index={i} mounted={mounted} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ════ MOBILE: swaps on active ════ */}
        <div className="lg:hidden px-6 pb-20 mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImageCard project={projects[activeIndex]} index={0} mounted={mounted} />
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.section>
    </>
  );
}