import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template for the time-slot renderer in the **Day**, **Week**, and **Timeline** views.
 * To define the time-slot template, nest an `<ng-template>` tag with the `kendoSchedulerTimeSlotTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>`, `<kendo-scheduler-week-view>`,
 * `<kendo-scheduler-timeline-view>`, `<kendo-scheduler-timeline-week-view>`, and `<kendo-scheduler-timeline-month-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the slot.
 * - `resources`&mdash;The resources of the slot.
 *
 * {% meta height:500 %}
 * {% embed_file templates/time-slot/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export class TimeSlotTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
TimeSlotTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerTimeSlotTemplate]'
            },] },
];
/** @nocollapse */
TimeSlotTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
