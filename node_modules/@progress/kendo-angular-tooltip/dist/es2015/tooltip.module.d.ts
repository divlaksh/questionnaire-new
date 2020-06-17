/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Tooltip component.
 *
 * The package exports:
 * - `KendoTooltipDirective`&mdash;The Tooltip directive class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Tooltip module
 * import { TooltipModule } from '@progress/kendo-angular-tooltip';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * _@NgModule{{
 *    declarations: [AppComponent], // declare app component
 *    imports:      [BrowserModule, TooltipModule], // import TooltipModule module
 *    bootstrap:    [AppComponent]
 * }}
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
export declare class TooltipModule {
}
