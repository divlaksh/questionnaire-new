import { Component, ViewChildren, QueryList } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
import { isPresent } from '../../common/util';
import { dayRule, weekdayRule, weekendRule } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RepeatOnRadioButtonDirective } from './repeat-on-radio-button.directive';
/**
 * @hidden
 */
export class RecurrenceMonthlyYearlyEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeEventHandlers();
    }
    setInitialValues() {
        this.extendedWeekDays = this.recurrence.extendedWeekDays;
        this.offsetPositions = this.recurrence.offsetPositions;
        this.currentOffset = this.defaultOffset;
        this.currentWeekDay = this.defaultWeekDay;
        if (this.currentFreq === 'yearly') {
            this.months = this.recurrence.months;
            this.currentMonthMonthDay = this.currentMonthWeekDay = this.recurrence.rrule.byMonth[0];
        }
    }
    subscribeEventHandlers() {
        this.subs = this.recurrence.repeatOnRuleChange.subscribe(this.onRepeatOnRuleChange.bind(this));
        this.subs.add(this.recurrence.frequencyChange.subscribe(this.onFrequencyChange.bind(this)));
    }
    onRepeatOnRuleChange(newRepeatOnRule) {
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
    }
    onFrequencyChange() {
        this.setInitialValues();
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
    get monthDay() {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byMonthDay) && rrule.byMonthDay.length > 0) {
            return rrule.byMonthDay[0];
        }
        else if (isPresent(this.currentMonthDay)) {
            return this.currentMonthDay;
        }
        else {
            return this.recurrence.start.getDate();
        }
    }
    get weekDay() {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            const weekDaysCount = rrule.byWeekDay.length;
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
        else if (isPresent(this.currentWeekDay)) {
            return this.currentWeekDay;
        }
        return this.defaultWeekDay;
    }
    get offset() {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            const weekDaysCount = rrule.byWeekDay.length;
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
        else if (isPresent(this.currentOffset)) {
            return this.currentOffset;
        }
        return this.defaultOffset;
    }
    onMonthChange(month, repeatOnRule) {
        if (repeatOnRule === 'monthday') {
            this.currentMonthMonthDay = month;
        }
        else {
            this.currentMonthWeekDay = month;
        }
        this.recurrence.setMonths([month]);
    }
    onMonthDayChange(monthDay) {
        this.currentMonthDay = monthDay;
        this.recurrence.monthDays = [monthDay];
    }
    onOffsetPositionChange(offset) {
        const rrule = this.recurrence.rrule;
        if (isPresent(rrule.byWeekDay)) {
            const weekDaysCount = rrule.byWeekDay.length;
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
    }
    onWeekDayChange(weekDay) {
        let weekDays;
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
    }
    isDisabled(repeatOn) {
        return this.recurrence.repeatOnRule !== repeatOn;
    }
    get currentFreq() {
        return this.recurrence.frequency;
    }
    get defaultOffset() {
        return 1;
    }
    get defaultWeekDay() {
        return this.recurrence.start.getDay();
    }
    weekDayRuleFromString(weekDay) {
        switch (weekDay) {
            case 'day':
                return dayRule;
            case 'weekday':
                return weekdayRule;
            case 'weekend':
                return weekendRule;
            default:
                break;
        }
        return null;
    }
    textForRepeatOn() {
        const freq = this.currentFreq;
        switch (freq) {
            case 'monthly':
                return this.textFor('monthlyRepeatOn');
            case 'yearly':
                return this.textFor('yearlyRepeatOn');
            default:
                break;
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onRepeatOnLabelClick() {
        const selected = this.repeatOnRadioButtons.toArray().find(r => r.elem.checked);
        if (selected) {
            selected.elem.focus();
        }
    }
}
RecurrenceMonthlyYearlyEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-monthly-yearly-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onRepeatOnLabelClick()">{{ textForRepeatOn() }}</label>
        </div>
        <div class='k-edit-field'>
            <ul class='k-reset' [style.width.px]='650'>
                <li>
                    <input [kendoRecurrenceRepeatOnRadioButton]="'monthday'" />

                    <label class='k-radio-label' for='k-repeaton-monthday'>
                        <ng-template [ngIf]="currentFreq === 'monthly'">
                            {{ textFor('monthlyDay') }}
                        </ng-template>
                    </label>

                    <ng-template [ngIf]="currentFreq === 'yearly'">
                        <kendo-dropdownlist
                            [data]='months'
                            textField='text'
                            valueField='value'
                            [value]='currentMonthMonthDay'
                            [valuePrimitive]='true'
                            (valueChange)="onMonthChange($event, 'monthday')"
                            [disabled]="isDisabled('monthday')">
                        </kendo-dropdownlist>
                    </ng-template>

                    <kendo-numerictextbox
                        [style.width.px]='70'
                        [min]='1'
                        [max]='31'
                        [decimals]='0'
                        [format]="'#'"
                        [autoCorrect]='true'
                        [value]='monthDay'
                        (valueChange)='onMonthDayChange($event)'
                        [disabled]="isDisabled('monthday')">
                    </kendo-numerictextbox>
                </li>
                <li>
                    <input [kendoRecurrenceRepeatOnRadioButton]="'weekday'" />
                    <label class='k-radio-label' for='k-repeaton-weekday'></label>

                    <kendo-dropdownlist
                        [data]='offsetPositions'
                        textField='text'
                        valueField='value'
                        [value]='offset'
                        [valuePrimitive]='true'
                        (valueChange)='onOffsetPositionChange($event)'
                        [disabled]="isDisabled('weekday')">
                    </kendo-dropdownlist>

                    <kendo-dropdownlist
                        [data]="extendedWeekDays"
                        textField='text'
                        valueField='value'
                        [value]='weekDay'
                        [valuePrimitive]='true'
                        (valueChange)='onWeekDayChange($event)'
                        [disabled]="isDisabled('weekday')">
                    </kendo-dropdownlist>

                    <ng-template [ngIf]="currentFreq === 'yearly'">
                        <span>{{ textFor('yearlyOf') }}</span>

                        <kendo-dropdownlist
                            [data]='months'
                            textField='text'
                            valueField='value'
                            [value]='currentMonthWeekDay'
                            [valuePrimitive]='true'
                            (valueChange)="onMonthChange($event, 'weekday')"
                            [disabled]="isDisabled('weekday')">
                        </kendo-dropdownlist>
                    </ng-template>
                </li>
            </ul>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceMonthlyYearlyEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceMonthlyYearlyEditorComponent.propDecorators = {
    repeatOnRadioButtons: [{ type: ViewChildren, args: [RepeatOnRadioButtonDirective,] }]
};
