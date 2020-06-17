import { Directive, Input, HostBinding, isDevMode } from '@angular/core';
import { ItemsService } from '../services/items.service';
/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to render the default expand arrow.
 */
var ExpandArrowDirective = /** @class */ (function () {
    function ExpandArrowDirective(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
    }
    Object.defineProperty(ExpandArrowDirective.prototype, "arrowDown", {
        get: function () {
            return !this.item.horizontal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandArrowDirective.prototype, "arrowRight", {
        get: function () {
            return this.item.horizontal && !this.item.rtl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandArrowDirective.prototype, "arrowLeft", {
        get: function () {
            return this.item.horizontal && this.item.rtl;
        },
        enumerable: true,
        configurable: true
    });
    ExpandArrowDirective.prototype.ngOnInit = function () {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuExpandArrow directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    };
    ExpandArrowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuExpandArrow]'
                },] },
    ];
    /** @nocollapse */
    ExpandArrowDirective.ctorParameters = function () { return [
        { type: ItemsService }
    ]; };
    ExpandArrowDirective.propDecorators = {
        index: [{ type: Input, args: ['kendoMenuExpandArrow',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-icon',] }, { type: HostBinding, args: ['class.k-menu-expand-arrow',] }],
        role: [{ type: HostBinding, args: ['attr.role',] }],
        arrowDown: [{ type: HostBinding, args: ['class.k-i-arrow-60-down',] }],
        arrowRight: [{ type: HostBinding, args: ['class.k-i-arrow-60-right',] }],
        arrowLeft: [{ type: HostBinding, args: ['class.k-i-arrow-60-left',] }]
    };
    return ExpandArrowDirective;
}());
export { ExpandArrowDirective };
