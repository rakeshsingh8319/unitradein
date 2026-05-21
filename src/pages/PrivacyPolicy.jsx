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

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: C.light, color: C.text, padding: "120px 5% 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        {/* HEADER */}
        <Fade style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Legals & Trust</div>
          <h1 className="serif" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: C.text, marginBottom: 16 }}>Privacy Policy</h1>
          <p style={{ fontSize: 15, color: C.muted }}>Last Updated: May 21, 2026</p>
        </Fade>

        {/* INTRODUCTION CARD */}
        <Fade>
          <div style={{ background: "#fff", padding: 32, borderRadius: 20, border: "1px solid #F0E4D4", boxShadow: "0 8px 32px rgba(46,31,15,0.02)", marginBottom: 32 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: C.text, margin: 0 }}>
              At <strong>Universal Trading (India) Company (UniTradeIn)</strong>, accessible from <strong>unitradin.com</strong>, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document contains types of information that is collected and recorded by UniTradeIn and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>info@unitradin.com</strong>.
            </p>
          </div>
        </Fade>

        {/* CONTENT SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          
          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>1. Consent</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you submit messages, query forms, or request custom audits on our platform, you acknowledge the collection of data outlined herein.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>2. Information We Collect</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, marginBottom: 16 }}>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 15, lineHeight: 1.8, color: C.muted }}>
                <li><strong>Direct Inquiry Data:</strong> When you submit a contact or consultation form, we may collect your name, business email, telephone number, and message contents.</li>
                <li><strong>Newsletter Signups:</strong> If you subscribe to our professional marketing articles newsletter, we collect and store your email address.</li>
                <li><strong>Technical Tracking Logs:</strong> Standard log files are kept. These logs include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and click counts to analyze trends and optimize performance.</li>
              </ul>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>3. How We Use Your Information</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, marginBottom: 16 }}>
                We use the information we collect in various ways, including to:
              </p>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 15, lineHeight: 1.8, color: C.muted }}>
                <li>Provide, operate, and maintain our web platforms.</li>
                <li>Improve, personalize, and expand our digital marketing services.</li>
                <li>Understand and analyze how visitors interact with our portfolio and blog modules.</li>
                <li>Develop new marketing strategies, services, features, and web capabilities.</li>
                <li>Communicate with you directly, including for customer support, consultation, or campaign updates.</li>
                <li>Send you marketing emails or newsletter digests (from which you can unsubscribe at any time).</li>
              </ul>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>4. Cookies and Web Beacons</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                Like any other website, UniTradeIn uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>5. Third Party Privacy Policies</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, margin: 0 }}>
                UniTradeIn's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers or analytics partners for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
            </section>
          </Fade>

          <Fade>
            <section style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid #F0E4D4" }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>6. GDPR and CCPA Data Protection Rights</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, marginBottom: 16 }}>
                We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 15, lineHeight: 1.8, color: C.muted }}>
                <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
                <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
              </ul>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.muted, marginTop: 16 }}>
                If you would like to exercise any of these rights, please contact our data team at <strong>info@unitradin.com</strong>.
              </p>
            </section>
          </Fade>
          
        </div>
      </div>
    </div>
  );
}
