/**
 * Arguments for the `eventClick` and `eventDblClick` events.
 */
export class EventClickEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}
