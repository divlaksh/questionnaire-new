import { PreventableEvent } from '@progress/kendo-angular-dateinputs';
import { SchedulerComponent } from '../scheduler.component';
import { NavigationAction } from '../types';
/**
 * Arguments for the `navigate` event.
 */
export declare class NavigateEvent extends PreventableEvent {
    /**
     * The navigation action that triggered the event.
     */
    action: NavigationAction;
    /**
     * A reference to the Scheduler instance that triggered the event.
     */
    sender: SchedulerComponent;
    /**
     * @hidden
     */
    constructor(sender: SchedulerComponent, action: NavigationAction);
}
