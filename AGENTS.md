# Agent Guide

Agents working in this repository should keep the project small, coherent, and reviewable.

## Principles

- Preserve the runnable core.
- Keep content, extensions, and docs separate.
- Prefer one clear change over broad refactors.
- Run `pnpm verify` after structural, content, extension, or UI changes.

## Important Paths

- `src/modules` and `src/functions`: stable game core.
- `content/agent-zh-patch`: content-pack authoring surface.
- `extensions/agent-observer`: optional observer extension.
- `docs/DECISIONS.md`: durable product and architecture choices.

## Do Not

- Reintroduce `src/plugins/agent-dashboard`.
- Hide UI problems with node removal or visual masking as a product strategy.
- Write generated candidates directly into runtime data without review.
