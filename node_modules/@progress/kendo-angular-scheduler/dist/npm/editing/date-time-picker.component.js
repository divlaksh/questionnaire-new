"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
exports.SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_2.forwardRef(function () { return SchedulerDateTimePickerComponent; })
};
/**
 * @hidden
 */
var SchedulerDateTimePickerComponent = /** @class */ (function () {
    function SchedulerDateTimePickerComponent() {
        this.valueChange = new core_2.EventEmitter();
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
        { type: core_2.Component, args: [{
                    providers: [
                        exports.SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-scheduler-datetime-picker',
                    template: "\n    <kendo-datepicker\n        #datepicker\n        [(value)]='date'\n        (valueChange)='onValueChange($event)'\n    ></kendo-datepicker>\n    <kendo-timepicker *ngIf='!isAllDay'\n        [(value)]='date'\n        (valueChange)='onValueChange($event)'\n    ></kendo-timepicker>\n    "
                },] },
    ];
    SchedulerDateTimePickerComponent.propDecorators = {
        datePicker: [{ type: core_1.ViewChild, args: ['datepicker',] }],
        isAllDay: [{ type: core_2.Input }],
        valueChange: [{ type: core_2.Output }]
    };
    return SchedulerDateTimePickerComponent;
}());
exports.SchedulerDateTimePickerComponent = SchedulerDateTimePickerComponent;
