import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `remove` event.
 */
export class RemoveEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
