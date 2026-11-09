"use strict";
/* A dependency-free, pure interaction contract used by every public page.
 * No notes, search terms, or browser storage are exposed through this API. */
(function(root,factory){
 "use strict";
 const model=factory();
 if(typeof module==="object"&&module.exports)module.exports=model;
 if(root&&typeof root.document!=="undefined")root.POISON_INTERACTION=model;
})(typeof window!=="undefined"?window:globalThis,function(){
 "use strict";
 const phases=Object.freeze(["idle","loading","ready","error"]);
 const actions=Object.freeze(["LOAD","SUCCEED","FAIL","RESET"]);
 const makeResource=()=>Object.freeze({phase:"idle",request:0});
 function transitionResource(previous,event){
  if(!previous||!phases.includes(previous.phase)||!Number.isSafeInteger(previous.request)||previous.request<0)
   throw new TypeError("Invalid resource state");
  if(!event||!actions.includes(event.type))throw new TypeError("Invalid resource event");
  if(event.type==="RESET")return Object.freeze({phase:"idle",request:previous.request+1});
  if(event.type==="LOAD")return previous.phase==="loading"?previous:Object.freeze({phase:"loading",request:previous.request+1});
  if(previous.phase!=="loading"||event.request!==previous.request)return previous;
  return Object.freeze({phase:event.type==="SUCCEED"?"ready":"error",request:previous.request});
 }
 const selectionEvents=Object.freeze(["INIT","SELECT","RESTORE"]);
 function chooseSelection(previous,event,allowed){
  if(!event||!selectionEvents.includes(event.type))throw new TypeError("Invalid selection event");
  if(!allowed||!Array.isArray(allowed.concerns)||!Array.isArray(allowed.regions)||
   !allowed.concerns.length||!allowed.regions.length)throw new TypeError("Missing selection catalog");
  const valid=(values,id)=>values.includes(id);
  if(event.type==="SELECT"&&(!valid(allowed.concerns,event.concern)||!valid(allowed.regions,event.region)))
   return Object.freeze({state:previous,effect:"none"});
  const next=Object.freeze({
   concern:valid(allowed.concerns,event.concern)?event.concern:allowed.concerns[0],
   region:valid(allowed.regions,event.region)?event.region:allowed.regions[0]
  });
  const changed=!previous||next.concern!==previous.concern||next.region!==previous.region;
  const effect=event.type==="INIT"?"replace":event.type==="SELECT"&&changed?"push":"none";
  return Object.freeze({state:next,effect});
 }
 return Object.freeze({
  version:1,
  contracts:Object.freeze({
   resource:Object.freeze({states:phases,events:actions,terminal:Object.freeze(["ready","error"])}),
   selection:Object.freeze({events:selectionEvents,effects:Object.freeze(["replace","push","none"])})
  }),
  makeResource,transitionResource,chooseSelection
 });
});

(() => {
 if(typeof document==="undefined")return;
  const menu=document.getElementById("siteShellMenu");
  const mobile=document.getElementById("siteShellNav");
  const closeMenu=()=>{
    if (!menu || !mobile) return;
    mobile.hidden=true;
    menu.setAttribute("aria-expanded","false");
    menu.setAttribute("aria-label","Open navigation");
  };
  if(menu && mobile){
    menu.addEventListener("click",()=>{
      const willOpen=mobile.hidden;
      mobile.hidden=!willOpen;
      menu.setAttribute("aria-expanded",String(willOpen));
      menu.setAttribute("aria-label",willOpen?"Close navigation":"Open navigation");
    });
    mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!mobile.hidden){closeMenu();menu.focus()}});
    document.addEventListener("click",e=>{if(!mobile.hidden&&!mobile.contains(e.target)&&!menu.contains(e.target))closeMenu()});
  }
  const copyButton=document.querySelector("[data-copy-page]");
  if(copyButton){
    copyButton.addEventListener("click",async()=>{
      const status=document.getElementById("pageCopyStatus");
      try{
        if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(window.location.href);
        if(status)status.textContent="Link copied";
      }catch(e){
        if(status)status.textContent="Copy the URL from your address bar";
      }
    });
  }
})();

/* Existing observatory, dossier and People interactive menus own their click behavior.
   Keep Escape/outside-click dismissal consistent without a duplicate click toggle. */
(() => {
 if(typeof document==="undefined")return;
 for(const [buttonId,panelId] of [["mobileMenu","mobileNav"],["labMenu","labMobileNav"],["peopleMenu","peopleMobileNav"]]){
  const button=document.getElementById(buttonId),panel=document.getElementById(panelId);
  if(!button||!panel)continue;
  const close=()=>{panel.hidden=true;button.setAttribute("aria-expanded","false");button.setAttribute("aria-label","Open navigation");};
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden){close();button.focus();}});
  document.addEventListener("click",e=>{if(!panel.hidden&&!panel.contains(e.target)&&!button.contains(e.target))close();});
 }
})();