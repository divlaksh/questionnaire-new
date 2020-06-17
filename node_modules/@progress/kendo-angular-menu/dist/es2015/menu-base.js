import { Input, ContentChildren, QueryList } from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ItemLinkTemplateDirective } from './templates/item-link-template.directive';
/**
 * @hidden
 */
export class MenuBase {
    constructor() {
        /**
         * Specifies if the Menu will be vertical ([see example]({% slug vertical_menu %})).
         */
        this.vertical = false;
        /**
         * Specifies that the root items can be opened only on click
         * ([see example]({% slug openclose_menu %}#toc-opening-on-click)).
         */
        this.openOnClick = false;
        /**
         * Specifies the delay in milliseconds before the Menu items are opened or closed on item hover
         * or leave ([see example]({% slug openclose_menu %}#toc-delay-on-hover)). Used to avoid the accidental
         * opening or closing of the items.
         */
        this.hoverDelay = 100;
        /**
         * Sets the Menu animation.
         */
        this.animate = true;
    }
    /**
     * @hidden
     */
    get rootItems() {
        return this.items || (this.children ? this.children.toArray() : []);
    }
}
MenuBase.propDecorators = {
    items: [{ type: Input }],
    vertical: [{ type: Input }],
    openOnClick: [{ type: Input }],
    hoverDelay: [{ type: Input }],
    animate: [{ type: Input }],
    itemTemplate: [{ type: ContentChildren, args: [ItemTemplateDirective,] }],
    itemLinkTemplate: [{ type: ContentChildren, args: [ItemLinkTemplateDirective,] }],
    children: [{ type: ContentChildren, args: [MenuItemComponent,] }]
};
