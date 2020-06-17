import { Injectable, EventEmitter } from '@angular/core';
import { hasObservers } from '@progress/kendo-angular-common';
import { inMenu } from '../dom-queries';
/**
 * @hidden
 */
export class ContextMenuService {
    constructor() {
        this.keydown = new EventEmitter();
    }
    emit(name, args) {
        this.owner.emitMenuEvent(name, args);
    }
    hasObservers(name) {
        return this.owner && hasObservers(this.owner[name]);
    }
    leaveMenu(e) {
        return this.items ? !inMenu(e.target, this.items) : true;
    }
}
ContextMenuService.decorators = [
    { type: Injectable },
];
