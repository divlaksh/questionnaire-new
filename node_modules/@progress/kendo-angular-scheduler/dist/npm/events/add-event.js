"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `add` event of the editing directives.
 */
var AddEvent = /** @class */ (function (_super) {
    tslib_1.__extends(AddEvent, _super);
    /**
     * @hidden
     */
    function AddEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return AddEvent;
}(preventable_event_1.PreventableEvent));
exports.AddEvent = AddEvent;
