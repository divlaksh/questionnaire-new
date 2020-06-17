import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `dragEnd` event.
 */
var DragEndEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DragEndEvent, _super);
    /**
     * @hidden
     */
    function DragEndEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragEndEvent;
}(PreventableEvent));
export { DragEndEvent };
