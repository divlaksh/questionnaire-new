/**
 * Arguments for `slotClick` and `slotDblClick` events.
 */
export class SlotClickEvent {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}
