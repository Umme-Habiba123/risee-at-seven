import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  {
    id: 0,
    heading: "Pioneers",
    body: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search and Social Search.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=95",
    cardBg: "#0d0d0d",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.6)",
    backBg: "#7ee8c8",
    notch: "#7ee8c8",
    tilt: -5,
    backTilt: 4,
  },
  {
    id: 1,
    heading: "Award\nWinning",
    body: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. Official judges for Global Search Awards and Global Content Marketing Awards.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=95",
    cardBg: "#7ee8c8",
    textColor: "#0a0a0a",
    subColor: "rgba(0,0,0,0.58)",
    backBg: "#f0ece6",
    notch: "#0a0a0a",
    tilt: -4,
    backTilt: 5,
  },
  {
    id: 2,
    heading: "Faster\nThinkers",
    body: "Google is moving fast, but we're moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=95",
    cardBg: "#f0ece6",
    textColor: "#0a0a0a",
    subColor: "rgba(0,0,0,0.55)",
    backBg: "#c8733a",
    notch: "#0a0a0a",
    tilt: -6,
    backTilt: 3,
  },
  {
    id: 3,
    heading: "Global\nReach",
    body: "Four offices. Infinite ambition. From Sheffield to New York, our search-first thinking travels with us, adapting to every market and every algorithm update.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=95",
    cardBg: "#c8733a",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.68)",
    backBg: "#1a1a2e",
    notch: "#ffffff",
    tilt: -3,
    backTilt: 6,
  },
  {
    id: 4,
    heading: "Category\nLeaders",
    body: "We don't just rank for keywords — we own entire categories. Our proprietary Category Leaderboard tracks brand visibility across Google, ChatGPT, Gemini and TikTok.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=95",
    cardBg: "#1a1a2e",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.6)",
    backBg: "#7ee8c8",
    notch: "#7ee8c8",
    tilt: -5,
    backTilt: 4,
  },
  {
    id: 5,
    heading: "Creative\nForce",
    body: "We don't just distribute content — we engineer it. From long-form editorial to viral social moments, our creative team builds pieces that earn links and stick in culture.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=95",
    cardBg: "#f7c948",
    textColor: "#0a0a0a",
    subColor: "rgba(0,0,0,0.58)",
    backBg: "#0d0d0d",
    notch: "#0a0a0a",
    tilt: -4,
    backTilt: 5,
  },
  {
    id: 6,
    heading: "PR\nPowerhouse",
    body: "Digital PR that earns coverage in publications that matter. We place our clients in the conversations shaping their categories — not chasing from the sidelines.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=95",
    cardBg: "#0d0d0d",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.62)",
    backBg: "#ff6b6b",
    notch: "#ff6b6b",
    tilt: -6,
    backTilt: 3,
  },
  {
    id: 7,
    heading: "Social\nSearch",
    body: "TikTok isn't just entertainment — it's a search engine. We were the first agency to treat social platforms as discovery channels, building strategies for how people find things now.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=95",
    cardBg: "#ff6b6b",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.7)",
    backBg: "#7ee8c8",
    notch: "#0a0a0a",
    tilt: -3,
    backTilt: 6,
  },
  {
    id: 8,
    heading: "True\nPartners",
    body: "We don't take briefs, we build partnerships. From SIXT to HubSpot, Xbox to Revolution Beauty — we embed ourselves into the business problem and work backwards.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=95",
    cardBg: "#7ee8c8",
    textColor: "#0a0a0a",
    subColor: "rgba(0,0,0,0.55)",
    backBg: "#f7c948",
    notch: "#0a0a0a",
    tilt: -5,
    backTilt: 4,
  },
  {
    id: 9,
    heading: "Future\nReady",
    body: "AI is changing search. We're not afraid — we're excited. Our LLM Search practice ensures our clients appear in AI-generated answers and the new discovery surfaces emerging every quarter.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=95",
    cardBg: "#0d0d0d",
    textColor: "#ffffff",
    subColor: "rgba(255,255,255,0.62)",
    backBg: "#7ee8c8",
    notch: "#7ee8c8",
    tilt: -4,
    backTilt: 5,
  },
];

const SCROLL_PER_CARD = 700;
const TOTAL_SCROLL    = SCROLL_PER_CARD * CARDS.length;

// smooth cubic ease-in-out
const easeInOut = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
// smooth ease-out
const easeOut = (t) => 1 - Math.pow(1-t,3);

