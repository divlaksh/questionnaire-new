/**
 * The selected edit mode during the update or removal of events.
 * For non-recurring events, set to `Event`.
 *
 * The supported values are:
 * * `Event`&mdash;Edits the selected event.
 * * `Occurrence`&mdash;Edits the selected occurrence.
 * * `Series`&mdash;Edits all events in the series.
 */
export declare const enum EditMode {
    Event = 0,
    Occurrence = 1,
    Series = 2
}
