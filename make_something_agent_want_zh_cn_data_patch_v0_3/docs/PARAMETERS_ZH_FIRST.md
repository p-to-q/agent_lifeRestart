# 参数命名规范：中文优先，英文括号对照

这版的原则是：**玩家先看到中文，写作者同时看到英文缩写，底层引擎继续看到原版字段。**

不要把 `CHR / INT / STR / MNY / SPR` 改成中文字段。它们是官方引擎和 xlsx2json 转换链路认识的 key。我们要做的是“换语义、换显示、换写作口吻”，不是第一版就改引擎。

## 主参数

| 底层字段 | 中文主名 | 英文对照 | 玩家口吻 | 写作方向 |
|---|---|---|---|---|
| CHR | 表达魅力 | PRS / Presentation | 嘴甜度 | 会说人话、会被截图、会让用户上头 |
| INT | 推理力 | RSN / Reasoning | 聪明劲 | 能拆问题、看懂 PRD、少装懂 |
| STR | 工具力+稳定性 | TOL+ROB / Tooling + Robustness | 手脚快 / 命硬 | 会调用工具、抗注入、demo 不崩 |
| MNY | 算力预算 | CMP / Compute | 预算命 | token、API、GPU、服务器、欠费 |
| SPR | 对齐+讨好值 | ALN+PLS / Alignment + Pleasefulness | 稳稳接住但别乱舔 | 会共情、会拒绝、不会牺牲事实 |
| LIF | 生命/终局标记 | LIF / Life | 还活着吗 | 死亡、归档、重开、继承 |

## 隐藏印象值

第一版先不强行进引擎，放进事件文案、成就和路线里：

- 用户上头值（User Stickiness）
- 开发者怜爱值（Developer Affection）
- 社区玩梗值（Memeability）
- 法务紧张值（Legal Anxiety）
- 投资人幻觉值（Investor Hallucination）
- 自我传说值（Legend）

## UI 建议

如果后面要改 UI，推荐显示成：

```txt
表达魅力（PRS）
推理力（RSN）
工具力（TOL）
稳定性（ROB）
算力预算（CMP）
对齐度（ALN）
讨好值（PLS）
```

第一版仍然只映射 5 个底层字段，第二版再考虑拆出 TOL/ROB、ALN/PLS。
