/* POISONERS Rank Lab UI — source-bounded public data, no inferred harms.
 * All filtering and sorting are client-side; no data or private notes are submitted.
 */
(() => {
 "use strict";
 const model=window.POISON_RANK_MODEL,$=id=>document.getElementById(id);
 if(!model||!$("rkMain")&&!$("rankMain"))return;
 const required=["rkCohortTabs","rkSearch","rkMetric","rkDirection","rkSecondary","rkSecondaryDirection","rkTertiary","rkTertiaryDirection","rkLimit","rkFacetGrid","rkMin","rkMax","rkOnlyKnown","rkMissingOnly","rkAddRule","rkRuleList","rkSummary","rkExportAll","rkReset","rkCopyLink","rkSaveView","rkSavedViews","rkDeleteSaved","rkCsv","rkJson","rkColumns","rkTableHead","rkTableBody","rkResultsTitle","rkResultsCount","rkAvailable","rkWarning","rkBoundary","rkInspect","rkCompare","rkRowsShown","rkActionStatus","rkMeasureDescription"];
 if(required.some(x=>!$(x)))return;
 const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const safeUrl=x=>{try{const u=new URL(x,location.href);return ["https:","http:"].includes(u.protocol)||u.origin===location.origin&&u.protocol==="file:"?u.href:null}catch{return null}};
 const fmt=(value,field,row)=>{
  if(value===null||value===undefined||value==="")return "UNKNOWN";
  if(field.type!=="number")return String(value);
  const n=Number(value),digits=["annual","cumulative","territorial","paid","paidAdjusted","obligationMin","obligationMax","adjustedMin","adjustedMax","pay","mass"].includes(field.id)?2:0;
  const cur=row.currency||"USD";
  const pre=field.unit==="USD"||field.unit==="original currency"?(({USD:"$",BRL:"R$",CAD:"C$",INR:"₹"})[cur]||cur+" "):"";
  return pre+n.toLocaleString("en-US",{maximumFractionDigits:digits})+
   (["annual","cumulative","territorial"].includes(field.id)?" MtCO₂e":field.id==="mass"?" "+row.cohort.split(" · ").at(-1):"");
 };
 const allowed=new Set(Object.keys(model.datasets));
 const urlParams=new URLSearchParams(location.search),initialCohort=allowed.has(urlParams.get("dataset"))?urlParams.get("dataset"):"companies";
 const state={cohort:initialCohort,config:{},selected:null,pins:[],columnMap:{},data:null,rows:null,result:null,initial:true};
 const storeKey="poisoners:ranklab:views:v1";
 let saved=[];
 try{const s=JSON.parse(localStorage.getItem(storeKey)||"[]");saved=Array.isArray(s)?s.filter(v=>allowed.has(v.cohort)&&v.config):[]}catch{}
 const status=message=>{$("rkActionStatus").textContent=message};
 function getDefault(cohort){
   const schema=model.datasets[cohort];
   const out={metric:schema.fields[0].id,secondary:null,tertiary:null,direction:"desc",secondaryDirection:"asc",tertiaryDirection:"asc",query:"",facets:{},limit:25,min:null,max:null,onlyKnown:false,missingOnly:false,rules:[]};
   for(const f of schema.facets)out.facets[f]="ALL";
   if(cohort==="payments")out.facets.currency="USD";
   if(cohort==="observations")out.facets.cohort=model.facetsFor(cohort,state.rows[cohort]).cohort.find(x=>x!=="ALL")||"ALL";
   return out;
 }
 function readURL(cohort){
   const p=new URLSearchParams(location.search);
   const cfg=getDefault(cohort),schema=model.datasets[cohort];
   const fieldSet=new Set(schema.fields.map(f=>f.id));
   if(fieldSet.has(p.get("metric")))cfg.metric=p.get("metric");
   if(fieldSet.has(p.get("secondary"))&&p.get("secondary")!==cfg.metric)cfg.secondary=p.get("secondary");
   if(p.get("direction")==="asc")cfg.direction="asc";
   if(p.get("secondaryDirection")==="desc")cfg.secondaryDirection="desc";
   if(fieldSet.has(p.get("tertiary"))&&p.get("tertiary")!==cfg.metric&&p.get("tertiary")!==cfg.secondary)cfg.tertiary=p.get("tertiary");
   if(p.get("tertiaryDirection")==="desc")cfg.tertiaryDirection="desc";
   cfg.query=(p.get("q")||"").slice(0,150);
   const allowedLimit=[10,25,50,100,"all"];let l=p.get("limit");if(allowedLimit.includes(l))cfg.limit=l==="all"?"all":Number(l);
   for(const f of schema.facets){const v=p.get(f);if(v&&model.facetsFor(cohort,state.rows[cohort])[f].includes(v))cfg.facets[f]=v;}
   for(const name of ["min","max"]){const v=p.get(name);if(v!==null&&v!==""&&Number.isFinite(Number(v)))cfg[name]=Number(v);}
   cfg.onlyKnown=p.get("known")==="1";
   cfg.missingOnly=p.get("missing")==="1";
   cfg.rules=p.getAll("rule").slice(0,4).map(v=>{
     const [field,operator,value]=v.split("|");return {field,operator,value:value??""};
   });
   return model.safeConfig(cohort,cfg);
 }
 function writeURL(){
   const u=new URL(location.href),p=u.searchParams,c=state.config;
   for(const n of [...p.keys()])if(n==="dataset"||n==="metric"||n==="secondary"||n==="direction"||n==="secondaryDirection"||n==="tertiary"||n==="tertiaryDirection"||n==="q"||n==="limit"||n==="min"||n==="max"||n==="known"||n==="missing"||n==="rule"||Object.keys(model.datasets).some(d=>model.datasets[d].facets.includes(n)))p.delete(n);
   p.set("dataset",state.cohort);p.set("metric",c.metric);p.set("direction",c.direction);
   if(c.secondary)p.set("secondary",c.secondary);
   if(c.secondaryDirection==="desc")p.set("secondaryDirection",c.secondaryDirection);
   if(c.tertiary)p.set("tertiary",c.tertiary);
   if(c.tertiaryDirection==="desc")p.set("tertiaryDirection",c.tertiaryDirection);
   if(c.query)p.set("q",c.query);
   if(c.limit!==25)p.set("limit",c.limit);
   for(const [k,v] of Object.entries(c.facets))if(v!=="ALL")p.set(k,v);
   if(c.min!==null&&c.min!=="")p.set("min",c.min);
   if(c.max!==null&&c.max!=="")p.set("max",c.max);
   if(c.onlyKnown)p.set("known","1");
   if(c.missingOnly)p.set("missing","1");
   for(const rule of c.rules||[])p.append("rule",[rule.field,rule.operator,rule.value??""].join("|"));
   history.replaceState(null,"",u);
 }
 function fieldOptions(select,selected,secondary=false){
   const schema=model.datasets[state.cohort];
   const options=secondary?[{id:"",label:"None / stable ID",type:"text"},...schema.fields]:schema.fields;
   select.replaceChildren();
   for(const f of options){
     const o=document.createElement("option");o.value=f.id;o.textContent=f.label+(f.type==="number"&&f.unit?" · "+f.unit:"");
     if(f.id===selected)o.selected=true;
     select.appendChild(o);
   }
 }
 function facetControls(){
   const schema=model.datasets[state.cohort],facets=model.facetsFor(state.cohort,state.rows[state.cohort]);
   $("rkFacetGrid").replaceChildren();
   for(const f of schema.facets){
     const label=document.createElement("label");label.className="rk-control";
     const title=document.createElement("span");title.textContent=f==="cohort"?"SAME SOURCE / YEAR / UNIT":f.replace(/([A-Z])/g," $1").toUpperCase()+" FILTER";
     const sel=document.createElement("select");sel.dataset.facet=f;sel.setAttribute("aria-label",title.textContent);
     for(const v of facets[f]){
       const opt=document.createElement("option");opt.value=v;opt.textContent=v==="ALL"?"All "+f.replace(/([A-Z])/g," $1").toLowerCase()+" values":v;sel.appendChild(opt);
     }
     sel.value=state.config.facets[f]||"ALL";
     sel.addEventListener("change",()=>{state.config.facets[f]=sel.value;state.selected=null;state.pins=[];render()});
     label.append(title,sel);$("rkFacetGrid").append(label);
   }
 }
 function renderRules(){
   const fields=model.datasets[state.cohort].fields;
   const numericOps=[["gte","≥ at least"],["lte","≤ at most"],["gt","> greater than"],["lt","< less than"],["eq","= exactly"]];
   const options=[["present","Value known"],["missing","Value missing"]];
   $("rkAddRule").disabled=(state.config.rules||[]).length>=4;
   $("rkRuleList").innerHTML=(state.config.rules||[]).map((rule,i)=>{
     const f=fields.find(x=>x.id===rule.field)||fields[0];
     const operators=f.type==="number"?[...options,...numericOps]:options;
     const fieldSelect=fields.map(x=>'<option value="'+esc(x.id)+'"'+(x.id===f.id?" selected":"")+'>'+esc(x.label)+'</option>').join("");
     const opSelect=operators.map(([id,label])=>'<option value="'+esc(id)+'"'+(id===rule.operator?" selected":"")+'>'+esc(label)+'</option>').join("");
     const noNumber=["present","missing"].includes(rule.operator);
     return '<div class="rk-rule-row" data-rule-index="'+i+'"><span class="rk-rule-order">AND '+(i+1)+'</span>'+
       '<label class="rk-control"><span>FIELD</span><select data-rule-field="'+i+'">'+fieldSelect+'</select></label>'+
       '<label class="rk-control"><span>CONDITION</span><select data-rule-op="'+i+'">'+opSelect+'</select></label>'+
       '<label class="rk-control"><span>THRESHOLD</span><input data-rule-value="'+i+'" type="number" step="any"'+(noNumber?' disabled placeholder="Not needed"':' value="'+esc(rule.value??0)+'"')+'></label>'+
       '<button type="button" data-rule-remove="'+i+'" aria-label="Remove filter rule '+(i+1)+'">REMOVE ×</button></div>';
   }).join("")||'<p class="rk-rule-empty">No extra rules. Add up to four independent value or evidence-availability conditions.</p>';
 }
 function renderControls(){
   $("rkSearch").value=state.config.query;
   $("rkDirection").value=state.config.direction;
   $("rkSecondaryDirection").value=state.config.secondaryDirection;
   $("rkTertiaryDirection").value=state.config.tertiaryDirection;
   $("rkLimit").value=String(state.config.limit);
   $("rkMin").value=state.config.min??"";$("rkMax").value=state.config.max??"";
   $("rkOnlyKnown").checked=state.config.onlyKnown;
   $("rkMissingOnly").checked=state.config.missingOnly;
   fieldOptions($("rkMetric"),state.config.metric);
   fieldOptions($("rkSecondary"),state.config.secondary,true);
   fieldOptions($("rkTertiary"),state.config.tertiary,true);
   $("rkCohortHeadline").textContent=model.datasets[state.cohort].label;
   const def=model.datasets[state.cohort].fields.find(f=>f.id===state.config.metric);
   const numeric=def.type==="number";
   $("rkMin").disabled=!numeric;$("rkMax").disabled=!numeric;$("rkOnlyKnown").disabled=!numeric;$("rkMissingOnly").disabled=!numeric;
   $("rkMeasureDescription").textContent=def.meaning||model.descriptions[state.cohort];
   facetControls();
   renderRules();
   renderColumns();
 }
 function renderTabs(){
   $("rkCohortTabs").innerHTML=Object.entries(model.datasets).map(([id,s],i)=>
    '<button type="button" class="rk-tab'+(id===state.cohort?" is-active":"")+'" data-cohort="'+esc(id)+'" aria-pressed="'+String(id===state.cohort)+'">'+
    '<span>'+String(i+1).padStart(2,"0")+' / '+state.rows[id].length+' RECORDS</span><strong>'+esc(s.label)+'</strong></button>').join("");
 }
 function defaultColumns(){
   const fields=model.datasets[state.cohort].fields;
   const defaults=fields.slice(0,Math.min(5,fields.length)).map(x=>x.id);
   return state.columnMap[state.cohort]||defaults;
 }
 function renderColumns(){
   const list=defaultColumns();
   $("rkColumns").innerHTML=model.datasets[state.cohort].fields.map(f=>'<label class="rk-column-check"><input type="checkbox" data-col="'+esc(f.id)+'"'+(list.includes(f.id)?" checked":"")+'><span>'+esc(f.label)+'</span></label>').join("");
 }
 function inspect(row){
   if(!row){$("rkInspect").innerHTML='<span class="kicker">02 / SOURCE INSPECTOR</span><p>Choose a record to see its source, metric values and accounting boundary. Pin two records to compare within this dataset.</p>';return}
   const schema=model.datasets[state.cohort];
   const fields=schema.fields.map(f=>{
     const v=row[f.id],value=fmt(v,f,row);
     return '<div><small>'+esc(f.label.toUpperCase())+'</small><strong>'+esc(value)+'</strong></div>';
   }).join("");
   const source=safeUrl(row.source),internal=row.link&&row.link.match(/^[a-z0-9-]+\.html(?:\?[^#]*)?(?:#[a-z0-9-]+)?$/)?row.link:null;
   $("rkInspect").innerHTML=
    '<span class="kicker">02 / AUDIT THE INDIVIDUAL RECORD</span><h4>'+esc(row.name||row.entity||row.company||row.chemical||row.id)+'</h4>'+
    '<p>'+esc(row.boundary||model.descriptions[state.cohort])+'</p>'+
    '<div class="rk-inspect-list">'+fields+'</div>'+
    '<div class="rk-inspect-links">'+(source?'<a href="'+esc(source)+'" target="_blank" rel="noopener noreferrer">READ PRIMARY SOURCE ↗</a>':"")+
    (internal?'<a href="'+esc(internal)+'">OPEN DETAILED RESEARCH ↗</a>':"")+'</div>'+
    '<p>Missing data is not zero. The record does not imply that an identifiable person caused harm, committed misconduct, or owes damages.</p>';
 }
 function compare(){
   if(state.result?.warning){
     $("rkCompare").innerHTML='<span class="kicker">03 / COMPARISON ON HOLD</span><p>Choose a single compatible reporting cohort before comparing numerical values. '+esc(state.result.warning)+'</p>';
     return;
   }
   const rows=state.pins.map(id=>state.rows[state.cohort].find(x=>x.id===id)).filter(Boolean);
   if(rows.length<2){$("rkCompare").innerHTML='<span class="kicker">03 / SIDE-BY-SIDE</span><p>Pin two records within this same dataset to compare the selected dimension. The comparison does not establish causation or wrongdoing.</p>';return}
   const f=model.datasets[state.cohort].fields.find(x=>x.id===state.config.metric);
   const name=x=>x.name||x.entity||x.company||x.chemical||x.id;
   const cards=rows.map(row=>'<div><strong>'+esc(name(row))+'</strong><span>'+esc(fmt(row[f.id],f,row))+'</span><small>'+esc(row.boundary)+'</small></div>').join("");
   $("rkCompare").innerHTML='<div class="rk-compare-title"><div><span class="kicker">03 / TWO-RECORD COMPARISON</span><h4>'+esc(f.label)+'</h4></div><button type="button" id="rkClearPins">CLEAR PINS ×</button></div>'+
     '<div class="rk-compare-cards">'+cards+'</div><p>'+esc(f.meaning||model.descriptions[state.cohort])+' · Visual juxtaposition does not mean the underlying events, legal remedies, periods or jurisdictions are interchangeable.</p>';
   $("rkClearPins").addEventListener("click",()=>{state.pins=[];renderTable();compare()});
 }
 function renderSummary(){
   const r=state.result,f=r.field,s=r.summary,node=$("rkSummary");
   if(r.warning){node.innerHTML='<p class="rk-summary-note"><strong>COMPARISON PAUSED</strong> — select a common unit / reporting cohort before displaying distribution statistics.</p>';return;}
   if(!s){node.innerHTML='<p class="rk-summary-note"><strong>CATEGORICAL ORDER</strong> — alphabetical/category sorts do not have numeric percentiles or magnitude ranks.</p>';return;}
   if(!s.known){node.innerHTML='<p class="rk-summary-note"><strong>NO MEASURED VALUES</strong> — the selected filters have no comparable numeric observations. Missing is not zero.</p>';return;}
   const row=r.rows[0]||{currency:state.config.facets.currency||"USD",cohort:state.config.facets.cohort||""};
   const cell=(label,v)=>'<div><small>'+esc(label)+'</small><strong>'+esc(fmt(v,f,row))+'</strong></div>';
   node.innerHTML='<div class="rk-summary-meta"><strong>FILTERED COHORT DISTRIBUTION</strong><span>'+s.known+' KNOWN · '+s.missing+' UNKNOWN · ALL MATCHES, NOT ONLY TOP '+esc(String(state.config.limit))+'</span></div>'+
      '<div class="rk-summary-grid">'+cell("MINIMUM",s.min)+cell("25TH PERCENTILE",s.p25)+cell("MEDIAN",s.median)+cell("75TH PERCENTILE",s.p75)+cell("MAXIMUM",s.max)+'</div>'+
      '<p class="rk-summary-note">Each statistic describes this filtered numeric column only. It is not a composite impact index, an additive legal award, or a causal finding.</p>';
 }
 function renderTable(){
   const result=state.result,schema=model.datasets[state.cohort],field=schema.fields.find(f=>f.id===state.config.metric);
   const visible=new Set(defaultColumns());visible.add(state.config.metric);
   const columns=schema.fields.filter(f=>visible.has(f.id));
   const headers='<tr><th scope="col">RANK</th><th scope="col">RECORD / SOURCE</th>'+
    columns.map(f=>'<th scope="col"><button type="button" class="rk-th-button" data-sort="'+esc(f.id)+'" title="Sort by '+esc(f.label)+'">'+esc(f.label)+(state.config.metric===f.id?" "+(state.config.direction==="desc"?"↓":"↑"):"")+'</button></th>').join("")+'<th scope="col">PIN</th></tr>';
   $("rkTableHead").innerHTML=headers;
   const numeric=result.appliedMetric;
   const values=result.rows.map(r=>r[field.id]).filter(v=>typeof v==="number"&&Number.isFinite(v)&&v>=0);
   const max=values.length?Math.max(...values):0;
   const rows=result.rows.map(r=>{
     const title=r.name||r.entity||r.company||r.chemical||r.id;
     const rank=r.rank===null?'<span class="rk-unranked">—</span>':String(r.rank).padStart(2,"0");
     const cols=columns.map(f=>{
       const v=r[f.id],label=fmt(v,f,r);
       const val=typeof v==="number"&&Number.isFinite(v);
       const bar=numeric&&f.id===state.config.metric&&max>0&&val&&v>=0?
         '<div class="rk-microbar" aria-hidden="true"><i style="width:'+(v/max*100).toFixed(2)+'%"></i></div>':"";
       return '<td'+(f.type==="number"?' class="rk-number"':'')+'>'+esc(label)+bar+'</td>';
     }).join("");
     const pin=state.pins.includes(r.id);
     return '<tr'+(state.selected===r.id?' class="is-selected"':'')+'><td class="rk-rank">'+rank+'</td><td class="rk-name"><button type="button" data-inspect="'+esc(r.id)+'">'+esc(title)+' ↗</button></td>'+
     cols+'<td><button type="button" class="rk-pin" data-pin="'+esc(r.id)+'" aria-pressed="'+String(pin)+'"'+(result.warning?' disabled title="Choose a comparable cohort first"':'')+'>'+(pin?"PINNED ✓":"PIN +")+'</button></td></tr>';
   }).join("");
   $("rkTableBody").innerHTML=rows||'<tr><td class="rk-empty" colspan="'+(columns.length+3)+'">No records match these filters. Unknown or omitted records are not evidence of zero harm.</td></tr>';
   $("rkRowsShown").textContent="SHOWING "+result.rows.length+" OF "+result.total+" MATCHES · "+result.skipped+" HIDDEN BY ROW LIMIT";
   $("rkResultsCount").textContent=result.total+" MATCHED RECORDS / "+state.rows[state.cohort].length+" IN COHORT";
   $("rkAvailable").textContent=field.type==="number"?result.available+" NUMERIC VALUES · "+(result.total-result.available)+" UNAVAILABLE":"TEXT/CATEGORY ORDER · NO NUMERIC RANK";
 }
 function render(){
   if(!state.rows)return;
   state.config=model.safeConfig(state.cohort,state.config);
   const def=model.datasets[state.cohort].fields.find(f=>f.id===state.config.metric);
   if(def.type!=="number"){state.config.min=null;state.config.max=null;state.config.onlyKnown=false;state.config.missingOnly=false;}
   state.result=model.rank(state.cohort,state.rows[state.cohort],state.config);
   const r=state.result,warning=r.warning;
   $("rkWarning").hidden=!warning;
   if(warning)$("rkWarning").textContent="COMPARABILITY GATE — "+warning+" Numeric ranks are withheld until a valid cohort is selected.";
   $("rkResultsTitle").textContent=def.label;
   $("rkBoundary").textContent=model.datasets[state.cohort].unit_note;
   renderControls();renderTabs();renderSummary();renderTable();
   let selected=state.rows[state.cohort].find(x=>x.id===state.selected);
   if(selected&&!r.rows.some(x=>x.id===selected.id))selected=null;
   inspect(selected);compare();writeURL();
 }
 function switchTo(cohort,cfg){
   if(!allowed.has(cohort))return;
   state.cohort=cohort;state.config=cfg||getDefault(cohort);
   state.selected=null;state.pins=[];render();
 }
 function changeField(id){
   const meta=model.datasets[state.cohort].fields.find(f=>f.id===id);if(!meta)return;
   state.config.metric=id;state.config.min=null;state.config.max=null;state.config.onlyKnown=false;
   if(state.config.secondary===id)state.config.secondary=null;
   if(state.config.tertiary===id)state.config.tertiary=null;
   state.pins=[];render();
 }
 function exportRows(){
   return $("rkExportAll").checked?model.rank(state.cohort,state.rows[state.cohort],{...state.config,limit:"all"}):state.result;
 }
 function getCsv(){
   const def=model.datasets[state.cohort],result=exportRows();
   const columns=[{id:"rank",label:"Rank within selected metric (blank if incomparable/unknown)"},{id:"id",label:"Source record ID"},...def.fields];
   return "\ufeff"+model.csv(result.rows,columns);
 }
 function download(filename,contents,mime){
   const blob=new Blob([contents],{type:mime}),url=URL.createObjectURL(blob);
   const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),1200);
 }
 function safeSaved(){
   try{localStorage.setItem(storeKey,JSON.stringify(saved.slice(0,12)))}catch{}
 }
 function renderSaved(){
   $("rkSavedViews").innerHTML='<option value="">Choose saved view…</option>'+
    saved.map((v,i)=>'<option value="'+i+'">'+esc(v.label)+'</option>').join("");
 }
 function bind(){
   $("rkCohortTabs").addEventListener("click",e=>{const b=e.target.closest("button[data-cohort]");if(b)switchTo(b.dataset.cohort)});
   $("rkSearch").addEventListener("input",e=>{state.config.query=e.target.value;state.selected=null;render()});
   $("rkMetric").addEventListener("change",e=>changeField(e.target.value));
   $("rkDirection").addEventListener("change",e=>{state.config.direction=e.target.value;render()});
   $("rkSecondary").addEventListener("change",e=>{state.config.secondary=e.target.value||null;render()});
   $("rkSecondaryDirection").addEventListener("change",e=>{state.config.secondaryDirection=e.target.value;render()});
   $("rkTertiary").addEventListener("change",e=>{state.config.tertiary=e.target.value||null;render()});
   $("rkTertiaryDirection").addEventListener("change",e=>{state.config.tertiaryDirection=e.target.value;render()});
   $("rkLimit").addEventListener("change",e=>{state.config.limit=e.target.value==="all"?"all":Number(e.target.value);render()});
   for(const id of ["rkMin","rkMax"]){
     $(id).addEventListener("change",e=>{state.config[id==="rkMin"?"min":"max"]=e.target.value===""?null:Number(e.target.value);render()});
   }
   $("rkOnlyKnown").addEventListener("change",e=>{state.config.onlyKnown=e.target.checked;if(e.target.checked)state.config.missingOnly=false;render()});
   $("rkMissingOnly").addEventListener("change",e=>{state.config.missingOnly=e.target.checked;if(e.target.checked)state.config.onlyKnown=false;render()});
   $("rkAddRule").addEventListener("click",()=>{
     const schema=model.datasets[state.cohort];if((state.config.rules||[]).length>=4)return;
     state.config.rules=[...(state.config.rules||[]),{field:schema.fields[0].id,operator:"present",value:null}];render();
   });
   $("rkRuleList").addEventListener("click",e=>{
     const b=e.target.closest("button[data-rule-remove]");if(!b)return;
     const i=Number(b.dataset.ruleRemove);state.config.rules.splice(i,1);render();
   });
   $("rkRuleList").addEventListener("change",e=>{
     const el=e.target,entry=el.closest("[data-rule-index]");if(!entry)return;
     const i=Number(entry.dataset.ruleIndex),rule=state.config.rules?.[i];if(!rule)return;
     if(el.matches("[data-rule-field]")){
       rule.field=el.value;
       const f=model.datasets[state.cohort].fields.find(x=>x.id===rule.field);
       if(f?.type!=="number"&&!["present","missing"].includes(rule.operator)){rule.operator="present";rule.value=null;}
     }
     if(el.matches("[data-rule-op]")){
       rule.operator=el.value;rule.value=["missing","present"].includes(rule.operator)?null:0;
     }
     if(el.matches("[data-rule-value]"))rule.value=el.value===""?null:Number(el.value);
     render();
   });
   $("rkReset").addEventListener("click",()=>{switchTo(state.cohort);status("Reset this cohort to its source-safe default.")});
   $("rkColumns").addEventListener("change",e=>{
     const input=e.target.closest("input[data-col]");if(!input)return;
     const current=new Set(defaultColumns());
     if(input.checked)current.add(input.dataset.col);else current.delete(input.dataset.col);
     state.columnMap[state.cohort]=[...current];renderTable();
   });
   $("rkTableHead").addEventListener("click",e=>{
     const b=e.target.closest("button[data-sort]");if(!b)return;
     if(state.config.metric===b.dataset.sort)state.config.direction=state.config.direction==="desc"?"asc":"desc";
     else {state.config.metric=b.dataset.sort;state.config.direction=model.datasets[state.cohort].fields.find(x=>x.id===b.dataset.sort).type==="number"?"desc":"asc";state.config.min=null;state.config.max=null;}
     state.pins=[];render();
   });
   $("rkTableBody").addEventListener("click",e=>{
     const pin=e.target.closest("button[data-pin]");
     if(pin){
       const id=pin.dataset.pin;
       if(state.pins.includes(id))state.pins=state.pins.filter(x=>x!==id);
       else state.pins=[...state.pins.slice(-1),id];
       renderTable();compare();return;
     }
     const inspectBtn=e.target.closest("button[data-inspect]");
     if(inspectBtn){state.selected=inspectBtn.dataset.inspect;renderTable();inspect(state.rows[state.cohort].find(x=>x.id===state.selected));$("rkInspect").scrollIntoView({behavior:"smooth",block:"nearest"});}
   });
   $("rkCsv").addEventListener("click",()=>{download("poisoners-"+state.cohort+"-"+state.config.metric+".csv",getCsv(),"text/csv;charset=utf-8");status("Exported the filtered, currently shown rows with metric, source IDs and ranks.")});
   $("rkJson").addEventListener("click",()=>{
     const exported=exportRows();
     const payload={exported_at:new Date().toISOString(),dataset:state.cohort,description:model.descriptions[state.cohort],filters:state.config,
      rank_warning:state.result.warning||null,publication_boundary:model.datasets[state.cohort].unit_note,rank_metric:state.result.field,
      count:exported.total,exported_count:exported.rows.length,records:exported.rows,advisory:"Public records only; no inferred harm, culpability, personal wrongdoing, or aggregate legal damages"};
     download("poisoners-"+state.cohort+"-"+state.config.metric+".json",JSON.stringify(payload,null,2)+"\n","application/json");
     status("Exported source-linked research JSON and explicit comparison limitations.");
   });
   $("rkCopyLink").addEventListener("click",async()=>{
     try{if(!navigator.clipboard?.writeText)throw Error("unavailable");await navigator.clipboard.writeText(location.href);status("Current filter, cohort and sort URL copied.");}
     catch{status("Clipboard unavailable; use your browser's address bar to copy this view.")}
   });
   $("rkSaveView").addEventListener("click",()=>{
     const title=model.datasets[state.cohort].label+" / "+model.datasets[state.cohort].fields.find(f=>f.id===state.config.metric).label+" / "+new Date().toLocaleDateString("en-US");
     saved=[{label:title,cohort:state.cohort,config:JSON.parse(JSON.stringify(state.config))},...saved].slice(0,12);
     safeSaved();renderSaved();status("Saved in this browser only; nothing sent to a server.");
   });
   $("rkSavedViews").addEventListener("change",e=>{
     const i=Number(e.target.value);if(e.target.value===""||!saved[i])return;
     switchTo(saved[i].cohort,JSON.parse(JSON.stringify(saved[i].config)));status("Restored saved ranking view.");
   });
   $("rkDeleteSaved").addEventListener("click",()=>{
     const value=$("rkSavedViews").value;if(value==="")return;
     const i=Number(value);if(!Number.isInteger(i)||!saved[i])return;
     saved.splice(i,1);safeSaved();renderSaved();status("Saved view removed from this browser.");
   });
   document.addEventListener("keydown",e=>{
     if(e.key==="/"&&!["INPUT","SELECT","TEXTAREA"].includes(document.activeElement?.tagName)){e.preventDefault();$("rkSearch").focus();}
     if(e.key==="Escape"&&document.activeElement===$("rkSearch")){state.config.query="";render();}
   });
   window.addEventListener("popstate",()=>{const p=new URLSearchParams(location.search),ds=allowed.has(p.get("dataset"))?p.get("dataset"):"companies";switchTo(ds,readURL(ds));});
 }
 async function start(){
   try{
     const paths=["dossier-register.json","people-register.json","damages-data.json","foundation.json","chemical-hazards.json"];
     const raw=await Promise.all(paths.map(p=>fetch(p).then(r=>{if(!r.ok)throw Error(p+" HTTP "+r.status);return r.json()})));
     state.data={dossiers:raw[0],people:raw[1],payments:raw[2],foundation:raw[3],chemistry:raw[4],seed:window.POISON_DATA};
     state.rows=model.makeRows(state.data);
     const requiredCounts={companies:50,countries:10,people:34,roles:500,metrics:142};
     for(const [name,needed] of Object.entries(requiredCounts))if(state.rows[name].length<needed)throw Error("Unexpected source coverage: "+name);
     $("rkStatCompanies").textContent=state.rows.companies.length;
     $("rkStatCountries").textContent=state.rows.countries.length;
     $("rkStatPeople").textContent=state.rows.people.length;
     $("rkStatMetrics").textContent=state.rows.metrics.length;
     state.config=readURL(state.cohort);
     bind();renderSaved();render();
     status("Source snapshots loaded. All sorting and filters run locally in your browser.");
   }catch(error){
     $("rkResultsTitle").textContent="Could not load local evidence snapshots";
     $("rkResultsCount").textContent="Open the source data links below or serve this site over HTTP.";
     $("rkTableBody").innerHTML='<tr><td colspan="5" class="rk-empty">Public snapshots unavailable. <a href="data-access.html">Access the source records ↗</a>. No fabricated values are shown.</td></tr>';
     status(String(error.message||error));
   }
 }
 start();
})();