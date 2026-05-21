import { useEffect, useState, useRef } from "react";

const C = {
  primary: "#F0A500",
  secondary: "#F05A38",
  accent: "#FFD166",
  dark: "#1C1C2E",
  light: "#FFF9F4",
  text: "#2E1F0F",
  muted: "#7A5C3E",
};

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
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function TermsConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: C.light, color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        {/* HEADER */}
        <Fade style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Legal Agreement</div>
          <h1 className="serif" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: C.text, marginBottom: 16 }}>Terms & Conditions</h1>
          <p style={{ fontSize: 15, color: C.muted }}>Last Updated: May 21, 2026</p>
        </Fade>

        {/* INTRODUCTION CARD */}
        <Fade>
          <div style={{ background: "#fff", padding: 32, borderRadius: 20, border: "1px solid #F0E4D4", boxShadow: "0 8px 32px rgba(46,31,15,0.02)", marginBottom: 32 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: C.text, margin: 0 }}>
              Welcome to <strong>Universal Trading (India) Company (UniTradeIn)</strong>. These terms and conditions outline the rules and regulations for the use of UniTradeIn's website, located at <strong>unitradin.com</strong>. By accessing this website, we assume you accept these terms and conditions. Do not continue to use unitradin.com if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </div>
        </Fade>

        {/* CONTENT SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          
          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>1. Definitions & Scope</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                "Company", "Ourselves", "We", "Our" and "Us" refers to Universal Trading (India) Company (UniTradeIn). "Party", "Parties", or "Client" refers to you as a visitor, brand partner, or agency client. These terms govern website visits, custom audits, form submissions, and newsletter participation.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>2. Intellectual Property Rights</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, marginBottom: 16 }}>
                Unless otherwise stated, UniTradeIn and/or its licensors own the intellectual property rights for all material, code design, portfolio imagery, case studies, and articles on this website. All intellectual property rights are reserved. You may access this from unitradin.com for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, marginBottom: 16 }}>
                You must not:
              </p>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 15, lineHeight: 1.8, color: C.muted }}>
                <li>Republish case studies, designs, or blog articles from unitradin.com.</li>
                <li>Sell, rent or sub-license material or custom React code components from UniTradeIn.</li>
                <li>Reproduce, duplicate or copy material from our brand showcases.</li>
                <li>Redistribute content from UniTradeIn (unless content is specifically made for redistribution).</li>
              </ul>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>3. Professional Service Engagements</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                Consultations, audits, and performance estimates requested through our contact forms are complimentary and for strategy planning purposes only. Formal digital marketing campaigns, influencer placements, and development agreements require a mutually signed Statement of Work (SOW) or service agreement specifying deliverables, budgets, timelines, and payment structures.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>4. Limitation of Liability</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. We do not guarantee that the articles, insights, or advice provided on our blog are fully updated or free of typographical errors. We will not be liable for any loss or damage of any nature arising from the use of this website or reliance on information presented here.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>5. Governing Law & Jurisdiction</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                These terms and conditions are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with the use of our services or this website shall be subject to the exclusive jurisdiction of the competent courts of New Delhi, India.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>6. Updates to Terms</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                We reserve the right to revise or update these terms at any time without prior notice. By continuing to use the site after changes are made, you agree to follow and be bound by the revised terms and conditions. If you have any inquiries regarding these terms, please contact us at <strong>info@unitradin.com</strong>.
              </p>
            </section>
          </Fade>
          
        </div>
      </div>
    </div>
  );
}
