"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pdf_component_1 = require("./pdf.component");
var pdf_command_directive_1 = require("./pdf-command.directive");
var declarations = [
    pdf_component_1.PDFComponent,
    pdf_command_directive_1.PDFCommandDirective
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule)
 * definition for the Scheduler PDF component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Scheduler and PDF modules
 * import { SchedulerModule, PDFModule } from '@progress/kendo-angular-scheduler';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, SchedulerModule, PDFModule], // import Scheduler and PDF modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var PDFModule = /** @class */ (function () {
    function PDFModule() {
    }
    PDFModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [declarations],
                    exports: [declarations]
                },] },
    ];
    return PDFModule;
}());
exports.PDFModule = PDFModule;
