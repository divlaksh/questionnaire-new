"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * @hidden
 */
exports.defined = function (value) { return typeof value !== 'undefined'; };
/**
 * @hidden
 */
exports.bodyFactory = function () {
    if (kendo_angular_common_1.isDocumentAvailable()) {
        return new core_1.ElementRef(document.body);
    }
};
