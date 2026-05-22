# Maintenance

## Working Rules

- Run `pnpm verify` before merging structural, content, extension, or UI changes.
- Treat the gameplay engine and the content pack as separate maintenance surfaces.
- Keep runtime stability ahead of aesthetic experiments.
- Prefer deliberate UI states over removal, masking, or hidden-node hacks.
- Route product-level changes through docs first when they affect identity, onboarding, or extension boundaries.
- Keep old upstream CTAs, old social links, and old donation links out of the player frontstage. Preserve upstream credit through `docs/CREDITS.md`, `NOTICE`, and focused attribution copy.

## Content Updates

- Author source material under `content/agent-zh-patch`.
- Keep the content-pack manifest aligned with shipped corpus changes.
- Use `pnpm build:content-pack-data` after editing content-pack csv sources.
- Sync runtime `data` only when the pack is ready to ship.
- Use `pnpm sync:content-pack` to copy the shipped pack into runtime `data/`.
- After syncing, run `pnpm xlsx2json` and `pnpm verify`.
- Record notable corpus shifts in the content pack notes.

## Extension Updates

- Extensions must be installable from a single bootstrap location.
- Extensions should fail soft and never block the base game.
- If an extension starts shaping product UX, promote it into a documented product surface instead of leaving it as a hidden patch.
