import { Injectable } from '@angular/core';
import { ContextMenuService } from './context-menu.service';
/**
 * @hidden
 */
var ContextMenuItemsService = /** @class */ (function () {
    function ContextMenuItemsService(contextService) {
        this.contextService = contextService;
    }
    ContextMenuItemsService.prototype.get = function (index) {
        if (this.contextService.items) {
            return this.contextService.items.get(index);
        }
    };
    ContextMenuItemsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ContextMenuItemsService.ctorParameters = function () { return [
        { type: ContextMenuService }
    ]; };
    return ContextMenuItemsService;
}());
export { ContextMenuItemsService };
