"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var items_service_1 = require("../services/items.service");
/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to apply the default styling and behavior.
 */
var LinkDirective = /** @class */ (function () {
    function LinkDirective(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
        this.tabindex = '-1';
    }
    Object.defineProperty(LinkDirective.prototype, "activeClass", {
        get: function () {
            return this.item.opened;
        },
        enumerable: true,
        configurable: true
    });
    LinkDirective.prototype.ngOnInit = function () {
        if (core_1.isDevMode() && !this.index) {
            throw new Error('The kendoMenuItemLink directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    };
    LinkDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoMenuItemLink]'
                },] },
    ];
    /** @nocollapse */
    LinkDirective.ctorParameters = function () { return [
        { type: items_service_1.ItemsService }
    ]; };
    LinkDirective.propDecorators = {
        index: [{ type: core_1.Input, args: ['kendoMenuItemLink',] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-link',] }, { type: core_1.HostBinding, args: ['class.k-menu-link',] }],
        role: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        tabindex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        activeClass: [{ type: core_1.HostBinding, args: ['class.k-state-active',] }]
    };
    return LinkDirective;
}());
exports.LinkDirective = LinkDirective;
