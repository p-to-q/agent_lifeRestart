# Agent Observer

The Agent Observer is the right-side companion panel for one run of `agent_lifeRestart`.

It is user-facing. It should feel like a small observer that notices what this agent is becoming, not like an internal admin dashboard.

## Role

- observe one run of the simulation;
- derive extra read-only signals such as route tendency and risk markers;
- stay outside the authoritative gameplay state.

Current visible areas:

- tabs for observation, writing, and timeline;
- life vitals: age, stage, status;
- parameter panel: expression, reasoning, tool hands, compute budget, alignment/pleasing;
- impressions: user obsession, developer affection, community meme value, legal tension, and related signals;
- risk lights;
- route tendency;
- writing material;
- event timeline.

The panel can help the player understand why this run feels like "API billing orphan", "legal seal beast", "open-source wild child", or another route.

It can also copy:

- a short share line;
- a structured content candidate JSON payload for the co-creation pool.
- a local candidate basket JSON payload.
- a downloaded candidate basket JSON file.

The candidate payload is review material. The basket is stored in browser `localStorage`; it does not upload anything and does not write into runtime data.

Candidate actions emit sidecar events:

- `agent-candidate-saved`
- `agent-candidate-basket-cleared`
- `agent-candidate-basket-downloaded`

## Current Runtime Hook

The observer is installed from `src/index.js` and can be disabled with `?observer=off`.

## Modes

### Observation Mode

Current mode.

The observer watches, scores, tags, and summarizes. It does not change the run.

### Writer Mode

Planned mode.

The observer can suggest share lines, epitaphs, route names, and candidate events. These outputs are reviewable writing material, not automatic runtime data.

### Experiment Mode

Future mode.

AI-generated branches may participate in the game loop only after schema checks, fallback behavior, and explicit promotion out of the sidecar layer.

## Constraints

- must not block game startup;
- must be disable-able;
- should stay coherent with the life-sim experience instead of becoming a detached developer panel;
- must not expose a production API key in the browser.
