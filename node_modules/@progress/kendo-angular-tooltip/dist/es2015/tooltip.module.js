import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TooltipContentComponent } from './tooltip/tooltip.content.component';
const COMPONENT_DIRECTIVES = [TooltipDirective, TooltipContentComponent];
const COMPONENT_MODULES = [PopupModule];
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
export class TooltipModule {
}
TooltipModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                entryComponents: [TooltipContentComponent],
                imports: [CommonModule, ...COMPONENT_MODULES],
                exports: [COMPONENT_DIRECTIVES]
            },] },
];
