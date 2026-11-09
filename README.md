# POISONERS — The Global Poison Index

**Make the damage visible.** An open environmental evidence observatory and a proposed multidimensional framework for building defensible scientific and legal dossiers.

> **Research platform v5 chemical-first addition, November 7, 2026.** The site contains 50 source-linked corporate records from one published 2024 greenhouse-gas attribution dataset, plus the ten highest-emitting sovereign countries in EDGAR's 2025 GHG inventory. It does **not** contain 100 fully researched company dossiers, toxicity rankings, proven deaths attributable to those companies, or findings of unlawful conduct.

## State machine contracts · UX, DX and AX

The [state-machine audit](STATE_MACHINES.md) and [machine-readable catalog](data/state-machines.json) document **56 existing UI, evidence, import and scheduled workflow state machines**. Four high-risk flows now have explicit production transition contracts: global search index loading, Rank Lab snapshot loading, Workbench official-source catalog loading, and Workbench concern/region URL history; all other machines are explicitly marked observed, not falsely migrated. Developers and agents can inspect/replay allowed events using the read-only [state-machine explorer](scripts/state-machine.cjs) and follow [AGENTS.md](AGENTS.md). Global search retains its own thoroughly tested native-dialog loader. Other source loads use the pure, dependency-free shared transitions in `docs/site.js`. New improvements include direct Retry for failed Rank/Workbench snapshots, source lifecycle visibility without user data, reliable Workbench Back/Forward without sharing notes, correctly restored Rank share-link row limits, a single owner for `/` search shortcut focus, and consistent People page script order. [Contract tests](scripts/state-machines.test.cjs), [cross-app transition tests](scripts/interaction-states.test.cjs) and [browser search tests](scripts/site-search.test.cjs) all run in CI. No backend or new dependencies were added.

## The website

