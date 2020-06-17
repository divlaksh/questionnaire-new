import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SchedulerView } from '../types';
import { ToolbarTemplateDirective } from './toolbar-template.directive';
import { ToolbarService } from './toolbar.service';
/**
 * @hidden
 */
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(service) {
        var _this = this;
        this.service = service;
        this.hostClasses = true;
        this.navigate = new EventEmitter();
        // The template context is the same as the service context,
        // but with resolved values instead of observables.
        this.templateContext = {};
        this.subs = new Subscription();
        this.subs.add(service.action.subscribe(function (action) {
            return _this.navigate.next(action);
        }));
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.add(this.selectedDate.subscribe(function (date) {
            return _this.templateContext.selectedDate = date;
        }));
        this.subs.add(this.dateRange.subscribe(function (dateRange) {
            return _this.templateContext.dateRange = dateRange;
        }));
    };
    ToolbarComponent.prototype.ngOnChanges = function () {
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
    };
    ToolbarComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    ToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scheduler-toolbar',
                    template: "\n        <ng-template\n            *ngIf=\"template; else defaultTemplate\"\n            [ngTemplateOutlet]=\"template.templateRef\"\n            [ngTemplateOutletContext]=\"templateContext\"\n        >\n        </ng-template>\n\n        <ng-template #defaultTemplate>\n            <ul kendoSchedulerToolbarNavigation [min]=\"min\" [max]=\"max\"></ul>\n            <ul kendoSchedulerToolbarViewSelector></ul>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return [
        { type: ToolbarService }
    ]; };
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
    return ToolbarComponent;
}());
export { ToolbarComponent };
