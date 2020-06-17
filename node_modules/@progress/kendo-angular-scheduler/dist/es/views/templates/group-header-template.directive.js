import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template which renders the resource group header in the **Day**, **Week**, and **Timeline** views.
 * To define the template, nest an `<ng-template>` tag with the `kendoSchedulerGroupHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>`, `<kendo-scheduler-week-view>`,
 * `<kendo-scheduler-timeline-view>`, `<kendo-scheduler-timeline-week-view>`, and `<kendo-scheduler-timeline-month-view>` components.
 *
 * The available fields in the template context are:
 * - `resource`&mdash;The resource item.
 *
 * {% meta height:500 %}
 * {% embed_file templates/group-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var GroupHeaderTemplateDirective = /** @class */ (function () {
    function GroupHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerGroupHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupHeaderTemplateDirective;
}());
export { GroupHeaderTemplateDirective };
