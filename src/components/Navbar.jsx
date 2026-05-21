import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" }
];

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    // Scroll to top on page navigation
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  const activeStyle = {
    color: C.primary,
    fontWeight: "600",
    borderBottom: `2px solid ${C.primary}`,
    paddingBottom: "4px"
  };

  const baseStyle = {
    textDecoration: "none",
    color: C.text,
    fontWeight: "500",
    fontSize: "15px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    paddingBottom: "4px"
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 5%",
      background: scrolled ? "rgba(255,249,244,.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(240,165,0,.08)" : "none",
      transition: "all .3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* LOGO */}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logoImg} alt="UniTradeIn Logo" style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: C.text, lineHeight: 1.1, letterSpacing: -0.3 }}>
              Uni<span style={{ color: C.primary }}>Trade</span>In
            </div>
            <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: 1.8, textTransform: "uppercase", marginTop: 2 }}>Digital Excellence</div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hide-mob" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => isActive ? { ...baseStyle, ...activeStyle } : baseStyle}
              onMouseEnter={(e) => { if (location.pathname !== item.path) e.target.style.color = C.primary }}
              onMouseLeave={(e) => { if (location.pathname !== item.path) e.target.style.color = C.text }}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* GET STARTED BUTTON & MOBILE TOGGLE */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-fill hide-mob" style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => navigate("/contact")}>Get Started</button>
          <button className="show-mob" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: C.text }}>
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div style={{ background: "#fff", padding: "20px 5%", borderTop: `1px solid #F0E4D4`, display: "flex", flexDirection: "column", gap: 18 }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => isActive ? { ...baseStyle, color: C.primary, fontWeight: "600" } : baseStyle}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          <button className="btn btn-fill" style={{ alignSelf: "flex-start", marginTop: 4 }} onClick={() => navigate("/contact")}>Get Started</button>
        </div>
      )}
    </nav>
  );
}
