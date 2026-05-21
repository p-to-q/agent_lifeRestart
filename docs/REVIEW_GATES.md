# Review Gates

Use these gates to keep the project useful to hackers, engineers, and researchers.

## Hacker Gate

- A new contributor can run the project from the README.
- The product identity is visible without reading patch history.
- Content, extension, and core entrypoints are easy to find.
- `pnpm verify` gives a single health signal.

## Engineer Gate

- `pnpm verify` passes.
- Core, content, and extensions remain separate.
- Extensions can fail soft and do not own gameplay state.
- UI changes remove hidden hacks rather than adding new ones.
- Deployment compatibility with `template/public` is preserved unless a decision records otherwise.

## Researcher Gate

- Parameter semantics and content-pack assumptions are traceable.
- Durable product choices are recorded in `docs/DECISIONS.md`.
- AI features begin as roadmap or extension work, not silent core mutations.
- Content-pack versions are explicit and separate from engine versions.
