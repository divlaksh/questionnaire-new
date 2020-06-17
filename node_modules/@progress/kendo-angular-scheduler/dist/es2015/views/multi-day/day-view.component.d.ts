import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MultiDayViewBase } from './multi-day-view-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { AllDaySlotTemplateDirective, AllDayEventTemplateDirective, MinorTimeHeaderTemplateDirective, MajorTimeHeaderTemplateDirective } from '../templates';
/**
 * The component for rendering the **Day** view.
 */
export declare class DayViewComponent extends MultiDayViewBase {
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The long-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:D}`
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
     */
    selectedDateFormat: string;
    /**
     * The short-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:D}`
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
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
     * The invariant name for this view (`day`).
     */
    readonly name: string;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
