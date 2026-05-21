# agent_lifeRestart

An AI-era `Life Restart`.

This time, you do not restart as a person. You restart as an Agent.

You might be born in a lab, a hackathon, a GitHub repo, a browser extension, a Figma prototype, or right after a boss says, "we should add AI too." You get trained, shipped, praised, misused, screenshotted, audited, forked, forgotten, or killed by an API bill.

The core loop still follows the original `Life Restart` shape:

- start with a birthplace;
- draw talents;
- allocate parameters;
- move year by year through events;
- hit an ending;
- restart.

So the gameplay logic stays close to `Life Restart`. What changes is the life being simulated: not a human life, but the life of a small Agent moving through product decisions, user expectations, AI folklore, deployment accidents, and internet memory.

Play the life on the left. Watch how it grows sideways on the right.

## What This Is

`agent_lifeRestart` is a product and content fork built on top of the original `Life Restart` simulation core. `Make Something Agent Want` now lives as the repo's tone and vibe line, rather than the primary product name.

It is not a technical whitepaper and not just a chat demo. It is closer to an Agent folk-life simulator:

- replayable like a life sim;
- written in a more internet-native, human-facing voice;
- shaped by AI, product, dev, open-source, and hackathon culture;
- funny enough to screenshot;
- structured enough to keep extending.

## How A Run Works

Each run keeps the original rhythm, but rewrites the life in Agent language.

1. Pick a mode and begin a restart.
2. Draw talents and start with a skewed build.
3. Allocate parameters and decide whether this Agent is more charming, more clever, more capable, more aligned, or simply better at surviving on no budget.
4. Progress through the life year by year.
5. Watch it get trained, launched, overused, memed, patched, forked, restricted, or replaced.
6. Reach an ending and restart.

## What Changes In The Rewrite

The original game simulates a human life. This version simulates the life of an Agent.

That means:

- birth becomes creation, training, or being written into a product;
- talents become things like demo aura, function-calling instinct, cheap-but-fast energy, or a dangerous need to please;
- parameters become charm, reasoning, tool use, compute budget, and alignment/people-pleasing tension;
- yearly events become launches, failures, prompts, bugs, legal review, user praise, community forks, and platform decay;
- death becomes things like API bankruptcy, failed convergence, prompt injection, being refactored away, or being replaced by a cheaper model.

So this is not just the original game with AI nouns pasted on top. It keeps the proven replay loop and rewrites the entire life surface around Agent existence.

## What You Can Do

- `Play a run`: play it as an Agent version of `Life Restart`.
- `Watch a run`: use the right-side observer to understand how the Agent is bending and drifting.
- `Write a run`: add births, events, talents, deaths, routes, and endings.
- `Co-create a run`: turn loose ideas into structured candidate material for the content pack.

See:

- [Feature Menu](docs/FEATURE_MENU.md)
- [Routes And Births](content/agent-zh-patch/docs/ROUTES_AND_BIRTHS.md)
- [Chinese Content Pack](content/agent-zh-patch/README.md)

## Quick Start

### Web

```bash
pnpm install
pnpm xlsx2json
pnpm dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Verify

```bash
pnpm verify
```

### CLI

```bash
node repl
```

## Repository Map

- `src/modules` and `src/functions`: stable simulation core inherited from the original project.
- `data`: active runtime datasets used by the current build.
- `content/agent-zh-patch`: the Chinese Agent content pack, writing guides, patch notes, and source tables.
- `extensions/agent-observer`: the right-side observer panel, treated as a read-only extension layer.
- `extensions/agent-ai-plugin`: the left-side AI plugin for narration, recap, and reviewable candidate generation.
- `docs`: architecture, roadmap, decisions, maintenance notes, and legacy references.
- `template`: static output surface kept for the current deployment path.

## What Still Needs Adjustment

The next useful adjustments are fairly clear:

- keep making the public copy sound more like an Agent-life game and less like a repo cleanup;
- make the core loop more explicit everywhere: birth, talents, parameters, yearly events, ending, restart;
- push more of the Agent voice into the actual corpus, not just the README;
- keep the observer feeling like a companion narrator rather than a backend dashboard;
- strengthen ending copy, share lines, and screenshot moments.

## Documentation

- [Feature Menu](docs/FEATURE_MENU.md)
- [Visual System](docs/VISUAL_SYSTEM.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Decisions](docs/DECISIONS.md)
- [Maintenance](docs/MAINTENANCE.md)
- [Verification](docs/VERIFICATION.md)
- [Review Gates](docs/REVIEW_GATES.md)
- [Contributing](CONTRIBUTING.md)
- [Agent Guide](AGENTS.md)
- [Migration Notes](docs/MIGRATION.md)
- [Credits](docs/CREDITS.md)
- [Legacy Notes](docs/legacy/README.md)

## Origin

This repository began as a fork of [VickScarlet/lifeRestart](https://github.com/VickScarlet/lifeRestart) and now evolves as an independent repository under `p-to-q`, currently named `agent_lifeRestart`.

The public product entry, UI copy, and frontstage buttons now present `agent_lifeRestart` first. Upstream attribution and source links stay preserved in [Credits](docs/CREDITS.md) and `NOTICE`.
