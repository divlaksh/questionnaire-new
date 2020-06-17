import { Inject, Optional } from '@angular/core';
import { LocalizationService, L10N_PREFIX, MessageService, RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class SchedulerLocalizationService extends LocalizationService {
    constructor(prefix, messageService, _rtl) {
        super(prefix, messageService, _rtl);
    }
}
/** @nocollapse */
SchedulerLocalizationService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [L10N_PREFIX,] }] },
    { type: MessageService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];
