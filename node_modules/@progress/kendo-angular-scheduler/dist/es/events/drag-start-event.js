import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `dragStart` event.
 */
var DragStartEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DragStartEvent, _super);
    /**
     * @hidden
     */
    function DragStartEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragStartEvent;
}(PreventableEvent));
export { DragStartEvent };
