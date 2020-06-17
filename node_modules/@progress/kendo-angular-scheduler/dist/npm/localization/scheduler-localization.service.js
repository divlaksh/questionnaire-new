"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        { type: String, decorators: [{ type: core_1.Inject, args: [kendo_angular_l10n_1.L10N_PREFIX,] }] },
        { type: kendo_angular_l10n_1.MessageService, decorators: [{ type: core_1.Optional }] },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] }] }
    ]; };
    return SchedulerLocalizationService;
}(kendo_angular_l10n_1.LocalizationService));
exports.SchedulerLocalizationService = SchedulerLocalizationService;
