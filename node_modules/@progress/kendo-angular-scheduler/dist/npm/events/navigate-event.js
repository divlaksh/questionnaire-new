"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
/**
 * Arguments for the `navigate` event.
 */
var NavigateEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigateEvent, _super);
    /**
     * @hidden
     */
    function NavigateEvent(sender, action) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.action = action;
        return _this;
    }
    return NavigateEvent;
}(kendo_angular_dateinputs_1.PreventableEvent));
exports.NavigateEvent = NavigateEvent;
