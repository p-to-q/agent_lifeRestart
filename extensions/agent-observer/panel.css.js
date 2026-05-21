export const PANEL_CSS = `
.ad-root{
    --ad-void:#001020;
    --ad-deep:#082030;
    --ad-panel:#103040;
    --ad-panel-hi:#305860;
    --ad-cyan-line:#40a0c8;
    --ad-cyan-core:#30d0d0;
    --ad-cyan-bright:#7df3e6;
    --ad-cyan-soft:#109090;
    --ad-purple:#7b5cff;
    --ad-purple-hi:#d479ff;
    --ad-gold:#ffc16b;
    --ad-risk:#a95445;
    --ad-text:#f4ffff;
    --ad-muted:#8aa4b0;
    --ad-border:rgba(64,160,200,.62);
}
.ad-root,.ad-toggle{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"PingFang SC","Microsoft YaHei",monospace;box-sizing:border-box;letter-spacing:0}
.ad-root *{box-sizing:border-box;min-width:0;overflow-wrap:anywhere;word-break:break-word}
.ad-toggle{position:fixed;top:14px;right:14px;z-index:100000;background:#082030;color:#7df3e6;border:1px solid #40a0c8;border-radius:0;padding:8px 14px;font-size:13px;font-weight:900;cursor:pointer;box-shadow:0 0 0 1px rgba(48,208,208,.18),0 0 18px rgba(48,208,208,.28);opacity:.96;text-shadow:0 0 8px rgba(48,208,208,.45);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.ad-toggle:hover{opacity:1;background:#103040}
.ad-toggle-on{color:#001020;background:#7df3e6;border-color:#d9fffb;text-shadow:none}
.ad-root{position:fixed;top:0;right:0;height:100vh;width:408px;max-width:92vw;z-index:99999;color:var(--ad-text);border-left:1px solid var(--ad-border);display:flex;flex-direction:column;transition:transform .25s ease,opacity .18s ease,visibility .18s ease;box-shadow:-10px 0 28px rgba(0,0,0,.58),-1px 0 18px rgba(48,208,208,.22);overflow:hidden;background:var(--ad-void);background-image:linear-gradient(180deg,rgba(0,16,32,.98),rgba(16,48,64,.98)),linear-gradient(rgba(48,208,208,.052) 1px,transparent 1px),linear-gradient(90deg,rgba(48,208,208,.045) 1px,transparent 1px);background-size:auto,28px 28px,28px 28px;opacity:1;visibility:visible;pointer-events:auto}
.ad-root:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 14% 8%,rgba(48,208,208,.15),transparent 28%),radial-gradient(circle at 94% 14%,rgba(123,92,255,.13),transparent 26%),linear-gradient(180deg,transparent 0%,rgba(0,0,0,.22) 100%)}
.ad-root>*{position:relative}
.ad-collapsed{transform:translateX(calc(100% + 40px));opacity:0;visibility:hidden;pointer-events:none}
.ad-header{padding:18px 18px 13px;border-bottom:1px solid rgba(64,160,200,.28);flex:0 0 auto;background:linear-gradient(180deg,rgba(16,48,64,.9),rgba(0,16,32,.72))}
.ad-title{font-size:18px;font-weight:900;color:var(--ad-text);text-shadow:0 0 12px rgba(48,208,208,.38)}
.ad-sub{font-size:12px;color:var(--ad-muted);margin-top:4px}
.ad-body{flex:1 1 auto;overflow-y:auto;padding:0 16px 40px}
.ad-body::-webkit-scrollbar{width:7px}
.ad-body::-webkit-scrollbar-thumb{background:#305860;border-radius:0}
.ad-tabs{position:sticky;top:0;z-index:2;display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;background:linear-gradient(180deg,var(--ad-void) 0%,rgba(0,16,32,.9) 100%);padding:12px 0 10px;border-bottom:1px solid rgba(64,160,200,.22)}
.ad-tab,.ad-btn{clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ad-tab{background:linear-gradient(180deg,#103040,#082030);color:#b4c8d2;border:1px solid #305860;border-radius:0;padding:9px 6px;font-size:12px;font-weight:900;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
.ad-tab:hover{border-color:var(--ad-cyan-core);color:var(--ad-cyan-bright)}
.ad-tab-on{background:linear-gradient(180deg,#8ffff7,#30d0d0);color:#001020;border-color:#d9fffb;box-shadow:0 0 16px rgba(48,208,208,.3),inset 0 -2px 0 rgba(0,0,0,.2)}
.ad-section{margin:16px 0}
.ad-h3{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:900;color:var(--ad-muted);margin:0 0 10px}
.ad-h3:before{content:"";display:block;width:11px;height:2px;background:var(--ad-cyan-core);box-shadow:0 0 8px rgba(48,208,208,.82)}
.ad-vitals{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px}
.ad-kv,.ad-chip,.ad-candidate,.ad-tl-item{background:rgba(16,48,64,.82);border:1px solid rgba(48,88,96,.95);box-shadow:inset 0 0 18px rgba(48,208,208,.04)}
.ad-kv{padding:10px;text-align:center;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ad-kv-k{display:block;font-size:11px;color:#86a0aa}
.ad-kv-v{display:block;font-size:16px;font-weight:900;margin-top:4px;color:#fff;text-shadow:0 0 8px rgba(255,255,255,.12)}
.ad-share{background:rgba(0,48,56,.84);border:1px solid rgba(48,208,208,.42);padding:11px 12px;font-size:13px;line-height:1.6;color:#98fff4;box-shadow:inset 0 0 18px rgba(48,208,208,.055);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.ad-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.ad-btn{background:linear-gradient(180deg,#1b3c4b,#102838);color:#e7fbff;border:1px solid #407080;border-radius:0;padding:9px 10px;font-size:12px;font-weight:900;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
.ad-btn:hover{border-color:var(--ad-cyan-core);color:var(--ad-cyan-bright);box-shadow:0 0 14px rgba(48,208,208,.18)}
.ad-basket{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:8px;margin-top:8px;background:rgba(16,48,64,.82);border:1px solid rgba(48,88,96,.95);padding:8px;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ad-basket-count{font-size:12px;color:#c3d6df}
.ad-basket .ad-btn{padding:6px 9px}
.ad-notice{font-size:11px;color:#a5ff88;margin-top:7px}
.ad-notice-top{background:#10271c;border:1px solid #3a7045;padding:7px 9px;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ad-candidate-list{display:flex;flex-direction:column;gap:8px;margin-top:9px}
.ad-candidate{padding:10px;border-left-color:var(--ad-cyan-core)}
.ad-candidate-title{font-size:13px;font-weight:900;color:#fff}
.ad-candidate-meta{font-size:11px;color:var(--ad-muted);margin-top:3px}
.ad-candidate-text{font-size:12px;line-height:1.55;color:#c0d4dd;margin-top:6px}
.ad-bar{margin:10px 0}
.ad-bar-head{display:flex;align-items:baseline;font-size:12px;margin-bottom:5px}
.ad-bar-name{font-weight:900;color:#f0fbff}
.ad-bar-en{color:#778d98;margin-left:6px;font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ad-bar-val{color:#fff;font-weight:900;font-variant-numeric:tabular-nums}
.ad-track{height:8px;background:#001020;border:1px solid rgba(48,208,208,.12);border-radius:0;overflow:hidden}
.ad-fill{height:100%;border-radius:0;transition:width .3s ease}
.ad-param{background:linear-gradient(90deg,#109090,#30d0d0,#7df3e6)}
.ad-risk{background:linear-gradient(90deg,var(--ad-risk),var(--ad-gold))}
.ad-route{background:linear-gradient(90deg,var(--ad-purple),var(--ad-purple-hi))}
.ad-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ad-chip{padding:9px 10px;display:flex;justify-content:space-between;align-items:center;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ad-chip-k{font-size:12px;color:#c0d4dd}
.ad-chip-v{font-size:15px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums}
.ad-empty{font-size:12px;color:#78909b;padding:8px 0;line-height:1.6}
.ad-timeline{display:flex;flex-direction:column;gap:8px}
.ad-tl-item{display:flex;gap:10px;padding:10px;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ad-tl-age{flex:0 0 32px;font-size:13px;font-weight:900;color:var(--ad-cyan-bright);text-align:right;font-variant-numeric:tabular-nums;text-shadow:0 0 8px rgba(48,208,208,.45)}
.ad-tl-main{flex:1;min-width:0}
.ad-tl-evt{font-size:12.5px;line-height:1.6;color:#e7fbff}
.ad-tl-tlt{font-size:12px;line-height:1.6;color:#a5ff88}
.ad-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.ad-tag{font-size:10.5px;color:#98fff4;background:#003038;border:1px solid rgba(48,208,208,.42);border-radius:0;padding:2px 6px}
@media (max-width:900px){.ad-root{width:100vw;max-width:100vw}.ad-toggle{top:10px;right:10px}.ad-vitals{grid-template-columns:1fr 1fr 1fr}}
`;
