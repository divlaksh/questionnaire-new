"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
/**
 * @hidden
 */
var AgendaHeaderItemComponent = /** @class */ (function () {
    function AgendaHeaderItemComponent() {
        this.classes = true;
    }
    Object.defineProperty(AgendaHeaderItemComponent.prototype, "rowSpan", {
        get: function () {
            return this.item.rowSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaHeaderItemComponent.prototype, "itemDate", {
        get: function () {
            return kendo_date_math_1.toLocalDate(this.item.dataItem.value);
        },
        enumerable: true,
        configurable: true
    });
    AgendaHeaderItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaHeaderItem]',
                    template: "\n        <ng-container *ngIf=\"!agendaDateTemplate\">\n            <strong class=\"k-scheduler-agendaday\">{{itemDate | kendoDate: 'dd'}}</strong>\n            <em class=\"k-scheduler-agendaweek\">{{itemDate | kendoDate: 'EEEE'}}</em>\n            <span class=\"k-scheduler-agendadate\">{{itemDate | kendoDate: 'y'}}</span>\n        </ng-container>\n        <ng-container *ngIf=\"agendaDateTemplate\" [ngTemplateOutlet]=\"agendaDateTemplate\"\n            [ngTemplateOutletContext]=\"{ date: itemDate }\">\n        </ng-container>\n    "
                },] },
    ];
    AgendaHeaderItemComponent.propDecorators = {
        classes: [{ type: core_1.HostBinding, args: ["class.k-scheduler-datecolumn",] }],
        rowSpan: [{ type: core_1.HostBinding, args: ["attr.rowspan",] }],
        item: [{ type: core_1.Input, args: ["kendoSchedulerAgendaHeaderItem",] }],
        agendaDateTemplate: [{ type: core_1.Input }]
    };
    return AgendaHeaderItemComponent;
}());
exports.AgendaHeaderItemComponent = AgendaHeaderItemComponent;
