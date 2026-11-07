#!/usr/bin/env node
"use strict";
/**
 * Offline, mapping-driven normalization of authorized PUBLIC facility release CSV.
 * No network fetching, no parent-company guessing, no exposure/health allocation.
 * Designed for mapped regulator exports (e.g., TRI/NPRI/PRTR).
 */
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {validateEvidence}=require("../src/index-kernel.cjs");
function parseCSV(text){
 const rows=[];let row=[],field="",quoted=false;
 const t=text.replace(/^\uFEFF/,"");
 for(let i=0;i<t.length;i++){
  const c=t[i],next=t[i+1];
  if(c==='"'){
   if(quoted&&next==='"'){field+='"';i++}
   else quoted=!quoted;
  } else if(c===","&&!quoted){row.push(field);field=""}
  else if((c==="\n"||c==="\r")&&!quoted){
    if(c==="\r"&&next==="\n")i++;
    row.push(field);field="";
    if(row.some(x=>x!==""))rows.push(row);
    row=[];
  }else field+=c;
 }
 if(quoted)throw Error("Unterminated quoted field");
 if(field.length||row.length){row.push(field);if(row.some(x=>x!==""))rows.push(row)}
 if(!rows.length)throw Error("Empty CSV");
 const head=rows.shift().map(s=>s.trim());
 if(new Set(head).size!==head.length)throw Error("Duplicate CSV headers; manual source correction required");
 return rows.map((cols,i)=>{
  if(cols.length!==head.length)throw Error("Column mismatch in data row "+(i+2));
  return Object.fromEntries(head.map((h,j)=>[h,cols[j]]));
 });
}
function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}
function convertKg(amount,unit){
 const factor={kg:1,g:.001,lb:.45359237,tonnes:1000}[unit];
 if(factor===undefined)throw Error("Unsupported mass unit: "+unit+"; do not guess");
 return amount*factor;
}
function normalize(rows,cfg){
 if(!cfg||!cfg.source||!cfg.columns||!Array.isArray(cfg.quantities)||!cfg.quantities.length)throw Error("Mapping needs source, columns and quantity definitions");
 const required=["facility_id","facility_name","chemical_name","year"];
 for(const k of required)if(!cfg.columns[k])throw Error("Missing column mapping "+k);
 if(!/^https:\/\//.test(cfg.source.url||"")||!cfg.source.publisher||!cfg.source.title||!cfg.source.published_at||!cfg.source.retrieved_at)throw Error("Mapping requires a dated, authoritative HTTPS source");
 if(cfg.allow_commercial_reuse!==true&&cfg.allow_noncommercial_research!==true)throw Error("Mapping requires documented reuse mode; inspect source terms");
 const results=[];
 for(const [index,row] of rows.entries()){
  const get=k=>String(row[cfg.columns[k]]??"").trim();
  const facility=get("facility_id"),chemical=get("chemical_name"),name=get("facility_name"),year=Number(get("year"));
  if(!facility||!name||!chemical||!Number.isInteger(year)||year<1900||year>2100)throw Error("Invalid facility/chemical/year in CSV row "+(index+2));
  const cas=cfg.columns.cas?get("cas"):null;
  for(const q of cfg.quantities){
   if(!q.column||!["air","water","soil"].includes(q.medium)||!q.unit)throw Error("Quantity mappings require column, medium and explicit unit");
   const value=String(row[q.column]??"").trim();
   if(!value || /^N\/?A$/i.test(value))continue;
   const number=Number(value.replace(/,/g,""));
   if(!Number.isFinite(number)||number<0)throw Error("Invalid release amount at row "+(index+2)+" in "+q.column);
   if(number===0)continue;
   const dioxin=/dioxin/i.test(chemical);
   if(dioxin&&!cfg.dioxin_grams_confirmed)throw Error("Dioxin units require explicit documented gram handling: row "+(index+2));
   const unit=dioxin?"g":q.unit;
   const kg=convertKg(number,unit);
   const identity=[cfg.dataset_id,facility,year,chemical,cas||"",q.medium,q.column].join("|");
   const suffix=crypto.createHash("sha256").update(identity).digest("hex").slice(0,18);
   const claim={
     record_id:"facility-"+suffix,
     entity_id:"facility-"+slug(facility),
     facility_id:facility,
     claim_type:"release",
     description:"Facility-reported "+chemical+" release to "+q.medium+" for "+year+" at "+name+". Reported mass only; neither ambient exposure nor health/ecological injury is established.",
     status:"lead",observed_or_modeled:"reported",evidence_grade:"C",
     reporting_period:{start:year+"-01-01",end:year+"-12-31"},
     measure:{value:kg,unit:"kg",system_boundary:"Facility-reported on-site release to "+q.medium+"; original mass "+value+" "+unit+"; "+cfg.dataset_id,lower_bound:null,upper_bound:null,counterfactual:null},
     source:{url:cfg.source.url,title:cfg.source.title,publisher:cfg.source.publisher,published_at:cfg.source.published_at,retrieved_at:cfg.source.retrieved_at,table_or_page:cfg.dataset_id+" / CSV row "+(index+2)+" / "+q.column,license:cfg.source.license||"Terms require review"},
     chemical_identifiers:[{name:chemical,cas:cas||null}],
     media:[q.medium],receptors:[],endpoint:null,
     limitations:["Reported release is not evidence of legal violation, exposure, illness or a causal ecological endpoint","Facility ID is not a verified parent legal entity; ownership graph and source record required","Source quantities, reporting thresholds and units must be independently checked"],
     last_reviewed:cfg.source.retrieved_at,version:1
   };
   const errs=validateEvidence(claim);
   if(errs.length)throw Error("Normalization invalid: "+errs.join("; "));
   results.push(claim);
  }
 }
 return results;
}
function main(){
 const args=process.argv.slice(2),arg=s=>{const i=args.indexOf(s);return i<0?null:args[i+1]};
 if(args.includes("--help")){console.log("Usage: node scripts/normalize-facility-csv.cjs --input file.csv --mapping mapping.json [--write --output data/evidence/staging/batch.jsonl]");return}
 const inFile=arg("--input"),mapFile=arg("--mapping");
 if(!inFile||!mapFile)throw Error("Require --input CSV and --mapping JSON; no implicit column assumptions");
 const stat=fs.statSync(inFile);
 if(!stat.isFile()||stat.size>30_000_000)throw Error("Input must be <=30 MB; partition large sources by reporting year");
 const config=JSON.parse(fs.readFileSync(mapFile,"utf8"));
 const rows=parseCSV(fs.readFileSync(inFile,"utf8"));
 const claims=normalize(rows,config);
 const out=claims.map(x=>JSON.stringify(x)).join("\n")+(claims.length?"\n":"");
 console.log("NORMALIZED "+claims.length+" public facility-level release records from "+rows.length+" rows; no health outcome, parent liability or composite score inferred.");
 console.log("SHA256 "+crypto.createHash("sha256").update(out).digest("hex"));
 if(args.includes("--write")){
  const output=arg("--output");
  if(!output)throw Error("--write requires --output within data/evidence/staging/");
  const full=path.resolve(output),dir=path.resolve("data/evidence/staging");
  if(!full.startsWith(dir+path.sep)||!full.endsWith(".jsonl"))throw Error("Output restricted to staging/*.jsonl");
  fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,out,{flag:"wx",mode:0o600});
  console.log("STAGED "+full+"; human provenance and ownership review still required.");
 }
}
if(require.main===module){try{main()}catch(e){console.error("REJECTED: "+e.message);process.exitCode=1}}
module.exports={parseCSV,normalize,convertKg};
