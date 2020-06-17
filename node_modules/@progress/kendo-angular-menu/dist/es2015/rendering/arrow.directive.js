import { Directive, Input, HostBinding, isDevMode } from '@angular/core';
import { ItemsService } from '../services/items.service';
/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to render the default expand arrow.
 */
export class ExpandArrowDirective {
    constructor(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
    }
    get arrowDown() {
        return !this.item.horizontal;
    }
    get arrowRight() {
        return this.item.horizontal && !this.item.rtl;
    }
    get arrowLeft() {
        return this.item.horizontal && this.item.rtl;
    }
    ngOnInit() {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuExpandArrow directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    }
}
ExpandArrowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuExpandArrow]'
            },] },
];
/** @nocollapse */
ExpandArrowDirective.ctorParameters = () => [
    { type: ItemsService }
];
ExpandArrowDirective.propDecorators = {
    index: [{ type: Input, args: ['kendoMenuExpandArrow',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-icon',] }, { type: HostBinding, args: ['class.k-menu-expand-arrow',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    arrowDown: [{ type: HostBinding, args: ['class.k-i-arrow-60-down',] }],
    arrowRight: [{ type: HostBinding, args: ['class.k-i-arrow-60-right',] }],
    arrowLeft: [{ type: HostBinding, args: ['class.k-i-arrow-60-left',] }]
};
