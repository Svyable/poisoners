"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const source=JSON.parse(fs.readFileSync(path.join(root,"docs/exposure-benchmarks.json"),"utf8"));
const catalogue=JSON.parse(fs.readFileSync(path.join(root,"docs/chemical-hazards.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"docs/chemistry.html"),"utf8");
const js=fs.readFileSync(path.join(root,"docs/exposure-benchmarks.js"),"utf8");
const ids=new Set(catalogue.compounds.map(c=>c.id));
const map=new Map(source.benchmarks.map(b=>[b.id,b]));
test("EPA air and water reference values are independently sourced, not chemical emission or safety scores",()=>{
 assert.equal(source.schema_version,1);
 assert.equal(source.benchmarks.length,11);
 assert.equal(map.size,source.benchmarks.length);
 assert.equal(source.benchmarks.filter(b=>b.medium==="ambient_air").length,4);
 assert.equal(source.benchmarks.filter(b=>b.medium==="public_drinking_water").length,7);
 assert.ok(source.distinctions.some(s=>/NOT a quantitative claim/.test(s)));
 assert.ok(source.distinctions.some(s=>/MCLs are enforceable/.test(s)));
 assert.ok(source.distinctions.some(s=>/RSEI/.test(s)));
 for(const b of source.benchmarks){
  assert.ok(b.chemical&&b.measurement_species&&b.framework&&b.health_context&&b.statistical_form,b.id);
  assert.ok(Number.isFinite(b.value)&&b.value>0,b.id);
  assert.ok(/^https:\/\/www\.epa\.gov\//.test(b.source_url),b.id);
  assert.equal(b.measured_in_this_project,false,b.id);
  assert.equal(b.risk_score,undefined);
  if(b.related_compound_id!==null)assert.ok(ids.has(b.related_compound_id),b.id);
  if(b.medium==="public_drinking_water")assert.equal(b.unit,"µg/L",b.id);
 }
});
test("NAAQS design forms and units are not confused with EPA TRI stack mass",()=>{
 const check=(id,value,unit,frag)=>{const b=map.get(id);assert.ok(b);assert.equal(b.value,value);assert.equal(b.unit,unit);assert.match(b.statistical_form,new RegExp(frag))};
 check("naaqs-so2-1h",75,"ppb","99th percentile");
 check("naaqs-no2-1h",100,"ppb","98th percentile");
 check("naaqs-pm25-year",9,"µg/m³","Annual mean");
 check("naaqs-pb-3mo",0.15,"µg/m³","3 consecutive monthly means");
 assert.match(map.get("naaqs-no2-1h").measurement_species,/NOT.*NOₓ/);
});
test("EPA MCL values are source-consistent with mg/L-to-µg/L conversion and oxidation state limits",()=>{
 const expected={"mcl-arsenic":10,"mcl-mercury-inorganic":2,"mcl-cadmium":5,"mcl-selenium":50,"mcl-chromium-total":100,"mcl-barium":2000,"mcl-thallium":2};
 for(const [id,value] of Object.entries(expected)){
  assert.equal(map.get(id).value,value,id);
  assert.equal(map.get(id).framework,"EPA primary MCL");
 }
 assert.match(map.get("mcl-mercury-inorganic").measurement_species,/NOT fish methylmercury/);
 assert.match(map.get("mcl-chromium-total").measurement_species,/NOT specific Cr\(VI\)/);
 assert.equal(map.get("mcl-chromium-total").related_compound_id,null,"Do not map EPA total Cr MCL to Cr(VI) toxicity entity");
});
test("public benchmark explorer is searchable, source-linked and distinct from operator release mass",()=>{
 assert.doesNotThrow(()=>new vm.Script(js));
 for(const id of ["exposure-benchmarks","ebSearch","ebMedium","ebCount","ebRows"])assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes('src="exposure-benchmarks.js"'));
 assert.ok(html.includes('href="exposure-benchmarks.json"'));
 assert.ok(html.includes("A pound released is not"));
 assert.ok(html.includes("Do not rank by the smallest number"));
 assert.ok(!/deathScore|toxicityRank|companyRiskRank/.test(js));
});
