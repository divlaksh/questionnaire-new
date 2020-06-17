/**
 * The arguments for the `dataAdd`, or `dataRemove` events.
 * @hidden
 */
export interface DataEvent {
    /**
     * The index of the data item.
     */
    index: number;
    /**
     * The data item that will be added or removed.
     */
    dataItem: Object;
}
