#!/usr/bin/env node
"use strict";
/* Build-time accessibility, discoverability and search-link audit; zero dependencies. */
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"../docs");
const names=fs.readdirSync(root).filter(name=>name.endsWith(".html"));
const pages=new Map(names.map(name=>[name,fs.readFileSync(path.join(root,name),"utf8")]));
const ids=new Map([...pages].map(([name,html])=>[name,new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
assert(names.length>=15,"Expected all editorial, People Atlas, glossary and fallback pages");
for(const [name,html] of pages){
 const count=re=>(html.match(re)||[]).length;
 assert(html.toLowerCase().includes("<!doctype html>"),name+": doctype missing");
 assert(html.includes('<html lang="en">'),name+": html language missing");
 assert.equal(count(/<main\b/g),1,name+": exactly one main element required");
 assert.equal(count(/<h1\b/g),1,name+": exactly one h1 required");
 assert.equal(count(/<header\b/g),1,name+": exactly one header required");
 assert.equal(count(/<footer\b/g),1,name+": exactly one footer required");
 assert(html.includes('name="viewport"'),name+": viewport missing");
 assert(html.includes('name="description"'),name+": metadata description missing");
 assert(html.includes("<title>"),name+": title missing");
 assert(html.includes('class="skip"'),name+": skip link missing");
 assert(html.includes('id="siteSearchDialog"'),name+": search dialog missing");
 assert(html.includes('id="siteSearchInput"'),name+": search input missing");
 assert(html.includes('aria-controls="siteSearchDialog"'),name+": search button missing dialog association");
 assert(html.includes('src="site-search.js"'),name+": search script missing");
 assert(html.includes('href="site.css"'),name+": shared design stylesheet missing");
 assert(html.includes('href="glossary.html"'),name+": glossary link missing");
 assert(html.includes('href="workbench.html"'),name+": research workbench link missing");
 assert(html.includes('href="knowledge.html"'),name+": knowledge atlas link missing");
 assert(html.includes('class="site-header polished-header"'),name+": inconsistent shared header");
 assert(html.includes('class="site-footer"'),name+": inconsistent site-wide footer");
 assert(html.includes('class="site-disclosure"'),name+": evidence caveat missing");
 assert(html.includes('class="mobile-nav polished-mobile-nav"'),name+": mobile navigation missing");
 assert(html.includes('aria-label="Primary navigation"'),name+": primary navigation needs an accessible name");
 if(name==="404.html"){
  assert(html.includes('name="robots" content="noindex"'),"404 must not be indexed");
 }else{
  assert(html.includes('href="https://svyable.github.io/poisoners/'+name+'"'),name+": canonical URL missing");
 }
 const idList=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.get(name).size,idList.length,name+": duplicate HTML element id");
}
const index=JSON.parse(fs.readFileSync(path.join(root,"search-index.json"),"utf8"));
const dossiers=JSON.parse(fs.readFileSync(path.join(root,"dossier-register.json"),"utf8"));
assert.equal(index.schema_version,1,"Search index version changed unexpectedly");
const companyIds=new Set(dossiers.dossiers.map(d=>d.id));
const seen=new Set();
for(const item of index.entries){
 assert(["page","section","company","knowledge"].includes(item.type),"Invalid result type");
 assert(item.title&&item.description&&item.keywords,"Incomplete search result");
 assert(/^[a-z0-9-]+\.html(?:\?[^#]*)?(?:#[A-Za-z0-9-]+)?$/.test(item.href),"Unsafe search link: "+item.href);
 const [fileAndQuery,anchor]=item.href.split("#");
 const [filename,query]=fileAndQuery.split("?");
 assert(pages.has(filename),"Missing search target "+item.href);
 if(anchor)assert(ids.get(filename).has(anchor),"Missing search anchor "+item.href);
 if(item.type==="knowledge"){
  assert.equal(filename,"knowledge.html","Knowledge notes must be on the Atlas");
  assert(anchor&&anchor.startsWith("note-"),"Knowledge note missing anchor");
 }
 if(item.type==="company"){
  assert.equal(filename,"dossiers.html","Company references must link to Dossier Lab");
  assert(query&&/^entity=/.test(query),"Missing company entity parameter");
  const id=decodeURIComponent(query.slice(7));
  assert(companyIds.has(id),"Unknown company in search "+id);
  assert(!seen.has(id),"Duplicate company search result "+id);
  seen.add(id);
 }
}
assert.equal(seen.size,companyIds.size,"Not all published company records are searchable");
const knowledge=JSON.parse(fs.readFileSync(path.join(root,"knowledge-register.json"),"utf8"));
assert.equal(index.entries.filter(e=>e.type==="knowledge").length,knowledge.topics.length,"Knowledge notes missing from search index");
assert(index.entries.some(e=>e.type==="page"&&e.href==="workbench.html"),"Research workbench is missing from site search");
console.log("OK — "+names.length+" public pages and "+index.entries.length+" local search entries; "+seen.size+" unique climate-only company profiles.");