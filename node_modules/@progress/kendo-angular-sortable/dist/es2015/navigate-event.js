import { PreventableEvent } from './preventable-event';
/**
 * The `navigate` event is emitted when using the keyboard arrows.
 */
export class NavigateEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(options) {
        super();
        Object.assign(this, options);
    }
}
