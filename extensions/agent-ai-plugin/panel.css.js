export const AI_PLUGIN_CSS = `
.ap-root{
    --ap-void:#001020;
    --ap-deep:#082030;
    --ap-panel:#103040;
    --ap-line:#40a0c8;
    --ap-core:#30d0d0;
    --ap-bright:#7df3e6;
    --ap-warm:#ffc16b;
    --ap-text:#f4ffff;
    --ap-muted:#8aa4b0;
    --ap-border:rgba(64,160,200,.62);
}
.ap-root,.ap-toggle{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"PingFang SC","Microsoft YaHei",monospace;box-sizing:border-box;letter-spacing:0}
.ap-root *{box-sizing:border-box;min-width:0;overflow-wrap:anywhere;word-break:break-word}
.ap-toggle{position:fixed;top:14px;left:14px;z-index:100001;background:#082030;color:#7df3e6;border:1px solid #40a0c8;border-radius:0;padding:8px 14px;font-size:13px;font-weight:900;cursor:pointer;box-shadow:0 0 0 1px rgba(48,208,208,.18),0 0 18px rgba(48,208,208,.28);opacity:.96;text-shadow:0 0 8px rgba(48,208,208,.45);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.ap-toggle:hover{opacity:1;background:#103040}
.ap-toggle-on{color:#001020;background:#7df3e6;border-color:#d9fffb;text-shadow:none}
.ap-root{position:fixed;top:0;left:0;height:100vh;width:430px;max-width:92vw;z-index:100000;color:var(--ap-text);border-right:1px solid var(--ap-border);display:flex;flex-direction:column;transition:transform .25s ease;box-shadow:10px 0 28px rgba(0,0,0,.58),1px 0 18px rgba(48,208,208,.22);overflow:hidden;background:var(--ap-void);background-image:linear-gradient(180deg,rgba(0,16,32,.98),rgba(16,48,64,.98)),linear-gradient(rgba(48,208,208,.052) 1px,transparent 1px),linear-gradient(90deg,rgba(48,208,208,.045) 1px,transparent 1px);background-size:auto,28px 28px,28px 28px}
.ap-root:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 82% 9%,rgba(48,208,208,.15),transparent 28%),radial-gradient(circle at 10% 18%,rgba(255,193,107,.12),transparent 24%),linear-gradient(180deg,transparent 0%,rgba(0,0,0,.24) 100%)}
.ap-root>*{position:relative}
.ap-collapsed{transform:translateX(-110%)}
.ap-header{min-height:76px;padding:18px 22px 13px;border-bottom:1px solid rgba(64,160,200,.28);flex:0 0 auto;background:linear-gradient(180deg,rgba(16,48,64,.9),rgba(0,16,32,.72));text-align:right;display:flex;flex-direction:column;align-items:flex-end;justify-content:center}
.ap-title{font-size:18px;font-weight:900;color:var(--ap-text);text-shadow:0 0 12px rgba(48,208,208,.38)}
.ap-sub{font-size:12px;color:var(--ap-muted);margin-top:4px}
.ap-body{flex:1 1 auto;overflow-y:auto;padding:0 20px 40px}
.ap-body::-webkit-scrollbar{width:7px}
.ap-body::-webkit-scrollbar-thumb{background:#305860;border-radius:0}
.ap-btn,.ap-card,.ap-status{clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ap-section{margin:16px 0}
.ap-body>.ap-section:first-of-type{margin-top:20px}
.ap-h3{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:900;color:var(--ap-muted);margin:0 0 10px}
.ap-h3:before{content:"";display:block;width:11px;height:2px;background:var(--ap-core);box-shadow:0 0 8px rgba(48,208,208,.82)}
.ap-card{background:rgba(0,48,56,.84);border:1px solid rgba(48,208,208,.42);padding:12px;font-size:13px;line-height:1.65;color:#dffefa;box-shadow:inset 0 0 18px rgba(48,208,208,.055);white-space:pre-wrap}
.ap-status{background:rgba(16,48,64,.82);border:1px solid rgba(48,88,96,.95);padding:10px;font-size:12px;line-height:1.55;color:#c0d4dd;margin-bottom:10px}
.ap-status strong{color:#fff}
.ap-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.ap-actions-sticky{position:sticky;bottom:0;background:linear-gradient(180deg,rgba(0,16,32,.15),rgba(0,16,32,.96) 35%);padding:12px 0 4px;margin-top:18px}
.ap-btn{background:linear-gradient(180deg,#1b3c4b,#102838);color:#e7fbff;border:1px solid #407080;border-radius:0;padding:9px 10px;font-size:12px;font-weight:900;cursor:pointer}
.ap-btn:hover:not(:disabled){border-color:var(--ap-core);color:var(--ap-bright);box-shadow:0 0 14px rgba(48,208,208,.18)}
.ap-btn:disabled{opacity:.48;cursor:not-allowed}
.ap-btn-warm{border-color:rgba(255,193,107,.62);color:#ffe2b5}
.ap-empty{font-size:12px;color:#78909b;padding:8px 0;line-height:1.6}
.ap-notice{font-size:11px;color:#a5ff88;margin-top:7px;background:#10271c;border:1px solid #3a7045;padding:7px 9px;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ap-error{color:#ffc6b8;background:#301818;border-color:#704030}
.ap-list{display:flex;flex-direction:column;gap:8px;margin-top:9px}
.ap-item{background:rgba(16,48,64,.82);border:1px solid rgba(48,88,96,.95);padding:10px;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.ap-item-title{font-size:13px;font-weight:900;color:#fff}
.ap-item-text{font-size:12px;line-height:1.55;color:#c0d4dd;margin-top:5px}
.ap-meta{font-size:11px;color:var(--ap-muted);margin-top:8px}
@media (max-width:900px){.ap-root{width:100vw;max-width:100vw}.ap-toggle{top:58px;left:10px}}
`;
