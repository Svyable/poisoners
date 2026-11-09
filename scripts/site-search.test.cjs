#!/usr/bin/env node
"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const script=fs.readFileSync(path.join(__dirname,"../docs/site-search.js"),"utf8");
const index=(entries)=>({ok:true,json:async()=>({entries})});
const entry=(title,href,type="page")=>({title,href,type,keywords:title,description:title+" official sources"});
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function deferred(){
 let resolve,reject;
 const promise=new Promise((yes,no)=>{resolve=yes;reject=no});
 return {promise,resolve,reject};
}
function harness(fetch){
 let doc;
 class Element{
  constructor(tag="div"){
   this.tagName=tag.toUpperCase();this.children=[];this.listeners={};this.dataset={};
   this.attributes={};this.textContent="";this.value="";this.open=false;
  }
  addEventListener(event,listener){(this.listeners[event]??=[]).push(listener)}
  emit(event,extra={}){
   const e={target:this,key:"",preventDefault(){this.defaultPrevented=true},...extra};
   for(const listener of this.listeners[event]||[])listener(e);
  }
  setAttribute(name,value){this.attributes[name]=String(value)}
  replaceChildren(...nodes){this.children=[...nodes]}
  append(...nodes){this.children.push(...nodes)}
  focus(){doc.activeElement=this}
  showModal(){this.open=true}
  close(){this.open=false;this.emit("close")}
  querySelectorAll(selector){
   if(selector==="[data-site-query]")return this.chips||[];
   const matching=[];
   const visit=n=>{for(const c of n.children){if(selector==="a"&&c.tagName==="A")matching.push(c);visit(c)}};
   visit(this);return matching;
  }
  querySelector(selector){
   if(selector==="[data-site-search-close]")return close;
   return this.querySelectorAll(selector)[0]||null;
  }
 }
 const ids=Object.fromEntries(["siteSearchDialog","siteSearchInput","siteSearchResults","siteSearchStatus"].map(x=>[x,new Element()]));
 const opener=new Element("button"),close=new Element("button"),chip=new Element("button");
 const dialog=ids.siteSearchDialog,input=ids.siteSearchInput,results=ids.siteSearchResults,status=ids.siteSearchStatus;
 chip.dataset.siteQuery="epa";dialog.chips=[chip];
 doc={
  activeElement:opener,
  getElementById:id=>ids[id]||null,
  querySelector:selector=>selector==="[data-site-search-open]"?opener:null,
  createElement:tag=>new Element(tag),
  listeners:{},
  addEventListener(event,listener){(this.listeners[event]??=[]).push(listener)},
  emit(event,extra={}){for(const fn of this.listeners[event]||[])fn(extra)}
 };
 const location={href:"https://example.org/index.html"};
 vm.runInNewContext(script,{document:doc,location,fetch,Promise,console},{filename:"site-search.js"});
 return {opener,close,chip,dialog,input,results,status,document:doc};
}
test("search enters loading, preserves typed query, renders only valid links, and reuses cached index",async()=>{
 const request=deferred();let calls=0;
 const h=harness(()=>{calls++;return request.promise});
 h.opener.emit("click");
 assert.equal(h.dialog.dataset.searchState,"loading");
 assert.equal(h.results.attributes["aria-busy"],"true");
 h.input.value="mercury";h.input.emit("input");
 request.resolve(index([entry("Mercury records","chemistry.html#mercury"),entry("Unsafe","https://external.test")]));
 await flush();
 assert.equal(h.dialog.dataset.searchState,"results");
 assert.equal(h.results.attributes["aria-busy"],"false");
 assert.equal(h.results.querySelectorAll("a").length,1);
 assert.equal(h.results.querySelector("a").href,"chemistry.html#mercury");
 assert.equal(h.status.textContent,"1 matching public record");
 h.dialog.close();
 assert.equal(h.dialog.dataset.searchState,"closed");
 assert.equal(h.document.activeElement,h.opener);
 h.opener.emit("click");
 assert.equal(h.dialog.dataset.searchState,"results","cached data must not flash loading");
 assert.equal(calls,1,"cached data must not be refetched");
});
test("search ignores late failures after closing and retries cleanly on reopen",async()=>{
 const first=deferred(),second=deferred();let calls=0;
 const h=harness(()=>++calls===1?first.promise:second.promise);
 h.opener.emit("click");h.dialog.close();
 first.reject(Error("offline"));await flush();
 assert.equal(h.dialog.dataset.searchState,"closed");
 assert.notEqual(h.status.textContent,"Search temporarily unavailable");
 h.opener.emit("click");
 assert.equal(h.dialog.dataset.searchState,"loading");
 second.resolve(index([entry("Source catalog","data-access.html")]));
 await flush();
 assert.equal(h.dialog.dataset.searchState,"results");
 assert.equal(h.results.querySelectorAll("a").length,1);
 assert.equal(calls,2);
});
test("closing and reopening during the same fetch preserves only the latest dialog session",async()=>{
 const request=deferred();let calls=0;
 const h=harness(()=>{calls++;return request.promise});
 h.opener.emit("click");h.dialog.close();h.opener.emit("click");
 h.input.value="oil";h.input.emit("input");
 request.resolve(index([entry("Oil source","about.html"),entry("Coal source","guide.html")]));
 await flush();
 assert.equal(h.dialog.dataset.searchState,"results");
 assert.equal(h.results.querySelectorAll("a").length,1);
 assert.equal(h.status.textContent,"1 matching public record");
 assert.equal(calls,1,"concurrent modal sessions share one index request");
});
test("search distinguishes empty results from an index failure and allows retry",async()=>{
 let calls=0;
 const h=harness(async()=>++calls===1?{ok:true,json:async()=>({wrong:true})}:index([]));
 h.opener.emit("click");await flush();
 assert.equal(h.dialog.dataset.searchState,"error");
 assert.equal(h.results.attributes["aria-busy"],"false");
 assert.match(h.status.textContent,/unavailable/);
 h.dialog.close();h.opener.emit("click");await flush();
 assert.equal(h.dialog.dataset.searchState,"empty");
 assert.equal(h.status.textContent,"Suggested research pages");
 assert.equal(calls,2);
});
test("empty query and quick-topic changes render after pending load",async()=>{
 const request=deferred();
 const h=harness(()=>request.promise);
 h.opener.emit("click");h.chip.emit("click");
 assert.equal(h.input.value,"epa");
 request.resolve(index([entry("EPA sources","public-records.html"),entry("Official guide","guide.html")]));
 await flush();
 assert.equal(h.results.querySelectorAll("a").length,1);
 h.input.value="unmatched";h.input.emit("input");
 assert.equal(h.dialog.dataset.searchState,"empty");
 assert.match(h.status.textContent,/0 matching/);
});

test("slash shortcut and arrow-key navigation keep focus inside the active dialog",async()=>{
 const h=harness(async()=>index([entry("EPA records","public-records.html")]));
 let prevented=false;
 h.document.emit("keydown",{
  key:"/",ctrlKey:false,metaKey:false,altKey:false,repeat:false,target:h.opener,
  preventDefault(){prevented=true}
 });
 await flush();
 assert.equal(prevented,true);
 assert.equal(h.dialog.open,true);
 assert.equal(h.document.activeElement,h.input);
 h.input.emit("keydown",{key:"ArrowDown"});
 const result=h.results.querySelector("a");
 assert.equal(h.document.activeElement,result);
 h.results.emit("keydown",{key:"ArrowUp"});
 assert.equal(h.document.activeElement,h.input);
 h.dialog.close();
 assert.equal(h.document.activeElement,h.opener);
});
