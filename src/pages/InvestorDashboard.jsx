// src/pages/InvestorDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText, CalendarCheck, CalendarDays, ArrowRight, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import StartupCard from "../components/StartupCard";
import StartupDetailPage from "./StartupDetailPage";
import { getRecommended } from "../api/matches";
import { mockMeetings } from "../api/mockData";

export default function InvestorDashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [matches,  setMatches]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getRecommended("investor", user.id).then(r => { setMatches(r); setLoading(false); });
  }, [user.id]);

  const metrics = [
    { label: "Meetings This Week", value: "3",  icon: <CalendarDays size={20} />,   color: "var(--accent-teal)" },
    { label: "Deals Reviewed",     value: "28", icon: <FileText size={20} />,        color: "var(--accent-coral)" },
    { label: "Meetings Booked",    value: "9",  icon: <CalendarCheck size={20} />,   color: "var(--color-teal-mid)" },
    { label: "Portfolio Companies",value: "24", icon: <Briefcase size={20} />,       color: "var(--accent-coral)" },
  ];

  return (
    <div className="page-container">
      {/* Greeting */}
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 6 }}>
          Good morning, {user.name.split(" ")[0]}!
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          You have <strong style={{ color: "var(--accent-coral)" }}>{matches.length} startup matches</strong> waiting for your review.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="fade-up d1" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {metrics.map((m) => (
          <div key={m.label} className="card" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</span>
              <div style={{ color: m.color, opacity: 0.8 }}>{m.icon}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent-teal)", letterSpacing: "-0.03em" }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Recommended Startups */}
        <div className="fade-up d2">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>Recommended for You</h2>
            <button onClick={() => navigate("/search")} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--accent-teal)", fontWeight: 600 }}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="card" style={{ padding: 20, height: 160 }}>
                  <div className="skeleton" style={{ height: 16, width: "60%", marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 12, width: "90%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 12, width: "75%", marginBottom: 16 }} />
                  <div className="skeleton" style={{ height: 32, width: "30%" }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {matches.slice(0, 4).map(s => (
                <StartupCard key={s.id} startup={s} onOpen={setSelected} showMatchScore />
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Meetings */}
          <div className="card fade-up d3" style={{ padding: "20px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Upcoming Meetings</h3>
              <CalendarDays size={16} color="var(--accent-teal)" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mockMeetings.map(m => (
                <div key={m.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border-color)" }}>
                  <div style={{
                    background: "var(--accent-coral)", color: "#fff",
                    borderRadius: 8, padding: "6px 10px", textAlign: "center",
                    fontSize: 11, fontWeight: 700, lineHeight: 1.3, flexShrink: 0,
                  }}>
                    {m.date.split(",")[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.counterpartName}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={10} /> {m.time} · {m.type}
                    </div>
                  </div>
                  <button className="btn btn-teal-outline" style={{ fontSize: 11, padding: "4px 10px" }}>Join</button>
                </div>
              ))}
            </div>
            <a
              href={import.meta.env.VITE_CALENDLY_URL || "https://calendly.com"}
              target="_blank"
              rel="noreferrer"
              className="btn btn-coral"
              style={{ width: "100%", justifyContent: "center", marginTop: 14, textDecoration: "none", fontSize: 13 }}
            >
              <CalendarDays size={14} /> Schedule a Meeting
            </a>
          </div>

          {/* Quick Actions */}
          <div className="card fade-up d4" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn btn-teal-outline" onClick={() => navigate("/search")} style={{ justifyContent: "center", fontSize: 12.5 }}>
                Browse Startups
              </button>
              <button className="btn btn-teal-outline" onClick={() => navigate("/portfolio")} style={{ justifyContent: "center", fontSize: 12.5 }}>
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {selected && <StartupDetailPage startup={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
