import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 * Custom component messages override default component messages.
 */
export class RecurrenceEditorCustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
RecurrenceEditorCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => RecurrenceEditorCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-recurrence-editor-messages',
                template: ``
            },] },
];
/** @nocollapse */
RecurrenceEditorCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];
