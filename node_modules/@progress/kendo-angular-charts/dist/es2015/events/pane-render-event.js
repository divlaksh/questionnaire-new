import { BaseEvent } from './base-event';
/**
 * Arguments for the `paneRender` event.
 */
export class PaneRenderEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(args, sender) {
        super(sender);
        Object.assign(this, args);
    }
}
