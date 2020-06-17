import { FormGroup } from '@angular/forms';
import { EditEventBase } from './edit-event-base';
/**
 * Arguments for the `cancel` event.
 */
export declare class CancelEvent extends EditEventBase {
    /**
     * The edited `formGroup` instance.
     */
    formGroup: FormGroup;
}
