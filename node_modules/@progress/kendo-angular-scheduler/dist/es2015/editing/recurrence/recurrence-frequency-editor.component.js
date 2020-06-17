import { Component, ViewChildren, QueryList } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Button } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
export class RecurrenceFrequencyEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
    }
    ngOnInit() {
        this.frequencies = this.recurrence.frequencies;
    }
    get selected() {
        return this.recurrence.frequency;
    }
    onClick(newFreq) {
        if (newFreq.value !== this.selected) {
            this.recurrence.setFrequency(newFreq.value);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onFrequencyClick() {
        const selected = this.weekDayButtons.toArray().find(r => r.selected);
        if (selected) {
            selected.focus();
        }
    }
}
RecurrenceFrequencyEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-frequency-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onFrequencyClick()">{{ textFor('repeat') }}</label>
        </div>
        <div class='k-edit-field'>
            <kendo-buttongroup [selection]="'single'">
                <button *ngFor='let freq of frequencies' kendoButton
                        [style.width.px]="100"
                        [togglable]="true"
                        [selected]="freq.value === selected"
                        (click)="onClick(freq)"
                >{{ freq.text }}</button>
            </kendo-buttongroup>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceFrequencyEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceFrequencyEditorComponent.propDecorators = {
    weekDayButtons: [{ type: ViewChildren, args: [Button,] }]
};
