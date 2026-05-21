export default class CyberMain extends ui.view.CyberTheme.CyberMainUI {
    constructor() {
        super();
        this.btnRemake.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.MODE));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.ACHIEVEMENT));
        this.btnThanks.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.THANKS));
        this.btnGithub.on(Laya.Event.CLICK, this, goto, ['github']);
        this.on(Laya.Event.CLICK, this, this.openPtoqFromSignature);
        this.btnThemes.on(Laya.Event.CLICK, this, ()=>$ui.showDialog(UI.pages.THEMES));
        this.btnSaveLoad.on(Laya.Event.CLICK, this, ()=>$ui.showDialog(UI.pages.SAVELOAD));
        this.on(Laya.Event.RESIZE, this, () => {
            const scale = Math.max(
                this.width / this.imgBg.width,
                this.height / this.imgBg.height
            );
            this.imgBg.scale(scale, scale);
            this.arrangeTopLeftActions();
        });
    }

    dockToView(btn) {
        if (btn.parent !== this) this.addChild(btn);
        btn.left = NaN;
        btn.right = NaN;
        btn.top = NaN;
        btn.bottom = NaN;
        btn.centerX = NaN;
        btn.centerY = NaN;
    }

    arrangeTopLeftActions() {
        const stageWidth = Laya.stage.width || this.width || 1125;
        const leftCenter = 120;
        const rightCenter = stageWidth - 200;

        this.dockToView(this.btnSaveLoad);
        this.btnSaveLoad.x = leftCenter;
        this.btnSaveLoad.y = 200;
        this.btnSaveLoad.scaleX = this.btnSaveLoad.scaleY = 1;

        this.dockToView(this.btnGithub);
        this.btnGithub.rotation = 0;
        this.btnGithub.width = 160;
        this.btnGithub.height = 160;
        this.btnGithub.x = leftCenter;
        this.btnGithub.y = 380;
        this.btnGithub.scaleX = this.btnGithub.scaleY = 1;
        this.btnGithub.visible = true;

        this.dockToView(this.btnAchievement);
        this.btnAchievement.x = rightCenter;
        this.btnAchievement.y = 200;
        this.btnAchievement.scaleX = this.btnAchievement.scaleY = 1;

        this.dockToView(this.btnThanks);
        this.btnThanks.x = rightCenter;
        this.btnThanks.y = 320;
        this.btnThanks.scaleX = this.btnThanks.scaleY = 1;
    }

    openPtoqFromSignature(event) {
        const x = event.stageX;
        const y = event.stageY;
        const local = this.globalToLocal(new Laya.Point(x, y));
        if (local.x > this.width - 640 && local.y > this.height - 120) {
            goto('ptoq');
        }
    }

    static load() {
        return [
            "fonts/方正像素12.ttf",
            "images/atlas/images/accessories.atlas",
            "images/atlas/images/border.atlas",
            "images/atlas/images/button.atlas",
            "images/atlas/images/icons.atlas",
            "images/atlas/images/progress.atlas",
            "images/atlas/images/slider.atlas",
        ]
    }

    init() {
        this.btnDiscord.visible = false;
        this.arrangeTopLeftActions();
        this.btnAchievement.visible =
        this.btnThanks.visible = !!core.times;
        this.banner.visible = false;

        const titleLabel = this._childs?.[3];
        if (titleLabel) titleLabel.visible = false;

        const subtitleLabel = this._childs?.[4];
        if (subtitleLabel) subtitleLabel.centerY = -130;
    }
}
