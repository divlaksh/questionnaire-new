"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var menu_base_1 = require("../menu-base");
var binding_directive_base_1 = require("./binding-directive-base");
var utils_1 = require("./utils");
var getField = function (field, level) { return Array.isArray(field) ? field[level] || utils_1.last(field) : field; };
var ɵ0 = getField;
exports.ɵ0 = ɵ0;
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
            result[target] = utils_1.getter(getField(source, level))(item);
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
        { type: core_1.Directive, args: [{
                    exportAs: 'kendoMenuHierarchyBinding',
                    selector: '[kendoMenuHierarchyBinding]'
                },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: menu_base_1.MenuBase }
    ]; };
    HierarchyBindingDirective.propDecorators = {
        data: [{ type: core_1.Input, args: ["kendoMenuHierarchyBinding",] }],
        textField: [{ type: core_1.Input }],
        urlField: [{ type: core_1.Input }],
        iconField: [{ type: core_1.Input }],
        disabledField: [{ type: core_1.Input }],
        cssClassField: [{ type: core_1.Input }],
        cssStyleField: [{ type: core_1.Input }],
        separatorField: [{ type: core_1.Input }],
        childrenField: [{ type: core_1.Input }]
    };
    return HierarchyBindingDirective;
}(binding_directive_base_1.BindingDirectiveBase));
exports.HierarchyBindingDirective = HierarchyBindingDirective;
