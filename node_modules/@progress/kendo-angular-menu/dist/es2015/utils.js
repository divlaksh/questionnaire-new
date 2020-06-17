import { ElementRef } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export const defined = (value) => typeof value !== 'undefined';
/**
 * @hidden
 */
export const bodyFactory = () => {
    if (isDocumentAvailable()) {
        return new ElementRef(document.body);
    }
};
