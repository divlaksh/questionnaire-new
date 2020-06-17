import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * The arguments for the `SortableComponent` `dataAdd` event.
 */
var DataAddEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DataAddEvent, _super);
    /**
     * @hidden
     */
    function DataAddEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DataAddEvent;
}(PreventableEvent));
export { DataAddEvent };
/**
 * The arguments for the `SortableComponent` `dataRemove` event.
 */
var DataRemoveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DataRemoveEvent, _super);
    /**
     * @hidden
     */
    function DataRemoveEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DataRemoveEvent;
}(PreventableEvent));
export { DataRemoveEvent };
/**
 * The arguments for the `SortableComponent` `dataMove` event.
 */
var DataMoveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(DataMoveEvent, _super);
    /**
     * @hidden
     */
    function DataMoveEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return DataMoveEvent;
}(PreventableEvent));
export { DataMoveEvent };
