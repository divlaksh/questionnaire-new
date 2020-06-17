import { Directive, Input } from '@angular/core';
import { MenuBase } from '../menu-base';
import { BindingDirectiveBase } from './binding-directive-base';
import { getter } from './utils';
/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided flat data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
export class FlatBindingDirective extends BindingDirectiveBase {
    constructor(menu) {
        super(menu);
    }
    mapItems(items) {
        if (!this.idField || !this.parentIdField) {
            return items.map(item => this.createItem(item));
        }
        const result = [];
        const map = {};
        for (let idx = 0; idx < items.length; idx++) {
            const item = items[idx];
            const menuItem = this.createItem(item);
            const id = getter(this.idField)(item);
            const parentId = getter(this.parentIdField)(item);
            if (parentId === null || parentId === undefined) {
                result.push(menuItem);
            }
            else {
                const parent = map[parentId] = map[parentId] || {};
                parent.items = parent.items || [];
                parent.items.push(menuItem);
            }
            if (map[id]) {
                menuItem.items = map[id].items;
            }
            map[id] = menuItem;
        }
        return result;
    }
    createItem(dataItem) {
        const result = { data: dataItem };
        const fields = this.fields;
        for (let idx = 0; idx < fields.length; idx++) {
            const { source, target } = fields[idx];
            result[target] = getter(source)(dataItem);
        }
        return result;
    }
}
FlatBindingDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoMenuFlatBinding',
                selector: '[kendoMenuFlatBinding]'
            },] },
];
/** @nocollapse */
FlatBindingDirective.ctorParameters = () => [
    { type: MenuBase }
];
FlatBindingDirective.propDecorators = {
    data: [{ type: Input, args: ["kendoMenuFlatBinding",] }],
    textField: [{ type: Input }],
    urlField: [{ type: Input }],
    iconField: [{ type: Input }],
    disabledField: [{ type: Input }],
    cssClassField: [{ type: Input }],
    cssStyleField: [{ type: Input }],
    separatorField: [{ type: Input }],
    idField: [{ type: Input }],
    parentIdField: [{ type: Input }]
};
