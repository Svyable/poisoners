#!/usr/bin/env node
"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const model=require("../docs/workbench-model.js");
const catalog=JSON.parse(fs.readFileSync(path.join(__dirname,"../docs/public-record-portals.json"),"utf8"));
test("all curated starting points resolve only to official catalog sources within their coverage group",()=>{
  const ids=new Set(catalog.portals.map(p=>p.id));
  for(const concern of model.concerns)for(const region of model.regions){
    const plan=model.getPlan(catalog,{concern:concern.id,region:region.id});
    assert.equal(plan.concern.id,concern.id);
    assert.equal(plan.region.id,region.id);
    for(const {portal,role} of plan.sources){
      assert(ids.has(portal.id));
      assert(/^https:\/\//.test(portal.url));
      assert(portal.group===region.id || (portal.id==="who-cities" && concern.id==="air" && role.includes("context")));
    }
    if(!plan.hasRegionalSource)assert(plan.boundary.includes("catalog coverage gap"));
  }
});
test("high-value links are precise; unknown jurisdiction/source combinations do not invent recommendations",()=>{
  assert.deepEqual(model.getPlan(catalog,{concern:"water",region:"united-states"}).sources.map(s=>s.portal.id),["us-ccr"]);
  assert.deepEqual(model.getPlan(catalog,{concern:"releases",region:"europe"}).sources.map(s=>s.portal.id),["eu-industrial"]);
  assert.deepEqual(model.getPlan(catalog,{concern:"compliance",region:"canada"}).sources.map(s=>s.portal.id),[]);
  assert.deepEqual(model.getPlan(catalog,{concern:"air",region:"australia"}).sources.map(s=>s.portal.id),["who-cities"]);
  assert.equal(model.getPlan(catalog,{concern:"air",region:"australia"}).hasRegionalSource,false);
  assert.throws(()=>model.getPlan(catalog,{concern:"unknown",region:"canada"}));
  assert.throws(()=>model.getPlan(catalog,{concern:"water",region:"unknown"}));
});
test("exports preserve source provenance, uncertainty and only user-provided local notes",()=>{
  const plan=model.getPlan(catalog,{concern:"releases",region:"united-states"});
  const output=model.createWorksheet(plan,[true,false],["EPA record ID 123", ""]);
  assert(output.includes("EPA Toxics Release Inventory"));
  assert(output.includes("https://www.epa.gov/"));
  assert(output.includes("**Directory reviewed:**"));
  assert(output.includes("Reviewed"));
  assert(output.includes("EPA record ID 123"));
  assert(output.includes("not verified facts"));
  assert(output.includes(plan.boundary));
  assert.equal((output.match(/### [1-6]\./g)||[]).length,6);
});
test("workflow is exact and public links survive the static template",()=>{
  const html=fs.readFileSync(path.join(__dirname,"../docs/workbench.html"),"utf8");
  assert(html.includes('href="public-records.html"'));
  assert(html.includes('id="wbSources"'));
  assert(html.includes('id="wbSteps"'));
  assert(html.includes('src="workbench-model.js"'));
  assert(html.includes('src="workbench-app.js"'));
  assert(html.includes('href="https://svyable.github.io/poisoners/workbench.html"'));
  assert(html.includes("NO NOTES UPLOADED"));
});
