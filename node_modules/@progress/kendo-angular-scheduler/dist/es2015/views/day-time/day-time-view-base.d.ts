import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { TimeSlotTemplateDirective, DateHeaderTemplateDirective } from '../templates';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { CurrentTimeSettings } from '../../types';
import { Day } from '@progress/kendo-date-math';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare abstract class DayTimeViewBase extends ConfigurationViewBase implements OnDestroy {
    /**
     * @hidden
     */
    timeSlotTemplate: TimeSlotTemplateDirective;
    /**
     * @hidden
     */
    dateHeaderTemplate: DateHeaderTemplateDirective;
    /**
     * If set to `true`, the view will be initially shown in the business-hours mode.
     * By default, the view is displayed in the full-day mode.
     */
    showWorkHours: boolean;
    /**
     * The height of the events.
     */
    eventHeight: number;
    /**
     * The start time of the view. The Scheduler displays events which start after the start time.
     * Accepts string values in the `HH:mm` format.
     */
    startTime: string;
    /**
     * The time to which the view will initially be scrolled.
     * Accepts string values in the `HH:mm` format or a JavaScript `Date`.
     */
    scrollTime: string;
    /**
     * The end time of the view. The Scheduler displays events which end before the end time.
     * Accepts string values in the `HH:mm` format.
     */
    endTime: string;
    /**
     * The start time of the view when `showWorkHours` is set to `true`.
     * Accepts string values in the `HH:mm` format.
     */
    workDayStart: string;
    /**
     * The end time of the view when `showWorkHours` is set to `true`.
     * Accepts string values in the `HH:mm` format.
     */
    workDayEnd: string;
    /**
     * The start of the work week.
     */
    workWeekStart: Day;
    /**
     * The end of the work week.
     */
    workWeekEnd: Day;
    /**
     * The duration (in minutes) of the time slots.
     */
    slotDuration: number;
    /**
     * The number of divisions of the time slots.
     */
    slotDivisions: number;
    /**
     * Specifies the settings for the current time marker of the Scheduler.
     */
    currentTimeMarker: boolean | CurrentTimeSettings;
    /**
     * @hidden
     */
    readonly viewEventHeight: any;
    /**
     * @hidden
     */
    readonly shouldShowWorkHours: boolean;
    /**
     * @hidden
     */
    readonly viewStartTime: any;
    /**
     * @hidden
     */
    readonly viewEndTime: any;
    /**
     * @hidden
     */
    readonly viewWorkDayStart: any;
    /**
     * @hidden
     */
    readonly viewWorkDayEnd: any;
    /**
     * @hidden
     */
    readonly viewWorkWeekStart: any;
    /**
     * @hidden
     */
    readonly viewWorkWeekEnd: any;
    /**
     * @hidden
     */
    readonly viewSlotDuration: any;
    /**
     * @hidden
     */
    readonly viewSlotDivisions: any;
    /**
     * @hidden
     */
    readonly viewCurrentTimeMarker: any;
    /**
     * @hidden
     */
    readonly viewScrollTime: any;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
    protected optionValue(name: string): any;
}
