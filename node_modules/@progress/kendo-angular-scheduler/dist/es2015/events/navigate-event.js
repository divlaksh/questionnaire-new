import { PreventableEvent } from '@progress/kendo-angular-dateinputs';
/**
 * Arguments for the `navigate` event.
 */
export class NavigateEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(sender, action) {
        super();
        this.sender = sender;
        this.action = action;
    }
}
