import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  {
    id: 0,
    heading: "Pioneers",
    body: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search and Social Search.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=95",
    cardBg: "#0d0d0d",
    cardText: "#ffffff",
    bodyText: "rgba(255,255,255,0.65)",
    backBg: "#7ee8c8",
    tilt: -6,
    backTilt: 5,
    notchColor: "#0d0d0d",
  },
  {
    id: 1,
    heading: "Award\nWinning",
    body: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=95",
    cardBg: "#7ee8c8",
    cardText: "#0d0d0d",
    bodyText: "rgba(0,0,0,0.6)",
    backBg: "#f0ece6",
    tilt: -5,
    backTilt: 6,
    notchColor: "#0d0d0d",
  },
  {
    id: 2,
    heading: "Faster\nThinkers",
    body: "Ever heard the phrase — Google is moving fast, but we're moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=95",
    cardBg: "#f0ece6",
    cardText: "#0d0d0d",
    bodyText: "rgba(0,0,0,0.58)",
    backBg: "#c8733a",
    tilt: -7,
    backTilt: 4,
    notchColor: "#0d0d0d",
  },
  {
    id: 3,
    heading: "Global\nReach",
    body: "Four offices. Infinite ambition. From Sheffield to New York, our search-first thinking travels with us, adapting to every market and every algorithm update thrown our way.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=95",
    cardBg: "#c8733a",
    cardText: "#ffffff",
    bodyText: "rgba(255,255,255,0.7)",
    backBg: "#1a1a2e",
    tilt: -4,
    backTilt: 7,
    notchColor: "#ffffff",
  },
  {
    id: 4,
    heading: "Category\nLeaders",
    body: "We don't just rank for keywords — we own entire categories. Our proprietary Category Leaderboard tracks brand visibility across Google, ChatGPT, Gemini and TikTok in real time.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=95",
    cardBg: "#1a1a2e",
    cardText: "#ffffff",
    bodyText: "rgba(255,255,255,0.62)",
    backBg: "#7ee8c8",
    tilt: -6,
    backTilt: 5,
    notchColor: "#ffffff",
  },
  {
    id: 5,
    heading: "Creative\nForce",
    body: "We don't just distribute content — we engineer it. From long-form editorial to viral social moments, our creative team builds pieces that earn links and stick in culture.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=95",
    cardBg: "#f7c948",
    cardText: "#0d0d0d",
    bodyText: "rgba(0,0,0,0.6)",
    backBg: "#0d0d0d",
    tilt: -5,
    backTilt: 6,
    notchColor: "#0d0d0d",
  },
  {
    id: 6,
    heading: "PR\nPowerhouse",
    body: "Digital PR that earns coverage in publications that matter. We place our clients in the conversations shaping their categories — not chasing it from the sidelines.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=95",
    cardBg: "#0d0d0d",
    cardText: "#ffffff",
    bodyText: "rgba(255,255,255,0.65)",
    backBg: "#ff6b6b",
    tilt: -7,
    backTilt: 4,
    notchColor: "#0d0d0d",
  },
  {
    id: 7,
    heading: "Social\nSearch",
    body: "TikTok isn't just entertainment — it's a search engine. We were the first agency to treat social platforms as discovery channels, building strategies for the way people find things now.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=95",
    cardBg: "#ff6b6b",
    cardText: "#ffffff",
    bodyText: "rgba(255,255,255,0.7)",
    backBg: "#7ee8c8",
    tilt: -4,
    backTilt: 5,
    notchColor: "#0d0d0d",
  },
  {
    id: 8,
    heading: "True\nPartners",
    body: "We don't take briefs, we build partnerships. From SIXT to HubSpot, Xbox to Revolution Beauty — we embed ourselves into the business problem and work backwards to the search solution.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=95",
    cardBg: "#7ee8c8",
    cardText: "#0d0d0d",
    bodyText: "rgba(0,0,0,0.58)",
    backBg: "#f7c948",
    tilt: -6,
    backTilt: 6,
    notchColor: "#0d0d0d",
  },
  {
    id: 9,
    heading: "Future\nReady",
    body: "AI is changing search. We're not afraid — we're excited. Our LLM Search practice ensures our clients appear in AI-generated answers and the new discovery surfaces emerging every quarter.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=95",
    cardBg: "#0d0d0d",
    cardText: "#ffffff",
    bodyText: "rgba(255,255,255,0.65)",
    backBg: "#7ee8c8",
    tilt: -5,
    backTilt: 5,
    notchColor: "#0d0d0d",
  },
];

const SCROLL_PER_CARD = 600;
const TOTAL_SCROLL    = SCROLL_PER_CARD * CARDS.length;

