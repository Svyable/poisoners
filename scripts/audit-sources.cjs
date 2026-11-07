#!/usr/bin/env node
"use strict";
/* Link-health metadata only — no page scraping, no data import, no legal publication. */
const fs=require("node:fs"),path=require("node:path");
const sources=JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data/source-catalog.json"),"utf8")).sources;
const online=process.argv.includes("--online");
const reportArg=(()=>{const i=process.argv.indexOf("--report");return i>=0?process.argv[i+1]:null})();
const sleep=()=>Promise.resolve();
function inspect(url){
 const u=new URL(url);
 if(u.protocol!=="https:")throw Error("Non-HTTPS source URL");
 const h=u.hostname.toLowerCase();
 if(h==="localhost"||h.endsWith(".local")||h.endsWith(".internal")||/^(?:127|10|192\.168|169\.254)\./.test(h)||h==="::1")throw Error("Private/local host blocked");
 return u;
}
async function audit(s){
 try{
  inspect(s.url);
  if(!online)return {id:s.id,url:s.url,status:"catalog_valid",http_status:null,notes:"Offline structural validation only"};
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),12000);
  try{
   const r=await fetch(s.url,{method:"HEAD",redirect:"follow",signal:controller.signal,headers:{"User-Agent":"POISONERS-Public-Source-Link-Audit/2.0"}});
   const code=r.status;
   let status=code>=200&&code<400?"reachable":code===401||code===403||code===405||code===429?"access_limited":code===404||code===410?"possibly_removed":"needs_manual_review";
   return {id:s.id,url:s.url,status,http_status:code,notes:code===405?"HEAD unsupported — not evidence of a missing source":"Link health does not verify underlying source facts or data license"};
  }finally{clearTimeout(timer)}
 }catch(e){return {id:s.id,url:s.url,status:"unknown",http_status:null,notes:String(e.message).slice(0,180)}}
}
async function main(){
 const seen=new Set();
 for(const s of sources){if(seen.has(s.id))throw Error("Duplicate source ID");seen.add(s.id);inspect(s.url)}
 const results=[];
 // Small sequential batches, rate-conscious. Every request is an HTTP HEAD.
 for(let i=0;i<sources.length;i+=3){
  results.push(...await Promise.all(sources.slice(i,i+3).map(audit)));
  await sleep();
 }
 const result={version:"2.0.0",check_type:online?"remote_link_headers_only":"offline_catalog_validation",checked_at:new Date().toISOString(),count:results.length,results};
 const json=JSON.stringify(result,null,2)+"\n";
 if(reportArg)fs.writeFileSync(path.resolve(reportArg),json);
 else process.stdout.write(json);
 console.error("SOURCE AUDIT "+results.length+" links; "+results.filter(x=>x.status==="reachable").length+" reachable; "+results.filter(x=>x.status==="possibly_removed").length+" possibly removed. HTTP denial/timeouts do not imply broken sources.");
}
main().catch(e=>{console.error(e);process.exitCode=1});
