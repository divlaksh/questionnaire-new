"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var MajorTimeHeaderTemplateDirective = /** @class */ (function () {
    function MajorTimeHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MajorTimeHeaderTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerMajorTimeHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    MajorTimeHeaderTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return MajorTimeHeaderTemplateDirective;
}());
exports.MajorTimeHeaderTemplateDirective = MajorTimeHeaderTemplateDirective;
