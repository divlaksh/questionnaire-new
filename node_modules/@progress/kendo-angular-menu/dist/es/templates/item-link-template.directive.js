import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents a template for the links of the Menu items ([see example]({% slug templates_menu %})). To define a template
 * for an item, nest an `<ng-template>` tag with the `kendoMenuItemLinkTemplate` directive inside a `<kendo-menu-item>`
 * component. To define a template for all Menu items, nest the template inside the `<kendo-menu>` component.
 *
 * The available fields in the template context are:
 * - `item`&mdash;The item data.
 * - `index`&mdash;The item index.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu>
 *          <kendo-menu-item text="item2">
 *              <ng-template kendoMenuItemLinkTemplate let-item="item" let-index="index">
 *                  <span [kendoMenuItemLink]="index">
 *                      {{ item.text }}
 *                      <span *ngIf="item.items && item.items.length" [kendoMenuExpandArrow]="index"></span>
 *                  </span>
 *              </ng-template>
 *          </kendo-menu-item>
 *        </kendo-menu>
 *    `
 * })
 *
 * class AppComponent {
 * }
 * ```
 */
var ItemLinkTemplateDirective = /** @class */ (function () {
    function ItemLinkTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemLinkTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuItemLinkTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemLinkTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ItemLinkTemplateDirective;
}());
export { ItemLinkTemplateDirective };
