# POISONERS · EPA TRI chemical-release ingestion (reviewed pilot)

**Status, November 8, 2026 UTC:** One time-bound 2024 ExxonMobil Baytown Chemical Plant (Part) identity is approved in `data/tri-facility-links.json`; two other TRI identifiers remain unapproved candidates. The original EPA **2024 Texas TRI Basic CSV** has now been downloaded, pinned by SHA-256 and parsed into **41 individual Form R records** for the approved site. The imported file inspected 9,536 reported Texas rows; 41 candidate-site rows were excluded, and no admitted row had a parent/location mismatch. These are source-reported annual quantities, **not verified toxic exposure or injury**, and they are not a complete company inventory.

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

The [AEP company PDF](https://docs.aep.com/docs/requiredpostings/tri/docs/TRI2024.pdf) is independently transcribed in `docs/coal-operator-2024.json`. This is a self-reported **AEP system-wide** coal-generation summary with mixed ownership, not a TRIFID-specific official EPA CSV, so **do not import it using this Form R tool or join it to the 50 Carbon Majors producers**. The operator explicitly marked its June 2025 submissions pending; off-site disposal transfer is not a direct on-site release. Its genuine published chemistry can nonetheless illustrate sulfuric acid mist, hydrogen fluoride, mercury and ash-metal pathways alongside the newly imported, separately bounded 2024 Baytown facility records.

## 3. Repeatable import

No network access is required after downloading a matching **official EPA Basic CSV**. The script uses Node.js 22 and has no npm dependencies.

```bash
# Download the reporting-year 2024, selected-state or national Basic CSV from the EPA site above.
sha256sum /path/to/official_2024_tri_basic.csv

# Audit and quarantine potential parent-name mismatches without changing site data.
node scripts/import-tri-basic.cjs \
  --input /path/to/official_2024_tri_basic.csv \
  --retrieved 2026-11-07 \
  --dry-run

# Publish only when a source file has been reviewed and the parent crosswalk is current:
node scripts/import-tri-basic.cjs \
  --input /path/to/official_2024_tri_basic.csv \
  --retrieved 2026-11-07 \
  --expected-sha256 8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d \
  --source-url https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv \
  --output docs/tri-facility-releases.json

node --test scripts/tri-import.test.cjs
node scripts/verify.cjs
```

Review the emitted `coverage`, `issues`, file SHA-256 and document control numbers, then commit **both evidence and resulting file** through CI. Any parent disagreement is quarantined, never auto-corrected by string fuzzing. This pilot admits only an explicitly reviewed 2024 facility parent name and site ID; candidates are skipped. Even after a successful import, the site will show only matching approved rows from **that particular EPA source file**, not a national or entire-company total.

## 4. Required expansion gates

- Verify facility identity via TRIFID and location; review EPA FRS, state and company primary documentation separately.
- Review time-bound parent/mergers/subsidiaries and distinguish multi-TRIFID subplants without double-counting.
- Acquire original official CSV, preserve checksum and as-of processing cutoff, parse Form R chemicals with individual document-control numbers.
- Reconcile duplicate or amended filings and separated units. Flag off-site transfers, ash/land and water measurements as distinct from stack releases.
- Map TRI chemicals to exact CAS/species, then apply a separate exposure/risk method (EPA RSEI only within its documented support), and add transparent facility/year coverage denominators.
- Only after a compatible, adequately complete population is verified may a same-chemical, same-medium, same-year **release mass** ranking be displayed. A toxicity-weighted or human-outcome rank requires additional independent scientific review.

This methodology intentionally makes unsupported leaderboard production harder than source review.

## 5. Published 2024 EPA Texas site snapshot — source chain

- Official source download: <https://data.epa.gov/efservice/downloads/tri/mv_tri_basic_download/2024_TX/csv>.
- Source year: **2024**; EPA update processed through **2025-11-05**; retrieval **2026-11-08 UTC**.
- Original source file SHA-256: `8863d7ae9639e4773fdc0f4fe5702e0a7e50307068fbbcbc4f5e80bb180bb30d`. Regeneration deliberately fails if EPA changes these bytes before a new source review.
- Source data inspected: **9,536** Texas rows. Approved facility `77522XXNCH5000B`: **41** matched EPA Form R rows, **one** distinct reviewed facility, **one** reporting year, reported parent name matching preapproved historical aliases, state `TX`, city `Baytown`, street number `5000` and token `BAYWAY`.
- **41 candidate-site rows** excluded; **9,454** unrelated rows excluded; zero form A rows at approved facility; zero quarantined parent/location conflicts. Exclusions are not proof that those other plants have no releases; their ownership evidence is not yet approved.
- Actual source field labels include `2. TRIFD`, `8. ST`, `39. TRI CHEMICAL/COMPOUND ID`, `40. CAS#`, `51. 5.1 - FUGITIVE AIR`, `52. 5.2 - STACK AIR`, `53. 5.3 - WATER`; the importer explicitly normalizes only known variants. The official field documentation retains the historical spelled-out names. Unknown schema variations fail closed.
- Examples of *facility-reported* 2024 Form R quantities (original pounds) include benzene (**21,300 lb combined on-site air**, **79 lb water**) and ammonia (**2,530 lb on-site air**, **5,914 lb water**). These are not monitored ambient concentrations or doses and should not be converted into a toxic-harm or liability ranking.

The browser [facility explorer](../docs/chemistry.html#facility-records) filters each observation by reported chemical/CAS, separate air and water pathways, units and source status; a CSV export includes document-control numbers and original EPA source checksum. Sorting different reported substances by absolute mass may be useful to inspect a filing, **but is not a comparative toxicity or risk ranking**. Future rankings of facilities should require matching chemical identity, medium, year, units and verified site scope; a cross-chemical toxicological weighting model would require independent science and endpoint assessment.

This 41-record snapshot is an intentional small pilot. It does not certify that every Form R quantity is instrument-measured or that any displayed zero was independently confirmed. EPA may publish revised historical submissions; changes require retrievability, version and checksum review.
