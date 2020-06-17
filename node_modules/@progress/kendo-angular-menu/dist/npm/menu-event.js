"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `open` and `close` events of the Menu.
 */
var MenuEvent = /** @class */ (function (_super) {
    tslib_1.__extends(MenuEvent, _super);
    function MenuEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuEvent;
}(preventable_event_1.PreventableEvent));
exports.MenuEvent = MenuEvent;
