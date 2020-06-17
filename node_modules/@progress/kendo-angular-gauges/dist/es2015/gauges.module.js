import { NgModule } from '@angular/core';
import { ArcGaugeModule } from './arc-gauge/arc-gauge.module';
import { LinearGaugeModule } from './linear-gauge/linear-gauge.module';
import { RadialGaugeModule } from './radial-gauge/radial-gauge.module';
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
export class GaugesModule {
}
GaugesModule.decorators = [
    { type: NgModule, args: [{
                exports: [ArcGaugeModule, LinearGaugeModule, RadialGaugeModule]
            },] },
];
