import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { TimelineBase } from './timeline-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
/**
 * The component for rendering the **Timeline** view.
 */
export declare class TimelineViewComponent extends TimelineBase {
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
     * The invariant name for this view (`timeline`).
     */
    readonly name: string;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
