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

const TESTIMONIALS = [
  { name: "Priya Mehta", role: "CEO, Luxe Jewels", text: "UniTradeIn transformed our digital presence. Our international orders tripled in 6 months. The team genuinely understands global markets.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=75" },
  { name: "James O'Brien", role: "Founder, Dublin Eats", text: "Working with this team feels like having a creative partner, not just an agency. Their strategic thinking is exceptional.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=75" },
  { name: "Riya Sharma", role: "Marketing Head, TechVenture", text: "The influencer campaigns they ran for us exceeded every KPI. 4x ROAS on our Meta campaigns within the first quarter.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=75" },
  { name: "Carlos Mendez", role: "Director, Mex-Trend", text: "Professional, creative, and always delivering on time. Our brand identity is now something we are genuinely proud of.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=75" },
];

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={C.accent} stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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

export default function Testimonials() {
  const navigate = useNavigate();

  return (
    <div style={{ background: C.dark, color: "#fff", padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Reviews & Trust</div>
          <h1 className="serif" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>What Our Partners Say</h1>
          <p style={{ fontSize: 18, color: "#9E8A7A", maxWidth: 600, margin: "0 auto", fontWeight: 300 }}>
            Real metrics, real partnerships, and absolute global trust. Don't take our word for it.
          </p>
        </Fade>

        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginBottom: 80 }}>
          {TESTIMONIALS.map((t, i) => (
            <Fade key={t.name} delay={i * 100}>
              <div className="testi-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[0, 1, 2, 3, 4].map(n => <IconStar key={n} />)}
                  </div>
                  <p style={{ fontSize: 16, color: "#D4C4B4", lineHeight: 1.75, marginBottom: 24 }}>"{t.text}"</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={t.img} alt={t.name} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.primary}50`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "#7A6A5A" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        {/* BOTTOM METRIC CTA */}
        <Fade style={{ textAlign: "center" }}>
          <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Ready to Be Our Next Success Story?</h2>
          <p style={{ fontSize: 16, color: "#9E8A7A", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Join 200+ brands generating exceptional ROAS and building memorable identities.
          </p>
          <button className="btn btn-fill" onClick={() => navigate("/contact")}>Begin Your Collaboration</button>
        </Fade>
      </div>
    </div>
  );
}
