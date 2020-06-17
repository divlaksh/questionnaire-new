import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { DayTimeViewBase } from '../day-time/day-time-view-base';
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
        slotFill: [{ type: Input }]
    };
    return MultiDayViewBase;
}(DayTimeViewBase));
export { MultiDayViewBase };
