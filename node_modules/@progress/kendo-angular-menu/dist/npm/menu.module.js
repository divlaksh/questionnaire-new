"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var menu_component_1 = require("./menu.component");
var menu_item_component_1 = require("./menu-item.component");
var list_component_1 = require("./rendering/list.component");
var item_component_1 = require("./rendering/item.component");
var link_directive_1 = require("./rendering/link.directive");
var arrow_directive_1 = require("./rendering/arrow.directive");
var item_template_directive_1 = require("./templates/item-template.directive");
var item_link_template_directive_1 = require("./templates/item-link-template.directive");
var item_content_template_directive_1 = require("./templates/item-content-template.directive");
var hierachy_binding_directive_1 = require("./data-binding/hierachy-binding.directive");
var flat_binding_directive_1 = require("./data-binding/flat-binding.directive");
var COMPONENT_EXPORTS = [
    menu_component_1.MenuComponent,
    menu_item_component_1.MenuItemComponent,
    item_template_directive_1.ItemTemplateDirective,
    item_link_template_directive_1.ItemLinkTemplateDirective,
    item_content_template_directive_1.ItemContentTemplateDirective,
    hierachy_binding_directive_1.HierarchyBindingDirective,
    flat_binding_directive_1.FlatBindingDirective,
    link_directive_1.LinkDirective,
    arrow_directive_1.ExpandArrowDirective
];
var COMPONENT_DIRECTIVES = COMPONENT_EXPORTS.concat([
    list_component_1.ListComponent,
    item_component_1.ItemComponent
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
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_EXPORTS],
                    imports: [kendo_angular_popup_1.PopupModule, common_1.CommonModule]
                },] },
    ];
    return MenuModule;
}());
exports.MenuModule = MenuModule;
