#!/usr/bin/env node
"use strict";
/* Explicit EPA TRI Basic Form R ingestion, not a network scraper or a guilt-score model.
   Node 22, no dependencies. Usage and field-spec docs: data/tri-import-methodology.md. */
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const root=path.resolve(__dirname,"..");
const manifestPath=path.join(root,"data/tri-facility-links.json");
const SOURCE_PAGE="https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present";
const DOC_PAGE="https://www.epa.gov/system/files/documents/2025-09/basic_data_files_documentation_august_2024.pdf";
const officialCsvUrl=u=>/^https:\/\/data\.epa\.gov\/efservice\/downloads\/tri\/mv_tri_basic_download\/2024_(?:TX|US)\/csv$/.test(String(u??""));
const norm=s=>String(s??"").normalize("NFKC").replace(/[–—−]/g,"-").replace(/\s+/g," ").trim().toUpperCase();
const parentNorm=s=>norm(s).replace(/[^A-Z0-9]+/g,"");
/* EPA Basic CSV exports can number their headers ("1. YEAR", "51. 5.1 - FUGITIVE AIR").
   NFKC and dash normalization preserve true 5.1 field codes while removing outer numbering. */
const headerKey=s=>norm(s).replace(/^\d+\.\s+(?=\S)/,"").replace(/\s*-\s*/g," - ").trim();
const REQUIRED=["YEAR","TRIFID","FACILITY NAME","STREET ADDRESS","CITY","STATE","PARENT CO NAME","CHEMICAL","CAS NUMBER","FORM TYPE","UNIT OF MEASURE","DOC_CTRL_NUM","5.1 - FUGITIVE AIR","5.2 - STACK AIR","5.3 - WATER"];
const CHEMICAL_IDS=new Map([
 ["7664-93-9","h2so4"],["7439-97-6","hg"],["7440-38-2","arsenic"],
 ["7439-92-1","lead"],["7440-43-9","cadmium"],["18540-29-9","chromium6"],
 ["50-00-0","formaldehyde"],["7783-06-4","h2s"]
]);
/* Quoted multiline cells, doubled quotes, CRLF and chunks of arbitrary boundaries.
   It must not split a reported chemical or business name at a quoted comma. */