export default function LegacyCards() {
  const wrapRef = useRef(null);
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [cardProgress, setCardProgress] = useState(0);
  const rafRef = useRef(null);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!wrapRef.current) return;
      const scrolled = -wrapRef.current.getBoundingClientRect().top;
      if (scrolled <= 0)            { setActiveIdx(0);             setCardProgress(0); return; }
      if (scrolled >= TOTAL_SCROLL) { setActiveIdx(CARDS.length-1);setCardProgress(1); return; }
      setActiveIdx(Math.min(Math.floor(scrolled / SCROLL_PER_CARD), CARDS.length - 1));
      setCardProgress((scrolled % SCROLL_PER_CARD) / SCROLL_PER_CARD);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const cur  = CARDS[activeIdx];
  const next = CARDS[Math.min(activeIdx + 1, CARDS.length - 1)];

  // ── easing ──────────────────────────────────────────────
  // ease-in-out cubic
  const ease = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;

  // Exit starts at 55% through each card's scroll budget
  const exitStart = 0.52;
  const rawT = Math.max(0, Math.min(1, (cardProgress - exitStart) / (1 - exitStart)));
  const t    = ease(rawT); // smooth eased value 0→1

  // current card: floats up, rotates back, shrinks, fades
  const curY      = -t * 140;
  const curScale  = 1 - t * 0.1;
  const curOp     = Math.max(0, 1 - t * 1.3);
  const curRotate = cur.tilt * (1 - t * 0.4);

  // back card: scales from 0.86 → 1, moves up into place
  const backT      = ease(Math.max(0, Math.min(1, (cardProgress - 0.3) / 0.7)));
  const backScale  = 0.86 + backT * 0.14;
  const backOp     = 0.45 + backT * 0.55;
  const backY      = 28 - backT * 28;
  const backRotate = next.tilt * (1 - backT * 0.15);

  const cardW = "min(460px, 88vw)";
  const cardH = "min(620px, 84vh)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .lc-syne { font-family:'Syne',sans-serif; }
        .lc-dm   { font-family:'DM Sans',sans-serif; }

        /* notch shape at top of card */
        .lc-notch {
          width: 60px; height: 28px;
          border-radius: 0 0 30px 30px;
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          z-index: 10;
        }

        /* card shadow */
        .lc-shadow {
          box-shadow:
            0 40px 100px rgba(0,0,0,0.28),
            0 12px 32px rgba(0,0,0,0.18),
            0 2px 8px rgba(0,0,0,0.12);
        }
        .lc-back-shadow {
          box-shadow:
            0 20px 60px rgba(0,0,0,0.18),
            0 6px 20px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* scroll height setter */}
      <div
        ref={wrapRef}
        style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)`, background: "#ebebeb" }}
      >
        {/* sticky frame */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
          style={{ background: "#ebebeb" }}>

          {/* eyebrow */}
          <p
            className="lc-dm text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-neutral-400 mb-6 sm:mb-8 select-none transition-opacity duration-500"
          >
            Legacy In The Making
          </p>

          {/* ── CARD STACK ── */}
          <div
            className="relative"
            style={{ width: cardW, height: cardH }}
          >

            {/* BACK CARD */}
            <div
              className="lc-back-shadow absolute inset-0 rounded-[28px] overflow-hidden"
              style={{
                background:   next.backBg,
                transform:    `translateY(${backY}px) rotate(${next.backTilt}deg) scale(${backScale})`,
                opacity:      backOp,
                willChange:   "transform, opacity",
              }}
            />

            {/* FRONT CARD */}
            <div
              className="lc-shadow absolute inset-0 rounded-[28px] overflow-hidden flex flex-col items-center text-center"
              style={{
                background:  cur.cardBg,
                transform:   `translateY(${curY}px) rotate(${curRotate}deg) scale(${curScale})`,
                opacity:     Math.max(0, curOp),
                willChange:  "transform, opacity",
                transition:  "background 0.6s ease",
                paddingTop:  "clamp(36px, 5vh, 52px)",
                paddingLeft:  "clamp(24px, 6%, 44px)",
                paddingRight: "clamp(24px, 6%, 44px)",
                paddingBottom:"clamp(24px, 4vh, 36px)",
              }}
            >
              {/* notch */}
              <div
                className="lc-notch"
                style={{ background: cur.notchColor }}
              />

              {/* photo */}
              <div
                className="rounded-2xl overflow-hidden flex-shrink-0 mb-5 sm:mb-6"
                style={{
                  width:  "clamp(130px, 36%, 190px)",
                  height: "clamp(130px, 36%, 190px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={cur.image}
                  alt={cur.heading}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(1.04) contrast(1.06) saturate(1.08)" }}
                />
              </div>

              {/* heading */}
              <h2
                className="lc-syne font-black leading-[0.95] mb-4 sm:mb-5"
                style={{
                  fontSize:      "clamp(2.6rem, 8vw, 4.2rem)",
                  letterSpacing: "-0.04em",
                  color:         cur.cardText,
                  whiteSpace:    "pre-line",
                }}
              >
                {cur.heading}
              </h2>

              {/* body */}
              <p
                className="lc-dm leading-relaxed"
                style={{
                  fontSize:  "clamp(0.78rem, 1.5vw, 0.92rem)",
                  color:     cur.bodyText,
                  maxWidth:  "340px",
                }}
              >
                {cur.body}
              </p>

              {/* progress indicators */}
              <div className="flex items-center gap-1.5 mt-auto pt-4">
                {CARDS.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500 ease-out"
                    style={{
                      width:      i === activeIdx ? 22 : 6,
                      height:     6,
                      background: i === activeIdx
                        ? (cur.cardText === "#ffffff" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)")
                        : (cur.cardText === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <div
            className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700"
            style={{ opacity: activeIdx === 0 && cardProgress < 0.25 ? 0.45 : 0 }}
          >
            <p className="lc-dm text-[10px] tracking-[0.2em] uppercase text-neutral-400">Scroll</p>
            <div className="w-[1px] h-7 bg-neutral-400" style={{ animation: "pulse 2s infinite" }} />
          </div>

        </div>
      </div>
    </>
  );
}