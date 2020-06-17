"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var MinorTimeHeaderTemplateDirective = /** @class */ (function () {
    function MinorTimeHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MinorTimeHeaderTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerMinorTimeHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    MinorTimeHeaderTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return MinorTimeHeaderTemplateDirective;
}());
exports.MinorTimeHeaderTemplateDirective = MinorTimeHeaderTemplateDirective;
