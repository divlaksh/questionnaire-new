/**
 * Arguments for the `eventClick` and `eventDblClick` events.
 */
var EventClickEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function EventClickEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return EventClickEvent;
}());
export { EventClickEvent };
