"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const d=JSON.parse(fs.readFileSync(path.join(root,"docs/tri-facility-releases.json"),"utf8"));
const links=JSON.parse(fs.readFileSync(path.join(root,"data/tri-facility-links.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"docs/chemistry.html"),"utf8");
const browser=fs.readFileSync(path.join(root,"docs/tri-facility-ui.js"),"utf8");
const sha="8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d";
const facility="77522XXNCH5000B";
const byCas=new Map(d.records.map(r=>[r.cas_number,r]));
test("published 2024 EPA Texas source is not synthetic and is tied to a fixed real file SHA",()=>{
 assert.equal(d.reporting_year,2024);
 assert.equal(d.source_status,"official_form_r_csv_imported");
 assert.equal(d.source.source_file_sha256,sha);
 assert.equal(d.source.source_file_size_bytes,7474672);
 assert.equal(d.source.source_origin_url,"https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv");
 assert.equal(d.source.processing_cutoff,"2025-11-05");
 assert.match(d.source.source_capture_workflow,/actions\/runs\/42448239268$/);
 assert.equal(d.coverage.inspected_csv_rows,9536);
 assert.equal(d.coverage.number_of_imported_form_r_rows,41);
 assert.equal(d.coverage.excluded_unlinked_rows,9454);
 assert.equal(d.coverage.excluded_unapproved_candidate_rows,41);
 assert.equal(d.coverage.quarantined_parent_mismatch_rows,0);
 assert.equal(d.issues.length,0);
 assert.equal(d.records.length,41);
});
test("all records match reviewed Baytown chemical plant identity, Form R and distinct filing numbers",()=>{
 const approved=links.facilities.find(f=>f.trifid===facility);
 assert.equal(approved.expected_location.state,"TX");
 assert.equal(approved.expected_location.city,"BAYTOWN");
 assert.equal(approved.expected_location.street_name_token,"BAYWAY");
 const docs=new Set(),ids=new Set();
 for(const r of d.records){
  assert.equal(r.trifid,facility);
  assert.equal(r.reporting_year,2024);
  assert.equal(r.reported_state,"TX");
  assert.equal(r.reported_city,"BAYTOWN");
  assert.match(r.reported_street_address,/5000 BAYWAY/);
  assert.equal(r.reported_parent,"EXXON MOBIL CORP");
  assert.equal(r.cohort_company_id,"exxonmobil");
  assert.equal(r.unit,"lb");
  assert.match(r.document_control_number,/^\d{13}$/);
  assert.ok(!docs.has(r.document_control_number));
  docs.add(r.document_control_number);
  assert.ok(!ids.has(r.tri_chemical_id));ids.add(r.tri_chemical_id);
  assert.equal(r.onsite_air_total,r.onsite_air_fugitive+r.onsite_air_stack);
  for(const k of ["onsite_air_fugitive","onsite_air_stack","onsite_water"])
   assert.ok(Number.isFinite(r[k])&&r[k]>=0);
  assert.ok(r.facility_evidence_urls.length>=2);
  assert.ok(r.zero_caveat.includes("zero does not prove"));
 }
 assert.equal(docs.size,41);
});
test("EPA Form R compound-specific release pounds and reporting media match original source",()=>{
 const assertRow=(cas,chemical,air,water,doc)=>{
  const r=byCas.get(cas);assert.ok(r,chemical);
  assert.equal(r.chemical_reported,chemical);
  assert.equal(r.onsite_air_total,air,chemical+" air");
  assert.equal(r.onsite_water,water,chemical+" water");
  assert.equal(r.document_control_number,doc);
 };
 assertRow("71-43-2","Benzene",21300,79,"1324223025798");
 assertRow("106-99-0","1,3-Butadiene",2090,0,"1324223025887");
 assertRow("7647-01-0","Hydrochloric acid (acid aerosols including mists, vapors, gas, fog, and other airborne forms of any particle size)",61009,0,"1324223025697");
 assertRow("7664-93-9","Sulfuric acid (acid aerosols including mists, vapors, gas, fog, and other airborne forms of any particle size)",1200,0,"1324223025533");
 assertRow("7783-06-4","Hydrogen sulfide",320,0,"1324223025723");
 assertRow("74-87-3","Chloromethane",153400,3,"1324223025622");
 assertRow("N511","Nitrate compounds (water dissociable; reportable only when in aqueous solution)",0,77064,"1324223025584");
 assertRow("N458","Mercury  And Mercury Compounds",1,0,"1324223025709");
 assertRow("N420","Lead  And Lead Compounds",30,38,"1324223025735");
 assertRow("N495","Nickel  And Nickel Compounds",58,150,"1324223025750");
});
test("metal category labels and Basic zero-filled values are not silently reclassified as elemental toxic exposure",()=>{
 for(const cas of ["N458","N420","N495"]){
  const r=byCas.get(cas);assert.ok(r);
  assert.equal(r.tri_chemical_id,cas);
  assert.equal(r.matched_compound_id,null);
  assert.ok(r.chemical_identity_note.includes("do not relabel"));
 }
 assert.equal(byCas.get("191-24-2").onsite_air_total,0);
 assert.match(byCas.get("191-24-2").zero_caveat,/blank or NA/);
 assert.equal(d.records.some(r=>r.toxicity_score!==undefined),false);
 assert.equal(d.records.some(r=>r.attributable_deaths!==undefined),false);
 assert.ok(d.disclaimers.some(x=>x.includes("not an ExxonMobil")));
});
test("chemical explorer exposes original Form R rows with source-identity validation, mass-only sorts and 4 selected metrics",()=>{
 for(const id of ["facilityStats","facilityRows","facilitySort","facilityQuery","facilityFileStatus"])
  assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes("41 source-matched EPA Form R"));
 assert.ok(html.includes("not</strong> an entire company")||html.includes("not the entire ExxonMobil Baytown complex"));
 assert.doesNotThrow(()=>new vm.Script(browser));
 assert.match(browser,/mass, NOT toxicity/);
 assert.match(browser,/source_origin_url/);
 assert.ok(!/toxicityScore|deathScore|guiltScore|companyRank/.test(browser));
});
