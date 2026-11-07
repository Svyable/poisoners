"use strict";
/** Public-person provenance and no-unfounded-accusation regression suite. */
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,".."),read=x=>fs.readFileSync(path.join(root,x),"utf8"),json=x=>JSON.parse(read(x));
const {compilePeople,slug}=require("../src/people-model.cjs");
const {privateFieldPaths}=require("../src/index-kernel.cjs");
const officers=json("data/people/verified-officers.json"),roles=json("data/people/research-roles.json");
const countries=json("data/country-workstreams.json"),published=json("docs/people-register.json");
const context={window:{}};vm.runInNewContext(read("docs/data.js"),context,{filename:"data.js"});
const companies=context.window.POISON_DATA.companies;
const build=()=>compilePeople({companies,countries:countries.countries,roles:roles.roles,officers:officers.people});
test("fifty companies have ten individual research-function slots each",()=>{
 const p=build();
 assert.equal(p.counts.companies,50);
 assert.equal(p.counts.role_types,10);
 assert.equal(p.counts.total_research_slots,500);
 assert.equal(p.companies.length,50);
 for(const c of p.companies){
  assert.equal(c.role_slots.length,10);
  assert.equal(new Set(c.role_slots.map(s=>s.slot_id)).size,10);
  for(const [i,s] of c.role_slots.entries()){
   assert.equal(s.slot_number,i+1);
   assert.ok(s.research_question.length>12);
   assert.equal(s.individual_pollution_damage,null);
   assert.equal(s.personal_legal_liability,"not_estimated");
  }
 }
});
test("named-person records are sourced and not fabricated to fill research slots",()=>{
 const p=build();
 assert.equal(p.counts.named_people,34);
 assert.equal(p.counts.unverified_slots,466);
 assert.equal(p.counts.companies_with_source_verified_names,7);
 assert.equal(p.counts.individual_harm_attributions,0);
 assert.equal(p.counts.legal_liability_findings,0);
 assert.equal(p.companies.reduce((n,c)=>n+c.named_disclosures,0),p.persons.length);
 for(const c of p.companies){
  assert.equal(c.role_slots.filter(s=>s.status==="public_officer_identified").length,c.named_disclosures);
  assert.equal(c.role_slots.filter(s=>s.status==="unverified_role_slot").length,10-c.named_disclosures);
  if(!c.named_disclosures)assert.ok(c.role_slots.every(s=>s.name===null));
 }
});
test("every officer has a public SEC primary document and common reporting standard",()=>{
 const p=build(),ids=new Set(),personNames=new Set();
 for(const o of p.persons){
  assert.ok(!ids.has(o.id));ids.add(o.id);
  assert.ok(!personNames.has(o.name));personNames.add(o.name);
  assert.equal(o.compensation.fiscal_year,2025);
  assert.equal(o.compensation.currency,"USD");
  assert.ok(Number.isSafeInteger(o.compensation.reported_total)&&o.compensation.reported_total>0);
  assert.equal(o.compensation.realized_cash,null);
  assert.equal(o.compensation.net_worth,null);
  assert.equal(o.compensation.environmental_damage_profits,null);
  assert.equal(o.individual_damage_attribution,null);
  assert.equal(o.individual_emission_attribution,null);
  assert.equal(o.direct_facility_role,null);
  assert.equal(o.liability_assessment,"not_estimated");
  assert.equal(o.allegation_status,"none_asserted");
  assert.ok(o.source_links.every(x=>x.url.startsWith("https://www.sec.gov/Archives/edgar/")));
  assert.deepEqual(privateFieldPaths(o),[]);
 }
});
test("source register captures seven distinct official SEC document paths",()=>{
 const urls=new Set(published.persons.map(o=>o.source_links[0].url));
 assert.equal(urls.size,7);
 for(const url of urls)assert.ok(url.includes("/Archives/edgar/data/"));
});
test("compiler emits the exact generated public register without drift",()=>{
 const p=build();
 assert.deepStrictEqual(JSON.parse(JSON.stringify(p)),published);
 const client=read("docs/people-register-data.js");
 assert.ok(client.startsWith("/* GENERATED public people research matrix. Roles are not liability ranks. */"));
 const content=client.slice(client.indexOf("window.POISON_PEOPLE = ")+"window.POISON_PEOPLE = ".length).trim().replace(/;$/,"");
 assert.deepStrictEqual(JSON.parse(content),published);
});
test("no person is portrayed as individually responsible based on role or corporate pay",()=>{
 for(const c of published.companies){
  for(const s of c.role_slots){
   assert.equal(s.individual_pollution_damage,null);
   assert.equal(s.personal_legal_liability,"not_estimated");
   assert.ok(s.caution.includes("not a ranked allegation"));
  }
 }
 assert.ok(published.statement.includes("not identified polluters"));
 assert.ok(published.scoring_policy.includes("No individual harm"));
});
test("source date mismatch, duplicate person or private data fail closed",()=>{
 const base=officers.people[0];
 const clone=JSON.parse(JSON.stringify(base));
 assert.throws(()=>compilePeople({companies,countries:countries.countries,roles:roles.roles,officers:[base,base]}),/Duplicate/);
 clone.home_address="A private residence";
 assert.throws(()=>compilePeople({companies,countries:countries.countries,roles:roles.roles,officers:[clone]}),/prohibited/);
 const clone2=JSON.parse(JSON.stringify(base));clone2.source_links[0].filing_date="2026";
 assert.throws(()=>compilePeople({companies,countries:countries.countries,roles:roles.roles,officers:[clone2]}),/Public sourced SEC/);
 const clone3=JSON.parse(JSON.stringify(base));clone3.compensation.reported_total=Infinity;
 assert.throws(()=>compilePeople({companies,countries:countries.countries,roles:roles.roles,officers:[clone3]}),/exact comparable/);
});
test("available legal screening routes require independent facts and counsel",()=>{
 assert.equal(published.legal_research_routes.length,4);
 const epa=published.legal_research_routes.find(x=>x.id==="US_CERCLA");
 assert.ok(epa.source_url.startsWith("https://www.epa.gov"));
 assert.ok(epa.controlling_case_url.includes("524/51"));
 assert.ok(epa.needs.some(x=>/operation/.test(x)));
 const international=published.legal_research_routes.find(x=>x.id==="OTHER_COUNTRIES");
 assert.equal(international.status,"local_counsel_required");
 assert.ok(international.principle.includes("No universal class-action"));
 for(const r of published.legal_research_routes)assert.ok(r.defendant_status);
});
test("people pages include accessible filters, exports, legal gates and navigable links",()=>{
 const html=read("docs/people.html");
 for(const id of ["peopleMain","peopleWorkspace","companySearchPeople","companyCountryPeople","companySortPeople","resetCompanyFilters",
 "peopleCompanyMenu","peopleCompanyProfile","personSearch","personCountry","personRole","personSort","personReset","favoritesOnly",
 "peopleTableRows","peopleDetail","downloadPeopleCsv","routeTabs","routePanel","peopleMenu","peopleMobileNav"])
  assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes('src="people-register-data.js"'));
 assert.ok(html.includes('src="people-app.js"'));
 assert.ok(html.includes('href="people-register.json"'));
 assert.ok(html.includes('href="people-methodology.html"'));
 const methods=read("docs/people-methodology.html");
 assert.ok(methods.includes('id="compensation"'));
 assert.ok(methods.includes("Bestfoods"));
 assert.ok(methods.includes("Rule of Civil Procedure 11"));
});
test("all published companies are mapped exactly once, and no spoofed country is added",()=>{
 const ids=new Set(published.companies.map(c=>c.company_id));
 assert.equal(ids.size,companies.length);
 for(const c of companies)assert.ok(ids.has(slug(c.name)),c.name);
 const codes=new Set(published.companies.map(c=>c.country_code));
 assert.equal(codes.size,10);
});
test("non-officer research slots contain no invented persons, finances or verdicts",()=>{
 const empty=published.companies.flatMap(c=>c.role_slots).filter(s=>s.status==="unverified_role_slot");
 assert.equal(empty.length,466);
 for(const slot of empty){
  assert.equal(slot.name,null);
  assert.equal(slot.named_person_id,null);
  assert.equal(slot.source_url,null);
  assert.equal(slot.reported_compensation_2025_usd,null);
  assert.equal(slot.individual_pollution_damage,null);
  assert.equal(slot.personal_legal_liability,"not_estimated");
 }
});
