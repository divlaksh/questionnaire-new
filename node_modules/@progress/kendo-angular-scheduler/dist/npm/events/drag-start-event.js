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
    function DragStartEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return DragStartEvent;
}(preventable_event_1.PreventableEvent));
exports.DragStartEvent = DragStartEvent;
