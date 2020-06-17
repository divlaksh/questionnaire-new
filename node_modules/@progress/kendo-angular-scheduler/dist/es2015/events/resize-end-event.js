import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resizeEnd` event.
 */
export class ResizeEndEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
