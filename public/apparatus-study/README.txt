================================================================================
  THE APPARATUS — VERIFICATION & PROVENANCE STUDY
  Slice: the-wage-monopsony-apparatus (plate viii), versions v01-v05
  Prepared 2026-06-18
================================================================================

This folder is a deep-dive on ONE instrument from the prev-7-days downloads,
chosen to show the full methodology end-to-end on a small, verifiable slice.

CONTENTS
  REPORT.html ........ The study. A self-contained, on-brand report that
                       RE-RUNS the verification live in your browser (it embeds
                       the apparatus's own functions). Open it first.
  FINDINGS.md ........ Plain-text executive summary of everything below.
  verify_model.mjs ... The headless harness: the instrument's verbatim math
                       functions + 7 families of invariant checks + a
                       form-independence test under alternate demand curves.
  verify_output.txt .. Captured output of the harness (60/60 assertions pass).
  changelog_raw.txt .. Machine-extracted per-version semantic deltas (v01-v05).

WHAT WAS DONE
  1. Reverse-engineered the monopsony model from the v05 source.
  2. Executed its OWN code headlessly and checked it is mathematically
     self-consistent: wm/MRP = e/(e+1) to <1e-6, equilibrium residual = 0,
     and the identity is form-independent (holds under 4 demand curves).
  3. Fingerprinted all 5 versions: the math is byte-identical throughout;
     the growth was added explanatory panels, not model changes.
  4. Audited honesty: strong on stylisation/candour; gaps in attribution.

REPRODUCE
  node verify_model.mjs        (Node 18+; no dependencies)
  open REPORT.html             (any modern browser; fonts via Google Fonts)

Nothing outside this folder was modified.
================================================================================
