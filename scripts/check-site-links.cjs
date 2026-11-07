#!/usr/bin/env node
"use strict";
/** Strict, dependency-free build-time validation of in-repository HTML navigation. */
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../docs");
const htmlFiles=fs.readdirSync(root).filter(f=>f.endsWith(".html"));
const errors=[],links=[];
const htmlByName=new Map(htmlFiles.map(f=>[f,fs.readFileSync(path.join(root,f),"utf8")]));
const validIds=new Map([...htmlByName].map(([name,html])=>[name,new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
function validateHref(owner,href){
 if(!href||href==="#")return;
 if(/^(?:https?:|mailto:|tel:)/i.test(href))return;
 if(/^(?:javascript:|data:|file:)/i.test(href)){errors.push(owner+": unsafe link scheme "+href);return}
 if(href.startsWith("//")){errors.push(owner+": scheme-relative URL not allowed "+href);return}
 const [relative,anchor]=href.split("#",2);
 const pathname=relative.split("?")[0];
 const resolved=path.resolve(root,path.dirname(owner),pathname||owner);
 if(resolved!==root && !resolved.startsWith(root+path.sep)){errors.push(owner+": path escapes docs folder "+href);return}
 if(!fs.existsSync(resolved)){errors.push(owner+": local link not found "+href);return}
 if(anchor && resolved.endsWith(".html")){
  const name=path.relative(root,resolved);
  if(!validIds.get(name)?.has(decodeURIComponent(anchor)))errors.push(owner+": missing anchor in "+href);
 }
 links.push({owner,href});
}
for(const [name,html] of htmlByName){
 const idList=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(idList).size!==idList.length)errors.push(name+": duplicate id in HTML");
 for(const m of html.matchAll(/<(?:a|link|script)\b[^>]*?(?:href|src)="([^"]+)"[^>]*>/gi))validateHref(name,m[1]);
}
if(errors.length){console.error("HTML LINK AUDIT FAILED\n"+errors.join("\n"));process.exitCode=1}
else console.log("OK — "+htmlFiles.length+" HTML pages, "+links.length+" resolved local navigation references, unique element IDs and valid anchors.");
