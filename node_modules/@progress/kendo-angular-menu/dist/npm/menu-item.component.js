"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_template_directive_1 = require("./templates/item-template.directive");
var item_link_template_directive_1 = require("./templates/item-link-template.directive");
var item_content_template_directive_1 = require("./templates/item-content-template.directive");
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-menu-item',
                    template: ""
                },] },
    ];
    MenuItemComponent.propDecorators = {
        text: [{ type: core_1.Input }],
        url: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.Input }],
        cssStyle: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        separator: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.ContentChildren, args: [item_template_directive_1.ItemTemplateDirective,] }],
        itemLinkTemplate: [{ type: core_1.ContentChildren, args: [item_link_template_directive_1.ItemLinkTemplateDirective,] }],
        itemContentTemplate: [{ type: core_1.ContentChildren, args: [item_content_template_directive_1.ItemContentTemplateDirective,] }],
        children: [{ type: core_1.ContentChildren, args: [MenuItemComponent,] }]
    };
    return MenuItemComponent;
}());
exports.MenuItemComponent = MenuItemComponent;
