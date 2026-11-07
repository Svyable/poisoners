"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const db=JSON.parse(read("docs/chemical-hazards.json"));
const html=read("docs/chemistry.html");
const homepage=read("docs/index.html");
const index=JSON.parse(read("docs/search-index.json"));
const dossiers=JSON.parse(read("docs/dossier-register.json"));
const ids=new Set(db.compounds.map(c=>c.id));
test("chemical roster is species-specific and no carbon proxy is marketed as toxicity",()=>{
 assert.equal(db.compounds.length,14);
 assert.equal(ids.size,db.compounds.length);
 assert.ok(!ids.has("co2")&&!ids.has("carbon-dioxide"));
 assert.match(db.boundaries.climate,/photosynthesis/);
 assert.match(db.boundaries.missing,/never zero/);
 assert.match(db.boundaries.rankings,/not chemical toxicity/);
 for(const c of db.compounds){
  assert.ok(c.name&&c.symbol&&c.family&&c.coal_role&&c.chemistry&&c.health&&c.environment&&c.measurement&&c.odor&&c.odor_note,c.id);
  assert.ok(c.harm.length&&c.media.length&&c.sources.length,c.id);
  assert.ok(c.sources.every(s=>s.title&&/^https:\/\//.test(s.url)));
  assert.equal(c.toxicity_score,undefined,"No invented unitless toxicity score: "+c.id);
 }
 assert.match(db.compounds.find(c=>c.id==="nox").chemistry,/not a single chemical/);
 assert.match(db.compounds.find(c=>c.id==="hg").chemistry,/not methylmercury releases/);
 assert.match(db.compounds.find(c=>c.id==="chromium6").chemistry,/cannot be relabeled/);
 assert.match(db.compounds.find(c=>c.id==="h2s").odor_note,/olfactory fatigue/);
});
test("headline 2025 EIA and 2024 EPA remain distinct populations and mass units",()=>{
 const e=db.headline_sets.find(x=>x.id==="eia-2025-power-chp");
 const a=db.headline_sets.find(x=>x.id==="epa-2024-covered-power");
 assert.equal(e.year,2025);
 assert.equal(a.year,2024);
 assert.equal(e.unit,"metric tonnes");
 assert.equal(a.unit,"US short tons");
 assert.ok(e.scope.includes("combined-heat-and-power"));
 assert.ok(a.scope.includes("MATS")||a.scope.includes("ARP"));
 const val=(group,id)=>group.figures.find(x=>x.chemical_id===id).value;
 assert.equal(val(e,"so2"),902000);
 assert.equal(val(e,"nox"),1144000);
 assert.equal(val(a,"so2"),600000);
 assert.equal(val(a,"nox"),650000);
 assert.equal(val(a,"hg"),2.2);
 assert.equal(val(a,"so2")/val(a,"hg")>100000,true);
 assert.equal(e.figures.some(f=>f.chemical_id==="hg"),false);
 for(const group of db.headline_sets){
  assert.ok(group.source_url.startsWith("https://"));
  assert.ok(group.figures.every(f=>ids.has(f.chemical_id)&&f.value>0));
 }
});
test("public site prioritizes sourced pollutants and retains climate as a separate ledger",()=>{
 assert.ok(homepage.includes("SULFUR DIOXIDE / 2025"));
 assert.ok(homepage.includes("NITROGEN OXIDES / 2025"));
 assert.ok(homepage.includes("MERCURY / 2024"));
 assert.ok(homepage.includes("EXPLORE CHEMICAL HAZARDS"));
 assert.ok(homepage.includes('href="#ledger"'));
 assert.ok(homepage.includes("not measurements of toxic chemical releases"));
 for(const id of ["chSearch","chFamily","chSort","chCount","chRows","chHeadline","chLegacy","chSortNote"])
  assert.ok(html.includes('id="'+id+'"'),"missing chemical explorer id "+id);
 assert.ok(html.includes('src="chemistry.js"'));
 assert.ok(html.includes('href="chemistry.css"'));
 assert.ok(html.includes('href="chemical-hazards.json"'));
 assert.ok(html.includes("ODOR ≠ TOXICITY"));
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.equal((html.match(/<main\b/g)||[]).length,1);
 const chemicalIndex=index.entries.find(x=>x.href==="chemistry.html");
 assert.equal(chemicalIndex.type,"page");
 assert.equal(dossiers.dossiers.length,50);
});
test("chemical browser script has valid syntax and no numeric toxicity rank",()=>{
 assert.doesNotThrow(()=>new vm.Script(read("docs/chemistry.js")));
 const js=read("docs/chemistry.js");
 assert.match(js,/odorRank/);
 assert.match(js,/rank\(c\)/);
 assert.match(js,/2024 covered-power scope/);
 assert.ok(!/toxicityScore|guiltScore|deathScore|companyRank/.test(js));
});
