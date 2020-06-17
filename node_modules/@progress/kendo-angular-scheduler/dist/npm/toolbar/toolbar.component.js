"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var types_1 = require("../types");
var toolbar_template_directive_1 = require("./toolbar-template.directive");
var toolbar_service_1 = require("./toolbar.service");
/**
 * @hidden
 */
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(service) {
        var _this = this;
        this.service = service;
        this.hostClasses = true;
        this.navigate = new core_1.EventEmitter();
        // The template context is the same as the service context,
        // but with resolved values instead of observables.
        this.templateContext = {};
        this.subs = new rxjs_1.Subscription();
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-scheduler-toolbar',
                    template: "\n        <ng-template\n            *ngIf=\"template; else defaultTemplate\"\n            [ngTemplateOutlet]=\"template.templateRef\"\n            [ngTemplateOutletContext]=\"templateContext\"\n        >\n        </ng-template>\n\n        <ng-template #defaultTemplate>\n            <ul kendoSchedulerToolbarNavigation [min]=\"min\" [max]=\"max\"></ul>\n            <ul kendoSchedulerToolbarViewSelector></ul>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return [
        { type: toolbar_service_1.ToolbarService }
    ]; };
    ToolbarComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-scheduler-toolbar',] }, { type: core_1.HostBinding, args: ['class.k-header',] }, { type: core_1.HostBinding, args: ['class.k-floatwrap',] }],
        selectedView: [{ type: core_1.Input }],
        views: [{ type: core_1.Input }],
        dateRange: [{ type: core_1.Input }],
        selectedDate: [{ type: core_1.Input }],
        template: [{ type: core_1.Input }],
        navigate: [{ type: core_1.Output }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }]
    };
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
