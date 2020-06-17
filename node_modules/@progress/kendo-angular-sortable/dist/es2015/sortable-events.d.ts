import { PreventableEvent } from './preventable-event';
import { SortableEvent } from './sortable-event-args.interface';
/**
 * Arguments for the `dragStart` event.
 */
export declare class DragStartEvent extends PreventableEvent implements SortableEvent {
    /**
     * The index of the draggable item.
     */
    index: number;
    /**
     * The old index of the draggable item.
     */
    oldIndex: number;
    /**
     * @hidden
     */
    constructor(options: any);
}
/**
 * Arguments for the `dragOver` event.
 */
export declare class DragOverEvent extends DragStartEvent {
    /**
     * The index of the draggable item.
     */
    index: number;
    /**
     * The old index of the draggable item.
     */
    oldIndex: number;
    /**
     * @hidden
     */
    constructor(options: any);
}
/**
 * Arguments for the `dragEnd` event.
 */
export declare class DragEndEvent extends DragOverEvent {
    /**
     * The index of the draggable item.
     */
    index: number;
    /**
     * The old index of the draggable item.
     */
    oldIndex: number;
    /**
     * @hidden
     */
    constructor(options: any);
}
