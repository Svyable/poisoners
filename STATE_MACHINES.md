# State-machine inventory — POISONERS

**Scope:** The public static frontend in docs/, including the inline damages ledger, and its build/verification entry points. Inspected against main on 2026-11-08. This is a behavioral inventory, not a proposal to put every filter behind a new framework. Public evidence and source-data semantics are intentionally out of scope for refactoring.

A state machine here means a user-observable or data-safety phase with permitted events and different behavior. Some are currently implicit in nulls, booleans, CSS, URLs, DOM visibility, or promise outcomes. Orthogonal filters are listed as state dimensions, not invented loading phases.

## Inventory

| Surface / owner | States and transitions already present | Contract and risk | Priority |
| --- | --- | --- | --- |
| **Site-wide search** — docs/site-search.js; every page loading it | Modal closed/open; index idle → loading → ready or error → retry; results / no matches; type/query chips; keyboard focus | One fetch for concurrent opens, render only in the current session; cache successful empty indexes; restore focus; safe hrefs | **P0 — explicit and tested here** |
| **Global responsive navigation** — docs/site.js; docs/app.js; docs/dossier-lab.js; docs/people-app.js | Mobile drawer closed ↔ open via toggle, link selection, Escape/outside click; aria-expanded mirrors hidden | Exactly one click owner per menu; no duplicate toggles; keyboard dismissal | P1 |
| **Observatory ledger + scenario** — docs/app.js | Annual ↔ historic ↔ future with rate slider; country/text filters; no matches; dossier open/closed; pathway selection | Future projections remain scenarios; unknown histories are not zeros; period buttons and values agree | P1 |
| **Rank Lab source bootstrap** — docs/rank-app.js | Multiple dataset fetches pending → valid or failed; initial URL hydration; dataset switching | Partial or invalid source coverage must never produce credible-looking rankings | P1 |
| **Rank Lab comparison/config** — docs/rank-app.js; docs/rank-model.js | Dataset, metric, secondary/tertiary sorts, facets, ranges, known/missing exclusion, four rules, columns; selected row; zero/one/two pins; comparability allowed ↔ held | Pins must not leak across cohorts; no rank across incompatible currency/unit/year/accounting boundary; URL round-trip safe | **P0 scientific gate** |
| **Rank Lab saved views / export** — docs/rank-app.js | URL → sanitized config; save → restore → delete (localStorage); CSV/JSON/download and copy success/failure | Saved views cannot bypass safeConfig; exports reflect visible filters and disclaimers | P1 |
| **Dossier Lab** — docs/dossier-lab.js | Query/country/sector/sort list; none/selected record; comparison compatible or incompatible; case selected; mobile panel | Missing source data isn't an all-clear; comparisons require reporting compatibility; no inferred wrongdoing | P1 |
| **People / company explorer** — docs/people-app.js | Company/person selection and deep links; search/country/role/sort; favorites persisted; legal route selection; mobile | Source-verified people only; no inferred personal liability; selection must remain valid under filters | P1 |
| **Research Workbench catalog** — docs/workbench-app.js; docs/workbench-model.js | Catalog pending → valid or unavailable; concern/region pair → plan; has/no regional source | Failed catalog never looks like verified coverage; no region source is a coverage gap | P1 |
| **Research Workbench per-pair worksheet** — docs/workbench-app.js | For each concern/region: review checkboxes and notes; reviewed/unreviewed; reset; local Markdown export; print/share link | Notes never persist or transmit; switching pairs preserves in-memory notes; reviewed ≠ verified | **P0 privacy gate** |
| **TRI Form R facility evidence** — docs/tri-facility-ui.js; docs/chemistry.html | Source pending → imported rows / zero approved rows / error; query/unit/order/presence; zero matches; unit gate allowed ↔ blocked; CSV enabled/disabled | Ingestion absence ≠ zero emissions; pounds ≠ dioxin grams; facility ≠ company; no invented export | **P0 scientific gate** |
| **Chemical register** — docs/chemistry.js | Catalog pending → valid/error; hazard-family/search/sort; matching/empty; record detail | Unknown is not safe; hazard classifications are not harm rankings | P1 |
| **Exposure benchmarks** — docs/exposure-benchmarks.js | Source pending → valid/error; medium/search; matching/empty | Do not compare units, media, or averaging periods as a single toxicity rank | **P0 scientific gate** |
| **Coal operator ledger** — docs/operator-benchmark.js | Source pending → valid/error; query/sort; matching/empty | Preserve unit and source boundaries; no extrapolation to all facilities | P1 |
| **Damages/payment ledger** — inline script in docs/damages.html | Source pending → valid/error; search/status/currency; adjustment known/unknown; no matches | Paid ≠ obligated; unknown money ≠ zero; no cross-currency total | **P0 scientific gate** |
| **Knowledge field notes** — docs/knowledge-app.js | Category/text filter; visible/empty; URL hash → expanded details, including reveal if filtered out | Deep link wins; no-JS static fallback retained | P2 |
| **Evidence pathways** — docs/pathways-app.js | Medium/text filters; visible/empty; hash → record/filter reset | Deep links and evidence-route framing retained | P2 |
| **Foundation explorer** — docs/foundation-app.js | Search/domain/kind + paging; source search; country selected; empty | Provenance and unknown fields visible; filter resets paging | P2 |
| **Cross-page actions** — docs/site.js and individual apps | Copy/export idle → requested → success or fallback/error | Do not claim successful copy before resolved operation | P1 |
| **Evidence ingestion/publication** — scripts/import-tri-basic.cjs, ingest-evidence.cjs, normalize-facility-csv.cjs, build-*.cjs and checks | Unverified input → validation/rejection or accepted provenance-linked publication; generated matches/mismatch | Fail closed for invalid origin, year, identity or schema; reproducible source snapshots | **P0 build gate** |

