import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resizeEnd` event.
 */
var ResizeEndEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ResizeEndEvent, _super);
    /**
     * @hidden
     */
    function ResizeEndEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeEndEvent;
}(PreventableEvent));
export { ResizeEndEvent };