export default function LegacyCards() {
  const wrapRef  = useRef(null);
  const rafRef   = useRef(null);
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [cardProgress, setCardProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!wrapRef.current) return;
      const scrolled = -wrapRef.current.getBoundingClientRect().top;
      if (scrolled <= 0)            { setActiveIdx(0);              setCardProgress(0); return; }
      if (scrolled >= TOTAL_SCROLL) { setActiveIdx(CARDS.length-1); setCardProgress(1); return; }
      const idx    = Math.min(Math.floor(scrolled / SCROLL_PER_CARD), CARDS.length - 1);
      const within = (scrolled % SCROLL_PER_CARD) / SCROLL_PER_CARD;
      setActiveIdx(idx);
      setCardProgress(within);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const cur  = CARDS[activeIdx];
  const next = CARDS[Math.min(activeIdx + 1, CARDS.length - 1)];

  // Exit phase: 0.5 → 1.0
  const rawExit = Math.max(0, Math.min(1, (cardProgress - 0.50) / 0.50));
  const tExit   = easeInOut(rawExit);

  // Entry phase for back card: 0.25 → 1.0
  const rawEntry = Math.max(0, Math.min(1, (cardProgress - 0.25) / 0.75));
  const tEntry   = easeOut(rawEntry);

  // ── front card transforms ──
  const curY      = tExit * -160;
  const curScale  = 1 - tExit * 0.09;
  const curOp     = Math.max(0, 1 - tExit * 1.5);
  const curRot    = cur.tilt - tExit * cur.tilt * 0.6;

  // ── back card transforms ──
  const backScale = 0.84 + tEntry * 0.16;
  const backOp    = 0.4 + tEntry * 0.6;
  const backY     = 32 - tEntry * 32;
  const backRot   = next.backTilt * (1 - tEntry * 0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .lc-syne { font-family: 'Syne', sans-serif; }
        .lc-dm   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div
        ref={wrapRef}
        className="w-full"
        style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)`, background: "#eae7e2" }}
      >
        {/* sticky viewport */}
        <div
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#eae7e2" }}
        >

          {/* eyebrow */}
          <p className="lc-dm text-xs sm:text-sm tracking-[0.2em] uppercase font-medium mb-7 sm:mb-10 select-none"
            style={{ color: "rgba(0,0,0,0.38)" }}>
            Legacy In The Making
          </p>

          {/* card stack */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width:  "min(600px, 92vw)",
              height: "min(680px, 86vh)",
            }}
          >

            {/* ── BACK CARD ── */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "clamp(32px, 6vw, 56px)",
                background:   next.backBg,
                transform:    `translateY(${backY}px) rotate(${backRot}deg) scale(${backScale})`,
                opacity:      backOp,
                willChange:   "transform, opacity",
                boxShadow:    "0 16px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
              }}
            />

            {/* ── FRONT CARD ── */}
            <div
              className="absolute inset-0 flex flex-col items-center text-center overflow-hidden"
              style={{
                borderRadius: "clamp(32px, 6vw, 56px)",
                background:   cur.cardBg,
                transform:    `translateY(${curY}px) rotate(${curRot}deg) scale(${curScale})`,
                opacity:      Math.max(0, curOp),
                willChange:   "transform, opacity",
                boxShadow:    "0 48px 120px rgba(0,0,0,0.32), 0 12px 36px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.1)",
                paddingTop:   "clamp(40px, 6vh, 60px)",
                paddingLeft:  "clamp(28px, 7%, 52px)",
                paddingRight: "clamp(28px, 7%, 52px)",
                paddingBottom:"clamp(28px, 4vh, 44px)",
                transition:   "background 0.5s ease",
              }}
            >
              {/* notch pill at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width:        52,
                  height:       26,
                  borderRadius: "0 0 26px 26px",
                  background:   cur.notch,
                }}
              />

              {/* photo — circle crop */}
              <div
                className="overflow-hidden flex-shrink-0 mb-5 sm:mb-7"
                style={{
                  width:     "clamp(150px, 32%, 200px)",
                  height:    "clamp(150px, 32%, 200px)",
                  borderRadius: "clamp(20px, 4vw, 28px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                }}
              >
                <img
                  src={cur.image}
                  alt={cur.heading}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(1.04) contrast(1.06) saturate(1.1)" }}
                />
              </div>

              {/* heading */}
              <h2
                className="lc-syne font-black leading-[0.92] mb-4 sm:mb-5 whitespace-pre-line"
                style={{
                  fontSize:      "clamp(3rem, 8.5vw, 5rem)",
                  letterSpacing: "-0.045em",
                  color:         cur.textColor,
                }}
              >
                {cur.heading}
              </h2>

              {/* body */}
              <p
                className="lc-dm leading-relaxed"
                style={{
                  fontSize:  "clamp(0.8rem, 1.5vw, 0.95rem)",
                  color:     cur.subColor,
                  maxWidth:  "360px",
                }}
              >
                {cur.body}
              </p>

              {/* dots */}
              <div className="flex items-center gap-2 mt-auto pt-5">
                {CARDS.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500 ease-out"
                    style={{
                      width:      i === activeIdx ? 24 : 7,
                      height:     7,
                      background: i === activeIdx
                        ? cur.notch
                        : (cur.textColor === "#ffffff"
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.15)"),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* scroll hint */}
          <div
            className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700"
            style={{ opacity: activeIdx === 0 && cardProgress < 0.2 ? 0.4 : 0 }}
          >
            <p className="lc-dm text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
              Scroll
            </p>
            <div className="w-px h-8" style={{ background: "rgba(0,0,0,0.25)" }} />
          </div>

        </div>
      </div>
    </>
  );
}