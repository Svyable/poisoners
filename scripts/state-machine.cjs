#!/usr/bin/env node
"use strict";
/* Read-only, deterministic state machine explorer. No browser, storage or network I/O. */
const fs=require("node:fs"),path=require("node:path");
const catalog=JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data/state-machines.json"),"utf8"));
function find(id){
 const m=catalog.machines.find(x=>x.id===id);
 if(!m)throw Error("Unknown machine: "+String(id||"(missing)")+". Use 'list' to find valid IDs.");
 return m;
}
function replay(machine,events){
 let current=machine.initial;
 const trace=[{step:0,state:current,event:"INIT"}];
 for(const [i,event] of events.entries()){
  const edges=machine.transitions.filter(t=>t.from===current&&t.event===event);
  if(edges.length!==1)throw Error("Invalid transition "+machine.id+": "+current+" --"+event+"--> ? at step "+(i+1)+". The state was not changed.");
  current=edges[0].to;
  trace.push({step:i+1,event,state:current});
 }
 return {machine:machine.id,initial:machine.initial,final:current,trace,guard:machine.agent_guard};
}
function main(argv){
 const [command,id,...events]=argv;
 if(command==="list"){
  if(id)throw Error("Usage: node scripts/state-machine.cjs list");
  return {schema_version:catalog.schema_version,count:catalog.machines.length,machines:catalog.machines.map(m=>({id:m.id,group:m.group,owner:m.owner,mode:m.mode}))};
 }
 if(command==="show"){
  if(!id||events.length)throw Error("Usage: node scripts/state-machine.cjs show MACHINE_ID");
  return find(id);
 }
 if(command==="replay"){
  if(!id||!events.length)throw Error("Usage: node scripts/state-machine.cjs replay MACHINE_ID EVENT [EVENT...]");
  return replay(find(id),events);
 }
 throw Error("Usage: node scripts/state-machine.cjs list | show MACHINE_ID | replay MACHINE_ID EVENT...");
}
if(require.main===module){
 try{process.stdout.write(JSON.stringify(main(process.argv.slice(2)),null,2)+"\n")}
 catch(e){console.error("STATE CONTRACT ERROR: "+e.message);process.exitCode=1}
}
module.exports={main,find,replay};
