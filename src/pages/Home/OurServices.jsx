import { useState } from "react";

const LEFT_SERVICES = [
  {
    id: 0,
    label: "Digital PR",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=95",
  },
  {
    id: 1,
    label: "Search & Growth Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=95",
  },
  {
    id: 2,
    label: "Data & Insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=95",
  },
];

const RIGHT_SERVICES = [
  {
    id: 4,
    label: "Organic Social & Content",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=95",
  },
  {
    id: 5,
    label: "Content Experience",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=95",
  },
  {
    id: 6,
    label: "Onsite SEO",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=95",
  },
];

function ServiceRow({ service }) {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);

  const active = hovered || touched;

  return (
    <div
      className="relative border-t border-black/10 overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 600)}
    >
      {/* Default label */}
      <span
        className="block py-4 sm:py-5 md:py-6 lg:py-7 font-semibold tracking-tight text-neutral-900 leading-none transition-opacity duration-300 select-none"
        style={{
          fontSize: "clamp(1.25rem, 3.5vw, 3rem)",
          letterSpacing: "-0.04em",
          opacity: active ? 0 : 1,
        }}
      >
        {service.label}
      </span>

      {/* Hover pill */}
      <div
        className="absolute inset-y-2 sm:inset-y-3 inset-x-0 rounded-full flex items-center overflow-hidden"
        style={{
          background: "rgba(18,18,18,0.92)",
          backdropFilter: "blur(6px)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 0.42s cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        {/* Arrow */}
        <span
          className="text-white font-light flex-shrink-0 leading-none"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 2.5rem)",
            marginLeft: "clamp(0.75rem, 2vw, 1.75rem)",
            marginRight: "clamp(0.4rem, 1vw, 1rem)",
            opacity: active ? 1 : 0,
            transform: active ? "translateX(0)" : "translateX(-10px)",
            transition: "opacity 0.28s 0.16s ease, transform 0.28s 0.16s ease",
          }}
        >
          ↗
        </span>

        {/* Label */}
        <span
          className="text-white font-semibold tracking-tight leading-none flex-1 whitespace-nowrap select-none"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 2.8rem)",
            letterSpacing: "-0.04em",
            opacity: active ? 1 : 0,
            transform: active ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.28s 0.1s ease, transform 0.28s 0.1s ease",
          }}
        >
          {service.label}
        </span>

        {/* Right image */}
        <div
          className="absolute right-0 top-0 bottom-0 rounded-r-full overflow-hidden"
          style={{
            width: "clamp(70px, 16vw, 220px)",
            opacity: active ? 1 : 0,
            transition: "opacity 0.35s 0.08s ease",
          }}
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(18,18,18,0.85) 0%, rgba(18,18,18,0.2) 40%, transparent 70%)",
            }}
          />
          <img
            src={service.image}
            alt={service.label}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.08) contrast(1.05) saturate(1.1)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function OurServices() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
      `}</style>

      <section
        className="w-full bg-[#eeebe6]"
        style={{
          padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 5vw, 5rem)",
        }}
      >
        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2 sm:mb-4 pb-6 sm:pb-8">
          {/* Title */}
          <h2
            className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-4 font-semibold tracking-tight leading-none text-neutral-900"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.2rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Our
            <span
              className="inline-block rounded-xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer transition-all duration-300 hover:-rotate-6 hover:scale-110"
              style={{
                width: "clamp(2.5rem, 5vw, 5rem)",
                height: "clamp(2.5rem, 5vw, 5rem)",
                borderRadius: "clamp(8px, 1.2vw, 18px)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=90"
                alt="team"
                className="w-full h-full object-cover"
              />
            </span>
            Services
          </h2>

          {/* View All button */}
          <a
            href="#"
            className="rounded-full bg-white border border-black/10 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 font-semibold shadow-sm flex-shrink-0 flex items-center gap-1.5 transition-all duration-200 mt-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
              padding: "clamp(0.4rem, 1vw, 0.65rem) clamp(0.85rem, 2vw, 1.25rem)",
              whiteSpace: "nowrap",
            }}
          >
            View All Services
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ width: "clamp(10px, 1.2vw, 14px)", height: "clamp(10px, 1.2vw, 14px)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* ── SERVICE GRID ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "0 clamp(1.5rem, 4vw, 4rem)" }}
        >
          {/* LEFT */}
          <div className="flex flex-col">
            {LEFT_SERVICES.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            {RIGHT_SERVICES.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}