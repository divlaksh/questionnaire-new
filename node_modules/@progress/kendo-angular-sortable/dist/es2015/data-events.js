import { PreventableEvent } from './preventable-event';
/**
 * The arguments for the `SortableComponent` `dataAdd` event.
 */
export class DataAddEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super();
        Object.assign(this, options);
    }
}
/**
 * The arguments for the `SortableComponent` `dataRemove` event.
 */
export class DataRemoveEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super();
        Object.assign(this, options);
    }
}
/**
 * The arguments for the `SortableComponent` `dataMove` event.
 */
export class DataMoveEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super();
        Object.assign(this, options);
    }
}
