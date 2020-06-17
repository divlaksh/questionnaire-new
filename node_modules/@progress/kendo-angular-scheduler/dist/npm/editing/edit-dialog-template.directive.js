"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the template for the edit dialog of the Scheduler.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoSchedulerEditTemplate` directive inside the `<kendo-scheduler>` tag.
 *
 * The template context contains the following fields:
 * - `formGroup`&mdash;The current [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html).
 * - `event`&mdash;The currently edited event.
 * - `editMode`&mdash;The current edit mode.
 * - `isNew`&mdash;The state of the current event.
 */
var EditDialogTemplateDirective = /** @class */ (function () {
    function EditDialogTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    EditDialogTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerEditDialogTemplate]'
                },] },
    ];
    /** @nocollapse */
    EditDialogTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return EditDialogTemplateDirective;
}());
exports.EditDialogTemplateDirective = EditDialogTemplateDirective;
