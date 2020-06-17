import { NgZone, QueryList, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DateRange, ViewItem } from '../../types';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { DayTimeSlotService } from '../day-time/day-time-slot.service';
import { DayTimeViewComponent } from '../day-time/day-time-view.component';
import { PDFService } from '../../pdf/pdf.service';
/**
 * @hidden
 */
export declare class TimelineMultiDayViewComponent extends DayTimeViewComponent {
    name: string;
    columnWidth: number;
    viewName: string;
    verticalResourceRows: QueryList<ElementRef>;
    readonly classNames: string;
    protected verticalTime: boolean;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService, intl: IntlService, slotService: DayTimeSlotService, zone: NgZone, renderer: Renderer2, element: ElementRef, pdfService: PDFService);
    ngOnChanges(changes: any): void;
    reflow(): void;
    readonly allEventsMessage: string;
    readonly slotsCount: any;
    timeColspan(index: number): any;
    horizontalColspan(resourceIndex: number): any;
    verticalRowspan(resourceIndex: number): any;
    protected createTasks(items: ViewItem[], dateRange: DateRange): any[];
    protected onTasksChange(): void;
    protected dragRanges(slot: any): any;
    protected dragHintSize(firstSlot: any, lastSlot: any): any;
    protected updateResizeHints(ranges: any[], start: Date, end: Date): void;
    protected pdfWidth(): number;
    protected currentTimeArrowOffset(): number;
}
