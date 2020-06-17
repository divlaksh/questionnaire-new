import { SchedulerComponent } from '../scheduler.component';
/**
 * @hidden
 */
export declare abstract class EditEventBase {
    /**
     * Indicates if the event is new or existing.
     */
    isNew: boolean;
    /**
     * The edited data item.
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
