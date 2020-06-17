import { ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export const SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SchedulerDateTimePickerComponent)
};
/**
 * @hidden
 */
export class SchedulerDateTimePickerComponent {
    constructor() {
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
    }
    writeValue(newDate) {
        if (newDate instanceof Date) {
            this.date = newDate;
        }
    }
    onValueChange(newValue) {
        this.onChangeCallback(newValue);
        this.valueChange.emit(newValue);
    }
    /**
     * @hidden
     */
    focus() {
        this.datePicker.focus();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
SchedulerDateTimePickerComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR
                ],
                selector: 'kendo-scheduler-datetime-picker',
                template: `
    <kendo-datepicker
        #datepicker
        [(value)]='date'
        (valueChange)='onValueChange($event)'
    ></kendo-datepicker>
    <kendo-timepicker *ngIf='!isAllDay'
        [(value)]='date'
        (valueChange)='onValueChange($event)'
    ></kendo-timepicker>
    `
            },] },
];
SchedulerDateTimePickerComponent.propDecorators = {
    datePicker: [{ type: ViewChild, args: ['datepicker',] }],
    isAllDay: [{ type: Input }],
    valueChange: [{ type: Output }]
};
