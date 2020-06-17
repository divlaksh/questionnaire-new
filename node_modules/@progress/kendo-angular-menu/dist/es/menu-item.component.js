import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ItemLinkTemplateDirective } from './templates/item-link-template.directive';
import { ItemContentTemplateDirective } from './templates/item-content-template.directive';
/**
 * A component that can be used to specify the Menu items
 * ([more information and examples]({% slug items_menu %})).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu>
 *          <kendo-menu-item text="item1">
 *              <kendo-menu-item text="item1.1" url="https://example.com">
 *              </kendo-menu-item>
 *              <kendo-menu-item text="item1.2" [disabled]="true">
 *              </kendo-menu-item>
 *          </kendo-menu-item>
 *          <kendo-menu-item text="item2">
 *              <ng-template kendoMenuItemContentTemplate let-item="item">
 *                  <div style="padding: 10px;">
 *                      My Content Template: {{ item.text }}
 *                  </div>
 *              </ng-template>
 *              <ng-template kendoMenuItemTemplate let-item="item">
 *                  <div style="padding: 10px;">
 *                      My Template: {{ item.text }}
 *                  </div>
 *              </ng-template>
 *          </kendo-menu-item>
 *          <kendo-menu-item text="item3">
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
var MenuItemComponent = /** @class */ (function () {
    function MenuItemComponent() {
    }
    Object.defineProperty(MenuItemComponent.prototype, "template", {
        /**
         * @hidden
         */
        get: function () {
            if (this.itemTemplate && this.itemTemplate.length) {
                return this.itemTemplate.first.templateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "linkTemplate", {
        /**
         * @hidden
         */
        get: function () {
            if (this.itemLinkTemplate && this.itemLinkTemplate.length) {
                return this.itemLinkTemplate.first.templateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "contentTemplate", {
        /**
         * @hidden
         */
        get: function () {
            if (this.itemContentTemplate && this.itemContentTemplate.length) {
                return this.itemContentTemplate.first.templateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "items", {
        /**
         * @hidden
         */
        get: function () {
            if (this.children.length) {
                return this.children.toArray().slice(1);
            }
        },
        enumerable: true,
        configurable: true
    });
    MenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-menu-item',
                    template: ""
                },] },
    ];
    MenuItemComponent.propDecorators = {
        text: [{ type: Input }],
        url: [{ type: Input }],
        disabled: [{ type: Input }],
        cssClass: [{ type: Input }],
        cssStyle: [{ type: Input }],
        icon: [{ type: Input }],
        data: [{ type: Input }],
        separator: [{ type: Input }],
        itemTemplate: [{ type: ContentChildren, args: [ItemTemplateDirective,] }],
        itemLinkTemplate: [{ type: ContentChildren, args: [ItemLinkTemplateDirective,] }],
        itemContentTemplate: [{ type: ContentChildren, args: [ItemContentTemplateDirective,] }],
        children: [{ type: ContentChildren, args: [MenuItemComponent,] }]
    };
    return MenuItemComponent;
}());
export { MenuItemComponent };
