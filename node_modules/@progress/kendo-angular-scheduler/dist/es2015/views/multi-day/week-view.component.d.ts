import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MultiDayViewBase } from './multi-day-view-base';
import { IntlService } from '@progress/kendo-angular-intl';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { AllDaySlotTemplateDirective, AllDayEventTemplateDirective, MinorTimeHeaderTemplateDirective, MajorTimeHeaderTemplateDirective } from '../templates';
/**
 * The component for rendering the **Week** view.
 */
export declare class WeekViewComponent extends MultiDayViewBase {
    protected intl: IntlService;
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The long-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:D} - {1:D}`,
     * where `0` is the start and `1` is the end date
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
     */
    selectedDateFormat: string;
    /**
     * The short date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:d} - {1:d}`,
     * where `0` is the start and `1` is the end date
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting).
     */
    selectedShortDateFormat: string;
    /**
     * @hidden
     */
    allDaySlotTemplate: AllDaySlotTemplateDirective;
    /**
     * @hidden
     */
    allDayEventTemplate: AllDayEventTemplateDirective;
    /**
     * @hidden
     */
    minorTimeHeaderTemplate: MinorTimeHeaderTemplateDirective;
    /**
     * @hidden
     */
    majorTimeHeaderTemplate: MajorTimeHeaderTemplateDirective;
    /**
     * The invariant name for this view (`week`).
     */
    readonly name: string;
    constructor(intl: IntlService, localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
    /**
     * @hidden
     */
    getStartDate(selectedDate: Date): Date;
}
