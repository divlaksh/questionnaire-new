import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 */
var RecurrenceEditorLocalizedMessagesDirective = /** @class */ (function (_super) {
    tslib_1.__extends(RecurrenceEditorLocalizedMessagesDirective, _super);
    function RecurrenceEditorLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    RecurrenceEditorLocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return RecurrenceEditorLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoRecurrenceEditorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return RecurrenceEditorLocalizedMessagesDirective;
}(Messages));
export { RecurrenceEditorLocalizedMessagesDirective };
