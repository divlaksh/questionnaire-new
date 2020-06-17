import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resize` event.
 */
var ResizeEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ResizeEvent, _super);
    /**
     * @hidden
     */
    function ResizeEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeEvent;
}(PreventableEvent));
export { ResizeEvent };
