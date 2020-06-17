const ITEM_FIELDS = ['textField', 'urlField', 'iconField', 'disabledField', 'cssClassField', 'cssStyleField', 'separatorField'];
/**
 * @hidden
 */
export class BindingDirectiveBase {
    constructor(menu) {
        this.menu = menu;
    }
    ngOnChanges() {
        this.rebind();
    }
    /**
     *  Rebinds the Menu items.
     */
    rebind() {
        const fields = this.fields = [];
        for (let idx = 0; idx < ITEM_FIELDS.length; idx++) {
            const inputName = ITEM_FIELDS[idx];
            const inputValue = this[inputName];
            if (inputValue) {
                fields.push({ target: inputName.replace('Field', ''), source: inputValue });
            }
        }
        this.menu.items = this.data ? this.mapItems(this.data) : [];
    }
}
