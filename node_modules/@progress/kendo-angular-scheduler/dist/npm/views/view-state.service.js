"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var emptyDateRange = function () { return ({
    start: new Date(0),
    end: new Date(0),
    text: '',
    shortText: ''
}); };
var ɵ0 = emptyDateRange;
exports.ɵ0 = ɵ0;
/**
 * A service for publishing the view state and actions to the Scheduler.
 */
var ViewStateService = /** @class */ (function () {
    function ViewStateService() {
        this.dateRangeSource = new rxjs_1.BehaviorSubject(emptyDateRange());
        this.nextDateSource = new rxjs_1.Subject();
        this.navigateSource = new rxjs_1.Subject();
        this.viewEventSource = new rxjs_1.Subject();
        this.layoutEndSource = new rxjs_1.Subject();
        this.optionsChangeSource = new rxjs_1.Subject();
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ViewStateService.ctorParameters = function () { return []; };
    return ViewStateService;
}());
exports.ViewStateService = ViewStateService;
