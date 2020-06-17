import { TemplateRef } from '@angular/core';
/**
 * Represents the template for and assists the content customization of the Scheduler events.
 * To define the event template, nest an `<ng-template>` tag with the `kendoSchedulerEventTemplate`
 * directive inside the `<kendo-scheduler>`, or in the view components.
 *
 * The available fields in the template context are:
 * - `event`&mdash;The event that is associated with the item.
 * - `resources`&mdash;The resources of the event.
 *
 * {% meta height:500 %}
 * {% embed_file templates/event/app.component.ts preview %}
 * {% embed_file templates/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export declare class EventTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
