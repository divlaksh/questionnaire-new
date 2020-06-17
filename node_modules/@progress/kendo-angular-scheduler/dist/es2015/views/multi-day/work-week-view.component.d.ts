import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { WeekViewComponent } from './week-view.component';
import { IntlService } from '@progress/kendo-angular-intl';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
/**
 * The component for rendering the **Work Week** view.
 */
export declare class WorkWeekViewComponent extends WeekViewComponent {
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The invariant name for this view (`week`).
     */
    readonly name: string;
    /**
     * @hidden
     */
    readonly numberOfDays: number;
    constructor(intl: IntlService, localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
    /**
     * @hidden
     */
    getStartDate(selectedDate: Date): Date;
    /**
     * @hidden
     */
    getNextDate(date: Date, count: number, _numberOfDays: number): Date;
}
