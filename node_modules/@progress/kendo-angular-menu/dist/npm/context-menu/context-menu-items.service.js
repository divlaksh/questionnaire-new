"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var context_menu_service_1 = require("./context-menu.service");
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ContextMenuItemsService.ctorParameters = function () { return [
        { type: context_menu_service_1.ContextMenuService }
    ]; };
    return ContextMenuItemsService;
}());
exports.ContextMenuItemsService = ContextMenuItemsService;
