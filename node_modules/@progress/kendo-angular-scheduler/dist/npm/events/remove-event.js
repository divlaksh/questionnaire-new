"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `remove` event.
 */
var RemoveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveEvent, _super);
    /**
     * @hidden
     */
    function RemoveEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return RemoveEvent;
}(preventable_event_1.PreventableEvent));
exports.RemoveEvent = RemoveEvent;