## Decision

1. **Make the widest shared asynchronous boundary explicit first.** Site-wide search now owns one small index lifecycle (idle/loading/ready/error), uses the native dialog for open/closed, and guards visible updates with a dialog-session token. Results, empty, loading, closed and error also project to a data-state and aria-busy.
2. **Keep domain states independent.** A universal runtime state manager would conflate ranking comparability, provenance, local notes and simple navigation. No framework rewrite or new runtime dependency.
3. **Extract/reduce only behind tests.** Follow-ups: shared navigation ownership; Rank Lab bootstrap/config/pin boundaries; Workbench catalog loading/error; TRI source readiness. Protect scientific/privacy gates before simplifying.
4. **Improve human and agent affordances.** For each subsequent flow, document events, legal transitions, invalid-state policy, UI projection, URL/persistence constraints, and forbidden-path tests in the owner or a co-located test.

## Regression checks

- Search: node --test scripts/site-search.test.cjs (race, retry, cached-ready, empty, invalid-index and quick-topic).
- Full: node scripts/verify.cjs && node --test scripts/*.test.cjs, plus the generator --check and static/source audits in .github/workflows/verify.yml.
- Work on a clean branch. Do not alter scientific records or generated source data merely to pass a UI test.

## State design guidelines

- Model only meaningful phases as a finite union with guarded transitions; do not mirror native DOM state with redundant booleans.
- Render from current state; ignore obsolete async completions.
- Distinguish empty from error from unknown. Neither of the last two may become a zero, an all-clear, or a valid rank.
- Preserve URL and local-only boundaries. Workbench notes are private to the current browser session.
- Test forbidden paths: double open, close while pending, retry, empty data, mixed units, invalid filters, unavailable sources.


## Machine-readable extension and agent interface

The [audited state-machine registry](data/state-machines.json) expands this human-oriented map into **52 separately identifiable state dimensions** (42 UI, 5 pipelines, 3 source-data gates, 2 scheduled automations). Entries include the owning file, states, events, allowed edges, persistence and the critical evidence/agent guard. Four high-risk flows are now marked explicit: the global search *index loader* using its local tested transition table, and Rank Lab snapshot loading plus Workbench catalog loading and URL selection using the tested pure transitions in docs/site.js. The open/closed modal itself is browser-native; other state diagrams document observable behavior, **not** a claim that they have been migrated into a new runtime framework.

A small, read-only inspector returns JSON and refuses impossible transitions:

~~~sh
node scripts/state-machine.cjs list
node scripts/state-machine.cjs show global-search-index
node scripts/state-machine.cjs replay global-search-index load reject retry resolve
node --test scripts/state-machines.test.cjs
~~~

These commands are safe for a development agent: no browser clicks, server changes, downloads, clipboard actions or research-note persistence. Replay describes allowed events; it cannot prove that a real-world settlement was paid or that a source was independently verified. When updating a UI or data process, keep its documented guard and transition table synchronized with the behavior, and mark it explicit only when code truly implements that transition boundary. The existing browser search tests remain authoritative for runtime focus, keyboard, loading/error, retry and late-response behavior.

The registry deliberately includes historical legal payment status and public-source intake **as evidence-flow contracts**, without using a generic reducer to mutate those sources. The substantive financial/chemical tests remain the authoritative integrity gates.

## Incremental UX / DX / AX hardening (2026-11-08)

A second audit found that the site-wide search state lifecycle had already been made explicit with comprehensive native-dialog tests. Rather than replacing that proven implementation with a second engine, it remains the single owner of search transitions. The canonical registry and read-only replay CLI above continue to be the only machine catalog and agent interface.

Three more high-risk flows now implement a **small pure contract** in `docs/site.js`: Rank Lab multi-snapshot resource loading, Workbench official-source catalog loading, and Workbench concern/region URL history. The browser-global `window.POISON_INTERACTION` exposes only public transition functions and fixed metadata. It has no storage, network or note access; adopted loaders project only `data-resource-state` and `aria-busy`, never query strings or user research notes.

**Concrete UX defects found and fixed:** failed Rank/Workbench source loads now expose accessible Retry actions rather than requiring refresh; Workbench SELECT pushes real history and RESTORE via popstate does not create another entry; Rank share links now restore numeric row limits from query strings correctly; a Rank page-level slash shortcut no longer overrides the site-wide search key handler; People pages now load the shared runtime before the search code. All original legal-payment, science, currency, source and privacy gates stay unchanged.

**Tests:** `node --test scripts/interaction-states.test.cjs` checks pure transitions, stale completions, invalid navigation, all interactive owner registration, cross-page script order and the Rank/Workbench fixes. The existing `scripts/site-search.test.cjs` remains the authoritative executable search-dialog test. `scripts/state-machines.test.cjs` validates all 52 state diagrams and agent replay CLI, including the newly explicit machines. The full CI workflow runs them together.

**Migration honesty:** the other 48 machines still describe observed state behavior or evidence/pipeline gates. No universal Redux/XState-style runtime has been introduced; the separate domain-specific guards are more valuable than homogenizing all filters or making source data mutable. Agent changes must update `data/state-machines.json`, add source-level tests and preserve the associated `agent_guard` before making another machine explicit.
