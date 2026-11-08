/* EPA 2024 Form R facility ledger. Specific chemical + medium mass, never toxicity or guilt scores. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const decimal=n=>typeof n==="number"?n.toLocaleString("en-US",{maximumFractionDigits:7}):"NOT REPORTED";
function record(r){
 const unit=esc(r.unit),release=v=>decimal(v)+" "+unit;
 return '<tr><td><strong>'+esc(r.facility_name)+'</strong><small>TRIFID '+esc(r.trifid)+' · '+esc(r.reporting_year)+'</small></td>'+
 '<td><strong>'+esc(r.chemical_reported)+'</strong><small>EPA TRI chemical ID '+esc(r.tri_chemical_id||r.cas_number||"unreported")+' · CAS/category '+esc(r.cas_number||"unreported")+'</small></td>'+
 '<td>'+release(r.onsite_air_fugitive)+'<small>Fugitive air</small>'+release(r.onsite_air_stack)+'<small>Stack air</small></td>'+
 '<td>'+release(r.onsite_water)+'<small>Surface water — not a concentration</small></td>'+
 '<td><strong>'+esc(r.cohort_company)+'</strong><small>'+esc(r.reported_parent)+' · reviewed 2024 site link</small></td>'+
 '<td><small>EPA Form R '+esc(r.document_control_number)+'</small><a class="ch-source" href="https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv" target="_blank" rel="noopener noreferrer">Original EPA Texas CSV ↗</a></td></tr>';
}
const highlights=[
 {cas:"71-43-2",label:"BENZENE · AIR",field:"onsite_air_total"},
 {cas:"7647-01-0",label:"HYDROCHLORIC ACID FORMS · AIR",field:"onsite_air_total"},
 {cas:"7664-93-9",label:"SULFURIC ACID AEROSOL · AIR",field:"onsite_air_total"},
 {cas:"N511",label:"NITRATE COMPOUNDS · WATER",field:"onsite_water"}
];
function populate(d){
 const count=d.records.length;
 $("facilityFileStatus").textContent=d.source_status==="awaiting_official_csv_import"?"OFFICIAL FILE NOT YET IMPORTED":d.source_status==="official_csv_processed_no_approved_form_r_rows"?"PROCESSED — NO MATCHED VERIFIED ROWS":count+" SOURCE-LINKED 2024 EPA FORM R RECORD"+(count===1?"":"S");
 $("facilityScope").textContent="EPA TRI "+d.reporting_year+" · "+(d.source.source_file_sha256?"SHA-256 "+d.source.source_file_sha256.slice(0,16)+"… · retrieved "+d.source.source_retrieved_on:"no source file ingested")+" · "+d.coverage.number_of_approved_facility_links+" reviewed facility identity/parent";
 const table=$("facilityRows"),empty=$("facilityEmpty"),stats=$("facilityStats");
 if(!count){table.innerHTML="";stats.textContent="No official chemical measurements imported; absence is NOT zero emissions.";empty.hidden=false;empty.textContent="No official reporting-year chemical-release records have been imported for the reviewed facility. This is a source-ingestion gap, NOT zero emissions.";$("facilityTableWrap").hidden=true;return;}
 if(!/^([a-f0-9]{64})$/.test(d.source.source_file_sha256)||!d.source.source_origin_url?.startsWith("https://data.epa.gov/"))throw Error("Source hash and EPA original download origin required");
 stats.innerHTML=highlights.map(item=>{
  const match=d.records.find(r=>r.cas_number===item.cas);
  const value=match?decimal(match[item.field])+" "+esc(match.unit):"NOT IMPORTED";
  return '<div><span>'+esc(item.label)+'</span><strong>'+value+'</strong></div>';
 }).join("");
 empty.hidden=true;$("facilityTableWrap").hidden=false;
 const search=$("facilityQuery"),sort=$("facilitySort");
 const paint=()=>{
  const q=search.value.trim().toLowerCase(),kind=sort.value;
  const rows=d.records.filter(r=>(r.facility_name+" "+r.chemical_reported+" "+r.cas_number+" "+r.tri_chemical_id+" "+r.cohort_company).toLowerCase().includes(q)).slice();
  if(kind==="air"||kind==="water"){
    const field=kind==="air"?"onsite_air_total":"onsite_water";
    rows.sort((a,b)=>(b[field]??-1)-(a[field]??-1)||a.chemical_reported.localeCompare(b.chemical_reported));
  }else rows.sort((a,b)=>a.chemical_reported.localeCompare(b.chemical_reported));
  table.innerHTML=rows.length?rows.map(record).join(""):'<tr><td colspan="6">No matching imported records. Search absence does not indicate zero emissions.</td></tr>';
  $("facilityVisible").textContent=rows.length+" of "+count+" source-matched Form R records, 2024 EPA Texas · sorting is release mass, NOT toxicity or a whole-company inventory";
 };
 search.addEventListener("input",paint);sort.addEventListener("change",paint);paint();
}
fetch("tri-facility-releases.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(d=>{
 if(!Array.isArray(d.records)||!d.source||!d.coverage)throw Error("Invalid TRI evidence schema");populate(d);
}).catch(()=>{
 $("facilityFileStatus").textContent="RELEASE DATA UNAVAILABLE";
 $("facilityEmpty").hidden=false;
 $("facilityEmpty").textContent="Source file could not be loaded or passed integrity checks. Open tri-facility-releases.json directly; do not infer zero emissions.";
});
})();
