/* POISONERS chemical matrix: display-only profiles; intentionally no harm score. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=v=>Number(v).toLocaleString("en-US",{maximumFractionDigits:1});
const categories={"ALL":"All chemical families",sulfur:"Sulfur gases and acid mist",nitrogen:"Nitrogen oxides",metal:"Metals and metalloids",particle:"Particulate pollution","acid-gas":"Acid gases",odorous:"Odorous industrial gases",organic:"Organic air toxics"};
let db=null;
function sourceLink(s){return '<a class="ch-source" data-source-url="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+" ↗</a>"}
function applyLinks(){document.querySelectorAll("a[data-source-url]").forEach(a=>{a.href=a.dataset.sourceUrl})}
function stats(){
 const e=db.headline_sets.find(x=>x.id==="eia-2025-power-chp"), a=db.headline_sets.find(x=>x.id==="epa-2024-covered-power");
 $("chHeadline").innerHTML=e.figures.map(f=>'<article class="ch-stat"><div class="ch-stat-head"><span>'+esc(f.label)+" · 2025</span><span>EIA / UNITED STATES</span></div><strong>"+num(f.value)+'</strong><div class="ch-unit">metric tonnes / year</div><p>'+esc(e.scope)+'</p></article>').join("")+
 '<article class="ch-stat"><div class="ch-stat-head"><span>Hg · 2024</span><span>EPA / COVERED UNITS</span></div><strong>'+num(a.figures.find(f=>f.chemical_id==="hg").value)+'</strong><div class="ch-unit">US short tons / year</div><p>Mercury includes regulated power units. Separate 2024 coverage and units: this is not comparable to 2025 EIA totals.</p></article>';
 $("chLegacy").innerHTML=a.figures.map(f=>'<div><span>'+esc(f.label)+' · 2024</span><strong>'+num(f.value)+' short tons</strong><small>'+Math.abs(f.percent_change_2010)+'% lower than 2010 · covered EPA power units</small></div>').join("");
 $("chScope").textContent=e.scope+" — EIA 2025, metric tonnes. Mercury is from EPA covered-unit 2024 short-ton data, not from this EIA inventory.";
}
function hazardTags(c){return c.harm.map(x=>'<span class="ch-tag">'+esc(x.replaceAll("-"," "))+"</span>").join("")}
function row(c){
 const sources=c.sources.map(sourceLink).join("");
 const published=db.headline_sets.flatMap(g=>g.figures.filter(f=>f.chemical_id===c.id).map(f=>({g,f})));
 let measured=published.length?published.map(({g,f})=>'<strong>'+num(f.value)+" "+esc(g.unit)+"</strong><small>"+g.year+" · "+(g.id.startsWith("eia")?"EIA power + CHP":"EPA regulated power")+"</small>").join(""):"<strong>NO MATCHED NATIONAL FIGURE</strong><small>Facility-specific records needed; unknown ≠ zero</small>";
 return '<tr><td><div class="ch-name">'+esc(c.name)+'</div><span class="ch-formula">'+esc(c.symbol)+'</span><span class="ch-cas">CAS '+esc(c.cas||"mixture / group")+'</span></td>'+
 '<td><strong>'+esc(c.coal_role)+'</strong><small>'+esc(c.chemistry)+'</small></td>'+
 '<td>'+hazardTags(c)+'<small>'+esc(c.health)+'</small></td>'+
 '<td>'+esc(c.environment)+'<small>Media: '+esc(c.media.join(" / "))+'</small></td>'+
 '<td><strong>'+esc(c.odor)+'</strong><small>'+esc(c.odor_note)+'</small></td>'+
 '<td>'+measured+'<small>'+esc(c.measurement)+'</small>'+sources+'</td></tr>';
}
function rank(c){
 const a=db.headline_sets.find(x=>x.id==="epa-2024-covered-power").figures.find(f=>f.chemical_id===c.id);
 return a?.value??-1;
}
function odorRank(c){const o=c.odor.toLowerCase();if(o.includes("rotten"))return 0;if(o.includes("sharp")||o.includes("pungent"))return 1;if(o.includes("irritant"))return 2;if(o.includes("mixed"))return 3;return 4}
function render(){
 const q=$("chSearch").value.toLocaleLowerCase().trim(),group=$("chFamily").value,order=$("chSort").value;
 const arr=db.compounds.filter(c=>(group==="ALL"||c.family===group)&&(!q||(c.name+" "+c.symbol+" "+c.coal_role+" "+c.health+" "+c.chemistry+" "+c.harm.join(" ")).toLocaleLowerCase().includes(q)));
 arr.sort(order==="mass"?(a,b)=>rank(b)-rank(a)||a.name.localeCompare(b.name):order==="odor"?(a,b)=>odorRank(a)-odorRank(b)||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
 $("chCount").textContent=arr.length+" / "+db.compounds.length+" CHEMICAL ENTRIES · NO UNIVERSAL TOXICITY SCORE";
 $("chRows").innerHTML=arr.length?arr.map(row).join(""):'<tr><td colspan="6" class="ch-empty">No matches. Missing measurements are unknown, never evidence of zero emissions.</td></tr>';
 $("chSortNote").textContent=order==="mass"?"The mass sort only orders NOₓ, SO₂ and Hg within EPA's 2024 covered-power scope (US short tons); all remaining compounds have no matched mass and sort alphabetically after them. It is NOT a toxicity ranking.":
 order==="odor"?"“Stank” groups qualitative odor descriptions, NOT measured odor thresholds, toxicity or safety. Mercury, lead and arsenic can be hazardous without any reliable smell.":
 "A–Z is not a hazard rank. Use the documented pathways, species and receptors for research triage.";
 applyLinks();
}
function init(d){
 if(!Array.isArray(d.compounds)||!Array.isArray(d.headline_sets))throw Error("Invalid catalog");
 db=d;
 for(const [id,label] of Object.entries(categories)){const opt=document.createElement("option");opt.value=id;opt.textContent=label;$("chFamily").append(opt)}
 stats();render();
 $("chSearch").addEventListener("input",render);
 $("chFamily").addEventListener("change",render);
 $("chSort").addEventListener("change",render);
}
fetch("chemical-hazards.json").then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(init).catch(()=>{
 $("chCount").textContent="CHEMICAL DATA UNAVAILABLE";
 $("chRows").innerHTML='<tr><td colspan="6">Open <a href="chemical-hazards.json">the documented source JSON</a> directly or use a local HTTP server.</td></tr>';
});
})();
