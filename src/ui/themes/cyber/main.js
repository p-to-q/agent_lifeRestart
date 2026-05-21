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
        });
    }

    arrangeTopLeftActions() {
        this.btnSaveLoad.x = 0;
        this.btnSaveLoad.y = 0;
        this.btnSaveLoad.scaleX = this.btnSaveLoad.scaleY = 1;

        this.btnGithub.x = 167.5;
        this.btnGithub.y = 370;
        this.btnGithub.width = 160;
        this.btnGithub.height = 160;
        this.btnGithub.scaleX = this.btnGithub.scaleY = 1;
        this.btnGithub.visible = true;
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
        this.banner.visible = !!core.times;
    }
}
