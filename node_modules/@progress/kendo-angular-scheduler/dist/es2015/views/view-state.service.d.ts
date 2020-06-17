import { Observable } from 'rxjs';
import { DateRange } from '../types';
/**
 * A service for publishing the view state and actions to the Scheduler.
 */
export declare class ViewStateService {
    /**
     * A stream for publishing the visible date range of the current view to the Scheduler.
     */
    readonly dateRange: Observable<DateRange>;
    /**
     * A stream for publishing the changes to the selected date that are initiated from the view.
     */
    readonly nextDate: Observable<Date>;
    /**
     * A stream fro navigating from the current to another view.
     */
    readonly navigate: Observable<any>;
    /**
     * A stream for navigating from the current to another view.
     */
    readonly viewEvent: Observable<any>;
    /**
     * A stream for indicating that the view layout finished.
     */
    readonly layoutEnd: Observable<any>;
    /**
     * A stream for indicating that the view options has changed.
     */
    readonly optionsChange: Observable<any>;
    private dateRangeSource;
    private nextDateSource;
    private navigateSource;
    private viewEventSource;
    private layoutEndSource;
    private optionsChangeSource;
    constructor();
    /**
     * Publishes the date that will be displayed by the Scheduler
     * typically as a result from processing a navigation action.
     */
    notifyNextDate(date: Date): void;
    /**
     * Publishes the visible date range of the view.
     * The view will calculate and set the new data range when
     * the selected date changes.
     */
    notifyDateRange(range: DateRange): void;
    /**
     * Notifies the Scheduler that the view has completed its layout.
     */
    notifyLayoutEnd(): void;
    /**
     * Navigates to another view.
     */
    navigateTo(args: any): void;
    /**
     * Notifies the Scheduler that the view options have been changed.
     */
    notifyOptionsChange(): void;
    /**
     * Emits a DOM event to the Scheduler.
     */
    emitEvent(name: string, args: any): void;
}
