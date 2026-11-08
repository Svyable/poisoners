# POISONERS · EPA TRI chemical-release ingestion (reviewed pilot)

**Status, November 7, 2026 (America/Chicago):** The original official 2024 Texas EPA TRI Basic CSV was downloaded and processed in [read-only Actions run 42448239268](https://github.com/Svyable/poisoners/actions/runs/42448239268), size **7,474,672 bytes**, SHA-256 **`8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d`**. The reviewed 2024 Baytown Chemical Plant ID `77522XXNCH5000B` matched **41 Form R chemical submissions**, source parent and TX/Baytown/5000 Bayway physical location. The 2024 Texas file contained **9,536 records** overall; 41 candidate-site rows remained deliberately excluded. All source-normalization and owner/location checks passed without a quarantine.

The audited 41 rows are now preserved in [the public readout](../docs/tri-facility-releases.json), alongside original filing control IDs, exact TRI chemicals and CAS/category codes, air fugitive/stack mass and surface-water discharges. **This is one part of an ExxonMobil chemical plant, not an ExxonMobil company-wide inventory.** The original 2024 Form R reporter values are estimates, not human exposure or guilt findings. EPA Basic can zero-fill NA or unreported quantities.

## 1. Official primary source and reporting limits

Use [US EPA TRI Basic Data Files](https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present), reporting year **2024**, state or national CSV. EPA says that site includes forms processed through **November 5, 2025**. Download a CSV from EPA itself, preserve the file and checksum, and record the retrieval date. Consult [EPA's field documentation](https://www.epa.gov/system/files/documents/2025-09/basic_data_files_documentation_august_2024.pdf).

The Basic CSV reports facility location (TRIFID, optional FRS), Form R's chemical identity (CAS/category, Form A vs R), reported parent, and estimates for fugitive air, stack air and water. **TRIFID is a site-location key; it does not establish who owned that site in any particular year.** EPA defines TRI parent as the highest-level owner on **December 31 of the reporting year**, and uses standardized names to normalize spelling. [EPA parent-company rule](https://www.epa.gov/toxics-release-inventory-tri-program/parent-company-definition-toxics-release-inventory-reporting). Always review independently documented time-specific operators before linking to a Carbon Majors company.

### Source-data pitfalls that fail our release gate

1. **Form A is not a Form R with zero releases.** EPA Basic populates zeroes for Form A fields and some blanks or NA cells. We exclude Form A; a zero on Form R is *reported/zero-filled*, not necessarily an instrument-certified absence.
2. **Do not sum unlike columns.** Air fugitive and stack are two on-site air pathways. Water is a different medium. Off-site transfers can represent waste sent to another operator, not local releases. Land disposal is not necessarily ambient air or a drinking-water exposure.
3. **Chemical identity stays exact.** `NOₓ` emission classes are not the TRI reporting list; SO₂ cannot be converted directly to H₂SO₄ mist; total metal is not the same as the metal-compound category or oxidation state. Dioxins are in **grams**, most other TRI substances in **pounds**. Never sum those units or infer a toxic-equivalent dioxin metric from mass.
4. **Duplicate and revised forms** need document-level reconciliation. The importer refuses duplicate `TRIFID/year/CAS` Form R rows instead of silently counting submissions twice.
5. **Unknown ≠ zero, and a partial inventory ≠ a company total.** TRI covers only listed chemicals above applicable reporting thresholds at covered industry sites, and reported quantities may come from engineering estimates rather than direct monitoring. Missing substances, sites or years cannot be treated as clean evidence.
6. **No health/death/illegality inference.** A facility-reported annual mass is not dose, concentration, causation, a violation, or confirmed ecological damages. EPA RSEI hazard screening would require its own methodological gate.

## 2. Verified identity and pending candidates

| TRI Facility ID | Facility / approved year | Company mapping | Approval |
|---|---|---|---|
| `77522XXNCH5000B` | ExxonMobil Baytown Chemical Plant (Part), TX · 2024 | ExxonMobil | **Time-bound identity reviewed** (not release data) |
| `94802CHVRN841ST` | Chevron Products Richmond Refinery, CA · historical ID | Chevron | **Candidate only** pending reporting-year parent checks |
| `77522XXNCH3525D` | ExxonMobil Baytown Olefins Plant (Part), TX · historical ID | ExxonMobil | **Candidate only**; distinguish from separate chemical plant/refinery |

The approved identity links [EPA's TRI ID exhibit](https://downloads.regulations.gov/EPA-HQ-OPPT-2022-0918-0035/attachment_3.pdf), a [2024 TCEQ operational report](https://records.tceq.texas.gov/cs/idcplg?IdcService=TCEQ_EXTERNAL_SEARCH_GET_FILE&Rendition=Web&dID=8337203), and [Exxon's Baytown 2024 company fact sheet](https://corporate.exxonmobil.com/-/media/global/files/locations/united-states-operations/baytown/baytown-complex-2024-fact-sheet.pdf). Each describes a different identity/ownership aspect and none by itself supplies 2024 TRI quantity.

### Real EPA Basic column headers

The [EPA Basic Data Files documentation](https://www.epa.gov/system/files/documents/2025-09/basic_data_files_documentation_august_2024.pdf) defines fields `YEAR`, `TRIFID`, `TRI CHEMICAL /COMPOUND ID`, `CLASSIFICATION`, `FORM TYPE`, `UNIT OF MEASURE`, `5.1 – FUGITIVE AIR`, `5.2 – STACK AIR`, and `5.3 – WATER`. Actual downloadable exports can prefix columns with ordinals (for example `1. YEAR` and `51. 5.1 – FUGITIVE AIR`), so the importer now strips **only the outer field ordinal**, normalizes dash typography, and preserves actual Form R section numbers. The verified 2024 fixture tests numbered headers, DIOXIN classification in grams and TRI compound category IDs independent of elemental metal CAS.

### A separate operator disclosure: AEP System 2024

The [AEP company PDF](https://docs.aep.com/docs/requiredpostings/tri/docs/TRI2024.pdf) is independently transcribed in `docs/coal-operator-2024.json`. This is a self-reported **AEP system-wide** coal-generation summary with mixed ownership, not a TRIFID-specific official EPA CSV, so **do not import it using this Form R tool or join it to the 50 Carbon Majors producers**. The operator explicitly marked its June 2025 submissions pending; off-site disposal transfer is not a direct on-site release. Its genuine published chemistry can nonetheless illustrate sulfuric acid mist, hydrogen fluoride, mercury and ash-metal pathways while official 2024 EPA facility files await reproducible import.

## 3. Source acquisition and independent evidence review

The EPA [TRI Basic Data Files](https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present) page serves files as binary downloads. The original fixed-year EPA export endpoint for the approved 2024 Texas pilot is:

```text
https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv
```

The corresponding national 2024 endpoint is `https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_US/csv`. These are **official download origin URLs**, not proof that a source file was ingested. The isolated model container could not fetch the binary CSV, but GitHub's read-only runner fetched and verified it as described in the status section. We use [a read-only GitHub Actions source-acquisition check](../.github/workflows/tri-source-research.yml) to download the **unchanged** 2024 TX file on a CI runner, check header/size, calculate SHA-256, parse Form R and upload a 14-day research artifact. **The check itself does not commit to the public website.** A separate, independently checked code change published the matched source rows with their SHA and Form R IDs. The original output and any site/parent mismatch must be assessed before the approved rows can be published.

Identity crosswalk review now also requires **STATE = TX, CITY = BAYTOWN and the 5000 Bayway street signature** in the source CSV in addition to the reviewed TRIFID and 2024 reported parent. If the location conflicts, the row is quarantined; it does not silently inherit the parent. Unknown form types fail; Form A rows are excluded. The CSV's own `DOC_CTRL_NUM`, `TRI CHEMICAL /COMPOUND ID` and `CAS NUMBER` must be preserved. The official EPA [Basic field guide](https://www.epa.gov/system/files/documents/2025-09/basic_data_files_documentation_august_2024.pdf) defines the TRI ID as a geographic location identifier *not updated for ownership changes* (p. 5), and documents zero-filled blank/NA fields and Form A records (p. 4).

**Source-integrity gate for publication:** CLI writes require both the original file SHA-256 and a validated 2024 TX/US EPA URL, with year, location, legal parent and Form R checks. This proves the importer processed a file matching a specified checksum, not that a statement by a company is independently validated or every facility / chemical / quantity is covered. Never publish values from synthetic test fixtures.

### Reference commands

```bash
curl --fail --location --retry 2 \
  "https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv" \
  --output /path/to/epa-2024-tx.csv
sha256sum /path/to/epa-2024-tx.csv
node scripts/import-tri-basic.cjs --input /path/to/epa-2024-tx.csv \
  --retrieved 2026-11-07 --dry-run \
  --source-url https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv \
  --expected-sha256 <verified-source-file-sha256>
node scripts/import-tri-basic.cjs --input /path/to/epa-2024-tx.csv \
  --retrieved 2026-11-07 \
  --source-url https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv \
  --expected-sha256 <verified-source-file-sha256> \
  --output docs/tri-facility-releases.json
```

A **source-acquisition CI artifact is not auto-publication**. The 41-row 2024 source snapshot was reviewed and published through a separate code commit with deterministic tests; all other Texas sites and candidate Baytown IDs remain unjoined.

## 4. Review generated evidence before publishing

The importer runs locally on Node.js 22 with no npm dependencies. Follow the source acquisition commands in §3 above; then run `node --test scripts/tri-import.test.cjs` and `node scripts/verify.cjs`. A source-input checksum and URL identify what was processed but do not certify its legal ownership, analytical accuracy, or completeness.

Reconcile the emitted `coverage`, `issues`, SHA-256, physical address, legal reporting-year parent, and Form R document-control IDs. A disagreement must be resolved using original agency and corporate sources, never fuzzy string matching. A matched facility is only a subset of a company; any unreported chemical, omitted environmental medium or other site remains unknown, not zero.

## 5. Required expansion gates

- Verify facility identity via TRIFID and location; review EPA FRS, state and company primary documentation separately.
- Review time-bound parent/mergers/subsidiaries and distinguish multi-TRIFID subplants without double-counting.
- Acquire original official CSV, preserve checksum and as-of processing cutoff, parse Form R chemicals with individual document-control numbers.
- Reconcile duplicate or amended filings and separated units. Flag off-site transfers, ash/land and water measurements as distinct from stack releases.
- Map TRI chemicals to exact CAS/species, then apply a separate exposure/risk method (EPA RSEI only within its documented support), and add transparent facility/year coverage denominators.
- Only after a compatible, adequately complete population is verified may a same-chemical, same-medium, same-year **release mass** ranking be displayed. A toxicity-weighted or human-outcome rank requires additional independent scientific review.

This methodology intentionally makes unsupported leaderboard production harder than source review.
