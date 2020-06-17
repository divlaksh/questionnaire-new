import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `dragEnd` event.
 */
export class DragEndEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
