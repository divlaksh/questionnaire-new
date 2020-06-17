import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    messagePlaceholder: [{ type: Input }],
    send: [{ type: Input }]
};
