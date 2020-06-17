import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class ContextMenuTargetService {
    constructor() {
        this.targets = [];
    }
    add(target) {
        this.targets.push(target);
    }
    remove(target) {
        const index = this.targets.indexOf(target);
        this.targets.splice(index, 1);
    }
    find(targetElement) {
        return this.targets.find(target => target.element === targetElement);
    }
}
ContextMenuTargetService.decorators = [
    { type: Injectable },
];
