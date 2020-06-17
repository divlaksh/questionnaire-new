import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resize` event.
 */
export class ResizeEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
