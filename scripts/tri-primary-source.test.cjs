"use strict";
/* Pinned independent verification of the original 2024 EPA TX TRI Basic Form R
 * acquisition. This audit is intentionally separate from importer tests:
 * it catches accidental rewrites, lost records, species conflation, and
 * unsupported site-wide/company-wide risk claims in the published snapshot.
 * See original source capture: GitHub Actions run 42448239268.
 */
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const db=JSON.parse(fs.readFileSync(path.join(root,"docs/tri-facility-releases.json"),"utf8"));
const crosswalk=JSON.parse(fs.readFileSync(path.join(root,"data/tri-facility-links.json"),"utf8"));
const official="https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv";
const sha="8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d";
const tfid="77522XXNCH5000B";
const byCas=new Map(db.records.map(r=>[r.cas_number,r]));
function fingerprint(rows){
 const tuples=rows.map(r=>[r.document_control_number,r.chemical_reported,r.cas_number,r.tri_chemical_id,r.tri_classification,r.unit,r.onsite_air_fugitive,r.onsite_air_stack,r.onsite_water]);
 let h=2166136261>>>0;
 for(const c of JSON.stringify(tuples))h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;
 return h;
}
test("original 7.47 MB EPA Texas file, acquisition SHA and 41 source row fingerprint are pinned",()=>{
 assert.equal(db.source_status,"official_form_r_csv_imported");
 assert.equal(db.reporting_year,2024);
 assert.equal(db.source.source_file_sha256,sha);
 assert.equal(db.source.source_origin_url,official);
 assert.equal(db.source.processing_cutoff,"2025-11-05");
 assert.ok(/^2026-11-0[78]$/.test(db.source.source_retrieved_on));
 assert.equal(db.records.length,41);
 assert.equal(db.coverage.inspected_csv_rows,9536);
 assert.equal(db.coverage.excluded_unlinked_rows,9454);
 assert.equal(db.coverage.excluded_unapproved_candidate_rows,41);
 assert.equal(db.coverage.number_of_imported_form_r_rows,41);
 assert.equal(db.coverage.excluded_unlinked_rows+db.coverage.excluded_unapproved_candidate_rows+db.coverage.number_of_imported_form_r_rows,db.coverage.inspected_csv_rows);
 assert.equal(db.coverage.quarantined_parent_mismatch_rows,0);
 assert.equal(db.issues.length,0);
 // Pinned FNV-1a of ALL 41 original source 9-tuples, calculated independently
 // against the GitHub source capture artifact in run 42448239268.
 assert.equal(fingerprint(db.records),3440809367);
});
test("each record is a source-identifiable Baytown Form R, not a whole-company attribution",()=>{
 const approved=crosswalk.facilities.find(x=>x.trifid===tfid);
 assert.ok(approved);
 assert.equal(approved.expected_location.state,"TX");
 assert.equal(approved.expected_location.city,"BAYTOWN");
 assert.ok(approved.expected_location.street_number==="5000");
 assert.ok(approved.expected_location.street_name_token==="BAYWAY");
 assert.equal(crosswalk.facilities.filter(x=>x.reporting_years_approved?.includes(2024)).length,1);
 const docs=new Set(), triChemicalIds=new Set();
 for(const r of db.records){
  assert.equal(r.trifid,tfid);
  assert.equal(r.reporting_year,2024);
  assert.equal(r.reported_state,"TX");
  assert.equal(r.reported_city,"BAYTOWN");
  assert.ok(/5000.*BAYWAY/i.test(r.reported_street_address));
  assert.equal(r.cohort_company,"ExxonMobil");
  assert.equal(r.cohort_company_id,"exxonmobil");
  assert.ok(/EXXON MOBIL CORP/i.test(r.reported_parent));
  assert.ok(/^\d{13}$/.test(r.document_control_number));
  assert.ok(!docs.has(r.document_control_number),"duplicate EPA filing "+r.document_control_number);
  docs.add(r.document_control_number);
  assert.ok(!triChemicalIds.has(r.tri_chemical_id));
  triChemicalIds.add(r.tri_chemical_id);
  assert.equal(r.unit,"lb");
  assert.ok(r.chemical_reported);
  assert.ok(r.facility_evidence_urls.length>=2);
  assert.ok(r.zero_caveat.includes("zero does not prove"));
  for(const field of ["onsite_air_fugitive","onsite_air_stack","onsite_water"]){
   assert.ok(Number.isFinite(r[field])&&r[field]>=0);
  }
  assert.equal(r.onsite_air_total,r.onsite_air_fugitive+r.onsite_air_stack);
  assert.equal(r.toxicity_score,undefined);
  assert.equal(r.attributable_human_deaths,undefined);
 }
 assert.equal(docs.size,41);
});
test("chemical-specific 2024 reporting quantities retain EPA species, medium and filing IDs",()=>{
 const check=(cas,chemical,air,water,doc)=>{
  const r=byCas.get(cas);assert.ok(r,"missing "+cas);
  assert.equal(r.chemical_reported,chemical);
  assert.equal(r.onsite_air_total,air,chemical+" air");
  assert.equal(r.onsite_water,water,chemical+" water");
  assert.equal(r.document_control_number,doc);
 };
 check("71-43-2","Benzene",21300,79,"1324223025798");
 check("106-99-0","1,3-Butadiene",2090,0,"1324223025887");
 check("74-87-3","Chloromethane",153400,3,"1324223025622");
 check("7664-41-7","Ammonia",2530,5914,"1324223025558");
 check("7647-01-0","Hydrochloric acid (acid aerosols including mists, vapors, gas, fog, and other airborne forms of any particle size)",61009,0,"1324223025697");
 check("7664-93-9","Sulfuric acid (acid aerosols including mists, vapors, gas, fog, and other airborne forms of any particle size)",1200,0,"1324223025533");
 check("7783-06-4","Hydrogen sulfide",320,0,"1324223025723");
 check("N511","Nitrate compounds (water dissociable; reportable only when in aqueous solution)",0,77064,"1324223025584");
 check("N458","Mercury  And Mercury Compounds",1,0,"1324223025709");
 check("N420","Lead  And Lead Compounds",30,38,"1324223025735");
 check("N495","Nickel  And Nickel Compounds",58,150,"1324223025750");
});
test("TRI metal-compound reporting categories remain separate from toxicological elemental species",()=>{
 for(const code of ["N420","N458","N495"]){
  const r=byCas.get(code);assert.ok(r);
  assert.equal(r.tri_chemical_id,code);
  assert.equal(r.cas_number,code);
  assert.equal(r.matched_compound_id,null);
  assert.match(r.chemical_identity_note,/do not relabel/);
 }
 assert.ok(byCas.get("191-24-2"));
 assert.equal(byCas.get("191-24-2").onsite_air_total,0);
 assert.match(byCas.get("191-24-2").zero_caveat,/NA|blank/);
 assert.match(db.coverage.description,/not all facilities or all company operations/);
});
