"use strict";
/** Time-aware corporate/asset graph. Explicit IDs and sources only; never infer ownership from names. */
const isDate=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s));
function validateOwnershipEdge(e){
 const errors=[];
 if(!e||typeof e!=="object")return ["Expected ownership edge"];
 for(const key of ["child_entity_id","parent_entity_id","effective_from","source_url","relationship"])
  if(typeof e[key]!=="string"||!e[key].trim())errors.push("Missing "+key);
 if(e.child_entity_id===e.parent_entity_id)errors.push("Self-ownership link");
 if(!isDate(e.effective_from)||e.effective_to!=null&&!isDate(e.effective_to)||e.effective_to&&e.effective_to<e.effective_from)errors.push("Invalid date interval");
 if(!/^https:\/\//.test(e.source_url||""))errors.push("Need primary HTTPS provenance");
 if(e.percent_control!=null&&(!Number.isFinite(e.percent_control)||e.percent_control<0||e.percent_control>100))errors.push("Invalid percent control");
 if(!["legal_parent","equity_owner","operator","predecessor","affiliate","unknown"].includes(e.relationship))errors.push("Unsupported relationship");
 return errors;
}
function activeEdgesAt(edges,date){
 if(!isDate(date))throw Error("Date YYYY-MM-DD required");
 const results=[];
 for(const e of edges){
  const errs=validateOwnershipEdge(e);
  if(errs.length)throw Error("Invalid ownership edge: "+errs.join("; "));
  if(e.effective_from<=date&&(e.effective_to==null||e.effective_to>=date))results.push(e);
 }
 return results;
}
function resolveParentAt(edges,child,date){
 const matches=activeEdgesAt(edges,date).filter(e=>e.child_entity_id===child&&e.relationship==="legal_parent");
 const byParent=[...new Set(matches.map(e=>e.parent_entity_id))];
 return {child,date,status:!byParent.length?"unresolved":byParent.length===1?"source_linked":"ambiguous",
  parents:byParent,claims:matches,warning:!byParent.length?"No verified parent for requested date":byParent.length>1?"Conflicting/overlapping parent claims need review":"Source-linked ownership only; not a liability conclusion"};
}
function detectCyclesAt(edges,date){
 const active=activeEdgesAt(edges,date).filter(e=>e.relationship==="legal_parent");
 const graph=new Map();
 for(const e of active){if(!graph.has(e.child_entity_id))graph.set(e.child_entity_id,new Set());graph.get(e.child_entity_id).add(e.parent_entity_id)}
 const visited=new Set(),walking=new Set(),cycles=[];
 function dfs(node,stack){
  if(walking.has(node)){cycles.push([...stack,node]);return}
  if(visited.has(node))return;
  walking.add(node);
  for(const parent of graph.get(node)||[])dfs(parent,[...stack,node]);
  walking.delete(node);visited.add(node);
 }
 for(const node of graph.keys())dfs(node,[]);
 return cycles;
}
module.exports={validateOwnershipEdge,activeEdgesAt,resolveParentAt,detectCyclesAt};
