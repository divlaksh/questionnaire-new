import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ArcGaugeComponent } from './arc-gauge.component';
import { ArcGaugeAreaComponent } from './gauge-area.component';
import { ArcScaleComponent } from './scale.component';
import { ArcLabelsComponent } from './labels.component';
import { ArcCenterTemplateDirective } from './arc-center-template.directive';
import { ColorsComponent } from './colors.component';
import { ColorComponent } from './color.component';
var DIRECTIVES = [ArcGaugeComponent, ArcCenterTemplateDirective, ArcGaugeAreaComponent, ArcScaleComponent, ArcLabelsComponent,
    ColorsComponent, ColorComponent];
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
        { type: NgModule, args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    imports: [SharedModule, CommonModule]
                },] },
    ];
    return ArcGaugeModule;
}());
export { ArcGaugeModule };
