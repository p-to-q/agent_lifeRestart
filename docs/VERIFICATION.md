# Verification

This project is lightweight, but changes should still leave a clear health signal.

## Required Command

```bash
pnpm verify
```

This runs:

- unit tests for core rule behavior;
- production build, including xlsx-to-json conversion;
- structure checks for docs, content packs, and extension boundaries.

## Manual Smoke Checks

Before merging UI or extension changes, run the app locally and check:

- the main game can start a new run;
- `?observer=off` starts without the observer panel;
- `?ai=off` starts without the left-side AI plugin;
- the default and cyber themes can reach talent, property, trajectory, and summary views;
- content changes are reflected only after `pnpm xlsx2json` or `pnpm build`.

## Current Acceptance Bar

- No legacy dashboard plugin path remains in `src/plugins`.
- Observer stays in `extensions/agent-observer`.
- AI plugin stays in `extensions/agent-ai-plugin` and reaches models only through `/api/agent-plugin`.
- Runtime data still builds into `public/data`.
- README, architecture, roadmap, decisions, and maintenance docs stay in sync with product direction.
