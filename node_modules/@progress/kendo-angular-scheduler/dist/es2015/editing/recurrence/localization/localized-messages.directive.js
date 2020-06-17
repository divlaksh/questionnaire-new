import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 */
export class RecurrenceEditorLocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
RecurrenceEditorLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => RecurrenceEditorLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoRecurrenceEditorLocalizedMessages]'
            },] },
];
/** @nocollapse */
RecurrenceEditorLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
