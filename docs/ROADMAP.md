# Roadmap

## Now

- Make the public entry explain the product in one breath: an AI-era `Life Restart` about a tiny agent being born, shipped, loved, over-scoped, patched, forked, or forgotten.
- Give users a simple feature menu: play a run, watch a run, write a run, co-create a run.
- Keep the right-side observer panel as a player-facing companion, not an internal dashboard.
- Route content contributions into clear pools: births, events, talents, deaths, routes, and endings.

## P0: Product Surface

- Maintain the feature menu as the user-facing map.
- Keep frontstage CTAs, banners, GitHub links, and intro copy pointed at `agent_lifeRestart`.
- Keep upstream attribution in Credits, NOTICE, and docs instead of the main player CTA.
- Keep the route, birth, and death pools as the main content entry.
- Make observer docs explain observation mode, writer mode, and experiment mode.
- Keep README focused on what users can play, watch, write, and co-create.

## P1: Share And AI Assistance

- Add ending screenshot cards and short share copy.
- Add exportable candidate events for human review.
- Add playful stage narration and run commentary in the observer.
- Add AI-generated epitaphs, share lines, and route suggestions as reviewable material.
- Add the left-side AI plugin for narration, stage recap, and candidate generation through a server-side API proxy.

## P2: Deeper Runtime Experiments

- Add structured AI side branches only after schema checks and fallback behavior exist.
- Let shadow scores influence events only after an explicit scoring migration.
- Promote the score patch into core only when `CHR / INT / STR / MNY / SPR / LIF` compatibility is intentionally handled.

## Content Track

- Expand the Chinese corpus through route pools instead of one-off events.
- Grow the strongest routes first: 稳稳接住你, DeepSeek 小鲸鱼, Vibe Coding 之子, 开源野孩子, 法务封印兽, API 欠费孤儿, Bug 成佛.
- Keep the parameter language Chinese-first with English abbreviations as references.
- Add version notes so runtime data, content pack material, and source spreadsheets can evolve independently.

## AI Expansion Track

Future AI work should start as extension-layer capabilities, not core mutations.

Planned directions:

- stage narration and playful run commentary;
- share-line and epitaph generation;
- candidate event generation from source materials;
- exportable candidate rows for human review;
- optional analysis overlays for routes, risks, and impressions.
- stronger post-clear AI mode after one full run, while keeping the base game playable without AI.

AI outputs should be reviewable material first. They should not silently write into runtime data.

## Engineering Stability

- Preserve the original data-driven core while the product surface changes.
- Keep `CHR / INT / STR / MNY / SPR / LIF` as engine keys until a deeper score migration is explicitly planned.
- Keep observer and AI-adjacent work in extension layers before promoting behavior into core.
- Maintain `pnpm verify` as the basic confidence check.

## Guardrails

- AI features should not be required for the base game loop.
- Content generation should produce reviewable candidates, not silent direct writes into runtime data.
- Product UI should stay coherent with the life-sim experience rather than becoming a developer dashboard first.
