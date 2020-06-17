import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `dragStart` event.
 */
export class DragStartEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super();
        Object.assign(this, options);
    }
}
/**
 * Arguments for the `dragOver` event.
 */
export class DragOverEvent extends DragStartEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super(options);
        Object.assign(this, options);
    }
}
/**
 * Arguments for the `dragEnd` event.
 */
export class DragEndEvent extends DragOverEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super(options);
        Object.assign(this, options);
    }
}
