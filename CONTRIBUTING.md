# Contributing to POISONERS

This project accepts **publicly verifiable environmental research**, corrections, software improvements and methodological scrutiny. It does **not** accept private claimant submissions, patient data, attorney communications, unsubstantiated accusations or automatically drafted legal pleadings.

## Best first contributions

1. Improve **primary-source coverage** in the ten launch countries using public regulators, studies and traceable facility identifiers.
2. Add a **metric definition** with an explicit scientific unit, environmental medium, receptor, temporal validity, source candidates, method and uncertainty constraint.
3. Identify a **verified ownership link** with both parties' legal identifiers, effective dates, and the original registry or filing.
4. Improve scientific caveats, remove double counting, reproduce a published model or document a source error.
5. Help build a source-compliant import mapping or validation test.

## What qualifies as a research record

Public claim entries follow [the evidence schema](schema/evidence-record.schema.json). For any numeric result, provide date/range, source URL and document locator, reporting/modeling class, unit, system boundary and evidence grade. **Unknown must be null or “not estimated,” never zero.** Distinguish source-reported emissions from measured ambient exposure, and health outcomes from model-derived estimates.

- A: primary auditable source, with its limits explicitly documented.
- B: a reproducible or peer-reviewed model with disclosed assumptions.
- C: credible secondary lead or unreviewed public claim.
- D: unverified research lead, not appropriate as an established result.

Individual claims, not whole companies, receive evidence grades. A case's litigation merits are never automatically inferred from the research grade.

## Process

- Use the structured [public evidence issue](https://github.com/Svyable/poisoners/issues/new/choose), correction template or dossier-lead template.
- For code or data changes, run Node 22+, then the commands below.
- Generated public files are built from the registries; do not edit them directly.
- CI verifies data coherence, scientific and legal guardrails and deterministic generation. Corrections require source and method notes.
- Do not add review blockers for ordinary, reversible software changes once objective CI passes. Any new company-level impact estimate or litigation claim still needs independent expert/counsel review.

### Checks

Run:
- 'node scripts/verify.cjs'
- 'node scripts/build-foundation.cjs --check'
- 'node --test scripts/foundation.test.cjs'
- 'node scripts/audit-sources.cjs --report /tmp/poison-source-catalog.json' (offline structural catalog check)

## Privacy and public information

The public issue tracker is **not** a secure whistleblower channel or class-action registration form. No names/contact information of injured people, no health records, no private property addresses, no private identifying data, no attorney-client documents. Do not assert that a company committed a tort or crime simply because it appears in a production emissions database. Link disputed content to formal correction workflows.

## Source rights

Before importing external data, check machine-access limitations, geography, licensing and publication rights. InfluenceMap's Carbon Majors bulk downloads are distributed under noncommercial-use conditions; contact the source for commercial rights. Do not mirror third-party proprietary datasets in this repository.

## Research roadmap

See the [operating protocol](docs/operating-protocol.html) and the [README](README.md). The long-term 10×10 target means ten validated dossiers per country, not ten arbitrary companies or a hardcoded score.
