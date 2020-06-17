"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var day_time_view_base_1 = require("../day-time/day-time-view-base");
var SLOT_FILL = 'slotFill';
/**
 * @hidden
 */
var MultiDayViewBase = /** @class */ (function (_super) {
    tslib_1.__extends(MultiDayViewBase, _super);
    function MultiDayViewBase(localization, changeDetector, viewContext, viewState) {
        return _super.call(this, localization, changeDetector, viewContext, viewState) || this;
    }
    Object.defineProperty(MultiDayViewBase.prototype, "viewSlotFill", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SLOT_FILL);
        },
        enumerable: true,
        configurable: true
    });
    MultiDayViewBase.propDecorators = {
        slotFill: [{ type: core_1.Input }]
    };
    return MultiDayViewBase;
}(day_time_view_base_1.DayTimeViewBase));
exports.MultiDayViewBase = MultiDayViewBase;
