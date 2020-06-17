import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { MonthDaySlotTemplateDirective } from '../templates';
/**
 * The component for rendering the **Month** view.
 */
export declare class MonthViewComponent extends ConfigurationViewBase implements OnDestroy {
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The height of the rendered events.
     */
    eventHeight: number;
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
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting.
     */
    selectedShortDateFormat: string;
    monthDaySlotTemplate: MonthDaySlotTemplateDirective;
    /**
     * The invariant name for this view (`month`).
     */
    readonly name: string;
    readonly viewEventHeight: number;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
