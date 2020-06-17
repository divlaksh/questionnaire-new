"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var services_1 = require("./services");
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [kendo_angular_common_1.ResizeSensorModule],
                    providers: [
                        services_1.ThemeService
                    ]
                },] },
    ];
    return SharedModule;
}());
exports.SharedModule = SharedModule;
