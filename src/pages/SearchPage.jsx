// src/pages/SearchPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FiltersBar from "../components/FiltersBar";
import StartupCard from "../components/StartupCard";
import InvestorCard from "../components/InvestorCard";
import StartupDetailPage from "./StartupDetailPage";
import ConnectionModal from "../components/ConnectionModal";
import { getStartups } from "../api/startups";
import { getAllInvestors } from "../api/investors";

export default function SearchPage() {
  const { role } = useAuth();
  const isInvestor = role === "investor";

  const [results,    setResults]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState(null);
  const [chatTarget, setChatTarget] = useState(null);
  const [filters,    setFilters]    = useState({});

  useEffect(() => { doSearch({}); }, [role]);

  async function doSearch(f) {
    setLoading(true);
    setFilters(f);
    if (isInvestor) {
      const res = await getStartups(f);
      setResults(res);
    } else {
      const res = await getAllInvestors();
      setResults(res);
    }
    setLoading(false);
  }

  const heading = isInvestor ? "Discover Startups" : "Browse Investors";

  return (
    <div className="page-container">
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <h1 className="page-heading">{heading}</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          {isInvestor
            ? "Filter and explore startups. Click any card to view full details."
            : "Find investors that match your startup profile and connect directly."}
        </p>
      </div>

      {isInvestor && (
        <div className="fade-up d1">
          <FiltersBar onApply={doSearch} />
        </div>
      )}

      {/* Results Count */}
      <p style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 16 }}>
        {loading ? "Searching…" : `${results.length} ${isInvestor ? "startups" : "investors"} found`}
      </p>

      {/* Loading Skeleton */}
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <div className="skeleton" style={{ width: 46, height: 46, borderRadius: 10 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: 14, width: "60%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 12, width: "85%" }} />
                </div>
              </div>
              <div className="skeleton" style={{ height: 12, width: "100%", marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 12, width: "80%", marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 32, width: "35%" }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>No results found</p>
          <p style={{ fontSize: 13 }}>No {isInvestor ? "startups" : "investors"} match your filters. Try adjusting them.</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        isInvestor ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {results.map((s, i) => (
              <div key={s.id} style={{ animation: `fadeUp 0.3s ${i * 0.04}s both ease` }}>
                <StartupCard startup={s} onOpen={setSelected} showMatchScore />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {results.map((inv, i) => (
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
