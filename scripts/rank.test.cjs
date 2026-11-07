"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const base=path.resolve(__dirname,".."),read=x=>fs.readFileSync(path.join(base,x),"utf8"),json=x=>JSON.parse(read(x));
const model=require("../docs/rank-model.js");
const seedContext={window:{}};vm.runInNewContext(read("docs/data.js"),seedContext);
const snapshots={dossiers:json("docs/dossier-register.json"),people:json("docs/people-register.json"),payments:json("docs/damages-data.json"),foundation:json("docs/foundation.json"),chemistry:json("docs/chemical-hazards.json"),seed:seedContext.window.POISON_DATA};
const rows=model.makeRows(snapshots);
test("all eight source-backed cohorts appear, with expected actual coverage",()=>{
 const counts={companies:50,countries:10,people:34,roles:500,payments:11,metrics:142,chemicals:14,observations:5};
 assert.deepEqual(Object.fromEntries(Object.entries(rows).map(([k,r])=>[k,r.length])),counts);
 assert.equal(Object.keys(model.datasets).length,8);
 for(const [key,set] of Object.entries(model.datasets)){
  assert.ok(set.fields.length>=4);
  assert.ok(rows[key].every(r=>typeof r.id==="string"&&r.boundary&&r.link));
  assert.equal(new Set(rows[key].map(r=>r.id)).size,rows[key].length);
 }
});
test("rank only comparable 2024 corporate producer GHG and keep unknown historical totals unranked",()=>{
 const res=model.rank("companies",rows.companies,{metric:"annual",direction:"desc",limit:"all"});
 assert.equal(res.rows[0].name,"Saudi Aramco");
 assert.equal(res.rows[0].annual,1786);
 assert.equal(res.rows[0].rank,1);
 for(let i=1;i<res.rows.length;i++)assert.ok(res.rows[i-1].annual>=res.rows[i].annual);
 const history=model.rank("companies",rows.companies,{metric:"cumulative",direction:"desc",limit:"all"});
 const nulls=history.rows.filter(r=>r.cumulative===null);
 assert.ok(nulls.length>0);
 assert.ok(nulls.every(x=>x.rank===null));
 assert.ok(history.rows.slice(-nulls.length).every(x=>x.rank===null));
 assert.ok(model.descriptions.companies.includes("Not a facility exposure"));
});
test("2025 country territorial inventory is its own non-additive metric cohort",()=>{
 const res=model.rank("countries",rows.countries,{metric:"territorial",direction:"desc"});
 assert.equal(res.rows[0].name,"China");
 assert.equal(res.rows[0].territorial,15981);
 assert.equal(res.rows[0].rank,1);
 assert.notEqual(rows.companies[0].boundary,rows.countries[0].boundary);
});
test("SEC FY2025 compensation ranks never substitute for individual environmental damage",()=>{
 const res=model.rank("people",rows.people,{metric:"pay",direction:"desc",facets:{company:"ExxonMobil"},limit:"all"});
 assert.equal(res.total,5);
 assert.ok(res.rows[0].pay>=res.rows.at(-1).pay);
 assert.ok(res.rows.every(r=>r.boundary.includes("not realized income")));
 const roles=model.rank("roles",rows.roles,{metric:"pay",direction:"desc",onlyKnown:false,limit:"all"});
 const unknown=roles.rows.filter(r=>r.pay===null);
 assert.equal(unknown.length,466);
 assert.ok(unknown.every(r=>r.rank===null));
 assert.ok(roles.rows.slice(-466).every(r=>r.rank===null));
});
test("payment money sort refuses mixed currency and produces comparable currency-only rankings",()=>{
 const mixed=model.rank("payments",rows.payments,{metric:"obligationMax",facets:{currency:"ALL"},limit:"all"});
 assert.match(mixed.warning,/Select USD or BRL/);
 assert.equal(mixed.appliedMetric,false);
 assert.ok(mixed.rows.every(r=>r.rank===null));
 const usd=model.rank("payments",rows.payments,{metric:"paid",facets:{currency:"USD"},limit:"all"});
 assert.equal(usd.warning,"");
 assert.ok(usd.rows.every(r=>r.currency==="USD"));
 assert.ok(usd.rows.filter(r=>r.paid===null).every(r=>r.rank===null));
 assert.ok(usd.rows.filter(r=>r.paid!==null).every(r=>r.rank!==null));
 const brl=model.rank("payments",rows.payments,{metric:"obligationMax",facets:{currency:"BRL"}});
 assert.equal(brl.rows.length,1);
 assert.equal(brl.rows[0].currency,"BRL");
 assert.equal(brl.rows[0].rank,1);
});
test("source group cohort gate blocks mixing different chemical years, units and populations",()=>{
 const blocked=model.rank("observations",rows.observations,{metric:"mass",facets:{cohort:"ALL"}});
 assert.match(blocked.warning,/Choose one source\/year\/unit/);
 assert.ok(blocked.rows.every(r=>r.rank===null));
 const grouped=model.facetsFor("observations",rows.observations).cohort.filter(x=>x!=="ALL");
 assert.equal(grouped.length,2);
 for(const cohort of grouped){
  const result=model.rank("observations",rows.observations,{metric:"mass",facets:{cohort}});
  assert.equal(result.warning,"");
  assert.equal(new Set(result.rows.map(x=>x.cohort)).size,1);
  assert.ok(result.rows.every(x=>x.rank!==null));
 }
});
test("definition library sorts candidate source count without inventing observed measures",()=>{
 const lib=model.rank("metrics",rows.metrics,{metric:"sources",direction:"desc",facets:{domain:"Air pollutants"}});
 assert.ok(lib.rows.length>0);
 assert.ok(lib.rows.every(x=>x.domain==="Air pollutants"));
 assert.ok(lib.rows.every(x=>x.boundary.includes("Definition only")));
 for(let i=1;i<lib.rows.length;i++)assert.ok(lib.rows[i-1].sources>=lib.rows[i].sources);
 const m=model.rank("metrics",rows.metrics,{metric:"name",direction:"asc",query:"lead"});
 assert.ok(m.rows.every(x=>Object.values(x).join(" ").toLowerCase().includes("lead")));
});
test("compound descriptor filters do not manufacture a toxicity score",()=>{
 const opts=model.facetsFor("chemicals",rows.chemicals);
 assert.ok(opts.family.length>2);
 const filter=model.rank("chemicals",rows.chemicals,{metric:"name",direction:"asc",facets:{family:"sulfur"}});
 assert.ok(filter.rows.length>0);
 assert.ok(filter.rows.every(r=>r.family==="sulfur"));
 assert.ok(!model.datasets.chemicals.fields.some(x=>x.id==="toxicityScore"||x.id==="riskRank"));
});
test("range, filters, secondary ordering, missing values and top-N deterministic behavior",()=>{
 const a=model.rank("companies",rows.companies,{metric:"annual",direction:"desc",facets:{country:"United States"},min:100,max:500,secondary:"name",limit:10});
 assert.ok(a.rows.every(x=>x.country==="United States"&&x.annual>=100&&x.annual<=500));
 const full=model.rank("roles",rows.roles,{metric:"pay",onlyKnown:true,limit:"all"});
 assert.equal(full.total,34);
 const top=model.rank("roles",rows.roles,{metric:"pay",onlyKnown:true,limit:10});
 assert.equal(top.rows.length,10);
 assert.equal(top.skipped,24);
 assert.deepEqual(top.rows.map(x=>x.id),full.rows.slice(0,10).map(x=>x.id));
 assert.deepEqual(model.rank("companies",rows.companies,{metric:"annual",direction:"desc"}).rows.map(x=>x.id),
                  model.rank("companies",rows.companies,{metric:"annual",direction:"desc"}).rows.map(x=>x.id));
});
test("ranked CSV shields spreadsheet formula injection and retains IDs",()=>{
 const raw=model.csv([{id:"bad",name:"=HYPERLINK(1)",pay:145},{id:"ok",name:"Normal",pay:0}],[
 {id:"id",label:"Record ID"},{id:"name",label:"Person"},{id:"pay",label:"Compensation"}
 ]);
 assert.ok(raw.includes("'=HYPERLINK(1)"));
 assert.ok(raw.includes('"145"'));
 assert.ok(raw.includes('"bad"'));
});
test("the front end supports every cohort with accessible working controls and source URLs",()=>{
 const html=read("docs/rankings.html"),js=read("docs/rank-app.js"),css=read("docs/rank.css");
 for(const id of ["rkSearch","rkMetric","rkDirection","rkSecondary","rkSecondaryDirection","rkLimit","rkFacetGrid","rkMin","rkMax","rkOnlyKnown","rkTableBody","rkInspect","rkCompare","rkCsv","rkJson","rkCopyLink","rkSaveView","rkSavedViews","rkDeleteSaved","rkColumns"])
  assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes('src="rank-model.js"'));
 assert.ok(html.includes('src="rank-app.js"'));
 assert.ok(html.includes('href="rank.css"'));
 assert.match(js,/cohortGuard|model\.rank/);
 assert.match(js,/data-pin/);
 assert.match(js,/clipboard/);
 assert.match(css,/@media\(max-width:520px\)/);
 assert.ok(html.includes('id="siteSearchDialog"'));
 assert.ok(html.includes('class="site-footer"'));
});
