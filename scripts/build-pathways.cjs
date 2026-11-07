#!/usr/bin/env node
"use strict";
/* Rebuild static chemical routes from reviewed compound, note, and official-record catalogs. */
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),read=name=>JSON.parse(fs.readFileSync(path.join(root,"docs",name),"utf8"));
const chemistry=read("chemical-hazards.json"),knowledge=read("knowledge-register.json"),portals=read("public-record-portals.json"),routes=read("pathway-routes.json");
const file=path.join(root,"docs/pathways.html"),html=fs.readFileSync(file,"utf8");
const cmpById=new Map(chemistry.compounds.map(x=>[x.id,x])),noteById=new Map(knowledge.topics.map(x=>[x.id,x])),portalById=new Map(portals.portals.map(x=>[x.id,x]));
const esc=x=>String(x??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function card(route) {
 const c=cmpById.get(route.chemical_id),tags=c.media.map(m=>'<span>'+esc(m.toUpperCase())+'</span>').join("");
 const guides=route.knowledge_ids.map(id=>noteById.get(id)).map(n=>'<li><a href="knowledge.html#note-'+esc(n.id)+'"><strong>'+esc(n.title)+'</strong><span>READ EVIDENCE NOTE ↗</span></a></li>').join("");
 const leads=route.portal_ids.map(id=>portalById.get(id)).map(p=>'<li><a href="public-records.html#'+esc(p.id)+'"><strong>'+esc(p.name)+'</strong><span>'+esc(p.authority)+' · CHECK COVERAGE ↗</span></a></li>').join("");
 const sources=c.sources.map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+' ↗</a></li>').join("");
 return '<article class="px-card" id="route-'+esc(c.id)+'" data-media="'+esc(c.media.join(" "))+'" data-family="'+esc(c.family)+'" data-search="'+esc([c.name,c.symbol,c.cas||"",c.family,c.chemistry,c.health,c.environment,c.media.join(" "),route.next_question,route.boundary].join(" ").toLowerCase())+'"><details class="px-details"><summary><span class="px-card-overline">'+esc(c.family.toUpperCase())+' / CHEMICAL EVIDENCE ROUTE</span><span class="px-card-head"><b>'+esc(c.symbol)+'</b><strong>'+esc(c.name)+'</strong></span><span class="px-media">'+tags+'</span><span class="px-card-hint">TRACE THE EVIDENCE <i aria-hidden="true">+</i></span></summary><div class="px-card-body"><div class="px-what"><span>IDENTITY AND ENVIRONMENTAL BEHAVIOR</span><p>'+esc(c.chemistry)+'</p><p class="px-secondary">'+esc(c.environment)+'</p></div><div class="px-limit"><span>WHAT IS NOT DEMONSTRATED</span><p>'+esc(route.boundary)+'</p></div><div class="px-next"><span>THE NEXT USEFUL INVESTIGATION</span><p>'+esc(route.next_question)+'</p></div><div class="px-card-columns"><section><h3>READ THE EVIDENCE METHODS</h3><ul>'+guides+'</ul></section><section><h3>FIND OFFICIAL PUBLIC RECORDS</h3><ul>'+leads+'</ul></section></div><section class="px-original"><h3>ORIGINAL CHEMICAL REFERENCES</h3><ul>'+sources+'</ul><p>Source links are research references, not verified measurements for a particular facility or person.</p></section><div class="px-card-actions"><a href="workbench.html?concern='+esc(route.workbench_concern)+'&amp;region=united-states">BUILD A RESEARCH WORKSHEET ↗</a><a href="#route-'+esc(c.id)+'">LINK TO THIS ROUTE ↗</a><a href="chemistry.html#chemical-matrix">COMPARE CHEMICAL CLASSES ↗</a></div></div></details></article>\n';
}
assert.equal(routes.routes.length,chemistry.compounds.length,"Compound crosswalk is incomplete");
for(const r of routes.routes){
 assert(cmpById.has(r.chemical_id),"Unknown chemical route "+r.chemical_id);
 for(const id of r.knowledge_ids)assert(noteById.has(id),"Missing note "+id);
 for(const id of r.portal_ids)assert(portalById.has(id),"Missing portal "+id);
}
const start="<!-- PATHWAY_CARDS_START -->\n",end="<!-- PATHWAY_CARDS_END -->";
assert(html.includes(start)&&html.includes(end),"Pathway card generator markers are missing");
const first=html.indexOf(start)+start.length,last=html.indexOf(end,first);
const desired=routes.routes.map(card).join("");
if(process.argv.includes("--check")){
 assert.equal(html.slice(first,last),desired,"Chemical routes are stale; run node scripts/build-pathways.cjs");
 console.log("OK — "+routes.routes.length+" generated chemical pathways preserve original source links and research limits.");
}else{
 fs.writeFileSync(file,html.slice(0,first)+desired+html.slice(last));
 console.log("Generated "+routes.routes.length+" static chemical evidence routes.");
}
