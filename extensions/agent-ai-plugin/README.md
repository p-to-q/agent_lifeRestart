# Agent AI Plugin

The Agent AI Plugin is the left-side AI entry for `agent_lifeRestart`.

It is separate from the right-side observer:

- the observer watches local signals, route tendency, risk lights, and timelines;
- the AI plugin generates narration, recap, and reviewable candidate material;
- neither layer mutates the authoritative game state.

## Current Modes

- `旁白`: generate one short Chinese-native narration for the current run segment.
- `复盘`: generate a stage recap, and later a stronger ending recap after completion.
- `分享`: generate one screenshot-friendly share line.
- `属性`: explain current stat changes in human language.
- `支线`: generate a lightweight side-branch card that does not enter the main runtime.
- `候选`: generate candidate events, deaths, endings, or share lines for human review.

## Runtime Contract

- The plugin listens to `agent-life-reset` and `agent-life-step`.
- It reads the existing Agent life IR emitted by the observer hook.
- It calls `/api/agent-plugin` for model work.
- API keys must stay server-side. The browser only sees the local endpoint.

## Disable

Use `?ai=off` to start without the AI plugin.
