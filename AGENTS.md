# Working on Numéraire

The canonical public source repository is `karadzhyan/numeraire`. The complete website lives in `public/`; use that directory as the deployment output.

## Preserve the Edition

- Preserve original prose, typography, illustrations, instruments, and reading interactions. Make changes in the relevant existing edition rather than replacing it with a generic redesign.
- Keep distinct earlier editions available. A similarly titled essay in another edition is not automatically the manuscript for an unfinished expanded slot.
- Preserve planned titles and glosses when completing a volume. Identify adaptations and developed continuations accurately in their colophons.
- Update the affected volume, reading order, catalog, search, and atlas consistently when adding an essay. Keep older URLs working and preserve original bodies when changing navigation.
- Verify material source claims and calculations. Keep private research, account information, credentials, and release receipts outside this public repository.

## Local Work and Validation

Preview from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory public
```

Check static local references:

```sh
python3 tools/check_site.py
```

This check covers local file targets, not fragment identifiers, external websites, or runtime-generated links. Check affected desktop and phone views, fonts, sidenotes, catalog search, atlas navigation, reading sequence, progress, and any changed instrument in a browser. Preserve native screenshot dimensions and actual image encoding when retaining review artifacts outside the repository.

## Deployment and Current Content

The site has no build or runtime dependencies. Keep `vercel.json` configured with `framework: null`, `outputDirectory: "public"`, and `cleanUrls: true`. Do not add a catch-all single-page-app rewrite. Vercel Git integration is being configured; verify actual deployment and domain results before reporting them as complete.

At this repository's initial import, The Stock has twelve expanded essays; the Utility edition has 210 completed essays and 102 preparation slots. The first nine expanded volumes and all 26 Collected volumes are complete. Derive revised counts from the actual edition when subsequent work changes them.
