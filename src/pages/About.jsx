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

const ABOUT_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";

const CORE_VALUES = [
  { title: "Empathetic Partnership", desc: "We are extension of your team, not just a service provider. We listen first, understand deeply, and align goals." },
  { title: "Absolute Transparency", desc: "No vanity metrics or disguised ad budgets. We report real conversion and return data with absolute clarity." },
  { title: "Global Perspective", desc: "Serving 15+ countries enables us to leverage global audience insights and localize campaigns seamlessly." },
  { title: "Continuous Learning", desc: "As Premier partner certified leaders, we are continually sharpening our tools with modern digital certifications." }
];

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
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

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ background: C.light, color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HERO SECTION */}
        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginBottom: 100 }}>
          <Fade>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 32px 80px rgba(46,31,15,.15)" }}>
                <img src={ABOUT_IMG} alt="Our team collaborating" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(240,165,0,.1),transparent)" }} />
              </div>
              <div style={{ position: "absolute", bottom: -20, right: -20, background: `linear-gradient(135deg,${C.primary},${C.secondary})`, borderRadius: 16, padding: "16px 24px", color: "#fff", boxShadow: "0 8px 32px rgba(240,90,56,.28)" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700 }}>15+</div>
                <div style={{ fontSize: 12, opacity: .9 }}>Countries Served</div>
              </div>
            </div>
          </Fade>
          <Fade delay={150}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>About Us</div>
            <h1 className="serif" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: C.text, marginBottom: 20, lineHeight: 1.2 }}>A Warm & Ambitious Team That Gets Results</h1>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 18 }}>
              Universal Trading (India) Company (UniTradeIn) is a full-service digital marketing agency headquartered in India, serving clients across 15+ countries. We believe great marketing feels human — not mechanical.
            </p>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 32 }}>
              Our philosophy is simple: understand your brand deeply, craft custom strategies that resonate globally, and execute with absolute precision and warmth. We don't view ourselves as an agency — we are your dedicated digital partners.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {["HubSpot-certified professionals", "International campaign expertise", "Transparent, results-driven approach", "Dedicated account managers for every partner"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: C.text }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.primary + "20", display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, flexShrink: 0 }}><IconCheck /></div>
                  {item}
                </div>
              ))}
            </div>
          </Fade>
        </div>

        {/* CORE VALUES */}
        <div style={{ marginBottom: 40 }}>
          <Fade style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Our Principles</div>
            <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: C.text }}>The Core Values We Stand By</h2>
          </Fade>
          <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {CORE_VALUES.map((v, i) => (
              <Fade key={v.title} delay={i * 100}>
                <div style={{ background: "#fff", padding: "36px", borderRadius: "20px", border: "1px solid #F0E4D4", boxShadow: "0 8px 24px rgba(46,31,15,0.02)" }}>
                  <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>

        {/* BOTTOM METRIC CTA */}
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <button className="btn btn-fill" onClick={() => navigate("/contact")}>Start Scaling Today</button>
        </div>
      </div>
    </div>
  );
}
