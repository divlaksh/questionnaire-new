import { TemplateRef } from '@angular/core';
/**
 * Represents a template for the content of the Menu items ([see example]({% slug templates_menu %})). To define the template,
 * nest an `<ng-template>` tag with the `kendoMenuItemContentTemplate` directive inside a `<kendo-menu-item>` component.
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
 *              <ng-template kendoMenuItemContentTemplate let-item="item" let-index="index">
 *                  <div style="padding: 10px;">
 *                      My Content Template for: {{ item.text }} at index: {{ index }}
 *                  </div>
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
export declare class ItemContentTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
