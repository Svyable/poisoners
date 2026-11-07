"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),cp=require("node:child_process");
const root=path.resolve(__dirname,"..");
const read=(p)=>fs.readFileSync(path.join(root,p),"utf8");
const json=(p)=>JSON.parse(read(p));
const f=json("docs/foundation.json");
const metrics=json("data/metric-catalog.json"),sources=json("data/source-catalog.json"),work=json("data/country-workstreams.json");
const claims=read("data/evidence/carbon-majors-2024.jsonl").trim().split(/\r?\n/).map(JSON.parse);
const ctx={window:{}};vm.runInNewContext(read("docs/data.js"),ctx);
const d=ctx.window.POISON_DATA;
const {validateEvidence,scientificReleaseEligible,privateFieldPaths,scenarioSeries,sumComparable,readiness}=require("../src/index-kernel.cjs");

test("schema-based project scope stays coherent",()=>{
 assert.equal(d.countries.length,10);
 assert.equal(f.counts.seed_emission_records,d.companies.length);
 assert.equal(claims.length,50);
 assert.equal(f.counts.metrics_defined,metrics.metrics.length);
 assert.equal(f.counts.metric_domains,metrics.domains.length);
 assert.equal(f.counts.source_entries,sources.sources.length);
 assert.equal(f.counts.emission_coverage_slots,49);
 assert.equal(f.counts.target_dossier_slots,100);
 assert.equal(f.counts.validated_multihazard_dossiers,0);
 assert.equal(f.counts.automatically_authorized_cases,0);
});
test("every evidence record has an inspectable source, boundaries and no privacy keys",()=>{
 const names=new Set(d.companies.map(x=>x.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")));
 const ids=new Set();
 for(const r of claims){
  assert.deepEqual(validateEvidence(r),[],r.record_id);
  assert.ok(names.has(r.entity_id),r.record_id);
  assert.ok(!ids.has(r.record_id));ids.add(r.record_id);
  assert.equal(r.measure.unit,"MtCO2e");
  assert.equal(r.status,"corroborated");
  assert.equal(r.claim_type,"emission");
  assert.equal(scientificReleaseEligible(r),false);
  assert.deepEqual(privateFieldPaths(r),[]);
  const original=d.companies.find(x=>x.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")===r.entity_id);
  assert.equal(original.annual,r.measure.value);
 }
});
test("ontology catalog is disjoint, source-linked and consistently unscored",()=>{
 const keys=new Set(),srcids=new Set(sources.sources.map(x=>x.id));
 assert.ok(metrics.metrics.length>=100);
 for(const m of metrics.metrics){
  assert.ok(!keys.has(m.id));keys.add(m.id);
  assert.equal(m.status,"definition_only");
  assert.equal(m.aggregation,"prohibited_without_explicit_boundary_and_method");
  assert.ok(m.unit && m.medium.length && m.receptors.length);
  m.source_candidates.forEach(id=>assert.ok(srcids.has(id)));
 }
 for(const c of work.countries)c.source_ids.forEach(id=>assert.ok(srcids.has(id)));
});
test("forward climate scenario is conditional and future-scoped",()=>{
 const s=scenarioSeries({base:100,baseYear:2024,startYear:2027,endYear:2036,annualRate:.02});
 assert.equal(s.annual.length,10);
 assert.equal(s.annual[0].year,2027);
 assert.ok(Math.abs(s.annual[0].emissions-100*Math.pow(1.02,3))<1e-8);
 assert.equal(s.kind,"conditional_emissions_only");
 assert.throws(()=>scenarioSeries({base:-1}),/nonnegative/);
 assert.throws(()=>scenarioSeries({base:100,startYear:2024}),/horizon/);
 assert.throws(()=>scenarioSeries({base:100,annualRate:3}),/range/);
});
test("aggregation is blocked without explicit independent non-overlap attestation",()=>{
 assert.throws(()=>sumComparable([claims[0],claims[1]]),/non-overlap/);
 assert.throws(()=>sumComparable([claims[0],claims[0]],{nonOverlapAttested:true,attestationSourceUrl:"https://example.org/assessment"}),/Duplicate/);
 const result=sumComparable([claims[0],claims[1]],{nonOverlapAttested:true,attestationSourceUrl:"https://example.org/assessment"});
 assert.equal(result.unit,"MtCO2e");
 assert.equal(result.value,claims[0].measure.value+claims[1].measure.value);
 assert.throws(()=>sumComparable([claims[0],{...claims[1],measure:{...claims[1].measure,unit:"kg"}}],{nonOverlapAttested:true,attestationSourceUrl:"https://example.org/assessment"}),/Incompatible/);
});
test("impact claims require counterfactual and independent reviewers",()=>{
 const r={...claims[0],claim_type:"health_impact",endpoint:"deaths/year"};
 assert.ok(validateEvidence(r).some(x=>/counterfactual/.test(x)));
 assert.ok(validateEvidence(r).some(x=>/two independent/.test(x)));
 assert.equal(scientificReleaseEligible(r),false);
});
test("privacy-sensitive named fields are rejected",()=>{
 const r={...claims[0],patient_name:"Sensitive example"};
 assert.ok(validateEvidence(r).some(x=>/private-data/.test(x)));
});
test("readiness does not conflate source records with public harm determinations",()=>{
 const r=readiness(claims[0]);
 assert.equal(r.source_anchored,true);
 assert.equal(r.legal_entity_resolved,false);
 assert.equal(r.facility_identified,false);
 assert.equal(r.pathway_measured,false);
 assert.equal(r.exposure_validated,false);
 assert.equal(r.impact_reviewed,false);
 assert.equal(r.counsel_cleared,false);
});
test("static site includes all research explorer hooks, export and protections",()=>{
 const html=read("docs/index.html");
 for(const id of ["foundationTotals","metricSearch","metricDomain","metricKind","metricGrid","metricCount","metricMore","sourceSearch","sourceGrid","sourceCount","researchCountryGrid","foundationCountryDetail"]){
  assert.ok(html.includes('id="'+id+'"'),"Missing "+id);
 }
 assert.ok(html.includes('src="foundation-data.js"'));
 assert.ok(html.includes('src="foundation-app.js"'));
 assert.ok(html.includes('href="foundation.json"'));
 const snapshot=read("docs/foundation-data.js");
 assert.ok(snapshot.includes("window.POISON_FOUNDATION"));
});
test("generated data is exact and reproducible offline",()=>{
 cp.execFileSync(process.execPath,["scripts/build-foundation.cjs","--check"],{cwd:root,stdio:"pipe"});
 for(const f of ["docs/foundation-data.js","docs/foundation-app.js","docs/data.js","docs/app.js","scripts/ingest-evidence.cjs","src/index-kernel.cjs"])
  cp.execFileSync(process.execPath,["--check",path.join(root,f)],{stdio:"pipe"});
});
