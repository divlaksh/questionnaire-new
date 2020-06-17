import * as tslib_1 from "tslib";
import { Inject, Optional } from '@angular/core';
import { LocalizationService, L10N_PREFIX, MessageService, RTL } from '@progress/kendo-angular-l10n';
import { SchedulerLocalizationService } from '../../../localization/scheduler-localization.service';
import { capitalize } from '../../../common/util';
/**
 * @hidden
 */
var RecurrenceLocalizationService = /** @class */ (function (_super) {
    tslib_1.__extends(RecurrenceLocalizationService, _super);
    function RecurrenceLocalizationService(prefix, messageService, _rtl, schedulerLocalization) {
        var _this = _super.call(this, prefix, messageService, _rtl) || this;
        _this.schedulerLocalization = schedulerLocalization;
        return _this;
    }
    RecurrenceLocalizationService.prototype.get = function (shortKey) {
        if (this.schedulerLocalization) {
            return this.schedulerLocalization.get('recurrenceEditor' + capitalize(shortKey));
        }
        return _super.prototype.get.call(this, shortKey);
    };
    /** @nocollapse */
    RecurrenceLocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] },
        { type: SchedulerLocalizationService, decorators: [{ type: Optional }, { type: Inject, args: [SchedulerLocalizationService,] }] }
    ]; };
    return RecurrenceLocalizationService;
}(LocalizationService));
export { RecurrenceLocalizationService };
