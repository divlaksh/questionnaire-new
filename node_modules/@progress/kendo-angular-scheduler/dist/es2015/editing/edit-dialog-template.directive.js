import { Directive, TemplateRef, Optional } from '@angular/core';
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
export class EditDialogTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
EditDialogTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerEditDialogTemplate]'
            },] },
];
/** @nocollapse */
EditDialogTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
