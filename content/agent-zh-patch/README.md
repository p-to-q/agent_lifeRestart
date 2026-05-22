# Agent ZH Patch

这是当前中文 Agent 改写内容包。

产品核心仍然对标原版《人生重开模拟器》：选择天赋、分配参数、逐年触发事件、最后得到结局。这个内容包只负责把人生主题改写成 Agent 主题，让玩家重开成一个小模型、小工具、小 demo、小产品功能或小开源项目。

## Purpose

- 把语料写作和引擎开发分开；
- 让写作者先贡献候选内容，不必直接改运行时代码；
- 保留源表、风格规范、路线池、材料库和补丁说明；
- 帮下一版内容知道该往哪里扩，而不是只堆散事件。

## Contents

- `manifest.json`: pack identity, version, runtime target, and engine-key policy
- `csv/`: editable tabular source files
- `data/`: spreadsheet versions of the pack
- `docs/`: writing guides, patch notes, glossary, backlog
- `reference/`: source material spreadsheets used during authoring

## Write A Run

写一局，就是写一条能进入模拟循环的内容。

优先写这些：

- 事件：某一年发生的事；
- 天赋：开局抽到的奇怪优势或缺陷；
- 出生地：这个 Agent 从哪里来；
- 死法：它怎么被砍、被封、被替代、被遗忘；
- 结局：玩完后值得截图的那句话。

推荐格式：

```text
发生了什么。
人类哪里离谱，或者小 Agent 哪里可爱。
参数变化轻轻托住文本，不要抢走故事。
```

## Co-create A Run

共创一局，就是把点子组织成下一版内容包。

优先补这些池子：

- 出生地池；
- 闪光路线池；
- 死法池；
- 结局方向；
- 真实材料和梗来源；
- AI 候选事件和人工审核记录。

共创材料先进入候选池，再决定是否同步到 `events.xlsx`、`talents.xlsx`、`achievement.xlsx` 或 `character.xlsx`。

## Shipping Rule

Changes become runtime-visible only after the relevant data is synced into `data/` and converted through `pnpm xlsx2json`.

Recommended shipping flow:

```bash
pnpm build:content-pack-data
pnpm sync:content-pack
pnpm xlsx2json
pnpm verify
```
