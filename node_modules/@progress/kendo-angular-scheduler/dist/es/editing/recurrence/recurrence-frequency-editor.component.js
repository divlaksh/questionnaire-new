import { Component, ViewChildren, QueryList } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Button } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
var RecurrenceFrequencyEditorComponent = /** @class */ (function () {
    function RecurrenceFrequencyEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
    }
    RecurrenceFrequencyEditorComponent.prototype.ngOnInit = function () {
        this.frequencies = this.recurrence.frequencies;
    };
    Object.defineProperty(RecurrenceFrequencyEditorComponent.prototype, "selected", {
        get: function () {
            return this.recurrence.frequency;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceFrequencyEditorComponent.prototype.onClick = function (newFreq) {
        if (newFreq.value !== this.selected) {
            this.recurrence.setFrequency(newFreq.value);
        }
    };
    RecurrenceFrequencyEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceFrequencyEditorComponent.prototype.onFrequencyClick = function () {
        var selected = this.weekDayButtons.toArray().find(function (r) { return r.selected; });
        if (selected) {
            selected.focus();
        }
    };
    RecurrenceFrequencyEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-frequency-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onFrequencyClick()\">{{ textFor('repeat') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <kendo-buttongroup [selection]=\"'single'\">\n                <button *ngFor='let freq of frequencies' kendoButton\n                        [style.width.px]=\"100\"\n                        [togglable]=\"true\"\n                        [selected]=\"freq.value === selected\"\n                        (click)=\"onClick(freq)\"\n                >{{ freq.text }}</button>\n            </kendo-buttongroup>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceFrequencyEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceFrequencyEditorComponent.propDecorators = {
        weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
    };
    return RecurrenceFrequencyEditorComponent;
}());
export { RecurrenceFrequencyEditorComponent };
