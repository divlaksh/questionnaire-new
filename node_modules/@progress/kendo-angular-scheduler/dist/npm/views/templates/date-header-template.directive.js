"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the template which renders the date header in the **Day**, **Week**, and **Timeline** views.
 * To define the day template, nest an `<ng-template>` tag with the `kendoSchedulerDateHeaderTemplate`
 * directive inside the `<kendo-scheduler>`, or in the `<kendo-scheduler-day-view>`, `<kendo-scheduler-week-view>`,
 * `<kendo-scheduler-timeline-view>`, `<kendo-scheduler-timeline-week-view>`, and `<kendo-scheduler-timeline-month-view>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The header date.
 *
 * {% meta height:500 %}
 * {% embed_file templates/date-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var DateHeaderTemplateDirective = /** @class */ (function () {
    function DateHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DateHeaderTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerDateHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    DateHeaderTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return DateHeaderTemplateDirective;
}());
exports.DateHeaderTemplateDirective = DateHeaderTemplateDirective;
