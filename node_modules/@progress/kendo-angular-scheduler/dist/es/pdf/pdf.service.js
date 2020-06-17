import { EventEmitter, Injectable, isDevMode } from '@angular/core';
import { hasObservers } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
var PDFService = /** @class */ (function () {
    function PDFService() {
        this.createElement = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.done = new EventEmitter();
        this.elementReady = new EventEmitter();
    }
    PDFService.prototype.save = function () {
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
    };
    PDFService.decorators = [
        { type: Injectable },
    ];
    return PDFService;
}());
export { PDFService };
