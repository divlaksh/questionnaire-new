import { SchedulerComponent } from '../scheduler.component';
/**
 * Arguments for the `eventClick` and `eventDblClick` events.
 */
export declare class EventClickEvent {
    /**
     * The event type.
     */
    type: 'click' | 'contextmenu';
    /**
     * The original Scheduler event.
     */
    event: any;
    /**
     * The original DOM event.
     */
    originalEvent: any;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, args: any);
}
