"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var menu_event_1 = require("./menu-event");
/**
 * Arguments for the `select` event of the Menu.
 */
var MenuSelectEvent = /** @class */ (function (_super) {
    tslib_1.__extends(MenuSelectEvent, _super);
    function MenuSelectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuSelectEvent;
}(menu_event_1.MenuEvent));
exports.MenuSelectEvent = MenuSelectEvent;
