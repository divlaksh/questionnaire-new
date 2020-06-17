import { Injectable } from '@angular/core';
import { ContextMenuService } from './context-menu.service';
/**
 * @hidden
 */
export class ContextMenuItemsService {
    constructor(contextService) {
        this.contextService = contextService;
    }
    get(index) {
        if (this.contextService.items) {
            return this.contextService.items.get(index);
        }
    }
}
ContextMenuItemsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ContextMenuItemsService.ctorParameters = () => [
    { type: ContextMenuService }
];
