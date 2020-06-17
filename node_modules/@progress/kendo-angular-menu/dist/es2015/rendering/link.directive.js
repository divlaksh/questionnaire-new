import { Directive, Input, HostBinding, isDevMode } from '@angular/core';
import { ItemsService } from '../services/items.service';
/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to apply the default styling and behavior.
 */
export class LinkDirective {
    constructor(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
        this.tabindex = '-1';
    }
    get activeClass() {
        return this.item.opened;
    }
    ngOnInit() {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuItemLink directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    }
}
LinkDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuItemLink]'
            },] },
];
/** @nocollapse */
LinkDirective.ctorParameters = () => [
    { type: ItemsService }
];
LinkDirective.propDecorators = {
    index: [{ type: Input, args: ['kendoMenuItemLink',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-link',] }, { type: HostBinding, args: ['class.k-menu-link',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    tabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    activeClass: [{ type: HostBinding, args: ['class.k-state-active',] }]
};
