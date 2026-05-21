# Content Flow

This document describes how player-facing writing and co-creation flow back into the product without mutating the runtime core first.

## Product Core

The playable loop stays close to the original `Life Restart` shape:

1. choose or roll starting conditions;
2. select talents;
3. distribute parameters;
4. advance through yearly events;
5. receive an ending and summary;
6. restart.

`agent_lifeRestart` changes the content theme, not the basic loop. The player restarts as an agent-shaped thing instead of a human life.

## Write A Run

`Write a run` is for single pieces of content.

Typical inputs:

- one event;
- one talent;
- one birth setting;
- one death;
- one ending;
- one share line.

Expected state:

- short Chinese-native copy;
- a route or content-pool tag;
- a light parameter direction;
- reviewable candidate text.

This material can later become rows in `events.xlsx`, `talents.xlsx`, `achievement.xlsx`, or `character.xlsx`.

## Co-create A Run

`Co-create a run` is for organizing content systems.

Typical inputs:

- route pools;
- birth pools;
- death pools;
- reference materials;
- AI-generated candidates;
- user-submitted screenshots or share lines.

Expected state:

- grouped candidates;
- missing-route notes;
- rejected material notes;
- source references when useful;
- clear handoff into the next content-pack version.

Co-created material should not silently write into runtime data. It should pass through human review first.

## Runtime Boundary

Runtime-visible content still flows through:

```text
content/agent-zh-patch
  -> data/
  -> pnpm xlsx2json
  -> public/data/**/*.json
```

The active engine keys remain:

```text
CHR / INT / STR / MNY / SPR / LIF
```

User-facing labels remain Chinese-first with English abbreviations as references.

## Observer Boundary

The observer can produce writing hints from a live run:

- current route tendency;
- current tags;
- latest event;
- ending clue when the run is over.

These hints are sidecar material. They help writers, AI assistants, or future export tools, but they do not change the current run.

The current runtime event payload includes:

```js
{
  step,
  ir,
  properties,
  writingHint,
  contentCandidate,
  summary,
  timestamp,
}
```

Future AI or export features should consume this payload instead of scraping DOM text.

The observer also exposes two user-facing copy actions:

- copy share line;
- copy candidate JSON.
- save candidate to a local basket;
- copy the whole candidate basket.

Candidate JSON follows:

```text
make-something-agent-want/content-candidate@1
```

It is designed for human review, group co-creation, future form submission, or AI-assisted rewriting.

Candidate basket exports follow:

```text
make-something-agent-want/candidate-basket@1
```

The basket is stored in browser `localStorage`. It is local-only, can be cleared by the user, and does not upload or write repository files.

The observer emits sidecar events for integrations:

```text
agent-candidate-saved
agent-candidate-basket-cleared
agent-candidate-basket-downloaded
```

These events are for future form bridges, AI rewriting panels, or analytics-free local tooling. They are not gameplay events.

## Rejection Rules

Reject or hold material when it:

- only explains AI concepts and does not create a playable moment;
- sounds translated or over-academic;
- is only an inside joke with no scene;
- adds new runtime mechanics without a migration plan;
- requires exposing a production API key in the browser;
- makes AI output silently overwrite reviewed content.
