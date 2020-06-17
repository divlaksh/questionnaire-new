import { Component, ViewChildren, QueryList } from '@angular/core';
import { capitalize, isPresent } from '../../common/util';
import { RecurrenceService } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Button } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
export class RecurrenceWeekdayRuleEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.selected = [];
        this.weekDays = this.recurrence.weekDays;
        this.setSelectedDays();
    }
    setSelectedDays() {
        for (let i = 0; i < 7; i++) {
            this.selected[i] = false;
        }
        if (isPresent(this.rrule.byWeekDay)) {
            this.rrule.byWeekDay.forEach((rule) => {
                this.selected[rule.day] = true;
            });
        }
    }
    onSelectedChange(isSelected, day) {
        this.selected[day] = isSelected;
        this.recurrence.setWeekDays(this.serializeToWeekDayRuleArray(this.selected));
    }
    isSelected(day) {
        return this.selected[day.value];
    }
    serializeToWeekDayRuleArray(arr) {
        let selectedValues = [];
        arr.forEach((isSelected, idx) => {
            if (isSelected) {
                selectedValues.push({ day: idx, offset: 0 });
            }
        });
        return selectedValues.length > 0 ? selectedValues : null;
    }
    get rrule() {
        return this.recurrence.rrule;
    }
    capitalize(day) {
        return capitalize(day);
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onWeeklyRepeatOnClick() {
        const selected = this.weekDayButtons.toArray().find(r => r.selected);
        if (selected) {
            selected.focus();
        }
    }
}
RecurrenceWeekdayRuleEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-weekday-rule-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onWeeklyRepeatOnClick()">{{ textFor('weeklyRepeatOn') }}</label>
        </div>
        <div class='k-edit-field'>
            <kendo-buttongroup [selection]="'multiple'">
                <button *ngFor='let day of weekDays' kendoButton
                        [style.width.px]="75"
                        [toggleable]="true"
                        [selected]="isSelected(day)"
                        (selectedChange)="onSelectedChange($event, day.value)"
                >{{ capitalize(day.text) }}</button>
            </kendo-buttongroup>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceWeekdayRuleEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceWeekdayRuleEditorComponent.propDecorators = {
    weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
};
