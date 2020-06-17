"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * @hidden
 */
var PDFService = /** @class */ (function () {
    function PDFService() {
        this.createElement = new core_1.EventEmitter();
        this.exportClick = new core_1.EventEmitter();
        this.done = new core_1.EventEmitter();
        this.elementReady = new core_1.EventEmitter();
    }
    PDFService.prototype.save = function () {
        if (!kendo_angular_common_1.hasObservers(this.elementReady)) {
            if (core_1.isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-scheduler-pdf> component.');
            }
            return;
        }
        if (!kendo_angular_common_1.hasObservers(this.createElement)) {
            if (core_1.isDevMode()) {
                throw new Error('No active Scheduler view to export.');
            }
            return;
        }
        this.createElement.emit();
    };
    PDFService.decorators = [
        { type: core_1.Injectable },
    ];
    return PDFService;
}());
exports.PDFService = PDFService;
