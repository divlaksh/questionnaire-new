import { PreventableEvent } from './preventable-event';
import { DataEvent } from './data-event-args.interface';
/**
 * The arguments for the `SortableComponent` `dataAdd` event.
 */
export declare class DataAddEvent extends PreventableEvent implements DataEvent {
    /**
     * The index of the data item.
     */
    index: number;
    /**
     * The data item that will be added.
     */
    dataItem: number;
    /**
     * @hidden
     */
    constructor(options: any);
}
/**
 * The arguments for the `SortableComponent` `dataRemove` event.
 */
export declare class DataRemoveEvent extends PreventableEvent implements DataEvent {
    /**
     * The index of the data item.
     */
    index: number;
    /**
     * The data item that will be removed.
     */
    dataItem: number;
    /**
     * @hidden
     */
    constructor(options: any);
}
/**
 * The arguments for the `SortableComponent` `dataMove` event.
 */
export declare class DataMoveEvent extends PreventableEvent implements DataEvent {
    /**
     * The index of the data item.
     */
    index: number;
    /**
     * The old index of the data item.
     */
    oldIndex: number;
    /**
     * The data item that will be removed.
     */
    dataItem: number;
    /**
     * @hidden
     */
    constructor(options: any);
}
