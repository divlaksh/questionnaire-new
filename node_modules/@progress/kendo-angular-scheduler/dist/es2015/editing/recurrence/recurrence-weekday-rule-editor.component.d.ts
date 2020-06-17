import { QueryList } from '@angular/core';
import { RecurrenceService, WeekDayEntity, WeekDayRule } from './recurrence.service';
import { RecurrenceRule } from '@progress/kendo-recurrence';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Button } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
export declare class RecurrenceWeekdayRuleEditorComponent {
    private recurrence;
    private localization;
    weekDayButtons: QueryList<Button>;
    weekDays: Array<WeekDayEntity>;
    selected: Array<boolean>;
    constructor(recurrence: RecurrenceService, localization: LocalizationService);
    setSelectedDays(): void;
    onSelectedChange(isSelected: boolean, day: number): void;
    isSelected(day: WeekDayEntity): boolean;
    serializeToWeekDayRuleArray(arr: Array<boolean>): Array<WeekDayRule>;
    readonly rrule: RecurrenceRule;
    capitalize(day: string): string;
    textFor(key: string): string;
    onWeeklyRepeatOnClick(): void;
}
