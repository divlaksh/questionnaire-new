import { Input, ContentChild } from '@angular/core';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { TimeSlotTemplateDirective, DateHeaderTemplateDirective } from '../templates';
import { DEFAULT_EVENT_HEIGHT } from '../constants';
import { isPresent } from '../../common/util';
import { Day } from '@progress/kendo-date-math';
const EVENT_HEIGHT = 'eventHeight';
const SHOW_WORK_HOURS = 'showWorkHours';
const START_TIME = 'startTime';
const END_TIME = 'endTime';
const WORK_DAY_START = 'workDayStart';
const WORK_DAY_END = 'workDayEnd';
const WORK_WEEK_START = 'workWeekStart';
const WORK_WEEK_END = 'workWeekEnd';
const SLOT_DURATION = 'slotDuration';
const SLOT_DIVISIONS = 'slotDivisions';
const CURRENT_TIME_MARKER = 'currentTimeMarker';
/**
 * @hidden
 */
export class DayTimeViewBase extends ConfigurationViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
    }
    /**
     * @hidden
     */
    get viewEventHeight() {
        return this.optionValue(EVENT_HEIGHT) || DEFAULT_EVENT_HEIGHT;
    }
    /**
     * @hidden
     */
    get shouldShowWorkHours() {
        return this.optionValue(SHOW_WORK_HOURS);
    }
    /**
     * @hidden
     */
    get viewStartTime() {
        return this.optionValue(START_TIME);
    }
    /**
     * @hidden
     */
    get viewEndTime() {
        return this.optionValue(END_TIME);
    }
    /**
     * @hidden
     */
    get viewWorkDayStart() {
        return this.optionValue(WORK_DAY_START);
    }
    /**
     * @hidden
     */
    get viewWorkDayEnd() {
        return this.optionValue(WORK_DAY_END);
    }
    /**
     * @hidden
     */
    get viewWorkWeekStart() {
        return this.optionValue(WORK_WEEK_START);
    }
    /**
     * @hidden
     */
    get viewWorkWeekEnd() {
        return this.optionValue(WORK_WEEK_END);
    }
    /**
     * @hidden
     */
    get viewSlotDuration() {
        return this.optionValue(SLOT_DURATION);
    }
    /**
     * @hidden
     */
    get viewSlotDivisions() {
        return this.optionValue(SLOT_DIVISIONS);
    }
    /**
     * @hidden
     */
    get viewCurrentTimeMarker() {
        return this.optionValue(CURRENT_TIME_MARKER);
    }
    /**
     * @hidden
     */
    get viewScrollTime() {
        return this.optionValue('scrollTime');
    }
    optionValue(name) {
        return isPresent(this[name]) ? this[name] : this.schedulerOptions[name];
    }
}
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
