// src/components/forms/StartupProfileForm.jsx
import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

const INDUSTRIES = ["FinTech","HealthTech","EdTech","SaaS","Marketplace","CleanTech","SpaceTech","Other"];
const STAGES     = ["Pre-Seed","Seed","Series A","Series B","Series B+"];

export default function StartupProfileForm({ startup, onSubmit }) {
  const [form, setForm] = useState({
    name: startup?.name||"", tagline: startup?.tagline||"", description: startup?.description||"",
    industry: startup?.industry||"", stage: startup?.stage||"", location: startup?.location||"",
    teamSize: startup?.teamSize||1, totalRaised: startup?.totalRaised||0, currentAsk: startup?.currentAsk||0,
    dateFounded: startup?.dateFounded||2024, expenses: startup?.expenses||0,
    calendlyUrl: startup?.calendlyUrl||"", members: startup?.members||[],
  });
  const F = k => ({ value:form[k], onChange:e=>setForm(p=>({...p,[k]:e.target.value})) });
  const addMember = () => setForm(p=>({...p,members:[...p.members,{name:"",role:""}]}));
  const removeMember = i => setForm(p=>({...p,members:p.members.filter((_,idx)=>idx!==i)}));
  const updateMember = (i,k,v) => setForm(p=>({...p,members:p.members.map((m,idx)=>idx===i?{...m,[k]:v}:m)}));

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="form-group"><label className="form-label">Startup Name</label><input className="form-input" {...F("name")} placeholder="NeuraPay"/></div>
        <div className="form-group"><label className="form-label">Tagline</label><input className="form-input" {...F("tagline")} placeholder="One-line pitch…"/></div>
      </div>
      <div className="form-group"><label className="form-label">Full Description</label><textarea className="form-input" rows={5} {...F("description")} style={{resize:"vertical"}}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        <div className="form-group">
          <label className="form-label">Industry</label>
          <select className="form-input" {...F("industry")}><option value="">Select…</option>{INDUSTRIES.map(i=><option key={i} value={i}>{i}</option>)}</select>
        </div>
        <div className="form-group">
          <label className="form-label">Stage</label>
          <select className="form-input" {...F("stage")}><option value="">Select…</option>{STAGES.map(s=><option key={s} value={s}>{s}</option>)}</select>
        </div>
        <div className="form-group"><label className="form-label">Location</label><input className="form-input" {...F("location")} placeholder="San Francisco, CA"/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16}}>
        <div className="form-group"><label className="form-label">Team Size</label><input className="form-input" type="number" {...F("teamSize")}/></div>
        <div className="form-group"><label className="form-label">Total Raised ($)</label><input className="form-input" type="number" {...F("totalRaised")}/></div>
        <div className="form-group"><label className="form-label">Current Ask ($)</label><input className="form-input" type="number" {...F("currentAsk")}/></div>
        <div className="form-group"><label className="form-label">Date Founded</label><input className="form-input" type="number" {...F("dateFounded")}/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="form-group"><label className="form-label">Monthly Expenses ($)</label><input className="form-input" type="number" {...F("expenses")}/></div>
        <div className="form-group"><label className="form-label">Calendly URL</label><input className="form-input" {...F("calendlyUrl")} placeholder="https://calendly.com/…"/></div>
      </div>
      <div className="form-group">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <label className="form-label">Team Members</label>
          <button className="btn btn-teal-outline" onClick={addMember} style={{fontSize:12,padding:"4px 10px"}}><Plus size={12}/> Add</button>
        </div>
        {form.members.map((m,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"center"}}>
            <input className="form-input" value={m.name} onChange={e=>updateMember(i,"name",e.target.value)} placeholder="Name"/>
            <input className="form-input" value={m.role} onChange={e=>updateMember(i,"role",e.target.value)} placeholder="Role"/>
            <button onClick={()=>removeMember(i)} style={{color:"#E53E3E",flexShrink:0}}><Trash2 size={15}/></button>
          </div>
        ))}
      </div>
      <button className="btn btn-coral btn-full" onClick={()=>onSubmit&&onSubmit(form)} style={{marginTop:8}}><Save size={15}/> Save Startup</button>
    </div>
  );
}
