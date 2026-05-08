import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  {
    id: 0,
    eyebrow: "Legacy In The Making",
    heading: "Pioneers",
    body: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    body2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=90",
    bg: "#0d0d0d",
    tilt: -6,
    backColor: "#7ee8c8",
    backTilt: 5,
  },
  {
    id: 1,
    eyebrow: "Award Winning",
    heading: "Champions",
    body: "Judges for industry Search Awards and Global Content Marketing Awards. We don't just compete — we set the standard that defines what winning looks like across every channel.",
    body2: "Our trophy cabinet spans 40+ awards across SEO, Content, PR and Social from the world's most respected marketing judging panels.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=90",
    bg: "#1a1a2e",
    tilt: -4,
    backColor: "#f7c948",
    backTilt: 6,
  },
  {
    id: 2,
    eyebrow: "Global Reach",
    heading: "Explorers",
    body: "Four offices. Infinite ambition. From Sheffield to New York, our search-first thinking travels with us, adapting to every market and every algorithm update thrown our way.",
    body2: "UK, USA and EU operations mean we deliver local relevance with global category authority for every client we partner with.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=90",
    bg: "#0f1f0f",
    tilt: -7,
    backColor: "#ff6b6b",
    backTilt: 4,
  },
  {
    id: 3,
    eyebrow: "Culture First",
    heading: "Believers",
    body: "We believe in work that moves people — content that earns its place in culture, campaigns that create genuine conversation, and strategies that outlast any single algorithm change.",
    body2: "Our team of 200+ search-first specialists brings obsessive craft to every brief, every deliverable, every result.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=90",
    bg: "#1c0a2e",
    tilt: -5,
    backColor: "#c8733a",
    backTilt: 7,
  },
  {
    id: 4,
    eyebrow: "Data Driven",
    heading: "Analysts",
    body: "Every creative decision is backed by data intelligence. We map search demand before we write a word, ensuring every piece of content captures intent at the moment people are ready to discover.",
    body2: "Proprietary Category Leaderboard technology tracks brand visibility across Google, ChatGPT, Gemini and TikTok in real time.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=90",
    bg: "#0a0a0a",
    tilt: -6,
    backColor: "#7ee8c8",
    backTilt: 5,
  },
  {
    id: 5,
    eyebrow: "Creative Force",
    heading: "Makers",
    body: "We don't just distribute content — we engineer it. From long-form editorial to viral social moments, our creative team builds pieces that earn links, spark conversation and stick in culture.",
    body2: "Content Experience is our superpower: immersive, interactive formats that turn passive readers into active brand advocates.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=90",
    bg: "#1a0808",
    tilt: -4,
    backColor: "#f7c948",
    backTilt: 6,
  },
  {
    id: 6,
    eyebrow: "PR Powerhouse",
    heading: "Connectors",
    body: "Digital PR that earns coverage in the publications that matter. We place our clients in the conversations shaping their categories — not chasing it from the sidelines.",
    body2: "300+ media relationships across tier-one publications. Every campaign built to move ranking needles as well as brand ones.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=90",
    bg: "#0d1a2e",
    tilt: -7,
    backColor: "#ff6b6b",
    backTilt: 4,
  },
  {
    id: 7,
    eyebrow: "Social Search",
    heading: "Trendsetters",
    body: "TikTok isn't just entertainment — it's a search engine. We were the first agency to treat social platforms as discovery channels, building strategies for the way people actually find things now.",
    body2: "LLM Search optimisation, TikTok SEO, Pinterest SEO — we're already three years ahead of where the industry is going.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=90",
    bg: "#0f0f1a",
    tilt: -5,
    backColor: "#c8733a",
    backTilt: 7,
  },
  {
    id: 8,
    eyebrow: "Client Success",
    heading: "Partners",
    body: "We don't take briefs, we build partnerships. From SIXT to HubSpot, Xbox to Revolution Beauty — we embed ourselves into the business problem and work backwards to the search solution.",
    body2: "Average client tenure of 3.2 years. Because results speak louder than pitches and we keep delivering both.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=90",
    bg: "#1a1a0a",
    tilt: -6,
    backColor: "#7ee8c8",
    backTilt: 5,
  },
  {
    id: 9,
    eyebrow: "The Future",
    heading: "Visionaries",
    body: "AI is changing search. We're not afraid — we're excited. Our LLM Search practice ensures our clients appear in AI-generated answers, knowledge panels and the new discovery surfaces emerging every quarter.",
    body2: "The agency that survives the next decade will be the one that understands people first, algorithms second. That's always been us.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=90",
    bg: "#0a0a1a",
    tilt: -4,
    backColor: "#f7c948",
    backTilt: 6,
  },
];

const SCROLL_PER_CARD = 500;
const TOTAL_SCROLL = SCROLL_PER_CARD * CARDS.length;

