import * as tslib_1 from "tslib";
import { PreventableEvent } from "./preventable-event";
/**
 * Arguments for the `executeAction` event. The `executeAction` event fires when the user clicks
 * a quick action button. Calling `preventDefault()` suppresses the built-in action handler.
 */
var ExecuteActionEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ExecuteActionEvent, _super);
    /**
     * @hidden
     */
    function ExecuteActionEvent(action, message) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.message = message;
        return _this;
    }
    return ExecuteActionEvent;
}(PreventableEvent));
export { ExecuteActionEvent };
