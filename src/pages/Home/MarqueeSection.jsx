import { useEffect, useRef } from "react";

export default function ScrollRevealText() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!wrapRef.current || !trackRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const wrapper = wrapRef.current;
          const track = trackRef.current;

          const rect = wrapper.getBoundingClientRect();
          const wrapperHeight = wrapper.offsetHeight;
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;

          // total scrollable distance
          const maxScroll = wrapperHeight - viewportHeight;

          // current scroll progress
          const currentScroll = Math.max(0, -rect.top);

          const progress = Math.min(
            Math.max(currentScroll / maxScroll, 0),
            1
          );

          // text width
          const trackWidth = track.scrollWidth;

          // move exactly enough so full text exits
          const totalMove = trackWidth + viewportWidth;

          // smooth horizontal movement
          const x =
            viewportWidth - progress * totalMove;

          track.style.transform = `translate3d(${x}px,0,0)`;

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        *{
          box-sizing:border-box;
        }

        .srt-outer{
          height:1100vh;
          position:relative;
          background:#ECEAE5;
        }

        .srt-sticky{
          position:sticky;
          top:0;
          height:100vh;

          overflow:hidden;

          display:flex;
          align-items:center;

          background:#ECEAE5;
        }

        .srt-track{
          white-space:nowrap;

          line-height:0.9;

          padding-left:4vw;

          will-change:transform;

          transform:translate3d(100vw,0,0);

          backface-visibility:hidden;

          perspective:1000px;
        }

        .srt-text{
          font-family:'DM Sans',sans-serif;

          font-weight:600;

          font-size:clamp(5.1rem,15.9vw,18rem);

          letter-spacing:-0.03em;

          color:#0a0a0a;

          display:inline-block;
        }

        @media (max-width:1023px){
          .srt-outer{
            display:none !important;
          }
        }
      `}</style>

      <div ref={wrapRef} className="srt-outer">
        <div className="srt-sticky">
          <div ref={trackRef} className="srt-track">
            <span className="srt-text">
              Ready to Rise at Seven?
            </span>
          </div>
        </div>
      </div>
    </>
  );
}