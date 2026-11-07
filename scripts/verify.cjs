#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const cp = require("node:child_process");
const root = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root,p),"utf8");
const ctx = {window:{}};
vm.runInNewContext(read("docs/data.js"),ctx,{filename:"docs/data.js"});
const d = ctx.window.POISON_DATA;
assert.ok(d && Object.isFrozen(d));
assert.equal(d.countries.length,10,"Launch cohort must contain exactly ten countries");
assert.equal(d.receptors.length,6);
assert.equal(d.families.length,8);
assert.equal(d.pathways.length,6);
d.pathways.forEach((row) => {assert.equal(row.length,8);row.forEach((n)=>assert.ok([0,1,2].includes(n)))});
assert.ok(d.companies.length>=20,"Source-linked seed unexpectedly small");
assert.equal(new Set(d.countries.map(x=>x.code)).size,d.countries.length,"Duplicate countries");
assert.equal(new Set(d.companies.map(x=>x.name)).size,d.companies.length,"Duplicate entities");
assert.deepEqual(Array.from(d.countries,x=>x.code),["CN","US","IN","RU","ID","BR","IR","JP","SA","CA"]);
const codes = new Set(d.countries.map(x=>x.code));
d.countries.forEach((c,i)=>{assert.ok(Number.isFinite(c.ghg)&&c.ghg>0);if(i) assert.ok(d.countries[i-1].ghg>=c.ghg,"Countries unsorted")});
d.companies.forEach((c)=> {
  assert.ok(codes.has(c.code),"Entity country outside cohort: "+c.name);
  assert.ok(c.name && c.sector && Number.isFinite(c.annual)&&c.annual>0,"Invalid annual metric: "+c.name);
  assert.ok(c.historic===null || (Number.isFinite(c.historic)&&c.historic>=c.annual),"Invalid history: "+c.name);
});
assert.equal(d.companies.find(x=>x.name==="Saudi Aramco").annual,1786);
assert.equal(d.companies.find(x=>x.name==="ExxonMobil").historic,57458);
for (const src of Object.values(d.sources)) {
  assert.ok(/^https:\/\//.test(src.url),"Invalid source URL");
  assert.ok(src.title && src.scope);
}
const files=["docs/index.html","docs/methodology.html","docs/legal.html","docs/case-studies.html","docs/dossiers.html"];
files.forEach((f)=>{
  const content=read(f);
  assert.ok(/<!doctype html>/i.test(content),"Missing doctype: "+f);
  assert.ok(/<title>/.test(content),"Missing title: "+f);
  assert.ok(/name="viewport"/.test(content),"Missing viewport: "+f);
  assert.ok(/styles.css/.test(content),"Missing CSS: "+f);
});
const index=read("docs/index.html");
for(const id of ["companySearch","countryFilter","rateSlider","ledgerBody","countryGrid","heatmap","matrixDetail","sourceLinks","dossierDialog","closeDialog","resultCount","metricNote","metricColumn","noResults","mobileMenu","mobileNav","ledger","futureControls","rateValue"]) {
  assert.ok(index.includes('id="'+id+'"'),"Missing JS-linked element: "+id);
}
cp.execFileSync(process.execPath,["--check",path.join(root,"docs/app.js")],{stdio:"pipe"});
cp.execFileSync(process.execPath,["--check",path.join(root,"docs/data.js")],{stdio:"pipe"});

// Editorial website baseline: every public page exposes consistent navigation,
// source-boundary information and accessible local help without script execution.
for (const filename of ["index.html","dossiers.html","case-studies.html","methodology.html","legal.html","operating-protocol.html","guide.html","data-access.html","about.html"]) {
 const html=read("docs/"+filename);
 assert.match(html,/<header class="site-header polished-header">/,"Missing unified header: "+filename);
 assert.match(html,/<footer class="site-footer"/,"Missing unified footer: "+filename);
 assert.match(html,/class="site-disclosure"/,"Missing research disclosure: "+filename);
 assert.match(html,/href="guide.html"/,"Missing research guide navigation: "+filename);
 assert.match(html,/href="data-access.html"/,"Missing public data navigation: "+filename);
 assert.match(html,/href="site.css"/,"Missing shared editorial stylesheet: "+filename);
 assert.match(html,/src="site.js"/,"Missing shared navigation script: "+filename);
 assert.match(html,/rel="icon"/,"Missing favicon: "+filename);
 assert.match(html,/aria-label="Primary navigation"/,"Missing labeled navigation: "+filename);
 assert.match(html,/aria-expanded="false"/,"Missing mobile menu toggle: "+filename);
}
cp.execFileSync(process.execPath,["--check",path.join(root,"docs/site.js")],{stdio:"pipe"});
console.log("OK — ten-country cohort, "+d.companies.length+" source-linked entities, dimensions, provenance, assets, DOM hooks and JS syntax.");
