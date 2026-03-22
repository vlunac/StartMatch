// src/components/forms/InvestorProfileForm.jsx
import { useState } from "react";
import { Save } from "lucide-react";

const FOCUS_OPTIONS = ["FinTech","HealthTech","EdTech","SaaS","Marketplace","CleanTech","DeepTech","AI","BioTech","Other"];

export default function InvestorProfileForm({ investor, onSubmit }) {
  const [form, setForm] = useState({
    name: investor?.name||"", headline: investor?.headline||"", bio: investor?.bio||"",
    location: investor?.location||"", linkedin: investor?.socialLinks?.linkedin||"",
    instagram: investor?.socialLinks?.instagram||"", facebook: investor?.socialLinks?.facebook||"",
    checkSizeMin: investor?.checkSizeMin||0, checkSizeMax: investor?.checkSizeMax||0,
    focusAreas: investor?.focusAreas||[],
  });
  const F = k => ({ value:form[k], onChange:e=>setForm(p=>({...p,[k]:e.target.value})) });
  const toggleFocus = f => setForm(p=>({...p,focusAreas:p.focusAreas.includes(f)?p.focusAreas.filter(x=>x!==f):[...p.focusAreas,f]}));
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" {...F("name")} placeholder="Jane Smith"/></div>
        <div className="form-group"><label className="form-label">Headline</label><input className="form-input" {...F("headline")} placeholder="General Partner at…"/></div>
      </div>
      <div className="form-group"><label className="form-label">Bio</label><textarea className="form-input" rows={4} {...F("bio")} style={{resize:"vertical"}}/></div>
      <div className="form-group"><label className="form-label">Location</label><input className="form-input" {...F("location")} placeholder="San Francisco, CA"/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        <div className="form-group"><label className="form-label">LinkedIn</label><input className="form-input" {...F("linkedin")} placeholder="https://linkedin.com/in/…"/></div>
        <div className="form-group"><label className="form-label">Instagram</label><input className="form-input" {...F("instagram")} placeholder="https://instagram.com/…"/></div>
        <div className="form-group"><label className="form-label">Facebook</label><input className="form-input" {...F("facebook")} placeholder="https://facebook.com/…"/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="form-group"><label className="form-label">Check Size Min ($)</label><input className="form-input" type="number" {...F("checkSizeMin")} placeholder="500000"/></div>
        <div className="form-group"><label className="form-label">Check Size Max ($)</label><input className="form-input" type="number" {...F("checkSizeMax")} placeholder="5000000"/></div>
      </div>
      <div className="form-group">
        <label className="form-label">Focus Areas</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:4}}>
          {FOCUS_OPTIONS.map(f=>(
            <button key={f} onClick={()=>toggleFocus(f)} style={{padding:"5px 12px",borderRadius:99,fontSize:12,fontWeight:600,border:"1.5px solid",transition:"all 0.15s",borderColor:form.focusAreas.includes(f)?"var(--accent-teal)":"var(--border-color)",background:form.focusAreas.includes(f)?"rgba(0,109,119,0.1)":"transparent",color:form.focusAreas.includes(f)?"var(--accent-teal)":"var(--text-secondary)"}}>{f}</button>
          ))}
        </div>
      </div>
      <button className="btn btn-coral btn-full" onClick={()=>onSubmit&&onSubmit(form)} style={{marginTop:8}}><Save size={15}/> Save Profile</button>
    </div>
  );
}
