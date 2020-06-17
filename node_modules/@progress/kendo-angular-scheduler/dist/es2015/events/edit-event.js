import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `edit` event of the editing directives.
 */
export class EditEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
