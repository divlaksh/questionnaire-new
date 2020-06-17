import { NgModule } from '@angular/core';
import { MenuModule } from './menu.module';
import { ContextMenuModule } from './context-menu/context-menu.module';
/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes the Menu and ContextMenu components and directives.
 * Imports the MenusModule into your application [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity)
 * or any other sub-module that will use the Menu and ContextMenu components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 * import { MenusModule } from '@progress/kendo-angular-menu';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, BrowserAnimationsModule, MenusModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var MenusModule = /** @class */ (function () {
    function MenusModule() {
    }
    MenusModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MenuModule, ContextMenuModule]
                },] },
    ];
    return MenusModule;
}());
export { MenusModule };
