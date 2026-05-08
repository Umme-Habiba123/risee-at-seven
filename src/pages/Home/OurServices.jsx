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

  return (
    <div
      className="relative border-t border-black/10  overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default label */}
      <span
        className="block py-5 md:py-6 lg:py-7 text-2xl md:text-3xl lg:text-5xl  font-semibold tracking-tight text-neutral-900 leading-none transition-opacity duration-300 select-none "
        style={{ fontFamily: "",
              letterSpacing: "-0.06em",
            opacity: hovered ? 0 : 1 }}
      >
        {service.label}
      </span>

      {/* Hover pill — slides in from left */}
      <div
        className="absolute inset-y-3 inset-x-0 rounded-full flex items-center overflow-hidden text-semibold"
        style={{
          background: "rgba(18,18,18,0.92)",
          backdropFilter: "blur(6px)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 0.42s cubic-bezier(0.76,0,0.24,1)",
           
        }}
      >
        {/* Arrow */}
        <span
          className="text-white text-2xl md:text-3xl lg:text-4xl font-light ml-5 md:ml-7 mr-3 md:mr-4 flex-shrink-0 leading-none"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-10px)",
            transition: "opacity 0.28s 0.16s ease, transform 0.28s 0.16s ease",
             
          }}
        >
          ↗
        </span>

        {/* Label */}
        <span
          className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-none flex-1 whitespace-nowrap select-none"
          style={{
            fontFamily: "",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.28s 0.1s ease, transform 0.28s 0.1s ease",
             
          }}
        >
          {service.label}
        </span>

        {/* Right image — clear, beautiful */}
        <div
          className="absolute right-0 top-0 bottom-0 rounded-r-full overflow-hidden"
          style={{
            width: "clamp(100px, 18vw, 220px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s 0.08s ease",
            
          }}
        >
          {/* gradient fade on left edge */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(to right, rgba(18,18,18,0.85) 0%, rgba(18,18,18,0.2) 40%, transparent 70%)",
            }}
          />
          <img
            src={service.image}
            alt={service.label}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.08) contrast(1.05) saturate(1.1)", }}
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
        className="w-full  bg-[#eeebe6] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20"
        style={{ fontFamily: "" ,
            
        }}
      >

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-6 pb-8 md:pb-10  mb-8 md:mb-0 lg:mb-0">

          {/* Title with inline image */}
          <h2
            className="flex items-center flex-wrap gap-3 md:gap-4 text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-semibold tracking-tight leading-none text-neutral-900"
            style={{ fontFamily: "'Syne'" }}
          >
            Our
            {/* inline thumbnail */}
            <span className="inline-block w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl overflow-hidden shadow-lg flex-shrink-0 relative top-0.5 cursor-pointer transition-all duration-300 hover:-rotate-6 hover:scale-110">
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
            className="btn btn-sm md:btn-md rounded-full bg-white border border-black/10 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 font-semibold shadow-sm flex-shrink-0 mt-1 md:mt-2 gap-1.5 transition-all duration-200 normal-case"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View All Services
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>

        {/* ── SERVICE GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">

          {/* LEFT COLUMN */}
          <div className="flex flex-col">
            {LEFT_SERVICES.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col mt-0 lg:mt-0">
            {RIGHT_SERVICES.map((s) => (
              <ServiceRow key={s.id} service={s} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}