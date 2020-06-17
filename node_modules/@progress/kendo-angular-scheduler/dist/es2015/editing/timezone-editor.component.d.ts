import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
export declare const TIME_ZONE_VALUE_ACCESSOR: any;
/**
 * Represents the Kendo UI TimeZone Editor component for Angular.
 * `TimeZoneEditorComponent` displays the currently loaded timezones.
 * Used for editing the `start` and `end` timezones of the `SchedulerEvent` objects.
 */
export declare class TimeZoneEditorComponent implements ControlValueAccessor {
    tzComboBox: ComboBoxComponent;
    /**
     * Specifies the width of the ComboBox which contains the names of the timezones.
     */
    width: number;
    /**
     * Fires when the value of the component has changed.
     */
    valueChange: EventEmitter<string>;
    tz: string;
    tzNames: Array<string>;
    tzSource: Array<string>;
    constructor();
    /**
     * @hidden
     */
    onTimeZoneChange(tzName: string): void;
    /**
     * @hidden
     */
    onTimeZoneFilterChange(value: string): void;
    /**
     * @hidden
     */
    writeValue(value: any): void;
    /**
     * @hidden
     */
    focus(): void;
    protected onTouchedCallback: Function;
    protected onChangeCallback: Function;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
}
