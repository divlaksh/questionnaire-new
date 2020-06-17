/**
 * Represents the date range of a Scheduler view.
 *
 * The interval includes the start date and all dates
 * up to but not including the end date.
 * Depending on the size of the component, in its navigation bar
 * the Scheduler will display either the `text` or `shortText` field.
 */
export interface DateRange {
    /**
     * The start date of the range (inclusive).
     */
    start: Date;
    /**
     * The end date of the range (exclusive)
     */
    end: Date;
    /**
     * The textual representation of the date range. For example,
     * `Monday, June 10, 2018 - Monday, June 17, 2018`.
     */
    text: string;
    /**
     * The short textual representation of the date range. For example,
     * `6/10/2018 - 6/17/2019`.
     */
    shortText: string;
}
