import { TemplateRef } from '@angular/core';
/**
 * Represents the template for and assists the content customization of all-day slots.
 * To define the all-day slot template, nest an `<ng-template>` tag with the `kendoSchedulerAllDaySlotTemplate`
 * directive inside the `<kendo-scheduler>`, `<kendo-scheduler-day-view>`, or `kendo-scheduler-week-view` component.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the slot.
 * - `resources`&mdash;The resources of the slot.
 *
 * {% meta height:500 %}
 * {% embed_file templates/all-day-slot/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export declare class AllDaySlotTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
