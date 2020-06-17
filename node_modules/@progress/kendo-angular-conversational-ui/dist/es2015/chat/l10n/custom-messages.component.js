import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
// tslint:disable:no-forward-ref
/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_chat %}#toc-custom-messages)).
 */
export class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent)
                    }
                ],
                selector: 'kendo-chat-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];
