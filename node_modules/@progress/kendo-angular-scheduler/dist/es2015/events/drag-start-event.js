import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `dragStart` event.
 */
export class DragStartEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
