import { PreventableEvent } from './preventable-event';
/**
 * The arguments for the `DraggableDirective` events.
 * @hidden
 */
export class DraggableEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super();
        Object.assign(this, options);
    }
}
