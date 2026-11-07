/* Static routes work without JavaScript. This adds optional browser-only filtering. */
(() => {
 "use strict";
 const search=document.getElementById("pxSearch"),group=document.getElementById("pxFilters"),status=document.getElementById("pxStatus"),empty=document.getElementById("pxEmpty"),reset=document.getElementById("pxReset");
 if(!search||!group||!status||!empty||!reset)return;
 const cards=[...document.querySelectorAll(".px-card")];
 const normalize=x=>String(x||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
 let medium="all";
 function render(){
  const terms=normalize(search.value).split(/\s+/).filter(Boolean);
  let shown=0;
  for(const card of cards){
   const media=normalize(card.dataset.media);
   const fits=(medium==="all"||media.split(" ").includes(medium)||(medium==="food web"&&media.includes("food web")))&&terms.every(w=>normalize(card.dataset.search).includes(w));
   card.hidden=!fits;if(fits)shown++;
  }
  status.textContent=shown+" / "+cards.length+" CHEMICAL EVIDENCE ROUTES · NOT A HAZARD RANK";
  empty.hidden=shown!==0;
  group.querySelectorAll("button[data-medium]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.medium===medium)));
 }
 function openHash(){
  if(!location.hash.startsWith("#route-"))return;
  const id=decodeURIComponent(location.hash.slice(1));
  const card=document.getElementById(id);
  if(!cards.includes(card))return;
  if(card.hidden){medium="all";search.value="";render();}
  card.querySelector("details").open=true;
  card.scrollIntoView({block:"start",behavior:"auto"});
 }
 group.addEventListener("click",e=>{
  const b=e.target.closest("button[data-medium]");
  if(!b||!group.contains(b))return;medium=b.dataset.medium;render();
 });
 search.addEventListener("input",render);
 reset.addEventListener("click",()=>{medium="all";search.value="";render();search.focus();});
 window.addEventListener("hashchange",openHash);
 render();openHash();
})();
