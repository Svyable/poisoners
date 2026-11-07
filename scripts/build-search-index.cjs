#!/usr/bin/env node
"use strict";
/* Reproduce the public navigation index from reviewed links and source-bound company records. */
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),"utf8"));
const curated=read("data/site-search-pages.json");
const source=read("docs/dossier-register.json");
assert(Array.isArray(curated)&&Array.isArray(source.dossiers));
const entries=[...curated,...source.dossiers.map(d=>({
 type:"company",
 title:d.company,
 href:"dossiers.html?entity="+encodeURIComponent(d.id)+"#investigate",
 description:d.home_country+" · "+d.sector+" · 2024 production-linked climate observation; not a toxicity or liability finding",
 keywords:[d.company,d.home_country,d.sector,"Carbon Majors greenhouse gas producer",d.home_country_code].join(" ")
}))];
const output=JSON.stringify({
 schema_version:1,
 as_of:source.as_of,
 disclaimer:"Search is a navigation index, not an impact or legal ranking.",
 entries
},null,2)+"\n";
const out=path.join(root,"docs/search-index.json");
if(process.argv.includes("--check")){
 assert.equal(fs.readFileSync(out,"utf8"),output,"Search index is stale; run node scripts/build-search-index.cjs");
 console.log("OK — "+curated.length+" public research routes and "+source.dossiers.length+" verified source-record links.");
}else{
 fs.writeFileSync(out,output);
 console.log("Wrote docs/search-index.json");
}