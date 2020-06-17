import * as tslib_1 from "tslib";
import { Inject, Optional } from '@angular/core';
import { LocalizationService, L10N_PREFIX, MessageService, RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var SchedulerLocalizationService = /** @class */ (function (_super) {
    tslib_1.__extends(SchedulerLocalizationService, _super);
    function SchedulerLocalizationService(prefix, messageService, _rtl) {
        return _super.call(this, prefix, messageService, _rtl) || this;
    }
    /** @nocollapse */
    SchedulerLocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    return SchedulerLocalizationService;
}(LocalizationService));
export { SchedulerLocalizationService };
