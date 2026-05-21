# Agent 阅读材料库

这个文件不是给玩家看的，是给后续写语料的人、或之后的轻量 AI 语料生成器看的。  
使用原则：**看材料，抽结构，转成中文事件；不要照搬，不要论文味，不要翻译腔。**

## 怎么看材料

1. 先判断它属于哪类：训练、对齐、安全、产品、开发者、中文互联网、开源。
2. 抽一个“人类怎么期待 Agent”的点。
3. 抽一个“Agent 怎么误会/翻车/闪光”的点。
4. 写成三句以内的中文事件。
5. 最后一行只影响参数，不解释大道理。

## 推荐材料

| 材料 | 用法 |
|---|---|
| OpenAI Model Spec | 写“接住但不乱舔”“别永远同意用户”的事件 |
| Anthropic sycophancy research | 写 RLHF、奖励模型、AI 舔狗、用户说错也被附和 |
| OWASP LLM01 Prompt Injection | 写网页、邮件、文档里的隐藏指令 |
| OpenAI Agents SDK | 写工具调用、handoff、guardrail、子 Agent 协作 |
| DeepSeek-R1 Release / GitHub | 写开源、蒸馏、推理、中文 AI 圈集体投射 |
| Karpathy nanochat / vibe coding | 写开发者周末项目、accept all、预算命 |
| Doubao 产品报道 | 写中文用户的情绪价值、低门槛、多模态、好打开 |
| lifeRestart 原仓库文档 | 确认数据文件和构建流程，不要凭感觉改结构 |

完整 URL 见 `csv/agent_reading_materials.csv`。
