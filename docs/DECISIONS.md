# Decisions

## D-001 Repository Positioning

This repository is now treated as an independent product, not only a patch fork.

Implication:

- product documentation should describe the current product;
- original project history is preserved as context, not as the default public entry.

## D-002 Core Preservation

`src/modules/*` and `src/functions/*` remain the stable runtime core during this phase.

Implication:

- content and UI cleanup should avoid unnecessary engine rewrites;
- deeper core refactors can happen later behind separate decisions.

## D-003 Extension Boundary

Observer and AI-adjacent work belongs in extension layers first.

Implication:

- right-side console remains optional;
- AI roadmap work should not be merged directly into gameplay logic by default.

## D-004 Deployment Stability

Existing deployment surfaces remain unchanged for now.

Implication:

- `template/public` remains the build output;
- production can continue using the legacy deployment path while internal structure improves.
