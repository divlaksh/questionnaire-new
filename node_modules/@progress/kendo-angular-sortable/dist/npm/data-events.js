"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
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
}(preventable_event_1.PreventableEvent));
exports.DataAddEvent = DataAddEvent;
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
}(preventable_event_1.PreventableEvent));
exports.DataRemoveEvent = DataRemoveEvent;
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
}(preventable_event_1.PreventableEvent));
exports.DataMoveEvent = DataMoveEvent;
