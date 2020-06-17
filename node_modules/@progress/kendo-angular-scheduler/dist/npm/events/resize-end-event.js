"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `resizeEnd` event.
 */
var ResizeEndEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ResizeEndEvent, _super);
    /**
     * @hidden
     */
    function ResizeEndEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return ResizeEndEvent;
}(preventable_event_1.PreventableEvent));
exports.ResizeEndEvent = ResizeEndEvent;
