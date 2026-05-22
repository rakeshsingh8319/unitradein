import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const C = {
  primary: "#F0A500",
  secondary: "#F05A38",
  accent: "#FFD166",
  dark: "#1C1C2E",
  light: "#FFF9F4",
  text: "#2E1F0F",
  muted: "#7A5C3E",
};

const SERVICES_LIST = [
  { title: "Influencer Marketing", path: "/services" },
  { title: "Web Design & Development", path: "/services" },
  { title: "Branding & Strategy", path: "/services" },
  { title: "Performance Ads", path: "/services" },
];

const PAGES_LIST = [
  { title: "About Us", path: "/about" },
  { title: "Portfolio", path: "/portfolio" },
  { title: "Testimonials", path: "/testimonials" },
  { title: "Blog Hub", path: "/blog" },
  { title: "Contact Us", path: "/contact" }
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: C.dark, padding: "60px 5% 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="foot-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* COLUMN 1 - BRAND */}
          <div>
            <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <img src={logoImg} alt="UniTradeIn Logo" style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.1, letterSpacing: -0.3 }}>
                  Uni<span style={{ color: C.accent }}>Trade</span>In
                </div>
                <div style={{ fontSize: 9.5, color: "#7A6A5A", letterSpacing: 1.8, textTransform: "uppercase", marginTop: 2 }}>Digital Excellence</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#9E8A7A", lineHeight: 1.75, maxWidth: 280 }}>
              Universal Trading (India) Company — your global digital growth partner.
            </p>
          </div>

          {/* COLUMN 2 - SERVICES */}
          <div>
            <div style={{ fontWeight: 600, color: "#fff", marginBottom: 16, fontSize: 14 }}>Services</div>
            {SERVICES_LIST.map(s => (
              <div
                key={s.title}
                style={{ fontSize: 13, color: "#7A6A5A", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                onClick={() => navigate(s.path)}
                onMouseEnter={e => e.target.style.color = C.primary}
                onMouseLeave={e => e.target.style.color = "#7A6A5A"}
              >
                {s.title}
              </div>
            ))}
          </div>

          {/* COLUMN 3 - COMPANY PAGES */}
          <div>
            <div style={{ fontWeight: 600, color: "#fff", marginBottom: 16, fontSize: 14 }}>Company</div>
            {PAGES_LIST.map(l => (
              <div
                key={l.title}
                style={{ fontSize: 13, color: "#7A6A5A", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                onClick={() => navigate(l.path)}
                onMouseEnter={e => e.target.style.color = C.primary}
                onMouseLeave={e => e.target.style.color = "#7A6A5A"}
              >
                {l.title}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM METRICS */}
        <div style={{ borderTop: "1px solid #2A2A3E", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 13, color: "#5A4A3A" }}>© 2026 Universal Trading (India) Company. All rights reserved.</div>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <span
              onClick={() => navigate("/privacy-policy")}
              style={{ fontSize: 13, color: "#7A6A5A", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.primary}
              onMouseLeave={e => e.target.style.color = "#7A6A5A"}
            >
              Privacy Policy
            </span>
            <span
              onClick={() => navigate("/terms-conditions")}
              style={{ fontSize: 13, color: "#7A6A5A", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.primary}
              onMouseLeave={e => e.target.style.color = "#7A6A5A"}
            >
              Terms & Conditions
            </span>
            <a href="https://unitradein.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.primary, textDecoration: "none" }}>unitradein.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
