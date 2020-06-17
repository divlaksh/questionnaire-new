"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arguments for the `dateChange` event.
 */
var DateChangeEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function DateChangeEvent(sender, selectedDate, dateRange) {
        this.sender = sender;
        this.selectedDate = selectedDate;
        this.dateRange = dateRange;
    }
    return DateChangeEvent;
}());
exports.DateChangeEvent = DateChangeEvent;
