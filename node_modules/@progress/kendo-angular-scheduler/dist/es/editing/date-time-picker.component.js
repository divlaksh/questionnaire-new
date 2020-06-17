import { ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export var SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SchedulerDateTimePickerComponent; })
};
/**
 * @hidden
 */
var SchedulerDateTimePickerComponent = /** @class */ (function () {
    function SchedulerDateTimePickerComponent() {
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
    }
    SchedulerDateTimePickerComponent.prototype.writeValue = function (newDate) {
        if (newDate instanceof Date) {
            this.date = newDate;
        }
    };
    SchedulerDateTimePickerComponent.prototype.onValueChange = function (newValue) {
        this.onChangeCallback(newValue);
        this.valueChange.emit(newValue);
    };
    /**
     * @hidden
     */
    SchedulerDateTimePickerComponent.prototype.focus = function () {
        this.datePicker.focus();
    };
    /**
     * @hidden
     */
    SchedulerDateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    SchedulerDateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SchedulerDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-scheduler-datetime-picker',
                    template: "\n    <kendo-datepicker\n        #datepicker\n        [(value)]='date'\n        (valueChange)='onValueChange($event)'\n    ></kendo-datepicker>\n    <kendo-timepicker *ngIf='!isAllDay'\n        [(value)]='date'\n        (valueChange)='onValueChange($event)'\n    ></kendo-timepicker>\n    "
                },] },
    ];
    SchedulerDateTimePickerComponent.propDecorators = {
        datePicker: [{ type: ViewChild, args: ['datepicker',] }],
        isAllDay: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return SchedulerDateTimePickerComponent;
}());
export { SchedulerDateTimePickerComponent };
