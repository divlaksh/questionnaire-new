import { Inject, Optional } from '@angular/core';
import { LocalizationService, L10N_PREFIX, MessageService, RTL } from '@progress/kendo-angular-l10n';
import { SchedulerLocalizationService } from '../../../localization/scheduler-localization.service';
import { capitalize } from '../../../common/util';
/**
 * @hidden
 */
export class RecurrenceLocalizationService extends LocalizationService {
    constructor(prefix, messageService, _rtl, schedulerLocalization) {
        super(prefix, messageService, _rtl);
        this.schedulerLocalization = schedulerLocalization;
    }
    get(shortKey) {
        if (this.schedulerLocalization) {
            return this.schedulerLocalization.get('recurrenceEditor' + capitalize(shortKey));
        }
        return super.get(shortKey);
    }
}
/** @nocollapse */
RecurrenceLocalizationService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] },
    { type: SchedulerLocalizationService, decorators: [{ type: Optional }, { type: Inject, args: [SchedulerLocalizationService,] }] }
];
