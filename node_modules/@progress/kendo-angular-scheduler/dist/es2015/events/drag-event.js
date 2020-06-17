import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `drag` event.
 */
export class DragEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        super();
        this.sender = sender;
        Object.assign(this, args);
    }
}
