"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tooltip_directive_1 = require("./tooltip/tooltip.directive");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var tooltip_content_component_1 = require("./tooltip/tooltip.content.component");
var COMPONENT_DIRECTIVES = [tooltip_directive_1.TooltipDirective, tooltip_content_component_1.TooltipContentComponent];
var COMPONENT_MODULES = [kendo_angular_popup_1.PopupModule];
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
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    entryComponents: [tooltip_content_component_1.TooltipContentComponent],
                    imports: [common_1.CommonModule].concat(COMPONENT_MODULES),
                    exports: [COMPONENT_DIRECTIVES]
                },] },
    ];
    return TooltipModule;
}());
exports.TooltipModule = TooltipModule;
