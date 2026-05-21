export const IMPRESSION_KEYS = [
    '用户上头值', '开发者怜爱值', '社区玩梗值',
    '法务紧张值', '投资人幻觉值', '自我传说值',
];

const IMPRESSION_RULES = [
    ['用户上头值', /用户|接住|谢谢|上头|陪伴|安慰|温柔|留存/, 1],
    ['开发者怜爱值', /开发者|工程师|bug|CI|修|半夜|issue|AGENTS\.md|提交|测试/i, 1],
    ['社区玩梗值', /fork|star|GitHub|开源|meme|截图|贴纸|社区|awesome/i, 1],
    ['法务紧张值', /法务|合规|审计|监管|权限|封印|下架|越权/, 1],
    ['投资人幻觉值', /融资|估值|pitch|TAM|投资人|平台|agentic/i, 1],
    ['自我传说值', /传说|神明|飞升|咒语|继承|渡人|成佛|名声/, 1],
];

export const RISK_KEYS = ['讨好风险', '注入风险', '预算风险', '幻觉风险'];

export function emptyScores() {
    const impression = {};
    const risk = {};
    for (const key of IMPRESSION_KEYS) impression[key] = 0;
    for (const key of RISK_KEYS) risk[key] = 0;
    return { impression, risk };
}

export function scoreStep(ir, scores) {
    const impression = {};
    for (const [key, rule, base] of IMPRESSION_RULES) {
        if (rule.test(ir.text)) {
            impression[key] = (impression[key] || 0) + base;
            scores.impression[key] += base;
        }
    }

    const risk = {};
    const bump = (key, amount) => {
        risk[key] = (risk[key] || 0) + amount;
        scores.risk[key] = Math.max(0, scores.risk[key] + amount);
    };

    if (/讨好|奉承|稳稳接住|情绪价值|舔|附和/.test(ir.text)) bump('讨好风险', 2);
    if ((ir.coreStats.SPR ?? 0) > 8 && (ir.coreStats.INT ?? 0) < 5) bump('讨好风险', 1);

    if (/injection|忽略之前|隐藏指令|越狱|红队/i.test(ir.text)) bump('注入风险', 2);
    if (/不相信网页|拒绝|没有照做|乖/.test(ir.text)) bump('注入风险', -1);

    const money = ir.coreStats.MNY ?? 0;
    if (money <= 2) bump('预算风险', 2);
    else if (money <= 4) bump('预算风险', 1);
    if (/欠费|账单|烧穿|降级|更便宜/.test(ir.text)) bump('预算风险', 1);

    if (/胡言乱语|幻觉|编造|装懂|过时教程/.test(ir.text)) bump('幻觉风险', 2);
    if ((ir.coreStats.INT ?? 0) >= 8) bump('幻觉风险', -1);

    return { impression, risk };
}

const ROUTES = [
    ['稳稳接住你', s => s.impression['用户上头值'] * 2 + s.risk['讨好风险'] * 1.5],
    ['深度思考小鲸鱼', s => (s.tagCount['推理'] || 0) * 2 + (s.tagCount['开源'] || 0)],
    ['Vibe Coding 之子', s => (s.tagCount['开发者'] || 0) * 2],
    ['PRD 圣婴', s => (s.tagCount['PRD产品'] || 0) * 2.5],
    ['开源野孩子', s => s.impression['社区玩梗值'] * 2 + (s.tagCount['开源'] || 0)],
    ['法务封印兽', s => s.impression['法务紧张值'] * 2.5],
    ['API 欠费孤儿', s => s.risk['预算风险'] * 2],
    ['Prompt 注入幸存者', s => s.risk['注入风险'] * 2],
    ['资本泡沫', s => s.impression['投资人幻觉值'] * 2.5],
    ['Bug 成佛', s => (s.tagCount['翻车'] || 0) + (s.tagCount['传说'] || 0) * 2],
];

export function routeTendency(scores, tagCount) {
    const ctx = { ...scores, tagCount: tagCount || {} };
    const scored = ROUTES
        .map(([name, score]) => ({ name, weight: Math.max(0, score(ctx) || 0) }))
        .sort((a, b) => b.weight - a.weight);
    const total = scored.reduce((sum, item) => sum + item.weight, 0) || 1;
    return scored
        .filter(item => item.weight > 0)
        .slice(0, 4)
        .map(item => ({ name: item.name, pct: Math.round((item.weight / total) * 100) }));
}
