import { ChangeDetectorRef } from '@angular/core';
import { DayTimeViewBase } from '../day-time/day-time-view-base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
/**
 * @hidden
 */
export declare abstract class MultiDayViewBase extends DayTimeViewBase {
    /**
     * Numeric value between 0 and 1 that specifies what percentage of the slot should be filled by the events.
     *
     * Defaults to 0.9 (90% fill).
     */
    slotFill: number;
    /**
     * @hidden
     */
    readonly viewSlotFill: any;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
