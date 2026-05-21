# Architecture

## Product Shape

This repository is organized around four layers:

1. `core`
   Runtime rules, event execution, talent logic, achievement logic, and dataset loading.
2. `content`
   Human-authored and agent-assisted content packs, glossary material, source spreadsheets, and writing guidance.
3. `extensions`
   Read-only or sidecar features that observe or assist the runtime without owning gameplay state.
4. `docs`
   Product framing, decisions, maintenance rules, and migration notes.

The gameplay loop stays close to the original `Life Restart`: starting conditions, talents, parameters, yearly events, endings, and restart. `agent_lifeRestart` changes the content theme and extension surface first; it does not replace the core simulation loop by default.

## Current Mapping

The repository is not fully relocated yet. During the transition:

- `src/modules` and `src/functions` are the active core.
- `data` remains the active runtime dataset root.
- `content/agent-zh-patch` mirrors the current Chinese rewrite pack and becomes the canonical authoring home.
- `content/agent-zh-patch/manifest.json` records the content pack version and its runtime data target.
- `extensions/agent-observer` documents and fronts the current right-side console.
- `extensions/agent-ai-plugin` fronts the current left-side AI plugin for narration, recap, and reviewable candidate generation.
- `template` remains the public deployment output target.

## Core Rules

- The gameplay core stays data-driven.
- Stable engine keys remain `CHR / INT / STR / MNY / SPR / LIF`.
- Runtime data conversion still flows through `pnpm xlsx2json`.
- Extension layers must not mutate gameplay state unless that behavior is explicitly promoted into core.

## Extension Contract

Extensions should enter through explicit bootstrap points instead of ad hoc UI hacks.

Current rule:

- `src/index.js` owns extension installation.
- Extensions may wrap public runtime methods such as `core.start()` or `core.next()` only if they remain read-only in intent.
- Extensions must be disable-able without breaking the game.
- Extensions may emit sidecar material such as route signals, risk markers, and writing hints.
- Sidecar material should not become authoritative gameplay state unless promoted through a separate decision.
- AI plugins may call server-side model endpoints, but browser code must never contain production API keys.

## Content Flow

Player-facing writing and co-creation flow through [Content Flow](CONTENT_FLOW.md).

Short version:

- `Write a run` creates one reviewable content candidate.
- `Co-create a run` organizes route pools, birth pools, death pools, source materials, and AI candidates.
- Runtime-visible data still moves through `data/` and `pnpm xlsx2json`.
- The observer can provide writing hints, but it does not write content into the game.

## Deployment Compatibility

The build output stays at `template/public` for now.

This keeps:

- the current Vite build working;
- GitHub Pages deployment working;
- Vercel output settings stable during the reorganization.
