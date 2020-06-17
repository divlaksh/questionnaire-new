"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var AllDaySlotTemplateDirective = /** @class */ (function () {
    function AllDaySlotTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AllDaySlotTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerAllDaySlotTemplate]'
                },] },
    ];
    /** @nocollapse */
    AllDaySlotTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return AllDaySlotTemplateDirective;
}());
exports.AllDaySlotTemplateDirective = AllDaySlotTemplateDirective;
