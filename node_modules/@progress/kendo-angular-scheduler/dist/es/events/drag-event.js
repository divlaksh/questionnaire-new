import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `drag` event.
 */
var DragEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DragEvent, _super);
    /**
     * @hidden
     */
    function DragEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragEvent;
}(PreventableEvent));
export { DragEvent };
