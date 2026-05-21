# Contributing

This repository is intentionally lightweight: small changes, clear receipts, and no hidden process.

## Before You Change Code

- Read `README.md` for the project shape.
- Read `docs/ARCHITECTURE.md` if your change touches core, content, or extensions.
- Read `docs/REVIEW_GATES.md` for the hacker, engineer, and researcher checks.

## Expected Workflow

1. Keep changes scoped to one surface: core, content, extension, UI, or docs.
2. Record durable product or architecture decisions in `docs/DECISIONS.md`.
3. Run `pnpm verify` before opening or merging a PR.

## Content Changes

Author content under `content/agent-zh-patch`.
Sync into `data/` only when the pack is ready to ship.

## Extension Changes

Extensions should be optional and fail soft.
They should not own gameplay state unless a decision explicitly promotes that behavior into core.
