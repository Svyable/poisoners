#!/usr/bin/env node
"use strict";
/* Regenerate static, crawler-readable knowledge cards from the reviewed public register. */
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const register=JSON.parse(fs.readFileSync(path.join(root,"docs/knowledge-register.json"),"utf8"));
const htmlPath=path.join(root,"docs/knowledge.html");
const html=fs.readFileSync(htmlPath,"utf8");
const start="<!-- KNOWLEDGE_CARDS_START -->\n",end="<!-- KNOWLEDGE_CARDS_END -->";
const esc=x=>String(x??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const sourceMap=new Map(register.sources.map(s=>[s.id,s]));
function renderTopic(topic) {
 const related=topic.related_href?'<a class="ka-related" href="'+esc(topic.related_href)+'">EXPLORE RELATED RESEARCH ↗</a>':"";
 const work=topic.workbench_concern?'<a class="ka-workbench" href="workbench.html?concern='+esc(topic.workbench_concern)+'&amp;region=united-states">BUILD A SOURCE WORKSHEET ↗</a>':"";
 const citations=topic.source_ids.map(id=>sourceMap.get(id)).map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer"><span>'+esc(s.publisher)+'</span><strong>'+esc(s.title)+'</strong><small>'+esc(s.kind)+' ↗</small></a></li>').join("");
 return '<article class="ka-card" id="note-'+esc(topic.id)+'" data-category="'+esc(topic.category)+'" data-search="'+esc([topic.title,topic.insight,topic.boundary,topic.next_question,...topic.source_ids].join(" ").toLowerCase())+'">\n'+
   '<details class="ka-detail"><summary><span class="ka-card-overline">'+esc(register.categories.find(c=>c.id===topic.category).label)+' / FIELD NOTE</span><strong>'+esc(topic.title)+'</strong><span class="ka-card-deck">'+esc(topic.insight)+'</span><span class="ka-card-open"><span>READ EVIDENCE NOTE</span><b aria-hidden="true">+</b></span></summary>\n'+
   '<div class="ka-card-content"><div class="ka-finding"><span>WHAT THE EVIDENCE SUPPORTS</span><p>'+esc(topic.insight)+'</p></div><div class="ka-limits"><span>WHAT IT DOES NOT ESTABLISH</span><p>'+esc(topic.boundary)+'</p></div><div class="ka-question"><span>THE NEXT USEFUL QUESTION</span><p>'+esc(topic.next_question)+'</p></div><div class="ka-card-sources"><h3>TRACE THE ORIGINAL SOURCES</h3><ul>'+citations+'</ul></div><div class="ka-card-actions">'+related+work+'<a class="ka-permalink" href="#note-'+esc(topic.id)+'">LINK TO THIS NOTE ↗</a></div></div></details></article>\n';
}
assert(html.includes(start)&&html.includes(end),"Knowledge HTML markers missing");
const markerStart=html.indexOf(start)+start.length;
const markerEnd=html.indexOf(end,markerStart);
const expected=register.topics.map(renderTopic).join("");
const actual=html.slice(markerStart,markerEnd);
if(process.argv.includes("--check")){
 assert.equal(actual,expected,"Knowledge Atlas cards stale; run node scripts/build-knowledge.cjs");
 console.log("OK — "+register.topics.length+" static knowledge field notes match the canonical register.");
}else {
 fs.writeFileSync(htmlPath,html.slice(0,markerStart)+expected+html.slice(markerEnd));
 console.log("Updated "+register.topics.length+" static knowledge field notes.");
}
