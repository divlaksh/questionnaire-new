"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `edit` event of the editing directives.
 */
var EditEvent = /** @class */ (function (_super) {
    tslib_1.__extends(EditEvent, _super);
    /**
     * @hidden
     */
    function EditEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return EditEvent;
}(preventable_event_1.PreventableEvent));
exports.EditEvent = EditEvent;
