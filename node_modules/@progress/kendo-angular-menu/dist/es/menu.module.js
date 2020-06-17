import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { ListComponent } from './rendering/list.component';
import { ItemComponent } from './rendering/item.component';
import { LinkDirective } from './rendering/link.directive';
import { ExpandArrowDirective } from './rendering/arrow.directive';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ItemLinkTemplateDirective } from './templates/item-link-template.directive';
import { ItemContentTemplateDirective } from './templates/item-content-template.directive';
import { HierarchyBindingDirective } from './data-binding/hierachy-binding.directive';
import { FlatBindingDirective } from './data-binding/flat-binding.directive';
var COMPONENT_EXPORTS = [
    MenuComponent,
    MenuItemComponent,
    ItemTemplateDirective,
    ItemLinkTemplateDirective,
    ItemContentTemplateDirective,
    HierarchyBindingDirective,
    FlatBindingDirective,
    LinkDirective,
    ExpandArrowDirective
];
var COMPONENT_DIRECTIVES = COMPONENT_EXPORTS.concat([
    ListComponent,
    ItemComponent
]);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Menu component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Menu module
 * import { MenuModule } from '@progress/kendo-angular-menu';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, MenuModule], // import Menu module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_EXPORTS],
                    imports: [PopupModule, CommonModule]
                },] },
    ];
    return MenuModule;
}());
export { MenuModule };
