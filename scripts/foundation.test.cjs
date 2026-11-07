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
 assert.ok(validateEvidence(r).some(x=>/two distinct/.test(x)));
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

const {validateOwnershipEdge,resolveParentAt,detectCyclesAt}=require("../src/entity-graph.cjs");
const {parseCSV,normalize,convertKg}=require("./normalize-facility-csv.cjs");
test("legal-entity ownership respects dates and must not be guessed",()=>{
 const e={child_entity_id:"child-1",parent_entity_id:"parent-1",relationship:"legal_parent",effective_from:"2010-01-01",effective_to:"2020-12-31",source_url:"https://example.org/dated-company-document"};
 assert.deepEqual(validateOwnershipEdge(e),[]);
 assert.equal(resolveParentAt([e],"child-1","2019-10-03").status,"source_linked");
 assert.equal(resolveParentAt([e],"child-1","2024-01-01").status,"unresolved");
 const second={...e,parent_entity_id:"parent-2"};
 assert.equal(resolveParentAt([e,second],"child-1","2019-10-03").status,"ambiguous");
 assert.ok(detectCyclesAt([e,{...e,child_entity_id:"parent-1",parent_entity_id:"child-1"}],"2019-01-01").length>0);
});
test("facility normalizer converts verified units without inventing illness or parent liability",()=>{
 const mapping=json("data/mappings/facility-example.json");
 const rows=parseCSV(read("tests/fixtures/facility-example.csv"));
 assert.equal(rows.length,2);
 assert.equal(rows[0]["FACILITY NAME"],"Example, Inc. Plant");
 const normalized=normalize(rows,mapping);
 assert.equal(normalized.length,3);
 assert.equal(normalized[0].claim_type,"release");
 assert.equal(normalized[0].evidence_grade,"C");
 assert.equal(normalized[0].measure.unit,"kg");
 assert.ok(Math.abs(normalized[0].measure.value-4.5359237)<1e-8);
 assert.equal(normalized[1].measure.value,0.002);
 assert.equal(normalized[2].measure.value,0.003);
 for(const r of normalized)assert.deepEqual(validateEvidence(r),[]);
 assert.throws(()=>normalize(rows,{...mapping,dioxin_grams_confirmed:false}),/Dioxin units/);
 assert.throws(()=>convertKg(1,"unknown"),/Unsupported/);
});
test("normalizer rejects malformed quoted fields and inconsistent columns",()=>{
 assert.throws(()=>parseCSV('a,b\n"unterminated,foo\n'),/Unterminated/);
 assert.throws(()=>parseCSV("a,b\na,b,c\n"),/Column mismatch/);
});

test("chemical releases of different substances cannot be combined into a false total poison burden",()=>{
 const base=claims[0],b={...claims[1],chemical_identifiers:[{name:"Mercury",cas:"7439-97-6"}]};
 assert.throws(()=>sumComparable([base,b],{nonOverlapAttested:true,attestationSourceUrl:"https://example.org/assessment"}),/Incompatible/);
});

const {compile,makeId}=require("../src/dossier-model.cjs");
const caseExamples=json("data/case-examples.json");
const register=json("docs/dossier-register.json");
test("new Dossier Lab exports exactly match deterministic source evidence",()=>{
 const result=compile({claims,companies:d.companies,countries:work.countries,sources:sources.sources,examples:caseExamples});
 assert.deepEqual(result,register);
 assert.equal(result.totals.company_records,50);
 assert.equal(result.totals.documented_historical_comparators,4);
 assert.equal(result.totals.verified_multi_hazard_dossiers,0);
 assert.equal(result.totals.counsel_authorized_actions,0);
 const ids=new Set();
 for(const item of result.dossiers){
  assert.ok(!ids.has(item.id));ids.add(item.id);
  assert.equal(item.gates.length,7);
  assert.equal(item.gates[0].status,"linked");
  assert.equal(item.gates.filter(g=>g.status==="open").length,6);
  assert.equal(item.readiness.source_anchored,true);
  assert.equal(item.readiness.impact_reviewed,false);
  assert.equal(item.readiness.counsel_cleared,false);
  assert.ok(item.evidence.source.url.startsWith("https://"));
  assert.equal(item.metric.kind,"modeled_producer_attribution");
  assert.equal(item.metric.year,2024);
  assert.deepEqual(item.metric.not_equivalent_to.length,4);
  assert.ok(!item.publication_warning.includes("criminal"));
  assert.ok(item.investigation.source_portals.length>=1);
 }
});
test("full dossier links resolve every producer name",()=>{
 const ids=new Set(register.dossiers.map(x=>x.id));
 for(const e of d.companies)assert.ok(ids.has(makeId(e.name)),e.name);
});
test("historical comparators have primary sources and distinguish legal dispositions",()=>{
 for(const c of register.case_examples){
  assert.ok(c.year>=1950&&c.year<=2026);
  assert.ok(c.finding_kind && c.caveat && c.chain.length>=5);
  assert.ok(c.sources.every(s=>/^https:\/\//.test(s.url)));
  if(c.id==="pfas-water-2024")assert.ok(/does not constitute an admission/.test(c.statement));
 }
 assert.ok(register.case_examples.some(c=>c.id==="minamata-1956"));
 assert.ok(register.case_examples.some(c=>c.id==="brumadinho-2019"));
 assert.ok(register.case_examples.some(c=>c.id==="deepwater-horizon-2010"));
});
test("scientific impact clearance cannot be gained through a reviewed emissions record",()=>{
 const spoofed={...claims[0],status:"reviewed",reviewers:["expert-A","expert-B"],source:{...claims[0].source,snapshot_hash_sha256:"a".repeat(64)}};
 assert.equal(scientificReleaseEligible(spoofed),false);
});
test("dossier page has filtering, evidence audit, comparison and accessible actions",()=>{
 const html=read("docs/dossiers.html");
 for(const id of ["dossierSearch","dossierCountry","dossierSector","dossierSort","dossierCount",
 "dossierList","dossierPanel","compareA","compareB","comparisonPanel","labCaseGrid","labCaseDetail","labMenu","labMobileNav"])
  assert.ok(html.includes('id="'+id+'"'),"Missing Dossier Lab hook: "+id);
 for(const filename of ["dossier-register-data.js","dossier-lab.js","dossier-lab.css"])assert.ok(html.includes(filename));
 assert.ok(read("docs/index.html").includes('href="dossiers.html"'));
 const js=read("docs/dossier-register-data.js");
 assert.ok(js.startsWith("/* GENERATED / Dossier evidence subset; no certified injury claims. */"));
 assert.ok(js.includes("window.POISON_DOSSIERS"));
 assert.equal(register.dossiers.length,50);
});
