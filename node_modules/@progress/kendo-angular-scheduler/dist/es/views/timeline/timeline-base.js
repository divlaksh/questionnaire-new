import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { DayTimeViewBase } from '../day-time/day-time-view-base';
var COLUMN_WIDTH = 'columnWidth';
/**
 * @hidden
 */
var TimelineBase = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineBase, _super);
    function TimelineBase(localization, changeDetector, viewContext, viewState) {
        return _super.call(this, localization, changeDetector, viewContext, viewState) || this;
    }
    Object.defineProperty(TimelineBase.prototype, "viewColumnWidth", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(COLUMN_WIDTH);
        },
        enumerable: true,
        configurable: true
    });
    TimelineBase.propDecorators = {
        columnWidth: [{ type: Input }]
    };
    return TimelineBase;
}(DayTimeViewBase));
export { TimelineBase };
