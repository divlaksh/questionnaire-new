import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RadialGaugeComponent } from './radial-gauge.component';
import { RadialGaugeAreaComponent } from './gauge-area.component';
import { RadialScaleComponent } from './scale.component';
import { RadialLabelsComponent } from './labels.component';
import { RadialPointersComponent } from './pointers.component';
import { RadialPointerComponent } from './pointer.component';
import { RadialRangeComponent } from './range.component';
import { RadialRangesComponent } from './ranges.component';
var DIRECTIVES = [RadialGaugeComponent, RadialGaugeAreaComponent, RadialScaleComponent, RadialLabelsComponent,
    RadialPointersComponent, RadialPointerComponent, RadialRangeComponent, RadialRangesComponent];
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes the RadialGauge component and its directives.
 * Imports the `RadialGaugeModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the RadialGauge component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { RadialGaugeModule } from '@progress/kendo-angular-gauges';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, RadialGaugeModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var RadialGaugeModule = /** @class */ (function () {
    function RadialGaugeModule() {
    }
    RadialGaugeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    imports: [SharedModule]
                },] },
    ];
    return RadialGaugeModule;
}());
export { RadialGaugeModule };
