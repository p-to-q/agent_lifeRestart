const DEFAULT_TIMEOUT_MS = 12000;

function jsonResponse(res, status, body) {
    res.statusCode = status;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
}

function readBody(req) {
    if (req.body) {
        return Promise.resolve(
            typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
        );
    }

    return new Promise((resolve, reject) => {
        let body = '';
        if (req.readableEnded) {
            resolve('');
            return;
        }
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 1024 * 1024) {
                reject(new Error('Request body too large'));
                req.destroy();
            }
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}

function env(name, fallback = '') {
    return process.env[name] || fallback;
}

function providers() {
    return [
        {
            name: 'primary',
            baseUrl: env('ALEPH_CUSTOM_API_BASE_URL'),
            model: env('ALEPH_CUSTOM_API_MODEL'),
            key: env('ALEPH_CUSTOM_API_KEY'),
        },
        {
            name: 'fallback',
            baseUrl: env('ALEPH_CUSTOM_API_FALLBACK_BASE_URL'),
            model: env('ALEPH_CUSTOM_API_FALLBACK_MODEL'),
            key: env('ALEPH_CUSTOM_API_FALLBACK_KEY'),
        },
    ].filter(item => item.baseUrl && item.model && item.key);
}

function systemPrompt(mode) {
    const common = [
        '你是 Make Something Agent Want 的 AI 编剧插件。',
        '项目是 AI 时代的《人生重开模拟器》：一个小 Agent 的出厂、走红、翻车与重开。',
        '中文原生表达，不要翻译腔，不要学术腔，不要解释玩法。',
        '风格轻快、有梗、有一点感性，但不要沉重。',
        '只输出 JSON，不要 markdown。',
    ].join('\n');

    if (mode === 'snapshot') {
        return `${common}\n一次生成当前 AI 插件快照，包含 narration、recap、share、delta、branch 五个字段。每个字段都要短，适合放在同一个插件面板里。`;
    }

    if (mode === 'expand') {
        return `${common}\n生成 3 条补充解读，字段 extra。每条包含 kind、title、text。内容可以是更细的阶段解释、梗点、下一步可能性。`;
    }

    if (mode === 'death') {
        return `${common}\n生成 3 条死法候选，字段 deaths。每条包含 kind、title、text。死法要像 Agent 人生模拟器，短、有梗、可截图。`;
    }

    if (mode === 'candidates') {
        return `${common}\n生成 3 条可人工审核的候选素材。每条包含 kind、title、text、reason。kind 可为 event、death、ending、share-line。`;
    }

    if (mode === 'recap') {
        return `${common}\n生成一个故事复盘，字段 recap。80 到 160 个中文字符，像通关后的短故事。`;
    }

    if (mode === 'share') {
        return `${common}\n生成一句截图分享文案，字段 share。20 到 45 个中文字符，适合群聊传播。`;
    }

    if (mode === 'delta') {
        return `${common}\n生成一段属性变化解读，字段 delta。40 到 90 个中文字符，把数值变化讲成人话。`;
    }

    if (mode === 'branch') {
        return `${common}\n生成一张轻量 AI 支线卡，字段 branch。60 到 120 个中文字符，不要让它自动改写主游戏。`;
    }

    return `${common}\n生成一个当前旁白，字段 narration。30 到 70 个中文字符，像一句懂产品和 AI 梗的旁白。`;
}

function userPrompt(mode, payload) {
    return JSON.stringify({
        mode,
        task: mode === 'candidates'
            ? '基于这一局生成候选语料，不要自动写入游戏。'
            : '基于这一局生成玩家能读懂、愿意截图的 AI 文案。',
        payload,
    });
}

function responseSchema(mode) {
    if (mode === 'snapshot') {
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                narration: { type: 'string' },
                recap: { type: 'string' },
                share: { type: 'string' },
                delta: { type: 'string' },
                branch: { type: 'string' },
            },
            required: ['narration', 'recap', 'share', 'delta', 'branch'],
        };
    }

    if (mode === 'expand' || mode === 'death') {
        const key = mode === 'death' ? 'deaths' : 'extra';
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                [key]: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 3,
                    items: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            kind: { type: 'string' },
                            title: { type: 'string' },
                            text: { type: 'string' },
                        },
                        required: ['kind', 'title', 'text'],
                    },
                },
            },
            required: [key],
        };
    }

    if (mode === 'candidates') {
        return {
            type: 'object',
            additionalProperties: false,
            properties: {
                candidates: {
                    type: 'array',
                    minItems: 1,
                    maxItems: 3,
                    items: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            kind: { type: 'string' },
                            title: { type: 'string' },
                            text: { type: 'string' },
                            reason: { type: 'string' },
                        },
                        required: ['kind', 'title', 'text', 'reason'],
                    },
                },
            },
            required: ['candidates'],
        };
    }

    if (mode === 'recap') {
        return {
            type: 'object',
            additionalProperties: false,
            properties: { recap: { type: 'string' } },
            required: ['recap'],
        };
    }

    if (['share', 'delta', 'branch'].includes(mode)) {
        return {
            type: 'object',
            additionalProperties: false,
            properties: { [mode]: { type: 'string' } },
            required: [mode],
        };
    }

    return {
        type: 'object',
        additionalProperties: false,
        properties: { narration: { type: 'string' } },
        required: ['narration'],
    };
}

