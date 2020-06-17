import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `remove` event.
 */
var RemoveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveEvent, _super);
    /**
     * @hidden
     */
    function RemoveEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return RemoveEvent;
}(PreventableEvent));
export { RemoveEvent };
