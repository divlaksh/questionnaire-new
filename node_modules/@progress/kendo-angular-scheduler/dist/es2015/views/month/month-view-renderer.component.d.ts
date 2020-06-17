import { OnChanges, NgZone, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { DateRange, NavigationAction, ViewItem } from '../../types';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { MonthSlotService } from './month-slot.service';
import { BaseView } from '../common/base-view';
import { PDFService } from '../../pdf/pdf.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class MonthViewRendererComponent extends BaseView implements OnChanges {
    monthDaySlotTemplate: TemplateRef<any>;
    resizeHintFormat: any;
    weeks: any[];
    readonly monthDaySlotTemplateRef: TemplateRef<any>;
    private schedulerMonthDaySlotTemplate;
    constructor(viewContext: ViewContextService, viewState: ViewStateService, intl: IntlService, slotService: MonthSlotService, zone: NgZone, element: ElementRef, renderer: Renderer2, pdfService: PDFService, localization: LocalizationService);
    horizontalColspan(resourceIndex: number): any;
    verticalRowspan(resourceIndex: number): any;
    verticalItem(leafIndex: number, resourceIndex: number): any;
    daySlotClass(day: any, resourceIndex: any): string;
    protected optionsChange(changes: any): void;
    protected createTasks(items: ViewItem[], dateRange: DateRange): any[];
    protected onTasksChange(): void;
    protected reflow(): void;
    protected onClick(e: any, eventType?: string): void;
    protected slotByIndex(index: any, _args: any): any;
    protected onSelectDate(date: Date): void;
    protected onAction(e: NavigationAction): void;
    protected dateRange(date?: Date): DateRange;
    protected dragRanges(slot: any): any;
    protected dragHintSize(first: any, last: any): any;
    protected slotByPosition(x: number, y: number): any;
    private createDaySlots;
}
