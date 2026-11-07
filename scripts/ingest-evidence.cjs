#!/usr/bin/env node
"use strict";
/**
 * Manual, local, fail-closed intake of PUBLIC documentary evidence.
 * Stage-only; never edits the published snapshot or files a lawsuit.
 *
 * node scripts/ingest-evidence.cjs --input ./public-claims.jsonl
 * node scripts/ingest-evidence.cjs --input ./public-claims.jsonl --write --batch public-batch-001
 */
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {validateEvidence}=require("../src/index-kernel.cjs");
const root=path.resolve(__dirname,"..");
const args=process.argv.slice(2);
const arg=(s)=>{const i=args.indexOf(s);return i<0?null:args[i+1]};
const input=arg("--input");
const doWrite=args.includes("--write");
const batch=arg("--batch");
const fail=(s)=>{console.error("REJECTED: "+s);process.exitCode=1};
if(!input || args.includes("--help")) {
 console.log("Usage: node scripts/ingest-evidence.cjs --input <public-json-or-jsonl> [--write --batch <slug>]");
 if(!input)process.exitCode=1;
} else {
 try {
  const inputFile=path.resolve(input);
  const st=fs.statSync(inputFile);
  if(!st.isFile()||st.size>5_000_000)throw Error("Input must be a public data file <=5 MB");
  const raw=fs.readFileSync(inputFile,"utf8");
  let items;
  if(raw.trim().startsWith("["))items=JSON.parse(raw);
  else items=raw.trim().split(/\r?\n/).filter(Boolean).map((line,i)=>{try{return JSON.parse(line)}catch{throw Error("Invalid JSON line "+(i+1))}});
  if(!Array.isArray(items)||items.length<1||items.length>2000)throw Error("Expected 1–2000 public evidence records");
  const ids=new Set();
  const errors=[];
  for(let i=0;i<items.length;i++){
    const r=items[i];
    const reasons=validateEvidence(r);
    if(r.status==="reviewed")reasons.push("Intake cannot self-assert independently reviewed status");
    if(!Number.isInteger(r.version)||r.version<1)reasons.push("Version must be a positive integer");
    if(ids.has(r.record_id))reasons.push("Duplicate record ID in batch");
    ids.add(r.record_id);
    // Public issue and local intake only: stronger guard against accidentally pasting sensitive contact info.
    const prose=JSON.stringify({description:r.description,limitations:r.limitations,rebuttal:r.rebuttal_url});
    if(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(prose))reasons.push("Potential personal/contact email in public evidence text");
    if(reasons.length)errors.push("Record "+(i+1)+" ["+(r.record_id||"?")+"]: "+reasons.join("; "));
  }
  if(errors.length)throw Error(errors.slice(0,25).join("\n")+(errors.length>25?"\n...additional errors omitted":""));
  const canonical=items.map(r=>JSON.stringify(r)).join("\n")+"\n";
  const checksum=crypto.createHash("sha256").update(canonical).digest("hex");
  console.log("VALIDATED: "+items.length+" public records; SHA256 "+checksum);
  console.log("RESEARCH-STAGE ONLY: no publication, causal inference, score or legal action was authorized.");
  if(doWrite){
   if(!batch||!/^[a-z0-9][a-z0-9-]{3,59}$/.test(batch))throw Error("--write requires --batch slug, e.g. public-2026-11");
   const dest=path.join(root,"data","evidence","staging",batch+".jsonl");
   fs.mkdirSync(path.dirname(dest),{recursive:true});
   fs.writeFileSync(dest,canonical,{flag:"wx",mode:0o600});
   console.log("STAGED: "+path.relative(root,dest)+" (private review required before any publication)");
  }
 }catch(e){fail(e.message)}
}
