import * as tslib_1 from "tslib";
import { PreventableEvent } from '@progress/kendo-angular-dateinputs';
/**
 * Arguments for the `navigate` event.
 */
var NavigateEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigateEvent, _super);
    /**
     * @hidden
     */
    function NavigateEvent(sender, action) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.action = action;
        return _this;
    }
    return NavigateEvent;
}(PreventableEvent));
export { NavigateEvent };
