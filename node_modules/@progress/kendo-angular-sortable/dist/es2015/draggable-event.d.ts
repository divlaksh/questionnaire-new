import { PreventableEvent } from './preventable-event';
import { DraggableDirective } from './draggable.directive';
/**
 * The arguments for the `DraggableDirective` events.
 * @hidden
 */
export declare class DraggableEvent extends PreventableEvent {
    /**
     * The target DraggableDirective instance.
     */
    target: DraggableDirective;
    /**
     * The browser event emitted by the target's native element.
     */
    originalEvent: any;
    /**
     * @hidden
     */
    constructor(options: any);
}
