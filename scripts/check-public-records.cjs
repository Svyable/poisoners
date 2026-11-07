#!/usr/bin/env node
"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"../docs");
const catalog=JSON.parse(fs.readFileSync(path.join(root,"public-record-portals.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"public-records.html"),"utf8");
const hosts=new Set(["www.who.int","www.airnow.gov","echo.epa.gov","www.epa.gov","airindex.eea.europa.eu","industry.eea.europa.eu","www.canada.ca","pollution-waste.canada.ca","check-air-quality.service.gov.uk","www.data.gov.uk","www.dcceew.gov.au"]);
assert.equal(catalog.schema_version,1);
assert.equal(catalog.portals.length,12);
assert.equal(catalog.groups.length,6);
const ids=new Set(),groups=new Set(catalog.groups.map(g=>g.id));
for(const p of catalog.portals){
 assert(!ids.has(p.id),"Duplicate portal: "+p.id);ids.add(p.id);
 assert(groups.has(p.group),"Unknown geographic group: "+p.group);
 for(const k of ["id","name","authority","coverage","vintage","finds","how","limit","url"])assert(typeof p[k]==="string"&&p[k].trim(),"Missing field "+k+" in "+p.id);
 const url=new URL(p.url);assert.equal(url.protocol,"https:");assert(hosts.has(url.hostname),"Unreviewed portal host "+url.hostname);
 assert(html.includes('id="'+p.id+'"'),"Portal not displayed: "+p.id);
 assert(html.includes(p.url.replaceAll("&","&amp;")),"Official URL absent: "+p.id);
}
for(const g of catalog.groups)assert(html.includes('id="'+g.id+'"'),"Group not rendered: "+g.id);
assert(html.includes('href="public-record-portals.json"'),"Catalog download missing");
assert(/not a personal|not an individual|not a measured population/i.test(html),"Missing interpretation safeguards");
console.log("OK — 12 official portals with geography, vintage, source links and limits.");
