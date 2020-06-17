import { SchedulerComponent } from '../scheduler.component';
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resize` event.
 */
export declare class ResizeEvent extends PreventableEvent {
    /**
     * The original Scheduler event.
     */
    event: any;
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
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * Sets the class to the resize hint ([see example]({% slug restrictions_scheduler %})).
     */
    setHintClass: (className: string) => void;
    /**
     * Sets the class to the slot over which the event is resized.
     */
    setSlotClass: (className: string) => void;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
