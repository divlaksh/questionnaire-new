import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
var emptyDateRange = function () { return ({
    start: new Date(0),
    end: new Date(0),
    text: '',
    shortText: ''
}); };
var ɵ0 = emptyDateRange;
/**
 * A service for publishing the view state and actions to the Scheduler.
 */
var ViewStateService = /** @class */ (function () {
    function ViewStateService() {
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
    ViewStateService.prototype.notifyNextDate = function (date) {
        this.nextDateSource.next(date);
    };
    /**
     * Publishes the visible date range of the view.
     * The view will calculate and set the new data range when
     * the selected date changes.
     */
    ViewStateService.prototype.notifyDateRange = function (range) {
        this.dateRangeSource.next(range);
    };
    /**
     * Notifies the Scheduler that the view has completed its layout.
     */
    ViewStateService.prototype.notifyLayoutEnd = function () {
        this.layoutEndSource.next();
    };
    /**
     * Navigates to another view.
     */
    ViewStateService.prototype.navigateTo = function (args) {
        this.navigateSource.next(args);
    };
    /**
     * Notifies the Scheduler that the view options have been changed.
     */
    ViewStateService.prototype.notifyOptionsChange = function () {
        this.optionsChangeSource.next(null);
    };
    /**
     * Emits a DOM event to the Scheduler.
     */
    ViewStateService.prototype.emitEvent = function (name, args) {
        this.viewEventSource.next({
            name: name,
            args: args
        });
    };
    ViewStateService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ViewStateService.ctorParameters = function () { return []; };
    return ViewStateService;
}());
export { ViewStateService };
export { ɵ0 };
