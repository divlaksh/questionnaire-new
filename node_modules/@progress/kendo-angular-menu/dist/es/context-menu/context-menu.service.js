import { Injectable, EventEmitter } from '@angular/core';
import { hasObservers } from '@progress/kendo-angular-common';
import { inMenu } from '../dom-queries';
/**
 * @hidden
 */
var ContextMenuService = /** @class */ (function () {
    function ContextMenuService() {
        this.keydown = new EventEmitter();
    }
    ContextMenuService.prototype.emit = function (name, args) {
        this.owner.emitMenuEvent(name, args);
    };
    ContextMenuService.prototype.hasObservers = function (name) {
        return this.owner && hasObservers(this.owner[name]);
    };
    ContextMenuService.prototype.leaveMenu = function (e) {
        return this.items ? !inMenu(e.target, this.items) : true;
    };
    ContextMenuService.decorators = [
        { type: Injectable },
    ];
    return ContextMenuService;
}());
export { ContextMenuService };
