"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var edit_event_base_1 = require("./edit-event-base");
/**
 * Arguments for the `save` event.
 */
var SaveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(SaveEvent, _super);
    function SaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SaveEvent;
}(edit_event_base_1.EditEventBase));
exports.SaveEvent = SaveEvent;
