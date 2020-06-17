"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recurrence_service_1 = require("./recurrence.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-recurrence-frequency-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onFrequencyClick()\">{{ textFor('repeat') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <kendo-buttongroup [selection]=\"'single'\">\n                <button *ngFor='let freq of frequencies' kendoButton\n                        [style.width.px]=\"100\"\n                        [togglable]=\"true\"\n                        [selected]=\"freq.value === selected\"\n                        (click)=\"onClick(freq)\"\n                >{{ freq.text }}</button>\n            </kendo-buttongroup>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceFrequencyEditorComponent.ctorParameters = function () { return [
        { type: recurrence_service_1.RecurrenceService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    RecurrenceFrequencyEditorComponent.propDecorators = {
        weekDayButtons: [{ type: core_1.ViewChildren, args: [kendo_angular_buttons_1.Button,] }]
    };
    return RecurrenceFrequencyEditorComponent;
}());
exports.RecurrenceFrequencyEditorComponent = RecurrenceFrequencyEditorComponent;
