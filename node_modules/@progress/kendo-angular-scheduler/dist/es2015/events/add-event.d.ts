import { PreventableEvent } from './preventable-event';
import { SchedulerComponent } from '../scheduler.component';
/**
 * Arguments for the `add` event of the editing directives.
 */
export declare class AddEvent extends PreventableEvent {
    /**
     * The data for binding the **Add** dialog.
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
