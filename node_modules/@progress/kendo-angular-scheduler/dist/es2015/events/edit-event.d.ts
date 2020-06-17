import { PreventableEvent } from './preventable-event';
import { SchedulerComponent } from '../scheduler.component';
import { SchedulerEvent } from '../types';
/**
 * Arguments for the `edit` event of the editing directives.
 */
export declare class EditEvent extends PreventableEvent {
    /**
     * The event data item for which the **Edit** dialog will be opened.
     */
    dataItem: any;
    /**
     * The event for which the **Edit** dialog will be opened.
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
