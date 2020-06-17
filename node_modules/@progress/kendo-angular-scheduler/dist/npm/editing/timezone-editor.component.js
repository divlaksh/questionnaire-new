"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
exports.TIME_ZONE_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_2.forwardRef(function () { return TimeZoneEditorComponent; })
};
/**
 * Represents the Kendo UI TimeZone Editor component for Angular.
 * `TimeZoneEditorComponent` displays the currently loaded timezones.
 * Used for editing the `start` and `end` timezones of the `SchedulerEvent` objects.
 */
var TimeZoneEditorComponent = /** @class */ (function () {
    function TimeZoneEditorComponent() {
        /**
         * Specifies the width of the ComboBox which contains the names of the timezones.
         */
        this.width = 260;
        /**
         * Fires when the value of the component has changed.
         */
        this.valueChange = new core_2.EventEmitter();
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.tzNames = kendo_date_math_1.timezoneNames();
        this.tzSource = this.tzNames.slice();
    }
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.onTimeZoneChange = function (tzName) {
        this.tz = tzName;
        this.onChangeCallback(this.tz);
        this.valueChange.emit(tzName);
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.onTimeZoneFilterChange = function (value) {
        this.tzSource = this.tzNames.filter(function (tz) {
            return tz.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.writeValue = function (value) {
        if (typeof value === 'string' && this.tzNames.indexOf(value) >= 0) {
            this.tz = value;
        }
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.focus = function () {
        this.tzComboBox.focus();
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    TimeZoneEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TimeZoneEditorComponent.decorators = [
        { type: core_2.Component, args: [{
                    providers: [
                        exports.TIME_ZONE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-timezone-editor',
                    template: "\n        <kendo-combobox\n            #tzcombobox\n            [style.width.px]=\"width\"\n            [allowCustom]=\"false\"\n            [data]=\"tzSource\"\n            [filterable]=\"true\"\n            [suggest]=\"true\"\n            [value]=\"tz\"\n            (filterChange)=\"onTimeZoneFilterChange($event)\"\n            (valueChange)=\"onTimeZoneChange($event)\">\n        </kendo-combobox>\n    "
                },] },
    ];
    /** @nocollapse */
    TimeZoneEditorComponent.ctorParameters = function () { return []; };
    TimeZoneEditorComponent.propDecorators = {
        tzComboBox: [{ type: core_1.ViewChild, args: ['tzcombobox',] }],
        width: [{ type: core_2.Input }],
        valueChange: [{ type: core_2.Output }]
    };
    return TimeZoneEditorComponent;
}());
exports.TimeZoneEditorComponent = TimeZoneEditorComponent;
