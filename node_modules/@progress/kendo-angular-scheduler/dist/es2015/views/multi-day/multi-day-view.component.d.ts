import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { DayViewComponent } from './day-view.component';
/**
 * The component for rendering the **Multi-Day** view.
 */
export declare class MultiDayViewComponent extends DayViewComponent {
    /**
     * The long-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:D} - {1:D}` for multiple days and `{0:D}` for a single day
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
     */
    selectedDateFormat: string;
    /**
     * The short date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:d} - {1:d}` for multiple days and `{0:d}` for a single day
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
     */
    selectedShortDateFormat: string;
    /**
     * Specifies the number of days that the view will render.
     * Defaults to `1`.
     */
    numberOfDays: number;
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The invariant name for this view (`multi-day`).
     */
    readonly name: string;
    private readonly defaultDateFormat;
    private readonly defaultShortDateFormat;
    private dateFormat;
    private shortDateFormat;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
