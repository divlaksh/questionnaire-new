import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template for the minor-time headers in the **Day** and **Week** views.
 * To define the minor-time header template, nest an `<ng-template>` tag with the `kendoSchedulerMinorTimeHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>` and `<kendo-scheduler-week-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The date of the header.
 *
 * {% meta height:500 %}
 * {% embed_file templates/minor-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export class MinorTimeHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MinorTimeHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerMinorTimeHeaderTemplate]'
            },] },
];
/** @nocollapse */
MinorTimeHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
