// src/pages/FounderProfilePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Linkedin, Instagram, Facebook, Edit, CalendarDays } from "lucide-react";
import { mockStartups, stageCssClass } from "../api/mockData";
import { useAuth } from "../context/AuthContext";
import ConnectionModal from "../components/ConnectionModal";

const FOUNDER_MAP = {
  1: { id:1, name:"Aisha Kamara",     title:"CEO & Co-Founder", location:"San Francisco, CA", avatarInitials:"AK", avatarColor:"#E29578", bio:"Serial entrepreneur with 10+ years in fintech infrastructure. Previously led payments engineering at Stripe. MIT CS graduate. Passionate about making financial systems fairer through AI. When not building NeuraPay, I mentor early-stage founders and advise fintech policy groups.", socialLinks:{ linkedin:"https://linkedin.com/in/aishakamara", instagram:"https://instagram.com/aishakamara", facebook:"https://facebook.com/aishakamara" }, calendlyUrl:"https://calendly.com/aishakamara" },
  2: { id:2, name:"Marcus Osei",       title:"CEO & Founder",    location:"Austin, TX",        avatarInitials:"MO", avatarColor:"#006D77", bio:"Clean energy advocate and hardware engineer. Former Tesla energy storage team. Built and sold an IoT company in 2020. Believes distributed energy is the future of the grid.", socialLinks:{ linkedin:"https://linkedin.com/in/marcosei", instagram:"https://instagram.com/marcosei", facebook:"https://facebook.com/marcosei" }, calendlyUrl:"https://calendly.com/marcosei" },
  3: { id:3, name:"Dr. Priya Nair",    title:"CEO & Founder",    location:"Boston, MA",        avatarInitials:"PN", avatarColor:"#83C5BE", bio:"Physician and AI researcher. MD from Johns Hopkins, PhD in Computational Biology from MIT. Committed to using AI to democratize expert diagnostics globally.", socialLinks:{ linkedin:"https://linkedin.com/in/priyanair", instagram:"https://instagram.com/priyanair", facebook:"https://facebook.com/priyanair" }, calendlyUrl:"https://calendly.com/priyanair" },
  4: { id:4, name:"James Weatherford", title:"CEO & Founder",    location:"Denver, CO",        avatarInitials:"JW", avatarColor:"#006D77", bio:"Aerospace engineer and serial founder. 12 years at NASA JPL working on autonomous systems. Obsessed with making orbital infrastructure commercially sustainable.", socialLinks:{ linkedin:"https://linkedin.com/in/jweatherford", instagram:"https://instagram.com/jweatherford", facebook:"https://facebook.com/jweatherford" }, calendlyUrl:"https://calendly.com/jweatherford" },
  5: { id:5, name:"Sofia Chen",        title:"CEO & Co-Founder", location:"New York, NY",      avatarInitials:"SC", avatarColor:"#E29578", bio:"Former teacher turned EdTech founder. 8 years in K-12 education in NYC public schools. Graduate of the Stanford d.school. Believes great technology disappears and lets kids be kids.", socialLinks:{ linkedin:"https://linkedin.com/in/sofiachen", instagram:"https://instagram.com/sofiachen", facebook:"https://facebook.com/sofiachen" }, calendlyUrl:"https://calendly.com/sofiachen" },
};

