"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const d=JSON.parse(fs.readFileSync(path.join(root,"docs/coal-operator-2024.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"docs/chemistry.html"),"utf8");
const siteJS=fs.readFileSync(path.join(root,"docs/operator-benchmark.js"),"utf8");
const companies=JSON.parse(fs.readFileSync(path.join(root,"docs/dossier-register.json"),"utf8")).dossiers.map(x=>x.company);
const rows=new Map(d.rows.map(r=>[r.id,r]));
test("AEP 2024 is labeled a company self-disclosure and not the 50-company cohort",()=>{
 assert.equal(d.report.reporting_year,2024);
 assert.equal(d.report.kind,"operator_disclosure");
 assert.match(d.report.verification_status,/not_independently_reconciled/);
 assert.match(d.report.source_url,/^https:\/\/docs\.aep\.com\//);
 assert.equal(d.report.source_page,1);
 assert.equal(d.report.coal_burned_lb,35059234000);
 assert.ok(!companies.includes("American Electric Power"));
 assert.match(d.report.reporting_scope,/not all AEP-owned generators/);
 assert.ok(d.report.scope_notes.some(x=>/pending/.test(x)));
 assert.ok(d.report.scope_notes.some(x=>/owned by others/.test(x)));
});
test("transcribed operator compounds and AEP original units/media remain exact",()=>{
 assert.equal(d.rows.length,27);
 assert.equal(rows.size,d.rows.length);
 const check=(id,fields,total,unit="lb")=>{
  const r=rows.get(id);assert.ok(r,id);
  assert.deepEqual(r.reported_medium,fields,id);
  assert.equal(r.reported_total,total,id);
  assert.equal(r.total_unit,unit,id);
 };
 check("arsenic",{air_lb:333,water_lb:172,onsite_land_lb:115224,offsite_transfer_lb:1048235},1163964);
 check("mercury",{air_lb:193,water_lb:7,onsite_land_lb:1636,offsite_transfer_lb:620},2456);
 check("lead",{air_lb:725,water_lb:823,onsite_land_lb:108233,offsite_transfer_lb:40768},150548);
 check("selenium",{air_lb:2695,water_lb:4,onsite_land_lb:14175,offsite_transfer_lb:14293},31167);
 check("chromium",{air_lb:2039,water_lb:1760,onsite_land_lb:192575,offsite_transfer_lb:73788},270162);
 check("h2so4-aerosol",{air_lb:779900,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},779900);
 check("hcl-aerosol",{air_lb:212460,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},212460);
 check("hf",{air_lb:274760,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},274760);
 check("benzo-g-h-i-perylene",{air_lb:1,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},1);
 check("pacs",{air_lb:17,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},17);
 check("chlorine",{air_lb:null,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},null);
 check("dioxins-ounces",{air_lb:null,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},null,"oz");
 check("dioxins-ounces-teq",{air_lb:null,water_lb:null,onsite_land_lb:null,offsite_transfer_lb:null},null,"oz TEQ");
  assert.equal(rows.get("dioxin-group").dioxin_air_g,7);
 assert.equal(rows.get("dioxin-group").reported_total,7);
 assert.equal(rows.get("dioxin-group").total_unit,"g");
 assert.equal(rows.get("dioxin-group").reported_medium.air_lb,null);
 assert.match(rows.get("dioxin-group").speciation_note,/NOT.*TEQ/);
 assert.match(rows.get("chromium").speciation_note,/not a measured Cr\(VI\)/);
});
test("missing entries are tagged below reporting level or legally non-required, never zero",()=>{
 const cd=rows.get("cadmium");
 for(const key of ["air_lb","water_lb","onsite_land_lb","offsite_transfer_lb"]){
  assert.equal(cd.reported_medium[key],null);
  assert.equal(cd.unavailable_medium_reason[key],"a_below_EPA_reporting_level");
 }
 assert.equal(cd.reported_total,null);
 const acid=rows.get("h2so4-aerosol");
 assert.equal(acid.unavailable_medium_reason.water_lb,"b_airborne_forms_only_required");
 const dioxin=rows.get("dioxin-group");
 assert.equal(dioxin.unavailable_medium_reason.air_lb,"dioxins_reported_in_grams_separately");
 for(const row of d.rows){
  for(const [key,value] of Object.entries(row.reported_medium)){
   if(value===null)assert.ok(row.unavailable_medium_reason[key],row.id+" "+key);
   else assert.ok(typeof value==="number"&&value>=0,row.id+" "+key);
  }
  if(row.total_unit==="lb"&&row.reported_total!==null){
   const sum=Object.values(row.reported_medium).filter(x=>x!==null).reduce((a,b)=>a+b,0);
   assert.ok(Math.abs(sum-row.reported_total)<=1,"Published rounded components should reconcile to ±1 lb: "+row.id);
  }
 }
 assert.match(rows.get("lead").rounding_note,/one pound/);
 assert.equal(d.report.row_count_including_below_threshold_notations,27);
 assert.deepEqual(d.report.published_total_as_reported,{
  air_lb:1325623,water_lb:563375,onsite_land_lb:4522794,offsite_transfer_lb:2074911,all_media_and_disposal_lb:8486702
 });
 assert.equal(d.report.published_total_as_reported.air_lb+d.report.published_total_as_reported.water_lb+d.report.published_total_as_reported.onsite_land_lb+d.report.published_total_as_reported.offsite_transfer_lb,8486703,
   "Preserve one-pound operator rounding discrepancy; do not rewrite source total");
 assert.equal(rows.get("dioxins-ounces-teq").reported_total,null);
 assert.match(rows.get("dioxins-ounces-teq").speciation_note,/not TEQ/);
});
test("public interface separates operator disclosure from TRI facility importer and prevents toxic rank",()=>{
 assert.equal((html.match(/<main\b/g)||[]).length,1);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 for(const id of ["operator-disclosure","opSearch","opSort","opCount","opRows","opSource","opCoalb","facility-records"])assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes('src="operator-benchmark.js"'));
 assert.ok(html.includes("AEP is <strong>not</strong> one of the 50"));
 assert.ok(html.includes('id="opMediumTotals"'));
 assert.ok(html.includes("pending disclosure"));
 assert.ok(html.includes("off-site transfer"));
 assert.doesNotThrow(()=>new vm.Script(siteJS));
 assert.match(siteJS,/dioxins are separately reported in grams/i);
 assert.match(siteJS,/not higher toxicity/i);
 assert.ok(!/toxicityScore|deathScore|guiltScore|companyRank|riskRank/.test(siteJS));
});
