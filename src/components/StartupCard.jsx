// src/components/StartupCard.jsx
import { useState } from "react";
import { MapPin, Users, DollarSign, CalendarDays, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatCurrency, stageCssClass } from "../api/mockData";
import { getAiSummary } from "../api/startups";

export default function StartupCard({ startup, onOpen, showMatchScore = false }) {
  const { role } = useAuth();
  const [summary, setSummary]       = useState(startup.aiSummary || null);
  const [loadingSummary, setLoading] = useState(false);

  async function handleSummary(e) {
    e.stopPropagation();
    if (summary) return;
    setLoading(true);
    const s = await getAiSummary(startup.id);
    setSummary(s);
    setLoading(false);
  }

  return (
    <div
      className="card"
      onClick={() => onOpen(startup)}
      style={{
        padding: "20px", cursor: "pointer", position: "relative",
        transition: "box-shadow 0.18s ease, transform 0.18s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.boxShadow = `0 8px 28px var(--card-shadow)`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 2px 8px var(--card-shadow)`; }}
    >
      {/* Match Score Badge — investor view only */}
      {role === "investor" && showMatchScore && (
        <div style={{
          position: "absolute", top: 16, right: 16,
          width: 52, height: 52, borderRadius: "50%",
          background: "var(--accent-coral)", color: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, lineHeight: 1,
        }}>
          <span>{startup.matchScore ?? "--"}</span>
          <span style={{ fontSize: 8, fontWeight: 600, opacity: 0.85 }}>MATCH</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12, paddingRight: role === "investor" && showMatchScore ? 64 : 0 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 10, background: startup.logoColor + "20",
          border: `1.5px solid ${startup.logoColor}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: startup.logoColor, flexShrink: 0,
        }}>{startup.logoInitials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 2 }}>{startup.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", fontStyle: "italic", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {startup.tagline}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        <span className={`tag ${stageCssClass(startup.stage)}`}>{startup.stage}</span>
        <span className="tag tag-teal">{startup.industry}</span>
        <span className="tag tag-blush">
          <MapPin size={10} style={{ marginRight: 3 }} />{startup.location}
        </span>
      </div>

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--text-secondary)", marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Users size={12} />{startup.teamSize} people
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <DollarSign size={12} />Ask: <strong style={{ color: "var(--accent-coral)" }}>{formatCurrency(startup.currentAsk)}</strong>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CalendarDays size={12} />Est. {startup.dateFounded}
        </span>
      </div>

      {/* AI Summary */}
      {summary ? (
        <div style={{
          background: "rgba(0,109,119,0.06)", border: "1px solid rgba(0,109,119,0.15)",
          borderRadius: 8, padding: "10px 12px", marginBottom: 12,
          fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.65,
          fontStyle: "italic",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--accent-teal)", fontWeight: 700, fontStyle: "normal", marginBottom: 4, fontSize: 11 }}>
            <Sparkles size={12} /> AI Summary
          </span>
          {summary}
        </div>
      ) : (
        <button
          onClick={handleSummary}
          disabled={loadingSummary}
          className="btn btn-teal-outline"
          style={{ fontSize: 11.5, padding: "5px 12px", marginBottom: 12 }}
        >
          {loadingSummary
            ? <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid var(--accent-teal)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            : <Sparkles size={12} />}
          {loadingSummary ? "Generating…" : "AI Summary"}
        </button>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a
          href={startup.calendlyUrl}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--accent-teal)", fontWeight: 600, textDecoration: "underline" }}
        >
          <CalendarDays size={13} /> Schedule Meeting
        </a>
        <span style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>Raised {formatCurrency(startup.totalRaised)}</span>
      </div>
    </div>
  );
}