async function* csvRows(filePath){
 let row=[],cell="",quoted=false,afterQuote=false,skipLF=false,rowNumber=0;
 for await(const chunk of fs.createReadStream(filePath,{encoding:"utf8",highWaterMark:131072})){
  for(const ch of chunk){
   if(skipLF){skipLF=false;if(ch==="\n")continue;}
   if(quoted){
    if(ch==='"'){quoted=false;afterQuote=true}else cell+=ch;
    continue;
   }
   if(afterQuote){
    if(ch==='"'){cell+='"';quoted=true;afterQuote=false;continue}
    if(ch===" "||ch==="\t")continue;
    if(ch!==","&&ch!=="\r"&&ch!=="\n")throw Error("Unexpected character after closing CSV quote near row "+(rowNumber+1));
    afterQuote=false;
   }
   if(ch==='"'&&cell===""){quoted=true;continue}
   if(ch===","){row.push(cell);cell="";continue}
   if(ch==="\r"||ch==="\n"){
    row.push(cell);cell="";rowNumber++;yield row;row=[];
    if(ch==="\r")skipLF=true;
    continue;
   }
   cell+=ch;
  }
 }
 if(quoted)throw Error("Unclosed CSV quoted field");
 if(cell||row.length){row.push(cell);yield row;}
}
function parseNonnegative(value,column,label){
 const s=String(value??"").trim().replace(/,/g,"");
 if(!s)return null; // Missing is NEVER inferred as zero.
 if(!/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(s))throw Error("Invalid release quantity "+JSON.stringify(s)+" for "+column+" at "+label);
 const n=Number(s);
 if(!Number.isFinite(n)||n<0)throw Error("Invalid nonnegative quantity at "+label);
 return n;
}
function sha256(filePath){
 const hash=crypto.createHash("sha256");
 return new Promise((resolve,reject)=>{
  const stream=fs.createReadStream(filePath);
  stream.on("data",b=>hash.update(b));
  stream.on("error",reject);stream.on("end",()=>resolve(hash.digest("hex")));
 });
}
async function importBasic({input,year=2024,retrieved,manifest,expectedSha256,sourceUrl=null}){
 if(!input||!fs.existsSync(input))throw Error("Official downloaded EPA CSV input required");
 if(!/^20\d\d-\d\d-\d\d$/.test(retrieved||""))throw Error("--retrieved must be exact YYYY-MM-DD");
 if(year!==2024||year!==manifest.reporting_year)throw Error("Pilot supports only the reviewed TRI reporting year 2024");
 if(!Array.isArray(manifest.facilities))throw Error("Invalid facility crosswalk");
 if(sourceUrl&&!officialCsvUrl(sourceUrl))throw Error("Unsupported origin URL; use only the explicit official EPA 2024 Texas or U.S. TRI Basic CSV endpoint");
 if(expectedSha256&&!/^[a-f0-9]{64}$/i.test(expectedSha256))throw Error("Expected SHA-256 must be 64 hexadecimal characters");
 const approved=manifest.facilities.filter(f=>f.review_status==="approved_facility_identity_2024"&&f.reporting_years_approved.includes(year));
 const links=new Map();
 for(const f of approved){
  if(!f.trifid||!f.cohort_company_id||!f.evidence.length||!f.expected_reported_parent_aliases.length||!f.expected_location?.state||!f.expected_location?.city||!f.expected_location?.street_name_token||!f.expected_location?.street_number)throw Error("Incomplete approved evidence/location "+f.trifid);
  if(links.has(f.trifid))throw Error("Duplicate approved TRIFID "+f.trifid);
  links.set(f.trifid,f);
 }
 const digest=await sha256(input);
 if(expectedSha256&&digest.toLowerCase()!==expectedSha256.toLowerCase())throw Error("SHA-256 mismatch; refusing unchecked source file");
 let header=null,count=0,skipped=0,formA=0,otherYear=0,candidates=0,quarantined=0;
 const records=[],issues=[],seen=new Set();
 const knownIds=new Set(manifest.facilities.map(f=>f.trifid));
 for await(const fields of csvRows(input)){
  if(!header){
   const names=fields.map((x,i)=>headerKey(i===0?x.replace(/^\uFEFF/,""):x));
   header=new Map(names.map((x,i)=>[x,i]));
   for(const k of REQUIRED)if(!header.has(k))throw Error("TRI Basic CSV missing mandatory column "+k);
   if(header.size!==names.length)throw Error("Duplicated normalized CSV header");
   continue;
  }
  if(fields.length!==header.size)throw Error("Unexpected CSV column count at parsed data row "+(count+1));
  count++;
  const get=k=>String(fields[header.get(k)]??"").trim();
  if(get("YEAR")!==String(year)){otherYear++;continue;}
  const trifid=get("TRIFID"),link=links.get(trifid);
  if(!link){if(knownIds.has(trifid))candidates++;else skipped++;continue;}
  const formType=norm(get("FORM TYPE"));
  if(formType==="A"){formA++;continue;} // Form A zero-filled fields are not 0 releases.
  if(formType!=="R")throw Error("Unknown TRI form type "+JSON.stringify(formType)+" for "+trifid);
  const loc=link.expected_location;
  const address=norm(get("STREET ADDRESS")).replace(/[^A-Z0-9 ]+/g," ").replace(/\s+/g," ");
  if(norm(get("STATE"))!==norm(loc.state)||norm(get("CITY"))!==norm(loc.city)||!address.split(" ").includes(String(loc.street_number))||!address.split(" ").includes(norm(loc.street_name_token))){
   quarantined++;
   issues.push({trifid,doc_ctrl_num:get("DOC_CTRL_NUM"),reason:"Official CSV state/city/street disagrees with reviewed site identity; not attributed.",observed_state:get("STATE"),observed_city:get("CITY")});
   continue;
  }
  const parent=get("PARENT CO NAME");
  if(!link.expected_reported_parent_aliases.some(x=>parentNorm(x)===parentNorm(parent))){
   quarantined++;
   issues.push({trifid,doc_ctrl_num:get("DOC_CTRL_NUM"),reason:"Reported parent did not match time-bound approved aliases; source record not attributed."});
   continue;
  }
  const doc=get("DOC_CTRL_NUM"),chem=get("CHEMICAL"),cas=get("CAS NUMBER"),unit=norm(get("UNIT OF MEASURE"));
  const classification=header.has("CLASSIFICATION")?norm(get("CLASSIFICATION")):null;
  const triId=header.has("TRI CHEMICAL /COMPOUND ID")?get("TRI CHEMICAL /COMPOUND ID"):
    header.has("TRI CHEMICAL / COMPOUND ID")?get("TRI CHEMICAL / COMPOUND ID"):null;
  if(!doc||!chem)throw Error("Missing Form R document ID or chemical identity for "+trifid);
  if(!["POUNDS","GRAMS"].includes(unit))throw Error("Unrecognized TRI units "+unit+" for "+doc);
  const dioxin=classification==="DIOXIN"||norm(chem).includes("DIOXIN");
  if((dioxin&&unit!=="GRAMS")||(!dioxin&&unit==="GRAMS"))
   throw Error("Dioxin / grams anomaly in "+doc+"; manual review required");
  const key=[year,trifid,triId||cas||norm(chem)].join("|");
  if(seen.has(key))throw Error("Duplicate site/year/chemical Form R record "+key+"; reconcile amendments before publication");
  seen.add(key);
  const fug=parseNonnegative(get("5.1 - FUGITIVE AIR"),"fugitive",doc);
  const stack=parseNonnegative(get("5.2 - STACK AIR"),"stack",doc);
  const water=parseNonnegative(get("5.3 - WATER"),"water",doc);
  const chemical_id=CHEMICAL_IDS.get(cas)||null;
  records.push({
   id:year+"-"+trifid+"-"+doc,
   reporting_year:year,trifid,facility_name:get("FACILITY NAME"),
   reported_city:get("CITY"),reported_state:get("STATE"),reported_street_address:get("STREET ADDRESS"),
   cohort_company:link.cohort_company,cohort_company_id:link.cohort_company_id,
   review_status:"facility_identity_and_2024_parent_verified",
   reported_parent:parent,
   standardized_parent:header.has("STANDARDIZED PARENT COMPANY NAME")?get("STANDARDIZED PARENT COMPANY NAME")||null:null,
   document_control_number:doc,chemical_reported:chem,cas_number:cas||null,
   tri_chemical_id:triId||null,tri_classification:classification,
   matched_compound_id:chemical_id,
   chemical_identity_note:chemical_id?"CAS-matched substance; inspect EPA form for category and speciation":"Unmatched reported chemical/category; do not relabel or collapse into a toxicological species",
   unit:unit==="POUNDS"?"lb":"g",
   onsite_air_fugitive:fug,onsite_air_stack:stack,
   onsite_air_total:fug===null||stack===null?null:fug+stack,
   onsite_water:water,
   release_boundary:"On-site reported air and water releases only. Does not include land releases, off-site transfers, treatment or waste managed; do not sum with other scopes.",
   zero_caveat:"EPA Basic files can zero-fill blank or NA quantities; a displayed zero does not prove analytically measured zero.",
   source_listing_url:SOURCE_PAGE,
   facility_evidence_urls:link.evidence.map(x=>x.url)
  });
 }
 records.sort((a,b)=>a.trifid.localeCompare(b.trifid)||a.chemical_reported.localeCompare(b.chemical_reported));
 const result={
  schema_version:1,published_at:retrieved,reporting_year:year,
  source_status:records.length?"official_form_r_csv_imported":"official_csv_processed_no_approved_form_r_rows",
  source:{name:"US EPA TRI Basic Data Files",landing_url:SOURCE_PAGE,documentation_url:DOC_PAGE,processing_cutoff:"2025-11-05",source_file_sha256:digest,source_file_name:path.basename(input),source_retrieved_on:retrieved,source_origin_url:sourceUrl,
   verification_scope:"Local integrity hash and specified source URL only; TRI reports are source assertions, not ownership, measured dose or legal findings."},
  coverage:{number_of_approved_facility_links:approved.length,number_of_imported_form_r_rows:records.length,excluded_candidates:manifest.facilities.length-approved.length,
   inspected_csv_rows:count,excluded_other_reporting_year_rows:otherYear,excluded_unlinked_rows:skipped,excluded_unapproved_candidate_rows:candidates,excluded_form_a_rows:formA,quarantined_parent_mismatch_rows:quarantined,
   description:"Reviewed TRI facility/year/parent matches in this one supplied EPA file only, not all facilities or all company operations."},
  records,issues,
  disclaimers:["Source-reported on-site air and water quantities only, never individual exposure or guilt.","TRI Form A zero-fill is excluded; zero in a Form R may reflect EPA's NA/blank standardization.","No corporate total, no national completeness claim, no summing dioxin grams with other chemical pounds."]
 };
 return result;
}
function parseArgs(argv){
 const o={};for(let i=0;i<argv.length;i++){const a=argv[i];if(!a.startsWith("--"))throw Error("Unexpected argument "+a);if(a==="--dry-run"){o.dryRun=true;continue;}if(i+1===argv.length)throw Error("Missing argument for "+a);o[a.slice(2)]=argv[++i]}return o;
}
async function main(){
 const args=parseArgs(process.argv.slice(2));
 if(!args.input||!args.retrieved)throw Error("Usage: node scripts/import-tri-basic.cjs --input /path/2024_TRI.csv --retrieved YYYY-MM-DD [--output docs/tri-facility-releases.json] [--expected-sha256 HEX] [--dry-run]");
 if(!args.dryRun&&!args.output)throw Error("--output required for writes; use --dry-run for source audit");
 if(!args.dryRun&&(!args["expected-sha256"]||!args["source-url"]))throw Error("Publication requires --expected-sha256 and --source-url from the official EPA 2024 export");
 const manifest=JSON.parse(fs.readFileSync(manifestPath,"utf8"));
 const result=await importBasic({input:path.resolve(args.input),year:2024,retrieved:args.retrieved,manifest,expectedSha256:args["expected-sha256"],sourceUrl:args["source-url"]});
 if(!args.dryRun){
  const out=path.resolve(args.output);
  if(!out.startsWith(root+path.sep))throw Error("Output must be inside repository");
  fs.writeFileSync(out,JSON.stringify(result,null,2)+"\n");
 }
 process.stdout.write(JSON.stringify({status:result.source_status,coverage:result.coverage,sha256:result.source.source_file_sha256,issues:result.issues},null,2)+"\n");
 if(result.issues.length)process.exitCode=2;
}
if(require.main===module)main().catch(e=>{console.error("TRI IMPORT REJECTED: "+e.message);process.exitCode=1;});
module.exports={csvRows,parseNonnegative,importBasic,sha256,norm,headerKey,officialCsvUrl};
