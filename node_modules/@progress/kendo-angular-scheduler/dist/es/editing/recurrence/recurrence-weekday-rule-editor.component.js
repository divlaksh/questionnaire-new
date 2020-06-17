import { Component, ViewChildren, QueryList } from '@angular/core';
import { capitalize, isPresent } from '../../common/util';
import { RecurrenceService } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Button } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
var RecurrenceWeekdayRuleEditorComponent = /** @class */ (function () {
    function RecurrenceWeekdayRuleEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.selected = [];
        this.weekDays = this.recurrence.weekDays;
        this.setSelectedDays();
    }
    RecurrenceWeekdayRuleEditorComponent.prototype.setSelectedDays = function () {
        var _this = this;
        for (var i = 0; i < 7; i++) {
            this.selected[i] = false;
        }
        if (isPresent(this.rrule.byWeekDay)) {
            this.rrule.byWeekDay.forEach(function (rule) {
                _this.selected[rule.day] = true;
            });
        }
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.onSelectedChange = function (isSelected, day) {
        this.selected[day] = isSelected;
        this.recurrence.setWeekDays(this.serializeToWeekDayRuleArray(this.selected));
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.isSelected = function (day) {
        return this.selected[day.value];
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.serializeToWeekDayRuleArray = function (arr) {
        var selectedValues = [];
        arr.forEach(function (isSelected, idx) {
            if (isSelected) {
                selectedValues.push({ day: idx, offset: 0 });
            }
        });
        return selectedValues.length > 0 ? selectedValues : null;
    };
    Object.defineProperty(RecurrenceWeekdayRuleEditorComponent.prototype, "rrule", {
        get: function () {
            return this.recurrence.rrule;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceWeekdayRuleEditorComponent.prototype.capitalize = function (day) {
        return capitalize(day);
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceWeekdayRuleEditorComponent.prototype.onWeeklyRepeatOnClick = function () {
        var selected = this.weekDayButtons.toArray().find(function (r) { return r.selected; });
        if (selected) {
            selected.focus();
        }
    };
    RecurrenceWeekdayRuleEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-weekday-rule-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onWeeklyRepeatOnClick()\">{{ textFor('weeklyRepeatOn') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <kendo-buttongroup [selection]=\"'multiple'\">\n                <button *ngFor='let day of weekDays' kendoButton\n                        [style.width.px]=\"75\"\n                        [toggleable]=\"true\"\n                        [selected]=\"isSelected(day)\"\n                        (selectedChange)=\"onSelectedChange($event, day.value)\"\n                >{{ capitalize(day.text) }}</button>\n            </kendo-buttongroup>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceWeekdayRuleEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceWeekdayRuleEditorComponent.propDecorators = {
        weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
    };
    return RecurrenceWeekdayRuleEditorComponent;
}());
export { RecurrenceWeekdayRuleEditorComponent };
