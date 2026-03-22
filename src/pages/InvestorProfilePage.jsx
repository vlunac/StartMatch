// src/pages/InvestorProfilePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Linkedin, Instagram, Facebook, DollarSign, Edit } from "lucide-react";
import { getInvestorById, getInvestorPortfolio } from "../api/investors";
import { formatCurrency, stageCssClass } from "../api/mockData";
import { useAuth } from "../context/AuthContext";

export default function InvestorProfilePage() {
  const { id }         = useParams();
  const { user, role } = useAuth();
  const navigate        = useNavigate();
  const effectiveId     = id || user.id;
  const isOwn           = role === "investor" && Number(effectiveId) === user.id;

  const [investor,  setInvestor]  = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([getInvestorById(effectiveId), getInvestorPortfolio(effectiveId)]).then(
      ([inv, port]) => { setInvestor(inv); setPortfolio(port); setLoading(false); }
    );
  }, [effectiveId]);

  if (loading) return (
    <div className="page-container">
      {[200, 120, 200].map((h, i) => <div key={i} className="skeleton" style={{ height: h, borderRadius: 12, marginBottom: 16 }} />)}
    </div>
  );
  if (!investor) return <div className="page-container" style={{ color: "var(--text-secondary)", textAlign: "center", padding: "80px 0" }}>Investor not found.</div>;

  return (
    <div className="page-container" style={{ maxWidth: 860 }}>
      {/* Hero */}
      <div className="card fade-up" style={{ overflow: "hidden", marginBottom: 20 }}>
        <div style={{ height: 110, background: "linear-gradient(135deg, var(--color-teal-dark), var(--color-teal-mid))", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        </div>
        <div style={{ padding: "0 32px 28px", marginTop: -40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: investor.avatarColor + "22", border: "3px solid var(--bg-secondary)", outline: `3px solid ${investor.avatarColor}55`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: investor.avatarColor,
            }}>{investor.avatarInitials}</div>
            {isOwn && <button className="btn btn-coral" style={{ fontSize: 13 }}><Edit size={14} /> Edit Profile</button>}
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>{investor.name}</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 6 }}>{investor.headline}</p>
          <p style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}><MapPin size={13} />{investor.location}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {investor.socialLinks?.linkedin  && <a href={investor.socialLinks.linkedin}  target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12.5, padding: "6px 14px" }}><Linkedin  size={14} color="var(--accent-teal)" /> LinkedIn</a>}
            {investor.socialLinks?.instagram && <a href={investor.socialLinks.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12.5, padding: "6px 14px" }}><Instagram size={14} color="var(--accent-coral)" /> Instagram</a>}
            {investor.socialLinks?.facebook  && <a href={investor.socialLinks.facebook}  target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: 12.5, padding: "6px 14px" }}><Facebook  size={14} color="var(--accent-teal)" /> Facebook</a>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Portfolio Companies", value: portfolio.length, color: "var(--accent-teal)" },
          { label: "Check Size", value: `${formatCurrency(investor.checkSizeMin)}–${formatCurrency(investor.checkSizeMax)}`, color: "var(--accent-coral)" },
          { label: "Preferred Stages", value: investor.preferredStages?.length || 0, color: "var(--color-teal-mid)" },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: "18px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="card fade-up d2" style={{ padding: "24px 28px", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>About</h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75 }}>{investor.bio}</p>
      </div>

      {/* Focus & Stages */}
      <div className="fade-up d3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: "20px 22px" }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 12 }}>Investment Focus</h4>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{investor.focusAreas?.map(f => <span key={f} className="tag tag-teal">{f}</span>)}</div>
        </div>
        <div className="card" style={{ padding: "20px 22px" }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 12 }}>Preferred Stages</h4>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{investor.preferredStages?.map(s => <span key={s} className={`tag ${stageCssClass(s)}`}>{s}</span>)}</div>
        </div>
      </div>

      {/* Recent Investments */}
      <div className="card fade-up d4" style={{ overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Recent Investment Activity</h3>
          <span className="tag tag-coral">{investor.recentInvestments?.length} deals</span>
        </div>
        {investor.recentInvestments?.map((inv, i) => (
          <div key={i} style={{ padding: "14px 24px", borderBottom: i < investor.recentInvestments.length - 1 ? "1px solid var(--border-color)" : "none", display: "flex", alignItems: "center", gap: 16, transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-primary)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,109,119,0.1)", border: "1px solid rgba(0,109,119,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "var(--accent-teal)", flexShrink: 0 }}>
              {inv.startupName.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 2 }}>{inv.startupName}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{inv.date}</div>
            </div>
            <span className={`tag ${stageCssClass(inv.stage)}`}>{inv.stage}</span>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--accent-coral)", flexShrink: 0 }}>{formatCurrency(inv.amount)}</div>
          </div>
        ))}
      </div>

      {/* Portfolio Grid */}
      {portfolio.length > 0 && (
        <div className="fade-up d5">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Portfolio Companies</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {portfolio.map(s => (
              <div key={s.id} className="card" style={{ padding: "16px 18px", cursor: "pointer", transition: "transform 0.18s" }}
                onClick={() => navigate(`/founders/${s.founderId}`)}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: s.logoColor + "20", border: `1.5px solid ${s.logoColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: s.logoColor }}>{s.logoInitials}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span className="tag tag-teal" style={{ fontSize: 10 }}>{s.industry}</span>
                  <span className={`tag ${stageCssClass(s.stage)}`} style={{ fontSize: 10 }}>{s.stage}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8 }}>Est. {s.dateFounded}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
