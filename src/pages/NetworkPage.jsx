// src/pages/NetworkPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import InvestorCard from "../components/InvestorCard";
import StartupCard from "../components/StartupCard";
import StartupDetailPage from "./StartupDetailPage";
import ConnectionModal from "../components/ConnectionModal";
import { getAllInvestors } from "../api/investors";
import { getStartups } from "../api/startups";
import { Search } from "lucide-react";

export default function NetworkPage() {
  const { role } = useAuth();
  const isInvestor = role === "investor";

  const [items,      setItems]      = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [query,      setQuery]      = useState("");
  const [selected,   setSelected]   = useState(null);
  const [chatTarget, setChatTarget] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fn = isInvestor ? getStartups : getAllInvestors;
    fn({}).then(r => { setItems(r); setFiltered(r); setLoading(false); });
  }, [role]);

  function handleSearch(q) {
    setQuery(q);
    if (!q.trim()) { setFiltered(items); return; }
    const lq = q.toLowerCase();
    setFiltered(items.filter(item =>
      item.name.toLowerCase().includes(lq) ||
      (item.industry || "").toLowerCase().includes(lq) ||
      (item.stage || "").toLowerCase().includes(lq) ||
      (item.focusAreas || []).some(f => f.toLowerCase().includes(lq))
    ));
  }

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <h1 className="page-heading">My Network</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          {isInvestor
            ? "Startups in your watch list and network."
            : "Investors who have shown interest in your profile."}
        </p>
      </div>

      {/* Search bar */}
      <div className="fade-up d1" style={{ position: "relative", marginBottom: 24, maxWidth: 400 }}>
        <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
        <input
          className="form-input"
          placeholder="Search by name, industry, stage…"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          style={{ paddingLeft: 36 }}
        />
      </div>

      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="card skeleton" style={{ height: 200 }} />)}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌐</div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No connections yet</p>
          <p style={{ fontSize: 13, marginBottom: 20 }}>Start by browsing startups and connecting.</p>
          <a href="/search" className="btn btn-coral" style={{ textDecoration: "none" }}>Browse Now</a>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        isInvestor ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((s, i) => (
              <div key={s.id} style={{ animation: `fadeUp 0.3s ${i * 0.04}s both ease` }}>
                <StartupCard startup={s} onOpen={setSelected} showMatchScore />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((inv, i) => (
              <div key={inv.id} style={{ animation: `fadeUp 0.3s ${i * 0.04}s both ease` }}>
                <InvestorCard investor={inv} onChat={setChatTarget} />
              </div>
            ))}
          </div>
        )
      )}

      {selected   && <StartupDetailPage startup={selected} onClose={() => setSelected(null)} />}
      {chatTarget && <ConnectionModal target={chatTarget} onClose={() => setChatTarget(null)} />}
    </div>
  );
}
