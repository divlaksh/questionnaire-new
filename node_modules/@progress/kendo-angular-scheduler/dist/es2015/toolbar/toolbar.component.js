import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SchedulerView } from '../types';
import { ToolbarTemplateDirective } from './toolbar-template.directive';
import { ToolbarService } from './toolbar.service';
/**
 * @hidden
 */
export class ToolbarComponent {
    constructor(service) {
        this.service = service;
        this.hostClasses = true;
        this.navigate = new EventEmitter();
        // The template context is the same as the service context,
        // but with resolved values instead of observables.
        this.templateContext = {};
        this.subs = new Subscription();
        this.subs.add(service.action.subscribe(action => this.navigate.next(action)));
    }
    ngOnInit() {
        this.subs.add(this.selectedDate.subscribe(date => this.templateContext.selectedDate = date));
        this.subs.add(this.dateRange.subscribe(dateRange => this.templateContext.dateRange = dateRange));
    }
    ngOnChanges() {
        this.service.context = {
            dateRange: this.dateRange,
            selectedDate: this.selectedDate,
            views: this.views,
            selectedView: this.selectedView
        };
        Object.assign(this.templateContext, {
            views: this.views,
            selectedView: this.selectedView
            // The dateRange and selectedDate context fields
            // are updated through the subscriptions added in ngOnInit.
        });
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-scheduler-toolbar',
                template: `
        <ng-template
            *ngIf="template; else defaultTemplate"
            [ngTemplateOutlet]="template.templateRef"
            [ngTemplateOutletContext]="templateContext"
        >
        </ng-template>

        <ng-template #defaultTemplate>
            <ul kendoSchedulerToolbarNavigation [min]="min" [max]="max"></ul>
            <ul kendoSchedulerToolbarViewSelector></ul>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolbarComponent.ctorParameters = () => [
    { type: ToolbarService }
];
ToolbarComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-scheduler-toolbar',] }, { type: HostBinding, args: ['class.k-header',] }, { type: HostBinding, args: ['class.k-floatwrap',] }],
    selectedView: [{ type: Input }],
    views: [{ type: Input }],
    dateRange: [{ type: Input }],
    selectedDate: [{ type: Input }],
    template: [{ type: Input }],
    navigate: [{ type: Output }],
    min: [{ type: Input }],
    max: [{ type: Input }]
};
