import { EventEmitter } from "@angular/core";
import { RecurrenceRule } from '@progress/kendo-recurrence';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
/**
 * @hidden
 *
 */
export interface WeekDayRule {
    day: number;
    offset: number;
}
/**
 * @hidden
 */
export declare type EndRule = 'count' | 'never' | 'until';
/**
 * @hidden
 */
export declare type RepeatOnRule = 'monthday' | 'weekday';
/**
 * @hidden
 */
export declare type Frequency = 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';
/**
 * @hidden
 */
export declare type OffsetPosition = 'first' | 'second' | 'third' | 'fourth' | 'last';
/**
 * @hidden
 */
export interface FrequencyEntity {
    text: string;
    value: Frequency;
}
/**
 * @hidden
 */
export interface WeekDayEntity {
    text: string;
    value: number | string;
}
/**
 * @hidden
 */
export interface MonthEntity {
    text: string;
    value: number;
}
/**
 * @hidden
 */
export interface OffsetPositionEntity {
    text: string;
    value: number;
}
/**
 * @hidden
 */
export declare const dayRule: Array<WeekDayRule>;
/**
 * @hidden
 */
export declare const weekdayRule: Array<WeekDayRule>;
/**
 * @hidden
 */
export declare const weekendRule: Array<WeekDayRule>;
/**
 * @hidden
 *
 * The internal service for handling changes in the RecurrenceEditor component.
 */
export declare class RecurrenceService {
    private intl;
    private localization;
    rrule: RecurrenceRule;
    timezone: string;
    start: Date;
    change: EventEmitter<string>;
    endRuleChange: EventEmitter<string>;
    frequencyChange: EventEmitter<any>;
    repeatOnRuleChange: EventEmitter<RepeatOnRule>;
    constructor(intl: IntlService, localization: LocalizationService);
    init(rrule: string, start: Date, timezone: string): void;
    readonly frequencies: Array<FrequencyEntity>;
    readonly frequency: string;
    setFrequency(freq: Frequency): void;
    interval: number;
    count: number;
    until: Date;
    setWeekDays(newWeekDays: Array<WeekDayRule>): void;
    monthDays: Array<number>;
    positions: Array<number>;
    setMonths(newMonths: Array<number>): void;
    readonly months: Array<MonthEntity>;
    readonly weekDays: Array<WeekDayEntity>;
    readonly extendedWeekDays: Array<WeekDayEntity>;
    readonly offsetPositions: Array<OffsetPositionEntity>;
    endRule: EndRule;
    repeatOnRule: RepeatOnRule;
    onChange(): void;
}
