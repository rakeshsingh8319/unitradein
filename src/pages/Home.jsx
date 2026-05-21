import { useState, useEffect, useRef } from "react";
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

const HERO_IMG = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80";

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
];

const STATS = [
  { value: "200+", label: "Global Clients" },
  { value: "15+", label: "Countries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "₹50Cr+", label: "Revenue Generated" },
];

const PORTFOLIO = [
  { title: "Aura Skincare", tag: "Branding + Web", result: "+240% web traffic", color: "#F0A500", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=75" },
  { title: "TechLaunch India", tag: "Performance Ads", result: "4.2x ROAS", color: "#F05A38", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75" },
  { title: "Heritage Foods", tag: "Social + SEO", result: "180K followers gained", color: "#FFD166", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75" },
];

const TESTIMONIALS = [
  { name: "Priya Mehta", role: "CEO, Luxe Jewels", text: "UniTradeIn transformed our digital presence. Our international orders tripled in 6 months. The team genuinely understands global markets.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=75" },
  { name: "James O'Brien", role: "Founder, Dublin Eats", text: "Working with this team feels like having a creative partner, not just an agency. Their strategic thinking is exceptional.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=75" },
];

const ABOUT_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
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

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: C.light, color: C.text }}>
      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5% 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 65% 50%,rgba(240,165,0,.07) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(240,90,56,.05) 0%,transparent 50%)`, pointerEvents: "none" }} />
        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,165,0,.1)", padding: "8px 18px", borderRadius: 50, marginBottom: 24, border: "1px solid rgba(240,165,0,.25)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary, animation: "float 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: 1.5, textTransform: "uppercase" }}>Global Digital Agency · India</span>
            </div>
            <h1 className="serif" style={{ fontSize: "clamp(2.4rem,4.2vw,3.8rem)", fontWeight: 900, lineHeight: 1.1, color: C.text, marginBottom: 24 }}>
              We Make Your Brand{" "}
              <span className="shimmer-text">Impossible</span>
              {" "}to Ignore
            </h1>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, marginBottom: 36, maxWidth: 500, fontWeight: 300 }}>
              Universal Trading (India) Company — a full-stack digital marketing agency helping global brands grow faster through strategy, creativity, and performance.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
              <button className="btn btn-fill" onClick={() => navigate("/contact")}>Start Your Journey</button>
              <button className="btn btn-ghost" onClick={() => navigate("/portfolio")}>View Our Work</button>
            </div>
            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: C.primary }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hide-mob" style={{ position: "relative" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 32px 80px rgba(46,31,15,.18)" }}>
              <img src={HERO_IMG} alt="Team at work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(240,165,0,.12),rgba(240,90,56,.08))" }} />
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -20, background: `linear-gradient(135deg,${C.primary},${C.secondary})`, borderRadius: 16, padding: "16px 24px", color: "#fff", boxShadow: "0 8px 32px rgba(240,90,56,.3)" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700 }}>7+</div>
              <div style={{ fontSize: 12, opacity: .9 }}>Years of Excellence</div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, background: "#fff", borderRadius: 16, padding: "14px 20px", border: `1px solid #F0E4D4`, boxShadow: "0 8px 32px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Avg. Client ROAS</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: C.primary }}>4.8x</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section id="services" style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>What We Do</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,3.2vw,2.8rem)", fontWeight: 700, color: C.text, marginBottom: 14 }}>Services That Drive Results</h2>
            <p style={{ fontSize: 17, color: C.muted, maxWidth: 520, margin: "0 auto" }}>Six powerful marketing disciplines working in harmony to grow your brand globally.</p>
          </Fade>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 40 }}>
            {SERVICES.map((s, i) => (
              <Fade key={s.title} delay={i * 70}>
                <div className="svc-card">
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, rgba(46,31,15,.3))` }} />
                  </div>
                  <div style={{ padding: "24px 24px 28px" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 14, border: `1px solid ${s.color}28` }}>
                      {s.icon}
                    </div>
                    <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65 }}>{s.desc}</p>
                    <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6, color: s.color, fontWeight: 600, fontSize: 14, cursor: "pointer" }} onClick={() => navigate("/services")}>
                      <span>Explore all services</span><IconArrow />
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn btn-ghost" onClick={() => navigate("/services")}>Explore All 6 Disciplines</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section id="about" style={{ padding: "100px 5%", background: C.light }}>
        <div className="grid2" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
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
            <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: C.text, marginBottom: 20, lineHeight: 1.2 }}>A Warm & Ambitious Team That Gets Results</h2>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 18 }}>
              Universal Trading (India) Company (UniTradeIn) is a full-service digital marketing agency headquartered in India, serving clients across 15+ countries. We believe great marketing feels human — not mechanical.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {["HubSpot-certified professionals", "International campaign expertise", "Transparent, results-driven approach"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: C.text }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.primary + "20", display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, flexShrink: 0 }}><IconCheck /></div>
                  {item}
                </div>
              ))}
            </div>
            <button className="btn btn-fill" onClick={() => navigate("/about")}>Learn More About Us</button>
          </Fade>
        </div>
      </section>

      {/* ── PORTFOLIO SECTION ── */}
      <section id="portfolio" style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Our Work</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,3.2vw,2.8rem)", fontWeight: 700, color: C.text, marginBottom: 14 }}>Results Speak Loudest</h2>
            <p style={{ fontSize: 17, color: C.muted, maxWidth: 480, margin: "0 auto" }}>Real campaigns, real growth, real clients — from Jaipur to the global stage.</p>
          </Fade>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 40 }}>
            {PORTFOLIO.map((p, i) => (
              <Fade key={p.title} delay={i * 60}>
                <div className="port-card">
                  <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                    <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(28,28,46,.72)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 50 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: .8 }}>{p.tag}</span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10 }}>{p.title}</h3>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: p.color + "14", borderRadius: 50, border: `1px solid ${p.color}28` }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: p.color }}>{p.result}</span>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-ghost" onClick={() => navigate("/portfolio")}>View Full Case Studies</button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section id="testimonials" style={{ padding: "100px 5%", background: C.dark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Testimonials</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,3.2vw,2.8rem)", fontWeight: 700, color: "#fff", marginBottom: 14 }}>Clients Love Us</h2>
            <p style={{ fontSize: 17, color: "#9E8A7A" }}>Partnerships built on trust and sustained growth.</p>
          </Fade>
          <div className="grid2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginBottom: 40 }}>
            {TESTIMONIALS.map((t, i) => (
              <Fade key={t.name} delay={i * 100}>
                <div className="testi-card">
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[0, 1, 2, 3, 4].map(n => <IconStar key={n} />)}
                  </div>
                  <p style={{ fontSize: 16, color: "#D4C4B4", lineHeight: 1.75, marginBottom: 24 }}>{t.text}</p>
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
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-ghost" style={{ borderColor: C.accent, color: C.accent }} onClick={() => navigate("/testimonials")}>Read More Reviews</button>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ padding: "90px 5%", background: `linear-gradient(135deg,${C.primary},${C.secondary})`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-50%", left: "-5%", width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,.05)", pointerEvents: "none" }} />
        <Fade>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 16, position: "relative" }}>
            Ready to Grow Globally?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.85)", marginBottom:36, position: "relative" }}>
            Let's build something extraordinary together.
          </p>
          <div className="cta-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <button className="btn btn-white" onClick={() => navigate("/contact")}>Get a Free Consultation</button>
            <a href="mailto:info@unitradin.com" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.55)", padding: "14px 36px", borderRadius: 50, fontWeight: 600, fontSize: 15, fontFamily: "'DM Sans',sans-serif", textDecoration: "none", transition: "border-color .2s" }}>
              info@unitradin.com
            </a>
          </div>
        </Fade>
      </section>
    </div>
  );
}
