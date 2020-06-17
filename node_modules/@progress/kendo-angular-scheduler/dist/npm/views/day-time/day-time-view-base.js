"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_view_base_1 = require("../common/configuration-view-base");
var templates_1 = require("../templates");
var constants_1 = require("../constants");
var util_1 = require("../../common/util");
var kendo_date_math_1 = require("@progress/kendo-date-math");
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
            return this.optionValue(EVENT_HEIGHT) || constants_1.DEFAULT_EVENT_HEIGHT;
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
        return util_1.isPresent(this[name]) ? this[name] : this.schedulerOptions[name];
    };
    DayTimeViewBase.propDecorators = {
        timeSlotTemplate: [{ type: core_1.ContentChild, args: [templates_1.TimeSlotTemplateDirective,] }],
        dateHeaderTemplate: [{ type: core_1.ContentChild, args: [templates_1.DateHeaderTemplateDirective,] }],
        showWorkHours: [{ type: core_1.Input }],
        eventHeight: [{ type: core_1.Input }],
        startTime: [{ type: core_1.Input }],
        scrollTime: [{ type: core_1.Input }],
        endTime: [{ type: core_1.Input }],
        workDayStart: [{ type: core_1.Input }],
        workDayEnd: [{ type: core_1.Input }],
        workWeekStart: [{ type: core_1.Input }],
        workWeekEnd: [{ type: core_1.Input }],
        slotDuration: [{ type: core_1.Input }],
        slotDivisions: [{ type: core_1.Input }],
        currentTimeMarker: [{ type: core_1.Input }]
    };
    return DayTimeViewBase;
}(configuration_view_base_1.ConfigurationViewBase));
exports.DayTimeViewBase = DayTimeViewBase;
