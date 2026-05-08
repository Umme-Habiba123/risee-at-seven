import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  { id:0, heading:"Pioneers", body:"We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search and Social Search.", image:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=95", cardBg:"#0d0d0d", textColor:"#ffffff", subColor:"rgba(255,255,255,0.6)", backBg:"#7ee8c8", notch:"#7ee8c8", tilt:-5, backTilt:4 },
  { id:1, heading:"Award\nWinning", body:"A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. Official judges for Global Search Awards and Global Content Marketing Awards.", image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=95", cardBg:"#7ee8c8", textColor:"#0a0a0a", subColor:"rgba(0,0,0,0.58)", backBg:"#f0ece6", notch:"#0a0a0a", tilt:-4, backTilt:5 },
  { id:2, heading:"Faster\nThinkers", body:"Google is moving fast, but we're moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.", image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=95", cardBg:"#f0ece6", textColor:"#0a0a0a", subColor:"rgba(0,0,0,0.55)", backBg:"#c8733a", notch:"#0a0a0a", tilt:-6, backTilt:3 },
  { id:3, heading:"Global\nReach", body:"Four offices. Infinite ambition. From Sheffield to New York, our search-first thinking travels with us, adapting to every market and every algorithm update.", image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=95", cardBg:"#c8733a", textColor:"#ffffff", subColor:"rgba(255,255,255,0.68)", backBg:"#1a1a2e", notch:"#ffffff", tilt:-3, backTilt:6 },
  { id:4, heading:"Category\nLeaders", body:"We don't just rank for keywords — we own entire categories. Our proprietary Category Leaderboard tracks brand visibility across Google, ChatGPT, Gemini and TikTok.", image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=95", cardBg:"#1a1a2e", textColor:"#ffffff", subColor:"rgba(255,255,255,0.6)", backBg:"#7ee8c8", notch:"#7ee8c8", tilt:-5, backTilt:4 },
  { id:5, heading:"Creative\nForce", body:"We don't just distribute content — we engineer it. From long-form editorial to viral social moments, our creative team builds pieces that earn links and stick in culture.", image:"https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=95", cardBg:"#f7c948", textColor:"#0a0a0a", subColor:"rgba(0,0,0,0.58)", backBg:"#0d0d0d", notch:"#0a0a0a", tilt:-4, backTilt:5 },
  { id:6, heading:"PR\nPowerhouse", body:"Digital PR that earns coverage in publications that matter. We place our clients in the conversations shaping their categories — not chasing from the sidelines.", image:"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=95", cardBg:"#0d0d0d", textColor:"#ffffff", subColor:"rgba(255,255,255,0.62)", backBg:"#ff6b6b", notch:"#ff6b6b", tilt:-6, backTilt:3 },
  { id:7, heading:"Social\nSearch", body:"TikTok isn't just entertainment — it's a search engine. We were the first agency to treat social platforms as discovery channels, building strategies for how people find things now.", image:"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=95", cardBg:"#ff6b6b", textColor:"#ffffff", subColor:"rgba(255,255,255,0.7)", backBg:"#7ee8c8", notch:"#0a0a0a", tilt:-3, backTilt:6 },
  { id:8, heading:"True\nPartners", body:"We don't take briefs, we build partnerships. From SIXT to HubSpot, Xbox to Revolution Beauty — we embed ourselves into the business problem and work backwards.", image:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=95", cardBg:"#7ee8c8", textColor:"#0a0a0a", subColor:"rgba(0,0,0,0.55)", backBg:"#f7c948", notch:"#0a0a0a", tilt:-5, backTilt:4 },
  { id:9, heading:"Future\nReady", body:"AI is changing search. We're not afraid — we're excited. Our LLM Search practice ensures our clients appear in AI-generated answers and the new discovery surfaces emerging every quarter.", image:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=95", cardBg:"#0d0d0d", textColor:"#ffffff", subColor:"rgba(255,255,255,0.62)", backBg:"#7ee8c8", notch:"#7ee8c8", tilt:-4, backTilt:5 },
];

const SCROLL_PER_CARD = 700;
const TOTAL_SCROLL = SCROLL_PER_CARD * CARDS.length;
const easeInOut = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
const easeOut   = (t) => 1 - Math.pow(1-t,3);

/* ── Shared card face ── */
function CardFace({ card, small }) {
  const photoSize = small ? "clamp(100px,40vw,155px)" : "clamp(130px,30%,185px)";
  return (
    <div style={{
      position:"relative", width:"100%", height:"100%",
      borderRadius:"clamp(20px,4vw,40px)",
      background: card.cardBg,
      boxShadow:"0 24px 80px rgba(0,0,0,0.28),0 6px 24px rgba(0,0,0,0.12)",
      display:"flex", flexDirection:"column", alignItems:"center",
      textAlign:"center", overflow:"hidden",
      paddingTop: small ? "clamp(26px,7vw,44px)" : "clamp(36px,6vh,60px)",
      paddingLeft: "clamp(16px,5%,44px)", paddingRight: "clamp(16px,5%,44px)",
      paddingBottom: small ? "clamp(16px,5vw,28px)" : "clamp(20px,4vh,40px)",
    }}>
      {/* notch */}
      <div style={{
        position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
        width: small?34:48, height: small?17:24,
        borderRadius:"0 0 22px 22px", background: card.notch,
      }}/>
      {/* photo */}
      <div style={{
        width:photoSize, height:photoSize, flexShrink:0,
        borderRadius:"clamp(14px,3vw,22px)", overflow:"hidden",
        boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
        marginBottom: small?"clamp(0.6rem,3vw,1rem)":"clamp(0.9rem,3vh,1.6rem)",
      }}>
        <img src={card.image} alt={card.heading}
          style={{width:"100%",height:"100%",objectFit:"cover",
            filter:"brightness(1.04) contrast(1.06) saturate(1.1)"}}/>
      </div>
      {/* heading */}
      <h2 style={{
        fontFamily:"'Syne',sans-serif", fontWeight:700, lineHeight:0.93,
        fontSize: small?"clamp(1.7rem,8vw,2.6rem)":"clamp(2rem,7vw,4.5rem)",
        letterSpacing:"-0.045em", color:card.textColor, whiteSpace:"pre-line",
        marginBottom: small?"clamp(0.5rem,2.5vw,0.9rem)":"clamp(0.7rem,2.5vh,1.2rem)",
      }}>{card.heading}</h2>
      {/* body */}
      <p style={{
        fontFamily:"'DM Sans',sans-serif", lineHeight:1.6,
        fontSize: small?"clamp(0.68rem,3vw,0.84rem)":"clamp(0.72rem,1.6vw,0.93rem)",
        color:card.subColor, maxWidth:330,
      }}>{card.body}</p>
    </div>
  );
}

/* ── Dots ── */
function Dots({ active, notch, light }) {
  return (
    <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginTop:14}}>
      {CARDS.map((_,i)=>(
        <div key={i} style={{
          height:5, borderRadius:99, flexShrink:0,
          width: i===active ? 22 : 6,
          background: i===active ? (light?notch:"#0a0a0a") : "rgba(0,0,0,0.18)",
          transition:"all 0.3s ease",
        }}/>
      ))}
    </div>
  );
}

/* ── Mobile swipe ── */
function MobileCarousel() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current; if(!el) return;
    setActive(Math.round(el.scrollLeft / (el.scrollWidth / CARDS.length)));
  };
  return (
    <div style={{background:"#eae7e2",paddingTop:24,paddingBottom:32}}>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,
        fontSize:"clamp(0.7rem,3.5vw,0.9rem)",letterSpacing:"-0.04em",
        color:"#0a0a0a",textAlign:"center",marginBottom:16}}>Legacy In The Making</p>
      <div ref={ref} onScroll={onScroll} style={{
        display:"flex", gap:"clamp(10px,3.5vw,16px)",
        overflowX:"auto", scrollSnapType:"x mandatory",
        WebkitOverflowScrolling:"touch",
        padding:"8px clamp(1rem,6vw,1.5rem) 10px",
        scrollbarWidth:"none",
      }}>
        {CARDS.map(card=>(
          <div key={card.id} style={{
            scrollSnapAlign:"center", flexShrink:0,
            width:"clamp(250px,76vw,310px)", height:"clamp(370px,88vw,450px)",
          }}>
            <CardFace card={card} small={true}/>
          </div>
        ))}
      </div>
      <Dots active={active}/>
    </div>
  );
}

