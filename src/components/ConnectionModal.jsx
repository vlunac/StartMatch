// src/components/ConnectionModal.jsx
import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

export default function ConnectionModal({ target, onClose }) {
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  function handleSend() {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setMessage(""); onClose(); }, 2000);
  }

  if (!target) return null;

  const name   = target.name;
  const initials = target.avatarInitials || target.logoInitials || name.slice(0, 2).toUpperCase();
  const color    = target.avatarColor || target.logoColor || "var(--accent-teal)";
  const subLabel = target.headline || target.tagline || target.industry || "";

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "var(--bg-secondary)", borderRadius: 16,
        width: "min(480px, calc(100vw - 32px))",
        border: "1px solid var(--border-color)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        animation: "fadeUp 0.25s ease",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: color + "22", border: `2px solid ${color}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 800, color, flexShrink: 0,
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subLabel}</div>
          </div>
          <button onClick={onClose} style={{ padding: 6, borderRadius: 6, color: "var(--text-secondary)", background: "transparent" }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <CheckCircle size={40} color="var(--accent-teal)" style={{ marginBottom: 12 }} />
              <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>Message Sent!</p>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>Your intro request has been delivered.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }}>
                Send a connection request to <strong style={{ color: "var(--text-primary)" }}>{name}</strong>. Keep it concise and personalized.
              </p>
              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder={`Hi ${name.split(" ")[0]}, I came across your profile on StartMatch and…`}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ resize: "vertical", minHeight: 100 }}
                />
              </div>
              <button
                className="btn btn-coral btn-full"
                onClick={handleSend}
                disabled={!message.trim()}
                style={{ marginTop: 8 }}
              >
                <Send size={15} /> Send Message
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
