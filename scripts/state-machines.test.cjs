"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const catalog=JSON.parse(fs.readFileSync(path.join(root,"data/state-machines.json"),"utf8"));
const cli=require("./state-machine.cjs");

test("56 audited machines are unique, reachable and linked to actual owner files",()=>{
 assert.equal(catalog.schema_version,1);
 assert.equal(catalog.machines.length,56);
 const ids=new Set(),groups=new Set();
 for(const m of catalog.machines){
  assert.match(m.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!ids.has(m.id),"Duplicate machine: "+m.id);ids.add(m.id);
  assert.ok(["ui","data","pipeline","automation"].includes(m.group));groups.add(m.group);
  assert.ok(["explicit","observed"].includes(m.mode));
  assert.ok(["memory","url","localStorage","filesystem"].includes(m.persistence));
  assert.ok(m.agent_guard.length>50,"Missing source-safety rule for "+m.id);
  assert.ok(!m.owner.includes("..")&&!path.isAbsolute(m.owner));
  assert.ok(fs.existsSync(path.join(root,m.owner)),m.id+" missing owner: "+m.owner);
  assert.ok(m.states.includes(m.initial)&&m.states.length>=2);
  const edges=new Set();
  for(const t of m.transitions){
   assert.ok(m.states.includes(t.from)&&m.states.includes(t.to),m.id+" has invalid edge");
   assert.match(t.event,/^[a-zA-Z][a-zA-Z0-9_]*$/);
   const key=t.from+":"+t.event;
   assert.ok(!edges.has(key),m.id+" has ambiguous event edge "+key);edges.add(key);
  }
  const reachable=new Set([m.initial]);let changed=true;
  while(changed){
   changed=false;
   for(const t of m.transitions)if(reachable.has(t.from)&&!reachable.has(t.to)){reachable.add(t.to);changed=true}
  }
  assert.deepEqual(m.states.filter(x=>!reachable.has(x)),[],m.id+" has unreachable states");
 }
 assert.deepEqual([...groups].sort(),["automation","data","pipeline","ui"].sort());
 assert.equal(catalog.machines.filter(m=>m.mode==="explicit").length,4,"Only search, Rank source, Workbench source and Workbench navigation have explicit running transitions");
 assert.equal(catalog.machines.find(m=>m.id==="global-search-index").mode,"explicit");
 assert.equal(catalog.machines.find(m=>m.id==="global-search-dialog").mode,"observed");
});

test("agent tooling emits machine-readable catalogs and refuses invented state events",()=>{
 const list=cli.main(["list"]);
 assert.equal(list.count,56);
 const search=cli.main(["show","global-search-index"]);
 assert.equal(search.initial,"idle");
 assert.deepEqual(search.transitions.map(t=>t.event),["load","resolve","reject","retry"]);
 const trace=cli.main(["replay","global-search-index","load","reject","retry","resolve"]);
 assert.deepEqual(trace.trace.map(t=>t.state),["idle","loading","error","loading","ready"]);
 assert.equal(trace.final,"ready");
 assert.throws(()=>cli.main(["replay","global-search-index","resolve"]),/Invalid transition/);
 assert.throws(()=>cli.main(["replay","global-search-index","load","load"]),/Invalid transition/);
 assert.throws(()=>cli.main(["show","unregistered-machine"]),/Unknown machine/);
});

test("existing native search really owns the documented four-phase transition table and keyboard source contract",()=>{
 const script=fs.readFileSync(path.join(root,"docs/site-search.js"),"utf8");
 assert.match(script,/const transitions=Object\.freeze/);
 for(const phrase of ["idle:{load:","loading:{resolve:","error:{retry:","dialog.showModal()","openCycle","pending","aria-busy","Retry search","guide.html"])
  assert.ok(script.includes(phrase),"Missing search lifecycle behavior: "+phrase);
 const tests=fs.readFileSync(path.join(root,"scripts/site-search.test.cjs"),"utf8");
 for(const phrase of ["closing and reopening","cached index","in-dialog retry"])
  assert.match(tests,new RegExp(phrase,"i"),"Runtime search behavior lacks corresponding DOM test: "+phrase);
});

test("data-evidence and private worksheet transitions cannot be mislabeled as verification",()=>{
 const byId=id=>catalog.machines.find(m=>m.id===id);
 const money=byId("payment-evidence-grade");
 assert.equal(money.initial,"payment_total_unverified");
 assert.ok(money.transitions.some(t=>t.event==="RETRACT_EVIDENCE"&&t.to==="partially_paid"));
 assert.match(money.agent_guard,/settlement|recipient|agreement/i);
 const tri=byId("tri-import-gate");
 assert.ok(tri.transitions.some(t=>t.to==="quarantined"));
 assert.match(tri.agent_guard,/parent|company/i);
 const notes=byId("workbench-worksheet");
 assert.equal(notes.persistence,"memory");
 assert.match(notes.agent_guard,/Notes remain in volatile browser memory/);
 assert.ok(catalog.cross_cutting_guards.some(x=>x.includes("workbench notes")));
 assert.ok(catalog.cross_cutting_guards.some(x=>x.includes("currencies")));
});

test("shared pure Rank and Workbench contracts are reflected by canonical transition table",()=>{
 const byId=id=>catalog.machines.find(m=>m.id===id);
 for(const id of ["rank-snapshots-loader","workbench-catalog-loader"]){
  const m=byId(id);
  assert.equal(m.mode,"explicit");
  assert.deepEqual(m.states,["idle","loading","ready","error"]);
  assert.ok(m.transitions.some(t=>t.from==="error"&&t.event==="LOAD"&&t.to==="loading"));
  assert.ok(m.transitions.some(t=>t.from==="loading"&&t.event==="FAIL"&&t.to==="error"));
  assert.ok(m.transitions.some(t=>t.from==="loading"&&t.event==="SUCCEED"&&t.to==="ready"));
  assert.match(m.agent_guard,/retry|request/i);
 }
 const selection=byId("workbench-history-navigation");
 assert.equal(selection.mode,"explicit");
 assert.equal(selection.persistence,"url");
 assert.deepEqual(selection.transitions.map(t=>t.event),["INIT","SELECT","RESTORE"]);
 assert.match(selection.agent_guard,/notes|browser-memory-only/i);
});
