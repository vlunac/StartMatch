// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, Sparkles } from "lucide-react";

function GoldfishHero() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "bubbleFloat 1.4s ease-in-out infinite", filter: "drop-shadow(0 8px 24px rgba(230,126,34,0.3))" }}>
      <ellipse cx="55" cy="70" rx="32" ry="24" fill="#E67E22"/>
      <polygon points="87,70 112,50 112,90" fill="#E67E22"/>
      <ellipse cx="55" cy="76" rx="22" ry="14" fill="#F39C12" opacity="0.55"/>
      <circle cx="34" cy="63" r="6" fill="white"/>
      <circle cx="32.5" cy="61" r="3" fill="#2A2A2A"/>
      <rect x="25" y="35" width="40" height="7" rx="3.5" fill="#8DB294"/>
      <rect x="33" y="20" width="24" height="20" rx="7" fill="#8DB294"/>
      <rect x="25" y="39" width="40" height="5" rx="2.5" fill="#4A5D5E"/>
      <rect x="75" y="76" width="24" height="18" rx="4" fill="#4A5D5E"/>
      <rect x="82" y="70" width="10" height="8" rx="3" fill="#4A5D5E"/>
      <line x1="75" y1="85" x2="99" y2="85" stroke="#8DB294" strokeWidth="3"/>
      <path d="M50 45 Q60 35 70 45" stroke="#F39C12" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="14" cy="50" r="4" fill="none" stroke="rgba(230,126,34,0.4)" strokeWidth="2"/>
      <circle cx="22" cy="35" r="2.5" fill="none" stroke="rgba(141,178,148,0.5)" strokeWidth="1.5"/>
      <circle cx="10" cy="25" r="5" fill="none" stroke="rgba(74,93,94,0.3)" strokeWidth="2"/>
    </svg>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <header style={{ padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)", borderBottom: "2px solid var(--color-sage)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 32, animation: "bubbleFloat 1.2s ease-in-out infinite" }}>🐟</div>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "var(--color-moss-dark)" }}>StartMatch</div>
            <div style={{ fontSize: 10, fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--color-goldfish)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Goldfish Edition</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-moss-outline" onClick={() => navigate("/login")}>Sign In</button>
          <button className="btn btn-goldfish" onClick={() => navigate("/register")}>Create Account</button>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
        <GoldfishHero />
        <div style={{ marginTop: 32, marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 999, background: "rgba(230,126,34,0.1)", border: "1.5px solid rgba(230,126,34,0.3)", fontSize: 12.5, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-goldfish)" }}>
          <Sparkles size={13} strokeWidth={2.5} /> Connecting Founders & Investors with AI
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 52, fontWeight: 700, color: "var(--color-moss-dark)", maxWidth: 680, lineHeight: 1.15, marginBottom: 24, marginTop: 16 }}>
          Find your perfect<br /><span style={{ color: "var(--color-goldfish)" }}>funding match.</span> 🐟
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 500, lineHeight: 1.75, marginBottom: 40 }}>
          StartMatch connects startup founders with the right investors using AI-powered matching, smart filters, and built-in scheduling.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-goldfish" onClick={() => navigate("/register")} style={{ fontSize: 15, padding: "13px 30px" }}>
            Get Started Free
          </button>
          <button className="btn btn-moss-outline" onClick={() => navigate("/login")} style={{ fontSize: 15, padding: "13px 30px" }}>
            Sign In
          </button>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 14, marginTop: 56, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: <TrendingUp size={15} strokeWidth={2.5}/>, label: "AI Match Scoring" },
            { icon: <Users size={15} strokeWidth={2.5}/>, label: "Founder & Investor Profiles" },
            { icon: <Sparkles size={15} strokeWidth={2.5}/>, label: "Gemini AI Summaries" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "var(--bg-secondary)", border: "2px solid var(--color-sage)", borderRadius: 999, fontSize: 13, fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--color-moss-dark)", boxShadow: "var(--card-shadow)" }}>
              <span style={{ color: "var(--color-goldfish)" }}>{f.icon}</span> {f.label}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
