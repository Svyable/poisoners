#!/usr/bin/env node
"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict"),test=require("node:test");
const root=path.resolve(__dirname,"../docs"),read=name=>fs.readFileSync(path.join(root,name),"utf8");
const chemical=JSON.parse(read("chemical-hazards.json")),knowledge=JSON.parse(read("knowledge-register.json")),portals=JSON.parse(read("public-record-portals.json")),routes=JSON.parse(read("pathway-routes.json")),html=read("pathways.html");
const chemById=new Map(chemical.compounds.map(c=>[c.id,c]));
const notes=new Set(knowledge.topics.map(n=>n.id));
const portalMap=new Map(portals.portals.map(p=>[p.id,p]));
test("all 14 chemical classes have one distinct, source-anchored route",()=>{
 assert.equal(routes.schema_version,1);
 assert.equal(routes.routes.length,chemById.size);
 assert.equal(chemById.size,14);
 const ids=new Set();
 let methodLinks=0,portalLeads=0;
 for(const route of routes.routes){
  assert(chemById.has(route.chemical_id),route.chemical_id+" missing chemical");
  assert(!ids.has(route.chemical_id),"Duplicate chemical route "+route.chemical_id);
  ids.add(route.chemical_id);
  assert(route.next_question.length>80,"No specific research question "+route.chemical_id);
  assert(route.boundary.length>80,"No evidence limitation "+route.chemical_id);
  assert(["air","water","releases","compliance"].includes(route.workbench_concern));
  assert(route.knowledge_ids.length>=2);
  for(const id of route.knowledge_ids)assert(notes.has(id),"Unknown evidence note "+id);
  for(const id of route.portal_ids){
    const p=portalMap.get(id);
    assert(p,"Unknown portal "+id);
    assert.equal(p.group,"united-states","Crosswalk currently lists US starting points only");
  }
  assert(chemById.get(route.chemical_id).sources.length>0,"Missing chemical primary citations");
  assert(html.includes('id="route-'+route.chemical_id+'"'),"Route anchor missing "+route.chemical_id);
  methodLinks+=route.knowledge_ids.length;
  portalLeads+=route.portal_ids.length;
 }
 assert.equal(methodLinks,42);assert.equal(portalLeads,29);
});
test("original chemical sources, portal leads and knowledge links are rendered",()=>{
 for(const c of chemical.compounds){
  for(const s of c.sources){
   assert(s.title&&s.url.startsWith("https://"));
   assert(html.includes(s.url.replaceAll("&","&amp;")),"Missing original citation "+c.id+": "+s.url);
  }
 }
 for(const r of routes.routes){
  for(const n of r.knowledge_ids)assert(html.includes('href="knowledge.html#note-'+n+'"'));
  for(const p of r.portal_ids)assert(html.includes('href="public-records.html#'+p+'"'));
 }
 assert(html.includes("not a database of sites where contamination has been demonstrated"));
 assert(html.includes("not verified measurements for a particular facility"));
});
test("progressive enhancement, download, and route search are available without invented findings",()=>{
 assert.equal((html.match(/class="px-card"/g)||[]).length,14);
 assert.equal((html.match(/<details class="px-details">/g)||[]).length,14);
 assert(html.includes('href="pathway-routes.json"'));
 assert(html.includes('id="pxSearch"')&&html.includes('id="pxFilters"'));
 assert(html.includes('src="pathways-app.js"'));
 assert(!html.includes('name="robots" content="noindex"'));
 assert(!html.includes("902,000 metric tonnes of mercury"));
});
