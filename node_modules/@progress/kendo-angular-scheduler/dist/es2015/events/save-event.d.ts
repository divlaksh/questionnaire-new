import { FormGroup } from '@angular/forms';
import { EditEventBase } from './edit-event-base';
import { EditMode } from '../types';
/**
 * Arguments for the `save` event.
 */
export declare class SaveEvent extends EditEventBase {
    /**
     * The edited `formGroup` instance.
     */
    formGroup: FormGroup;
    /**
     * The selected edit mode.
     */
    mode: EditMode;
}
