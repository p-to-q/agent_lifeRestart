import { buildStepIR } from './ir.js';
import { emptyScores, scoreStep, routeTendency } from './score.js';

const CANDIDATE_BASKET_KEY = 'make-something-agent-want:candidate-basket:v1';

function readStoredCandidates(storage = globalThis.localStorage) {
    if (!storage) return [];
    try {
        const parsed = JSON.parse(storage.getItem(CANDIDATE_BASKET_KEY) || '[]');
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeStoredCandidates(candidates, storage = globalThis.localStorage) {
    if (!storage) return;
    storage.setItem(CANDIDATE_BASKET_KEY, JSON.stringify(candidates));
}

export class ObserverState {
    constructor() {
        this.reset();
    }

    reset() {
        this.runId = `run_${Date.now()}`;
        this.timeline = [];
        this.scores = emptyScores();
        this.tagCount = {};
        this.latest = null;
        this.summary = null;
        this.ended = false;
        this.candidateBasket = readStoredCandidates();
    }

    addStep(step, properties) {
        const ir = buildStepIR(step, properties, this.runId);
        for (const tag of ir.tags) {
            this.tagCount[tag] = (this.tagCount[tag] || 0) + 1;
        }
        ir.deltas = scoreStep(ir, this.scores);
        this.timeline.push(ir);
        this.latest = ir;
        if (ir.isEnd) this.ended = true;
        return ir;
    }

    setSummary(summary) {
        this.summary = summary || null;
    }

    routes() {
        return routeTendency(this.scores, this.tagCount);
    }

    topRouteName() {
        return this.routes()[0]?.name || '还没定型的小路线';
    }

    latestEventText() {
        return this.latest?.rawEvents.slice(-1)[0]?.description || '';
    }

    shareLine() {
        if (!this.latest) return '一个还没出生的小 Agent。';
        const last = this.latestEventText();
        const topRoute = this.topRouteName();
        const route = topRoute === '还没定型的小路线' ? '路线未定' : `走在「${topRoute}」路上`;
        if (this.ended) {
            return `我这局活到 ${this.latest.age} 岁，${route}，最后：${last}`;
        }
        return `我这局现在 ${this.latest.age} 岁，${route}。`;
    }

    writerHint() {
        if (!this.latest) {
            return '开始一局后，这里会把当前人生整理成可写进下一版语料的线索。';
        }

        const route = this.topRouteName();
        const tags = this.latest.tags.slice(0, 3).join('、') || '无明显标签';
        const event = this.latestEventText() || '这一年还没留下像样传说';

        if (this.ended) {
            return `可共创方向：把「${route}」补成结局链。最后一幕是：${event}`;
        }

        return `可写方向：围绕「${route}」补一条事件。当前标签：${tags}。最近一幕：${event}`;
    }

    contentCandidate() {
        const latest = this.latest;
        const recent = this.timeline.slice(-5);

        return {
            schema: 'make-something-agent-want/content-candidate@1',
            kind: this.ended ? 'ending-candidate' : 'event-candidate',
            runId: this.runId,
            age: latest?.age ?? null,
            stage: latest?.stage || '未出生',
            route: this.topRouteName(),
            tags: latest?.tags || [],
            shareLine: this.shareLine(),
            writingHint: this.writerHint(),
            latestEvent: this.latestEventText(),
            recentEvents: recent.flatMap(row => row.rawEvents.map(event => ({
                age: row.age,
                type: event.type,
                name: event.name,
                description: event.description,
            }))),
            scores: {
                impression: { ...this.scores.impression },
                risk: { ...this.scores.risk },
            },
            reviewTarget: this.ended ? 'achievement.xlsx / ending copy' : 'events.xlsx / route pool',
            note: '候选素材仅供人工审核，不直接写入运行时数据。',
        };
    }

    contentCandidateText() {
        return JSON.stringify(this.contentCandidate(), null, 2);
    }

    saveContentCandidate() {
        const candidate = {
            ...this.contentCandidate(),
            savedAt: new Date().toISOString(),
        };
        this.candidateBasket = [
            ...this.candidateBasket,
            candidate,
        ].slice(-50);
        writeStoredCandidates(this.candidateBasket);
        return candidate;
    }

    clearCandidateBasket() {
        this.candidateBasket = [];
        writeStoredCandidates(this.candidateBasket);
    }

    candidateBasketExport() {
        return {
            schema: 'make-something-agent-want/candidate-basket@1',
            exportedAt: new Date().toISOString(),
            count: this.candidateBasket.length,
            candidates: this.candidateBasket,
        };
    }

    candidateBasketText() {
        return JSON.stringify(this.candidateBasketExport(), null, 2);
    }
}

export const __TESTING__ = {
    CANDIDATE_BASKET_KEY,
    readStoredCandidates,
    writeStoredCandidates,
};
