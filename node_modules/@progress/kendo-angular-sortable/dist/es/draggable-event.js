import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * The arguments for the `DraggableDirective` events.
 * @hidden
 */
var DraggableEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DraggableEvent, _super);
    /**
     * @hidden
     */
    function DraggableEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DraggableEvent;
}(PreventableEvent));
export { DraggableEvent };
