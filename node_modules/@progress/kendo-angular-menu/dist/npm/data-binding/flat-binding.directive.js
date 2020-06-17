"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var menu_base_1 = require("../menu-base");
var binding_directive_base_1 = require("./binding-directive-base");
var utils_1 = require("./utils");
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
            var id = utils_1.getter(this.idField)(item);
            var parentId = utils_1.getter(this.parentIdField)(item);
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
            result[target] = utils_1.getter(source)(dataItem);
        }
        return result;
    };
    FlatBindingDirective.decorators = [
        { type: core_1.Directive, args: [{
                    exportAs: 'kendoMenuFlatBinding',
                    selector: '[kendoMenuFlatBinding]'
                },] },
    ];
    /** @nocollapse */
    FlatBindingDirective.ctorParameters = function () { return [
        { type: menu_base_1.MenuBase }
    ]; };
    FlatBindingDirective.propDecorators = {
        data: [{ type: core_1.Input, args: ["kendoMenuFlatBinding",] }],
        textField: [{ type: core_1.Input }],
        urlField: [{ type: core_1.Input }],
        iconField: [{ type: core_1.Input }],
        disabledField: [{ type: core_1.Input }],
        cssClassField: [{ type: core_1.Input }],
        cssStyleField: [{ type: core_1.Input }],
        separatorField: [{ type: core_1.Input }],
        idField: [{ type: core_1.Input }],
        parentIdField: [{ type: core_1.Input }]
    };
    return FlatBindingDirective;
}(binding_directive_base_1.BindingDirectiveBase));
exports.FlatBindingDirective = FlatBindingDirective;
