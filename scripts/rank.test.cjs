"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const base=path.resolve(__dirname,".."),read=x=>fs.readFileSync(path.join(base,x),"utf8"),json=x=>JSON.parse(read(x));
const model=require("../docs/rank-model.js");
const seedContext={window:{}};vm.runInNewContext(read("docs/data.js"),seedContext);
const snapshots={dossiers:json("docs/dossier-register.json"),people:json("docs/people-register.json"),payments:json("docs/damages-data.json"),foundation:json("docs/foundation.json"),chemistry:json("docs/chemical-hazards.json"),seed:seedContext.window.POISON_DATA};
const rows=model.makeRows(snapshots);
test("all eight source-backed cohorts appear, with expected actual coverage",()=>{
 const counts={companies:50,countries:10,people:34,roles:500,payments:42,metrics:142,chemicals:14,observations:5};
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
 assert.match(mixed.warning,/Select one currency/);
 assert.equal(mixed.appliedMetric,false);
 assert.ok(mixed.rows.every(r=>r.rank===null));
 const usd=model.rank("payments",rows.payments,{metric:"paid",facets:{currency:"USD"},limit:"all"});
 assert.equal(usd.warning,"");
 assert.ok(usd.rows.every(r=>r.currency==="USD"));
 assert.ok(usd.rows.filter(r=>r.paid===null).every(r=>r.rank===null));
 assert.ok(usd.rows.filter(r=>r.paid!==null).every(r=>r.rank!==null));
 const secondaryMixed=model.rank("payments",rows.payments,{metric:"entity",secondary:"paid",facets:{currency:"ALL"}});
 assert.match(secondaryMixed.warning,/Select one currency/);
 assert.ok(secondaryMixed.rows.every(x=>x.rank===null));
 const brl=model.rank("payments",rows.payments,{metric:"obligationMax",facets:{currency:"BRL"}});
 assert.equal(brl.rows.length,3);
 assert.equal(brl.rows[0].currency,"BRL");
 assert.equal(brl.rows[0].rank,1);
});
test("cash-year 2025 CPI ranks only evidenced payments within one currency",()=>{
 const byId=id=>rows.payments.find(r=>r.id===id);
 const near=(x,y,tol=30)=>assert.ok(Math.abs(x-y)<tol,`Expected ${x} near ${y}`);
 near(byId("avx-new-bedford-2013").paidAdjusted,500817157.565);
 near(byId("delaware-pfas-nrd-2021").paidAdjusted,55003844.117);
 near(byId("duke-nc-coal-ash-criminal-2015").paidAdjusted,79732905.657);
 assert.equal(byId("ohio-c8-mdl-2024").paidAdjusted,null,"Known group cash with unresolved year splits remains unknown");
 assert.equal(byId("bp-gulf-nfwf-criminal-2013").paidAdjusted,null,"Multi-year cash may not be indexed at plea year");
 const mixed=model.rank("payments",rows.payments,{metric:"paidAdjusted",facets:{currency:"ALL"}});
 assert.match(mixed.warning,/Select one currency/);
 assert.ok(mixed.rows.every(x=>x.rank===null));
 const ranked=model.rank("payments",rows.payments,{metric:"paidAdjusted",facets:{currency:"USD"},limit:"all"});
 assert.equal(ranked.warning,"");
 assert.ok(ranked.rows.filter(x=>x.paidAdjusted===null).every(x=>x.rank===null));
});
test("future 2026 PFAS obligation is not repriced to 2025 or counted as paid",()=>{
 const c=rows.payments.find(r=>r.id==="3m-afff-pi-2026");
 assert.ok(c);
 assert.equal(c.year,2026);
 assert.equal(c.obligationMax,7350000000);
 assert.equal(c.adjustedMax,null,"2026 to 2025 factor requires a future annual CPI unavailable in reference table");
 assert.equal(c.paid,null);
 assert.equal(c.paidAdjusted,null);
 const vw=rows.payments.find(r=>r.id==="vw-diesel-civil-2016");
 assert.equal(vw.paid,null,"Cross-program FTC report must not be assigned to a 2.0L case");
 const bp=rows.payments.find(r=>r.id==="bp-deepwater-2016");
 assert.equal(bp.paid,2258000000);
 assert.equal(bp.paidAdjusted,null,"Two selected quarters across two cash years must not be repriced as if cumulative");
});
test("source group cohort gate blocks mixing different chemical years, units and populations",()=>{
 const blocked=model.rank("observations",rows.observations,{metric:"mass",facets:{cohort:"ALL"}});
 assert.match(blocked.warning,/Choose one source\/year\/unit/);
 assert.ok(blocked.rows.every(r=>r.rank===null));
 const grouped=model.facetsFor("observations",rows.observations).cohort.filter(x=>x!=="ALL");
 assert.equal(grouped.length,2);
 const secondaryBlocked=model.rank("observations",rows.observations,{metric:"chemical",secondary:"mass",facets:{cohort:"ALL"}});
 assert.match(secondaryBlocked.warning,/Choose one source\/year\/unit/);
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


test("third sorting dimension resolves ties lexicographically without manufacturing impact points",()=>{
 const tiny=[
  {id:"b",annual:20,sector:"Coal",name:"Zulu"},
  {id:"a",annual:20,sector:"Coal",name:"Alpha"},
  {id:"c",annual:20,sector:"Oil & gas",name:"Same"}
 ];
 const r=model.rank("companies",tiny,{metric:"annual",secondary:"sector",secondaryDirection:"asc",
  tertiary:"name",tertiaryDirection:"desc",limit:"all"});
 assert.deepEqual(r.rows.map(x=>x.id),["b","a","c"]);
 assert.deepEqual(r.rows.map(x=>x.rank),[1,1,1],"Equal main observations must remain tied");
 assert.equal(r.config.tertiary,"name");
 assert.equal(model.safeConfig("companies",{metric:"annual",tertiary:"annual"}).tertiary,null);
});
test("advanced independent numeric and categorical rules intersect without cross-metric arithmetic",()=>{
 const q=model.rank("companies",rows.companies,{metric:"annual",limit:"all",
  rules:[{field:"annual",operator:"gte",value:100},{field:"annual",operator:"lte",value:400},
         {field:"cumulative",operator:"present"},{field:"sector",operator:"present"}]});
 assert.ok(q.total>0);
 assert.ok(q.rows.every(r=>r.annual>=100&&r.annual<=400&&r.cumulative!==null));
 assert.ok(q.rows.every(r=>r.rank!==null));
 assert.ok(q.config.rules.length===4);
 const exact=model.rank("companies",rows.companies,{metric:"annual",rules:[{field:"annual",operator:"eq",value:1786}],limit:"all"});
 assert.equal(exact.total,1);
 assert.equal(exact.rows[0].name,"Saudi Aramco");
});
test("unknown-only is distinct from zero, and mutually exclusive with known-only",()=>{
 const unknown=model.rank("roles",rows.roles,{metric:"pay",missingOnly:true,limit:"all"});
 const known=model.rank("roles",rows.roles,{metric:"pay",onlyKnown:true,limit:"all"});
 assert.equal(unknown.total,466);
 assert.equal(known.total,34);
 assert.equal(unknown.summary.known,0);
 assert.ok(unknown.rows.every(x=>x.pay===null&&x.rank===null));
 assert.ok(known.rows.every(x=>x.pay>0&&x.rank!==null));
 const overlap=model.safeConfig("roles",{metric:"pay",onlyKnown:true,missingOnly:true});
 assert.equal(overlap.missingOnly,true);
 assert.equal(overlap.onlyKnown,false);
 const zero=model.rank("payments",rows.payments,{metric:"obligationMin",facets:{currency:"USD"},rules:[{field:"obligationMin",operator:"eq",value:0}],limit:"all"});
 assert.ok(zero.rows.length>0);
 assert.ok(zero.rows.every(x=>x.obligationMin===0&&x.rank!==null));
});
test("advance rule validation strips nonnumeric thresholds, injection and beyond fourth rule",()=>{
 const config=model.safeConfig("companies",{metric:"annual",rules:[
  {field:"name",operator:"gte",value:"abc"},
  {field:"annual",operator:"gte",value:100},
  {field:"annual",operator:"lt",value:1000},
  {field:"country",operator:"missing"},
  {field:"annual",operator:"eq",value:23},
  {field:"annual",operator:"eq",value:42}
 ]});
 assert.deepEqual(config.rules,[{field:"annual",operator:"gte",value:100},
  {field:"annual",operator:"lt",value:1000},{field:"country",operator:"missing",value:null}]);
 const malformed=model.safeConfig("companies",{rules:[{field:"annual",operator:"lte",value:"not-a-number"},
  {field:"__proto__",operator:"present"},{field:"annual",operator:"gte",value:""}]});
 assert.deepEqual(malformed.rules,[]);
});
test("advanced monetary and chemical numeric rules fail closed across incompatible cohorts",()=>{
 const money=model.rank("payments",rows.payments,{metric:"entity",secondary:"status",facets:{currency:"ALL"},
  rules:[{field:"paid",operator:"gte",value:500000000}],limit:"all"});
 assert.match(money.warning,/Select one currency/);
 assert.equal(money.appliedMetric,false);
 assert.equal(money.total,42,"Do not silently compare USD and BRL thresholds");
 const valid=model.rank("payments",rows.payments,{metric:"entity",facets:{currency:"USD"},
  rules:[{field:"paid",operator:"gte",value:500000000}],limit:"all"});
 assert.equal(valid.warning,"");
 assert.ok(valid.rows.every(x=>x.currency==="USD"&&x.paid>=500000000));
 const cohorts=model.facetsFor("observations",rows.observations).cohort;
 const unsafe=model.rank("observations",rows.observations,{metric:"chemical",facets:{cohort:"ALL"},
  rules:[{field:"mass",operator:"gte",value:100}],limit:"all"});
 assert.match(unsafe.warning,/Choose one source/);
 const safe=model.rank("observations",rows.observations,{metric:"mass",facets:{cohort:cohorts[1]},limit:"all"});
 assert.equal(safe.warning,"");
 assert.ok(safe.summary?.known>0);
});
test("distribution summary is calculated across all filtered records, never only the displayed Top 10",()=>{
 const all=model.rank("companies",rows.companies,{metric:"annual",limit:"all"});
 const top=model.rank("companies",rows.companies,{metric:"annual",limit:10});
 assert.equal(top.rows.length,10);
 assert.deepEqual(top.summary,all.summary);
 assert.equal(top.summary.known,50);
 assert.equal(top.summary.missing,0);
 assert.equal(top.summary.max,1786);
 assert.equal(top.summary.min,all.rows.at(-1).annual);
 const invalid=model.rank("payments",rows.payments,{metric:"paid",facets:{currency:"ALL"}});
 assert.equal(invalid.summary,null);
});
test("third sort, AND filters, missing-only and source-safe exports have visible wired controls",()=>{
 const html=read("docs/rankings.html"),app=read("docs/rank-app.js"),css=read("docs/rank.css");
 for(const id of ["rkTertiary","rkTertiaryDirection","rkMissingOnly","rkAddRule","rkRuleList","rkSummary","rkExportAll"]){
  assert.ok(html.includes('id="'+id+'"'),"Missing control "+id);
  assert.ok(app.includes('"'+id+'"'),"Control must be wired "+id);
 }
 assert.match(app,/model\.rank\(/);
 assert.match(app,/data-rule-field/);
 assert.match(app,/getAll\("rule"\)/);
 assert.match(app,/new URLSearchParams/);
 assert.match(css,/rk-rule-row/);
 assert.match(css,/rk-summary-grid/);
 assert.ok(!model.datasets.people.fields.some(x=>/damage|guilt|liability|wealth/i.test(x.id)));
});

test("deep CPI comparison preserves concurrent AVX paid years and new ONGC INR cash",()=>{
 const byId=id=>rows.payments.find(x=>x.id===id);
 assert.ok(Math.abs(byId("ongc-andhra-pradesh-compensation-2023").paidAdjusted-248745724)<10);
 assert.equal(byId("exxonmobil-refinery-stipulated-penalties-2008").paidAdjusted,null);
 assert.equal(byId("cnrl-sneddon-creek-2015").paidAdjusted,null);
 assert.equal(byId("exxonmobil-refinery-penalty-paid-2005").paidAdjusted,null);
 assert.ok(Math.abs(byId("avx-new-bedford-2013").paidAdjusted-500817157.565)<100);
 const cad=model.rank("payments",rows.payments,{metric:"adjustedMax",facets:{currency:"CAD"},limit:"all"});
 assert.equal(cad.rows.length,4);assert.equal(cad.warning,"");
 const inr=model.rank("payments",rows.payments,{metric:"paidAdjusted",facets:{currency:"INR"},limit:"all"});
 assert.equal(inr.rows.length,1);assert.equal(inr.warning,"");
});

test("2025 paid-cash rankings preserve entity grouping and show only sourced amounts for new cases",()=>{
 const get=id=>rows.payments.find(x=>x.id===id);
 const coal=get("coalindia-ccl-jharkhand-environmental-compensation-2022");
 assert.equal(coal.paid,13500000);
 assert.equal(coal.paidAdjusted,null,"Do not invent financial-year cash transfer dates");
 assert.ok(coal.adjustedMax>coal.obligationMax);
 const penn=get("eog-punxsutawney-well-control-2010");
 const nd=get("eog-north-dakota-air-2017");
 const epa=get("eog-epa-texas-new-mexico-2025");
 assert.ok(Math.abs(penn.paidAdjusted-521796.11254)<10);
 assert.ok(Math.abs(nd.paidAdjusted-118699.4069)<10);
 assert.equal(epa.paidAdjusted,412500);
 const guan=get("petrobras-guanabara-bay-fine-2000");
 const par=get("petrobras-iguacu-barigui-parana-fine-2000");
 assert.ok(Math.abs(guan.paidAdjusted-157002554.635)<10);
 assert.ok(Math.abs(par.paidAdjusted-175913226.482)<10);
 assert.equal(guan.currency,"BRL");
 assert.equal(par.currency,"BRL");
 const real=model.rank("payments",rows.payments,{metric:"paidAdjusted",facets:{currency:"BRL"},limit:"all"});
 assert.equal(real.warning,"");
 assert.equal(real.rows.length,3);
 assert.ok(real.rows.every(x=>x.currency==="BRL"));
 assert.ok(real.rows.find(x=>x.id==="vale-brumadinho-2021").paidAdjusted===null);
 const mixed=model.rank("payments",rows.payments,{metric:"paidAdjusted",facets:{currency:"ALL"},limit:"all"});
 assert.match(mixed.warning,/Select one currency/);
});
