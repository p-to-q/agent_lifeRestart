export default class Thanks extends ui.view.DefaultTheme.ThanksUI {
    constructor() {
        super();
        this.btnBack.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.MAIN));
        this.btnAFD.on(Laya.Event.CLICK, this, goto, ['upstream']);
        this.btnDDF.on(Laya.Event.CLICK, this, goto, ['project']);
    }

    init() {
        this.renderCredits();
        this.panelTopSupports.visible = true;
        this.listSupports.visible = true;
        this.btnAFD.visible = true;
        this.btnDDF.visible = true;
    }

    renderCredits() {
        const links = [
            '当前仓库：github.com/p-to-q/agent_lifeRestart',
            '原作仓库：github.com/VickScarlet/lifeRestart',
            '文档入口：README、功能选单、内容包和小模型观测台说明',
            '前台已经移除旧打赏与旧社群入口；感谢与来源保留在本页和 NOTICE 中',
        ];

        const item = this.vboxTopSupports?.getChildAt?.(0);
        if (item) {
            const nameLabel = item.getChildByName('name');
            const commentLabel = item.getChildByName('comment');
            nameLabel.text = '项目致谢';
            commentLabel.text = 'agent_lifeRestart 是 p-to-q 基于 Life Restart 做的 Agent 主题改写。Make Something Agent Want 作为这版项目的气质线被保留下来。玩法内核来自 VickScarlet/lifeRestart；我们保留 MIT License 和原作链接，也把原作者与贡献者的工作放在这里认真致谢。';
            nameLabel.color = '#001020';
            commentLabel.color = '#001020';
        }

        this.listSupports.renderHandler = Laya.Handler.create(this, box => {
            box.label = box.dataSource;
        }, null, false);
        this.listSupports.array = links;
    }

    close() {}
}
