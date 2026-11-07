"use strict";
/**
 * Responsible-person public source register.
 * Roles are investigation slots, not wrongdoing ranks or defendants.
 * Pay is SEC-reported compensation, not profit from pollution.
 */
const {privateFieldPaths}=require("./index-kernel.cjs");
function slug(x){return String(x).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function compilePeople({companies,countries,roles,officers,asOf="2026-11-07"}){
 if(!Array.isArray(companies)||!Array.isArray(countries)||!Array.isArray(roles)||!Array.isArray(officers))throw Error("Expected arrays");
 if(roles.length!==10||new Set(roles.map(x=>x.key)).size!==10)throw Error("Ten distinct role types required");
 const keys=new Set(companies.map(c=>slug(c.name)));
 if(keys.size!==companies.length)throw Error("Duplicate normalized company identifiers");
 const countryMap=new Map(countries.map(c=>[c.code,c.name]));
 const officerIds=new Set();
 const slotOwners=new Set();
 for(const p of officers){
  if(!p.name||!p.role||!keys.has(p.company_id)||!roles.some(r=>r.key===p.research_role_key))throw Error("Officer identity, role or company is not validated: "+p.id);
  const privateFields=privateFieldPaths(p);
  if(privateFields.length)throw Error("Personal contact/medical data is prohibited: "+privateFields.join(", "));
  for(const [key,value] of [["role_start",p.role_start],["role_end",p.role_end]])if(value!==null&&value!==undefined&&!/^\d{4}-\d{2}-\d{2}$/.test(value))throw Error("Invalid "+key+" date for "+p.id);
  if(p.role_start&&p.role_end&&p.role_end<p.role_start)throw Error("End of tenure predates start for "+p.id);
  if(officerIds.has(p.id))throw Error("Duplicate individual person: "+p.id);
  officerIds.add(p.id);
  const key=p.company_id+"::"+p.research_role_key;
  if(slotOwners.has(key))throw Error("Multiple people assigned to one research slot: "+key);
  slotOwners.add(key);
  if(p.compensation?.fiscal_year!==2025||p.compensation?.currency!=="USD"||!Number.isSafeInteger(p.compensation.reported_total)||p.compensation.reported_total<0)
   throw Error("Reported SEC pay needs exact comparable currency, vintage and total");
  if(!p.source_links?.length||!p.source_links.every(s=>/^https:\/\/www\.sec\.gov\/Archives\/edgar\//.test(s.url)&&/^\d{4}-\d{2}-\d{2}$/.test(s.filing_date)))
   throw Error("Public sourced SEC document required: "+p.id);
  if(p.individual_damage_attribution!==null||p.liability_assessment!=="not_estimated"||p.allegation_status!=="none_asserted")
   throw Error("Unsourced guilt or individual impact attribution must not enter public register");
  if(p.compensation.environmental_damage_profits!==null||p.compensation.net_worth!==null)
   throw Error("Net worth or damages-derived benefit must remain unknown without separately substantiated records");
 }
 const corpus=companies.map(c=>{
  const id=slug(c.name);
  if(!countryMap.has(c.code))throw Error("Unrecognized country for "+c.name);
  const list=officers.filter(p=>p.company_id===id);
  return {company_id:id,company_name:c.name,home_country:countryMap.get(c.code),country_code:c.code,sector:c.sector,
   named_disclosures:list.length,role_slots:roles.map((role,i)=>{
    const p=list.find(p=>p.research_role_key===role.key)||null;
    return {
     slot_id:id+"::"+role.key,
     slot_number:i+1,
     research_function:role.title,
     research_question:role.question,
     public_evidence_to_collect:role.public_evidence,
     status:p?"public_officer_identified":"unverified_role_slot",
     named_person_id:p?p.id:null,
     name:p?p.name:null,
     documented_role:p?p.role:null,
     source_url:p?p.source_links[0].url:null,
     reported_compensation_2025_usd:p?p.compensation.reported_total:null,
     individual_pollution_damage:null,
     personal_legal_liability:"not_estimated",
     caution:"This is a research role, not a ranked allegation or finding that an individual caused environmental harm."
    };
   })};
 });
 const byId=new Map(corpus.map(x=>[x.company_id,x]));
 for(const p of officers)if(!byId.has(p.company_id))throw Error("Unmatched named officer");
 const n=corpus.reduce((s,c)=>s+c.named_disclosures,0);
 if(n!==officers.length)throw Error("Incorrect named disclosure count");
 return {version:"4.0.0",as_of:asOf,
  statement:"Ten research positions per company. Named individuals are only source-verified public officers, not identified polluters, personal damages beneficiaries or defendants.",
  scoring_policy:"No individual harm, legal culpability, wrongful profit, or total wealth score exists; compensation sorting is restricted to the same fiscal year, reporting framework and currency.",
  counts:{companies:corpus.length,role_types:roles.length,total_research_slots:corpus.length*roles.length,
   named_people:officers.length,unverified_slots:corpus.length*roles.length-officers.length,
   companies_with_source_verified_names:corpus.filter(c=>c.named_disclosures>0).length,
   legal_liability_findings:0,individual_harm_attributions:0},
  role_definitions:roles,companies:corpus,persons:officers,
  legal_research_routes:[
   {id:"US_CERCLA",country:"US",name:"CERCLA cleanup cost recovery / responsible party",status:"general_research_route",
    source_url:"https://www.epa.gov/enforcement/superfund-liability",
    controlling_case_url:"https://www.law.cornell.edu/supremecourt/text/524/51",
    principle:"Four statutory potentially responsible party categories; an individual's own conduct as a facility operator requires evidence of management or direction of pollution-related operations. Corporate title, parent role or compensation alone is insufficient.",
    needs:["Identified contaminated site and applicable hazardous substance","Time-valid facility operation, ownership, arranger or transporter conduct","Release and response cost nexus","Individual's own pollution-related operational decisions where personally alleged","Standing, jurisdiction, limitations, defenses and qualified counsel review"],
    defendant_status:"No named individual in this dataset is assessed as an operator or responsible party."},
   {id:"US_STATE_TORT",country:"US",name:"State-law nuisance, trespass, negligence or personal-injury theories",status:"counsel_review_required",
    source_url:"https://www.law.cornell.edu/wex/negligence",
    principle:"Elements and available remedies vary by state and claim. Employment, salary and company emissions do not establish individual duty, breach, causation or recoverable loss.",
    needs:["Specific plaintiff and standing","Local legal duty and alleged individual wrongful act","Exposure pathway and scientifically supported causation","Documented injury/property damage","Remedies, defenses and limitation periods"],
    defendant_status:"Not assessed; legal theories are not personalized filing recommendations."},
   {id:"US_SHAREHOLDER",country:"US",name:"Corporate governance / derivative claim research",status:"counsel_review_required",
    source_url:"https://www.law.cornell.edu/wex/derivative_action",
    principle:"Shareholder derivative actions generally seek relief on behalf of a corporation; they are not personal environmental compensation claims.",
    needs:["Proper shareholder standing","Company injury and valid theory","Board demand or applicable exception","Individualized director/officer duty and alleged breach","Applicable incorporation law and procedural requirements"],
    defendant_status:"No fiduciary misconduct allegation is made."},
   {id:"OTHER_COUNTRIES",country:"OTHER",name:"Jurisdiction-specific statutory and civil remedies",status:"local_counsel_required",
    source_url:"https://www.unep.org/explore-topics/environmental-rights-and-governance",
    principle:"No universal class-action right or personally actionable executive liability exists across these countries. A local qualified lawyer must assess jurisdiction, standing, corporate separateness, and remedies.",
    needs:["Local statutory claims and filing authority","Exact company/individual identity","Evidence of person's act or omission during a legally relevant period","Exposure, causation and damage where required","Limitations, venue, class/representative procedure and defenses"],
    defendant_status:"No individual liability theory or lawsuit recommendation has been validated."}
  ]};
}
module.exports={slug,compilePeople};
