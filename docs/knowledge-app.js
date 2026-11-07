/* Progressive enhancement only. Static knowledge notes and sources work without JavaScript. */
(() => {
  "use strict";
  const $=id=>document.getElementById(id);
  const search=$("kaSearch"),filters=$("kaFilters"),count=$("kaCount"),clear=$("kaClear"),empty=$("kaEmpty");
  if(!search||!filters||!count||!clear||!empty)return;
  const notes=[...document.querySelectorAll(".ka-card")];
  let category="all";
  const normalize=x=>String(x||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  function filterNotes(){
    const terms=normalize(search.value).split(/\s+/).filter(Boolean);
    let visible=0;
    for(const note of notes){
      const matchesCategory=category==="all"||note.dataset.category===category;
      const haystack=normalize(note.dataset.search);
      const show=matchesCategory&&terms.every(t=>haystack.includes(t));
      note.hidden=!show;
      if(show)visible++;
    }
    count.textContent=visible+" FIELD NOTE"+(visible===1?"":"S")+" / "+notes.length+" PUBLISHED";
    empty.hidden=visible!==0;
    for(const button of filters.querySelectorAll("button[data-category]"))
      button.setAttribute("aria-pressed",String(button.dataset.category===category));
  }
  function showNoteFromHash(){
    if(!location.hash.startsWith("#note-"))return;
    const id=decodeURIComponent(location.hash.slice(1));
    const node=document.getElementById(id);
    if(!node||!notes.includes(node))return;
    if(node.hidden){
      category="all";
      search.value="";
      filterNotes();
    }
    const detail=node.querySelector("details");
    if(detail)detail.open=true;
    node.scrollIntoView({block:"start",behavior:"auto"});
  }
  filters.addEventListener("click",event=>{
    const button=event.target.closest("button[data-category]");
    if(!button||!filters.contains(button))return;
    category=button.dataset.category;filterNotes();
  });
  search.addEventListener("input",filterNotes);
  clear.addEventListener("click",()=>{category="all";search.value="";filterNotes();search.focus();});
  window.addEventListener("hashchange",showNoteFromHash);
  filterNotes();showNoteFromHash();
})();
