/* POISONERS / PEOPLE ATLAS V4
 * Publicly sourced executive compensation, not attribution of personal injury.
 * No legal culpability algorithm, defendant ranking or auto-generated lawsuits.
 */
(function(){
"use strict";
const db=window.POISON_PEOPLE;if(!db||!Array.isArray(db.companies))return;
const $=id=>document.getElementById(id);
const required=["companySearchPeople","companyCountryPeople","companySortPeople","resetCompanyFilters","peopleCompanyCount","peopleCompanyMenu","peopleCompanyProfile",
"personSearch","personCountry","personRole","personSort","personReset","favoritesOnly","downloadPeopleCsv","personCount","peopleTableRows","peopleDetail","routeTabs","routePanel","peopleMenu","peopleMobileNav"];
if(required.some(k=>!$(k)))return;
const safe=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cash=n=>n==null?"NOT DISCLOSED":"$"+Number(n).toLocaleString("en-US",{maximumFractionDigits:0});
const pct=(a,b)=>b<=0?0:Math.min(100,Math.round(a/b*100));
const compare=(a,b)=>a.localeCompare(b,"en-US");
const byPerson=new Map(db.persons.map(p=>[p.id,p]));
const byCompany=new Map(db.companies.map(c=>[c.company_id,c]));
const roles=new Map(db.role_definitions.map(x=>[x.key,x]));
const params=new URLSearchParams(location.search);
const selectedCompany=byCompany.has(params.get("company"))?params.get("company"):"exxonmobil";
const selectedPerson=byPerson.has(params.get("person"))?params.get("person"):null;
const state={company:selectedCompany,person:selectedPerson,coSearch:"",coCountry:"ALL",coSort:"alpha",pSearch:"",pCountry:"ALL",pRole:"ALL",pSort:"pay-desc",favsOnly:false,route:"US_CERCLA"};
const favKey="poisoners:people:bookmarks:v4";
let bookmarks=new Set();
try{bookmarks=new Set(JSON.parse(localStorage.getItem(favKey)||"[]").filter(id=>byPerson.has(id)))}catch{bookmarks=new Set()}
function saveBookmarks(){try{localStorage.setItem(favKey,JSON.stringify([...bookmarks]))}catch{}}
function makeURL(){const u=new URL(location.href);u.searchParams.set("company",state.company);if(state.person)u.searchParams.set("person",state.person);else u.searchParams.delete("person");history.replaceState(null,"",u)}
function msg(s,id="peopleCount"){const node=$(id);if(node)node.textContent=s}
function initialize(){
 for(const [code,name] of [...new Map(db.companies.map(c=>[c.country_code,c.home_country])).entries()].sort((a,b)=>compare(a[1],b[1]))){
  for(const id of ["companyCountryPeople","personCountry"]){const opt=document.createElement("option");opt.value=code;opt.textContent=name;$(id).appendChild(opt)}
 }
 for(const r of db.role_definitions){const o=document.createElement("option");o.value=r.key;o.textContent=r.title;$("personRole").appendChild(o)}
 $("statCompanies").textContent=db.counts.companies;$("statSlots").textContent=db.counts.total_research_slots;
 $("statPeople").textContent=db.counts.named_people;$("statMissing").textContent=db.counts.unverified_slots;
 $("peopleMenu").addEventListener("click",()=>{
  const nav=$("peopleMobileNav");nav.hidden=!nav.hidden;$("peopleMenu").setAttribute("aria-expanded",String(!nav.hidden));
  $("peopleMenu").setAttribute("aria-label",nav.hidden?"Open navigation":"Close navigation");
 });
 $("peopleMobileNav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{$("peopleMobileNav").hidden=true;$("peopleMenu").setAttribute("aria-expanded","false")}));
 const maps=[
 ["companySearchPeople","input",val=>{state.coSearch=val.toLocaleLowerCase().trim();renderCompanies()}],
 ["companyCountryPeople","change",val=>{state.coCountry=val;renderCompanies()}],
 ["companySortPeople","change",val=>{state.coSort=val;renderCompanies()}],
 ["personSearch","input",val=>{state.pSearch=val.toLocaleLowerCase().trim();renderPeople()}],
 ["personCountry","change",val=>{state.pCountry=val;renderPeople()}],
 ["personRole","change",val=>{state.pRole=val;renderPeople()}],
 ["personSort","change",val=>{state.pSort=val;renderPeople()}]
 ];
 for(const [id,evt,cb] of maps)$(id).addEventListener(evt,e=>cb(e.target.value));
 $("favoritesOnly").addEventListener("change",e=>{state.favsOnly=e.target.checked;renderPeople()});
 $("resetCompanyFilters").addEventListener("click",()=>{state.coSearch="";state.coCountry="ALL";state.coSort="alpha";$("companySearchPeople").value="";$("companyCountryPeople").value="ALL";$("companySortPeople").value="alpha";renderCompanies()});
 $("personReset").addEventListener("click",()=>{state.pSearch="";state.pCountry="ALL";state.pRole="ALL";state.pSort="pay-desc";state.favsOnly=false;
  $("personSearch").value="";$("personCountry").value="ALL";$("personRole").value="ALL";$("personSort").value="pay-desc";$("favoritesOnly").checked=false;renderPeople()});
 $("peopleCompanyMenu").addEventListener("click",e=>{
  const b=e.target.closest("button[data-company]");
  if(!b||!byCompany.has(b.dataset.company))return;
  state.company=b.dataset.company;state.person=null;makeURL();renderCompanies();renderCompanyDetail();
 });
 $("peopleCompanyProfile").addEventListener("click",e=>{
  const b=e.target.closest("button[data-person]");
  if(!b||!byPerson.has(b.dataset.person))return;
  openPerson(b.dataset.person,true);
 });
 $("peopleTableRows").addEventListener("click",e=>{
  const fav=e.target.closest("button[data-fav]");
  if(fav&&byPerson.has(fav.dataset.fav)){
   const id=fav.dataset.fav;
   if(bookmarks.has(id))bookmarks.delete(id);else bookmarks.add(id);
   saveBookmarks();renderPeople();return;
  }
  const b=e.target.closest("button[data-person]");
  if(!b||!byPerson.has(b.dataset.person))return;
  openPerson(b.dataset.person,true);
 });
 $("peopleDetail").addEventListener("click",e=>{
  const b=e.target.closest("button[data-action]");
  if(!b)return;
  if(b.dataset.action==="download")downloadPerson(state.person);
  if(b.dataset.action==="copy")copyPersonSource(state.person);
  if(b.dataset.action==="share")sharePerson(state.person);
 });
 $("downloadPeopleCsv").addEventListener("click",downloadCsv);
 $("routeTabs").addEventListener("click",e=>{
  const b=e.target.closest("button[data-route]");if(!b)return;state.route=b.dataset.route;renderRoutes();
 });
 document.addEventListener("keydown",e=>{
  if(e.key==="/"&&!["INPUT","SELECT","TEXTAREA"].includes(document.activeElement?.tagName)){
    e.preventDefault();$("personSearch").focus();
  }
  if(e.key==="Escape"&&document.activeElement===$("personSearch")){$("personSearch").value="";state.pSearch="";renderPeople()}
 });
 renderCompanies();renderCompanyDetail();renderPeople();if(state.person)renderPersonDetail();renderRoutes();
}
function matchCompanies(){
 const q=state.coSearch;
 const arr=db.companies.filter(c=>(state.coCountry==="ALL"||state.coCountry===c.country_code)&&(!q||(c.company_name+" "+c.home_country+" "+c.sector).toLocaleLowerCase().includes(q)));
 arr.sort(state.coSort==="verified"?(a,b)=>b.named_disclosures-a.named_disclosures||compare(a.company_name,b.company_name):
  state.coSort==="gaps"?(a,b)=>a.named_disclosures-b.named_disclosures||compare(a.company_name,b.company_name):
  (a,b)=>compare(a.company_name,b.company_name));
 return arr;
}
function renderCompanies(){
 const arr=matchCompanies();
 $("peopleCompanyCount").textContent=arr.length+" / "+db.companies.length+" COMPANIES DISPLAYED";
 if(arr.length&&!arr.some(x=>x.company_id===state.company)){
  state.company=arr[0].company_id;state.person=null;makeURL();renderCompanyDetail();
 }else if(!arr.length){$("peopleCompanyProfile").innerHTML='<span class="kicker">NO MATCHING COMPANY</span><h3>No results.</h3><p>Try another country or search term. An empty filter result does not establish absence of environmental impact.</p>'}
 $("peopleCompanyMenu").innerHTML=arr.map(c=>{
  const active=c.company_id===state.company,coverage=pct(c.named_disclosures,10);
  return '<button type="button" class="people-company-option'+(active?" is-selected":"")+'" data-company="'+safe(c.company_id)+'" aria-pressed="'+String(active)+'">'+
   '<span class="people-company-small">'+safe(c.country_code)+' · '+safe(c.sector.toUpperCase())+' <em>'+c.named_disclosures+'/10</em></span>'+
   '<strong>'+safe(c.company_name)+'</strong>'+
   '<span class="people-progress"><i style="width:'+coverage+'%"></i></span>'+
   '<small>'+c.named_disclosures+' SOURCE-VERIFIED NAME'+(c.named_disclosures===1?"":"S")+' · '+(10-c.named_disclosures)+' OPEN SLOTS</small></button>';
 }).join("")||'<p class="people-empty-filter">No companies match the filters.</p>';
}
function renderCompanyDetail(){
 const c=byCompany.get(state.company);if(!c)return;
 const coverage=pct(c.named_disclosures,10);
 const slots=c.role_slots.map(s=>{
  const named=s.status==="public_officer_identified";
  return '<article class="people-slot '+(named?"has-document":"needs-source")+'">'+
   '<div class="people-slot-top"><span>'+String(s.slot_number).padStart(2,"0")+' / '+safe(s.research_function.toUpperCase())+'</span><span class="people-source-indicator">'+(named?"SOURCE-LINKED":"IDENTITY NOT VERIFIED")+'</span></div>'+
   (named?'<div class="people-slot-name">'+safe(s.name)+'</div><p class="people-slot-sub">'+safe(s.documented_role)+'</p>'+
    '<div class="people-slot-value"><span>2025 REPORTED PAY</span><strong>'+cash(s.reported_compensation_2025_usd)+'</strong></div>'+
    '<div class="people-slot-actions"><button type="button" data-person="'+safe(s.named_person_id)+'">OPEN PUBLIC RECORD ↗</button>'+
    '<a href="'+safe(s.source_url)+'" target="_blank" rel="noopener noreferrer">SEC FILING ↗</a></div>':
    '<div class="people-slot-unknown">PERSON NOT YET IDENTIFIED</div><p class="people-slot-sub">'+safe(s.research_question)+'</p><p class="people-slot-evidence">Source needed: '+safe(s.public_evidence_to_collect)+'</p>')+
   '</article>';
 }).join("");
 $("peopleCompanyProfile").innerHTML=
  '<div class="people-company-profile-head"><div><span class="kicker">COUNTRY RESEARCH / '+safe(c.country_code)+'</span><h3>'+safe(c.company_name)+'</h3><p>'+safe(c.sector)+' · '+safe(c.home_country)+' (COMPANY HOME COUNTRY)</p></div>'+
  '<a href="dossiers.html?entity='+encodeURIComponent(c.company_id)+'" class="people-visit-dossier">COMPANY EVIDENCE DOSSIER ↗</a></div>'+
  '<div class="people-company-coverage"><span><strong>'+c.named_disclosures+'</strong> / 10 source-verified role occupants</span><div class="people-coverage-track"><i style="width:'+coverage+'%"></i></div><small>NOT A MEASURE OF ENVIRONMENTAL PERFORMANCE OR HARM</small></div>'+
  '<p class="people-company-caveat">This is a role-based source collection checklist. A missing name is an unresearched lead, not a concealed person or an allegation. A reported officer has not been tied to any particular environmental harm by this dataset.</p>'+
  '<div class="people-role-grid">'+slots+'</div>';
}
function filteredPeople(){
 const q=state.pSearch;
 const compLookup=byCompany;
 const arr=db.persons.filter(p=>
  (state.pCountry==="ALL"||compLookup.get(p.company_id).country_code===state.pCountry)&&
  (state.pRole==="ALL"||p.research_role_key===state.pRole)&&
  (!state.favsOnly||bookmarks.has(p.id))&&
  (!q||(p.name+" "+p.company_name+" "+p.role+" "+p.research_role_key).toLocaleLowerCase().includes(q))
 );
 arr.sort(state.pSort==="pay-desc"?(a,b)=>b.compensation.reported_total-a.compensation.reported_total||compare(a.name,b.name):
  state.pSort==="pay-asc"?(a,b)=>a.compensation.reported_total-b.compensation.reported_total||compare(a.name,b.name):
  state.pSort==="company"?(a,b)=>compare(a.company_name,b.company_name)||compare(a.name,b.name):
  (a,b)=>compare(a.name,b.name));
 return arr;
}
function renderPeople(){
 const arr=filteredPeople(),max=Math.max(...arr.map(p=>p.compensation.reported_total),1);
 $("personCount").textContent=arr.length+" / "+db.persons.length+" VERIFIED 2025 SEC PAY RECORDS · "+db.counts.companies_with_source_verified_names+" ISSUERS";
 $("peopleTableRows").innerHTML=arr.map(p=>{
  const bar=p.compensation.reported_total/max*100;
  return '<tr class="'+(state.person===p.id?"is-selected":"")+'"><td><button type="button" class="people-name-button" data-person="'+safe(p.id)+'">'+safe(p.name)+' <span>↗</span></button><small>'+safe(p.research_role_key.toUpperCase().replace(/-/g," "))+'</small></td>'+
  '<td>'+safe(p.company_name)+'</td><td class="people-role-cell">'+safe(p.role)+'</td>'+
  '<td class="people-pay-cell"><strong>'+cash(p.compensation.reported_total)+'</strong><span class="people-pay-track"><i style="width:'+bar.toFixed(2)+'%"></i></span></td>'+
  '<td><div class="people-row-actions"><a href="'+safe(p.source_links[0].url)+'" target="_blank" rel="noopener noreferrer" title="Read original SEC filing">SEC ↗</a>'+
  '<button type="button" class="people-favorite" data-fav="'+safe(p.id)+'" aria-pressed="'+String(bookmarks.has(p.id))+'" title="'+(bookmarks.has(p.id)?"Remove saved record":"Save public record in this browser")+'">'+(bookmarks.has(p.id)?"★":"☆")+'</button></div></td></tr>';
 }).join("")||'<tr><td colspan="5" class="people-none">No named public officers match these filters. Try CLEAR.</td></tr>';
 if(state.person)renderPersonDetail();
}
function openPerson(id,scroll){
 const p=byPerson.get(id);if(!p)return;
 state.person=id;state.company=p.company_id;makeURL();renderCompanyDetail();renderPersonDetail();
 for(const row of $("peopleTableRows").querySelectorAll("tr")){
  const b=row.querySelector("[data-person]");row.classList.toggle("is-selected",b?.dataset.person===id);
 }
 if(scroll)$("peopleDetail").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderPersonDetail(){
 const p=byPerson.get(state.person);
 if(!p){$("peopleDetail").innerHTML='<p class="people-detail-empty">Select a public officer for an evidence packet.</p>';return}
 const source=p.source_links[0],c=byCompany.get(p.company_id),role=roles.get(p.research_role_key);
 $("peopleDetail").innerHTML=
  '<div class="people-detail-heading"><div><span class="kicker">PUBLIC RECORD / '+safe(p.id.toUpperCase())+'</span><h3>'+safe(p.name)+'</h3><p>'+safe(p.role)+' · '+safe(c.company_name)+'</p></div>'+
  '<span class="people-detail-verified">SEC-FILING SOURCE LINKED</span></div>'+
  '<div class="people-detail-metrics"><div><span>FY 2025 REPORTED TOTAL COMPENSATION</span><strong>'+cash(p.compensation.reported_total)+'</strong><small>USD · SEC SUMMARY COMPENSATION TABLE</small></div>'+
  '<div><span>ROLE START (IF INDEPENDENTLY DOCUMENTED)</span><strong>'+(p.role_start?safe(p.role_start):"NOT YET VERIFIED")+'</strong><small>'+safe(p.role_end?"Role ended "+p.role_end:p.role_end_note)+'</small></div>'+
  '<div><span>PERSONAL INJURY / ENVIRONMENTAL DAMAGE</span><strong>NOT ESTIMATED</strong><small>No individual causal or damages attribution made</small></div>'+
  '<div><span>PERSONAL LEGAL LIABILITY</span><strong>NOT ASSESSED</strong><small>Neither a defendant recommendation nor a fault finding</small></div></div>'+
  '<div class="people-detail-columns"><div><h4>PUBLIC FINANCIAL FACT</h4><p>'+safe(p.compensation.caveat)+'</p>'+
  '<a href="'+safe(source.url)+'" target="_blank" rel="noopener noreferrer">ORIGINAL SEC FILING — '+safe(source.title)+' ↗</a>'+
  '<small>SEC filing date: '+safe(source.filing_date)+'. Locator: '+safe(source.locator)+'.</small></div>'+
  '<div><h4>FIVE UNANSWERED ACCOUNTABILITY QUESTIONS</h4><ol><li>Was this person responsible for a <em>specific</em> facility or operation?</li>'+
  '<li>Which documented act or omission occurred during an established tenure?</li>'+
  '<li>What pollutant, release, exposure and actual affected receptor are evidenced?</li>'+
  '<li>Could independent science attribute a specific injury or cost to the conduct?</li>'+
  '<li>Does qualified counsel identify any individual cause of action, jurisdiction or defense?</li></ol></div></div>'+
  '<div class="people-detail-limit"><strong>RESEARCH FUNCTION: '+safe(role.title.toUpperCase())+'</strong><p>'+safe(role.question)+'. '+safe(role.legal_note)+'</p></div>'+
  '<div class="people-detail-buttons"><button type="button" data-action="download">EXPORT PUBLIC COUNSEL-REVIEW FACT PACK ↓</button>'+
  '<button type="button" data-action="copy">COPY SOURCE CITATION ⧉</button><button type="button" data-action="share">COPY SHARE LINK ↗</button></div>'+
  '<div id="peopleActionMessage" role="status" aria-live="polite"></div>';
}
function publicPacket(p){
 const company=byCompany.get(p.company_id),source=p.source_links[0];
 return {
  packet_type:"public_source_research_only",generated_at:new Date().toISOString(),
  not_a_lawsuit:true,not_a_claim_of_wrongdoing:true,no_personal_liability_established:true,
  person:{name:p.name,publicly_reported_role:p.role,role_start:p.role_start,role_end:p.role_end,company:p.company_name,company_home_country:company.home_country,
    source_link:source,
    fiscal_2025_total_reported_compensation_usd:p.compensation.reported_total,
    compensation_definition:p.compensation.caveat,
    personal_harm_attribution:null,personal_environmental_profits:null,legal_liability:"not_estimated"},
  followup:{research_function:roles.get(p.research_role_key).title,
   missing_requirements:["Verified individual authority at a particular facility and period","Particular act or omission documented in primary sources","Date- and substance-specific pollution evidence","Transport/exposure pathway and independently reviewed causal method","Affected legal interest/standing, appropriate jurisdiction and limitation periods","Individual counsel review before any legal allegation or filing"]},
  advisory:"Prepared for public evidence review only. Not an allegation, legal advice or an actionable complaint."
 };
}
function downloadText(name,content,mime){
 const blob=new Blob([content],{type:mime}),link=URL.createObjectURL(blob),a=document.createElement("a");a.href=link;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(link),2000);
}
function actionMessage(s){const box=$("peopleActionMessage");if(box)box.textContent=s}
function downloadPerson(id){
 const p=byPerson.get(id);if(!p)return;
 downloadText("poisoners-"+p.id+"-public-facts.json",JSON.stringify(publicPacket(p),null,2)+"\n","application/json");
 actionMessage("Public fact packet downloaded. No defendant assessment or personal-contact data included.");
}
async function copy(s){
 try{if(!navigator.clipboard?.writeText)throw Error("Clipboard unsupported");await navigator.clipboard.writeText(s);return true}catch{return false}
}
async function copyPersonSource(id){
 const p=byPerson.get(id);if(!p)return;
 const src=p.source_links[0];const text=src.title+" ("+src.filing_date+"), "+src.url+". "+p.name+"; "+p.role+"; FY2025 SEC total compensation "+cash(p.compensation.reported_total)+". No misconduct or harm attribution.";
 actionMessage(await copy(text)?"SEC citation copied.":"Unable to access clipboard; original SEC link appears above.");
}
async function sharePerson(id){if(!id)return;const link=new URL(location.href);link.searchParams.set("person",id);link.searchParams.set("company",byPerson.get(id).company_id);
 actionMessage(await copy(link.toString())?"Shareable public-source link copied.":"Unable to copy; use your browser's address bar.");}
function cellCsv(v){let s=String(v??"");if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function downloadCsv(){
 const arr=filteredPeople();
 const header=["public_name","company","home_country","reported_role","research_function","compensation_fiscal_year","compensation_total_usd","source_url","individual_damage_attribution","legal_liability_status"];
 const rows=arr.map(p=>[p.name,p.company_name,byCompany.get(p.company_id).home_country,p.role,roles.get(p.research_role_key).title,2025,p.compensation.reported_total,p.source_links[0].url,"not estimated","not assessed"]);
 downloadText("poisoners-public-compensation-2025.csv","\ufeff"+[header,...rows].map(row=>row.map(cellCsv).join(",")).join("\r\n")+"\r\n","text/csv;charset=utf-8");
 $("personCount").textContent=arr.length+" VERIFIED PERSON RECORDS — FILTERED CSV EXPORTED";
}
function renderRoutes(){
 $("routeTabs").innerHTML=db.legal_research_routes.map(x=>'<button type="button" data-route="'+safe(x.id)+'" class="'+(state.route===x.id?"is-selected":"")+'" aria-pressed="'+String(state.route===x.id)+'">'+
 '<small>'+safe(x.country)+'</small><strong>'+safe(x.name)+'</strong><span>RESEARCH FRAMEWORK ↗</span></button>').join("");
 const route=db.legal_research_routes.find(r=>r.id===state.route);
 if(!route)return;
 $("routePanel").innerHTML=
  '<span class="kicker">LEGAL RESEARCH / '+safe(route.country)+' · '+safe(route.status.replace(/_/g," ").toUpperCase())+'</span>'+
  '<h3>'+safe(route.name)+'</h3><p class="people-route-principle">'+safe(route.principle)+'</p>'+
  '<div class="people-route-requirements"><h4>EVIDENCE THAT MUST BE ESTABLISHED</h4><ol>'+route.needs.map((n,i)=>'<li><span>'+String(i+1).padStart(2,"0")+'</span>'+safe(n)+'</li>').join("")+'</ol></div>'+
  '<div class="people-route-bottom"><strong>'+safe(route.defendant_status)+'</strong><div><a href="'+safe(route.source_url)+'" target="_blank" rel="noopener noreferrer">AUTHORITATIVE LEGAL RESEARCH ↗</a>'+
  (route.controlling_case_url?'<a href="'+safe(route.controlling_case_url)+'" target="_blank" rel="noopener noreferrer">READ CONTROLLING CASE ↗</a>':"")+'</div></div>';
}
initialize();
})();