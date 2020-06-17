import { PreventableEvent } from "./preventable-event";
import { Action, Message } from "../main";
/**
 * Arguments for the `executeAction` event. The `executeAction` event fires when the user clicks
 * a quick action button. Calling `preventDefault()` suppresses the built-in action handler.
 */
export declare class ExecuteActionEvent extends PreventableEvent {
    /**
     * The action that will be executed.
     */
    action: Action;
    /**
     * The message that contains the action.
     */
    message: Message;
    /**
     * @hidden
     */
    constructor(action: Action, message: Message);
}
