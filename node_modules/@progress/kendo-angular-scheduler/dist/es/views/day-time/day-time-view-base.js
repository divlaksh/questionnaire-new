import * as tslib_1 from "tslib";
import { Input, ContentChild } from '@angular/core';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { TimeSlotTemplateDirective, DateHeaderTemplateDirective } from '../templates';
import { DEFAULT_EVENT_HEIGHT } from '../constants';
import { isPresent } from '../../common/util';
import { Day } from '@progress/kendo-date-math';
var EVENT_HEIGHT = 'eventHeight';
var SHOW_WORK_HOURS = 'showWorkHours';
var START_TIME = 'startTime';
var END_TIME = 'endTime';
var WORK_DAY_START = 'workDayStart';
var WORK_DAY_END = 'workDayEnd';
var WORK_WEEK_START = 'workWeekStart';
var WORK_WEEK_END = 'workWeekEnd';
var SLOT_DURATION = 'slotDuration';
var SLOT_DIVISIONS = 'slotDivisions';
var CURRENT_TIME_MARKER = 'currentTimeMarker';
/**
 * @hidden
 */
var DayTimeViewBase = /** @class */ (function (_super) {
    tslib_1.__extends(DayTimeViewBase, _super);
    function DayTimeViewBase(localization, changeDetector, viewContext, viewState) {
        return _super.call(this, localization, changeDetector, viewContext, viewState) || this;
    }
    Object.defineProperty(DayTimeViewBase.prototype, "viewEventHeight", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(EVENT_HEIGHT) || DEFAULT_EVENT_HEIGHT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "shouldShowWorkHours", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SHOW_WORK_HOURS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewStartTime", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(START_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewEndTime", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(END_TIME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkDayStart", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_DAY_START);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkDayEnd", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_DAY_END);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkWeekStart", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_WEEK_START);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewWorkWeekEnd", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(WORK_WEEK_END);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewSlotDuration", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SLOT_DURATION);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewSlotDivisions", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(SLOT_DIVISIONS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewCurrentTimeMarker", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue(CURRENT_TIME_MARKER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayTimeViewBase.prototype, "viewScrollTime", {
        /**
         * @hidden
         */
        get: function () {
            return this.optionValue('scrollTime');
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewBase.prototype.optionValue = function (name) {
        return isPresent(this[name]) ? this[name] : this.schedulerOptions[name];
    };
    DayTimeViewBase.propDecorators = {
        timeSlotTemplate: [{ type: ContentChild, args: [TimeSlotTemplateDirective,] }],
        dateHeaderTemplate: [{ type: ContentChild, args: [DateHeaderTemplateDirective,] }],
        showWorkHours: [{ type: Input }],
        eventHeight: [{ type: Input }],
        startTime: [{ type: Input }],
        scrollTime: [{ type: Input }],
        endTime: [{ type: Input }],
        workDayStart: [{ type: Input }],
        workDayEnd: [{ type: Input }],
        workWeekStart: [{ type: Input }],
        workWeekEnd: [{ type: Input }],
        slotDuration: [{ type: Input }],
        slotDivisions: [{ type: Input }],
        currentTimeMarker: [{ type: Input }]
    };
    return DayTimeViewBase;
}(ConfigurationViewBase));
export { DayTimeViewBase };
