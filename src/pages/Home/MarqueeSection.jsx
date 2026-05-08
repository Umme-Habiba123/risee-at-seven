import { useEffect, useRef, useState } from "react";

// Marquee text component - scrolls right to left, loops infinitely
// Once complete, snaps/scrolls to next section
function MarqueeSection({ onComplete }) {
  const [done, setDone] = useState(false);
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const hasTriggered = useRef(false);

  // We use a custom animation that runs once (not looping),
  // then triggers scroll to next section
  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    // Duration: ~4 seconds for one full pass
    const DURATION = 4200; // ms
    let startTime = null;
    let raf;

    // Get the width of one copy of the text
    const getWidth = () => track1.scrollWidth / 2; // two copies inside

    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const width = getWidth();
      const progress = Math.min(elapsed / DURATION, 1);

      // easeInOutQuad
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const offset = ease * width;
      track1.style.transform = `translateX(-${offset}px)`;
      track2.style.transform = `translateX(-${offset}px)`;

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        // Animation done — wait briefly then scroll down
        if (!hasTriggered.current) {
          hasTriggered.current = true;
          setDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
            // Scroll to next section smoothly
            const next = document.getElementById("next-section");
            if (next) {
              next.scrollIntoView({ behavior: "smooth" });
            }
          }, 400);
        }
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const text = "Ready to Rise at Seven";
  const repeated = Array(6).fill(text).join("   ·   ");

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        background: "#EDECE8",
        height: "100vh",
        minHeight: "400px",
      }}
    >
      {/* Vertical centering wrapper */}
      <div className="w-full flex flex-col items-center justify-center gap-0">
        {/* Line 1 */}
        <div className="w-full overflow-hidden">
          <div
            ref={track1Ref}
            className="whitespace-nowrap will-change-transform"
            style={{
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 10vw, 9.5rem)",
                color: "#0a0a0a",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                display: "inline-block",
                paddingRight: "clamp(2rem, 5vw, 6rem)",
              }}
            >
              {repeated}
            </span>
            {/* Duplicate for seamless loop feel */}
            <span
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 10vw, 9.5rem)",
                color: "#0a0a0a",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                display: "inline-block",
                paddingRight: "clamp(2rem, 5vw, 6rem)",
              }}
            >
              {repeated}
            </span>
          </div>
        </div>

        {/* Line 2 - offset / slightly delayed visual */}
        <div className="w-full overflow-hidden">
          <div
            ref={track2Ref}
            className="whitespace-nowrap will-change-transform"
            style={{
              display: "inline-block",
              marginLeft: "-8vw", // offset so lines don't align
            }}
          >
            <span
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 10vw, 9.5rem)",
                color: "transparent",
                WebkitTextStroke: "2px #0a0a0a",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                display: "inline-block",
                paddingRight: "clamp(2rem, 5vw, 6rem)",
                opacity: done ? 0 : 0.18,
                transition: "opacity 0.4s ease",
              }}
            >
              {repeated}
            </span>
            <span
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 10vw, 9.5rem)",
                color: "transparent",
                WebkitTextStroke: "2px #0a0a0a",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                display: "inline-block",
                paddingRight: "clamp(2rem, 5vw, 6rem)",
                opacity: done ? 0 : 0.18,
                transition: "opacity 0.4s ease",
              }}
            >
              {repeated}
            </span>
          </div>
        </div>
      </div>

      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40"
        style={{
          background: "linear-gradient(to right, #EDECE8 0%, transparent 100%)",
          zIndex: 2,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40"
        style={{
          background: "linear-gradient(to left, #EDECE8 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: done ? 0 : 0.5, transition: "opacity 0.3s ease" }}
      >
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "#0a0a0a",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Scrolling
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

// Next section after marquee completes
function NextSection() {
  return (
    <div
      id="next-section"
      className="w-full flex items-center justify-center"
      style={{
        background: "#111111",
        minHeight: "100vh",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div className="text-center px-6">
        <p
          style={{
            color: "#4ECDC4",
            fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          Welcome
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(2rem, 6vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Rise at Seven
        </h2>
        <p
          style={{
            color: "#666",
            marginTop: "1.5rem",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            maxWidth: "480px",
            lineHeight: 1.6,
          }}
        >
          Your next section content goes here.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [showNext, setShowNext] = useState(false);

  return (
    <div className="w-full">
      <MarqueeSection onComplete={() => setShowNext(true)} />
      <div
        style={{
          opacity: showNext ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <NextSection />
      </div>
    </div>
  );
}