/* ── Tablet swipe ── */
function TabletCarousel() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current; if(!el) return;
    setActive(Math.round(el.scrollLeft / (el.scrollWidth / CARDS.length)));
  };
  return (
    <div style={{background:"#eae7e2",paddingTop:36,paddingBottom:44}}>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,
        fontSize:"clamp(0.8rem,2vw,1rem)",letterSpacing:"-0.04em",
        color:"#0a0a0a",textAlign:"center",marginBottom:24}}>Legacy In The Making</p>
      <div ref={ref} onScroll={onScroll} style={{
        display:"flex", gap:20,
        overflowX:"auto", scrollSnapType:"x mandatory",
        WebkitOverflowScrolling:"touch",
        padding:"12px clamp(2rem,6vw,4rem) 14px",
        scrollbarWidth:"none",
      }}>
        {CARDS.map(card=>(
          <div key={card.id} style={{
            scrollSnapAlign:"center", flexShrink:0,
            width:"clamp(300px,50vw,400px)", height:"clamp(420px,58vw,510px)",
          }}>
            <CardFace card={card} small={false}/>
          </div>
        ))}
      </div>
      <Dots active={active}/>
    </div>
  );
}

/* ── Desktop sticky scroll ── */
function DesktopScroll() {
  const wrapRef = useRef(null);
  const rafRef  = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [cardProgress, setCardProgress] = useState(0);

  const onScroll = useCallback(()=>{
    if(rafRef.current) return;
    rafRef.current = requestAnimationFrame(()=>{
      rafRef.current = null;
      if(!wrapRef.current) return;
      const scrolled = -wrapRef.current.getBoundingClientRect().top;
      if(scrolled<=0){setActiveIdx(0);setCardProgress(0);return;}
      if(scrolled>=TOTAL_SCROLL){setActiveIdx(CARDS.length-1);setCardProgress(1);return;}
      const idx = Math.min(Math.floor(scrolled/SCROLL_PER_CARD), CARDS.length-1);
      setActiveIdx(idx);
      setCardProgress((scrolled%SCROLL_PER_CARD)/SCROLL_PER_CARD);
    });
  },[]);

  useEffect(()=>{
    window.addEventListener("scroll",onScroll,{passive:true});
    onScroll();
    return ()=>window.removeEventListener("scroll",onScroll);
  },[onScroll]);

  const cur  = CARDS[activeIdx];
  const next = CARDS[Math.min(activeIdx+1, CARDS.length-1)];
  const tExit  = easeInOut(Math.max(0,Math.min(1,(cardProgress-0.50)/0.50)));
  const tEntry = easeOut(Math.max(0,Math.min(1,(cardProgress-0.25)/0.75)));
  const curY     = tExit*-160;
  const curScale = 1-tExit*0.09;
  const curOp    = Math.max(0,1-tExit*1.5);
  const curRot   = cur.tilt-tExit*cur.tilt*0.6;
  const backScale= 0.84+tEntry*0.16;
  const backOp   = 0.4+tEntry*0.6;
  const backY    = 32-tEntry*32;
  const backRot  = next.backTilt*(1-tEntry*0.2);

  return (
    <div ref={wrapRef} style={{height:`calc(100vh + ${TOTAL_SCROLL}px)`,background:"#eae7e2"}}>
      <div style={{
        position:"sticky",top:0,height:"100vh",width:"100%",
        display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",background:"#eae7e2",overflow:"visible",
      }}>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,
          fontSize:"clamp(0.75rem,1.5vw,1.1rem)",letterSpacing:"-0.04em",
          color:"#0a0a0a",marginBottom:"clamp(1.5rem,4vh,2.5rem)"}}>Legacy In The Making</p>

        <div style={{position:"relative",width:"min(540px,88vw)",height:"min(540px,78vh)"}}>
          {/* back */}
          <div style={{
            position:"absolute",inset:0,
            borderRadius:"clamp(20px,4vw,50px)",
            background:next.backBg,
            transform:`translateY(${backY}px) rotate(${backRot}deg) scale(${backScale})`,
            opacity:backOp, willChange:"transform,opacity",
            boxShadow:"0 16px 60px rgba(0,0,0,0.15)",
          }}/>
          {/* front */}
          <div style={{
            position:"absolute",inset:0,
            transform:`translateY(${curY}px) rotate(${curRot}deg) scale(${curScale})`,
            opacity:Math.max(0,curOp), willChange:"transform,opacity",
          }}>
            <CardFace card={cur} small={false}/>
          </div>
        </div>

        {/* dots */}
        <div style={{
          display:"flex",gap:7,marginTop:"clamp(1.25rem,3vh,2rem)",
          flexWrap:"wrap",justifyContent:"center",
        }}>
          {CARDS.map((_,i)=>(
            <div key={i} style={{
              height:7,borderRadius:99,flexShrink:0,
              width: i===activeIdx?24:7,
              background: i===activeIdx
                ? cur.notch
                : (cur.textColor==="#ffffff"?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.15)"),
              transition:"all 0.25s ease",
            }}/>
          ))}
        </div>

        {/* scroll hint */}
        <div style={{
          position:"absolute",bottom:"clamp(1.5rem,4vh,2rem)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:8,
          pointerEvents:"none",
          opacity:activeIdx===0&&cardProgress<0.2?0.4:0,
          transition:"opacity 0.3s",
        }}>
          <p style={{fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",
            fontSize:"0.6rem",letterSpacing:"0.22em",color:"rgba(0,0,0,0.35)"}}>Scroll</p>
          <div style={{width:1,height:32,background:"rgba(0,0,0,0.25)"}}/>
        </div>
      </div>
    </div>
  );
}

/* ── Root ── */
export default function LegacyCards() {
  const [layout, setLayout] = useState("desktop");
  useEffect(()=>{
    const check=()=>{
      const w=window.innerWidth;
      setLayout(w<640?"mobile":w<1024?"tablet":"desktop");
    };
    check();
    window.addEventListener("resize",check);
    return ()=>window.removeEventListener("resize",check);
  },[]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        *::-webkit-scrollbar{display:none;}
      `}</style>
      {layout==="mobile"  && <MobileCarousel/>}
      {layout==="tablet"  && <TabletCarousel/>}
      {layout==="desktop" && <DesktopScroll/>}
    </>
  );
}