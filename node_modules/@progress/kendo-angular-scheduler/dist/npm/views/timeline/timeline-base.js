"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var day_time_view_base_1 = require("../day-time/day-time-view-base");
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
        columnWidth: [{ type: core_1.Input }]
    };
    return TimelineBase;
}(day_time_view_base_1.DayTimeViewBase));
exports.TimelineBase = TimelineBase;
