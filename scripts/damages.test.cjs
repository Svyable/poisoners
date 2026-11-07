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
 assert.ok(d.cases.length>=11);
 const ids=new Set();
 for(const c of d.cases){
  assert.ok(!ids.has(c.id),c.id);ids.add(c.id);
  assert.ok(Array.isArray(c.entities)&&c.entities.length&&c.entities.every(Boolean));
  assert.ok(c.jurisdiction&&c.matter&&c.hazard&&c.outcome_type&&c.disposition&&c.notes);
  assert.ok(Array.isArray(c.indexed_entities));
  assert.ok(["USD","BRL"].includes(c.obligation.currency));
  assert.ok(c.obligation.year>=1990&&c.obligation.year<=d.reference_year);
  assert.ok(Number.isFinite(c.obligation.min)&&c.obligation.min>=0);
  assert.ok(Number.isFinite(c.obligation.max)&&c.obligation.max>=c.obligation.min);
  assert.ok(c.sources.length>=1 && c.sources.every(s=>s.name&&/^https:\/\//.test(s.url)));
  assert.ok(["confirmed_paid","partially_paid","payment_total_unverified"].includes(c.payment.status));
  assert.match(c.payment.as_of,/^20\d\d-\d\d(?:-\d\d)?$/);
  if(c.payment.status==="payment_total_unverified"){assert.equal(c.payment.amount,null);assert.equal(c.payment.value_year,null)}
  else {
   assert.ok(Number.isFinite(c.payment.amount)&&c.payment.amount>0);
   assert.ok(c.payment.amount<=c.obligation.max,"paid total exceeds legal amount: "+c.id);
   if(c.payment.value_year!==null)assert.ok(c.payment.value_year<=d.reference_year);
  }
  assert.ok(Number.isFinite(factor(c.obligation.currency,c.obligation.year)));
  assert.ok(!JSON.stringify(c).toLowerCase().includes("mortality estimate"));
 }
});
test("inflation indexing preserves original currency and calculations",()=>{
 assert.equal(d.inflation.USD.index["1991"],136.2);
 assert.equal(d.inflation.USD.index["2003"],184.0);
 assert.equal(d.inflation.USD.index["2016"],240.007);
 assert.equal(d.inflation.USD.index["2025"],321.943);
 assert.equal(d.inflation.BRL.annual_rates_percent["2025"],4.26);
 const get=id=>d.cases.find(c=>c.id===id);
 const close=(a,b)=>assert.ok(Math.abs(a-b)<0.015e9,`Expected ${a} near ${b}`);
 close(get("exxon-valdez-civil-1991").obligation.max*factor("USD",1991),2.127e9);
 close(get("chevron-refinery-air-2003").obligation.max*factor("USD",2003),6.124e6);
 close(get("3m-minnesota-pfas-2018").obligation.max*factor("USD",2018),1.0898e9);
 close(get("vw-criminal-diesel-2017").obligation.max*factor("USD",2017),3.6778e9);
 close(get("bp-deepwater-2016").obligation.max*factor("USD",2016),27.9e9);
 close(get("vale-brumadinho-2021").obligation.max*factor("BRL",2021),45.59e9);
 assert.equal(get("exxon-valdez-civil-1991").payment.as_of,"2001-09");
 assert.match(get("occidental-passaic-2016").notes,/2026/);
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
 const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
 assert.equal(scripts.length,1);
 assert.doesNotThrow(()=>new vm.Script(scripts[0][1],{filename:"damages-inline.js"}));
});
