// src/components/InvestorCard.jsx
import { MapPin, DollarSign, MessageCircle } from "lucide-react";
import { stageCssClass } from "../api/mockData";

export default function InvestorCard({ investor, onChat }) {
  return (
    <div className="card" style={{ padding: "20px", position: "relative" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: investor.avatarColor + "22",
          border: `2px solid ${investor.avatarColor}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 800, color: investor.avatarColor, flexShrink: 0,
        }}>{investor.avatarInitials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 2 }}>{investor.name}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{investor.headline}</div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-secondary)", marginBottom: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} />{investor.location}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <DollarSign size={12} />${(investor.checkSizeMin / 1000).toFixed(0)}K–${(investor.checkSizeMax / 1000000).toFixed(1)}M
        </span>
      </div>

      {/* Focus Tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {investor.focusAreas.slice(0, 3).map((f) => (
          <span key={f} className="tag tag-teal">{f}</span>
        ))}
      </div>

      {/* Stages */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
        {investor.preferredStages.map((s) => (
          <span key={s} className={`tag ${stageCssClass(s)}`}>{s}</span>
        ))}
      </div>

      {/* Chat Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="btn btn-coral-outline"
          onClick={() => onChat(investor)}
          style={{ fontSize: 12, padding: "7px 14px" }}
        >
          <MessageCircle size={14} /> Chat
        </button>
      </div>
    </div>
  );
}
