# The Apparatus — Verification & Provenance Findings

**Subject:** `the-wage-monopsony-apparatus` (Numéraire · The Wage · plate viii), versions **v01–v05** (2026‑06‑15)
**Prepared:** 2026‑06‑18 · **Method:** headless execution of the instrument's own code + semantic version diffing

---

## Slice & method
One instrument, five downloaded versions. I reverse‑engineered the model from v05, executed its
**verbatim** functions outside the browser (Node), checked seven families of economic invariants,
re‑solved the equilibrium under alternate demand curves, and fingerprinted the mathematical core
across all five versions.

## The model (exactly what the code computes)
| symbol | definition |
|---|---|
| MRP(L) | `2 − L` — firm's labour demand |
| wₛ(L) | `L^(1/ε)` — iso‑elastic inverse supply, elasticity ε, through (1,1) |
| MCL(L) | `wₛ·(1 + 1/ε)` — marginal cost of labour |
| Lₘ | solves `MCL = MRP` (bisection) |
| wₘ | `wₛ(Lₘ)` — monopsony wage |
| μ | `1/(ε+1)` — claimed markdown |
| share | `ε/(ε+1)` — claimed wage share (Pigou) |

Competitive equilibrium is **(L=1, w=1)** for every ε by the (1,1) normalisation.

## Verification — PASS
- **CLI harness** (`verify_model.mjs`): **60 / 60** assertions pass across ε ∈ {1 … 60}.
- **Report** (`REPORT.html`) recomputes **51 / 51** of them live, in‑browser, on load.
- **Headline identity:** the solver's `wₘ / MRP(Lₘ)` equals the closed form `ε/(ε+1)` to **< 10⁻⁶** at
  every elasticity; equilibrium residual `MCL − MRP = 0`.
- **Form‑independence:** the identity holds to 5 dp under **four different MRP curves** (including one
  not through (1,1) and a non‑linear exponential) — so `μ = 1/(ε+1)` is a property of
  **constant‑elasticity supply**, not of the particular demand curve. (Pigou's rate of exploitation.)
- **Comparative statics correct:** μ strictly ↓ in ε; competitive limit ε→∞ ⇒ wₘ = MRP, μ = 0;
  and 0 < Lₘ < 1, wₘ < MRP, wₘ < w_c throughout.

## Provenance — the model never changed
The six core primitives are **byte‑identical across all five versions** (fingerprint `13effcd2`).
The +36% size growth (62.7 → 85.5 KB) was **presentation**, not model revision:

| ver | Δ | what changed |
|---|---|---|
| v01 | 62.7 KB | baseline — 7 panels (dial, equilibrium, gauge, arch, surface, gender wedge, sources) |
| v02 | +11.4 KB | **+ "The Ascent in Fog"** — stochastic search panel · *substantive* |
| v03 | +1.5 KB | copy refinement only · cosmetic |
| v04 | +8.7 KB | **+ "The Flows Beneath the Number"** — ε decomposed into φ/σ flows · *substantive* |
| v05 | +1.2 KB | final copy polish · cosmetic |

**One instrument deepening, not five answers** — the latest version is a near‑superset of all earlier ones.
This is the whole download corpus in miniature: additive presentation over a fixed analytical core.

## Honesty audit
**Where it holds (✓):** models one mechanism honestly (no false precision); *shows* the headline result
rather than asserting it (this audit confirms the code obeys it); epistemically candid — the
unobservable competitive wage is named "a ridge in fog"; the normalisation is disclosed in the coda.

**Where it could answer for itself:** **0 named authorities** (the economics is Robinson 1933 /
Manning's *Monopsony in Motion* / Pigou — none cited); the **ε ≥ 60 sentinel** snaps the markdown to 0%
(a literal ε = 60 still marks wages down ~1.6%); **no explicit "illustrative / not legal advice"** line
(defensible for a teaching plate, but the line should be drawn explicitly).

## Reproduce
```
node verify_model.mjs          # full numeric proof → also saved in verify_output.txt
open REPORT.html               # recomputes the checks in your browser on load
```
*Not legal advice; not a valuation. A stylised model audited on its own terms.*
