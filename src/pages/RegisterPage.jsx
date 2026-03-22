// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login, setRole } = useAuth();
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [pass,  setPass]    = useState("");
  const [role,  setRoleVal] = useState("founder");
  const [err,   setErr]     = useState("");

  function handleSubmit() {
    if (!name||!email||!pass) { setErr("Please fill in all fields."); return; }
    setRole(role);
    login({ id:99, name, role, avatarInitials:name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase(), avatarColor:"#006D77" });
    navigate("/dashboard");
  }

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg-primary)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div className="card" style={{ width:"100%", maxWidth:400, padding:"36px 32px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28, justifyContent:"center" }}>
          <div style={{ width:32,height:32,borderRadius:8,background:"var(--color-teal-dark)",display:"flex",alignItems:"center",justifyContent:"center" }}><Star size={16} color="#fff" fill="#fff"/></div>
          <span style={{ fontSize:18,fontWeight:800,color:"var(--text-primary)" }}>Start<span style={{color:"var(--accent-coral)"}}>Match</span></span>
        </div>
        <h2 style={{ fontSize:20,fontWeight:800,marginBottom:6,textAlign:"center" }}>Create your account</h2>
        <p style={{ fontSize:13,color:"var(--text-secondary)",textAlign:"center",marginBottom:24 }}>Join StartMatch and start connecting</p>
        {err && <div style={{ background:"rgba(229,62,62,0.1)",border:"1px solid rgba(229,62,62,0.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#E53E3E",marginBottom:16 }}>{err}</div>}
        <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Smith"/></div>
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
        <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Create a password"/></div>
        <div className="form-group">
          <label className="form-label">I am a</label>
          <div style={{ display:"flex", background:"var(--bg-primary)", borderRadius:8, padding:3, gap:2 }}>
            {["founder","investor"].map(r=>(
              <button key={r} onClick={()=>setRoleVal(r)} style={{ flex:1, padding:"7px 0", fontSize:13, fontWeight:700, borderRadius:6, transition:"all 0.15s", background: role===r?(r==="investor"?"var(--accent-teal)":"var(--accent-coral)"):"transparent", color: role===r?"#fff":"var(--text-secondary)", textTransform:"capitalize" }}>{r}</button>
            ))}
          </div>
        </div>
        <button className="btn btn-coral btn-full" style={{marginTop:8}} onClick={handleSubmit}>Create Account</button>
        <p style={{ textAlign:"center",fontSize:13,color:"var(--text-secondary)",marginTop:20 }}>
          Already have an account? <Link to="/login" style={{color:"var(--accent-teal)",fontWeight:700}}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
