/**
 * Arguments for the `dateChange` event.
 */
export class DateChangeEvent {
    /**
     * @hidden
     */
    constructor(sender, selectedDate, dateRange) {
        this.sender = sender;
        this.selectedDate = selectedDate;
        this.dateRange = dateRange;
    }
}
