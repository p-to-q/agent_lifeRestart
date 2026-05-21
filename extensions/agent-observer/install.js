import { ObserverState } from './state.js';
import { PARAM_MAP } from './ir.js';
import { IMPRESSION_KEYS, RISK_KEYS } from './score.js';
import { PANEL_CSS } from './panel.css.js';

const PARAM_ORDER = ['CHR', 'INT', 'STR', 'MNY', 'SPR'];

function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
}

function injectCss() {
    if (document.getElementById('agent-observer-style')) return;
    const style = document.createElement('style');
    style.id = 'agent-observer-style';
    style.textContent = PANEL_CSS;
    document.head.appendChild(style);
}

async function copyText(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'readonly');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function downloadText(filename, text, type = 'application/json') {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

function emitObserverEvent(name, detail) {
    if (typeof $$event === 'function') $$event(name, detail);
}

function bar(labelZh, labelEn, value, max, kind) {
    const row = el('div', 'ad-bar');
    const head = el('div', 'ad-bar-head');
    head.appendChild(el('span', 'ad-bar-name', labelZh));
    head.appendChild(el('span', 'ad-bar-en', labelEn));
    head.appendChild(el('span', 'ad-bar-val', `${value}`));
    const track = el('div', 'ad-track');
    const fill = el('div', `ad-fill ad-${kind || 'param'}`);
    const pct = Math.max(0, Math.min(100, (Number(value) / max) * 100));
    fill.style.width = `${Number.isFinite(pct) ? pct : 0}%`;
    track.appendChild(fill);
    row.appendChild(head);
    row.appendChild(track);
    return row;
}

class ObserverPanel {
    constructor(core) {
        this.core = core;
        this.state = new ObserverState();
        this.open = window.innerWidth > 900;
        this.notice = '';
        this.activeTab = 'observe';
        this.build();
        this.render();
    }

    build() {
        injectCss();
        const toggle = el('button', 'ad-toggle', '观测台');
        toggle.title = 'Agent Observer';
        toggle.addEventListener('click', () => {
            this.open = !this.open;
            this.root.classList.toggle('ad-collapsed', !this.open);
            toggle.classList.toggle('ad-toggle-on', this.open);
        });
        document.body.appendChild(toggle);
        this.toggleBtn = toggle;

        const root = el('aside', 'ad-root');
        if (!this.open) root.classList.add('ad-collapsed');

        const header = el('div', 'ad-header');
        header.appendChild(el('div', 'ad-title', '小模型观测台'));
        header.appendChild(el('div', 'ad-sub', '左边玩人生，右边看它怎么长歪'));
        root.appendChild(header);

        this.body = el('div', 'ad-body');
        root.appendChild(this.body);

        document.body.appendChild(root);
        this.root = root;
        toggle.classList.toggle('ad-toggle-on', this.open);
    }

    section(title) {
        const section = el('section', 'ad-section');
        section.appendChild(el('h3', 'ad-h3', title));
        const body = el('div', 'ad-sec-body');
        section.appendChild(body);
        this.body.appendChild(section);
        return body;
    }

    tabs() {
        const tabs = el('div', 'ad-tabs');
        const items = [
            ['observe', '观测'],
            ['write', '写作'],
            ['timeline', '时间线'],
        ];
        for (const [key, label] of items) {
            const btn = el('button', key === this.activeTab ? 'ad-tab ad-tab-on' : 'ad-tab', label);
            btn.addEventListener('click', () => {
                this.activeTab = key;
                this.render();
            });
            tabs.appendChild(btn);
        }
        this.body.appendChild(tabs);
    }

    kv(key, value) {
        const box = el('div', 'ad-kv');
        box.appendChild(el('span', 'ad-kv-k', key));
        box.appendChild(el('span', 'ad-kv-v', value));
        return box;
    }

    button(label, title, onClick) {
        const btn = el('button', 'ad-btn', label);
        btn.title = title;
        btn.addEventListener('click', async () => {
            try {
                await onClick();
                this.notice = `${label}成功`;
            } catch (error) {
                console.error('[agent-observer] action failed:', error);
                this.notice = `${label}失败`;
            }
            this.render();
        });
        return btn;
    }

    saveCandidate() {
        const candidate = this.state.saveContentCandidate();
        emitObserverEvent('agent-candidate-saved', {
            candidate,
            basket: this.state.candidateBasketExport(),
        });
        return candidate;
    }

    clearBasket() {
        this.state.clearCandidateBasket();
        emitObserverEvent('agent-candidate-basket-cleared', {
            basket: this.state.candidateBasketExport(),
        });
    }

    downloadBasket() {
        const basket = this.state.candidateBasketExport();
        const stamp = basket.exportedAt.replace(/[:.]/g, '-');
        downloadText(`agent-candidate-basket-${stamp}.json`, JSON.stringify(basket, null, 2));
        emitObserverEvent('agent-candidate-basket-downloaded', { basket });
    }

    render() {
        this.body.innerHTML = '';
        this.tabs();
        if (this.notice) this.body.appendChild(el('div', 'ad-notice ad-notice-top', this.notice));
        if (this.activeTab === 'write') {
            this.renderWrite();
            return;
        }
        if (this.activeTab === 'timeline') {
            this.renderTimeline();
            return;
        }
        this.renderObserve();
    }

    renderObserve() {
        const state = this.state;
        const latest = state.latest;

        const vitals = this.section('生命体征');
        const vitalGrid = el('div', 'ad-vitals');
        vitalGrid.appendChild(this.kv('年龄', latest ? `${latest.age}` : '—'));
        vitalGrid.appendChild(this.kv('阶段', latest ? latest.stage : '未出生'));
        vitalGrid.appendChild(this.kv('状态', state.ended ? '已归档' : (latest ? '运行中' : '待启动')));
        vitals.appendChild(vitalGrid);
        vitals.appendChild(el('div', 'ad-share', state.shareLine()));

        const params = this.section('参数面板（中文优先 / 英文对照）');
        const stats = latest ? latest.coreStats : {};
        const max = Math.max(12, ...PARAM_ORDER.map(key => Math.abs(stats[key] ?? 0)));
        for (const key of PARAM_ORDER) {
            const config = PARAM_MAP[key];
            params.appendChild(bar(config.zh, `${config.en} · ${config.vibe}`, stats[key] ?? 0, max, 'param'));
        }

        const impression = this.section('印象值（外界怎么看它）');
        const grid = el('div', 'ad-grid');
        for (const key of IMPRESSION_KEYS) {
            const chip = el('div', 'ad-chip');
            chip.appendChild(el('span', 'ad-chip-k', key));
            chip.appendChild(el('span', 'ad-chip-v', `${state.scores.impression[key] || 0}`));
            grid.appendChild(chip);
        }
        impression.appendChild(grid);

        const risks = this.section('风险灯');
        for (const key of RISK_KEYS) {
            const value = state.scores.risk[key] || 0;
            risks.appendChild(bar(key, value >= 6 ? '高' : value >= 3 ? '中' : '低', value, 12, 'risk'));
        }

        const routes = this.section('路线倾向');
        const routeList = state.routes();
        if (!routeList.length) {
            routes.appendChild(el('div', 'ad-empty', '还看不出走向，再活几年。'));
        } else {
            for (const route of routeList) {
                routes.appendChild(bar(route.name, `${route.pct}%`, route.pct, 100, 'route'));
            }
        }
    }

    renderWrite() {
        const state = this.state;
        const writing = this.section('写作素材');
        writing.appendChild(el('div', 'ad-share', state.writerHint()));
        const actions = el('div', 'ad-actions');
        actions.appendChild(this.button('复制分享语', '复制当前这一局的群聊分享文案', () => copyText(state.shareLine())));
        actions.appendChild(this.button('复制候选 JSON', '复制可进入共创池的结构化候选素材', () => copyText(state.contentCandidateText())));
        actions.appendChild(this.button('存入候选篮', '把当前候选素材存入本地候选篮', () => this.saveCandidate()));
        actions.appendChild(this.button('复制候选篮', '复制本地候选篮里的整包 JSON', () => copyText(state.candidateBasketText())));
        writing.appendChild(actions);

        const basket = this.section('候选篮');
        const basketHeader = el('div', 'ad-basket');
        basketHeader.appendChild(el('span', 'ad-basket-count', `已保存 ${state.candidateBasket.length} 条候选素材`));
        basketHeader.appendChild(this.button('下载', '下载本地候选篮 JSON 文件', () => this.downloadBasket()));
        basketHeader.appendChild(this.button('清空', '清空本地候选篮', () => this.clearBasket()));
        basket.appendChild(basketHeader);

        const preview = el('div', 'ad-candidate-list');
        const candidates = state.candidateBasket.slice(-5).reverse();
        if (!candidates.length) {
            preview.appendChild(el('div', 'ad-empty', '候选篮还是空的。玩到有意思的一年，就点“存入候选篮”。'));
        }
        for (const candidate of candidates) {
            const item = el('div', 'ad-candidate');
            item.appendChild(el('div', 'ad-candidate-title', candidate.route || '未命名路线'));
            item.appendChild(el('div', 'ad-candidate-meta', `${candidate.kind} · ${candidate.stage} · ${candidate.age ?? '—'} 岁`));
            item.appendChild(el('div', 'ad-candidate-text', candidate.latestEvent || candidate.writingHint));
            preview.appendChild(item);
        }
        basket.appendChild(preview);
    }

    renderTimeline() {
        const state = this.state;
        const timeline = this.section(`事件时间线（${state.timeline.length}）`);
        const list = el('div', 'ad-timeline');
        const recent = state.timeline.slice(-40).reverse();
        if (!recent.length) {
            list.appendChild(el('div', 'ad-empty', '开始一局新人生后，这里会逐年记录。'));
        }
        for (const row of recent) {
            const item = el('div', 'ad-tl-item');
            item.appendChild(el('div', 'ad-tl-age', `${row.age}`));
            const main = el('div', 'ad-tl-main');
            for (const event of row.rawEvents) {
                const line = el(
                    'div',
                    event.type === 'TLT' ? 'ad-tl-tlt' : 'ad-tl-evt',
                    event.type === 'TLT' ? `天赋【${event.name}】${event.description}` : event.description,
                );
                main.appendChild(line);
            }
            if (row.tags.length) {
                const tags = el('div', 'ad-tags');
                for (const tag of row.tags) tags.appendChild(el('span', 'ad-tag', tag));
                main.appendChild(tags);
            }
            item.appendChild(main);
            list.appendChild(item);
        }
        timeline.appendChild(list);
    }
}

export function installAgentObserver({ core }) {
    if (!core || core.__agentObserverInstalled) return;
    core.__agentObserverInstalled = true;

    let panel;
    try {
        panel = new ObserverPanel(core);
        globalThis.__agentObserver = panel;
    } catch (error) {
        console.error('[agent-observer] init failed (game unaffected):', error);
        return;
    }

    const originalStart = core.start.bind(core);
    core.start = (...args) => {
        const result = originalStart(...args);
        try {
            panel.state.reset();
            panel.render();
            $$event('agent-life-reset', { runId: panel.state.runId });
        } catch (error) {
            console.error('[agent-observer] reset hook failed (game unaffected):', error);
        }
        return result;
    };

    const originalNext = core.next.bind(core);
    core.next = (...args) => {
        const step = originalNext(...args);
        try {
            const properties = core.propertys;
            const ir = panel.state.addStep(step, properties);
            if (step && step.isEnd) {
                try {
                    panel.state.setSummary(core.summary);
                } catch {
                    // Summary is optional for the observer.
                }
            }
            panel.render();
            $$event('agent-life-step', {
                step,
                ir,
                properties,
                writingHint: panel.state.writerHint(),
                contentCandidate: panel.state.contentCandidate(),
                summary: step && step.isEnd ? panel.state.summary : null,
                timestamp: Date.now(),
            });
        } catch (error) {
            console.error('[agent-observer] step hook failed (game unaffected):', error);
        }
        return step;
    };
}
