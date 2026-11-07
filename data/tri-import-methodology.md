# POISONERS · EPA TRI chemical-release ingestion (reviewed pilot)

**Status, November 7, 2026:** Facility-identity research is under way. One 2024 ExxonMobil facility identity is approved in `data/tri-facility-links.json`; two additional TRI identifiers are **unapproved research candidates**. The published `docs/tri-facility-releases.json` intentionally has **zero imported records**, because a reproducible official 2024 source CSV has not yet been downloaded and validated. This is **not** evidence that any approved facility released zero chemicals.

## 1. Official primary source and reporting limits

Use [US EPA TRI Basic Data Files](https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present), reporting year **2024**, state or national CSV. EPA says that site includes forms processed through **November 5, 2025**. Download a CSV from EPA itself, preserve the file and checksum, and record the retrieval date. Consult [EPA's field documentation](https://www.epa.gov/system/files/documents/2024-08/basic_data_files_documentation_august_2024.pdf).

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
  --expected-sha256 <64-character digest from the original source file> \
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
