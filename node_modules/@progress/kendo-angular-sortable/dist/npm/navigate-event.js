"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * The `navigate` event is emitted when using the keyboard arrows.
 */
var NavigateEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigateEvent, _super);
    /**
     * @hidden
     */
    function NavigateEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return NavigateEvent;
}(preventable_event_1.PreventableEvent));
exports.NavigateEvent = NavigateEvent;
