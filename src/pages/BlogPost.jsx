import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { BLOG_POSTS } from "../data/blogData";

const C = {
  primary: "#F0A500",
  secondary: "#F05A38",
  accent: "#FFD166",
  dark: "#1C1C2E",
  light: "#FFF9F4",
  text: "#2E1F0F",
  muted: "#7A5C3E",
};

const IconBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
);

function useInView(threshold = 0.1) {
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

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Find active article
  const post = BLOG_POSTS.find(p => p.id === id);

  // Ensure page scrolls to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div style={{ background: C.light, color: C.text, padding: "160px 5% 120px", textAlign: "center" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", background: "#fff", padding: 48, borderRadius: 20, border: "1px solid #F0E4D4", boxShadow: "0 8px 32px rgba(46,31,15,0.03)" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>⚠️</div>
          <h1 className="serif" style={{ fontSize: 26, marginBottom: 12 }}>Article Not Found</h1>
          <p style={{ color: C.muted, fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
            The article you are looking for might have been moved, renamed, or is currently unavailable.
          </p>
          <Link to="/blog" className="btn btn-fill" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <IconBack /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related reads: other posts in same category, or just other posts
  const relatedPosts = BLOG_POSTS
    .filter(p => p.id !== post.id)
    .sort((a, b) => (b.category === post.category ? 1 : 0) - (a.category === post.category ? 1 : 0))
    .slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: C.light, color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        
        {/* BACK TO BLOG */}
        <Fade>
          <Link 
            to="/blog" 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 8, 
              color: C.primary, 
              textDecoration: "none", 
              fontWeight: 600, 
              fontSize: 14,
              marginBottom: 32,
              transition: "transform 0.2s"
            }}
            onMouseEnter={e => e.target.style.transform = "translateX(-4px)"}
            onMouseLeave={e => e.target.style.transform = "translateX(0)"}
          >
            <IconBack /> Back to Blog
          </Link>
        </Fade>

        {/* METADATA HEADLINE */}
        <Fade delay={50}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ background: C.primary + "18", color: C.secondary, padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {post.category}
            </span>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>
              {post.date} • {post.readTime}
            </span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 700, color: C.text, lineHeight: 1.25, marginBottom: 32 }}>
            {post.title}
          </h1>
        </Fade>

        {/* AUTHOR PROFILE CARD */}
        <Fade delay={100}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            borderTop: "1px solid #F0E4D4", 
            borderBottom: "1px solid #F0E4D4", 
            padding: "20px 0", 
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.primary}` }} 
              />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{post.author.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{post.author.role}</div>
              </div>
            </div>

            {/* SHARE / LINK BUTTON */}
            <button 
              onClick={handleCopyLink}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: "1px solid #E8D5BE",
                borderRadius: 50,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                color: C.text,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.target.style.background = C.primary + "08"; e.target.style.borderColor = C.primary; }}
              onMouseLeave={e => { e.target.style.background = "#fff"; e.target.style.borderColor = "#E8D5BE"; }}
            >
              <IconShare />
              {copied ? "Link Copied!" : "Share Article"}
            </button>
          </div>
        </Fade>

        {/* LARGE COVER IMAGE */}
        <Fade delay={150}>
          <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "16/9", marginBottom: 48, boxShadow: "0 20px 48px rgba(46,31,15,0.08)" }}>
            <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Fade>

        {/* MAIN TEXT BODY */}
        <Fade delay={200}>
          <div style={{ 
            fontSize: "clamp(1.05rem, 1.2vw, 1.15rem)", 
            color: C.text, 
            lineHeight: 1.85, 
            display: "flex", 
            flexDirection: "column", 
            gap: 24,
            marginBottom: 60 
          }}>
            {post.content.map((pText, index) => (
              <p key={index} style={{ textIndent: index > 0 ? "1em" : "0" }}>
                {pText}
              </p>
            ))}
          </div>
        </Fade>

        {/* CTA BOX */}
        <Fade>
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}12, ${C.secondary}12)`,
            border: `1px solid ${C.primary}30`,
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
            marginBottom: 80
          }}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready to scale your business?</h3>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 24px" }}>
              Let's craft an authentic influencer campaign or deploy high-performance ad budgets for your global targets.
            </p>
            <button className="btn btn-fill" onClick={() => navigate("/contact")}>Start Scaling Today</button>
          </div>
        </Fade>

        {/* RELATED ARTICLES SECTION */}
        <Fade>
          <div style={{ borderTop: "1px solid #F0E4D4", paddingTop: 48 }}>
            <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Related Reads</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid2">
              {relatedPosts.map(rel => (
                <div key={rel.id} className="port-card" style={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: 16, overflow: "hidden" }}>
                  <Link to={`/blog/${rel.id}`} style={{ display: "block", aspectRatio: "16/10", overflow: "hidden" }}>
                    <img src={rel.img} alt={rel.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Link>
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "block" }}>{rel.category}</span>
                    <h4 className="serif" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, flexGrow: 1 }}>
                      <Link to={`/blog/${rel.id}`} style={{ color: C.text, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.text}>
                        {rel.title}
                      </Link>
                    </h4>
                    <Link to={`/blog/${rel.id}`} style={{ fontSize: 13, fontWeight: 600, color: C.primary, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      Read Post →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fade>

      </div>
    </div>
  );
}
