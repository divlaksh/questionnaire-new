import { ElementRef } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export var defined = function (value) { return typeof value !== 'undefined'; };
/**
 * @hidden
 */
export var bodyFactory = function () {
    if (isDocumentAvailable()) {
        return new ElementRef(document.body);
    }
};
