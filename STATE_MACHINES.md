# State-machine audit — POISONERS

**Audit date:** 2026-11-08
**Scope:** static browser app, research worksheets, source-backed financial evidence, evidence/TRI import CLIs, generated artifacts, and scheduled research workflows.
**Inventory:** [data/state-machines.json](data/state-machines.json) — 51 documented machines: 41 UI, 5 ingestion/build pipeline, 3 evidence-data, 2 automation.

This is a transition map, **not** a recommendation to add a framework or replace working behavior with heavyweight statechart machinery. Most entries describe *observed implicit state machines*. Two global-search machines now use a pure exported transition function. The others remain in their existing implementations and are marked observed, not falsely reported as migrated.

## Why this elevates UX, DX and AX together

**UX:** Global search is present on every public page. It now makes loading explicit, preserves typed queries while fetching, caches a successful static index, supports a visible retry on failure, gives a fallback link to the research guide, restores focus, and rejects stale completions. No new backend or submission of user queries was added.

**DX:** The versioned inventory documents each behavioral owner, event, state, persistence boundary and evidence guard. The search reducer can be imported and tested in Node without browser dependencies. CI exercises reachability, ambiguous transitions, valid and invalid replays, stale events, result ranking, retry and simulated DOM focus behavior.

**AX:** An agent can read JSON contracts before editing, locate exact owner paths, and replay event sequences to see allowed outcomes without touching a browser or user data. These descriptions do not promote unverified facts into confirmed findings.

## Run the inspector and checks

These read-only commands work with Node.js 22 and require no package install:

~~~sh
node scripts/state-machine.cjs list
node scripts/state-machine.cjs show global-search-index
node scripts/state-machine.cjs replay global-search-index FETCH_START FETCH_ERROR FETCH_START FETCH_OK
node --test scripts/state-machines.test.cjs
~~~

The inspector returns JSON. Its 'show' command gives the owning source, states, event edges, persistence and guard. 'replay' emits a deterministic trace and refuses impossible transitions. This is a planning aid, **not** a production action executor or evidence-verification engine.

## Priority risk map

| Tier | Machines | Existing / new safeguard | Next safe evolution |
| --- | --- | --- | --- |
| P0 | Global search dialog/index | Explicit orthogonal states, retry, stale-request token and DOM tests | Keep search accessibility and race checks on every change |
| P0 | Rank cohorts and compatibility gate | Pure rank model suppresses invalid currency/unit comparisons | Move further controls to pure functions only for demonstrable defects |
| P0 | Evidence intake, EPA TRI importer, monetary payment evidence | Validation guards against false attribution or false paid status | Require primary-source support for promotion, and allow corrections/demotion |
| P1 | Workbench catalog/worksheet | Source-directory fallback and local in-memory notes | Consider only opt-in local backup; never silently save private notes |
| P1 | Dossier/people selection, navigation, bookmarks | URL and source guards; local-only saved views | Add back/forward and filtered-selection tests before modifying architecture |
| P2 | Knowledge/pathway hash and filter | Static native details remain functional without JS | Preserve deep link discoverability and static fallback |

## Critical examples

**Search:** idle → loading → ready or idle → loading → error → loading → ready. Late success/failure from an older attempt cannot override current search. Closing does not duplicate an in-flight request; opening after success reuses the result. The browser requests only static search-index.json.

**Rank Lab:** one comparable reporting currency, year and scientific boundary is required before numerical ranking. Unknown is not zero. Never produce a composite corporate harm or human blame ranking by accident.

**Money:** payment_total_unverified → partially_paid → confirmed_paid only when underlying source scope proves an actual transfer under the exact settlement. Corrections may demote when support is withdrawn. A company fund deposit and downstream receipt of that same cash must not both count as company payments; future commitments are not historical cash.

**TRI importer:** official source → parsed → validated dated facility/owner identity → approved, quarantined or rejected rows. Unknown Form R records and unapproved company identities cannot be treated as zero or attributed to a parent.

**Workbench:** concern/region selection, per-selection review checks, optional public-record notes, worksheet export and reset are separate states. 'Reviewed' is not scientifically verified. Notes intentionally remain in volatile browser memory and do not enter URLs or network requests.

## Contributor and agent checklist

1. Find the behavioral owner in the JSON inventory and read the agent_guard before making changes. For money, check the exact primary-source records too.
2. Update the inventory whenever a behavior or transition changes. Mark mode=explicit only when the production code actually uses deterministic transitions.
3. Test unavailable, empty, invalid, stale-async, reset and accessibility outcomes. Preserve fallback navigation.
4. Do not add private-note storage, tracking, newly assumed legal conclusions, mixed-unit rankings, fabricated cash dates, or unverified aggregation while refactoring.
5. Run the state machine tests, then the full repository verification suite before merging.

**Audit boundary:** This enumerates identifiable app-owned browser, evidence and research flows in the current repository, not browser internals, operating-system dialogs or hypothetical future features. The map is maintained and practical, not a proof that every runtime combination has been exhaustively enumerated.
