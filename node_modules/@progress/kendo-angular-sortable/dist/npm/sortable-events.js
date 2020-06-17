"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
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
}(preventable_event_1.PreventableEvent));
exports.DragStartEvent = DragStartEvent;
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
exports.DragOverEvent = DragOverEvent;
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
exports.DragEndEvent = DragEndEvent;
