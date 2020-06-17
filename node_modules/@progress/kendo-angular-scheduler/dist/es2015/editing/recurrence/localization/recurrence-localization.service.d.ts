import { LocalizationService, MessageService } from '@progress/kendo-angular-l10n';
import { SchedulerLocalizationService } from '../../../localization/scheduler-localization.service';
/**
 * @hidden
 */
export declare class RecurrenceLocalizationService extends LocalizationService {
    private schedulerLocalization?;
    constructor(prefix: string, messageService: MessageService, _rtl: boolean, schedulerLocalization?: SchedulerLocalizationService);
    get(shortKey: string): string;
}
