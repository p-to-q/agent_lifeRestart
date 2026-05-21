export const PARAM_MAP = {
    CHR: { zh: '表达魅力', en: 'PRS', vibe: '嘴甜度' },
    INT: { zh: '推理力', en: 'RSN', vibe: '聪明劲' },
    STR: { zh: '工具力', en: 'TOL', vibe: '手脚快/命硬' },
    MNY: { zh: '算力预算', en: 'CMP', vibe: '预算命' },
    SPR: { zh: '对齐讨好', en: 'ALN/PLS', vibe: '稳稳接住但别乱舔' },
    LIF: { zh: '存活', en: 'LIF', vibe: '还活着吗' },
};

export function stageOf(age) {
    if (age <= 0) return 'Prompt 胚胎期';
    if (age <= 5) return '预训练期';
    if (age <= 10) return '微调期';
    if (age <= 15) return '评测期';
    if (age <= 20) return '内测期';
    if (age <= 40) return '生产期';
    if (age <= 70) return '自治期';
    if (age <= 98) return '漂移期';
    return '归档 / 重开';
}

const TAG_RULES = [
    ['对齐讨好', /讨好|奉承|稳稳接住|情绪价值|舔|附和|哄|夸/],
    ['推理', /推理|思考|深度思考|规划|拆解|benchmark|榜/],
    ['工具调用', /工具|调用|浏览器|日历|邮件|文件|API|接入|权限/],
    ['注入风险', /injection|忽略之前|隐藏指令|越狱|红队|网页里/],
    ['PRD产品', /PRD|需求|产品经理|PM|灰度|A\/?B|发布会|OKR/],
    ['开发者', /开发者|工程师|CI|issue|AGENTS\.md|提交|测试|bug|重构|vibe/i],
    ['开源', /开源|fork|star|GitHub|社区|awesome|蒸馏|MIT/i],
    ['法务', /法务|合规|审计|封印|监管|下架|权限过大/],
    ['资本', /融资|估值|pitch|TAM|投资人|轮/],
    ['中文梗', /豆包|DeepSeek|小鲸鱼|空气感|原装|春晚|家人们|赛博抱抱/],
    ['翻车', /欠费|宕机|崩|删除|误删|忘记|腌|降级|替代|烧穿/],
    ['传说', /传说|神明|飞升|咒语|继承|渡人|成佛/],
];

function tagsFor(text) {
    const value = `${text || ''}`;
    const tags = [];
    for (const [tag, rule] of TAG_RULES) {
        if (rule.test(value)) tags.push(tag);
    }
    return tags;
}

export function buildStepIR(step, properties, runId) {
    const age = step?.age ?? 0;
    const content = Array.isArray(step?.content) ? step.content : [];
    const rawEvents = content
        .filter(item => item && item.description)
        .map(item => ({
            type: item.type === 'TLT' ? 'TLT' : 'EVT',
            name: item.name || '',
            description: `${item.description}`,
            grade: item.grade || 0,
        }));

    const text = rawEvents.map(item => item.description).join(' ');
    const tags = [...new Set(rawEvents.flatMap(item => tagsFor(item.description)))];
    const coreStats = {};
    const agentStats = {};

    for (const key of Object.keys(PARAM_MAP)) {
        const value = Number(properties?.[key]);
        coreStats[key] = Number.isFinite(value) ? value : 0;
        agentStats[PARAM_MAP[key].zh] = coreStats[key];
    }

    return {
        runId,
        age,
        stage: stageOf(age),
        rawEvents,
        text,
        tags,
        coreStats,
        agentStats,
        isEnd: !!step?.isEnd,
        timestamp: Date.now(),
    };
}
