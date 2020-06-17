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
    function DragStartEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DragStartEvent;
}(PreventableEvent));
export { DragStartEvent };
/**
 * Arguments for the `dragOver` event.
 */
var DragOverEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DragOverEvent, _super);
    /**
     * @hidden
     */
    function DragOverEvent(options) {
        var _this = _super.call(this, options) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DragOverEvent;
}(DragStartEvent));
export { DragOverEvent };
/**
 * Arguments for the `dragEnd` event.
 */
var DragEndEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DragEndEvent, _super);
    /**
     * @hidden
     */
    function DragEndEvent(options) {
        var _this = _super.call(this, options) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DragEndEvent;
}(DragOverEvent));
export { DragEndEvent };
