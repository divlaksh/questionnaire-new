import { Directive, TemplateRef } from '@angular/core';
//TODO: RENAME FILE AND UPDATE EXPORTS AND MODULES
/**
 * @hidden
 */
var ItemTemplateDirective = /** @class */ (function () {
    function ItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSortableItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ItemTemplateDirective;
}());
export { ItemTemplateDirective };
/**
 * @hidden
 */
var PlaceholderTemplateDirective = /** @class */ (function () {
    function PlaceholderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PlaceholderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSortablePlaceholderTemplate]'
                },] },
    ];
    /** @nocollapse */
    PlaceholderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return PlaceholderTemplateDirective;
}());
export { PlaceholderTemplateDirective };
