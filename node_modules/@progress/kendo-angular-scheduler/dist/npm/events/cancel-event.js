"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var edit_event_base_1 = require("./edit-event-base");
/**
 * Arguments for the `cancel` event.
 */
var CancelEvent = /** @class */ (function (_super) {
    tslib_1.__extends(CancelEvent, _super);
    function CancelEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CancelEvent;
}(edit_event_base_1.EditEventBase));
exports.CancelEvent = CancelEvent;
