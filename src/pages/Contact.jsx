import { useState, useEffect, useRef } from "react";

const C = {
  primary: "#F0A500",
  secondary: "#F05A38",
  accent: "#FFD166",
  dark: "#1C1C2E",
  light: "#FFF9F4",
  text: "#2E1F0F",
  muted: "#7A5C3E",
};

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Influencer Marketing", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    const subject = `Inquiry: ${form.service}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`;
    
    window.location.href = `mailto:info@unitradein.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", service: "Influencer Marketing", message: "" });
    setSubmitted(false);
  };

  return (
    <div style={{ background: C.light, color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Contact Us</div>
          <h1 className="serif" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: C.text, marginBottom: 20 }}>Let's Start a Conversation</h1>
          <p style={{ fontSize: 16, color: C.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Ready to scale your brand internationally? Have questions about our custom digital marketing campaigns? Get in touch with us today.
          </p>
        </Fade>

        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60 }}>
          {/* INFO COLUMN */}
          <Fade>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ background: "#fff", padding: 32, borderRadius: 20, border: "1px solid #F0E4D4", boxShadow: "0 8px 32px rgba(46,31,15,0.03)" }}>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Get in touch directly</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.primary + "15", color: C.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconMail /></div>
                    <div>
                      <div style={{ fontSize: 13, color: C.muted, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Email Us</div>
                      <a href="mailto:info@unitradein.com" style={{ fontSize: 16, color: C.text, textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.text}>info@unitradin.com</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.primary + "15", color: C.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconPhone /></div>
                    <div>
                      <div style={{ fontSize: 13, color: C.muted, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Call Us</div>
                      <a href="tel:+919310563727" style={{ fontSize: 16, color: C.text, textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.text}>+91 93105 63727</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.primary + "15", color: C.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconPin /></div>
                    <div>
                      <div style={{ fontSize: 13, color: C.muted, textTransform: "uppercase", fontWeight: 600, letterSpacing: 0.5 }}>Our Office</div>
                      <div style={{ fontSize: 15, color: C.text, fontWeight: 500, lineHeight: 1.5 }}>
                        208/9 Somdutt Chamber- II,<br />
                        Bhikaji Cama Place, New Delhi - 110060
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BRAND STATEMENT CARD */}
              <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, padding: 36, borderRadius: 20, color: "#fff", boxShadow: "0 12px 36px rgba(240,90,56,0.18)" }}>
                <h4 className="serif" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Why UniTradeIn?</h4>
                <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.6 }}>
                  We are certified Premier partners specializing in building custom influencer campaigns and ultra-fast React landing pages. Partner with a warm, ambitious team committed to delivering absolute conversion transparency.
                </p>
              </div>
            </div>
          </Fade>

          {/* FORM COLUMN */}
          <Fade delay={150}>
            <div style={{ background: "#fff", padding: 40, borderRadius: 20, border: "1px solid #F0E4D4", boxShadow: "0 12px 40px rgba(46,31,15,0.04)", height: "100%" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#4BB54320", color: "#4BB543", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="serif" style={{ fontSize: 24, marginBottom: 12 }}>Message Sent Successfully!</h3>
                  <p style={{ color: C.muted, fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
                    Thank you for reaching out, <strong>{form.name}</strong>. A dedicated partner manager will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button className="btn btn-fill" onClick={handleReset}>Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Send us a message</h3>
                  
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Priya Sharma" 
                      required 
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="e.g. priya@brand.com" 
                        required 
                        value={form.email} 
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. +91 98765 43210" 
                        value={form.phone} 
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Inquiry Service</label>
                    <select 
                      value={form.service} 
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 12, border: "1.5px solid #E8D5BE",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.text, background: "#fff", outline: "none",
                        transition: "border-color 0.2s"
                      }}
                    >
                      <option value="Influencer Marketing">Influencer Marketing</option>
                      <option value="Web Design & Development">Web Design & Development</option>
                      <option value="Branding & Strategy">Branding & Strategy</option>
                      <option value="Performance Ads">Performance Ads</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="SEO & Content Marketing">SEO & Content Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Your Message *</label>
                    <textarea 
                      placeholder="Tell us about your brand, goals, and what you hope to achieve together..." 
                      required 
                      value={form.message} 
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-fill" style={{ alignSelf: "flex-start", marginTop: 8 }}>Send Message</button>
                </form>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
