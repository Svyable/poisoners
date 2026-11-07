(function () {
  "use strict";
  const data = window.POISON_DATA;
  if (!data) return;
  const $ = (id) => document.getElementById(id);
  const state = {period:"annual",country:"ALL",query:"",rate:0};
  const countryByCode = Object.fromEntries(data.countries.map((c) => [c.code,c]));
  const fmt = (n, digits=0) => n == null ? "—" : Number(n).toLocaleString("en-US",{maximumFractionDigits:digits});
  const escape = (s) => String(s).replace(/[&<>"']/g,(c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const forecast = (c) => {
    const r = state.rate / 100;
    let total = 0;
    for (let t=3;t<=12;t++) total += c.annual * Math.pow(1+r,t);
    return total;
  };
  const getMetric = (c) => state.period === "annual" ? c.annual : state.period === "historic" ? c.historic : forecast(c);
  function setupFilters() {
    const select = $("countryFilter");
    data.countries.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.code;
      option.textContent = c.name;
      select.appendChild(option);
    });
    $("companySearch").addEventListener("input",(e) => {state.query=e.target.value.trim().toLocaleLowerCase();renderLedger();});
    select.addEventListener("change",(e) => {state.country=e.target.value;renderLedger();});
    document.querySelectorAll(".period-btn").forEach((b) => b.addEventListener("click",() => {
      state.period = b.dataset.period;
      document.querySelectorAll(".period-btn").forEach((item) => {
        const active = item === b;
        item.classList.toggle("active",active);
        item.setAttribute("aria-pressed",String(active));
      });
      $("futureControls").hidden = state.period !== "future";
      const desc = {
        annual:"Published attributed 2024 production-linked emissions, million tonnes of CO₂-equivalent (MtCO₂e). Includes use of sold products and some operational sources.",
        historic:"Published cumulative production-linked emissions through 2024 (MtCO₂e) where available. A dash means not transcribed from the cited historical table — not zero emissions.",
        future:"Illustrative 2027–2036 emissions under your selected constant annual change rate (MtCO₂e). This is a mathematical scenario, not a forecast of damage."
      };
      $("metricNote").textContent = desc[state.period];
      $("metricColumn").textContent = state.period==="annual" ? "2024 ATTRIBUTED EMISSIONS" : state.period==="historic" ? "HISTORICAL CUMULATIVE" : "2027–2036 SCENARIO";
      renderLedger();
    }));
    $("rateSlider").addEventListener("input",(e) => {
      state.rate = Number(e.target.value);
      $("rateValue").textContent = (state.rate>0?"+":"") + state.rate + "%";
      renderLedger();
    });
  }
  function renderLedger() {
    const list = data.companies.filter((c) => {
      const countryMatches = state.country === "ALL" || c.code === state.country;
      const queryMatches = !state.query || (c.name+" "+c.sector+" "+countryByCode[c.code].name).toLocaleLowerCase().includes(state.query);
      return countryMatches && queryMatches;
    }).sort((a,b) => (getMetric(b)??-1)-(getMetric(a)??-1) || a.name.localeCompare(b.name));
    const allMax = Math.max(...data.companies.map((c) => getMetric(c) ?? 0),1);
    $("resultCount").textContent = fmt(list.length);
    $("noResults").hidden = !!list.length;
    const unit = state.period === "future" ? "Mt / 10yr" : "MtCO₂e";
    $("ledgerBody").innerHTML = list.map((c,i) => {
      const metric = getMetric(c);
      const country = countryByCode[c.code];
      const signal = metric == null ? 0 : metric/allMax*100;
      return '<tr>'+
        '<td class="rank">'+String(i+1).padStart(2,"0")+'</td>'+
        '<td><div class="entity-name">'+escape(c.name)+'</div><div class="entity-sector">'+escape(c.sector.toUpperCase())+'</div></td>'+
        '<td><span class="country-code">'+escape(c.code)+'</span>'+escape(country.name)+'</td>'+
        '<td class="number-cell">'+(metric==null?'—':fmt(metric))+' <small>'+ (metric==null?'NO VALUE':unit) +'</small></td>'+
        '<td><div class="signal-track" role="img" aria-label="'+(metric==null?'No published historical value':fmt(signal,1)+' percent of largest displayed figure')+'"><span class="signal-fill" style="width:'+signal.toFixed(1)+'%"></span></div></td>'+
        '<td><button type="button" class="row-view" data-dossier="'+escape(c.name)+'" aria-label="Open dossier: '+escape(c.name)+'">VIEW ↗</button></td>'+
      '</tr>';
    }).join("");
    document.querySelectorAll("[data-dossier]").forEach((b) => b.addEventListener("click",() => openDossier(b.dataset.dossier)));
  }
  function renderCountries() {
    const max = data.countries[0].ghg;
    $("countryGrid").innerHTML = data.countries.map((c,i) => {
      const count = data.companies.filter((e) => e.code===c.code).length;
      return '<button class="country-card" type="button" data-country="'+c.code+'" aria-label="Filter company ledger to '+escape(c.name)+'">'+
      '<span class="country-no">'+String(i+1).padStart(2,"0")+' / 10 <span class="country-arrow">↗</span></span>'+
      '<strong class="country-name">'+escape(c.name)+'</strong>'+
      '<span class="country-ghg">'+fmt(c.ghg/1000,2)+' GtCO₂e · 2025</span>'+
      '<span class="country-progress"><i style="width:'+Math.min(100,count*10)+'%"></i></span>'+
      '<span class="country-census">'+count+' SOURCE-LINKED ENTITY RECORD'+(count===1?'':'S')+' / 10 TARGET SLOTS</span>'+
      '</button>';
    }).join("");
    document.querySelectorAll("[data-country]").forEach((b) => b.addEventListener("click",() => {
      state.country = b.dataset.country;
      $("countryFilter").value = state.country;
      renderLedger();
      $("ledger").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
    }));
  }
  const receptorGuidance = {
    Air:"Air monitoring, dispersion models, meteorology and inhalation exposure. Separate global greenhouse forcing from local toxic concentrations.",
    Water:"Upstream and downstream sampling, hydrology, effluent permits, transport and drinking-water or aquatic exposure.",
    Soil:"Soil cores, spatial gradients, geochemistry, deposition, remediation histories and ingestion or agricultural transfer.",
    Plants:"Tissue analysis, crop uptake, phytotoxicity, species sensitivity and documented environmental baselines.",
    Animals:"Habitat, wildlife tissue burdens, food webs, population outcomes and non-industrial confounders.",
    Humans:"Exposure assessment, biomonitoring with consent, epidemiology, medical causation and differential risk."
  };
  function renderMatrix() {
    const el = $("heatmap");
    el.innerHTML = '<span></span>' + data.families.map((f) => '<div class="matrix-header" title="'+escape(f.name)+'">'+escape(f.name)+'</div>').join("") +
    data.receptors.map((rec,i) => '<div class="matrix-row-label">'+escape(rec)+'</div>'+data.families.map((f,j) => {
      const level = data.pathways[i][j];
      return '<button class="matrix-cell level-'+level+'" type="button" data-receptor="'+i+'" data-family="'+j+'" aria-label="'+escape(rec)+' by '+escape(f.name)+': research pathway" title="'+escape(rec)+' × '+escape(f.name)+'"><span>'+(level===2?'✳':level===1?'○':'·')+'</span></button>';
    }).join("")).join("");
    el.querySelectorAll(".matrix-cell").forEach((b) => b.addEventListener("click",() => {
      el.querySelectorAll(".matrix-cell").forEach((c)=>c.classList.remove("is-selected"));
      b.classList.add("is-selected");
      const rec = data.receptors[Number(b.dataset.receptor)];
      const fam = data.families[Number(b.dataset.family)];
      $("matrixDetail").innerHTML = '<span class="kicker">RESEARCH PATHWAY / '+escape(rec.toUpperCase())+'</span>'+
      '<div class="detail-icon">✳</div><h3>'+escape(rec)+' × '+escape(fam.name)+'</h3>'+
      '<p>'+escape(fam.detail)+'</p><p>'+escape(receptorGuidance[rec])+'</p>'+
      '<small>METHOD DESIGN ONLY · NO COMPANY-LEVEL CONTAMINATION FINDING</small>';
    }));
  }
  function renderSources() {
    $("sourceLinks").innerHTML = ["EDGAR26","CM24","LANCET","TRI","EEA","TRACE"].map((id,i) => {
      const s = data.sources[id];
      return '<a class="source-link" href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer"><span class="source-id">'+String(i+1).padStart(2,"0")+'</span><span style="flex:1"><span class="source-name">'+escape(s.title)+'</span><span class="source-scope">'+escape(s.scope)+'</span></span><span class="source-arrow">↗</span></a>';
    }).join("");
  }
  function openDossier(name) {
    const c = data.companies.find((e)=>e.name===name);
    if(!c) return;
    const country=countryByCode[c.code];
    const source=data.sources.CM24;
    $("dossierContent").innerHTML = '<div class="dossier-body">'+
      '<span class="kicker">SOURCE DOSSIER / SEED RECORD</span>'+
      '<h2 id="dossierTitle">'+escape(c.name)+'</h2>'+
      '<div class="dossier-sub">'+escape(country.name.toUpperCase())+' · '+escape(c.sector.toUpperCase())+' · PUBLIC DATA RECORD</div>'+
      '<div class="dossier-metrics"><div class="dossier-metric"><small>2024 PRODUCTION-LINKED GHG</small><strong>'+fmt(c.annual)+' MtCO₂e</strong><p>Published Carbon Majors attribution</p></div>'+
      '<div class="dossier-metric"><small>1854–2024 CUMULATIVE (IF PUBLISHED)</small><strong>'+(c.historic == null ? "Not transcribed" : fmt(c.historic)+" Mt")+'</strong><p>Absence is not a zero or missing emissions</p></div></div>'+
      '<div class="dossier-section"><h3>Primary documented observation</h3><p>InfluenceMap attributes production-linked greenhouse gas emissions to this entity in 2024. The method covers emissions from producing and selling fossil fuels or cement and can include downstream combustion elsewhere in the world.</p><a class="external" href="'+escape(source.url)+'" target="_blank" rel="noopener noreferrer">READ CARBON MAJORS METHODOLOGY & SOURCE TABLE ↗</a></div>'+
      '<div class="dossier-section"><h3>What a full Poison Index dossier still requires</h3><p>Facility ownership and jurisdictions; pollutant-specific mass and toxicity; release medium; transport; actual exposure; ecological and human-health outcomes; temporal attribution; remediation; evidence uncertainty; and legal review.</p></div>'+
      '<div class="dossier-warning">This is a greenhouse-gas <strong>production attribution</strong>, not a toxic-release inventory, a claim of unlawful conduct, a measured health outcome, or an assessment of liability. The 2024 metric is historical; the site does not monitor live corporate emissions.</div>'+'<div class="dossier-section"><a class="external" href="dossiers.html?entity='+encodeURIComponent(c.name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))+'">OPEN FULL EVIDENCE DOSSIER AND RESEARCH GATES ↗</a></div>'+
    '</div>';
    const dialog=$("dossierDialog");
    if (typeof dialog.showModal==="function") dialog.showModal();
    else dialog.setAttribute("open","");
  }
  function initNavigation() {
    const menu=$("mobileMenu"),nav=$("mobileNav");
    menu.addEventListener("click",()=>{
      nav.hidden=!nav.hidden;
      menu.setAttribute("aria-expanded",String(!nav.hidden));
      menu.setAttribute("aria-label",nav.hidden?"Open navigation":"Close navigation");
    });
    nav.querySelectorAll("a").forEach((a)=>a.addEventListener("click",()=>{nav.hidden=true;menu.setAttribute("aria-expanded","false")}));
    $("closeDialog").addEventListener("click",()=>$("dossierDialog").close());
    $("dossierDialog").addEventListener("click",(e)=>{
      if (e.target === $("dossierDialog")) $("dossierDialog").close();
    });
    const anchors=[...document.querySelectorAll(".top-nav .nav-link")].filter((a)=>a.hash);
    const ids=anchors.map((a)=>a.hash.slice(1));
    if ("IntersectionObserver" in window) {
      const observer=new IntersectionObserver((entries)=>{
        for(const entry of entries) {
          if(entry.isIntersecting && ids.includes(entry.target.id)) anchors.forEach((a)=>a.classList.toggle("active",a.hash==="#"+entry.target.id));
        }
      },{rootMargin:"-15% 0px -72% 0px"});
      ids.forEach((id)=>{const el=$(id);if(el) observer.observe(el)});
    }
  }
  setupFilters();
  renderLedger();
  renderCountries();
  renderMatrix();
  renderSources();
  initNavigation();
})();