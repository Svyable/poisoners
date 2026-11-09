#!/usr/bin/env node
"use strict";
/* Complements canonical scripts/state-machines.test.cjs and site-search.test.cjs:
 * tests the pure cross-app adapter, browser history policy and owner coverage. */
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const ui=require("../docs/site.js");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const registry=JSON.parse(read("data/state-machines.json"));
const evt=(type,request)=>({type,request});

test("shared resource transition contract is immutable, explicit and fails closed",()=>{
 assert.equal(ui.version,1);
 assert.deepEqual(ui.contracts.resource.states,["idle","loading","ready","error"]);
 assert.deepEqual(ui.contracts.resource.events,["LOAD","SUCCEED","FAIL","RESET"]);
 const idle=ui.makeResource();
 assert.deepEqual(idle,{phase:"idle",request:0});assert(Object.isFrozen(idle));
 const loading=ui.transitionResource(idle,evt("LOAD"));
 assert.deepEqual(loading,{phase:"loading",request:1});
 assert.equal(ui.transitionResource(loading,evt("LOAD")),loading,"Do not start duplicate in-flight work");
 const done=ui.transitionResource(loading,evt("SUCCEED",loading.request));
 assert.deepEqual(done,{phase:"ready",request:1});
 assert.equal(ui.transitionResource(done,evt("FAIL",loading.request)),done);
 assert.deepEqual(idle,{phase:"idle",request:0},"Inputs never mutate");
 assert.throws(()=>ui.transitionResource({},evt("LOAD")),TypeError);
 assert.throws(()=>ui.transitionResource(idle,{type:"UNKNOWN"}),TypeError);
});

test("resource failure retries, ignores stale completions and guards reset races",()=>{
 const first=ui.transitionResource(ui.makeResource(),evt("LOAD"));
 const error=ui.transitionResource(first,evt("FAIL",first.request));
 assert.equal(error.phase,"error");
 const retry=ui.transitionResource(error,evt("LOAD"));
 assert.equal(retry.request,first.request+1);
 assert.equal(ui.transitionResource(retry,evt("SUCCEED",first.request)),retry);
 const ready=ui.transitionResource(retry,evt("SUCCEED",retry.request));
 assert.equal(ready.phase,"ready");
 const reset=ui.transitionResource(ready,evt("RESET"));
 assert.deepEqual(reset,{phase:"idle",request:retry.request+1});
 assert.equal(ui.transitionResource(reset,evt("FAIL",retry.request)),reset);
});

test("Workbench URL selection supports INIT/SELECT/RESTORE without leaking notes",()=>{
 const catalog={concerns:["air","water","releases"],regions:["united-states","canada"]};
 const start=ui.chooseSelection(null,{type:"INIT",concern:"water",region:"canada"},catalog);
 assert.deepEqual(start.state,{concern:"water",region:"canada"});
 assert.equal(start.effect,"replace");
 const chosen=ui.chooseSelection(start.state,{type:"SELECT",concern:"air",region:"canada"},catalog);
 assert.equal(chosen.effect,"push");
 assert.equal(ui.chooseSelection(chosen.state,{type:"SELECT",concern:"air",region:"canada"},catalog).effect,"none");
 const restored=ui.chooseSelection(chosen.state,{type:"RESTORE",concern:"water",region:"canada"},catalog);
 assert.deepEqual(restored.state,start.state);
 assert.equal(restored.effect,"none","Browser Back never creates another history entry");
 const rejected=ui.chooseSelection(restored.state,{type:"SELECT",concern:"invalid",region:"canada"},catalog);
 assert.equal(rejected.state,restored.state);
 assert.equal(rejected.effect,"none");
 const normalized=ui.chooseSelection(restored.state,{type:"RESTORE",concern:"invalid",region:"invalid"},catalog);
 assert.deepEqual(normalized.state,{concern:"air",region:"united-states"});
 assert.equal(normalized.effect,"none");
 assert(!Object.keys(chosen.state).some(k=>/notes|address|history|search/i.test(k)),
  "Pure selection must not store or expose worksheet notes");
});

test("canonical registry covers every production interactive browser owner and marks 4 explicit reducers",()=>{
 assert.equal(registry.schema_version,1);
 assert.equal(registry.machines.length,56);
 const owners=new Set(registry.machines.map(m=>m.owner));
 const interactive=fs.readdirSync(path.join(root,"docs")).filter(name=>name.endsWith(".js")&&
  /addEventListener\s*\(/.test(read("docs/"+name)));
 for(const file of interactive)assert(owners.has("docs/"+file),
  "Missing browser state owner in data/state-machines.json: "+file);
 const expected=["global-search-index","rank-snapshots-loader","workbench-catalog-loader","workbench-history-navigation"];
 const explicit=registry.machines.filter(m=>m.mode==="explicit").map(m=>m.id).sort();
 assert.deepEqual(explicit,expected.sort());
 assert.equal(registry.machines.find(x=>x.id==="global-search-dialog").mode,"observed",
  "Native browser modal stays native rather than duplicating open state");
});

test("all pages load shared site bootstrapping before global search; Rank URL and keyboard shortcuts are stable",()=>{
 const search=read("docs/site-search.js"),workbench=read("docs/workbench-app.js"),rank=read("docs/rank-app.js");
 assert(search.includes("const transitions=Object.freeze"),"Keep the independently tested native search state machine");
 assert(workbench.includes('addEventListener("popstate"'));
 assert(workbench.includes('render("SELECT")')&&workbench.includes('render("RESTORE")'));
 assert(workbench.includes("wbRetrySources")&&workbench.includes("catalogState.phase"));
 assert(rank.includes("data-rank-retry")&&rank.includes("if(!bound){bind();bound=true;}"));
 assert(rank.includes('allowedLimit=["10","25","50","100","all"]'),
  "Copied numeric limit query values should not reset to 25");
 assert(rank.includes("!e.defaultPrevented")&&rank.includes("!e.ctrlKey")&&rank.includes("!e.metaKey"),
  "Global slash shortcut must not be overridden by Rank Lab");
 for(const file of fs.readdirSync(path.join(root,"docs")).filter(x=>x.endsWith(".html"))){
  const html=read("docs/"+file);
  const site=html.indexOf('src="site.js"'),finder=html.indexOf('src="site-search.js"');
  assert(site>=0&&finder>site,file+" must load shared runtime before search");
 }
});
