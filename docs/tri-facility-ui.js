/* EPA Form R research ledger: presents only imported, source-verified facility records. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const decimal=n=>typeof n==="number"?n.toLocaleString("en-US",{maximumFractionDigits:7}):"NOT REPORTED";
function record(r){
 const unit=esc(r.unit),release=(v)=>decimal(v)+" "+unit;
 return '<tr><td><strong>'+esc(r.facility_name)+'</strong><small>TRIFID '+esc(r.trifid)+' · '+esc(r.reporting_year)+'</small></td>'+
 '<td><strong>'+esc(r.chemical_reported)+'</strong><small>CAS '+esc(r.cas_number||"category/not specified")+'</small></td>'+
 '<td>'+release(r.onsite_air_fugitive)+'<small>Fugitive air</small>'+release(r.onsite_air_stack)+'<small>Stack air</small></td>'+
 '<td>'+release(r.onsite_water)+'<small>Surface water — not a concentration</small></td>'+
 '<td><strong>'+esc(r.cohort_company)+'</strong><small>'+esc(r.reported_parent)+' · reviewed 2024 link</small></td>'+
 '<td><small>Document '+esc(r.document_control_number)+'</small><a class="ch-source" href="https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present" target="_blank" rel="noopener noreferrer">EPA TRI source ↗</a></td></tr>';
}
function populate(d){
 const count=d.records.length;
 $("facilityFileStatus").textContent=d.source_status==="awaiting_official_csv_import"?"OFFICIAL FILE NOT YET IMPORTED":d.source_status==="official_csv_processed_no_approved_form_r_rows"?"PROCESSED — NO MATCHED VERIFIED ROWS":count+" SOURCE-LINKED FORM R ROW"+(count===1?"":"S");
 $("facilityScope").textContent="EPA TRI "+d.reporting_year+" · "+(d.source.source_file_sha256?"SHA-256 "+d.source.source_file_sha256.slice(0,16)+"… · "+"file received "+d.source.source_retrieved_on:"no source file ingested")+" · "+d.coverage.number_of_approved_facility_links+" time-bound facility link(s).";
 const table=$("facilityRows"),empty=$("facilityEmpty");
 if(!count){table.innerHTML="";empty.hidden=false;empty.textContent="No official reporting-year chemical-release records have been imported for the reviewed facility. This is a source-ingestion gap, NOT zero emissions.";$("facilityTableWrap").hidden=true;return;}
 empty.hidden=true;$("facilityTableWrap").hidden=false;
 const search=$("facilityQuery");
 const paint=()=>{
  const q=search.value.trim().toLowerCase();
  const rows=d.records.filter(r=>(r.facility_name+" "+r.chemical_reported+" "+r.cas_number+" "+r.cohort_company).toLowerCase().includes(q));
  table.innerHTML=rows.length?rows.map(record).join(""):'<tr><td colspan="6">No matching imported records. Search absence does not indicate zero emissions.</td></tr>';
  $("facilityVisible").textContent=rows.length+" of "+count+" imported source records (NOT an entire company inventory)";
 };
 search.addEventListener("input",paint);paint();
}
fetch("tri-facility-releases.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(d=>{
 if(!Array.isArray(d.records)||!d.source||!d.coverage)throw Error("Invalid TRI evidence schema");populate(d);
}).catch(()=>{
 $("facilityFileStatus").textContent="RELEASE DATA UNAVAILABLE";
 $("facilityEmpty").textContent="Source file could not be loaded. Open tri-facility-releases.json directly or serve the site with a local HTTP server.";
});
})();
