import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `resizeStart` event.
 */
var ResizeStartEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ResizeStartEvent, _super);
    /**
     * @hidden
     */
    function ResizeStartEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeStartEvent;
}(PreventableEvent));
export { ResizeStartEvent };
