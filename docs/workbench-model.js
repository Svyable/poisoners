/* A deliberately conservative map from a question to reviewed official portals.
 * Pure model shared by the GitHub Pages UI and Node tests. */
(function (root, factory) {
  "use strict";
  const model = factory();
  if (typeof module === "object" && module.exports) module.exports = model;
  root.POISON_WORKBENCH_MODEL = model;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";
  const concerns = Object.freeze([
    {id:"air", label:"Air quality", short:"What do monitors and forecasts show?", description:"Outdoor conditions, forecasts, and historical air measurements."},
    {id:"water", label:"Drinking water", short:"What does the water supplier report?", description:"Public-water quality reports; a household tap or private well needs separate testing."},
    {id:"releases", label:"Industrial releases", short:"What do facilities report releasing?", description:"Annual inventories are not measurements of an individual person's exposure."},
    {id:"compliance", label:"Facility compliance", short:"What do permits and inspections show?", description:"Compliance entries require status, dates, agency context and legal review."}
  ]);
  const regions = Object.freeze([
    {id:"united-states",label:"United States"},
    {id:"europe",label:"Europe"},
    {id:"canada",label:"Canada"},
    {id:"united-kingdom",label:"United Kingdom"},
    {id:"australia",label:"Australia"},
    {id:"global",label:"Global reference"}
  ]);
  const routeIds = Object.freeze({
    air: {"united-states":["us-airnow"],europe:["eu-air"],canada:["ca-aqhi"],"united-kingdom":["uk-air"],australia:[],global:["who-cities"]},
    water: {"united-states":["us-ccr"],europe:[],canada:[],"united-kingdom":[],australia:[],global:[]},
    releases: {"united-states":["us-tri"],europe:["eu-industrial"],canada:["ca-npri"],"united-kingdom":["uk-pollution"],australia:["au-npi"],global:[]},
    compliance: {"united-states":["us-echo"],europe:[],canada:[],"united-kingdom":[],australia:[],global:[]}
  });
  const steps = Object.freeze([
    {title:"Frame the public question", question:"Which pollutant, environmental medium, period and geographic scope are you trying to understand?", caution:"Avoid recording personal addresses, names, medical histories or allegations."},
    {title:"Capture the original record", question:"Record the issuing agency, source URL, record identifier, release date, reporting period, unit and methodology.", caution:"Keep a copy of the original page or public document citation; dashboards can change."},
    {title:"Check coverage and comparability", question:"Does the tool cover this place, facility, chemical, reporting threshold and time window? Is the result measured, modeled or self-reported?", caution:"A missing entry is not proof of clean conditions; unlike measures cannot simply be combined."},
    {title:"Test the potential pathway", question:"Is there reliable evidence connecting the documented release or condition to a specific air, water, soil or food pathway?", caution:"An estimated emission or released mass is not the concentration or dose a person received."},
    {title:"Find independent outcome evidence", question:"What independent samples, quality controls, exposure studies or population-level observations would be needed?", caution:"Do not infer a particular person's illness or ecological injury from an inventory alone."},
    {title:"Record uncertainty and next action", question:"Which facts remain unknown? What official records, sampling, scientific review or appropriate agency contact would resolve them?", caution:"Do not equate an enforcement allegation, settlement, or statistical association with proven legal fault."}
  ]);
  const byId=(array,id)=>array.find(x=>x.id===id);
  function getPlan(data,selection) {
    if(!data || !Array.isArray(data.portals)) throw Error("Reviewed portal catalog unavailable");
    const concern=byId(concerns,selection && selection.concern);
    const region=byId(regions,selection && selection.region);
    if(!concern || !region) throw Error("Unsupported research selection");
    const catalog=new Map(data.portals.map(p=>[p.id,p]));
    const primaryIds=routeIds[concern.id][region.id];
    const sources=primaryIds.map(id=>{
      const portal=catalog.get(id);
      if(!portal || portal.group!==region.id || !/^https:\/\//.test(portal.url))
        throw Error("Official portal mapping invalid: "+id);
      return {portal,role:"Regional starting point"};
    });
    if(concern.id==="air" && region.id!=="global") {
      const contextual=catalog.get("who-cities");
      if(contextual && contextual.group==="global" && /^https:\/\//.test(contextual.url))
        sources.push({portal:contextual,role:"Historical city-level context only"});
    }
    return {
      concern,region,sources,steps,reviewedOn:data.reviewed_on,
      hasRegionalSource:primaryIds.length>0,
      boundary:primaryIds.length
        ? "Official records support a research starting point, not a finding of contamination, personal injury, culpability or legal liability."
        : "The curated directory has no direct regional tool for this question. This is a catalog coverage gap, not evidence that a hazard is absent. Seek the relevant local environmental or water authority."
    };
  }
  function createWorksheet(plan,checks,notes) {
    const status=Array.isArray(checks)?checks:[];
    const entries=Array.isArray(notes)?notes:[];
    const safeNote=x=>String(x??"").slice(0,2500).replace(/[\u0000-\u001f]/g," ").trim();
    const output=[
      "# POISONERS / Public-record research worksheet",
      "",
      "**Question:** "+plan.concern.label,
      "**Coverage:** "+plan.region.label,
      "**Directory reviewed:** "+plan.reviewedOn,
      "**Status:** Research notes, not verified facts or a legal determination.",
      "",
      "## Official source starting points",
      ""
    ];
    if(!plan.sources.length)output.push("No matching source in the current curated catalog. Consult the relevant local authority.","");
    for(const {portal,role} of plan.sources) {
      output.push("- "+portal.name+" ("+role+") — "+portal.url);
      output.push("  - Scope: "+portal.coverage);
      output.push("  - Reporting period: "+portal.vintage);
      output.push("  - Limitation: "+portal.limit);
    }
    output.push("","## Evidence review checklist","","A checked step means *reviewed by the worksheet user*, not independently verified.","");
    plan.steps.forEach((step,i)=>{
      output.push("### "+(i+1)+". "+step.title);
      output.push("- ["+(status[i]?"x":" ")+"] Reviewed");
      output.push("- Question: "+step.question);
      output.push("- Caution: "+step.caution);
      output.push("- Public-source note: "+(safeNote(entries[i])||"Not entered"));
      output.push("");
    });
    output.push("## Unresolved limitations","",plan.boundary,"","No private claimant data, medical records or unverified accusations should be entered in a public submission.","");
    return output.join("\n");
  }
  return Object.freeze({concerns,regions,routeIds,steps,getPlan,createWorksheet});
});
