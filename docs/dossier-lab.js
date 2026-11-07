/* POISONERS v3 — browser-only dossier explorer. No live allegations, health scoring or claimant intake. */
(() => {
  "use strict";
  const db=window.POISON_DOSSIERS;
  if(!db||!Array.isArray(db.dossiers))return;
  const $=id=>document.getElementById(id);
  const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const fmt=value=>Number(value).toLocaleString("en-US",{maximumFractionDigits:0});
  const els=["dossierSearch","dossierCountry","dossierSector","dossierSort","dossierCount","dossierList","dossierPanel","compareA","compareB","comparisonPanel","labCaseGrid","labCaseDetail","labMenu","labMobileNav"];
  if(els.some(id=>!$(id)))return;
  const byId=new Map(db.dossiers.map(d=>[d.id,d]));
  const validId=new URLSearchParams(location.search).get("entity");
  const first=[...db.dossiers].sort((a,b)=>a.company.localeCompare(b.company))[0].id;
  const state={query:"",country:"ALL",sector:"ALL",sort:"alpha",selected:byId.has(validId)?validId:first,
    compareA:first,compareB:db.dossiers.find(x=>x.id!==first)?.id||first,
    caseCountry:"ALL",caseSelected:db.case_examples[0]?.id||null};
  function selectOptions(){
    for(const country of [...new Map(db.dossiers.map(d=>[d.home_country_code,d.home_country])).entries()].sort((a,b)=>a[1].localeCompare(b[1]))){
      const option=document.createElement("option");option.value=country[0];option.textContent=country[1];$("dossierCountry").appendChild(option);
    }
    const sectors=[...new Set(db.dossiers.map(d=>d.sector))].sort();
    for(const sector of sectors){const option=document.createElement("option");option.value=sector;option.textContent=sector;$("dossierSector").appendChild(option)}
    const options=[...db.dossiers].sort((a,b)=>a.company.localeCompare(b.company));
    for(const id of ["compareA","compareB"]){
      for(const d of options){const option=document.createElement("option");option.value=d.id;option.textContent=d.company;$(id).appendChild(option)}
    }
    $("compareA").value=state.compareA;$("compareB").value=state.compareB;
  }
  function matches(){
    const arr=db.dossiers.filter(d=>
      (state.country==="ALL"||d.home_country_code===state.country)&&
      (state.sector==="ALL"||d.sector===state.sector)&&
      (!state.query||(d.company+" "+d.sector+" "+d.home_country+" "+d.evidence.record_id).toLocaleLowerCase().includes(state.query))
    );
    arr.sort(state.sort==="emissions"?
      (a,b)=>b.metric.value-a.metric.value||a.company.localeCompare(b.company):
      state.sort==="country"?
        (a,b)=>a.home_country.localeCompare(b.home_country)||a.company.localeCompare(b.company):
        (a,b)=>a.company.localeCompare(b.company));
    return arr;
  }
  function renderList(){
    const data=matches();
    if(data.length && !data.some(d=>d.id===state.selected))state.selected=data[0].id;
    $("dossierCount").textContent=data.length+" SOURCE RECORD"+(data.length===1?"":"S")+" / "+db.dossiers.length+" INDEXED";
    $("dossierList").innerHTML=data.map((d,i)=>{
      const selected=d.id===state.selected,metric=fmt(d.metric.value);
      return '<button class="lab-list-item'+(selected?" is-selected":"")+'" type="button" data-entity="'+esc(d.id)+'" aria-pressed="'+selected+'">'+
        '<span class="lab-item-head"><span>'+esc(d.home_country_code)+' / '+esc(d.sector.toUpperCase())+'</span><span>0'+(i+1).toString().padStart(2,"0")+'</span></span>'+
        '<strong>'+esc(d.company)+'</strong><span class="lab-item-metric">'+metric+' <small>MtCO₂e · 2024</small></span>'+
        '<span class="lab-item-foot"><i></i>SOURCE-LINKED <span aria-hidden="true">↗</span></span></button>';
    }).join("")||'<p class="lab-no-results">No matching company records. The 10×10 investigation remains incomplete.</p>';
    if(data.length)renderPanel();
    else $("dossierPanel").innerHTML='<span class="kicker">NO MATCHING SOURCE RECORDS</span><h3>Try another filter.</h3><p>Absence from the selected subset does not mean absence of emissions or harm.</p>';
  }
  function renderPanel(){
    const d=byId.get(state.selected);
    if(!d)return;
    const e=d.evidence;
    const gates=d.gates.map((g,i)=>
      '<div class="lab-gate '+(g.status==="linked"?"lab-gate-linked":"")+'"><span class="lab-gate-no">'+String(i+1).padStart(2,"0")+'</span><span class="lab-gate-txt"><strong>'+esc(g.label)+'</strong><small>'+esc(g.description)+'</small></span>'+
      '<span class="lab-gate-status">'+(g.status==="linked"?"SOURCE ONLY":"NOT VERIFIED")+'</span></div>'
    ).join("");
    const portals=d.investigation.source_portals.map(p=>
      '<a target="_blank" rel="noopener noreferrer" href="'+esc(p.url)+'">'+esc(p.name)+' ↗</a>'
    ).join("");
    const tasks=d.investigation.next_steps.map((s,i)=>
      '<li><span>'+String(i+1).padStart(2,"0")+'</span>'+esc(s)+'</li>'
    ).join("");
    $("dossierPanel").innerHTML=
      '<div class="lab-profile-head"><span>PUBLIC DOSSIER / '+esc(e.record_id)+'</span><span>RESEARCH ONLY / NOT A LEGAL FINDING</span></div>'+
      '<h3>'+esc(d.company)+'</h3><p class="lab-profile-meta">'+esc(d.sector.toUpperCase())+' · '+esc(d.home_country.toUpperCase())+' (HOME COUNTRY)</p>'+
      '<div class="lab-profile-value"><div><small>PUBLISHED PRODUCTION-ATTRIBUTED GHG / 2024</small><strong>'+fmt(d.metric.value)+' <em>MtCO₂e</em></strong></div><p>Worldwide production-linked attribution, not facility-level releases in '+esc(d.home_country)+'.</p></div>'+
      '<div class="lab-profile-meta-grid"><div><span>HISTORICAL CUMULATIVE</span><strong>'+(d.metric.historical_cumulative==null?"NOT TRANSCRIBED":fmt(d.metric.historical_cumulative)+" MtCO₂e")+'</strong></div>'+
      '<div><span>EVIDENCE METHOD</span><strong>'+esc(e.model_class.toUpperCase())+' / '+esc(e.grade)+'</strong></div><div><span>REPORTING PERIOD</span><strong>'+esc(e.period.start)+' → '+esc(e.period.end)+'</strong></div>'+
      '<div><span>SOURCE REVIEW</span><strong>'+esc(e.source.retrieved_at)+'</strong></div></div>'+
      '<div class="lab-profile-section"><div class="lab-profile-section-label"><span>SEVEN EVIDENCE GATES</span><small>1 DOCUMENT LINKED · 6 REQUIRE RESEARCH</small></div><div class="lab-gates">'+gates+'</div></div>'+
      '<div class="lab-profile-section"><div class="lab-profile-section-label"><span>BOUNDARY AND LIMITATIONS</span></div>'+
      '<p class="lab-profile-p">'+esc(d.metric.boundary)+'</p>'+
      '<ul class="lab-limitations">'+e.limitations.map(s=>'<li>'+esc(s)+'</li>').join("")+'</ul>'+
      '<p class="lab-profile-p lab-warning">No verified facility-specific toxicity, exposure, illness or legal fault is established by this record. Missing evidence is not zero harm.</p></div>'+
      '<div class="lab-profile-section"><div class="lab-profile-section-label"><span>COUNTRY RESEARCH ROUTE</span></div><p class="lab-profile-p">'+esc(d.investigation.research_entry_point)+'</p>'+
      '<p class="lab-profile-p">Open gaps: '+esc(d.investigation.key_gaps)+'</p><div class="lab-profile-links">'+portals+'</div></div>'+
      '<div class="lab-profile-section"><div class="lab-profile-section-label"><span>NEXT VALIDATION TASKS</span></div><ol class="lab-tasks">'+tasks+'</ol></div>'+
      '<div class="lab-profile-section"><div class="lab-profile-section-label"><span>PRIMARY ATTRIBUTION SOURCE</span></div>'+
      '<a class="lab-source-main" href="'+esc(e.source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(e.source.title)+' ↗</a>'+
      '<p class="lab-source-sub">'+esc(e.source.publisher)+' · Publication '+esc(e.source.published_at)+' · '+esc(e.source.table_or_page||"Report appendix")+'</p>'+
      '<p class="lab-source-sub">Rights: '+esc(e.source.license||"Check source use terms")+'</p></div>'+
      '<div class="lab-profile-actions"><button id="labDownload" type="button">DOWNLOAD PUBLIC EVIDENCE PACK ↓</button>'+
      '<button id="labCopy" type="button">COPY SOURCE CITATION ⧉</button></div>'+
      '<p id="labActionStatus" class="lab-action-status" role="status" aria-live="polite"></p>';
    $("labDownload").addEventListener("click",()=>downloadPack(d));
    $("labCopy").addEventListener("click",()=>copyCitation(d));
    $("dossierList").querySelectorAll(".lab-list-item").forEach(b=>b.classList.toggle("is-selected",b.dataset.entity===d.id));
  }
  function downloadPack(d){
    const pack={generated_at:new Date().toISOString(),type:"public-research-evidence-packet",statement:"Not a scientific causality determination, legal allegation, or proof of injury",dossier:d};
    const blob=new Blob([JSON.stringify(pack,null,2)+"\n"],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="poisoners-public-"+d.id+".json";document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    $("labActionStatus").textContent="Downloaded source-bound research JSON. No private claimant material included.";
  }
  async function copyCitation(d){
    const src=d.evidence.source;
    const citation=src.publisher+" ("+src.published_at.slice(0,4)+"). "+src.title+". "+src.url+
      " | "+d.company+" | "+d.metric.value+" "+d.metric.unit+" in "+d.metric.year+
      " | boundary: "+d.metric.boundary+" | research use, not a legal finding";
    try{
      if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation);
      $("labActionStatus").textContent="Source citation copied.";
    }catch(e){$("labActionStatus").textContent="Clipboard unavailable; citation appears in the primary source section above."}
  }
  function renderCompare(){
    const a=byId.get(state.compareA),b=byId.get(state.compareB);
    if(!a||!b)return;
    const same=a.id===b.id,matching=a.metric.year===b.metric.year&&a.metric.unit===b.metric.unit&&a.metric.boundary===b.metric.boundary;
    if(!matching){$("comparisonPanel").textContent="Comparison unavailable: reporting years, units or accounting boundaries differ.";return}
    const max=Math.max(a.metric.value,b.metric.value);
    const graph=[a,b].map((d,i)=>{
      const width=max===0?0:100*d.metric.value/max;
      return '<div class="lab-compare-bar-row"><div class="lab-compare-label"><span>'+esc(d.company)+'</span><strong>'+fmt(d.metric.value)+' MtCO₂e</strong></div>'+
        '<div class="lab-compare-track" role="img" aria-label="'+esc(d.company)+": "+fmt(d.metric.value)+' million tonnes CO2 equivalent"><span class="'+(i===1?"lab-compare-second":"")+'" style="width:'+width.toFixed(2)+'%"></span></div></div>';
    }).join("");
    $("comparisonPanel").innerHTML=
      '<div class="lab-compare-mark">SAME SOURCE · 2024 · MtCO₂e · GLOBAL PRODUCER ATTRIBUTION</div>'+
      graph+'<div class="lab-compare-foot"><p>'+(same?"The same record is selected twice. ":"")+
      'These bars compare an identical published GHG throughput metric—not air toxicity, disease burden, or misconduct. Sold-product combustion and operational emissions have different boundaries from country territorial inventories.</p>'+
      '<a href="'+esc(a.evidence.source.url)+'" target="_blank" rel="noopener noreferrer">AUDIT SOURCE METHOD ↗</a></div>';
  }
  function renderCases(){
    const cases=db.case_examples.filter(c=>state.caseCountry==="ALL"||c.country===state.caseCountry);
    if(!cases.some(c=>c.id===state.caseSelected))state.caseSelected=cases[0]?.id||null;
    $("labCaseGrid").innerHTML=cases.map((c,i)=>
      '<button type="button" class="lab-case-card'+(c.id===state.caseSelected?" is-selected":"")+'" data-example="'+esc(c.id)+'" aria-pressed="'+String(c.id===state.caseSelected)+'">'+
        '<span class="lab-case-top"><span>'+esc(c.country)+' / '+esc(String(c.year))+'</span><span>'+String(i+1).padStart(2,"0")+'</span></span>'+
        '<strong>'+esc(c.title)+'</strong><span class="lab-case-hazard">'+esc(c.hazard)+'</span>'+
        '<span class="lab-case-type">'+esc(c.finding_kind)+'</span><span class="lab-case-link">TRACE DOCUMENTED PATHWAY ↗</span></button>'
    ).join("");
    for(const b of $("labCaseGrid").querySelectorAll("[data-example]"))b.addEventListener("click",()=>{
      state.caseSelected=b.dataset.example;renderCases();$("labCaseDetail").scrollIntoView({block:"nearest",behavior:"smooth"});
    });
    renderCaseDetail();
  }
  function renderCaseDetail(){
    const c=db.case_examples.find(x=>x.id===state.caseSelected);
    if(!c){$("labCaseDetail").innerHTML="";return}
    const steps=c.chain.map((step,i)=>
      '<div class="lab-pathway-node"><small>'+String(i+1).padStart(2,"0")+'</small><span>'+esc(step.replace(/_/g," "))+'</span></div>'
    ).join("");
    const links=c.sources.map(s=>
      '<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+' ↗</a>').join("");
    $("labCaseDetail").innerHTML=
      '<div class="lab-case-detail-head"><span class="kicker">HISTORICAL DOCUMENTED MATTER / '+esc(c.country)+'</span><h3>'+esc(c.title)+'</h3><p>'+esc(c.statement)+'</p></div>'+
      '<div class="lab-case-detail-type"><span>DOCUMENT TYPE</span><strong>'+esc(c.finding_kind)+'</strong></div>'+
      '<div class="lab-pathway"><div class="lab-profile-section-label"><span>PUBLIC EVIDENCE CHAIN</span></div><div class="lab-pathway-track">'+steps+'</div></div>'+
      '<div class="lab-case-bottom"><div><span class="lab-bottom-label">IMPORTANT LEGAL / SCIENTIFIC LIMIT</span><p>'+esc(c.caveat)+'</p></div>'+
      '<div><span class="lab-bottom-label">PRIMARY SOURCES</span><div class="lab-case-sources">'+links+'</div></div></div>'+
      '<div class="lab-case-note">Historical documentary context only. Not part of the 50-record greenhouse-gas company dataset; quantities with different units are never aggregated.</div>';
  }
  function setup(){
    const menu=$("labMenu"),nav=$("labMobileNav");
    menu.addEventListener("click",()=>{nav.hidden=!nav.hidden;menu.setAttribute("aria-expanded",String(!nav.hidden));menu.setAttribute("aria-label",nav.hidden?"Open navigation":"Close navigation")});
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.hidden=true;menu.setAttribute("aria-expanded","false")}));
    $("labTotalCompanies").textContent=db.totals.company_records;
    $("labCaseCount").textContent=String(db.totals.documented_historical_comparators).padStart(2,"0");
    selectOptions();
    $("dossierSearch").addEventListener("input",e=>{state.query=e.target.value.toLocaleLowerCase().trim();renderList()});
    $("dossierCountry").addEventListener("change",e=>{state.country=e.target.value;renderList()});
    $("dossierSector").addEventListener("change",e=>{state.sector=e.target.value;renderList()});
    $("dossierSort").addEventListener("change",e=>{state.sort=e.target.value;renderList()});
    $("dossierList").addEventListener("click",e=>{
      const b=e.target.closest("button[data-entity]");
      if(!b||!byId.has(b.dataset.entity))return;
      state.selected=b.dataset.entity;
      const url=new URL(location.href);url.searchParams.set("entity",state.selected);
      history.replaceState(null,"",url);
      renderList();
    });
    $("compareA").addEventListener("change",e=>{state.compareA=e.target.value;renderCompare()});
    $("compareB").addEventListener("change",e=>{state.compareB=e.target.value;renderCompare()});
    for(const b of document.querySelectorAll("[data-case-country]"))b.addEventListener("click",()=>{
      state.caseCountry=b.dataset.caseCountry;
      for(const x of document.querySelectorAll("[data-case-country]")){
        const active=x===b;x.classList.toggle("is-active",active);x.setAttribute("aria-pressed",String(active));
      }
      renderCases();
    });
    renderList();renderCompare();renderCases();
  }
  setup();
})();