- [Universal Rank & Filter Lab](docs/rankings.html): eight source-bounded research cohorts with metric switching, three-key lexicographic ranking (no synthetic composite score), up to four AND-linked field filters, unknown-only or known-only views, full-cohort min/percentile/median/max summaries, country/sector/status/chemical facets, numeric ranges, source details, pinned two-record comparisons, device-local saved views, shareable links and CSV/JSON export. Unknown remains unranked; different currencies or chemical reporting groups cannot share a leaderboard.
- [Interactive observatory](docs/index.html): searchable company ledger, temporal views, ten-country atlas, 6 × 8 exposure-research matrix, company source drawers, supporting sources.
- [Chemical hazards and stank matrix](docs/chemistry.html): 14 compound or pollutant-class profiles (SO₂, NOₓ, Hg, arsenic, lead, cadmium, chromium(VI), selenium, sulfuric acid mist, PM₂.₅, HCl, HF, H₂S and formaldehyde). Shows **2025 EIA U.S. power/CHP SO₂ (902,000 metric tonnes) and NOₓ (1,144,000 metric tonnes)** and **EPA 2024 regulated-power Hg (2.2 US short tons)** with visibly different boundaries. [Source-bound JSON](docs/chemical-hazards.json). Odor sorting is never toxicity scoring.
- [Source-verified 2024 EPA TRI facility Form R pilot](docs/chemistry.html#facility-records): **41 chemical-specific Form R records** from the official [2024 Texas Basic CSV](https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv) for the time-bound reviewed ExxonMobil Baytown Chemical Plant (Part) ID `77522XXNCH5000B`. The source is pinned by SHA-256 `8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d` and official download origin; 41 candidate-site rows were excluded and no source-parent/location mismatch admitted. Air/water quantities are separated by chemical and original unit. [Live source-backed JSON](docs/tri-facility-releases.json), [facility/ownership manifest](data/tri-facility-links.json), [strict importer](scripts/import-tri-basic.cjs), and [methods](data/tri-import-methodology.md) record provenance and limits. This is one facility, **not a complete company toxic-release profile or a measured exposure/health-harm score**.
- [Real 2024 coal-system chemical disclosure](docs/chemistry.html#operator-disclosure): American Electric Power's [2024 company-published TRI summary](https://docs.aep.com/docs/requiredpostings/tri/docs/TRI2024.pdf) discloses 779,900 lb airborne sulfuric acid aerosol, 274,760 lb airborne hydrogen fluoride, 193 lb airborne mercury, 333 lb airborne arsenic and separately 1,048,235 lb arsenic transferred off-site for disposal. [Machine-readable source transcription](docs/coal-operator-2024.json) preserves all 27 source-table chemical and non-reporting-notation rows, air/water/land/off-site fields, dioxins in grams, reporting thresholds and the operator's June 2025 **pending** caveat. AEP is not one of the 50 Carbon Majors producer records.
- [EPA chemical-specific exposure references](docs/chemistry.html#exposure-benchmarks): 11 authoritative EPA limits in separately labeled air NAAQS and public drinking-water MCL tables, including SO₂ 75 ppb at the 1-hour design value, NO₂ 100 ppb at the 1-hour design value, annual PM₂.₅ 9 µg/m³, arsenic 10 µg/L, inorganic Hg 2 µg/L and cadmium 5 µg/L. [Source-bound JSON](docs/exposure-benchmarks.json). **None of these values is a facility observation, an emissions quantity or a universal relative-toxicity scale.**
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
- [Damages & Payments Ledger](docs/damages.html): fifty-five publicly sourced monetary outcomes, status of cash paid versus settlements or caps, exact document links, and same-currency 2025 purchasing-power comparisons; not an additive environmental injury score.
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

### Exposure standards are not emission masses

The [EPA NAAQS table](https://www.epa.gov/criteria-air-pollutants/naaqs-table) and [EPA drinking-water regulations](https://www.epa.gov/ground-water-and-drinking-water/national-primary-drinking-water-regulations) are now available as 11 documented chemical concentration benchmarks in the [chemical explorer](docs/chemistry.html#exposure-benchmarks). Air NAAQS have pollutant-specific statistical averaging periods; public-water MCLs are legally distinct from a CCR facility's site-specific groundwater protection standard. The chemically decisive distinctions are **NO₂ ≠ NOₓ**, **inorganic Hg in water ≠ methylmercury in fish**, and **total Cr MCL ≠ Cr(VI)-specific limit**. A facility's annual emitted pounds cannot be converted to any of these concentrations without location, dispersion, medium and exposure data. EPA's RSEI is useful as a chronic-human-health screening method, not an acute poison or ecological ranking.

### First direct coal-operator disclosure (AEP, 2024)

The [AEP System 2024 report](https://docs.aep.com/docs/requiredpostings/tri/docs/TRI2024.pdf) is a **company-submitted TRI disclosure**, not a verified EPA Basic Form R import. It supplies a real source-specific chemical and medium breakdown independent of the 50-company climate attribution dataset. Use the [live operator table](docs/chemistry.html#operator-disclosure) to sort **reported mass within a single release medium**; it is not a toxicity, exposure, lawbreaking or health-impact ranking.

Preserve AEP's exact reporting boundaries: 2024 coal burn 35,059,234,000 lb, mixed generating ownership, the exclusion of Cardinal operated by Buckeye Power, operator footnotes (a) below EPA reporting levels and (b) only airborne HCl/sulfuric acid reportable, dioxins in **grams not TEQ**, and individual off-site disposal transfers that are not local emissions. Some published component sums differ by 1 lb from rounded reported totals; retain the source instead of silently recomputing. The report says submissions to EPA in June 2025 were **pending**. This is an example chemical dataset, not a company-to-facility attribution for the existing cohort.

### EPA TRI pilot · facility identity is not emissions evidence

POISONERS now has a deterministic, dependency-free importer for official EPA TRI Basic CSV. It accepts only reviewed `TRIFID + reporting year + parent alias` links, verifies the source SHA-256, separates fugitive-air/stack-air/water pounds (or dioxin grams), quarantines parent mismatches and refuses duplicate chemical forms. It **excludes Form A** rather than interpreting EPA's zero-filled fields as chemical silence. The 2024 Baytown chemical plant has a time-bound identity link, but **no source-file chemical masses have yet been imported**. Chevron Richmond and Baytown Olefins TRI IDs are research candidates only.

Reproduce the ingest from the primary EPA 2024 downloaded CSV as documented in [the source and governance procedure](data/tri-import-methodology.md). The next scientific gate is to reconcile facility completeness, chemical categories, media and receptor exposure, not to print a prematurely summed corporate toxicity score.

## Historic monetary outcomes and cohort joins
The ledger distinguishes **legally agreed sums**, **confirmed completed cash payments**, **dated partial payments**, and **unverified disbursement totals**. Thirty-three source-linked historical matters now match fourteen names in the 50-company research cohort: ExxonMobil, Chevron (Chevron U.S.A.), ConocoPhillips, Occidental Petroleum (historic chemical subsidiary), Suncor Energy, ONGC, Canadian Natural Resources, Cenovus Energy (Husky historical subsidiary context only), Coal India (Central Coalfields Limited), EOG Resources, Petrobras, EQT Corporation, Expand Energy (historical Chesapeake Appalachia) and Core Natural Resources (historical Arch Coal). These are historical identity aids, not present-day ownership or company-wide liability findings. OxyChem was divested in January 2026; the Passaic case remains attributed to the legal defendant Occidental Chemical Corporation, not automatically to any current parent.

New historical confirmations include the **1989 Bhopal** $470m combined compensation settlement (with different UCC / UCIL contribution and interim-payment mechanics), **Anadarko / Kerr-McGee's $5.15bn principal paid to a litigation trust on 23 January 2015**, and the NFWF-confirmed paid components of the **2013 Deepwater Horizon criminal pleas** ($2.394bn BP, $150m Transocean), each paid across multiple years. Those NFWF payments are **parts of** the larger criminal settlements, not additional independent damage awards. EPA / DOJ, India's chemicals ministry and the NFWF are cited case by case in [the source ledger](docs/damages-data.json). The Anadarko obligation is 2014 while its actual one-time disbursement was in 2015, so those two purchasing-power calculations intentionally differ. No amount here proves the full cost of harm.

The next source-audited batch adds **AVX's New Bedford Harbor PCB cleanup** ($366.25m principal in verified 2013, 2014 and 2015 installments), **Delaware's $50m PFAS and other chemical natural-resource settlement** (Chemours $25m, DuPont $12.5m and Corteva $12.5m, paid January 2022), the **$58.5m later Ohio C8/PFOA personal-injury settlement** (payments spanning 2024–2025, deliberately *not* double-counted against 2017), and the **Duke Energy subsidiary coal-ash/river crime resolution** ($102m agreement, with a DOJ district-level receipt of $58.7m verified on May 14, 2015). For Duke, the unconfirmed remainder is **unknown**, not unpaid. The AVX installments are now adjusted individually using the correct cash-year U.S. CPI-U, then summed: about **$500.82m in 2025 dollars**, versus about **$506.15m** when merely repricing the legal 2013 amount. These figures answer distinct questions and are not additional monetary liabilities. See each source in [the ledger](docs/damages-data.json).

Further source-confirmed, non-overlapping records cover the paid **$125m Exxon Valdez criminal fine and restitution**, the **$4.47m Mayflower pipeline government penalty and costs**, and **two Suncor cases**: $1.887m actually paid under the 2014 Sand Creek natural-resource damages decree and approximately $1.4m paid in Commerce City air penalties announced in 2020. They are distinct remedies; Suncor's separate project commitments are not added to its fines. A 2024 Ohio DOJ release confirms **$7,282,518.92 paid by five companies together** at Duck and Otter Creeks, while a USFWS plan allocates only **$6,322,670 in restoration obligations** (including Chevron's $2,056,250). The total is **not attributed as paid by Chevron** and the restoration allocations are not additional to the group total.

Further global research confirms ONGC's **₹22.76625 crore environmental compensation paid in 2022–2023**, ExxonMobil's **$8.7m paid** 2005 refinery penalty, and ConocoPhillips' **$198k paid** Southern Ute and **$45k paid** Kuparuk penalties. Five further court-ordered or agreed amounts remain **cash-paid UNVERIFIED**: ExxonMobil's 2008 stipulated refinery penalties, Canadian Natural Resources' 2015 sentence, and three Husky Oil Operations court orders. The historical Husky–Cenovus relationship is not proof that Cenovus paid. The [historical payments deep-research audit](data/historical-payments-research.md) includes primary links, CPI methods and research gaps for the 36 companies without an indexed case.

Another source-audited tranche links three previously uncovered companies: **Coal India** (Central Coalfields: ₹1.35 crore paid at Amarpali against a ₹32.45 crore disputed regulator assessment; no unknown cash year invented), **EOG Resources** (a $353,419 paid 2010 Pennsylvania well-control penalty and response costs, $90,375 paid in 2017 North Dakota air penalty, and $412,500 confirmed paid in a separate EPA 2025 Texas/New Mexico air case), and **Petrobras** (distinct early-payment-discounted **R$35.7m Guanabara Bay federal** and **R$40m Paraná state** oil-spill fines, both paid in 2000). The 2000 Petrobras cash is worth approximately R$157.00m and R$175.91m in 2025 BRL purchasing-power comparators respectively, never aggregated across currencies or with disputed federal assessments. See the [source audit](data/historical-payments-research.md) for contemporary reports, government and SEC citations and full exclusions.

The latest source-led investigation adds **nine verified or partly paid historical legal matters** and links **EQT Corporation, Expand Energy and Core Natural Resources** for the first time. EQT's SEC reports document a **$30k paid** 2015 Pennsylvania Fish and Boat penalty, **$351k paid May 2023** for revised gas-production unit containment, **$4.7m paid May 2023** for a Washington County produced-water release, and **only $1.5m paid** toward a distinct $4m well-plugging reporting settlement, whose remaining $2.5m was designated to future environmental projects (not presumed paid). Trans Energy paid part of a **$3m federal civil** Clean Water Act fine before its **December 2016 EQT acquisition**, and EQT paid the remainder in **April 2017**; a separate **$600k criminal** fine was paid by Trans Energy for the same water violations. The historical Chesapeake Appalachia entity paid distinct **$600k criminal** (DOJ FY2013 collection) and **$1.6m civil** (DOJ FY2014 collection) water penalties; Chesapeake became **Expand in 2024**. **Arch Coal paid $4m** on a 2011 Clean Water Act consent decree (DOJ FY2012); Arch renamed in 2020 and became part of **Core in 2025**. 2023 EQT actual payments use BLS **2023 CPI-U 304.702** to create 2025 cash comparators; FY receipts and multi-year payments with missing calendar years remain uncomputed. See the full [primary-document payment audit](data/historical-payments-research.md). The four independently added PFAS/East Palestine fund cases are preserved as separate nonoverlapping legal outcomes.\n\nThe 1991 Exxon civil settlement was received in installments through September 2001. Its 2025 USD CPI-U **agreement-year purchasing-power comparator** is not a statement that all those installment payments occurred in 1991. Where cash is paid in multiple or unknown years, no single payment-year inflation adjustment is shown. Missing paid totals remain unknown, not zero. No settlement, fine or cleanup-work estimate is an independent measurement of ecological or human health damage. Never sum overlapping obligations.

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

## November 2026: verified cash versus future commitments

The expanded payment ledger also separately identifies **Volkswagen's $1.45bn paid Clean Air Act civil fine** (EPA confirms it was paid, but does not give the disbursement year); **Bosch's more than $300m paid to consumers** under its distinct $327.5m clean-diesel fund (the recorded $300m is a conservative historical lower bound); and the **FTC's more than $9.5bn paid VW/Audi/Porsche consumer-redress cross-program observation**. That FTC sum spans the 2016 2.0-liter and 2017 3.0-liter consumer programs and must **not** be assigned as paid under the narrower 2016 $14.7bn 2.0-liter package. The same Volkswagen vehicle remedy is not an additional award when seen in both government reports.

**BP's 2016 Deepwater Horizon civil agreement** now has SEC-confirmed, separate $1.129bn pre-tax disbursements in **Q2 2025 and Q2 2026**, or $2.258bn across *those two quarters only*. Other years are still unverified; this amount is neither lifetime cumulative paid cash nor a reason to assume the full $20.8bn was paid. **Vale's 2025 Form 20-F** reports R$21.3bn against its collective settlement payment obligations, including relevant pre-2021 expenditures. The older R$18.2bn 2022 Minas Gerais observation is preserved with a distinct accounting-scope note; those are not amounts to add or assume perfectly comparable.

**3M's November 3, 2026 AFFF personal-injury resolution** is a new $7.35bn *nominal future commitment* through 2034 ($5.8bn accounting present value). An announced $50m installment expected in 2026 is **not evidence it has been paid**. This agreement is separate from its earlier public-water-supplier PFAS and Minnesota settlements. Because the common inflation reference is 2025, a commitment first arising in 2026 has **no computed 2025 purchasing-power comparator**, not a manufactured value.

Every case retains its original-source references in [the payment ledger](docs/damages-data.json). Multiple companies, legal proceedings, jurisdictions, remedy types and accounting bases remain distinct. A settlement or fine is not a scientific estimate of total injury.

## Fully funded PFAS water-system funds and East Palestine class cash

The 46-case evidence ledger now contains four additional **company-confirmed funded settlements**. Johnson Controls' SEC filings state Tyco Fire Products paid the entire **$750m** U.S. PFAS drinking-water class settlement in **calendar 2024**, with the final $415m installment in December; insurance reimbursements are not extra payments. BASF's official 2025 annual report confirms **$4m paid in July 2024 and $312.5m in March 2025**, for **$316.5m**; each source-supported cash month is individually converted into 2025-dollar purchasing power (annual CPI). DuPont's SEC filings show **Chemours, DuPont and Corteva together funded a separate $1.185bn PFAS public-water-systems settlement in Q3 2023**, with disclosed approximately $592m / $400m / $193m contributions and court finality in April 2024. This is a single deposited fund; restricted-cash release and eventual utility distributions are not second payments.

Norfolk Southern's SEC-filed Q3 2026 report confirms the **entire $600m East Palestine class settlement was paid by the company**: $315m during calendar 2024 and the final $285m in March 2026. That is cash paid to the class settlement, **not proof every claimant was already paid**. It is separate from federal and village settlements, and no all-cash CPI figure is assigned: a complete 2026 CPI annual mean is not available against the ledger's 2025 reference year.

The **3M public-water-supplier** record has a narrower, verified historical lower bound rather than a fictitious nationwide payment figure. California Water Service Group's audited/SEC 2025 report confirms it **received $34.8m NET of legal fees from 3M in 2025**, the first two of ten unequal installments to that *one recipient*. Its remaining 3M payments and all other PWS recipients are *not* included in that observed amount. A recipient's net receipt, a defendant's gross settlement-fund deposit, a legal damages promise and a discounted accounting charge are different financial measures. Never add a recipient downstream receipt to a settlement fund's parent contribution.

The ledger's U.S. CPI-U index now includes the official **2023 annual-average 304.702** for accurate 2025-dollar comparisons of 2023 payments. The underlying raw source and allocation dates are in [the machine-readable damages ledger](docs/damages-data.json); [the public view](docs/damages.html) distinguishes original commitments, confirmed paid, named recipient net receipts and cash payment tranches.

## Historical monetary outcomes and 2025 inflation comparisons

The [Payments Ledger](docs/damages.html) publishes fifty-five event-specific records with [machine-readable evidence](docs/damages-data.json). The historical examples include Minnesota PFAS, DuPont/Chemours C8, Volkswagen, Brumadinho, Deepwater Horizon, 3M public-water-supplier PFAS, the 1989 Bhopal payout, Anadarko/Tronox, Exxon Valdez, Mayflower, Duck and Otter Creeks, Suncor, and separate BP/Transocean criminal-disbursement components. **These records are not a complete company payment database or quantified environmental-harm dataset.**

Every observation distinguishes a legally ordered or contracted nominal amount, whether actual cash was independently confirmed paid, the **date of the supporting source** and the difference between a fixed award, a ceiling and installments. A cash-paid amount with an unknown payment year does **not** get an invented inflation-adjusted cash value. Up-to ceilings are **not** payments. An historical 2022 Brazil payment figure is **not** presented as a 2026 settlement total. Multi-party and overlapping matters cannot be added as one company's total.

Original-currency 2025 purchasing-power comparators use BLS U.S. CPI-U, Canada national CPI, Indian CPI Combined annual average and Brazil IPCA calendar-year December/December rates (extended through 2001 to reprice paid 2000 Petrobras fines; the Vale 2021 convention remains a calendar-year comparator). The separate paid-cash metric uses only verified cash years or fully reconciled dated installments, including AVX's three payments and ONGC's 2022/2023 tranches. ONGC's nominal ₹22.76625 crore paid is approximately ₹24.875 crore in 2025 rupees. No FX translation, actuarial discounting, legal interest or court-defined indexation is asserted. See the original government and SEC links within each record. Run `node --test scripts/damages.test.cjs`, the deterministic site-search build and the full CI pipeline to validate publication.

### Research Workbench (GitHub Pages)

The [Research Workbench](https://svyable.github.io/poisoners/workbench.html) guides visitors from a question about air, drinking water, industrial releases or facility compliance to curated official records by broad coverage region. It never invents a jurisdictional source when the directory has a gap. Each source retains vintage, scope and inference limitations. A six-gate worksheet supports local Markdown export, a shareable **selection-only** URL, printing and clearing working notes; notes are not transmitted, logged or put into URLs by the workbench. No records are interpreted as personal risk, company fault or proven harm.

`docs/workbench-model.js` is pure browser/Node logic, exercised in `scripts/workbench.test.cjs`; `docs/workbench-app.js` owns the browser-only controls, and `docs/public-record-portals.json` remains the reviewed source of truth. Run `node --test scripts/workbench.test.cjs` and `node scripts/build-search-index.cjs --check` before publishing.

### Knowledge Atlas (source-backed field notes)

The [Knowledge Atlas](https://svyable.github.io/poisoners/knowledge.html) connects the research instruments through 24 static, indexable educational field notes covering data boundaries, exposure pathways, risk methods and official record interpretation. Every entry identifies original sources, what the evidence establishes, its limits, the next research question and a related research destination. It **does not** rank entities, infer individual illness or convert a facility report into wrongdoing. The canonical structured source is `docs/knowledge-register.json` (24 notes, 22 source references as of 2026-11-07). `node scripts/build-knowledge.cjs` updates the static HTML, while `--check` validates its reproducibility in CI. The searchable site index includes every field note; see `scripts/knowledge.test.cjs` for the coverage, provenance and navigation contract.

### Chemical Exposure Pathways (public evidence crosswalk)

The [Exposure Pathways](https://svyable.github.io/poisoners/pathways.html) section turns 14 existing chemical hazard profiles into individually linkable, static, searchable research routes. The reviewed `docs/pathway-routes.json` connects each compound to existing evidence-method field notes and broad U.S. official record leads, without claiming that the linked agencies cover every chemical, facility, year or location. Original chemical source citations and their speciation limitations remain visible. The 42 method-note links and 29 public-record search leads are navigation links, **not** 71 new observations or evidence of exposure. No new numerical harm, company-blame, or personal-risk score is inferred. Run `node scripts/build-pathways.cjs --check` and `node --test scripts/pathways.test.cjs` before publishing. The route descriptions are included in the local site search index.

## Universal Rank & Filter Lab — source-comparable metrics

The [Rank & Filter Lab](docs/rankings.html) ranks and filters public-source data in **eight separate evidence cohorts**, not an invented general company harm score: 50 production-attributed company climate records, 10 2025 territorial country inventories, 34 FY2025 SEC-reported officer-compensation records, 500 officer-role research positions (466 identities unknown), 55 legal monetary outcomes, 142 unmeasured metric definitions, 14 chemical identity/hazard profiles, and five national power-sector chemical emissions figures. Each numeric metric is separately defined with method, year, unit and source. **The facility explorer now contains one regulator-sourced chemical release cohort:** 41 Form R rows from one independently reviewed 2024 site, not company-wide or nationally complete observations. The universal Rank Lab still maintains separate cohorts and must not compare these masses to greenhouse-gas producer attribution or to health outcomes.

Controls support any listed primary metric, independent second- and third-level tie-break sorts, ascending/descending direction for each priority, four AND-linked value/availability conditions on other fields, full-text search, all relevant categorical facets (country, sector, role, compensation filing, reporting status, domain, media, receptors, hazards, legal type and jurisdiction, chemical/source cohort), numerical min/max, known-only and unknown-only modes, all-matched-row distribution statistics (minimum, quartiles, median and maximum), visible columns, Top 10/25/50/100/all, record audit trail, two-record comparison, source-linked CSV/JSON export of either visible Top-N rows or the entire filtered result set, deep-linked rule-aware URL sharing and optional device-local saved views. These controls never submit identifying information to a server.

**Numeric rank badges appear only for known values in a compatible source-defined cohort.** Unknown quantities remain unranked at the bottom; tie handling and deterministic secondary ordering are test-covered. Sorting text categories produces an alphabetical order, not a measure of harms. A 2024 company's global producer-attributed GHG cannot be compared against 2025 territorial country emissions or used to estimate personal injury.

Financial sorts require a *single currency* (USD, BRL, CAD or INR); fixed paid amounts, obligations, caps and purchasing-power comparisons remain different fields. Cash paid over unknown years or incompletely reconciled multiyear schedules is not assigned an invented 2025 value; AVX and ONGC documented installments are indexed separately. Chemical masses require selecting a *single agency / vintage / unit / reported population* cohort; 2025 EIA metric tonnes cannot be combined with 2024 EPA short tons. The chemical identities and 142 metric *definitions* are educational descriptors, not quantified disease severity or site-specific exposure. Source candidates and the number of named officers indicate research coverage, not fault or environmental innocence.

The Rank Lab uses deterministic client-side scripts with no third-party analytics or backend. Run `node --test scripts/rank.test.cjs`, `node scripts/build-search-index.cjs --check`, `node scripts/check-public-site.cjs`, and `node scripts/check-site-links.cjs` to audit all views and release gates.

### Advanced ranking controls (November 2026)

Three priority fields are sorted lexicographically: the second breaks ties in the first, and the third breaks any remaining ties. **No arbitrary weights, combined impact points, individual injury rankings, or cross-unit arithmetic** are calculated. Up to four independent filters can apply a numeric threshold or test whether a field has a verified value; all filters use AND logic. Unknown-only is separate from a genuine zero and from known-only. Financial thresholds and even secondary/third-priority payment sorts still require a selected currency; chemical mass filters require a single common agency/year/unit/coverage cohort. When that gate fails, numerical ranks, percentiles and unsafe cross-currency threshold conditions are withheld.

The summary panel calculates min, quartiles, median, max, and known/missing counts from **all filtered matches** before Top-N truncation. No sum of legal remedies or aggregate harm is produced. Exports default to the displayed Top-N and offer an explicit full-filtered option. Rules, sort priorities, facets, ranges and missing-value controls are preserved in copied URLs and browser-local saved views. Run `node --test scripts/rank.test.cjs` to verify cohort guards and stable ordering.

## Reproducible EPA Form R facility evidence — first real pilot

The original EPA 2024 Texas Basic CSV was retrieved via GitHub-hosted source verification on **2026-11-08 UTC**, file name `2024_TX.csv`, size approximately 7.12 MB, SHA-256 **`8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d`**. Of 9,536 Texas Form R/A source rows inspected, **41** matched the approved Baytown Chemical Plant location, the 2024 source-parent aliases and Form R type. The importer excluded 41 records from unapproved TRI identity candidates; it published none of those as ExxonMobil. There were no quarantined parent/location conflicts among admitted records. The dataset is a strictly dated, **partial** facility release sample, not all sites, products or pollutants.

The site can search reported CAS/chemical identity, filter pounds versus grams, switch between on-site fugitive air, stack air, combined air and water release amounts, and export currently filtered source rows with official file SHA. These controls order *reported mass* only. They do not equate released pounds to toxicity, ambient concentration, medical dose, human injury, regulatory breach or personal/corporate legal fault. The 2024 EPA Basic file can contain zero-filled fields for NA/blank values and Form A; the importer excludes Form A and retains the zero-fill caveat even for Form R.

To repeat this exact import, download [EPA's 2024 Texas Basic CSV](https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv), confirm the pinned checksum, and run:

```sh
node scripts/import-tri-basic.cjs --input /path/to/2024_TX.csv \
  --retrieved YYYY-MM-DD \
  --source-url 'https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv' \
  --expected-sha256 8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d \
  --output docs/tri-facility-releases.json
node --test scripts/tri-import.test.cjs
```

The source may be revised by EPA; checksum mismatch requires deliberate source review rather than silent regeneration. Future facility expansion requires separate source-verified physical locations and time-bound parent/ownership review. See the [full importer methodology](data/tri-import-methodology.md).
