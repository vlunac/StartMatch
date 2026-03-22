// src/components/Navbar.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Search, Network, Briefcase, User,
  CalendarDays, Sun, Moon, Star,
} from "lucide-react";

const NAV_TOP = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Search",    path: "/search",    icon: Search },
  { label: "Network",   path: "/network",   icon: Network },
];

export default function Navbar() {
  const { role, setRole, theme, toggleTheme, user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const isActive  = (path) => location.pathname === path;

  const bottomNav = role === "investor"
    ? [{ label: "Portfolio",       path: "/portfolio",  icon: Briefcase }]
    : [{ label: "Profile",         path: "/profile",    icon: User }];

  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: "var(--bg-sidebar)",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--accent-coral)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Star size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Start<span style={{ color: "var(--color-blush)" }}>Match</span>
          </span>
        </div>
      </div>

      {/* Role Toggle */}
      <div style={{ padding: "16px 16px 12px" }}>
        <div style={{ display: "flex", background: "rgba(0,0,0,0.2)", borderRadius: 99, padding: 3, gap: 2 }}>
          {["Investor", "Founder"].map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r.toLowerCase()); navigate("/dashboard"); }}
              style={{
                flex: 1, padding: "5px 0", fontSize: 11.5, fontWeight: 700,
                borderRadius: 99, transition: "all 0.18s",
                background: role === r.toLowerCase()
                  ? (r === "Investor" ? "var(--color-teal-mid)" : "var(--accent-coral)")
                  : "transparent",
                color: "#fff",
                opacity: role === r.toLowerCase() ? 1 : 0.6,
              }}
            >{r}</button>
          ))}
        </div>
      </div>

      {/* Nav Top */}
      <nav style={{ flex: 1, padding: "8px 10px", overflowY: "auto" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 10px 8px" }}>Main</p>
        {NAV_TOP.map((item) => (
          <NavItem key={item.path} item={item} active={isActive(item.path)} onClick={() => navigate(item.path)} />
        ))}

        <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 10px 8px" }}>
          {role === "investor" ? "My Work" : "My Profile"}
        </p>
        {bottomNav.map((item) => (
          <NavItem key={item.path} item={item} active={isActive(item.path)} onClick={() => navigate(item.path)} />
        ))}
        <NavItem
          item={{ label: "Meetings", path: "/meetings", icon: CalendarDays }}
          active={isActive("/meetings")}
          onClick={() => navigate("/meetings")}
        />
      </nav>

      {/* User + Theme Toggle */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: user.avatarColor, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>{user.avatarInitials}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, textTransform: "capitalize" }}>{role}</div>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "7px 10px", borderRadius: 7, color: "rgba(255,255,255,0.7)",
            fontSize: 12.5, fontWeight: 500, transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        padding: "9px 10px", borderRadius: 8, marginBottom: 2,
        color: active ? "var(--accent-coral)" : "rgba(255,255,255,0.7)",
        background: active ? "rgba(226,149,120,0.15)" : "transparent",
        borderLeft: active ? "4px solid var(--accent-coral)" : "4px solid transparent",
        fontSize: 13.5, fontWeight: active ? 700 : 500,
        transition: "all 0.15s", textAlign: "left",
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; } }}
    >
      <Icon size={18} />
      {item.label}
    </button>
  );
}
