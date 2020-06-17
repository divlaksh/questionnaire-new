import { OnDestroy, QueryList } from '@angular/core';
import { RecurrenceService, OffsetPositionEntity, WeekDayEntity, MonthEntity, Frequency, RepeatOnRule, WeekDayRule } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RepeatOnRadioButtonDirective } from './repeat-on-radio-button.directive';
/**
 * @hidden
 */
export declare class RecurrenceMonthlyYearlyEditorComponent implements OnDestroy {
    private recurrence;
    private localization;
    repeatOnRadioButtons: QueryList<RepeatOnRadioButtonDirective>;
    extendedWeekDays: Array<WeekDayEntity>;
    offsetPositions: Array<OffsetPositionEntity>;
    months: Array<MonthEntity>;
    currentMonthDay: number;
    currentMonthMonthDay: number;
    currentMonthWeekDay: number;
    currentOffset: number;
    currentWeekDay: number | string;
    private subs;
    constructor(recurrence: RecurrenceService, localization: LocalizationService);
    setInitialValues(): void;
    subscribeEventHandlers(): void;
    onRepeatOnRuleChange(newRepeatOnRule: RepeatOnRule): void;
    onFrequencyChange(): void;
    ngOnDestroy(): void;
    readonly monthDay: number;
    readonly weekDay: number | string;
    readonly offset: number;
    onMonthChange(month: number, repeatOnRule: RepeatOnRule): void;
    onMonthDayChange(monthDay: number): void;
    onOffsetPositionChange(offset: number): void;
    onWeekDayChange(weekDay: number | string): void;
    isDisabled(repeatOn: RepeatOnRule): boolean;
    readonly currentFreq: Frequency;
    readonly defaultOffset: number;
    readonly defaultWeekDay: number;
    weekDayRuleFromString(weekDay: string): Array<WeekDayRule>;
    textForRepeatOn(): string;
    textFor(key: string): string;
    onRepeatOnLabelClick(): void;
}
