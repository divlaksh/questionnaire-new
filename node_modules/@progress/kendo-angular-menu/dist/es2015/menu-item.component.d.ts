import { QueryList, TemplateRef } from '@angular/core';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ItemLinkTemplateDirective } from './templates/item-link-template.directive';
import { ItemContentTemplateDirective } from './templates/item-content-template.directive';
import { MenuItem } from './menu-item.interface';
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
export declare class MenuItemComponent implements MenuItem {
    text: string;
    url: string;
    disabled: boolean;
    cssClass: any;
    cssStyle: any;
    icon: string;
    data: any;
    separator: boolean;
    /**
     * @hidden
     */
    itemTemplate: QueryList<ItemTemplateDirective>;
    /**
     * @hidden
     */
    itemLinkTemplate: QueryList<ItemLinkTemplateDirective>;
    /**
     * @hidden
     */
    itemContentTemplate: QueryList<ItemContentTemplateDirective>;
    /**
     * @hidden
     */
    children: QueryList<MenuItemComponent>;
    /**
     * @hidden
     */
    readonly template: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly linkTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly contentTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly items: any[];
}
