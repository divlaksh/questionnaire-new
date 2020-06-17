import { Directive, Optional, TemplateRef } from '@angular/core';
/**
 * Represents the toolbar template of the Scheduler. To define a toolbar
 * template, nest an `<ng-template kendoSchedulerToolbarTemplate>` tag
 * inside `<kendo-scheduler>`. For more information and examples, refer to the article on
 * [customizing the toolbar]({% slug toolbar_scheduler %}) of the Scheduler.
 *
 * The template context receives the following template variables:
 * * `selectedDate`&mdash;The currently selected date.
 * * `dateRange`&mdash;The currently selected [`DateRange`]({% slug api_scheduler_daterange %}).
 * * `views`&mdash;A [`SchedulerView`]({% slug api_scheduler_schedulerview %}) array with the available views.
 * * `selectedView`&mdash;The currently selected [`SchedulerView`]({% slug api_scheduler_schedulerview %}).
 *
 * You can declare either of the following built-in navigation components in the toolbar template:
 * * `kendoSchedulerToolbarNavigation`&mdash;Renders navigation buttons, a calendar, and a date-range label.
 * * `kendoSchedulerToolbarViewSelector`&mdash;Renders the buttons for selecting the view.
 *
 * To emit navigation events, the components inside the toolbar can inject
 * the [`ToolbarService`]({% slug api_scheduler_toolbarservice %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
export class ToolbarTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ToolbarTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerToolbarTemplate]'
            },] },
];
/** @nocollapse */
ToolbarTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
