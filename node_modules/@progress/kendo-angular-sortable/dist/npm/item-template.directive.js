"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//TODO: RENAME FILE AND UPDATE EXPORTS AND MODULES
/**
 * @hidden
 */
var ItemTemplateDirective = /** @class */ (function () {
    function ItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSortableItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return ItemTemplateDirective;
}());
exports.ItemTemplateDirective = ItemTemplateDirective;
/**
 * @hidden
 */
var PlaceholderTemplateDirective = /** @class */ (function () {
    function PlaceholderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PlaceholderTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSortablePlaceholderTemplate]'
                },] },
    ];
    /** @nocollapse */
    PlaceholderTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return PlaceholderTemplateDirective;
}());
exports.PlaceholderTemplateDirective = PlaceholderTemplateDirective;
