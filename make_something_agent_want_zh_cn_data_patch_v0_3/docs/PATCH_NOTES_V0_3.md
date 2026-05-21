# PATCH NOTES v0.3

## 目标

把 v0.2 的中文语料继续扩成更适合落地编辑的版本，重点解决两个问题：

1. 参数是否应该中文优先；
2. 有没有材料能帮助后续 Agent/写作者继续理解这个项目。

## 结论

- 底层字段继续保留 `CHR / INT / STR / MNY / SPR / LIF`，因为官方引擎和 xlsx2json 依赖这些 key。
- 玩家、写作者、UI、文档全部改成中文优先，英文缩写括号对照。
- 新增材料库，作为后续语料生成/润色 Agent 的参考，不作为玩家前台内容。

## 数据规模

- events：405 条
- talents：72 个
- achievement：50 个
- character：16 个
- age：0-100 岁事件池已混入新增事件

## 新增主题

- 中文原生语感
- 空气感 / 原装 / 春晚型踩梗
- 稳稳接住但不乱舔
- Model Spec / sycophancy / prompt injection
- Agents SDK / guardrails / handoff
- DeepSeek-R1 / 开源鲸落
- nanochat / vibe coding / 预算命
- 豆包式好打开
- PRD、AGENTS.md、CI、issue、SRE、工具调用
