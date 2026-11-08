/* Source-audited EPA TRI 2024 Form R facility ledger.
 * Ranking by reported release MASS within one unit is not ranking by toxicity,
 * personal exposure, illegal behavior, or any company-wide outcome.
 */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const decimal=n=>typeof n==="number"&&Number.isFinite(n)?n.toLocaleString("en-US",{maximumFractionDigits:7}):"NOT REPORTED";
const mediumFields={air:"onsite_air_total",fugitive:"onsite_air_fugitive",stack:"onsite_air_stack",water:"onsite_water"};
const siteLink="https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present";
function record(r){
 const unit=esc(r.unit),release=(v)=>decimal(v)+(v===null?"":" "+unit);
 return '<tr><td><strong>'+esc(r.facility_name)+'</strong><small>TRIFID '+esc(r.trifid)+' · '+esc(r.reporting_year)+'</small></td>'+
 '<td><strong>'+esc(r.chemical_reported)+'</strong><small>CAS / TRI ID '+esc(r.cas_number||r.tri_chemical_id||"category not specified")+'</small>'+
 '<small>EPA classification: '+esc(r.tri_classification||"not specified")+'</small></td>'+
 '<td><strong>'+release(r.onsite_air_total)+'</strong><small>Total on-site air (fugitive + stack if both reported)</small>'+
 release(r.onsite_air_fugitive)+'<small>Fugitive air</small>'+release(r.onsite_air_stack)+'<small>Stack air</small></td>'+
 '<td>'+release(r.onsite_water)+'<small>On-site water release — not concentration</small></td>'+
 '<td><strong>'+esc(r.cohort_company)+'</strong><small>'+esc(r.reported_parent)+' · reviewed 2024 identity</small></td>'+
 '<td><small>Form R document '+esc(r.document_control_number)+'</small><a class="ch-source" href="'+siteLink+'" target="_blank" rel="noopener noreferrer">EPA TRI CSV source ↗</a></td></tr>';
}
function csvCell(v){let s=String(v??"");if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
function exportRows(rows,data){
 const fields=["reporting_year","trifid","facility_name","cohort_company","reported_parent",
 "document_control_number","chemical_reported","cas_number","tri_chemical_id","tri_classification","unit",
 "onsite_air_fugitive","onsite_air_stack","onsite_air_total","onsite_water"];
 const header=[...fields,"source_file_sha256","official_source_url"];
 const lines=[header,...rows.map(r=>[...fields.map(k=>r[k]),data.source.source_file_sha256,data.source.download_url||siteLink])];
 const content="\ufeff"+lines.map(x=>x.map(csvCell).join(",")).join("\r\n")+"\r\n";
 const blob=new Blob([content],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob);
 const a=document.createElement("a");a.href=url;a.download="poisoners-tri-2024-reviewed-facility-filtered.csv";
 document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1800);
}
function populate(data){
 const count=data.records.length,manifest=data.source;
 $("facilityFileStatus").textContent=data.source_status==="awaiting_official_csv_import"?"OFFICIAL FILE NOT YET IMPORTED":
  data.source_status==="official_csv_processed_no_approved_form_r_rows"?"SOURCE PROCESSED — NO APPROVED FORM R ROWS":
  count+" SOURCE-CHECKED EPA FORM R ROW"+(count===1?"":"S");
 $("facilityScope").textContent="EPA TRI reporting year "+data.reporting_year+" · "+(manifest.source_file_sha256?
  "SHA-256 "+manifest.source_file_sha256.slice(0,20)+"… · retrieved "+manifest.source_retrieved_on:
  "official CSV not yet ingested")+" · "+data.coverage.number_of_approved_facility_links+" reviewed facility identity.";
 const table=$("facilityRows"),empty=$("facilityEmpty"),wrap=$("facilityTableWrap");
 const search=$("facilityQuery"),unit=$("facilityUnit"),order=$("facilityOrder"),presence=$("facilityPositive"),
  status=$("facilityGuard"),btn=$("facilityExport");
 if(!count){
  table.innerHTML="";empty.hidden=false;wrap.hidden=true;btn.disabled=true;
  empty.textContent="No original EPA reporting-year chemical release entries have been imported for this approved location. Ingestion absence is NOT zero emissions.";
  $("facilityVisible").textContent="0 imported observations; awaiting a fully verified source";
  return;
 }
 empty.hidden=true;wrap.hidden=false;
 const sourceUnits=new Set(data.records.map(x=>x.unit));
 unit.value=sourceUnits.has("lb")?"lb":sourceUnits.has("g")?"g":"ALL";
 let visible=[];
 function render(){
  const q=search.value.trim().toLocaleLowerCase(),targetUnit=unit.value,key=mediumFields[order.value]||"onsite_air_total";
  const numericSort=Object.hasOwn(mediumFields,order.value);
  const gate=numericSort&&targetUnit==="ALL";
  visible=data.records.filter(r=>{
   const text=[r.facility_name,r.chemical_reported,r.cas_number,r.tri_chemical_id,r.tri_classification,r.cohort_company,r.reported_parent].join(" ").toLowerCase();
   if(q&&!text.includes(q))return false;
   if(targetUnit!=="ALL"&&r.unit!==targetUnit)return false;
   const v=r[key];
   if(presence.value==="POSITIVE"&&!(typeof v==="number"&&v>0))return false;
   if(presence.value==="UNKNOWN"&&v!==null)return false;
   return true;
  });
  if(!gate){
   visible.sort((a,b)=>{
    if(!numericSort)return a.chemical_reported.localeCompare(b.chemical_reported)||a.document_control_number.localeCompare(b.document_control_number);
    const av=a[key],bv=b[key];
    if(av===null&&bv===null)return a.chemical_reported.localeCompare(b.chemical_reported);
    if(av===null)return 1;if(bv===null)return -1;
    return bv-av||a.chemical_reported.localeCompare(b.chemical_reported);
   });
  }
  table.innerHTML=visible.length?visible.map(record).join(""):
    '<tr><td colspan="6">No records match these filters. An absent record is not proof of zero release or clean air/water.</td></tr>';
  $("facilityVisible").textContent=visible.length+" of "+count+" EPA Form R source rows · one facility / 2024 · not a company inventory";
  status.textContent=gate?"COMPARABILITY GATE: pounds and grams are different units. Select one unit before ordering amounts; the source order is shown without a mass rank.":
   "Original EPA Form R reports: on-site air or water quantities only. Raw mass is NOT toxic potency, exposure, illness, culpability or a company-wide score. Zeros may be EPA zero-filled values.";
  btn.disabled=!visible.length;
 }
 for(const control of [search,unit,order,presence])control.addEventListener(control===search?"input":"change",render);
 btn.addEventListener("click",()=>exportRows(visible,data));
 render();
}
fetch("tri-facility-releases.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(d=>{
 if(!Array.isArray(d.records)||!d.source||!d.coverage)throw Error("Invalid TRI evidence schema");
 populate(d);
}).catch(()=>{
 $("facilityFileStatus").textContent="RELEASE DATA UNAVAILABLE";
 $("facilityScope").textContent="Could not load public source snapshot.";
 $("facilityEmpty").textContent="Source file could not be loaded. Open tri-facility-releases.json directly or serve the site over local HTTP.";
 $("facilityExport").disabled=true;
});
})();