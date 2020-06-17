import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `add` event of the editing directives.
 */
export class AddEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
