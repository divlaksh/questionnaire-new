import { ViewChild } from '@angular/core';
import { Component, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { timezoneNames } from '@progress/kendo-date-math';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export const TIME_ZONE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeZoneEditorComponent)
};
/**
 * Represents the Kendo UI TimeZone Editor component for Angular.
 * `TimeZoneEditorComponent` displays the currently loaded timezones.
 * Used for editing the `start` and `end` timezones of the `SchedulerEvent` objects.
 */
export class TimeZoneEditorComponent {
    constructor() {
        /**
         * Specifies the width of the ComboBox which contains the names of the timezones.
         */
        this.width = 260;
        /**
         * Fires when the value of the component has changed.
         */
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
        this.tzNames = timezoneNames();
        this.tzSource = this.tzNames.slice();
    }
    /**
     * @hidden
     */
    onTimeZoneChange(tzName) {
        this.tz = tzName;
        this.onChangeCallback(this.tz);
        this.valueChange.emit(tzName);
    }
    /**
     * @hidden
     */
    onTimeZoneFilterChange(value) {
        this.tzSource = this.tzNames.filter((tz) => tz.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    /**
     * @hidden
     */
    writeValue(value) {
        if (typeof value === 'string' && this.tzNames.indexOf(value) >= 0) {
            this.tz = value;
        }
    }
    /**
     * @hidden
     */
    focus() {
        this.tzComboBox.focus();
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
TimeZoneEditorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    TIME_ZONE_VALUE_ACCESSOR
                ],
                selector: 'kendo-timezone-editor',
                template: `
        <kendo-combobox
            #tzcombobox
            [style.width.px]="width"
            [allowCustom]="false"
            [data]="tzSource"
            [filterable]="true"
            [suggest]="true"
            [value]="tz"
            (filterChange)="onTimeZoneFilterChange($event)"
            (valueChange)="onTimeZoneChange($event)">
        </kendo-combobox>
    `
            },] },
];
/** @nocollapse */
TimeZoneEditorComponent.ctorParameters = () => [];
TimeZoneEditorComponent.propDecorators = {
    tzComboBox: [{ type: ViewChild, args: ['tzcombobox',] }],
    width: [{ type: Input }],
    valueChange: [{ type: Output }]
};
