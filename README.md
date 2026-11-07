# POISONERS — The Global Poison Index

**Make the damage visible.** An open environmental evidence observatory and a proposed multidimensional framework for building defensible scientific and legal dossiers.

> **Research platform v5 chemical-first addition, November 7, 2026.** The site contains 50 source-linked corporate records from one published 2024 greenhouse-gas attribution dataset, plus the ten highest-emitting sovereign countries in EDGAR's 2025 GHG inventory. It does **not** contain 100 fully researched company dossiers, toxicity rankings, proven deaths attributable to those companies, or findings of unlawful conduct.

## The website

- [Universal Rank & Filter Lab](docs/rankings.html): eight source-bounded research cohorts with metric switching, two-key stack ranking, country/sector/status/chemical facets, numeric ranges, source details, pinned two-record comparisons, device-local saved views, shareable links and CSV/JSON export. Unknown remains unranked; different currencies or chemical reporting groups cannot share a leaderboard.
- [Interactive observatory](docs/index.html): searchable company ledger, temporal views, ten-country atlas, 6 × 8 exposure-research matrix, company source drawers, supporting sources.
- [Chemical hazards and stank matrix](docs/chemistry.html): 14 compound or pollutant-class profiles (SO₂, NOₓ, Hg, arsenic, lead, cadmium, chromium(VI), selenium, sulfuric acid mist, PM₂.₅, HCl, HF, H₂S and formaldehyde). Shows **2025 EIA U.S. power/CHP SO₂ (902,000 metric tonnes) and NOₓ (1,144,000 metric tonnes)** and **EPA 2024 regulated-power Hg (2.2 US short tons)** with visibly different boundaries. [Source-bound JSON](docs/chemical-hazards.json). Odor sorting is never toxicity scoring.
- [Pilot facility-chemical chain](docs/chemistry.html#facility-records): one time-bound 2024 ExxonMobil Baytown Chemical Plant identity approved for **future EPA TRI Form R source-file import**, plus two explicitly unapproved research candidates. [Provenance/ownership manifest](data/tri-facility-links.json), [importer](scripts/import-tri-basic.cjs), [methodology](data/tri-import-methodology.md), and [public import state](docs/tri-facility-releases.json) are versioned. No plant-level toxic mass is published until an original EPA CSV and its SHA-256 are processed and reviewed.
- [Official environmental records directory](docs/public-records.html): 12 public government and WHO tools covering six geographic groups, with coverage, source dates, and careful interpretation guidance.
- [Public awareness desk](docs/awareness.html): ten source-linked briefs covering pollution exposure, local information, and limits on interpreting risk.
- [Start here: research guide](docs/guide.html): orientation, interpretation, data boundaries, evidence ladder and frequently asked questions.
- [Open data and sources](docs/data-access.html): downloadable public JSON snapshots, primary-source boundaries and reproducible build steps.
- [About and corrections](docs/about.html): project status, research principles, roadmap and a documented public correction route.
- [People & Accountability Atlas](docs/people.html): 500 research roles across 50 companies, 34 sourced officers in seven SEC issuers, reported FY2025 compensation filters, bookmarks, source packets and jurisdiction-specific evidence questions. No personal guilt ranks or automated lawsuits.
- [People research methodology](docs/people-methodology.html): public compensation definitions, actual decision authority, causation and independent-counsel review criteria.
- [Dossier Lab](docs/dossiers.html): 50 source-bound company research profiles, visible seven-stage evidence gates, precise citation and public JSON export, like-for-like climate comparisons and primary-source historical comparator cases. No composite toxicity/guilt ranking.
- [Methodology](docs/methodology.html): historical / annual / future harm design, pollutant/receptor matrix, causal models, uncertainty, grades, proposed data ingestion.
- [Research operations protocol](docs/operating-protocol.html): public evidence chain, release gates, metric architecture and country-level workstreams.
- [Case engine](docs/legal.html): ten-country preliminary legal-route map and a counsel-gated, privacy-protecting workflow.
- [Damages & Payments Ledger](docs/damages.html): eleven publicly sourced monetary outcomes, status of cash paid versus settlements or caps, exact document links, and same-currency 2025 purchasing-power comparisons; not an additive environmental injury score.
- [Documented case studies](docs/case-studies.html): Japan's Minamata disease, BP Deepwater Horizon, Vale Brumadinho and 3M's PFAS drinking-water settlement, with official sources and distinctions between court findings, settlements and claims.
- [Evidence record schema](schema/evidence-record.schema.json): source metadata, legal-entity and date boundaries, measurement and confidence fields.

**Preview locally:** run 'python3 -m http.server 8000 --directory docs' then open http://localhost:8000. **Verify:** run 'node scripts/verify.cjs'. No npm dependencies.

**Publish with GitHub Pages:** Repository Settings → Pages → Build and deployment → Deploy from branch → select `main` and `/docs`. Save. The published project URL is normally https://svyable.github.io/poisoners/ unless a custom domain is configured.

## Data sources and boundaries

| Source | Signal | Important limit |
|---|---|---|
| [JRC EDGAR 2026](https://edgar.jrc.ec.europa.eu/report_2026) | Territorial GHG inventories, 2025 | Excludes land-use change. Countries, not corporations. |
| [Carbon Majors, Jan. 2026 update](https://www.influencemap.org/briefing/Carbon-Majors-2024-Data-Update-35466) | Production-linked 2024 emissions and published historical totals | Global producer attribution includes use of sold products, not a toxic-release or fault measure. |
| [Lancet pollution and health review (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11995256/) | ~9M premature pollution deaths annually, based on 2019 | No allocation to the listed companies. |
| [EPA TRI](https://www.epa.gov/toxics-release-inventory-tri-program/tri-toolbox) | Facility-reported chemicals | Release amount alone is not human injury. |
| [EPA ECHO](https://echo.epa.gov/resources/echo-data/about-the-data) | Permits, compliance and enforcement | Read actual underlying decisions and quality limitations. |
| [EEA Industrial Emissions](https://industry.eea.europa.eu/industrial-emissions) | European pollutant releases/transfers | Country and reporting limits. |
| [Climate TRACE](https://climatetrace.org/data) | Asset-level emissions estimates | Models and versions differ. |
| [OpenAQ](https://openaq.org/platform/) | Ambient air measurements | Monitoring coverage is not universal. |
| [State of Global Air](https://www.stateofglobalair.org/data) | Exposure and burden-of-disease models | Not facility-level causal attribution. |

### Ten-country launch cohort

The ten largest sovereign-country **2025 territorial GHG emitters** in EDGAR 2026, omitting EU27 and international sectors. This **does not rank overall toxic harm by country**.

| Country | 2025 GHG (MtCO₂e) | Seeded producer records |
|---|---:|---:|
| China | 15,981.00 | 11 |
| United States | 6,018.30 | 10 |
| India | 4,508.01 | 6 |
| Russia | 2,574.39 | 10 |
| Indonesia | 1,358.91 | 3 |
| Brazil | 1,306.59 | 1 |
| Iran | 1,119.32 | 1 |
| Japan | 1,063.13 | 2 |
| Saudi Arabia | 844.96 | 1 |
| Canada | 764.52 | 5 |

**50 company records total.** Navigation associates a company with its home country, not the location of its emissions. Corporate and national emissions **use different accounting boundaries** and cannot be added as equivalent totals. Unscored countries and missing historical data are **not** zero harm.

## Chemical-first hazard evidence

**CO₂ is not used as a direct-toxicity or “poison” rank.** It is essential to photosynthesis and has an independent climate-forcing role. A greenhouse-gas throughput figure has no place in a chemical acute-hazard ranking. This does not dismiss climate impacts or confined-space risks of elevated CO₂. The primary observatory now foregrounds measured SO₂ and NOₓ from EIA 2025 (US power + CHP, **metric tonnes**) and separately EPA's 2024 covered-unit mercury (Hg, **US short tons**). These two inventories have different years, units, and populations: never calculate trends or company scores by comparing them as if identical.

**The chemical matrix is not a company leaderboard.** Profile entries distinguish emissions, chemical species, acid and particle formation, uptake, persistence, neurotoxicity, carcinogenic potential, ecology, and sensory odor. NOₓ is not synonymous with NO₂; gaseous SO₂ is not directly emitted sulfuric acid mass; elemental Hg emissions are not methylmercury fish concentration; and total chromium is not hexavalent chromium. Strong rotten-egg odor from H₂S is an unreliable safety signal at high concentrations; metals may be odorless. Missing chemical-specific corporate/facility data remain **unmeasured**, not zero.

A defensible facility or company chemical rank requires same-year EPA CAMD/CAMPD or EIA stack observations, EPA TRI / CCR or similar national PRTR records, regulated-scope coverage, legal-entity mapping with effective dates, distinct release media, fate and exposure modeling and appropriate chemical-specific weights. EPA RSEI supports **screening-level** relative comparisons only for eligible TRI records; it is not a mortality or guilt model. The new tests run with `node --test scripts/chemistry.test.cjs`. The next stage is an authorized, source-matched facility ingestion pipeline—not fabricated metal-tonnage entries for the 50 current Carbon Majors producers.

### EPA TRI pilot · facility identity is not emissions evidence

POISONERS now has a deterministic, dependency-free importer for official EPA TRI Basic CSV. It accepts only reviewed `TRIFID + reporting year + parent alias` links, verifies the source SHA-256, separates fugitive-air/stack-air/water pounds (or dioxin grams), quarantines parent mismatches and refuses duplicate chemical forms. It **excludes Form A** rather than interpreting EPA's zero-filled fields as chemical silence. The 2024 Baytown chemical plant has a time-bound identity link, but **no source-file chemical masses have yet been imported**. Chevron Richmond and Baytown Olefins TRI IDs are research candidates only.

Reproduce the ingest from the primary EPA 2024 downloaded CSV as documented in [the source and governance procedure](data/tri-import-methodology.md). The next scientific gate is to reconcile facility completeness, chemical categories, media and receptor exposure, not to print a prematurely summed corporate toxicity score.

## Historic monetary outcomes and cohort joins
The ledger distinguishes **legally agreed sums**, **confirmed completed cash payments**, **dated partial payments**, and **unverified disbursement totals**. Four historical legal matters are explicitly linked to company names in the 50-record Carbon Majors cohort: ExxonMobil (historic Exxon Corporation / Exxon Valdez), Chevron (Chevron U.S.A.), ConocoPhillips and Occidental Petroleum (former chemical subsidiary). These are historical identity aids, not present-day ownership or company-wide liability findings. OxyChem was divested in January 2026; the Passaic case remains attributed to the legal defendant Occidental Chemical Corporation, not automatically to any current parent.

New historical confirmations include the **1989 Bhopal** $470m combined compensation settlement (with different UCC / UCIL contribution and interim-payment mechanics), **Anadarko / Kerr-McGee's $5.15bn principal paid to a litigation trust on 23 January 2015**, and the NFWF-confirmed paid components of the **2013 Deepwater Horizon criminal pleas** ($2.394bn BP, $150m Transocean), each paid across multiple years. Those NFWF payments are **parts of** the larger criminal settlements, not additional independent damage awards. EPA / DOJ, India's chemicals ministry and the NFWF are cited case by case in [the source ledger](docs/damages-data.json). The Anadarko obligation is 2014 while its actual one-time disbursement was in 2015, so those two purchasing-power calculations intentionally differ. No amount here proves the full cost of harm.\n\nThe 1991 Exxon civil settlement was received in installments through September 2001. Its 2025 USD CPI-U **agreement-year purchasing-power comparator** is not a statement that all those installment payments occurred in 1991. Where cash is paid in multiple or unknown years, no single payment-year inflation adjustment is shown. Missing paid totals remain unknown, not zero. No settlement, fine or cleanup-work estimate is an independent measurement of ecological or human health damage. Never sum overlapping obligations.

Run `node --test scripts/damages.test.cjs` alongside the existing repository verification suite.

## The proposed Poison Index

- **H — Historical:** scientifically attributable past burden by year, pollutant, pathway and endpoint, accounting for persistent and delayed effects.
- **A — Annual:** quantified attributable burden for a specified reporting year with clear exposure and confidence boundaries.
- **F — Future:** conditional modeled burden under transparent counterfactual scenarios, with uncertainty.

Each is also broken down by **air / water / soil / plants / animals / humans** and **climate gases / combustion pollutants / metals / persistent organics / agrochemicals / pharmaceutical residues / biological hazards / plastics and particles**, plus spatial extent, toxicity, persistence, vulnerability, reversibility, evidence quality and jurisdiction.

The site's current H/A/F display is a **climate-throughput proxy only**: Carbon Majors' 2024 emissions, published historical values when available, and an adjustable emissions-only 2027–2036 scenario. No actual multi-hazard scores or corporate death tolls are asserted.


## V2 research infrastructure

**The metric registry is comprehensive; the measured impact dataset is not.** This upgrade adds **142 explicit metric definitions** in **14 independently interpretable domains** with units, receptors, temporal dimensions, potential sources and aggregation guards. The versioned **22-source catalog** is licensing-aware; presence in the catalog does not mean ingestion rights or factual import. The **ten country workstreams** track what is supported and what is missing without treating absent evidence as zero harm.

- [Machine-readable metric taxonomy](data/metric-catalog.json) — proposed measurements, units, hazard domains and candidate data providers.
- [Source and licensing registry](data/source-catalog.json) — provenance entries, availability caveats and permission checks before automated collection.
- [Country workstreams](data/country-workstreams.json) — research leads and major gaps for each of the ten countries.
- [Public 2024 evidence records](data/evidence/carbon-majors-2024.jsonl) — 50 structured emissions observations, with source, vintage, boundary, method classification and explicit uncertainty limitations.
- [Research kernel](src/index-kernel.cjs) — strict record checking, modeled climate scenarios, source-to-exposure readiness, privacy-key checks and unit/boundary-safe aggregation that requires independent non-overlap attestation.
- [Ownership graph](src/entity-graph.cjs) — effective-date legal-entity parent relationships, conflicts and cycle checks without name-based liability inference.
- [Offline facility CSV converter](scripts/normalize-facility-csv.cjs) — explicit header mapping and pound/gram/kg conversions for authorized EPA TRI, Canada NPRI or PRTR exports, restricted to review-stage output. See [mapping guide](data/mappings/README.md).
- [Source-link audit](scripts/audit-sources.cjs) — rate-limited metadata-only link monitoring; a [weekly GitHub Action](.github/workflows/source-monitor.yml) reports availability but never scrapes, modifies company figures or files claims.
- [Generated public foundation dataset](docs/foundation.json) — a deterministic GitHub Pages snapshot. The browser reads the matching foundation-data.js file.
- [Case schema](schema/case-dossier.schema.json) and [evidence schema](schema/evidence-record.schema.json) — formal envelopes for different research objects.

### Reproducible build, tests and local review

No external package manager or network access is needed for the checks. Requires Node.js 22+.

1. Run 'node scripts/build-foundation.cjs' to regenerate the site JSON and JS from the source registry.
2. Run 'node scripts/build-foundation.cjs --check' to confirm those generated files are up to date.
3. Run 'node scripts/verify.cjs' and 'node --test scripts/foundation.test.cjs' before contributing.
4. To evaluate a public evidence batch (JSON array or JSONL), run 'node scripts/ingest-evidence.cjs --input /path/to/public-records.jsonl'. This defaults to dry-run validation.
5. To place validated public records in a **non-published review queue**, run 'node scripts/ingest-evidence.cjs --input /path/to/public-records.jsonl --write --batch public-2026-11'. The file is staged under data/evidence/staging/, never automatically published and never sent to a court.

**Do not put private claimant or patient information in any repository file, even under staging.** The staging mechanism only accepts public documentary evidence. Never blindly scrape a provider, import an entire dataset, or reproduce restricted material without satisfying its license, privacy and provenance conditions.

### Non-negotiable release gates

- The public ledger may display accurately dated, source-linked emissions with conspicuous model/boundary labels.
- Facility-level claims need verified facility identity, time-valid ownership, measured medium and contaminant, an exact source and an uncertainty statement.
- Health and ecosystem harm estimates require a defined outcome, credible counterfactual, transparent method and independent scientific review.
- Legal accusation, claimant outreach, filings and settlements require qualified local counsel and separate explicit authorization. The software provides **no automatic lawsuit generation or filing**.
- No research metric is a valid unit-free company guilt or harm score. A composite score requires a scientifically reviewed and published methodology, with reproducible inputs, weights, sensitivity and ethical limitations.

## Build the evidence — then let lawyers evaluate the case

1. Preserve versioned, cited official data with licenses, snapshot hashes, raw units and reporting dates.
2. Build corporate ownership and facility-identity graphs with effective dates.
3. Connect pollutant-specific releases to fate/transport, actual receptors, outcomes, controls and uncertainty.
4. Produce scientific impact estimates with explicit counterfactuals, sensitivity analysis and independent review.
5. Screen jurisdiction, standing, remedy, limitations, group commonality and other legal issues; route to **qualified local counsel**.
6. Publish defensible findings with a documented corrections process and right to respond.

A large emissions metric **does not itself establish wrongdoing, causation, recoverable injury, class certification or legal liability**. Different countries have different collective/public-interest procedures.

## Contribute sources safely

Use the [public evidence issue template](https://github.com/Svyable/poisoners/issues/new/choose) for URLs, dated tables and precise documentary leads. Never share claimant identities, medical records, residential addresses, private whistleblower details or attorney communications publicly. This static site does not collect private claimant information.

## Roadmap

- [x] Sourced emissions seed; EDGAR 2025 ten-country coverage; **50 climate-only records**, **49 of 100 source-coverage slots** (China has 11 records, capped at 10 for target coverage)
- [x] Interactive site, three temporal lenses, 6 × 8 research matrix, dossier drawers
- [x] Research methods, country-by-country preliminary legal framework, schema and CI checks
- [ ] Import and verify the complete **authorized** Carbon Majors and PRTR datasets
- [ ] Fill ten **verified** company dossiers in each cohort country; record why each qualifies
- [ ] Establish pollutant/facility/receptor/outcome attribution and epistemic uncertainty
- [ ] Build a private, access-controlled evidence room and counsel-managed intake only after review
- [ ] Develop expert-reviewed human-health and ecological subindices, never arbitrary numerical accusations
- [ ] Independent corrections, rebuttal and audit log; expert and legal gates before any public adverse claims
- [ ] Verify patent application filing details before stating 'patent pending' publicly

**Standard:** No invented numbers. No hidden weights. No conflated boundaries. No automated accusations or legal filings. Do not use the global Lancet mortality estimate to attribute deaths to listed companies.

See the original [LICENSE](LICENSE) for the repository's terms.
## Website editorial system

The public Pages site uses a consistent accessible header and mobile navigation, source-boundary disclosure, unified footer and three editorial reference pages. Shared styles and behavior are in `docs/site.css` and `docs/site.js` with no framework or runtime dependencies. The research tools (`app.js`, `dossier-lab.js`, source datasets) remain independent.

When changing the site, run `node scripts/check-site-links.cjs` and `node scripts/verify.cjs`. Keep navigation, disclosure text and source vintages consistent across all pages. New claims about health, ecological effects or legal liability require the project's evidence gates rather than copy changes alone.

## People Atlas public-source release

The latest data contains **34 named people from publicly filed FY2025 executive-compensation records at seven U.S. issuers**, not 500 named or ranked alleged wrongdoers. The **500 slots** identify ten distinct *research functions* in each of the 50 company workstreams. **466 are not yet source-verified.** These slots are not people, defendants, unlawful actors or evidence of personal benefit from damage. Every disclosed compensation figure uses the U.S. SEC Summary Compensation Table convention for FY2025 in USD: this does not establish realized cash, wealth, gain from environmental injury, or legal liability. The underlying documents, filing dates and uncertainties are preserved in [public officer data](data/people/verified-officers.json).

The public [People Atlas](docs/people.html) supports sortable and searchable disclosures, ten-function company matrices, shareable person links, device-local saved public records, source hyperlinks, filtered CSV export, and JSON public-source fact packets for independent review. The [People methodology](docs/people-methodology.html) explains why named officers cannot be equated with harmful actions and why a viable individual claim requires event-specific legal and factual proof.

The publication pipeline is **strictly no-fault by default**: it blocks private contact or medical data, unknown salary amounts mislabeled as SEC totals, unverified dates, duplicate officers, and populated fields for unsupported personal environmental harm, purported illicit profits or liability. No website action contacts a person, builds a personal defendant list, solicits claimants or files a case. The original emissions data is producer-linked GHG, not proof of a named executive's toxic release or illness.

Add a primary filing via the [public officer source template](.github/ISSUE_TEMPLATE/person-source.yml) following the [research verification guide](data/people/README.md). Run `node scripts/build-foundation.cjs`, `node scripts/build-foundation.cjs --check`, `node --test scripts/people.test.cjs`, and `node scripts/check-site-links.cjs` before reviewing changes. **No automatic publication of unverified claims.**

## Website research search and glossary

The header search scans a static, privacy-preserving index of public site sections, 50 company climate records and the separately caveated People Atlas. Searches are processed in the browser and are not submitted to an external service. The [research glossary](docs/glossary.html) explains climate accounting, exposure science, uncertainty and legal terminology. Search references are navigation, not evidence of harm or wrongdoing.

Site-wide search assets live at `docs/site-search.js` and `docs/search-index.json`. Validate navigation with `node scripts/check-site-links.cjs`; keep named-person searches distinct from the research-only compensation and legal methodology.

## Maintaining the public research search

Search is a static, browser-local navigation aid. The reviewed route entries live in `data/site-search-pages.json`; the 50 climate-only company labels are built from the public dossier register. Run `node scripts/build-search-index.cjs` after changing either source, then verify with `node scripts/build-search-index.cjs --check`. Do not edit `docs/search-index.json` manually, and do not use search placement as a harm or liability ranking.

## Site accessibility and public discovery

GitHub Pages includes a source-aware custom `docs/404.html` page and a `docs/sitemap.xml` of 12 research pages. `node scripts/check-public-site.cjs` verifies page landmarks, skip links, metadata, search dialog integration, route anchors and a one-to-one match between public climate company profiles and search entries. CI runs this check alongside the deterministic index audit. All checks are offline.

## Consistent research page shell

The People Atlas and its evidence-methodology page now use the same site header, mobile navigation, breadcrumb trail, research-limit disclosure and multi-column footer as the rest of the website. Existing People Atlas DOM IDs and browser research functions are preserved. Header menu behaviors continue to work in their original applications, with shared Escape and outside-click dismissal. The offline site check enforces consistent landmarks across all public pages.

## Public environmental-health awareness

The [public awareness desk](docs/awareness.html) presents ten carefully scoped, independently linked WHO, EPA, CDC, NIH and FDA briefings on fine-particle air pollution, polluting cooking fuels, lead, PFAS, arsenic, mercury in fish, e-waste, radon, heat and occupational silica. The [source registry](docs/awareness-briefs.json) holds publication labels, primary references, context, non-inference boundaries and actionable official resources. These are educational briefs, not outputs of the corporate emissions index or any personal diagnosis, and no global burden estimate is assigned to an individual company.

To revise these materials, review original sources, update `docs/awareness-briefs.json`, then run `node scripts/build-awareness.cjs`. Before merging, run `node scripts/build-awareness.cjs --check`, `node scripts/build-search-index.cjs --check` and `node scripts/check-site-links.cjs`. Website CI verifies the source-linked generated HTML, and a contribution must never publish private health records or unverified blame.

## Finding local records from official sources

The [official environmental records directory](docs/public-records.html) links to twelve publicly accessible services in six geographic groups. These include monitoring, supplier disclosures, facility-release reports, and compliance systems. The [machine-readable portal catalog](docs/public-record-portals.json) preserves the source owner, area and time coverage, official link, and limitation of every tool. The site does not fetch, mirror, or store queries submitted to those external services.

Run `node scripts/check-public-records.cjs` to check source hostnames and portal metadata; CI includes this offline check. A missing or reported pollution record alone does not establish personal exposure, environmental injury, individual misconduct or legal responsibility.

## Historical monetary outcomes and 2025 inflation comparisons

The [Payments Ledger](docs/damages.html) publishes seven event-specific records with [machine-readable evidence](docs/damages-data.json). The historical examples include Minnesota PFAS, the DuPont/Chemours C8 MDL resolution, Volkswagen civil and criminal agreements, Brumadinho collective reparation, Deepwater Horizon and 3M's national public-water-supplier PFAS settlement. **These records are not a complete company payment database or quantified environmental-harm dataset.**

Every observation distinguishes a legally ordered or contracted nominal amount, whether actual cash was independently confirmed paid, the **date of the supporting source** and the difference between a fixed award, a ceiling and installments. A cash-paid amount with an unknown payment year does **not** get an invented inflation-adjusted cash value. Up-to ceilings are **not** payments. An historical 2022 Brazil payment figure is **not** presented as a 2026 settlement total. Multi-party and overlapping matters cannot be added as one company's total.

Dollar purchasing-power comparisons use BLS 2025 annual-average CPI-U to the **obligation year**; Brazil uses sequential 2022–25 IPCA Dec/Dec rates against a 2021 notional base. No FX translation, actuarial discounting, legal interest or court-defined indexation is asserted. See the original government and SEC links within each record. Run `node --test scripts/damages.test.cjs`, the deterministic site-search build and the full CI pipeline to validate publication.

### Research Workbench (GitHub Pages)

The [Research Workbench](https://svyable.github.io/poisoners/workbench.html) guides visitors from a question about air, drinking water, industrial releases or facility compliance to curated official records by broad coverage region. It never invents a jurisdictional source when the directory has a gap. Each source retains vintage, scope and inference limitations. A six-gate worksheet supports local Markdown export, a shareable **selection-only** URL, printing and clearing working notes; notes are not transmitted, logged or put into URLs by the workbench. No records are interpreted as personal risk, company fault or proven harm.

`docs/workbench-model.js` is pure browser/Node logic, exercised in `scripts/workbench.test.cjs`; `docs/workbench-app.js` owns the browser-only controls, and `docs/public-record-portals.json` remains the reviewed source of truth. Run `node --test scripts/workbench.test.cjs` and `node scripts/build-search-index.cjs --check` before publishing.

### Knowledge Atlas (source-backed field notes)

The [Knowledge Atlas](https://svyable.github.io/poisoners/knowledge.html) connects the research instruments through 24 static, indexable educational field notes covering data boundaries, exposure pathways, risk methods and official record interpretation. Every entry identifies original sources, what the evidence establishes, its limits, the next research question and a related research destination. It **does not** rank entities, infer individual illness or convert a facility report into wrongdoing. The canonical structured source is `docs/knowledge-register.json` (24 notes, 22 source references as of 2026-11-07). `node scripts/build-knowledge.cjs` updates the static HTML, while `--check` validates its reproducibility in CI. The searchable site index includes every field note; see `scripts/knowledge.test.cjs` for the coverage, provenance and navigation contract.

### Chemical Exposure Pathways (public evidence crosswalk)

The [Exposure Pathways](https://svyable.github.io/poisoners/pathways.html) section turns 14 existing chemical hazard profiles into individually linkable, static, searchable research routes. The reviewed `docs/pathway-routes.json` connects each compound to existing evidence-method field notes and broad U.S. official record leads, without claiming that the linked agencies cover every chemical, facility, year or location. Original chemical source citations and their speciation limitations remain visible. The 42 method-note links and 29 public-record search leads are navigation links, **not** 71 new observations or evidence of exposure. No new numerical harm, company-blame, or personal-risk score is inferred. Run `node scripts/build-pathways.cjs --check` and `node --test scripts/pathways.test.cjs` before publishing. The route descriptions are included in the local site search index.

## Universal Rank & Filter Lab — source-comparable metrics

The [Rank & Filter Lab](docs/rankings.html) ranks and filters public-source data in **eight separate evidence cohorts**, not an invented general company harm score: 50 production-attributed company climate records, 10 2025 territorial country inventories, 34 FY2025 SEC-reported officer-compensation records, 500 officer-role research positions (466 identities unknown), 11 legal monetary outcomes, 142 unmeasured metric definitions, 14 chemical identity/hazard profiles, and five national power-sector chemical emissions figures. Each numeric metric is separately defined with method, year, unit and source. **There are currently no regulator-imported company-specific TRI Form R toxic release masses:** the official TRI file has not been imported and missing observations cannot be ranked as zero.

Controls support any listed primary metric, a secondary sort, ascending/descending order, full-text search, all relevant categorical facets (country, sector, role, compensation filing, reporting status, domain, media, receptors, hazards, legal type and jurisdiction, chemical/source cohort), numerical min/max, include/exclude unknown, visible columns, Top 10/25/50/100/all, record audit trail, two-record comparison, source-linked CSV/JSON export, URL sharing and optional device-local saved views. These controls never submit identifying information to a server.

**Numeric rank badges appear only for known values in a compatible source-defined cohort.** Unknown quantities remain unranked at the bottom; tie handling and deterministic secondary ordering are test-covered. Sorting text categories produces an alphabetical order, not a measure of harms. A 2024 company's global producer-attributed GHG cannot be compared against 2025 territorial country emissions or used to estimate personal injury.

Financial sorts require a *single currency* (USD or BRL); fixed paid amounts, obligations, caps and purchasing-power comparisons remain different fields. Cash paid over unknown/multiple years is not assigned an invented 2025 value. Chemical masses require selecting a *single agency / vintage / unit / reported population* cohort; 2025 EIA metric tonnes cannot be combined with 2024 EPA short tons. The chemical identities and 142 metric *definitions* are educational descriptors, not quantified disease severity or site-specific exposure. Source candidates and the number of named officers indicate research coverage, not fault or environmental innocence.

The Rank Lab uses deterministic client-side scripts with no third-party analytics or backend. Run `node --test scripts/rank.test.cjs`, `node scripts/build-search-index.cjs --check`, `node scripts/check-public-site.cjs`, and `node scripts/check-site-links.cjs` to audit all views and release gates.
