"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the template which renders the date header in the **Agenda** view.
 * To define the date template, nest an `<ng-template>` tag with the `kendoSchedulerAgendaDateTemplate`
 * directive inside the `<kendo-scheduler-agenda-view>` or `<kendo-scheduler>` components.
 *
 * The available fields in the template context are:
 * - `date`&mdash;The header date.
 *
 * {% meta height:500 %}
 * {% embed_file templates/agenda-date-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AgendaDateTemplateDirective = /** @class */ (function () {
    function AgendaDateTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AgendaDateTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerAgendaDateTemplate]'
                },] },
    ];
    /** @nocollapse */
    AgendaDateTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return AgendaDateTemplateDirective;
}());
exports.AgendaDateTemplateDirective = AgendaDateTemplateDirective;
