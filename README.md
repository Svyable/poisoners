# POISONERS — The Global Poison Index

**Make the damage visible.** An open environmental evidence observatory and a proposed multidimensional framework for building defensible scientific and legal dossiers.

> **Research prototype, November 6, 2026.** The initial site contains 25 source-linked corporate records from one published 2024 greenhouse-gas attribution dataset, plus the ten highest-emitting sovereign countries in EDGAR's 2025 GHG inventory. It does **not** contain 100 fully researched company dossiers, toxicity rankings, proven deaths attributable to those companies, or findings of unlawful conduct.

## The website

- [Interactive observatory](docs/index.html): searchable company ledger, temporal views, ten-country atlas, 6 × 8 exposure-research matrix, company source drawers, supporting sources.
- [Methodology](docs/methodology.html): historical / annual / future harm design, pollutant/receptor matrix, causal models, uncertainty, grades, proposed data ingestion.
- [Case engine](docs/legal.html): ten-country preliminary legal-route map and a counsel-gated, privacy-protecting workflow.
- [Evidence record schema](schema/evidence-record.schema.json): source metadata, legal-entity and date boundaries, measurement and confidence fields.

**Preview locally:** run 'python3 -m http.server 8000 --directory docs' then open http://localhost:8000. **Verify:** run 'node scripts/verify.cjs'. No npm dependencies.

**Publish with GitHub Pages:** Repository Settings → Pages → Build and deployment → Deploy from branch → select main and /docs. Save. Committing the site does not automatically enable GitHub Pages.

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
| United States | 6,018.30 | 5 |
| India | 4,508.01 | 1 |
| Russia | 2,574.39 | 5 |
| Indonesia | 1,358.91 | 0 |
| Brazil | 1,306.59 | 1 |
| Iran | 1,119.32 | 1 |
| Japan | 1,063.13 | 0 |
| Saudi Arabia | 844.96 | 1 |
| Canada | 764.52 | 0 |

**25 company records total.** Navigation associates a company with its home country, not the location of its emissions. Corporate and national emissions **use different accounting boundaries** and cannot be added as equivalent totals. Unscored countries and missing historical data are **not** zero harm.

## The proposed Poison Index

- **H — Historical:** scientifically attributable past burden by year, pollutant, pathway and endpoint, accounting for persistent and delayed effects.
- **A — Annual:** quantified attributable burden for a specified reporting year with clear exposure and confidence boundaries.
- **F — Future:** conditional modeled burden under transparent counterfactual scenarios, with uncertainty.

Each is also broken down by **air / water / soil / plants / animals / humans** and **climate gases / combustion pollutants / metals / persistent organics / agrochemicals / pharmaceutical residues / biological hazards / plastics and particles**, plus spatial extent, toxicity, persistence, vulnerability, reversibility, evidence quality and jurisdiction.

The site's current H/A/F display is a **climate-throughput proxy only**: Carbon Majors' 2024 emissions, published historical values when available, and an adjustable emissions-only 2027–2036 scenario. No actual multi-hazard scores or corporate death tolls are asserted.

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

- [x] Sourced emissions seed; latest EDGAR 2025 ten-country coverage; 25 company records
- [x] Interactive site, three temporal lenses, 6 × 8 research matrix, dossier drawers
- [x] Research methods, country-by-country preliminary legal framework, schema and CI checks
- [ ] Import and verify the complete licensed Carbon Majors and PRTR datasets
- [ ] Fill ten **verified** company dossiers in each cohort country; record why each qualifies
- [ ] Establish pollutant/facility/receptor/outcome attribution and epistemic uncertainty
- [ ] Build a private, access-controlled evidence room and counsel-managed intake only after review
- [ ] Develop expert-reviewed human-health and ecological subindices, never arbitrary numerical accusations
- [ ] Independent corrections, rebuttal and audit log; expert and legal gates before any public adverse claims
- [ ] Verify patent application filing details before stating 'patent pending' publicly

**Standard:** No invented numbers. No hidden weights. No conflated boundaries. No automated accusations or legal filings. Do not use the global Lancet mortality estimate to attribute deaths to listed companies.

See the original [LICENSE](LICENSE) for the repository's terms.