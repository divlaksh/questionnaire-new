import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollViewComponent } from './scrollview.component';
import { ScrollViewPagerComponent } from "./scrollview-pager.component";
import { DraggableModule } from '@progress/kendo-angular-common';
var DECLARATIONS = [
    ScrollViewComponent,
    ScrollViewPagerComponent
];
var EXPORTS = [
    ScrollViewComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ScrollView component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ScrollView module
 * import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
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
 *     imports:      [BrowserModule, ScrollViewModule], // import ScrollView module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ScrollViewModule = /** @class */ (function () {
    function ScrollViewModule() {
    }
    ScrollViewModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DECLARATIONS],
                    exports: [EXPORTS],
                    imports: [CommonModule, DraggableModule]
                },] },
    ];
    return ScrollViewModule;
}());
export { ScrollViewModule };
