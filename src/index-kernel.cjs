"use strict";
/**
 * Poison Index research kernel.
 * Never exports a company "poison score", predicts legal guilt, allocates global
 * population deaths to a producer, or adds incompatible physical quantities.
 */
const CLAIM_TYPES=new Set(["emission","release","exposure","health_impact","ecological_impact","enforcement_action","legal_finding","scenario","ownership","other"]);
const GRADES=new Set(["A","B","C","D"]);
const OBSERVATION_CLASSES=new Set(["measurement","reported","modeled","derived","allegation","legal_finding"]);
const STATES=new Set(["lead","corroborated","reviewed","disputed","corrected","withdrawn"]);
const MISSING="not-estimated";
const privateKeys=new Set(["name_of_claimant","patient_name","phone","phone_number","email","email_address","home_address","residential_address","medical_record","diagnosis","date_of_birth","social_security_number","ssn","passport","attorney_client_message","ip_address"]);
const validDate=s=>typeof s==="string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s)) && new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
const isPlain=o=>o!==null && typeof o==="object" && !Array.isArray(o);
function privateFieldPaths(obj,prefix="") {
 let matches=[];
 if(!isPlain(obj)&&!Array.isArray(obj))return matches;
 for(const [key,value] of Object.entries(obj)){
  const p=prefix?prefix+"."+key:key;
  if(privateKeys.has(key.toLowerCase()))matches.push(p);
  if(value&&typeof value==="object")matches.push(...privateFieldPaths(value,p));
 }
 return matches;
}
function validateEvidence(r){
 const errors=[];
 if(!isPlain(r))return ["Record must be an object"];
 if(!/^[a-z0-9][a-z0-9-]{4,79}$/.test(r.record_id||""))errors.push("Invalid record_id");
 if(typeof r.entity_id!=="string"||!r.entity_id.trim())errors.push("Missing entity_id");
 if(!CLAIM_TYPES.has(r.claim_type))errors.push("Unsupported claim_type");
 if(!GRADES.has(r.evidence_grade))errors.push("Unsupported evidence grade");
 if(!OBSERVATION_CLASSES.has(r.observed_or_modeled))errors.push("Unsupported observation classification");
 if(!STATES.has(r.status))errors.push("Unsupported review status");
 if(typeof r.description!=="string"||r.description.length<20)errors.push("Description requires 20+ chars");
 if(!isPlain(r.reporting_period)||!validDate(r.reporting_period.start)||!validDate(r.reporting_period.end)||r.reporting_period.end<r.reporting_period.start)errors.push("Invalid reporting period");
 if(!isPlain(r.source)||!/^https:\/\//.test(r.source.url||"")||
    !r.source.publisher||!r.source.title||
    !validDate(r.source.published_at)||!validDate(r.source.retrieved_at))errors.push("Source must include HTTPS URL, publisher, title and dated provenance");
 if(!validDate(r.last_reviewed))errors.push("Missing source review date");
 if(r.measure!=null){
   const m=r.measure;
   if(!isPlain(m)||!Number.isFinite(m.value)||typeof m.unit!=="string"||!m.unit.trim()||
      typeof m.system_boundary!=="string"||!m.system_boundary.trim())errors.push("Numeric measure needs value, unit and explicit boundary");
   if(Number.isFinite(m?.lower_bound)&&Number.isFinite(m?.value)&&m.lower_bound>m.value)errors.push("Lower uncertainty bound exceeds point value");
   if(Number.isFinite(m?.upper_bound)&&Number.isFinite(m?.value)&&m.upper_bound<m.value)errors.push("Upper uncertainty bound below point value");
   if(m?.confidence_level!=null&&(!Number.isFinite(m.confidence_level)||m.confidence_level<=0||m.confidence_level>=1))errors.push("Confidence level must be between 0 and 1 (exclusive)");
 }
 if(["health_impact","ecological_impact"].includes(r.claim_type)){
  if(!r.endpoint || r.endpoint==="Emissions throughput only")errors.push("Impact claims need a specific outcome");
  if(!r.measure?.counterfactual)errors.push("Impact claims require counterfactual assumptions");
  if(!r.measure?.methodology_url)errors.push("Impact claims require an auditable methodology URL");
  if(!Array.isArray(r.reviewers)||new Set(r.reviewers).size<2)errors.push("Impact claims require two distinct expert reviewers");
  if(!Number.isFinite(r.measure?.lower_bound)||!Number.isFinite(r.measure?.upper_bound))errors.push("Impact claims require numerical uncertainty bounds");
  if(r.status!=="reviewed")errors.push("Impact claims cannot be published without review");
 }
 const privacy=privateFieldPaths(r);
 if(privacy.length)errors.push("Forbidden private-data keys: "+privacy.join(", "));
 return errors;
}
function scientificReleaseEligible(r){
 return ["health_impact","ecological_impact"].includes(r.claim_type) && validateEvidence(r).length===0 && r.status==="reviewed" && ["A","B"].includes(r.evidence_grade) &&
   Array.isArray(r.reviewers) && new Set(r.reviewers).size>=2 &&
   typeof r.source?.snapshot_hash_sha256==="string" &&
   /^[a-f0-9]{64}$/i.test(r.source.snapshot_hash_sha256);
}
function scenarioSeries({base,baseYear=2024,startYear=2027,endYear=2036,annualRate=0}){
 if(!Number.isFinite(base)||base<0)throw Error("Baseline must be a nonnegative finite emission quantity");
 if(!Number.isInteger(baseYear)||!Number.isInteger(startYear)||!Number.isInteger(endYear)||startYear<=baseYear||endYear<startYear||endYear-startYear>99)throw Error("Invalid time horizon");
 if(!Number.isFinite(annualRate)||annualRate<-.95||annualRate>1)throw Error("Annual change rate outside explicit scenario range");
 const annual=[];
 for(let year=startYear;year<=endYear;year++)annual.push({year,emissions:base*Math.pow(1+annualRate,year-baseYear)});
 return {annual,cumulative:annual.reduce((s,y)=>s+y.emissions,0),kind:"conditional_emissions_only"};
}
function sumComparable(records,{nonOverlapAttested=false,attestationSourceUrl=null}={}){
 if(!Array.isArray(records)||!records.length)throw Error("At least one record is required");
 const first=records[0];
 if(validateEvidence(first).length)throw Error("Invalid first record");
 if(!first.measure)throw Error("Record has no numeric measure");
 const unique=new Set();
 for(const r of records){
  if(validateEvidence(r).length)throw Error("Invalid evidence record "+r.record_id);
  if(unique.has(r.record_id))throw Error("Duplicate evidence record");
  unique.add(r.record_id);
  if(r.claim_type!==first.claim_type||r.reporting_period.start!==first.reporting_period.start||
     r.reporting_period.end!==first.reporting_period.end||r.measure?.unit!==first.measure.unit||
     r.measure?.system_boundary!==first.measure.system_boundary||
     r.source.url!==first.source.url||r.observed_or_modeled!==first.observed_or_modeled||
     r.endpoint!==first.endpoint||
     JSON.stringify(r.chemical_identifiers||[])!==JSON.stringify(first.chemical_identifiers||[]))
    throw Error("Incompatible claim boundary, year, unit, source or observation model; do not add");
 }
 // Even matching declared boundaries may overlap through corporate ownership, use of products or supply chains.
 // Require explicit expert-authored non-overlap attestation to prevent silent double counting.
 if(!nonOverlapAttested || !/^https:\/\//.test(attestationSourceUrl||""))throw Error("Aggregation blocked without independently documented non-overlap attestation");
 return {value:records.reduce((s,r)=>s+r.measure.value,0),unit:first.measure.unit,boundary:first.measure.system_boundary,record_ids:[...unique]};
}
function readiness(r){
 if(!isPlain(r))throw Error("Expected evidence record");
 return {
  source_anchored:!!(r.source?.url&&r.reporting_period),
  legal_entity_resolved:!!(r.legal_entity_id&&r.ownership_source_url),
  facility_identified:!!(r.facility_id&&r.facility_source_url),
  pathway_measured:!!(r.transport_model_url&&r.media?.length&&r.receptors?.length),
  exposure_validated:!!(r.exposure_method_url&&r.population_or_ecological_baseline_url),
  impact_reviewed:scientificReleaseEligible(r),
  counsel_cleared:r.counsel_approved===true&&!!r.counsel_reference
 };
}
module.exports={validateEvidence,privateFieldPaths,scientificReleaseEligible,scenarioSeries,sumComparable,readiness,MISSING};
