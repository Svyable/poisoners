"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const d=JSON.parse(fs.readFileSync(path.join(root,"docs/damages-data.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"docs/damages.html"),"utf8");
function factor(currency,year){
 if(currency==="USD")return d.inflation.USD.index[d.reference_year]/d.inflation.USD.index[year];
 if(currency==="BRL"){let v=1;for(let y=year+1;y<=d.reference_year;y++)v*=1+d.inflation.BRL.annual_rates_percent[y]/100;return v}
 throw Error("Unknown currency");
}
test("legal outcomes are documented events rather than an aggregate harm index",()=>{
 assert.equal(d.reference_year,2025);
 assert.equal(d.cases.length,20);
 const ids=new Set();
 for(const c of d.cases){
  assert.ok(!ids.has(c.id),c.id);ids.add(c.id);
  assert.ok(Array.isArray(c.entities)&&c.entities.length&&c.entities.every(Boolean));
  assert.ok(c.jurisdiction&&c.matter&&c.hazard&&c.outcome_type&&c.disposition&&c.notes);
  assert.ok(["USD","BRL"].includes(c.obligation.currency));
  assert.ok(c.obligation.year>=1989&&c.obligation.year<=d.reference_year);
  assert.ok(Number.isFinite(c.obligation.min)&&c.obligation.min>=0);
  assert.ok(Number.isFinite(c.obligation.max)&&c.obligation.max>=c.obligation.min);
  assert.ok(c.sources.length>=1 && c.sources.every(s=>s.name&&/^https:\/\//.test(s.url)));
  assert.ok(["confirmed_paid","partially_paid","payment_total_unverified"].includes(c.payment.status));
  assert.match(c.payment.as_of,/^(?:19|20)\d\d-\d\d(?:-\d\d)?$/);
  if(c.payment.status==="payment_total_unverified"){assert.equal(c.payment.amount,null);assert.equal(c.payment.value_year,null)}
  else {
   assert.ok(Number.isFinite(c.payment.amount)&&c.payment.amount>0);
   assert.ok(c.payment.amount<=c.obligation.max,"paid total exceeds legal amount: "+c.id);
   if(c.payment.value_year!==null)assert.ok(c.payment.value_year<=d.reference_year);
  }
  if(c.party_allocations!==undefined){
   assert.ok(Array.isArray(c.party_allocations)&&c.party_allocations.length>0);
   assert.ok(c.allocation_scope);
   const names=new Set(),sum=c.party_allocations.reduce((acc,a)=>{
    assert.ok(c.entities.includes(a.entity));
    assert.ok(!names.has(a.entity));names.add(a.entity);
    assert.ok(Number.isFinite(a.obligation_amount)&&a.obligation_amount>=0);
    assert.ok(a.paid_amount===null||Number.isFinite(a.paid_amount)&&a.paid_amount>=0);
    assert.ok(["confirmed_paid","group_payment_only"].includes(a.payment_evidence));
    if(a.payment_evidence==="group_payment_only"){assert.equal(a.paid_amount,null);assert.equal(a.paid_value_year,null)}
    return acc+a.obligation_amount;
   },0);
   assert.ok(sum<=c.obligation.max,"Allocations exceed group settlement");
  }
  assert.ok(Number.isFinite(factor(c.obligation.currency,c.obligation.year)));
  assert.ok(!JSON.stringify(c).toLowerCase().includes("mortality estimate"));
 }
});
test("inflation indexing preserves original currency and calculations",()=>{
 assert.equal(d.inflation.USD.index["2016"],240.007);
 assert.equal(d.inflation.USD.index["2025"],321.943);
 assert.equal(d.inflation.BRL.annual_rates_percent["2025"],4.26);
 const get=id=>d.cases.find(c=>c.id===id);
 const close=(a,b)=>assert.ok(Math.abs(a-b)<0.015e9,`Expected ${a} near ${b}`);
 close(get("3m-minnesota-pfas-2018").obligation.max*factor("USD",2018),1.0898e9);
 close(get("vw-criminal-diesel-2017").obligation.max*factor("USD",2017),3.6778e9);
 close(get("bp-deepwater-2016").obligation.max*factor("USD",2016),27.9e9);
 close(get("vale-brumadinho-2021").obligation.max*factor("BRL",2021),45.59e9);
 assert.equal(get("vale-brumadinho-2021").payment.value_year,null,"Do not assign one price year to multi-year transfers");
 assert.equal(get("3m-pws-pfas-2024").payment.amount,null,"Do not mistake scheduled amounts for cash received");
});
test("documented split payments and overlapping cases carry cautions",()=>{
 const c=d.cases.find(x=>x.id==="dupont-chemours-c8-2017");
 assert.deepEqual(c.entities,["DuPont","Chemours"]);
 assert.match(c.payment.detail,/combined payment|half paid/i);
 assert.match(d.cases.find(x=>x.id==="vw-diesel-civil-2016").notes,/criminal fine/);
 assert.match(d.cases.find(x=>x.id==="vale-brumadinho-2021").notes,/must never be added/);
});
test("ledger page is discoverable, script parses, source and method labels visible",()=>{
 for(const id of ["paymentSearch","paymentStatus","paymentCurrency","paymentList","paymentCount"])
  assert.ok(html.includes('id="'+id+'"'),id);
 for(const phrase of ["NOT COMPUTED","NOT VERIFIED","NO CROSS-CASE SUMMATION","damages-data.json","2025 PURCHASING-POWER"])
  assert.ok(html.includes(phrase),phrase);
 const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].filter(s=>s[1].trim().length>0);
 assert.equal(scripts.length,1);
 assert.doesNotThrow(()=>new vm.Script(scripts[0][1],{filename:"damages-inline.js"}));
});

test("source-stated payment dates are not guessed from nominal settlement years",()=>{
 for(const id of ["3m-minnesota-pfas-2018","vw-criminal-diesel-2017"]){
  const p=d.cases.find(x=>x.id===id).payment;
  assert.equal(p.status,"confirmed_paid");
  assert.equal(p.value_year,null,"No unsupported cash-payment inflation base");
 }
});
test("cohort joins are explicit and historical defendants stay distinguishable",()=>{
 const names=new Set((require("../docs/dossier-register.json")).dossiers.map(d=>d.company));
 const links=new Set();
 for(const c of d.cases){
  assert.ok(Array.isArray(c.indexed_entities),c.id);
  for(const n of c.indexed_entities){
   assert.ok(names.has(n),"Unmatched index name "+n);
   links.add(n);
  }
 }
 assert.deepEqual([...links].sort(),["Chevron","ConocoPhillips","ExxonMobil","Occidental Petroleum","Suncor Energy"].sort());
 const ex=d.cases.find(c=>c.id==="exxon-valdez-civil-1991");
 assert.equal(ex.payment.status,"confirmed_paid");assert.equal(ex.payment.amount,900000000);
 assert.equal(ex.payment.value_year,null);assert.equal(ex.payment.as_of,"2001-09");
 assert.equal(d.inflation.USD.index["1991"],136.2);
 assert.ok(Math.abs(ex.obligation.max*d.inflation.USD.index["2025"]/d.inflation.USD.index["1991"]-2127372246)<60000);
 const c=d.cases.find(c=>c.id==="chevron-refinery-air-2003");
 assert.equal(c.payment.status,"confirmed_paid");assert.equal(c.payment.value_year,null);
 assert.match(d.cases.find(c=>c.id==="occidental-passaic-2016").notes,/2026/);
});
test("historical confirmed payments use actual cash years and explicit overlap boundaries",()=>{
 const byId=id=>d.cases.find(c=>c.id===id);
 const bhopal=byId("union-carbide-bhopal-1989");
 assert.equal(d.inflation.USD.index["1989"],124);
 assert.equal(bhopal.payment.amount,470000000);
 assert.equal(bhopal.payment.status,"confirmed_paid");
 assert.equal(bhopal.payment.value_year,null,"Early interim and affiliate-currency transfers must not be put in one payment year");
 assert.match(bhopal.payment.detail,/425m.*45m/);
 assert.ok(bhopal.notes.includes("not a valuation"));
 const anadarko=byId("anadarko-tronox-2015");
 assert.equal(anadarko.obligation.year,2014);
 assert.equal(anadarko.payment.value_year,2015);
 assert.equal(anadarko.payment.as_of,"2015-01-23");
 assert.equal(anadarko.payment.amount,5150000000);
 assert.match(anadarko.notes,/not additional/);
 assert.ok(Math.abs(anadarko.payment.amount*factor("USD",2015)-6.994e9)<0.015e9);
 for(const id of ["bp-gulf-nfwf-criminal-2013","transocean-gulf-nfwf-criminal-2013"]){
  const c=byId(id);
  assert.equal(c.payment.status,"confirmed_paid");
  assert.equal(c.payment.value_year,null,"Multi-year cash flows must not be repriced at the plea year");
  assert.match(c.notes,/subset|INCLUDED/);
  assert.equal(c.obligation.year,2013);
 }
 assert.equal(byId("bp-gulf-nfwf-criminal-2013").payment.amount,2394000000);
 assert.equal(byId("transocean-gulf-nfwf-criminal-2013").payment.amount,150000000);
});
test("company splits are explicit, source-identified and never doubled",()=>{
 for(const id of ["dupont-chemours-c8-2017","union-carbide-bhopal-1989"]){
  const c=d.cases.find(x=>x.id===id);
  assert.ok(Array.isArray(c.payment.allocations)&&c.payment.allocations.length===2);
  assert.deepEqual(c.payment.allocations.map(a=>a.entity),c.entities);
  assert.equal(c.payment.allocations.reduce((s,a)=>s+a.amount,0),c.payment.amount);
  assert.ok(c.payment.allocations.every(a=>a.currency==="USD"&&a.basis));
 }
 assert.match(html,/DOCUMENTED PAYER SPLIT/);
});
test("polished monetary page meets global navigation and findability standard",()=>{
 assert.ok(html.includes('class="site-header polished-header"'));
 assert.ok(html.includes('id="siteSearchDialog"'));
 assert.ok(html.includes('href="glossary.html"'));
 assert.ok(html.includes('href="site.css"'));
 assert.ok(html.includes('href="https://svyable.github.io/poisoners/damages.html"'));
 assert.equal((html.match(/<main\b/g)||[]).length,1);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.ok(!html.includes("\\n@media"));
});

test("independently verified Exxon, Suncor and Ohio joint amounts retain payment boundaries",()=>{
 const get=id=>d.cases.find(x=>x.id===id);
 assert.equal(d.inflation.USD.index["2020"],258.811);
 const criminal=get("exxon-valdez-criminal-1991");
 assert.equal(criminal.payment.amount,125000000);
 assert.equal(criminal.payment.value_year,null);
 const mayflower=get("exxon-mayflower-2015");
 assert.equal(mayflower.payment.amount,4470000);
 assert.match(mayflower.payment.detail,/600k/);
 assert.ok(Math.abs(mayflower.obligation.max*factor("USD",2015)-6070200)<25000);
 const creek=get("duck-otter-creeks-2024");
 assert.equal(creek.payment.amount,7282518.92);
 assert.equal(creek.payment.value_year,null);
 assert.equal(creek.party_allocations.reduce((sum,a)=>sum+a.obligation_amount,0),6322670);
 const chevron=creek.party_allocations.find(a=>a.indexed_entity==="Chevron");
 assert.equal(chevron.obligation_amount,2056250);
 assert.equal(chevron.paid_amount,null);
 assert.match(creek.notes,/Never attribute the whole/);
 const sand=get("suncor-sand-creek-nrd-2014");
 assert.equal(sand.payment.amount,1887000);
 assert.equal(sand.payment.value_year,null);
 assert.equal(d.inflation.USD.index["2014"],236.736);
 assert.ok(Math.abs(sand.obligation.max*factor("USD",2014)-2566000)<25000);
 const refinery=get("suncor-commerce-city-2020");
 assert.equal(refinery.payment.amount,1400000);
 assert.equal(refinery.payment.value_year,null);
 assert.match(refinery.payment.detail,/approximate/i);
 assert.ok(html.includes("PARTY RESTORATION OBLIGATIONS"));
 const dossier=fs.readFileSync(path.join(root,"docs/dossier-lab.js"),"utf8");
 assert.match(dossier,/INDIVIDUAL PAID TOTAL NOT VERIFIED/);
});
