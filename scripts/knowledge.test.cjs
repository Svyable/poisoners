#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict"),test=require("node:test"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../docs"),read=x=>fs.readFileSync(path.join(root,x),"utf8");
const data=JSON.parse(read("knowledge-register.json")),html=read("knowledge.html");
const categories=new Set(data.categories.map(x=>x.id));
const sourceMap=new Map(data.sources.map(s=>[s.id,s]));
const topicIds=new Set();
test("knowledge register has reviewed, distinct and categorized public field notes",()=>{
 assert.equal(data.schema_version,1);
 assert.equal(data.reviewed_on,"2026-11-07");
 assert.equal(data.topics.length,24);
 assert.equal(categories.size,4);
 for(const topic of data.topics){
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id),topic.id);
  assert(!topicIds.has(topic.id),topic.id+" duplicate");
  topicIds.add(topic.id);
  assert(categories.has(topic.category),topic.id+": category");
  for(const field of ["title","insight","boundary","next_question"]){
   assert.equal(typeof topic[field],"string");
   assert(topic[field].trim().length>(field==="title"?14:55),topic.id+": "+field);
  }
  assert(topic.source_ids.length>0,topic.id+": no source");
  for(const id of topic.source_ids)assert(sourceMap.has(id),topic.id+": unknown source "+id);
  assert(html.includes('id="note-'+topic.id+'"'),topic.id+": missing rendered anchor");
  const [page,hash]=topic.related_href.split("#");
  assert(fs.existsSync(path.join(root,page)),topic.id+": missing linked research page");
  if(hash)assert(read(page).includes('id="'+hash+'"'),topic.id+": missing research anchor");
  if(topic.workbench_concern)assert(["air","water","releases","compliance"].includes(topic.workbench_concern),topic.id+": bad workbench route");
 }
});
test("citations identify authorities, use HTTPS, and are present in visible source text",()=>{
 assert.equal(sourceMap.size,data.sources.length,"Duplicate source IDs");
 assert(data.sources.length>=20,"Missing knowledge source provenance");
 for(const source of data.sources){
  assert(source.publisher&&source.title&&source.kind,source.id+": incomplete source metadata");
  const url=new URL(source.url);
  assert.equal(url.protocol,"https:",source.id+": HTTPS required");
  assert(["epa.gov","atsdr.cdc.gov","usgs.gov","who.int","noaa.gov","nih.gov","influencemap.org","airnow.gov","pca.state.mn.us","sec.gov"].some(host=>url.hostname===host||url.hostname.endsWith("."+host)),source.id+": source host not in reviewed allowlist");
  assert(html.includes(source.url.replaceAll("&","&amp;")),source.id+": source link omitted");
 }
});
test("static markup and search/navigation affordances are complete",()=>{
 assert.equal((html.match(/class="ka-card"/g)||[]).length,data.topics.length);
 assert.equal((html.match(/<details class="ka-detail">/g)||[]).length,data.topics.length);
 assert(html.includes('id="kaSearch"'));
 assert(html.includes('id="kaFilters"'));
 assert(html.includes('id="kaCount"'));
 assert(html.includes('id="kaEmpty"'));
 assert(html.includes('src="knowledge-app.js"'));
 assert(html.includes('href="knowledge-register.json"'));
 assert(html.includes("WHAT IT DOES NOT ESTABLISH"));
 assert(html.includes("TRACE THE ORIGINAL SOURCES"));
 assert(!html.includes('name="robots" content="noindex"'));
});
