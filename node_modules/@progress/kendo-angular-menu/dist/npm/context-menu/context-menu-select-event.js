"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var context_menu_event_1 = require("./context-menu-event");
/**
 * Arguments for the `select` event of the ContextMenu.
 */
var ContextMenuSelectEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ContextMenuSelectEvent, _super);
    function ContextMenuSelectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextMenuSelectEvent;
}(context_menu_event_1.ContextMenuEvent));
exports.ContextMenuSelectEvent = ContextMenuSelectEvent;
