"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var menu_module_1 = require("../menu.module");
var context_menu_component_1 = require("./context-menu.component");
var context_menu_template_directive_1 = require("./context-menu-template.directive");
var context_menu_target_directive_1 = require("./context-menu-target.directive");
var context_menu_target_container_directive_1 = require("./context-menu-target-container.directive");
var COMPONENT_DIRECTIVES = [
    context_menu_component_1.ContextMenuComponent,
    context_menu_template_directive_1.ContextMenuTemplateDirective,
    context_menu_target_directive_1.ContextMenuTargetDirective,
    context_menu_target_container_directive_1.ContextMenuTargetContainerDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ContextMenu component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ContextMenu module
 * import { ContextMenuModule } from '@progress/kendo-angular-menu';
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
 *     imports:      [BrowserModule, BrowserAnimationsModule, ContextMenuModule], // import ContextMenuModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ContextMenuModule = /** @class */ (function () {
    function ContextMenuModule() {
    }
    ContextMenuModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES, menu_module_1.MenuModule],
                    imports: [kendo_angular_popup_1.PopupModule, common_1.CommonModule, menu_module_1.MenuModule]
                },] },
    ];
    return ContextMenuModule;
}());
exports.ContextMenuModule = ContextMenuModule;
