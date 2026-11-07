# Public officer research / People Atlas v4

**This directory is not a list of alleged wrongdoers, environmental defendants or individuals proven to have profited from harm.**

The architecture contains 500 potential **role-research positions**, ten for each of 50 companies. As of 2026-11-07, **34 public officers have SEC-sourced 2025 compensation records** across seven issuers; **466 research positions remain unverified**. Each role position can have zero or more relevant people in real life; the initial published register assigns at most one source-backed person per slot to avoid unsupported duplicates.

## Source files

- 'verified-officers.json': officer name, publicly reported role, corporate identity, disclosed 2025 compensation, filing date, SEC document URL, method and limits.
- 'research-roles.json': ten categories of corporate decision-making to investigate, not labels for guilt.
- 'src/people-model.cjs': fail-closed compiler and privacy safety.
- 'docs/people-register.json' / 'docs/people-register-data.js': **generated**, never edit by hand.
- 'docs/people.html': user-facing matrix and evidence/counsel research explorer.

## What a sourced officer record does and does not say

Data fields are public-issuer corporate roles and SEC **Summary Compensation Table** totals for fiscal 2025, not actual cash received, holdings, wealth, environmental gains or damage caused. Stock awards may be based on grant-date accounting rather than realized sale proceeds. Comparing compensation across regimes or years requires explicit normalization and source review. The current built-in comparison is limited to 2025 U.S.-dollar SEC totals.

A public executive's position in an emissions-intensive producer does not establish personal participation in a toxic release, negligence, knowledge of wrongdoing, culpability, a legally recoverable injury, or availability of a class action. Company-level climate inventories cannot be assigned to named officers as personal emissions or harms.

## How to add a public officer

1. Select one of the fifty source-company IDs from 'docs/people-register.json'. Do not assume similar company names represent the same legal entity.
2. Check a **primary published regulatory filing or corporate governance record**. Confirm exact spelling of the legal person, title and reporting period. Source citation must include an accessible exact URL, document publication/filing date, and table/page.
3. Confirm effective role dates using the actual source. If only a month is stated, **do not invent a first-of-month date**. Leave 'role_start' null and describe the scope.
4. For U.S. issuer compensation records, transcribe the exact **2025 SEC Summary Compensation Table total** in USD and explain its accounting method. Do not substitute salary, grant target, net worth, realized pay, pension balances or unsupported estimated holdings.
5. Map only to a relevant vacant research role. A role correspondence is for filtering, not proof of site authority. If no role fits, expand the source model through documented review instead of mislabeling.
6. Never add private emails, phone numbers, home addresses, family relations, medical information, claimant information or confidential allegations.
7. Set personal harm, environmental profit and liability fields to **null/not estimated**. Their release requires an entirely separate scientifically and legally reviewed evidence process; the present public ledger does not support them.
8. Run 'node scripts/build-foundation.cjs' and 'node --test scripts/people.test.cjs' and inspect the diff. A source correction must update the fact, citation and effective date together.

## International expansion

Non-U.S. officer registers have different naming, legal, governance and accounting systems; **the compiler currently validates only the SEC-based 2025 compensation subset**. Do not force a non-U.S. salary into its USD totals or treat it as if SEC rules apply. The ten blank roles remain available until a separate licensed, reviewable jurisdiction-specific disclosure model is implemented.

The public source-research issue form lets contributors suggest a documentary officer link without committing an assertion. A legal accusation, if ever appropriate, must be independently reviewed, jurisdiction-specific and separate from this public data service.
