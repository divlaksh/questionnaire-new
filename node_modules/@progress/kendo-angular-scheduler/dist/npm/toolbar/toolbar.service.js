"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * A service for communication with the toolbar controls
 * which is used by the toolbar components for publishing navigation actions
 * ([see example]({% slug toolbar_scheduler %}#toc-using-the-toolbar-service)).
 */
var ToolbarService = /** @class */ (function () {
    /** @hidden */
    function ToolbarService() {
        this.actionSource = new rxjs_1.Subject();
        this.action = this.actionSource.asObservable();
    }
    /**
     * Emits the specified navigation action.
     *
     * @param action - The navigation action that will be executed.
     */
    ToolbarService.prototype.navigate = function (action) {
        this.actionSource.next(action);
    };
    ToolbarService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ToolbarService.ctorParameters = function () { return []; };
    return ToolbarService;
}());
exports.ToolbarService = ToolbarService;
