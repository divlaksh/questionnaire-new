import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { MenuBase } from '../menu-base';
import { BindingDirectiveBase } from './binding-directive-base';
import { getter, last } from './utils';
var getField = function (field, level) { return Array.isArray(field) ? field[level] || last(field) : field; };
var ɵ0 = getField;
/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided hierarchical data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
var HierarchyBindingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(HierarchyBindingDirective, _super);
    function HierarchyBindingDirective(menu) {
        return _super.call(this, menu) || this;
    }
    HierarchyBindingDirective.prototype.mapItems = function (items, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        return items.map(function (item) {
            var menuItem = _this.createItem(item, level);
            var children = _this.getChildren(item, level);
            if (children) {
                menuItem.items = _this.mapItems(children, level + 1);
            }
            return menuItem;
        });
    };
    HierarchyBindingDirective.prototype.createItem = function (item, level) {
        var result = { data: item };
        var fields = this.fields;
        for (var idx = 0; idx < fields.length; idx++) {
            var _a = fields[idx], target = _a.target, source = _a.source;
            result[target] = getter(getField(source, level))(item);
        }
        return result;
    };
    HierarchyBindingDirective.prototype.getChildren = function (item, level) {
        if (this.childrenField) {
            var field = getField(this.childrenField, level);
            return item[field];
        }
    };
    HierarchyBindingDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoMenuHierarchyBinding',
                    selector: '[kendoMenuHierarchyBinding]'
                },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: MenuBase }
    ]; };
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
    return HierarchyBindingDirective;
}(BindingDirectiveBase));
export { HierarchyBindingDirective };
export { ɵ0 };
