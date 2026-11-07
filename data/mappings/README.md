# Facility CSV mapping

**Not a live feed.** The supplied mapping and fixture are synthetic and must never be published as real-world observations.

This mapping format is intended to accept authorized exports from official registers such as the [US EPA TRI Basic Data Files](https://www.epa.gov/toxics-release-inventory-tri-program/tri-basic-data-files-calendar-years-1987-present), [Canadian NPRI](https://pollution-waste.canada.ca/national-release-inventory/), or [Japan PRTR](https://www.env.go.jp/en/chemi/prtr/prtr.html) after a researcher verifies the exact CSV column layout.

1. Download a permitted CSV file manually. Confirm its **reporting year, publication/update date, unit definitions, reporting thresholds and terms**. Do not automatically scrape a protected system.
2. Copy 'facility-example.json' to a local new mapping. Replace **every** fixture field: source URL, publisher, dataset ID, actual CSV header names and quantity columns; set the reuse mode honestly.
3. Specify a release medium and exact incoming mass unit for each quantity column. The normalizer converts pounds (lb), grams (g), kilograms (kg) and metric tonnes to kilograms. **EPA TRI reports dioxin/dioxin-like amounts in grams while other chemicals are generally pounds**. The converter blocks any row containing “dioxin” unless 'dioxin_grams_confirmed' is true, then uses grams.
4. Dry-run locally with 'node scripts/normalize-facility-csv.cjs --input path/to/authorized.csv --mapping path/to/verified-mapping.json'.
5. To stage public, normalized evidence, append '--write --output data/evidence/staging/unique-batch.jsonl'. Files may not exist already; overwriting is refused.
6. Review with 'node scripts/ingest-evidence.cjs --input data/evidence/staging/unique-batch.jsonl'. A new dataset cannot enter the public observatory without separate source, scientific and licensing review.

**Hard distinctions:** These are reported releases at a named facility, not ambient exposure, health outcomes, confirmed wrongdoing, or responsibility of a parent corporation. Never infer owner/operator from a name string; tie records to dated primary identifiers. Form A and Form R reports, off-site transfers and on-site releases are not interchangeable quantities.

The tool is a memory-limited parser (30 MB per file). Split larger exports by year/state and keep original source references; do not attempt to process an unlimited national export as one file. The current scaffold checks reporting values and provenance format but does not verify chemical CAS accuracy, official amendments or unit notes in every originating form. That expert validation is required before public release.
