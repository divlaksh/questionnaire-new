import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { LinearGaugeAreaComponent } from './gauge-area.component';
import { LinearScaleComponent } from './scale.component';
import { LinearLabelsComponent } from './labels.component';
import { LinearPointersComponent } from './pointers.component';
import { LinearPointerComponent } from './pointer.component';
import { LinearRangeComponent } from './range.component';
import { LinearRangesComponent } from './ranges.component';
var DIRECTIVES = [LinearGaugeComponent, LinearGaugeAreaComponent, LinearScaleComponent, LinearLabelsComponent,
    LinearPointersComponent, LinearPointerComponent, LinearRangeComponent, LinearRangesComponent];
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes the LinearGauge component and its directives.
 * Imports the `LinearGaugeModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the LinearGauge component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { LinearGaugeModule } from '@progress/kendo-angular-gauges';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, LinearGaugeModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var LinearGaugeModule = /** @class */ (function () {
    function LinearGaugeModule() {
    }
    LinearGaugeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    imports: [SharedModule]
                },] },
    ];
    return LinearGaugeModule;
}());
export { LinearGaugeModule };
