import { Directive, Input } from '@angular/core';
import { MenuBase } from '../menu-base';
import { BindingDirectiveBase } from './binding-directive-base';
import { getter, last } from './utils';
const getField = (field, level) => Array.isArray(field) ? field[level] || last(field) : field;
const ɵ0 = getField;
/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided hierarchical data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
export class HierarchyBindingDirective extends BindingDirectiveBase {
    constructor(menu) {
        super(menu);
    }
    mapItems(items, level = 0) {
        return items.map((item) => {
            const menuItem = this.createItem(item, level);
            const children = this.getChildren(item, level);
            if (children) {
                menuItem.items = this.mapItems(children, level + 1);
            }
            return menuItem;
        });
    }
    createItem(item, level) {
        const result = { data: item };
        const fields = this.fields;
        for (let idx = 0; idx < fields.length; idx++) {
            const { target, source } = fields[idx];
            result[target] = getter(getField(source, level))(item);
        }
        return result;
    }
    getChildren(item, level) {
        if (this.childrenField) {
            const field = getField(this.childrenField, level);
            return item[field];
        }
    }
}
HierarchyBindingDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoMenuHierarchyBinding',
                selector: '[kendoMenuHierarchyBinding]'
            },] },
];
/** @nocollapse */
HierarchyBindingDirective.ctorParameters = () => [
    { type: MenuBase }
];
HierarchyBindingDirective.propDecorators = {
    data: [{ type: Input, args: ["kendoMenuHierarchyBinding",] }],
    textField: [{ type: Input }],
    urlField: [{ type: Input }],
    iconField: [{ type: Input }],
    disabledField: [{ type: Input }],
    cssClassField: [{ type: Input }],
    cssStyleField: [{ type: Input }],
    separatorField: [{ type: Input }],
    childrenField: [{ type: Input }]
};
export { ɵ0 };
