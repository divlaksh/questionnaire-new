import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template for rendering the day slots in the **Month** view.
 * To define the day template, nest an `<ng-template>` tag with the `kendoSchedulerMonthDaySlotTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-month-view>` component.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the slot.
 * - `resources`&mdash;The resources of the slot.
 *
 * {% meta height:500 %}
 * {% embed_file templates/month-slot/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export class MonthDaySlotTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MonthDaySlotTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerMonthDaySlotTemplate]'
            },] },
];
/** @nocollapse */
MonthDaySlotTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
// Rename to indicate that it is only for the month view.
