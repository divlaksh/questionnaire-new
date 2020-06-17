import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { MenuBase } from '../menu-base';
import { BindingDirectiveBase } from './binding-directive-base';
import { getter } from './utils';
/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided flat data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
var FlatBindingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FlatBindingDirective, _super);
    function FlatBindingDirective(menu) {
        return _super.call(this, menu) || this;
    }
    FlatBindingDirective.prototype.mapItems = function (items) {
        var _this = this;
        if (!this.idField || !this.parentIdField) {
            return items.map(function (item) { return _this.createItem(item); });
        }
        var result = [];
        var map = {};
        for (var idx = 0; idx < items.length; idx++) {
            var item = items[idx];
            var menuItem = this.createItem(item);
            var id = getter(this.idField)(item);
            var parentId = getter(this.parentIdField)(item);
            if (parentId === null || parentId === undefined) {
                result.push(menuItem);
            }
            else {
                var parent_1 = map[parentId] = map[parentId] || {};
                parent_1.items = parent_1.items || [];
                parent_1.items.push(menuItem);
            }
            if (map[id]) {
                menuItem.items = map[id].items;
            }
            map[id] = menuItem;
        }
        return result;
    };
    FlatBindingDirective.prototype.createItem = function (dataItem) {
        var result = { data: dataItem };
        var fields = this.fields;
        for (var idx = 0; idx < fields.length; idx++) {
            var _a = fields[idx], source = _a.source, target = _a.target;
            result[target] = getter(source)(dataItem);
        }
        return result;
    };
    FlatBindingDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoMenuFlatBinding',
                    selector: '[kendoMenuFlatBinding]'
                },] },
    ];
    /** @nocollapse */
    FlatBindingDirective.ctorParameters = function () { return [
        { type: MenuBase }
    ]; };
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
    return FlatBindingDirective;
}(BindingDirectiveBase));
export { FlatBindingDirective };
