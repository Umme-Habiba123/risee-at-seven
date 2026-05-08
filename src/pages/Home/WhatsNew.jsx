import { useState, useEffect, useRef } from "react";

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

// Custom teal arrow cursor component that follows mouse on hovered card
function ArrowCursor({ visible, x, y }) {
  return (
    <div
      className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full transition-opacity duration-200"
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
      </svg>
    </div>
  );
}

function BlogCard({ post, index }) {
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {hovered && <ArrowCursor visible={hovered} x={cursorPos.x} y={cursorPos.y} />}
      <a
        href="#"
        className="group flex flex-col gap-4 cursor-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Image container */}
        <div className="relative overflow-hidden rounded-2xl aspect-[15/15] w-full">
          {/* category badge */}
          {post.category && (
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-semibold px-2 py-1 rounded-full">
              {post.category}
            </div>
          )}

          {/* main image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              filter: hovered
                ? "blur(10px) brightness(0.75) saturate(0.8)"
                : "blur(0px) brightness(1) saturate(1)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />

          {/* teal arrow overlay — only on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 ">
         <div className="bg-white flex px-2 p-1 rounded-3xl ">
             <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-4 h-4 items-center  rounded-full object-cover"
          />
          <span className="text-sm text-neutral-500 bg-white px-2 rounded-2xl font-semibold" style={{ fontFamily: "'DM Sans', sans-serif",
                 letterSpacing: "-0.06em"
           }}>
            {post.author}
          </span>
         </div>
          <div className="flex bg-white  px-2 rounded-3xl items-center gap-1 text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="text-sm text-gray-500 font-semibold" style={{ fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.05em"
             }}>
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl lg:text-3xl leading-tight text-neutral-900 group-hover:text-neutral-700 font-medium transition-colors duration-200"
          style={{
            
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
  const displayedPosts = POSTS.slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
      `}</style>

      <section
        className="w-full bg-[#eae7e2] px-4 sm:px-6 md:px-10 lg:px-8  pt-12 md:pt-16 lg:pt-12 pb-16 md:pb-20 lg:pb-28"
        style={{  }}
      >

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between gap-6 pb-8 md:pb-6 border-b border-black/20 mb-10 md:mb-6">

          {/* Title */}
          <h2
            className="flex items-center lg:mt-2 flex-wrap gap-3 font-semibold text-neutral-900 leading-none"
            style={{
            
              fontSize: "clamp(3.0rem, 6vw, 6.0rem)",
              letterSpacing: "-0.04em",
            }}
          >
            What's
            {/* inline thumbnail */}
            <span
              className="inline-block overflow-hidden flex-shrink-0"
              style={{
                width:  "clamp(59px, 6vw, 99px)",
                height: "clamp(54px, 6vw, 96px)",
                borderRadius: "clamp(10px, 1.5vw, 16px)",
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

          {/* CTA */}
          <a
            href="#"
            className="btn btn-sm sm:btn-md rounded-full bg-white border border-black/10 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 font-semibold shadow-sm flex-shrink-0 gap-1.5 transition-all duration-200 normal-case"
            style={{  }}
          >
            <span className="hidden sm:inline">Explore More Thoughts</span>
            <span className="sm:hidden">Explore</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {displayedPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

      </section>
    </>
  );
}