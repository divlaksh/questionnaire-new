import { ChangeDetectorRef } from '@angular/core';
import { DayTimeViewBase } from '../day-time/day-time-view-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
/**
 * @hidden
 */
export declare abstract class TimelineBase extends DayTimeViewBase {
    /**
     * Specifies the columns width.
     */
    columnWidth: number;
    /**
     * @hidden
     */
    readonly viewColumnWidth: any;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
