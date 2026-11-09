"use strict";
/* Search is an orthogonal pair of state machines:
 * dialog: closed | open; index: idle | loading | ready | error.
 * No private query is sent to a server: only the public JSON index is fetched.
 * The deterministic transition function is also importable in Node for replay tests.
 */
const PoisonSearchMachine=(()=>{
 const initial=()=>({dialog:"closed",index:"idle",query:"",records:[],attempt:0,error:null});
 function transition(state,event){
  switch(event.type){
   case "OPEN":return state.dialog==="open"?state:{...state,dialog:"open",query:""};
   case "CLOSE":return state.dialog==="closed"?state:{...state,dialog:"closed"};
   case "TYPE":return state.dialog==="open"?{...state,query:String(event.query??"")}:state;
   case "FETCH_START":return state.index==="ready"||state.index==="loading"?state:
    {...state,index:"loading",error:null,attempt:state.attempt+1};
   case "FETCH_OK":return state.index==="loading"&&event.attempt===state.attempt?
    {...state,index:"ready",records:event.records,error:null}:state;
   case "FETCH_ERROR":return state.index==="loading"&&event.attempt===state.attempt?
    {...state,index:"error",records:[],error:"Search index could not be loaded"}:state;
   default:return state;
  }
 }
 const normalize=s=>String(s??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 function score(e,q){
  const t=normalize(e.title),k=normalize(e.keywords),d=normalize(e.description),phrase=normalize(q),words=phrase.split(/\s+/).filter(Boolean),combined=t+" "+k+" "+d;
  if(!words.length)return e.type==="page"?10:-1;
  if(!words.every(w=>combined.includes(w)))return -1;
  return (t===phrase?100:t.startsWith(phrase)?50:0)+words.reduce((n,w)=>n+(t.split(" ").some(v=>v.startsWith(w))?25:k.includes(w)?9:2),0)+(e.type==="page"?2:0);
 }
 const validHref=x=>/^[a-z0-9-]+\.html(?:\?[^#]*)?(?:#[A-Za-z0-9-]+)?$/.test(x);
 function rank(records,query){
  return records.map((e,i)=>({e,i,s:score(e,query)})).filter(x=>x.s>=0).sort((a,b)=>b.s-a.s||a.i-b.i).map(x=>x.e);
 }
 return Object.freeze({initial,transition,normalize,score,validHref,rank});
})();
if(typeof module==="object"&&module.exports)module.exports=PoisonSearchMachine;
if(typeof document!=="undefined")(()=>{
 const dialog=document.getElementById("siteSearchDialog"),opener=document.querySelector("[data-site-search-open]"),
  input=document.getElementById("siteSearchInput"),results=document.getElementById("siteSearchResults"),
  status=document.getElementById("siteSearchStatus");
 if(!dialog||!opener||!input||!results||!status)return;
 const types={page:"PAGE",section:"RESEARCH SECTION",company:"CLIMATE-ONLY COMPANY RECORD",knowledge:"EVIDENCE FIELD NOTE",pathway:"CHEMICAL EVIDENCE ROUTE"};
 let state=PoisonSearchMachine.initial(),inFlight=null,previousFocus=null;
 const send=e=>{state=PoisonSearchMachine.transition(state,e);return state};
 function appendMessage(message){
  const p=document.createElement("p");p.className="site-search-empty";p.textContent=message;results.append(p);
 }
 function appendResult(e){
  const a=document.createElement("a");a.className="site-search-result";a.href=e.href;
  const body=document.createElement("span");body.className="site-search-result-copy";
  const kind=document.createElement("span");kind.className="site-search-result-kind";kind.textContent=types[e.type]||"RESEARCH";
  const name=document.createElement("strong");name.textContent=e.title;
  const summary=document.createElement("span");summary.className="site-search-result-description";summary.textContent=e.description;
  const arrow=document.createElement("span");arrow.className="site-search-result-arrow";arrow.setAttribute("aria-hidden","true");arrow.textContent="↗";
  body.append(kind,name,summary);a.append(body,arrow);results.append(a);a.addEventListener("click",()=>dialog.close());
 }
 function paint(){
  if(!dialog.open)return;
  results.replaceChildren();
  results.setAttribute("aria-busy",String(state.index==="loading"));
  if(state.index==="loading"){
   status.textContent="Loading local search index…";
   appendMessage("You can type a query while the public index loads.");
   return;
  }
  if(state.index==="error"){
   status.textContent="Search temporarily unavailable";
   appendMessage("The public index could not be loaded. Try again, or use the research guide.");
   const retry=document.createElement("button");retry.type="button";retry.className="site-search-retry";
   retry.dataset.siteSearchRetry="";retry.textContent="Try loading search again";results.append(retry);
   const guide=document.createElement("a");guide.className="site-search-fallback";guide.href="guide.html";
   guide.textContent="Open research guide instead ↗";results.append(guide);
   return;
  }
  if(state.index!=="ready"){
   status.textContent="Choose a topic to begin.";return;
  }
  const q=state.query.trim(),found=PoisonSearchMachine.rank(state.records,q);
  status.textContent=q?found.length+" matching public record"+(found.length===1?"":"s"):"Suggested research pages";
  if(!found.length){appendMessage("No matches. Try a company, source, case or research topic.");return;}
  found.slice(0,10).forEach(appendResult);
  if(found.length>10)appendMessage("Showing ten results. Narrow the terms for a closer match.");
 }
 function requestIndex(){
  if(state.index==="ready"){paint();return;}
  if(inFlight)return;
  send({type:"FETCH_START"});const attempt=state.attempt;paint();
  inFlight=Promise.resolve().then(()=>fetch("search-index.json"))
   .then(r=>{if(!r.ok)throw Error("Index unavailable");return r.json();})
   .then(data=>{
    if(!data||!Array.isArray(data.entries))throw Error("Invalid index");
    const records=data.entries.filter(e=>e&&PoisonSearchMachine.validHref(e.href));
    send({type:"FETCH_OK",attempt,records});
   })
   .catch(()=>send({type:"FETCH_ERROR",attempt}))
   .finally(()=>{inFlight=null;paint();});
 }
 function openSearch(){
  if(!dialog.showModal){location.href="guide.html";return;}
  if(dialog.open)return;
  previousFocus=document.activeElement;
  dialog.showModal();
  send({type:"OPEN"});input.value="";input.focus();
  paint();requestIndex();
 }
 opener.addEventListener("click",openSearch);
 dialog.querySelector("[data-site-search-close]").addEventListener("click",()=>dialog.close());
 dialog.addEventListener("close",()=>{send({type:"CLOSE"});previousFocus?.focus?.();previousFocus=null});
 dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
 results.addEventListener("click",e=>{
  if(e.target.closest?.("[data-site-search-retry]")&&state.index==="error"){requestIndex();input.focus();}
 });
 input.addEventListener("input",()=>{send({type:"TYPE",query:input.value});paint();});
 dialog.querySelectorAll("[data-site-query]").forEach(b=>b.addEventListener("click",()=>{
  input.value=b.dataset.siteQuery;send({type:"TYPE",query:input.value});input.focus();paint();
 }));
 input.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){const first=results.querySelector("a.site-search-result");if(first){e.preventDefault();first.focus();}}});
 results.addEventListener("keydown",e=>{
  if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;
  const links=[...results.querySelectorAll("a.site-search-result")],i=links.indexOf(document.activeElement);
  if(i<0)return;
  e.preventDefault();
  const next=links[i+(e.key==="ArrowDown"?1:-1)];
  if(next)next.focus();else if(i===0&&e.key==="ArrowUp")input.focus();
 });
 document.addEventListener("keydown",e=>{
  if(e.key!=="/"||e.ctrlKey||e.metaKey||e.altKey||e.repeat||dialog.open)return;
  if(e.target?.closest?.("input, textarea, select, [contenteditable]")||e.target?.isContentEditable)return;
  e.preventDefault();openSearch();
 });
})();