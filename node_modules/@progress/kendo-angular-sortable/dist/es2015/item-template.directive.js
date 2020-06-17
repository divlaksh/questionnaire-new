import { Directive, TemplateRef } from '@angular/core';
//TODO: RENAME FILE AND UPDATE EXPORTS AND MODULES
/**
 * @hidden
 */
export class ItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSortableItemTemplate]'
            },] },
];
/** @nocollapse */
ItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * @hidden
 */
export class PlaceholderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PlaceholderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSortablePlaceholderTemplate]'
            },] },
];
/** @nocollapse */
PlaceholderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
