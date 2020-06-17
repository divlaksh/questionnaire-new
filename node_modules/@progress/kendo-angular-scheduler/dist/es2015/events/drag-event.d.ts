import { SchedulerComponent } from '../scheduler.component';
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `drag` event.
 */
export declare class DragEvent extends PreventableEvent {
    /**
     * The original Scheduler event.
     */
    event: any;
    /**
     * The current `isAllDay` value.
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
     * The current resources while dragging.
     */
    resources: any;
    /**
     * Sets the class to the drag hint ([see example]({% slug restrictions_scheduler %})).
     */
    setHintClass: (className: string) => void;
    /**
     * Sets the class to the slot over which the event is dragged.
     */
    setSlotClass: (className: string) => void;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
