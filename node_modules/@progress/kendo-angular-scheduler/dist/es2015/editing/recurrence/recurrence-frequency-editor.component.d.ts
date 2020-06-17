import { OnInit, QueryList } from '@angular/core';
import { RecurrenceService, FrequencyEntity } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Button } from '@progress/kendo-angular-buttons';
/**
 * @hidden
 */
export declare class RecurrenceFrequencyEditorComponent implements OnInit {
    private recurrence;
    private localization;
    weekDayButtons: QueryList<Button>;
    frequencies: Array<FrequencyEntity>;
    constructor(recurrence: RecurrenceService, localization: LocalizationService);
    ngOnInit(): void;
    readonly selected: string;
    onClick(newFreq: FrequencyEntity): void;
    textFor(key: string): string;
    onFrequencyClick(): void;
}
