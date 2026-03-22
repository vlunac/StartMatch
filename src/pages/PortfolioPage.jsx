// src/pages/PortfolioPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInvestorPortfolio, getInvestorById } from "../api/investors";
import { formatCurrency, stageCssClass } from "../api/mockData";
import StartupDetailPage from "./StartupDetailPage";
import { Briefcase, TrendingUp, DollarSign } from "lucide-react";

export default function PortfolioPage() {
  const { user }   = useAuth();
  const navigate    = useNavigate();
  const [investor,  setInvestor]  = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);

  useEffect(() => {
    Promise.all([getInvestorById(user.id), getInvestorPortfolio(user.id)]).then(
      ([inv, port]) => { setInvestor(inv); setPortfolio(port); setLoading(false); }
    );
  }, [user.id]);

  if (loading) return (
    <div className="page-container">
      <div className="card skeleton" style={{ height: 200, marginBottom: 20 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[1,2,3].map(i => <div key={i} className="card skeleton" style={{ height: 160 }} />)}
      </div>
    </div>
  );

  const totalDeployed = investor?.recentInvestments?.reduce((sum, i) => sum + i.amount, 0) || 0;

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <h1 className="page-heading">My Portfolio</h1>
        <p style={{ color: "var(--text-secondary)" }}>Your investment activity and portfolio companies.</p>
      </div>

      {/* Stats Row */}
      <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Portfolio Companies", value: portfolio.length, icon: <Briefcase size={20} />, color: "var(--accent-teal)" },
          { label: "Total Deployed",      value: formatCurrency(totalDeployed), icon: <DollarSign size={20} />, color: "var(--accent-coral)" },
          { label: "Recent Deals",        value: investor?.recentInvestments?.length ?? 0, icon: <TrendingUp size={20} />, color: "var(--color-teal-mid)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
              <div style={{ color: s.color }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent-teal)", letterSpacing: "-0.03em" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Investment Activity */}
      <div className="card fade-up d2" style={{ overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Investment Activity</h2>
        </div>
        {investor?.recentInvestments?.map((inv, i) => (
          <div key={i} style={{
            padding: "15px 24px",
            borderBottom: i < investor.recentInvestments.length - 1 ? "1px solid var(--border-color)" : "none",
            display: "flex", alignItems: "center", gap: 16,
            transition: "background 0.15s", cursor: "default",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-primary)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "rgba(0,109,119,0.1)", border: "1px solid rgba(0,109,119,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 800, color: "var(--accent-teal)",
            }}>{inv.startupName.slice(0, 2).toUpperCase()}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 2 }}>{inv.startupName}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{inv.date}</div>
            </div>
            <span className={`tag ${stageCssClass(inv.stage)}`}>{inv.stage}</span>
            <div style={{ fontWeight: 800, fontSize: 15, color: "var(--accent-coral)" }}>
              {formatCurrency(inv.amount)}
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="fade-up d3">
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Portfolio Companies</h2>
        {portfolio.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--text-secondary)" }}>
            <Briefcase size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p>No portfolio companies yet. Start investing!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {portfolio.map(startup => (
              <div
                key={startup.id}
                className="card"
                onClick={() => setSelected(startup)}
                style={{ padding: "20px", cursor: "pointer", transition: "all 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 28px var(--card-shadow)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px var(--card-shadow)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: startup.logoColor + "20", border: `1.5px solid ${startup.logoColor}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, color: startup.logoColor,
                  }}>{startup.logoInitials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{startup.name}</div>
                    <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 10, lineHeight: 1.5 }}>{startup.tagline}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)" }}>
                  <span className="tag tag-teal">{startup.industry}</span>
                  <span>Est. {startup.dateFounded}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View full profile link */}
      <div style={{ marginTop: 24 }}>
        <button className="btn btn-teal-outline" onClick={() => navigate(`/investors/${user.id}`)}>
          View My Full Investor Profile
        </button>
      </div>

      {selected && <StartupDetailPage startup={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
