export default class Main extends ui.view.DefaultTheme.MainUI {
    constructor() {
        super();
        this.btnRemake.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.MODE));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.ACHIEVEMENT));
        this.btnThanks.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.THANKS));
        this.btnGithub.on(Laya.Event.CLICK, this, goto, ['github']);
        this.on(Laya.Event.CLICK, this, this.openPtoqFromSignature);
        this.btnThemes.on(Laya.Event.CLICK, this, ()=>$ui.showDialog(UI.pages.THEMES));
        this.btnSaveLoad.on(Laya.Event.CLICK, this, ()=>$ui.showDialog(UI.pages.SAVELOAD));
    }

    arrangeTopLeftActions() {
        this.btnSaveLoad.right = NaN;
        this.btnSaveLoad.bottom = NaN;
        this.btnSaveLoad.x = 80;
        this.btnSaveLoad.y = 80;
        this.btnSaveLoad.scaleX = this.btnSaveLoad.scaleY = 1;

        this.btnGithub.rotation = 0;
        this.btnGithub.x = 80;
        this.btnGithub.y = 250;
        this.btnGithub.width = 110;
        this.btnGithub.height = 110;
        this.btnGithub.scaleX = this.btnGithub.scaleY = 1;
        this.btnGithub.visible = true;

        this.btnThanks.right = NaN;
        this.btnThanks.top = NaN;
        this.btnThanks.x = 945;
        this.btnThanks.y = 310;
    }

    openPtoqFromSignature(event) {
        const local = this.globalToLocal(new Laya.Point(event.stageX, event.stageY));
        if (local.x > this.width - 720 && local.y > this.height - 150) {
            goto('ptoq');
        }
    }

    static load() {
        return [
            "images/atlas/images/icons.atlas",
        ]
    }

    init() {
        this.btnDiscord.visible = false;
        this.arrangeTopLeftActions();
        this.banner.visible = false;
        this.btnAchievement.visible =
        this.btnThanks.visible = !!core.times;
        const title = this.getChildByName('title');
        if (title) title.visible = false;
        this.labSubTitle.centerY = -220;
        const text = this.labSubTitle.text;
        this.labSubTitle.text = ' ';
        this.labSubTitle.text = text;
    }
}
