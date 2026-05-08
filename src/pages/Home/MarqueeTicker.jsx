import { useRef, useState } from "react";

const ITEMS = [
  { type: "text", content: "Beyond Algorithms" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=95",
    alt: "Conference stage",
    rotate: "-rotate-2",
  },
  { type: "text", content: "Chasing Consumers" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&q=95",
    alt: "Team collaboration",
    rotate: "rotate-2",
  },
  { type: "text", content: "Category Leaders" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=95",
    alt: "Team working",
    rotate: "-rotate-1",
  },
  { type: "text", content: "Search First" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=95",
    alt: "Keynote speaker",
    rotate: "rotate-1",
  },
  { type: "text", content: "Driving Demand" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=95",
    alt: "Agency life",
    rotate: "-rotate-2",
  },
  { type: "text", content: "Beyond Algorithms" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=95",
    alt: "Creative team",
    rotate: "rotate-2",
  },
];

const TRACK = [...ITEMS, ...ITEMS, ...ITEMS];

export default function MarqueeTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marqueeRoll 40s linear infinite;
          will-change: transform;
        }
        .marquee-track.paused { animation-play-state: paused; }
        @keyframes marqueeRoll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .marquee-font { font-family: 'Syne', sans-serif; }
        .marquee-mask-left  { mask-image: linear-gradient(to right,  black 0%, transparent 100%); -webkit-mask-image: linear-gradient(to right,  black 0%, transparent 100%); }
        .marquee-mask-right { mask-image: linear-gradient(to left, black 0%, transparent 100%); -webkit-mask-image: linear-gradient(to left, black 0%, transparent 100%); }
      `}</style>

      {/* Outer wrapper */}
      <div className="w-full overflow-hidden bg-[#edeae5] py-5 sm:py-7 md:py-10 relative">

        {/* Left fade mask */}
        <div className="marquee-mask-left absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-36 bg-[#edeae5] z-10 pointer-events-none" />
        {/* Right fade mask */}
        <div className="marquee-mask-right absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-36 bg-[#edeae5] z-10 pointer-events-none" />

        {/* Track */}
        <div
          className={`marquee-track ${paused ? "paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TRACK.map((item, i) => {
            if (item.type === "text") {
              return (
                <span
                  key={i}
                  className="marquee-font whitespace-nowrap font-black text-neutral-900 leading-none select-none"
                  style={{
                    fontSize: "clamp(2.4rem, 5.5vw, 6.8rem)",
                    letterSpacing: "-0.03em",
                    padding: "0 clamp(16px, 2.8vw, 44px)",
                  }}
                >
                  {item.content}
                </span>
              );
            }

            return (
              <span
                key={i}
                className={`
                  inline-block flex-shrink-0 overflow-hidden
                  rounded-xl sm:rounded-2xl
                  shadow-lg hover:shadow-2xl
                  ${item.rotate}
                  hover:rotate-0
                  transition-all duration-300 ease-out
                  hover:scale-105
                  cursor-pointer
                `}
                style={{
                  width:  "clamp(72px, 11vw, 148px)",
                  height: "clamp(72px, 11vw, 148px)",
                  margin: "0 clamp(12px, 2vw, 32px)",
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                />
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}