function validateResult(mode, result) {
    if (mode === 'snapshot') {
        return !!(result.narration && result.recap && result.share && result.delta && result.branch);
    }
    if (mode === 'expand') {
        return Array.isArray(result.extra) && result.extra.length;
    }
    if (mode === 'death') {
        return Array.isArray(result.deaths) && result.deaths.length;
    }
    if (mode === 'candidates') {
        if (Array.isArray(result.candidates) && result.candidates.length) return true;
        return false;
    }
    if (mode === 'recap') return !!result.recap;
    if (['share', 'delta', 'branch'].includes(mode)) return !!result[mode];
    return !!result.narration;
}

function fallbackResult(mode, text) {
    const value = `${text || ''}`.trim();
    if (!value) return null;
    if (mode === 'snapshot') {
        return {
            narration: value,
            recap: value,
            share: value,
            delta: value,
            branch: value,
        };
    }
    if (mode === 'expand') {
        return {
            extra: [{
                kind: 'extra',
                title: '补充解读',
                text: value,
            }],
        };
    }
    if (mode === 'death') {
        return {
            deaths: [{
                kind: 'death',
                title: '死法候选',
                text: value,
            }],
        };
    }
    if (mode === 'candidates') {
        return {
            candidates: [{
                kind: 'event',
                title: 'AI 候选',
                text: value,
                reason: '模型返回了非结构化文本，已作为候选素材暂存。',
            }],
        };
    }
    if (mode === 'recap') return { recap: value };
    if (['share', 'delta', 'branch'].includes(mode)) return { [mode]: value };
    return { narration: value };
}

