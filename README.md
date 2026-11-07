# POISONERS — The Global Poison Index

**Make the damage visible.** An open environmental evidence observatory and a proposed multidimensional framework for building defensible scientific and legal dossiers.

> **Research platform v4, November 7, 2026.** The site contains 50 source-linked corporate records from one published 2024 greenhouse-gas attribution dataset, plus the ten highest-emitting sovereign countries in EDGAR's 2025 GHG inventory. It does **not** contain 100 fully researched company dossiers, toxicity rankings, proven deaths attributable to those companies, or findings of unlawful conduct.

## The website

- [Interactive observatory](docs/index.html): searchable company ledger, temporal views, ten-country atlas, 6 × 8 exposure-research matrix, company source drawers, supporting sources.
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
- [Documented case studies](docs/case-studies.html): Japan's Minamata disease, BP Deepwater Horizon, Vale Brumadinho and 3M's PFAS drinking-water settlement, with official sources and distinctions between court findings, settlements and claims.
- [Historical damages and payments](docs/damages.html): 11 source-backed monetary outcomes, including five named entities in the 50-company index (ExxonMobil, Chevron, ConocoPhillips, Occidental Petroleum; not inferred for others). Evidence shows **confirmed paid**, **partially paid as of a dated report**, and **not independently reconciled** amounts separately. 2025 same-currency CPI-U/IPCA purchasing-power comparators are not cash-outflow histories or injury estimates. [Raw ledger](docs/damages-data.json).
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

## Historical legal-payment evidence
The monetary-outcome ledger is a **legal and financial history**, not a toxicity or guilt ranking. Its joined company aliases are deliberately separate from the legal defendant identities. For example, the Exxon Valdez civil agreement was made with predecessor Exxon entities; the Chevron 2003/2005 refinery settlement and Occidental Chemical cleanup are not measurements of their global 2024 GHG impact.

Cash amounts with explicit post-settlement payment confirmation are labeled **confirmed paid**. A dated partial report means **paid by that date**, never a current total. Announced settlement values, future work investments, capped consumer remedies and court orders are **not** automatically treated as disbursements. Overlapping legal scopes are never added. The 2017 DuPont/Chemours agreement is **$670.7m total**, not $670.7m per defendant; the 1991 Exxon civil settlement excludes the separate criminal restitution/fine.

Inflation method: 2025 purchasing-power USD comparator = original nominal figure × BLS CPI-U 2025 annual mean / settlement-year annual mean. Brazil BRL uses IBGE IPCA factors compounded to December 2025. This preserves currencies; no FX exchange assumptions. The nominal agreement-year CPI comparison is **not** an inflation adjustment of every future installment, and multi-year actual payments with unknown cashflow timing are explicitly **not** rebased. For all published records and tests, run `node --test scripts/damages.test.cjs`.

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
