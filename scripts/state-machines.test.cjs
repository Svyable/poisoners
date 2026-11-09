"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const catalog=JSON.parse(fs.readFileSync(path.join(root,"data/state-machines.json"),"utf8"));
const search=require("../docs/site-search.js");
const cli=require("./state-machine.cjs");

test("state inventory is unique, reachable, evidence-guarded and includes every owner",()=>{
 assert.equal(catalog.schema_version,1);
 assert.ok(catalog.machines.length>=45,"Audit must cover all major UI and research processes");
 const ids=new Set();
 const groups=new Set();
 for(const m of catalog.machines){
  assert.match(m.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!ids.has(m.id),"duplicate machine "+m.id);ids.add(m.id);groups.add(m.group);
  assert.ok(["ui","data","pipeline","automation"].includes(m.group));
  assert.ok(["explicit","observed"].includes(m.mode));
  assert.ok(["memory","url","localStorage","filesystem"].includes(m.persistence));
  assert.ok(m.agent_guard.length>50,"Insufficient evidence guard for "+m.id);
  assert.ok(fs.existsSync(path.join(root,m.owner)),"Missing audit owner: "+m.owner);
  assert.ok(!m.owner.includes("..")&&!path.isAbsolute(m.owner),"No absolute or traversal owner");
  assert.ok(m.states.includes(m.initial)&&m.states.length>=2);
  const seen=new Set();
  for(const t of m.transitions){
   assert.ok(m.states.includes(t.from)&&m.states.includes(t.to),m.id+" invalid state edge");
   assert.match(t.event,/^[A-Z][A-Z0-9_]*$/);
   const key=t.from+"|"+t.event;
   assert.ok(!seen.has(key),m.id+" ambiguous transition "+key);seen.add(key);
  }
  const reachable=new Set([m.initial]);
  let changed=true;
  while(changed){
   changed=false;
   for(const t of m.transitions)if(reachable.has(t.from)&&!reachable.has(t.to)){reachable.add(t.to);changed=true}
  }
  assert.deepEqual([...m.states].filter(x=>!reachable.has(x)),[],m.id+" unreachable states");
 }
 assert.deepEqual([...groups].sort(),["automation","data","pipeline","ui"].sort());
 assert.equal(catalog.machines.filter(m=>m.mode==="explicit").length,2);
 assert.ok(catalog.cross_cutting_guards.some(x=>x.includes("zero")));
 assert.ok(catalog.cross_cutting_guards.some(x=>x.includes("workbench notes")));
});

test("agent replay refuses impossible events and explains actual allowed transitions",()=>{
 const names=cli.main(["list"]);
 assert.equal(names.count,catalog.machines.length);
 const m=cli.main(["show","global-search-index"]);
 assert.equal(m.initial,"idle");
 assert.equal(m.mode,"explicit");
 const trace=cli.main(["replay","global-search-index","FETCH_START","FETCH_ERROR","FETCH_START","FETCH_OK"]);
 assert.deepEqual(trace.trace.map(x=>x.state),["idle","loading","error","loading","ready"]);
 assert.throws(()=>cli.main(["replay","global-search-index","FETCH_OK"]),/Invalid transition/);
 assert.throws(()=>cli.main(["show","invented-machine"]),/Unknown machine/);
 assert.throws(()=>cli.main(["replay","global-search-index","FETCH_START","FETCH_START"]),/Invalid transition/);
});

test("search lifecycle retains queries through asynchronous loading, dedupes and ignores stale completion",()=>{
 let s=search.initial();
 assert.deepEqual({dialog:s.dialog,index:s.index,attempt:s.attempt},{dialog:"closed",index:"idle",attempt:0});
 s=search.transition(s,{type:"OPEN"});
 s=search.transition(s,{type:"FETCH_START"});
 assert.equal(s.index,"loading");
 assert.equal(s.attempt,1);
 s=search.transition(s,{type:"TYPE",query:"Minamata"});
 assert.equal(s.query,"Minamata");
 const stale=search.transition(s,{type:"FETCH_OK",attempt:0,records:[{title:"Stale"}]});
 assert.equal(stale,s,"Out-of-order data must not replace loading state");
 const duplicate=search.transition(s,{type:"FETCH_START"});
 assert.equal(duplicate,s,"Deduped fetch remains in flight");
 s=search.transition(s,{type:"CLOSE"});
 s=search.transition(s,{type:"FETCH_OK",attempt:1,records:[{title:"Minamata"}]});
 assert.equal(s.index,"ready");
 assert.equal(s.dialog,"closed","Offscreen success must not reopen dialog");
 s=search.transition(s,{type:"OPEN"});
 assert.equal(s.query,"","New search begins with a clear query");
 assert.equal(s.index,"ready","Successful public index is cached");
});

test("search failure is retryable; success clears failure; safe result href and source rank unchanged",()=>{
 let s=search.transition(search.initial(),{type:"OPEN"});
 s=search.transition(s,{type:"FETCH_START"});
 s=search.transition(s,{type:"FETCH_ERROR",attempt:1});
 assert.equal(s.index,"error");
 assert.equal(s.records.length,0);
 s=search.transition(s,{type:"FETCH_START"});
 assert.equal(s.attempt,2);
 assert.equal(s.error,null);
 s=search.transition(s,{type:"FETCH_OK",attempt:1,records:[]});
 assert.equal(s.index,"loading","Stale failure/success cannot override current request");
 s=search.transition(s,{type:"FETCH_OK",attempt:2,records:[]});
 assert.equal(s.index,"ready");
 const data=[
  {type:"page",title:"Research guide",keywords:"guide",description:"Start here",href:"guide.html"},
  {type:"company",title:"ExxonMobil",keywords:"exxon carbon majors",description:"Research company profile",href:"dossiers.html?entity=exxonmobil#investigate"},
  {type:"company",title:"Bad URL",keywords:"bad",description:"Unsafe",href:"javascript:alert(1)"}
 ];
 assert.equal(search.rank(data,"exxon")[0].title,"ExxonMobil");
 assert.equal(search.rank(data,"").length,1,"Empty query suggests pages only");
 assert.equal(search.validHref(data[1].href),true);
 assert.equal(search.validHref(data[2].href),false);
 assert.equal(search.validHref("//evil.example"),false);
 assert.equal(search.validHref("dossiers.html?entity=x#investigate"),true);
});