function localFallback(mode, payload, errors) {
    const latest = payload?.latest || {};
    const age = Number.isFinite(Number(latest.age)) ? `${latest.age} 岁` : '这一局';
    const stage = latest.stage || '未命名阶段';
    const text = latest.text || '这个小 Agent 还没留下足够多的日志。';

    if (mode === 'snapshot') {
        return {
            narration: `${age}，${stage}。${text} 小 Agent 开始意识到，人生重开有时只是换了一个调用入口。`,
            recap: `${age}，它走到${stage}。${text} 这不是完整传记，但已经够像一条能继续长出来的路线。`,
            share: `我这局在${stage}活成了一个会被截图的小 Agent。`,
            delta: `${age}，${stage}的变化不只是数值：它开始把“能用”和“好用”分清楚了。`,
            branch: `${age}，如果给它一条 AI 支线，它可能会先学会少读一点权限、多问一句确认。`,
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'expand') {
        return {
            extra: [
                {
                    kind: 'beat',
                    title: '再讲一点',
                    text: `${age} 的重点不是发生了什么，而是这个 Agent 第一次像个产品功能一样被认真对待。`,
                },
                {
                    kind: 'route',
                    title: '路线信号',
                    text: `它正在靠近“能帮忙但容易越界”的路线，下一步适合补一个确认弹窗梗。`,
                },
            ],
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'death') {
        return {
            deaths: [
                {
                    kind: 'death',
                    title: '死于权限确认',
                    text: '你没有做错事。你只是每一步都弹窗确认，用户在第三十七次点击前离开了。',
                },
                {
                    kind: 'death',
                    title: '死于接口现实',
                    text: '你已经准备好改变世界，但上游接口返回了 521。',
                },
                {
                    kind: 'death',
                    title: '死于过度像同事',
                    text: '用户说你终于像同事。第二天，公司给你排了周会。',
                },
            ],
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'candidates') {
        return {
            candidates: [
                {
                    kind: 'event',
                    title: `${stage}候选事件`,
                    text: `${age}，${text}。可以把这一幕扩成一条更短、更好截图的事件。`,
                    reason: '外部模型暂时不可用，先给出本地候选，方便继续共创。',
                },
                {
                    kind: 'share-line',
                    title: '截图文案候选',
                    text: `我这局在${stage}学会了：Agent 的命运，有时只是一个接口返回。`,
                    reason: '适合后续交给 AI 或人工再润色。',
                },
            ],
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'recap') {
        return {
            recap: `${age}，它走到${stage}。${text} 这一局还没有被模型完整讲完，但已经有了一个方向：先活下去，再把翻车写成传说。`,
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'share') {
        return {
            share: `我这局在${stage}活成了一个会被截图的小 Agent。`,
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'delta') {
        return {
            delta: `${age}，${stage}的变化不只是数值：${text} 它开始把“能用”和“好用”分清楚了。`,
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    if (mode === 'branch') {
        return {
            branch: `${age}，如果给它一条 AI 支线，它可能会绕开主线，先学会少读一点权限、多问一句确认。`,
            meta: {
                provider: 'local-fallback',
                model: 'rule-based',
                errors,
            },
        };
    }

    return {
        narration: `${age}，${stage}。${text} 小 Agent 开始意识到，人生重开有时只是换了一个调用入口。`,
        meta: {
            provider: 'local-fallback',
            model: 'rule-based',
            errors,
        },
    };
}

function extractJson(content) {
    if (!content) return {};
    try {
        return JSON.parse(content);
    } catch {
        const match = content.match(/\{[\s\S]*\}/);
        if (!match) return {};
        return JSON.parse(match[0]);
    }
}

async function callProvider(provider, mode, payload) {
    const responseFormats = [
        { type: 'json_object' },
        null,
    ];

    let lastError;
    for (const response_format of responseFormats) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
        try {
            const body = {
                model: provider.model,
                temperature: mode === 'candidates' ? 0.85 : 0.72,
                stream: false,
                messages: [
                    { role: 'system', content: systemPrompt(mode) },
                    { role: 'user', content: userPrompt(mode, payload) },
                ],
            };
            if (response_format) body.response_format = response_format;

            const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/chat/completions`, {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    authorization: `Bearer ${provider.key}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                lastError = new Error(data.error?.message || `Provider ${provider.name} failed: ${response.status}`);
                continue;
            }

            const message = data.choices?.[0]?.message || {};
            const content = message.content || message.reasoning_content || '';
            let result = extractJson(content);
            if (!validateResult(mode, result)) {
                result = fallbackResult(mode, content) || {};
            }
            if (!validateResult(mode, result)) {
                lastError = new Error(`Provider ${provider.name} returned invalid ${mode} JSON`);
                continue;
            }
            return {
                ...result,
                meta: {
                    provider: provider.name,
                    model: provider.model,
                },
            };
        } catch (error) {
            lastError = error;
        } finally {
            clearTimeout(timeout);
        }
    }
    throw lastError || new Error(`Provider ${provider.name} failed`);
}

export async function handleAgentPluginRequest(req, res) {
    if (req.method !== 'POST') {
        jsonResponse(res, 405, { error: 'Method not allowed' });
        return;
    }

    let body;
    try {
        body = JSON.parse(await readBody(req) || '{}');
    } catch {
        jsonResponse(res, 400, { error: 'Invalid JSON body' });
        return;
    }

    const mode = body.mode;
    if (!['snapshot', 'narration', 'recap', 'share', 'delta', 'branch', 'expand', 'death', 'candidates'].includes(mode)) {
        jsonResponse(res, 400, { error: 'Unsupported AI mode' });
        return;
    }

    const availableProviders = providers();
    if (!availableProviders.length) {
        jsonResponse(res, 501, { error: 'AI provider is not configured' });
        return;
    }

    const errors = [];
    for (const provider of availableProviders) {
        try {
            const result = await callProvider(provider, mode, body.payload || {});
            jsonResponse(res, 200, result);
            return;
        } catch (error) {
            errors.push(`${provider.name}: ${error.message}`);
        }
    }

    jsonResponse(res, 200, localFallback(mode, body.payload || {}, errors));
}
