/**
 * Arguments for the `dragStart`, `dragOver`, and `dragEnd` events.
 * @hidden
 */
export interface SortableEvent {
    /**
     * The index of the data item.
     */
    index: number;
    /**
     * The data item that will be added or removed.
     */
    oldIndex: number;
}
