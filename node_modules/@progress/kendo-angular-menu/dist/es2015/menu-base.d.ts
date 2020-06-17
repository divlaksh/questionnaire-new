import { QueryList } from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { MenuAnimation } from './menu-animation.interface';
import { OpenOnClickSettings } from './open-on-click-settings';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ItemLinkTemplateDirective } from './templates/item-link-template.directive';
/**
 * @hidden
 */
export declare class MenuBase {
    /**
     * Specifies the Menu items.
     */
    items: any[];
    /**
     * Specifies if the Menu will be vertical ([see example]({% slug vertical_menu %})).
     */
    vertical: boolean;
    /**
     * Specifies that the root items can be opened only on click
     * ([see example]({% slug openclose_menu %}#toc-opening-on-click)).
     */
    openOnClick: boolean | OpenOnClickSettings;
    /**
     * Specifies the delay in milliseconds before the Menu items are opened or closed on item hover
     * or leave ([see example]({% slug openclose_menu %}#toc-delay-on-hover)). Used to avoid the accidental
     * opening or closing of the items.
     */
    hoverDelay: number;
    /**
     * Sets the Menu animation.
     */
    animate: boolean | MenuAnimation;
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
    children: QueryList<MenuItemComponent>;
    /**
     * @hidden
     */
    readonly rootItems: any[];
}
