"use strict";
/**
 * Compile public, source-limited emission dossiers from existing evidence records.
 * This is a publication/readiness display model, not a risk, impact or litigation score.
 */
const {validateEvidence,readiness}=require("./index-kernel.cjs");
const makeId=s=>String(s).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const GATES=[
 {id:"source",label:"Documented source",status:"linked",description:"Attributed 2024 producer-linked greenhouse gas observation with dated primary citation"},
 {id:"entity",label:"Legal entity",status:"open",description:"Need independently verified legal name, registration and ownership effective dates"},
 {id:"facility",label:"Facility attribution",status:"open",description:"Need named facility IDs, geographies and source-to-asset boundaries"},
 {id:"release",label:"Chemical release",status:"open",description:"Need site-specific chemical identities and air/water/soil release measurements"},
 {id:"exposure",label:"Exposure pathway",status:"open",description:"Need fate/transport, monitored exposure and receptor baselines"},
 {id:"outcome",label:"Attributable outcome",status:"open",description:"Need endpoint-specific counterfactual and independent scientific review"},
 {id:"counsel",label:"Legal assessment",status:"open",description:"Need jurisdiction, cause of action, standing, remedies and qualified local counsel"}
];
function compile({claims,companies,countries,sources,examples,asOf="2026-11-07"}){
 if(!Array.isArray(claims)||!Array.isArray(companies)||!Array.isArray(countries)||!Array.isArray(sources))throw Error("Expected public source arrays");
 const sourceById=new Map(sources.map(s=>[s.id,s]));
 const countryByCode=new Map(countries.map(c=>[c.code,c]));
 const claimByEntity=new Map();
 for(const claim of claims){
  const errors=validateEvidence(claim);
  if(errors.length)throw Error("Invalid published evidence "+claim.record_id+": "+errors.join("; "));
  if(claimByEntity.has(claim.entity_id))throw Error("Duplicate entity evidence ID "+claim.entity_id);
  if(claim.claim_type!=="emission"||claim.measure.unit!=="MtCO2e"||claim.reporting_period.start!=="2024-01-01"||
     claim.reporting_period.end!=="2024-12-31")throw Error("Dossier seed is strictly the 2024 production-attribution cohort");
  claimByEntity.set(claim.entity_id,claim);
 }
 const seen=new Set();
 const dossiers=companies.map(c=>{
  const id=makeId(c.name);
  if(seen.has(id))throw Error("Duplicate company ID "+id);
  seen.add(id);
  const claim=claimByEntity.get(id);
  if(!claim)throw Error("Missing source record for "+c.name);
  if(claim.measure.value!==c.annual)throw Error("Misaligned 2024 attribution for "+c.name);
  if(!countryByCode.has(c.code))throw Error("No country workstream for "+c.name);
  const country=countryByCode.get(c.code);
  const portal_links=country.source_ids.map(sid=>{
   const s=sourceById.get(sid);
   if(!s)throw Error("Unknown source "+sid);
   return {id:s.id,name:s.name,url:s.url,limitations:s.limitations};
  });
  const ready=readiness(claim);
  if(Object.entries(ready).some(([k,v])=>k!=="source_anchored"&&v))throw Error("Unexpected scientific/legal clearance for "+c.name);
  const gates=GATES.map(g=>({...g}));
  return {
   id,company:c.name,sector:c.sector,home_country_code:c.code,home_country:country.name,
   metric:{name:"Published 2024 production-linked greenhouse gas emissions",value:c.annual,unit:"MtCO2e",year:2024,
    historical_cumulative:c.historic??null,historical_unit:"MtCO2e",
    boundary:claim.measure.system_boundary,kind:"modeled_producer_attribution",
    not_equivalent_to:["facility-level toxic release","measured human exposure","attributable human illness","legal culpability"]},
   evidence:{record_id:claim.record_id,status:claim.status,grade:claim.evidence_grade,model_class:claim.observed_or_modeled,
    period:claim.reporting_period,source:claim.source,limitations:claim.limitations},
   gates,
   readiness:ready,
   investigation:{research_entry_point:country.research_entry_point,key_gaps:country.key_gaps,
    source_portals:portal_links,next_steps:[
      "Verify legal entity and time-bound ownership using a primary company registry",
      "Resolve at least one facility/site ID with source-dated geographic records",
      "Collect pollutant-specific facility releases separately from greenhouse-gas producer attribution",
      "Corroborate transport and actual receptor exposure with appropriate measurements",
      "Conduct independent scientific outcome review and jurisdiction-specific counsel screening"
    ]},
   publication_warning:"Single-source emissions-only research record. No verified toxic exposure, company-attributable illness, or legal finding is inferred."
  };
 });
 if(claimByEntity.size!==dossiers.length)throw Error("Unmatched evidence remains in source cohort");
 const caseList=(examples?.cases||[]).map(c=>{
   if(!c.id||!c.sources?.length||!c.finding_kind||!c.caveat)throw Error("Historical comparator case requires sources, finding type and caveat");
   if(c.sources.some(s=>!s.url.startsWith("https://")))throw Error("Historical case sources must use HTTPS");
   return {...c};
 });
 return {version:"3.0.0",as_of:asOf,
  disclaimer:"These are source-linked climate producer observations and research tasks, not measured toxic injury, a composite Poison Index or assertions of unlawful conduct.",
  gate_definitions:GATES,
  totals:{company_records:dossiers.length,countries:new Set(dossiers.map(x=>x.home_country_code)).size,
   source_linked_greenhouse_gas_records:dossiers.length,verified_multi_hazard_dossiers:0,verified_human_harm_estimates:0,
   counsel_authorized_actions:0,documented_historical_comparators:caseList.length},
  dossiers,case_examples:caseList};
}
module.exports={compile,makeId,GATES};
