import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

const CATEGORIES = ["All", "Marketing", "Web Development", "Branding", "Performance Ads"];

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

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filter posts based on category and search query
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div style={{ background: C.light, color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* HERO SECTION */}
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Insights & Strategy</div>
          <h1 className="serif" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: C.text, marginBottom: 20 }}>The UniTradeIn Blog</h1>
          <p style={{ fontSize: 16, color: C.muted, maxWidth: 650, margin: "0 auto", lineHeight: 1.6 }}>
            Expert analyses, tactical guides, and modern marketing playbooks to help ambitious brands scale across international markets.
          </p>
        </Fade>

        {/* SEARCH AND FILTERS */}
        <Fade delay={100}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginBottom: 48,
            background: "#fff",
            padding: "24px",
            borderRadius: "20px",
            border: "1px solid #F0E4D4",
            boxShadow: "0 8px 32px rgba(46,31,15,0.03)"
          }}>
            {/* SEARCH INPUT */}
            <div style={{ position: "relative", width: "100%" }}>
              <input 
                type="text" 
                placeholder="Search articles by keywords, topics, or categories..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 48 }}
              />
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={C.muted} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              >
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 14, fontWeight: 600
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* CATEGORY PILLS */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "50px",
                      border: "1px solid " + (isActive ? C.primary : "#E8D5BE"),
                      background: isActive ? `linear-gradient(135deg, ${C.primary}, ${C.secondary})` : "transparent",
                      color: isActive ? "#fff" : C.text,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </Fade>

        {/* ARTICLES GRID */}
        {filteredPosts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 40, marginBottom: 80 }}>
            {filteredPosts.map((post, index) => (
              <Fade key={post.id} delay={index * 80}>
                <article className="port-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* IMAGE */}
                  <Link to={`/blog/${post.id}`} style={{ display: "block", overflow: "hidden", aspectRatio: "16/10", position: "relative" }}>
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    <div style={{
                      position: "absolute", top: 16, left: 16,
                      background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(8px)",
                      padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700, color: C.secondary,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                    }}>
                      {post.category}
                    </div>
                  </Link>

                  {/* CONTENT */}
                  <div style={{ padding: 28, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <div style={{ display: "flex", gap: 12, fontSize: 13, color: C.muted, marginBottom: 12, fontWeight: 500 }}>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 14 }}>
                      <Link to={`/blog/${post.id}`} style={{ color: C.text, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.text}>
                        {post.title}
                      </Link>
                    </h2>

                    <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6, marginBottom: 24, flexGrow: 1 }}>
                      {post.excerpt}
                    </p>

                    {/* AUTHOR & ACTION */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F0E4D4", paddingTop: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} 
                        />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{post.author.name}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>{post.author.role.split(" & ")[0]}</div>
                        </div>
                      </div>

                      <Link 
                        to={`/blog/${post.id}`} 
                        className="btn btn-ghost" 
                        style={{ padding: "8px 18px", fontSize: 13, borderRadius: 50 }}
                      >
                        Read Article
                      </Link>
                    </div>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        ) : (
          <Fade>
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 20, border: "1px solid #F0E4D4", marginBottom: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 className="serif" style={{ fontSize: 22, marginBottom: 10 }}>No Articles Found</h3>
              <p style={{ color: C.muted, fontSize: 15, maxWidth: 450, margin: "0 auto 20px" }}>
                We couldn't find any articles matching "<strong>{search}</strong>" in the category "<strong>{activeCategory}</strong>".
              </p>
              <button 
                className="btn btn-fill" 
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
              >
                Reset All Filters
              </button>
            </div>
          </Fade>
        )}

        {/* NEWSLETTER SECTION */}
        <Fade>
          <div style={{
            background: `linear-gradient(135deg, ${C.dark}, #25253D)`,
            borderRadius: "24px",
            padding: "50px 5%",
            textAlign: "center",
            color: "#fff",
            border: "1px solid #3A3A54",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15)"
          }}>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, marginBottom: 16 }}>Subscribe to the Playbook</h2>
              <p style={{ fontSize: 15, color: "#A598A8", lineHeight: 1.6, marginBottom: 32 }}>
                Join over 5,000+ brand owners and media buyers receiving our bi-weekly strategy breakdowns. Absolutely no spam, only pure tactical guidance.
              </p>

              {subscribed ? (
                <div style={{ background: "rgba(75, 181, 67, 0.1)", border: "1px solid #4BB543", padding: "16px 24px", borderRadius: 12, display: "inline-block" }}>
                  <span style={{ color: "#4BB543", fontWeight: 600, fontSize: 15 }}>✓ You're in! Check your inbox soon for the latest strategies.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <input 
                    type="email" 
                    placeholder="Enter your professional email address" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                      maxWidth: 360,
                      flexGrow: 1,
                      outline: "none"
                    }}
                    onFocus={e => e.target.style.borderColor = C.primary}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                  />
                  <button type="submit" className="btn btn-fill">Subscribe Now</button>
                </form>
              )}
            </div>
          </div>
        </Fade>

      </div>
    </div>
  );
}
