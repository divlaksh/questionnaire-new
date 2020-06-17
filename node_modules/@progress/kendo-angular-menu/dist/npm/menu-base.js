"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var menu_item_component_1 = require("./menu-item.component");
var item_template_directive_1 = require("./templates/item-template.directive");
var item_link_template_directive_1 = require("./templates/item-link-template.directive");
/**
 * @hidden
 */
var MenuBase = /** @class */ (function () {
    function MenuBase() {
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
    Object.defineProperty(MenuBase.prototype, "rootItems", {
        /**
         * @hidden
         */
        get: function () {
            return this.items || (this.children ? this.children.toArray() : []);
        },
        enumerable: true,
        configurable: true
    });
    MenuBase.propDecorators = {
        items: [{ type: core_1.Input }],
        vertical: [{ type: core_1.Input }],
        openOnClick: [{ type: core_1.Input }],
        hoverDelay: [{ type: core_1.Input }],
        animate: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.ContentChildren, args: [item_template_directive_1.ItemTemplateDirective,] }],
        itemLinkTemplate: [{ type: core_1.ContentChildren, args: [item_link_template_directive_1.ItemLinkTemplateDirective,] }],
        children: [{ type: core_1.ContentChildren, args: [menu_item_component_1.MenuItemComponent,] }]
    };
    return MenuBase;
}());
exports.MenuBase = MenuBase;
