"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var scheduler_localization_service_1 = require("../../../localization/scheduler-localization.service");
var util_1 = require("../../../common/util");
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
            return this.schedulerLocalization.get('recurrenceEditor' + util_1.capitalize(shortKey));
        }
        return _super.prototype.get.call(this, shortKey);
    };
    /** @nocollapse */
    RecurrenceLocalizationService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: core_1.Inject, args: [kendo_angular_l10n_1.L10N_PREFIX,] }] },
        { type: kendo_angular_l10n_1.MessageService, decorators: [{ type: core_1.Optional }] },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] }] },
        { type: scheduler_localization_service_1.SchedulerLocalizationService, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [scheduler_localization_service_1.SchedulerLocalizationService,] }] }
    ]; };
    return RecurrenceLocalizationService;
}(kendo_angular_l10n_1.LocalizationService));
exports.RecurrenceLocalizationService = RecurrenceLocalizationService;
