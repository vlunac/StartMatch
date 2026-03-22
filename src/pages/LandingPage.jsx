// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight, Zap, Users, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg-primary)", display:"flex", flexDirection:"column" }}>
      <nav style={{ padding:"20px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--border-color)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:9, background:"var(--color-teal-dark)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Star size={17} color="#fff" fill="#fff"/>
          </div>
          <span style={{ fontSize:19, fontWeight:800, letterSpacing:"-0.02em", color:"var(--text-primary)" }}>Start<span style={{color:"var(--accent-coral)"}}>Match</span></span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn btn-teal-outline" onClick={()=>navigate("/login")} style={{fontSize:13.5}}>Sign In</button>
          <button className="btn btn-coral" onClick={()=>navigate("/register")} style={{fontSize:13.5}}>Create Account</button>
        </div>
      </nav>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 24px 60px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,109,119,0.1)", border:"1px solid rgba(0,109,119,0.2)", borderRadius:99, padding:"5px 14px", fontSize:12.5, fontWeight:700, color:"var(--accent-teal)", marginBottom:28 }}>
          <Zap size={13}/> VandyHacks 2025 · Startup Launchpad Track
        </div>
        <h1 style={{ fontSize:52, fontWeight:800, letterSpacing:"-0.04em", color:"var(--text-primary)", lineHeight:1.1, marginBottom:22, maxWidth:720 }}>
          Connect Founders<br/><span style={{color:"var(--color-teal-dark)"}}>with the right</span> <span style={{color:"var(--accent-coral)"}}>Investors</span>
        </h1>
        <p style={{ fontSize:17, color:"var(--text-secondary)", lineHeight:1.7, maxWidth:560, marginBottom:40 }}>
          StartMatch uses AI to intelligently match startup founders with investors based on industry, stage, and investment thesis. Schedule meetings, explore portfolios, and close deals — all in one place.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn btn-teal" onClick={()=>navigate("/dashboard")} style={{fontSize:15,padding:"13px 28px"}}>Get Started <ArrowRight size={16}/></button>
          <button className="btn btn-coral-outline" onClick={()=>navigate("/search")} style={{fontSize:15,padding:"13px 28px"}}>Browse Startups</button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, padding:"0 80px 80px", maxWidth:1100, margin:"0 auto", width:"100%" }}>
        {[
          { icon:<Zap size={22} color="var(--accent-coral)"/>, title:"AI-Powered Matching", desc:"Our algorithm matches investors to founders based on stage, industry, thesis, and traction signals." },
          { icon:<Users size={22} color="var(--color-teal-dark)"/>, title:"Warm Introductions", desc:"Send connection requests, exchange messages, and schedule Calendly calls without leaving the platform." },
          { icon:<TrendingUp size={22} color="var(--accent-teal)"/>, title:"Live Match Scores", desc:"Every startup gets a real-time compatibility score so investors can prioritize the best opportunities." },
        ].map(f=>(
          <div key={f.title} className="card" style={{padding:"28px 26px"}}>
            <div style={{marginBottom:14}}>{f.icon}</div>
            <h3 style={{fontSize:15,fontWeight:700,marginBottom:8}}>{f.title}</h3>
            <p style={{fontSize:13.5,color:"var(--text-secondary)",lineHeight:1.65}}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
