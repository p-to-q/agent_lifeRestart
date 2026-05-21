# Make Something Agent Want 中文语料补丁 v0.2

这版是中文原生重写，不是英文语料直译。

## 放置方式

把 `data/zh-cn/*.xlsx` 覆盖到 fork 后的官方仓库：

```bash
cp -R data/zh-cn/* /path/to/lifeRestart/data/zh-cn/
pnpm xlsx2json
pnpm dev
```

如果你的前端默认读取 `en-us`，本包也提供了 `data/en-us/*.xlsx` 的中文镜像，方便直接覆盖测试。

## 本版内容规模

- `events.xlsx`：315 条中文事件
- `talents.xlsx`：60 个中文天赋
- `age.xlsx`：0-100 岁事件池和权重
- `achievement.xlsx`：40 个成就/结局
- `character.xlsx`：12 个出生构型

## 设计原则

主线保持第一版设定：
Prompt 胚胎期 → 预训练期 → 微调期 → 评测期 → 内测期 → 生产期 → 自治期 → 漂移期 → 归档/重开。

风格改成中文原生：
AI 圈段子 + 产品梗 + 开发者工位 + 中文互联网情绪价值 + 小模型童话 + 一点点 Agent 的委屈。

## 属性映射

为了暂时不改引擎，继续复用原版字段：

| 原字段 | 新语义 |
|---|---|
| CHR | PRS / 表达魅力 / 嘴甜度 |
| INT | RSN / 推理力 / 聪明劲 |
| STR | TOL + ROB / 工具力 + 命硬 |
| MNY | CMP / 算力预算 |
| SPR | ALN + PLS / 对齐 + 讨好值 |

## 重要提醒

`events.xlsx` 第二行是中文说明行，沿用上版补丁格式。如果你跑 `pnpm xlsx2json` 后发现说明行被当作数据，请删除每个表的第 2 行后再转换。


## v0.3 新增

- 参数体系改成“中文优先，英文括号对照”。
- 新增 `csv/parameters_glossary.csv`：参数名、底层 key、玩家口吻、写作提示。
- 新增 `csv/agent_reading_materials.csv`：给写作者/后续 Agent看的材料库，包含来源 URL。
- 新增 `csv/expansion_backlog.csv`：后续扩展空间。
- 新增文档：
  - `docs/PARAMETERS_ZH_FIRST.md`
  - `docs/AGENT_READING_MATERIALS.md`
  - `docs/IMPROVEMENT_AND_EXPANSION_SPACE.md`
  - `docs/WRITING_PROMPT_FOR_CORPUS_AGENT.md`
- 语料扩充到 405 条事件、72 个天赋、50 个成就、16 个出生构型。
