# Numéraire

*A Periodic Table of Economic Life*

Canonical source repository: [karadzhyan/numeraire](https://github.com/karadzhyan/numeraire).

This repository contains the complete static website, including its distinct editions, essays, instruments, original figures, fonts, PDFs, and reading interfaces. The files in `public/` preserve the existing writing, design, and interactive pieces.

The current edition completes Volume IX, **The Stock**, at twelve of twelve expanded essays. The expanded Utility edition contains **210 completed essays and 102 preparation slots**; its first nine volumes are complete. The separate Collected edition retains all 26 volumes and 312 plates. Earlier editions remain available alongside the expanded essays.

The six completed Stock leaves are The Hoard, The Wearing, The Debt, The Annuity, The Concentration, and The Inheritance. Their colophons identify earlier treatments and distinguish adaptations from developed continuations.

## Read Locally

No build step or package installation is required. From the repository root, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory public
```

Open [the volume atlas](http://127.0.0.1:8000/), [all editions](http://127.0.0.1:8000/editions.html), or [The Stock](http://127.0.0.1:8000/essays/numeraire-ix-the-stock.html).

## Check Local References

```sh
python3 tools/check_site.py
```

The checker uses Python's standard library to verify static local file references in HTML and CSS. It supports explicit `.html` links, directory indexes, and extensionless HTML paths. It does not check external websites, fragment identifiers, or links constructed at runtime. Browser review remains necessary for typography, navigation behavior, search, instruments, and reading progress.

## Hosting

The production destinations are [numeraire.press](https://numeraire.press/) and [thenumeraire.com](https://thenumeraire.com/), with their `www` aliases. Vercel Git integration for this repository is being configured; this README does not establish that the migration or Stock publication has succeeded.

`vercel.json` serves `public/` as a static directory, with clean URLs and no framework, dependency installation, application build, or single-page-app fallback. Preserve existing paths when changing hosting so that prior reading links continue to resolve.

## Repository Layout

- `public/` — the website, including its existing public source-study materials.
- `tools/check_site.py` — the local-reference checker.
- `vercel.json` — static hosting configuration.
- `AGENTS.md` — preservation and validation instructions for contributors.

Private recovery records, account data, release receipts, and credentials belong outside this public repository. This repository starts with fresh Git history; earlier working-directory metadata is not part of the site.
