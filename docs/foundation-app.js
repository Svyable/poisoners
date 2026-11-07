/* POISONERS v2 — public research observatory for metric definitions, sources and coverage.
 * This UI never calculates a company harm score from missing exposure measurements. */
(function(){
 "use strict";
 const f=window.POISON_FOUNDATION;
 if(!f)return;
 const $=(id)=>document.getElementById(id);
 const escape=(x)=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const n=(x)=>Number(x).toLocaleString("en-US");
 const els=["metricSearch","metricDomain","metricKind","metricGrid","metricCount","metricMore","sourceSearch","sourceGrid","sourceCount","researchCountryGrid","foundationCountryDetail","foundationTotals"];
 if(els.some(id=>!$(id)))return;
 const domainMap=new Map(f.domains.map(d=>[d.id,d]));
 const sourceMap=new Map(f.sources.map(s=>[s.id,s]));
 const state={search:"",domain:"ALL",kind:"ALL",visible:24,sourceQuery:"",selectedCountry:"US"};
 function init(){
   $("foundationTotals").innerHTML=[
    {v:f.counts.metrics_defined,l:"METRIC DEFINITIONS",s:"Ontology only"},
    {v:f.counts.metric_domains,l:"IMPACT DOMAINS",s:"Separately measurable"},
    {v:f.counts.source_entries,l:"SOURCE ENTRIES",s:"Research and licensing review"},
    {v:f.counts.seed_emission_records,l:"2024 EMISSION RECORDS",s:"One source-linked climate dataset"},
    {v:f.counts.validated_multihazard_dossiers,l:"VALIDATED MULTI-HAZARD DOSSIERS",s:"Further analysis required"},
    {v:f.counts.automatically_authorized_cases,l:"AUTOMATED CASE FILINGS",s:"Deliberately prohibited"}
   ].map(o=>'<div class="foundation-total"><strong>'+n(o.v)+'</strong><span>'+escape(o.l)+'</span><small>'+escape(o.s)+'</small></div>').join("");
   f.domains.forEach(d=>{const option=document.createElement("option");option.value=d.id;option.textContent=d.label+" ("+d.metric_count+")";$("metricDomain").appendChild(option)});
   const kinds=[...new Set(f.metrics.map(m=>m.kind))].sort();
   kinds.forEach(kind=>{const option=document.createElement("option");option.value=kind;option.textContent=kind.replace(/_/g," ");$("metricKind").appendChild(option)});
   $("metricSearch").addEventListener("input",e=>{state.search=e.target.value.toLocaleLowerCase().trim();state.visible=24;renderMetrics()});
   $("metricDomain").addEventListener("change",e=>{state.domain=e.target.value;state.visible=24;renderMetrics()});
   $("metricKind").addEventListener("change",e=>{state.kind=e.target.value;state.visible=24;renderMetrics()});
   $("metricMore").addEventListener("click",()=>{state.visible+=24;renderMetrics()});
   $("sourceSearch").addEventListener("input",e=>{state.sourceQuery=e.target.value.toLocaleLowerCase().trim();renderSources()});
   renderMetrics();renderSources();renderCountries();
 }
 function renderMetrics(){
   const matches=f.metrics.filter(m=>(state.domain==="ALL"||m.domain_code===state.domain)
     &&(state.kind==="ALL"||m.kind===state.kind)
     &&(!state.search||(m.label+" "+m.id+" "+m.domain+" "+m.note+" "+m.unit).toLocaleLowerCase().includes(state.search)));
   $("metricCount").textContent=n(matches.length)+" DEFINITIONS MATCH · "+Math.min(matches.length,state.visible)+" SHOWN";
   $("metricGrid").innerHTML=matches.slice(0,state.visible).map(m=>{
     const docs=m.source_candidates.map(s=>sourceMap.get(s)).filter(Boolean).map(s=>
       '<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer" title="'+escape(s.name)+'">'+escape(s.id)+' ↗</a>'
     ).join("");
     return '<article class="metric-card"><div class="metric-card-top"><span>'+escape(m.domain_code)+'</span><span>'+escape(m.kind.toUpperCase())+'</span></div>'+
      '<h3>'+escape(m.label)+'</h3>'+
      '<div class="metric-unit">'+escape(m.unit)+'</div>'+
      '<p>'+escape(m.note)+'</p>'+
      '<div class="metric-card-bottom"><span>DEFINITION ONLY</span><div>'+docs+'</div></div></article>';
   }).join("")||'<div class="filter-empty">No metric definitions match those filters.</div>';
   $("metricMore").hidden=matches.length<=state.visible;
 }
 function renderSources(){
   const selected=f.sources.filter(s=>!state.sourceQuery||(s.id+" "+s.name+" "+s.country+" "+s.domain+" "+s.limitations).toLocaleLowerCase().includes(state.sourceQuery));
   $("sourceCount").textContent=n(selected.length)+" / "+n(f.sources.length)+" SOURCE ENTRIES";
   $("sourceGrid").innerHTML=selected.map(s=>'<article class="research-source"><div class="source-bits"><span>'+escape(s.id)+'</span><span>'+escape(s.country)+'</span><span>'+escape(s.access.toUpperCase())+'</span></div><h3><a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.name)+' ↗</a></h3><p>'+escape(s.limitations)+'</p><small>'+escape(s.license_status.replace(/-/g," ").toUpperCase())+' · NOT AUTOMATICALLY INGESTED</small></article>').join("")||'<p class="filter-empty">No source entries match.</p>';
 }
 function renderCountries(){
   $("researchCountryGrid").innerHTML=f.countries.map(c=>{
    const selected=state.selectedCountry===c.code;
    const fill=Math.round(c.coverage_slots_filled/c.target_dossiers*100);
    return '<button type="button" class="research-country'+(selected?" is-active":"")+'" data-research-country="'+escape(c.code)+'" aria-expanded="'+selected+'">'+
      '<span class="research-country-code">'+escape(c.code)+' <i>↗</i></span><strong>'+escape(c.name)+'</strong>'+
      '<span class="research-country-large">'+n(c.seed_emissions_records)+' <small>/ '+n(c.target_dossiers)+'</small></span>'+
      '<span class="research-country-line"><i style="width:'+Math.min(fill,100)+'%"></i></span>'+
      '<small>EMISSIONS-ONLY ENTITY RECORDS</small></button>';
   }).join("");
   $("researchCountryGrid").querySelectorAll("[data-research-country]").forEach(b=>b.addEventListener("click",()=>{
      state.selectedCountry=b.dataset.researchCountry;renderCountries();
   }));
   const c=f.countries.find(x=>x.code===state.selectedCountry)||f.countries[0];
   const links=c.source_ids.map(sid=>sourceMap.get(sid)).filter(Boolean)
    .map(s=>'<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.name)+' ↗</a>').join("");
   $("foundationCountryDetail").innerHTML='<span class="kicker">COUNTRY WORKSTREAM / '+escape(c.code)+'</span>'+
   '<h3>'+escape(c.name)+'</h3>'+
   '<div class="workstream-count"><strong>'+n(c.seed_emissions_records)+'</strong> source-linked climate-only records · <strong>'+n(c.verified_multi_hazard_dossiers)+'</strong> verified multi-hazard dossiers</div>'+
   '<h4>Research entry point</h4><p>'+escape(c.research_entry_point)+'</p><h4>Key unresolved evidence</h4><p>'+escape(c.key_gaps)+'</p>'+
   '<div class="research-country-links">'+links+'</div><div class="workstream-warning">Country records are home-country groupings of worldwide production-linked emissions. These counts are not climate liability, chemical exposure, or national corporate rankings.</div>';
 }
 init();
})();