export default function FounderProfilePage() {
  const { id }         = useParams();
  const { user, role } = useAuth();
  const navigate        = useNavigate();
  const effectiveId     = Number(id || 1);
  const isOwn           = role === "founder" && effectiveId === 1;

  const [founder,   setFounder]   = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showConnect, setShowConnect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const f  = FOUNDER_MAP[effectiveId] || FOUNDER_MAP[1];
      const co = mockStartups.filter(s => s.founderId === effectiveId);
      setFounder(f); setCompanies(co); setLoading(false);
    }, 300);
  }, [effectiveId]);

  if (loading) return <div className="page-container">{[200,120,180].map((h,i)=><div key={i} className="skeleton" style={{height:h,borderRadius:12,marginBottom:16}}/>)}</div>;
  if (!founder) return <div className="page-container" style={{textAlign:"center",color:"var(--text-secondary)",padding:"80px 0"}}>Founder not found.</div>;

  return (
    <div className="page-container" style={{ maxWidth: 820 }}>
      {/* Hero */}
      <div className="card fade-up" style={{ overflow:"hidden", marginBottom:20 }}>
        <div style={{ height:110, background:"linear-gradient(135deg, var(--color-coral), var(--color-teal-mid))", position:"relative" }}>
          <div style={{ position:"absolute", inset:0, opacity:0.07, backgroundImage:"radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize:"24px 24px" }} />
        </div>
        <div style={{ padding:"0 32px 28px", marginTop:-40 }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ width:80, height:80, borderRadius:"50%", background:founder.avatarColor+"22", border:"3px solid var(--bg-secondary)", outline:`3px solid ${founder.avatarColor}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:800, color:founder.avatarColor }}>{founder.avatarInitials}</div>
            {isOwn && <button className="btn btn-coral" style={{fontSize:13}}><Edit size={14}/> Edit Profile</button>}
          </div>
          <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.02em", marginBottom:4 }}>{founder.name}</h1>
          <p style={{ fontSize:14, color:"var(--text-secondary)", marginBottom:6 }}>{founder.title}</p>
          <p style={{ display:"flex", alignItems:"center", gap:5, fontSize:13, color:"var(--text-secondary)", marginBottom:18 }}><MapPin size={13}/>{founder.location}</p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {founder.socialLinks?.linkedin  && <a href={founder.socialLinks.linkedin}  target="_blank" rel="noreferrer" className="btn btn-ghost" style={{fontSize:12.5,padding:"6px 14px"}}><Linkedin  size={14} color="var(--accent-teal)"/> LinkedIn</a>}
            {founder.socialLinks?.instagram && <a href={founder.socialLinks.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{fontSize:12.5,padding:"6px 14px"}}><Instagram size={14} color="var(--accent-coral)"/> Instagram</a>}
            {founder.socialLinks?.facebook  && <a href={founder.socialLinks.facebook}  target="_blank" rel="noreferrer" className="btn btn-ghost" style={{fontSize:12.5,padding:"6px 14px"}}><Facebook  size={14} color="var(--accent-teal)"/> Facebook</a>}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card fade-up d1" style={{ padding:"24px 28px", marginBottom:20 }}>
        <h3 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>About</h3>
        <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.75 }}>{founder.bio}</p>
      </div>

      {/* Companies */}
      {companies.length > 0 && (
        <div className="card fade-up d2" style={{ overflow:"hidden", marginBottom:20 }}>
          <div style={{ padding:"16px 24px", borderBottom:"1px solid var(--border-color)" }}>
            <h3 style={{ fontSize:15, fontWeight:700 }}>Companies Founded</h3>
          </div>
          {companies.map((co, i) => (
            <div key={co.id} style={{ padding:"16px 24px", borderBottom: i<companies.length-1?"1px solid var(--border-color)":"none", display:"flex", alignItems:"center", gap:16, cursor:"pointer", transition:"background 0.15s" }}
              onClick={() => navigate("/search")}
              onMouseEnter={e=>e.currentTarget.style.background="var(--bg-primary)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >
              <div style={{ width:44, height:44, borderRadius:10, background:co.logoColor+"20", border:`1.5px solid ${co.logoColor}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:co.logoColor, flexShrink:0 }}>{co.logoInitials}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{co.name}</div>
                <div style={{ fontSize:12, color:"var(--text-secondary)" }}>{co.tagline}</div>
              </div>
              <div style={{ display:"flex", gap:7, flexShrink:0 }}>
                <span className="tag tag-teal" style={{fontSize:10}}>{co.industry}</span>
                <span className={`tag ${stageCssClass(co.stage)}`} style={{fontSize:10}}>{co.stage}</span>
                <span className="tag" style={{fontSize:10,background:"var(--color-blush)",color:"var(--color-teal-dark)"}}>Est. {co.dateFounded}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="fade-up d3" style={{ display:"flex", gap:14 }}>
        {!isOwn && <button className="btn btn-coral" style={{fontSize:14,padding:"11px 24px"}} onClick={()=>setShowConnect(true)}>Connect with Me</button>}
        <a href={founder.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-teal-outline" style={{fontSize:14,padding:"11px 24px",textDecoration:"none"}}>
          <CalendarDays size={15}/> Schedule a Call
        </a>
      </div>

      {showConnect && <ConnectionModal target={founder} onClose={()=>setShowConnect(false)}/>}
    </div>
  );
}
