"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("../preventable-event");
/**
 * Arguments for the `popupOpen` and `popupClose` events of the ContextMenu.
 */
var ContextMenuPopupEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ContextMenuPopupEvent, _super);
    function ContextMenuPopupEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextMenuPopupEvent;
}(preventable_event_1.PreventableEvent));
exports.ContextMenuPopupEvent = ContextMenuPopupEvent;
