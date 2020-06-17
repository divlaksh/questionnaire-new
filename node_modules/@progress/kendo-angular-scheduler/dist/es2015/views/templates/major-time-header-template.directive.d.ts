import { TemplateRef } from '@angular/core';
/**
 * Represents the template for the major-time headers in the **Day** and **Week** views.
 * To define the major-time header template, nest an `<ng-template>` tag with the `kendoSchedulerMajorTimeHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>` and `<kendo-scheduler-week-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the header.
 *
 * {% meta height:500 %}
 * {% embed_file templates/major-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export declare class MajorTimeHeaderTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
