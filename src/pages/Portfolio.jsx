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

const PORTFOLIO = [
  { title: "Aura Skincare", tag: "Branding + Web", result: "+240% web traffic", color: "#F0A500", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=75" },
  { title: "TechLaunch India", tag: "Performance Ads", result: "4.2x ROAS", color: "#F05A38", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75" },
  { title: "Heritage Foods", tag: "Social + SEO", result: "180K followers gained", color: "#FFD166", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75" },
  { title: "GreenWave NGO", tag: "Web + Strategy", result: "3x donor conversions", color: "#F0A500", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=75" },
  { title: "FitLife App", tag: "Influencer Marketing", result: "500K app installs", color: "#F05A38", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=75" },
  { title: "LuxStay Hotels", tag: "Full Digital Suite", result: "₹2Cr revenue", color: "#FFD166", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75" },
];

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

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff", color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Case Studies</div>
          <h1 className="serif" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 700, color: C.text, marginBottom: 16 }}>Proven Campaign Results</h1>
          <p style={{ fontSize: 18, color: C.muted, maxWidth: 600, margin: "0 auto", fontWeight: 300 }}>
            Discover how we scale international audiences and drive premium ROI metrics for modern, high-growth brands.
          </p>
        </Fade>

        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 80 }}>
          {PORTFOLIO.map((p, i) => (
            <Fade key={p.title} delay={i * 60}>
              <div className="port-card">
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(28,28,46,.72)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 50 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: .8 }}>{p.tag}</span>
                  </div>
                </div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 14 }}>{p.title}</h3>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: p.color + "14", borderRadius: 50, border: `1px solid ${p.color}28` }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: p.color }}>{p.result}</span>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        {/* BOTTOM METRIC CTA */}
        <Fade>
          <div style={{ background: C.light, borderRadius: 24, padding: "50px", border: "1px solid #F0E4D4", textAlign: "center" }}>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Want Similar Results for Your Brand?</h2>
            <p style={{ fontSize: 16, color: C.muted, maxWidth: 600, margin: "0 auto 28px", lineHeight: 1.6 }}>
              Let's analyze your current performance benchmarks and build a high-conversion digital strategy completely free of charge.
            </p>
            <button className="btn btn-fill" onClick={() => navigate("/contact")}>Claim Your Free Strategy Audit</button>
          </div>
        </Fade>
      </div>
    </div>
  );
}
