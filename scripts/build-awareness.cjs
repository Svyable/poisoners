#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const data=JSON.parse(read("docs/awareness-briefs.json"));
assert.equal(data.schema,1);assert.equal(data.briefs.length,10);assert.equal(data.groups.length,4);assert.equal(data.signals.length,3);
const allowed=new Set(["www.who.int","www.epa.gov","www.airnow.gov","health.nih.gov","www.fda.gov","www.cdc.gov"]),ids=new Set();
for(const b of data.briefs){assert(!ids.has(b.id),"Duplicate id");ids.add(b.id);assert(data.groups.some(g=>g.id===b.group),"Unknown group");
 for(const s of b.sources){const url=new URL(s[3]);assert(url.protocol==="https:"&&allowed.has(url.hostname),"Unreviewed source host");assert(s.slice(0,3).every(Boolean),"Missing source provenance");}
 const u=new URL(b.actionUrl);assert(u.protocol==="https:"&&allowed.has(u.hostname),"Unreviewed action link");
 for(const field of ["title","fact","pathway","check","boundary","action"]){assert(typeof b[field]==="string"&&b[field].length>20,"Incomplete awareness brief: "+b.id);}
}
const render=function render(guide,data){
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const link=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
 const main=`<main id="content" class="awareness-page">
<section class="awareness-hero"><div class="shell"><span class="editorial-eyebrow">PUBLIC AWARENESS / ENVIRONMENTAL HEALTH</span><h1>Know the pathway.<br><em>Find the evidence.</em></h1><p>Ten issues people encounter through air, water, food, homes and workplaces. Official primary sources explain what is known, what is uncertain and where to look locally.</p><div class="editorial-hero-actions"><a href="#briefs" class="button-primary">EXPLORE THE BRIEFS ↘</a><a href="#local-records" class="button-quiet">FIND LOCAL INFORMATION ↗</a></div><p class="awareness-hero-note">Reviewed ${esc(data.reviewed_on)} · Educational, not a diagnosis, toxicity ranking or legal conclusion. Reported numbers preserve their original reference years.</p></div></section>
<section class="awareness-global" id="global-context"><div class="shell"><span class="editorial-kicker">GLOBAL SIGNALS / DATED SOURCES</span><h2>Scale needs context.</h2><p>These figures are not comparable, additive, or specific to your community. Each links to the organization reporting it.</p><div class="awareness-signals">${data.signals.map(s=>`<article><strong>${esc(s.value)}</strong><p>${esc(s.label)}</p>${link(s.url,s.date)}</article>`).join("")}</div></div></section>
<nav class="shell awareness-shortcuts" aria-label="Awareness topics"><strong>EXPLORE BY PATHWAY</strong>${data.groups.map(x=>`<a href="#${esc(x.id)}">${esc(x.name)} ↘</a>`).join("")}</nav>
<div class="shell awareness-groups" id="briefs">${data.groups.map(group=>`<section id="${esc(group.id)}" class="awareness-group" aria-labelledby="${esc(group.id)}-title"><div class="awareness-group-head"><span class="editorial-kicker">EXPOSURE PATHWAY / SOURCE-LINKED</span><h2 id="${esc(group.id)}-title">${esc(group.name)}</h2><p>${esc(group.desc)}</p></div><div class="awareness-grid">${data.briefs.filter(b=>b.group===group.id).map(b=>`<article class="awareness-card" id="${esc(b.id)}">
 <span class="awareness-tag">RESEARCH BRIEF · PUBLIC GUIDANCE</span><h3>${esc(b.title)}</h3><p class="awareness-fact">${esc(b.fact)}</p>
 <div class="awareness-field"><strong>How exposure happens</strong><p>${esc(b.pathway)}</p></div>
 <div class="awareness-field"><strong>What you can check</strong><p>${esc(b.check)}</p></div>
 <div class="awareness-next"><strong>OFFICIAL STARTING POINT</strong>${link(b.actionUrl,b.action)}</div>
 <details><summary>Evidence limit & original sources</summary><p class="awareness-limit">${esc(b.boundary)}</p><ol>${b.sources.map(s=>`<li><span>${esc(s[0])} · ${esc(s[2])}</span>${link(s[3],s[1])}</li>`).join("")}</ol></details></article>`).join("")}</div></section>`).join("")}</div>
<section class="awareness-local" id="local-records"><div class="shell"><div><span class="editorial-kicker">LOCAL QUESTIONS / REAL REPORTS</span><h2>Start where exposure can be measured.</h2><p>In the U.S., AirNow and water suppliers' annual reports help you find local information. Owners of private wells may need laboratory testing. Outside the U.S., seek your jurisdiction's air, water, occupational-health or public-health authority. Always follow local alerts.</p></div><div class="awareness-local-links">${link("https://www.airnow.gov/","U.S. current air quality")}${link("https://www.epa.gov/ccr/ccr-information-consumers","U.S. community water reports")}${link("https://www.epa.gov/privatewells/protect-your-homes-water","U.S. private well testing")}</div></div></section>
<section class="shell awareness-closing" id="scope"><span class="editorial-kicker">EVIDENCE BEFORE ATTRIBUTION</span><h2>Risk is not a verdict.</h2><p>These are public-health evidence summaries. A global estimate, detection or industry label does not establish the exposure of one person, the cause of one illness, or the responsibility of one company. For that, the evidence needs source, time, location, pathway, dose and independent review.</p><div><a class="button-primary" href="guide.html#chain">READ THE EVIDENCE CHAIN ↗</a><a class="button-quiet" href="awareness-briefs.json" download>DOWNLOAD SOURCED BRIEFS ↓</a><a class="button-quiet" href="about.html#corrections">SUBMIT A CORRECTION ↗</a></div><p class="awareness-small">Public source URLs and publication labels are included in the downloadable JSON. Do not post private medical or claimant information in public issues.</p></section>
</main>`;
 let h=guide.replace(/<main id="content" class="editorial-main">[\s\S]*?<\/main>/,main);
 h=h.replace(/<title>[^<]+<\/title>/,"<title>Public Awareness & Exposure — POISONERS</title>")
 .replace(/<meta name="description" content="[^"]+">/,'<meta name="description" content="Ten source-linked public health briefs covering fine particles, drinking water, lead, PFAS, mercury, e-waste, radon, heat and silica.">')
 .replace(/<meta property="og:title" content="[^"]+">/,'<meta property="og:title" content="Public Awareness & Exposure — POISONERS">')
 .replace(/<meta property="og:description" content="[^"]+">/,'<meta property="og:description" content="Understand environmental exposure pathways and find reliable local information from WHO, CDC, EPA, NIH and FDA.">')
 .replaceAll("https://svyable.github.io/poisoners/guide.html","https://svyable.github.io/poisoners/awareness.html")
 .replace('<span>Start here</span>','<span>Public awareness</span>')
 .replace('<link rel="stylesheet" href="site.css">','<link rel="stylesheet" href="site.css"><link rel="stylesheet" href="awareness.css">')
 .replace('class="nav-link active" href="guide.html" aria-current="page"','class="nav-link" href="guide.html"')
 .replace('<a href="guide.html" aria-current="page">Start here</a>','<a href="guide.html">Start here</a>');
 // Insert awareness into primary/mobile navigation, or mark it active if already present.
 h=h.replace(/(<nav class="top-nav site-primary-nav"[\s\S]*?)(<\/nav>)/,(whole,head,tail)=>head+(head.includes('href="awareness.html"')?"":'<a class="nav-link" href="awareness.html">Public awareness</a>')+tail);
 h=h.replace(/(<nav id="[^"]+" class="mobile-nav polished-mobile-nav"[\s\S]*?)(<\/nav>)/,(whole,head,tail)=>head+(head.includes('href="awareness.html"')?"":'<a href="awareness.html">Public awareness</a>')+tail);
 h=h.replace('class="nav-link" href="awareness.html"','class="nav-link active" href="awareness.html" aria-current="page"').replace('<a href="awareness.html">Public awareness</a>','<a href="awareness.html" aria-current="page">Public awareness</a>');
 h=h.replace(/(<nav class="site-footer-column" aria-label="Explore the research">[\s\S]*?)(<\/nav>)/,(whole,head,tail)=>head+(head.includes('href="awareness.html"')?"":'<a href="awareness.html">Public awareness</a>')+tail);
 return h;
};
const output=render(read("docs/guide.html"),data),target=path.join(root,"docs/awareness.html");
if(process.argv.includes("--check")){assert.equal(read("docs/awareness.html"),output,"Awareness page stale; run node scripts/build-awareness.cjs");console.log("OK — 10 source-linked public awareness briefs and generated HTML");}
else{fs.writeFileSync(target,output);console.log("Generated docs/awareness.html");}