function fakeBrowser(){
 const document={activeElement:null,listeners:{},addEventListener(event,fn){(this.listeners[event]??=[]).push(fn)}};
 function el(tag="div"){
  return {tag,children:[],listeners:{},attributes:{},dataset:{},className:"",value:"",textContent:"",open:false,
   addEventListener(type,fn){(this.listeners[type]??=[]).push(fn)},
   emit(type,extra={}){for(const fn of this.listeners[type]||[])fn({target:this,preventDefault(){},...extra})},
   replaceChildren(...children){this.children=children},
   append(...children){this.children.push(...children)},
   setAttribute(k,v){this.attributes[k]=v},
   focus(){document.activeElement=this},
   closest(selector){return selector==="[data-site-search-retry]"&&Object.hasOwn(this.dataset,"siteSearchRetry")?this:null},
   querySelector(selector){return selector==="a.site-search-result"?this.children.find(x=>x.tag==="a"&&x.className==="site-search-result")||null:null},
   querySelectorAll(selector){return selector==="a.site-search-result"?this.children.filter(x=>x.tag==="a"&&x.className==="site-search-result"):[]}
  };
 }
 const dialog=el("dialog"),opener=el("button"),input=el("input"),results=el("div"),status=el("span"),close=el("button"),chip=el("button");
 chip.dataset.siteQuery="Minamata";
 dialog.querySelector=selector=>selector==="[data-site-search-close]"?close:null;
 dialog.querySelectorAll=selector=>selector==="[data-site-query]"?[chip]:[];
 dialog.showModal=()=>{dialog.open=true};
 dialog.close=()=>{dialog.open=false;dialog.emit("close")};
 const els={siteSearchDialog:dialog,siteSearchInput:input,siteSearchResults:results,siteSearchStatus:status};
 document.getElementById=id=>els[id]||null;
 document.querySelector=selector=>selector==="[data-site-search-open]"?opener:null;
 document.createElement=el;
 document.activeElement=opener;
 const pending=[];
 let calls=0;
 const fetch=()=>{calls++;return new Promise((resolve,reject)=>pending.push({resolve,reject}))};
 const location={href:"https://svyable.github.io/poisoners/index.html"};
 const script=fs.readFileSync(path.join(root,"docs/site-search.js"),"utf8");
 vm.runInNewContext(script,{document,location,fetch},{filename:"docs/site-search.js"});
 return {dialog,opener,input,results,status,close,chip,pending,fetchCount:()=>calls,document};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
test("browser search opens accessibly, keeps query during loading, caches index, restores focus",async()=>{
 const b=fakeBrowser();
 b.opener.emit("click");
 assert.equal(b.dialog.open,true);
 assert.equal(b.results.attributes["aria-busy"],"true");
 assert.equal(b.document.activeElement,b.input);
 b.input.value="Minamata";b.input.emit("input");
 await flush();
 assert.equal(b.fetchCount(),1);
 b.pending[0].resolve({ok:true,json:async()=>({entries:[{type:"page",title:"Minamata",keywords:"Japan",description:"Research",href:"case-studies.html"}]})});
 await flush();await flush();
 assert.equal(b.status.textContent,"1 matching public record");
 assert.equal(b.results.children.filter(x=>x.tag==="a").length,1);
 assert.equal(b.results.attributes["aria-busy"],"false");
 b.close.emit("click");
 assert.equal(b.dialog.open,false);
 assert.equal(b.document.activeElement,b.opener);
 b.opener.emit("click");
 await flush();
 assert.equal(b.fetchCount(),1,"Second open reuses public index");
 assert.equal(b.status.textContent,"Suggested research pages");
 b.close.emit("click");
});

test("browser failure provides working retry without losing the modal or duplicating fetches",async()=>{
 const b=fakeBrowser();
 b.opener.emit("click");await flush();
 b.dialog.close();
 b.opener.emit("click");await flush();
 assert.equal(b.fetchCount(),1,"Close and reopen while loading must reuse pending fetch");
 b.pending[0].reject(Error("Network unavailable"));await flush();await flush();
 assert.equal(b.status.textContent,"Search temporarily unavailable");
 const retry=b.results.children.find(x=>x.dataset?.siteSearchRetry!==undefined);
 assert.ok(retry,"Accessible retry button appears");
 b.results.emit("click",{target:retry});
 await flush();
 assert.equal(b.fetchCount(),2);
 assert.equal(b.results.attributes["aria-busy"],"true");
 b.pending[1].resolve({ok:true,json:async()=>({entries:[{type:"page",title:"Guide",keywords:"research",description:"Start",href:"guide.html"}]})});
 await flush();await flush();
 assert.equal(b.status.textContent,"Suggested research pages");
 assert.equal(b.results.children.filter(x=>x.className==="site-search-result").length,1);
 b.close.emit("click");
 assert.equal(b.document.activeElement,b.opener);
});
