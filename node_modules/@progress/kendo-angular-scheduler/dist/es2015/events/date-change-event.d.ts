import { SchedulerComponent } from '../scheduler.component';
import { DateRange } from '../types';
/**
 * Arguments for the `dateChange` event.
 */
export declare class DateChangeEvent {
    /**
     * The currently selected date of the Scheduler.
     */
    selectedDate: Date;
    /**
     * The date range of the current view.
     */
    dateRange: DateRange;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, selectedDate: Date, dateRange: DateRange);
}
