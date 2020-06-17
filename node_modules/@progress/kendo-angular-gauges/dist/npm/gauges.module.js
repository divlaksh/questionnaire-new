"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var arc_gauge_module_1 = require("./arc-gauge/arc-gauge.module");
var linear_gauge_module_1 = require("./linear-gauge/linear-gauge.module");
var radial_gauge_module_1 = require("./radial-gauge/radial-gauge.module");
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes all Gauge components and directives.
 *
 * Imports the `GaugesModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Gauge components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { GaugesModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, GaugesModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var GaugesModule = /** @class */ (function () {
    function GaugesModule() {
    }
    GaugesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [arc_gauge_module_1.ArcGaugeModule, linear_gauge_module_1.LinearGaugeModule, radial_gauge_module_1.RadialGaugeModule]
                },] },
    ];
    return GaugesModule;
}());
exports.GaugesModule = GaugesModule;
