import { PreventableEvent } from "./preventable-event";
/**
 * Arguments for the `executeAction` event. The `executeAction` event fires when the user clicks
 * a quick action button. Calling `preventDefault()` suppresses the built-in action handler.
 */
export class ExecuteActionEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(action, message) {
        super();
        this.action = action;
        this.message = message;
    }
}
