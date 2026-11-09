# POISONERS / agent operating contract

This is a browser-only public environmental research observatory, **not** an exposure calculator, toxicity ranking, legal-liability engine, claimant intake, or service collecting user notes.

## Inspect state before editing events

- Read **data/state-machines.json** before changing any loader, navigation, search, filter, modal, bookmark, pinned comparison or export. Each entry names the owner, initial/allowed states, transition edges, persistence, source/agent guard, and explicit-versus-observed implementation status. Read **STATE_MACHINES.md** for the human audit and use **node scripts/state-machine.cjs list/show/replay** for the read-only agent interface.
- **explicit** means a machine is backed by tested production transitions. The global search uses its own small transition table; Rank Lab source loading and Workbench catalog/navigation use pure transitions exposed by **docs/site.js** as window.POISON_INTERACTION (`makeResource`, `transitionResource`, `chooseSelection`). **observed** means the flow is still imperative; do not claim it is migrated until that changes.
- When adding interactive script, update the registry and add corresponding transitions and tests. CI ensures every browser JS script with event listeners has a registered owner.
- Resource machine: idle → loading → ready or error; error → LOAD retries; request IDs reject stale responses. Surface only the public state phase through data-resource-state. Do not expose queries, notes, favorites or other user content.
- Workbench navigation: INIT canonicalizes using replaceState; SELECT pushes a distinct valid choice; RESTORE on Back/Forward never writes a new history entry. Validate identifiers against the source catalog.

## Non-negotiable evidence and privacy boundaries

1. Preserve primary sources, units, dates, uncertainty and original scope. Missing is not zero. Never fabricate score, injury, causation, misconduct or legal liability.
2. A payment due, a payment proved received, a limited partial payment, a future project and an unknown disbursement are distinct. Preserve original legal payers and corporate-merger dates; never double count.
3. Guard monetary rankings against mixing currencies, and mass rankings against mixing original media, measurement units and incompatible source years. Do not collapse separate evidence cohorts.
4. Workbench notes remain browser-memory-only or downloaded locally. Never put notes into public URLs, remote requests, state-machine diagnostics, logs or agent snapshots. Saved views/bookmarks retain their existing local-only policy.
5. Preserve accessible keyboard actions, source fallback links, retry after errors, static page content and build determinism. Avoid new frameworks or backends without concrete need.
6. Never hand-wave a broken generator, provenance validation, link audit or CI gate.

## Regression and merge contract

Run the relevant full repository checks defined in **.github/workflows/verify.yml**. At minimum:

    node --check docs/site.js
    node --check docs/site-search.js
    node --check docs/rank-app.js
    node --check docs/workbench-app.js
    node --test scripts/interaction-states.test.cjs
    node --test scripts/state-machines.test.cjs
    node --test scripts/site-search.test.cjs
    node --test scripts/rank.test.cjs
    node --test scripts/workbench.test.cjs
    node scripts/check-public-site.cjs

Add tests for legal and illegal transitions, concurrent fetches, errors and retries, back/forward restoration, stored-data corruption, keyboard actions and evidence guards touched. Work in a branch and prefer a green, mergeable, reversible PR. Agent experience (AX) comes from the **machine-readable contract plus executable tests**, never from leaking private session state.
