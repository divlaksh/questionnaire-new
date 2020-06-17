"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the template for and assists the content customization of all-day events.
 * To define the all-day event template, nest an `<ng-template>` tag with the `kendoSchedulerAllDayEventTemplate`
 * directive inside the `<kendo-scheduler>`, `<kendo-scheduler-day-view>`, or `kendo-scheduler-week-view` component.
 *
 * The available fields in the template context are:
 * - `event`&mdash;The event that is associated with the item.
 * - `resources`&mdash;The resources of the event.
 *
 * {% meta height:500 %}
 * {% embed_file templates/all-day-event/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AllDayEventTemplateDirective = /** @class */ (function () {
    function AllDayEventTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AllDayEventTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerAllDayEventTemplate]'
                },] },
    ];
    /** @nocollapse */
    AllDayEventTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return AllDayEventTemplateDirective;
}());
exports.AllDayEventTemplateDirective = AllDayEventTemplateDirective;
