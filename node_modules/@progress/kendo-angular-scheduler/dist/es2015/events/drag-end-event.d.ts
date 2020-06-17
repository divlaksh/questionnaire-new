import { SchedulerComponent } from '../scheduler.component';
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `dragEnd` event.
 */
export declare class DragEndEvent extends PreventableEvent {
    /**
     * The original Scheduler event.
     */
    event: any;
    /**
     * The `isAllDay` value.
     */
    isAllDay: boolean;
    /**
     * The data item of the event.
     */
    dataItem: any;
    /**
     * The new start date of the event.
     */
    start: Date;
    /**
     * The new end date of the event.
     */
    end: Date;
    /**
     * The resources when ending the dragging.
     */
    resources: any;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
