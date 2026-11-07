/* Source-bound 2024 AEP operator disclosure; no cross-chemical risk score or company rank. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>Number(n).toLocaleString("en-US",{maximumFractionDigits:2});
const media={"air_lb":"Air","water_lb":"Surface water","onsite_land_lb":"On-site land","offsite_transfer_lb":"Off-site transfers"};
const label=r=>r.id==="dioxin-group"?"Dioxins: total grams only, not TEQ":r.chemical;
const caveat=(r,medium)=>{const x=r.unavailable_medium_reason?.[medium];return x==="b_airborne_forms_only_required"?"not required (b)":x==="dioxins_reported_in_grams_separately"?"see grams":x==="a_below_EPA_reporting_level"?"below reporting level (a)":"not available"};
const amount=(r,medium)=>r.reported_medium[medium]==null?'<span class="op-no-data">'+esc(caveat(r,medium))+'</span>':fmt(r.reported_medium[medium])+' lb';
function renderRow(r){
 return '<tr><td><strong>'+esc(label(r))+'</strong><small>'+esc(r.speciation_note||"Company-described chemical group; no species/dose inference")+'</small></td>'+
 Object.keys(media).map(k=>'<td>'+amount(r,k)+'</td>').join("")+
 '<td><strong>'+ (r.reported_total==null?'<span class="op-no-data">below reporting level (a)</span>':fmt(r.reported_total)+" "+r.total_unit)+'</strong>'+(r.rounding_note?'<small>'+esc(r.rounding_note)+'</small>':"")+'</td></tr>';
}
function init(d){
 if(!d||d.report?.id!=="aep-system-tri-disclosure-2024"||!Array.isArray(d.rows))throw Error("Invalid operator report");
 const source=$("opSource");source.href=d.report.source_url;
 const q=$("opSearch"),sort=$("opSort"),count=$("opCount"),tbody=$("opRows"),notice=$("opSortNote");
 const render=()=>{
  const term=q.value.toLocaleLowerCase().trim(),medium=sort.value;
  const rows=d.rows.filter(r=>(r.chemical+" "+r.id+" "+(r.speciation_note||"")).toLocaleLowerCase().includes(term)).slice();
  rows.sort((a,b)=>{
   const x=a.reported_medium[medium],y=b.reported_medium[medium];
   if(x==null&&y!=null)return 1;if(y==null&&x!=null)return -1;
   return (y??0)-(x??0)||a.chemical.localeCompare(b.chemical);
  });
  count.textContent=rows.length+" / "+d.rows.length+" SOURCE-TRANSCRIBED CHEMICAL ROWS • AEP SYSTEM 2024 • PENDING EPA RECONCILIATION";
  notice.textContent="Sorted by "+media[medium].toLowerCase()+" pounds, within this one AEP report only. Dioxins are separately reported in grams and excluded from pound-based sorting. Larger mass is NOT higher toxicity. Null values reflect (a) below reporting level or (b) airborne forms only, not zero.";
  tbody.innerHTML=rows.length?rows.map(renderRow).join(""):'<tr><td colspan="6">No matching substances. Absence from this operator report does not establish zero emissions.</td></tr>';
 };
 q.addEventListener("input",render);sort.addEventListener("change",render);render();
 $("opCoalb").textContent=fmt(d.report.coal_burned_lb)+" pounds of coal burned (context only; not a chemical denominator)";
}
fetch("coal-operator-2024.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(init).catch(()=>{
 $("opCount").textContent="OPERATOR REPORT UNAVAILABLE";
 $("opRows").innerHTML='<tr><td colspan="6">The 2024 disclosure JSON could not be loaded. <a href="coal-operator-2024.json">Read the archived transcription</a>.</td></tr>';
});
})();
