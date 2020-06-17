import { ElementRef } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export function bodyFactory() {
    if (isDocumentAvailable()) {
        return new ElementRef(document.body);
    }
}
