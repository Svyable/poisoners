#!/usr/bin/env node
"use strict";
/**
 * Generates auditable static assets for GitHub Pages.
 * No network access, no third-party dependencies, no inferred scores.
 * Run: node scripts/build-foundation.cjs [--check]
 */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const load=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const metrics=load("data/metric-catalog.json");
const sources=load("data/source-catalog.json");
const work=load("data/country-workstreams.json");
const examples=load("data/case-examples.json");
const {compile}=require("../src/dossier-model.cjs");
const claims=fs.readFileSync(path.join(root,"data/evidence/carbon-majors-2024.jsonl"),"utf8")
 .trim().split(/\r?\n/).filter(Boolean).map((s)=>JSON.parse(s));
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,"docs/data.js"),"utf8"),sandbox,{filename:"data.js"});
const seed=sandbox.window.POISON_DATA;
const countryMap=new Map(work.countries.map(c=>[c.code,c]));
const srcs=new Set(sources.sources.map(s=>s.id));
const metricIds=new Set(metrics.metrics.map(m=>m.id));
assert.equal(countryMap.size,10,"Ten country workstreams required");
assert.equal(metricIds.size,metrics.metrics.length,"Metric IDs must be unique");
assert.equal(srcs.size,sources.sources.length,"Source IDs must be unique");
for(const m of metrics.metrics) {
 assert.ok(m.id && m.label && m.domain_code && m.unit && m.status==="definition_only");
 assert.ok(["historical","annual","scenario"].every(t=>m.temporal.includes(t)));
 for(const sid of m.source_candidates)assert.ok(srcs.has(sid),"Undefined source "+sid);
}
for(const c of work.countries) for(const sid of c.source_ids)assert.ok(srcs.has(sid));
assert.equal(claims.length,seed.companies.length,"Published records and seed entities must match");
const byId=new Map(claims.map(c=>[c.entity_id,c]));
assert.equal(byId.size,claims.length,"Evidence entity IDs must be unique in seed");
for(const c of claims){
 assert.ok(c.source && c.source.url.startsWith("https://"),"Missing source");
 assert.ok(c.record_id && c.evidence_grade && c.status);
 assert.equal(c.claim_type,"emission");
 assert.equal(c.measure.unit,"MtCO2e");
 assert.equal(c.reporting_period.start,"2024-01-01");
 assert.equal(c.reporting_period.end,"2024-12-31");
 assert.ok(Number.isFinite(c.measure.value) && c.measure.value>0);
}
const counts=work.countries.map(c=>{
 const count=seed.companies.filter(e=>e.code===c.code).length;
 return {...c,seed_emissions_records:count,target_dossiers:work.target_entity_dossiers_per_country,
  coverage_slots_filled:Math.min(count,work.target_entity_dossiers_per_country),
  coverage_note:"Emissions-only source records; not verified multi-hazard dossiers"};
});
const totalSlots=counts.reduce((sum,c)=>sum+c.coverage_slots_filled,0);
const payload={
 version:"2.0.0",as_of:"2026-11-06",
 methodology:"Metric ontology and data acquisition readiness. Do not treat definition counts as measured harm, litigation prospects or company culpability.",
 counts:{metrics_defined:metrics.metrics.length,metric_domains:metrics.domains.length,
  source_entries:sources.sources.length,seed_emission_records:claims.length,countries:counts.length,
  target_dossier_slots:work.target_entity_dossiers_per_country*counts.length,
  emission_coverage_slots:totalSlots,validated_multihazard_dossiers:0,validated_company_health_harm_estimates:0,automatically_authorized_cases:0},
 domains:metrics.domains.map(d=>({...d,metric_count:metrics.metrics.filter(m=>m.domain_code===d.id).length})),
 metrics:metrics.metrics,
 sources:sources.sources,
 countries:counts
};
const json=JSON.stringify(payload,null,2)+"\n";
const js="/* GENERATED from data/* by scripts/build-foundation.cjs. DO NOT EDIT BY HAND. */\nwindow.POISON_FOUNDATION = "+JSON.stringify(payload,null,2)+";\n";
const dossiers=compile({claims,companies:seed.companies,countries:work.countries,sources:sources.sources,examples});
const dossierJSON=JSON.stringify(dossiers,null,2)+"\n";
const dossierJS="/* GENERATED / Dossier evidence subset; no certified injury claims. */\nwindow.POISON_DOSSIERS = "+JSON.stringify(dossiers,null,2)+";\n";
const outputs=[["docs/foundation.json",json],["docs/foundation-data.js",js],
 ["docs/dossier-register.json",dossierJSON],["docs/dossier-register-data.js",dossierJS]];
let changed=false;
for(const [file,content] of outputs) {
 const full=path.join(root,file);
 if(process.argv.includes("--check")) {
  assert.equal(fs.readFileSync(full,"utf8"),content,"Out-of-date generated file: "+file+". Run node scripts/build-foundation.cjs");
 } else {
  if(!fs.existsSync(full) || fs.readFileSync(full,"utf8")!==content){fs.writeFileSync(full,content);changed=true}
 }
}
console.log((process.argv.includes("--check")?"Verified":"Built")+" foundation: "+payload.counts.metrics_defined+
 " metric definitions, "+payload.counts.source_entries+" sources, "+payload.counts.seed_emission_records+
 " cited emissions records and "+dossiers.case_examples.length+" documented comparator cases; "+totalSlots+"/"+payload.counts.target_dossier_slots+" company coverage slots (emissions only)."+
 (changed?" Assets updated.":""));
