import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resizeStart` event.
 */
export class ResizeStartEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
