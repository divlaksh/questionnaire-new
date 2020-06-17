import { PreventableEvent } from './preventable-event';
import { SchedulerComponent } from '../scheduler.component';
import { SchedulerEvent } from '../types';
/**
 * Arguments for the `remove` event.
 */
export declare class RemoveEvent extends PreventableEvent {
    /**
     * The event data item whose **Remove** icon is clicked.
     */
    dataItem: any;
    /**
     * The event whose **Remove** icon is clicked.
     */
    event: SchedulerEvent;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
