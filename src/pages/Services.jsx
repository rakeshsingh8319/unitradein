import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  primary: "#F0A500",
  secondary: "#F05A38",
  accent: "#FFD166",
  dark: "#1C1C2E",
  light: "#FFF9F4",
  text: "#2E1F0F",
  muted: "#7A5C3E",
};

const SERVICES = [
  {
    title: "Influencer Marketing",
    desc: "Connect with the right voices. We match your brand with influencers who authentically amplify your story to engaged global audiences.",
    color: "#F0A500",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=75",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Web Design & Development",
    desc: "Beautiful, fast, conversion-optimised websites built for global audiences — from landing pages to full e-commerce platforms.",
    color: "#F05A38",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=75",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: "Branding & Strategy",
    desc: "Build an identity that resonates. We craft visual systems, messaging frameworks, and brand guidelines that endure.",
    color: "#FFD166",
    img: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=75",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    title: "Performance Ads",
    desc: "Data-driven Google & Meta campaigns that convert. ROI-focused advertising scaled across international markets.",
    color: "#F0A500",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    title: "Social Media Management",
    desc: "Consistent, engaging presence across all platforms. We create, schedule, and grow your online community every day.",
    color: "#F05A38",
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=75",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    title: "SEO & Content Marketing",
    desc: "Rank higher, reach further. Strategic content and technical SEO that drives sustained organic growth globally.",
    color: "#FFD166",
    img: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=75",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
];

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff", color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Our Capabilities</div>
          <h1 className="serif" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 700, color: C.text, marginBottom: 16 }}>Services That Propel Global Growth</h1>
          <p style={{ fontSize: 18, color: C.muted, maxWidth: 600, margin: "0 auto", fontWeight: 300 }}>
            From target acquisition campaigns to enterprise digital products, we craft tailored experiences that endure.
          </p>
        </Fade>

        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 80 }}>
          {SERVICES.map((s, i) => (
            <Fade key={s.title} delay={i * 70}>
              <div className="svc-card">
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, rgba(46,31,15,.35))` }} />
                </div>
                <div style={{ padding: "30px 24px 34px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 18, border: `1px solid ${s.color}28` }}>
                    {s.icon}
                  </div>
                  <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{s.desc}</p>
                  <div 
                    style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 6, color: s.color, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                    onClick={() => navigate("/contact", { state: { service: s.title } })}
                  >
                    <span>Request consultation</span><IconArrow />
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        {/* EXTRA SERVICE FAQ BANNER */}
        <Fade>
          <div style={{ background: C.light, borderRadius: 24, padding: "50px", border: "1px solid #F0E4D4", textAlign: "center" }}>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Need a Custom Marketing Solution?</h2>
            <p style={{ fontSize: 16, color: C.muted, maxWidth: 600, margin: "0 auto 28px", lineHeight: 1.6 }}>
              Whether you need localized campaign audits, dedicated media buyers, or multi-platform API developers, our specialists are ready to integrate with your setup.
            </p>
            <button className="btn btn-fill" onClick={() => navigate("/contact")}>Talk to a Specialist</button>
          </div>
        </Fade>
      </div>
    </div>
  );
}
