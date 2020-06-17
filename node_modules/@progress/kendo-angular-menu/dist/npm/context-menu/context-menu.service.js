"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var dom_queries_1 = require("../dom-queries");
/**
 * @hidden
 */
var ContextMenuService = /** @class */ (function () {
    function ContextMenuService() {
        this.keydown = new core_1.EventEmitter();
    }
    ContextMenuService.prototype.emit = function (name, args) {
        this.owner.emitMenuEvent(name, args);
    };
    ContextMenuService.prototype.hasObservers = function (name) {
        return this.owner && kendo_angular_common_1.hasObservers(this.owner[name]);
    };
    ContextMenuService.prototype.leaveMenu = function (e) {
        return this.items ? !dom_queries_1.inMenu(e.target, this.items) : true;
    };
    ContextMenuService.decorators = [
        { type: core_1.Injectable },
    ];
    return ContextMenuService;
}());
exports.ContextMenuService = ContextMenuService;
