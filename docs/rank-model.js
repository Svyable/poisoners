/* POISONERS Rank Lab: comparability-aware, deterministic filtering and rank ordering.
 * Static data only; no estimate of injury, wrongful benefit or legal liability.
 * Every numeric metric is scoped to one dataset and declared accounting boundary.
 */
(function(root,factory){
 "use strict";
 const api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.POISON_RANK_MODEL=api;
})(typeof window!=="undefined"?window:typeof globalThis!=="undefined"?globalThis:null,function(){
 "use strict";
 const clean=v=>String(v??"").trim();
 const asNumber=v=>typeof v==="number"&&Number.isFinite(v)?v:null;
 const add=(value,arr)=>arr.includes(value)?arr.concat([value]):arr;
 const index=(arr,field)=>[...new Set(arr.map(x=>x[field]).filter(x=>x!==null&&x!==undefined&&x!==""))].sort((a,b)=>String(a).localeCompare(String(b),"en"));
 const fmtN=(v,digits=2)=>v==null?"Unknown":Number(v).toLocaleString("en-US",{maximumFractionDigits:digits});
 function inflationFactor(data,currency,year){
   const y=Number(year),target=Number(data.reference_year);
   if(!Number.isInteger(y)||y>target)return null;
   if(["USD","CAD","INR"].includes(currency)){const idx=data.inflation[currency]?.index,n=idx?.[y],d=idx?.[target];return Number.isFinite(n)&&Number.isFinite(d)&&n>0?d/n:null;}
   if(currency==="BRL"){if(y<2021)return null;let factor=1;for(let k=y+1;k<=target;k++){const rate=data.inflation.BRL.annual_rates_percent[k];if(!Number.isFinite(rate))return null;factor*=1+rate/100;}return factor;}
   return null;
 }
 function adjustedCashPaid(payment,currency,data){
   if(!payment||!Number.isFinite(payment.amount)||payment.amount<=0)return null;
   if(Array.isArray(payment.installments)&&payment.installments.length){
     const total=payment.installments.reduce((sum,p)=>sum+(Number.isFinite(p.amount)?p.amount:NaN),0);
     if(!Number.isFinite(total)||Math.abs(total-payment.amount)>0.01)return null;
     let adjusted=0;
     for(const p of payment.installments){
       const year=/^(19|20)[0-9]{2}-[0-9]{2}(?:-[0-9]{2})?$/.test(p.date)?Number(p.date.slice(0,4)):null;
       const factor=inflationFactor(data,currency,year);
       if(factor===null)return null;
       adjusted+=p.amount*factor;
     }
     return adjusted;
   }
   const factor=inflationFactor(data,currency,payment.value_year);
   return Number.isInteger(payment.value_year)&&factor!==null?payment.amount*factor:null;
 }
 const descriptions={
  companies:"2024 company producer-linked greenhouse-gas estimates. Product-use emissions can be included. Not a facility exposure, toxicity or injury ranking.",
  countries:"2025 territorial GHG inventories (EDGAR); different boundary from producer-linked companies. Country counts do not imply local legal fault.",
  people:"Public 2025 SEC Summary Compensation Table totals. Reported pay is not realized cash, net worth, environmental profit, or evidence of wrongdoing.",
  roles:"Ten role-research functions for each company. Empty slots are unknown identities, not zero leadership or environmental impact.",
  payments:"Separate legal orders, obligations and confirmed cash payments. Different remedies, overlapping cases, currencies and vintages are not additive.",
  metrics:"142 metric definitions, not 142 observed measurements. Sorting source leads or units reflects research coverage, not risk.",
  chemicals:"Compound identities and hazard descriptors, not a scale of toxicity severity or individual exposure.",
  observations:"Source-published national power-sector chemical masses. Compare only identical source, reporting year, unit and coverage; no per-ton toxicity ranking."
 };
 function field(id,label,type,extra={}){return {id,label,type,...extra}}
 const datasets={
  companies:{label:"Companies · producer GHG",unit_note:"2024 MtCO₂e/year; cumulative totals cover different histories",fields:[
   field("annual","2024 producer GHG","number",{unit:"MtCO₂e",meaning:"Global production-linked GHG, not a toxic or territorial release"}),
   field("cumulative","Published historical cumulative GHG","number",{unit:"MtCO₂e",meaning:"Historical periods may differ across producers; not necessarily comparable through time"}),
   field("name","Company","text"),field("country","Home country","text"),field("sector","Producer sector","text"),field("grade","Source grade","text"),field("historyStatus","Historical value coverage","text"),field("open","Evidence gates still open","number",{unit:"gates",meaning:"Research workflow coverage, not degree of harm"})],
   facets:["country","sector","grade","historyStatus"]},
  countries:{label:"Countries · territorial GHG",unit_note:"EDGAR 2025 MtCO₂e territorial; no LULUCF",fields:[
   field("territorial","2025 territorial GHG","number",{unit:"MtCO₂e",meaning:"2025 territorial greenhouse gas total, not site-specific exposure"}),
   field("name","Country","text"),field("companyCount","Company source entries","number",{unit:"entries",meaning:"Records attributed to companies domiciled here; NOT national facility releases"}),
   field("coverage","Emissions-only research slots","number",{unit:"slots",meaning:"Research slots populated, not verified harm cases"})],
   facets:["country"]},
  people:{label:"People · publicly reported pay",unit_note:"Fiscal 2025 SEC Summary Compensation Table totals, USD",fields:[
   field("pay","Reported FY2025 total pay","number",{unit:"USD",meaning:"SEC accounting figure, not realized income, net worth or illicit gain"}),
   field("name","Publicly disclosed officer","text"),field("company","Company","text"),field("role","Disclosed professional role","text"),field("function","Research function","text"),
   field("filing","SEC filing date","text")],facets:["company","function","role","filing"]},
  roles:{label:"Research functions · 500 slots",unit_note:"Presence of public identity and research completeness only",fields:[
   field("pay","Reported FY2025 pay, where disclosed","number",{unit:"USD",meaning:"Only named SEC officers; missing values are unranked"}),
   field("company","Company","text"),field("country","Home country","text"),field("sector","Sector","text"),field("function","Research function","text"),field("identity","Officer identity status","text"),field("name","Documented officer, if any","text")],
   facets:["company","country","sector","function","identity"]},
  payments:{label:"Legal outcomes · payments and obligations",unit_note:"All financial rankings require one original currency and one clearly defined monetary field",fields:[
   field("obligationMax","Published maximum legal commitment","number",{unit:"original currency",meaning:"Includes up-to caps, schedules, fines and fixed commitments; NOT necessarily paid, and legal categories differ"}),
   field("obligationMin","Published minimum stated amount","number",{unit:"original currency",meaning:"Zero can be a disclosed cap lower bound; NOT zero harm"}),
   field("adjustedMax","2025 purchasing-power upper comparator","number",{unit:"original currency",meaning:"Original-currency inflation illustration at disposition year, NOT amount legally owed"}),
   field("adjustedMin","2025 purchasing-power lower comparator","number",{unit:"original currency",meaning:"Not a current debt, future payment or exchange-rate conversion"}),
   field("paid","Documented paid amount","number",{unit:"original currency",meaning:"Only confirmed or dated partial payment; unknown stays unranked"}),
   field("paidAdjusted","2025 paid-cash purchasing-power comparator","number",{unit:"original currency",meaning:"Inflation of verified cash year or reconciled installments only; multi-year payments without a complete dated schedule are unknown, and different legal remedies remain incomparable"}),
   field("year","Obligation/disposition year","number",{unit:"year",meaning:"Historical reporting vintage, not a continuous harm rate"}),
   field("entity","Named parties","text"),field("status","Paid evidence status","text"),field("currency","Original currency","text"),field("type","Legal outcome type","text"),field("hazard","Hazard / event","text"),field("jurisdiction","Jurisdiction","text")],
   facets:["currency","status","type","year","jurisdiction","hazard","entity"]},
  metrics:{label:"Metric library · definitions",unit_note:"Definitions only; no company impacts or observed readings implied",fields:[
   field("name","Metric definition","text"),field("domain","Research domain","text"),field("kind","Observation type","text"),field("unit","Proposed unit","text"),field("medium","Environmental media","text"),field("receptor","Receptors","text"),field("sources","Candidate source count","number",{unit:"leads",meaning:"Number of source leads, not measurements or harm strength"}),
   field("timeFrames","Proposed time horizons","number",{unit:"horizons",meaning:"Research coverage metadata, not exposure observations"}),field("temporal","Supported time horizons","text"),field("status","Data publication status","text"),field("sourceLeads","Candidate source IDs","text")],
   facets:["domain","kind","unit","medium","receptor","temporal","status"]},
  chemicals:{label:"Chemical matrix · identity and hazard",unit_note:"Chemical metadata; no observed individual risk or severity ranking",fields:[
   field("name","Chemical","text"),field("symbol","Formula / group","text"),field("family","Chemical family","text"),field("cas","CAS reference","text"),field("media","Environmental media","text"),
   field("odor","Odor description","text"),field("hazards","Hazard descriptors (not severity)","text"),field("referenceCount","Public source references","number",{unit:"references",meaning:"Metadata source count, NOT toxicological severity"})],
   facets:["family","media","odor","hazards"]},
  observations:{label:"Chemical mass · source-defined cohorts",unit_note:"National sector figures; select identical agency/source, year and unit before ranking masses",fields:[
   field("mass","Reported chemical mass","number",{unit:"source unit",meaning:"Same published aggregate inventory only; NOT equivalent toxicity per tonne"}),
   field("chemical","Substance / reported grouping","text"),field("cohort","Source, period, unit and coverage","text"),field("year","Reporting year","number",{unit:"year",meaning:"Coverage-specific published reporting period"})],
   facets:["cohort","chemical","year"]}
 };
 function makeRows(data){
  if(!data||!data.dossiers||!data.people||!data.payments||!data.foundation||!data.chemistry||!data.seed)throw Error("All audited public data snapshots are required");
  const countries=new Map(data.foundation.countries.map(c=>[c.code,c]));
  const companyCount=new Map();
  for(const c of data.dossiers.dossiers)companyCount.set(c.home_country_code,(companyCount.get(c.home_country_code)||0)+1);
  const companyRows=data.dossiers.dossiers.map(d=>({
   id:d.id,name:d.company,country:d.home_country,code:d.home_country_code,sector:d.sector,
   annual:asNumber(d.metric.value),cumulative:asNumber(d.metric.historical_cumulative),
   grade:d.evidence.grade,historyStatus:d.metric.historical_cumulative==null?"Not reported":"Published value",open:d.gates.filter(x=>x.status==="open").length,
   link:"dossiers.html?entity="+encodeURIComponent(d.id)+"#investigate",
   source:d.evidence.source.url,sourceLabel:d.evidence.source.title,
   boundary:d.metric.boundary
  }));
  const countryRows=data.seed.countries.map(c=>{
   const meta=countries.get(c.code);if(!meta)throw Error("Missing country workstream "+c.code);
   return {id:c.code,name:c.name,country:c.name,territorial:asNumber(c.ghg),companyCount:companyCount.get(c.code)||0,
    coverage:meta.coverage_slots_filled??null,
    link:"index.html#atlas",source:data.seed.sources.EDGAR26.url,sourceLabel:data.seed.sources.EDGAR26.title,
    boundary:"EDGAR 2025 territorial emissions, excluding land use"};
  });
  const peopleRows=data.people.persons.map(p=>({
    id:p.id,name:p.name,company:p.company_name,role:p.role,function:p.research_role_key,
    pay:asNumber(p.compensation.reported_total),filing:p.source_links[0].filing_date,
    link:"people.html?company="+encodeURIComponent(p.company_id)+"&person="+encodeURIComponent(p.id)+"#verifiedPeople",
    source:p.source_links[0].url,sourceLabel:p.source_links[0].title,
    boundary:"2025 SEC Summary Compensation Table in USD; not realized income"
  }));
  const roleRows=data.people.companies.flatMap(c=>c.role_slots.map(slot=>({
    id:slot.slot_id,company:c.company_name,country:c.home_country,sector:c.sector,
    function:slot.research_function,identity:slot.status==="public_officer_identified"?"Public officer documented":"Identity not verified",
    name:slot.name||null,pay:asNumber(slot.reported_compensation_2025_usd),
    link:"people.html?company="+encodeURIComponent(c.company_id)+"#peopleWorkspace",source:slot.source_url||null,
    sourceLabel:slot.source_url?"Official executive filing":"No verified source for this slot",
    boundary:"Research function slot, not an accused individual or inferred wrongdoing"
  })));
  const paymentRows=data.payments.cases.map(c=>{
    const yr=c.obligation.year,cur=c.obligation.currency,factor=inflationFactor(data.payments,cur,yr);
    return {id:c.id,entity:c.entities.join(" / "),currency:cur,status:c.payment.status,
     obligationMax:asNumber(c.obligation.max),obligationMin:asNumber(c.obligation.min),
     adjustedMax:factor===null?null:c.obligation.max*factor,
     adjustedMin:factor===null?null:c.obligation.min*factor,
     paid:asNumber(c.payment.amount),paidAdjusted:adjustedCashPaid(c.payment,cur,data.payments),year:yr,type:c.outcome_type,hazard:c.hazard,jurisdiction:c.jurisdiction,
     link:"damages.html?company="+encodeURIComponent(c.entities[0])+"#paymentList",
     source:c.sources[0]?.url||null,sourceLabel:c.sources[0]?.name||"Source not specified",
     boundary:c.obligation.kind+"; "+c.disposition+"; payment: "+c.payment.status
    };
  });
  const metricRows=data.foundation.metrics.map(m=>({
   id:m.id,name:m.label,domain:m.domain,kind:m.kind,unit:m.unit,status:m.status,temporal:m.temporal.join(", "),sourceLeads:m.source_candidates.join(", "),
   medium:m.medium.join(", "),receptor:m.receptors.join(", "),sources:m.source_candidates.length,
   timeFrames:m.temporal.length,link:"index.html#foundation",
   source:null,sourceLabel:"Candidate sources, not confirmed metric observations",
   boundary:"Definition only; not a published observation or toxicity ranking"
  }));
  const chemicalRows=data.chemistry.compounds.map(m=>({
   id:m.id,name:m.name,symbol:m.symbol,family:m.family,cas:m.cas??"Not assigned",
   media:m.media.join(", "),odor:m.odor,hazards:m.harm.join(", "),referenceCount:m.sources.length,
   link:"chemistry.html",source:m.sources[0]?.url||null,sourceLabel:m.sources[0]?.title||"Compound reference",
   boundary:"Chemical hazard descriptor, not a comparison of dose or harmfulness"
  }));
  const observationRows=data.chemistry.headline_sets.flatMap(g=>g.figures.map(f=>{
    const cohort=g.id+" · "+g.year+" · "+g.unit;
    return {id:g.id+"--"+f.chemical_id,chemical:f.label,cohort,year:g.year,
     mass:asNumber(f.value),link:"chemistry.html",source:g.source_url,sourceLabel:g.source_title,
     boundary:g.scope+" · "+g.unit+" · "+g.year};
  }));
  const rows={companies:companyRows,countries:countryRows,people:peopleRows,roles:roleRows,payments:paymentRows,
   metrics:metricRows,chemicals:chemicalRows,observations:observationRows};
  for(const [id,list] of Object.entries(rows)){
   if(!Array.isArray(list))throw Error("Invalid dataset "+id);
   const ids=new Set();
   for(const row of list){if(ids.has(row.id))throw Error("Duplicate id "+id+": "+row.id);ids.add(row.id);}
  }
  return rows;
 }
 function cohortGuard(dataset,config,rows,metric){
  const f=datasets[dataset].fields.find(x=>x.id===metric);
  if(!f)return "Choose a valid metric";
  if(f.type!=="number")return "";
  if(dataset==="payments"&&["obligationMin","obligationMax","adjustedMax","adjustedMin","paid","paidAdjusted"].includes(metric)&&config.facets?.currency==="ALL")
    return "Select one currency (USD, BRL, CAD or INR) to rank money. These currencies cannot share a numeric leaderboard.";
  if(dataset==="observations"&&config.facets?.cohort==="ALL")
    return "Choose one source/year/unit cohort to rank chemical mass. EPA short tons cannot be merged with EIA metric tonnes or different reporting years.";
  return "";
 }
 function safeConfig(dataset,config={}){
  if(!datasets[dataset])throw Error("Unknown rank dataset");
  const fields=datasets[dataset].fields,known=new Set(fields.map(x=>x.id));
  const facets={};for(const name of datasets[dataset].facets)facets[name]=String(config.facets?.[name]??"ALL");
  return {
   metric:known.has(config.metric)?config.metric:fields[0].id,
   secondary:known.has(config.secondary)&&config.secondary!==config.metric?config.secondary:null,
   tertiary:known.has(config.tertiary)&&config.tertiary!==config.metric&&config.tertiary!==config.secondary?config.tertiary:null,
   direction:config.direction==="asc"?"asc":"desc",
   secondaryDirection:config.secondaryDirection==="desc"?"desc":"asc",
   tertiaryDirection:config.tertiaryDirection==="desc"?"desc":"asc",
   query:String(config.query??"").trim().toLocaleLowerCase().slice(0,150),
   facets,min:config.min==null||config.min===""?null:Number(config.min),
   max:config.max==null||config.max===""?null:Number(config.max),
   onlyKnown:config.onlyKnown===true&&!config.missingOnly,
   missingOnly:config.missingOnly===true,
   rules:(Array.isArray(config.rules)?config.rules:[]).slice(0,4).flatMap(rule=>{
     if(!rule||!known.has(rule.field))return [];
     const type=fields.find(f=>f.id===rule.field).type;
     if(["missing","present"].includes(rule.operator))return [{field:rule.field,operator:rule.operator,value:null}];
     if(type!=="number"||!["gte","lte","gt","lt","eq"].includes(rule.operator))return [];
     if(rule.value===null||rule.value===undefined||String(rule.value).trim()==="")return [];
     const v=Number(rule.value);return Number.isFinite(v)?[{field:rule.field,operator:rule.operator,value:v}]:[];
   }),
   limit:[10,25,50,100,"all"].includes(config.limit)?config.limit:"all"
  };
 }
 function rank(dataset,rows,input={}){
  const cfg=safeConfig(dataset,input),schema=datasets[dataset],fieldDef=schema.fields.find(x=>x.id===cfg.metric),
   guarded=[cfg.metric,cfg.secondary,cfg.tertiary,...cfg.rules.filter(r=>!["missing","present"].includes(r.operator)).map(r=>r.field)].filter(Boolean),
   warning=guarded.map(f=>cohortGuard(dataset,cfg,rows,f)).find(Boolean)||"";
  const safeMin=Number.isFinite(cfg.min)?cfg.min:null,safeMax=Number.isFinite(cfg.max)?cfg.max:null;
  function value(row,key){return row[key]==null||row[key]===""?null:row[key]}
  function ruleMatches(row,rule){
    const raw=value(row,rule.field);
    if(rule.operator==="missing")return raw===null;
    if(rule.operator==="present")return raw!==null;
    const n=asNumber(raw);
    if(n===null)return false;
    switch(rule.operator){
      case "gte":return n>=rule.value;
      case "lte":return n<=rule.value;
      case "gt":return n>rule.value;
      case "lt":return n<rule.value;
      case "eq":return n===rule.value;
      default:return false;
    }
  }
  let filtered=rows.filter(row=>{
   if(cfg.query){
    const content=Object.values(row).filter(v=>typeof v==="string").join(" ").toLocaleLowerCase();
    if(!content.includes(cfg.query))return false;
   }
   for(const [key,want] of Object.entries(cfg.facets)){
    if(want!=="ALL"&&!String(row[key]??"").split(", ").includes(want)&&String(row[key]??"")!==want)return false;
   }
   const n=asNumber(row[cfg.metric]);
   if(cfg.onlyKnown&&n===null)return false;
   if(cfg.missingOnly&&n!==null)return false;
   if(!cfg.rules.every(rule=>warning&&!["missing","present"].includes(rule.operator)?true:ruleMatches(row,rule)))return false;
   if((safeMin!==null||safeMax!==null)&&n===null)return false;
   if(safeMin!==null&&n<safeMin)return false;
   if(safeMax!==null&&n>safeMax)return false;
   return true;
  });
  const sorted=[...filtered];
  function compareValue(a,b,key,dir){
   const def=schema.fields.find(f=>f.id===key),av=value(a,key),bv=value(b,key);
   if(av===null&&bv===null)return 0;
   if(av===null)return 1;if(bv===null)return -1;
   const diff=def?.type==="number"&&typeof av==="number"&&typeof bv==="number"?av-bv:
    String(av).localeCompare(String(bv),"en",{numeric:true,sensitivity:"base"});
   return dir==="desc"?-diff:diff;
  }
  if(!warning)sorted.sort((a,b)=>compareValue(a,b,cfg.metric,cfg.direction)||
    (cfg.secondary?compareValue(a,b,cfg.secondary,cfg.secondaryDirection):0)||
    (cfg.tertiary?compareValue(a,b,cfg.tertiary,cfg.tertiaryDirection):0)||
    String(a.id).localeCompare(String(b.id)));
  const total=sorted.length;
  const shown=cfg.limit==="all"?sorted:sorted.slice(0,cfg.limit);
  const numerical=fieldDef.type==="number";
  let seen=0,previous=null,previousRank=0;
  const ranked=shown.map((row)=>{
   const v=asNumber(row[cfg.metric]);
   let position=null;
   if(numerical&&!warning&&v!==null){
    seen++;
    position=previous!==null&&v===previous?previousRank:seen;
    previous=v;previousRank=position;
   }
   return {...row,rank:position};
  });
  const values=!warning&&numerical?filtered.map(r=>asNumber(r[cfg.metric])).filter(v=>v!==null).sort((a,b)=>a-b):[];
  const quantile=(p)=>{if(!values.length)return null;const pos=(values.length-1)*p,lo=Math.floor(pos),hi=Math.ceil(pos);return values[lo]+(values[hi]-values[lo])*(pos-lo)};
  const summary=!warning&&numerical?{known:values.length,missing:total-values.length,min:values[0]??null,
    p25:quantile(.25),median:quantile(.5),p75:quantile(.75),max:values.at(-1)??null}:null;
  return {config:cfg,warning,field:fieldDef,rows:ranked,total,available:filtered.filter(r=>asNumber(r[cfg.metric])!==null).length,
   skipped:total-shown.length,appliedMetric:numerical&&!warning,summary};
 }
 function facetsFor(dataset,rows){
  if(!datasets[dataset])throw Error("Unknown cohort");
  const fields=datasets[dataset].facets;
  return Object.fromEntries(fields.map(name=>[name,["ALL",...new Set(rows.flatMap(row=>String(row[name]??"").split(", ").filter(Boolean)))].sort((a,b)=>a==="ALL"?-1:b==="ALL"?1:a.localeCompare(b))]));
 }
 function csv(rows,columns){
  function escapeCell(v){let s=String(v??"");if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
  return [columns.map(c=>c.label||c.id),...rows.map(row=>columns.map(c=>row[c.id]??""))].map(line=>line.map(escapeCell).join(",")).join("\r\n")+"\r\n";
 }
 return Object.freeze({datasets,descriptions,makeRows,rank,facetsFor,cohortGuard,inflationFactor,safeConfig,csv,fmtN});
});