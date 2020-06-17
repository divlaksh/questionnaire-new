"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recurrence_service_1 = require("./recurrence.service");
var util_1 = require("../../common/util");
var recurrence_service_2 = require("./recurrence.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var repeat_on_radio_button_directive_1 = require("./repeat-on-radio-button.directive");
/**
 * @hidden
 */
var RecurrenceMonthlyYearlyEditorComponent = /** @class */ (function () {
    function RecurrenceMonthlyYearlyEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeEventHandlers();
    }
    RecurrenceMonthlyYearlyEditorComponent.prototype.setInitialValues = function () {
        this.extendedWeekDays = this.recurrence.extendedWeekDays;
        this.offsetPositions = this.recurrence.offsetPositions;
        this.currentOffset = this.defaultOffset;
        this.currentWeekDay = this.defaultWeekDay;
        if (this.currentFreq === 'yearly') {
            this.months = this.recurrence.months;
            this.currentMonthMonthDay = this.currentMonthWeekDay = this.recurrence.rrule.byMonth[0];
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.subscribeEventHandlers = function () {
        this.subs = this.recurrence.repeatOnRuleChange.subscribe(this.onRepeatOnRuleChange.bind(this));
        this.subs.add(this.recurrence.frequencyChange.subscribe(this.onFrequencyChange.bind(this)));
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onRepeatOnRuleChange = function (newRepeatOnRule) {
        if (newRepeatOnRule === 'monthday') {
            this.recurrence.rrule.byMonthDay = [this.monthDay];
            if (this.currentFreq === 'yearly') {
                this.recurrence.rrule.byMonth = [this.currentMonthMonthDay];
            }
        }
        else if (newRepeatOnRule === 'weekday') {
            if (typeof this.weekDay === 'string') {
                /* day, weekday or weekend */
                this.recurrence.rrule.bySetPosition = [this.offset];
                this.recurrence.rrule.byWeekDay = this.weekDayRuleFromString(this.weekDay);
            }
            else {
                /* specific weekday */
                this.recurrence.rrule.byWeekDay = [{
                        day: this.weekDay,
                        offset: this.offset
                    }];
            }
            if (this.currentFreq === 'yearly') {
                this.recurrence.rrule.byMonth = [this.currentMonthWeekDay];
            }
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onFrequencyChange = function () {
        this.setInitialValues();
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "monthDay", {
        get: function () {
            var rrule = this.recurrence.rrule;
            if (util_1.isPresent(rrule.byMonthDay) && rrule.byMonthDay.length > 0) {
                return rrule.byMonthDay[0];
            }
            else if (util_1.isPresent(this.currentMonthDay)) {
                return this.currentMonthDay;
            }
            else {
                return this.recurrence.start.getDate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "weekDay", {
        get: function () {
            var rrule = this.recurrence.rrule;
            if (util_1.isPresent(rrule.byWeekDay)) {
                var weekDaysCount = rrule.byWeekDay.length;
                switch (weekDaysCount) {
                    case 7:
                        return 'day';
                    case 5:
                        return 'weekday';
                    case 2:
                        return 'weekend';
                    case 1:
                        return rrule.byWeekDay[0].day;
                    default:
                        break;
                }
            }
            else if (util_1.isPresent(this.currentWeekDay)) {
                return this.currentWeekDay;
            }
            return this.defaultWeekDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "offset", {
        get: function () {
            var rrule = this.recurrence.rrule;
            if (util_1.isPresent(rrule.byWeekDay)) {
                var weekDaysCount = rrule.byWeekDay.length;
                switch (weekDaysCount) {
                    case 7:
                    case 5:
                    case 2:
                        return rrule.bySetPosition[0];
                    case 1:
                        return rrule.byWeekDay[0].offset;
                    default:
                        break;
                }
            }
            else if (util_1.isPresent(this.currentOffset)) {
                return this.currentOffset;
            }
            return this.defaultOffset;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceMonthlyYearlyEditorComponent.prototype.onMonthChange = function (month, repeatOnRule) {
        if (repeatOnRule === 'monthday') {
            this.currentMonthMonthDay = month;
        }
        else {
            this.currentMonthWeekDay = month;
        }
        this.recurrence.setMonths([month]);
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onMonthDayChange = function (monthDay) {
        this.currentMonthDay = monthDay;
        this.recurrence.monthDays = [monthDay];
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onOffsetPositionChange = function (offset) {
        var rrule = this.recurrence.rrule;
        if (util_1.isPresent(rrule.byWeekDay)) {
            var weekDaysCount = rrule.byWeekDay.length;
            switch (weekDaysCount) {
                case 7:
                case 5:
                case 2:
                    this.recurrence.positions = [offset];
                    break;
                case 1:
                    rrule.byWeekDay[0].offset = offset;
                    this.recurrence.onChange();
                    break;
                default:
                    break;
            }
        }
        this.currentOffset = offset;
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onWeekDayChange = function (weekDay) {
        var weekDays;
        if (typeof weekDay === 'string') {
            /* day, weekday or weekend */
            weekDays = this.weekDayRuleFromString(weekDay);
            this.recurrence.positions = [this.offset];
        }
        else {
            /* specific weekday */
            weekDays = [{
                    day: weekDay,
                    offset: this.offset
                }];
        }
        this.currentWeekDay = weekDay;
        this.recurrence.setWeekDays(weekDays);
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.isDisabled = function (repeatOn) {
        return this.recurrence.repeatOnRule !== repeatOn;
    };
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "currentFreq", {
        get: function () {
            return this.recurrence.frequency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "defaultOffset", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceMonthlyYearlyEditorComponent.prototype, "defaultWeekDay", {
        get: function () {
            return this.recurrence.start.getDay();
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceMonthlyYearlyEditorComponent.prototype.weekDayRuleFromString = function (weekDay) {
        switch (weekDay) {
            case 'day':
                return recurrence_service_2.dayRule;
            case 'weekday':
                return recurrence_service_2.weekdayRule;
            case 'weekend':
                return recurrence_service_2.weekendRule;
            default:
                break;
        }
        return null;
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.textForRepeatOn = function () {
        var freq = this.currentFreq;
        switch (freq) {
            case 'monthly':
                return this.textFor('monthlyRepeatOn');
            case 'yearly':
                return this.textFor('yearlyRepeatOn');
            default:
                break;
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceMonthlyYearlyEditorComponent.prototype.onRepeatOnLabelClick = function () {
        var selected = this.repeatOnRadioButtons.toArray().find(function (r) { return r.elem.checked; });
        if (selected) {
            selected.elem.focus();
        }
    };
    RecurrenceMonthlyYearlyEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-recurrence-monthly-yearly-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onRepeatOnLabelClick()\">{{ textForRepeatOn() }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <ul class='k-reset' [style.width.px]='650'>\n                <li>\n                    <input [kendoRecurrenceRepeatOnRadioButton]=\"'monthday'\" />\n\n                    <label class='k-radio-label' for='k-repeaton-monthday'>\n                        <ng-template [ngIf]=\"currentFreq === 'monthly'\">\n                            {{ textFor('monthlyDay') }}\n                        </ng-template>\n                    </label>\n\n                    <ng-template [ngIf]=\"currentFreq === 'yearly'\">\n                        <kendo-dropdownlist\n                            [data]='months'\n                            textField='text'\n                            valueField='value'\n                            [value]='currentMonthMonthDay'\n                            [valuePrimitive]='true'\n                            (valueChange)=\"onMonthChange($event, 'monthday')\"\n                            [disabled]=\"isDisabled('monthday')\">\n                        </kendo-dropdownlist>\n                    </ng-template>\n\n                    <kendo-numerictextbox\n                        [style.width.px]='70'\n                        [min]='1'\n                        [max]='31'\n                        [decimals]='0'\n                        [format]=\"'#'\"\n                        [autoCorrect]='true'\n                        [value]='monthDay'\n                        (valueChange)='onMonthDayChange($event)'\n                        [disabled]=\"isDisabled('monthday')\">\n                    </kendo-numerictextbox>\n                </li>\n                <li>\n                    <input [kendoRecurrenceRepeatOnRadioButton]=\"'weekday'\" />\n                    <label class='k-radio-label' for='k-repeaton-weekday'></label>\n\n                    <kendo-dropdownlist\n                        [data]='offsetPositions'\n                        textField='text'\n                        valueField='value'\n                        [value]='offset'\n                        [valuePrimitive]='true'\n                        (valueChange)='onOffsetPositionChange($event)'\n                        [disabled]=\"isDisabled('weekday')\">\n                    </kendo-dropdownlist>\n\n                    <kendo-dropdownlist\n                        [data]=\"extendedWeekDays\"\n                        textField='text'\n                        valueField='value'\n                        [value]='weekDay'\n                        [valuePrimitive]='true'\n                        (valueChange)='onWeekDayChange($event)'\n                        [disabled]=\"isDisabled('weekday')\">\n                    </kendo-dropdownlist>\n\n                    <ng-template [ngIf]=\"currentFreq === 'yearly'\">\n                        <span>{{ textFor('yearlyOf') }}</span>\n\n                        <kendo-dropdownlist\n                            [data]='months'\n                            textField='text'\n                            valueField='value'\n                            [value]='currentMonthWeekDay'\n                            [valuePrimitive]='true'\n                            (valueChange)=\"onMonthChange($event, 'weekday')\"\n                            [disabled]=\"isDisabled('weekday')\">\n                        </kendo-dropdownlist>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceMonthlyYearlyEditorComponent.ctorParameters = function () { return [
        { type: recurrence_service_1.RecurrenceService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    RecurrenceMonthlyYearlyEditorComponent.propDecorators = {
        repeatOnRadioButtons: [{ type: core_1.ViewChildren, args: [repeat_on_radio_button_directive_1.RepeatOnRadioButtonDirective,] }]
    };
    return RecurrenceMonthlyYearlyEditorComponent;
}());
exports.RecurrenceMonthlyYearlyEditorComponent = RecurrenceMonthlyYearlyEditorComponent;
