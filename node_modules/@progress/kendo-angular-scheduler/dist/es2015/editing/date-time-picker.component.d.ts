import { ControlValueAccessor } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DatePickerComponent } from '@progress/kendo-angular-dateinputs';
/**
 * @hidden
 */
export declare const SCHEDULER_DATETIMEPICKER_VALUE_ACCESSOR: any;
/**
 * @hidden
 */
export declare class SchedulerDateTimePickerComponent implements ControlValueAccessor {
    datePicker: DatePickerComponent;
    isAllDay: boolean;
    valueChange: EventEmitter<Date>;
    date: Date;
    writeValue(newDate: any): void;
    onValueChange(newValue: Date): void;
    /**
     * @hidden
     */
    focus(): void;
    onTouchedCallback: Function;
    onChangeCallback: Function;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
}
