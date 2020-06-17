import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 * Custom component messages override default component messages.
 */
var RecurrenceEditorCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RecurrenceEditorCustomMessagesComponent, _super);
    function RecurrenceEditorCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(RecurrenceEditorCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceEditorCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return RecurrenceEditorCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-recurrence-editor-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return RecurrenceEditorCustomMessagesComponent;
}(Messages));
export { RecurrenceEditorCustomMessagesComponent };
