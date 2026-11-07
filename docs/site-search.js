"use strict";
(() => {
 const dialog=document.getElementById("siteSearchDialog"),opener=document.querySelector("[data-site-search-open]"),input=document.getElementById("siteSearchInput"),results=document.getElementById("siteSearchResults"),status=document.getElementById("siteSearchStatus");
 if(!dialog||!opener||!input||!results||!status)return;
 let records=[],promise=null,previousFocus=null;
 const normalize=s=>String(s??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 const types={page:"PAGE",section:"RESEARCH SECTION",company:"CLIMATE-ONLY COMPANY RECORD"};
 function load(){
  if(!promise)promise=fetch("search-index.json").then(r=>{if(!r.ok)throw Error("Index unavailable");return r.json();}).then(d=>{
   if(!Array.isArray(d.entries))throw Error("Invalid index");
   records=d.entries.filter(e=>e&&/^[a-z0-9-]+\.html(?:\?[^#]*)?(?:#[a-z0-9-]+)?$/.test(e.href));
  }).catch(e=>{promise=null;throw e});
  return promise;
 }
 function score(e,q){
  const t=normalize(e.title),k=normalize(e.keywords),d=normalize(e.description),words=normalize(q).split(/\s+/).filter(Boolean),combined=t+" "+k+" "+d;
  if(!words.length)return e.type==="page"?10:-1;
  if(!words.every(w=>combined.includes(w)))return -1;
  return (t===normalize(q)?100:t.startsWith(normalize(q))?50:0)+words.reduce((n,w)=>n+(t.split(" ").some(v=>v.startsWith(w))?25:k.includes(w)?9:2),0)+(e.type==="page"?2:0);
 }
 function render(){
  const q=input.value.trim(),found=records.map((e,i)=>({e,i,s:score(e,q)})).filter(x=>x.s>=0).sort((a,b)=>b.s-a.s||a.i-b.i);
  results.replaceChildren();status.textContent=q?found.length+" matching public record"+(found.length===1?"":"s"):"Suggested research pages";
  if(!found.length){const p=document.createElement("p");p.className="site-search-empty";p.textContent="No matches. Try a company, source, case or research topic.";results.append(p);return;}
  for(const {e} of found.slice(0,10)){
   const a=document.createElement("a");a.className="site-search-result";a.href=e.href;
   const body=document.createElement("span");body.className="site-search-result-copy";
   const kind=document.createElement("span");kind.className="site-search-result-kind";kind.textContent=types[e.type]||"RESEARCH";
   const name=document.createElement("strong");name.textContent=e.title;
   const summary=document.createElement("span");summary.className="site-search-result-description";summary.textContent=e.description;
   const arrow=document.createElement("span");arrow.className="site-search-result-arrow";arrow.setAttribute("aria-hidden","true");arrow.textContent="↗";
   body.append(kind,name,summary);a.append(body,arrow);results.append(a);a.addEventListener("click",()=>dialog.close());
  }
  if(found.length>10){const p=document.createElement("p");p.className="site-search-empty";p.textContent="Showing ten results. Narrow the terms for a closer match.";results.append(p);}
 }
 async function openSearch(){
  if(!dialog.showModal){location.href="guide.html";return;}
  previousFocus=document.activeElement;dialog.showModal();input.value="";input.focus();results.replaceChildren();status.textContent="Loading local search index…";
  try{await load();if(dialog.open)render();}
  catch(_){status.textContent="Search temporarily unavailable";const p=document.createElement("p");p.className="site-search-empty";p.textContent="Use Start here, Open data or Dossier Lab instead.";results.append(p);}
 }
 opener.addEventListener("click",openSearch);
 dialog.querySelector("[data-site-search-close]").addEventListener("click",()=>dialog.close());
 dialog.addEventListener("close",()=>previousFocus?.focus?.());
 dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
 input.addEventListener("input",()=>{if(records.length)render();});
 dialog.querySelectorAll("[data-site-query]").forEach(button=>button.addEventListener("click",()=>{input.value=button.dataset.siteQuery;input.focus();if(records.length)render();}));
 input.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){const first=results.querySelector("a");if(first){e.preventDefault();first.focus();}}});
 results.addEventListener("keydown",e=>{
  if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;
  const links=[...results.querySelectorAll("a")],i=links.indexOf(document.activeElement);
  if(i<0)return;e.preventDefault();const next=links[i+(e.key==="ArrowDown"?1:-1)];if(next)next.focus();else if(i===0&&e.key==="ArrowUp")input.focus();
 });
 document.addEventListener("keydown",e=>{
  if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey||e.repeat||dialog.open)return;
  if(e.target?.closest?.("input, textarea, select, [contenteditable]")||e.target?.isContentEditable)return;
  e.preventDefault();openSearch();
 });
})();