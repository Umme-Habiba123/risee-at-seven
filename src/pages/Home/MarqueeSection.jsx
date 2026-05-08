import { useEffect, useRef, useState } from "react";

const FULL_TEXT = "Ready to Rise at Seven";
const words = FULL_TEXT.split(" ");

export default function ScrollRevealText() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 to 1

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Section is taller than viewport (sticky scroll container)
      // progress: 0 when section top hits top, 1 when section bottom hits bottom
      const sectionH = section.offsetHeight;
      const scrolled = -rect.top;
      const total = sectionH - windowH;
      const p = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Total letters count
  const allLetters = FULL_TEXT.replace(/ /g, "").length;
  const visibleLetters = Math.floor(progress * allLetters);

  // Build rendered words
  let letterCount = 0;
  const rendered = words.map((word, wi) => {
    const letters = word.split("");
    const renderedWord = letters.map((char, ci) => {
      const isVisible = letterCount < visibleLetters;
      letterCount++;
      return (
        <span
          key={ci}
          style={{
            opacity: isVisible ? 1 : 0.08,
            transform: isVisible ? "translateY(0)" : "translateY(18px)",
            display: "inline-block",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {char}
        </span>
      );
    });

    return (
      <span
        key={wi}
        style={{ display: "inline-block", marginRight: "0.28em" }}
      >
        {renderedWord}
      </span>
    );
  });

  return (
    <>
      {/* Sticky scroll container — tall so user scrolls through it */}
      <div
        ref={sectionRef}
        style={{ height: "400vh", position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            background: "#EDECE8",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "hidden",
          }}
        >
          {/* Fade left & right edges */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to right, #EDECE8 0%, transparent 8%, transparent 92%, #EDECE8 100%)",
              zIndex: 2,
            }}
          />

          <div
            style={{
              width: "100%",
              padding: "0 4vw",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 9.5vw, 9rem)",
                color: "#0a0a0a",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              {rendered}
            </p>
          </div>
        </div>
      </div>

     
    </>
  );
}