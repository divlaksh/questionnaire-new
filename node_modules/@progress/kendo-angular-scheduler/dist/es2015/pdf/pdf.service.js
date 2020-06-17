import { EventEmitter, Injectable, isDevMode } from '@angular/core';
import { hasObservers } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class PDFService {
    constructor() {
        this.createElement = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.done = new EventEmitter();
        this.elementReady = new EventEmitter();
    }
    save() {
        if (!hasObservers(this.elementReady)) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-scheduler-pdf> component.');
            }
            return;
        }
        if (!hasObservers(this.createElement)) {
            if (isDevMode()) {
                throw new Error('No active Scheduler view to export.');
            }
            return;
        }
        this.createElement.emit();
    }
}
PDFService.decorators = [
    { type: Injectable },
];
