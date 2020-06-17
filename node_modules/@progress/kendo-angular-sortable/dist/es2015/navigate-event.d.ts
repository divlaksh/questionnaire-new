import { PreventableEvent } from './preventable-event';
import { SortableEvent } from './sortable-event-args.interface';
/**
 * The `navigate` event is emitted when using the keyboard arrows.
 */
export declare class NavigateEvent extends PreventableEvent implements SortableEvent {
    /**
     * The index of the draggable item.
     */
    index: number;
    /**
     * The old index of the draggable item.
     */
    oldIndex: number;
    /**
     * Indicates whether the ctrl or meta keys are pressed.
     */
    ctrlKey: boolean;
    /**
     * @hidden
     */
    constructor(options: any);
}
