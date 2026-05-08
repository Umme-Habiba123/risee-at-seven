import { useEffect, useRef, useState } from "react";

const FULL_TEXT = "Ready to Rise at Seven";
const words = FULL_TEXT.split(" ");

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const windowH = window.innerHeight;
      const scrolled = -rect.top;
      const total = sectionH - windowH;
      const p = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalLetters = FULL_TEXT.replace(/ /g, "").length;
  // How many letters revealed so far (right to left order)
  const visibleCount = Math.floor(progress * totalLetters);

  let globalIdx = 0;

  const rendered = words.map((word, wi) => {
    const letters = word.split("");
    const renderedWord = letters.map((char) => {
      const myIdx = globalIdx;
      globalIdx++;
      // revealOrder: 0 = rightmost letter (reveals first), totalLetters-1 = leftmost (reveals last)
      const revealOrder = totalLetters - 1 - myIdx;
      const isVisible = visibleCount > revealOrder;

      return (
        <span
          key={myIdx}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0px) translateX(0px)"
              : "translateY(-90px) translateX(30px)",
            display: "inline-block",
            transition:
              "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: isVisible ? `${revealOrder * 15}ms` : "0ms",
          }}
        >
          {char}
        </span>
      );
    });

    return (
      <span
        key={wi}
        style={{ display: "inline-block", marginRight: "0.25em" }}
      >
        {renderedWord}
      </span>
    );
  });

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      {/* Tall scroll container so sticky panel has room */}
      <div ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            background: "#EDECE8",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Left & right edge fades */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to right, #EDECE8 0%, transparent 5%, transparent 95%, #EDECE8 100%)",
              zIndex: 2,
            }}
          />

          {/* Text */}
          <div style={{ width: "100%", padding: "0 5vw" }}>
            <p
              style={{
                fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 8vw, 9rem)",
                color: "#0a0a0a",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
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