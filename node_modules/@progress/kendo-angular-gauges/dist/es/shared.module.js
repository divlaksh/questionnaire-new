import { NgModule } from '@angular/core';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { ThemeService } from './services';
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ResizeSensorModule],
                    providers: [
                        ThemeService
                    ]
                },] },
    ];
    return SharedModule;
}());
export { SharedModule };
