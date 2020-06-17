import { Component, Input, HostBinding, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { toLocalDate } from '@progress/kendo-date-math';
/**
 * @hidden
 */
export class AgendaHeaderItemComponent {
    constructor() {
        this.classes = true;
    }
    get rowSpan() {
        return this.item.rowSpan;
    }
    get itemDate() {
        return toLocalDate(this.item.dataItem.value);
    }
}
AgendaHeaderItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaHeaderItem]',
                template: `
        <ng-container *ngIf="!agendaDateTemplate">
            <strong class="k-scheduler-agendaday">{{itemDate | kendoDate: 'dd'}}</strong>
            <em class="k-scheduler-agendaweek">{{itemDate | kendoDate: 'EEEE'}}</em>
            <span class="k-scheduler-agendadate">{{itemDate | kendoDate: 'y'}}</span>
        </ng-container>
        <ng-container *ngIf="agendaDateTemplate" [ngTemplateOutlet]="agendaDateTemplate"
            [ngTemplateOutletContext]="{ date: itemDate }">
        </ng-container>
    `
            },] },
];
AgendaHeaderItemComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ["class.k-scheduler-datecolumn",] }],
    rowSpan: [{ type: HostBinding, args: ["attr.rowspan",] }],
    item: [{ type: Input, args: ["kendoSchedulerAgendaHeaderItem",] }],
    agendaDateTemplate: [{ type: Input }]
};
