// src/components/FiltersBar.jsx
import { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const INDUSTRIES = ["FinTech", "HealthTech", "EdTech", "SaaS", "Marketplace", "Other"];
const STAGES     = ["Pre-Seed", "Seed", "Series A", "Series B+"];
const TEAM_SIZES = [
  { label: "1–5",  value: [1, 5] },
  { label: "6–10", value: [6, 10] },
  { label: "11–20",value: [11, 20] },
  { label: "20+",  value: [20, 9999] },
];
const YEARS = Array.from({ length: 11 }, (_, i) => 2015 + i);

export default function FiltersBar({ onApply }) {
  const [location,    setLocation]    = useState("");
  const [industry,    setIndustry]    = useState("");
  const [stage,       setStage]       = useState("");
  const [teamSize,    setTeamSize]    = useState("");
  const [totalRaised, setTotalRaised] = useState(10);
  const [currentAsk,  setCurrentAsk]  = useState(5);
  const [dateFounded, setDateFounded] = useState("");

  function handleApply() {
    onApply({
      location,
      industry: industry || null,
      stage:    stage || null,
      teamSize: teamSize ? TEAM_SIZES.find((t) => t.label === teamSize)?.value : null,
      totalRaised: totalRaised * 1_000_000,
      currentAsk:  currentAsk  * 1_000_000,
      dateFounded: dateFounded ? Number(dateFounded) : null,
    });
  }

  function handleReset() {
    setLocation(""); setIndustry(""); setStage(""); setTeamSize("");
    setTotalRaised(10); setCurrentAsk(5); setDateFounded("");
    onApply({});
  }

  return (
    <div style={{
      background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
      borderRadius: 12, padding: "20px", marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <SlidersHorizontal size={16} color="var(--accent-teal)" />
        <span style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text-primary)" }}>Filters</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 16 }}>
        {/* Location */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Location</label>
          <input className="form-input" placeholder="City, State…" value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        {/* Industry */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Industry</label>
          <select className="form-input" value={industry} onChange={e => setIndustry(e.target.value)}>
            <option value="">All Industries</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        {/* Stage */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Stage</label>
          <select className="form-input" value={stage} onChange={e => setStage(e.target.value)}>
            <option value="">All Stages</option>
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Team Size */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Team Size</label>
          <select className="form-input" value={teamSize} onChange={e => setTeamSize(e.target.value)}>
            <option value="">Any Size</option>
            {TEAM_SIZES.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
          </select>
        </div>

        {/* Date Founded */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Date Founded</label>
          <select className="form-input" value={dateFounded} onChange={e => setDateFounded(e.target.value)}>
            <option value="">Any Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Range Sliders */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <label className="form-label" style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
            Total Raised — up to ${totalRaised}M
          </label>
          <input type="range" min={0} max={10} step={0.5} value={totalRaised}
            onChange={e => setTotalRaised(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-teal)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-secondary)", marginTop: 4 }}>
            <span>$0</span><span>$10M</span>
          </div>
        </div>
        <div>
          <label className="form-label" style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
            Current Ask — up to ${currentAsk}M
          </label>
          <input type="range" min={0} max={5} step={0.5} value={currentAsk}
            onChange={e => setCurrentAsk(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-coral)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-secondary)", marginTop: 4 }}>
            <span>$0</span><span>$5M</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-coral" onClick={handleApply}>
          <SlidersHorizontal size={14} /> Apply Filters
        </button>
        <button className="btn btn-teal-outline" onClick={handleReset}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}
