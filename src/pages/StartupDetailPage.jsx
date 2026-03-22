// src/pages/StartupDetailPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, MapPin, Users, DollarSign, CalendarDays, TrendingUp, ExternalLink } from "lucide-react";
import { formatCurrency, stageCssClass } from "../api/mockData";
import ConnectionModal from "../components/ConnectionModal";

export default function StartupDetailPage({ startup, onClose }) {
  const navigate = useNavigate();
  const [showConnect, setShowConnect] = useState(false);
  if (!startup) return null;

  const fundingPercent = Math.min(100, Math.round((startup.totalRaised / startup.fundingGoal) * 100));

  return (
    <>
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div style={{
          background: "var(--bg-secondary)",
          width: "min(640px, calc(100vw - 24px))",
          maxHeight: "92vh",
          borderRadius: 16,
          border: "1px solid var(--border-color)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "slideInRight 0.28s ease",
        }}>
          {/* Header */}
          <div style={{
            padding: "22px 24px",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            background: "linear-gradient(135deg, rgba(0,109,119,0.06), transparent)",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12,
              background: startup.logoColor + "20", border: `2px solid ${startup.logoColor}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: startup.logoColor, flexShrink: 0,
            }}>{startup.logoInitials}</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--accent-teal)", letterSpacing: "-0.02em", marginBottom: 4 }}>
                {startup.name}
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", fontStyle: "italic" }}>{startup.tagline}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
                <span className="tag tag-blush">{startup.industry}</span>
                <span className="tag tag-blush"><MapPin size={10} style={{ marginRight: 2 }} />{startup.location}</span>
              </div>
            </div>
            <button onClick={onClose} style={{ padding: 6, borderRadius: 6, color: "var(--text-secondary)" }}>
              <X size={20} />
            </button>
          </div>

          {/* Scrollable body */}
          <div style={{ overflowY: "auto", flex: 1, padding: "24px" }}>
            {/* Description */}
            <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 24 }}>
              {startup.description}
            </p>

            {/* Metadata Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 24, border: "1px solid var(--border-color)", borderRadius: 10, overflow: "hidden" }}>
              {[
                { label: "Team Size",     value: `${startup.teamSize} people`,          icon: <Users size={14} /> },
                { label: "Founded",       value: startup.dateFounded,                   icon: <CalendarDays size={14} /> },
                { label: "Total Raised",  value: formatCurrency(startup.totalRaised),   icon: <TrendingUp size={14} /> },
                { label: "Current Ask",   value: formatCurrency(startup.currentAsk),    icon: <DollarSign size={14} />, highlight: true },
                { label: "Location",      value: startup.location,                       icon: <MapPin size={14} /> },
                { label: "Monthly Burn",  value: formatCurrency(startup.expenses) + "/mo", icon: <DollarSign size={14} /> },
              ].map((item, i) => (
                <div key={item.label} style={{
                  padding: "14px 16px",
                  borderBottom: i < 4 ? "1px solid var(--border-color)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid var(--border-color)" : "none",
                  background: "var(--bg-secondary)",
                }}>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                    {item.icon} {item.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: item.highlight ? "var(--accent-coral)" : "var(--text-primary)" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Team Members */}
            {startup.members?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Team</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {startup.members.map((m) => (
                    <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: "var(--color-blush)", color: "var(--color-teal-dark)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700,
                      }}>{m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{m.name}</span>
                        <span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 8 }}>{m.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Funding Progress */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Funding Goal</h4>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-coral)" }}>{fundingPercent}%</span>
              </div>
              <div style={{ height: 8, background: "var(--border-color)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${fundingPercent}%`,
                  background: "var(--accent-coral)", borderRadius: 99,
                  transition: "width 1s ease",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--text-secondary)", marginTop: 6 }}>
                <span>Raised {formatCurrency(startup.totalRaised)}</span>
                <span>Goal {formatCurrency(startup.fundingGoal)}</span>
              </div>
            </div>

            {/* Founder Link */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 16, marginBottom: 8 }}>
              <button
                onClick={() => { onClose(); navigate(`/founders/${startup.founderId}`); }}
                style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--accent-teal)", fontWeight: 600 }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: startup.logoColor + "22", border: `1.5px solid ${startup.logoColor}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: startup.logoColor,
                }}>{startup.logoInitials}</div>
                View Founder Profile
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-color)", display: "flex", gap: 10 }}>
            <a
              href={startup.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-coral"
              style={{ flex: 1, justifyContent: "center", textDecoration: "none", fontSize: 13.5 }}
            >
              <CalendarDays size={15} /> Schedule Meeting
            </a>
            <button
              className="btn btn-teal-outline"
              onClick={() => setShowConnect(true)}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Connect
            </button>
          </div>
        </div>
      </div>

      {showConnect && (
        <ConnectionModal target={startup} onClose={() => setShowConnect(false)} />
      )}
    </>
  );
}
