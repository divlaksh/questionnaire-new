import { SchedulerComponent } from '../scheduler.component';
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resizeStart` event.
 */
export declare class ResizeStartEvent extends PreventableEvent {
    /**
     * The original Scheduler event.
     */
    event: any;
    /**
     * The data item of the event.
     */
    dataItem: any;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
