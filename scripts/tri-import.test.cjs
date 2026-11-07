"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path"),vm=require("node:vm");
const {importBasic,csvRows,parseNonnegative,headerKey}=require("./import-tri-basic.cjs");
const root=path.resolve(__dirname,"..");
const links=JSON.parse(fs.readFileSync(path.join(root,"data/tri-facility-links.json"),"utf8"));
const output=JSON.parse(fs.readFileSync(path.join(root,"docs/tri-facility-releases.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"docs/chemistry.html"),"utf8");
const qa=fs.readFileSync(path.join(root,"data/tri-import-methodology.md"),"utf8");
const HEADER=["YEAR","TRIFID","FACILITY NAME","PARENT CO NAME","STANDARDIZED PARENT COMPANY NAME","CHEMICAL","CAS NUMBER","FORM TYPE","UNIT OF MEASURE","DOC_CTRL_NUM","5.1 – FUGITIVE AIR","5.2 – STACK AIR","5.3 – WATER"];
const approved="77522XXNCH5000B",chevron="94802CHVRN841ST";
const quote=x=>/[,\r\n"]/.test(String(x))?'"'+String(x).replace(/"/g,'""')+'"':String(x);
function fixture(rows){const dir=fs.mkdtempSync(path.join(os.tmpdir(),"tri-reviewed-"));const file=path.join(dir,"EPA_TRI_2024.csv");fs.writeFileSync(file,[HEADER,...rows].map(x=>x.map(quote).join(",")).join("\r\n")+"\r\n");return {file,cleanup:()=>fs.rmSync(dir,{recursive:true,force:true})}}
const line=({year="2024",trifid=approved,chemical="Sulfuric acid (acid aerosols, including mists)",cas="7664-93-9",form="R",unit="Pounds",doc="R240000001",fug="5",stack="12.5",water="0",parent="Exxon Mobil Corporation"}={})=>
 [year,trifid,"ExxonMobil Baytown Chemical Plant (Part)",parent,"EXXON MOBIL CORP",chemical,cas,form,unit,doc,fug,stack,water];
test("identity approvals and unapproved lookups are explicit; empty release status is not 0",()=>{
 assert.equal(links.schema_version,1);
 assert.equal(links.facilities.length,3);
 const approvedRows=links.facilities.filter(x=>x.reporting_years_approved.includes(2024));
 assert.equal(approvedRows.length,1);assert.equal(approvedRows[0].trifid,approved);
 assert.ok(approvedRows[0].evidence.some(e=>e.type==="2024_regulatory_operator"));
 assert.ok(approvedRows[0].evidence.some(e=>e.type==="2024_corporate_ownership"));
 assert.ok(links.facilities.find(x=>x.trifid===chevron).reporting_years_approved.length===0);
 assert.equal(output.source_status,"awaiting_official_csv_import");
 assert.equal(output.records.length,0);
 assert.match(output.coverage.description,/not a zero-emissions/);
 assert.match(qa,/Form A/);
});
test("CSV parser preserves quoted commas, doubled quote marks and multiline fields",async()=>{
 const x=fixture([line({chemical:'Benzene, "solvent"\ncategory',cas:"71-43-2"})]);
 try{
  const rows=[];for await(const r of csvRows(x.file))rows.push(r);
  assert.equal(rows.length,2);assert.equal(rows[1].length,HEADER.length);
  assert.equal(rows[1][5],'Benzene, "solvent"\ncategory');
 }finally{x.cleanup()}
});
test("reviewed EPA Form R chemistry retains air/water and parent metadata; excludes Form A and unapproved candidates",async()=>{
 const x=fixture([
  line(),
  line({doc:"R240000002",chemical:"Mercury",cas:"7439-97-6",fug:"0.5",stack:"0.25",water:"1"}),
  line({doc:"A240000001",chemical:"Benzene",cas:"71-43-2",form:"A",fug:"0",stack:"0",water:"0"}),
  line({year:"2023",doc:"R230000001"}),
  line({trifid:chevron,parent:"Chevron Corporation",doc:"R240000003"}),
  line({trifid:"NO_MATCHED_TRI_ID",doc:"R240000004"}),
  line({parent:"WRONG UNVERIFIED PARENT",doc:"R240000005",chemical:"Lead",cas:"7439-92-1"})
 ]);
 try{
  const r=await importBasic({input:x.file,retrieved:"2026-11-07",year:2024,manifest:links});
  assert.equal(r.records.length,2);
  assert.equal(r.coverage.excluded_form_a_rows,1);
  assert.equal(r.coverage.excluded_other_reporting_year_rows,1);
  assert.equal(r.coverage.excluded_unapproved_candidate_rows,1);
  assert.equal(r.coverage.excluded_unlinked_rows,1);
  assert.equal(r.coverage.quarantined_parent_mismatch_rows,1);
  assert.equal(r.issues.length,1);
  assert.match(r.issues[0].reason,/did not match/);
  const acid=r.records.find(x=>x.matched_compound_id==="h2so4");
  assert.equal(acid.onsite_air_fugitive,5);
  assert.equal(acid.onsite_air_stack,12.5);
  assert.equal(acid.onsite_air_total,17.5);
  assert.equal(acid.onsite_water,0);
  assert.equal(acid.unit,"lb");
  assert.equal(acid.cohort_company,"ExxonMobil");
  assert.equal(acid.document_control_number,"R240000001");
  assert.match(acid.chemical_reported,/Sulfuric acid/);
  assert.ok(/^[0-9a-f]{64}$/.test(r.source.source_file_sha256));
  assert.match(r.records[0].zero_caveat,/NA/);
  const mercury=r.records.find(x=>x.matched_compound_id==="hg");
  assert.equal(mercury.onsite_air_total,0.75);
  assert.equal(mercury.onsite_water,1);
 }finally{x.cleanup()}
});
test("invalid data, duplicate chemical forms, grams anomaly and wrong file digest fail closed",async()=>{
 assert.throws(()=>parseNonnegative("-1","water","x"),/Invalid/);
 assert.equal(parseNonnegative("","water","x"),null);
 const dup=fixture([line(),line({doc:"R240000002"})]);
 const neg=fixture([line({water:"-3"})]);
 const grams=fixture([line({unit:"Grams"})]);
 const good=fixture([line()]);
 try{
  await assert.rejects(importBasic({input:dup.file,retrieved:"2026-11-07",manifest:links}),/Duplicate/);
  await assert.rejects(importBasic({input:neg.file,retrieved:"2026-11-07",manifest:links}),/Invalid/);
  await assert.rejects(importBasic({input:grams.file,retrieved:"2026-11-07",manifest:links}),/Dioxin \/ grams anomaly/);
  await assert.rejects(importBasic({input:good.file,retrieved:"2026-11-07",manifest:links,expectedSha256:"0".repeat(64)}),/SHA-256 mismatch/);
  await assert.rejects(importBasic({input:good.file,retrieved:"2026-11-07",year:2025,manifest:links}),/only the reviewed/);
 }finally{dup.cleanup();neg.cleanup();grams.cleanup();good.cleanup()}
});
test("EPA Basic export numbered headers and official 5.1 en-dash fields import without column errors",async()=>{
 assert.equal(headerKey("1. YEAR"),"YEAR");
 assert.equal(headerKey("51. 5.1 – FUGITIVE AIR"),"5.1 - FUGITIVE AIR");
 assert.equal(headerKey("52. 5.2 - STACK AIR"),"5.2 - STACK AIR");
 assert.equal(headerKey("5.3 – WATER"),"5.3 - WATER");
 const row=line({chemical:"Dioxin and dioxin-like compounds",cas:"N150",unit:"Grams",fug:"7",stack:"0",water:"0"});
 const header=HEADER.map((x,i)=>(i+1)+". "+x).concat(["43. CLASSIFICATION","39. TRI CHEMICAL /COMPOUND ID"]);
 const tmp=fixture([]);
 try{
  fs.writeFileSync(tmp.file,[header,row.concat(["DIOXIN","N150"])].map(x=>x.map(quote).join(",")).join("\r\n")+"\r\n");
  const out=await importBasic({input:tmp.file,retrieved:"2026-11-07",manifest:links});
  assert.equal(out.records.length,1);
  const result=out.records[0];
  assert.equal(result.tri_classification,"DIOXIN");
  assert.equal(result.tri_chemical_id,"N150");
  assert.equal(result.unit,"g");
  assert.equal(result.onsite_air_total,7);
  assert.equal(result.chemical_reported,"Dioxin and dioxin-like compounds");
 }finally{tmp.cleanup()}
});
test("EPA metal-compound chemical categories retain their own EPA IDs instead of collapsing into elemental species",async()=>{
 const row=line({chemical:"Lead compounds",cas:"N420",doc:"R240001234"});
 const header=HEADER.concat(["CLASSIFICATION","TRI CHEMICAL /COMPOUND ID"]);
 const tmp=fixture([]);
 try{
  fs.writeFileSync(tmp.file,[header,row.concat(["PBT","N420"])].map(x=>x.map(quote).join(",")).join("\r\n")+"\r\n");
  const out=await importBasic({input:tmp.file,retrieved:"2026-11-07",manifest:links});
  assert.equal(out.records.length,1);
  const result=out.records[0];
  assert.equal(result.tri_classification,"PBT");
  assert.equal(result.tri_chemical_id,"N420");
  assert.equal(result.cas_number,"N420");
  assert.equal(result.matched_compound_id,null,"Lead compounds are NOT elemental Pb without chemical review");
 }finally{tmp.cleanup()}
});
test("site displays the non-imported source status, and browser code cannot fabricate a company toxicity score",()=>{
 assert.ok(html.includes('id="facility-records"'));
 assert.ok(html.includes('id="facilityFileStatus"'));
 assert.ok(html.includes('id="facilityRows"'));
 assert.ok(html.includes('src="tri-facility-ui.js"'));
 assert.ok(html.includes("No 2024 chemical mass is imported yet"));
 assert.ok(html.includes("~300"),"EPA coal ash facility count");
 assert.ok(html.includes("~775"),"EPA coal ash units count");
 assert.ok(html.includes('id="coal-pathways"'));
 assert.ok(html.includes("As, Cd, Cr, Pb, Se, Hg"));
 assert.ok(html.includes("Mining &amp; Processing")||html.includes("MINING &amp; PROCESSING"));
 const js=fs.readFileSync(path.join(root,"docs/tri-facility-ui.js"),"utf8");
 assert.doesNotThrow(()=>new vm.Script(js));
 assert.ok(js.includes("NOT zero emissions"));
 assert.ok(!/toxicityScore|deathScore|guiltScore|companyRank/.test(js));
});
