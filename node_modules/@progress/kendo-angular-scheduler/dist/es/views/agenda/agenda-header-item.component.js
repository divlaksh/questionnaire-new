import { Component, Input, HostBinding, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { toLocalDate } from '@progress/kendo-date-math';
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
            return toLocalDate(this.item.dataItem.value);
        },
        enumerable: true,
        configurable: true
    });
    AgendaHeaderItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaHeaderItem]',
                    template: "\n        <ng-container *ngIf=\"!agendaDateTemplate\">\n            <strong class=\"k-scheduler-agendaday\">{{itemDate | kendoDate: 'dd'}}</strong>\n            <em class=\"k-scheduler-agendaweek\">{{itemDate | kendoDate: 'EEEE'}}</em>\n            <span class=\"k-scheduler-agendadate\">{{itemDate | kendoDate: 'y'}}</span>\n        </ng-container>\n        <ng-container *ngIf=\"agendaDateTemplate\" [ngTemplateOutlet]=\"agendaDateTemplate\"\n            [ngTemplateOutletContext]=\"{ date: itemDate }\">\n        </ng-container>\n    "
                },] },
    ];
    AgendaHeaderItemComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ["class.k-scheduler-datecolumn",] }],
        rowSpan: [{ type: HostBinding, args: ["attr.rowspan",] }],
        item: [{ type: Input, args: ["kendoSchedulerAgendaHeaderItem",] }],
        agendaDateTemplate: [{ type: Input }]
    };
    return AgendaHeaderItemComponent;
}());
export { AgendaHeaderItemComponent };
