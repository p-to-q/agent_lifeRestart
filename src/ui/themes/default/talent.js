export default class Talent extends ui.view.DefaultTheme.TalentUI {
    constructor() {
        super();
        this.btnDrawCard.on(Laya.Event.CLICK, this, this.onClickDrawCard);
        this.btnNext.on(Laya.Event.CLICK, this, this.onClickNext);
        this.listTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
        this.listTalents.scrollBar.elasticDistance = 150;
    }

    #selected = new Set();

    resetSelectionState() {
        this.#selected.clear();
        this.btnNext.label = 'UI_Talent_Select_Uncomplete';
        this.listTalents?.refresh?.();
    }

    init() {
        this.pageDrawCard.visible = true;
        this.pageResult.visible = false;
        this.resetSelectionState();
    }

    close() {}

    onClickDrawCard() {
        this.resetSelectionState();
        this.pageDrawCard.visible = false;
        this.pageResult.visible = true;
        this.listTalents.scrollTo(0);
        this.listTalents.array = core.talentRandom();
    }

    onClickNext() {
        if(this.#selected.size < core.talentSelectLimit) {
            return $$event('message', ['F_TalentSelectNotComplect', core.talentSelectLimit]);
        }

        const talents = [...this.#selected].map(index => this.listTalents.array[index]);
        $ui.switchView(UI.pages.PROPERTY, { talents, enableExtend: true });
    }

    renderTalent(box, index) {
        const dataSource = box.dataSource;

        const blank = box.getChildByName('blank');
        const fit = (s, n) => (s && [...s].length > n) ? [...s].slice(0, n).join('') + '…' : s;
        box.label = $_.format($lang.F_TalentSelection, {
            name: dataSource.name,
            description: fit(dataSource.description, 12),
        });

        const style = $ui.common.card[dataSource.grade];
        const changeStyle = () => {
            const selected = this.#selected.has(index);
            blank.pause = !selected;
            $_.deepMapSet(box, selected? style.selected: style.normal);
        }
        changeStyle();

        box.offAll(Laya.Event.CLICK);
        box.on(Laya.Event.CLICK, this, () => {
            if(this.#selected.has(index)) {
                this.#selected.delete(index);
            } else {
                if(this.#selected.size >= core.talentSelectLimit) {
                    return $$event('message', ['F_TalentSelectLimit', core.talentSelectLimit]);
                }
                const exclusive = core.exclude(
                    [...this.#selected].map(index => this.listTalents.array[index].id),
                    this.listTalents.array[index].id
                );
                if(exclusive != null) {
                    for(const {name, id} of this.listTalents.array)
                        if(exclusive == id)
                            return $$event('message', ['F_TalentConflict', name]);
                    return;
                }
                this.#selected.add(index);
            }

            this.btnNext.label = this.#selected.size === core.talentSelectLimit
                ? 'UI_Next'
                : 'UI_Talent_Select_Uncomplete';

            changeStyle();
        });
    }
}
