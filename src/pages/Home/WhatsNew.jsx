import { useState, useRef } from "react";

const POSTS = [
  {
    id: 0,
    category: null,
    author: "Ray Saddiq",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=90",
    readTime: "3 mins",
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=90",
  },
  {
    id: 1,
    category: null,
    author: "Ray Saddiq",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=90",
    readTime: "2 mins",
    title: "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=90",
  },
  {
    id: 2,
    category: "News",
    author: "Carrie Rose",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=90",
    readTime: "2 mins",
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=90",
  },
  {
    id: 3,
    category: "SEO",
    author: "Carrie Rose",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=90",
    readTime: "4 mins",
    title: "Why LLM Search Is the Most Important Channel You're Not Investing In",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=90",
  },
  {
    id: 4,
    category: "Content",
    author: "Ray Saddiq",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=90",
    readTime: "5 mins",
    title: "How We Drove 3 Million Extra Clicks for SIXT Through Regional SEO",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=90",
  },
  {
    id: 5,
    category: "PR",
    author: "Carrie Rose",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=90",
    readTime: "3 mins",
    title: "Digital PR in 2025: Why Relationships Still Beat Domain Authority",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=90",
  },
];

function ArrowCursor({ visible, x, y }) {
  return (
    <div
      className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full"
      style={{
        width: 64,
        height: 64,
        background: "#7ee8c8",
        left: x - 32,
        top: y - 32,
        opacity: visible ? 1 : 0,
        transform: `scale(${visible ? 1 : 0.6})`,
        transition: "opacity 0.2s ease, transform 0.2s ease",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </div>
  );
}

function BlogCard({ post, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      {hovered && !isMobile && (
        <ArrowCursor visible={hovered} x={cursorPos.x} y={cursorPos.y} />
      )}
      <a
        href="#"
        className="group flex flex-col gap-3 flex-shrink-0"
        style={{
          // Mobile: fixed card width for horizontal scroll
          // Desktop: auto (grid handles it)
          width: isMobile ? "76vw" : "100%",
          maxWidth: isMobile ? "300px" : "none",
          cursor: isMobile ? "pointer" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl w-full" style={{ aspectRatio: "1 / 1" }}>
          {post.category && (
            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-semibold px-2 py-1 rounded-full">
              {post.category}
            </div>
          )}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              filter: hovered && !isMobile
                ? "blur(10px) brightness(0.75) saturate(0.8)"
                : "blur(0px) brightness(1) saturate(1)",
              transform: hovered && !isMobile ? "scale(1.04)" : "scale(1)",
            }}
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-white flex items-center px-2 py-1 rounded-3xl gap-1">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-4 h-4 rounded-full object-cover"
            />
            <span
              className="text-xs text-neutral-600 font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em" }}
            >
              {post.author}
            </span>
          </div>
          <div className="flex bg-white px-2 py-1 rounded-3xl items-center gap-1 text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3 h-3">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span
              className="text-xs text-gray-500 font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em" }}
            >
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-neutral-900 group-hover:text-neutral-600 font-medium transition-colors duration-200 leading-tight"
          style={{
            fontSize: isMobile ? "clamp(1rem, 4vw, 1.2rem)" : "clamp(1.1rem, 1.8vw, 1.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h3>
      </a>
    </>
  );
}

export default function WhatsNew() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardW = el.scrollWidth / POSTS.length;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveIndex(idx);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        className="w-full bg-[#eae7e2] pt-10 pb-16 md:pb-24"
        style={{ overflow: "hidden" }}
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between gap-4 border-b border-black/20 mb-8 md:mb-10"
          style={{ padding: "0 clamp(1rem, 5vw, 5rem) clamp(1.25rem, 3vw, 2rem)" }}
        >
          <h2
            className="flex items-center flex-wrap gap-2 font-semibold text-neutral-900 leading-none"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 6rem)",
              letterSpacing: "-0.04em",
            }}
          >
            What's
            <span
              className="inline-block overflow-hidden flex-shrink-0"
              style={{
                width: "clamp(48px, 6vw, 99px)",
                height: "clamp(44px, 5.5vw, 96px)",
                borderRadius: "clamp(8px, 1.5vw, 16px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
                position: "relative",
                top: 3,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=90"
                alt="event"
                className="w-full h-full object-cover"
              />
            </span>
            New
          </h2>

          <a
            href="#"
            className="flex-shrink-0 flex items-center gap-1.5 rounded-full bg-white border border-black/10 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 font-semibold shadow-sm transition-all duration-200"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.7rem, 1.4vw, 0.875rem)",
              padding: "clamp(0.4rem, 1vw, 0.6rem) clamp(0.9rem, 2vw, 1.25rem)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="hidden sm:inline">Explore More Thoughts</span>
            <span className="sm:hidden">Explore</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* ── MOBILE: horizontal scroll carousel ── */}
        <div className="block lg:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scroll-hide flex gap-4 overflow-x-auto"
            style={{
              padding: "0 clamp(1rem, 5vw, 2rem)",
              paddingRight: "clamp(1rem, 5vw, 2rem)",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {POSTS.map((post) => (
              <div key={post.id} style={{ scrollSnapAlign: "start" }}>
                <BlogCard post={post} isMobile={true} />
              </div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div
            className="flex gap-1.5 mt-5 justify-center"
            style={{ padding: "0 clamp(1rem, 5vw, 2rem)" }}
          >
            {POSTS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  height: 4,
                  width: i === activeIndex ? 28 : 8,
                  background: i === activeIndex ? "#0a0a0a" : "rgba(0,0,0,0.18)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 3-column grid ── */}
        <div
          className="hidden lg:grid grid-cols-3"
          style={{
            gap: "clamp(1rem, 2vw, 2rem)",
            padding: "0 clamp(1rem, 5vw, 5rem)",
          }}
        >
          {POSTS.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} isMobile={false} />
          ))}
        </div>
      </section>
    </>
  );
}