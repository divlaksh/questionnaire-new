import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template which renders the time header in the **Agenda** view.
 * To define the time template, nest an `<ng-template>` tag with the `kendoSchedulerAgendaTimeTemplate`
 * directive inside the `<kendo-scheduler>` or in the `<kendo-scheduler-agenda-view>` component.
 *
 * The available fields in the template context are:
 * - `start`&mdash;The start date of the event.
 * - `end`&mdash;The end date of the event.
 * - `title`&mdash;The title of the event.
 * - `description`&mdash;The description of the event.
 * - `isAllDay`&mdash;A Boolean value which indicates if the event is all-day.
 * - `resources`&mdash;The resources of the event.
 *
 * {% meta height:500 %}
 * {% embed_file templates/agenda-time-header/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
var AgendaTimeTemplateDirective = /** @class */ (function () {
    function AgendaTimeTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AgendaTimeTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerAgendaTimeTemplate]'
                },] },
    ];
    /** @nocollapse */
    AgendaTimeTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return AgendaTimeTemplateDirective;
}());
export { AgendaTimeTemplateDirective };
