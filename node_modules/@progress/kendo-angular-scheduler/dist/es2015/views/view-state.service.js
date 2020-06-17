import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
const emptyDateRange = () => ({
    start: new Date(0),
    end: new Date(0),
    text: '',
    shortText: ''
});
const ɵ0 = emptyDateRange;
/**
 * A service for publishing the view state and actions to the Scheduler.
 */
export class ViewStateService {
    constructor() {
        this.dateRangeSource = new BehaviorSubject(emptyDateRange());
        this.nextDateSource = new Subject();
        this.navigateSource = new Subject();
        this.viewEventSource = new Subject();
        this.layoutEndSource = new Subject();
        this.optionsChangeSource = new Subject();
        this.dateRange = this.dateRangeSource.asObservable();
        this.nextDate = this.nextDateSource.asObservable();
        this.navigate = this.navigateSource.asObservable();
        this.viewEvent = this.viewEventSource.asObservable();
        this.layoutEnd = this.layoutEndSource.asObservable();
        this.optionsChange = this.optionsChangeSource.asObservable();
    }
    /**
     * Publishes the date that will be displayed by the Scheduler
     * typically as a result from processing a navigation action.
     */
    notifyNextDate(date) {
        this.nextDateSource.next(date);
    }
    /**
     * Publishes the visible date range of the view.
     * The view will calculate and set the new data range when
     * the selected date changes.
     */
    notifyDateRange(range) {
        this.dateRangeSource.next(range);
    }
    /**
     * Notifies the Scheduler that the view has completed its layout.
     */
    notifyLayoutEnd() {
        this.layoutEndSource.next();
    }
    /**
     * Navigates to another view.
     */
    navigateTo(args) {
        this.navigateSource.next(args);
    }
    /**
     * Notifies the Scheduler that the view options have been changed.
     */
    notifyOptionsChange() {
        this.optionsChangeSource.next(null);
    }
    /**
     * Emits a DOM event to the Scheduler.
     */
    emitEvent(name, args) {
        this.viewEventSource.next({
            name: name,
            args: args
        });
    }
}
ViewStateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ViewStateService.ctorParameters = () => [];
export { ɵ0 };
