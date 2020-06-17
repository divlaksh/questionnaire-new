import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { TimelineBase } from './timeline-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
/**
 * The component for rendering the **Month** timeline view.
 */
export declare class TimelineMonthViewComponent extends TimelineBase {
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The long-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:Y}`
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
     */
    selectedDateFormat: string;
    /**
     * The short-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:y}`
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
     */
    selectedShortDateFormat: string;
    /**
     * The invariant name for this view (`timelineMonth`).
     */
    readonly name: string;
    /**
     * @hidden
     */
    getStartDate: (selectedDate: Date) => Date;
    /**
     * @hidden
     */
    getEndDate: (selectedDate: Date) => Date;
    /**
     * @hidden
     */
    getNextDate: (date: Date, count: number) => Date;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
