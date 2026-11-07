"use strict";
(() => {
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
 for(const [buttonId,panelId] of [["mobileMenu","mobileNav"],["labMenu","labMobileNav"],["peopleMenu","peopleMobileNav"]]){
  const button=document.getElementById(buttonId),panel=document.getElementById(panelId);
  if(!button||!panel)continue;
  const close=()=>{panel.hidden=true;button.setAttribute("aria-expanded","false");button.setAttribute("aria-label","Open navigation");};
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden){close();button.focus();}});
  document.addEventListener("click",e=>{if(!panel.hidden&&!panel.contains(e.target)&&!button.contains(e.target))close();});
 }
})();