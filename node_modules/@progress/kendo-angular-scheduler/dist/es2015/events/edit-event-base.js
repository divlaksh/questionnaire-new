/**
 * @hidden
 */
export class EditEventBase {
    /**
     * @hidden
     */
    constructor(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
}
