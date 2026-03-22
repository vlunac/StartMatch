// src/pages/FounderDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users, CalendarDays, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import InvestorCard from "../components/InvestorCard";
import ConnectionModal from "../components/ConnectionModal";
import { getAllInvestors } from "../api/investors";
import { mockMeetings } from "../api/mockData";

export default function FounderDashboard() {
  const { user }  = useAuth();
  const navigate   = useNavigate();
  const [investors, setInvestors] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [chatTarget, setChatTarget] = useState(null);

  useEffect(() => {
    getAllInvestors().then(r => { setInvestors(r); setLoading(false); });
  }, []);

  const metrics = [
    { label: "Investor Matches",  value: investors.length || "—", icon: <Users size={20} />,       color: "var(--accent-teal)" },
    { label: "Profile Views",     value: "142",                   icon: <Eye size={20} />,          color: "var(--accent-coral)" },
    { label: "Meetings Booked",   value: "4",                     icon: <CalendarDays size={20} />, color: "var(--color-teal-mid)" },
    { label: "Capital Target",    value: "$8M",                   icon: <TrendingUp size={20} />,   color: "var(--accent-coral)" },
  ];

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6 }}>
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          <strong style={{ color: "var(--accent-coral)" }}>{investors.length} investors</strong> match your startup profile.
        </p>
      </div>

      {/* Metrics */}
      <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {metrics.map(m => (
          <div key={m.label} className="card" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</span>
              <div style={{ color: m.color, opacity: 0.8 }}>{m.icon}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent-teal)", letterSpacing: "-0.03em" }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Investor Matches */}
        <div className="fade-up d2">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700 }}>Recommended Investors</h2>
            <button onClick={() => navigate("/search")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--accent-teal)", fontWeight: 600 }}>
              Browse All <ArrowRight size={14} />
            </button>
          </div>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[1,2,3,4].map(i => <div key={i} className="card skeleton" style={{ height: 180 }} />)}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {investors.slice(0, 4).map(inv => (
                <InvestorCard key={inv.id} investor={inv} onChat={setChatTarget} />
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card fade-up d3" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Upcoming Meetings</h3>
              <CalendarDays size={16} color="var(--accent-teal)" />
            </div>
            {mockMeetings.slice(0, 2).map(m => (
              <div key={m.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ background: "var(--accent-coral)", color: "#fff", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 700, lineHeight: 1.3, flexShrink: 0 }}>
                  {m.date.split(",")[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.counterpartName}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} /> {m.time}</div>
                </div>
                <button className="btn btn-teal-outline" style={{ fontSize: 11, padding: "4px 10px" }}>Join</button>
              </div>
            ))}
            <a
              href={import.meta.env.VITE_CALENDLY_URL || "https://calendly.com"}
              target="_blank" rel="noreferrer"
              className="btn btn-coral"
              style={{ width: "100%", justifyContent: "center", marginTop: 14, textDecoration: "none", fontSize: 13 }}
            >
              <CalendarDays size={14} /> Schedule a Meeting
            </a>
          </div>

          <div className="card fade-up d4" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn btn-teal-outline" onClick={() => navigate("/profile")} style={{ justifyContent: "center", fontSize: 12.5 }}>
                Edit Profile
              </button>
              <button className="btn btn-teal-outline" onClick={() => navigate("/search")} style={{ justifyContent: "center", fontSize: 12.5 }}>
                Browse Investors
              </button>
            </div>
          </div>
        </div>
      </div>

      {chatTarget && <ConnectionModal target={chatTarget} onClose={() => setChatTarget(null)} />}
    </div>
  );
}