export default function LegacyCards() {
  const wrapRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [cardProgress, setCardProgress] = useState(0);
  const rafRef = useRef(null);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!wrapRef.current) return;
      const scrolled = -wrapRef.current.getBoundingClientRect().top;
      if (scrolled <= 0) { setActiveIdx(0); setCardProgress(0); return; }
      if (scrolled >= TOTAL_SCROLL) { setActiveIdx(CARDS.length - 1); setCardProgress(1); return; }
      const idx = Math.min(Math.floor(scrolled / SCROLL_PER_CARD), CARDS.length - 1);
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

  const card = CARDS[activeIdx];
  const nextCard = CARDS[Math.min(activeIdx + 1, CARDS.length - 1)];

  // Card exit: moves up + fades as progress goes 0.6 → 1.0
  const exitStart = 0.55;
  const exitT = Math.max(0, Math.min(1, (cardProgress - exitStart) / (1 - exitStart)));

  // Current card transform
  const currentY = -exitT * 120; // px upward
  const currentScale = 1 - exitT * 0.08;
  const currentOpacity = 1 - exitT * 1.2;
  const currentRotate = card.tilt + exitT * (card.tilt * -0.5);

  // Back card (next) peeks behind, scales up as current exits
  const backScale = 0.88 + exitT * 0.12;
  const backOpacity = 0.5 + exitT * 0.5;
  const backY = 24 - exitT * 24;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .lc-font-display { font-family: 'Syne', sans-serif; }
        .lc-font-body    { font-family: 'DM Sans', sans-serif; }
        .lc-card-shadow  { box-shadow: 0 32px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2); }
        .lc-back-shadow  { box-shadow: 0 16px 48px rgba(0,0,0,0.18); }
        .lc-img-shadow   { box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
      `}</style>

      {/* outer — sets scroll height */}
      <div
        ref={wrapRef}
        className="w-full bg-[#ebebeb]"
        style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
      >
        {/* sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* eyebrow label */}
          <p
            className="lc-font-body text-xs sm:text-sm font-medium tracking-widest uppercase text-neutral-500 mb-6 sm:mb-8 transition-all duration-500 select-none"
          >
            {card.eyebrow}
          </p>

          {/* card stack container */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width:  "min(480px, 90vw)",
              height: "min(640px, 82vh)",
            }}
          >

            {/* BACK card (next card, peeks behind) */}
            <div
              className="lc-back-shadow absolute inset-0 rounded-3xl"
              style={{
                background: nextCard.backColor,
                transform: `translateY(${backY}px) rotate(${nextCard.backTilt}deg) scale(${backScale})`,
                opacity: backOpacity,
                transition: "none",
                borderRadius: "28px",
              }}
            />

            {/* FRONT card (current) */}
            <div
              className="lc-card-shadow absolute inset-0 flex flex-col items-center text-center px-7 sm:px-10 pt-10 sm:pt-12 pb-8 sm:pb-10 overflow-hidden"
              style={{
                background: card.bg,
                borderRadius: "28px",
                transform: `translateY(${currentY}px) rotate(${currentRotate}deg) scale(${currentScale})`,
                opacity: Math.max(0, currentOpacity),
                transition: "background 0.6s ease, box-shadow 0.4s ease",
                willChange: "transform, opacity",
              }}
            >
              {/* photo */}
              <div
                className="lc-img-shadow rounded-2xl overflow-hidden mb-6 sm:mb-8 flex-shrink-0"
                style={{
                  width:  "clamp(140px, 38%, 200px)",
                  height: "clamp(140px, 38%, 200px)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.heading}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(1.05) contrast(1.04)" }}
                />
              </div>

              {/* heading */}
              <h2
                className="lc-font-display text-white font-black leading-none mb-4 sm:mb-5"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 4.4rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                {card.heading}
              </h2>

              {/* body */}
              <p
                className="lc-font-body text-white/70 leading-relaxed mb-4"
                style={{ fontSize: "clamp(0.8rem, 1.6vw, 0.95rem)" }}
              >
                {card.body}
              </p>

              {card.body2 && (
                <p
                  className="lc-font-body text-white/50 leading-relaxed"
                  style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.88rem)" }}
                >
                  {card.body2}
                </p>
              )}

              {/* progress dots */}
              <div className="flex items-center gap-1.5 mt-auto pt-5">
                {CARDS.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-400"
                    style={{
                      width:  i === activeIdx ? 20 : 6,
                      height: 6,
                      background: i === activeIdx
                        ? card.backColor
                        : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* scroll hint — fades after first card */}
          <div
            className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-2 transition-opacity duration-500"
            style={{ opacity: activeIdx === 0 && cardProgress < 0.3 ? 0.5 : 0 }}
          >
            <p className="lc-font-body text-xs text-neutral-500 tracking-widest uppercase">Scroll</p>
            <div className="w-px h-8 bg-neutral-400 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}