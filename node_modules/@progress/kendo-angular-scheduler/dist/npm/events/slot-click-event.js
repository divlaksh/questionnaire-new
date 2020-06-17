"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arguments for `slotClick` and `slotDblClick` events.
 */
var SlotClickEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function SlotClickEvent(sender, args) {
        this.sender = sender;
        Object.assign(this, args);
    }
    return SlotClickEvent;
}());
exports.SlotClickEvent = SlotClickEvent;
