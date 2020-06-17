import { NgModule } from '@angular/core';
import { PDFComponent } from './pdf.component';
import { PDFCommandDirective } from './pdf-command.directive';
const declarations = [
    PDFComponent,
    PDFCommandDirective
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
export class PDFModule {
}
PDFModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [declarations]
            },] },
];
