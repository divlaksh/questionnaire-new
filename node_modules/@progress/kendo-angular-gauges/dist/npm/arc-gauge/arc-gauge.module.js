"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("../shared.module");
var arc_gauge_component_1 = require("./arc-gauge.component");
var gauge_area_component_1 = require("./gauge-area.component");
var scale_component_1 = require("./scale.component");
var labels_component_1 = require("./labels.component");
var arc_center_template_directive_1 = require("./arc-center-template.directive");
var colors_component_1 = require("./colors.component");
var color_component_1 = require("./color.component");
var DIRECTIVES = [arc_gauge_component_1.ArcGaugeComponent, arc_center_template_directive_1.ArcCenterTemplateDirective, gauge_area_component_1.ArcGaugeAreaComponent, scale_component_1.ArcScaleComponent, labels_component_1.ArcLabelsComponent,
    colors_component_1.ColorsComponent, color_component_1.ColorComponent];
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes the ArcGauge component and its directives.
 * Imports the `ArcGaugeModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the ArcGauge component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ArcGaugeModule } from '@progress/kendo-angular-gauges';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ArcGaugeModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var ArcGaugeModule = /** @class */ (function () {
    function ArcGaugeModule() {
    }
    ArcGaugeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    imports: [shared_module_1.SharedModule, common_1.CommonModule]
                },] },
    ];
    return ArcGaugeModule;
}());
exports.ArcGaugeModule = ArcGaugeModule;
