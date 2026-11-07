/* Browser-only research planner. User notes never enter URL or network requests. */
(() => {
  "use strict";
  const model=window.POISON_WORKBENCH_MODEL;
  if(!model)return;
  const $=id=>document.getElementById(id);
  const concern=$("wbConcern"),region=$("wbRegion"),sourceList=$("wbSources"),stepsEl=$("wbSteps"),status=$("wbStatus");
  if(!concern||!region||!sourceList||!stepsEl||!status)return;
  const states=new Map();
  let plan=null;
  let catalog=null;
  const esc=x=>String(x??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const initial=new URLSearchParams(location.search);
  const isAllowed=(list,id)=>list.some(x=>x.id===id);
  const initialConcern=isAllowed(model.concerns,initial.get("concern"))?initial.get("concern"):"air";
  const initialRegion=isAllowed(model.regions,initial.get("region"))?initial.get("region"):"united-states";
  for(const [control,options,selected] of [[concern,model.concerns,initialConcern],[region,model.regions,initialRegion]]) {
    for(const option of options){const el=document.createElement("option");el.value=option.id;el.textContent=option.label;control.appendChild(el);}
    control.value=selected;
  }
  const key=()=>concern.value+"|"+region.value;
  const state=()=>{
    if(!states.has(key()))states.set(key(),{checks:Array(model.steps.length).fill(false),notes:Array(model.steps.length).fill("")});
    return states.get(key());
  };
  function setStatus(message){status.textContent=message;}
  function renderSources(){
    $("wbDirectoryDate").textContent="CATALOG REVIEWED "+plan.reviewedOn;
    $("wbSourceCount").textContent=String(plan.sources.length);
    $("wbSourceSummary").textContent=plan.hasRegionalSource
      ? plan.sources.length+" official starting point"+(plan.sources.length===1?"":"s")+" for "+plan.region.label+"."
      : "No direct regional tool cataloged for this pairing. This does not mean the hazard is absent.";
    sourceList.replaceChildren();
    if(!plan.hasRegionalSource){
      const empty=document.createElement("div");
      empty.className="wb-source-empty";
      empty.innerHTML='<strong>Coverage gap, not an all-clear.</strong><p>'+esc(plan.boundary)+'</p><a href="public-records.html">Explore the full official records directory ↗</a>';
      sourceList.append(empty);
    }
    for(const {portal,role} of plan.sources){
      const article=document.createElement("article");article.className="wb-source";
      article.innerHTML=
        '<div class="wb-source-top"><span>'+esc(role)+'</span><span>'+esc(portal.vintage)+'</span></div>'+
        '<h3>'+esc(portal.name)+'</h3><p>'+esc(portal.finds)+'</p>'+
        '<div class="wb-source-warning"><strong>Boundary</strong><span>'+esc(portal.limit)+'</span></div>'+
        '<div class="wb-source-actions"><a href="'+esc(portal.url)+'" target="_blank" rel="noopener noreferrer">OPEN OFFICIAL SOURCE ↗</a><a href="public-records.html#'+esc(portal.id)+'">VIEW SOURCE NOTES ↗</a></div>';
      sourceList.append(article);
    }
    $("wbBoundary").textContent=plan.boundary;
  }
  function renderSteps(){
    const current=state();stepsEl.replaceChildren();
    plan.steps.forEach((step,i)=>{
      const article=document.createElement("article");article.className="wb-step";article.dataset.step=String(i);
      const checked=!!current.checks[i];
      article.innerHTML='<div class="wb-step-top"><span class="wb-step-no">'+String(i+1).padStart(2,"0")+'</span>'+
        '<div><h3>'+esc(step.title)+'</h3><p>'+esc(step.question)+'</p></div>'+
        '<label class="wb-step-check"><input type="checkbox" '+(checked?"checked":"")+' aria-label="Mark '+esc(step.title)+' reviewed"><span>REVIEWED</span></label></div>'+
        '<p class="wb-step-caution">'+esc(step.caution)+'</p>'+
        '<label class="wb-step-notes"><span>PUBLIC-RECORD NOTES / OPTIONAL</span><textarea rows="2" maxlength="2500" placeholder="Public source URL, citation, record ID or unresolved question only…" aria-label="Public-record notes for '+esc(step.title)+'"></textarea></label>';
      article.querySelector("textarea").value=current.notes[i];
      stepsEl.append(article);
    });
    updateProgress();
  }
  function updateProgress(){
    const reviewed=state().checks.filter(Boolean).length;
    $("wbProgress").textContent=reviewed+" / "+plan.steps.length;
    $("wbProgressFill").style.width=(reviewed/plan.steps.length*100)+"%";
    $("wbProgressFill").parentElement.setAttribute("aria-valuenow",String(reviewed));
    $("wbProgressText").textContent=reviewed+" of "+plan.steps.length+" steps marked reviewed. This does not establish verification.";
  }
  function updateLink(){
    const url=new URL(location.href);
    url.search="";
    url.searchParams.set("concern",concern.value);
    url.searchParams.set("region",region.value);
    url.hash="";
    history.replaceState(null,"",url.pathname+url.search);
  }
  function render(){
    if(!catalog)return;
    plan=model.getPlan(catalog,{concern:concern.value,region:region.value});
    $("wbQuestion").textContent=plan.concern.short;
    $("wbQuestionDetail").textContent=plan.concern.description;
    $("wbRegionName").textContent=plan.region.label;
    renderSources();renderSteps();updateLink();
    setStatus("Plan updated for "+plan.concern.label+" in "+plan.region.label+".");
  }
  for(const control of [concern,region])control.addEventListener("change",render);
  stepsEl.addEventListener("change",e=>{
    const article=e.target.closest("[data-step]");
    if(article && e.target.matches('input[type="checkbox"]')){
      state().checks[Number(article.dataset.step)]=e.target.checked;
      updateProgress();
    }
  });
  stepsEl.addEventListener("input",e=>{
    const article=e.target.closest("[data-step]");
    if(article && e.target.matches("textarea"))state().notes[Number(article.dataset.step)]=e.target.value;
  });
  $("wbReset").addEventListener("click",()=>{
    if(!plan)return;
    states.delete(key());renderSteps();
    setStatus("Review checks and worksheet notes cleared for this selection.");
  });
  $("wbDownload").addEventListener("click",()=>{
    if(!plan)return;
    const data=state();
    const markdown=model.createWorksheet(plan,data.checks,data.notes);
    const file=new Blob([markdown],{type:"text/markdown;charset=utf-8"});
    const url=URL.createObjectURL(file);
    const anchor=document.createElement("a");anchor.href=url;anchor.download="poisoners-research-"+concern.value+"-"+region.value+".md";
    document.body.appendChild(anchor);anchor.click();anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setStatus("Worksheet downloaded to this device. No notes were sent to POISONERS.");
  });
  $("wbShare").addEventListener("click",async()=>{
    if(!plan)return;
    try{
      if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");
      await navigator.clipboard.writeText(location.href);
      setStatus("Research selection link copied. Your worksheet notes are not included.");
    }catch(_){setStatus("Copy this page's URL from the address bar. Notes never appear in the URL.");}
  });
  $("wbPrint").addEventListener("click",()=>window.print());
  fetch("public-record-portals.json").then(r=>{
    if(!r.ok)throw Error("Catalog not available");
    return r.json();
  }).then(data=>{
    if(!Array.isArray(data.portals)||!data.reviewed_on)throw Error("Catalog invalid");
    catalog=data;render();
  }).catch(()=>{
    setStatus("Official record catalog could not be loaded.");
    sourceList.innerHTML='<div class="wb-source-empty"><strong>Research source list unavailable.</strong><p>Use the published directory and its verified source links directly.</p><a href="public-records.html">OPEN OFFICIAL RECORDS DIRECTORY ↗</a></div>';
    $("wbSourceSummary").textContent="Source catalog unavailable — no live conclusions shown.";
  });
})();
