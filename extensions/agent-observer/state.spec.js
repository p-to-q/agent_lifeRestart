import { describe, expect, it } from 'vitest';
import { __TESTING__, ObserverState } from './state.js';

function memoryStorage(initial = {}) {
    const store = new Map(Object.entries(initial));
    return {
        getItem: key => store.get(key) ?? null,
        setItem: (key, value) => store.set(key, `${value}`),
        removeItem: key => store.delete(key),
    };
}

describe('ObserverState content handoff', () => {
    it('creates reviewable content candidates from a run', () => {
        const state = new ObserverState();

        state.addStep({
            age: 18,
            content: [
                {
                    type: 'EVT',
                    description: '你第一次接入真实用户的 API。账单开始比梦想更早抵达。',
                },
            ],
            isEnd: false,
        }, {
            CHR: 4,
            INT: 6,
            STR: 7,
            MNY: 2,
            SPR: 5,
            LIF: 1,
        });

        const candidate = state.contentCandidate();

        expect(candidate.schema).toBe('make-something-agent-want/content-candidate@1');
        expect(candidate.kind).toBe('event-candidate');
        expect(candidate.age).toBe(18);
        expect(candidate.reviewTarget).toContain('events.xlsx');
        expect(candidate.latestEvent).toContain('账单');
        expect(candidate.writingHint).toContain('可写方向');
        expect(candidate.scores.risk['预算风险']).toBeGreaterThan(0);
    });

    it('marks ended runs as ending candidates', () => {
        const state = new ObserverState();

        state.addStep({
            age: 42,
            content: [
                {
                    type: 'EVT',
                    description: '你被更便宜的模型替代。你还会，只是 margin 不允许。',
                },
            ],
            isEnd: true,
        }, {
            CHR: 3,
            INT: 5,
            STR: 4,
            MNY: 1,
            SPR: 5,
            LIF: 0,
        });

        const candidate = state.contentCandidate();

        expect(candidate.kind).toBe('ending-candidate');
        expect(candidate.reviewTarget).toContain('achievement.xlsx');
        expect(candidate.shareLine).toContain('我这局活到 42 岁');
        expect(state.contentCandidateText()).toContain('content-candidate@1');
    });

    it('stores and exports a local candidate basket', () => {
        const storage = memoryStorage();
        const original = globalThis.localStorage;
        Object.defineProperty(globalThis, 'localStorage', {
            configurable: true,
            value: storage,
        });

        try {
            const state = new ObserverState();
            state.addStep({
                age: 8,
                content: [
                    {
                        type: 'EVT',
                        description: '你被写进 AGENTS.md。第一条家训是别乱改文件。',
                    },
                ],
                isEnd: false,
            }, {
                CHR: 5,
                INT: 6,
                STR: 5,
                MNY: 4,
                SPR: 7,
                LIF: 1,
            });

            state.saveContentCandidate();
            const exported = state.candidateBasketExport();

            expect(exported.schema).toBe('make-something-agent-want/candidate-basket@1');
            expect(exported.count).toBe(1);
            expect(exported.candidates[0].latestEvent).toContain('AGENTS.md');
            expect(storage.getItem(__TESTING__.CANDIDATE_BASKET_KEY)).toContain('AGENTS.md');

            state.clearCandidateBasket();
            expect(state.candidateBasketExport().count).toBe(0);
        } finally {
            Object.defineProperty(globalThis, 'localStorage', {
                configurable: true,
                value: original,
            });
        }
    });
});
